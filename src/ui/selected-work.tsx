import React, { useEffect, useId, useRef, useState } from 'react';
import type { RunState } from '../core/model.js';
import { noteContextSchema, type NoteContext, type NoteInput } from '../core/compass.js';
import { DirectionNoteRecord } from './direction-note.js';

type WorkDraft = {
  text: string;
  kind: NoteInput['kind'];
  status: 'draft' | 'pending' | 'saved' | 'error' | 'uncertain';
  message?: string;
  noteId?: string;
};
const emptyDraft: WorkDraft = { text: '', kind: 'request', status: 'draft' };

export function workDraftKey(runId: string, context: NoteContext) {
  return JSON.stringify([
    runId,
    context.contractVersion,
    context.criterionId,
    context.nodeId ?? null,
  ]);
}

// Owned by the workspace, so hiding the inspector or switching views/runs does
// not discard a draft. No browser persistence of unsent operator instructions.
export function useWorkInstructions(token: string) {
  const [drafts, setDrafts] = useState<Record<string, WorkDraft>>({});
  const current = useRef(drafts);
  function update(key: string, change: (draft: WorkDraft) => WorkDraft) {
    const previous = current.current[key] ?? emptyDraft;
    const next = change(previous);
    if (next === previous) return;
    current.current = { ...current.current, [key]: next };
    setDrafts(current.current);
  }
  function edit(key: string, patch: Partial<Pick<WorkDraft, 'text' | 'kind'>>) {
    update(key, (draft) =>
      ['pending', 'uncertain'].includes(draft.status)
        ? draft
        : { ...draft, ...patch, status: 'draft', message: undefined },
    );
  }
  async function send(state: RunState, context: NoteContext, readOnly: boolean) {
    const runId = state.id;
    const destination = { ...context };
    const key = workDraftKey(runId, destination);
    const draft = current.current[key] ?? emptyDraft;
    if (
      readOnly ||
      ['pending', 'uncertain', 'saved'].includes(draft.status) ||
      draft.text.trim().length < 3 ||
      ['COMPLETED', 'FAILED'].includes(state.status)
    )
      return;
    // Capture both input and destination before any await. Responses never
    // consult the current graph selection or clear a different draft.
    const input: NoteInput = { text: draft.text.trim(), kind: draft.kind, context: destination };
    const previousIds = new Set((state.notes ?? []).map((note) => note.id));
    if (draft.noteId) previousIds.add(draft.noteId);
    const submission: WorkDraft = { ...draft, status: 'pending', message: undefined };
    update(key, () => submission);
    // Settle only this exact submission, even if a future recovery action replaces
    // a draft under the same key. A response never owns the current selection.
    const settle = (patch: Partial<WorkDraft>) =>
      update(key, (d) => (d === submission ? { ...d, ...patch } : d));
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let rejected = false;
    try {
      const response = await fetch(`/api/runs/${encodeURIComponent(runId)}/direction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Iterfox-Token': token },
        body: JSON.stringify(input),
        signal: controller.signal,
      });
      rejected = response.status >= 400 && response.status < 500;
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error ?? `Request failed (${response.status}).`);
      // This route returns the state immediately after its append. Only the
      // appended note can confirm this send, not an older matching instruction
      // that happened to be missing from our last event-stream snapshot.
      const note: Record<string, unknown> | undefined =
        result?.id === runId && Array.isArray(result.notes) ? result.notes.at(-1) : undefined;
      const recorded = noteContextSchema.safeParse(note?.context);
      if (
        !note ||
        typeof note !== 'object' ||
        typeof note.id !== 'string' ||
        previousIds.has(note.id) ||
        typeof note.at !== 'string' ||
        note.text !== input.text ||
        note.kind !== input.kind ||
        note.replyTo !== undefined ||
        !recorded.success ||
        recorded.data.criterionId !== destination.criterionId ||
        recorded.data.contractVersion !== destination.contractVersion ||
        recorded.data.nodeId !== destination.nodeId
      )
        throw new Error('The runtime did not return the matching recorded instruction.');
      settle({ status: 'saved', noteId: note.id });
    } catch (failure) {
      settle({
        status: rejected ? 'error' : 'uncertain',
        message: controller.signal.aborted
          ? 'No confirmed response within 20 seconds.'
          : failure instanceof Error
            ? failure.message
            : 'Instruction could not be confirmed.',
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }
  return {
    draftFor: (key: string) => drafts[key] ?? emptyDraft,
    edit,
    send,
    allowManualRetry: (key: string) =>
      update(key, (d) =>
        d.status === 'uncertain' ? { ...d, status: 'draft', message: undefined } : d,
      ),
  };
}

export function SelectedWork({
  state,
  context,
  title,
  readOnly,
  instructions,
  openCompass,
}: {
  state: RunState;
  context: NoteContext;
  title: string;
  readOnly: boolean;
  instructions: ReturnType<typeof useWorkInstructions>;
  openCompass: (noteId?: string) => void;
}) {
  const key = workDraftKey(state.id, context);
  const draft = instructions.draftFor(key);
  const region = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const editor = useRef<HTMLTextAreaElement>(null);
  const formId = useId();
  const criterion = state.contract.criteria.find((c) => c.id === context.criterionId);
  const terminal = ['COMPLETED', 'FAILED'].includes(state.status);
  const editable = !readOnly && !terminal && !!criterion;
  const locked = ['pending', 'uncertain'].includes(draft.status);
  const recordedNotes = (state.notes ?? []).filter(
    (note) =>
      note.context?.criterionId === context.criterionId &&
      (!context.nodeId || !note.context.nodeId || note.context.nodeId === context.nodeId),
  );
  useEffect(() => {
    // The selected action precedes details. On narrow layouts the inspector
    // follows the canvas, so bring the selected work into view on selection.
    const frame = requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      region.current?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [key]);
  return (
    <section ref={region} className="selected-work" aria-label="Steer selected work">
      <h3 ref={heading} tabIndex={-1}>
        Steer selected work
      </h3>
      <h4>{title}</h4>
      <p className="selected-context">
        {context.nodeId ? 'Activity' : 'Acceptance criterion'} ·{' '}
        {criterion?.title ?? context.criterionId}
        {' · '}contract v{context.contractVersion}
      </p>
      <details className="selected-reference">
        <summary>Selection reference</summary>
        <p>
          Criterion: <code>{context.criterionId}</code>
        </p>
        {context.nodeId && (
          <p>
            Node: <code>{context.nodeId}</code>
          </p>
        )}
        <p>
          Run: <code>{state.id}</code>
        </p>
      </details>
      {editable ? (
        <form
          aria-busy={draft.status === 'pending'}
          onSubmit={(event) => {
            event.preventDefault();
            if (editable && !locked) void instructions.send(state, context, readOnly);
          }}
        >
          <fieldset>
            <label>
              Instruction type
              <select
                value={draft.kind}
                disabled={locked}
                onChange={(event) =>
                  instructions.edit(key, { kind: event.target.value as NoteInput['kind'] })
                }
              >
                <option value="request">Request · work or priority</option>
                <option value="decision">Decision · operator choice</option>
                <option value="hypothesis">Hypothesis · still to test</option>
              </select>
            </label>
            <label>
              Instruction for selected work
              <textarea
                ref={editor}
                rows={3}
                required
                minLength={3}
                maxLength={4000}
                value={draft.text}
                readOnly={locked}
                aria-describedby={`${formId}-help`}
                onChange={(event) => instructions.edit(key, { text: event.target.value })}
                placeholder="Describe the result you want to improve."
              />
            </label>
            <button
              type="submit"
              className="primary"
              disabled={locked || draft.text.trim().length < 3 || draft.status === 'saved'}
            >
              Send instruction
            </button>
            <button
              type="button"
              className="button priority-request"
              disabled={locked || draft.text.length > 3982}
              onClick={() => {
                instructions.edit(key, {
                  kind: 'request',
                  text: draft.text
                    ? `Priority request: ${draft.text}`
                    : 'Please prioritize this result within the approved dependencies and limits.',
                });
                editor.current?.focus();
              }}
            >
              Draft a priority request
            </button>
          </fieldset>
          <p id={`${formId}-help`} className="steering-help">
            A priority request asks for replanning; it does not guarantee scheduling. Saving records
            context, not implementation or acceptance.
          </p>
        </form>
      ) : (
        <p className="steering-help">
          {readOnly
            ? 'Replay is read-only. Return to Live to send an instruction; your live draft is kept.'
            : terminal
              ? 'This run has ended. Prepare and explicitly authorize a follow-up session to continue.'
              : 'This activity is outside the current approved criteria. Its history remains inspectable.'}
        </p>
      )}
      {!readOnly && !editable && !!draft.text && (
        <div className="retained-work-draft">
          <p className="steering-help">
            Type: {draft.kind}. This page keeps your instruction text for copying; it has not been
            sent to a follow-up session.
          </p>
          <label>
            Kept instruction for selected work
            <textarea rows={3} readOnly value={draft.text} />
          </label>
        </div>
      )}
      {!readOnly && draft.status === 'pending' && (
        <p role="status">
          Sending instruction to this recorded selection… Text and type are kept. You can inspect
          other work while waiting.
        </p>
      )}
      {!readOnly && draft.status === 'saved' && (
        <p role="status" className="handoff-feedback">
          {terminal
            ? 'Saved to Compass. This run has ended; inspect its handling and authorize a follow-up session for further work.'
            : draft.noteId &&
                state.direction?.contractVersion === state.contractVersion &&
                state.direction.sourceIds.includes(draft.noteId)
              ? 'Saved to Compass. Reconciliation recorded; its disposition describes planning, not completion.'
              : 'Saved to Compass. Awaiting reconciliation at an activity boundary; this is not runtime proof.'}
        </p>
      )}
      {!readOnly && ['error', 'uncertain'].includes(draft.status) && (
        <div role="alert" className="steering-error">
          <p>{draft.message}</p>
          <p>
            {draft.status === 'uncertain'
              ? 'Saving is unconfirmed; it may already be recorded. Your text and type are kept. Check Compass history before using this instruction again to avoid duplicates.'
              : editable
                ? 'Instruction was rejected. Your text and type are kept; correct the issue before sending again.'
                : 'Instruction was rejected. Your text and type are kept for copying; this run cannot receive it now.'}
          </p>
          {draft.status === 'uncertain' && editable && (
            <button
              className="button"
              onClick={() => {
                instructions.allowManualRetry(key);
                editor.current?.focus();
              }}
            >
              I checked history; allow manual retry
            </button>
          )}
        </div>
      )}
      {editable && state.status !== 'RUNNING' && (
        <p className="steering-help">
          Run {state.status.toLowerCase()}: saving starts no worker. Use Resume explicitly to
          reconcile within the original limits, after resolving any blocking reason.
        </p>
      )}
      <button
        className="button compass-history-link"
        onClick={() => openCompass(draft.status === 'saved' ? draft.noteId : undefined)}
      >
        Review Compass history →
      </button>
      {!!recordedNotes.length && (
        <section
          className="selected-instructions"
          aria-label="Recorded instructions for selected work"
        >
          <h4>Recorded instructions · {recordedNotes.length}</h4>
          <p className="steering-help">
            Includes criterion-wide instructions and historical references. Dispositions describe
            planning; inspect Evidence below for runtime acceptance.
          </p>
          {recordedNotes.map((note) => (
            <DirectionNoteRecord
              key={note.id}
              state={state}
              note={note}
              openCompass={openCompass}
            />
          ))}
        </section>
      )}
    </section>
  );
}
