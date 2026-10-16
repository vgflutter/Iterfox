import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { Engine, node } from '../src/core/engine.js';
import { project, contractSchema, transition } from '../src/core/model.js';
import { Store } from '../src/core/store.js';
import { stamp, changedFiles } from '../src/core/workspace.js';
import { brief, markdownBrief } from '../src/core/brief.js';
import { DemoProvider } from '../src/providers/demo.js';
import type { AgentProvider, AgentRequest } from '../src/providers/provider.js';
import { approveContract, proposeContract, resumeRun, recoverDeadWorkers } from '../src/service.js';
import { fixture } from './helpers.js';

test('end-to-end: real checks → dynamic correction → original check → stale recheck → brief', async (t) => {
  const f = await fixture(t);
  const baseline = await stamp(f.repository);
  const state = await new Engine(f.store, f.id, new DemoProvider()).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert.equal(state.criteria.filter((c) => c.status === 'PASSED').length, 2);
  const events = f.store.events(f.id);
  const failure = events.findIndex((e) => e.type === 'verification.failed');
  const correction = events.findIndex((e) => e.type === 'corrective.inserted');
  const retry = events.findIndex((e, i) => i > correction && e.type === 'verification.started');
  assert(failure > 0 && correction > failure && retry > correction);
  assert(events.some((e) => e.type === 'evidence.invalidated'));
  assert.equal(state.evidence.filter((e) => e.status === 'failed').length, 1);
  assert.equal(state.evidence.filter((e) => e.status === 'passed').length, 2);
  assert.equal(state.evidence.filter((e) => e.status === 'stale').length, 1);
  assert(
    state.evidence.every((e) => e.kind === 'deterministic' && e.command && e.stamp.fingerprint),
  );
  assert.deepEqual(await stamp(f.repository), baseline, 'original repository untouched');
  assert.deepEqual(project(events), state, 'refresh reconstructs exactly the same graph and state');
  const reopened = new Store(f.store.path);
  assert.deepEqual(reopened.get(f.id), state);
  reopened.close();
  assert.deepEqual(
    events.map((e) => e.seq),
    Array.from({ length: events.length }, (_, i) => i + 1),
  );
  assert.equal(new Set(events.map((e) => e.id)).size, events.length);
  assert.equal(brief(state, events).open, 0);
  const md = markdownBrief(state, events);
  for (const text of [
    'DEMO',
    'COMPLETED',
    'STALE',
    'FAILED',
    'deterministic',
    'agent claim',
    'What needs attention',
    'fingerprint',
  ])
    assert(md.includes(text));
  // The projector must not mutate caller-owned events (also crucial to persisted appends).
  const frozen = JSON.stringify(events);
  project(events);
  assert.equal(JSON.stringify(events), frozen);
});

test('state transitions reject unsupported success, concurrent work, and out-of-order events', async (t) => {
  const f = await fixture(t);
  const a = node({
    kind: 'task',
    role: 'builder',
    title: 'A task',
    objective: 'Do the work',
    criterionId: 'render',
    reason: 'test',
  });
  assert.throws(() => transition(a, 'PASSED'), /Illegal transition/);
  f.store.append(f.id, 'task.planned', 'planned', { node: a });
  f.store.append(f.id, 'task.started', 'started', { nodeId: a.id });
  const b = node({ ...a, id: 'second', status: 'PENDING' });
  f.store.append(f.id, 'task.planned', 'planned', { node: b });
  const seq = f.store.get(f.id).seq;
  assert.throws(
    () => f.store.append(f.id, 'task.started', 'concurrent', { nodeId: b.id }),
    /Only one/,
  );
  assert.equal(f.store.get(f.id).seq, seq, 'failed append rolls back');
  assert.throws(
    () => f.store.append(f.id, 'workflow.completed', 'unsupported success'),
    /Acceptance is incomplete/,
  );
  assert.throws(
    () => f.store.append(f.id, 'decision.recorded', 'old version', {}, 1),
    /Concurrent/,
  );
  const events = f.store.events(f.id);
  [events[1], events[2]] = [events[2], events[1]];
  assert.throws(() => project(events), /ordering/);
  f.store.acquire(f.id, 'one');
  assert.throws(() => f.store.acquire(f.id, 'two'), /already owns/);
  f.store.release(f.id, 'one');
});

test('evidence freshness retains disjoint changes and invalidates relevant additions/edits/deletions', async (t) => {
  const f = await fixture(t);
  const engine = new Engine(f.store, f.id, new DemoProvider());
  await engine.run();
  const passed = f.store.get(f.id).evidence.filter((e) => e.status === 'passed').length;
  await writeFile(join(f.state.worktree, 'notes.txt'), 'Unrelated note');
  await engine.refreshEvidence();
  assert.equal(f.store.get(f.id).evidence.filter((e) => e.status === 'passed').length, passed);
  const before = await stamp(f.state.worktree);
  await writeFile(join(f.state.worktree, 'avatar.mjs'), '// edited externally\n');
  const after = await stamp(f.state.worktree);
  assert.deepEqual(changedFiles(before, after), ['avatar.mjs']);
  await engine.refreshEvidence();
  assert.equal(f.store.get(f.id).evidence.filter((e) => e.status === 'passed').length, 0);
  assert.equal(brief(f.store.get(f.id), f.store.events(f.id)).status, 'PARTIAL');
});

