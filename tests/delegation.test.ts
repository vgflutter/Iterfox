import { test, type TestContext } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore } from '../src/service.js';
import { git, stamp } from '../src/core/workspace.js';
import { activeNotes } from '../src/core/compass.js';
import { contractSchema, type RunState } from '../src/core/model.js';
import { serve } from '../src/server.js';
import { randomUUID } from 'node:crypto';
import type { AddressInfo } from 'node:net';
import type { AgentProvider, AgentRequest } from '../src/providers/provider.js';
import {
  createDelegation,
  previewDelegation,
  runDelegation,
  DelegationStore,
  requestDelegationControl,
  resumeDelegation,
  delegationSpecSchema,
} from '../src/delegations/service.js';

async function fixture(t: TestContext) {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-delegation-'));
  const repo = join(dir, 'repository');
  await mkdir(join(repo, 'src'), { recursive: true });
  await mkdir(join(repo, 'tests'));
  await writeFile(join(repo, '.gitignore'), 'node_modules/\n');
  await writeFile(join(repo, 'src/alpha.mjs'), 'export const alpha = () => 0;\n');
  await writeFile(
    join(repo, 'src/beta.mjs'),
    "import {alpha} from './alpha.mjs'; export const beta = () => alpha();\n",
  );
  await writeFile(
    join(repo, 'tests/check.mjs'),
    "import assert from 'node:assert/strict'; import {alpha} from '../src/alpha.mjs'; import {beta} from '../src/beta.mjs'; assert.equal(process.argv[2] === 'alpha' ? alpha() : beta(),process.argv[2] === 'alpha' ? 21 : 42);\n",
  );
  await git(repo, ['init', '-q']);
  await git(repo, ['add', '.']);
  await git(repo, [
    '-c',
    'user.name=Fixture',
    '-c',
    'user.email=fixture@iterfox.local',
    'commit',
    '-qm',
    'Fixed acceptance',
  ]);
  const store = openStore(join(dir, 'data'));
  t.after(async () => {
    store.close();
    await rm(dir, { recursive: true, force: true });
  });
  const contract = contractSchema.parse({
    goal: 'Deliver both useful results, preserving the first while building the second.',
    criteria: ['alpha', 'beta'].map((id) => ({
      id,
      title: `${id} behavior verified`,
      command: ['node', 'tests/check.mjs', id],
    })),
    allowedPaths: ['src'],
    protectedPaths: ['tests'],
    supervision: { mode: 'project', maxReviews: 5 },
    limits: {
      maxTurns: 20,
      maxAttempts: 2,
      maxDurationMs: 120000,
      maxTokens: 1000000,
      turnTimeoutMs: 10000,
      maxNoProgress: 3,
    },
  });
  const spec = {
    repository: repo,
    contract,
    milestones: [
      {
        id: 'first',
        title: 'First result',
        outcome: 'Implement alpha to return 21.',
        criterionIds: ['alpha'],
        dependsOn: [],
      },
      {
        id: 'second',
        title: 'Second result',
        outcome: 'Implement beta using the earlier alpha result to return 42.',
        criterionIds: ['beta'],
        dependsOn: ['first'],
      },
    ],
    environment: { copyIgnoredPaths: [] as 'node_modules'[] },
  };
  const preview = await previewDelegation(spec);
  const create = (override: Partial<typeof spec> = {}) =>
    createDelegation(
      store,
      { spec: { ...spec, ...override }, expectedHead: preview.expectedHead, authorized: true },
      'demo',
    );
  return { dir, repo, store, spec, preview, create };
}
function provider(
  observe?: (r: AgentRequest) => Promise<void> | void,
  blocked = false,
): AgentProvider {
  return {
    name: 'demo',
    async invoke(r) {
      r.onUsage(10);
      await observe?.(r);
      r.signal.throwIfAborted();
      const id = r.state.contract.criteria.some((c) => c.id === 'beta') ? 'beta' : 'alpha';
      const task = {
        title: `Implement ${id} result`,
        objective: `Make the approved ${id} result work.`,
        criterionId: id,
        waitsFor: [],
      };
      if (r.mode === 'orient')
        return {
          focus: `Deliver the ${id} outcome.`,
          nextArtifact: `Verified ${id} code.`,
          assumptions: [],
          notes: activeNotes(r.state).map((n) => ({
            noteId: n.id,
            disposition: 'applied',
            reason: 'Use prior work as historical context, with new verification.',
            criterionIds: [id],
          })),
          tasks: [task],
        };
      if (r.mode === 'plan') return { tasks: [task] };
      if (r.mode === 'oversee')
        return {
          outcome: 'ready',
          summary: 'The actual result matches the approved outcome and current command receipts.',
          findings: [],
          decisions: [],
          tasks: [],
          operatorQuestion: '',
        };
      if (r.mode === 'build') {
        if (blocked)
          return {
            summary: 'A reserved decision is needed.',
            blocked: true,
            reason: 'Operator decision required',
            verificationRequest: null,
          };
        await writeFile(
          join(r.state.worktree, `src/${id}.mjs`),
          id === 'alpha'
            ? 'export const alpha = () => 21;\n'
            : "import {alpha} from './alpha.mjs'; export const beta = () => alpha()*2;\n",
        );
        return {
          summary: `Implemented ${id} using the approved interface.`,
          blocked: false,
          reason: '',
          verificationRequest: { criterionIds: [id] },
        };
      }
      throw new Error('Unexpected mode ' + r.mode);
    },
  };
}

