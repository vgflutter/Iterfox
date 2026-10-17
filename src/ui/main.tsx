import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
  type NodeProps,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  project,
  type RunEvent,
  type RunState,
  type TaskNode,
  type Evidence,
  type Criterion,
} from '../core/model.js';
import { brief } from '../core/brief.js';
import { graphFor, type TrailData } from './graph.js';
import './style.css';

const icons: Record<string, string> = {
  PENDING: '○',
  RUNNING: '◉',
  VERIFYING: '◎',
  PASSED: '✓',
  ASSESSED: '◇',
  FAILED: '×',
  BLOCKED: '!',
  STALE: '↻',
  SKIPPED: '−',
  UNVERIFIED: '?',
  COMPLETED: '✓',
  PARTIAL: '◐',
  PAUSED: 'Ⅱ',
  STOPPED: '■',
};
const time = (s: string) =>
  new Date(s).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const label = (s: string) => s.toLowerCase().replaceAll('_', ' ');
function Fox({ small = false }: { small?: boolean }) {
  return <img src="/fox.svg" alt="" className={small ? 'fox small' : 'fox'} />;
}
function Status({ value }: { value: string }) {
  return (
    <span className={`status ${value.toLowerCase()}`}>
      <span aria-hidden="true">{icons[value] ?? '○'}</span> {value}
    </span>
  );
}
function TrailNode({ data, selected }: NodeProps<Node<TrailData>>) {
  return (
    <div
      className={`trail-node ${data.status.toLowerCase()} ${data.kind} ${selected ? 'selected' : ''} ${data.motion === false ? 'motion-suspended' : ''}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="node-eyebrow">
        <span>
          {data.kind === 'acceptance'
            ? '◇ ACCEPTANCE'
            : data.role === 'planner'
              ? '⌘ PLANNER'
              : data.role === 'builder'
                ? '⌁ BUILDER'
                : '◎ RUNTIME CHECK'}
        </span>
        <span>
          {data.attempt > 0 ? String(data.attempt).padStart(2, '0') : `v${data.contractVersion}`}
        </span>
      </div>
      <strong>{data.title}</strong>
      <div className="node-footer">
        <Status value={data.status} />
        <span>{data.criterionId}</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
function TrailEdge(props: EdgeProps) {
  const [path, x, y] = getSmoothStepPath({ ...props, borderRadius: 18 });
  const active = props.data?.active;
  return (
    <>
      <BaseEdge path={path} style={props.style} />
      {props.data?.kind === 'repair' && (
        <text x={x + 8} y={y - 5} className="edge-label">
          adapt
        </text>
      )}
      {active === true && (
        <g className="agent-traveler">
          <circle r="10" fill="#e2a274" />
          <path d="m-5-5 5 3 5-3-1 8-4 3-4-3Z" fill="#151915" />
          <animateMotion dur="0.8s" repeatCount="1" fill="freeze" path={path} />
        </g>
      )}
    </>
  );
}
const nodeTypes = { trail: TrailNode };
const edgeTypes = { trail: TrailEdge };
async function api(path: string, body?: unknown, token?: string) {
  const r = await fetch(
    path,
    body === undefined
      ? {}
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Iterfox-Token': token ?? '' },
          body: JSON.stringify(body),
        },
  );
  const data = await r.json();
  if (!r.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

function App() {
  const [runs, setRuns] = useState<RunState[]>([]);
  const [runId, setRunId] = useState<string>();
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [token, setToken] = useState('');
  const [executionHost, setExecutionHost] = useState('Runtime host');
  const [view, setView] = useState('trail');
  const [selected, setSelected] = useState<string>();
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);
  const [replay, setReplay] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [filter, setFilter] = useState('all');
  const [grouped, setGrouped] = useState(false);
  const [newRun, setNewRun] = useState(false);
  const [busy, setBusy] = useState(false);
  const refresh = async () => {
    const rs = await api('/api/runs');
    setRuns(rs);
    setRunId((id) => id ?? rs[0]?.id);
  };
  useEffect(() => {
    api('/api/meta')
      .then((m) => {
        setToken(m.token);
        setExecutionHost(m.executionHost ?? 'Runtime host');
      })
      .catch((e) => setError(e.message));
    refresh().catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    if (!runId) return;
    setEvents([]);
    setReplay(null);
    setSelected(undefined);
    setFilter('all');
    let source: EventSource | undefined;
    let cancelled = false;
    api(`/api/runs/${runId}/events`)
      .then((initial: RunEvent[]) => {
        if (cancelled) return;
        setEvents(initial);
        source = new EventSource(`/api/runs/${runId}/stream?after=${initial.at(-1)?.seq ?? 0}`);
        source.onopen = () => setConnected(true);
        source.onerror = () => setConnected(false);
        source.onmessage = (e) => {
          const event: RunEvent = JSON.parse(e.data);
          setEvents((prev) => (prev.some((p) => p.seq === event.seq) ? prev : [...prev, event]));
          if (event.type.startsWith('workflow.')) refresh().catch(() => {});
        };
      })
      .catch((e) => setError(e.message));
    return () => {
      cancelled = true;
      source?.close();
      setConnected(false);
    };
  }, [runId]);
  useEffect(() => {
    if (!playing || replay === null) return;
    const timer = setInterval(
      () =>
        setReplay((r) => {
          if (r === null || r >= events.length) {
            setPlaying(false);
            return r;
          }
          return r + 1;
        }),
      650,
    );
    return () => clearInterval(timer);
  }, [playing, replay === null, events.length]);
  const live = useMemo(() => (events.length ? project(events) : undefined), [events]);
  const state = useMemo(
    () =>
      replay === null
        ? live
        : events.length
          ? project(events.slice(0, Math.max(1, replay)))
          : undefined,
    [events, live, replay],
  );
  const graph = useMemo(
    () => (state ? graphFor(state, filter, grouped) : { nodes: [], edges: [] }),
    [state, filter, grouped],
  );
  const active = state?.nodes.find((n) => ['RUNNING', 'VERIFYING'].includes(n.status));
  const animatedEdges = useMemo(
    () =>
      graph.edges.map((e) => ({
        ...e,
        data: { ...e.data, active: e.target === active?.id && (replay !== null || connected) },
      })),
    [graph.edges, active?.id, replay, connected],
  );
  const b = useMemo(
    () => (state ? brief(state, events.slice(0, state.seq)) : undefined),
    [state, events],
  );
  const selectedNode = state?.nodes.find((n) => n.id === selected);
  const selectedCriterion = selected?.startsWith('acceptance-')
    ? state?.contract.criteria.find((c) => `acceptance-${c.id}` === selected)
    : undefined;
  const selectedProofs = state?.evidence.filter((e) =>
    selectedCriterion
      ? e.criterionId === selectedCriterion.id
      : selectedNode?.evidenceIds.includes(e.id),
  );
  async function control(action: string) {
    if (!runId) return;
    setBusy(true);
    try {
      await api(`/api/runs/${runId}/control`, { action }, token);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Iterfox home">
          <Fox />
          <span>
            iterfox<span className="brand-dot">.</span>
          </span>
          <small>LOCAL</small>
        </a>
        <div className="workspace-label">
          YOUR WORKSPACE <span>↗</span>
        </div>
        <nav aria-label="Run views">
          {[
            ['trail', '⌘', 'Live Trail'],
            ['brief', '☷', 'Morning Brief'],
            ['proof', '◇', 'Proof Ledger'],
            ['history', '◷', 'Decision history'],
          ].map(([id, icon, title]) => (
            <button
              key={id}
              className={view === id ? 'nav-item active' : 'nav-item'}
              onClick={() => setView(id)}
            >
              <span>{icon}</span>
              {title}
              {id === 'trail' && <small>{live?.nodes.length ?? '–'}</small>}
            </button>
          ))}
        </nav>
        <div className="section-label">
          RUNS{' '}
          <button
            title="Refresh runs"
            aria-label="Refresh runs"
            onClick={() => refresh().catch((e) => setError(e.message))}
          >
            ↻
          </button>
        </div>
        <div className="run-list">
          {runs.map((r) => (
            <button
              key={r.id}
              className={`run-item ${r.id === runId ? 'chosen' : ''}`}
              onClick={() => setRunId(r.id)}
            >
              <span className={`run-dot ${r.status.toLowerCase()}`} />
              <span>
                <strong>{r.goal}</strong>
                <small>
                  {new Date(r.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}{' '}
                  · {r.provider === 'demo' ? 'DEMO' : 'Codex'}
                </small>
              </span>
            </button>
          ))}
        </div>
        <button className="new-run" onClick={() => setNewRun(true)}>
          ＋ New run
        </button>
        <div className="local-note">
          <span className="local-icon">⌂</span>
          <strong title={executionHost}>{executionHost}</strong>
          <p>This host owns the run. Codex requests use its configured authentication.</p>
          <span className="mono">
            v0.1.0 <span>•</span> Early release
          </span>
        </div>
        <div className="sidebar-footer">
          <span className={connected ? 'connection-dot' : 'connection-dot offline'} />
          {connected
            ? 'Event stream connected'
            : state
              ? 'Reconnecting to runtime'
              : 'Local runtime'}
          <span>↗</span>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <div>
            <span className="muted">Workspace</span>
            <span className="slash">/</span>
            <span>
              {view === 'trail'
                ? 'Live Trail'
                : view === 'brief'
                  ? 'Morning Brief'
                  : view === 'proof'
                    ? 'Proof Ledger'
                    : 'Decision history'}
            </span>
          </div>
          <div className="topbar-right">
            <span className="local-pill">⌂ {executionHost}</span>
            <a
              href="https://github.com/vgflutter/Iterfox"
              target="_blank"
              rel="noreferrer"
              aria-label="Iterfox on GitHub"
            >
              ↗
            </a>
          </div>
        </header>
        {error && (
          <div role="alert" className="error-banner">
            {error}
            <button aria-label="Dismiss error" onClick={() => setError('')}>
              ×
            </button>
          </div>
        )}
        {!state ? (
          <div className="empty">
            <Fox />
            <h1>
              Delegate the work.
              <br />
              <span>Wake up to evidence.</span>
            </h1>
            <p>
              Start with a goal and a few checks you trust.
              <br />
              Iterfox keeps the work moving and the evidence visible.
            </p>
            <button className="primary" onClick={() => setNewRun(true)}>
              ＋ Start a Night Run
            </button>
            <code>npm run demo</code>
            <small>The demo uses a labeled fixture and real local checks.</small>
          </div>
        ) : (
          <>
            <section className="run-heading">
              <div className="eyebrow">
                {state.provider === 'demo'
                  ? 'DEMO RUN · DETERMINISTIC FIXTURE'
                  : 'CODEX RUN · SEQUENTIAL EXECUTION'}{' '}
                <span>/</span> {state.id.slice(-8)}
              </div>
              <div className="heading-row">
                <div>
                  <h1>
                    {view === 'brief'
                      ? 'The work. The proof. The next step.'
                      : view === 'proof'
                        ? 'Evidence you can inspect.'
                        : view === 'history'
                          ? 'Every change of direction.'
                          : 'Follow the work.'}
                  </h1>
                  <p className="goal-text">{state.goal}</p>
                </div>
                <div className="run-controls">
                  <Status value={state.status} />
                  {replay === null && (
                    <>
                      {state.status === 'RUNNING' ? (
                        <button disabled={busy} onClick={() => control('pause')}>
                          Ⅱ Pause
                        </button>
                      ) : (
                        ['PAUSED', 'BLOCKED', 'STOPPED', 'PARTIAL'].includes(state.status) && (
                          <button disabled={busy} onClick={() => control('resume')}>
                            ▷ Resume
                          </button>
                        )
                      )}
                      {!['COMPLETED', 'STOPPED', 'FAILED'].includes(state.status) && (
                        <button
                          className="icon-button"
                          disabled={busy}
                          onClick={() => control('stop')}
                        >
                          ■ Stop
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
            <section className="metrics" aria-label="Run overview">
              <div>
                <span>ACCEPTANCE VERIFIED</span>
                <strong>
                  {b?.verified}
                  <em> / {state.criteria.length}</em>
                  <small className="sage">
                    {b?.assessed
                      ? `${b.assessed} AI-assessed · ${b.open} open`
                      : b?.open === 0
                        ? 'All criteria met'
                        : `${b?.open} still open`}
                  </small>
                </strong>
                <div className={`progress-track ${b?.assessed ? 'assessed-progress' : ''}`}>
                  <i
                    style={{
                      width: `${(((b?.verified ?? 0) + (b?.assessed ?? 0)) / state.criteria.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <span>RUNTIME CHECKS</span>
                <strong>
                  {b?.checks.passed}
                  <em> passed</em>
                  <small>
                    {b?.checks.failed} failed · {b?.checks.stale} stale
                  </small>
                </strong>
                <p>Recorded exit codes & file fingerprints</p>
              </div>
              <div>
                <span>PLAN ADAPTATIONS</span>
                <strong>
                  {b?.corrections.length}
                  <em> corrective {b?.corrections.length === 1 ? 'task' : 'tasks'}</em>
                </strong>
                <p>Created in response to observed failures</p>
              </div>
              <div>
                <span>RESOURCES</span>
                <strong>
                  {Math.round((b?.resources.elapsedMs ?? 0) / 1000)}
                  <em> sec</em>
                  <small>{state.turns} agent turns</small>
                </strong>
                <p>{state.tokens.toLocaleString()} reported tokens · cost unmeasured</p>
              </div>
            </section>
            {state.reason && (
              <div className="attention-banner">
                <span>!</span>
                <div>
                  <strong>Attention required</strong>
                  <p>{state.reason}</p>
                </div>
              </div>
            )}
            {view === 'trail' && (
              <div
                className={`trail-layout ${selectedNode || selectedCriterion ? 'with-detail' : ''}`}
              >
                <section className="canvas-card">
                  <div className="card-toolbar">
                    <div>
                      <span className="live-glyph">⌘</span>
                      <strong>Live Trail</strong>
                      <span className="count-label">{state.nodes.length} activities</span>
                      {replay !== null && (
                        <span className="replay-tag">REPLAY · EVENT {replay}</span>
                      )}
                    </div>
                    <div>
                      <select
                        aria-label="Filter acceptance criterion"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="all">All criteria</option>
                        {state.contract.criteria.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                      <button
                        className={grouped ? 'toggled' : ''}
                        onClick={() => setGrouped(!grouped)}
                        title="Group past checks"
                      >
                        {grouped ? 'Expand checks' : 'Group checks'}
                      </button>
                    </div>
                  </div>
                  <div className="canvas" data-testid="live-trail">
                    <div className="canvas-caption">
                      <span>EXECUTION GRAPH</span>
                      <span>↓ linked to acceptance</span>
                    </div>
                    <ReactFlow
                      key={`${state.id}-${filter}-${grouped}`}
                      nodes={graph.nodes.map((n) => ({
                        ...n,
                        data: { ...n.data, motion: connected || replay !== null },
                        selected: n.id === selected,
                      }))}
                      edges={animatedEdges}
                      nodeTypes={nodeTypes}
                      edgeTypes={edgeTypes}
                      onNodeClick={(_, n) => setSelected(n.id)}
                      onPaneClick={() => setSelected(undefined)}
                      fitView
                      fitViewOptions={{ padding: 0.18 }}
                      minZoom={0.12}
                      maxZoom={1.4}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      proOptions={{ hideAttribution: false }}
                      colorMode="dark"
                      aria-label="Execution and acceptance workflow graph"
                    >
                      <Background color="#363c33" gap={22} size={1} />
                      <Controls showInteractive={false} />
                      <MiniMap
                        pannable
                        zoomable
                        nodeColor={(n) =>
                          n.data.status === 'PASSED'
                            ? '#93a980'
                            : n.data.status === 'FAILED'
                              ? '#bb7569'
                              : '#50564a'
                        }
                        maskColor="rgba(16,19,16,.75)"
                      />
                    </ReactFlow>
                  </div>
                  <div className="graph-legend">
                    {[
                      'PENDING',
                      'RUNNING',
                      'VERIFYING',
                      'PASSED',
                      'ASSESSED',
                      'FAILED',
                      'BLOCKED',
                      'STALE',
                      'SKIPPED',
                      'UNVERIFIED',
                    ].map((s) => (
                      <span key={s} className={s.toLowerCase()}>
                        <i>{icons[s]}</i>
                        {label(s)}
                      </span>
                    ))}
                  </div>
                  <div className="replay-bar">
                    <button
                      aria-label={playing ? 'Pause replay' : 'Play recorded events'}
                      onClick={() => {
                        setReplay((r) => (r === null || r >= events.length ? 1 : r));
                        setPlaying(!playing);
                      }}
                    >
                      {playing ? 'Ⅱ' : '▷'}
                    </button>
                    <span>Decision replay</span>
                    <input
                      aria-label="Replay event"
                      type="range"
                      min="1"
                      max={events.length}
                      value={replay ?? events.length}
                      onChange={(e) => {
                        setReplay(Number(e.target.value));
                        setPlaying(false);
                      }}
                    />
                    <span className="mono">
                      {replay ?? events.length}/{events.length}
                    </span>
                    <button
                      className={replay === null ? 'live-button current' : 'live-button'}
                      onClick={() => {
                        setReplay(null);
                        setPlaying(false);
                      }}
                    >
                      ● Live
                    </button>
                  </div>
                </section>
                {selectedNode || selectedCriterion ? (
                  <aside className="detail-panel">
                    <div className="panel-title">
                      <span>ACTIVITY DETAILS</span>
                      <button aria-label="Close details" onClick={() => setSelected(undefined)}>
                        ×
                      </button>
                    </div>
                    <h2>{selectedNode?.title ?? selectedCriterion?.title}</h2>
                    <Status
                      value={
                        selectedNode?.status ??
                        state.criteria.find((c) => c.id === selectedCriterion!.id)!.status
                      }
                    />
                    <dl>
                      <dt>Objective</dt>
                      <dd>{selectedNode?.objective ?? selectedCriterion?.title}</dd>
                      <dt>Why this exists</dt>
                      <dd>
                        {selectedNode?.reason ??
                          `Approved acceptance contract v${state.contractVersion}`}
                      </dd>
                      <dt>Responsible role</dt>
                      <dd>
                        {selectedNode?.role ?? 'Runtime verifier'}
                        {selectedNode?.role === 'planner' && ' · same Codex integration'}
                      </dd>
                      <dt>Attempt</dt>
                      <dd>{selectedNode?.attempt ?? 'See recorded checks'}</dd>
                      {selectedNode?.threadId && (
                        <>
                          <dt>Codex session</dt>
                          <dd className="mono wrap">{selectedNode.threadId}</dd>
                        </>
                      )}
                      {selectedNode?.summary && (
                        <>
                          <dt>Result</dt>
                          <dd>{selectedNode.summary}</dd>
                        </>
                      )}
                      {selectedNode?.files.length ? (
                        <>
                          <dt>Files changed</dt>
                          <dd className="mono">{selectedNode.files.join(', ')}</dd>
                        </>
                      ) : null}
                      {selectedNode?.error && (
                        <>
                          <dt>Error</dt>
                          <dd>
                            <pre>{selectedNode.error}</pre>
                          </dd>
                        </>
                      )}
                    </dl>
                    <h3>
                      Evidence <span>{selectedProofs?.length ?? 0}</span>
                    </h3>
                    {selectedProofs?.length ? (
                      selectedProofs.map((e) => (
                        <EvidenceCard
                          key={e.id}
                          criterion={state.contracts[e.contractVersion - 1]?.criteria.find(
                            (c) => c.id === e.criterionId,
                          )}
                          runId={state.id}
                          evidence={e}
                        />
                      ))
                    ) : (
                      <p className="muted small-text">
                        No runtime evidence attached. An agent claim alone does not verify
                        acceptance.
                      </p>
                    )}
                    <h3>Next activities</h3>
                    {state.edges
                      .filter((e) => e.source === selected)
                      .map((e) => (
                        <button
                          className="next-link"
                          key={e.id}
                          onClick={() => setSelected(e.target)}
                        >
                          {state.nodes.find((n) => n.id === e.target)?.title ??
                            'Acceptance condition'}{' '}
                          ↗
                        </button>
                      ))}
                  </aside>
                ) : (
                  <aside className="trail-context">
                    <div className="panel-title">
                      <span>THE ACCEPTANCE CONTRACT</span>
                      <span>v{state.contractVersion}</span>
                    </div>
                    <h2>What has to be true.</h2>
                    <p className="muted small-text">
                      The plan can adapt.
                      <br />
                      Your success criteria stay yours.
                    </p>
                    {state.contract.criteria.map((c, i) => (
                      <button
                        key={c.id}
                        className="acceptance-card"
                        onClick={() => setSelected(`acceptance-${c.id}`)}
                      >
                        <div>
                          <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                          <span>↗</span>
                        </div>
                        <strong>{c.title}</strong>
                        <Status value={state.criteria.find((a) => a.id === c.id)!.status} />
                      </button>
                    ))}
                    <div className="integrity-note">
                      <span>◇</span>
                      <strong>A green check is earned.</strong>
                      <p>
                        Acceptance passes only when the runtime records a successful approved check.
                      </p>
                    </div>
                    <div className="last-event">
                      <span>LATEST EVENT</span>
                      <p>{events.slice(0, state.seq).at(-1)?.message}</p>
                      <small>{time(state.updatedAt)}</small>
                    </div>
                  </aside>
                )}
              </div>
            )}
            {view === 'brief' && (
              <section className="brief-view">
                <div className="brief-hero">
                  <div className="sun-mark">☼</div>
                  <div>
                    <div className="eyebrow">MORNING BRIEF</div>
                    <h2>
                      {b?.open === 0
                        ? 'The goal is backed by evidence.'
                        : 'Here’s where the work stands.'}
                    </h2>
                    <p>
                      {b?.verified} criteria verified. {b?.assessed ?? 0} AI-assessed. {b?.open}{' '}
                      still need attention. {b?.corrections.length} corrective tasks added.
                    </p>
                  </div>
                  <a className="button" href={`/api/runs/${state.id}/brief?format=markdown`}>
                    ↓ Export brief
                  </a>
                </div>
                <div className="brief-grid">
                  <article className="surface">
                    <h3>What was accomplished?</h3>
                    {b?.acceptance.map((c) => (
                      <div className="brief-criterion" key={c.id}>
                        <Status value={c.status} />
                        <strong>{c.title}</strong>
                        <button
                          onClick={() => {
                            setView('trail');
                            setSelected(`acceptance-${c.id}`);
                          }}
                        >
                          Inspect evidence ↗
                        </button>
                      </div>
                    ))}
                  </article>
                  <article className="surface">
                    <h3>What still needs attention?</h3>
                    {b?.attention.length ? (
                      b.attention.map((a) => <p key={a}>{a}</p>)
                    ) : (
                      <p>
                        All configured acceptance policies are satisfied on the recorded inputs.
                        Review the worktree diff before integrating changes.
                      </p>
                    )}
                    <div className="quiet-rule" />
                    <h4>Boundaries remain in place</h4>
                    <p className="muted small-text">
                      No automatic push, merge or deployment. Local execution cannot continue during
                      sleep or shutdown.
                    </p>
                    <code className="wrap">{state.worktree}</code>
                    <details className="diff-review">
                      <summary>Inspect worktree diff</summary>
                      <pre>{state.diff || 'No code diff recorded.'}</pre>
                    </details>
                  </article>
                  <article className="surface">
                    <h3>Why did the plan change?</h3>
                    {b?.decisions.length ? (
                      b.decisions.map((d) => (
                        <div key={d.seq} className="brief-decision">
                          <small>
                            EVENT {d.seq} · {time(d.at)}
                          </small>
                          <p>{d.message}</p>
                        </div>
                      ))
                    ) : (
                      <p>No plan changes recorded.</p>
                    )}
                  </article>
                  <article className="surface">
                    <h3>Claims, checks & uncertainty</h3>
                    <p>
                      <strong>
                        {b?.checks.passed} current deterministic checks; {b?.assessed ?? 0}{' '}
                        AI-assessed criteria.
                      </strong>{' '}
                      {b?.checks.failed} failures and {b?.checks.stale} stale proofs remain in the
                      historical ledger.
                    </p>
                    {b?.assessments.map((a) => (
                      <blockquote key={a.nodeId}>
                        {a.summary}
                        <small>Agent claim · {a.evidenceIds.length} linked checks</small>
                      </blockquote>
                    ))}
                    <p className="muted small-text">
                      Qualitative judgments use the same integration. Pixel comparisons measure
                      reference similarity. Only configured checks and rubric inputs are covered.
                    </p>
                  </article>
                </div>
              </section>
            )}
            {view === 'proof' && (
              <section className="proof-view">
                <div className="section-heading">
                  <h2>
                    Proof Ledger <span>{state.evidence.length}</span>
                  </h2>
                  <p>Every result has a source, a code fingerprint and a place in history.</p>
                </div>
                <div className="evidence-grid">
                  {state.evidence.map((e) => (
                    <EvidenceCard
                      key={e.id}
                      criterion={state.contracts[e.contractVersion - 1]?.criteria.find(
                        (c) => c.id === e.criterionId,
                      )}
                      runId={state.id}
                      evidence={e}
                      expanded
                    />
                  ))}
                </div>
                {!state.evidence.length && <p>No checks have produced evidence yet.</p>}
              </section>
            )}
            {view === 'history' && (
              <section className="history-view">
                <div className="section-heading">
                  <h2>A trail of decisions.</h2>
                  <p>Durable events, in order. Replay uses this ledger and makes no model calls.</p>
                </div>
                <ol className="timeline">
                  {events.map((e) => (
                    <li key={e.id}>
                      <span
                        className={`event-marker ${e.type.includes('failed') ? 'failed' : e.type.includes('passed') ? 'passed' : ''}`}
                      >
                        {e.type.includes('failed') ? '×' : e.type.includes('passed') ? '✓' : '·'}
                      </span>
                      <time>{time(e.at)}</time>
                      <div>
                        <small>{e.type.toUpperCase()}</small>
                        <p>{e.message}</p>
                      </div>
                      <button
                        onClick={() => {
                          setReplay(e.seq);
                          setView('trail');
                        }}
                      >
                        #{e.seq} ↗
                      </button>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <footer className="page-footer">
              <span>
                <Fox small /> Delegate the work. Wake up to evidence.
              </span>
              <span>
                {state.provider === 'demo'
                  ? 'DEMO · No tokens consumed'
                  : 'Codex · Reported usage only'}{' '}
                <span>·</span> Contract v{state.contractVersion}
              </span>
            </footer>
          </>
        )}
      </main>
      {newRun && (
        <NewRun
          token={token}
          close={() => setNewRun(false)}
          created={async (id) => {
            await refresh();
            setRunId(id);
            setNewRun(false);
            setView('trail');
          }}
        />
      )}
    </div>
  );
}
function EvidenceCard({
  evidence: e,
  runId,
  criterion,
  expanded = false,
}: {
  evidence: Evidence;
  runId: string;
  criterion?: Criterion;
  expanded?: boolean;
}) {
  return (
    <details
      className={`evidence-card ${e.status} ${e.artifacts?.some((a) => a.mime === 'image/png') ? 'with-images' : ''} ${e.assessment ? 'assessment-evidence' : ''}`}
      open={(expanded && e.status !== 'recorded') || undefined}
    >
      <summary>
        <div>
          <span className={`proof-dot ${e.status}`} />
          <strong>{e.criterionId}</strong>
          <span className="evidence-kind">{e.kind}</span>
        </div>
        <span className={e.status}>
          {e.status.toUpperCase()} <span>⌄</span>
        </span>
      </summary>
      <div className="evidence-body">
        <code>{JSON.stringify(e.command)}</code>
        <div className="evidence-meta">
          <span>
            Exit <strong>{e.exitCode ?? '?'}</strong>
          </span>
          <span>{e.durationMs} ms</span>
          <span>{time(e.createdAt)}</span>
        </div>
        {e.invalidatedReason && <p className="stale-note">{e.invalidatedReason}</p>}
        <dl>
          <dt>Git HEAD</dt>
          <dd className="mono wrap">{e.stamp.head}</dd>
          <dt>File fingerprint</dt>
          <dd className="mono wrap">{e.stamp.fingerprint}</dd>
          <dt>Scope</dt>
          <dd>{e.scope.join(', ') || 'All repository files'}</dd>
        </dl>
        {e.visual && (
          <p>
            Pixel difference {(e.visual.diffRatio * 100).toFixed(3)}% · limit{' '}
            {(e.visual.maxDiffRatio * 100).toFixed(3)}%<br />
            <small>
              {e.visual.browser} · {e.visual.platform}
            </small>
          </p>
        )}
        {e.assessment && (
          <section className="assessment-report" aria-label="Qualitative assessment">
            <strong>AI-assessed · same integration, not independent review</strong>
            <p>{e.assessment.summary}</p>
            <table>
              <thead>
                <tr>
                  <th>Rubric</th>
                  <th>Score / 5</th>
                  <th>Required</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                {e.assessment.ratings.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.score}</td>
                    <td>
                      {criterion?.verification?.kind === 'qualitative'
                        ? criterion.verification.rubric.find((v) => v.id === r.id)?.minScore
                        : '?'}
                    </td>
                    <td>{r.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Limitations: {e.assessment.limitations.join(' · ')}</p>
          </section>
        )}
        {!!e.artifacts?.length && (
          <div className="artifact-gallery">
            {[...e.artifacts]
              .sort((a, b) => Number(b.mime === 'image/png') - Number(a.mime === 'image/png'))
              .map((a) => {
                const url = `/api/runs/${encodeURIComponent(runId)}/artifacts/${encodeURIComponent(a.id)}`;
                return (
                  <a key={a.id} href={url} target="_blank" rel="noreferrer">
                    {a.mime === 'image/png' && <img src={url} alt={a.name} loading="lazy" />}
                    <span>{a.name} ↗</span>
                    <small title={a.sha256}>
                      SHA-256 {a.sha256.slice(0, 12)} · {a.bytes} bytes
                    </small>
                  </a>
                );
              })}
          </div>
        )}
        {e.visual || e.assessment ? (
          <details className="raw-proof">
            <summary>Raw verifier output</summary>
            <pre>{e.output || '(no output)'}</pre>
          </details>
        ) : (
          <pre>{e.output || '(no output)'}</pre>
        )}
      </div>
    </details>
  );
}
function NewRun({
  token,
  close,
  created,
}: {
  token: string;
  close: () => void;
  created: (id: string) => void;
}) {
  const [repository, setRepository] = useState('');
  const [configPath, setConfig] = useState('');
  const [preview, setPreview] = useState<any>();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal"
      aria-label="Night Run preflight"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="panel-title">
        <span>NIGHT RUN PREFLIGHT</span>
        <button aria-label="Close preflight" onClick={close}>
          ×
        </button>
      </div>
      <h2>One goal. Clear boundaries.</h2>
      <p className="muted">
        Review the repository, approved checks and limits before starting real Codex.
      </p>
      {error && (
        <p role="alert" className="failed">
          {error}
        </p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError('');
          try {
            setPreview(await api('/api/preflight', { repository, configPath }, token));
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          Repository root
          <input
            required
            placeholder="/absolute/path/to/repository"
            value={repository}
            onChange={(e) => {
              setRepository(e.target.value);
              setPreview(undefined);
            }}
          />
        </label>
        <label>
          Acceptance configuration
          <input
            required
            placeholder="/absolute/path/to/iterfox.json"
            value={configPath}
            onChange={(e) => {
              setConfig(e.target.value);
              setPreview(undefined);
            }}
          />
        </label>
        <button className="button" disabled={busy}>
          Review preflight →
        </button>
      </form>
      {preview && (
        <div className="preflight-preview">
          <h3>{preview.contract.goal}</h3>
          <p className="mono">
            {preview.repository} · {preview.sourceBranch} · {preview.head.slice(0, 8)}
          </p>
          {preview.dirty && (
            <p>Uncommitted work is excluded and preserved. The run starts from committed HEAD.</p>
          )}
          <ul>
            {preview.contract.criteria.map((c: any) => (
              <li key={c.id}>
                {c.title}
                <code>{JSON.stringify(c.command)}</code>
              </li>
            ))}
          </ul>
          <p>Allowed edits: {preview.contract.allowedPaths.join(', ')}</p>
          <p>
            {preview.limits.maxTurns} turns · {preview.limits.maxAttempts} attempts/check ·{' '}
            {Math.round(preview.limits.maxDurationMs / 60000)} minutes ·{' '}
            {preview.limits.maxTokens.toLocaleString()} reported tokens (checked between turns)
          </p>
          <p>
            Codex sandbox: workspace-write for builds, read-only otherwise. Network and permission
            escalation disabled. Tests, configuration and secrets require operator review.
          </p>
          <p>
            Checks are trusted local commands. No automatic push, merge or deploy. Keep the computer
            awake; closing the page is safe.
          </p>
          <button
            className="primary"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const s = await api(
                  '/api/runs',
                  {
                    repository: preview.repository,
                    contract: preview.contract,
                    authorized: true,
                  },
                  token,
                );
                await created(s.id);
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            Authorize & start Night Run ↗
          </button>
        </div>
      )}
      <p className="small-text muted">
        For a fixture with no model calls, run <code>npm run demo</code> from the Iterfox source
        checkout.
      </p>
    </dialog>
  );
}
createRoot(document.getElementById('root')!).render(<App />);
