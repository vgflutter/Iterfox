import { z } from 'zod';

// These limits also bound full revision snapshots. Project text is context;
// none of these fields confer execution permissions or verification results.
export const projectLimits = Object.freeze({
  name: 160,
  purpose: 4000,
  audience: 2000,
  textItems: 32,
  textItem: 1000,
  milestones: 32,
  milestoneTitle: 200,
  milestoneOutcome: 4000,
  linkedRuns: 128,
  handoffs: 128,
  receiptItems: 4096,
  receiptBytes: 1_048_576,
  handoff: 4000,
  continuationSources: 4,
});

export const projectIdentifierSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/,
    'Use 1–64 literal letters, digits, hyphens or underscores',
  );

const text = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((value) => !value.includes('\0'), 'Null characters are not supported');
const textList = z.array(text(projectLimits.textItem)).max(projectLimits.textItems);
// Canonical filesystem paths must be retained literally, including whitespace
// that belongs to a directory name. Trimming them would alter repository identity.
const repositoryPath = z
  .string()
  .min(1)
  .max(4096)
  .refine((value) => !value.includes('\0'), 'Null characters are not supported');

export const projectMilestoneSchema = z
  .object({
    id: projectIdentifierSchema,
    title: text(projectLimits.milestoneTitle),
    outcome: text(projectLimits.milestoneOutcome),
    dependsOn: z.array(projectIdentifierSchema).max(projectLimits.milestones - 1),
    status: z.enum(['planned', 'active', 'reviewed']),
  })
  .strict();

export const projectMilestonesSchema = z
  .array(projectMilestoneSchema)
  .max(projectLimits.milestones)
  .superRefine((milestones, ctx) => {
    const ids = new Set(milestones.map((milestone) => milestone.id));
    if (ids.size !== milestones.length)
      ctx.addIssue({ code: 'custom', message: 'Milestone IDs must be unique' });
    if (milestones.filter((milestone) => milestone.status === 'active').length > 1)
      ctx.addIssue({ code: 'custom', message: 'At most one milestone may be active' });

    for (const [index, milestone] of milestones.entries()) {
      if (new Set(milestone.dependsOn).size !== milestone.dependsOn.length)
        ctx.addIssue({
          code: 'custom',
          path: [index, 'dependsOn'],
          message: 'Prerequisites must be unique',
        });
      for (const dependency of milestone.dependsOn)
        if (!ids.has(dependency))
          ctx.addIssue({
            code: 'custom',
            path: [index, 'dependsOn'],
            message: `Unknown prerequisite: ${dependency}`,
          });
    }

    // A Map avoids special object keys being interpreted as graph structure.
    const byId = new Map(milestones.map((milestone) => [milestone.id, milestone]));
    const visiting = new Set<string>();
    const visited = new Set<string>();
    function cycle(id: string): boolean {
      if (visiting.has(id)) return true;
      if (visited.has(id)) return false;
      visiting.add(id);
      for (const dependency of byId.get(id)?.dependsOn ?? []) if (cycle(dependency)) return true;
      visiting.delete(id);
      visited.add(id);
      return false;
    }
    if (milestones.some((milestone) => cycle(milestone.id)))
      ctx.addIssue({ code: 'custom', message: 'Milestone prerequisites must not contain cycles' });
  });

const briefFields = {
  name: text(projectLimits.name),
  purpose: text(projectLimits.purpose),
  audience: text(projectLimits.audience),
  constraints: textList,
  decisions: textList,
  hypotheses: textList,
  milestones: projectMilestonesSchema,
};

export const projectBriefSchema = z.object(briefFields).strict();
export const projectCreateSchema = z
  .object({
    ...briefFields,
    repository: repositoryPath,
    constraints: textList.default([]),
    decisions: textList.default([]),
    hypotheses: textList.default([]),
    milestones: projectMilestonesSchema.default([]),
  })
  .strict();

// The partial schema has no defaults: an omitted list must never erase its
// current value. Identity, repository and derived records are not editable here.
export const projectChangesSchema = projectBriefSchema
  .partial()
  .refine(
    (changes) => Object.values(changes).some((value) => value !== undefined),
    'At least one change is required',
  );

