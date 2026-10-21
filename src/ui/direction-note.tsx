import React from 'react';
import type { RunState } from '../core/model.js';
import { noteProvenance, type DirectionNote } from '../core/compass.js';

// Shared by Compass and the inspector so a saved instruction has the same
// meaning after navigation, reload, replay, or an approved contract revision.
export function DirectionNoteRecord({
  state,
  note,
  historyAnchor = false,
  openCompass,
}: {
  state: RunState;
  note: DirectionNote;
  historyAnchor?: boolean;
  openCompass?: (noteId: string) => void;
}) {
  const { reference, handling, reconciliation, answered } = noteProvenance(state, note);
  const status = answered ? 'answered' : (handling?.disposition ?? 'pending');
  const disposition = {
    applied: 'In the plan',
    deferred: 'Later',
    question: 'Your decision',
    pending: 'Awaiting reconciliation',
    answered: 'Answered',
  }[status];
  return (
    <article
      className="handoff-note"
      id={historyAnchor ? `direction-note-${note.id}` : undefined}
      tabIndex={historyAnchor ? -1 : undefined}
    >
      <div>
        <small>
          {note.kind.toUpperCase()} · RECORDED INSTRUCTION
          {note.replyTo ? ' · LINKED REPLY' : ''}
        </small>
        <span className={`note-disposition ${status}`}>
          {reconciliation?.historical && !answered ? 'Historical · ' : ''}
          {disposition}
        </span>
      </div>
      <p className="instruction-text">{note.text}</p>
      {reference && (
        <div className="recorded-reference">
          <p className="note-context">
            Recorded reference · contract v{reference.contractVersion} · criterion{' '}
            <code>{reference.criterionId}</code>
            {' · '}
            {reference.criterionTitle ?? 'Recorded criterion title unavailable'}
          </p>
          {reference.nodeId && (
            <p className="note-context">
              Activity: {reference.nodeTitle ?? 'Recorded activity title unavailable'}
              {' · '}node <code>{reference.nodeId}</code>
            </p>
          )}
          {reference.historical && (
            <p className="note-reason">
              Historical reference, not current acceptance context or runtime proof. Current
              contract: v{state.contractVersion}.
            </p>
          )}
        </div>
      )}
      {handling && reconciliation && (
        <>
          <p className="note-reason">
            {answered ? `Last recorded disposition: ${handling.disposition}. ` : ''}
            {handling.reason}
          </p>
          <p className="note-reason">
            Direction v{reconciliation.revision} · contract v{reconciliation.contractVersion}
            {' · '}
            {reconciliation.historical
              ? 'Historical plan, not current reconciliation or runtime acceptance.'
              : 'Planning disposition, not implementation or runtime acceptance.'}
          </p>
        </>
      )}
      {answered && (
        <p className="note-reason">
          A linked operator reply supersedes this note. Both remain in history.
        </p>
      )}
      {!handling && !answered && (
        <p className="note-reason">
          Recorded in Compass; awaiting reconciliation. Saving is not runtime acceptance.
        </p>
      )}
      <details className="instruction-receipt">
        <summary>Recorded instruction reference</summary>
        <p>
          Note: <code>{note.id}</code>
        </p>
        <p>
          Recorded: <time dateTime={note.at}>{new Date(note.at).toLocaleString()}</time>
        </p>
        {note.replyTo && (
          <p>
            Reply to note: <code>{note.replyTo}</code>
          </p>
        )}
        {reconciliation && (
          <p>
            Reconciliation node: <code>{reconciliation.nodeId}</code>
          </p>
        )}
      </details>
      {openCompass && (
        <button className="button" onClick={() => openCompass(note.id)}>
          Review instruction in Compass →
        </button>
      )}
    </article>
  );
}
