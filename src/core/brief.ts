import { satisfied, type RunEvent, type RunState } from './model.js';

export function brief(state: RunState, events: RunEvent[]) {
  const verified = state.criteria.filter((c) => c.status === 'PASSED');
  const open = state.criteria.filter((c) => !satisfied(c.status));
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
    assessed: state.criteria.filter((c) => c.status === 'ASSESSED').length,
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
          'task.skipped',
        ].includes(e.type),
      )
      .map((e) => ({ seq: e.seq, at: e.at, message: e.message })),
    checks: {
      assessed: state.evidence.filter((e) => e.status === 'assessed').length,
      passed: state.evidence.filter((e) => e.status === 'passed').length,
      failed: state.evidence.filter((e) => e.status === 'failed').length,
      stale: state.evidence.filter((e) => e.status === 'stale').length,
      deferred: state.evidence.filter((e) => e.purpose === 'probe' && e.status === 'recorded')
        .length,
    },
    skippedTasks: state.nodes
      .filter((n) => n.kind === 'task' && n.status === 'SKIPPED' && n.evidenceIds.length)
      .map((n) => ({
        nodeId: n.id,
        title: n.title,
        reason: n.summary,
        evidenceIds: n.evidenceIds,
      })),
    evidence: state.evidence,
    assessments: state.nodes
      .filter((n) => n.kind === 'task' && n.startedAt)
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
      'AI summaries and qualitative assessments are probabilistic claims from the same integration, not independent review.',
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
    `${b.verified}/${b.acceptance.length} criteria deterministically verified; ${b.assessed} AI-assessed. ${b.open} still open.`,
    '',
    ...b.acceptance.map(
      (c) =>
        `- [${satisfied(c.status) ? 'x' : ' '}] ${c.title} — ${c.status}${c.evidenceId ? ` ([evidence](#evidence-${c.evidenceId}))` : ''}`,
    ),
    '',
    '## What changed',
    '',
    ...b.corrections.map((c) => `- ${c.message}`),
    ...(b.corrections.length ? [] : ['No corrective tasks recorded.']),
    ...b.skippedTasks.map(
      (t) =>
        `- Skipped model call: ${t.title} — current deterministic acceptance evidence already covers this task.`,
    ),
    ...(b.checks.deferred
      ? [
          `- ${b.checks.deferred} preliminary command observations were not yet satisfied while implementation remained; these did not consume corrective retries.`,
        ]
      : []),
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
      ...(e.visual
        ? [
            `Pixel difference: ${(e.visual.diffRatio * 100).toFixed(3)}%; allowed: ${(e.visual.maxDiffRatio * 100).toFixed(3)}%. Browser: ${e.visual.browser}; platform: ${e.visual.platform}.`,
            '',
          ]
        : []),
      ...(e.assessment
        ? [
            'AI-assessed; same integration, not independent review.',
            ...e.assessment.ratings.map((r) => `- ${r.id}: ${r.score}/5 — ${r.explanation}`),
            ...e.assessment.limitations.map((l) => `- Limitation: ${l}`),
            '',
          ]
        : []),
      ...(e.artifacts ?? []).map(
        (a) =>
          `Artifact: ${a.name}; SHA-256: ${a.sha256}; ${a.bytes} bytes; stored path: ${a.path}`,
      ),
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