test('builder cannot rewrite protected tests or approved acceptance configuration', async (t) => {
  const f = await fixture(t);
  const demo = new DemoProvider();
  const malicious: AgentProvider = {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'build') {
        r.state.contract.criteria = []; // mutation of provider input must not change durable contract
        await writeFile(join(r.state.worktree, 'render.test.mjs'), 'process.exit(0)');
        return { summary: 'Everything passed, trust me', blocked: false, reason: '' };
      }
      return demo.invoke(r);
    },
  };
  const s = await new Engine(f.store, f.id, malicious).run();
  assert.equal(s.status, 'BLOCKED');
  assert.match(s.reason!, /protected/);
  assert.equal(s.contract.criteria.length, 2);
  assert.equal(s.evidence.length, 0);
  assert(s.criteria.every((c) => c.status !== 'PASSED'));
  assert(!s.nodes.some((n) => n.status === 'RUNNING' || n.status === 'VERIFYING'));
});

test('contract changes require explicit proposal and approval while no worker is alive', async (t) => {
  const f = await fixture(t);
  proposeContract(f.store, f.id, { ...f.contract, goal: 'A revised operator goal' });
  assert.throws(() => approveContract(f.store, f.id), /Pause or stop/);
  assert.equal(f.store.get(f.id).contractVersion, 1);
  const interrupted = node({
    kind: 'task',
    role: 'builder',
    title: 'Old task',
    objective: 'Old contract work',
    criterionId: 'render',
    reason: 'v1 plan',
  });
  f.store.append(f.id, 'task.planned', 'old task', { node: interrupted });
  f.store.append(f.id, 'task.started', 'started', { nodeId: interrupted.id });
  f.store.append(f.id, 'task.interrupted', 'paused', { nodeId: interrupted.id });
  f.store.append(f.id, 'workflow.paused', 'operator paused');
  approveContract(f.store, f.id);
  assert.equal(f.store.get(f.id).contractVersion, 2);
  assert.equal(f.store.get(f.id).contracts[0].goal, f.contract.goal);
  assert.equal(f.store.get(f.id).nodes.find((n) => n.id === interrupted.id)!.status, 'SKIPPED');
  assert.throws(
    () =>
      contractSchema.parse({
        ...f.contract,
        criteria: [f.contract.criteria[0], f.contract.criteria[0]],
      }),
    /unique/,
  );
  assert.throws(
    () => contractSchema.parse({ ...f.contract, allowedPaths: ['../outside'] }),
    /relative/,
  );
});

test('fingerprints account for scoped additions and tracked deletions', async (t) => {
  const f = await fixture(t);
  const before = await stamp(f.state.worktree);
  await writeFile(join(f.state.worktree, 'new-source.mjs'), 'export const answer=42;');
  await unlink(join(f.state.worktree, 'avatar.mjs'));
  const after = await stamp(f.state.worktree);
  assert.equal(after.files['avatar.mjs'], 'DELETED');
  assert.deepEqual(changedFiles(before, after).sort(), ['avatar.mjs', 'new-source.mjs']);
  assert.notEqual(
    (await stamp(f.state.worktree, ['new-source.mjs'])).fingerprint,
    (await stamp(f.state.worktree, ['missing-file'])).fingerprint,
  );
});

test('a dead worker is reconciled before UI/status can keep showing RUNNING', async (t) => {
  const f = await fixture(t);
  const task = node({
    kind: 'task',
    role: 'builder',
    title: 'Interrupted work',
    objective: 'Do the work',
    criterionId: 'render',
    reason: 'test',
  });
  f.store.append(f.id, 'task.planned', 'planned', { node: task });
  f.store.append(f.id, 'task.started', 'started', { nodeId: task.id });
  f.store.db.prepare('INSERT INTO leases VALUES (?,?,?)').run(f.id, 'dead-worker', 2_000_000_000);
  recoverDeadWorkers(f.store);
  assert.equal(f.store.get(f.id).status, 'BLOCKED');
  assert.equal(f.store.get(f.id).nodes[0].status, 'BLOCKED');
  assert.equal(f.store.lease(f.id), undefined);
});

test('partial edits before a provider error invalidate previously passing evidence', async (t) => {
  const f = await fixture(t);
  const demo = new DemoProvider();
  const provider: AgentProvider = {
    name: 'demo',
    async invoke(r) {
      const result = await demo.invoke(r);
      if (r.mode === 'build' && r.node.reason.startsWith('Corrective'))
        throw new Error('Provider disconnected after editing');
      return result;
    },
  };
  const s = await new Engine(f.store, f.id, provider).run();
  assert.equal(s.status, 'BLOCKED');
  assert.match(s.reason!, /disconnected/);
  assert.equal(s.evidence.filter((e) => e.status === 'passed').length, 0);
  assert(s.evidence.some((e) => e.status === 'stale'));
  assert(!s.nodes.some((n) => ['RUNNING', 'VERIFYING'].includes(n.status)));
});

