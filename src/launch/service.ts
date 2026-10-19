import { createHash, randomUUID } from 'node:crypto';
import { z } from 'zod';
import { contractSchema, type Contract } from '../core/model.js';
import { noteInputSchema, type NoteInput } from '../core/compass.js';
import {
  generateProposal,
  proposalTimeoutMs,
  type GenerateProposalOptions,
} from '../proposals/generate.js';
import { proposalRequestSchema, type Proposal, type ProposalProgress } from '../proposals/model.js';
import { repositoryHead } from '../proposals/evidence.js';
import { loadContract, preflight, withProjectSupervision } from '../service.js';
import type { LaunchAuthorization, LaunchPreview, ProposalJob } from '../shared/launch.js';
import { LaunchError, launchError } from './errors.js';
import { inspectWithinDeadline, localPathSchema } from './repositories.js';

const idSchema = z.string().uuid();
const goalSchema = proposalRequestSchema.shape.goal;
const preflightSchema = z
  .object({
    repository: localPathSchema,
    configPath: localPathSchema.optional(),
    contract: z.unknown().optional(),
    proposalId: idSchema.optional(),
    originalGoal: goalSchema.optional(),
    project: z.boolean().optional(),
    handoff: z.string().max(4000).optional(),
  })
  .strict()
  .superRefine((input, ctx) => {
    if ((input.configPath !== undefined) === (input.contract !== undefined))
      ctx.addIssue({
        code: 'custom',
        path: ['contract'],
        message: 'Provide either configPath or an edited inline contract.',
      });
    if ((input.proposalId !== undefined) !== (input.originalGoal !== undefined))
      ctx.addIssue({
        code: 'custom',
        path: ['proposalId'],
        message: 'A proposal review needs its proposalId and unchanged originalGoal.',
      });
    if (input.proposalId && input.configPath)
      ctx.addIssue({
        code: 'custom',
        path: ['contract'],
        message: 'Review the edited inline contract for this proposal.',
      });
  });
const authorizeSchema = z
  .object({
    authorized: z.literal(true),
    authorizationId: idSchema,
    repository: localPathSchema,
    contract: z.unknown(),
    proposalId: idSchema.optional(),
    originalGoal: goalSchema.optional(),
    handoff: noteInputSchema.optional(),
  })
  .strict();

const retentionMs = 30 * 60_000;
const authorizationMs = 10 * 60_000;
const maxJobs = 32;
const maxActive = 2;
const maxAuthorizations = 64;

interface JobEntry {
  view: ProposalJob;
  controller: AbortController;
  timer?: ReturnType<typeof setTimeout>;
  revision: number;
}
interface Receipt extends LaunchAuthorization {
  repository: string;
  head: string;
  contractHash: string;
  handoffHash: string;
  originalGoal?: string;
  revision?: number;
}
export interface AuthorizedLaunch {
  repository: string;
  expectedHead: string;
  contract: Contract;
  notes: NoteInput[];
}
export interface LaunchServiceOptions {
  // An internal dependency seam for local lifecycle verification; never request-controlled.
  generate?: (input: unknown, options: GenerateProposalOptions) => Promise<Proposal>;
  timeoutMs?: number;
}

/** Ephemeral drafts and review receipts. This service has no Store or run-creation access. */
export class LaunchService {
  private readonly jobs = new Map<string, JobEntry>();
  private readonly receipts = new Map<string, Receipt>();
  private active = 0;
  private closed = false;
  private readonly cleanup: ReturnType<typeof setInterval>;
  private readonly timeoutMs: number;
  private readonly generate: NonNullable<LaunchServiceOptions['generate']>;

  constructor(options: LaunchServiceOptions = {}) {
    this.timeoutMs = options.timeoutMs ?? proposalTimeoutMs;
    if (!Number.isInteger(this.timeoutMs) || this.timeoutMs < 1000 || this.timeoutMs > 300_000)
      throw new Error('Proposal timeout must be between one second and five minutes');
    this.generate = options.generate ?? generateProposal;
    this.cleanup = setInterval(() => this.prune(), 30_000);
    this.cleanup.unref();
  }

