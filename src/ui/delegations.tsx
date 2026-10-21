import React, { useEffect, useState } from 'react';
import type { Delegation, DelegationSpec } from '../delegations/service.js';
import { launchApi } from './launch-api.js';
import { DelegationBriefReader } from './delegation-brief.js';
type Preview = {
  spec: DelegationSpec;
  expectedHead: string;
  permissions: string[];
  specHash: string;
  limits: DelegationSpec['contract']['limits'];
};

export function Delegations({
  active,
  token,
  reconnect,
  openRun,
}: {
  active: boolean;
  token: string;
  reconnect: () => Promise<void>;
  openRun: (id: string) => void;
}) {
  const [items, setItems] = useState<Delegation[]>([]),
    [selected, setSelected] = useState('');
  const [text, setText] = useState(''),
    [preview, setPreview] = useState<Preview>(),
    [requestId, setRequestId] = useState('');
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [uncertain, setUncertain] = useState(false);
  const [readError, setReadError] = useState('');
  const [readRevision, setReadRevision] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  useEffect(() => {
    if (!active || !token) return;
    let obsolete = false;
    let pending: AbortController | undefined;
    async function load() {
      // Keep polling, but let a slow read finish rather than overlapping reads.
      if (pending) return;
      const controller = new AbortController();
      pending = controller;
      try {
        const list = await launchApi<Delegation[]>(
          '/api/delegations',
          token,
          undefined,
          controller.signal,
        );
        if (obsolete) return;
        setItems((previous) => {
          const next = new Map(previous.map((d) => [d.id, d]));
          for (const d of list)
            if (!next.has(d.id) || next.get(d.id)!.revision <= d.revision) next.set(d.id, d);
          return [...next.values()].sort((a, b) => b.authorizedAt.localeCompare(a.authorizedAt));
        });
        setSelected((previous) => previous || list[0]?.id || '');
        setReadError('');
      } catch (e) {
        if (!obsolete) setReadError(e instanceof Error ? e.message : String(e));
      } finally {
        pending = undefined;
      }
    }
    void load();
    const timer = setInterval(() => void load(), 3000);
    return () => {
      obsolete = true;
      clearInterval(timer);
      pending?.abort();
    };
  }, [active, token, readRevision]);
  const current = items.find((d) => d.id === selected);
  async function reconnectRuntime() {
    if (reconnecting) return;
    setReconnecting(true);
    setConnectionError('');
    try {
      await reconnect();
      // A healthy runtime can return the same token. Invalidate saved reads
      // explicitly without resetting preflight, request IDs or control state.
      setReadRevision((revision) => revision + 1);
    } catch (e) {
      setConnectionError(e instanceof Error ? e.message : String(e));
    } finally {
      setReconnecting(false);
    }
  }
  async function review() {
    setBusy(true);
    setError('');
    setPreview(undefined);
    try {
      const p = await launchApi<Preview>('/api/delegations/preflight', token, JSON.parse(text));
      setPreview(p);
      setRequestId(crypto.randomUUID());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  async function authorize() {
    if (!preview || !requestId || uncertain) return;
    setBusy(true);
    setError('');
    setUncertain(true);
    try {
      const d = await launchApi<Delegation>('/api/delegations', token, {
        spec: preview.spec,
        expectedHead: preview.expectedHead,
        requestId,
        authorized: true,
      });
      setSelected(d.id);
      setItems((list) => [d, ...list.filter((x) => x.id !== d.id)]);
      setPreview(undefined);
      setUncertain(false);
    } catch (e) {
      setError(
        'Authorization response unconfirmed. Refresh and inspect the existing delegation before another submission. ' +
          (e instanceof Error ? e.message : String(e)),
      );
    } finally {
      setBusy(false);
    }
  }
  async function inspectAuthorization() {
    setBusy(true);
    setError('');
    try {
      const d = await launchApi<Delegation>('/api/delegations/' + requestId, token);
      if (preview && (d.specHash !== preview.specHash || d.sourceHead !== preview.expectedHead))
        throw new Error('Saved authorization does not match this reviewed delegation');
      setItems((list) => [d, ...list.filter((x) => x.id !== d.id)]);
      setSelected(d.id);
      setUncertain(false);
      setPreview(undefined);
    } catch (e) {
      setError(
        'Authorization is still unconfirmed. Keep this request ID and inspect again. ' +
          (e instanceof Error ? e.message : String(e)),
      );
    } finally {
      setBusy(false);
    }
  }
  async function control(action: 'pause' | 'stop' | 'resume') {
    if (!current) return;
    setBusy(true);
    setError('');
    try {
      const d = await launchApi<Delegation>(`/api/delegations/${current.id}/${action}`, token, {});
      setItems((list) => list.map((x) => (x.id === d.id ? d : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="delegations-workspace" aria-label="Continuous delegation">
      <p className="eyebrow">CONTINUOUS PROJECT WORK</p>
      <h1>Delegations</h1>
      <p>Approve your roadmap once. Return to results, evidence and decisions.</p>
      <div className="project-actions">
        <button className="button" onClick={() => setReadRevision((revision) => revision + 1)}>
          Refresh delegations
        </button>
        <button className="button" disabled={reconnecting} onClick={() => void reconnectRuntime()}>
          Reconnect runtime
        </button>
      </div>
      {connectionError && (
        <p role="alert" className="project-error">
          Could not reconnect to the runtime. {connectionError}
        </p>
      )}
      {error && (
        <p role="alert" className="project-error">
          {error}
        </p>
      )}
      {readError && (
        <p role="alert" className="project-error">
          Could not refresh delegations. Previous results are retained. {readError}
        </p>
      )}
      {uncertain && (
        <div className="project-notice">
          <p>
            No automatic retry. Inspect delegation <code>{requestId}</code>; the same request cannot
            create another delegation.
          </p>
          <button className="button" disabled={busy} onClick={() => void inspectAuthorization()}>
            Inspect saved authorization
          </button>
        </div>
      )}
      <label htmlFor="saved-delegation">Saved delegation</label>
      <select id="saved-delegation" value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a delegation</option>
        {items.map((d) => (
          <option key={d.id} value={d.id}>
            {d.spec.contract.goal.slice(0, 100)} · {d.status}
          </option>
        ))}
      </select>
      {current && (
        <>
          <section className="project-card" aria-label="Delegation progress">
            <h2>Project progress</h2>
            <p>
              <strong>
                {current.status === 'COMPLETED' ? 'Ready for your product review' : current.status}
              </strong>{' '}
              · {current.stages.filter((s) => s.status === 'CHECKPOINTED').length}/
              {current.stages.length} outcomes checkpointed
            </p>
            {current.reason && (
              <p role="alert" className="project-error">
                {current.reason}
              </p>
            )}
            <p>Checkpointed results await your product review.</p>
            <div className="project-actions">
              {['AUTHORIZED', 'RUNNING'].includes(current.status) && (
                <>
                  <button className="button" disabled={busy} onClick={() => void control('pause')}>
                    Pause delegation
                  </button>
                  <button className="button" disabled={busy} onClick={() => void control('stop')}>
                    Stop delegation
                  </button>
                </>
              )}
              {['PAUSED', 'STOPPED', 'BLOCKED'].includes(current.status) && (
                <button className="button" disabled={busy} onClick={() => void control('resume')}>
                  Resume within original limits
                </button>
              )}
            </div>
            <p className="muted small-text">
              Authorized {new Date(current.authorizedAt).toLocaleString()} · window{' '}
              {Math.round((current.spec.contract.limits.maxDurationMs / 3600000) * 10) / 10} hours,
              including pauses
            </p>
            <details>
              <summary>Approved goal</summary>
              <p>{current.spec.contract.goal}</p>
              <p className="muted">
                The original repository HEAD stays unchanged. Local checkpoints are technical
                results; they do not approve a product release.
              </p>
            </details>
          </section>
          <DelegationBriefReader
            key={current.id}
            delegationId={current.id}
            savedRevision={current.revision}
            refreshRevision={readRevision}
            active={active}
            token={token}
            openRun={openRun}
          />
          <section aria-label="Delegated outcome graph">
            <h2>Outcome graph</h2>
            <p>
              Prerequisites govern eligibility. The agent plans and adapts the work inside each
              outcome.
            </p>
            <div className="delegation-outcomes">
              {current.spec.milestones.map((m) => {
                const s = current.stages.find((s) => s.id === m.id)!;
                // Persisted stage progress remains RUNNING until a checkpoint;
                // the parent records whether its unfinished work is still active.
                const status =
                  s.status === 'RUNNING' &&
                  ['PAUSED', 'STOPPED', 'BLOCKED'].includes(current.status)
                    ? current.status
                    : s.status;
                return (
                  <article
                    key={m.id}
                    className={`project-card delegation-outcome ${status.toLowerCase()}`}
                  >
                    <p className="eyebrow">{status}</p>
                    <h3>{m.title}</h3>
                    <p>{m.outcome}</p>
                    <p className="muted">
                      Prerequisites:{' '}
                      {m.dependsOn
                        .map((id) => current.spec.milestones.find((x) => x.id === id)?.title)
                        .join(', ') || 'None'}
                    </p>
                    {s.runId && (
                      <button className="button" onClick={() => openRun(s.runId!)}>
                        Open mission in Live Trail
                      </button>
                    )}
                    {s.checkpoint && (
                      <details>
                        <summary>Verified checkpoint</summary>
                        <p>
                          <code>{s.checkpoint.head}</code>
                        </p>
                        <p>
                          Recorded source sequence {s.checkpoint.sourceSeq}. Fresh proof is required
                          in the following mission.
                        </p>
                      </details>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
          <details>
            <summary>Approved boundaries and history</summary>
            <p>
              Repository: <code>{current.spec.repository}</code>
            </p>
            <p>
              Original HEAD: <code>{current.sourceHead}</code>
            </p>
            <p>
              Approval: <code>{current.specHash}</code>
            </p>
            <p>
              Allowed edits: {current.spec.contract.allowedPaths.join(', ')}. Protected:{' '}
              {current.spec.contract.protectedPaths.join(', ')}.
            </p>
            <ul>
              {current.spec.contract.criteria.map((c) => (
                <li key={c.id}>
                  {c.title}
                  <pre>{JSON.stringify(c.command)}</pre>
                </li>
              ))}
            </ul>
            <ol>
              {current.events.map((e, i) => (
                <li key={i}>
                  {new Date(e.at).toLocaleString()} · {e.message}
                </li>
              ))}
            </ol>
          </details>
        </>
      )}
      <details className="project-card">
        <summary>Review a new continuous delegation</summary>
        <p>
          This first version imports an explicit outcome configuration. Review all goals, checks and
          limits once; execution continues across missions within that approval. No push, merge or
          deploy is authorized.
        </p>
        <label>
          Delegation configuration file
          <input
            type="file"
            accept=".json,application/json"
            disabled={busy || uncertain}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 250000) {
                setError('Configuration too large');
                return;
              }
              setText(await f.text());
              setPreview(undefined);
            }}
          />
        </label>
        <label>
          Delegation JSON
          <textarea
            rows={10}
            value={text}
            disabled={busy || uncertain}
            onChange={(e) => {
              setText(e.target.value);
              setPreview(undefined);
            }}
          />
        </label>
        <button
          className="button"
          disabled={busy || uncertain || !text.trim()}
          onClick={() => void review()}
        >
          Review continuous delegation
        </button>
        {preview && (
          <section aria-label="Delegation preflight">
            <h3>Authorize these outcomes</h3>
            <p>{preview.spec.contract.goal}</p>
            <p>
              Repository: <code>{preview.spec.repository}</code> · HEAD{' '}
              <code>{preview.expectedHead}</code>
            </p>
            <ol>
              {preview.spec.milestones.map((m) => (
                <li key={m.id}>
                  <strong>{m.title}</strong> — {m.outcome}
                  <br />
                  Checks: {m.criterionIds.join(', ')}; prerequisites:{' '}
                  {m.dependsOn.join(', ') || 'none'}
                </li>
              ))}
            </ol>
            <ul>
              {preview.permissions.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>
              Total limits: {preview.limits.maxDurationMs / 3600000} hours,{' '}
              {preview.limits.maxTurns} model turns. A new mission or Resume does not reset them.
            </p>
            <details>
              <summary>Exact approved commands</summary>
              <pre>{JSON.stringify(preview.spec.contract.criteria, null, 2)}</pre>
            </details>
            <button
              className="button primary"
              disabled={busy || uncertain}
              onClick={() => void authorize()}
            >
              Authorize and start continuous work
            </button>
          </section>
        )}
      </details>
    </section>
  );
}
