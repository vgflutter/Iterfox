import type { LaunchApiError } from '../shared/launch.js';
import { ZodError } from 'zod';

/** Keep structured launch errors available to the recovery UI. */
export class LaunchRequestError extends Error {
  readonly code?: LaunchApiError['code'];
  readonly issues?: LaunchApiError['issues'];
  readonly runId?: string;

  constructor(
    detail: Partial<LaunchApiError>,
    /** A transport failure cannot establish whether an authorization created a run. */
    readonly outcomeUnknown = false,
  ) {
    super(detail.error || 'The request failed. Your inputs have been kept.');
    this.name = 'LaunchRequestError';
    this.code = detail.code;
    this.issues = detail.issues;
    this.runId = detail.runId;
  }
}

export async function launchApi<T>(
  path: string,
  token: string,
  body?: unknown,
  signal?: AbortSignal,
  options: {
    timeoutMs?: number;
    onLateResponse?: (value: T) => void;
    onLateError?: (error: LaunchRequestError) => void;
  } = {},
): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) abort();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.timeoutMs ?? 30_000);
  let onAbort: () => void = () => {};
  // Bound the entire exchange, including reading the response body. The race
  // also ignores a late result from a transport that does not honor abort.
  const aborted = new Promise<never>((_, reject) => {
    onAbort = () =>
      reject(
        new LaunchRequestError(
          {
            code: timedOut ? 'timeout' : 'cancelled',
            error: timedOut
              ? 'The local runtime did not respond in time. Your inputs have been kept.'
              : 'The request was cancelled. Your inputs have been kept.',
          },
          true,
        ),
      );
    controller.signal.addEventListener('abort', onAbort, { once: true });
    if (controller.signal.aborted) onAbort();
  });
  try {
    return await Promise.race([
      aborted,
      (async () => {
        controller.signal.throwIfAborted();
        const response = await fetch(path, {
          method: body === undefined ? 'GET' : 'POST',
          headers: {
            'X-Iterfox-Token': token,
            ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
          },
          ...(body === undefined ? {} : { body: JSON.stringify(body) }),
          signal: controller.signal,
        });
        let data: unknown;
        try {
          data = await response.json();
        } catch {
          throw new LaunchRequestError(
            {
              error:
                'The local runtime returned an unreadable response. Your inputs have been kept.',
            },
            true,
          );
        }
        if (!response.ok) {
          const detail = errorDetail(data);
          const failure = new LaunchRequestError(detail, !detail.code && !detail.runId);
          if (controller.signal.aborted) options.onLateError?.(failure);
          throw failure;
        }
        if (controller.signal.aborted) options.onLateResponse?.(data as T);
        controller.signal.throwIfAborted();
        return data as T;
      })(),
    ]);
  } catch (error) {
    if (error instanceof LaunchRequestError) throw error;
    throw new LaunchRequestError(
      {
        error: 'Cannot reach the local runtime. Check the connection. Your inputs have been kept.',
      },
      true,
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
    controller.signal.removeEventListener('abort', onAbort);
  }
}

export function launchFailure(error: unknown): LaunchRequestError {
  if (error instanceof ZodError)
    return new LaunchRequestError({
      code: 'invalid-draft',
      error: 'Review the draft fields below and try preflight again. No check has been run.',
      issues: error.issues.map((issue) => ({
        path: issue.path.map(String).join('.'),
        message: issue.message,
      })),
    });
  if (error instanceof LaunchRequestError) return error;
  // Pure draft conversion can throw a ProposalError before any HTTP request.
  // Retain its code just as we retain server codes and validation issues.
  return new LaunchRequestError({
    ...errorDetail(error),
    error: error instanceof Error ? error.message : errorDetail(error).error,
  });
}

function errorDetail(value: unknown): Partial<LaunchApiError> {
  if (!value || typeof value !== 'object') return {};
  const detail = value as Partial<LaunchApiError>;
  return {
    ...(typeof detail.error === 'string' ? { error: detail.error } : {}),
    ...(typeof detail.code === 'string' ? { code: detail.code } : {}),
    ...(typeof detail.runId === 'string' ? { runId: detail.runId } : {}),
    ...(Array.isArray(detail.issues)
      ? {
          issues: detail.issues.filter(
            (issue) => issue && typeof issue.path === 'string' && typeof issue.message === 'string',
          ),
        }
      : {}),
  };
}
