import { ZodError } from 'zod';
import { ProposalError } from '../proposals/model.js';
import type { LaunchApiError } from '../shared/launch.js';

export class LaunchError extends Error {
  readonly recoverable = true;
  constructor(
    readonly code: LaunchApiError['code'],
    message: string,
    readonly status = 400,
    readonly runId?: string,
  ) {
    super(message);
    this.name = 'LaunchError';
  }
}

export function launchError(error: unknown): LaunchApiError {
  if (error instanceof LaunchError || error instanceof ProposalError)
    return {
      error: error.message,
      code: error.code,
      recoverable: true,
      ...(error instanceof LaunchError && error.runId ? { runId: error.runId } : {}),
    };
  if (error instanceof ZodError)
    return {
      code: 'invalid-request',
      error: 'Review the highlighted request fields and try again. No authorization was issued.',
      recoverable: true,
      issues: error.issues.map((issue) => ({
        path: issue.path.map(String).join('.'),
        message: issue.message,
      })),
    };
  return {
    error: error instanceof Error ? error.message : String(error),
    code: 'invalid-request',
    recoverable: true,
  };
}
