import { createHash } from 'node:crypto';
import { project, type Criterion, type RunEvent, type RunState } from '../core/model.js';
import { noteProvenance, questions } from '../core/compass.js';
import type { Store } from '../core/store.js';
import { delegationSpecSchema, type Delegation, type DelegationStage } from './service.js';

const evidenceBoundary =
  'Checkpoint evidence is historical proof from the source mission event prefix through the recorded sourceSeq. ' +
  'Later recorded state is shown separately and cannot rewrite that checkpoint. Current source freshness is unobserved: ' +
  'this read-only report does not inspect worktrees, audit evidence or rerun checks. Each future mission needs fresh verification. ' +
  'AI assessments and project reviews are claims from the same integration, not independent proof or operator acceptance. ' +
  'A checkpoint is a technical result; product review and acceptance remain with the operator.';

function eventReference(event: RunEvent) {
  return { runId: event.runId, seq: event.seq, eventId: event.id, at: event.at, type: event.type };
}

interface Ledger {
  events: RunEvent[];
  state: RunState | null;
  unavailableReason: string | null;
}

function readLedger(runs: Store, runId: string): Ledger {
  let events: RunEvent[] = [];
  try {
    events = runs.events(runId);
    const state = project(events);
    if (state.id !== runId || events.some((e) => e.runId !== runId))
      throw new Error('Source run does not match the linked mission');
    return { events, state, unavailableReason: null };
  } catch {
    // Keep a readable checkpoint prefix available even if later events cannot replay.
    return {
      events,
      state: null,
      unavailableReason: 'Linked mission history is missing or cannot be replayed.',
    };
  }
}

function checkpointSnapshot(stage: DelegationStage | undefined, ledger: Ledger | undefined) {
  const receipt = stage?.checkpoint;
  if (!receipt)
    return { state: null, events: [], unavailableReason: 'No checkpoint receipt is recorded.' };
  const events = ledger?.events.filter((e) => e.seq <= receipt.sourceSeq) ?? [];
  try {
    if (!stage?.runId || !Number.isSafeInteger(receipt.sourceSeq) || receipt.sourceSeq < 1)
      throw new Error('Checkpoint source reference is missing');
    if (events.at(-1)?.seq !== receipt.sourceSeq || events.some((e) => e.runId !== stage.runId))
      throw new Error('Checkpoint event prefix is incomplete');
    const state = project(events);
    if (state.id !== stage.runId) throw new Error('Checkpoint source run does not match');
    return { state, events, unavailableReason: null };
  } catch {
    return {
      state: null,
      events: [],
      unavailableReason:
        'The exact checkpoint source event prefix is unavailable; later mission state is not checkpoint proof.',
    };
  }
}

function sourcedEvidence(state: RunState | null, events: RunEvent[], criterionIds: string[]) {
  return (state?.evidence ?? [])
    .filter((e) => criterionIds.includes(e.criterionId))
    .map((evidence) => {
      const recorded = events.find(
        (e) => (e.data.evidence as { id?: string } | undefined)?.id === evidence.id,
      );
      return {
        ...evidence,
        source: {
          runId: state!.id,
          throughSeq: state!.seq,
          contractVersion: evidence.contractVersion,
          recordedEvent: recorded ? eventReference(recorded) : null,
        },
      };
    });
}

function describeCriteria(
  approved: Criterion[],
  criterionIds: string[],
  state: RunState | null,
  events: RunEvent[],
  basis: 'checkpoint' | 'latest-recorded-state',
) {
  const evidence = sourcedEvidence(state, events, criterionIds);
  return criterionIds.map((id) => {
    const definition = approved.find((c) => c.id === id)!;
    const recorded = state?.criteria.find((c) => c.id === id);
    const supporting = evidence.find((e) => e.id === recorded?.evidenceId) ?? null;
    return {
      ...definition,
      status: recorded?.status ?? 'UNAVAILABLE',
      basis,
      sourceRunId: state?.id ?? null,
      sourceSeq: state?.seq ?? null,
      contractVersion: state?.contractVersion ?? null,
      recordedCriterion: state?.contract.criteria.find((c) => c.id === id) ?? null,
      evidenceId: recorded?.evidenceId ?? null,
      evidence: supporting,
      unavailableReason: !recorded
        ? 'No criterion state is available at this evidence boundary.'
        : !supporting
          ? 'No supporting evidence is recorded for this criterion at this boundary.'
          : null,
    };
  });
}

interface Attention {
  kind: 'delegation-reason' | 'mission-reason' | 'question' | 'provenance-unavailable';
  text: string;
  source: {
    delegationId?: string;
    revision?: number;
    outcomeId?: string;
    outcomeIds?: string[];
    runId?: string;
    seq?: number;
    at?: string;
    noteId?: string;
    nodeId?: string;
    contractVersion?: number;
    criterionIds?: string[];
    event?: ReturnType<typeof eventReference> | null;
    noteReference?: ReturnType<typeof noteProvenance>['reference'];
  };
}

