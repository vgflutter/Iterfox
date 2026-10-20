import React, { useEffect, useId, useRef, useState } from 'react';
import type { DelegationBrief } from '../delegations/brief.js';
import { launchApi } from './launch-api.js';

type BriefRead = { brief?: DelegationBrief; loading: boolean; error: string };
type Outcome = DelegationBrief['outcomes'][number];
type CriterionResult = Outcome['criteria'][number];

function statusLabel(status: string): string {
  if (status === 'ASSESSED') return 'AI assessed';
  return status.toLowerCase().replace(/(^|[\s_-])\S/g, (letter) => letter.toUpperCase());
}

function count(value: number | null): string {
  return value === null || !Number.isFinite(value) ? 'Unknown' : value.toLocaleString();
}

function duration(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return 'Unknown';
  if (milliseconds === 0) return '0 seconds';
  if (milliseconds < 1000) return `${milliseconds} ms`;
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return [
    days ? `${days}d` : '',
    hours ? `${hours}h` : '',
    minutes ? `${minutes}m` : '',
    seconds % 60 ? `${seconds % 60}s` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children ?? 'Unavailable'}</dd>
    </div>
  );
}

function evidenceLabel(kind: NonNullable<CriterionResult['evidence']>['kind']): string {
  switch (kind) {
    case 'deterministic':
      return 'Deterministic check';
    case 'observed':
      return 'Recorded observation';
    case 'ai-assessed':
      return 'AI assessment · same integration, not independent proof';
    case 'unverified':
      return 'Unverified claim';
  }
}

function CriterionResults({ criteria }: { criteria: CriterionResult[] }) {
  if (!criteria.length) return <p>No criterion results are recorded for this outcome.</p>;
  return (
    <ul className="brief-criteria">
      {criteria.map((criterion) => {
        const evidence = criterion.evidence;
        const recordedEvent = evidence?.source.recordedEvent;
        return (
          <li key={criterion.id}>
            <div className="brief-result-heading">
              <span>
                {criterion.title} <code>{criterion.id}</code>
              </span>
              <strong data-result-status={criterion.status}>{statusLabel(criterion.status)}</strong>
            </div>
            <p className="muted small-text">
              {evidence
                ? `${evidenceLabel(evidence.kind)} · recorded evidence status: ${evidence.status}.`
                : (criterion.unavailableReason ?? 'Supporting evidence is unavailable.')}
            </p>
            {evidence?.invalidatedReason && (
              <p>Evidence invalidation: {evidence.invalidatedReason}</p>
            )}
            <details className="brief-provenance">
              <summary>Criterion provenance: {criterion.id}</summary>
              <dl className="brief-facts">
                <Fact label="Result boundary">
                  {criterion.basis === 'checkpoint'
                    ? 'Historical checkpoint event prefix'
                    : 'Latest recorded mission state; not checkpoint proof'}
                </Fact>
                <Fact label="Source mission">{criterion.sourceRunId}</Fact>
                <Fact label="Source sequence">{criterion.sourceSeq}</Fact>
                <Fact label="Contract version">{criterion.contractVersion}</Fact>
                <Fact label="Evidence ID">{criterion.evidenceId}</Fact>
                <Fact label="Approved command">
                  <code>{JSON.stringify(criterion.command)}</code>
                </Fact>
              </dl>
              {criterion.unavailableReason && <p>{criterion.unavailableReason}</p>}
              {evidence && (
                <dl className="brief-facts">
                  <Fact label="Evidence recorded at">{evidence.createdAt}</Fact>
                  <Fact label="Evidence source mission">{evidence.source.runId}</Fact>
                  <Fact label="Evidence through sequence">{evidence.source.throughSeq}</Fact>
                  <Fact label="Evidence contract version">{evidence.source.contractVersion}</Fact>
                  <Fact label="Recorded event ID">{recordedEvent?.eventId}</Fact>
                  <Fact label="Recorded event sequence">{recordedEvent?.seq}</Fact>
                  <Fact label="Recorded event time">{recordedEvent?.at}</Fact>
                  <Fact label="Evidence source HEAD">
                    <code>{evidence.stamp.head}</code>
                  </Fact>
                  <Fact label="Evidence source fingerprint">
                    <code>{evidence.stamp.fingerprint}</code>
                  </Fact>
                  <Fact label="Recorded command">
                    {evidence.command ? (
                      <code>{JSON.stringify(evidence.command)}</code>
                    ) : (
                      'Unavailable'
                    )}
                  </Fact>
                  <Fact label="Exit code">{evidence.exitCode}</Fact>
                  <Fact label="Check duration">{duration(evidence.durationMs)}</Fact>
                </dl>
              )}
            </details>
          </li>
        );
      })}
    </ul>
  );
}

