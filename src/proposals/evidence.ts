import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  ProposalError,
  type RepositorySnapshot,
  type SourceFile,
  type SourceOmission,
  type SourceReference,
  type SourceObservation,
} from './model.js';

const execute = promisify(execFile);
export const evidenceLimits = Object.freeze({
  treeBytes: 4 * 1024 * 1024,
  treePaths: 800,
  files: 24,
  fileBytes: 24 * 1024,
  totalBytes: 144 * 1024,
  blobReads: 48,
  gitTimeoutMs: 10_000,
});

// Only these built-in Git reads are used. In particular: no status/fsmonitor,
// diff/textconv, checkout, filters, repository executables or lazy object fetches.
async function readGit(repository: string, args: string[], signal: AbortSignal, maxBuffer: number) {
  signal.throwIfAborted();
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')),
  );
  const { stdout } = await execute(
    process.platform === 'win32' ? 'git.exe' : '/usr/bin/git',
    [
      '--no-optional-locks',
      '--no-lazy-fetch',
      '-c',
      'core.fsmonitor=false',
      '-c',
      'core.hooksPath=/dev/null',
      '-c',
      'protocol.allow=never',
      '-c',
      'trace2.normalTarget=false',
      '-c',
      'trace2.eventTarget=false',
      '-c',
      'trace2.perfTarget=false',
      ...args,
    ],
    {
      cwd: repository,
      signal,
      timeout: evidenceLimits.gitTimeoutMs,
      maxBuffer,
      encoding: 'buffer',
      env: {
        ...env,
        GIT_TERMINAL_PROMPT: '0',
        GIT_NO_LAZY_FETCH: '1',
        GIT_NO_REPLACE_OBJECTS: '1',
        GIT_CONFIG_NOSYSTEM: '1',
        GIT_CONFIG_GLOBAL: '/dev/null',
      },
    },
  );
  return stdout;
}

export async function repositoryHead(
  repository: string,
  signal: AbortSignal,
): Promise<{ repository: string; head: string }> {
  try {
    const canonical = await realpath(resolve(repository));
    const top = (await readGit(canonical, ['rev-parse', '--show-toplevel'], signal, 16_384))
      .toString('utf8')
      .replace(/\r?\n$/, '');
    if ((await realpath(top)) !== canonical)
      throw new Error('Choose the Git repository root directory.');
    const head = (
      await readGit(canonical, ['rev-parse', '--verify', 'HEAD^{commit}'], signal, 1024)
    )
      .toString('ascii')
      .trim();
    if (!/^[a-f0-9]{40,64}$/.test(head)) throw new Error('A committed HEAD is required.');
    return { repository: canonical, head };
  } catch (cause) {
    signal.throwIfAborted();
    throw new ProposalError(
      'repository',
      'Choose an accessible local Git repository root with a committed HEAD. Git inspection failed; no draft or run was created.',
      { cause },
    );
  }
}

interface Entry {
  mode: string;
  kind: string;
  blob: string;
  bytes: number;
  path: string;
}
function excluded(entry: Entry): string | undefined {
  const p = entry.path;
  if (
    p.length > 500 ||
    /[\x00-\x1f\x7f\\]/.test(p) ||
    p.startsWith('/') ||
    p.split('/').some((s) => s === '..' || s === '.git')
  )
    return 'Unsupported path names';
  if (entry.mode === '120000') return 'Symbolic links are not followed';
  if (entry.mode === '160000' || entry.kind === 'commit') return 'Submodules are not inspected';
  if (entry.kind !== 'blob' || !['100644', '100755'].includes(entry.mode))
    return 'Non-regular Git entries';
  if (
    /(^|\/)(\.env(?:\..*)?|\.aws|\.ssh|\.gnupg|\.npmrc|\.yarnrc(?:\.yml)?|\.pypirc|\.netrc|credentials?(?:\.[^/]*)?|secrets?(?:\.[^/]*)?|id_rsa|id_ed25519)(\/|$)/i.test(
      p,
    ) ||
    /\.(pem|key|p12|pfx|jks|keystore)$/i.test(p)
  )
    return 'Potential secret files are excluded';
  if (
    /(^|\/)(node_modules|vendor|dist|build|coverage|\.next|\.git|\.iterfox|\.codex|\.agents|__pycache__)(\/|$)/i.test(
      p,
    ) ||
    /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|Cargo\.lock|uv\.lock|poetry\.lock|go\.sum)$/.test(
      p,
    ) ||
    /\.(min\.js|map|png|jpe?g|gif|webp|ico|pdf|woff2?|zip|gz)$/i.test(p)
  )
    return 'Generated, dependency or binary assets';
  if (entry.bytes > evidenceLimits.fileBytes) return 'File exceeds the per-file evidence limit';
  if (entry.bytes === 0) return 'Empty files';
  return undefined;
}

