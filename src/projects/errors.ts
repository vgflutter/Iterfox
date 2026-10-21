import { z } from 'zod';
import type { ProjectApiError } from '../shared/projects.js';

export class ProjectError extends Error {
  constructor(
    readonly code: ProjectApiError['code'],
    message: string,
    readonly status = 400,
    readonly currentRevision?: number,
    readonly issues?: ProjectApiError['issues'],
  ) {
    super(message);
    this.name = 'ProjectError';
  }
}

export function projectError(error: ProjectError): ProjectApiError {
  return {
    error: error.message,
    code: error.code,
    recoverable: true,
    ...(error.currentRevision === undefined ? {} : { currentRevision: error.currentRevision }),
    ...(error.issues ? { issues: error.issues } : {}),
  };
}

export function parseProjectInput<T extends z.ZodType>(schema: T, input: unknown): z.output<T> {
  const result = schema.safeParse(input);
  if (!result.success)
    throw new ProjectError(
      'invalid-request',
      'Review the project fields and retry. No project changes were saved.',
      400,
      undefined,
      result.error.issues.map((issue) => ({
        path: issue.path.map(String).join('.'),
        message: issue.message,
      })),
    );
  return result.data;
}
