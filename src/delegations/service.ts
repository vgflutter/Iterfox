import { randomUUID, createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { cp, lstat, mkdir, mkdtemp, rm, realpath } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { z } from 'zod';
import { contractSchema, type Contract, type RunState } from '../core/model.js';
import { Store, alive } from '../core/store.js';
import { auditChanges, stamp } from '../core/workspace.js';
import { Engine } from '../core/engine.js';
import { questions } from '../core/compass.js';
import { projectReviewCurrent } from '../core/supervision.js';
import { keepWorkerAwake } from '../core/awake.js';
import { auditStoredEvidence, createRun, controlRun, providerFor, resumeRun } from '../service.js';
import type { AgentProvider } from '../providers/provider.js';

const execute = promisify(execFile);
const identifier = z.string().regex(/^[a-z][a-z0-9-]{0,39}$/);
export const delegationSpecSchema = z
  .object({
    repository: z.string().min(1).max(4096),
    contract: contractSchema,
    milestones: z
      .array(
        z
          .object({
            id: identifier,
            title: z.string().min(3).max(200),
            outcome: z.string().min(5).max(2000),
            criterionIds: z.array(identifier).min(1).max(30),
            dependsOn: z.array(identifier).max(31),
          })
          .strict(),
      )
      .min(1)
      .max(32),
    environment: z
      .object({ copyIgnoredPaths: z.array(z.literal('node_modules')).max(1) })
      .strict()
      .default({ copyIgnoredPaths: [] }),
  })
  .strict()
  .superRefine((s, ctx) => {
    const ids = new Set(s.milestones.map((m) => m.id));
    const criteria = new Set(s.contract.criteria.map((c) => c.id));
    if (ids.size !== s.milestones.length)
      ctx.addIssue({ code: 'custom', message: 'Milestone IDs must be unique' });
    const covered = new Set(s.milestones.flatMap((m) => m.criterionIds));
    if ([...criteria].some((id) => !covered.has(id)))
      ctx.addIssue({
        code: 'custom',
        message: 'Every approved criterion must belong to an outcome',
      });
    const visited = new Set<string>(),
      visiting = new Set<string>();
    const walk = (id: string): boolean => {
      if (visiting.has(id)) return false;
      if (visited.has(id)) return true;
      visiting.add(id);
      for (const dep of s.milestones.find((m) => m.id === id)?.dependsOn ?? [])
        if (!walk(dep)) return false;
      visiting.delete(id);
      visited.add(id);
      return true;
    };
    for (const m of s.milestones) {
      if (
        new Set(m.criterionIds).size !== m.criterionIds.length ||
        m.criterionIds.some((id) => !criteria.has(id)) ||
        new Set(m.dependsOn).size !== m.dependsOn.length ||
        m.dependsOn.some((id) => !ids.has(id)) ||
        !walk(m.id)
      )
        ctx.addIssue({
          code: 'custom',
          message: 'Outcomes need known unique criteria and acyclic prerequisites',
        });
      if (s.contract.goal.length + m.outcome.length + m.title.length > 8500)
        ctx.addIssue({ code: 'custom', message: 'Goal and outcome together are too long' });
    }
  });
export type DelegationSpec = z.infer<typeof delegationSpecSchema>;
type Status = 'AUTHORIZED' | 'RUNNING' | 'PAUSED' | 'STOPPED' | 'BLOCKED' | 'COMPLETED';
export interface DelegationStage {
  id: string;
  status: 'PENDING' | 'CREATING' | 'RUNNING' | 'CHECKPOINTED';
  runId?: string;
  environmentPrepared?: boolean;
  checkpoint?: {
    head: string;
    ref: string;
    sourceFingerprint: string;
    sourceSeq: number;
    at: string;
  };
}
export interface Delegation {
  id: string;
  revision: number;
  spec: DelegationSpec;
  specHash: string;
  sourceHead: string;
  commonDirectory: string;
  provider: 'codex' | 'demo';
  authorizedAt: string;
  updatedAt: string;
  status: Status;
  reason?: string;
  control?: 'pause' | 'stop';
  stages: DelegationStage[];
  launchRequested?: boolean;
  events: { at: string; kind: string; message: string; stageId?: string; runId?: string }[];
}
function digest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

/** Independent host plumbing: no user shell, hooks, signing or inherited Git overrides. */
async function git(cwd: string, args: string[], index?: string) {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')),
  );
  const result = await execute(
    '/usr/bin/git',
    [
      '--no-lazy-fetch',
      '--literal-pathspecs',
      '-c',
      'core.hooksPath=/dev/null',
      '-c',
      'core.fsmonitor=false',
      '-c',
      'commit.gpgsign=false',
      '-c',
      'core.autocrlf=false',
      ...args,
    ],
    {
      cwd,
      maxBuffer: 20 * 1024 * 1024,
      timeout: 60000,
      env: {
        ...env,
        GIT_TERMINAL_PROMPT: '0',
        GIT_NO_LAZY_FETCH: '1',
        GIT_AUTHOR_NAME: 'Iterfox checkpoint',
        GIT_AUTHOR_EMAIL: 'checkpoint@iterfox.local',
        GIT_COMMITTER_NAME: 'Iterfox checkpoint',
        GIT_COMMITTER_EMAIL: 'checkpoint@iterfox.local',
        ...(index ? { GIT_INDEX_FILE: index } : {}),
      },
    },
  );
  return result.stdout.trimEnd();
}
function event(d: Delegation, kind: string, message: string, stageId?: string, runId?: string) {
  d.events.push({ at: new Date().toISOString(), kind, message, stageId, runId });
}
export class DelegationStore {
  constructor(readonly runs: Store) {
    runs.db.exec(`CREATE TABLE IF NOT EXISTS delegations (id TEXT PRIMARY KEY, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS delegation_leases (id TEXT PRIMARY KEY, owner TEXT NOT NULL, pid INTEGER NOT NULL);`);
  }
  get(id: string): Delegation {
    const row = this.runs.db.prepare('SELECT body FROM delegations WHERE id=?').get(id) as
      { body: string } | undefined;
    if (!row) throw new Error('Delegation not found');
    const d = JSON.parse(row.body) as Delegation;
    if (digest(delegationSpecSchema.parse(d.spec)) !== d.specHash)
      throw new Error('Approved delegation integrity check failed');
    return d;
  }
  list() {
    return (
      this.runs.db.prepare('SELECT id FROM delegations ORDER BY rowid DESC').all() as {
        id: string;
      }[]
    ).map((r) => this.get(r.id));
  }
  insert(d: Delegation) {
    this.runs.db.prepare('INSERT INTO delegations VALUES (?,?)').run(d.id, JSON.stringify(d));
    return d;
  }
  change(id: string, change: (d: Delegation) => void): Delegation {
    this.runs.db.exec('BEGIN IMMEDIATE');
    try {
      const d = this.get(id);
      const original = JSON.stringify({
        spec: d.spec,
        hash: d.specHash,
        head: d.sourceHead,
        common: d.commonDirectory,
        authorized: d.authorizedAt,
        provider: d.provider,
      });
      change(d);
      if (
        original !==
        JSON.stringify({
          spec: d.spec,
          hash: d.specHash,
          head: d.sourceHead,
          common: d.commonDirectory,
          authorized: d.authorizedAt,
          provider: d.provider,
        })
      )
        throw new Error('Delegation approval is immutable');
      d.revision++;
      d.updatedAt = new Date().toISOString();
      this.runs.db.prepare('UPDATE delegations SET body=? WHERE id=?').run(JSON.stringify(d), id);
      this.runs.db.exec('COMMIT');
      return d;
    } catch (error) {
      this.runs.db.exec('ROLLBACK');
      throw error;
    }
  }
  lease(id: string) {
    return this.runs.db.prepare('SELECT owner,pid FROM delegation_leases WHERE id=?').get(id) as
      { owner: string; pid: number } | undefined;
  }
  acquire(id: string, owner: string) {
    this.runs.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.lease(id);
      if (prior && alive(prior.pid)) throw new Error('A delegation worker is already alive');
      this.runs.db
        .prepare('INSERT OR REPLACE INTO delegation_leases VALUES (?,?,?)')
        .run(id, owner, process.pid);
      this.runs.db.exec('COMMIT');
    } catch (e) {
      this.runs.db.exec('ROLLBACK');
      throw e;
    }
  }
  release(id: string, owner: string) {
    this.runs.db.prepare('DELETE FROM delegation_leases WHERE id=? AND owner=?').run(id, owner);
  }
}