  start(input: unknown): ProposalJob {
    this.ensureOpen();
    const request = proposalRequestSchema.parse(input);
    this.prune();
    if (this.active >= maxActive)
      throw new LaunchError(
        'busy',
        'Two drafts are already running. Cancel one or wait for it to finish, then retry.',
        429,
      );
    if (this.jobs.size >= maxJobs) {
      const oldest = [...this.jobs.values()].find((entry) => entry.view.status !== 'drafting');
      if (oldest) {
        this.revoke(oldest.view.id);
        this.jobs.delete(oldest.view.id);
      }
    }
    const now = new Date().toISOString();
    const progress: ProposalProgress = {
      stage: 'collecting',
      message:
        'Preparing a read-only draft from committed HEAD. No checks or runs are being started.',
    };
    const entry: JobEntry = {
      controller: new AbortController(),
      revision: 0,
      view: {
        id: randomUUID(),
        request,
        status: 'drafting',
        createdAt: now,
        updatedAt: now,
        expiresAt: new Date(Date.now() + retentionMs).toISOString(),
        timeoutMs: this.timeoutMs,
        progress,
        history: [{ ...progress, at: now }],
      },
    };
    this.jobs.set(entry.view.id, entry);
    entry.timer = setTimeout(
      () =>
        this.finishWithError(
          entry,
          new LaunchError(
            'timeout',
            'Drafting timed out. Keep your repository and goal, check Codex availability and retry. No run was created.',
            408,
          ),
        ),
      this.timeoutMs,
    );
    entry.timer.unref();
    this.active++;
    // Start after returning the job ID; HTTP never waits for a model turn.
    void this.generateInBackground(entry);
    return this.copy(entry);
  }

  get(id: string): ProposalJob {
    return this.copy(this.entry(id));
  }

  cancel(id: string): ProposalJob {
    const entry = this.entry(id);
    if (entry.view.status !== 'cancelled') {
      entry.controller.abort();
      clearTimeout(entry.timer);
      entry.revision++;
      this.revoke(id);
      entry.view.status = 'cancelled';
      delete entry.view.proposal;
      entry.view.error = launchError(
        new LaunchError(
          'cancelled',
          'Draft discarded. Your inputs can be reused. Cancellation applies only to this draft.',
        ),
      );
      entry.view.updatedAt = new Date().toISOString();
    }
    return this.copy(entry);
  }

  async review(input: unknown, outer?: AbortSignal): Promise<LaunchPreview> {
    this.ensureOpen();
    // A new review attempt, including invalid edits, invalidates this proposal's old receipt.
    const rawId =
      input && typeof input === 'object' && 'proposalId' in input ? input.proposalId : undefined;
    let entry: JobEntry | undefined;
    let revision: number | undefined;
    if (typeof rawId === 'string') {
      entry = this.ready(rawId);
      revision = ++entry.revision;
      this.revoke(rawId);
    }
    const request = preflightSchema.parse(input);
    return inspectWithinDeadline(async (signal) => {
      let contract =
        request.configPath !== undefined
          ? await loadContract(request.configPath)
          : parseEditedContract(request.contract);
      if (request.project === true) contract = withProjectSupervision(contract);
      const handoff = request.handoff
        ? noteInputSchema.parse({ text: request.handoff })
        : undefined;
      const preview = await preflight(request.repository, contract, 'codex', signal);
      signal.throwIfAborted();
      this.ensureOpen();
      if (entry) {
        this.assertCurrent(entry, revision!);
        const proposal = entry.view.proposal!;
        if (
          request.originalGoal !== proposal.originalGoal ||
          preview.repository !== proposal.repository
        ) {
          this.cancel(entry.view.id);
          throw new LaunchError(
            'stale-review',
            'The repository or original goal changed. Generate a fresh draft before preflight.',
            409,
          );
        }
        if (preview.head !== proposal.head) {
          this.invalidateHead(entry);
          throw new LaunchError(
            'head-changed',
            'Repository HEAD changed since drafting. Generate a fresh draft before preflight.',
            409,
          );
        }
      }
      this.prune();
      if (this.receipts.size >= maxAuthorizations)
        this.receipts.delete(this.receipts.keys().next().value!);
      const receipt: Receipt = {
        id: randomUUID(),
        expiresAt: new Date(Date.now() + authorizationMs).toISOString(),
        repository: preview.repository,
        head: preview.head,
        contractHash: fingerprint(preview.contract),
        handoffHash: fingerprint(handoff ?? null),
        ...(entry
          ? { proposalId: entry.view.id, originalGoal: request.originalGoal, revision }
          : {}),
      };
      this.receipts.set(receipt.id, receipt);
      return {
        ...preview,
        ...(handoff ? { handoff } : {}),
        authorization: {
          id: receipt.id,
          expiresAt: receipt.expiresAt,
          ...(receipt.proposalId ? { proposalId: receipt.proposalId } : {}),
        },
      };
    }, outer);
  }

