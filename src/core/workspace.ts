import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { lstat, readFile, readlink, realpath, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { CodeStamp, Contract, RunState } from './model.js';

const exec = promisify(execFile);
export async function git(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await exec('git', args, {
    cwd,
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
  return stdout.trimEnd();
}
export function matches(path: string, prefixes: string[]): boolean {
  return (
    prefixes.length === 0 ||
    prefixes.some(
      (p) => path === p.replace(/\/$/, '') || path.startsWith(p.replace(/\/$/, '') + '/'),
    )
  );
}
export async function stamp(cwd: string, scope: string[] = []): Promise<CodeStamp> {
  const head = await git(cwd, ['rev-parse', 'HEAD']);
  const names = (await git(cwd, ['ls-files', '-z', '--cached', '--others', '--exclude-standard']))
    .split('\0')
    .filter(Boolean);
  const files: Record<string, string> = {};
  for (const name of [...new Set(names)].sort()) {
    if (!matches(name, scope)) continue;
    try {
      const stat = await lstat(join(cwd, name));
      const bytes = stat.isSymbolicLink()
        ? `symlink:${await readlink(join(cwd, name))}`
        : await readFile(join(cwd, name));
      files[name] = createHash('sha256')
        .update(bytes)
        .update(String(stat.mode & 0o111))
        .digest('hex');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
      files[name] = 'DELETED';
    }
  }
  return {
    head,
    files,
    fingerprint: createHash('sha256').update(JSON.stringify(files)).digest('hex'),
  };
}
export function changedFiles(a: CodeStamp, b: CodeStamp): string[] {
  return [...new Set([...Object.keys(a.files), ...Object.keys(b.files)])].filter(
    (p) => a.files[p] !== b.files[p],
  );
}
export async function worktreeDiff(cwd: string, baseHead: string): Promise<string> {
  let diff = await git(cwd, ['diff', '--no-ext-diff', baseHead]);
  const additions = (await git(cwd, ['ls-files', '-z', '--others', '--exclude-standard']))
    .split('\0')
    .filter(Boolean);
  for (const name of additions) {
    const stat = await lstat(join(cwd, name));
    const content = stat.isSymbolicLink()
      ? await readlink(join(cwd, name))
      : await readFile(join(cwd, name), 'utf8');
    diff +=
      `\ndiff --git a/${name} b/${name}\nnew file\n--- /dev/null\n+++ b/${name}\n` +
      (content.includes('\0')
        ? 'Binary content omitted.\n'
        : content
            .split('\n')
            .map((l) => '+' + l)
            .join('\n'));
    if (diff.length > 250_000) break;
  }
  return diff.length > 250_000
    ? diff.slice(0, 250_000) + '\n[Diff truncated at 250,000 characters.]'
    : diff;
}
export function protectedFile(path: string, contract: Contract): boolean {
  return (
    matches(
      path,
      contract.protectedPaths.length ? contract.protectedPaths : ['__no_explicit_protection__'],
    ) ||
    /(^|\/)(tests?|__tests__|specs?|\.git|\.github|\.codex|\.agents|node_modules)(\/|$)/i.test(
      path,
    ) ||
    /(^|\/)(package(-lock)?\.json|.*lock|.*config\.[^/]+|\.env.*|\.gitignore|\.gitattributes|\.npmrc|.*\.(pem|key)|AGENTS\.md|iterfox.*\.json)$/i.test(
      path,
    ) ||
    /\.(test|spec)\.[^/]+$/i.test(path)
  );
}
export async function auditChanges(state: RunState): Promise<string[]> {
  if ((await git(state.worktree, ['rev-parse', 'HEAD'])) !== state.baseHead)
    throw new Error('Git HEAD changed. Commits and history changes require operator review.');
  const base = (await git(state.worktree, ['ls-tree', '-r', '--name-only', '-z', state.baseHead]))
    .split('\0')
    .filter(Boolean);
  const current = await stamp(state.worktree);
  const diffNames = (await git(state.worktree, ['diff', '--name-only', '-z', state.baseHead]))
    .split('\0')
    .filter(Boolean);
  const newNames = Object.keys(current.files).filter((p) => !base.includes(p));
  const changed = [...new Set([...diffNames, ...newNames])];
  const forbidden = changed.filter(
    (p) => !matches(p, state.contract.allowedPaths) || protectedFile(p, state.contract),
  );
  if (forbidden.length)
    throw new Error(
      `Unapproved edits to protected/out-of-scope files: ${forbidden.join(', ')}. Review the isolated worktree; no check will be certified.`,
    );
  return changed;
}
export async function isolate(
  repository: string,
  dataDir: string,
  id: string,
): Promise<{ repository: string; worktree: string; branch: string; baseHead: string }> {
  const repo = await realpath(repository);
  const top = await git(repo, ['rev-parse', '--show-toplevel']);
  if (top !== repo) throw new Error('Run from the Git repository root');
  const baseHead = await git(repo, ['rev-parse', 'HEAD']);
  const branch = `iterfox/${id}`;
  const worktree = resolve(dataDir, 'worktrees', id);
  await mkdir(resolve(dataDir, 'worktrees'), { recursive: true });
  await git(repo, ['worktree', 'add', '-b', branch, worktree, baseHead]);
  return { repository: repo, worktree, branch, baseHead };
}
