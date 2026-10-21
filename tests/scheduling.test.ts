import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Engine, node } from '../src/core/engine.js';
import { project } from '../src/core/model.js';
import { resumeRun } from '../src/service.js';
import { fixture } from './helpers.js';

const response = {
  summary: 'Explicit scheduler test fixture edit; acceptance is checked by real Node commands.',
  blocked: false,
  reason: '',
};
async function edit(
  cwd: string,
  normalization: boolean,
  dialogue: boolean,
  breakNormalization = false,
) {
  const path = join(cwd, 'avatar.mjs');
  let s = await readFile(path, 'utf8');
  if (normalization)
    s = s.replace(
      'return name.trim()[0].toUpperCase();',
      "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
    );
  if (dialogue)
    s = s.replace(
      'names.map(name => `${avatarLabel(name)}: Hello!`)',
      'names.map((name, i) => i === 0 ? `${avatarLabel(name)}: Hello!` : `${avatarLabel(name)}: Hi, ${avatarLabel(names[i - 1])}!`)',
    );
  if (breakNormalization)
    s = s.replace(
      "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
      'return name.trim()[0].toUpperCase();',
    );
  await writeFile(path, s);
}

test('adjacent substeps of one acceptance gate are implemented together; missing planned CLI-like work does not consume retries', async (t) => {
  const f = await fixture(t, (c) => {
    c.criteria = [
      { ...c.criteria[0], command: ['node', '--test', 'render.test.mjs', 'dialogue.test.mjs'] },
    ];
    c.limits.maxAttempts = 1;
  });
  let builds = 0;
  const state = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan')
        return {
          tasks: [
            {
              title: 'Normalize labels',
              objective: 'Handle empty avatar labels safely.',
              criterionId: 'render',
            },
            {
              title: 'Implement dialogue',
              objective: 'Make the second speaker reply to the first.',
              criterionId: 'render',
            },
          ],
        };
      assert.equal(r.mode, 'build', 'planned work must not become a corrective diagnosis');
      builds++;
      assert.match(r.node.objective, /Handle empty avatar/);
      assert.match(r.node.objective, /second speaker/);
      await edit(r.state.worktree, true, true);
      return response;
    },
  }).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert.equal(builds, 1);
  assert.equal(state.turns, 2);
  assert.equal(state.criteria[0].status, 'PASSED');
  assert(
    f.store
      .events(f.id)
      .some((e) => e.type === 'decision.recorded' && e.data.kind === 'plan.coalesced'),
  );
  assert(
    !f.store
      .events(f.id)
      .some((e) =>
        ['verification.failed', 'corrective.inserted', 'diagnosis.proposed'].includes(e.type),
      ),
  );
  assert.deepEqual(project(f.store.events(f.id)), state);
});

test('nonadjacent contributions retain plan order; negative probes defer correction until all planned work finishes', async (t) => {
  const f = await fixture(t, (c) => {
    c.criteria[0].command = ['node', '--test', 'render.test.mjs', 'dialogue.test.mjs'];
    c.criteria[1].command = ['node', '--version'];
    c.limits.maxAttempts = 1;
  });
  const called: string[] = [];
  const state = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan')
        return {
          tasks: [
            {
              title: 'Normalize labels',
              objective: 'Handle empty avatar labels.',
              criterionId: 'render',
            },
            {
              title: 'Check Node',
              objective: 'The existing Node executable must work.',
              criterionId: 'dialogue',
            },
            {
              title: 'Reply to speaker',
              objective: 'Implement the second dialogue turn.',
              criterionId: 'render',
            },
          ],
        };
      assert.equal(r.mode, 'build');
      called.push(r.node.title);
      await edit(
        r.state.worktree,
        r.node.title === 'Normalize labels',
        r.node.title === 'Reply to speaker',
      );
      return response;
    },
  }).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert.deepEqual(called, ['Normalize labels', 'Reply to speaker']);
  assert.equal(state.turns, 3);
  assert(!state.evidence.some((e) => e.status === 'failed'));
  assert(
    state.evidence.filter((e) => e.purpose === 'probe' && e.status === 'recorded').length >= 2,
  );
  assert.equal(state.nodes.find((n) => n.title === 'Check Node')!.status, 'SKIPPED');
});