export const projectRevisionSchema = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
export const projectRevisionRequestSchema = z
  .object({ expectedRevision: projectRevisionSchema, changes: projectChangesSchema })
  .strict();

export const projectRunRequestSchema = z
  .object({
    expectedRevision: projectRevisionSchema,
    runId: projectIdentifierSchema,
    milestoneId: projectIdentifierSchema,
  })
  .strict();
export const projectHandoffRequestSchema = z
  .object({ expectedRevision: projectRevisionSchema, runId: projectIdentifierSchema })
  .strict();
export const projectContinuationRequestSchema = z
  .object({ expectedRevision: projectRevisionSchema, milestoneId: projectIdentifierSchema })
  .strict();

const repositoryIdentitySchema = z.object({ commonDirectory: repositoryPath }).strict();
const nodeStatusSchema = z.enum([
  'PENDING',
  'RUNNING',
  'VERIFYING',
  'PASSED',
  'ASSESSED',
  'FAILED',
  'BLOCKED',
  'STALE',
  'SKIPPED',
  'UNVERIFIED',
]);
const runStatusSchema = z.enum([
  'PREFLIGHT',
  'RUNNING',
  'PAUSED',
  'COMPLETED',
  'PARTIAL',
  'BLOCKED',
  'FAILED',
  'STOPPED',
]);
const sourceText = z.string().max(64_000);
const sourceIds = z.array(projectIdentifierSchema).max(projectLimits.receiptItems);

export const projectRunLinkSchema = z
  .object({
    runId: projectIdentifierSchema,
    milestoneId: projectIdentifierSchema,
    milestone: projectMilestoneSchema,
    projectRevision: projectRevisionSchema.min(1),
    linkedAt: z.iso.datetime(),
    sourceSeq: projectRevisionSchema.min(1),
    repository: repositoryPath,
    worktree: repositoryPath,
    repositoryIdentity: repositoryIdentitySchema,
    baseHead: z.string().min(1).max(128),
  })
  .strict();

// Minimal, lossless evidence descriptors, rather than client-authored results or
// copies of potentially large output logs. The original ledger owns the proof.
export const projectHandoffEvidenceSchema = z
  .object({
    id: projectIdentifierSchema,
    nodeId: projectIdentifierSchema,
    criterionId: projectIdentifierSchema,
    contractVersion: projectRevisionSchema.min(1),
    kind: z.enum(['deterministic', 'observed', 'ai-assessed', 'unverified']),
    status: z.enum(['passed', 'assessed', 'failed', 'stale', 'unverified', 'recorded']),
    purpose: z.literal('probe').optional(),
    createdAt: z.iso.datetime(),
    head: z.string().min(1).max(128),
    fingerprint: z.string().max(128),
    invalidatedReason: sourceText.optional(),
  })
  .strict();

