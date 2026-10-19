import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { AddressInfo } from 'node:net';
import type { TestContext } from 'node:test';
import { serve } from '../src/server.js';
import { Engine } from '../src/core/engine.js';
import { DemoProvider } from '../src/providers/demo.js';
import { createDemoRepository, createRun, loadContract, openStore } from '../src/service.js';

// Product boundary tests fixed before autonomous implementation. DEMO is used
// only to produce real persisted run/check records; no model quality is claimed.
async function setup(t: TestContext) {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-continuity-'));
  const repository = await createDemoRepository(dir);
  let store = openStore(dir);
  let launches = 0;
  let server = await serve(store, dir, 0, () => ++launches);
  let base = '';
  let token = '';
  async function connect() {
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    token = (await (await fetch(base + '/api/meta')).json()).token;
  }
  await connect();
  async function close() {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    store.close();
  }
  t.after(async () => {
    await close();
    await rm(dir, { recursive: true, force: true });
  });
  async function request(path: string, value?: unknown, authorized = true) {
    const response = await fetch(base + path, {
      method: value === undefined ? 'GET' : 'POST',
      headers: {
        ...(authorized ? { 'X-Iterfox-Token': token } : {}),
        ...(value === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      ...(value === undefined ? {} : { body: JSON.stringify(value) }),
    });
    return { status: response.status, body: await response.json() };
  }
  const input = {
    name: 'Iterfox continuity trial',
    repository,
    purpose: 'Deliver useful verified project progress across separate sessions.',
    audience: 'A developer returning after an absence',
    constraints: ['Preserve the approved tests and public API.'],
    decisions: ['Keep execution sequential.'],
    hypotheses: ['Three summary sections may be easier to understand.'],
    milestones: [
      {
        id: 'memory',
        title: 'Durable project memory',
        outcome: 'The next session retains decisions and unresolved work.',
        dependsOn: [],
        status: 'active',
      },
      {
        id: 'graph',
        title: 'Contextual graph control',
        outcome: 'A selected node can receive contextual direction.',
        dependsOn: ['memory'],
        status: 'planned',
      },
    ],
  };
  async function create() {
    const response = await request('/api/projects', input);
    assert.equal(response.status, 201, JSON.stringify(response.body));
    return response.body;
  }
  return {
    dir,
    repository,
    input,
    request,
    create,
    get store() {
      return store;
    },
    get launches() {
      return launches;
    },
    async restart() {
      await close();
      store = openStore(dir);
      server = await serve(store, dir, 0, () => ++launches);
      await connect();
    },
  };
}

test('project memory survives a real server/store restart without creating runs', async (t) => {
  const f = await setup(t);
  assert.equal((await f.request('/api/projects', undefined, false)).status, 403);
  assert.equal((await f.request('/api/projects', f.input, false)).status, 403);
  const created = await f.create();
  assert.equal(typeof created.id, 'string');
  assert.equal(created.revision, 1);
  await f.restart();
  const read = await f.request(`/api/projects/${created.id}`);
  assert.equal(read.status, 200);
  for (const field of [
    'name',
    'purpose',
    'audience',
    'constraints',
    'decisions',
    'hypotheses',
    'milestones',
  ] as const)
    assert.deepEqual(read.body[field], f.input[field], field);
  assert.equal(read.body.revision, 1);
  assert((await f.request('/api/projects')).body.some((p: { id: string }) => p.id === created.id));
  assert.equal(f.store.list().length, 0);
  assert.equal(f.launches, 0);
});

test('project revisions reject stale edits and invalid milestone dependencies without losing history', async (t) => {
  const f = await setup(t);
  const p = await f.create();
  const path = `/api/projects/${p.id}/revisions`;
  const changed = await f.request(path, {
    expectedRevision: 1,
    changes: {
      decisions: [
        'Keep execution sequential.',
        'Review useful deliverables before cosmetic polish.',
      ],
    },
  });
  assert.equal(changed.status, 200, JSON.stringify(changed.body));
  assert.equal(changed.body.revision, 2);
  assert.equal(
    (
      await f.request(path, {
        expectedRevision: 1,
        changes: { purpose: 'A stale overwrite must not win.' },
      })
    ).status,
    409,
  );
  for (const milestones of [
    [{ ...f.input.milestones[0], dependsOn: ['missing'] }],
    [{ ...f.input.milestones[0], dependsOn: ['graph'] }, f.input.milestones[1]],
    [f.input.milestones[0], { ...f.input.milestones[1], status: 'active' }],
  ])
    assert.equal(
      (await f.request(path, { expectedRevision: 2, changes: { milestones } })).status,
      400,
    );
  const current = (await f.request(`/api/projects/${p.id}`)).body;
  assert.equal(current.revision, 2);
  assert.equal(current.decisions.length, 2);
  const history = await f.request(`/api/projects/${p.id}/history`);
  assert.equal(history.status, 200);
  assert.equal(history.body.length, 2);
  assert.equal(history.body[0].revision, 1);
  assert.equal(history.body[1].revision, 2);
  assert.equal(f.launches, 0);
});

test('handoff captures actual run evidence and continuation preserves its provenance without certifying or launching work', async (t) => {
  const f = await setup(t);
  let p = await f.create();
  const state = await createRun(
    f.store,
    f.dir,
    f.repository,
    await loadContract(join(f.repository, 'iterfox.json')),
    'demo',
  );
  const final = await new Engine(f.store, state.id, new DemoProvider()).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  const originalContract = structuredClone(final.contract);
  const linked = await f.request(`/api/projects/${p.id}/runs`, {
    expectedRevision: p.revision,
    runId: state.id,
    milestoneId: 'memory',
  });
  assert.equal(linked.status, 200, JSON.stringify(linked.body));
  p = linked.body;
  const handoff = await f.request(`/api/projects/${p.id}/handoffs`, {
    expectedRevision: p.revision,
    runId: state.id,
  });
  assert.equal(handoff.status, 201, JSON.stringify(handoff.body));
  assert.equal(handoff.body.runId, state.id);
  assert.equal(handoff.body.sourceSeq, f.store.get(state.id).seq);
  assert.equal(handoff.body.baseHead, final.baseHead);
  assert.equal(handoff.body.contractVersion, final.contractVersion);
  for (const c of final.criteria)
    assert(handoff.body.evidence.some((e: { id: string }) => e.id === c.evidenceId));
  p = (await f.request(`/api/projects/${p.id}`)).body;
  const revised = await f.request(`/api/projects/${p.id}/revisions`, {
    expectedRevision: p.revision,
    changes: {
      milestones: [
        { ...f.input.milestones[0], status: 'reviewed' },
        { ...f.input.milestones[1], status: 'active' },
      ],
    },
  });
  assert.equal(revised.status, 200, JSON.stringify(revised.body));
  p = revised.body;
  const next = await f.request(`/api/projects/${p.id}/continuations`, {
    expectedRevision: p.revision,
    milestoneId: 'graph',
  });
  assert.equal(next.status, 200, JSON.stringify(next.body));
  assert.equal(next.body.projectId, p.id);
  assert.equal(next.body.projectRevision, p.revision);
  assert.equal(next.body.milestoneId, 'graph');
  assert.equal(next.body.authorizationRequired, true);
  assert(next.body.sourceRunIds.includes(state.id));
  assert(next.body.goal.includes(f.input.milestones[1].outcome));
  for (const text of [f.input.decisions[0], f.input.hypotheses[0], state.id])
    assert(next.body.handoff.includes(text), text);
  assert(/hypothes|ipotes/i.test(next.body.handoff));
  assert(
    /histor|storic/i.test(next.body.handoff),
    'Earlier checks must be identified as historical context.',
  );
  assert(next.body.handoff.length <= 4000, 'Continuation must fit the existing launch handoff.');
  assert.equal(f.store.list().length, 1);
  assert.equal(f.launches, 0);
  assert.deepEqual(f.store.get(state.id).contract, originalContract);
  await f.restart();
  assert.equal((await f.request(`/api/projects/${p.id}`)).body.handoffs[0].runId, state.id);
});

test('cross-project links, stale continuations and unmet milestone dependencies cannot start or redirect work', async (t) => {
  const f = await setup(t);
  const p = await f.create();
  assert.equal(
    (
      await f.request(`/api/projects/${p.id}/continuations`, {
        expectedRevision: p.revision,
        milestoneId: 'graph',
      })
    ).status,
    409,
  );
  const other = await createDemoRepository(f.dir);
  const state = await createRun(
    f.store,
    f.dir,
    other,
    await loadContract(join(other, 'iterfox.json')),
    'demo',
  );
  assert.equal(
    (
      await f.request(`/api/projects/${p.id}/runs`, {
        expectedRevision: p.revision,
        runId: state.id,
        milestoneId: 'memory',
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await f.request(`/api/projects/${p.id}/revisions`, {
        expectedRevision: p.revision,
        changes: { repository: other },
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await f.request(`/api/projects/${p.id}/continuations`, {
        expectedRevision: p.revision - 1,
        milestoneId: 'memory',
      })
    ).status,
    409,
  );
  assert.equal(f.launches, 0);
  assert.equal(f.store.list().length, 1);
});
