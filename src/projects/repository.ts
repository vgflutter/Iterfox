import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inspectWithinDeadline } from '../launch/repositories.js';
import type { ProjectRepositoryIdentity } from '../shared/projects.js';
import { ProjectError } from './errors.js';

const execute = promisify(execFile);

// Fixed built-in Git reads only. Do not inherit Git directory overrides, invoke
// repository programs or permit a lazy network fetch while binding a project.
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
      'rev-parse',
      ...args,
    ],
    {
      cwd: repository,
      signal,
      timeout: 10_000,
      maxBuffer: 16_384,
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
  return stdout.replace(/\r?\n$/, '');
}

export async function inspectProjectRepository(
  path: string,
  signal?: AbortSignal,
): Promise<{ repository: string; repositoryIdentity: ProjectRepositoryIdentity }> {
  try {
    return await inspectWithinDeadline(async (inspection) => {
      const repository = await realpath(resolve(path));
      const top = await readGit(repository, ['--show-toplevel'], inspection);
      if ((await realpath(top)) !== repository) throw new Error('Repository root required');
      const commonDirectory = await realpath(
        await readGit(repository, ['--path-format=absolute', '--git-common-dir'], inspection),
      );
      inspection.throwIfAborted();
      return { repository, repositoryIdentity: { commonDirectory } };
    }, signal);
  } catch {
    throw new ProjectError(
      'repository',
      'Choose an accessible local Git working repository root. No project changes were saved.',
    );
  }
}