  /** Consume one reviewed receipt, then return pinned arguments for the existing createRun. */
  async authorize(input: unknown, outer?: AbortSignal): Promise<AuthorizedLaunch> {
    this.ensureOpen();
    const request = authorizeSchema.parse(input);
    this.prune();
    const receipt = this.receipts.get(request.authorizationId);
    if (!receipt)
      throw new LaunchError(
        'expired',
        'This preflight is expired, discarded or already used. Review a new preflight before authorizing.',
        409,
      );
    // Consume before any await: concurrent/retried requests cannot create duplicate runs.
    this.receipts.delete(receipt.id);
    const contract = parseEditedContract(request.contract);
    if (
      receipt.proposalId !== request.proposalId ||
      receipt.originalGoal !== request.originalGoal ||
      receipt.contractHash !== fingerprint(contract) ||
      receipt.handoffHash !== fingerprint(request.handoff ?? null)
    )
      throw new LaunchError(
        'stale-review',
        'The reviewed contract, goal or handoff changed. Review a new preflight before authorizing.',
        409,
      );
    const entry = receipt.proposalId ? this.ready(receipt.proposalId) : undefined;
    if (entry) this.assertCurrent(entry, receipt.revision!);
    return inspectWithinDeadline(async (signal) => {
      const current = await repositoryHead(request.repository, signal);
      signal.throwIfAborted();
      this.ensureOpen();
      if (entry) this.assertCurrent(entry, receipt.revision!);
      if (current.repository !== receipt.repository)
        throw new LaunchError(
          'stale-review',
          'The canonical repository changed. Review a new preflight before authorizing.',
          409,
        );
      if (current.head !== receipt.head) {
        if (entry) this.invalidateHead(entry);
        throw new LaunchError(
          'head-changed',
          'Repository HEAD changed after preflight. Review the current repository before authorizing.',
          409,
        );
      }
      if (Date.parse(receipt.expiresAt) <= Date.now())
        throw new LaunchError(
          'expired',
          'This preflight expired during inspection. Review a new preflight before authorizing.',
          409,
        );
      if (entry) {
        // Supersede in-flight reviews, but retain the editable draft. If run
        // creation fails, another preflight can recover without another model turn.
        entry.revision++;
        this.revoke(entry.view.id);
      }
      return {
        repository: receipt.repository,
        expectedHead: receipt.head,
        contract,
        notes: request.handoff ? [request.handoff] : [],
      };
    }, outer);
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    clearInterval(this.cleanup);
    for (const entry of this.jobs.values()) {
      entry.controller.abort();
      clearTimeout(entry.timer);
    }
    this.jobs.clear();
    this.receipts.clear();
  }

