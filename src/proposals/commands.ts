import { posix } from 'node:path';
import type { CheckCandidate, RepositorySnapshot, SourceFile, SourceReference } from './model.js';

const checkName = /(^|[:_-])(tests?|check|typecheck|lint|build|verify|validate)([:_-]|$)/i;
const placeholder =
  /^\s*(?:exit\s+[01]\s*;?\s*$|(?:echo|printf)\b[^\n]*(?:no tests?|not specified|not implemented))/i;
function reference(file: SourceFile, start: number, length: number): SourceReference {
  return {
    sourceId: file.id,
    startLine: file.content.slice(0, start).split('\n').length,
    endLine: file.content.slice(0, start + length).split('\n').length,
  };
}

// This is an evidence catalog, not a command runner. A model may select only an
// established argv; all other suggestions become explicit editable check gaps.
export function discoverCheckCandidates(snapshot: RepositorySnapshot): CheckCandidate[] {
  const result: CheckCandidate[] = [];
  const add = (
    command: string[],
    sources: SourceReference[],
    description: string,
    assumption: string | null = null,
  ) => {
    if (
      result.length >= 60 ||
      command.length > 50 ||
      command.some((s) => !s || s.length > 2000 || /[\x00-\x1f]/.test(s))
    )
      return;
    const existing = result.find((c) => JSON.stringify(c.command) === JSON.stringify(command));
    if (existing) {
      for (const source of sources) {
        if (
          existing.sources.length < 8 &&
          !existing.sources.some((s) => JSON.stringify(s) === JSON.stringify(source))
        )
          existing.sources.push(source);
      }
      return;
    }
    result.push({ id: `check-${result.length + 1}`, command, sources, description, assumption });
  };
  for (const file of snapshot.files.filter((f) => posix.basename(f.path) === 'package.json')) {
    let manifest: Record<string, unknown>;
    try {
      manifest = JSON.parse(file.content);
    } catch {
      continue;
    }
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) continue;
    const scripts = manifest.scripts;
    if (!scripts || typeof scripts !== 'object' || Array.isArray(scripts)) continue;
    let manager =
      typeof manifest.packageManager === 'string'
        ? /^(npm|pnpm|yarn|bun)@/.exec(manifest.packageManager)?.[1]
        : undefined;
    let assumption: string | null = null;
    const directory = posix.dirname(file.path);
    if (!manager) {
      const prefix = directory === '.' ? '' : `${directory}/`;
      const locks = [
        ['npm', 'package-lock.json'],
        ['pnpm', 'pnpm-lock.yaml'],
        ['yarn', 'yarn.lock'],
        ['bun', 'bun.lock'],
        ['bun', 'bun.lockb'],
      ].filter(([, name]) => snapshot.tree.includes(prefix + name));
      manager = locks.length === 1 ? locks[0][0] : 'npm';
      assumption =
        locks.length === 1
          ? `The package manager for ${file.path} is inferred from the committed ${prefix + locks[0][1]} filename; tool availability and dependencies are unverified.`
          : `npm is a provisional way to invoke scripts declared in ${file.path}; the repository does not establish an unambiguous package manager in the supplied evidence.`;
    }
    for (const [name, script] of Object.entries(scripts)) {
      if (
        !checkName.test(name) ||
        typeof script !== 'string' ||
        !script.trim() ||
        placeholder.test(script)
      )
        continue;
      // Locate a literal JSON declaration, including non-ASCII and escaped values.
      const escaped = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const matches = [
        ...file.content.matchAll(
          new RegExp(
            `${escaped(JSON.stringify(name))}\\s*:\\s*${escaped(JSON.stringify(script))}`,
            'g',
          ),
        ),
      ];
      const match = matches.at(-1);
      if (!match || match.index === undefined) continue;
      const prefix =
        directory === '.'
          ? []
          : [manager === 'npm' ? '--prefix' : manager === 'pnpm' ? '--dir' : '--cwd', directory];
      add(
        [manager, ...prefix, 'run', name],
        [reference(file, match.index, match[0].length)],
        `Declared package script ${name}: ${script.slice(0, 500)}. Its relevance and behavior have not been verified.`,
        assumption,
      );
    }
  }
  for (const file of snapshot.files.filter((f) => /^(Makefile|justfile)$/i.test(f.path))) {
    for (const match of file.content.matchAll(/^([a-zA-Z][a-zA-Z0-9_-]*)\s*:(?!=)/gm)) {
      if (!checkName.test(match[1]) || match.index === undefined) continue;
      add(
        [/^makefile$/i.test(file.path) ? 'make' : 'just', match[1]],
        [reference(file, match.index, match[0].length)],
        `Declared ${file.path} target ${match[1]}; recipes were not executed.`,
      );
    }
  }
  // Root documentation can establish exact commands for non-JavaScript projects.
  // Accept only simple shell argv, never expansions, operators or context changes.
  for (const file of snapshot.files.filter((f) =>
    /^(README|CONTRIBUTING)(\.(md|rst|txt))?$/i.test(f.path),
  )) {
    let fence: string | undefined;
    let shellFence = false;
    let changedDirectory = false;
    let offset = 0;
    for (const line of file.content.split('\n')) {
      const marker = /^\s*(`{3,}|~{3,})([a-zA-Z]*)\s*$/.exec(line);
      if (marker) {
        if (fence && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2]) {
          fence = undefined;
          shellFence = false;
        } else if (!fence) {
          fence = marker[1];
          shellFence = /^(sh|shell|bash|zsh|console|text)?$/.test(marker[2]);
          changedDirectory = false;
        }
      } else if (fence && shellFence) {
        const text = line.trim().replace(/^\$\s+/, '');
        if (/^cd\s/.test(text)) changedDirectory = true;
        const command = changedDirectory ? null : simpleArgv(text);
        if (command && documentedCheck(command))
          add(
            command,
            [reference(file, offset, line.length)],
            'Exact command documented in a root repository guide; applicability, tools and results are unverified.',
          );
      }
      offset += line.length + 1;
    }
  }
  return result;
}

/** Conservative tokenization for source discovery only; no shell is involved. */
function simpleArgv(text: string): string[] | null {
  if (!text || /[$`;&|<>*?{}\n\r#]/.test(text) || text.endsWith('\\')) return null;
  const args: string[] = [];
  let word = '';
  let quote = '';
  let started = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '\\' && quote !== "'") {
      if (++i >= text.length) return null;
      word += text[i];
      started = true;
    } else if (quote) {
      if (c === quote) quote = '';
      else word += c;
    } else if (c === '"' || c === "'") {
      quote = c;
      started = true;
    } else if (/\s/.test(c)) {
      if (started) {
        args.push(word);
        word = '';
        started = false;
      }
    } else {
      word += c;
      started = true;
    }
  }
  if (quote) return null;
  if (started) args.push(word);
  return args.length && args.every(Boolean) ? args : null;
}
function documentedCheck(argv: string[]): boolean {
  const executables = [
    'npm',
    'pnpm',
    'yarn',
    'bun',
    'node',
    'python',
    'python3',
    'pytest',
    'cargo',
    'go',
    'make',
    'just',
    'dotnet',
    'mvn',
    'gradle',
    './gradlew',
    'bundle',
    'rake',
    'ruff',
    'eslint',
    'tsc',
  ];
  return (
    executables.includes(argv[0]) &&
    argv.some(
      (s) =>
        checkName.test(s.replace(/^--/, '')) || ['pytest', 'tsc', 'eslint', 'ruff'].includes(s),
    )
  );
}