function OutcomeEvidence({ outcome }: { outcome: Outcome }) {
  const { checkpoint, checkpointEvidence: proof, latestRecordedState: latest } = outcome;
  return (
    <>
      <p className="brief-evidence-boundary">
        {proof.status === 'AVAILABLE'
          ? `Historical checkpoint proof is available through source sequence ${proof.sourceSeq}.`
          : proof.status === 'UNAVAILABLE'
            ? 'Historical checkpoint proof is unavailable.'
            : 'No checkpoint proof is recorded.'}{' '}
        {proof.status !== 'AVAILABLE' && proof.unavailableReason}
      </p>
      <h5>Criterion results</h5>
      <p className="muted small-text">
        {checkpoint
          ? 'Results from the historical checkpoint boundary only.'
          : 'Latest recorded results; this outcome has no checkpoint proof.'}
      </p>
      <CriterionResults criteria={outcome.criteria} />
      <details className="brief-provenance">
        <summary>Checkpoint provenance</summary>
        <dl className="brief-facts">
          <Fact label="Checkpoint SHA">
            {checkpoint ? <code>{checkpoint.head}</code> : 'Unavailable — no receipt recorded'}
          </Fact>
          <Fact label="Source fingerprint">
            {checkpoint ? <code>{checkpoint.sourceFingerprint}</code> : 'Unavailable'}
          </Fact>
          <Fact label="Source sequence">{checkpoint?.sourceSeq}</Fact>
          <Fact label="Checkpoint ref">
            {checkpoint ? <code>{checkpoint.ref}</code> : 'Unavailable'}
          </Fact>
          <Fact label="Checkpoint recorded at">{checkpoint?.at}</Fact>
          <Fact label="Source mission">{proof.sourceRunId}</Fact>
          <Fact label="Checkpoint contract version">{proof.contractVersion}</Fact>
          <Fact label="Mission state at checkpoint">
            {proof.runStatus ? statusLabel(proof.runStatus) : null}
          </Fact>
          <Fact label="Boundary event ID">{proof.boundaryEvent?.eventId}</Fact>
          <Fact label="Boundary event time">{proof.boundaryEvent?.at}</Fact>
          <Fact label="Prerequisite outcomes">{outcome.dependsOn.join(', ') || 'None'}</Fact>
        </dl>
        {proof.unavailableReason && <p>{proof.unavailableReason}</p>}
      </details>
      <details className="brief-latest-state">
        <summary>
          Latest recorded mission state:{' '}
          {latest.status ? statusLabel(latest.status) : 'Unavailable'}
        </summary>
        <p>
          This saved state is separate from checkpoint proof. It does not establish current source
          freshness.
          {latest.hasLaterEvents === true &&
            ' Later mission events are recorded after the checkpoint boundary.'}
          {latest.hasLaterEvents === false &&
            ' No later mission events are recorded after the checkpoint boundary.'}
        </p>
        {latest.unavailableReason && <p>{latest.unavailableReason}</p>}
        {latest.reason && <p>Saved mission reason: {latest.reason}</p>}
        <dl className="brief-facts">
          <Fact label="Source mission">{latest.runId}</Fact>
          <Fact label="Latest recorded sequence">{latest.seq}</Fact>
          <Fact label="Latest recorded update">{latest.at}</Fact>
          <Fact label="Latest contract version">{latest.contractVersion}</Fact>
        </dl>
        <h5>Latest recorded criterion results</h5>
        <CriterionResults criteria={latest.criteria} />
      </details>
    </>
  );
}