  private async generateInBackground(entry: JobEntry): Promise<void> {
    try {
      await Promise.resolve();
      entry.controller.signal.throwIfAborted();
      const proposal = await this.generate(entry.view.request, {
        signal: entry.controller.signal,
        timeoutMs: this.timeoutMs,
        onProgress: (progress) => {
          if (entry.view.status !== 'drafting' || entry.controller.signal.aborted) return;
          const at = new Date().toISOString();
          entry.view.progress = { ...progress };
          entry.view.updatedAt = at;
          entry.view.history = [...entry.view.history.slice(-31), { ...progress, at }];
        },
      });
      if (entry.view.status !== 'drafting' || entry.controller.signal.aborted || this.closed)
        return;
      // Use the lifecycle ID consistently for polling, cancellation and review.
      entry.view.proposal = { ...structuredClone(proposal), id: entry.view.id };
      entry.view.status = 'ready';
      entry.view.progress = {
        stage: 'ready',
        message:
          'Unapproved draft ready. Review every proposed check and boundary. Proposed checks were not executed during drafting.',
      };
      entry.view.updatedAt = new Date().toISOString();
    } catch (error) {
      if (entry.view.status === 'drafting' && !this.closed) this.finishWithError(entry, error);
    } finally {
      clearTimeout(entry.timer);
      this.active--;
    }
  }

  private finishWithError(entry: JobEntry, error: unknown): void {
    if (entry.view.status !== 'drafting') return;
    entry.controller.abort();
    clearTimeout(entry.timer);
    entry.view.status = 'failed';
    entry.view.error = launchError(error);
    entry.view.updatedAt = new Date().toISOString();
    delete entry.view.proposal;
    this.revoke(entry.view.id);
  }
  private invalidateHead(entry: JobEntry): void {
    this.cancel(entry.view.id);
    entry.view.status = 'failed';
    entry.view.error = launchError(
      new LaunchError(
        'head-changed',
        'Repository HEAD changed. Generate a fresh draft from the current commit.',
        409,
      ),
    );
  }
  private ensureOpen(): void {
    if (this.closed)
      throw new LaunchError(
        'expired',
        'The drafting service stopped. Reopen New Run and try again.',
        503,
      );
  }
  private entry(id: string): JobEntry {
    this.ensureOpen();
    idSchema.parse(id);
    this.prune();
    const entry = this.jobs.get(id);
    if (!entry)
      throw new LaunchError(
        'not-found',
        'This draft expired or the server restarted. Keep your inputs and generate a fresh draft.',
        404,
      );
    return entry;
  }
  private ready(id: string): JobEntry {
    const entry = this.entry(id);
    if (entry.view.status !== 'ready' || !entry.view.proposal)
      throw new LaunchError(
        'stale-review',
        'This draft is unavailable or not ready. Generate or finish a draft before preflight.',
        409,
      );
    return entry;
  }
  private assertCurrent(entry: JobEntry, revision: number): void {
    if (this.ready(entry.view.id) !== entry || entry.revision !== revision)
      throw new LaunchError(
        'stale-review',
        'A newer review or cancellation superseded this request. Use the current draft and review a new preflight.',
        409,
      );
  }
  private revoke(proposalId: string): void {
    for (const [id, receipt] of this.receipts)
      if (receipt.proposalId === proposalId) this.receipts.delete(id);
  }
  private copy(entry: JobEntry): ProposalJob {
    return structuredClone(entry.view);
  }
  private prune(): void {
    const now = Date.now();
    for (const [id, entry] of this.jobs) {
      if (Date.parse(entry.view.expiresAt) > now) continue;
      entry.controller.abort();
      clearTimeout(entry.timer);
      this.revoke(id);
      this.jobs.delete(id);
    }
    for (const [id, receipt] of this.receipts)
      if (Date.parse(receipt.expiresAt) <= now) this.receipts.delete(id);
  }
}

function parseEditedContract(input: unknown): Contract {
  if (input && typeof input === 'object' && 'criteria' in input && Array.isArray(input.criteria)) {
    const gaps = input.criteria.filter(
      (criterion: unknown) =>
        criterion &&
        typeof criterion === 'object' &&
        'command' in criterion &&
        (criterion.command === null ||
          (Array.isArray(criterion.command) && criterion.command.length === 0)),
    );
    if (gaps.length)
      throw new LaunchError(
        'invalid-draft',
        'Resolve every missing check with reviewed exact arguments before preflight. No command has been run.',
      );
  }
  // The immutable runtime contract is the sole launchability policy.
  return contractSchema.parse(input);
}

function fingerprint(value: unknown): string {
  return createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex');
}
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, canonical(item)]),
    );
  return value;
}
