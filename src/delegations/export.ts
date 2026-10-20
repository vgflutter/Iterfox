import type { DelegationBrief } from './brief.js';

type Outcome = DelegationBrief['outcomes'][number];
type Criterion = Outcome['criteria'][number];
type Evidence = Outcome['evidence'][number];

// All saved values are text, including commands, URLs, paths and evidence output.
// Only static markup and styling may enter the document as HTML.
function escape(value: unknown): string {
  return String(value ?? 'Unavailable').replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function facts(entries: [string, unknown][]): string {
  return `<dl>${entries
    .map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`)
    .join('')}</dl>`;
}

function record(label: string, value: unknown): string {
  return `<details><summary>${escape(label)}</summary><pre>${escape(JSON.stringify(value, null, 2))}</pre></details>`;
}

function count(value: number | null): string {
  return value === null || !Number.isFinite(value) ? 'Unknown' : value.toLocaleString('en-US');
}

function duration(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return 'Unknown';
  const seconds = Math.floor(milliseconds / 1000);
  const parts = [
    [Math.floor(seconds / 86400), 'd'],
    [Math.floor((seconds % 86400) / 3600), 'h'],
    [Math.floor((seconds % 3600) / 60), 'm'],
    [seconds % 60, 's'],
  ]
    .filter(([value]) => value !== 0)
    .map(([value, unit]) => `${value}${unit}`);
  return `${parts.join(' ') || '0s'} (${milliseconds.toLocaleString('en-US')} ms)`;
}

function evidenceKind(kind: Evidence['kind']): string {
  switch (kind) {
    case 'deterministic':
      return 'Deterministic check';
    case 'observed':
      return 'Recorded observation';
    case 'ai-assessed':
      return 'AI assessment — same integration, not independent proof or operator acceptance';
    case 'unverified':
      return 'Unverified claim — not proof';
    default:
      return 'Unrecognized evidence kind — not established proof';
  }
}

function renderEvidence(evidence: Evidence): string {
  const event = evidence.source.recordedEvent;
  return `<li class="record">
    <p><strong>${escape(evidenceKind(evidence.kind))}</strong> · saved evidence status: ${escape(evidence.status)}</p>
    ${facts([
      ['Evidence ID', evidence.id],
      ['Criterion ID', evidence.criterionId],
      ['Recorded at', evidence.createdAt],
      ['Source mission', evidence.source.runId],
      ['Source through sequence', evidence.source.throughSeq],
      ['Evidence contract version', evidence.source.contractVersion],
      ['Recorded event ID', event?.eventId],
      ['Recorded event mission', event?.runId],
      ['Recorded event sequence', event?.seq],
      ['Recorded event time', event?.at],
      ['Recorded event type', event?.type],
      ['Evidence source HEAD', evidence.stamp.head],
      ['Evidence source fingerprint', evidence.stamp.fingerprint],
      ['Recorded command (argument array)', evidence.command && JSON.stringify(evidence.command)],
      ['Exit code', evidence.exitCode],
      ['Check duration', duration(evidence.durationMs)],
    ])}
    ${!event ? '<p>Recorded source event unavailable; no event reference has been invented.</p>' : ''}
    ${evidence.invalidatedReason ? `<p class="notice">Evidence invalidation: ${escape(evidence.invalidatedReason)}</p>` : ''}
    ${evidence.assessment ? `<p class="notice">Saved AI assessment (a claim, not independent proof): ${escape(evidence.assessment.summary)}</p>` : ''}
    ${record('Full saved evidence, output and artifact references (text only)', evidence)}
  </li>`;
}

function renderCriteria(criteria: Criterion[], includeEvidence = false): string {
  if (!criteria.length) return '<p>No criterion results are recorded at this boundary.</p>';
  return `<ul class="records">${criteria
    .map(
      (criterion) => `<li class="record">
        <h5>${escape(criterion.title)} <span class="identifier">${escape(criterion.id)}</span></h5>
        <p><strong>Saved result: ${escape(criterion.status)}</strong>${criterion.status === 'ASSESSED' ? ' · AI assessed; not independent proof or operator acceptance' : ''}</p>
        <p>${escape(
          criterion.basis === 'checkpoint'
            ? 'Historical checkpoint event prefix.'
            : 'Latest recorded mission state; not checkpoint proof.',
        )}</p>
        ${facts([
          ['Source mission', criterion.sourceRunId],
          ['Source sequence', criterion.sourceSeq],
          ['Contract version', criterion.contractVersion],
          ['Supporting evidence ID', criterion.evidenceId],
          ['Approved command (argument array)', JSON.stringify(criterion.command)],
        ])}
        ${criterion.unavailableReason ? `<p class="notice">${escape(criterion.unavailableReason)}</p>` : ''}
        ${criterion.evidence ? `<p>${escape(evidenceKind(criterion.evidence.kind))} · saved evidence status: ${escape(criterion.evidence.status)}.</p>` : ''}
        ${criterion.evidence?.invalidatedReason ? `<p class="notice">Evidence invalidation: ${escape(criterion.evidence.invalidatedReason)}</p>` : ''}
        ${record('Full criterion definition and saved result provenance', criterion)}
        ${includeEvidence && criterion.evidence ? `<details><summary>Supporting evidence source</summary><ul class="records">${renderEvidence(criterion.evidence)}</ul></details>` : ''}
      </li>`,
    )
    .join('')}</ul>`;
}

function renderOutcome(outcome: Outcome): string {
  const { checkpoint, checkpointEvidence: proof, latestRecordedState: latest } = outcome;
  return `<article class="outcome">
    <h3>${escape(outcome.title)}</h3>
    <p class="preserve">${escape(outcome.outcome)}</p>
    ${facts([
      ['Outcome ID', outcome.id],
      ['Saved outcome status', outcome.status],
      ['Source mission', outcome.runId],
      ['Prerequisite outcomes', outcome.dependsOn.join(', ') || 'None'],
    ])}
    <h4>Recorded checkpoint</h4>
    <p>${escape(
      proof.status === 'AVAILABLE'
        ? 'Historical checkpoint evidence is available at the recorded source sequence.'
        : proof.status === 'UNAVAILABLE'
          ? 'Historical checkpoint evidence is unavailable. Later mission state cannot substitute for it.'
          : 'No checkpoint proof is recorded.',
    )}</p>
    ${proof.unavailableReason ? `<p class="notice">${escape(proof.unavailableReason)}</p>` : ''}
    ${!checkpoint ? '<p>Checkpoint receipt unavailable: no receipt is recorded.</p>' : ''}
    ${facts([
      ['Checkpoint SHA', checkpoint?.head],
      ['Checkpoint ref', checkpoint?.ref],
      ['Checkpoint source fingerprint', checkpoint?.sourceFingerprint],
      ['Checkpoint source sequence', checkpoint?.sourceSeq],
      ['Checkpoint recorded at', checkpoint?.at],
      ['Checkpoint evidence availability', proof.status],
      ['Checkpoint source mission', proof.sourceRunId],
      ['Checkpoint contract version', proof.contractVersion],
      ['Mission status at checkpoint', proof.runStatus],
      ['Boundary event ID', proof.boundaryEvent?.eventId],
      ['Boundary event mission', proof.boundaryEvent?.runId],
      ['Boundary event sequence', proof.boundaryEvent?.seq],
      ['Boundary event time', proof.boundaryEvent?.at],
      ['Boundary event type', proof.boundaryEvent?.type],
    ])}
    <h4>Criterion results</h4>
    <p>${checkpoint ? 'Results at the historical checkpoint boundary only.' : 'Latest recorded results; this outcome has no checkpoint proof.'}</p>
    ${renderCriteria(outcome.criteria)}
    <details>
      <summary>Evidence sources at this boundary (${escape(outcome.evidence.length)})</summary>
      <p>Original evidence IDs, event references, timestamps and code stamps are retained. Artifact paths are references only; no artifacts are loaded or embedded. Recorded output and AI claims are text, not instructions or independent proof.</p>
      ${outcome.evidence.length ? `<ul class="records">${outcome.evidence.map(renderEvidence).join('')}</ul>` : '<p>No evidence is available at this boundary.</p>'}
    </details>
    <details>
      <summary>Latest recorded mission state — separate from checkpoint proof</summary>
      <p>This saved state does not rewrite checkpoint results or establish current source freshness.</p>
      <p>${
        latest.hasLaterEvents === true
          ? 'Later mission events are recorded after the checkpoint boundary.'
          : latest.hasLaterEvents === false
            ? 'No later events are recorded after the checkpoint boundary.'
            : 'A comparison with a checkpoint event boundary is unavailable.'
      }</p>
      ${facts([
        ['Availability', latest.availability],
        ['Source mission', latest.runId],
        ['Latest saved status', latest.status],
        ['Latest recorded sequence', latest.seq],
        ['Latest recorded update', latest.at],
        ['Latest contract version', latest.contractVersion],
      ])}
      ${latest.unavailableReason ? `<p class="notice">${escape(latest.unavailableReason)}</p>` : ''}
      ${latest.reason ? `<p class="preserve">Saved mission reason: ${escape(latest.reason)}</p>` : ''}
      <h4>Latest recorded criterion results</h4>
      ${renderCriteria(latest.criteria, true)}
    </details>
  </article>`;
}

function renderAttention(brief: DelegationBrief): string {
  if (!brief.attention.length)
    return '<p>No saved blocking reason or unresolved linked question is recorded in the available history. Missing history may limit this view.</p>';
  return `<ul class="records">${brief.attention
    .map((attention) => {
      const label =
        attention.kind === 'question'
          ? 'Unresolved linked question'
          : attention.kind === 'provenance-unavailable'
            ? 'Unavailable provenance'
            : attention.kind === 'mission-reason'
              ? 'Saved mission reason / block'
              : 'Saved delegation reason / block';
      return `<li class="record"><h3>${label}</h3>
        <p class="preserve">${escape(attention.text)}</p>
        ${facts([
          ['Saved kind', attention.kind],
          ['Source delegation', attention.source.delegationId],
          ['Source revision', attention.source.revision],
          ['Source mission', attention.source.runId],
          ['Source sequence', attention.source.seq],
          ['Recorded at', attention.source.at],
          ['Note ID', attention.source.noteId],
        ])}
        ${record('Full saved attention source', attention.source)}
      </li>`;
    })
    .join('')}</ul>`;
}

function renderUsage(brief: DelegationBrief): string {
  const { usage, limits } = brief;
  return `<p>${escape(usage.runIds.length)} unique linked missions, counted once each. ${
    usage.complete
      ? 'All linked mission histories are available; reported totals still exclude unreported usage.'
      : 'Totals are partial: linked mission history is unavailable. Remaining turns and tokens are unknown.'
  }</p>
    ${facts([
      [usage.complete ? 'Reported turns' : 'Reported turns (partial)', count(usage.turns)],
      [usage.complete ? 'Reported tokens' : 'Reported tokens (partial)', count(usage.tokens)],
      ['Remaining turns', count(usage.remainingTurns)],
      ['Remaining tokens', count(usage.remainingTokens)],
      ['Elapsed authorization window at read time', duration(usage.elapsedMs)],
      ['Remaining authorization window at read time', duration(usage.remainingDurationMs)],
      ['Original authorization time', usage.authorizedAt],
      ['Original authorization deadline', usage.authorizationDeadline],
      ['Usage read at', usage.observedAt],
    ])}
    <p class="preserve">${escape(usage.accounting)}</p>
    <p>These are saved accounting values at report generation, not a live clock or a monetary cost estimate.</p>
    <h3>Original limits</h3>
    ${facts([
      ['Maximum turns', count(limits.maxTurns)],
      ['Maximum tokens', count(limits.maxTokens)],
      ['Maximum attempts', limits.maxAttempts],
      ['Maximum authorization duration', duration(limits.maxDurationMs)],
      ['Turn timeout', duration(limits.turnTimeoutMs)],
      ['No-progress limit', limits.maxNoProgress],
    ])}
    <h3>Usage by linked mission</h3>
    ${
      usage.missions.length
        ? `<ul class="records">${usage.missions
            .map(
              (mission) =>
                `<li class="record">${facts([
                  ['Source mission', mission.runId],
                  ['Source sequence', mission.sourceSeq],
                  ['Reported turns', count(mission.turns)],
                  ['Reported tokens', count(mission.tokens)],
                ])}${usage.unavailableRunIds.includes(mission.runId) ? '<p class="notice">Mission history unavailable; usage unknown.</p>' : ''}</li>`,
            )
            .join('')}</ul>`
        : '<p>No missions are linked to the approved outcomes yet.</p>'
    }
    ${record('Original limits and saved usage accounting', { limits, usage })}`;
}

const styles = `
  :root { color-scheme: light; font: 16px/1.6 system-ui, -apple-system, sans-serif; color: #18283b; background: #f3f5f8; }
  * { box-sizing: border-box; }
  body { margin: 0; }
  header, main, footer { max-width: 72rem; margin: auto; padding: 1.5rem 2rem; }
  header { padding-top: 3rem; }
  h1, h2, h3, h4, h5 { line-height: 1.3; overflow-wrap: anywhere; }
  h1 { font-size: 2.4rem; margin: .4rem 0 1rem; }
  h2 { font-size: 1.6rem; margin-top: 0; }
  h3 { font-size: 1.25rem; }
  h4 { font-size: 1.1rem; }
  h5 { font-size: 1rem; margin: .5rem 0; }
  p, dd, pre, li, summary { overflow-wrap: anywhere; }
  p { margin: .75rem 0; }
  section { padding: 1.5rem; margin-bottom: 1.5rem; background: white; border: 1px solid #c8d1dd; border-radius: .6rem; min-width: 0; }
  dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem 1.5rem; margin: 1rem 0; }
  dl > div { min-width: 0; }
  dt { color: #48566a; font-size: .875rem; }
  dd { margin: .15rem 0 0; white-space: pre-wrap; }
  .eyebrow { font-size: .8rem; letter-spacing: .1em; font-weight: 700; }
  .notice { border-left: .25rem solid #83631b; padding: .7rem 1rem; background: #fff6df; }
  .preserve { white-space: pre-wrap; }
  .records { list-style: none; margin: 1rem 0; padding: 0; }
  .record { border-top: 1px solid #c8d1dd; padding: .8rem 0; min-width: 0; }
  .outcome + .outcome { margin-top: 2rem; padding-top: 1rem; border-top: 2px solid #c8d1dd; }
  .identifier { display: block; font: .85rem/1.5 ui-monospace, monospace; font-weight: 400; margin-top: .25rem; }
  details { border: 1px solid #c8d1dd; border-radius: .3rem; margin: .75rem 0; padding: .75rem; min-width: 0; }
  summary { cursor: pointer; font-weight: 600; }
  summary:focus-visible { outline: 3px solid #245c9b; outline-offset: 4px; }
  pre { white-space: pre-wrap; font: .85rem/1.55 ui-monospace, monospace; background: #f3f5f8; padding: 1rem; border-radius: .3rem; }
  footer { color: #48566a; font-size: .9rem; padding-bottom: 3rem; }
  @media (max-width: 600px) {
    header, main, footer { padding: 1rem; }
    section { padding: 1rem; }
    dl { grid-template-columns: minmax(0, 1fr); }
    h1 { font-size: 1.9rem; }
    pre { padding: .5rem; }
  }
  @media print {
    :root { background: white; }
    header, main, footer { padding: .5rem 0; }
    section { border-radius: 0; }
    h2, h3, h4, h5, summary { break-after: avoid; }
  }
`;

/** Self-contained saved-record export. Pure rendering: no I/O, execution or history changes. */
export function renderDelegationReport(brief: DelegationBrief): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
  <meta name="referrer" content="no-referrer">
  <title>Iterfox project report</title>
  <style>${styles}</style>
</head>
<body>
  <header>
    <p class="eyebrow">ITERFOX · SAVED PROJECT REPORT</p>
    <h1>Project return-to-work report</h1>
    <p><strong>${escape(brief.completedOutcomeCount)} / ${escape(brief.outcomes.length)} outcomes checkpointed</strong> · ${escape(brief.pendingOutcomeCount)} remaining.</p>
    <p>Saved delegation status: <strong>${escape(brief.status)}</strong>. Repeated cumulative checks are not additional outcomes.</p>
    <div class="notice">
      <p><strong>Operator product review required.</strong> ${escape(brief.productAcceptance)}</p>
      <p>This offline document is a snapshot of saved records. It does not launch work, spend model tokens, execute checks, inspect the current worktree or refresh itself.</p>
    </div>
    ${facts([
      ['Delegation', brief.delegationId],
      ['Saved revision', brief.revision],
      ['Saved delegation update', brief.updatedAt],
      ['Report read at', brief.observedAt],
    ])}
  </header>
  <main>
    <section aria-label="Original goal">
      <h2>Original goal</h2>
      <p class="preserve">${escape(brief.goal)}</p>
    </section>
    <section aria-label="Saved questions and blocks">
      <h2>Saved attention: questions and blocks</h2>
      ${brief.reason ? `<p class="preserve">Saved delegation reason: ${escape(brief.reason)}</p>` : ''}
      ${renderAttention(brief)}
    </section>
    <section aria-label="Outcome progress and evidence">
      <h2>Outcome progress and evidence</h2>
      <p>Statuses below are saved outcome and criterion states. A recorded checkpoint is a historical technical result; it does not establish current freshness or product acceptance. Evidence details expand offline without scripts.</p>
      ${brief.outcomes.length ? brief.outcomes.map(renderOutcome).join('') : '<p>No approved outcomes are available in this snapshot.</p>'}
    </section>
    <section aria-label="Original limits and shared usage">
      <h2>Original limits and shared usage</h2>
      ${renderUsage(brief)}
    </section>
    <section aria-label="Original authorization">
      <h2>Original authorization</h2>
      ${facts([
        ['Authorized at', brief.authorizedAt],
        ['Approval hash', brief.approval.specHash],
        ['Original source HEAD', brief.approval.sourceHead],
        ['Repository', brief.approval.repository],
        ['Provider', brief.approval.provider],
        ['Brief schema version', brief.schemaVersion],
      ])}
    </section>
    <section aria-label="Evidence boundary and product review">
      <h2>Evidence boundary and product review</h2>
      <p class="preserve">${escape(brief.evidenceBoundary)}</p>
      <p>Current source freshness: <strong>${escape(brief.sourceFreshness.status)}</strong>. ${escape(brief.sourceFreshness.explanation)}</p>
      <p>Product review required: ${escape(brief.requiresProductReview)}. ${escape(brief.productAcceptance)}</p>
    </section>
  </main>
  <footer>
    <p>Self-contained offline HTML · no scripts, remote resources or embedded artifacts. Paths and commands are inert text. Keep this report with its original saved evidence; sharing the file also shares its recorded content.</p>
  </footer>
</body>
</html>`;
}