function SharedUsage({ brief }: { brief: DelegationBrief }) {
  const { usage, limits } = brief;
  return (
    <section aria-label="Original limits and shared usage">
      <h3>Original limits and shared usage</h3>
      <p>
        Reported usage from {count(usage.runIds.length)} unique linked{' '}
        {usage.runIds.length === 1 ? 'mission' : 'missions'}, counted once each.{' '}
        {usage.complete
          ? 'All linked mission histories are available; reported totals still exclude unreported usage.'
          : `Totals are partial: ${count(usage.unavailableRunIds.length)} linked mission histories are unavailable. Remaining turns and tokens are unknown.`}
      </p>
      <dl className="brief-facts brief-usage-summary">
        <Fact label={usage.complete ? 'Reported turns' : 'Reported turns (partial)'}>
          {count(usage.turns)} / {count(limits.maxTurns)} authorized
        </Fact>
        <Fact label={usage.complete ? 'Reported tokens' : 'Reported tokens (partial)'}>
          {count(usage.tokens)} / {count(limits.maxTokens)} authorized
        </Fact>
        <Fact label="Remaining turns">{count(usage.remainingTurns)}</Fact>
        <Fact label="Remaining tokens">{count(usage.remainingTokens)}</Fact>
        <Fact label="Elapsed authorization time">{duration(usage.elapsedMs)}</Fact>
        <Fact label="Remaining authorization window">{duration(usage.remainingDurationMs)}</Fact>
      </dl>
      <p className="muted">
        Time includes pauses. A new mission or resume never resets the original window.
      </p>
      <details className="brief-provenance">
        <summary>Original authorization, limits and accounting</summary>
        <dl className="brief-facts">
          <Fact label="Original authorization time">{usage.authorizedAt}</Fact>
          <Fact label="Original authorization deadline">{usage.authorizationDeadline}</Fact>
          <Fact label="Usage observed at">{usage.observedAt}</Fact>
          <Fact label="Original maximum turns">{count(limits.maxTurns)}</Fact>
          <Fact label="Original maximum tokens">{count(limits.maxTokens)}</Fact>
          <Fact label="Original time window">
            {duration(limits.maxDurationMs)} ({count(limits.maxDurationMs)} ms)
          </Fact>
          <Fact label="Maximum attempts">{count(limits.maxAttempts)}</Fact>
          <Fact label="Turn timeout">
            {duration(limits.turnTimeoutMs)} ({count(limits.turnTimeoutMs)} ms)
          </Fact>
          <Fact label="Maximum turns without progress">{count(limits.maxNoProgress)}</Fact>
          <Fact label="Approval hash">
            <code>{brief.approval.specHash}</code>
          </Fact>
          <Fact label="Original source HEAD">
            <code>{brief.approval.sourceHead}</code>
          </Fact>
        </dl>
        <p>{usage.accounting}</p>
        <h4>Usage by unique mission</h4>
        <ul className="brief-mission-usage">
          {usage.missions.map((mission) => (
            <li key={mission.runId}>
              <code>{mission.runId}</code>
              <p>
                Reported turns: {count(mission.turns)} · reported tokens: {count(mission.tokens)} ·{' '}
                source sequence: {count(mission.sourceSeq)}
              </p>
              {usage.unavailableRunIds.includes(mission.runId) && (
                <p>Mission history unavailable; usage unknown.</p>
              )}
            </li>
          ))}
        </ul>
        {!usage.missions.length && <p>No missions are linked to the approved outcomes yet.</p>}
      </details>
    </section>
  );
}

