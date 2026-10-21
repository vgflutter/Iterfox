import { z } from 'zod';
import { contractSchema, criterionSchema, pathPrefix, type Contract } from '../core/model.js';

export const proposalRequestSchema = z
  .object({
    repository: z
      .string()
      .trim()
      .min(1)
      .max(4096)
      .refine((s) => !s.includes('\0')),
    goal: z.string().trim().min(5).max(10_000),
  })
  .strict();

// References describe source text at one pinned commit, never a test receipt.
export const sourceReferenceSchema = z
  .object({
    sourceId: z.string().regex(/^file-[1-9][0-9]*$/),
    startLine: z.number().int().min(1),
    endLine: z.number().int().min(1),
  })
  .strict();
export type SourceReference = z.infer<typeof sourceReferenceSchema>;

const draftPath = pathPrefix.refine((p) => p.trim().length > 0 && p.length <= 500);
const argv = z
  .array(
    z
      .string()
      .min(1)
      .max(2000)
      .refine((s) => !s.includes('\0')),
  )
  .min(1)
  .max(50);
export const draftCriterionSchema = z
  .object({
    id: criterionSchema.shape.id,
    title: criterionSchema.shape.title,
    command: argv.nullable(),
    scope: z.array(draftPath).max(50),
    timeoutMs: criterionSchema.shape.timeoutMs.removeDefault(),
    sources: z.array(sourceReferenceSchema).max(8),
    rationale: z.string().min(5).max(2000),
    gap: z.string().min(5).max(2000).nullable(),
  })
  .strict();

// Deliberately broader than an executable Contract: a useful draft can have gaps.
// No verification receipts, approval, run IDs or runtime state belong here.
export const proposalDraftSchema = z
  .object({
    goal: contractSchema.shape.goal,
    criteria: z.array(draftCriterionSchema).min(1).max(30),
    allowedPaths: z.array(draftPath).min(1).max(50),
    protectedPaths: z.array(draftPath).max(50),
    supervision: z
      .object({ mode: z.literal('project'), maxReviews: z.number().int().min(1).max(100) })
      .strict(),
    limits: contractSchema.shape.limits.removeDefault(),
    observations: z.array(sourceReferenceSchema).max(20),
    assumptions: z.array(z.string().min(5).max(2000)).max(20),
  })
  .strict()
  .superRefine((draft, ctx) => {
    if (new Set(draft.criteria.map((c) => c.id)).size !== draft.criteria.length)
      ctx.addIssue({ code: 'custom', message: 'Criterion IDs must be unique' });
    for (const [i, c] of draft.criteria.entries()) {
      if (c.command === null ? !c.gap?.trim() : c.gap !== null)
        ctx.addIssue({
          code: 'custom',
          path: ['criteria', i],
          message: 'A command must have no gap; a missing command needs an explicit gap',
        });
    }
  });
export type ProposalDraft = z.infer<typeof proposalDraftSchema>;
export type ProposalRequest = z.infer<typeof proposalRequestSchema>;

export interface SourceFile {
  id: string;
  path: string;
  blob: string;
  bytes: number;
  content: string;
  lineCount: number;
}
export interface SourceOmission {
  reason: string;
  count: number;
  examples: string[];
}
export interface RepositorySnapshot {
  repository: string;
  head: string;
  capturedAt: string;
  trackedEntries: number;
  tree: string[];
  treeTruncated: boolean;
  files: SourceFile[];
  omissions: SourceOmission[];
  notices: string[];
}
export interface CheckCandidate {
  id: string;
  command: string[];
  sources: SourceReference[];
  description: string;
  assumption: string | null;
}
export interface SourceObservation extends SourceReference {
  path: string;
  blob: string;
  text: string;
}
export interface Proposal {
  id: string;
  status: 'draft';
  provider: 'codex';
  originalGoal: string;
  inputKey: string;
  createdAt: string;
  repository: string;
  head: string;
  snapshot: RepositorySnapshot;
  draft: ProposalDraft;
  observations: SourceObservation[];
  checkStatus: 'not-run';
  authorizationRequired: true;
  usage: { inputTokens: number; outputTokens: number };
  notices: string[];
}
export type ProposalStage = 'collecting' | 'securing' | 'generating' | 'validating' | 'ready';
export interface ProposalProgress {
  stage: ProposalStage;
  message: string;
}

export type ProposalErrorCode =
  | 'invalid-request'
  | 'repository'
  | 'boundary'
  | 'codex'
  | 'invalid-draft'
  | 'cancelled'
  | 'timeout'
  | 'head-changed';
export class ProposalError extends Error {
  readonly recoverable = true;
  constructor(
    readonly code: ProposalErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ProposalError';
  }
}

/** Pure conversion for reviewed edits. It neither preflights nor creates a run. */
export function proposalToContract(input: unknown): Contract {
  const draft = proposalDraftSchema.parse(input);
  const gaps = draft.criteria.filter((c) => c.command === null);
  if (gaps.length)
    throw new ProposalError(
      'invalid-draft',
      `Supply and review exact check arguments for ${gaps.map((c) => c.id).join(', ')} before preflight. No check has been run.`,
    );
  return contractSchema.parse({
    goal: draft.goal,
    criteria: draft.criteria.map(({ id, title, command, scope, timeoutMs }) => ({
      id,
      title,
      command,
      scope,
      timeoutMs,
    })),
    allowedPaths: draft.allowedPaths,
    protectedPaths: draft.protectedPaths,
    supervision: draft.supervision,
    limits: draft.limits,
  });
}
