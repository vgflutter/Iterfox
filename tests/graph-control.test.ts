import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import type { AddressInfo } from 'node:net';
import type { TestContext } from 'node:test';
import { fixture } from './helpers.js';
import { serve } from '../src/server.js';
import { controlRun } from '../src/service.js';
import { project } from '../src/core/model.js';

// Explicit persisted task fixture, no AI. This checks commands issued from a
// selected graph node against actual HTTP/state/replay boundaries.
async function setup(t: TestContext) {
  const f = await fixture(t);
  const node = {
    id: randomUUID(),
    kind: 'task' as const,
    title: 'Explicit graph-control fixture',
    objective: 'Review the selected avatar-label result.',
    criterionId: 'render',
    reason: 'Product boundary fixture, not a real model plan.',
    role: 'builder' as const,
    status: 'PENDING' as const,
    attempt: 1,
    files: [],
    evidenceIds: [],
  };
  f.store.append(f.id, 'task.planned', node.title, { node });
  controlRun(f.store, f.id, 'pause');
  let launches = 0;
  const server = await serve(f.store, f.dir, 0, () => ++launches);
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const token = (await (await fetch(base + '/api/meta')).json()).token;
  async function send(body: unknown) {
    const response = await fetch(base + `/api/runs/${f.id}/direction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Iterfox-Token': token },
      body: JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
  }
  return {
    ...f,
    node,
    send,
    get launches() {
      return launches;
    },
  };
}

test('contextual feedback binds an existing node and criterion without starting or certifying work', async (t) => {
  const f = await setup(t);
  const before = f.store.get(f.id);
  const context = {
    nodeId: f.node.id,
    criterionId: 'render',
    contractVersion: before.contractVersion,
  };
  const response = await f.send({
    text: 'Review this result before cosmetic polish.',
    kind: 'request',
    context,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  const state = f.store.get(f.id);
  assert.deepEqual((state.notes!.at(-1) as unknown as { context: unknown }).context, context);
  assert.equal(state.status, 'PAUSED');
  assert.deepEqual(state.contract, before.contract);
  assert.deepEqual(state.criteria, before.criteria);
  assert.deepEqual(state.nodes, before.nodes);
  assert.equal(state.evidence.length, before.evidence.length);
  assert.equal(f.launches, 0);
  assert.deepEqual(project(f.store.events(f.id)), state);
});

test('criterion-only graph context and ordinary Compass notes remain compatible', async (t) => {
  const f = await setup(t);
  assert.equal(
    (await f.send({ text: 'Keep the public API stable.', kind: 'decision' })).status,
    201,
  );
  const context = { criterionId: 'render', contractVersion: 1 };
  assert.equal(
    (await f.send({ text: 'Prioritize the selected result.', kind: 'request', context })).status,
    201,
  );
  const state = f.store.get(f.id);
  assert.equal(state.notes!.length, 2);
  assert.equal(state.notes![0].text, 'Keep the public API stable.');
  assert.deepEqual((state.notes![1] as unknown as { context: unknown }).context, context);
  assert.equal(state.status, 'PAUSED');
  assert.equal(f.launches, 0);
});

test('unknown, mismatched, stale or authority-bearing graph context is rejected atomically', async (t) => {
  const f = await setup(t);
  const before = f.store.get(f.id);
  const valid = { nodeId: f.node.id, criterionId: 'render', contractVersion: 1 };
  for (const context of [
    { ...valid, nodeId: 'unknown-node' },
    { ...valid, criterionId: 'unknown-criterion' },
    { ...valid, criterionId: 'dialogue' },
    { ...valid, contractVersion: 2 },
    { ...valid, permissions: ['deploy'] },
    { ...valid, status: 'PASSED' },
  ]) {
    const response = await f.send({
      text: 'Apply this instruction to the selected work.',
      kind: 'request',
      context,
    });
    assert.equal(response.status, 400, JSON.stringify({ context, response }));
    assert.deepEqual(f.store.get(f.id), before);
  }
  assert.equal(f.launches, 0);
});
