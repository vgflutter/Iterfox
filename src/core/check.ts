import { spawn } from 'node:child_process';
import type { Criterion } from './model.js';

export interface CheckResult {
  exitCode: number | null;
  output: string;
  durationMs: number;
  timedOut: boolean;
}
// Only user-approved argv. No model-supplied commands and no implicit shell.
export async function check(
  cwd: string,
  criterion: Criterion,
  signal: AbortSignal,
): Promise<CheckResult> {
  signal.throwIfAborted();
  const started = Date.now();
  // node:test's private child protocol must not leak into independently launched checks.
  const { NODE_TEST_CONTEXT: _testContext, ...environment } = process.env;
  return new Promise((resolve, reject) => {
    const child = spawn(criterion.command[0], criterion.command.slice(1), {
      cwd,
      env: { ...environment, CI: '1', GIT_TERMINAL_PROMPT: '0' },
      detached: process.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    let output = '';
    let timedOut = false;
    let spawnError: Error | undefined;
    let killTimer: ReturnType<typeof setTimeout> | undefined;
    const terminate = () => {
      const kill = (sig: NodeJS.Signals) => {
        try {
          if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, sig);
          else child.kill(sig);
        } catch {
          /* Already exited. */
        }
      };
      kill('SIGTERM');
      killTimer = setTimeout(() => kill('SIGKILL'), 1000);
      killTimer.unref();
    };
    const capture = (chunk: Buffer) => {
      output = (output + chunk.toString()).slice(-64_000);
    };
    child.stdout.on('data', capture);
    child.stderr.on('data', capture);
    child.on('error', (e) => {
      spawnError = e;
    });
    signal.addEventListener('abort', terminate, { once: true });
    const timer = setTimeout(() => {
      timedOut = true;
      terminate();
    }, criterion.timeoutMs);
    child.on('close', (code) => {
      clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      signal.removeEventListener('abort', terminate);
      if (signal.aborted) return reject(signal.reason ?? new Error('Check interrupted'));
      if (spawnError) output += `\n${spawnError.message}`;
      if (timedOut) output += '\nCheck timed out.';
      resolve({
        exitCode: timedOut || spawnError ? null : code,
        output,
        durationMs: Date.now() - started,
        timedOut,
      });
    });
    if (signal.aborted) terminate();
  });
}
