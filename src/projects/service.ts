import type { RunState } from '../core/model.js';
import { Store, alive } from '../core/store.js';
import { auditStoredEvidence } from '../service.js';
import {
  projectBriefSchema,
  projectCreateSchema,
  projectRevisionRequestSchema,
  projectRunRequestSchema,
  projectHandoffRequestSchema,
  projectContinuationRequestSchema,
  projectLimits,
  type ProjectDocument,
  type ProjectMilestone,
  type ProjectRunLink,
} from '../shared/projects.js';
import { parseProjectInput, ProjectError } from './errors.js';
import { inspectProjectRepository } from './repository.js';
import { ProjectStore } from './store.js';
import { deriveHandoff } from './handoffs.js';
import { proposeContinuation } from './continuations.js';

/** Reviewed is an operator roadmap decision; it never changes any run evidence. */
export function requireReviewedPrerequisites(
  milestone: ProjectMilestone,
  milestones: ProjectMilestone[],
): void {
  const byId = new Map(milestones.map((item) => [item.id, item]));
  const prerequisites = new Set<string>();
  const visit = (item: ProjectMilestone) => {
    for (const id of item.dependsOn) {
      if (prerequisites.has(id)) continue;
      prerequisites.add(id);
      const dependency = byId.get(id);
      if (dependency) visit(dependency);
    }
  };
  visit(milestone);
  const unmet = [...prerequisites].filter((id) => byId.get(id)?.status !== 'reviewed');
  if (unmet.length)
    throw new ProjectError(
      'prerequisites',
      `Review milestone prerequisites first: ${unmet.join(', ')}.`,
      409,
    );
}

function validateActiveMilestone(milestones: ProjectMilestone[]): void {
  for (const milestone of milestones)
    if (milestone.status === 'active') requireReviewedPrerequisites(milestone, milestones);
}

export class ProjectService {
  constructor(
    readonly store: ProjectStore,
    private readonly runs: Store,
  ) {}

  async create(input: unknown, signal?: AbortSignal) {
    const request = parseProjectInput(projectCreateSchema, input);
    validateActiveMilestone(request.milestones);
    const binding = await inspectProjectRepository(request.repository, signal);
    signal?.throwIfAborted();
    return this.store.create({ ...request, ...binding });
  }

  revise(id: string, input: unknown) {
    const request = parseProjectInput(projectRevisionRequestSchema, input);
    return this.store.update(id, request.expectedRevision, (current) => {
      const brief = parseProjectInput(projectBriefSchema, {
        name: current.name,
        purpose: current.purpose,
        audience: current.audience,
        constraints: current.constraints,
        decisions: current.decisions,
        hypotheses: current.hypotheses,
        milestones: current.milestones,
        ...request.changes,
      });
      validateActiveMilestone(brief.milestones);
      return { ...current, ...brief };
    });
  }

  async linkRun(id: string, input: unknown, signal?: AbortSignal) {
    const request = parseProjectInput(projectRunRequestSchema, input);
    const project = this.store.atRevision(id, request.expectedRevision);
    this.milestone(project, request.milestoneId);
    const inspected = this.run(request.runId);
    await this.requireRunRepository(project, inspected, signal);
    signal?.throwIfAborted();
    return this.store.update(id, request.expectedRevision, (current) => {
      const milestone = this.milestone(current, request.milestoneId);
      if (current.runs.some((link) => link.runId === request.runId))
        throw new ProjectError(
          'invalid-request',
          'This run is already linked to a milestone in this project. Its original binding is immutable.',
        );
      if (current.runs.length >= projectLimits.linkedRuns)
        throw new ProjectError(
          'invalid-request',
          `A project can link at most ${projectLimits.linkedRuns} runs.`,
        );
      const state = this.run(request.runId);
      if (
        state.repository !== inspected.repository ||
        state.worktree !== inspected.worktree ||
        state.baseHead !== inspected.baseHead
      )
        throw this.runChanged();
      const link: ProjectRunLink = {
        runId: state.id,
        milestoneId: milestone.id,
        milestone: structuredClone(milestone),
        projectRevision: current.revision + 1,
        linkedAt: new Date().toISOString(),
        sourceSeq: state.seq,
        repository: state.repository,
        worktree: state.worktree,
        repositoryIdentity: current.repositoryIdentity,
        baseHead: state.baseHead,
      };
      return { ...current, runs: [...current.runs, link] };
    });
  }