function priority(path: string, terms: string[]): { score: number; group: string } {
  let group = 'source';
  let score = 40;
  if (
    /(^|\/)(package\.json|pyproject\.toml|Cargo\.toml|go\.mod|Makefile|justfile|Gemfile|pom\.xml|build\.gradle(?:\.kts)?)$/i.test(
      path,
    )
  ) {
    group = 'manifest';
    score = path.includes('/') ? 95 : 115;
  } else if (/(^|\/)(readme|contributing)(\.[^/]+)?$/i.test(path)) {
    group = 'docs';
    score = path.includes('/') ? 75 : 110;
  } else if (
    /^\.github\/workflows\//.test(path) ||
    /(^|\/)(tests?|specs?|__tests__)\/|\.(test|spec)\.[^/]+$/.test(path)
  ) {
    group = 'checks';
    score = 75;
  } else if (/\.(md|rst|txt)$/.test(path)) {
    group = 'docs';
    score = 50;
  } else if (
    /\.(tsx?|jsx?|mjs|cjs|py|rs|go|rb|java|kt|swift|c|h|cpp|cs|vue|svelte|html|css)$/.test(path)
  )
    score = 65;
  if (/^(src|app|lib)\//.test(path)) score += 15;
  if (/^(examples?|fixtures?)\//.test(path)) score -= 25;
  if (terms.some((term) => path.toLowerCase().includes(term))) score += 15;
  return { group, score };
}

export async function collectRepositoryEvidence(
  repository: string,
  goal: string,
  signal: AbortSignal,
): Promise<RepositorySnapshot> {
  const root = await repositoryHead(repository, signal);
  try {
    const raw = await readGit(
      root.repository,
      ['ls-tree', '-r', '-l', '-z', '--full-tree', root.head],
      signal,
      evidenceLimits.treeBytes,
    );
    const entries: Entry[] = new TextDecoder('utf-8', { fatal: true })
      .decode(raw)
      .split('\0')
      .filter(Boolean)
      .map((record) => {
        const match = /^([0-9]{6}) (blob|commit) ([a-f0-9]{40,64}) +([0-9]+|-)\t([\s\S]+)$/.exec(
          record,
        );
        if (!match) throw new Error('Unsupported Git tree entry.');
        return {
          mode: match[1],
          kind: match[2],
          blob: match[3],
          bytes: match[4] === '-' ? 0 : Number(match[4]),
          path: match[5],
        };
      });
    const omissions = new Map<string, SourceOmission>();
    const omit = (reason: string, path: string) => {
      const record = omissions.get(reason) ?? { reason, count: 0, examples: [] };
      record.count++;
      if (record.examples.length < 8) record.examples.push(path.slice(0, 500));
      omissions.set(reason, record);
    };
    const terms = [...new Set(goal.toLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) ?? [])].slice(0, 60);
    let eligible = entries
      .filter((entry) => {
        const reason = excluded(entry);
        if (reason) omit(reason, entry.path);
        return !reason;
      })
      .map((entry) => ({ ...entry, ...priority(entry.path, terms) }));
    const files: SourceFile[] = [];
    const groups = new Map<string, number>();
    let totalBytes = 0;
    let blobReads = 0;
    while (eligible.length) {
      signal.throwIfAborted();
      if (files.length >= evidenceLimits.files || blobReads >= evidenceLimits.blobReads) {
        for (const entry of eligible)
          omit(
            files.length >= evidenceLimits.files
              ? 'File count evidence limit'
              : 'Git blob read limit',
            entry.path,
          );
        break;
      }
      eligible = eligible.filter((entry) => {
        if (totalBytes + entry.bytes <= evidenceLimits.totalBytes) return true;
        omit('Total evidence byte limit', entry.path);
        return false;
      });
      if (!eligible.length) break;
      const weighted = (entry: (typeof eligible)[number]) =>
        entry.score - (groups.get(entry.group) ?? 0) * 12;
      const best = eligible.reduce(
        (best, entry, i) =>
          weighted(entry) > weighted(eligible[best]) ||
          (weighted(entry) === weighted(eligible[best]) && entry.path < eligible[best].path)
            ? i
            : best,
        0,
      );
      const [entry] = eligible.splice(best, 1);
      blobReads++;
      const bytes = await readGit(
        root.repository,
        ['cat-file', 'blob', entry.blob],
        signal,
        evidenceLimits.fileBytes + 1024,
      );
      if (bytes.length !== entry.bytes) throw new Error('Git blob size changed.');
      let content: string;
      try {
        content = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
      } catch {
        omit('Non-UTF-8 file content', entry.path);
        continue;
      }
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(content)) {
        omit('Binary file content', entry.path);
        continue;
      }
      files.push({
        id: `file-${files.length + 1}`,
        path: entry.path,
        blob: entry.blob,
        bytes: bytes.length,
        content,
        lineCount: content.split('\n').length,
      });
      totalBytes += bytes.length;
      groups.set(entry.group, (groups.get(entry.group) ?? 0) + 1);
    }
    const visible = entries
      .filter((e) => !/[\x00-\x1f\x7f\\]/.test(e.path) && e.path.length <= 500)
      .map((e) => e.path);
    return {
      ...root,
      capturedAt: new Date().toISOString(),
      trackedEntries: entries.length,
      tree: visible.slice(0, evidenceLimits.treePaths),
      treeTruncated: visible.length > evidenceLimits.treePaths,
      files,
      omissions: [...omissions.values()],
      notices: [
        'Only the pinned committed HEAD was inspected. Uncommitted edits and untracked files are excluded; source cleanliness was not checked.',
        'Source text and declared commands are observations of files, not evidence of working behavior. No repository program or check was executed.',
        'Evidence is bounded; omitted files, submodules, symlink targets and external resources were not inspected. Secret-looking filenames are excluded, but source text is not a general secret scanner.',
      ],
    };
  } catch (cause) {
    signal.throwIfAborted();
    throw new ProposalError(
      'repository',
      'Committed source evidence could not be read within the size/time limits. Use a smaller accessible repository or resolve missing Git objects, then retry. No repository program was executed.',
      { cause },
    );
  }
}

/** Materialize observations from actual Git bytes, never model-written paraphrases. */
export function sourceObservation(
  snapshot: RepositorySnapshot,
  ref: SourceReference,
): SourceObservation {
  const file = snapshot.files.find((f) => f.id === ref.sourceId);
  if (
    !file ||
    ref.endLine < ref.startLine ||
    ref.endLine > file.lineCount ||
    ref.endLine - ref.startLine > 100
  )
    throw new ProposalError(
      'invalid-draft',
      'Codex cited source text outside the supplied snapshot. Generate a new draft.',
    );
  return {
    ...ref,
    path: file.path,
    blob: file.blob,
    text: file.content
      .split('\n')
      .slice(ref.startLine - 1, ref.endLine)
      .join('\n'),
  };
}