function OutcomeList({
  outcomes,
  openRun,
}: {
  outcomes: Outcome[];
  openRun: (id: string) => void;
}) {
  return (
    <ol className="brief-outcomes">
      {outcomes.map((outcome) => (
        <li key={outcome.id} className="brief-outcome">
          <h4>{outcome.title}</h4>
          <p>{outcome.outcome}</p>
          <p className="muted">
            Saved outcome status: <strong>{statusLabel(outcome.status)}</strong>
          </p>
          {outcome.runId ? (
            <button className="button" onClick={() => openRun(outcome.runId!)}>
              Open source mission in Live Trail
            </button>
          ) : (
            <p className="muted">No source mission is linked yet.</p>
          )}
          <OutcomeEvidence outcome={outcome} />
        </li>
      ))}
    </ol>
  );
}

const briefFormats = {
  json: {
    label: 'JSON',
    mime: 'application/json',
    endpoint: 'brief?format=json',
    extension: 'json',
  },
  markdown: {
    label: 'Markdown',
    mime: 'text/markdown',
    endpoint: 'brief?format=markdown',
    extension: 'md',
  },
  html: {
    label: 'HTML report',
    mime: 'text/html',
    endpoint: 'report',
    extension: 'html',
  },
} as const;
type BriefFormat = keyof typeof briefFormats;

