import React, { useEffect, useId, useRef, useState } from 'react';
import type { Contract, RunState } from '../core/model.js';
import type { Proposal, SourceReference } from '../proposals/model.js';
import type { ProjectContinuation } from '../shared/projects.js';
import type {
  AuthorizeLaunchRequest,
  BrowseRepositoriesResponse,
  LaunchPreview,
  PreflightRequest,
  ProposalJob,
} from '../shared/launch.js';
import { launchApi, launchFailure, LaunchRequestError } from './launch-api.js';
import { RunBrowser, type RunListing } from './run-browser.js';
import {
  checkTimeoutBounds,
  commandChanged,
  commandProblem,
  durationMilliseconds,
  durationProblem,
  editProposal,
  editedContract,
  formatDuration,
  limitFields,
  newCriterion,
  type CriterionEdit,
  type DurationBounds,
  type DurationEdit,
  type ProposalEdit,
} from './proposal-editor.js';

type Operation = 'starting' | 'reviewing' | 'authorizing' | 'opening' | 'inspecting' | 'connecting';

/** Keep useful inputs in this page's memory; drafts and receipts are never saved. */
export interface NewRunSession {
  mode: 'goal' | 'file';
  repository: string;
  goal: string;
  configPath: string;
  handoff: string;
  project: boolean;
  fileProject: boolean;
  runCreated?: string;
  uncertainLaunch: boolean;
  error?: LaunchRequestError;
  inspectingRuns?: boolean;
  recoveryError?: LaunchRequestError;
  projectContext?: ProjectContinuation;
}

