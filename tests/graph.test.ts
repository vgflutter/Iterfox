import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Engine } from '../src/core/engine.js';
import { DemoProvider } from '../src/providers/demo.js';
import { graphFor } from '../src/ui/graph.js';
import { project } from '../src/core/model.js';
import { fixture } from './helpers.js';

test('execution graph reconstructs from events and links deterministic evidence to acceptance', async (t) => {
  const f = await fixture(t);
  const state = await new Engine(f.store, f.id, new DemoProvider()).run();
  const graph = graphFor(state);
  assert.equal(graph.nodes.length, state.nodes.length + 2);
  assert.equal(graph.edges.filter((e) => e.id.startsWith('supports-')).length, 2);
  const atFailure = f.store.events(f.id).find((e) => e.type === 'verification.failed')!.seq;
  const replay = project(f.store.events(f.id).slice(0, atFailure));
  assert.equal(replay.nodes.filter((n) => n.status === 'FAILED').length, 1);
  assert.equal(replay.nodes.filter((n) => n.reason.startsWith('Corrective')).length, 0);
  assert.deepEqual(graphFor(project(f.store.events(f.id))), graph);
  const filtered = graphFor(state, 'dialogue');
  assert(filtered.nodes.every((n) => n.data.criterionId === 'dialogue'));
  assert(graphFor(state, 'all', true).nodes.length < graph.nodes.length);
  // Inserting a correction doesn't move the earlier activity nodes.
  const old = graphFor(replay);
  for (const n of old.nodes.filter((n) => n.data.kind !== 'acceptance'))
    assert.deepEqual(graph.nodes.find((x) => x.id === n.id)!.position, n.position);
});