/** Saved records only: no recovery, evidence auditing, worktree access or execution. */
export async function buildDelegationBrief(runs: Store, delegationId: string) {
  // DelegationStore's constructor creates tables. Read and check the same immutable
  // approval directly so generating a brief cannot even initialize schema.
  const table = runs.db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='delegations'")
    .get();
  const row = table
    ? (runs.db.prepare('SELECT body FROM delegations WHERE id=?').get(delegationId) as
        { body: string } | undefined)
    : undefined;
  if (!row) throw new Error('Delegation not found');
  const delegation = JSON.parse(row.body) as Delegation;
  const spec = delegationSpecSchema.parse(delegation.spec);
  if (
    delegation.id !== delegationId ||
    createHash('sha256').update(JSON.stringify(spec)).digest('hex') !== delegation.specHash
  )
    throw new Error('Approved delegation integrity check failed');

  const observedAt = new Date().toISOString();
  const ledgers = new Map<string, Ledger>();
  // The approved outcomes, rather than cumulative check lists or unrelated runs,
  // define project progress and mission membership.
  for (const milestone of spec.milestones) {
    const runId = delegation.stages.find((s) => s.id === milestone.id)?.runId;
    if (runId && !ledgers.has(runId)) ledgers.set(runId, readLedger(runs, runId));
  }
  const attention: Attention[] = [];
  if (delegation.reason)
    attention.push({
      kind: 'delegation-reason',
      text: delegation.reason,
      source: { delegationId, revision: delegation.revision, at: delegation.updatedAt },
    });

  const outcomes = spec.milestones.map((milestone) => {
    const stage = delegation.stages.find((s) => s.id === milestone.id);
    const ledger = stage?.runId ? ledgers.get(stage.runId) : undefined;
    const snapshot = checkpointSnapshot(stage, ledger);
    const checkpoint = stage?.checkpoint ?? null;
    const state = checkpoint ? snapshot.state : (ledger?.state ?? null);
    const events = checkpoint ? snapshot.events : (ledger?.events ?? []);
    if (!stage || (stage.status === 'CHECKPOINTED' && !checkpoint))
      attention.push({
        kind: 'provenance-unavailable',
        text: !stage
          ? 'The approved outcome has no saved stage record.'
          : 'The saved outcome is checkpointed but its checkpoint receipt is unavailable.',
        source: { delegationId, outcomeId: milestone.id, runId: stage?.runId },
      });
    if ((checkpoint && !snapshot.state) || (stage?.runId && !ledger?.state))
      attention.push({
        kind: 'provenance-unavailable',
        text:
          checkpoint && !snapshot.state ? snapshot.unavailableReason! : ledger!.unavailableReason!,
        source: { delegationId, outcomeId: milestone.id, runId: stage?.runId },
      });
    const latest = ledger?.state;
    return {
      id: milestone.id,
      title: milestone.title,
      outcome: milestone.outcome,
      dependsOn: milestone.dependsOn,
      status: stage?.status ?? 'UNAVAILABLE',
      runId: stage?.runId ?? null,
      checkpoint,
      checkpointEvidence: {
        status: snapshot.state ? 'AVAILABLE' : checkpoint ? 'UNAVAILABLE' : 'NOT_RECORDED',
        sourceRunId: stage?.runId ?? null,
        sourceSeq: checkpoint?.sourceSeq ?? null,
        contractVersion: snapshot.state?.contractVersion ?? null,
        runStatus: snapshot.state?.status ?? null,
        boundaryEvent: snapshot.events.length ? eventReference(snapshot.events.at(-1)!) : null,
        unavailableReason: snapshot.unavailableReason,
      },
      criteria: describeCriteria(
        spec.contract.criteria,
        milestone.criterionIds,
        state,
        events,
        checkpoint ? 'checkpoint' : 'latest-recorded-state',
      ),
      evidence: sourcedEvidence(state, events, milestone.criterionIds),
      latestRecordedState: {
        availability: latest ? 'AVAILABLE' : 'UNAVAILABLE',
        unavailableReason:
          ledger?.unavailableReason ?? (stage?.runId ? null : 'No mission is linked yet.'),
        runId: stage?.runId ?? null,
        seq: latest?.seq ?? null,
        at: latest?.updatedAt ?? null,
        status: latest?.status ?? null,
        reason: latest?.reason ?? null,
        contractVersion: latest?.contractVersion ?? null,
        hasLaterEvents: latest && checkpoint ? latest.seq > checkpoint.sourceSeq : null,
        criteria: describeCriteria(
          spec.contract.criteria,
          milestone.criterionIds,
          latest ?? null,
          ledger?.events ?? [],
          'latest-recorded-state',
        ),
      },
    };
  });

  for (const [runId, ledger] of ledgers) {
    const state = ledger.state;
    if (!state) continue;
    const source = {
      runId,
      seq: state.seq,
      at: state.updatedAt,
      contractVersion: state.contractVersion,
      outcomeIds: outcomes.filter((o) => o.runId === runId).map((o) => o.id),
    };
    if (state.reason) attention.push({ kind: 'mission-reason', text: state.reason, source });
    for (const question of questions(state)) {
      const note = state.notes?.find((n) => n.id === question.noteId);
      const event = ledger.events.find(
        (e) => e.type === 'direction.compiled' && e.data.nodeId === state.direction?.nodeId,
      );
      attention.push({
        kind: 'question',
        text: question.reason,
        source: {
          ...source,
          noteId: question.noteId,
          nodeId: state.direction!.nodeId,
          criterionIds: question.criterionIds,
          event: event ? eventReference(event) : null,
          noteReference: note ? noteProvenance(state, note).reference : undefined,
        },
      });
    }
    const review = state.projectReviews?.at(-1);
    // A review question is current only for its recorded operator-note snapshot.
    // Later notes require a new review; never resurrect an older review question.
    if (
      review?.outcome === 'needs-operator' &&
      !review.invalidatedReason &&
      review.contractVersion === state.contractVersion &&
      JSON.stringify(review.noteIds) === JSON.stringify((state.notes ?? []).map((n) => n.id))
    ) {
      const event = ledger.events.find(
        (e) => e.type === 'project.reviewed' && e.data.nodeId === review.nodeId,
      );
      attention.push({
        kind: 'question',
        text: review.operatorQuestion,
        source: {
          ...source,
          nodeId: review.nodeId,
          at: review.at,
          event: event ? eventReference(event) : null,
        },
      });
    }
  }

  const states = [...ledgers.values()].flatMap((l) => (l.state ? [l.state] : []));
  const turns = states.reduce((sum, s) => sum + s.turns, 0);
  const tokens = states.reduce((sum, s) => sum + s.tokens, 0);
  const unavailableRunIds = [...ledgers].filter(([, l]) => !l.state).map(([id]) => id);
  const elapsedMs = Math.max(0, Date.parse(observedAt) - Date.parse(delegation.authorizedAt));
  const completedOutcomeCount = outcomes.filter((o) => o.status === 'CHECKPOINTED').length;
  return {
    schemaVersion: 1 as const,
    delegationId,
    goal: spec.contract.goal,
    status: delegation.status,
    reason: delegation.reason ?? null,
    requiresProductReview: true as const,
    productAcceptance:
      'Not established by technical checkpoints; operator product review is required.',
    revision: delegation.revision,
    updatedAt: delegation.updatedAt,
    authorizedAt: delegation.authorizedAt,
    observedAt,
    approval: {
      specHash: delegation.specHash,
      sourceHead: delegation.sourceHead,
      repository: spec.repository,
      provider: delegation.provider,
    },
    completedOutcomeCount,
    pendingOutcomeCount: outcomes.length - completedOutcomeCount,
    limits: spec.contract.limits,
    usage: {
      turns,
      tokens,
      runIds: [...ledgers.keys()],
      unavailableRunIds,
      complete: unavailableRunIds.length === 0,
      missions: [...ledgers].map(([runId, l]) => ({
        runId,
        sourceSeq: l.state?.seq ?? null,
        turns: l.state?.turns ?? null,
        tokens: l.state?.tokens ?? null,
      })),
      authorizedAt: delegation.authorizedAt,
      observedAt,
      elapsedMs,
      authorizationDeadline: new Date(
        Date.parse(delegation.authorizedAt) + spec.contract.limits.maxDurationMs,
      ).toISOString(),
      remainingDurationMs: Math.max(0, spec.contract.limits.maxDurationMs - elapsedMs),
      remainingTurns: unavailableRunIds.length
        ? null
        : Math.max(0, spec.contract.limits.maxTurns - turns),
      remainingTokens: unavailableRunIds.length
        ? null
        : Math.max(0, spec.contract.limits.maxTokens - tokens),
      accounting:
        'Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable.',
    },
    outcomes,
    attention,
    sourceFreshness: {
      status: 'UNOBSERVED' as const,
      explanation:
        'No current source files, Git refs or evidence artifacts were inspected or verified to generate this report.',
    },
    evidenceBoundary,
  };
}

