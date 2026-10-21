import { ZodError } from 'zod';
import {
  projectDocumentSchema,
  projectHandoffSchema,
  projectContinuationSchema,
  type ProjectApiError,
} from '../shared/projects.js';

export class ProjectRequestError extends Error {
  constructor(
    message: string,
    readonly status = 0,
    readonly detail?: Partial<ProjectApiError>,
    readonly uncertain = false,
  ) {
    super(message);
    this.name = 'ProjectRequestError';
  }
}

/** Reads may be retried; writes are never retried automatically. */
export async function projectApi<T>(
  path: string,
  token: string,
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) abort();
  const timer = setTimeout(abort, 30_000);
  let rejectAbort: () => void = () => {};
  const aborted = new Promise<never>((_, reject) => {
    rejectAbort = () =>
      reject(
        new ProjectRequestError(
          'The runtime did not respond. Your edits are kept. Inspect saved projects and history before retrying a save.',
          0,
          undefined,
          body !== undefined,
        ),
      );
    controller.signal.addEventListener('abort', rejectAbort, { once: true });
    if (controller.signal.aborted) rejectAbort();
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
        } catch (error) {
          // An HTTP rejection (especially an expired token) stays actionable
          // even if its error body is missing. A lost success body is uncertain.
          if (response.ok) throw error;
        }
        controller.signal.throwIfAborted();
        if (!response.ok) {
          const detail =
            data && typeof data === 'object' ? (data as Partial<ProjectApiError>) : undefined;
          throw new ProjectRequestError(
            typeof detail?.error === 'string'
              ? detail.error
              : response.status === 403
                ? 'Authorization token required. Reconnect to the runtime; your edits are kept.'
                : 'Project request failed. Your edits are kept.',
            response.status,
            detail,
            (response.status >= 500 || response.status === 408) && body !== undefined,
          );
        }
        const schema =
          body !== undefined && path.endsWith('/handoffs')
            ? projectHandoffSchema
            : path.endsWith('/continuations')
              ? projectContinuationSchema
              : (body === undefined && path === '/api/projects') || path.endsWith('/history')
                ? projectDocumentSchema.array()
                : projectDocumentSchema;
        const parsed = schema.safeParse(data);
        if (!parsed.success)
          throw new ProjectRequestError(
            'The runtime returned an unreadable project record. Your edits are kept. Inspect saved state before retrying a save.',
            response.status,
            undefined,
            body !== undefined,
          );
        return parsed.data as T;
      })(),
    ]);
  } catch (error) {
    if (error instanceof ProjectRequestError) throw error;
    throw new ProjectRequestError(
      'Cannot reach the runtime or read its response. Your edits are kept. Inspect saved projects and history before retrying a save.',
      0,
      undefined,
      body !== undefined,
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
    controller.signal.removeEventListener('abort', rejectAbort);
  }
}

export function projectFailure(error: unknown): ProjectRequestError {
  if (error instanceof ProjectRequestError) return error;
  if (error instanceof ZodError)
    return new ProjectRequestError('Review the project fields. Nothing was saved.', 400, {
      issues: error.issues.map((issue) => ({
        path: issue.path.map(String).join('.'),
        message: issue.message,
      })),
    });
  return new ProjectRequestError(
    error instanceof Error ? error.message : 'Project request failed.',
  );
}
