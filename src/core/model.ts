import { z } from 'zod';

export const pathPrefix = z
  .string()
  .min(1)
  .refine(
    (p) =>
      !p.startsWith('/') && !p.split('/').includes('..') && !p.includes('\\') && !p.includes('\0'),
    'Use relative, literal file or directory paths',
  );
export const visualSchema = z
  .object({
    kind: z.literal('visual'),
    url: z
      .string()
      .url()
      .refine((value) => {
        const u = new URL(value);
        return (
          u.protocol === 'http:' &&
          ['127.0.0.1', 'localhost', '[::1]'].includes(u.hostname) &&
          !u.username &&
          !u.password
        );
      }, 'Visual targets must be local HTTP origins without credentials'),
    server: z.array(z.string().min(1)).min(1).max(50).optional(),
    selector: z.string().min(1).max(500).optional(),
    baseline: pathPrefix,
    viewport: z
      .object({
        width: z.number().int().min(100).max(2560),
        height: z.number().int().min(100).max(2560),
      })
      .strict()
      .default({ width: 1280, height: 800 }),
    maxDiffRatio: z.number().min(0).max(0.2).default(0.005),
    pixelThreshold: z.number().min(0).max(1).default(0.1),
    colorScheme: z.enum(['light', 'dark']).default('light'),
  })
  .strict();
export const qualitativeSchema = z
  .object({
    kind: z.literal('qualitative'),
    rubric: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/),
            description: z.string().min(5).max(2000),
            minScore: z.number().int().min(1).max(5),
          })
          .strict(),
      )
      .min(1)
      .max(12),
    files: z.array(pathPrefix).max(8).default([]),
    instructions: z.string().max(4000).default(''),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (new Set(v.rubric.map((r) => r.id)).size !== v.rubric.length)
      ctx.addIssue({ code: 'custom', message: 'Rubric IDs must be unique' });
  });
export const criterionSchema = z
  .object({
    id: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/),
    title: z.string().min(3).max(500),
    command: z.array(z.string().min(1)).min(1).max(50),
    scope: z.array(pathPrefix).default([]),
    timeoutMs: z.number().int().min(100).max(3_600_000).default(60_000),
    verification: z.union([visualSchema, qualitativeSchema]).optional(),
  })
  .strict();
export const contractSchema = z
  .object({
    goal: z.string().min(5).max(10_000),
    criteria: z.array(criterionSchema).min(1).max(30),
    allowedPaths: z.array(pathPrefix).min(1),
    protectedPaths: z.array(pathPrefix).default([]),
    limits: z
      .object({
        maxTurns: z.number().int().min(1).max(1000).default(20),
        maxAttempts: z.number().int().min(1).max(20).default(3),
        maxDurationMs: z.number().int().min(1000).max(604_800_000).default(3_600_000),
        maxTokens: z.number().int().min(1).max(100_000_000).default(200_000),
        turnTimeoutMs: z.number().int().min(1000).max(3_600_000).default(600_000),
        maxNoProgress: z.number().int().min(1).max(20).default(2),
      })
      .strict()
      .default({
        maxTurns: 20,
        maxAttempts: 3,
        maxDurationMs: 3_600_000,
        maxTokens: 200_000,
        turnTimeoutMs: 600_000,
        maxNoProgress: 2,
      }),
  })
  .strict()
  .superRefine((c, ctx) => {
    if (new Set(c.criteria.map((x) => x.id)).size !== c.criteria.length)
      ctx.addIssue({ code: 'custom', message: 'Criterion IDs must be unique' });
  });
export type Contract = z.infer<typeof contractSchema>;
export type Criterion = z.infer<typeof criterionSchema>;
export type NodeStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'VERIFYING'
  | 'PASSED'
  | 'ASSESSED'
  | 'FAILED'
  | 'BLOCKED'
  | 'STALE'
  | 'SKIPPED'
  | 'UNVERIFIED';
export type SatisfiedStatus = 'PASSED' | 'ASSESSED';
export type RunStatus =
  'PREFLIGHT' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'PARTIAL' | 'BLOCKED' | 'FAILED' | 'STOPPED';
