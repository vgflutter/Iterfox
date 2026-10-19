import React, { useEffect, useRef, useState } from 'react';
import {
  projectCreateSchema,
  projectLimits,
  type ProjectBrief,
  type ProjectContinuation,
  type ProjectDocument,
  type ProjectHandoff,
  type ProjectMilestone,
} from '../shared/projects.js';
import { projectApi, projectFailure, ProjectRequestError } from './projects-api.js';
import { ProjectSessions, type ProjectSessionAction } from './project-sessions.js';
import { ProjectRoadmap } from './project-roadmap.js';
import { ProjectHandoffView } from './project-handoff.js';
import type { RunListing } from './run-browser.js';

type DraftFields = ProjectBrief & { repository: string };
type Editor = {
  fields: DraftFields;
  base?: ProjectDocument;
  error?: ProjectRequestError;
  compared?: number;
  inspectedAfterError?: boolean;
};
type SessionFailure = {
  error: ProjectRequestError;
  action: ProjectSessionAction;
  runId: string;
  milestoneId: string;
  expectedRevision: number;
  confirmedReceipt?: ProjectHandoff;
  inspectedRevision?: number;
};
const NEW = 'new-project';
const briefKeys = [
  'name',
  'purpose',
  'audience',
  'constraints',
  'decisions',
  'hypotheses',
  'milestones',
] as const;
const fieldNames: Record<(typeof briefKeys)[number], string> = {
  name: 'Project name',
  purpose: 'Project purpose',
  audience: 'Audience',
  constraints: 'Constraints',
  decisions: 'Operator decisions',
  hypotheses: 'Provisional hypotheses',
  milestones: 'Milestones',
};
const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
function draftFor(project?: ProjectDocument): DraftFields {
  return project
    ? structuredClone({
        name: project.name,
        repository: project.repository,
        purpose: project.purpose,
        audience: project.audience,
        constraints: project.constraints,
        decisions: project.decisions,
        hypotheses: project.hypotheses,
        milestones: project.milestones,
      })
    : {
        name: '',
        repository: '',
        purpose: '',
        audience: '',
        constraints: [],
        decisions: [],
        hypotheses: [],
        milestones: [],
      };
}
const stamp = (value: string) => new Date(value).toLocaleString();

function TextList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <section className="project-text-list">
      <h3>{title}</h3>
      {items.length ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{empty}</p>
      )}
    </section>
  );
}

function Brief({ project }: { project: ProjectDocument }) {
  return (
    <div className="project-brief">
      <div>
        <h3>Project purpose</h3>
        <p>{project.purpose}</p>
      </div>
      <div>
        <h3>Audience</h3>
        <p>{project.audience}</p>
      </div>
      <TextList title="Constraints" items={project.constraints} empty="No constraints recorded." />
      <TextList
        title="Operator decisions"
        items={project.decisions}
        empty="No operator decisions recorded."
      />
      <TextList
        title="Provisional hypotheses"
        items={project.hypotheses}
        empty="No hypotheses recorded."
      />
    </div>
  );
}