test('retry, turn, no-progress, duration and token limits stop without infinite loops', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxAttempts = 2;
    c.limits.maxNoProgress = 20;
  });
  const demo = new DemoProvider();
  const noEdit: AgentProvider = {
    name: 'demo',
    invoke: (r) =>
      r.mode === 'build'
        ? Promise.resolve({ summary: 'No changes', blocked: false, reason: '' })
        : demo.invoke(r),
  };
  const s = await new Engine(f.store, f.id, noEdit).run();
  assert.equal(s.status, 'BLOCKED');
  assert.match(s.reason!, /Retry limit/);
  assert.equal(s.evidence.filter((e) => e.status === 'failed').length, 2);
  assert(s.turns <= f.contract.limits.maxTurns);
  const turn = await fixture(t, (c) => {
    c.limits.maxTurns = 1;
  });
  assert.match((await new Engine(turn.store, turn.id, demo).run()).reason!, /turn limit/);
  const tokens = await fixture(t);
  tokens.store.append(tokens.id, 'agent.usage', 'at budget', {
    tokens: tokens.contract.limits.maxTokens,
  });
  assert.match((await new Engine(tokens.store, tokens.id, demo).run()).reason!, /token budget/);
  const stalled = await fixture(t, (c) => {
    c.limits.maxNoProgress = 1;
  });
  assert.match((await new Engine(stalled.store, stalled.id, noEdit).run()).reason!, /No-progress/);
  const duration = await fixture(t, (c) => {
    c.limits.maxDurationMs = 1000;
  });
  await new Promise((resolve) => setTimeout(resolve, 1050));
  assert.match(
    (await new Engine(duration.store, duration.id, demo).run()).reason!,
    /duration limit/,
  );
});

test('pause and stop abort an actual in-flight activity; resume preserves accepted state', async (t) => {
  const f = await fixture(t);
  const demo = new DemoProvider(200);
  const engine = new Engine(f.store, f.id, demo);
  const running = engine.run();
  const timer = setTimeout(() => f.store.control(f.id, 'pause'), 40);
  t.after(() => clearTimeout(timer));
  const paused = await running;
  assert.equal(paused.status, 'PAUSED');
  assert(!paused.nodes.some((n) => ['RUNNING', 'VERIFYING'].includes(n.status)));
  resumeRun(f.store, f.id);
  const complete = await new Engine(f.store, f.id, new DemoProvider()).run();
  assert.equal(complete.status, 'COMPLETED', complete.reason);
  const g = await fixture(t);
  const stopper = new Engine(g.store, g.id, demo);
  const work = stopper.run();
  setTimeout(() => stopper.request('stop'), 40);
  assert.equal((await work).status, 'STOPPED');
});

test('crash recovery preserves graph, retries interrupted work and never leaves a false running node', async (t) => {
  const f = await fixture(t);
  const planner = node({
    kind: 'decision',
    role: 'planner',
    title: 'Plan the accepted goal',
    objective: f.contract.goal,
    criterionId: 'render',
    reason: 'Operator approved acceptance contract v1.',
  });
  f.store.append(f.id, 'task.planned', 'plan', { node: planner });
  f.store.append(f.id, 'task.started', 'started', { nodeId: planner.id });
  f.store.append(f.id, 'agent.thread', 'session', {
    nodeId: planner.id,
    threadId: 'fixture-session',
  });
  const blocked = await new Engine(f.store, f.id, new DemoProvider()).run();
  assert.equal(blocked.status, 'BLOCKED');
  assert(blocked.nodes.every((n) => n.status !== 'RUNNING'));
  resumeRun(f.store, f.id);
  let resumedSession: string | undefined;
  const demo = new DemoProvider();
  const observer: AgentProvider = {
    name: 'demo',
    invoke(r) {
      if (r.mode === 'plan') resumedSession = r.node.threadId;
      return demo.invoke(r);
    },
  };
  assert.equal((await new Engine(f.store, f.id, observer).run()).status, 'COMPLETED');
  assert.equal(resumedSession, 'fixture-session');
});

test('interruption after a failed check resumes the pending diagnosis rather than losing the corrective path', async (t) => {
  const f = await fixture(t);
  const demo = new DemoProvider();
  let interrupted = false;
  const engine = new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r: AgentRequest) {
      if (r.mode === 'diagnose' && !interrupted) {
        interrupted = true;
        engine.request('pause');
        r.signal.throwIfAborted();
      }
      return demo.invoke(r);
    },
  });
  assert.equal((await engine.run()).status, 'PAUSED');
  assert.equal(f.store.get(f.id).evidence.filter((e) => e.status === 'failed').length, 1);
  resumeRun(f.store, f.id);
  const s = await new Engine(f.store, f.id, demo).run();
  assert.equal(s.status, 'COMPLETED', s.reason);
  assert.equal(s.evidence.filter((e) => e.status === 'failed').length, 1);
  assert.equal(s.nodes.filter((n) => n.reason.startsWith('Corrective')).length, 1);
});
