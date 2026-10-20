import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { MAX_TECHNICAL_RECOVERIES, ProviderInterruption } from './recovery.js';
import {
  needsOrientation,
  heldCriteria,
  questions,
  validateDirection,
  DirectionProposalRejection,
} from './compass.js';
import { projectReviewCurrent, validateProjectReview } from './supervision.js';
import { Store } from './store.js';
import { auditChanges, changedFiles, stamp, worktreeDiff } from './workspace.js';
import { artifactRoot, readArtifact } from './artifacts.js';
import { verify } from '../verifiers/runtime.js';
import { satisfied, obsoleteOrientations, rejectedOrientations } from './model.js';
import {
  buildSchema,
  diagnosisSchema,
  planSchema,
  type AgentProvider,
  type AgentRequest,
} from '../providers/provider.js';
import type {
  Contract,
  Criterion,
  Edge,
  EventType,
  Evidence,
  RunState,
  TaskNode,
} from './model.js';

export function node(
  input: Pick<TaskNode, 'title' | 'objective' | 'reason' | 'criterionId' | 'role' | 'kind'> &
    Partial<TaskNode>,
): TaskNode {
  return { id: randomUUID(), status: 'PENDING', attempt: 1, files: [], evidenceIds: [], ...input };
}
function edge(source: string, target: string, kind: Edge['kind'] = 'next'): Edge {
  return { id: randomUUID(), source, target, kind };
}
export function initialState(
  id: string,
  contract: Contract,
  workspace: Pick<RunState, 'repository' | 'worktree' | 'branch' | 'baseHead'>,
  provider: RunState['provider'],
): RunState {
  const at = new Date().toISOString();
  return {
    id,
    seq: 0,
    goal: contract.goal,
    status: 'PREFLIGHT',
    provider,
    ...workspace,
    contract,
    contracts: [contract],
    contractVersion: 1,
    createdAt: at,
    updatedAt: at,
    nodes: [],
    edges: [],
    criteria: contract.criteria.map((c) => ({ id: c.id, status: 'PENDING' })),
    evidence: [],
    turns: 0,
    tokens: 0,
    noProgress: 0,
    planReady: false,
  };
}

