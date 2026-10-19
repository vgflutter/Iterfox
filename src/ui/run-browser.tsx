import React, { useEffect, useId, useRef } from 'react';
import type { RunState } from '../core/model.js';
import type { LaunchRequestError } from './launch-api.js';

export interface RunListing {
  runs: RunState[];
  loaded: boolean;
  refreshing: boolean;
  updatedAt?: string;
  error?: LaunchRequestError;
}

/** The sidebar and both browsers open the same existing runs, without authorization. */
export function RunChoices({
  runs,
  selectedId,
  open,
  disabled = false,
  compact = false,
}: {
  runs: RunState[];
  selectedId?: string;
  open: (id: string) => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <ul className={`run-choices ${compact ? 'compact' : ''}`} aria-label="Existing runs">
      {runs.map((run) => (
        <li key={run.id}>
          <button
            type="button"
            className={`run-item ${run.id === selectedId ? 'chosen' : ''}`}
            aria-current={run.id === selectedId ? 'true' : undefined}
            title={`${run.goal}\n${run.repository}\n${run.id}`}
            disabled={disabled}
            onClick={() => open(run.id)}
          >
            <span className={`run-dot ${run.status.toLowerCase()}`} aria-hidden="true" />
            <span>
              <strong>{run.goal}</strong>
              <small>
                {new Date(run.createdAt).toLocaleString(
                  [],
                  compact ? { month: 'short', day: 'numeric' } : undefined,
                )}{' '}
                · {run.provider === 'demo' ? 'DEMO' : 'Codex'} · {run.status}
              </small>
              {!compact && (
                <>
                  <span className="run-repository">{run.repository}</span>
                  <code>{run.id}</code>
                  <span className="run-open-label">
                    Open run ↗{run.id === selectedId ? ' · currently selected' : ''}
                  </span>
                </>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function RunBrowser({
  listing,
  selectedId,
  refresh,
  open,
  opening = false,
  recovering = false,
}: {
  listing: RunListing;
  selectedId?: string;
  refresh: () => void;
  open: (id: string) => void;
  opening?: boolean;
  recovering?: boolean;
}) {
  const { runs, loaded, refreshing, updatedAt, error } = listing;
  return (
    <div className="run-browser">
      <div className="run-browser-toolbar">
        <button type="button" className="button" disabled={refreshing || opening} onClick={refresh}>
          Refresh runs
        </button>
        <p aria-live="polite" aria-atomic="true">
          {refreshing
            ? 'Refreshing existing runs…'
            : updatedAt
              ? `Retrieved ${runs.length} ${runs.length === 1 ? 'run' : 'runs'} at ${new Date(updatedAt).toLocaleTimeString()}.`
              : 'Refresh to retrieve existing runs.'}
        </p>
      </div>
      {error && (
        <div className="launch-error" role="alert">
          <p>Could not refresh runs. {error.message}</p>
          {loaded && <p>The last retrieved list is kept below. Refresh again when ready.</p>}
        </div>
      )}
      {loaded && runs.length === 0 && (
        <p className="run-browser-empty">
          No runs were found in this runtime{error || refreshing ? ' on the last refresh' : ''}. You
          can refresh again.
          {recovering &&
            ' An empty list does not establish whether the lost launch request succeeded.'}
        </p>
      )}
      <RunChoices
        runs={runs}
        selectedId={selectedId}
        open={open}
        disabled={opening || refreshing}
      />
    </div>
  );
}

export function ExistingRuns({
  listing,
  selectedId,
  refresh,
  open,
  close,
}: {
  listing: RunListing;
  selectedId?: string;
  refresh: () => void;
  open: (id: string) => void;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  useEffect(() => {
    const previousFocus = document.activeElement;
    const element = dialog.current;
    element?.showModal();
    return () => {
      element?.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal existing-runs-modal"
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <div className="panel-title">
        <span>YOUR WORKSPACE</span>
        <button type="button" aria-label="Close runs" onClick={close} autoFocus>
          ×
        </button>
      </div>
      <h2 id={headingId}>Existing runs</h2>
      <p>Choose a run to inspect its current view. Opening or refreshing does not start a run.</p>
      <RunBrowser listing={listing} selectedId={selectedId} refresh={refresh} open={open} />
    </dialog>
  );
}
