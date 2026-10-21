import { randomUUID } from 'node:crypto';
import { activeNotes, needsOrientation, questions } from '../core/compass.js';
import { satisfied, type RunState } from '../core/model.js';
import {
  projectHandoffSchema,
  projectLimits,
  type ProjectDocument,
  type ProjectHandoff,
  type ProjectRunLink,
} from '../shared/projects.js';
import { boundedContext, historicalBoundary } from './context.js';
import { parseProjectInput, ProjectError } from './errors.js';

export function handoffSections(
  receipt: Pick<ProjectHandoff, 'unfinishedWork' | 'questions' | 'agentClaims' | 'evidence'>,
  runPrefix = '',
) {
  return [
    {
      title: 'Unresolved questions (unverified agent questions; operator reply required)',
      items: receipt.questions.map((q) => `${runPrefix}${q.sourceId} [${q.status}]: ${q.text}`),
    },
    {
      title: 'Unfinished work (recorded state, not a new authorization)',
      items: receipt.unfinishedWork.map(
        (w) => `${runPrefix}${w.kind} ${w.sourceId} [${w.status}]: ${w.title}. ${w.detail}`,
      ),
    },
    {
      title: 'Historical checks (never proof for a new session)',
      items: receipt.evidence.map(
        (e) =>
          `${runPrefix}${e.id}: criterion ${e.criterionId}; ${e.kind}; ${e.status}; contract v${e.contractVersion}` +
          `${e.purpose ? '; probe, not acceptance' : ''}` +
          `${e.invalidatedReason ? `; ${e.invalidatedReason}` : ''}`,
      ),
    },
    {
      title: 'Unverified agent claims',
      items: receipt.agentClaims.map((c) => `${runPrefix}${c.kind} ${c.sourceId}: ${c.text}`),
    },
  ];
}