export class Engine {
  private owner = randomUUID();
  private abort = new AbortController();
  private requested?: 'pause' | 'stop';
  private active = false;
  private probes = new Map<string, string>();
  constructor(
    readonly store: Store,
    readonly id: string,
    readonly provider: AgentProvider,
  ) {}
  get state(): RunState {
    return this.store.get(this.id);
  }
  emit(type: EventType, message: string, data: Record<string, unknown> = {}): RunState {
    if (this.active && this.store.lease(this.id)?.owner !== this.owner)
      throw new Error('Worker lease lost');
    return this.store.append(this.id, type, message, data);
  }
  request(action: 'pause' | 'stop'): void {
    this.requested = action;
    this.abort.abort(new Error(`Operator requested ${action}`));
  }
  private boundary(requireModelBudget = false): void {
    this.abort.signal.throwIfAborted();
    const s = this.state;
    if (Date.now() - Date.parse(s.startedAt ?? s.createdAt) >= s.contract.limits.maxDurationMs)
      throw new Error('Run duration limit reached');
    if (requireModelBudget && s.tokens >= s.contract.limits.maxTokens)
      throw new Error('Reported token budget reached');
  }
  async run(): Promise<RunState> {
    this.store.acquire(this.id, this.owner);
    this.active = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    try {
      const s = this.state;
      if (s.provider !== this.provider.name)
        throw new Error('Provider does not match the accepted preflight');
      if (s.status !== 'RUNNING') return s;
      if (s.nodes.some((n) => n.status === 'RUNNING' || n.status === 'VERIFYING')) {
        this.interrupt(
          'Previous worker ended during this activity. Inspect orphan processes before resuming.',
        );
        this.emit('workflow.recovered', 'Interrupted run recovered. Explicit resume is required.');
        return this.state;
      }
      timer = setInterval(() => {
        const control = this.store.takeControl(this.id);
        if (control) this.request(control);
        try {
          this.boundary();
        } catch (e) {
          this.abort.abort(e);
        }
      }, 100);
      await auditChanges(this.state);
      await this.refreshEvidence();
      if (needsOrientation(this.state)) await this.orient();
      else if (!this.state.planReady) await this.plan();
      while (true) {
        this.boundary();
        await this.refreshEvidence();
        for (const old of obsoleteOrientations(this.state))
          this.emit(
            'direction.superseded',
            'Obsolete orientation superseded by the validated current handoff; no implementation or acceptance skipped.',
            {
              nodeId: old.id,
              supersededBy: this.state.direction!.nodeId,
            },
          );
        if (needsOrientation(this.state)) {
          await this.orient();
          continue;
        }
        const runnable = () =>
          this.state.nodes.find(
            (n) =>
              n.kind === 'task' &&
              n.status === 'PENDING' &&
              !heldCriteria(this.state).has(n.criterionId),
          );
        let task = runnable();
        if (task?.reason.startsWith('Corrective')) {
          await this.satisfy(task.criterionId);
          continue;
        }
        if (task) {
          await this.probePlannedWork();
          this.skipSatisfiedTasks();
          if (needsOrientation(this.state)) continue;
          task = runnable();
        }
        if (task) {
          await this.build(task);
          // A criterion may span several planned activities. Diagnose only once
          // the approved plan has no remaining implementation work.
          continue;
        }
        await this.refreshEvidence();
        if (needsOrientation(this.state)) continue;
        const open = this.state.criteria.find(
          (c) => !satisfied(c.status) && !heldCriteria(this.state).has(c.id),
        );
        if (open) {
          await this.satisfy(open.id);
          continue;
        }
        await auditChanges(this.state);
        this.boundary();
        if (needsOrientation(this.state)) continue;
        if (this.state.contract.supervision) {
          const now = await stamp(this.state.worktree);
          if (!projectReviewCurrent(this.state, now) || this.state.projectNeedsReview) {
            await this.oversee();
            continue;
          }
          const last = this.state.projectReviews!.at(-1)!;
          if (last.outcome === 'needs-operator')
            throw new Error(
              `Project supervisor needs an operator decision: ${last.operatorQuestion}`,
            );
        }
        if (questions(this.state).length)
          throw new Error(
            'Independent work finished. Operator decisions remain in Project Compass; reply to continue the dependent work.',
          );
        this.emit(
          'workflow.completed',
          'All approved acceptance policies are satisfied. Consult evidence for deterministic checks and AI assessments.',
        );
        return this.state;
      }
    } catch (error) {
      const reason = this.abort.signal.aborted ? this.abort.signal.reason : error;
      const message = reason instanceof Error ? reason.message : String(reason);
      this.interrupt(message);
      try {
        await this.refreshEvidence();
      } catch {
        for (const e of this.state.evidence.filter((e) =>
          ['passed', 'assessed'].includes(e.status),
        ))
          this.emit(
            'evidence.invalidated',
            'Current code could not be fingerprinted after interruption. Evidence validity is unknown.',
            { evidenceId: e.id },
          );
      }
      if (message.includes('protected/out-of-scope') || message.includes('Git HEAD changed'))
        for (const e of this.state.evidence.filter((e) =>
          ['passed', 'assessed'].includes(e.status),
        ))
          this.emit(
            'evidence.invalidated',
            'Verification integrity was violated. Review the worktree before certifying any further result.',
            { evidenceId: e.id },
          );
      if (this.requested)
        this.emit(
          this.requested === 'pause' ? 'workflow.paused' : 'workflow.stopped',
          `Operator requested ${this.requested}. ${message}`,
        );
      else this.emit('workflow.blocked', message);
      return this.state;
    } finally {
      if (timer) clearInterval(timer);
      this.store.release(this.id, this.owner);
      this.active = false;
    }
  }
  private async oversee(): Promise<void> {
    const snapshot = this.state;
    if (
      (snapshot.projectReviews?.filter((r) => r.contractVersion === snapshot.contractVersion)
        .length ?? 0) >= snapshot.contract.supervision!.maxReviews
    )
      throw new Error(
        'Project review limit reached; inspect the verified progress before extending the session.',
      );
    const code = await stamp(snapshot.worktree);
    const noteIds = (snapshot.notes ?? []).map((n) => n.id);
    const directionRevision = snapshot.direction?.revision ?? 0;
    const key = JSON.stringify({
      head: code.head,
      fingerprint: code.fingerprint,
      version: snapshot.contractVersion,
      noteIds,
      directionRevision,
      round: (snapshot.projectReviews?.length ?? 0) + 1,
    });
    let activity = snapshot.nodes.find(
      (n) =>
        n.title === 'Review the project against its goal' &&
        n.objective === key &&
        ['PENDING', 'PASSED'].includes(n.status),
    );
    if (!activity) {
      activity = node({
        kind: 'decision',
        role: 'planner',
        title: 'Review the project against its goal',
        objective: key,
        reason: 'A verified milestone triggers autonomous discovery of the next useful work.',
        criterionId: snapshot.criteria[0].id,
      });
      this.emit('task.planned', activity.title, { node: activity });
    }
    const reviewImages: NonNullable<AgentRequest['reviewImages']> = [];
    for (const e of [...snapshot.evidence]
      .reverse()
      .filter((e) => ['passed', 'assessed'].includes(e.status)))
      for (const a of e.artifacts ?? [])
        if (a.mime === 'image/png' && a.bytes <= 4 * 1024 * 1024 && reviewImages.length < 6) {
          await readArtifact(artifactRoot(this.store.path), a);
          reviewImages.push({
            path: resolve(artifactRoot(this.store.path), a.path),
            name: a.name,
            evidenceId: e.id,
          });
        }
    const proposal =
      activity.result?.proposal ??
      (await this.invoke('oversee', activity, undefined, reviewImages));
    const result = validateProjectReview(snapshot, proposal, code);
    await auditChanges(this.state);
    const after = await stamp(this.state.worktree);
    if (after.head !== code.head || after.fingerprint !== code.fingerprint)
      throw new Error(
        'The project changed during read-only supervision; inspect and resume before using this review.',
      );
    if (!activity.result)
      this.emit('task.completed', result.summary, {
        nodeId: activity.id,
        summary: result.summary,
        result: { proposal: result, stamp: code, noteIds, directionRevision },
      });
    if (
      result.outcome === 'continue' &&
      this.state.noProgress >= this.state.contract.limits.maxNoProgress
    )
      throw new Error(
        'Project no-progress limit reached; repeated work produced no observable file changes.',
      );
    this.emit(
      'project.reviewed',
      result.outcome === 'continue'
        ? `Project supervisor discovered ${result.tasks.length} next implementation unit(s) from the result.`
        : result.outcome === 'ready'
          ? 'Project supervisor considers the goal ready for operator review; this is an AI judgment, not independent proof.'
          : `Project work awaits a decision: ${result.operatorQuestion}`,
      { nodeId: activity.id },
    );
  }
  private async orient(): Promise<void> {
    while (true) {
      this.boundary();
      // Audit at every boundary, including after rejection and before another
      // provider call. An invalid proposal cannot hide a protected edit.
      await auditChanges(this.state);
      const snapshot = this.state;
      const rejected = rejectedOrientations(snapshot);
      if (rejected.length >= snapshot.contract.limits.maxAttempts)
        throw new Error(
          `Direction proposal attempt limit reached (${snapshot.contract.limits.maxAttempts}): ${rejected.at(-1)!.error}`,
        );
      const lastRejection = rejected.at(-1);
      const failure = lastRejection
        ? `Direction proposal rejected (attempt ${lastRejection.attempt} of ${snapshot.contract.limits.maxAttempts}): ${lastRejection.error}. Correct the orientation using the supplied current handoff snapshot, including any newer notes. Account for each active note exactly once. Use only approved criterion IDs; waitsFor must not contain a self dependency or a cycle. Keep existing operator questions and all their held criteria until a linked operator reply. The rejected proposal was not activated and supplies no work or evidence.`
        : undefined;
      const sourceIds = (snapshot.notes ?? []).map((n) => n.id);
      const key = JSON.stringify({ sourceIds, version: snapshot.contractVersion });
      let planner = snapshot.nodes.find(
        (n) =>
          n.role === 'planner' &&
          n.objective === key &&
          n.title === 'Reconcile the project direction' &&
          ['PENDING', 'PASSED'].includes(n.status),
      );
      if (!planner) {
        // Do not create another activity when the original model budget is
        // already exhausted. invoke also checks immediately before the call.
        this.boundary(true);
        if (snapshot.turns >= snapshot.contract.limits.maxTurns)
          throw new Error('Agent turn limit reached');
        planner = node({
          kind: 'decision',
          role: 'planner',
          title: 'Reconcile the project direction',
          objective: key,
          criterionId: snapshot.criteria[0].id,
          attempt: rejected.length + 1,
          reason: 'Operator handoff changed; reconcile once at an activity boundary.',
        });
        this.emit('task.planned', planner.title, { node: planner });
      }
      // Snapshot and result survive interruption; a completed planning turn is never paid for twice.
      // Provider failures are outside the validation catch and always block.
      const proposal =
        planner.result?.proposal ??
        (await this.invoke('orient', planner, failure, undefined, snapshot.notes));
      let rejection: DirectionProposalRejection | undefined;
      try {
        validateDirection(snapshot, proposal, sourceIds);
      } catch (error) {
        if (!(error instanceof DirectionProposalRejection)) {
          await auditChanges(this.state);
          throw error;
        }
        rejection = error;
        this.emit('direction.rejected', `Direction proposal rejected: ${error.message}`, {
          nodeId: planner.id,
          proposal,
          sourceIds,
          reason: error.message,
        });
      }
      // Preserve the rejected response even when this audit blocks correction.
      await this.refreshEvidence();
      await auditChanges(this.state);
      this.boundary();
      if (rejection) continue;
      if (!planner.result)
        this.emit(
          'task.completed',
          'Handoff consolidated; no completion or acceptance is implied.',
          {
            nodeId: planner.id,
            summary: 'Direction proposal mapped to the unchanged acceptance contract.',
            result: { proposal, sourceIds },
          },
        );
      this.emit(
        'direction.compiled',
        'Project direction updated. Unstarted work replaced; independent work can continue while operator questions wait.',
        {
          nodeId: planner.id,
          sourceIds,
        },
      );
      return;
    }
  }
  private interrupt(message: string): void {
    for (const n of this.state.nodes.filter((n) => ['RUNNING', 'VERIFYING'].includes(n.status)))
      this.emit('task.interrupted', message, { nodeId: n.id });
  }
  private async invoke(
    mode: AgentRequest['mode'],
    activity: TaskNode,
    failure?: string,
    reviewImages?: AgentRequest['reviewImages'],
    handoffSnapshot?: RunState['notes'],
  ): Promise<unknown> {
    this.boundary(true);
    if (this.state.turns >= this.state.contract.limits.maxTurns)
      throw new Error('Agent turn limit reached');
    const previous = [...this.state.nodes]
      .filter((n) => n.endedAt && n.id !== activity.id)
      .sort((a, b) => b.endedAt!.localeCompare(a.endedAt!))[0];
    this.emit('task.started', `${activity.role}: ${activity.title}`, {
      nodeId: activity.id,
      edges: previous ? [edge(previous.id, activity.id)] : [],
    });
    try {
      return await this.callAgent(
        { mode, node: activity, failure, reviewImages },
        undefined,
        handoffSnapshot,
      );
    } catch (e) {
      if (!this.abort.signal.aborted && !(e instanceof ProviderInterruption))
        this.emit('task.failed', e instanceof Error ? e.message : String(e), {
          nodeId: activity.id,
        });
      throw e;
    }
  }
  private async callAgent(
    input: Pick<AgentRequest, 'mode' | 'node' | 'failure' | 'reviewImages' | 'assessmentInput'>,
    parentSignal?: AbortSignal,
    handoffSnapshot?: RunState['notes'],
  ): Promise<unknown> {
    let recoveryContext: string | undefined;
    while (true) {
      const timeout = AbortSignal.timeout(
        Math.min(
          this.state.contract.limits.turnTimeoutMs,
          Math.max(
            1,
            this.state.contract.limits.maxDurationMs -
              (Date.now() - Date.parse(this.state.startedAt!)),
          ),
        ),
      );
      const signal = AbortSignal.any([
        this.abort.signal,
        timeout,
        ...(parentSignal ? [parentSignal] : []),
      ]);
      try {
        const current = this.state;
        const answer = await this.provider.invoke({
          ...input,
          state: handoffSnapshot ? { ...current, notes: handoffSnapshot } : current,
          node: current.nodes.find((n) => n.id === input.node.id)!,
          signal,
          failure: [input.failure, recoveryContext].filter(Boolean).join('\n') || undefined,
          onThread: (threadId) =>
            this.emit('agent.thread', 'Codex session recorded for recovery.', {
              nodeId: input.node.id,
              threadId,
            }),
          onUsage: (tokens) => {
            if (!Number.isFinite(tokens) || tokens < 0) throw new Error('Invalid provider usage');
            this.emit('agent.usage', `${tokens} tokens reported by provider.`, { tokens });
          },
        });
        signal.throwIfAborted();
        return answer;
      } catch (e) {
        // A user control, parent verification timeout or original deadline always
        // wins, even when a provider also reports a transport interruption.
        this.checkControls();
        this.boundary();
        parentSignal?.throwIfAborted();
        const interruption =
          e instanceof ProviderInterruption
            ? e
            : timeout.aborted
              ? new ProviderInterruption(
                  'Per-turn timeout; provider process termination is unconfirmed.',
                  'turn-timeout',
                  false,
                )
              : undefined;
        if (!interruption) throw e;
        const cause = timeout.aborted ? 'turn-timeout' : interruption.kind;
        this.emit('agent.interrupted', `${cause}: ${interruption.message}`, {
          nodeId: input.node.id,
          cause,
          quiesced: interruption.quiesced,
        });
        if (!interruption.quiesced) throw interruption;
        const used = (this.state.technicalInterruptions ?? []).filter((i) => i.retriedAt).length;
        if (used >= MAX_TECHNICAL_RECOVERIES)
          throw new ProviderInterruption(
            'Technical recovery limit reached (2 per run). Inspect the recorded interruptions.',
            cause,
            true,
          );
        // Preserve partial work; invalidate obsolete receipts before auditing it.
        await this.refreshEvidence();
        await auditChanges(this.state);
        await delay(250 * (used + 1), undefined, { signal: this.abort.signal });
        this.checkControls();
        this.boundary(true);
        parentSignal?.throwIfAborted();
        if (this.state.turns >= this.state.contract.limits.maxTurns)
          throw new Error('Agent turn limit reached');
        this.emit(
          'agent.retry.started',
          `Automatic technical recovery ${used + 1}/${MAX_TECHNICAL_RECOVERIES}; previous process group joined, worktree audited, original limits retained.`,
          {
            nodeId: input.node.id,
          },
        );
        recoveryContext = `The previous call was interrupted (${cause}). Its owned process group has exited. Partial file edits were preserved and audited, not rolled back. Inspect the current files before continuing this same task; avoid blindly repeating an operation. No completion was accepted from the interrupted call. Original permissions, acceptance contract and budgets still apply.`;
      }
    }
  }
  private checkControls(): void {
    const control = this.store.takeControl(this.id);
    if (control) this.request(control);
  }
  private async plan(): Promise<void> {
    let planner = this.state.nodes.find(
      (n) =>
        n.kind === 'decision' &&
        n.role === 'planner' &&
        ['PENDING', 'PASSED'].includes(n.status) &&
        n.title === 'Plan the accepted goal' &&
        n.reason === `Operator approved acceptance contract v${this.state.contractVersion}.`,
    );
    if (!planner) {
      planner = node({
        kind: 'decision',
        role: 'planner',
        title: 'Plan the accepted goal',
        objective: this.state.goal,
        criterionId: this.state.criteria[0].id,
        reason: `Operator approved acceptance contract v${this.state.contractVersion}.`,
      });
      this.emit('task.planned', 'Read-only planning activity created.', { node: planner });
    }
    const result = planSchema.parse(planner.result ?? (await this.invoke('plan', planner)));
    if (result.tasks.some((t) => !this.state.criteria.some((c) => c.id === t.criterionId)))
      throw new Error('Planner referenced an unapproved criterion');
    await auditChanges(this.state);
    if (!planner.result)
      this.emit('task.completed', 'Plan proposal validated against the acceptance contract.', {
        nodeId: planner.id,
        summary: 'Structured plan validated; no acceptance result is implied.',
        result,
      });
    // Adjacent steps behind the same gate are one verifiable implementation unit.
    // Retain the raw planner result and every objective; never reorder dependencies.
    const legacy = this.state.nodes.some(
      (n) =>
        n.id.startsWith(`task-${planner.id}-`) &&
        n.reason === 'Validated initial plan for the accepted goal.',
    );
    const units: { index: number; tasks: typeof result.tasks }[] = [];
    for (const [index, t] of result.tasks.entries()) {
      const last = units.at(-1);
      if (!legacy && last?.tasks[0].criterionId === t.criterionId) last.tasks.push(t);
      else units.push({ index, tasks: [t] });
    }
    if (
      units.length < result.tasks.length &&
      !this.store
        .events(this.id)
        .some(
          (e) =>
            e.type === 'decision.recorded' &&
            e.data.nodeId === planner.id &&
            e.data.kind === 'plan.coalesced',
        )
    )
      this.emit(
        'decision.recorded',
        `${result.tasks.length} proposed steps grouped into ${units.length} acceptance units; adjacent steps share their original criterion and retain every objective.`,
        {
          nodeId: planner.id,
          kind: 'plan.coalesced',
          originalSteps: result.tasks.length,
          executionUnits: units.length,
        },
      );
    let previous = planner.id;
    for (const { index, tasks } of units) {
      const t = tasks[0];
      const planned = node({
        ...t,
        title:
          tasks.length === 1
            ? t.title
            : this.state.contract.criteria.find((c) => c.id === t.criterionId)!.title,
        objective:
          tasks.length === 1
            ? t.objective
            : tasks.map((step, i) => `${i + 1}. ${step.title}\n${step.objective}`).join('\n\n'),
        id: `task-${planner.id}-${index}`,
        kind: 'task',
        role: 'builder',
        reason: legacy
          ? 'Validated initial plan for the accepted goal.'
          : `Validated acceptance unit with ${tasks.length} planned step(s).`,
      });
      if (!this.state.nodes.some((n) => n.id === planned.id))
        this.emit('task.planned', planned.title, {
          node: planned,
          edges: [edge(previous, planned.id)],
        });
      previous = planned.id;
    }
    this.emit(
      'plan.accepted',
      'Runtime accepted the execution plan. Acceptance criteria are unchanged.',
    );
  }
  private skipSatisfiedTasks(): void {
    // Project intent extends beyond what regression gates happen to cover.
    if (this.state.contract.supervision) return;
    for (const task of this.state.nodes.filter(
      (n) => n.kind === 'task' && n.status === 'PENDING',
    )) {
      const criterion = this.state.criteria.find((c) => c.id === task.criterionId)!;
      const proof = this.state.evidence.find((e) => e.id === criterion.evidenceId);
      if (
        criterion.status === 'PASSED' &&
        proof?.kind === 'deterministic' &&
        proof.status === 'passed'
      )
        this.emit(
          'task.skipped',
          `No model call: ${task.title} is already covered by current deterministic acceptance evidence.`,
          { nodeId: task.id, evidenceId: proof.id },
        );
    }
  }
  private async probePlannedWork(criterionIds?: string[]): Promise<void> {
    // Cheap approved command probes can discover already-covered future work.
    // Never add speculative browser captures or model assessments to this phase.
    // The last builder may request verification after completing its task.
    // With no planned work left, ordinary acceptance owns failure/diagnosis;
    // there is no unfinished implementation that can justify a deferred probe.
    if (!this.state.nodes.some((n) => n.kind === 'task' && n.status === 'PENDING')) return;
    for (const c of this.state.contract.criteria.filter(
      (c) =>
        !c.verification &&
        !heldCriteria(this.state).has(c.id) &&
        (!criterionIds || criterionIds.includes(c.id)),
    )) {
      this.boundary();
      if (needsOrientation(this.state)) return;
      if (this.state.criteria.find((a) => a.id === c.id)!.status === 'PASSED') continue;
      const now = await stamp(this.state.worktree, c.scope);
      const cacheKey = `${this.state.contractVersion}:${now.head}:${now.fingerprint}`;
      if (this.probes.get(c.id) === cacheKey) continue;
      const verifier = this.verifier(
        c,
        'Probe while planned implementation remains; a negative observation defers correction.',
      );
      const prior = [...this.state.nodes].filter((n) => n.endedAt && n.id !== verifier.id).at(-1);
      this.emit('verification.started', `Checking existing coverage: ${c.title}`, {
        nodeId: verifier.id,
        node: verifier,
        edges: prior ? [edge(prior.id, verifier.id)] : [],
      });
      await auditChanges(this.state);
      const signal = AbortSignal.any([this.abort.signal, AbortSignal.timeout(c.timeoutMs)]);
      const evidence = await verify(
        this.state,
        verifier.id,
        c,
        artifactRoot(this.store.path),
        signal,
        () => {
          throw new Error('Plain command probes cannot record policy artifacts');
        },
        async () => {
          throw new Error('Plain command probes cannot invoke an assessor');
        },
      );
      signal.throwIfAborted();
      evidence.purpose = 'probe';
      const after = await stamp(this.state.worktree, c.scope);
      if (evidence.stamp.head !== after.head || evidence.stamp.fingerprint !== after.fingerprint)
        throw new Error(
          'An approved probe changed its inputs; inspect the check before continuing.',
        );
      if (evidence.status === 'passed')
        this.emit(
          'verification.passed',
          `${c.title}: approved command already passes on the recorded inputs.`,
          { nodeId: verifier.id, evidence },
        );
      else {
        evidence.status = 'recorded';
        this.emit(
          'verification.deferred',
          `${c.title}: not yet satisfied; planned implementation remains. No failure retry or corrective model call consumed.`,
          { nodeId: verifier.id, evidence },
        );
        this.probes.set(c.id, cacheKey);
      }
    }
  }
  private verifier(c: Criterion, reason: string): TaskNode {
    return (
      this.state.nodes.find(
        (n) => n.kind === 'verification' && n.criterionId === c.id && n.status === 'PENDING',
      ) ??
      node({
        kind: 'verification',
        role: 'verifier',
        title: c.title,
        objective: `Run approved check: ${JSON.stringify(c.command)}`,
        criterionId: c.id,
        reason,
        attempt:
          this.state.nodes.filter(
            (n) => n.kind === 'verification' && n.criterionId === c.id && n.status !== 'BLOCKED',
          ).length + 1,
      })
    );
  }
  private async build(task: TaskNode): Promise<void> {
    const before = await stamp(this.state.worktree);
    const result = buildSchema.parse(await this.invoke('build', task));
    const after = await stamp(this.state.worktree);
    const files = changedFiles(before, after);
    this.emit('code.changed', `${files.length} files changed by this activity.`, {
      nodeId: task.id,
      files,
      diff: await worktreeDiff(this.state.worktree, this.state.baseHead),
    });
    // Invalidate before the integrity audit, including when an unapproved change blocks the run.
    await this.refreshEvidence();
    await auditChanges(this.state);
    this.emit('task.completed', result.summary, {
      nodeId: task.id,
      summary: result.summary,
      files,
    });
    if (result.blocked)
      throw new Error(`Codex requested operator attention: ${result.reason || result.summary}`);
    if (result.verificationRequest) {
      const ids = [...new Set(result.verificationRequest.criterionIds)];
      for (const id of ids) {
        const criterion = this.state.contract.criteria.find((c) => c.id === id);
        if (!criterion || criterion.verification || heldCriteria(this.state).has(id))
          throw new Error(`Invalid runtime verification request: ${id}`);
      }
      this.emit(
        'decision.recorded',
        'Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.',
        { kind: 'verification.handoff', nodeId: task.id, criterionIds: ids },
      );
      // Negative probes defer diagnosis until remaining planned work is done.
      // This does not grant the builder authority to change or certify a check.
      await this.probePlannedWork(ids);
    }
    const noProgress = files.length ? 0 : this.state.noProgress + 1;
    this.emit(
      'progress.recorded',
      files.length ? 'Code fingerprint changed.' : 'No code changes observed.',
      { noProgress },
    );
  }
  async refreshEvidence(): Promise<void> {
    const review = this.state.projectReviews?.at(-1);
    if (
      this.state.contract.supervision &&
      review?.outcome === 'ready' &&
      !review.invalidatedReason
    ) {
      const now = await stamp(this.state.worktree);
      if (
        now.head !== review.stamp.head ||
        now.fingerprint !== review.stamp.fingerprint ||
        review.contractVersion !== this.state.contractVersion ||
        review.directionRevision !== (this.state.direction?.revision ?? 0) ||
        JSON.stringify(review.noteIds) !== JSON.stringify((this.state.notes ?? []).map((n) => n.id))
      )
        this.emit(
          'project.review.invalidated',
          'Project readiness is STALE: source or operator context changed after the inspected milestone.',
          { nodeId: review.nodeId },
        );
    }
    for (const e of this.state.evidence.filter((e) => ['passed', 'assessed'].includes(e.status))) {
      const now = await stamp(this.state.worktree, e.scope, e.inputs);
      let artifactsIntact = true;
      try {
        for (const a of e.artifacts ?? []) await readArtifact(artifactRoot(this.store.path), a);
      } catch {
        artifactsIntact = false;
      }
      if (
        !artifactsIntact ||
        e.contractVersion !== this.state.contractVersion ||
        now.fingerprint !== e.stamp.fingerprint ||
        now.head !== e.stamp.head
      ) {
        const changed = changedFiles(e.stamp, now);
        this.emit(
          'evidence.invalidated',
          `Evidence is STALE: ${changed.join(', ') || 'Git HEAD, acceptance version or evidence artifact changed'}. Scope: ${e.scope.join(', ') || 'all repository files'}.`,
          { evidenceId: e.id, changed },
        );
      }
    }
  }
  private async satisfy(criterionId: string): Promise<void> {
    while (true) {
      this.boundary();
      if (needsOrientation(this.state) || heldCriteria(this.state).has(criterionId)) return;
      const pendingFix = this.state.nodes.find(
        (n) =>
          n.kind === 'task' &&
          n.criterionId === criterionId &&
          n.status === 'PENDING' &&
          n.reason.startsWith('Corrective'),
      );
      if (pendingFix) await this.build(pendingFix);
      const latestEvidence = [...this.state.evidence]
        .reverse()
        .find(
          (e) => e.criterionId === criterionId && e.contractVersion === this.state.contractVersion,
        );
      if (
        latestEvidence?.status === 'failed' &&
        !this.state.nodes.some(
          (n) =>
            n.kind === 'task' &&
            n.reason.startsWith(
              `Corrective task created from failed verification ${latestEvidence.nodeId}:`,
            ) &&
            n.status !== 'PENDING',
        )
      ) {
        if (
          this.state.evidence.filter(
            (e) =>
              e.criterionId === criterionId &&
              e.contractVersion === this.state.contractVersion &&
              e.status === 'failed',
          ).length >= this.state.contract.limits.maxAttempts
        )
          throw new Error(`Retry limit reached for ${criterionId}`);
        if (this.state.noProgress >= this.state.contract.limits.maxNoProgress)
          throw new Error('No-progress limit reached; no further automatic retry');
        await this.diagnose(criterionId, latestEvidence.nodeId, latestEvidence.output);
      }
      const criterion = this.state.contract.criteria.find((c) => c.id === criterionId)!;
      const attempts = this.state.nodes.filter(
        (n) => n.kind === 'verification' && n.criterionId === criterionId && n.status !== 'BLOCKED',
      ).length;
      const failures = this.state.evidence.filter(
        (e) =>
          e.criterionId === criterionId &&
          e.contractVersion === this.state.contractVersion &&
          e.status === 'failed',
      ).length;
      if (failures >= this.state.contract.limits.maxAttempts)
        throw new Error(`Retry limit reached for ${criterion.title}`);
      const prior = [...this.state.nodes]
        .reverse()
        .find((n) => n.criterionId === criterionId && n.status !== 'PENDING');
      let verifier = this.state.nodes.find(
        (n) => n.kind === 'verification' && n.criterionId === criterionId && n.status === 'PENDING',
      );
      if (!verifier)
        verifier = node({
          kind: 'verification',
          role: 'verifier',
          title: criterion.title,
          objective: `Run approved check: ${JSON.stringify(criterion.command)}`,
          criterionId,
          attempt: attempts + 1,
          reason: failures
            ? 'Repeat the original acceptance check after correction.'
            : 'Acceptance requires runtime-owned evidence for the approved verification policy.',
        });
      this.emit('verification.started', `Verifying: ${criterion.title}`, {
        nodeId: verifier.id,
        node: verifier,
        edges: prior ? [edge(prior.id, verifier.id, failures ? 'retry' : 'next')] : [],
      });
      await auditChanges(this.state);
      const signal = AbortSignal.any([this.abort.signal, AbortSignal.timeout(criterion.timeoutMs)]);
      const evidence = await verify(
        this.state,
        verifier.id,
        criterion,
        artifactRoot(this.store.path),
        signal,
        (e) =>
          this.emit('evidence.recorded', 'Runtime captured supporting evidence.', {
            nodeId: verifier!.id,
            evidence: e,
          }),
        async (input) => {
          this.boundary(true);
          if (this.state.turns >= this.state.contract.limits.maxTurns)
            throw new Error('Agent turn limit reached');
          this.emit(
            'assessment.started',
            'Assessing the approved rubric; same integration, not independent review.',
            { nodeId: verifier!.id },
          );
          return this.callAgent(
            {
              mode: 'assess',
              node: verifier!,
              assessmentInput: input,
            },
            signal,
          );
        },
      );
      signal.throwIfAborted();
      if (evidence.status === 'unverified') {
        this.emit('evidence.recorded', 'Assessor is uncertain; operator attention is required.', {
          nodeId: verifier.id,
          evidence,
        });
        throw new Error(
          'Qualitative assessment uncertain. Review captured inputs and rubric before resuming.',
        );
      }
      const passed = evidence.status === 'passed' || evidence.status === 'assessed';
      this.emit(
        evidence.status === 'assessed'
          ? 'verification.assessed'
          : passed
            ? 'verification.passed'
            : 'verification.failed',
        evidence.status === 'assessed'
          ? `${criterion.title}: AI-assessed against the approved rubric; not a deterministic PASS.`
          : passed
            ? `${criterion.title}: approved deterministic check satisfied on recorded inputs.`
            : `${criterion.title}: verification failed.`,
        { nodeId: verifier.id, evidence },
      );
      if (passed) return;
      if (failures + 1 >= this.state.contract.limits.maxAttempts)
        throw new Error(`Retry limit reached for ${criterion.title}`);
      if (this.state.noProgress >= this.state.contract.limits.maxNoProgress)
        throw new Error('No-progress limit reached; no further automatic retry');
      if (needsOrientation(this.state)) return;
      await this.diagnose(criterionId, verifier.id, evidence.output);
    }
  }
  private async diagnose(criterionId: string, verifierId: string, failure: string): Promise<void> {
    const existing = this.state.nodes.find(
      (n) => n.kind === 'decision' && n.reason === `Runtime check ${verifierId} failed.`,
    );
    const decision =
      existing ??
      node({
        kind: 'decision',
        role: 'planner',
        title: 'Diagnose verification failure',
        objective:
          'Explain the observed failure and propose a scoped correction without changing acceptance.',
        criterionId,
        reason: `Runtime check ${verifierId} failed.`,
      });
    if (!existing)
      this.emit('diagnosis.proposed', 'A failed check requires a new decision.', {
        node: decision,
        edges: [edge(verifierId, decision.id, 'repair')],
      });
    const diagnosis = diagnosisSchema.parse(
      decision.result ?? (await this.invoke('diagnose', decision, failure)),
    );
    await auditChanges(this.state);
    if (!decision.result)
      this.emit('task.completed', diagnosis.hypothesis, {
        nodeId: decision.id,
        summary: diagnosis.hypothesis,
        result: diagnosis,
      });
    if (
      !this.store
        .events(this.id)
        .some((e) => e.type === 'decision.recorded' && e.data.nodeId === decision.id)
    )
      this.emit('decision.recorded', diagnosis.hypothesis, {
        nodeId: decision.id,
        criterionId,
        verifierId,
      });
    if (diagnosis.blocked)
      throw new Error(`Diagnosis requires operator attention: ${diagnosis.hypothesis}`);
    const corrective = node({
      id: `fix-${decision.id}`,
      kind: 'task',
      role: 'builder',
      title: diagnosis.correctiveTitle,
      objective: diagnosis.correctiveObjective,
      criterionId,
      reason: `Corrective task created from failed verification ${verifierId}: ${diagnosis.hypothesis}`,
    });
    if (!this.state.nodes.some((n) => n.id === corrective.id))
      this.emit('corrective.inserted', diagnosis.correctiveTitle, {
        node: corrective,
        edges: [edge(decision.id, corrective.id, 'repair')],
      });
    const current = this.state.nodes.find((n) => n.id === corrective.id)!;
    if (current.status === 'PENDING' && !needsOrientation(this.state)) await this.build(current);
  }
}
