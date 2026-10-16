import { z } from 'zod';

const pathPrefix = z
  .string()
  .min(1)
  .refine(
    (p) =>
      !p.startsWith('/') && !p.split('/').includes('..') && !p.includes('\\') && !p.includes('\0'),
    'Use relative, literal file or directory paths',
  );
export const criterionSchema = z
  .object({
    id: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/),
    title: z.string().min(3).max(500),
    command: z.array(z.string().min(1)).min(1).max(50),
    scope: z.array(pathPrefix).default([]),
    timeoutMs: z.number().int().min(100).max(3_600_000).default(60_000),
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
  | 'FAILED'
  | 'BLOCKED'
  | 'STALE'
  | 'SKIPPED'
  | 'UNVERIFIED';
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
  status: 'passed' | 'failed' | 'stale' | 'unverified';
  createdAt: string;
  command?: string[];
  exitCode?: number | null;
  output: string;
  durationMs: number;
  stamp: CodeStamp;
  scope: string[];
  invalidatedReason?: string;
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
  | 'verification.started'
  | 'verification.passed'
  | 'verification.failed'
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
  VERIFYING: ['PASSED', 'FAILED', 'BLOCKED'],
  UNVERIFIED: ['PASSED', 'STALE', 'BLOCKED'],
  PASSED: ['STALE'],
  FAILED: ['PENDING'],
  BLOCKED: ['PENDING', 'SKIPPED'],
  STALE: ['PENDING', 'PASSED'],
  SKIPPED: [],
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
    case 'verification.passed':
    case 'verification.failed': {
      const n = node();
      const e = d.evidence as Evidence;
      if (
        e.kind !== 'deterministic' ||
        e.nodeId !== n.id ||
        e.criterionId !== n.criterionId ||
        e.contractVersion !== s.contractVersion
      )
        throw new Error('Invalid verification evidence');
      const passed = event.type === 'verification.passed';
      if (passed !== (e.exitCode === 0 && e.status === 'passed'))
        throw new Error('Evidence does not support result');
      transition(n, passed ? 'PASSED' : 'FAILED');
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
          transition(task, 'PASSED');
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
      if (!e || e.status !== 'passed') throw new Error('Cannot invalidate evidence');
      e.status = 'stale';
      e.invalidatedReason = event.message;
      if (s.status === 'COMPLETED') {
        s.status = 'PARTIAL';
        s.reason = event.message;
        s.finishedAt = event.at;
      }
      const c = s.criteria.find((c) => c.evidenceId === e.id);
      if (c) c.status = 'STALE';
      for (const n of s.nodes.filter((n) => n.evidenceIds.includes(e.id) && n.status === 'PASSED'))
        transition(n, 'STALE');
      break;
    }
    case 'contract.proposed':
      s.revisionProposal = contractSchema.parse(d.contract);
      break;
    case 'contract.approved':
      if (!s.revisionProposal || ['RUNNING', 'PREFLIGHT', 'COMPLETED', 'FAILED'].includes(s.status))
        throw new Error('Pause or stop before approving a revision');
      if (s.evidence.some((e) => e.status === 'passed'))
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
        s.criteria.some((c) => c.status !== 'PASSED') ||
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
