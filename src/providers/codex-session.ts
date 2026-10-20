import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SessionProcesses } from './session-processes.js';
import { ProviderInterruption } from '../core/recovery.js';
import type { AgentRequest } from './provider.js';
import type { CodexProviderOptions } from './codex.js';

export type SessionRequest = Omit<AgentRequest, 'signal' | 'onThread' | 'onUsage'>;
export type SessionMessage =
  | { type: 'thread'; id: string }
  | { type: 'usage'; tokens: number }
  | { type: 'result'; result: unknown }
  | { type: 'error'; name: string; message: string };

export async function runCodexSession(
  r: AgentRequest,
  options: CodexProviderOptions,
): Promise<unknown> {
  r.signal.throwIfAborted();
  // POSIX process groups are the containment boundary used by the local/cloud
  // runners. Do not pretend that an SDK rejection proves a writer has exited.
  if (process.platform === 'win32')
    throw new Error('Supervised Codex sessions require macOS or Linux process groups.');
  const source = import.meta.url.endsWith('.ts');
  const entry = fileURLToPath(
    new URL(source ? './codex-worker.ts' : './codex-worker.js', import.meta.url),
  );
  const child = spawn(
    process.execPath,
    [...(source ? ['--import', import.meta.resolve('tsx')] : []), entry],
    { detached: true, stdio: ['ignore', 'ignore', 'ignore', 'ipc'], env: process.env },
  );
  // Install the join before any signal or result can arrive. `killed` is not a join.
  const closed = new Promise<void>((resolve) => child.once('close', () => resolve()));
  let processes: SessionProcesses | undefined;
  try {
    if (child.pid) processes = new SessionProcesses(child.pid);
  } catch {
    /* Unconfirmed census blocks recovery below. */
  }
  let failure: unknown;
  let response: unknown;
  let resolved = false;
  const { signal, onThread, onUsage, ...request } = r;
  try {
    response = await new Promise<unknown>((resolve, reject) => {
      const abort = () => reject(signal.reason);
      const fail = (error: unknown) => reject(error);
      child.once('error', fail);
      child.once('close', () => {
        if (!resolved) reject(new Error('Codex session worker exited without a result.'));
      });
      const message = (m: SessionMessage) => {
        try {
          if (m.type === 'thread') {
            processes?.inspect();
            onThread(m.id);
          } else if (m.type === 'usage') onUsage(m.tokens);
          else if (m.type === 'result') {
            resolved = true;
            resolve(m.result);
          } else if (m.type === 'error') {
            resolved = true;
            const error = new Error(m.message);
            error.name = m.name;
            reject(error);
          }
        } catch (e) {
          reject(e);
        }
      };
      child.on('message', message);
      signal.addEventListener('abort', abort, { once: true });
      child.once('close', () => signal.removeEventListener('abort', abort));
      if (signal.aborted) abort();
      else
        child.send({ request, options }, (e) => {
          if (e) reject(e);
        });
    });
  } catch (e) {
    failure = e;
  }

  let quiesced = false;
  try {
    if (child.pid) {
      if (processes) quiesced = await processes.join();
      else {
        try {
          process.kill(-child.pid, 'SIGKILL');
        } catch {
          /* already exited */
        }
      }
    } else quiesced = true;
    if (quiesced) await closed;
  } catch {
    quiesced = false;
  }
  if (!quiesced)
    throw new ProviderInterruption(
      'Codex process group could not be joined. Inspect orphan processes before resuming.',
      'provider-abort',
      false,
    );
  if (signal.aborted)
    throw new ProviderInterruption(
      signal.reason instanceof Error ? signal.reason.message : String(signal.reason),
      'provider-abort',
      true,
    );
  if (failure) {
    const error = failure instanceof Error ? failure : new Error(String(failure));
    if (error.name === 'AbortError')
      throw new ProviderInterruption(error.message, 'provider-abort', true);
    if (
      error.name === 'Error' &&
      !/\b(?:401|403|unauthorized|forbidden|authentication|permission|sandbox|configuration|policy)\b/i.test(
        error.message,
      ) &&
      /stream disconnected before completion|connection (?:reset|closed)|ECONNRESET|ETIMEDOUT|temporarily unavailable|network error|error sending request/i.test(
        error.message,
      )
    )
      throw new ProviderInterruption(error.message, 'transport', true);
    throw error;
  }
  return response;
}
