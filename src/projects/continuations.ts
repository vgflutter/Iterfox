import {
  projectLimits,
  type ProjectContinuation,
  type ProjectDocument,
  type ProjectHandoff,
  type ProjectMilestone,
} from '../shared/projects.js';
import { boundedContext, historicalBoundary } from './context.js';
import { handoffSections } from './handoffs.js';

/** Pure proposal assembly: no worker, verifier, model or run-ledger writes. */
export function proposeContinuation(
  project: ProjectDocument,
  milestone: ProjectMilestone,
): ProjectContinuation {
  const byId = new Map(project.milestones.map((item) => [item.id, item]));
  const distance = new Map([[milestone.id, 0]]);
  const queue = [milestone];
  for (const item of queue)
    for (const id of item.dependsOn)
      if (!distance.has(id)) {
        distance.set(id, distance.get(item.id)! + 1);
        queue.push(byId.get(id)!);
      }

  const latest = new Map<string, ProjectHandoff>();
  for (const receipt of project.handoffs) latest.set(receipt.runId, receipt);
  const relevant = project.runs
    .filter((link) => distance.has(link.milestoneId))
    .sort(
      (a, b) =>
        distance.get(a.milestoneId)! - distance.get(b.milestoneId)! ||
        Number(latest.has(b.runId)) - Number(latest.has(a.runId)) ||
        (latest.get(b.runId)?.projectRevision ?? b.projectRevision) -
          (latest.get(a.runId)?.projectRevision ?? a.projectRevision),
    );
  // Cover distinct prerequisite milestones before older sessions of one
  // milestone. Selected-milestone context always has first priority.
  const covered = new Set<string>();
  const first = relevant.filter((link) => {
    if (covered.has(link.milestoneId)) return false;
    covered.add(link.milestoneId);
    return true;
  });
  const firstIds = new Set(first.map((link) => link.runId));
  const sources = [...first, ...relevant.filter((link) => !firstIds.has(link.runId))].slice(
    0,
    projectLimits.continuationSources,
  );
  const receipts = sources.flatMap((source) => {
    const receipt = latest.get(source.runId);
    return receipt ? [receipt] : [];
  });
  const relevantIds = new Set(relevant.map((source) => source.runId));
  const olderReceipts =
    project.handoffs.filter((receipt) => relevantIds.has(receipt.runId)).length - receipts.length;
  const selectionOmissions: string[] = [];
  if (relevant.length > sources.length)
    selectionOmissions.push(
      `${relevant.length - sources.length} additional relevant linked runs omitted.`,
    );
  if (olderReceipts)
    selectionOmissions.push(
      `${olderReceipts} additional historical handoff receipts omitted; only the latest selected receipt per run is used.`,
    );
  const sourceRunIds = sources.map((source) => source.runId);
  const sourceHandoffIds = receipts.map((receipt) => receipt.id);
  const receiptSections = receipts.map((receipt) =>
    handoffSections(
      {
        ...receipt,
        // Recent claims/checks are the most useful orientation; full ordered
        // descriptors remain in the immutable receipt.
        evidence: [...receipt.evidence].reverse(),
        agentClaims: [...receipt.agentClaims].reverse(),
      },
      `Run ${receipt.runId}: `,
    ),
  );
  const merged = handoffSections({
    unfinishedWork: [],
    questions: [],
    agentClaims: [],
    evidence: [],
  }).map((section, index) => ({
    title: section.title,
    items: receiptSections.flatMap((sections) => sections[index].items),
  }));
  const context = boundedContext(
    `Project ${project.id}, revision ${project.revision}; milestone ${milestone.id}.\n` +
      `Source runs: ${sourceRunIds.join(', ') || 'none linked to this milestone or its prerequisites'}.\n` +
      `${historicalBoundary}` +
      (selectionOmissions.length ? `\nSource omissions: ${selectionOmissions.join(' ')}` : ''),
    [
      {
        title: 'Project purpose and audience',
        items: [`Purpose: ${project.purpose}`, `Audience: ${project.audience}`],
      },
      { title: 'Selected milestone outcome', items: [`${milestone.title}: ${milestone.outcome}`] },
      { title: 'Operator constraints', items: project.constraints },
      { title: 'Operator decisions', items: project.decisions },
      { title: 'Provisional hypotheses', items: project.hypotheses },
      {
        title: 'Prerequisite outcomes (operator roadmap review, not runtime PASS)',
        items: queue.slice(1).map((item) => `${item.id} [${item.status}]: ${item.outcome}`),
      },
      {
        title: 'Source runs and historical receipt provenance',
        items: sources.map((source) => {
          const receipt = latest.get(source.runId);
          return receipt
            ? `Run ${source.runId}; handoff ${receipt.id}; ledger sequence ${receipt.sourceSeq}; base HEAD ${receipt.baseHead}; contract v${receipt.contractVersion}; status ${receipt.runStatus}; provider ${receipt.provider}; captured project revision ${receipt.projectRevision}.`
            : `Run ${source.runId}; linked at project revision ${source.projectRevision} to milestone ${source.milestoneId}; no audited handoff captured. No verification is inferred.`;
        }),
      },
      ...merged,
    ],
  );
  return {
    projectId: project.id,
    projectRevision: project.revision,
    milestoneId: milestone.id,
    repository: project.repository,
    goal: `Milestone: ${milestone.title}\n${milestone.outcome}`,
    handoff: context.handoff,
    sourceRunIds,
    sourceHandoffIds,
    omissions: [...selectionOmissions, ...context.omissions],
    authorizationRequired: true,
  };
}
