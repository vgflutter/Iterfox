import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { lstat, opendir, realpath, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { z } from 'zod';
import { repositoryHead } from '../proposals/evidence.js';
import type { BrowseRepositoriesResponse } from '../shared/launch.js';
import { LaunchError } from './errors.js';

const execute = promisify(execFile);
export const localPathSchema = z
  .string()
  .trim()
  .min(1)
  .max(4096)
  .refine((path) => !path.includes('\0'), 'A local path without null characters is required');
const browseSchema = z.object({ path: localPathSchema.optional() }).strict();
const repositoryTimeoutMs = 15_000;

/** Fixed built-in reads only; disable optional locks, fsmonitor, hooks and lazy fetches. */
async function readGit(repository: string, args: string[], signal: AbortSignal): Promise<string> {
  signal.throwIfAborted();
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
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
      timeout: 10_000,
      maxBuffer: 4 * 1024 * 1024,
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
  return stdout.trimEnd();
}

/** Bound the response even if a local filesystem operation stops responding. */
export async function inspectWithinDeadline<T>(
  inspect: (signal: AbortSignal) => Promise<T>,
  outer?: AbortSignal,
): Promise<T> {
  const deadline = new AbortController();
  const signal = outer ? AbortSignal.any([outer, deadline.signal]) : deadline.signal;
  let onAbort: () => void = () => {};
  const aborted = new Promise<never>((_, reject) => {
    onAbort = () =>
      reject(
        new LaunchError(
          outer?.aborted ? 'cancelled' : 'timeout',
          outer?.aborted
            ? 'Repository inspection was cancelled. Keep your inputs and retry.'
            : 'Repository inspection timed out. Choose an accessible local folder and retry.',
          408,
        ),
      );
    signal.addEventListener('abort', onAbort, { once: true });
    if (signal.aborted) onAbort();
  });
  const timer = setTimeout(() => deadline.abort(), repositoryTimeoutMs);
  timer.unref();
  try {
    return await Promise.race([
      aborted,
      Promise.resolve().then(() => {
        signal.throwIfAborted();
        return inspect(signal);
      }),
    ]);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', onAbort);
  }
}

export async function inspectLocalRepository(repository: string, signal?: AbortSignal) {
  return inspectWithinDeadline(async (inspection) => {
    const root = await repositoryHead(localPathSchema.parse(repository), inspection);
    try {
      const sourceBranch = await readGit(root.repository, ['branch', '--show-current'], inspection);
      const dirty = Boolean(await readGit(root.repository, ['status', '--porcelain'], inspection));
      const current = await repositoryHead(root.repository, inspection);
      if (current.head !== root.head || current.repository !== root.repository)
        throw new LaunchError(
          'head-changed',
          'Repository HEAD changed during preflight. Review a new preflight.',
          409,
        );
      return { ...root, sourceBranch, dirty };
    } catch (error) {
      if (error instanceof LaunchError) throw error;
      inspection.throwIfAborted();
      throw new LaunchError(
        'repository',
        'Git preflight inspection failed. Check folder permissions and repository state, then retry. No run was created.',
      );
    }
  }, signal);
}

/** This browser lists folders only. Source files and repository programs are never opened. */
export async function browseRepositories(
  input: unknown,
  outer?: AbortSignal,
): Promise<BrowseRepositoriesResponse> {
  const request = browseSchema.parse(input);
  return inspectWithinDeadline(async (signal) => {
    let path: string;
    try {
      path = await realpath(resolve(request.path ?? homedir()));
      signal.throwIfAborted();
      if (!(await stat(path)).isDirectory()) throw new Error('Not a directory');
    } catch {
      signal.throwIfAborted();
      throw new LaunchError(
        'repository',
        'This folder is unavailable. Enter an accessible local directory and retry.',
      );
    }
    const directories: BrowseRepositoriesResponse['directories'] = [];
    let truncated = false;
    try {
      const directory = await opendir(path);
      let scanned = 0;
      for await (const entry of directory) {
        signal.throwIfAborted();
        if (entry.isDirectory() && entry.name !== '.git')
          directories.push({ name: entry.name, path: join(path, entry.name) });
        if (++scanned >= 5000 || directories.length >= 200) {
          truncated = true;
          break;
        }
      }
    } catch {
      signal.throwIfAborted();
      throw new LaunchError(
        'repository',
        'This folder cannot be listed. Enter a repository path directly or choose another folder.',
      );
    }
    directories.sort((a, b) => a.name.localeCompare(b.name));
    let repository: BrowseRepositoriesResponse['repository'] = null;
    let repositoryError: string | undefined;
    // A Git worktree has a .git file, while a normal checkout has a .git folder.
    const hasGit = await lstat(join(path, '.git')).then(
      () => true,
      () => false,
    );
    signal.throwIfAborted();
    if (hasGit) {
      try {
        repository = await repositoryHead(path, signal);
      } catch (error) {
        signal.throwIfAborted();
        repositoryError =
          error instanceof Error ? error.message : 'Cannot inspect this Git repository.';
      }
    }
    return {
      path,
      parent: dirname(path) === path ? null : dirname(path),
      home: homedir(),
      directories,
      repository,
      ...(repositoryError ? { repositoryError } : {}),
      truncated,
      notices: [
        'Choose a Git repository root with a committed HEAD. You can also enter its path directly.',
        'Folder listing is read-only. Symbolic-link folders are available by entering their path.',
        ...(truncated
          ? ['Only a bounded folder listing is shown. Enter the desired subfolder path directly.']
          : []),
      ],
    };
  }, outer);
}