export async function previewDelegation(input: unknown) {
  const spec = delegationSpecSchema.parse(input);
  spec.repository = await realpath(resolve(spec.repository));
  if (
    (await realpath(await git(spec.repository, ['rev-parse', '--show-toplevel']))) !==
    spec.repository
  )
    throw new Error('Choose a repository root');
  const head = await git(spec.repository, ['rev-parse', 'HEAD']);
  const commonDirectory = await realpath(
    await git(spec.repository, ['rev-parse', '--path-format=absolute', '--git-common-dir']),
  );
  if (await git(spec.repository, ['status', '--porcelain', '--untracked-files=all']))
    throw new Error(
      'Commit and review the source checkpoint first; uncommitted work is not included',
    );
  return {
    spec,
    expectedHead: head,
    commonDirectory,
    specHash: digest(spec),
    permissions: [
      'Sequential project missions within this complete approved contract',
      'Host creates verified local checkpoint commits under refs/iterfox/checkpoints; source HEAD and index stay unchanged',
      'Historical handoffs are context; each new mission starts with no proofs',
      'No push, merge, deployment, new check commands or automatic contract changes',
    ],
    limits: spec.contract.limits,
    authorizationRequired: true as const,
  };
}
export async function createDelegation(
  runs: Store,
  input: unknown,
  provider: 'codex' | 'demo' = 'codex',
) {
  const request = z
    .object({
      spec: delegationSpecSchema,
      expectedHead: z.string().regex(/^[a-f0-9]{40,64}$/),
      authorized: z.literal(true),
      requestId: z.string().uuid().optional(),
    })
    .strict()
    .parse(input);
  const ds = new DelegationStore(runs);
  if (request.requestId) {
    const prior = ds.list().find((d) => d.id === request.requestId);
    if (prior) {
      if (
        prior.specHash !== digest(request.spec) ||
        prior.sourceHead !== request.expectedHead ||
        prior.provider !== provider
      )
        throw new Error('This request ID belongs to a different authorization');
      return prior;
    }
  }
  const preview = await previewDelegation(request.spec);
  if (preview.expectedHead !== request.expectedHead)
    throw new Error('Source HEAD changed; review delegation again');
  const now = new Date().toISOString();
  const d: Delegation = {
    id: request.requestId ?? randomUUID(),
    revision: 1,
    spec: preview.spec,
    specHash: preview.specHash,
    sourceHead: preview.expectedHead,
    commonDirectory: preview.commonDirectory,
    provider,
    authorizedAt: now,
    updatedAt: now,
    status: 'AUTHORIZED',
    stages: preview.spec.milestones.map((m) => ({ id: m.id, status: 'PENDING' })),
    events: [],
  };
  event(
    d,
    'authorized',
    'Operator authorized the complete bounded delegation, including local verified checkpoint commits.',
  );
  try {
    return ds.insert(d);
  } catch (error) {
    const existing = ds.list().find((x) => x.id === d.id);
    if (
      existing &&
      existing.specHash === d.specHash &&
      existing.sourceHead === d.sourceHead &&
      existing.provider === d.provider
    )
      return existing;
    throw error;
  }
}
export function requestDelegationControl(runs: Store, id: string, action: 'pause' | 'stop') {
  const ds = new DelegationStore(runs);
  const result = ds.change(id, (d) => {
    if (d.status === 'COMPLETED') throw new Error('Completed delegation cannot be controlled');
    d.control = action;
    event(d, 'control-requested', action);
    if (!ds.lease(id) || !alive(ds.lease(id)!.pid))
      d.status = action === 'pause' ? 'PAUSED' : 'STOPPED';
  });
  const active = result.stages.find((s) => s.status === 'RUNNING');
  if (active?.runId && !['COMPLETED', 'FAILED'].includes(runs.get(active.runId).status))
    controlRun(runs, active.runId, action);
  return ds.get(id);
}
export function resumeDelegation(runs: Store, id: string) {
  const ds = new DelegationStore(runs);
  const lease = ds.lease(id);
  if (lease && alive(lease.pid)) throw new Error('Wait for the delegation worker to exit');
  return ds.change(id, (d) => {
    if (!['PAUSED', 'STOPPED', 'BLOCKED'].includes(d.status))
      throw new Error('Delegation does not require resume');
    d.status = 'AUTHORIZED';
    delete d.control;
    delete d.reason;
    event(
      d,
      'resumed',
      'Explicit resume retains the original authorization time and aggregate limits.',
    );
  });
}
export function recoverDelegations(runs: Store) {
  const ds = new DelegationStore(runs);
  for (const d of ds.list()) {
    const lease = ds.lease(d.id);
    if (
      (d.status === 'RUNNING' ||
        (d.status === 'AUTHORIZED' &&
          d.launchRequested &&
          Date.now() - Date.parse(d.updatedAt) > 10000)) &&
      (!lease || !alive(lease.pid))
    )
      ds.change(d.id, (x) => {
        x.status = 'BLOCKED';
        x.reason =
          'Delegation worker ended unexpectedly or startup was not confirmed. Inspect possible orphan processes, then resume explicitly; existing runs and checkpoints are retained.';
        event(x, 'worker-lost', x.reason);
      });
  }
}
function usage(runs: Store, d: Delegation) {
  const states = d.stages.flatMap((s) => (s.runId ? [runs.get(s.runId)] : []));
  return {
    turns: states.reduce((n, s) => n + s.turns, 0),
    tokens: states.reduce((n, s) => n + s.tokens, 0),
    duration: Date.now() - Date.parse(d.authorizedAt),
  };
}
async function prepareEnvironment(d: Delegation, run: RunState) {
  for (const name of d.spec.environment.copyIgnoredPaths) {
    const source = join(d.spec.repository, name),
      destination = join(run.worktree, name);
    if (!(await lstat(source)).isDirectory())
      throw new Error('Prepared dependencies must be a real directory');
    // check-ignore does not support the literal pathspec magic used by other
    // plumbing commands. `name` is the schema's fixed node_modules literal.
    await git(d.spec.repository, ['--no-literal-pathspecs', 'check-ignore', '-q', '--', name]);
    try {
      await lstat(destination);
      throw new Error('Environment destination already exists');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    }
    await cp(source, destination, {
      recursive: true,
      verbatimSymlinks: true,
      force: false,
      errorOnExist: true,
    });
  }
}
async function checkpoint(runs: Store, d: Delegation, stage: DelegationStage) {
  const run = runs.get(stage.runId!);
  if (runs.lease(run.id) && alive(runs.lease(run.id)!.pid))
    throw new Error('Run worker still owns the snapshot');
  await auditStoredEvidence(runs, run.id);
  const current = runs.get(run.id),
    before = await stamp(current.worktree);
  if (
    current.status !== 'COMPLETED' ||
    current.criteria.some((c) => !['PASSED', 'ASSESSED'].includes(c.status)) ||
    questions(current).length ||
    !projectReviewCurrent(current, before)
  )
    throw new Error(
      'Current matching checks and a ready project review are required before checkpoint',
    );
  const changed = await auditChanges(current);
  for (const name of changed) {
    try {
      if ((await lstat(join(current.worktree, name))).isSymbolicLink())
        throw new Error('Changed symlinks require operator review before checkpoint');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    }
  }
  const ref = `refs/iterfox/checkpoints/${d.id}/${stage.id}`;
  const temporary = await mkdtemp(join(tmpdir(), 'iterfox-index-'));
  try {
    const index = join(temporary, 'index');
    await git(current.worktree, ['read-tree', current.baseHead], index);
    if (changed.length) await git(current.worktree, ['add', '-A', '--', ...changed], index);
    const tree = await git(current.worktree, ['write-tree'], index);
    let head: string;
    try {
      head = await git(current.worktree, ['rev-parse', '--verify', ref]);
      if (
        (await git(current.worktree, ['rev-parse', `${head}^{tree}`])) !== tree ||
        (await git(current.worktree, ['rev-parse', `${head}^`])) !== current.baseHead
      )
        throw new Error('Existing checkpoint reference does not match the verified snapshot');
    } catch (e) {
      // Only absence permits creation. A conflicting ref is never overwritten.
      const exists = await git(current.worktree, ['for-each-ref', '--format=%(objectname)', ref]);
      if (exists) throw e;
      head = await git(current.worktree, [
        'commit-tree',
        tree,
        '-p',
        current.baseHead,
        '-m',
        `Iterfox verified outcome: ${stage.id}\nDelegation ${d.id}; run ${current.id}; source fingerprint ${before.fingerprint}`,
      ]);
      await git(current.worktree, ['update-ref', ref, head, '0'.repeat(head.length)]);
    }
    if (digest(await stamp(current.worktree)) !== digest(before))
      throw new Error('Source changed while checkpointing; inspect before continuing');
    return {
      head,
      ref,
      sourceFingerprint: before.fingerprint,
      sourceSeq: current.seq,
      at: new Date().toISOString(),
    };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

/** One detached host process owns the entire delegation; models stay sequential. */
export async function runDelegation(
  runs: Store,
  dataDir: string,
  id: string,
  providerFactory: (s: RunState) => AgentProvider = providerFor,
) {
  const ds = new DelegationStore(runs),
    owner = randomUUID();
  if (ds.get(id).status !== 'AUTHORIZED')
    throw new Error('Authorize or explicitly resume the delegation first');
  ds.acquire(id, owner);
  let timer: ReturnType<typeof setInterval> | undefined;
  let activeEngine: Engine | undefined;
  let pollingError: unknown;
  const release = await keepWorkerAwake(() => {});
  const interrupt = () => requestDelegationControl(runs, id, 'pause');
  process.on('SIGTERM', interrupt);
  process.on('SIGINT', interrupt);
  try {
    const initial = ds.get(id);
    if (initial.status !== 'AUTHORIZED')
      throw new Error('Authorize or explicitly resume the delegation first');
    ds.change(id, (d) => {
      d.status = 'RUNNING';
      event(d, 'worker-started', 'Sequential delegation worker started.');
    });
    timer = setInterval(() => {
      try {
        const d = ds.get(id);
        if (d.control || usage(runs, d).duration >= d.spec.contract.limits.maxDurationMs)
          activeEngine?.request(d.control ?? 'pause');
      } catch (error) {
        pollingError = error;
        activeEngine?.request('pause');
      }
    }, 100);
    while (true) {
      let d = ds.get(id);
      const used = usage(runs, d),
        limits = d.spec.contract.limits;
      if (pollingError) throw pollingError;
      if (d.control) {
        ds.change(id, (x) => {
          x.status = x.control === 'stop' ? 'STOPPED' : 'PAUSED';
          event(x, 'worker-ended', 'Delegation control honored; no next mission launched.');
        });
        break;
      }
      if (d.stages.every((s) => s.status === 'CHECKPOINTED')) {
        ds.change(id, (x) => {
          x.status = 'COMPLETED';
          event(
            x,
            'completed',
            'All approved outcomes have fresh checks, ready reviews and local checkpoints. Product acceptance remains with the operator.',
          );
        });
        break;
      }
      if (
        used.duration >= limits.maxDurationMs ||
        used.turns >= limits.maxTurns ||
        used.tokens >= limits.maxTokens
      )
        throw new Error('Original aggregate delegation limit reached');
      if (
        (await realpath(
          await git(d.spec.repository, ['rev-parse', '--path-format=absolute', '--git-common-dir']),
        )) !== d.commonDirectory
      )
        throw new Error('Approved repository binding changed');
      const complete = new Set(
        d.stages.filter((s) => s.status === 'CHECKPOINTED').map((s) => s.id),
      );
      const stage =
        d.stages.find((s) => s.status !== 'CHECKPOINTED' && s.status !== 'PENDING') ??
        d.stages.find(
          (s) =>
            s.status === 'PENDING' &&
            d.spec.milestones
              .find((m) => m.id === s.id)!
              .dependsOn.every((dep) => complete.has(dep)),
        );
      if (!stage) {
        if (complete.size !== d.stages.length) throw new Error('No eligible outcome remains');
        ds.change(id, (x) => {
          x.status = 'COMPLETED';
          event(
            x,
            'completed',
            'All approved outcomes have fresh checks, ready reviews and local checkpoints. Product acceptance remains with the operator.',
          );
        });
        break;
      }
      const milestone = d.spec.milestones.find((m) => m.id === stage.id)!;
      if (stage.status === 'CREATING' && !stage.runId)
        throw new Error(
          'Mission creation was interrupted with an uncertain result. Inspect existing worktrees/runs before reconciliation; no duplicate mission was launched.',
        );
      if (!stage.runId) {
        const previous = [...d.stages].reverse().find((s) => s.checkpoint);
        const baseHead = previous?.checkpoint?.head ?? d.sourceHead;
        const currentIds = new Set([
          ...d.spec.milestones.filter((m) => complete.has(m.id)).flatMap((m) => m.criterionIds),
          ...milestone.criterionIds,
        ]);
        const contract: Contract = contractSchema.parse({
          ...d.spec.contract,
          goal: `${d.spec.contract.goal}\n\nCurrent delegated outcome: ${milestone.title}\n${milestone.outcome}\nComplete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.`,
          criteria: d.spec.contract.criteria.filter((c) => currentIds.has(c.id)),
          supervision: d.spec.contract.supervision ?? { mode: 'project', maxReviews: 20 },
          limits: {
            ...limits,
            maxDurationMs: Math.max(1000, limits.maxDurationMs - used.duration),
            maxTurns: limits.maxTurns - used.turns,
            maxTokens: limits.maxTokens - used.tokens,
          },
        });
        const earlier = previous?.runId ? runs.get(previous.runId) : undefined;
        const handoff =
          `Delegation ${d.id}; approval ${d.specHash}; outcome ${stage.id}.\nPrevious checkpoint ${baseHead}. Historical evidence is context only; this new mission must obtain fresh proof.\n` +
          (earlier
            ? `Source run ${earlier.id}, sequence ${earlier.seq}.\nUnverified implementation claims:\n${earlier.nodes
                .filter((n) => n.kind === 'task' && n.summary)
                .map((n) => n.summary)
                .join('\n')}`
            : 'This is the first delegated mission.');
        ds.change(id, (x) => {
          x.stages.find((s) => s.id === stage.id)!.status = 'CREATING';
          event(x, 'mission-creating', `Preparing ${milestone.title}`, stage.id);
        });
        const run = await createRun(
          runs,
          dataDir,
          d.spec.repository,
          contract,
          d.provider,
          baseHead,
          [{ kind: 'request', text: handoff.slice(0, 4000) }],
        );
        ds.change(id, (x) => {
          const s = x.stages.find((s) => s.id === stage.id)!;
          s.runId = run.id;
          s.status = 'RUNNING';
          event(
            x,
            'mission-created',
            'Fresh mission authorized by the stored delegation.',
            stage.id,
            run.id,
          );
        });
        if (earlier) {
          const original = await stamp(earlier.worktree),
            next = await stamp(run.worktree);
          if (digest(original.files) !== digest(next.files))
            throw new Error('Checkpoint checkout differs from verified source; no worker started');
        }
        await prepareEnvironment(d, run);
        ds.change(id, (x) => {
          x.stages.find((s) => s.id === stage.id)!.environmentPrepared = true;
        });
      }
      d = ds.get(id);
      const current = d.stages.find((s) => s.id === stage.id)!;
      let run = runs.get(current.runId!);
      if (!current.environmentPrepared) {
        await prepareEnvironment(d, run);
        ds.change(id, (x) => {
          x.stages.find((s) => s.id === stage.id)!.environmentPrepared = true;
        });
      }
      if (run.status !== 'COMPLETED') {
        if (run.status !== 'RUNNING') run = resumeRun(runs, run.id);
        activeEngine = new Engine(runs, run.id, providerFactory(run));
        try {
          await activeEngine.run();
        } finally {
          activeEngine = undefined;
        }
      }
      d = ds.get(id);
      run = runs.get(current.runId!);
      if (d.control) continue;
      if (run.status !== 'COMPLETED')
        throw new Error(
          `Outcome ${stage.id} requires attention: ${run.status}: ${run.reason ?? 'inspect its run'}`,
        );
      const receipt = await checkpoint(runs, d, current);
      ds.change(id, (x) => {
        const s = x.stages.find((s) => s.id === stage.id)!;
        s.checkpoint = receipt;
        s.status = 'CHECKPOINTED';
        event(
          x,
          'checkpoint-created',
          'Verified snapshot saved without changing the original run HEAD, index or worktree.',
          stage.id,
          run.id,
        );
      });
    }
  } catch (error) {
    ds.change(id, (d) => {
      d.status = d.control === 'stop' ? 'STOPPED' : d.control === 'pause' ? 'PAUSED' : 'BLOCKED';
      d.reason = error instanceof Error ? error.message : String(error);
      event(d, 'worker-ended', d.reason);
    });
  } finally {
    if (timer) clearInterval(timer);
    release();
    process.off('SIGTERM', interrupt);
    process.off('SIGINT', interrupt);
    ds.release(id, owner);
  }
  return ds.get(id);
}