test('real deterministic coverage skips future model calls, including final certification at the reported token boundary', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxTurns = 2;
    c.limits.maxTokens = 100;
  });
  const calls: string[] = [];
  const state = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls.push(r.mode);
      r.onUsage(r.mode === 'plan' ? 10 : 90);
      if (r.mode === 'plan')
        return {
          tasks: [
            {
              title: 'Fix shared implementation',
              objective: 'Repair avatar normalization and reply behavior.',
              criterionId: 'render',
            },
            {
              title: 'Follow up dialogue',
              objective: 'Repair dialogue only if it still needs implementation.',
              criterionId: 'dialogue',
            },
          ],
        };
      assert.equal(r.mode, 'build');
      await edit(r.state.worktree, true, true);
      return response;
    },
  }).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert.equal(state.tokens, 100);
  assert.equal(state.turns, 2);
  assert.deepEqual(calls, ['plan', 'build']);
  const skipped = state.nodes.find((n) => n.title === 'Follow up dialogue')!;
  assert.equal(skipped.status, 'SKIPPED');
  assert.equal(skipped.startedAt, undefined);
  const proof = state.evidence.find((e) => skipped.evidenceIds.includes(e.id))!;
  assert.equal(proof.kind, 'deterministic');
  assert.equal(proof.status, 'passed');
  assert.equal(proof.exitCode, 0);
  assert(state.criteria.every((c) => c.status === 'PASSED'));
});

test('an unmet criterion still blocks before another model call when the token boundary is reached', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxTokens = 100;
  });
  let calls = 0;
  const state = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls++;
      r.onUsage(r.mode === 'plan' ? 10 : 90);
      if (r.mode === 'plan')
        return {
          tasks: [
            { title: 'Normalize only', objective: 'Handle empty labels.', criterionId: 'render' },
            {
              title: 'Reply later',
              objective: 'Implement dialogue response.',
              criterionId: 'dialogue',
            },
          ],
        };
      await edit(r.state.worktree, true, false);
      return response;
    },
  }).run();
  assert.equal(state.status, 'BLOCKED');
  assert.match(state.reason!, /token budget/);
  assert.equal(calls, 2);
  assert.equal(state.criteria.find((c) => c.id === 'render')!.status, 'PASSED');
  assert.notEqual(state.criteria.find((c) => c.id === 'dialogue')!.status, 'PASSED');
});

test('stale evidence revokes a skip and reopens the original plan rather than inventing a correction', async (t) => {
  const f = await fixture(t);
  const calls: string[] = [];
  let sawSkip = false;
  const state = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan')
        return {
          tasks: [
            { title: 'Normalize now', objective: 'Handle empty names.', criterionId: 'render' },
            {
              title: 'Change dialogue',
              objective: 'Implement the reply.',
              criterionId: 'dialogue',
            },
            {
              title: 'Preserve normalization',
              objective: 'Ensure empty names still work.',
              criterionId: 'render',
            },
          ],
        };
      assert.equal(r.mode, 'build');
      calls.push(r.node.title);
      if (r.node.title === 'Change dialogue') {
        sawSkip =
          r.state.nodes.find((n) => n.title === 'Preserve normalization')?.status === 'SKIPPED';
        await edit(r.state.worktree, false, true, true);
      } else await edit(r.state.worktree, true, false);
      return response;
    },
  }).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert(sawSkip);
  assert.deepEqual(calls, ['Normalize now', 'Change dialogue', 'Preserve normalization']);
  assert(!f.store.events(f.id).some((e) => e.type === 'diagnosis.proposed'));
  assert(state.evidence.some((e) => e.status === 'stale'));
  assert.deepEqual(project(f.store.events(f.id)), state);
});

test('skip guards reject unsupported evidence and interrupted probes reuse their pending verifier on resume', async (t) => {
  const f = await fixture(t);
  const pending = node({
    kind: 'task',
    role: 'builder',
    title: 'Pending work',
    objective: 'No evidence yet.',
    reason: 'test',
    criterionId: 'render',
  });
  f.store.append(f.id, 'task.planned', 'planned', { node: pending });
  assert.throws(
    () =>
      f.store.append(f.id, 'task.skipped', 'trust a claim', {
        nodeId: pending.id,
        evidenceId: 'missing',
      }),
    /current deterministic/,
  );
  const g = await fixture(t);
  const { DemoProvider } = await import('../src/providers/demo.js');
  const demo = new DemoProvider();
  const engine = new Engine(g.store, g.id, demo);
  const original = engine.emit.bind(engine);
  let interrupted = false;
  engine.emit = (type, message, data) => {
    const result = original(type, message, data);
    if (type === 'verification.started' && !interrupted) {
      interrupted = true;
      engine.request('pause');
    }
    return result;
  };
  assert.equal((await engine.run()).status, 'PAUSED');
  const paused = g.store.get(g.id).nodes.find((n) => n.kind === 'verification')!;
  resumeRun(g.store, g.id);
  const resumed = await new Engine(g.store, g.id, demo).run();
  assert.equal(resumed.status, 'COMPLETED', resumed.reason);
  assert.notEqual(resumed.nodes.find((n) => n.id === paused.id)!.status, 'PENDING');
  assert(!resumed.nodes.some((n) => n.status === 'PENDING'));
});