export function NewRun({
  token,
  initial,
  runListing,
  selectedRunId,
  close,
  created,
  inspectRuns,
  reconnect,
}: {
  token: string;
  initial?: NewRunSession;
  runListing: RunListing;
  selectedRunId?: string;
  close: (session: NewRunSession) => void;
  created: (id: string, signal: AbortSignal) => void | Promise<void>;
  inspectRuns: (signal: AbortSignal) => void | Promise<void>;
  reconnect: (signal: AbortSignal) => void | Promise<void>;
}) {
  const [mode, setMode] = useState<'goal' | 'file'>(initial?.mode ?? 'goal');
  const [repository, setRepository] = useState(initial?.repository ?? '');
  const [goal, setGoal] = useState(initial?.goal ?? '');
  const [configPath, setConfigPath] = useState(initial?.configPath ?? '');
  const [handoff, setHandoff] = useState(initial?.handoff ?? '');
  const [project, setProject] = useState(initial?.project ?? true);
  const [fileProject, setFileProject] = useState(initial?.fileProject ?? false);
  const [job, setJob] = useState<ProposalJob>();
  const [polling, setPolling] = useState(false);
  const [edit, setEdit] = useState<ProposalEdit>();
  const [draftUnavailable, setDraftUnavailable] = useState(false);
  const [preview, setPreview] = useState<LaunchPreview>();
  const [busy, setBusy] = useState<Operation>();
  const [error, setError] = useState<LaunchRequestError | undefined>(initial?.error);
  const [cancellationErrors, setCancellationErrors] = useState<Record<string, LaunchRequestError>>(
    {},
  );
  const [retryingCancellations, setRetryingCancellations] = useState<string[]>([]);
  const [pendingDraftRequests, setPendingDraftRequests] = useState(0);
  const [unconfirmedDraftRequests, setUnconfirmedDraftRequests] = useState<
    Record<number, LaunchRequestError>
  >({});
  const [recoveryError, setRecoveryError] = useState(initial?.recoveryError);
  const [inspectingRuns, setInspectingRuns] = useState(initial?.inspectingRuns ?? false);
  const [connectionNotice, setConnectionNotice] = useState('');
  const [connectionNeeded, setConnectionNeeded] = useState(false);
  const [runCreated, setRunCreated] = useState<string | undefined>(initial?.runCreated);
  const [uncertainLaunch, setUncertainLaunch] = useState(initial?.uncertainLaunch ?? false);
  const [listing, setListing] = useState<BrowseRepositoriesResponse>();
  const [folderPath, setFolderPath] = useState('');
  const [browsing, setBrowsing] = useState(false);
  const [browseError, setBrowseError] = useState<LaunchRequestError>();
  const [now, setNow] = useState(Date.now());
  const errorId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const repositoryField = useRef<HTMLInputElement>(null);
  const focusAfterRecovery = useRef(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const previewHeading = useRef<HTMLHeadingElement>(null);
  const alive = useRef(true);
  const draftRevision = useRef(0);
  const reviewRevision = useRef(0);
  const authorizationRevision = useRef(0);
  const browseRevision = useRef(0);
  const renderedDraftRevision = draftRevision.current;
  const renderedReviewRevision = reviewRevision.current;
  const jobId = useRef<string | undefined>(undefined);
  const currentPreview = useRef<LaunchPreview | undefined>(undefined);
  const operation = useRef<Operation | undefined>(undefined);
  const launchLocked = useRef(!!initial?.runCreated || !!initial?.uncertainLaunch);
  const reviewController = useRef<AbortController | undefined>(undefined);
  const browseController = useRef<AbortController | undefined>(undefined);
  const pollController = useRef<AbortController | undefined>(undefined);
  const openingController = useRef<AbortController | undefined>(undefined);
  const connectionController = useRef<AbortController | undefined>(undefined);
  const cancelling = useRef(new Set<string>());
  const currentToken = useRef(token);
  const proposal = job?.status === 'ready' ? job.proposal : undefined;
  const locked = busy === 'authorizing' || busy === 'opening' || !!runCreated || uncertainLaunch;
  const proposalExpired = !!job && Date.parse(job.expiresAt) <= now;
  const previewExpired = !!preview && Date.parse(preview.authorization.expiresAt) <= now;
  const snapshot: NewRunSession = {
    mode,
    repository,
    goal,
    configPath,
    handoff,
    projectContext: initial?.projectContext,
    project,
    fileProject,
    runCreated,
    uncertainLaunch,
    inspectingRuns,
    recoveryError,
    ...((runCreated || uncertainLaunch) && error ? { error } : {}),
  };
  const latestSession = useRef(snapshot);
  latestSession.current = snapshot;

  // Cancellation also applies to ready drafts. The revision guards below handle
  // jobs whose POST response (and therefore ID) arrives after inputs changed.
  async function cancelJob(id: string) {
    if (cancelling.current.has(id)) return;
    cancelling.current.add(id);
    if (alive.current) setRetryingCancellations([...cancelling.current]);
    try {
      await launchApi<ProposalJob>(
        `/api/proposals/${encodeURIComponent(id)}/cancel`,
        currentToken.current,
        {},
      );
      if (alive.current)
        setCancellationErrors((current) => {
          const next = { ...current };
          delete next[id];
          return next;
        });
    } catch (failure) {
      const detail = launchFailure(failure);
      if (alive.current) {
        if (detail.code === 'not-found')
          setCancellationErrors((current) => {
            const next = { ...current };
            delete next[id];
            return next;
          });
        else setCancellationErrors((current) => ({ ...current, [id]: detail }));
      }
    } finally {
      cancelling.current.delete(id);
      if (alive.current) setRetryingCancellations([...cancelling.current]);
    }
  }

  function dispose() {
    alive.current = false;
    draftRevision.current++;
    reviewRevision.current++;
    currentPreview.current = undefined;
    browseRevision.current++;
    reviewController.current?.abort();
    browseController.current?.abort();
    pollController.current?.abort();
    openingController.current?.abort();
    connectionController.current?.abort();
    const discarded = jobId.current;
    jobId.current = undefined;
    if (discarded) void cancelJob(discarded);
  }

  function session(): NewRunSession {
    return latestSession.current;
  }

  function closeDialog() {
    if (!alive.current) return;
    if (operation.current === 'authorizing' || operation.current === 'opening') return;
    // Invalidate synchronously, before the parent unmounts the dialog.
    dispose();
    close(session());
  }

  useEffect(() => {
    currentToken.current = token;
  }, [token]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    alive.current = true;
    const element = dialog.current;
    element?.showModal();
    return () => {
      dispose();
      element?.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (proposalExpired && !launchLocked.current) {
      invalidateReview();
      setPolling(false);
    }
  }, [proposalExpired]);

  useEffect(() => {
    if (proposal && edit) reviewHeading.current?.focus();
  }, [proposal?.id]);
  useEffect(() => {
    if (preview) previewHeading.current?.focus();
  }, [preview?.authorization.id]);
  useEffect(() => {
    if (focusAfterRecovery.current && !locked) {
      focusAfterRecovery.current = false;
      repositoryField.current?.focus();
    }
  }, [locked]);

  useEffect(() => {
    // Reveal server/conversion errors too, including fields inside closed details.
    // The error summary keeps focus; its links take the operator to each field.
    const descriptions = (error?.issues ?? []).flatMap((issue, index) => {
      const field = reviewField(dialog.current, issue.path);
      if (!field) return [];
      revealDetails(field);
      const id = `${errorId}-issue-${index}`;
      const previous = field.getAttribute('aria-describedby')?.split(/\s+/).filter(Boolean) ?? [];
      field.setAttribute('aria-describedby', [...previous, id].join(' '));
      field.classList.add('launch-field-error');
      // Duration/command/ID inputs manage their own validity during editing.
      const markInvalid = !field.hasAttribute('aria-invalid');
      if (markInvalid) field.setAttribute('aria-invalid', 'true');
      return [{ field, id, markInvalid }];
    });
    return () => {
      for (const { field, id, markInvalid } of descriptions) {
        const remaining = (field.getAttribute('aria-describedby') ?? '')
          .split(/\s+/)
          .filter((item) => item && item !== id);
        if (remaining.length) field.setAttribute('aria-describedby', remaining.join(' '));
        else field.removeAttribute('aria-describedby');
        field.classList.remove('launch-field-error');
        if (markInvalid) field.removeAttribute('aria-invalid');
      }
    };
  }, [error, errorId]);

  useEffect(() => {
    if (!job?.id || !polling || proposalExpired || draftUnavailable) return;
    const id = job.id;
    const revision = draftRevision.current;
    const controller = new AbortController();
    pollController.current = controller;
    let timer: ReturnType<typeof setTimeout>;
    const current = () =>
      alive.current &&
      !controller.signal.aborted &&
      revision === draftRevision.current &&
      jobId.current === id;
    const poll = async () => {
      try {
        const next = await launchApi<ProposalJob>(
          `/api/proposals/${encodeURIComponent(id)}`,
          token,
          undefined,
          controller.signal,
        );
        if (!current()) return;
        setJob(next);
        if (next.status === 'drafting') {
          timer = setTimeout(poll, 1000);
        } else {
          setPolling(false);
          if (next.status === 'ready' && next.proposal) setEdit(editProposal(next.proposal));
          else {
            setDraftUnavailable(true);
            setError(
              new LaunchRequestError(
                next.error ?? {
                  code: next.status === 'cancelled' ? 'cancelled' : 'invalid-draft',
                  error:
                    'No usable draft was returned. Keep your inputs and generate a fresh draft.',
                },
              ),
            );
          }
        }
      } catch (failure) {
        if (!current()) return;
        setPolling(false);
        const detail = launchFailure(failure);
        if (detail.code === 'not-found' || detail.code === 'expired') markDraftUnavailable();
        setError(detail);
      }
    };
    void poll();
    return () => {
      controller.abort();
      if (pollController.current === controller) pollController.current = undefined;
      clearTimeout(timer);
    };
  }, [job?.id, polling, token, proposalExpired, draftUnavailable]);

  function invalidateReview() {
    reviewRevision.current++;
    reviewController.current?.abort();
    reviewController.current = undefined;
    currentPreview.current = undefined;
    setPreview(undefined);
    setError(undefined);
    if (operation.current === 'reviewing') {
      operation.current = undefined;
      setBusy(undefined);
    }
  }

  function discardDraft() {
    draftRevision.current++;
    pollController.current?.abort();
    invalidateReview();
    const discarded = jobId.current;
    jobId.current = undefined;
    if (discarded) void cancelJob(discarded);
    setJob(undefined);
    setEdit(undefined);
    setDraftUnavailable(false);
    setPolling(false);
    if (operation.current === 'starting') {
      operation.current = undefined;
      setBusy(undefined);
    }
  }

  function markDraftUnavailable() {
    // Keep reviewed edits visible for reference when HEAD changes or the server
    // loses the draft, but never allow those edits to reuse an old receipt.
    draftRevision.current++;
    pollController.current?.abort();
    invalidateReview();
    setPolling(false);
    setDraftUnavailable(true);
    const discarded = jobId.current;
    jobId.current = undefined;
    if (discarded) void cancelJob(discarded);
  }

  function stopBrowsing() {
    browseRevision.current++;
    browseController.current?.abort();
    browseController.current = undefined;
    setBrowsing(false);
  }

  function changeRepository(value: string) {
    if (launchLocked.current) return;
    discardDraft();
    stopBrowsing();
    setListing(undefined);
    setBrowseError(undefined);
    setRepository(value);
  }

  async function browse(path?: string) {
    if (!alive.current || !token || launchLocked.current) return;
    stopBrowsing();
    const revision = ++browseRevision.current;
    const controller = new AbortController();
    browseController.current = controller;
    setBrowsing(true);
    setBrowseError(undefined);
    try {
      const result = await launchApi<BrowseRepositoriesResponse>(
        '/api/repositories/browse',
        token,
        path ? { path } : {},
        controller.signal,
      );
      if (!alive.current || revision !== browseRevision.current) return;
      setListing(result);
      setFolderPath(result.path);
    } catch (failure) {
      if (alive.current && revision === browseRevision.current)
        setBrowseError(launchFailure(failure));
    } finally {
      if (alive.current && revision === browseRevision.current) {
        setBrowsing(false);
        browseController.current = undefined;
      }
    }
  }

  async function startDraft() {
    if (
      !alive.current ||
      operation.current ||
      !token ||
      launchLocked.current ||
      renderedDraftRevision !== draftRevision.current
    )
      return;
    discardDraft();
    const revision = draftRevision.current;
    operation.current = 'starting';
    setBusy('starting');
    setPendingDraftRequests((count) => count + 1);
    try {
      // Keep the POST observable after input changes so its eventual job ID can
      // be cancelled. The HTTP deadline still bounds an interrupted exchange.
      const next = await launchApi<ProposalJob>(
        '/api/proposals',
        token,
        { repository, goal },
        undefined,
        {
          onLateResponse: (late) => {
            if (alive.current)
              setUnconfirmedDraftRequests((current) => {
                const next = { ...current };
                delete next[revision];
                return next;
              });
            void cancelJob(late.id);
          },
        },
      );
      if (!alive.current || revision !== draftRevision.current) {
        void cancelJob(next.id);
        return;
      }
      jobId.current = next.id;
      setJob(next);
      if (next.status === 'drafting') setPolling(true);
      else if (next.status === 'ready' && next.proposal) setEdit(editProposal(next.proposal));
      else {
        setDraftUnavailable(true);
        setError(new LaunchRequestError(next.error ?? { error: 'No usable draft was returned.' }));
      }
    } catch (failure) {
      if (alive.current) {
        const detail = launchFailure(failure);
        if (detail.outcomeUnknown)
          setUnconfirmedDraftRequests((current) => ({ ...current, [revision]: detail }));
        else if (revision === draftRevision.current) setError(detail);
      }
    } finally {
      if (alive.current) setPendingDraftRequests((count) => count - 1);
      if (alive.current && revision === draftRevision.current) {
        operation.current = undefined;
        setBusy(undefined);
      }
    }
  }

  function updateEdit(patch: Partial<ProposalEdit>) {
    invalidateReview();
    setEdit((current) => (current ? { ...current, ...patch } : current));
  }

  async function review() {
    if (
      !alive.current ||
      operation.current ||
      !token ||
      launchLocked.current ||
      renderedReviewRevision !== reviewRevision.current
    )
      return;
    invalidateReview();
    const revision = reviewRevision.current;
    const controller = new AbortController();
    reviewController.current = controller;
    operation.current = 'reviewing';
    setBusy('reviewing');
    try {
      let request: PreflightRequest;
      if (mode === 'file') {
        // Let the existing loader preserve visual/qualitative checks and every
        // other configuration field. Never reconstruct a file as a proposal.
        request = { repository, configPath, handoff, project: fileProject };
      } else {
        if (
          !proposal ||
          !edit ||
          draftUnavailable ||
          !job ||
          Date.parse(job.expiresAt) <= Date.now()
        )
          throw new Error('Generate a current draft before preflight.');
        request = {
          repository,
          contract: editedContract(proposal, edit, project),
          proposalId: proposal.id,
          originalGoal: proposal.originalGoal,
          handoff,
        };
      }
      const result = await launchApi<LaunchPreview>(
        '/api/preflight',
        token,
        request,
        controller.signal,
      );
      if (alive.current && revision === reviewRevision.current) {
        currentPreview.current = result;
        setPreview(result);
      }
    } catch (failure) {
      if (alive.current && revision === reviewRevision.current) {
        const detail = launchFailure(failure);
        if (
          mode === 'goal' &&
          ['head-changed', 'stale-review', 'not-found', 'expired'].includes(detail.code ?? '')
        )
          markDraftUnavailable();
        setError(detail);
      }
    } finally {
      if (alive.current && revision === reviewRevision.current) {
        operation.current = undefined;
        setBusy(undefined);
        reviewController.current = undefined;
      }
    }
  }

  async function openRun(id: string) {
    if (!alive.current || operation.current) return;
    const controller = new AbortController();
    openingController.current = controller;
    operation.current = 'opening';
    setBusy('opening');
    setRecoveryError(undefined);
    try {
      await created(id, controller.signal);
      if (!alive.current || controller.signal.aborted) return;
      // Opening an arbitrary result is inspection, not evidence that it was the
      // run from the lost response. Keep that recovery and its inputs available.
      const saved = { ...session(), recoveryError: undefined };
      dispose();
      close(
        saved.uncertainLaunch || (saved.runCreated && saved.runCreated !== id)
          ? saved
          : {
              ...saved,
              runCreated: undefined,
              uncertainLaunch: false,
              error: undefined,
              recoveryError: undefined,
              inspectingRuns: false,
            },
      );
    } catch (failure) {
      if (alive.current) setRecoveryError(launchFailure(failure));
    } finally {
      if (alive.current) {
        operation.current = undefined;
        setBusy(undefined);
        openingController.current = undefined;
      }
    }
  }

  async function inspectRunList() {
    if (!alive.current || operation.current) return;
    const controller = new AbortController();
    openingController.current = controller;
    operation.current = 'inspecting';
    setBusy('inspecting');
    setInspectingRuns(true);
    setRecoveryError(undefined);
    try {
      await inspectRuns(controller.signal);
    } catch {
      // The shared listing retains its results and refresh error for retries,
      // including after this dialog is closed and reopened.
    } finally {
      if (alive.current) {
        operation.current = undefined;
        setBusy(undefined);
        openingController.current = undefined;
      }
    }
  }

  function finishRecovery() {
    if (!alive.current || operation.current || !uncertainLaunch) return;
    // An explicit dismissal permits fresh review, never reuse of the old receipt.
    // Late responses from the dismissed authorization cannot affect a new launch.
    authorizationRevision.current++;
    discardDraft();
    launchLocked.current = false;
    setUncertainLaunch(false);
    setRecoveryError(undefined);
    setInspectingRuns(false);
    setConnectionNotice(
      'Recovery dismissed. The previous launch outcome remains unknown. Your inputs are kept; a new run needs a fresh review and explicit authorization.',
    );
    focusAfterRecovery.current = true;
  }

  async function reconnectRuntime() {
    if (!alive.current || operation.current || launchLocked.current) return;
    invalidateReview();
    const controller = new AbortController();
    connectionController.current = controller;
    operation.current = 'connecting';
    setBusy('connecting');
    setConnectionNotice('');
    setConnectionNeeded(true);
    try {
      await reconnect(controller.signal);
      if (!alive.current || controller.signal.aborted) return;
      setBrowseError(undefined);
      setConnectionNeeded(false);
      setConnectionNotice(
        'Local connection refreshed. Your inputs are kept; review again before authorizing.',
      );
    } catch (failure) {
      if (alive.current && !controller.signal.aborted) setError(launchFailure(failure));
    } finally {
      if (alive.current) {
        operation.current = undefined;
        setBusy(undefined);
        connectionController.current = undefined;
      }
    }
  }

  async function authorize() {
    if (
      !alive.current ||
      operation.current ||
      !token ||
      !preview ||
      launchLocked.current ||
      currentPreview.current !== preview ||
      Date.parse(preview.authorization.expiresAt) <= Date.now() ||
      (mode === 'goal' && (draftUnavailable || !job || Date.parse(job.expiresAt) <= Date.now()))
    )
      return;
    const reviewedLaunch = {
      authorized: true as const,
      authorizationId: preview.authorization.id,
      repository: preview.repository,
      contract: preview.contract,
      ...(preview.handoff ? { handoff: preview.handoff } : {}),
    };
    const request: AuthorizeLaunchRequest = proposal
      ? { ...reviewedLaunch, proposalId: proposal.id, originalGoal: proposal.originalGoal }
      : reviewedLaunch;
    operation.current = 'authorizing';
    const revision = ++authorizationRevision.current;
    launchLocked.current = true;
    setBusy('authorizing');
    setError(undefined);
    currentPreview.current = undefined;
    setPreview(undefined);
    let id: string | undefined;
    try {
      // No automatic retry: the server consumes the receipt before creating a run.
      const state = await launchApi<RunState>('/api/runs', token, request, undefined, {
        timeoutMs: 120_000,
        // If a response body eventually arrives after the transport deadline,
        // retain a confirmed run ID for recovery without issuing another POST.
        onLateResponse: (late) => {
          if (
            alive.current &&
            revision === authorizationRevision.current &&
            late &&
            typeof late.id === 'string' &&
            late.id
          ) {
            setRunCreated(late.id);
            setUncertainLaunch(false);
            setError(undefined);
          }
        },
        onLateError: (detail) => {
          if (alive.current && revision === authorizationRevision.current && detail.runId) {
            setRunCreated(detail.runId);
            setUncertainLaunch(false);
            setError(detail);
          }
        },
      });
      if (!alive.current) return;
      if (!state || typeof state.id !== 'string' || !state.id)
        throw new LaunchRequestError({ error: 'The runtime did not return a run ID.' }, true);
      setRunCreated(state.id);
      id = state.id;
    } catch (failure) {
      if (!alive.current) return;
      const detail = launchFailure(failure);
      if (detail.runId) setRunCreated(detail.runId);
      else if (detail.outcomeUnknown || !detail.code) setUncertainLaunch(true);
      else {
        launchLocked.current = false;
        if (mode === 'goal' && ['head-changed', 'stale-review', 'not-found'].includes(detail.code))
          markDraftUnavailable();
      }
      setError(detail);
    } finally {
      if (alive.current) {
        operation.current = undefined;
        setBusy(undefined);
      }
    }
    if (id) await openRun(id);
  }

  const commandGaps = edit?.criteria.some((criterion) => !!commandProblem(criterion)) ?? true;
  return (
    <dialog
      ref={dialog}
      className="modal new-run-modal"
      aria-label="Night Run preflight"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
    >
      <div className="panel-title">
        <span>NEW RUN</span>
        <button
          type="button"
          aria-label="Close preflight"
          disabled={busy === 'authorizing' || busy === 'opening'}
          onClick={closeDialog}
        >
          ×
        </button>
      </div>
      <h2>One goal. Clear boundaries.</h2>
      <p className="muted">
        Choose a repository, review the work and authorize its isolated Codex run.
      </p>
      {initial?.projectContext && (
        <div className="launch-note prepared-project-context">
          <p>
            Prepared from project revision {initial.projectContext.projectRevision}, milestone{' '}
            {initial.projectContext.milestoneId}. Preparation did not start a run. Review the
            editable goal and historical handoff, then draft and review the new session before
            authorizing it.
          </p>
          {(repository !== initial.projectContext.repository ||
            goal !== initial.projectContext.goal ||
            handoff !== initial.projectContext.handoff) && (
            <p>
              Your inputs differ from the prepared proposal. The source references below describe
              the original preparation.
            </p>
          )}
          <details>
            <summary>
              Prepared from project revision {initial.projectContext.projectRevision}
            </summary>
            <p>
              Milestone {initial.projectContext.milestoneId} · project{' '}
              {initial.projectContext.projectId}. This is editable historical context. Preparation
              has not started a run or transferred verification results.
            </p>
            <p>
              Review and arrange the committed code checkpoint before drafting. New Run uses
              committed HEAD.
            </p>
            <p>Source runs: {initial.projectContext.sourceRunIds.join(', ') || 'None'}.</p>
            <p>Handoff receipts: {initial.projectContext.sourceHandoffIds.join(', ') || 'None'}.</p>
            {!!initial.projectContext.omissions.length && (
              <ul>
                {initial.projectContext.omissions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </details>
        </div>
      )}
      {!token && <p role="status">Connecting to the local runtime…</p>}
      {error && <RequestFailure error={error} focus id={errorId} fields={dialog} />}
      {!locked &&
        (!token ||
          connectionNeeded ||
          error?.code === 'expired' ||
          browseError?.code === 'expired' ||
          Object.values(cancellationErrors).some((detail) => detail.code === 'expired')) && (
          <button
            type="button"
            className="button"
            disabled={!!busy}
            onClick={() => void reconnectRuntime()}
          >
            Reconnect local runtime
          </button>
        )}
      {busy === 'connecting' && <p role="status">Refreshing the local connection…</p>}
      {connectionNotice && (
        <p role="status" className="launch-note">
          {connectionNotice}
        </p>
      )}
      {pendingDraftRequests > (busy === 'starting' ? 1 : 0) && (
        <p role="status" className="launch-note">
          Waiting for discarded draft requests to return their job IDs so they can be cancelled.
          Their responses cannot restore a draft or authorize a run.
        </p>
      )}
      {retryingCancellations.length > 0 && (
        <p role="status" className="launch-note">
          Cancelling discarded drafts…
        </p>
      )}
      {Object.entries(unconfirmedDraftRequests).map(([request, detail]) => (
        <div className="launch-note" key={request}>
          <p>
            No job ID was received for a draft request, so cancellation cannot be confirmed. Any
            unobserved draft cannot be used here or start a run. The server limits drafting time
            independently; you can keep your inputs and request a fresh draft.
          </p>
          <RequestFailure error={detail} />
        </div>
      ))}
      {Object.entries(cancellationErrors).map(([id, detail]) => (
        <div className="launch-note" key={id}>
          <p>
            Cancellation of draft <code>{id}</code> could not be confirmed. It has been discarded
            here and cannot be used. Retry cancellation when the local runtime is available.
          </p>
          <RequestFailure error={detail} />
          <button
            type="button"
            className="button"
            disabled={retryingCancellations.includes(id) || !!busy}
            onClick={() => void cancelJob(id)}
          >
            {retryingCancellations.includes(id) ? 'Cancelling draft…' : 'Retry cancellation'}
          </button>
        </div>
      ))}
      {runCreated && (
        <div className="launch-note" role="status">
          <p>
            Run <code>{runCreated}</code> already exists. Open it to inspect its state and resume if
            its worker did not start.
          </p>
          <button
            type="button"
            className="primary"
            disabled={!!busy}
            onClick={() => void openRun(runCreated)}
          >
            Open existing run ↗
          </button>
        </div>
      )}
      {uncertainLaunch && (
        <section className="launch-note launch-recovery" aria-label="Launch recovery">
          <p>
            The authorization response was lost. A run may already exist. Refresh the list below and
            open a run to inspect it. Opening or refreshing keeps this uncertain outcome and your
            inputs; it never repeats the authorization.
          </p>
          <button
            type="button"
            className="button"
            disabled={!!busy || runListing.refreshing}
            onClick={() => void inspectRunList()}
          >
            Refresh and inspect runs
          </button>
          {inspectingRuns && (
            <>
              <RunBrowser
                listing={runListing}
                selectedId={selectedRunId}
                refresh={() => void inspectRunList()}
                open={(id) => void openRun(id)}
                opening={busy === 'opening'}
                recovering
              />
              <details className="launch-advanced">
                <summary>Finish launch recovery</summary>
                <p>
                  Only dismiss recovery after inspecting the existing runs. This does not establish
                  whether the lost request succeeded, stop any run or authorize a new one. A new
                  launch requires a fresh review and explicit authorization.
                </p>
                <button
                  type="button"
                  className="button"
                  disabled={!!busy || runListing.refreshing || !runListing.loaded}
                  onClick={finishRecovery}
                >
                  Dismiss recovery and keep inputs
                </button>
              </details>
            </>
          )}
        </section>
      )}
      {recoveryError && <RequestFailure error={recoveryError} focus />}
      {busy === 'opening' && <p role="status">Opening existing runs…</p>}
      <form
        onInvalidCapture={(event) => {
          // Open synchronously, before native validation tries to focus a hidden input.
          if (event.target instanceof HTMLElement) revealDetails(event.target);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (mode === 'goal' && !proposal) void startDraft();
          else void review();
        }}
      >
        <fieldset disabled={locked} className="launch-fields">
          <div className="launch-paths" role="group" aria-label="New run source">
            <button
              type="button"
              aria-pressed={mode === 'goal'}
              onClick={() => {
                if (mode !== 'goal') {
                  discardDraft();
                  stopBrowsing();
                  setListing(undefined);
                  setMode('goal');
                }
              }}
            >
              From a goal
            </button>
            <button
              type="button"
              aria-pressed={mode === 'file'}
              onClick={() => {
                if (mode !== 'file') {
                  discardDraft();
                  stopBrowsing();
                  setListing(undefined);
                  setMode('file');
                }
              }}
            >
              From a configuration file
            </button>
          </div>
          <label>
            Repository root
            <input
              ref={repositoryField}
              data-review-path="repository"
              autoFocus
              required
              maxLength={4096}
              placeholder="/absolute/path/to/repository"
              value={repository}
              onChange={(event) => changeRepository(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="button"
            disabled={!token || browsing}
            onClick={() => void browse(repository || undefined)}
          >
            {browsing ? 'Reading folders…' : 'Browse local folders'}
          </button>
          {browseError && <RequestFailure error={browseError} />}
          {listing && (
            <section className="repository-browser" aria-label="Local folders">
              <label>
                Folder path
                <input
                  value={folderPath}
                  onChange={(event) => {
                    stopBrowsing();
                    setFolderPath(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      if (!browsing && folderPath.trim()) void browse(folderPath);
                    }
                  }}
                />
              </label>
              <div className="launch-actions">
                <button
                  type="button"
                  className="button"
                  disabled={browsing || !folderPath.trim()}
                  onClick={() => void browse(folderPath)}
                >
                  Go to folder
                </button>
                <button
                  type="button"
                  className="button"
                  disabled={browsing || !listing.parent}
                  onClick={() => void browse(listing.parent!)}
                >
                  Parent folder ↑
                </button>
                <button
                  type="button"
                  className="button"
                  disabled={browsing}
                  onClick={() => void browse(listing.home)}
                >
                  Home
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    stopBrowsing();
                    setListing(undefined);
                  }}
                >
                  Hide folders
                </button>
              </div>
              <p className="mono">{listing.path}</p>
              {listing.repository && (
                <button
                  type="button"
                  className="primary"
                  disabled={browsing}
                  onClick={() => changeRepository(listing.repository!.repository)}
                >
                  Use this repository · {listing.repository.head.slice(0, 8)}
                </button>
              )}
              {listing.repositoryError && <p>{listing.repositoryError}</p>}
              {!listing.repository && !listing.repositoryError && (
                <p>
                  This folder is not a Git repository root with a committed HEAD. Choose a subfolder
                  or enter a path directly.
                </p>
              )}
              <ul className="folder-list">
                {listing.directories.map((directory) => (
                  <li key={directory.path}>
                    <button
                      type="button"
                      disabled={browsing}
                      onClick={() => void browse(directory.path)}
                    >
                      ▸ {directory.name}
                    </button>
                  </li>
                ))}
              </ul>
              {!listing.directories.length && <p>No subfolders in this listing.</p>}
              {listing.notices.map((notice) => (
                <p className="muted" key={notice}>
                  {notice}
                </p>
              ))}
            </section>
          )}
          {mode === 'goal' ? (
            <>
              <label>
                Desired result · any language, including Italian
                <textarea
                  data-review-path={proposal ? 'originalGoal' : 'goal'}
                  required
                  minLength={5}
                  maxLength={10_000}
                  rows={5}
                  value={goal}
                  placeholder="Descrivi il risultato desiderato, i vincoli e cosa dovrebbe funzionare quando torni."
                  onChange={(event) => {
                    discardDraft();
                    setGoal(event.target.value);
                  }}
                />
              </label>
              <p className="launch-note">
                Drafting reads a bounded snapshot of committed HEAD using the official Codex
                integration. It does not execute proposed checks, change the source repository or
                create a run. Uncommitted files are excluded.
              </p>
              <div className="launch-actions">
                <button
                  type="button"
                  className="button"
                  disabled={!token || !!busy || !repository.trim() || goal.trim().length < 5}
                  onClick={() => void startDraft()}
                >
                  {busy === 'starting'
                    ? 'Requesting draft…'
                    : job
                      ? 'Generate a fresh draft'
                      : 'Generate draft with Codex →'}
                </button>
                {(job || busy === 'starting') && (
                  <button type="button" className="button" onClick={discardDraft}>
                    Discard draft
                  </button>
                )}
              </div>
              {job && (
                <section className="draft-progress" aria-label="Draft progress">
                  <p role="status">
                    <strong>
                      {proposalExpired
                        ? 'Draft expired'
                        : draftUnavailable
                          ? 'Draft unavailable'
                          : job.status === 'drafting' && !polling
                            ? 'Progress paused'
                            : job.status}
                    </strong>{' '}
                    · {job.error?.error ?? job.progress.message}
                  </p>
                  {job.status === 'drafting' && (
                    <p>
                      No run has been created. Drafting timeout: {formatDuration(job.timeoutMs)}.
                    </p>
                  )}
                  <details>
                    <summary>Progress history</summary>
                    <ol>
                      {job.history.map((progress, index) => (
                        <li key={index}>
                          <time>{new Date(progress.at).toLocaleTimeString()}</time> ·{' '}
                          {progress.message}
                        </li>
                      ))}
                    </ol>
                  </details>
                  {job.status === 'drafting' &&
                    !polling &&
                    !proposalExpired &&
                    !draftUnavailable && (
                      <button
                        type="button"
                        className="button"
                        onClick={() => {
                          setError(undefined);
                          setPolling(true);
                        }}
                      >
                        Resume progress polling
                      </button>
                    )}
                  {proposalExpired && (
                    <p role="status" className="launch-error">
                      This draft has expired. Keep your inputs and generate a fresh draft.
                    </p>
                  )}
                  {draftUnavailable && (
                    <p role="status" className="launch-error">
                      Generate a fresh draft to continue. Your repository, original goal, handoff
                      and options are kept. Any reviewed edits below remain available for reference
                      until you replace or discard the draft.
                    </p>
                  )}
                </section>
              )}
              {proposal && edit && (
                <>
                  <section
                    key={proposal.id}
                    className="proposal-review"
                    aria-labelledby="proposal-review-title"
                  >
                    <h3 id="proposal-review-title" ref={reviewHeading} tabIndex={-1}>
                      Review and edit the proposed work
                    </h3>
                    <p>
                      {draftUnavailable || proposalExpired
                        ? 'Unavailable Codex draft'
                        : 'Unapproved Codex draft'}{' '}
                      · <code>{proposal.head.slice(0, 12)}</code> · checks not run. Edited fields
                      are your proposal until you explicitly authorize the preflight.
                    </p>
                    <p className="muted">
                      Draft available until {new Date(job!.expiresAt).toLocaleString()}.
                    </p>
                    <label>
                      Proposed goal
                      <textarea
                        data-review-path="goal"
                        required
                        minLength={5}
                        maxLength={10_000}
                        rows={4}
                        value={edit.goal}
                        onChange={(event) => updateEdit({ goal: event.target.value })}
                      />
                    </label>
                    <ProposalCriteria proposal={proposal} edit={edit} update={updateEdit} />
                    <div className="launch-grid">
                      <label>
                        Allowed edit paths · one literal path per line
                        <textarea
                          data-review-path="allowedPaths"
                          required
                          rows={4}
                          value={edit.allowedPaths}
                          onChange={(event) => updateEdit({ allowedPaths: event.target.value })}
                        />
                      </label>
                      <label>
                        Protected paths · one literal path per line
                        <textarea
                          data-review-path="protectedPaths"
                          rows={4}
                          value={edit.protectedPaths}
                          onChange={(event) => updateEdit({ protectedPaths: event.target.value })}
                        />
                      </label>
                    </div>
                    <p className="muted">
                      Paths are relative file or directory prefixes, without glob patterns.
                      Protected paths take precedence. The runtime also protects tests,
                      configuration and secrets.
                    </p>
                    <h4>Session limits and work window</h4>
                    {limitFields.map((field) =>
                      field.key === 'maxDurationMs' ? (
                        <DurationFields
                          key={field.key}
                          path={`limits.${field.key}`}
                          label={field.label}
                          value={edit.limits.maxDurationMs}
                          bounds={field}
                          includeHours
                          change={(value) =>
                            updateEdit({ limits: { ...edit.limits, maxDurationMs: value } })
                          }
                        />
                      ) : null,
                    )}
                    <BudgetSummary
                      label="Proposed session limits"
                      window={durationSummary(edit.limits.maxDurationMs)}
                      turns={countSummary(edit.limits.maxTurns, 1000)}
                      tokens={countSummary(edit.limits.maxTokens, 100_000_000)}
                    />
                    <p className="muted">
                      Proposed ceilings, editable below, require your authorization. Token usage is
                      checked between turns; this is not a monetary spending cap.
                    </p>
                    <details className="launch-advanced">
                      <summary>Advanced session settings</summary>
                      <p className="muted">Adjust turns, tokens, retries, timeouts and reviews.</p>
                      <div className="launch-grid">
                        {limitFields.map((field) =>
                          field.key === 'maxDurationMs' ? null : field.kind === 'duration' ? (
                            <DurationFields
                              key={field.key}
                              path={`limits.${field.key}`}
                              label={field.label}
                              value={edit.limits[field.key]}
                              bounds={field}
                              change={(value) =>
                                updateEdit({ limits: { ...edit.limits, [field.key]: value } })
                              }
                            />
                          ) : (
                            <label key={field.key}>
                              {field.label}
                              <input
                                data-review-path={`limits.${field.key}`}
                                type="number"
                                required
                                min={field.min}
                                max={field.max}
                                step={1}
                                value={edit.limits[field.key]}
                                onChange={(event) =>
                                  updateEdit({
                                    limits: { ...edit.limits, [field.key]: event.target.value },
                                  })
                                }
                              />
                            </label>
                          ),
                        )}
                        <label>
                          Maximum project reviews
                          <input
                            data-review-path="supervision.maxReviews"
                            type="number"
                            required={project}
                            disabled={!project}
                            min={1}
                            max={100}
                            step={1}
                            value={edit.maxReviews}
                            onChange={(event) => updateEdit({ maxReviews: event.target.value })}
                          />
                        </label>
                      </div>
                    </details>
                  </section>
                  <ProposalEvidence proposal={proposal} />
                </>
              )}
            </>
          ) : (
            <>
              <label>
                Acceptance configuration
                <input
                  data-review-path="configPath"
                  required
                  maxLength={4096}
                  placeholder="/absolute/path/to/iterfox.json"
                  value={configPath}
                  onChange={(event) => {
                    invalidateReview();
                    setConfigPath(event.target.value);
                  }}
                />
              </label>
              <p className="muted">
                The runtime loads the complete configuration from this local file. Existing check
                verification settings, scope, protections and limits are preserved. No Codex draft
                is requested on this path.
              </p>
            </>
          )}
          <label>
            Handoff for your absence <span className="muted">(optional)</span>
            <textarea
              data-review-path="handoff"
              rows={4}
              maxLength={4000}
              value={handoff}
              placeholder="What should be ready when you return? Which decisions are settled, and which ideas still need testing?"
              onChange={(event) => {
                invalidateReview();
                setHandoff(event.target.value);
              }}
            />
          </label>
          <label className="project-mode-choice">
            <input
              type="checkbox"
              checked={mode === 'goal' ? project : fileProject}
              onChange={(event) => {
                invalidateReview();
                if (mode === 'goal') setProject(event.target.checked);
                else setFileProject(event.target.checked);
              }}
            />
            {mode === 'goal'
              ? 'Develop the project autonomously: review each milestone and discover the next useful work.'
              : 'Enable autonomous project development if absent from the file. Existing supervision settings are always preserved.'}
          </label>
          {(mode === 'file' || proposal) && (
            <>
              <p className="muted">
                Preflight validates the{' '}
                {mode === 'goal'
                  ? 'edited draft and converts it into the runtime contract'
                  : 'complete configuration'}
                . It inspects Git state without executing checks or creating a run.
              </p>
              {mode === 'goal' && commandGaps && (
                <p role="status" className="launch-note">
                  Resolve every missing or invalid check command before preflight. A check gap is
                  not a passing result.
                </p>
              )}
              <button
                type="submit"
                className="button"
                disabled={
                  !token ||
                  !!busy ||
                  !repository.trim() ||
                  (mode === 'file'
                    ? !configPath.trim()
                    : commandGaps || proposalExpired || draftUnavailable)
                }
              >
                {busy === 'reviewing' ? 'Inspecting preflight…' : 'Review preflight →'}
              </button>
            </>
          )}
        </fieldset>
      </form>
      {busy === 'authorizing' && (
        <p role="status">
          Authorization submitted. Creating the isolated run and starting its worker…
        </p>
      )}
      {preview && (
        <section className="preflight-preview" aria-labelledby="launch-preview-title">
          <h3 id="launch-preview-title" ref={previewHeading} tabIndex={-1}>
            Preflight · {preview.contract.goal}
          </h3>
          <p className="mono">
            {preview.repository} · {preview.sourceBranch} · {preview.head}
          </p>
          <p>Run branch: {preview.runBranch}</p>
          {preview.dirty && (
            <p>Uncommitted work is excluded and preserved. The run starts from committed HEAD.</p>
          )}
          <p>No checks have been run and no run has been created by this preflight.</p>
          <p>Review the actual contract values returned by the local runtime below.</p>
          <ContractPreview contract={preview.contract} />
          {preview.handoff && (
            <blockquote>
              {preview.handoff.text}
              <small>Project handoff · planning context within the approved contract</small>
            </blockquote>
          )}
          <h4>Permissions you will authorize</h4>
          <ul>
            {preview.permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
          <h4>Requires operator review</h4>
          <ul>
            {preview.requiresOperator.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {preview.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          <p>
            Authorization expires at {new Date(preview.authorization.expiresAt).toLocaleString()}.
            It can be used once. Editing any launch input requires a new preflight.
          </p>
          {(previewExpired || proposalExpired) && (
            <p role="status" className="launch-error">
              This review has expired.{' '}
              {proposalExpired ? 'Generate a fresh draft.' : 'Review a new preflight.'}
            </p>
          )}
          <button
            type="button"
            className="primary"
            disabled={
              !token || !!busy || previewExpired || proposalExpired || draftUnavailable || locked
            }
            onClick={() => void authorize()}
          >
            Authorize &amp; start Night Run ↗
          </button>
        </section>
      )}
    </dialog>
  );
}

/** Do not interpolate server-supplied paths into selectors. */
function reviewField(root: HTMLElement | null, path: string): HTMLElement | undefined {
  if (!root || !path) return;
  const normalized = path.replace(/^(?:contract|draft)\./, '');
  const fields = [...root.querySelectorAll<HTMLElement>('[data-review-path]')];
  const match =
    fields.find((field) => field.dataset.reviewPath === normalized) ??
    fields
      .filter((field) => normalized.startsWith(`${field.dataset.reviewPath}.`))
      .sort((a, b) => b.dataset.reviewPath!.length - a.dataset.reviewPath!.length)[0] ??
    fields.find((field) => field.dataset.reviewPath!.startsWith(`${normalized}.`));
  const selector = 'input:not(:disabled), textarea:not(:disabled), select:not(:disabled)';
  if (match?.matches(selector)) return match;
  return match?.querySelector<HTMLElement>(selector) ?? undefined;
}

function revealDetails(field: HTMLElement) {
  for (let parent = field.parentElement; parent; parent = parent.parentElement)
    if (parent instanceof HTMLDetailsElement) parent.open = true;
}

function focusField(field: HTMLElement) {
  revealDetails(field);
  field.focus({ preventScroll: true });
  field.scrollIntoView({ block: 'nearest' });
}

function RequestFailure({
  error,
  focus = false,
  id,
  fields,
}: {
  error: LaunchRequestError;
  focus?: boolean;
  id?: string;
  fields?: React.RefObject<HTMLElement | null>;
}) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focus) element.current?.focus();
  }, [error, focus]);
  return (
    <div
      id={id}
      ref={element}
      tabIndex={focus ? -1 : undefined}
      role="alert"
      className="launch-error"
    >
      <p>
        {error.code && <strong>{error.code} · </strong>}
        {error.message}
      </p>
      {error.issues && error.issues.length > 0 && (
        <ul>
          {error.issues.map((issue, index) => {
            const field = reviewField(fields?.current ?? null, issue.path);
            return (
              <li key={index} id={id ? `${id}-issue-${index}` : undefined}>
                {field ? (
                  <button
                    type="button"
                    className="launch-error-link"
                    onClick={() => focusField(field)}
                  >
                    {issue.path}: {issue.message}
                  </button>
                ) : (
                  <>
                    <code>{issue.path}</code>: {issue.message}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {error.runId && (
        <p>
          Existing run: <code>{error.runId}</code>
        </p>
      )}
    </div>
  );
}

function DurationFields({
  path,
  label,
  value,
  bounds,
  includeHours = false,
  change,
}: {
  path: string;
  label: string;
  value: DurationEdit;
  bounds: DurationBounds;
  includeHours?: boolean;
  change: (value: DurationEdit) => void;
}) {
  const id = useId();
  const secondsField = useRef<HTMLInputElement | null>(null);
  const focusSeconds = useRef(false);
  const [secondsExpanded, setSecondsExpanded] = useState(value.seconds !== '0');
  // A fractional or incomplete seconds value must always remain visible and editable.
  const showSeconds = secondsExpanded || value.seconds !== '0';
  const problem = durationProblem(value, bounds);
  const units = [
    ...(includeHours ? [{ key: 'hours' as const, label: 'Hours' }] : []),
    { key: 'minutes' as const, label: 'Minutes' },
    ...(showSeconds ? [{ key: 'seconds' as const, label: 'Seconds' }] : []),
  ];
  const invalidUnit =
    units.find(
      (unit) =>
        !(unit.key === 'seconds' ? /^\d+(?:\.\d{1,3})?$/ : /^\d+$/).test(value[unit.key].trim()),
    )?.key ?? units[0].key;
  useEffect(() => {
    if (showSeconds && focusSeconds.current) {
      focusSeconds.current = false;
      if (secondsField.current) focusField(secondsField.current);
    }
  }, [showSeconds]);
  return (
    <fieldset
      className="launch-fields duration-fields"
      data-review-path={path}
      aria-describedby={`${id}-note`}
    >
      <legend>{label}</legend>
      <div className="duration-units">
        {units.map((unit) => (
          <label key={unit.key}>
            {unit.label}
            <input
              ref={(input) => {
                if (unit.key === 'seconds') secondsField.current = input;
                input?.setCustomValidity(unit.key === invalidUnit ? (problem ?? '') : '');
              }}
              required
              type="text"
              inputMode={unit.key === 'seconds' ? 'decimal' : 'numeric'}
              autoComplete="off"
              spellCheck={false}
              aria-label={`${label} · ${unit.label.toLowerCase()}`}
              aria-invalid={!!problem && unit.key === invalidUnit}
              aria-describedby={`${id}-note`}
              value={value[unit.key]}
              onChange={(event) => {
                // Keep focus in an already visible seconds field when its value becomes 0.
                if (unit.key === 'seconds') setSecondsExpanded(true);
                change({ ...value, [unit.key]: event.target.value });
              }}
            />
          </label>
        ))}
      </div>
      {!showSeconds && (
        <button
          type="button"
          className="button"
          onClick={() => {
            focusSeconds.current = true;
            setSecondsExpanded(true);
          }}
        >
          Add seconds to {label.toLowerCase()}
        </button>
      )}
      <p id={`${id}-note`} className={problem ? 'launch-error' : 'muted'}>
        {problem ?? `Range: ${formatDuration(bounds.min)}–${formatDuration(bounds.max)}.`}
        {showSeconds && ' Seconds accept up to 3 decimal places (0.001 s), without rounding.'}
      </p>
    </fieldset>
  );
}

function ProposalCriteria({
  proposal,
  edit,
  update,
}: {
  proposal: Proposal;
  edit: ProposalEdit;
  update: (patch: Partial<ProposalEdit>) => void;
}) {
  const focusCriterion = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!focusCriterion.current) return;
    const field = document.getElementById(`${focusCriterion.current}-title`);
    focusCriterion.current = undefined;
    if (field) focusField(field);
  }, [edit.criteria]);
  const change = (key: string, patch: Partial<CriterionEdit>) =>
    update({
      criteria: edit.criteria.map((criterion) =>
        criterion.key === key ? { ...criterion, ...patch } : criterion,
      ),
    });
  return (
    <section aria-label="Proposed criteria">
      <h4>Criteria and exact check arguments</h4>
      <p>
        Each command is a JSON array: executable first, then one string per argument. The runtime
        uses exact argv with no implicit shell. Commands are trusted local programs; review them and
        the code they invoke.
      </p>
      {edit.criteria.map((criterion, index) => {
        const problem = commandProblem(criterion);
        const changed = commandChanged(criterion);
        const duplicate = edit.criteria.some(
          (other) => other.key !== criterion.key && other.id === criterion.id,
        );
        return (
          <fieldset key={criterion.key} className="criterion-edit">
            <legend>Check {index + 1}</legend>
            <label>
              Criterion title
              <input
                id={`${criterion.key}-title`}
                data-review-path={`criteria.${index}.title`}
                required
                minLength={3}
                maxLength={500}
                value={criterion.title}
                onChange={(event) => change(criterion.key, { title: event.target.value })}
              />
            </label>
            <label>
              Exact command argv · JSON array
              <textarea
                data-review-path={`criteria.${index}.command`}
                required
                rows={3}
                spellCheck={false}
                className="mono"
                aria-invalid={!!problem}
                aria-describedby={`${criterion.key}-command-note`}
                placeholder='["executable", "argument"]'
                value={criterion.command}
                onChange={(event) => change(criterion.key, { command: event.target.value })}
              />
            </label>
            <p id={`${criterion.key}-command-note`} className={problem ? 'launch-note' : 'muted'}>
              {problem ??
                (changed
                  ? 'Operator-supplied command · source grounding unverified · not run.'
                  : 'Original Codex-proposed command · grounded in source text, applicability and result unverified · not run.')}
            </p>
            <details className="launch-advanced">
              <summary>Check details · ID, scope and timeout</summary>
              <label>
                Criterion ID
                <input
                  data-review-path={`criteria.${index}.id`}
                  ref={(input) =>
                    input?.setCustomValidity(duplicate ? 'Criterion IDs must be unique.' : '')
                  }
                  required
                  pattern="[a-z][a-z0-9-]{0,39}"
                  maxLength={40}
                  aria-invalid={duplicate}
                  aria-describedby={duplicate ? `${criterion.key}-id-note` : undefined}
                  value={criterion.id}
                  onChange={(event) => change(criterion.key, { id: event.target.value })}
                />
              </label>
              {duplicate && (
                <p className="launch-error" id={`${criterion.key}-id-note`}>
                  Criterion IDs must be unique.
                </p>
              )}
              <div className="launch-grid">
                <label>
                  Check scope · one literal path per line
                  <textarea
                    data-review-path={`criteria.${index}.scope`}
                    rows={3}
                    value={criterion.scope}
                    onChange={(event) => change(criterion.key, { scope: event.target.value })}
                  />
                </label>
                <DurationFields
                  path={`criteria.${index}.timeoutMs`}
                  label="Check timeout"
                  value={criterion.timeout}
                  bounds={checkTimeoutBounds}
                  change={(value) => change(criterion.key, { timeout: value })}
                />
              </div>
              <p className="muted">
                An empty scope fingerprints the whole repository. Narrow scopes must include all
                inputs that affect this check.
              </p>
              <button
                type="button"
                className="button"
                disabled={edit.criteria.length <= 1}
                onClick={() => {
                  focusCriterion.current =
                    edit.criteria[index + 1]?.key ?? edit.criteria[index - 1]?.key;
                  update({ criteria: edit.criteria.filter((item) => item.key !== criterion.key) });
                }}
              >
                Remove check {index + 1}
              </button>
            </details>
            {criterion.original && (
              <details>
                <summary>
                  Original proposal rationale and source references
                  {changed ? ' (do not establish the edited command)' : ''}
                </summary>
                <p>{criterion.original.rationale}</p>
                {criterion.original.gap && <p>Original check gap: {criterion.original.gap}</p>}
                {criterion.original.command && (
                  <code className="exact-command">
                    {JSON.stringify(criterion.original.command)}
                  </code>
                )}
                {criterion.original.sources.map((source, sourceIndex) => (
                  <SourceExcerpt key={sourceIndex} proposal={proposal} source={source} />
                ))}
              </details>
            )}
          </fieldset>
        );
      })}
      <button
        type="button"
        className="button"
        disabled={edit.criteria.length >= 30}
        onClick={() => {
          const criterion = newCriterion();
          focusCriterion.current = criterion.key;
          update({ criteria: [...edit.criteria, criterion] });
        }}
      >
        Add criterion
      </button>
    </section>
  );
}

function SourceExcerpt({ proposal, source }: { proposal: Proposal; source: SourceReference }) {
  const file = proposal.snapshot.files.find((item) => item.id === source.sourceId);
  if (!file) return <p>Source {source.sourceId} unavailable in this snapshot.</p>;
  return (
    <div className="source-excerpt">
      <p>
        <code>
          {file.path}:{source.startLine}–{source.endLine}
        </code>{' '}
        · blob <code>{file.blob.slice(0, 12)}</code> · committed source text
      </p>
      <pre>
        {file.content
          .split('\n')
          .slice(source.startLine - 1, source.endLine)
          .join('\n')}
      </pre>
    </div>
  );
}

function ProposalEvidence({ proposal }: { proposal: Proposal }) {
  return (
    <section className="proposal-evidence" aria-label="Draft grounding and limitations">
      <h4>Source evidence and inferred assumptions</h4>
      <p>
        Source text was observed at commit <code>{proposal.head}</code>. It establishes
        declarations, not working behavior or successful checks.
      </p>
      <details>
        <summary>Observed source excerpts ({proposal.observations.length})</summary>
        {proposal.observations.map((observation, index) => (
          <div className="source-excerpt" key={index}>
            <p>
              <code>
                {observation.path}:{observation.startLine}–{observation.endLine}
              </code>{' '}
              · blob <code>{observation.blob.slice(0, 12)}</code>
            </p>
            <pre>{observation.text}</pre>
          </div>
        ))}
        {!proposal.observations.length && <p>No source excerpts were selected as observations.</p>}
      </details>
      <details open={proposal.draft.assumptions.length > 0}>
        <summary>Inferred assumptions · unverified ({proposal.draft.assumptions.length})</summary>
        {proposal.draft.assumptions.length ? (
          <ul>
            {proposal.draft.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        ) : (
          <p>
            No explicit assumptions were supplied. This does not establish that the proposal is
            complete.
          </p>
        )}
      </details>
      <details>
        <summary>Snapshot coverage, omissions and notices</summary>
        <p>
          {proposal.snapshot.files.length} files included from {proposal.snapshot.trackedEntries}{' '}
          tracked entries. Captured {new Date(proposal.snapshot.capturedAt).toLocaleString()}.
        </p>
        {proposal.snapshot.treeTruncated && <p>The tracked tree listing was truncated.</p>}
        <ul>
          {proposal.snapshot.omissions.map((omission, index) => (
            <li key={index}>
              {omission.reason} · {omission.count} omitted
              {omission.examples.length > 0 && (
                <code className="exact-command">{omission.examples.join(', ')}</code>
              )}
            </li>
          ))}
        </ul>
        {[...proposal.snapshot.notices, ...proposal.notices].map((notice, index) => (
          <p key={index}>{notice}</p>
        ))}
      </details>
    </section>
  );
}

function ContractPreview({ contract }: { contract: Contract }) {
  return (
    <>
      <BudgetSummary
        label="Reviewed session limits"
        window={formatDuration(contract.limits.maxDurationMs)}
        turns={contract.limits.maxTurns.toLocaleString()}
        tokens={contract.limits.maxTokens.toLocaleString()}
      />
      <h4>Checks to run after authorization</h4>
      <ul>
        {contract.criteria.map((criterion) => (
          <li key={criterion.id}>
            <strong>{criterion.title}</strong>
            <code className="exact-command">{JSON.stringify(criterion.command)}</code>
            <details className="launch-advanced">
              <summary>Check details · ID, scope and timeout</summary>
              <p>Criterion ID: {criterion.id}</p>
              <p>
                Scope: {criterion.scope.length ? criterion.scope.join(', ') : 'whole repository'}
              </p>
              <p>Check timeout: {formatDuration(criterion.timeoutMs)}</p>
              {criterion.verification && (
                <details>
                  <summary>
                    {criterion.verification.kind} verification settings from configuration
                  </summary>
                  <pre>{JSON.stringify(criterion.verification, null, 2)}</pre>
                </details>
              )}
            </details>
          </li>
        ))}
      </ul>
      <p>Allowed edits: {contract.allowedPaths.join(', ')}</p>
      <p>
        Protected paths:{' '}
        {contract.protectedPaths.length
          ? contract.protectedPaths.join(', ')
          : 'none explicitly listed; runtime protections still apply'}
      </p>
      {contract.supervision ? (
        <p>Autonomous project development within these boundaries and limits.</p>
      ) : (
        <p>Bounded contract execution without autonomous project milestone reviews.</p>
      )}
      <p className="muted">
        Reported token usage is checked between turns; this is not a monetary spending cap.
      </p>
      <details className="launch-advanced">
        <summary>Advanced session settings</summary>
        <dl className="launch-limits">
          {limitFields.map(({ key, label, kind }) =>
            key === 'maxDurationMs' || key === 'maxTurns' || key === 'maxTokens' ? null : (
              <React.Fragment key={key}>
                <dt>{label}</dt>
                <dd>
                  {kind === 'duration'
                    ? formatDuration(contract.limits[key])
                    : contract.limits[key].toLocaleString()}
                </dd>
              </React.Fragment>
            ),
          )}
          {contract.supervision && (
            <>
              <dt>Maximum project reviews</dt>
              <dd>{contract.supervision.maxReviews.toLocaleString()}</dd>
            </>
          )}
        </dl>
      </details>
    </>
  );
}

function BudgetSummary({
  label,
  window,
  turns,
  tokens,
}: {
  label: string;
  window: string;
  turns: string;
  tokens: string;
}) {
  return (
    <dl className="launch-budget-summary" aria-label={label}>
      <div>
        <dt>Work window</dt>
        <dd>{window}</dd>
      </div>
      <div>
        <dt>Maximum turns</dt>
        <dd>{turns}</dd>
      </div>
      <div>
        <dt>Reported token limit</dt>
        <dd>{tokens}</dd>
      </div>
    </dl>
  );
}

function durationSummary(value: DurationEdit): string {
  const bounds = limitFields.find((field) => field.key === 'maxDurationMs')!;
  return durationProblem(value, bounds)
    ? 'Needs a valid duration'
    : formatDuration(durationMilliseconds(value, bounds));
}

function countSummary(value: string, max: number): string {
  const count = Number(value);
  return value.trim() && Number.isSafeInteger(count) && count >= 1 && count <= max
    ? count.toLocaleString()
    : 'Needs a valid limit';
}
