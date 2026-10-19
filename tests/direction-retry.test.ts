import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appendFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { fixture } from './helpers.js';
import { Engine } from '../src/core/engine.js';
import { activeNotes, type DirectionProposal } from '../src/core/compass.js';
import { project, type RunEvent, type RunState } from '../src/core/model.js';
import { addDirectionNote } from '../src/service.js';
import { DemoProvider } from '../src/providers/demo.js';
import type { AgentRequest } from '../src/providers/provider.js';

function direction(request: AgentRequest): DirectionProposal {
  return {
    focus: 'EXPLICIT FIXTURE: recover an invalid planning proposal within the original contract.',
    nextArtifact: 'EXPLICIT FIXTURE: verified labels and distinct presenter dialogue.',
    assumptions: [],
    notes: activeNotes(request.state).map((note) => ({
      noteId: note.id,
      disposition: 'applied',
      reason: 'EXPLICIT FIXTURE: incorporated into the unchanged approved goal.',
      criterionIds: [],
    })),
    tasks: [
      {
        title: 'Normalize labels',
        objective: 'Handle missing and blank names.',
        criterionId: 'render',
        waitsFor: [],
      },
      {
        title: 'Create distinct replies',
        objective: 'The second speaker answers the first.',
        criterionId: 'dialogue',
        waitsFor: [],
      },
    ],
  };
}
function invalid(request: AgentRequest): DirectionProposal {
  const proposal = direction(request);
  proposal.tasks[0].waitsFor = ['render'];
  return proposal;
}
const ready = {
  outcome: 'ready',
  summary: 'EXPLICIT FIXTURE: verified result is ready for review.',
  findings: [],
  decisions: [],
  tasks: [],
  operatorQuestion: '',
};

test('a semantically rejected orientation is automatically retried with useful feedback and no operator resume', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 4 };
    c.limits.maxTurns = 12;
    c.limits.maxAttempts = 3;
  });
  addDirectionNote(f.store, f.id, {
    text: 'Preserve useful project progress while I am away.',
    kind: 'request',
  });
  const originalNotes = structuredClone(f.store.get(f.id).notes);
  let calls = 0;
  const demo = new DemoProvider();
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(request) {
      if (request.mode === 'orient') {
        if (++calls === 1) return invalid(request);
        assert.match(request.failure ?? '', /depend|criterion|invalid|reject/i);
        return direction(request);
      }
      if (request.mode === 'oversee') return ready;
      assert.equal(request.mode, 'build');
      return demo.invoke(request);
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(calls, 2);
  assert.deepEqual(final.notes, originalNotes);
  assert.deepEqual(final.contract, f.contract);
  assert(final.criteria.every((c) => c.status === 'PASSED'));
  assert.equal(final.projectReviews!.at(-1)!.outcome, 'ready');
  const events = f.store.events(f.id);
  assert(!events.some((e) => e.type === 'workflow.resumed' || e.type === 'workflow.blocked'));
  assert(
    events.some((e) => /reject|invalid|retry/i.test(e.message)),
    'The rejected attempt must remain inspectable.',
  );
  assert.deepEqual(project(events), final);
});

test('repeated invalid orientation proposals stop at the original attempt limit without fabricating work or proof', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxAttempts = 3;
    c.limits.maxTurns = 12;
  });
  addDirectionNote(f.store, f.id, {
    text: 'Use only the current approved criteria.',
    kind: 'request',
  });
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(request) {
      assert.equal(request.mode, 'orient');
      calls++;
      return invalid(request);
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.equal(calls, 3);
  assert.equal(final.turns, 3);
  assert.equal(final.direction, undefined);
  assert.equal(final.evidence.length, 0);
  assert(final.criteria.every((c) => c.status === 'PENDING'));
  assert.deepEqual(final.contract, f.contract);
  assert.equal(final.notes!.length, 1);
  assert(!f.store.events(f.id).some((e) => e.type === 'workflow.resumed'));
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('a provider permission or authentication failure is not treated as a retryable direction proposal', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxAttempts = 3;
  });
  addDirectionNote(f.store, f.id, {
    text: 'Do not expand the execution permissions.',
    kind: 'request',
  });
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke() {
      calls++;
      throw Error('Permission denied: explicit provider authentication fixture.');
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.equal(calls, 1);
  assert.match(final.reason!, /Permission denied/);
  assert.equal(final.evidence.length, 0);
  assert.equal(final.direction, undefined);
});

