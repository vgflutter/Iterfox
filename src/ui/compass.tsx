import React, { useRef, useState } from 'react';
import type { RunState } from '../core/model.js';
import {
  activeNotes,
  heldCriteria,
  needsOrientation,
  questions,
  type NoteInput,
} from '../core/compass.js';

export function Compass({
  state,
  send,
  readOnly,
}: {
  state: RunState;
  send: (input: NoteInput) => Promise<void>;
  readOnly: boolean;
}) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState<NoteInput['kind']>('request');
  const [replyTo, setReplyTo] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const editor = useRef<HTMLTextAreaElement>(null);
  const qs = questions(state);
  const active = new Set(activeNotes(state).map((n) => n.id));
  const held = heldCriteria(state);
  const editable = !readOnly && !['COMPLETED', 'FAILED'].includes(state.status);
  return (
    <section className="compass-view" aria-label="Project Compass">
      <div className="compass-intro">
        <div>
          <span className="eyebrow">
            THE HANDOFF ·{' '}
            {state.direction ? `DIRECTION v${state.direction.revision}` : 'READY FOR YOUR CONTEXT'}
          </span>
          <h2>A direction that survives your absence.</h2>
          <p>
            Your requests, decisions and hypotheses stay connected. New notes are reconciled
            together after the current activity.
          </p>
        </div>
        <span className={`compass-state ${needsOrientation(state) ? 'waiting' : ''}`}>
          {needsOrientation(state)
            ? '◷ Awaiting reconciliation'
            : state.direction
              ? '↗ Direction recorded'
              : '＋ Add your handoff'}
        </span>
      </div>
      <div className="compass-overview">
        <article className="surface">
          <small>CURRENT FOCUS · PLAN</small>
          <h3>{state.direction?.focus ?? state.goal}</h3>
          <p>Original goal and approved acceptance checks stay in force.</p>
        </article>
        <article className="surface">
          <small>NEXT ARTIFACT · TARGET</small>
          <h3>
            {state.direction?.nextArtifact ?? 'Describe what you want to inspect when you return.'}
          </h3>
          <p>A planned deliverable. Inspect the Proof Ledger for actual results.</p>
        </article>
        <article className="surface">
          <small>WHILE DECISIONS WAIT</small>
          <h3>
            {qs.length
              ? `${qs.length} open ${qs.length === 1 ? 'question' : 'questions'} · ${held.size} ${held.size === 1 ? 'criterion' : 'criteria'} on hold`
              : 'Independent work can continue'}
          </h3>
          <p>
            {held.size
              ? [...held]
                  .map((id) => state.contract.criteria.find((c) => c.id === id)?.title)
                  .join(' · ')
              : 'Execution stays sequential and within the approved budget.'}
          </p>
        </article>
      </div>
      <div className="compass-columns">
        <div className="compass-records">
          {!!qs.length && (
            <article className="surface compass-questions" aria-label="Operator decisions">
              <small>YOUR DECISION · ONLY DEPENDENT WORK WAITS</small>
              {qs.map((q) => (
                <div className="compass-question" key={q.noteId}>
                  <blockquote>{state.notes?.find((n) => n.id === q.noteId)?.text}</blockquote>
                  <h3>{q.reason}</h3>
                  <p>
                    {q.criterionIds.length
                      ? `Waiting: ${q.criterionIds.join(', ')}`
                      : 'A product decision remains open; independent implementation can finish.'}
                  </p>
                  {editable && (
                    <button
                      className="button"
                      onClick={() => {
                        setReplyTo(q.noteId);
                        setKind('decision');
                        setFeedback('');
                        editor.current?.focus();
                      }}
                    >
                      Answer this question →
                    </button>
                  )}
                </div>
              ))}
            </article>
          )}
          <article className="surface" aria-label="Handoff history">
            <div className="section-heading">
              <h3>Your instructions, accounted for.</h3>
              <span>{state.notes?.length ?? 0} notes</span>
            </div>
            {!state.notes?.length && (
              <p className="muted">
                Leave the context you would normally scatter across follow-up messages: priorities,
                a decision you have made, or an idea to test.
              </p>
            )}
            {(state.notes ?? []).map((n) => {
              const handling = state.direction?.notes.find((d) => d.noteId === n.id);
              const status = !active.has(n.id) ? 'answered' : (handling?.disposition ?? 'pending');
              return (
                <div className="handoff-note" key={n.id}>
                  <div>
                    <small>
                      {n.kind.toUpperCase()}
                      {n.replyTo ? ' · LINKED REPLY' : ''}
                    </small>
                    <span className={`note-disposition ${status}`}>
                      {
                        {
                          applied: 'In the plan',
                          deferred: 'Later',
                          question: 'Your decision',
                          pending: 'Awaiting reconciliation',
                          answered: 'Answered',
                        }[status]
                      }
                    </span>
                  </div>
                  <p>{n.text}</p>
                  {handling && active.has(n.id) && <p className="note-reason">{handling.reason}</p>}
                  {!active.has(n.id) && (
                    <p className="note-reason">
                      A linked operator reply supersedes this note. Both remain in history.
                    </p>
                  )}
                </div>
              );
            })}
            <p className="small-text muted">
              “In the plan” describes handling of your instruction. Acceptance requires runtime
              evidence.
            </p>
          </article>
          {!!state.direction?.assumptions.length && (
            <article className="surface">
              <small>PROVISIONAL ASSUMPTIONS</small>
              <h3>Ideas to test, still unconfirmed.</h3>
              <ul>
                {state.direction.assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </article>
          )}
        </div>
        <aside className="surface handoff-composer">
          <span className="eyebrow">LEAVE THE NEXT PIECE OF CONTEXT</span>
          <h2>One more thought?</h2>
          <p>
            Write naturally. Iterfox reconciles it with the whole direction at the next activity
            boundary.
          </p>
          {editable ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setError('');
                setFeedback('');
                try {
                  await send({ text, kind, ...(replyTo ? { replyTo } : {}) });
                  setText('');
                  setReplyTo('');
                  setKind('request');
                  setFeedback(
                    state.status === 'RUNNING'
                      ? 'Saved. The current activity can finish; the new direction is next.'
                      : 'Saved. Resume the run to reconcile this handoff within the original limits.',
                  );
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              <label>
                Type of context
                <select value={kind} onChange={(e) => setKind(e.target.value as NoteInput['kind'])}>
                  <option value="request">Request · work or priority</option>
                  <option value="decision">Decision · you have chosen</option>
                  <option value="hypothesis">Hypothesis · still to test</option>
                </select>
              </label>
              {!!qs.length && (
                <label>
                  Reply to
                  <select value={replyTo} onChange={(e) => setReplyTo(e.target.value)}>
                    <option value="">New instruction</option>
                    {qs.map((q) => (
                      <option key={q.noteId} value={q.noteId}>
                        {q.reason.slice(0, 140)}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                Handoff note
                <textarea
                  ref={editor}
                  required
                  minLength={3}
                  maxLength={4000}
                  rows={6}
                  value={text}
                  placeholder="Before polishing the landing page, produce one complete edition I can watch. Keep the duration provisional."
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <button className="primary" disabled={busy || text.trim().length < 3}>
                Save to handoff →
              </button>
              <p className="small-text muted">
                This changes planning context. Changes to acceptance, permissions or budget use the
                existing approval flow.
              </p>
            </form>
          ) : (
            <p className="muted">
              {readOnly
                ? 'Recorded direction at this replay event. Return to Live to add context.'
                : 'This run has ended. Start a new run for a new goal.'}
            </p>
          )}
          {feedback && (
            <p role="status" className="handoff-feedback">
              {feedback}
            </p>
          )}
          {error && (
            <p role="alert" className="failed">
              {error}
            </p>
          )}
          <div className="quiet-rule" />
          <small>WHEN YOU RETURN</small>
          <p>
            Open the Morning Brief for verified work, deferred ideas and decisions still needing
            you.
          </p>
        </aside>
      </div>
    </section>
  );
}
