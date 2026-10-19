import { randomUUID } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contractSchema, type Contract, type RunState } from './core/model.js';
import { Engine, initialState } from './core/engine.js';
import { Store, alive } from './core/store.js';
import { git, isolate } from './core/workspace.js';
import { CodexProvider } from './providers/codex.js';
import { DemoProvider } from './providers/demo.js';
import { noteInputSchema, type NoteInput } from './core/compass.js';
import { keepWorkerAwake } from './core/awake.js';
import { inspectLocalRepository } from './launch/repositories.js';
import type { PreflightPreview } from './shared/launch.js';

export async function loadContract(path: string): Promise<Contract> {
  return contractSchema.parse(JSON.parse(await readFile(path, 'utf8')));
}
export function withProjectSupervision(contract: Contract): Contract {
  return contractSchema.parse({
    ...contract,
    supervision: contract.supervision ?? { mode: 'project', maxReviews: 20 },
  });
}
export function openStore(dataDir: string): Store {
  return new Store(join(resolve(dataDir), 'ledger.sqlite'));
}
export function recoverDeadWorkers(store: Store): void {
  for (const s of store.list()) {
    if (s.status !== 'RUNNING') continue;
    const lease = store.lease(s.id);
    const missingAtStartup = !lease && Date.now() - Date.parse(s.updatedAt) > 5000;
    if ((!lease || alive(lease.pid)) && !missingAtStartup) continue;
    for (const n of s.nodes.filter((n) => ['RUNNING', 'VERIFYING'].includes(n.status)))
      store.append(s.id, 'task.interrupted', 'The owning worker process is no longer alive.', {
        nodeId: n.id,
      });
    store.append(
      s.id,
      'workflow.recovered',
      'Worker interrupted. Inspect possible orphan subprocesses after a hard kill, then resume explicitly.',
    );
    if (lease) store.release(s.id, lease.owner);
  }
}
export async function auditStoredEvidence(store: Store, id: string): Promise<void> {
  const lease = store.lease(id);
  if (lease && alive(lease.pid)) return; // the active runtime owns freshness
  if (
    !store.get(id).evidence.some((e) => ['passed', 'assessed'].includes(e.status)) &&
    !store.get(id).projectReviews?.some((r) => r.outcome === 'ready' && !r.invalidatedReason)
  )
    return;
  const engine = new Engine(store, id, providerFor(store.get(id)));
  try {
    await engine.refreshEvidence();
  } catch {
    const review = store.get(id).projectReviews?.at(-1);
    if (review?.outcome === 'ready' && !review.invalidatedReason)
      store.append(
        id,
        'project.review.invalidated',
        'The inspected worktree is unavailable. Project readiness is unknown.',
        { nodeId: review.nodeId },
      );
    for (const e of store.get(id).evidence.filter((e) => ['passed', 'assessed'].includes(e.status)))
      store.append(
        id,
        'evidence.invalidated',
        'The recorded worktree is unavailable or cannot be fingerprinted. Current evidence validity is unknown.',
        { evidenceId: e.id },
      );
  }
}
export async function preflight(
  repository: string,
  contract: Contract,
  provider: 'codex' | 'demo',
  signal?: AbortSignal,
): Promise<PreflightPreview> {
  contract = contractSchema.parse(contract);
  const {
    repository: root,
    sourceBranch,
    head,
    dirty,
  } = await inspectLocalRepository(repository, signal);
  return {
    repository: root,
    sourceBranch,
    runBranch: 'new iterfox/<run-id> branch from committed HEAD',
    head,
    dirty,
    provider,
    contract,
    permissions: [
      'isolated worktree edits within approved paths',
      'runtime executes exact approved check argv',
      'Codex workspace-write; network disabled; escalation denied',
      ...(contract.supervision
        ? [
            'Autonomous project checkpoints may discover and execute further goal work within the original scope; reversible choices are delegated.',
          ]
        : []),
      ...contract.criteria
        .filter((c) => c.verification?.kind === 'visual')
        .map(
          (c) =>
            `Visual ${c.id}: browser capture of approved loopback target; baseline is protected; optional server argv runs on this host`,
        ),
      ...contract.criteria
        .filter((c) => c.verification?.kind === 'qualitative')
        .map(
          (c) =>
            `Qualitative ${c.id}: sends selected text/PNG evidence to Codex for a scored rubric; probabilistic, same integration`,
        ),
    ],
    requiresOperator: [
      'test/config/secret changes',
      'push, merge, deploy and destructive operations',
      'contract revisions',
    ],
    limits: contract.limits,
    notes: [
      'Only committed HEAD is copied. Uncommitted source work is preserved and excluded.',
      'Check commands are trusted local programs, not sandboxed by Iterfox. Review them before authorization.',
      'Token cap is checked at turn boundaries. Partial-turn usage and monetary cost may be unavailable.',
      'The worker continues after browser close. Sleep, shutdown or worker termination interrupt local execution.',
    ],
  };
}
export async function createRun(
  store: Store,
  dataDir: string,
  repository: string,
  contract: Contract,
  provider: 'codex' | 'demo',
  expectedHead?: string,
  notes: NoteInput[] = [],
): Promise<RunState> {
  contract = contractSchema.parse(contract);
  notes = notes.map((n) => noteInputSchema.parse(n));
  if (notes.length > 64 || notes.reduce((sum, n) => sum + n.text.length, 0) > 64000)
    throw new Error('Handoff note limit reached');
  if (notes.some((n) => n.replyTo))
    throw new Error('Initial handoff cannot reply to an existing question');
  const id =
    new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + '-' + randomUUID().slice(0, 8);
  const workspace = await isolate(repository, dataDir, id, expectedHead);
  const state = initialState(id, contract, workspace, provider);
  store.append(id, 'workflow.created', 'Isolated workflow created from committed Git HEAD.', {
    state,
  });
  store.append(
    id,
    'goal.accepted',
    'Operator explicitly authorized this goal, acceptance contract and limits.',
    { version: 1 },
  );
  for (const note of notes) addDirectionNote(store, id, note);
  return store.get(id);
}
export function addDirectionNote(store: Store, id: string, input: NoteInput): RunState {
  const note = noteInputSchema.parse(input);
  return store.append(
    id,
    'direction.noted',
    `Operator ${note.kind}${note.replyTo ? ' reply' : ''}: ${note.text}`,
    {
      noteId: randomUUID(),
      note,
    },
  );
}
export async function createDemoRepository(dataDir: string): Promise<string> {
  const target = resolve(dataDir, 'demo-repositories', randomUUID().slice(0, 8));
  await mkdir(target, { recursive: true });
  const source = fileURLToPath(new URL('../examples/avatar-lab/', import.meta.url));
  // source and built service.js both sit one directory below the package root.
  await cp(source, target, { recursive: true });
  await git(target, ['init', '-q']);
  await git(target, ['add', '.']);
  await git(target, [
    '-c',
    'user.name=Iterfox Demo',
    '-c',
    'user.email=demo@iterfox.local',
    'commit',
    '-qm',
    'Initial avatar fixture with two defects',
  ]);
  return target;
}
export function providerFor(state: RunState) {
  return state.provider === 'demo'
    ? new DemoProvider(Number(process.env.ITERFOX_DEMO_DELAY_MS ?? 0))
    : new CodexProvider({
        model: process.env.ITERFOX_MODEL,
        codexPath: process.env.ITERFOX_CODEX_PATH,
      });
}
export async function runWorker(store: Store, id: string): Promise<RunState> {
  const engine = new Engine(store, id, providerFor(store.get(id)));
  const releaseAwake = await keepWorkerAwake((message) =>
    store.append(id, 'decision.recorded', message, { kind: 'host.awake' }),
  );
  const pause = () => engine.request('pause');
  process.on('SIGTERM', pause);
  process.on('SIGINT', pause);
  try {
    return await engine.run();
  } finally {
    releaseAwake();
    process.off('SIGTERM', pause);
    process.off('SIGINT', pause);
  }
}
export function controlRun(store: Store, id: string, action: 'pause' | 'stop'): void {
  const s = store.get(id);
  if (['COMPLETED', 'FAILED'].includes(s.status))
    throw new Error('Terminal run cannot be controlled');
  const lease = store.lease(id);
  if (lease && alive(lease.pid)) {
    store.control(id, action);
    return;
  }
  for (const n of s.nodes.filter((n) => ['RUNNING', 'VERIFYING'].includes(n.status)))
    store.append(id, 'task.interrupted', 'Worker is no longer alive.', { nodeId: n.id });
  store.append(
    id,
    action === 'pause' ? 'workflow.paused' : 'workflow.stopped',
    `Operator requested ${action}.`,
  );
}
export function resumeRun(store: Store, id: string): RunState {
  const lease = store.lease(id);
  if (lease && alive(lease.pid))
    throw new Error('A worker is still alive; wait for pause/stop to complete');
  const s = store.get(id);
  if (s.status === 'RUNNING') {
    for (const n of s.nodes.filter((n) => ['RUNNING', 'VERIFYING'].includes(n.status)))
      store.append(
        id,
        'task.interrupted',
        'Previous worker disappeared. Activity will be retried with its recorded session.',
        { nodeId: n.id },
      );
    store.append(
      id,
      'workflow.recovered',
      'Recovered interrupted run. Check for orphan processes after a hard kill.',
    );
  }
  store.takeControl(id);
  return store.append(
    id,
    'workflow.resumed',
    'Operator resumed within the existing acceptance contract and original limits.',
  );
}
export function proposeContract(store: Store, id: string, contract: Contract): void {
  store.append(id, 'contract.proposed', 'Operator proposed a versioned acceptance revision.', {
    contract: contractSchema.parse(contract),
  });
}
export function approveContract(store: Store, id: string): void {
  const s = store.get(id);
  const lease = store.lease(id);
  if (lease && alive(lease.pid))
    throw new Error('Wait for worker exit before approving a revision');
  if (!s.revisionProposal || ['RUNNING', 'PREFLIGHT', 'COMPLETED', 'FAILED'].includes(s.status))
    throw new Error('Pause or stop and propose a revision first');
  for (const e of s.evidence.filter((e) => ['passed', 'assessed'].includes(e.status)))
    store.append(
      id,
      'evidence.invalidated',
      'Operator approved a new acceptance version; the previous contract is no longer current.',
      { evidenceId: e.id },
    );
  store.append(
    id,
    'contract.approved',
    'Operator explicitly approved the proposed acceptance contract.',
    { previousVersion: s.contractVersion },
  );
}
export async function exportFile(path: string, content: string): Promise<void> {
  await writeFile(resolve(path), content, { mode: 0o600 });
}
