import type { RunEvent, RunState } from './model.js';

export function brief(state: RunState, events: RunEvent[]) {
  const verified = state.criteria.filter((c) => c.status === 'PASSED');
  const open = state.criteria.filter((c) => c.status !== 'PASSED');
  const effectiveStatus = state.status === 'COMPLETED' && open.length ? 'PARTIAL' : state.status;
  return {
    runId: state.id,
    provider: state.provider,
    goal: state.goal,
    status: effectiveStatus,
    contractVersion: state.contractVersion,
    repository: state.repository,
    branch: state.branch,
    worktree: state.worktree,
    originalGoal: state.contracts[0].goal,
    acceptance: state.contract.criteria.map((c) => ({
      title: c.title,
      ...state.criteria.find((a) => a.id === c.id)!,
    })),
    verified: verified.length,
    open: open.length,
    problems: events
      .filter((e) => ['verification.failed', 'task.failed', 'workflow.blocked'].includes(e.type))
      .map((e) => ({ at: e.at, message: e.message, nodeId: e.data.nodeId })),
    corrections: events
      .filter((e) => e.type === 'corrective.inserted')
      .map((e) => ({ at: e.at, message: e.message })),
    decisions: events
      .filter((e) =>
        [
          'decision.recorded',
          'evidence.invalidated',
          'contract.approved',
          'workflow.recovered',
        ].includes(e.type),
      )
      .map((e) => ({ seq: e.seq, at: e.at, message: e.message })),
    checks: {
      passed: state.evidence.filter((e) => e.status === 'passed').length,
      failed: state.evidence.filter((e) => e.status === 'failed').length,
      stale: state.evidence.filter((e) => e.status === 'stale').length,
    },
    evidence: state.evidence,
    assessments: state.nodes
      .filter((n) => n.kind === 'task')
      .map((n) => ({
        nodeId: n.id,
        summary: n.summary,
        provenance: 'unverified agent claim; consult linked deterministic evidence',
        evidenceIds: n.evidenceIds,
      })),
    regressions: events
      .filter(
        (e) =>
          e.type === 'verification.failed' &&
          state.evidence.some(
            (p) =>
              p.criterionId === (e.data.evidence as { criterionId: string })?.criterionId &&
              p.createdAt < e.at &&
              ['passed', 'stale'].includes(p.status),
          ),
      )
      .map((e) => ({ at: e.at, message: e.message })),
    attention: open.length
      ? [
          state.reason ??
            'Acceptance checks remain open; inspect evidence and resume within the approved limits.',
        ]
      : [],
    resources: {
      elapsedMs:
        Date.parse(state.finishedAt ?? state.updatedAt) -
        Date.parse(state.startedAt ?? state.createdAt),
      turns: state.turns,
      reportedTokens: state.tokens,
      cost: 'not measured',
      incompleteTurnTokens: 'unavailable when provider does not report usage',
    },
    diff: state.diff ?? '',
    limits: [
      'Local execution pauses during sleep or shutdown.',
      'AI summaries are probabilistic claims.',
      'Only configured checks are covered; passing checks do not prove absence of defects.',
    ],
  };
}
export function markdownBrief(state: RunState, events: RunEvent[]): string {
  const b = brief(state, events);
  const lines = [
    `# Morning Brief — ${b.status}`,
    '',
    state.provider === 'demo'
      ? '**DEMO — deterministic fixture, no Codex validation.**'
      : '**Provider: real Codex SDK.**',
    '',
    `Original goal: ${b.originalGoal}`,
    '',
    `Current contract: v${b.contractVersion} — ${b.goal}`,
    '',
    `${b.verified}/${b.acceptance.length} acceptance criteria verified. ${b.open} still open.`,
    '',
    ...b.acceptance.map(
      (c) =>
        `- [${c.status === 'PASSED' ? 'x' : ' '}] ${c.title} — ${c.status}${c.evidenceId ? ` ([evidence](#evidence-${c.evidenceId}))` : ''}`,
    ),
    '',
    '## What changed',
    '',
    ...b.corrections.map((c) => `- ${c.message}`),
    ...(b.corrections.length ? [] : ['No corrective tasks recorded.']),
    '',
    '## Problems and decisions',
    '',
    ...b.problems.map((p) => `- ${p.at}: ${p.message}`),
    ...b.decisions.map((d) => `- Event ${d.seq}: ${d.message}`),
    '',
    '## What needs attention',
    '',
    ...b.attention.map((a) => `- ${a}`),
    ...(b.attention.length
      ? []
      : ['No open acceptance criterion. Review the diff before integrating changes.']),
    '',
    '## Resources and worktree',
    '',
    `${Math.round(b.resources.elapsedMs / 1000)} seconds elapsed; ${b.resources.turns} agent turns; ${b.resources.reportedTokens} reported tokens. Cost not measured. Interrupted-turn usage may be unavailable.`,
    '',
    `Repository: ${b.repository}`,
    `Branch: ${b.branch}`,
    `Worktree: ${b.worktree}`,
    '',
    '## Evidence',
    '',
    ...b.evidence.flatMap((e) => [
      `<a id="evidence-${e.id}"></a>`,
      `### ${e.criterionId} — ${e.status.toUpperCase()} (${e.kind})`,
      '',
      `Check: ${JSON.stringify(e.command)}`,
      `Exit: ${e.exitCode ?? 'unknown'}; duration: ${e.durationMs}ms`,
      `Git: ${e.stamp.head}; fingerprint: ${e.stamp.fingerprint}`,
      `Scope: ${e.scope.join(', ') || 'all repository files'}`,
      '',
      ...(e.invalidatedReason ? [e.invalidatedReason, ''] : []),
      '```text',
      e.output.replaceAll('```', '~~~'),
      '```',
      '',
    ]),
    '## Agent assessments',
    '',
    ...b.assessments.map(
      (a) =>
        `- ${a.summary ?? 'No summary'} (agent claim; ${a.evidenceIds.length} linked runtime checks)`,
    ),
    '',
    '## Limits',
    '',
    ...b.limits.map((l) => `- ${l}`),
    '',
    '## Worktree diff',
    '',
    '```diff',
    b.diff.replaceAll('```', '~~~'),
    '```',
    '',
  ];
  return lines.join('\n');
}