test('automatic orientation recovery consumes the remaining original model-turn budget', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxAttempts = 3;
    c.limits.maxTurns = 1;
  });
  addDirectionNote(f.store, f.id, { text: 'Keep all original runtime limits.', kind: 'request' });
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(request) {
      calls++;
      return invalid(request);
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.equal(calls, 1);
  assert.equal(final.turns, 1);
  assert.deepEqual(final.contract, f.contract);
  assert.equal(final.evidence.length, 0);
});

test('an incoming instruction during a rejected orientation is retained by subsequent automatic reconciliation', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 4 };
    c.limits.maxTurns = 12;
    c.limits.maxAttempts = 3;
  });
  addDirectionNote(f.store, f.id, {
    text: 'First preserve the approved project outcome.',
    kind: 'request',
  });
  let calls = 0;
  const demo = new DemoProvider();
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(request) {
      if (request.mode === 'orient') {
        if (++calls === 1) {
          addDirectionNote(f.store, f.id, {
            text: 'Also preserve every newly received instruction.',
            kind: 'decision',
          });
          return invalid(request);
        }
        return direction(request);
      }
      if (request.mode === 'oversee') return ready;
      assert.equal(request.mode, 'build');
      return demo.invoke(request);
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert(calls >= 2 && calls <= 3);
  assert.equal(final.notes!.length, 2);
  assert.deepEqual(
    final.direction!.sourceIds,
    final.notes!.map((note) => note.id),
  );
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('a rejected planner that also changed protected files cannot obtain another automatic model attempt', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxAttempts = 3;
  });
  addDirectionNote(f.store, f.id, {
    text: 'Keep the original protected acceptance tests.',
    kind: 'request',
  });
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(request) {
      calls++;
      await appendFile(
        join(request.state.worktree, 'render.test.mjs'),
        '\n// Explicit unauthorized-write fixture.\n',
      );
      return invalid(request);
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.equal(calls, 1);
  assert.match(final.reason!, /protected|outside/i);
  assert.equal(final.direction, undefined);
  assert.equal(final.evidence.length, 0);
  assert.deepEqual(final.contract, f.contract);
});

test('every wire projection of a pre-retry ledger remains compatible, including the explicit superseded-orientation event', async () => {
  const legacy: { events: RunEvent[]; state: RunState; prefixCanonicalSha256: string[] } =
    JSON.parse(
      await readFile(new URL('./fixtures/direction-retry-legacy.json', import.meta.url), 'utf8'),
    );
  function canonical(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === 'object')
      return Object.fromEntries(
        Object.entries(value)
          .filter(([, item]) => item !== undefined)
          .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
          .map(([key, item]) => [key, canonical(item)]),
      );
    return value;
  }
  assert.equal(legacy.events.length, legacy.prefixCanonicalSha256.length);
  for (let index = 0; index < legacy.events.length; index++) {
    const state = project(legacy.events.slice(0, index + 1));
    const hash = createHash('sha256')
      .update(JSON.stringify(canonical(state)))
      .digest('hex');
    assert.equal(
      hash,
      legacy.prefixCanonicalSha256[index],
      `Legacy replay diverged at event ${index + 1}: ${legacy.events[index].type}`,
    );
  }
  assert.deepEqual(JSON.parse(JSON.stringify(project(legacy.events))), legacy.state);
});