/** Called only with a stable, post-audit ledger snapshot, under the project lock. */
export function deriveHandoff(
  project: ProjectDocument,
  link: ProjectRunLink,
  state: RunState,
): ProjectHandoff {
  const evidence = state.evidence.map((e) => ({
    id: e.id,
    nodeId: e.nodeId,
    criterionId: e.criterionId,
    contractVersion: e.contractVersion,
    kind: e.kind,
    status: e.status,
    ...(e.purpose ? { purpose: e.purpose } : {}),
    createdAt: e.createdAt,
    head: e.stamp.head,
    fingerprint: e.stamp.fingerprint,
    ...(e.invalidatedReason ? { invalidatedReason: e.invalidatedReason } : {}),
  }));
  const criteria = state.criteria.map((criterion) => ({
    ...criterion,
    title: state.contract.criteria.find((item) => item.id === criterion.id)!.title,
  }));
  const unfinishedWork: ProjectHandoff['unfinishedWork'] = [
    ...criteria
      .filter((c) => !satisfied(c.status))
      .map((c) => ({
        sourceId: c.id,
        kind: 'criterion' as const,
        title: c.title,
        detail: 'The source run has no current satisfied acceptance result for this criterion.',
        status: c.status,
        criterionIds: [c.id],
      })),
    ...state.nodes
      .filter(
        (n) =>
          n.kind === 'task' && !n.supersededBy && !satisfied(n.status) && n.status !== 'SKIPPED',
      )
      .map((n) => ({
        sourceId: n.id,
        kind: 'task' as const,
        title: n.title,
        detail: n.objective,
        status: n.status,
        criterionIds: [n.criterionId],
      })),
  ];
  for (const note of activeNotes(state)) {
    const disposition =
      state.direction?.contractVersion === state.contractVersion
        ? state.direction.notes.find((item) => item.noteId === note.id)
        : undefined;
    if (!disposition || disposition.disposition === 'deferred')
      unfinishedWork.push({
        sourceId: note.id,
        kind: 'operator-note',
        title: `Operator ${note.kind}`,
        detail: `${note.text}${disposition ? `\nAgent deferral: ${disposition.reason}` : ''}`,
        status: disposition ? 'deferred' : 'awaiting reconciliation',
        criterionIds: disposition?.criterionIds ?? [],
      });
  }

  const unresolved: ProjectHandoff['questions'] = questions(state).map((q) => ({
    sourceId: q.noteId,
    text: q.reason,
    criterionIds: [...q.criterionIds],
    label: 'Unverified agent question; operator reply required',
    status: 'open',
  }));
  const review = state.projectReviews?.at(-1);
  // A new note or code edit does not demonstrate that an operator question was
  // answered. Preserve the latest review question until a later review replaces
  // it, labeling changed context as requiring reconciliation rather than silently
  // inferring a resolution from arbitrary operator prose.
  if (review?.operatorQuestion) {
    const current =
      !review.invalidatedReason &&
      review.contractVersion === state.contractVersion &&
      review.directionRevision === (state.direction?.revision ?? 0) &&
      JSON.stringify(review.noteIds) === JSON.stringify((state.notes ?? []).map((n) => n.id));
    unresolved.push({
      sourceId: review.nodeId,
      text: review.operatorQuestion,
      criterionIds: [],
      label: 'Unverified agent question; operator reply required',
      status: current ? 'open' : 'requires-reconciliation',
    });
  }
  if (state.reason && state.status !== 'COMPLETED')
    unfinishedWork.unshift({
      sourceId: state.id,
      kind: 'run',
      title: `Source run ${state.status}`,
      detail: state.reason,
      status: state.status,
      criterionIds: criteria.filter((c) => !satisfied(c.status)).map((c) => c.id),
    });
  if (state.projectNeedsReview)
    unfinishedWork.push({
      sourceId: review?.nodeId ?? state.id,
      kind: 'project-review',
      title: 'Source project review remains pending',
      detail:
        review?.invalidatedReason ??
        'The source runtime records that a project checkpoint still needs review.',
      status: 'pending',
      criterionIds: [],
    });

  const agentClaims: ProjectHandoff['agentClaims'] = [];
  function claim(
    sourceId: string,
    kind: ProjectHandoff['agentClaims'][number]['kind'],
    text: string,
    evidenceIds: string[] = [],
  ) {
    agentClaims.push({
      sourceId,
      kind,
      text,
      evidenceIds: [...evidenceIds],
      label: 'Unverified agent claim',
    });
  }
  for (const task of state.nodes.filter(
    (n) => n.kind === 'task' && n.role === 'builder' && n.startedAt,
  )) {
    if (task.summary) claim(task.id, 'task-summary', task.summary, task.evidenceIds);
    if (typeof task.result?.reason === 'string' && task.result.reason)
      claim(task.id, 'task-summary', `Agent reason: ${task.result.reason}`, task.evidenceIds);
  }
  for (const item of state.projectReviews ?? []) {
    claim(
      item.nodeId,
      'project-review',
      `${item.outcome}${item.invalidatedReason ? ` (invalidated: ${item.invalidatedReason})` : ''}: ${item.summary}`,
    );
    for (const decision of item.decisions)
      claim(item.nodeId, 'provisional-choice', `${decision.choice} — ${decision.basis}`);
    for (const finding of item.findings)
      claim(item.nodeId, 'finding', finding.gap, finding.evidenceIds);
  }
  if (state.direction) {
    const prefix =
      state.direction.contractVersion === state.contractVersion
        ? 'Plan, not proof'
        : `Historical plan for contract v${state.direction.contractVersion}, not proof`;
    claim(
      state.direction.nodeId,
      'plan',
      `${prefix}: ${state.direction.focus}\nNext artifact (target): ${state.direction.nextArtifact}`,
    );
    for (const assumption of state.direction.assumptions)
      claim(state.direction.nodeId, 'hypothesis', assumption);
  }
  if (needsOrientation(state))
    unfinishedWork.push({
      sourceId: state.id,
      kind: 'operator-note',
      title: 'Direction awaits reconciliation',
      detail: 'New operator context has not been incorporated in a current run plan.',
      status: 'pending',
      criterionIds: [],
    });

  const derived = { unfinishedWork, questions: unresolved, agentClaims, evidence };
  const context = boundedContext(
    `Run ${state.id}; source sequence ${state.seq}; provider ${state.provider}; status ${state.status}.\n` +
      `Base HEAD ${state.baseHead}; contract v${state.contractVersion}.\n${historicalBoundary}`,
    handoffSections(derived),
  );
  const receipt = parseProjectInput(projectHandoffSchema, {
    id: randomUUID(),
    runId: state.id,
    milestoneId: link.milestoneId,
    milestone: link.milestone,
    projectRevision: project.revision + 1,
    capturedAt: new Date().toISOString(),
    audit: 'stored-evidence',
    sourceSeq: state.seq,
    sourceUpdatedAt: state.updatedAt,
    repository: state.repository,
    worktree: state.worktree,
    repositoryIdentity: link.repositoryIdentity,
    branch: state.branch,
    baseHead: state.baseHead,
    contractVersion: state.contractVersion,
    runStatus: state.status,
    provider: state.provider,
    runGoal: state.goal,
    ...(state.reason ? { runReason: state.reason } : {}),
    criteria,
    ...derived,
    ...context,
  });
  if (Buffer.byteLength(JSON.stringify(receipt), 'utf8') > projectLimits.receiptBytes)
    throw new ProjectError(
      'invalid-request',
      'This run exceeds the 1 MiB structured handoff receipt limit. No partial receipt was saved; inspect its run ledger directly.',
    );
  return receipt;
}