export type Role = 'planner' | 'builder' | 'verifier';
export interface TaskNode {
  id: string;
  kind: 'task' | 'verification' | 'decision';
  title: string;
  objective: string;
  reason: string;
  criterionId: string;
  role: Role;
  status: NodeStatus;
  attempt: number;
  summary?: string;
  error?: string;
  files: string[];
  evidenceIds: string[];
  threadId?: string;
  startedAt?: string;
  endedAt?: string;
  result?: Record<string, unknown>;
}
export interface Edge {
  id: string;
  source: string;
  target: string;
  kind: 'next' | 'repair' | 'retry' | 'supports';
}
export interface CodeStamp {
  head: string;
  fingerprint: string;
  files: Record<string, string>;
}
export interface Evidence {
  id: string;
  nodeId: string;
  criterionId: string;
  contractVersion: number;
  kind: 'deterministic' | 'observed' | 'ai-assessed' | 'unverified';
  status: 'passed' | 'assessed' | 'failed' | 'stale' | 'unverified' | 'recorded';
  purpose?: 'probe';
  createdAt: string;
  command?: string[];
  exitCode?: number | null;
  output: string;
  durationMs: number;
  stamp: CodeStamp;
  scope: string[];
  inputs?: string[];
  invalidatedReason?: string;
  artifacts?: ArtifactRef[];
  assessment?: Assessment;
  visual?: {
    diffPixels: number;
    totalPixels: number;
    diffRatio: number;
    maxDiffRatio: number;
    dimensionsMatch: boolean;
    pageErrorCount: number;
    blockedRequestCount: number;
    baselineHash: string;
    browser: string;
    platform: string;
    viewport: { width: number; height: number };
  };
}
export interface ArtifactRef {
  id: string;
  name: string;
  path: string;
  sha256: string;
  bytes: number;
  mime: 'image/png' | 'application/json' | 'text/plain';
}
export interface Assessment {
  outcome: 'sufficient' | 'insufficient' | 'uncertain';
  ratings: { id: string; score: number; explanation: string }[];
  summary: string;
  limitations: string[];
  reviewer: 'codex' | 'demo';
  independent: false;
}
export function satisfied(status: string): boolean {
  return status === 'PASSED' || status === 'ASSESSED';
}
export function assessmentSufficient(a: Assessment | undefined, c: Criterion): boolean {
  const policy = c.verification;
  return (
    policy?.kind === 'qualitative' &&
    !!a &&
    a.independent === false &&
    a.outcome === 'sufficient' &&
    a.ratings.length === policy.rubric.length &&
    new Set(a.ratings.map((r) => r.id)).size === a.ratings.length &&
    policy.rubric.every((r) =>
      a.ratings.some(
        (v) => v.id === r.id && Number.isInteger(v.score) && v.score >= r.minScore && v.score <= 5,
      ),
    )
  );
}
export interface AcceptanceState {
  id: string;
  status: NodeStatus;
  evidenceId?: string;
}
export interface RunState {
  id: string;
  seq: number;
  goal: string;
  status: RunStatus;
  provider: 'codex' | 'demo';
  repository: string;
  worktree: string;
  branch: string;
  baseHead: string;
  contract: Contract;
  contractVersion: number;
  contracts: Contract[];
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  finishedAt?: string;
  reason?: string;
  nodes: TaskNode[];
  edges: Edge[];
  criteria: AcceptanceState[];
  evidence: Evidence[];
  turns: number;
  tokens: number;
  noProgress: number;
  planReady: boolean;
  revisionProposal?: Contract;
  diff?: string;
}
export type EventType =
  | 'workflow.created'
  | 'goal.accepted'
  | 'task.planned'
  | 'task.started'
  | 'task.completed'
  | 'task.failed'
  | 'task.interrupted'
  | 'task.skipped'
  | 'verification.started'
  | 'verification.passed'
  | 'verification.failed'
  | 'verification.deferred'
  | 'verification.assessed'
  | 'evidence.recorded'
  | 'assessment.started'
  | 'diagnosis.proposed'
  | 'corrective.inserted'
  | 'decision.recorded'
  | 'evidence.invalidated'
  | 'workflow.paused'
  | 'workflow.resumed'
  | 'workflow.completed'
  | 'workflow.blocked'
  | 'workflow.failed'
  | 'workflow.stopped'
  | 'workflow.recovered'
  | 'plan.accepted'
  | 'agent.thread'
  | 'agent.usage'
  | 'code.changed'
  | 'contract.proposed'
  | 'contract.approved'
  | 'progress.recorded';
export interface RunEvent {
  schemaVersion: 1;
  id: string;
  runId: string;
  seq: number;
  at: string;
  type: EventType;
  message: string;
  data: Record<string, unknown>;
}