export type DelegationBrief = Awaited<ReturnType<typeof buildDelegationBrief>>;

function text(value: string): string {
  return value.replace(/[\\`*_{}\[\]<>#|]/g, '\\$&').replace(/\r?\n/g, ' ');
}

function fenced(value: string, language = ''): string {
  let longest = 2;
  for (const match of value.matchAll(/`+/g)) longest = Math.max(longest, match[0].length);
  const fence = '`'.repeat(longest + 1);
  return `${fence}${language}\n${value}\n${fence}`;
}

/** Portable saved-record export; rendering performs no I/O. */
export function renderDelegationBriefMarkdown(brief: DelegationBrief): string {
  const lines = [
    '# Project brief',
    '',
    `Delegation: ${text(brief.delegationId)}; saved status: ${brief.status}; revision: ${brief.revision}.`,
    `Saved update: ${brief.updatedAt}; report observed at: ${brief.observedAt}.`,
    '',
    `${brief.completedOutcomeCount}/${brief.outcomes.length} outcomes checkpointed; ${brief.pendingOutcomeCount} pending. Repeated cumulative checks do not count as additional outcomes.`,
    '',
    `Product review required: ${brief.requiresProductReview}. ${brief.productAcceptance}`,
    '',
    '## Original goal',
    '',
    fenced(brief.goal, 'text'),
    '',
    '## Original authorization and limits',
    '',
    `Authorized at: ${brief.authorizedAt}. Approval hash: ${brief.approval.specHash}. Original source HEAD: ${brief.approval.sourceHead}.`,
    `Repository: ${text(brief.approval.repository)}; provider: ${brief.approval.provider}.`,
    '',
    fenced(JSON.stringify(brief.limits, null, 2), 'json'),
    '',
    '## Shared usage and remaining budgets',
    '',
    `${brief.usage.turns} reported turns; ${brief.usage.tokens} reported tokens. Totals ${brief.usage.complete ? 'cover all linked missions' : 'are partial: linked mission history is unavailable'}.`,
    '',
    brief.usage.accounting,
    '',
    fenced(JSON.stringify(brief.usage, null, 2), 'json'),
    '',
    '## Attention',
    '',
    ...(brief.attention.length
      ? brief.attention.flatMap((a) => [
          `- ${text(a.text)} (${a.kind})`,
          '',
          fenced(JSON.stringify(a.source, null, 2), 'json'),
          '',
        ])
      : [
          'No saved blocking reason or unresolved linked question is recorded in the available history.',
          '',
        ]),
    '## Outcomes',
    '',
  ];
  for (const outcome of brief.outcomes) {
    lines.push(
      `### ${text(outcome.title)} (${text(outcome.id)})`,
      '',
      `Saved outcome status: ${outcome.status}. Source run: ${outcome.runId ?? 'unavailable (no linked mission)'}.`,
      '',
      fenced(outcome.outcome, 'text'),
      '',
      `Prerequisite outcomes: ${outcome.dependsOn.join(', ') || 'none'}.`,
      '',
      '#### Recorded checkpoint',
      '',
      ...(outcome.checkpoint
        ? [
            `Checkpoint SHA: ${outcome.checkpoint.head ?? 'unavailable'}`,
            `Ref: ${text(outcome.checkpoint.ref ?? 'unavailable')}`,
            `Source fingerprint: ${outcome.checkpoint.sourceFingerprint ?? 'unavailable'}`,
            `Source sequence: ${outcome.checkpoint.sourceSeq ?? 'unavailable'}; recorded at: ${outcome.checkpoint.at ?? 'unavailable'}.`,
            '',
          ]
        : ['Checkpoint receipt unavailable: no checkpoint is recorded.', '']),
      fenced(JSON.stringify(outcome.checkpointEvidence, null, 2), 'json'),
      '',
      `#### Criteria (${outcome.checkpoint ? 'historical checkpoint boundary' : 'latest recorded state; no checkpoint proof'})`,
      '',
    );
    for (const criterion of outcome.criteria) {
      lines.push(
        `- ${text(criterion.id)}: ${text(criterion.title)} — ${criterion.status}; evidence ID: ${criterion.evidenceId ?? 'unavailable'}.`,
        '',
        fenced(JSON.stringify(criterion, null, 2), 'json'),
        '',
      );
    }
    lines.push(
      '#### Evidence at this boundary',
      '',
      'Evidence IDs, source run/sequence, contract versions, original timestamps and code stamps are retained below. AI assessments remain distinct from deterministic checks.',
      '',
      fenced(JSON.stringify(outcome.evidence, null, 2), 'json'),
      '',
      '#### Latest recorded mission state (separate from checkpoint proof)',
      '',
      fenced(JSON.stringify(outcome.latestRecordedState, null, 2), 'json'),
      '',
    );
  }
  lines.push(
    '## Evidence boundary and product review',
    '',
    brief.evidenceBoundary,
    '',
    `Current source freshness: ${brief.sourceFreshness.status}. ${brief.sourceFreshness.explanation}`,
    '',
  );
  return lines.join('\n');
}
