import { invokeCodex, type CodexProviderOptions } from './codex.js';
import type { SessionMessage, SessionRequest } from './codex-session.js';

function send(message: SessionMessage): void {
  process.send?.(message);
}
process.once(
  'message',
  async (input: { request: SessionRequest; options: CodexProviderOptions }) => {
    try {
      const result = await invokeCodex(
        {
          ...input.request,
          signal: new AbortController().signal,
          onThread: (id) => send({ type: 'thread', id }),
          onUsage: (tokens) => send({ type: 'usage', tokens }),
        },
        input.options,
      );
      send({ type: 'result', result });
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      send({ type: 'error', name: error.name, message: error.message });
    }
    // The parent joins this entire process group, including SDK/tool descendants,
    // after receiving the result. Keep the leader alive until that join starts.
  },
);