const transitions: Record<NodeStatus, NodeStatus[]> = {
  PENDING: ['RUNNING', 'VERIFYING', 'BLOCKED', 'SKIPPED'],
  RUNNING: ['UNVERIFIED', 'PASSED', 'FAILED', 'BLOCKED'],
  VERIFYING: ['PASSED', 'ASSESSED', 'FAILED', 'BLOCKED', 'UNVERIFIED'],
  UNVERIFIED: ['PASSED', 'ASSESSED', 'STALE', 'BLOCKED'],
  PASSED: ['STALE'],
  ASSESSED: ['STALE'],
  FAILED: ['PENDING'],
  BLOCKED: ['PENDING', 'SKIPPED'],
  STALE: ['PENDING', 'PASSED', 'ASSESSED'],
  SKIPPED: ['PENDING'],
};
export function transition(node: TaskNode, status: NodeStatus): void {
  if (!transitions[node.status].includes(status))
    throw new Error(`Illegal transition ${node.status} → ${status}`);
  node.status = status;
}

// This single pure reducer drives runtime, refresh and offline decision replay.
export function project(events: RunEvent[]): RunState {
  let state: RunState | undefined;
  for (const event of events) state = reduce(state, event);
  if (!state) throw new Error('Run not found');
  return state;
}
export function reduce(previous: RunState | undefined, event: RunEvent): RunState {
  if (event.schemaVersion !== 1 || event.seq !== (previous?.seq ?? 0) + 1)
    throw new Error('Invalid event schema or ordering');
  if (event.type === 'workflow.created') {
    if (previous) throw new Error('Workflow already exists');
    return {
      ...structuredClone(event.data.state as RunState),
      seq: event.seq,
      updatedAt: event.at,
    };
  }
  if (!previous || event.runId !== previous.id) throw new Error('Missing workflow');
  const s = structuredClone(previous);
  const d = event.data;
  const node = () => {
    const n = s.nodes.find((n) => n.id === d.nodeId);
    if (!n) throw new Error('Unknown node');
    return n;
  };
  switch (event.type) {
    case 'goal.accepted':
      if (s.status !== 'PREFLIGHT') throw new Error('Goal already accepted');
      s.status = 'RUNNING';
      s.startedAt = event.at;
      break;
    case 'workflow.resumed':
      if (!['PAUSED', 'BLOCKED', 'STOPPED', 'PARTIAL'].includes(s.status))
        throw new Error('Run cannot resume');
      s.status = 'RUNNING';
      s.reason = undefined;
      s.finishedAt = undefined;
      for (const n of s.nodes) if (n.status === 'BLOCKED') transition(n, 'PENDING');
      break;
    case 'task.planned':
    case 'corrective.inserted':
    case 'diagnosis.proposed': {
      const n = structuredClone(d.node as TaskNode);
      if (s.nodes.some((x) => x.id === n.id) || !s.criteria.some((c) => c.id === n.criterionId))
        throw new Error('Invalid planned task');
      s.nodes.push(n);
      s.edges.push(...((d.edges as Edge[]) ?? []));
      break;
    }
    case 'plan.accepted':
      s.planReady = true;
      break;
    case 'task.started':
    case 'verification.started': {
      if (s.status !== 'RUNNING') throw new Error('Run is not running');
      if (s.nodes.some((n) => n.status === 'RUNNING' || n.status === 'VERIFYING'))
        throw new Error('Only one activity may execute');
      let n = s.nodes.find((n) => n.id === d.nodeId);
      if (!n && d.node) {
        n = structuredClone(d.node as TaskNode);
        s.nodes.push(n);
      }
      if (!n) throw new Error('Unknown activity');
      s.edges.push(
        ...((d.edges as Edge[]) ?? []).filter(
          (e) => !s.edges.some((x) => x.source === e.source && x.target === e.target),
        ),
      );
      transition(n, event.type === 'task.started' ? 'RUNNING' : 'VERIFYING');
      n.startedAt = event.at;
      if (n.kind === 'task' || n.role === 'planner') s.turns++;
      if (event.type === 'verification.started')
        s.criteria.find((c) => c.id === n.criterionId)!.status = 'VERIFYING';
      break;
    }
    case 'task.completed': {
      const n = node();
      transition(n, n.role === 'builder' ? 'UNVERIFIED' : 'PASSED');
      n.summary = String(d.summary);
      n.endedAt = event.at;
      n.files = (d.files as string[]) ?? [];
      if (d.result) n.result = structuredClone(d.result as Record<string, unknown>);
      break;
    }
    case 'task.skipped': {
      const n = node();
      const c = s.criteria.find((c) => c.id === n.criterionId);
      const e = s.evidence.find((e) => e.id === d.evidenceId);
      if (
        n.kind !== 'task' ||
        n.status !== 'PENDING' ||
        c?.status !== 'PASSED' ||
        c.evidenceId !== e?.id ||
        e?.kind !== 'deterministic' ||
        e.status !== 'passed' ||
        e.contractVersion !== s.contractVersion ||
        e.criterionId !== n.criterionId
      )
        throw new Error('Skipping requires current deterministic acceptance evidence');
      transition(n, 'SKIPPED');
      n.summary = event.message;
      n.endedAt = event.at;
      n.evidenceIds.push(e.id);
      break;
    }
    case 'verification.deferred': {
      const n = node();
      const e = structuredClone(d.evidence as Evidence);
      const policy = s.contract.criteria.find((c) => c.id === n.criterionId);
      if (
        n.kind !== 'verification' ||
        n.status !== 'VERIFYING' ||
        policy?.verification ||
        e.purpose !== 'probe' ||
        e.kind !== 'deterministic' ||
        e.status !== 'recorded' ||
        e.exitCode === 0 ||
        e.nodeId !== n.id ||
        e.criterionId !== n.criterionId ||
        e.contractVersion !== s.contractVersion ||
        s.evidence.some((x) => x.id === e.id) ||
        !s.nodes.some((t) => t.kind === 'task' && t.status === 'PENDING')
      )
        throw new Error(
          'A deferred check requires unfinished planned work and a non-passing probe',
        );
      transition(n, 'UNVERIFIED');
      n.summary = event.message;
      n.endedAt = event.at;
      n.evidenceIds.push(e.id);
      s.evidence.push(e);
      const c = s.criteria.find((c) => c.id === n.criterionId)!;
      c.status = 'UNVERIFIED';
      c.evidenceId = e.id;
      break;
    }
    case 'task.failed':
    case 'task.interrupted': {
      const n = node();
      transition(n, event.type === 'task.failed' ? 'FAILED' : 'BLOCKED');
      n.error = event.message;
      n.endedAt = event.at;
      if (n.kind === 'verification')
        s.criteria.find((c) => c.id === n.criterionId)!.status = 'BLOCKED';
      break;
    }
    case 'evidence.recorded': {
      const n = node();
      const e = structuredClone(d.evidence as Evidence);
      if (
        n.status !== 'VERIFYING' ||
        e.nodeId !== n.id ||
        e.criterionId !== n.criterionId ||
        e.contractVersion !== s.contractVersion ||
        s.evidence.some((x) => x.id === e.id)
      )
        throw new Error('Invalid supporting evidence');
      s.evidence.push(e);
      n.evidenceIds.push(e.id);
      break;
    }
    case 'assessment.started':
      if (
        node().status !== 'VERIFYING' ||
        s.nodes.filter((n) => ['RUNNING', 'VERIFYING'].includes(n.status)).length !== 1
      )
        throw new Error('Assessment must belong to the active verifier');
      s.turns++;
      break;
    case 'verification.passed':
    case 'verification.assessed':
    case 'verification.failed': {
      const n = node();
      const e = d.evidence as Evidence;
      if (
        !['deterministic', 'ai-assessed'].includes(e.kind) ||
        e.nodeId !== n.id ||
        e.criterionId !== n.criterionId ||
        e.contractVersion !== s.contractVersion
      )
        throw new Error('Invalid verification evidence');
      const policy = s.contract.criteria.find((c) => c.id === n.criterionId)!;
      const assessed = event.type === 'verification.assessed';
      const passed = event.type === 'verification.passed' || assessed;
      if (
        s.evidence.some((x) => x.id === e.id) ||
        (event.type === 'verification.failed' && e.status !== 'failed')
      )
        throw new Error('Invalid final evidence status or duplicate ID');
      if (
        assessed &&
        (e.kind !== 'ai-assessed' ||
          e.exitCode !== 0 ||
          e.assessment?.reviewer !== s.provider ||
          e.status !== 'assessed' ||
          !assessmentSufficient(e.assessment, policy))
      )
        throw new Error('Assessment does not satisfy the approved rubric');
      if (
        event.type === 'verification.passed' &&
        (e.kind !== 'deterministic' || policy.verification?.kind === 'qualitative')
      )
        throw new Error('AI assessment cannot become deterministic PASS');
      if (
        event.type === 'verification.passed' &&
        policy.verification?.kind === 'visual' &&
        (!e.visual ||
          !e.artifacts?.length ||
          e.visual.diffRatio > policy.verification.maxDiffRatio ||
          !e.visual.dimensionsMatch ||
          e.visual.pageErrorCount !== 0 ||
          e.visual.blockedRequestCount !== 0 ||
          e.visual.maxDiffRatio !== policy.verification.maxDiffRatio)
      )
        throw new Error('Visual PASS requires comparison receipts');
      if (!assessed && passed !== (e.exitCode === 0 && e.status === 'passed'))
        throw new Error('Evidence does not support result');
      transition(n, assessed ? 'ASSESSED' : passed ? 'PASSED' : 'FAILED');
      n.evidenceIds.push(e.id);
      n.summary = event.message;
      n.endedAt = event.at;
      if (!passed) n.error = e.output;
      s.evidence.push(e);
      const criterion = s.criteria.find((c) => c.id === n.criterionId)!;
      criterion.status = n.status;
      criterion.evidenceId = e.id;
      if (passed)
        for (const task of s.nodes.filter(
          (t) =>
            t.kind === 'task' &&
            t.criterionId === n.criterionId &&
            ['UNVERIFIED', 'STALE'].includes(t.status),
        )) {
          transition(task, assessed ? 'ASSESSED' : 'PASSED');
          task.evidenceIds.push(e.id);
        }
      break;
    }
    case 'agent.thread':
      node().threadId = String(d.threadId);
      break;
    case 'agent.usage':
      s.tokens += Number(d.tokens);
      break;
    case 'code.changed':
      s.diff = String(d.diff);
      break;
    case 'progress.recorded':
      s.noProgress = Number(d.noProgress);
      break;
    case 'evidence.invalidated': {
      const e = s.evidence.find((e) => e.id === d.evidenceId);
      if (!e || !['passed', 'assessed'].includes(e.status))
        throw new Error('Cannot invalidate evidence');
      e.status = 'stale';
      e.invalidatedReason = event.message;
      if (s.status === 'COMPLETED') {
        s.status = 'PARTIAL';
        s.reason = event.message;
        s.finishedAt = event.at;
      }
      const c = s.criteria.find((c) => c.evidenceId === e.id);
      if (c) c.status = 'STALE';
      for (const n of s.nodes.filter((n) => n.evidenceIds.includes(e.id) && satisfied(n.status)))
        transition(n, 'STALE');
      for (const n of s.nodes.filter(
        (n) =>
          n.kind === 'task' &&
          n.status === 'SKIPPED' &&
          n.evidenceIds.includes(e.id) &&
          e.contractVersion === s.contractVersion,
      )) {
        transition(n, 'PENDING');
        n.summary =
          'Previous skip revoked because its acceptance evidence is stale; original planned work is pending again.';
        n.endedAt = undefined;
      }
      break;
    }
    case 'contract.proposed':
      s.revisionProposal = contractSchema.parse(d.contract);
      break;
    case 'contract.approved':
      if (!s.revisionProposal || ['RUNNING', 'PREFLIGHT', 'COMPLETED', 'FAILED'].includes(s.status))
        throw new Error('Pause or stop before approving a revision');
      if (s.evidence.some((e) => ['passed', 'assessed'].includes(e.status)))
        throw new Error('Invalidate old evidence before revision');
      s.contract = s.revisionProposal;
      s.goal = s.contract.goal;
      s.contractVersion++;
      s.contracts.push(s.contract);
      s.revisionProposal = undefined;
      s.planReady = false;
      for (const n of s.nodes)
        if (n.status === 'PENDING' || n.status === 'BLOCKED') {
          transition(n, 'SKIPPED');
          n.summary = `Superseded by operator-approved acceptance contract v${s.contractVersion}.`;
        }
      s.criteria = s.contract.criteria.map((c) => ({ id: c.id, status: 'PENDING' }));
      break;
    case 'workflow.completed':
      if (
        s.criteria.some((c) => !satisfied(c.status)) ||
        s.nodes.some((n) => ['RUNNING', 'VERIFYING', 'PENDING'].includes(n.status))
      )
        throw new Error('Acceptance is incomplete');
      s.status = 'COMPLETED';
      s.finishedAt = event.at;
      break;
    case 'workflow.paused':
    case 'workflow.blocked':
    case 'workflow.stopped':
    case 'workflow.failed':
    case 'workflow.recovered':
      if (s.nodes.some((n) => n.status === 'RUNNING' || n.status === 'VERIFYING'))
        throw new Error('Interrupt active nodes first');
      s.status =
        event.type === 'workflow.paused'
          ? 'PAUSED'
          : event.type === 'workflow.stopped'
            ? 'STOPPED'
            : event.type === 'workflow.failed'
              ? 'FAILED'
              : 'BLOCKED';
      s.reason = event.message;
      s.finishedAt = event.at;
      break;
    case 'decision.recorded':
      break;
  }
  s.seq = event.seq;
  s.updatedAt = event.at;
  return s;
}