function BriefExports({
  delegationId,
  refreshRevision,
  active,
  token,
}: {
  delegationId: string;
  refreshRevision: number;
  active: boolean;
  token: string;
}) {
  const descriptionId = useId();
  const [pending, setPending] = useState<BriefFormat | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const request = useRef<{
    controller: AbortController;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const downloads = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    setPending(null);
    setError('');
    setMessage('');
    return () => {
      const previous = request.current;
      request.current = null;
      if (previous) {
        clearTimeout(previous.timer);
        previous.controller.abort();
      }
      for (const [url, timer] of downloads.current) {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
      }
      downloads.current.clear();
    };
  }, [delegationId, active, token, refreshRevision]);

  async function download(format: BriefFormat) {
    if (!active || !token || request.current) return;
    const controller = new AbortController();
    let timedOut = false;
    const exchange = {
      controller,
      timer: setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, 30_000),
    };
    request.current = exchange;
    const { label, mime, endpoint, extension } = briefFormats[format];
    setPending(format);
    setError('');
    setMessage('');
    let anchor: HTMLAnchorElement | undefined;
    let objectUrl: string | undefined;
    try {
      const response = await fetch(
        `/api/delegations/${encodeURIComponent(delegationId)}/${endpoint}`,
        {
          method: 'GET',
          headers: { 'X-Iterfox-Token': token, Accept: mime },
          cache: 'no-store',
          signal: controller.signal,
        },
      );
      // Markdown and HTML are downloaded as text, never inserted into the live page.
      const content = await response.text();
      if (!response.ok) {
        let detail = '';
        try {
          const problem = JSON.parse(content) as { error?: unknown } | null;
          if (typeof problem?.error === 'string') detail = ` ${problem.error}`;
        } catch {
          // An unreadable error body still has a useful HTTP status.
        }
        throw new Error(`The runtime returned HTTP ${response.status}.${detail}`);
      }
      if (response.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== mime)
        throw new Error('The runtime returned an unexpected document format. Retry the download.');
      if (format === 'json') {
        const brief = JSON.parse(content) as Partial<DelegationBrief> | null;
        if (brief?.delegationId !== delegationId || brief.schemaVersion !== 1)
          throw new Error('The runtime returned a brief for an unexpected selection.');
      }
      controller.signal.throwIfAborted();
      if (request.current !== exchange) return;
      objectUrl = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
      anchor = document.createElement('a');
      anchor.href = objectUrl;
      const filenameId = delegationId.replace(/[^a-zA-Z0-9_-]/g, '_');
      anchor.download =
        format === 'html'
          ? `iterfox-project-report-${filenameId.slice(0, 80) || 'delegation'}.html`
          : `iterfox-project-brief-${filenameId}.${extension}`;
      anchor.hidden = true;
      document.body.append(anchor);
      anchor.click();
      // Let the browser acquire the blob before releasing it. Selection/view
      // changes and unmount also release any URLs whose timer has not fired.
      const url = objectUrl;
      downloads.current.set(
        url,
        setTimeout(() => {
          URL.revokeObjectURL(url);
          downloads.current.delete(url);
        }, 1000),
      );
      objectUrl = undefined;
      setMessage(`${label} download requested.`);
    } catch (failure) {
      if (request.current !== exchange) return;
      const detail = timedOut
        ? 'The runtime did not respond in time. Retry the download.'
        : failure instanceof Error
          ? failure.message
          : String(failure);
      const action =
        format === 'html' ? 'download project report HTML' : `export project brief ${label}`;
      setError(`Could not ${action}. ${detail}`);
    } finally {
      clearTimeout(exchange.timer);
      anchor?.remove();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (request.current === exchange) {
        request.current = null;
        setPending(null);
      }
    }
  }

  return (
    <div
      className="brief-exports"
      role="group"
      aria-label="Project brief downloads"
      aria-busy={pending !== null}
    >
      <div className="project-actions">
        <button
          className="button"
          disabled={!active || !token || pending !== null}
          onClick={() => void download('json')}
        >
          Export project brief JSON
        </button>
        <button
          className="button"
          disabled={!active || !token || pending !== null}
          onClick={() => void download('markdown')}
        >
          Export project brief Markdown
        </button>
        <button
          className="button"
          disabled={!active || !token || pending !== null}
          aria-describedby={descriptionId}
          onClick={() => void download('html')}
        >
          Download project report HTML
        </button>
      </div>
      <p id={descriptionId} className="muted small-text">
        Downloads read the latest saved brief for this delegation. The HTML report is a
        self-contained snapshot for offline reading.
      </p>
      <p role="status" className="brief-download-status">
        {pending ? `Preparing ${briefFormats[pending].label} download…` : message}
      </p>
      {error && (
        <p role="alert" className="project-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** A saved-record reader; opening the brief never authorizes or resumes work. */
export function DelegationBriefReader({
  delegationId,
  savedRevision,
  refreshRevision,
  active,
  token,
  openRun,
}: {
  delegationId: string;
  savedRevision: number;
  refreshRevision: number;
  active: boolean;
  token: string;
  openRun: (id: string) => void;
}) {
  const regionId = useId();
  const [opened, setOpened] = useState(false);
  const [reload, setReload] = useState(0);
  const [read, setRead] = useState<BriefRead>({ loading: false, error: '' });

  useEffect(() => {
    if (!opened || !active || !token) return;
    const controller = new AbortController();
    let obsolete = false;
    setRead((previous) => ({ ...previous, loading: true, error: '' }));
    void launchApi<DelegationBrief>(
      `/api/delegations/${encodeURIComponent(delegationId)}/brief`,
      token,
      undefined,
      controller.signal,
    )
      .then((brief) => {
        if (obsolete) return;
        if (brief.delegationId !== delegationId || brief.schemaVersion !== 1)
          throw new Error(
            'The runtime returned an unexpected project brief. Retry this selection.',
          );
        setRead({ brief, loading: false, error: '' });
      })
      .catch((error: unknown) => {
        if (obsolete) return;
        setRead((previous) => ({
          ...previous,
          loading: false,
          error: error instanceof Error ? error.message : String(error),
        }));
      });
    return () => {
      // Ignore late transports as well as aborting fetch when the selection,
      // token, saved revision, reconnect or active view changes. The parent
      // also keys this reader by ID, so another selection starts closed.
      obsolete = true;
      controller.abort();
    };
  }, [opened, active, token, delegationId, savedRevision, refreshRevision, reload]);

  const brief = read.brief?.delegationId === delegationId ? read.brief : undefined;
  const remaining = brief?.outcomes.filter((outcome) => outcome.status !== 'CHECKPOINTED') ?? [];
  const checkpointed = brief?.outcomes.filter((outcome) => outcome.status === 'CHECKPOINTED') ?? [];
  function refresh() {
    setOpened(true);
    setReload((revision) => revision + 1);
  }

  return (
    <div className="delegation-brief-reader">
      <button
        className="button"
        aria-expanded={opened}
        aria-controls={opened ? regionId : undefined}
        disabled={!active || !token}
        onClick={refresh}
      >
        Read project brief
      </button>
      {opened && (
        <section
          id={regionId}
          className="project-card delegation-brief"
          aria-label="Project morning brief"
          aria-busy={active && !!token && read.loading}
        >
          <p className="eyebrow">SAVED PROJECT SUMMARY</p>
          <h2>Project morning brief</h2>
          {!token && (
            <p role="status">
              Waiting for a runtime connection to read this project brief.{' '}
              {brief && 'The previous snapshot is retained; newer saved records may be missing.'}
            </p>
          )}
          {token && read.loading && (
            <p role="status">
              {brief
                ? 'Refreshing project brief. Showing the saved snapshot below.'
                : 'Loading project brief…'}
            </p>
          )}
          {read.error && (
            <div role="alert" className="project-error">
              <p>
                Could not {brief ? 'refresh' : 'load'} the project brief.{' '}
                {brief && 'The previous snapshot is retained; newer saved records may be missing. '}
                {read.error}
              </p>
              <button
                className="button"
                disabled={!active || !token || read.loading}
                onClick={refresh}
              >
                Retry project brief
              </button>
            </div>
          )}
          {brief && (
            <>
              <h3>Selected goal</h3>
              <p>{brief.goal}</p>
              <p>
                <strong>
                  {brief.completedOutcomeCount}/{brief.outcomes.length} outcomes checkpointed
                </strong>{' '}
                · {brief.pendingOutcomeCount} remaining
              </p>
              <p className="muted">
                Saved delegation status: {brief.status}. Snapshot read{' '}
                {new Date(brief.observedAt).toLocaleString()} · saved revision {brief.revision}.
              </p>
              <section aria-label="Saved attention">
                <h3>Saved attention</h3>
                {brief.attention.length ? (
                  <ul>
                    {brief.attention.map((attention, index) => (
                      <li key={index}>
                        <p>{attention.text}</p>
                        <p className="muted">
                          {attention.kind === 'question'
                            ? 'Unresolved linked question'
                            : attention.kind === 'provenance-unavailable'
                              ? 'Unavailable provenance'
                              : attention.kind === 'mission-reason'
                                ? 'Saved mission reason'
                                : 'Saved delegation reason'}
                          {attention.source.seq !== undefined &&
                            ` · source sequence ${attention.source.seq}`}
                        </p>
                        {attention.source.runId && (
                          <button
                            className="button"
                            onClick={() => openRun(attention.source.runId!)}
                          >
                            Open source mission in Live Trail
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    No saved blocking reason or unresolved linked question is recorded in the
                    available history.
                  </p>
                )}
              </section>
              <div className="project-notice">
                <p>
                  Checkpoints are historical technical results. Current source freshness is{' '}
                  {brief.sourceFreshness.status.toLowerCase()}. {brief.sourceFreshness.explanation}
                </p>
                <p>
                  <strong>Operator product review required.</strong> {brief.productAcceptance}
                </p>
              </div>
              <BriefExports
                delegationId={delegationId}
                refreshRevision={refreshRevision}
                active={active}
                token={token}
              />
              <section aria-label="Remaining outcomes">
                <h3>Remaining outcomes</h3>
                {remaining.length ? (
                  <OutcomeList outcomes={remaining} openRun={openRun} />
                ) : (
                  <p>No approved outcomes remain without a recorded checkpoint.</p>
                )}
              </section>
              <section aria-label="Checkpointed outcomes">
                <h3>Checkpointed outcomes</h3>
                {checkpointed.length ? (
                  <OutcomeList outcomes={checkpointed} openRun={openRun} />
                ) : (
                  <p>No outcomes have a saved checkpoint yet.</p>
                )}
              </section>
              <SharedUsage brief={brief} />
              <details>
                <summary>How to read this saved evidence</summary>
                <p>{brief.evidenceBoundary}</p>
              </details>
            </>
          )}
        </section>
      )}
    </div>
  );
}