export const projectHandoffSchema = z
  .object({
    id: projectIdentifierSchema,
    runId: projectIdentifierSchema,
    milestoneId: projectIdentifierSchema,
    milestone: projectMilestoneSchema,
    projectRevision: projectRevisionSchema.min(1),
    capturedAt: z.iso.datetime(),
    audit: z.literal('stored-evidence'),
    sourceSeq: projectRevisionSchema.min(1),
    sourceUpdatedAt: z.iso.datetime(),
    repository: repositoryPath,
    worktree: repositoryPath,
    repositoryIdentity: repositoryIdentitySchema,
    branch: sourceText,
    baseHead: z.string().min(1).max(128),
    contractVersion: projectRevisionSchema.min(1),
    runStatus: runStatusSchema,
    provider: z.enum(['codex', 'demo']),
    runGoal: z.string().max(10_000),
    runReason: sourceText.optional(),
    evidence: z.array(projectHandoffEvidenceSchema).max(projectLimits.receiptItems),
    criteria: z
      .array(
        z
          .object({
            id: projectIdentifierSchema,
            title: sourceText,
            status: nodeStatusSchema,
            evidenceId: projectIdentifierSchema.optional(),
          })
          .strict(),
      )
      .max(30),
    unfinishedWork: z
      .array(
        z
          .object({
            sourceId: projectIdentifierSchema,
            kind: z.enum(['criterion', 'task', 'operator-note', 'run', 'project-review']),
            title: sourceText,
            detail: sourceText,
            status: z.string().max(64),
            criterionIds: sourceIds,
          })
          .strict(),
      )
      .max(projectLimits.receiptItems),
    questions: z
      .array(
        z
          .object({
            sourceId: projectIdentifierSchema,
            text: sourceText,
            criterionIds: sourceIds,
            label: z.literal('Unverified agent question; operator reply required'),
            status: z.enum(['open', 'requires-reconciliation']),
          })
          .strict(),
      )
      .max(projectLimits.receiptItems),
    agentClaims: z
      .array(
        z
          .object({
            sourceId: projectIdentifierSchema,
            kind: z.enum([
              'task-summary',
              'project-review',
              'plan',
              'hypothesis',
              'provisional-choice',
              'finding',
            ]),
            text: sourceText,
            evidenceIds: sourceIds,
            label: z.literal('Unverified agent claim'),
          })
          .strict(),
      )
      .max(projectLimits.receiptItems),
    handoff: z.string().max(projectLimits.handoff),
    omissions: z.array(z.string().max(500)).max(32),
  })
  .strict();

export const projectDocumentSchema = z
  .object({
    ...briefFields,
    schemaVersion: z.literal(1),
    id: projectIdentifierSchema,
    revision: projectRevisionSchema.min(1),
    repository: repositoryPath,
    repositoryIdentity: repositoryIdentitySchema,
    // Defaults read snapshots written before the session-link feature existed.
    runs: z.array(projectRunLinkSchema).max(projectLimits.linkedRuns).default([]),
    handoffs: z.array(projectHandoffSchema).max(projectLimits.handoffs).default([]),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .strict();

export type ProjectMilestone = z.infer<typeof projectMilestoneSchema>;
export type ProjectBrief = z.infer<typeof projectBriefSchema>;
export type ProjectCreateRequest = z.input<typeof projectCreateSchema>;
export type ProjectChanges = z.infer<typeof projectChangesSchema>;
export type ProjectRevisionRequest = z.infer<typeof projectRevisionRequestSchema>;
export type ProjectDocument = z.infer<typeof projectDocumentSchema>;
export type ProjectRepositoryIdentity = ProjectDocument['repositoryIdentity'];
export type ProjectRunRequest = z.infer<typeof projectRunRequestSchema>;
export type ProjectRunLink = z.infer<typeof projectRunLinkSchema>;
export type ProjectHandoffRequest = z.infer<typeof projectHandoffRequestSchema>;
export type ProjectHandoff = z.infer<typeof projectHandoffSchema>;
export type ProjectHandoffEvidence = z.infer<typeof projectHandoffEvidenceSchema>;
export type ProjectContinuationRequest = z.infer<typeof projectContinuationRequestSchema>;

export const projectContinuationSchema = z
  .object({
    projectId: projectIdentifierSchema,
    projectRevision: projectRevisionSchema.min(1),
    milestoneId: projectIdentifierSchema,
    repository: repositoryPath,
    goal: z.string().min(1).max(10_000),
    handoff: z.string().max(projectLimits.handoff),
    sourceRunIds: z.array(projectIdentifierSchema).max(projectLimits.continuationSources),
    sourceHandoffIds: z.array(projectIdentifierSchema).max(projectLimits.continuationSources),
    omissions: z.array(z.string().max(4000)).max(projectLimits.receiptItems),
    authorizationRequired: z.literal(true),
  })
  .strict();

export type ProjectContinuation = z.infer<typeof projectContinuationSchema>;

export interface ProjectApiError {
  error: string;
  code:
    | 'invalid-request'
    | 'not-found'
    | 'stale-revision'
    | 'prerequisites'
    | 'repository'
    | 'storage'
    | 'run-busy'
    | 'run-changed';
  recoverable: true;
  currentRevision?: number;
  issues?: { path: string; message: string }[];
}
