import React, { useState } from 'react';
import type { ProjectHandoff } from '../shared/projects.js';

/** A receipt is a historical snapshot. The existing run views own live proof/logs. */
export function ProjectHandoffView({
  receipt,
  openRun,
  initiallyOpen = false,
}: {
  receipt: ProjectHandoff;
  openRun: (id: string) => void;
  initiallyOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState(initiallyOpen);
  return (
    <details
      className="project-handoff"
      open={expanded}
      onToggle={(event) => setExpanded(event.currentTarget.open)}
    >
      <summary>
        Handoff from {receipt.runId} · {new Date(receipt.capturedAt).toLocaleString()}
      </summary>
      {expanded && (
        <>
          <p className="project-notice">
            Historical snapshot after stored-evidence audit. Capturing did not execute checks.
            Earlier passed results never certify a new session. Later run changes do not rewrite
            this receipt.
          </p>
          <button className="project-text-button" onClick={() => openRun(receipt.runId)}>
            Open source run {receipt.runId}
          </button>
          <dl className="project-provenance">
            <dt>Receipt ID</dt>
            <dd>
              <code>{receipt.id}</code>
            </dd>
            <dt>Project revision at capture</dt>
            <dd>{receipt.projectRevision}</dd>
            <dt>Milestone at linking</dt>
            <dd>
              {receipt.milestone.title} ({receipt.milestoneId})<p>{receipt.milestone.outcome}</p>
            </dd>
            <dt>Source ledger sequence</dt>
            <dd>{receipt.sourceSeq}</dd>
            <dt>Source last updated</dt>
            <dd>{new Date(receipt.sourceUpdatedAt).toLocaleString()}</dd>
            <dt>Base HEAD</dt>
            <dd>
              <code>{receipt.baseHead}</code>
            </dd>
            <dt>Contract version</dt>
            <dd>{receipt.contractVersion}</dd>
            <dt>Captured run status</dt>
            <dd>
              {receipt.runStatus} · {receipt.provider === 'demo' ? 'DEMO' : 'Codex'}
            </dd>
            <dt>Source repository</dt>
            <dd>
              <code>{receipt.repository}</code>
            </dd>
            <dt>Source worktree</dt>
            <dd>
              <code>{receipt.worktree}</code>
            </dd>
            <dt>Git common repository</dt>
            <dd>
              <code>{receipt.repositoryIdentity.commonDirectory}</code>
            </dd>
            <dt>Branch</dt>
            <dd>{receipt.branch}</dd>
            <dt>Source goal</dt>
            <dd>{receipt.runGoal}</dd>
          </dl>
          {receipt.runReason && <p>Recorded run reason: {receipt.runReason}</p>}
          <h4>Bounded handoff</h4>
          <pre>{receipt.handoff}</pre>
          {!!receipt.omissions.length && (
            <div className="project-notice">
              <h4>Omitted from bounded text</h4>
              <ul>
                {receipt.omissions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>The structured records below retain the captured descriptors.</p>
            </div>
          )}
          <details>
            <summary>Unfinished work ({receipt.unfinishedWork.length})</summary>
            {!receipt.unfinishedWork.length && <p>No unfinished work recorded in this snapshot.</p>}
            <ul className="project-receipt-items">
              {receipt.unfinishedWork.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <p>
                    {item.kind} · {item.status} · source <code>{item.sourceId}</code>
                  </p>
                  <p>Criteria: {item.criterionIds.join(', ') || 'None specified'}</p>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Unresolved questions ({receipt.questions.length})</summary>
            {!receipt.questions.length && <p>No unresolved questions recorded in this snapshot.</p>}
            <ul className="project-receipt-items">
              {receipt.questions.map((item, index) => (
                <li key={index}>
                  <p>{item.text}</p>
                  <p>
                    {item.label} · {item.status}
                  </p>
                  <p>
                    Source <code>{item.sourceId}</code> · criteria:{' '}
                    {item.criterionIds.join(', ') || 'None specified'}
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Historical evidence ({receipt.evidence.length})</summary>
            <p>
              These descriptors refer to source-run records. Open that run to inspect logs,
              artifacts and current evidence.
            </p>
            {!receipt.evidence.length && <p>No evidence recorded in this snapshot.</p>}
            <ul className="project-receipt-items">
              {receipt.evidence.map((item) => (
                <li key={item.id}>
                  <strong>
                    {item.criterionId} · {item.kind} · {item.status}
                  </strong>
                  <p>
                    Evidence <code>{item.id}</code> · node <code>{item.nodeId}</code>
                  </p>
                  <p>
                    Contract v{item.contractVersion} · {new Date(item.createdAt).toLocaleString()}
                    {item.purpose === 'probe' && ' · probe, not acceptance'}
                  </p>
                  <p>
                    Observed HEAD <code>{item.head}</code>
                  </p>
                  <p>
                    Fingerprint <code>{item.fingerprint || 'Not recorded'}</code>
                  </p>
                  {item.invalidatedReason && <p>Invalidated: {item.invalidatedReason}</p>}
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Captured criterion state ({receipt.criteria.length})</summary>
            <ul className="project-receipt-items">
              {receipt.criteria.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p>
                    {item.id} · {item.status}
                  </p>
                  <p>
                    Evidence ID: <code>{item.evidenceId || 'None recorded'}</code>
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Unverified agent claims ({receipt.agentClaims.length})</summary>
            {!receipt.agentClaims.length && <p>No agent claims recorded in this snapshot.</p>}
            <ul className="project-receipt-items">
              {receipt.agentClaims.map((item, index) => (
                <li key={index}>
                  <strong>
                    {item.label} · {item.kind}
                  </strong>
                  <p>{item.text}</p>
                  <p>
                    Source <code>{item.sourceId}</code>
                  </p>
                  <p>
                    Cited evidence IDs: {item.evidenceIds.join(', ') || 'None'}. Citations do not
                    verify the claim.
                  </p>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Full immutable receipt and evidence provenance</summary>
            <pre>{JSON.stringify(receipt, null, 2)}</pre>
          </details>
        </>
      )}
    </details>
  );
}