  async captureHandoff(id: string, input: unknown, signal?: AbortSignal) {
    const request = parseProjectInput(projectHandoffRequestSchema, input);
    const project = this.store.atRevision(id, request.expectedRevision);
    const link = this.link(project, request.runId);
    this.requireHandoffCapacity(project);
    const inspected = this.run(request.runId);
    this.requireLinkBinding(link, inspected);
    this.requireIdleRun(request.runId);
    // A removed source/worktree may still yield a useful handoff: the existing
    // auditor invalidates unavailable proof. Accessible unrelated replacements
    // are rejected instead of being attributed to the saved repository.
    await this.requireRunRepository(project, inspected, signal, true);
    this.store.atRevision(id, request.expectedRevision);
    this.requireIdleRun(request.runId);
    const beforeAudit = this.run(request.runId);
    await auditStoredEvidence(this.runs, request.runId);
    signal?.throwIfAborted();
    const audited = this.run(request.runId);
    if (
      this.runs
        .events(request.runId, beforeAudit.seq)
        .some(
          (event) =>
            event.type !== 'evidence.invalidated' && event.type !== 'project.review.invalidated',
        )
    )
      throw this.runChanged();

    const updated = this.store.update(id, request.expectedRevision, (current) => {
      const currentLink = this.link(current, request.runId);
      this.requireHandoffCapacity(current);
      this.requireIdleRun(request.runId);
      const state = this.run(request.runId);
      this.requireLinkBinding(currentLink, state);
      // BEGIN IMMEDIATE also excludes worker appends on this ledger. The exact
      // audited sequence, revision check and receipt append share that lock.
      if (state.seq !== audited.seq) throw this.runChanged();
      const receipt = deriveHandoff(current, currentLink, state);
      return { ...current, handoffs: [...current.handoffs, receipt] };
    });
    return updated.handoffs.at(-1)!;
  }

  async prepareContinuation(id: string, input: unknown, signal?: AbortSignal) {
    const request = parseProjectInput(projectContinuationRequestSchema, input);
    const project = this.store.atRevision(id, request.expectedRevision);
    requireReviewedPrerequisites(this.milestone(project, request.milestoneId), project.milestones);
    const binding = await inspectProjectRepository(project.repository, signal);
    if (binding.repositoryIdentity.commonDirectory !== project.repositoryIdentity.commonDirectory)
      throw new ProjectError(
        'repository',
        'The saved project repository now resolves to a different Git common repository. Restore its original binding before preparing a session.',
      );
    signal?.throwIfAborted();
    const current = this.store.atRevision(id, request.expectedRevision);
    const milestone = this.milestone(current, request.milestoneId);
    requireReviewedPrerequisites(milestone, current.milestones);
    return proposeContinuation(current, milestone);
  }

  private run(id: string): RunState {
    try {
      return this.runs.get(id);
    } catch {
      throw new ProjectError(
        'invalid-request',
        'Select an actual run stored in this Iterfox data directory.',
      );
    }
  }

  private milestone(project: ProjectDocument, id: string): ProjectMilestone {
    const milestone = project.milestones.find((item) => item.id === id);
    if (!milestone)
      throw new ProjectError('invalid-request', 'Select a milestone from this project.');
    return milestone;
  }

  private link(project: ProjectDocument, runId: string): ProjectRunLink {
    const link = project.runs.find((item) => item.runId === runId);
    if (!link)
      throw new ProjectError(
        'invalid-request',
        'Link this stored run to a project milestone before capturing a handoff.',
      );
    return link;
  }

  private requireLinkBinding(link: ProjectRunLink, state: RunState): void {
    if (
      link.repository !== state.repository ||
      link.worktree !== state.worktree ||
      link.baseHead !== state.baseHead ||
      state.seq < link.sourceSeq
    )
      throw this.runChanged();
  }

  private requireHandoffCapacity(project: ProjectDocument): void {
    if (project.handoffs.length >= projectLimits.handoffs)
      throw new ProjectError(
        'invalid-request',
        `A project can retain at most ${projectLimits.handoffs} immutable handoff receipts.`,
      );
  }

  private requireIdleRun(id: string): void {
    const lease = this.runs.lease(id);
    if (lease && alive(lease.pid))
      throw new ProjectError(
        'run-busy',
        'This run has a live worker. Pause it and wait for worker exit before capturing an audited handoff.',
        409,
      );
  }

  private runChanged(): ProjectError {
    return new ProjectError(
      'run-changed',
      'The source run changed during handoff inspection. No receipt was saved; inspect the run and retry.',
      409,
    );
  }

  private async requireRunRepository(
    project: ProjectDocument,
    state: RunState,
    signal?: AbortSignal,
    allowUnavailable = false,
  ): Promise<void> {
    const inspections = await Promise.allSettled(
      [...new Set([state.repository, state.worktree])].map((path) =>
        inspectProjectRepository(path, signal),
      ),
    );
    signal?.throwIfAborted();
    let accessible = 0;
    for (const inspection of inspections) {
      if (inspection.status !== 'fulfilled') continue;
      accessible++;
      if (
        inspection.value.repositoryIdentity.commonDirectory !==
        project.repositoryIdentity.commonDirectory
      )
        throw new ProjectError(
          'repository',
          'This run belongs to a different Git common repository. Select a run from the project repository or one of its worktrees.',
        );
    }
    if (!accessible && !allowUnavailable)
      throw new ProjectError(
        'repository',
        'Neither the stored run repository nor its worktree is accessible. Repository identity could not be confirmed; no link was saved.',
      );
  }
}
