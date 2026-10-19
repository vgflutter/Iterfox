import React, { useEffect, useId, useState } from 'react';
import {
  projectLimits,
  type ProjectDocument,
  type ProjectHandoff,
  type ProjectMilestone,
} from '../shared/projects.js';
import type { RunListing } from './run-browser.js';
import { ProjectHandoffView } from './project-handoff.js';

export type ProjectSessionAction = 'link' | 'capture';

export function ProjectSessions({
  project,
  milestone,
  listing,
  refresh,
  openRun,
  disabled,
  act,
  capturedReceipt,
}: {
  project: ProjectDocument;
  milestone: ProjectMilestone;
  listing: RunListing;
  refresh: () => void;
  openRun: (id: string) => void;
  disabled: boolean;
  act: (action: ProjectSessionAction, runId: string) => void;
  capturedReceipt?: ProjectHandoff;
}) {
  const [runId, setRunId] = useState('');
  const hintId = useId();
  useEffect(() => {
    if (project.runs.some((link) => link.runId === runId)) setRunId('');
  }, [project.runs, runId]);
  const linked = project.runs.filter((item) => item.milestoneId === milestone.id);
  const candidates = listing.runs.filter(
    (run) => !project.runs.some((link) => link.runId === run.id),
  );
  // Path equality is only a hint. The server checks canonical Git common-repository
  // identity, so aliases/other worktrees must not be hidden by a client path filter.
  const samePath = (run: RunListing['runs'][number]) =>
    run.repository === project.repository || run.worktree === project.repository;
  const ordered = [...candidates].sort((a, b) => Number(samePath(b)) - Number(samePath(a)));
  const candidate = candidates.find((run) => run.id === runId);
  const receipts = project.handoffs.filter((item) => item.milestoneId === milestone.id);
  if (
    capturedReceipt?.milestoneId === milestone.id &&
    !receipts.some((item) => item.id === capturedReceipt.id)
  )
    receipts.push(capturedReceipt);
  return (
    <>
      <section aria-label="Linked sessions">
        <h3>Linked sessions</h3>
        <p className="muted">
          Links preserve the milestone and source HEAD at linking. They do not review the milestone
          or certify its outcome.
        </p>
        {!linked.length ? (
          <p>No linked sessions for this milestone.</p>
        ) : (
          <ul className="project-session-list">
            {linked.map((link) => {
              const run = listing.runs.find((item) => item.id === link.runId);
              const latest = receipts.filter((item) => item.runId === link.runId).at(-1);
              return (
                <li key={link.runId}>
                  {run && (
                    <p>
                      <strong>{run.goal}</strong>
                    </p>
                  )}
                  <button className="project-text-button" onClick={() => openRun(link.runId)}>
                    Open run {link.runId}
                  </button>
                  <p>
                    {run
                      ? `Last retrieved status: ${run.status} · ${run.provider === 'demo' ? 'DEMO' : 'Codex'}`
                      : 'Current run status unavailable. Refresh runs or open the source run.'}
                  </p>
                  <p>
                    Linked {new Date(link.linkedAt).toLocaleString()} · project revision{' '}
                    {link.projectRevision} · source sequence {link.sourceSeq}
                  </p>
                  <p>
                    Base HEAD <code>{link.baseHead}</code>
                  </p>
                  <details>
                    <summary>Original link provenance</summary>
                    <p>
                      Milestone at linking: {link.milestone.title} ({link.milestoneId})
                    </p>
                    <p>{link.milestone.outcome}</p>
                    <p>
                      Repository: <code>{link.repository}</code>
                    </p>
                    <p>
                      Worktree: <code>{link.worktree}</code>
                    </p>
                    <p>
                      Git common repository: <code>{link.repositoryIdentity.commonDirectory}</code>
                    </p>
                  </details>
                  <p>
                    {latest
                      ? `Latest captured handoff: sequence ${latest.sourceSeq}, contract v${latest.contractVersion}, ${latest.runStatus}.`
                      : 'No audited handoff captured yet.'}
                  </p>
                  {latest && run && run.seq > latest.sourceSeq && (
                    <p className="project-notice">
                      This run has later ledger records than the latest handoff. Open it to inspect
                      changes or capture an updated snapshot.
                    </p>
                  )}
                  <button
                    className="button"
                    aria-label={`${latest ? 'Capture updated handoff' : 'Capture handoff'} from run ${link.runId}`}
                    disabled={disabled || project.handoffs.length >= projectLimits.handoffs}
                    onClick={() => act('capture', link.runId)}
                  >
                    {latest ? 'Capture updated handoff' : 'Capture handoff'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <form
          className="project-link-form"
          aria-label="Link existing run"
          onSubmit={(event) => {
            event.preventDefault();
            if (candidate) act('link', candidate.id);
          }}
        >
          <h4>Link an existing run</h4>
          <p id={hintId} className="muted">
            Select a stored run from this Git common repository, including another worktree.
            Matching paths appear first; the server confirms identity before saving. Unrelated
            repositories are rejected.
          </p>
          <div className="project-actions">
            <button
              type="button"
              className="button"
              disabled={listing.refreshing || disabled}
              onClick={refresh}
            >
              Refresh runs
            </button>
            <span role="status">
              {listing.refreshing
                ? 'Refreshing stored runs…'
                : listing.updatedAt
                  ? `Run list retrieved ${new Date(listing.updatedAt).toLocaleString()}.`
                  : 'Refresh to retrieve stored runs.'}
            </span>
          </div>
          {listing.error && (
            <p className="project-error" role="alert">
              Could not refresh runs. {listing.error.message}{' '}
              {listing.loaded && 'The previous list is retained.'}
            </p>
          )}
          {listing.loaded && !listing.runs.length && (
            <p>
              No existing runs in this runtime. Preparation below can open a new editable goal;
              linking is available after an authorized run exists.
            </p>
          )}
          {listing.loaded && !!listing.runs.length && !candidates.length && (
            <p>
              All retrieved runs are already linked in this project. Each run keeps one milestone
              binding.
            </p>
          )}
          <label>
            Existing run
            <select
              required
              value={runId}
              aria-describedby={hintId}
              disabled={disabled || listing.refreshing || !candidates.length}
              onChange={(event) => setRunId(event.target.value)}
            >
              <option value="">Select a stored run</option>
              {ordered.map((run) => (
                <option key={run.id} value={run.id}>
                  {run.goal.slice(0, 100)} · {run.status} · {run.id}
                </option>
              ))}
            </select>
          </label>
          {candidate && (
            <div className="project-run-preview">
              <p>
                <strong>{candidate.goal}</strong>
              </p>
              <p>
                {candidate.provider === 'demo' ? 'DEMO' : 'Codex'} · {candidate.status} ·{' '}
                <code>{candidate.id}</code>
              </p>
              <p>
                Repository: <code>{candidate.repository}</code>
              </p>
              <p>
                Worktree: <code>{candidate.worktree}</code>
              </p>
              <p>
                Base HEAD: <code>{candidate.baseHead}</code>
              </p>
              <button
                type="button"
                className="project-text-button"
                onClick={() => openRun(candidate.id)}
              >
                Inspect selected run
              </button>
            </div>
          )}
          <button
            className="button"
            disabled={
              disabled ||
              listing.refreshing ||
              !candidate ||
              project.runs.length >= projectLimits.linkedRuns
            }
          >
            Link run to milestone
          </button>
        </form>
        <p className="muted">
          Capture audits stored proof and saves an immutable snapshot. Pause a live worker in its
          run view and wait for exit before capture. No checks execute during capture.
        </p>
        {project.runs.length >= projectLimits.linkedRuns && (
          <p>Project limit of {projectLimits.linkedRuns} run links reached.</p>
        )}
        {project.handoffs.length >= projectLimits.handoffs && (
          <p>Project limit of {projectLimits.handoffs} immutable handoffs reached.</p>
        )}
      </section>
      <section aria-label="Available handoffs">
        <h3>Available handoffs</h3>
        {!receipts.length ? (
          <p>
            No captured handoffs for this milestone. Link a source run and capture its actual state
            to retain evidence, questions and unfinished work.
          </p>
        ) : (
          [...receipts]
            .reverse()
            .map((receipt) => (
              <ProjectHandoffView
                key={receipt.id}
                receipt={receipt}
                openRun={openRun}
                initiallyOpen={receipt.id === capturedReceipt?.id}
              />
            ))
        )}
      </section>
    </>
  );
}