test('one authorization executes dependent missions with fresh proof and preserved original snapshots', async (t) => {
  const f = await fixture(t);
  const source = await stamp(f.repo);
  const originalIndex = await git(f.repo, ['write-tree']);
  const d = await f.create();
  let firstObservations = 0;
  const result = await runDelegation(f.store, join(f.dir, 'data'), d.id, () =>
    provider((r) => {
      if (r.mode === 'orient') {
        assert.equal(r.state.evidence.length, 0);
        assert(r.state.criteria.every((c) => c.status === 'PENDING'));
        firstObservations++;
        if (firstObservations === 2) {
          assert.equal(
            r.state.baseHead,
            new DelegationStore(f.store).get(d.id).stages[0].checkpoint!.head,
          );
          assert.match(r.state.notes![0].text, /Implemented alpha/);
          assert.match(r.state.notes![0].text, /Historical evidence/);
        }
      }
    }),
  );
  assert.equal(result.status, 'COMPLETED', result.reason);
  assert.equal(firstObservations, 2);
  assert.equal(f.store.list().length, 2);
  assert.equal(result.events.filter((e) => e.kind === 'authorized').length, 1);
  for (const stage of result.stages) {
    assert.equal(stage.status, 'CHECKPOINTED');
    assert(stage.checkpoint);
    const s = f.store.get(stage.runId!);
    assert.equal((await stamp(s.worktree)).head, s.baseHead);
    assert.equal((await stamp(s.worktree)).fingerprint, stage.checkpoint.sourceFingerprint);
    assert.equal(await git(s.worktree, ['rev-parse', stage.checkpoint.head + '^']), s.baseHead);
    assert(s.criteria.every((c) => c.status === 'PASSED'));
  }
  assert.deepEqual(await stamp(f.repo), source);
  assert.equal(await git(f.repo, ['write-tree']), originalIndex);
  const second = f.store.get(result.stages[1].runId!);
  assert.deepEqual(
    second.contract.criteria.map((c) => c.id),
    ['alpha', 'beta'],
  );
  await assert.rejects(
    runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider()),
    /Authorize|resume/,
  );
  assert.equal(new DelegationStore(f.store).get(d.id).status, 'COMPLETED');
});
test('authorization, clean committed source and DAG coverage are mandatory', async (t) => {
  const f = await fixture(t);
  await assert.rejects(
    createDelegation(f.store, {
      spec: f.spec,
      expectedHead: f.preview.expectedHead,
      authorized: false,
    }),
  );
  assert.equal(f.store.list().length, 0);
  assert.throws(() =>
    delegationSpecSchema.parse({
      ...f.spec,
      milestones: [{ ...f.spec.milestones[0], dependsOn: ['first'] }],
    }),
  );
  assert.throws(() =>
    delegationSpecSchema.parse({ ...f.spec, milestones: [f.spec.milestones[0]] }),
  );
  await writeFile(join(f.repo, 'src/alpha.mjs'), 'uncommitted');
  await assert.rejects(f.create(), /Commit|uncommitted/);
});
test('a real implementation blocker preserves work and prevents later missions and checkpoint claims', async (t) => {
  const f = await fixture(t);
  const d = await f.create();
  const r = await runDelegation(f.store, join(f.dir, 'data'), d.id, () =>
    provider(undefined, true),
  );
  assert.equal(r.status, 'BLOCKED');
  assert.equal(f.store.list().length, 1);
  assert.equal(r.stages[1].status, 'PENDING');
  assert(r.stages.every((s) => !s.checkpoint));
  assert.match(r.reason!, /requires attention/);
});
test('aggregate turn limit is never reset by a new mission or explicit resume', async (t) => {
  const f = await fixture(t);
  const d = await f.create({
    contract: { ...f.spec.contract, limits: { ...f.spec.contract.limits, maxTurns: 3 } },
  });
  const r = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider());
  assert.equal(r.status, 'BLOCKED');
  assert.equal(r.stages[0].status, 'CHECKPOINTED');
  assert.equal(f.store.list().length, 1);
  assert.match(r.reason!, /aggregate/);
  resumeDelegation(f.store, d.id);
  const again = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider());
  assert.equal(again.status, 'BLOCKED');
  assert.equal(f.store.list().length, 1);
  assert.equal(again.authorizedAt, d.authorizedAt);
});
test('pause reaches the active model and resume continues the same mission without duplicate launch', async (t) => {
  const f = await fixture(t);
  const d = await f.create();
  let pause = true;
  const observed = provider(async (r) => {
    if (pause && r.mode === 'build') {
      pause = false;
      requestDelegationControl(f.store, d.id, 'pause');
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  });
  const stopped = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => observed);
  assert.equal(stopped.status, 'PAUSED');
  const first = stopped.stages[0].runId;
  assert.equal(f.store.list().length, 1);
  resumeDelegation(f.store, d.id);
  const result = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider());
  assert.equal(result.status, 'COMPLETED', result.reason);
  assert.equal(result.stages[0].runId, first);
  assert.equal(f.store.list().length, 2);
});
test('simultaneous delegation workers are excluded by a durable lease', async (t) => {
  const f = await fixture(t);
  const d = await f.create();
  let begin!: () => void;
  const started = new Promise<void>((r) => (begin = r));
  let finish!: () => void;
  const held = new Promise<void>((r) => (finish = r));
  let once = false;
  const running = runDelegation(f.store, join(f.dir, 'data'), d.id, () =>
    provider(async (r) => {
      if (!once) {
        once = true;
        begin();
        await held;
      }
    }),
  );
  await started;
  await assert.rejects(
    runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider()),
    /already alive|Authorize|resume/,
  );
  finish();
  assert.equal((await running).status, 'COMPLETED');
});
test('protected edits cannot become auto-checkpoints even when the model claims success', async (t) => {
  const f = await fixture(t);
  const d = await f.create();
  let edited = false;
  const result = await runDelegation(f.store, join(f.dir, 'data'), d.id, () =>
    provider(async (r) => {
      if (r.mode === 'build' && !edited) {
        edited = true;
        await writeFile(join(r.state.worktree, 'tests/check.mjs'), '// weakened');
      }
    }),
  );
  assert.equal(result.status, 'BLOCKED');
  assert(result.stages.every((s) => !s.checkpoint));
  assert.equal(f.store.list().length, 1);
});
test('checkpoint recovery reuses the finished mission and the same immutable ref', async (t) => {
  const f = await fixture(t);
  const d = await f.create();
  const done = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => provider());
  assert.equal(done.status, 'COMPLETED');
  const head = done.stages[1].checkpoint!.head;
  const ds = new DelegationStore(f.store);
  ds.change(d.id, (x) => {
    x.status = 'PAUSED';
    x.stages[1].status = 'RUNNING';
    delete x.stages[1].checkpoint;
  });
  resumeDelegation(f.store, d.id);
  const recovered = await runDelegation(f.store, join(f.dir, 'data'), d.id, () => {
    throw new Error('No model may run after the mission is already complete');
  });
  assert.equal(recovered.status, 'COMPLETED', recovered.reason);
  assert.equal(f.store.list().length, 2);
  assert.equal(recovered.stages[1].checkpoint!.head, head);
});
test('HTTP approval is authenticated and concurrent duplicate authorizations launch once', async (t) => {
  const f = await fixture(t);
  let launches = 0;
  const server = await serve(
    f.store,
    join(f.dir, 'data'),
    0,
    () => 0,
    () => ++launches,
  );
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((r) => server.close(() => r()));
  });
  const base = 'http://127.0.0.1:' + (server.address() as AddressInfo).port;
  const token = (await (await fetch(base + '/api/meta')).json()).token;
  const post = (path: string, input: unknown, auth = true) =>
    fetch(base + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { 'X-Iterfox-Token': token } : {}),
      },
      body: JSON.stringify(input),
    });
  assert.equal((await fetch(base + '/api/delegations')).status, 403);
  assert.equal((await post('/api/delegations/preflight', f.spec, false)).status, 403);
  const review = await (await post('/api/delegations/preflight', f.spec)).json();
  assert.equal(f.store.list().length, 0);
  assert.equal(launches, 0);
  const input = {
    spec: review.spec,
    expectedHead: review.expectedHead,
    authorized: true,
    requestId: randomUUID(),
  };
  assert.equal((await post('/api/delegations', { ...input, authorized: false })).status, 400);
  const responses = await Promise.all([
    post('/api/delegations', input),
    post('/api/delegations', input),
  ]);
  assert(responses.every((r) => r.status === 201));
  const bodies = await Promise.all(responses.map((r) => r.json()));
  assert.equal(bodies[0].id, bodies[1].id);
  assert.equal(launches, 1);
  assert.equal(new DelegationStore(f.store).list().length, 1);
  assert.equal(f.store.list().length, 0);
  assert.equal(
    (
      await post('/api/delegations', {
        ...input,
        spec: {
          ...input.spec,
          contract: {
            ...input.spec.contract,
            goal: 'Different authorization with the same request key',
          },
        },
      })
    ).status,
    400,
  );
  assert.equal(launches, 1);
});