function ProjectEditor({
  editor,
  busy,
  recoveryRequired,
  update,
  save,
  cancel,
}: {
  editor: Editor;
  busy: boolean;
  recoveryRequired: boolean;
  update: (editor: Editor) => void;
  save: () => void;
  cancel: () => void;
}) {
  const { fields, base, error } = editor;
  const set = <K extends keyof DraftFields>(key: K, value: DraftFields[K]) =>
    update({ ...editor, fields: { ...fields, [key]: value }, compared: undefined });
  function setMilestone(index: number, changes: Partial<ProjectMilestone>) {
    set(
      'milestones',
      fields.milestones.map((milestone, i) =>
        i === index ? { ...milestone, ...changes } : milestone,
      ),
    );
  }
  function addMilestone() {
    let id = `milestone-${fields.milestones.length + 1}`;
    while (fields.milestones.some((milestone) => milestone.id === id)) id += '-new';
    set('milestones', [
      ...fields.milestones,
      { id, title: '', outcome: '', dependsOn: [], status: 'planned' },
    ]);
  }
  return (
    <form
      className="project-editor project-card"
      aria-label={base ? 'Edit project' : 'New project'}
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <h2>{base ? 'Edit project' : 'New project'}</h2>
      <p>
        {base
          ? `Editing revision ${base.revision}. Your changes are kept until saved or discarded.`
          : 'Start with a brief. You can build the roadmap now or return to it later.'}
      </p>
      <fieldset disabled={busy} className="project-fields">
        <label>
          Project name
          <input
            name="projectName"
            autoFocus
            required
            maxLength={projectLimits.name}
            value={fields.name}
            onChange={(event) => set('name', event.target.value)}
          />
        </label>
        <label>
          Repository root
          <input
            name="repository"
            required
            readOnly={!!base}
            maxLength={4096}
            value={fields.repository}
            onChange={(event) => set('repository', event.target.value)}
          />
        </label>
        {base && (
          <p className="muted">
            Repository binding is permanent. Continuing code still requires an operator-reviewed
            committed checkpoint.
          </p>
        )}
        <label>
          Project purpose
          <textarea
            aria-label="Project purpose"
            required
            rows={3}
            maxLength={projectLimits.purpose}
            value={fields.purpose}
            onChange={(event) => set('purpose', event.target.value)}
          />
        </label>
        <label>
          Audience
          <textarea
            aria-label="Audience"
            required
            rows={2}
            maxLength={projectLimits.audience}
            value={fields.audience}
            onChange={(event) => set('audience', event.target.value)}
          />
        </label>
        {(['constraints', 'decisions', 'hypotheses'] as const).map((key) => (
          <fieldset key={key} className="project-list-editor">
            <legend>{fieldNames[key]}</legend>
            <p className="muted">
              {key === 'decisions'
                ? 'Explicit operator choices. These do not certify runtime verification.'
                : key === 'hypotheses'
                  ? 'Provisional ideas to investigate; these are not established facts.'
                  : 'Boundaries the work must respect. Project text grants no execution permissions.'}
            </p>
            {!fields[key].length && <p>No entries yet.</p>}
            {fields[key].map((item, index) => (
              <div className="project-list-row" key={index}>
                <label>
                  {fieldNames[key]} {index + 1}
                  <textarea
                    aria-label={`${fieldNames[key]} ${index + 1}`}
                    required
                    rows={2}
                    maxLength={projectLimits.textItem}
                    value={item}
                    onChange={(event) =>
                      set(
                        key,
                        fields[key].map((value, i) => (i === index ? event.target.value : value)),
                      )
                    }
                  />
                </label>
                <button
                  type="button"
                  className="button"
                  aria-label={`Remove ${fieldNames[key].toLowerCase()} ${index + 1}`}
                  onClick={() =>
                    set(
                      key,
                      fields[key].filter((_, i) => i !== index),
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="button"
              disabled={fields[key].length >= projectLimits.textItems}
              onClick={() => set(key, [...fields[key], ''])}
            >
              Add{' '}
              {key === 'decisions'
                ? 'decision'
                : key === 'hypotheses'
                  ? 'hypothesis'
                  : 'constraint'}
            </button>
          </fieldset>
        ))}
        <section aria-label="Milestone editor">
          <h3>Milestones</h3>
          <p className="muted">
            Keep a small roadmap with at most one active milestone. All prerequisites must be
            operator reviewed before activation. Reviewed is a planning decision, never a runtime
            PASS.
          </p>
          {!fields.milestones.length && (
            <p>No milestones yet. Add an outcome when you are ready.</p>
          )}
          {fields.milestones.map((milestone, index) => (
            <fieldset className="project-milestone-editor" key={index}>
              <legend>Milestone {index + 1}</legend>
              <label>
                Milestone ID {index + 1}
                <input
                  required
                  maxLength={64}
                  pattern="[A-Za-z0-9][A-Za-z0-9_-]{0,63}"
                  readOnly={!!base?.milestones.some((item) => item.id === milestone.id)}
                  value={milestone.id}
                  onChange={(event) => {
                    const id = event.target.value;
                    set(
                      'milestones',
                      fields.milestones.map((item, i) =>
                        i === index
                          ? { ...item, id }
                          : {
                              ...item,
                              dependsOn: item.dependsOn.map((dep) =>
                                dep === milestone.id ? id : dep,
                              ),
                            },
                      ),
                    );
                  }}
                />
              </label>
              <p className="muted">
                Stable IDs preserve session provenance. Saved milestone IDs cannot be renamed here.
              </p>
              <label>
                Milestone title {index + 1}
                <input
                  required
                  maxLength={projectLimits.milestoneTitle}
                  value={milestone.title}
                  onChange={(event) => setMilestone(index, { title: event.target.value })}
                />
              </label>
              <label>
                Milestone outcome {index + 1}
                <textarea
                  aria-label={`Milestone outcome ${index + 1}`}
                  required
                  rows={3}
                  maxLength={projectLimits.milestoneOutcome}
                  value={milestone.outcome}
                  onChange={(event) => setMilestone(index, { outcome: event.target.value })}
                />
              </label>
              <label>
                Milestone status {index + 1}
                <select
                  value={milestone.status}
                  onChange={(event) =>
                    setMilestone(index, {
                      status: event.target.value as ProjectMilestone['status'],
                    })
                  }
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="reviewed">Reviewed by operator</option>
                </select>
              </label>
              <fieldset className="project-prerequisite-editor">
                <legend>Prerequisites for milestone {index + 1}</legend>
                {fields.milestones.length < 2 && <p>No other milestones to select.</p>}
                {fields.milestones
                  .filter((_, i) => i !== index)
                  .map((candidate) => (
                    <label className="project-checkbox" key={candidate.id}>
                      <input
                        type="checkbox"
                        checked={milestone.dependsOn.includes(candidate.id)}
                        onChange={(event) =>
                          setMilestone(index, {
                            dependsOn: event.target.checked
                              ? [...milestone.dependsOn, candidate.id]
                              : milestone.dependsOn.filter((id) => id !== candidate.id),
                          })
                        }
                      />
                      <span>
                        {candidate.title || candidate.id} ({candidate.id})
                      </span>
                    </label>
                  ))}
              </fieldset>
              <button
                type="button"
                className="button"
                disabled={fields.milestones.some((item) => item.dependsOn.includes(milestone.id))}
                onClick={() =>
                  set(
                    'milestones',
                    fields.milestones.filter((_, i) => i !== index),
                  )
                }
              >
                Remove milestone {index + 1}
              </button>
              {fields.milestones.some((item) => item.dependsOn.includes(milestone.id)) && (
                <p className="muted">
                  Remove this milestone from its dependents' prerequisites before removing it.
                </p>
              )}
            </fieldset>
          ))}
          <button
            type="button"
            className="button"
            disabled={fields.milestones.length >= projectLimits.milestones}
            onClick={addMilestone}
          >
            Add milestone
          </button>
        </section>
      </fieldset>
      {error && (
        <div className="project-error" role="alert">
          <p>{error.message}</p>
          {!!error.detail?.issues?.length && (
            <ul>
              {error.detail.issues.map((issue, index) => (
                <li key={index}>
                  {issue.path || 'Project'}: {issue.message}
                </li>
              ))}
            </ul>
          )}
          {error.uncertain && (
            <p>
              A save may have reached the server. Inspect the saved state before retrying; a
              repeated creation could create a duplicate.
            </p>
          )}
        </div>
      )}
      <div className="project-actions">
        <button
          className="primary"
          disabled={
            busy ||
            recoveryRequired ||
            !!error?.uncertain ||
            error?.detail?.code === 'stale-revision'
          }
        >
          {busy ? 'Saving project…' : 'Save project'}
        </button>
        <button type="button" className="button" disabled={busy} onClick={cancel}>
          Discard edits
        </button>
      </div>
    </form>
  );
}

export function Projects({
  active = true,
  token,
  reconnect,
  prepare,
  openRun,
  runListing,
  refreshRuns,
  launchRecovery,
}: {
  active?: boolean;
  token: string;
  reconnect: () => Promise<void>;
  prepare: (proposal: ProjectContinuation) => void;
  openRun: (id: string) => void;
  runListing: RunListing;
  refreshRuns: () => void;
  launchRecovery: boolean;
}) {
  const [projects, setProjects] = useState<ProjectDocument[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listError, setListError] = useState<ProjectRequestError>();
  const [selectedId, setSelectedId] = useState<string | undefined>(() => {
    try {
      return localStorage.getItem('iterfox.project') || undefined;
    } catch {
      return undefined;
    }
  });
  const [drafts, setDrafts] = useState<Record<string, Editor>>({});
  const [milestoneId, setMilestoneId] = useState<string>();
  const [reading, setReading] = useState(false);
  const [readError, setReadError] = useState<ProjectRequestError>();
  const [history, setHistory] = useState<ProjectDocument[]>();
  const [historyError, setHistoryError] = useState<ProjectRequestError>();
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [prepareError, setPrepareError] = useState<ProjectRequestError>();
  const [sessionFailures, setSessionFailures] = useState<Record<string, SessionFailure>>({});
  const [capturedReceipts, setCapturedReceipts] = useState<Record<string, ProjectHandoff>>({});
  const [reconnecting, setReconnecting] = useState(false);
  const [connectionRevision, setConnectionRevision] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const inspector = useRef<HTMLElement>(null);
  const listSequence = useRef(0);
  const selectionSequence = useRef(0);
  const historySequence = useRef(0);
  const remembered = useRef(new Map<string, number>());
  const memorySequence = useRef(0);
  const mutation = useRef(false);
  const activeView = useRef(active);
  activeView.current = active;
  const project = projects.find((item) => item.id === selectedId);
  const pickerExpanded = pickerOpen || (!project && selectedId !== NEW);
  const activeMilestone = project?.milestones.find((item) => item.status === 'active');
  const editor = selectedId ? drafts[selectedId] : undefined;
  const milestone =
    project?.milestones.find((item) => item.id === milestoneId) ??
    project?.milestones.find((item) => item.status === 'active') ??
    project?.milestones[0];
  const sessionFailure = selectedId ? sessionFailures[selectedId] : undefined;
  const latestLink = project?.runs.filter((item) => item.milestoneId === milestone?.id).at(-1);
  const latestHandoff = project?.handoffs
    .filter((item) => item.milestoneId === milestone?.id)
    .at(-1);
  const archivedLinks =
    project?.runs.filter(
      (link) => !project.milestones.some((item) => item.id === link.milestoneId),
    ) ?? [];
  const sessionBlocked =
    !!sessionFailure &&
    (sessionFailure.error.uncertain ||
      sessionFailure.error.detail?.code === 'stale-revision' ||
      !!sessionFailure.confirmedReceipt);

  function remember(document: ProjectDocument) {
    remembered.current.set(document.id, ++memorySequence.current);
    setProjects((current) => {
      const prior = current.find((item) => item.id === document.id);
      return prior && prior.revision > document.revision
        ? current
        : [document, ...current.filter((item) => item.id !== document.id)];
    });
  }
  async function refresh(signal?: AbortSignal) {
    const sequence = ++listSequence.current;
    const memoryAtStart = memorySequence.current;
    setRefreshing(true);
    setListError(undefined);
    try {
      const documents = await projectApi<ProjectDocument[]>(
        '/api/projects',
        token,
        undefined,
        signal,
      );
      if (sequence !== listSequence.current || signal?.aborted) return false;
      setProjects((current) => [
        ...documents.map((document) => {
          const prior = current.find((item) => item.id === document.id);
          return prior && prior.revision > document.revision ? prior : document;
        }),
        // A list started before a confirmed creation/read may lack that project.
        // Keep those newer observations without retaining absent projects forever.
        ...current.filter(
          (item) =>
            (remembered.current.get(item.id) ?? 0) > memoryAtStart &&
            !documents.some((document) => document.id === item.id),
        ),
      ]);
      setLoaded(true);
      return true;
    } catch (error) {
      if (sequence === listSequence.current && !signal?.aborted)
        setListError(projectFailure(error));
      return false;
    } finally {
      if (sequence === listSequence.current) setRefreshing(false);
    }
  }
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => {
      controller.abort();
      ++listSequence.current;
    };
  }, [token, connectionRevision]);
  useEffect(() => {
    setMilestoneId(undefined);
    setHistory(undefined);
    setHistoryError(undefined);
    setShowHistory(false);
    setBriefOpen(false);
    ++historySequence.current;
    setReadError(undefined);
    setPrepareError(undefined);
    const sequence = ++selectionSequence.current;
    setReading(false);
    setHistoryLoading(false);
    if (!selectedId || selectedId === NEW || !token) return;
    try {
      localStorage.setItem('iterfox.project', selectedId);
    } catch {
      /* Selection still works in memory. */
    }
    const controller = new AbortController();
    setReading(true);
    projectApi<ProjectDocument>(
      `/api/projects/${encodeURIComponent(selectedId)}`,
      token,
      undefined,
      controller.signal,
    )
      .then((document) => {
        if (sequence === selectionSequence.current) remember(document);
      })
      .catch((error) => {
        if (!controller.signal.aborted && sequence === selectionSequence.current)
          setReadError(projectFailure(error));
      })
      .finally(() => {
        if (sequence === selectionSequence.current) setReading(false);
      });
    return () => controller.abort();
  }, [selectedId, token, connectionRevision]);

  async function inspectLatest() {
    if (!selectedId || selectedId === NEW) {
      if (await refresh())
        setDrafts((current) =>
          current[NEW]
            ? { ...current, [NEW]: { ...current[NEW], inspectedAfterError: true } }
            : current,
        );
      return;
    }
    const id = selectedId;
    const sequence = selectionSequence.current;
    const requestSequence = ++historySequence.current;
    setShowHistory(true);
    setHistoryLoading(true);
    setHistoryError(undefined);
    try {
      const [latest, snapshots] = await Promise.all([
        projectApi<ProjectDocument>(`/api/projects/${encodeURIComponent(id)}`, token),
        projectApi<ProjectDocument[]>(`/api/projects/${encodeURIComponent(id)}/history`, token),
      ]);
      if (sequence !== selectionSequence.current || requestSequence !== historySequence.current)
        return;
      // The two reads can straddle a write. The ordered history may already
      // contain a newer complete snapshot than the individual GET.
      const newest = snapshots.at(-1);
      const observed = newest && newest.revision > latest.revision ? newest : latest;
      remember(observed);
      setHistory(snapshots);
      setReadError(undefined);
      setDrafts((current) =>
        current[id] ? { ...current, [id]: { ...current[id], inspectedAfterError: true } } : current,
      );
      setSessionFailures((current) =>
        current[id]
          ? {
              ...current,
              [id]: { ...current[id], inspectedRevision: observed.revision },
            }
          : current,
      );
    } catch (error) {
      if (sequence === selectionSequence.current && requestSequence === historySequence.current)
        setHistoryError(projectFailure(error));
    } finally {
      if (sequence === selectionSequence.current && requestSequence === historySequence.current)
        setHistoryLoading(false);
    }
  }
  function updateEditor(value: Editor) {
    if (selectedId) setDrafts((current) => ({ ...current, [selectedId]: value }));
  }
  function discard() {
    if (!selectedId) return;
    setDrafts((current) => {
      const next = { ...current };
      delete next[selectedId];
      return next;
    });
    if (selectedId === NEW) setSelectedId(undefined);
    setNotice('Edits discarded. Saved project state is unchanged.');
  }
  async function save() {
    if (
      !selectedId ||
      !editor ||
      mutation.current ||
      historyLoading ||
      (!!editor.base && !!project && editor.base.revision !== project.revision) ||
      editor.error?.uncertain ||
      editor.error?.detail?.code === 'stale-revision'
    )
      return;
    const id = selectedId;
    try {
      const parsed = projectCreateSchema.parse(editor.fields);
      const { repository: _repository, ...brief } = parsed;
      const changes = Object.fromEntries(
        briefKeys
          .filter((key) => !editor.base || !equal(brief[key], editor.base[key]))
          .map((key) => [key, brief[key]]),
      );
      if (editor.base && !Object.keys(changes).length) {
        setNotice('No changes to save.');
        return;
      }
      mutation.current = true;
      setBusy(true);
      setNotice('');
      const document = await projectApi<ProjectDocument>(
        editor.base ? `/api/projects/${encodeURIComponent(id)}/revisions` : '/api/projects',
        token,
        editor.base ? { expectedRevision: editor.base.revision, changes } : parsed,
      );
      remember(document);
      setDrafts((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setSelectedId(document.id);
      setHistory(undefined);
      setShowHistory(false);
      setNotice(`Saved revision ${document.revision}.`);
    } catch (error) {
      setDrafts((current) => ({
        ...current,
        [id]: {
          ...editor,
          error: projectFailure(error),
          compared: undefined,
          inspectedAfterError: false,
        },
      }));
    } finally {
      mutation.current = false;
      setBusy(false);
    }
  }
  async function prepareSession() {
    if (
      !project ||
      !milestone ||
      mutation.current ||
      historyLoading ||
      editor ||
      sessionBlocked ||
      launchRecovery
    )
      return;
    const sequence = selectionSequence.current;
    mutation.current = true;
    setBusy(true);
    setPrepareError(undefined);
    try {
      const proposal = await projectApi<ProjectContinuation>(
        `/api/projects/${encodeURIComponent(project.id)}/continuations`,
        token,
        { expectedRevision: project.revision, milestoneId: milestone.id },
      );
      if (sequence === selectionSequence.current && activeView.current) prepare(proposal);
      else if (sequence === selectionSequence.current)
        setNotice(
          'Preparation returned while Projects was closed. No run started; prepare again when ready.',
        );
    } catch (error) {
      if (sequence === selectionSequence.current) {
        const failure = projectFailure(error);
        setPrepareError(
          failure.uncertain
            ? new ProjectRequestError(
                'Could not retrieve the preparation proposal. Preparation starts no run and saves no project changes. Read the latest project or try preparation again.',
                failure.status,
                failure.detail,
              )
            : failure,
        );
      }
    } finally {
      mutation.current = false;
      setBusy(false);
    }
  }
  async function sessionAction(action: ProjectSessionAction, runId: string) {
    if (!project || !milestone || mutation.current || historyLoading || editor || sessionBlocked)
      return;
    const id = project.id;
    const sequence = selectionSequence.current;
    const failure: Omit<SessionFailure, 'error'> = {
      action,
      runId,
      milestoneId: milestone.id,
      expectedRevision: project.revision,
    };
    mutation.current = true;
    setBusy(true);
    setNotice(
      action === 'link'
        ? 'Linking the stored run…'
        : 'Auditing stored evidence and capturing a handoff…',
    );
    setSessionFailures((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    try {
      if (action === 'link') {
        const document = await projectApi<ProjectDocument>(
          `/api/projects/${encodeURIComponent(id)}/runs`,
          token,
          { expectedRevision: project.revision, runId, milestoneId: milestone.id },
        );
        remember(document);
        if (sequence === selectionSequence.current) {
          setHistory(undefined);
          setShowHistory(false);
          setNotice(`Run linked to ${milestone.title}. Saved revision ${document.revision}.`);
        }
      } else {
        const receipt = await projectApi<ProjectHandoff>(
          `/api/projects/${encodeURIComponent(id)}/handoffs`,
          token,
          { expectedRevision: project.revision, runId },
        );
        // A 201 confirms persistence even if reading the updated document fails.
        // Keep the actual receipt inspectable; never invent a project snapshot.
        failure.confirmedReceipt = receipt;
        setCapturedReceipts((current) => ({ ...current, [id]: receipt }));
        const document = await projectApi<ProjectDocument>(
          `/api/projects/${encodeURIComponent(id)}`,
          token,
        );
        remember(document);
        if (sequence === selectionSequence.current) {
          setHistory(undefined);
          setShowHistory(false);
          setNotice(
            `Handoff captured at revision ${receipt.projectRevision}, source sequence ${receipt.sourceSeq}. No new checks were run.`,
          );
        }
      }
    } catch (error) {
      setSessionFailures((current) => ({
        ...current,
        [id]: { ...failure, error: projectFailure(error) },
      }));
      if (sequence === selectionSequence.current) setNotice('');
    } finally {
      mutation.current = false;
      setBusy(false);
    }
  }
  const changedFields = editor?.base
    ? briefKeys.filter((key) => !equal(editor.fields[key], editor.base![key]))
    : [];
  const stale = !!project && !!editor?.base && project.revision !== editor.base.revision;
  const conflicts = stale
    ? changedFields.filter(
        (key) =>
          !equal(project![key], editor!.base![key]) && !equal(project![key], editor!.fields[key]),
      )
    : [];
  const latestInspected =
    !!project && !!history?.some((snapshot) => snapshot.revision === project.revision);
  const needsToken =
    [listError, readError, historyError, editor?.error, prepareError, sessionFailure?.error].some(
      (error) => error?.status === 403,
    ) || runListing.error?.code === 'expired';
  return (
    <section className="projects-workspace" aria-label="Projects workspace">
      <div className="project-toolbar">
        <div>
          <div className="eyebrow">PERSISTENT WORKSPACE</div>
          <h1>Projects</h1>
        </div>
        <div className="project-actions">
          <button
            className="button"
            disabled={refreshing || busy || !token}
            onClick={() => void refresh()}
          >
            Refresh projects
          </button>
          <button
            className="primary"
            disabled={busy}
            onClick={() => {
              setDrafts((current) => ({
                ...current,
                [NEW]: current[NEW] ?? { fields: draftFor() },
              }));
              setNotice('');
              setSelectedId(NEW);
            }}
          >
            New project
          </button>
        </div>
      </div>
      <p className="project-feedback" role="status">
        {notice ||
          (busy
            ? 'Waiting for the runtime…'
            : refreshing
              ? 'Loading projects…'
              : !token
                ? 'Connecting to project storage…'
                : '')}
      </p>
      {listError && (
        <div className="project-error" role="alert">
          Could not refresh projects. {listError.message}{' '}
          {loaded && 'The last retrieved projects are kept below.'}
        </div>
      )}
      {(!token || needsToken) && (
        <div className="project-notice">
          <p>
            Reconnect to retrieve the current server token. Drafts stay in this page; saves are
            never retried automatically.
          </p>
          <button
            className="button"
            disabled={reconnecting || busy}
            onClick={async () => {
              setReconnecting(true);
              try {
                await reconnect();
                setNotice('Reconnected. Inspect the latest saved revision before retrying.');
                setListError(undefined);
                setConnectionRevision((value) => value + 1);
              } catch (error) {
                setListError(projectFailure(error));
              } finally {
                setReconnecting(false);
              }
            }}
          >
            Reconnect to runtime
          </button>
        </div>
      )}
      <div className="projects-layout">
        <aside className="project-picker" aria-label="Saved projects">
          <button
            className="project-picker-toggle"
            aria-expanded={pickerExpanded}
            aria-controls="project-picker-items"
            disabled={busy}
            onClick={() => setPickerOpen(!pickerExpanded)}
          >
            Saved projects ({projects.length}){project ? ` · ${project.name}` : ''}
            <span aria-hidden="true">{pickerExpanded ? ' ▴' : ' ▾'}</span>
          </button>
          <div id="project-picker-items" hidden={!pickerExpanded}>
            {loaded && !projects.length && (
              <p>No projects yet. Create a brief to begin; no run is needed.</p>
            )}
            {!loaded && !refreshing && !listError && <p>Waiting for project storage.</p>}
            <ul>
              {projects.map((item) => (
                <li key={item.id}>
                  <button
                    className={item.id === selectedId ? 'selected' : ''}
                    aria-current={item.id === selectedId ? 'true' : undefined}
                    disabled={busy}
                    onClick={() => {
                      setNotice('');
                      setSelectedId(item.id);
                      setPickerOpen(false);
                    }}
                  >
                    <strong>{item.name}</strong>
                    <span>
                      Revision {item.revision} ·{' '}
                      {item.milestones.find((m) => m.status === 'active')?.title ??
                        'No active milestone'}
                    </span>
                    {drafts[item.id] && <small>Unsaved draft kept</small>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {drafts[NEW] && selectedId !== NEW && (
            <button
              className="button"
              disabled={busy}
              onClick={() => {
                setNotice('');
                setSelectedId(NEW);
              }}
            >
              Return to unsaved new project
            </button>
          )}
        </aside>
        <div className="project-content">
          {reading && <p role="status">Opening saved project…</p>}
          {readError && (
            <div className="project-error" role="alert">
              <p>Could not open the saved project. {readError.message}</p>
              <button className="button" onClick={() => void inspectLatest()}>
                Retry reading project and history
              </button>
            </div>
          )}
          {!project && !editor && !reading && (
            <div className="project-card">
              <h2>{selectedId ? 'Project unavailable' : 'A place to return to'}</h2>
              <p>
                {selectedId
                  ? 'Refresh saved projects or select another project. Existing drafts stay in this page.'
                  : 'Select a saved project or create one. Your run views remain available in the navigation.'}
              </p>
            </div>
          )}
          {project && (
            <header className="project-card project-summary">
              <div className="eyebrow">PROJECT · REVISION {project.revision}</div>
              <h2>{project.name}</h2>
              <p className="muted project-save-context">
                Last saved {stamp(project.updatedAt)} · {project.runs.length} sessions ·{' '}
                {project.handoffs.length} handoffs
              </p>
              {milestone ? (
                <div className="project-focus">
                  <div className="project-status">
                    {milestone.status === 'active' ? 'Active milestone' : 'Selected milestone'}
                  </div>
                  <h3>{milestone.title}</h3>
                  <p className="project-focus-outcome">{milestone.outcome}</p>
                  {activeMilestone && activeMilestone.id !== milestone.id && (
                    <button
                      className="project-text-button"
                      disabled={busy}
                      onClick={() => setMilestoneId(activeMilestone.id)}
                    >
                      Return to active milestone: {activeMilestone.title}
                    </button>
                  )}
                  {!activeMilestone && (
                    <p className="muted">
                      No active milestone. Choose one in Edit milestones when ready.
                    </p>
                  )}
                  <div className="project-actions">
                    {latestLink && (
                      <button className="button" onClick={() => openRun(latestLink.runId)}>
                        Open linked session
                      </button>
                    )}
                    <button
                      className="primary"
                      disabled={
                        busy ||
                        historyLoading ||
                        !!editor ||
                        reading ||
                        !!readError ||
                        !token ||
                        sessionBlocked ||
                        launchRecovery
                      }
                      onClick={() => void prepareSession()}
                    >
                      Prepare next session
                    </button>
                    <button
                      className="project-text-button"
                      onClick={() => {
                        inspector.current?.focus();
                        inspector.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
                      }}
                    >
                      Inspect sessions and handoffs
                    </button>
                  </div>
                  {latestHandoff && (
                    <p className="muted">
                      Latest handoff: {stamp(latestHandoff.capturedAt)} · {latestHandoff.runStatus}{' '}
                      (historical).
                    </p>
                  )}
                  {editor && (
                    <p className="project-notice">
                      Save or discard this project's draft before preparing a session.
                    </p>
                  )}
                  {sessionBlocked && (
                    <p className="project-notice">
                      Inspect the session action recovery below before preparing another session.
                    </p>
                  )}
                  {launchRecovery && (
                    <p className="project-notice">
                      Return to launch recovery before preparing another session. Its inputs are
                      kept.
                    </p>
                  )}
                  {prepareError && (
                    <div className="project-error" role="alert">
                      <p>{prepareError.message}</p>
                      <button
                        className="button"
                        disabled={busy || historyLoading}
                        onClick={() => void inspectLatest()}
                      >
                        Read latest project and prerequisites
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p>No milestones yet. Open the project brief to add a reviewable outcome.</p>
              )}
              <details
                open={briefOpen}
                onToggle={(event) => setBriefOpen(event.currentTarget.open)}
              >
                <summary>Project brief and editing</summary>
                <p className="project-repository">{project.repository}</p>
                <div className="project-actions">
                  <button
                    className="button"
                    disabled={busy || !!editor || reading || !!readError}
                    onClick={() => updateEditor({ base: project, fields: draftFor(project) })}
                  >
                    Edit project
                  </button>
                  <button
                    className="button"
                    disabled={historyLoading || busy}
                    onClick={() => void inspectLatest()}
                  >
                    Inspect revision history
                  </button>
                </div>
                <section aria-label="Saved project brief">
                  <Brief project={project} />
                </section>
              </details>
            </header>
          )}
          {editor && (
            <ProjectEditor
              editor={editor}
              busy={busy}
              recoveryRequired={stale || historyLoading || !token}
              update={updateEditor}
              save={() => void save()}
              cancel={discard}
            />
          )}
          {editor &&
            (stale ||
              editor.error?.detail?.code === 'stale-revision' ||
              editor.error?.uncertain) && (
              <section className="project-notice" aria-label="Revision recovery">
                <h3>
                  {stale
                    ? `Draft based on revision ${editor.base?.revision}; latest saved revision is ${project?.revision}.`
                    : 'Inspect saved state before retrying'}
                </h3>
                <p>
                  Your unsaved text is retained. Read the latest saved state and full history, then
                  reconcile the fields you changed. Saving again is a separate action.
                </p>
                {history && !historyLoading && !latestInspected && (
                  <p>
                    The saved revision advanced during inspection. Read the latest state and history
                    again before reconciling.
                  </p>
                )}
                <button
                  className="button"
                  disabled={historyLoading || refreshing}
                  onClick={() => void inspectLatest()}
                >
                  Read latest saved state and history
                </button>
                {stale && latestInspected && (
                  <>
                    <p>
                      Edited fields retained:{' '}
                      {changedFields.map((key) => fieldNames[key]).join(', ') || 'none'}. Unedited
                      fields will use the latest saved values.
                    </p>
                    {!!conflicts.length && (
                      <p>
                        Both versions changed: {conflicts.map((key) => fieldNames[key]).join(', ')}.
                        Keeping your edited fields replaces these saved fields on your next save.
                      </p>
                    )}
                    <details>
                      <summary>Compare changed fields</summary>
                      {changedFields.map((key) => (
                        <div key={key}>
                          <h4>{fieldNames[key]}</h4>
                          <p>Latest saved value</p>
                          <pre>{JSON.stringify(project![key], null, 2)}</pre>
                          <p>Your draft</p>
                          <pre>{JSON.stringify(editor.fields[key], null, 2)}</pre>
                          <button
                            className="button"
                            onClick={() =>
                              updateEditor({
                                ...editor,
                                fields: { ...editor.fields, [key]: structuredClone(project![key]) },
                                compared: undefined,
                              })
                            }
                          >
                            Use saved {fieldNames[key].toLowerCase()}
                          </button>
                        </div>
                      ))}
                    </details>
                    <label className="project-checkbox">
                      <input
                        type="checkbox"
                        checked={editor.compared === project?.revision}
                        onChange={(event) =>
                          updateEditor({
                            ...editor,
                            compared: event.target.checked ? project?.revision : undefined,
                          })
                        }
                      />
                      <span>I compared my edits with the latest saved revision.</span>
                    </label>
                    <button
                      className="button"
                      disabled={editor.compared !== project?.revision || historyLoading || busy}
                      onClick={() => {
                        const fields = draftFor(project);
                        for (const key of changedFields)
                          Object.assign(fields, { [key]: structuredClone(editor.fields[key]) });
                        updateEditor({ fields, base: project });
                        setNotice(
                          `Draft reconciled with revision ${project!.revision}. Review it, then save explicitly.`,
                        );
                      }}
                    >
                      Keep edited fields on revision {project?.revision}
                    </button>
                  </>
                )}
                {editor.error?.uncertain &&
                  editor.inspectedAfterError &&
                  !stale &&
                  (selectedId === NEW ? loaded && !refreshing : latestInspected) && (
                    <label className="project-checkbox">
                      <input
                        type="checkbox"
                        onChange={(event) => {
                          if (event.target.checked) updateEditor({ ...editor, error: undefined });
                        }}
                      />
                      <span>I inspected saved projects and history; enable an explicit retry.</span>
                    </label>
                  )}
              </section>
            )}
          {showHistory && (
            <section className="project-card" aria-label="Project revision history">
              <h2>Revision history</h2>
              {historyLoading && <p role="status">Reading full saved snapshots…</p>}
              {historyError && (
                <p className="project-error" role="alert">
                  {historyError.message}
                </p>
              )}
              {history?.map((snapshot) => (
                <details key={snapshot.revision}>
                  <summary>
                    Revision {snapshot.revision} · {stamp(snapshot.updatedAt)} · {snapshot.name}
                  </summary>
                  <Brief project={snapshot} />
                  <h3>Milestones</h3>
                  {snapshot.milestones.length ? (
                    <ul>
                      {snapshot.milestones.map((item) => (
                        <li key={item.id}>
                          <strong>{item.title}</strong> ({item.id}) · {item.status}
                          <p>{item.outcome}</p>
                          <p>Prerequisites: {item.dependsOn.join(', ') || 'None'}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No milestones in this revision.</p>
                  )}
                  <details>
                    <summary>Full saved snapshot and provenance</summary>
                    <pre>{JSON.stringify(snapshot, null, 2)}</pre>
                  </details>
                </details>
              ))}
            </section>
          )}
          {project && (
            <>
              <section className="project-card" aria-label="Project milestone graph">
                <div className="project-toolbar">
                  <h2>Milestone graph</h2>
                  <button
                    className="button"
                    disabled={busy || !!editor || reading || !!readError}
                    onClick={() => updateEditor({ base: project, fields: draftFor(project) })}
                  >
                    Edit milestones
                  </button>
                </div>
                <p className="muted">
                  Prerequisite ↓ dependent. Select a milestone to inspect it. These are planning
                  states.
                </p>
                {!project.milestones.length ? (
                  <p>No milestones yet. Edit milestones to add a reviewable outcome.</p>
                ) : (
                  <ProjectRoadmap
                    milestones={project.milestones}
                    selectedId={milestone?.id}
                    disabled={busy}
                    select={(id) => {
                      setMilestoneId(id);
                      setPrepareError(undefined);
                    }}
                  />
                )}
              </section>
              {milestone && (
                <section
                  ref={inspector}
                  tabIndex={-1}
                  className="project-card project-inspector"
                  aria-label="Selected milestone"
                >
                  <div className="eyebrow">SELECTED MILESTONE · {milestone.id}</div>
                  <h2>{milestone.title}</h2>
                  <h3>Outcome</h3>
                  <p>{milestone.outcome}</p>
                  <p>
                    Planning status:{' '}
                    <strong>
                      {milestone.status === 'reviewed' ? 'Operator reviewed' : milestone.status}
                    </strong>
                    . This status does not assert runtime verification.
                  </p>
                  <h3>Prerequisites</h3>
                  {milestone.dependsOn.length ? (
                    <ul>
                      {milestone.dependsOn.map((id) => {
                        const dependency = project.milestones.find((item) => item.id === id);
                        return (
                          <li key={id}>
                            <button
                              className="project-text-button"
                              disabled={busy}
                              onClick={() => setMilestoneId(id)}
                            >
                              {dependency?.title ?? id}
                            </button>{' '}
                            ·{' '}
                            {dependency?.status === 'reviewed'
                              ? 'Operator reviewed'
                              : `${dependency?.status ?? 'missing'} — review required before preparation`}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>No prerequisites.</p>
                  )}
                  {sessionFailure && (
                    <div className="project-error" role="alert">
                      <h3>
                        {sessionFailure.confirmedReceipt
                          ? 'Handoff saved; project refresh failed'
                          : sessionFailure.error.uncertain
                            ? 'Save outcome uncertain'
                            : 'Session action could not be saved'}
                      </h3>
                      <p>
                        {sessionFailure.action === 'link' ? 'Link' : 'Capture'} for run{' '}
                        {sessionFailure.runId}, milestone {sessionFailure.milestoneId}, requested
                        from revision {sessionFailure.expectedRevision}.
                      </p>
                      {sessionFailure.confirmedReceipt ? (
                        <p>
                          Receipt {sessionFailure.confirmedReceipt.id} was saved at revision{' '}
                          {sessionFailure.confirmedReceipt.projectRevision}. It remains inspectable
                          below. Read the latest project before further actions.
                        </p>
                      ) : (
                        <p>{sessionFailure.error.message}</p>
                      )}
                      {sessionFailure.confirmedReceipt && (
                        <p>Refresh error: {sessionFailure.error.message}</p>
                      )}
                      {sessionFailure.error.uncertain && !sessionFailure.confirmedReceipt && (
                        <p>
                          The write may have reached storage. Inspect linked sessions, handoffs and
                          revision history before an explicit retry.
                        </p>
                      )}
                      {sessionFailure.error.detail?.code === 'run-busy' && (
                        <button
                          className="project-text-button"
                          onClick={() => openRun(sessionFailure.runId)}
                        >
                          Open source run to pause its worker
                        </button>
                      )}
                      <button
                        className="button"
                        disabled={busy || historyLoading}
                        onClick={() => void inspectLatest()}
                      >
                        Read latest sessions and revision history
                      </button>
                      {sessionBlocked &&
                        latestInspected &&
                        sessionFailure.inspectedRevision === project.revision && (
                          <button
                            className="button"
                            onClick={() =>
                              setSessionFailures((current) => {
                                const next = { ...current };
                                delete next[project.id];
                                return next;
                              })
                            }
                          >
                            I inspected saved sessions and handoffs; enable actions
                          </button>
                        )}
                    </div>
                  )}
                  {editor && (
                    <p className="project-notice">
                      Save or discard this project's draft before linking runs, capturing handoffs
                      or preparing a session.
                    </p>
                  )}
                  <ProjectSessions
                    key={`${project.id}:${milestone.id}`}
                    project={project}
                    milestone={milestone}
                    listing={runListing}
                    refresh={refreshRuns}
                    openRun={openRun}
                    disabled={
                      busy ||
                      historyLoading ||
                      !!editor ||
                      reading ||
                      !!readError ||
                      !token ||
                      sessionBlocked
                    }
                    act={(action, id) => void sessionAction(action, id)}
                    capturedReceipt={capturedReceipts[project.id]}
                  />
                  <p className="muted">
                    Preparation uses the saved revision and opens an editable goal. Drafting,
                    preflight review and authorization are still required. Historical checks never
                    become new PASS results.
                  </p>
                </section>
              )}
              {!!archivedLinks.length && (
                <section className="project-card" aria-label="Archived milestone sessions">
                  <h2>Sessions from removed milestones</h2>
                  <p>
                    Roadmap edits retain original session links and handoffs. These historical
                    records do not change the current roadmap.
                  </p>
                  {archivedLinks.map((link) => (
                    <div key={link.runId}>
                      <h3>
                        {link.milestone.title} ({link.milestoneId})
                      </h3>
                      <p>{link.milestone.outcome}</p>
                      <button className="project-text-button" onClick={() => openRun(link.runId)}>
                        Open run {link.runId}
                      </button>
                      {project.handoffs
                        .filter((receipt) => receipt.runId === link.runId)
                        .map((receipt) => (
                          <ProjectHandoffView
                            key={receipt.id}
                            receipt={receipt}
                            openRun={openRun}
                          />
                        ))}
                    </div>
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
