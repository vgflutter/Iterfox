import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { Engine, node } from '../src/core/engine.js';
import { ProviderInterruption } from '../src/core/recovery.js';
import { project } from '../src/core/model.js';
import { brief, markdownBrief } from '../src/core/brief.js';
import { DemoProvider } from '../src/providers/demo.js';
import { CodexProvider } from '../src/providers/codex.js';
import { resumeRun } from '../src/service.js';
import { fixture } from './helpers.js';

test('a joined technical interruption preserves partial work, invalidates proof and completes without resume', async (t) => {
  const f = await fixture(t);
  const demo = new DemoProvider();
  let interrupted = false;
  let originalStart: string | undefined;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      originalStart ??= r.state.startedAt;
      assert.equal(r.state.startedAt, originalStart);
      if (r.mode === 'build' && r.node.criterionId === 'dialogue') {
        if (!interrupted) {
          assert(r.state.evidence.some((e) => e.status === 'passed'));
          interrupted = true;
          r.onThread('interrupted-session');
          r.onUsage(123);
          const path = join(r.state.worktree, 'avatar.mjs');
          await writeFile(path, (await readFile(path, 'utf8')) + '\n// preserved partial edit\n');
          throw new ProviderInterruption(
            'stream disconnected before completion',
            'transport',
            true,
          );
        }
        assert.equal(r.node.threadId, 'interrupted-session');
        assert.match(r.failure!, /Partial file edits were preserved/);
        assert.match(
          await readFile(join(r.state.worktree, 'avatar.mjs'), 'utf8'),
          /preserved partial edit/,
        );
        assert(r.state.evidence.some((e) => e.status === 'stale'));
        assert.equal(r.state.tokens, 123);
      }
      return demo.invoke(r);
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(final.technicalInterruptions?.length, 1);
  assert(final.technicalInterruptions![0].retriedAt);
  assert(final.criteria.every((c) => c.status === 'PASSED'));
  const events = f.store.events(f.id);
  assert(!events.some((e) => e.type === 'workflow.resumed' || e.type === 'workflow.blocked'));
  assert.equal(
    final.turns,
    events.filter((e) =>
      ['task.started', 'assessment.started', 'agent.retry.started'].includes(e.type),
    ).length,
  );
  assert.deepEqual(project(events), final);
  assert.equal(brief(final, events).technicalInterruptions.length, 1);
  assert.match(markdownBrief(final, events), /Automatic retry/);
});

test('technical retries are bounded across explicit resume and retain usage', async (t) => {
  const f = await fixture(t);
  let calls = 0;
  const provider = {
    name: 'demo' as const,
    async invoke() {
      calls++;
      throw new ProviderInterruption('transport unavailable', 'transport', true);
    },
  };
  const blocked = await new Engine(f.store, f.id, provider).run();
  assert.equal(blocked.status, 'BLOCKED');
  assert.match(blocked.reason!, /Technical recovery limit/);
  assert.equal(calls, 3);
  assert.equal(blocked.turns, 3);
  const startedAt = blocked.startedAt;
  resumeRun(f.store, f.id);
  const again = await new Engine(f.store, f.id, provider).run();
  assert.equal(calls, 4, 'resume must not replenish the automatic recovery allowance');
  assert.equal(again.turns, 4);
  assert.equal(again.startedAt, startedAt);
  assert.equal(again.technicalInterruptions?.filter((i) => i.retriedAt).length, 2);
  assert.deepEqual(project(f.store.events(f.id)), again);
});

test('a per-turn timeout is diagnosed separately and can recover without resetting startedAt', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.turnTimeoutMs = 1000;
  });
  const demo = new DemoProvider();
  let first = true;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (first) {
        first = false;
        try {
          await delay(3000, undefined, { signal: r.signal });
        } catch {
          throw new ProviderInterruption('SDK aborted after timeout', 'provider-abort', true);
        }
      }
      return demo.invoke(r);
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(final.technicalInterruptions?.[0].cause, 'turn-timeout');
  assert.equal(final.startedAt, f.state.startedAt);
});

test('qualitative retries count model turns while preserving the same immutable captured inputs', async (t) => {
  const f = await fixture(t, (c) => {
    c.criteria = [c.criteria[0]];
    c.criteria[0].verification = {
      kind: 'qualitative',
      rubric: [{ id: 'clarity', description: 'Names are visibly described clearly.', minScore: 3 }],
      files: ['avatar.mjs'],
      instructions: 'Judge only the captured file.',
    };
  });
  const demo = new DemoProvider();
  let assessments = 0;
  let captured: unknown;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode !== 'assess') return demo.invoke(r);
      assessments++;
      if (assessments === 1) {
        captured = structuredClone(r.assessmentInput);
        throw new ProviderInterruption('connection reset', 'transport', true);
      }
      assert.deepEqual(r.assessmentInput, captured);
      return {
        outcome: 'sufficient',
        ratings: [{ id: 'clarity', score: 4, explanation: 'Captured names are clear.' }],
        summary: 'Fixture assessment only.',
        limitations: ['Explicit deterministic test assessor, not a real model.'],
      };
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(assessments, 2);
  assert.equal(final.criteria[0].status, 'ASSESSED');
  assert.equal(final.turns, 4, 'plan, build, initial assessment and retry');
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('unjoined writers, ordinary errors, auth failures and uncertain output never trigger automatic recovery', async (t) => {
  for (const error of [
    new ProviderInterruption('writer still alive', 'transport', false),
    new Error('The operation was aborted'),
    new Error('Authentication required'),
    new SyntaxError('Invalid JSON'),
  ]) {
    const f = await fixture(t);
    let calls = 0;
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke() {
        calls++;
        throw error;
      },
    }).run();
    assert.equal(final.status, 'BLOCKED');
    assert.equal(calls, 1);
    assert(!final.technicalInterruptions?.some((i) => i.retriedAt));
  }
});

test('operator pause/stop, queued controls, shared turn/token budget and original deadline take precedence', async (t) => {
  for (const mode of ['pause', 'stop', 'turns', 'tokens', 'deadline'] as const) {
    const f = await fixture(t, (c) => {
      if (mode === 'turns') c.limits.maxTurns = 1;
      if (mode === 'deadline') c.limits.maxDurationMs = 1000;
    });
    let calls = 0;
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        calls++;
        if (mode === 'pause' || mode === 'stop') f.store.control(f.id, mode);
        if (mode === 'tokens') r.onUsage(f.contract.limits.maxTokens);
        if (mode === 'deadline') await delay(1100);
        throw new ProviderInterruption('stream interrupted', 'transport', true);
      },
    }).run();
    assert.equal(calls, 1, mode);
    assert.equal(
      final.status,
      mode === 'pause' ? 'PAUSED' : mode === 'stop' ? 'STOPPED' : 'BLOCKED',
    );
    assert(!final.technicalInterruptions?.some((i) => i.retriedAt));
    if (mode === 'tokens') assert.equal(final.tokens, f.contract.limits.maxTokens);
  }
});

test('a protected edit during an interrupted call blocks before another model starts', async (t) => {
  const f = await fixture(t);
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls++;
      await writeFile(join(r.state.worktree, 'iterfox.json'), '{}');
      throw new ProviderInterruption('stream interrupted', 'transport', true);
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.match(final.reason!, /protected\/out-of-scope/);
  assert.equal(calls, 1);
});

// A local fake CLI exercises the actual SDK and process lifecycle without a
// model/network. Semantic behavior is covered separately by the real trial.
test('the real SDK transport classifier excludes authentication and permission failures', async (t) => {
  const f = await fixture(t);
  for (const [message, recoverable] of [
    ['stream disconnected before completion', true],
    ['401 Unauthorized: error sending request', false],
    ['403 Forbidden: connection closed', false],
    ['Sandbox permission error: temporarily unavailable', false],
    ['Invalid configuration: network error', false],
  ] as const) {
    const cli = join(f.dir, 'failure-codex.cjs');
    await writeFile(
      cli,
      `#!/usr/bin/env node
if(process.argv[2]==='mcp'){console.log('[]');process.exit(0)}
process.stdin.resume();console.log(JSON.stringify({type:'turn.failed',error:{message:${JSON.stringify(message)}}}));
`,
      { mode: 0o700 },
    );
    await assert.rejects(
      new CodexProvider({ codexPath: cli }).invoke({
        mode: 'plan',
        state: f.state,
        node: node({
          role: 'planner',
          kind: 'decision',
          title: 'Inspect files',
          objective: 'Inspect files.',
          reason: 'Test',
          criterionId: 'render',
        }),
        signal: new AbortController().signal,
        onThread() {},
        onUsage() {},
      }),
      (error: unknown) =>
        error instanceof Error &&
        error instanceof ProviderInterruption === recoverable &&
        error.message === message,
    );
  }
});

for (const abort of [false, true]) {
  test(
    `owned SDK process group joins an uncooperative tool descendant before ${abort ? 'abort rejection' : 'returning a response'}`,
    { timeout: 15_000 },
    async (t) => {
      const f = await fixture(t);
      const lateWrite = join(f.dir, 'late-writer.txt');
      const cli = join(f.dir, 'fake-codex.cjs');
      const writer = `process.on('SIGTERM',()=>{});setTimeout(()=>require('node:fs').writeFileSync(${JSON.stringify(lateWrite)},'unsafe'),1800);setTimeout(()=>process.exit(0),4000);`;
      await writeFile(
        cli,
        `#!/usr/bin/env node
const {spawn}=require('node:child_process');
if(process.argv[2]==='mcp'){console.log('[]');process.exit(0)}
const tool=spawn(process.execPath,['-e',${JSON.stringify(writer)}],{stdio:'ignore',detached:${abort}});tool.unref();
process.stdin.resume();process.on('SIGTERM',()=>{});
console.log(JSON.stringify({type:'thread.started',thread_id:'owned-session'}));
${abort ? 'setInterval(()=>{},1000);' : `console.log(JSON.stringify({type:'item.completed',item:{type:'agent_message',id:'a',text:JSON.stringify({tasks:[{title:'Inspect current files',objective:'Inspect the approved current files.',criterionId:'render'}]})}}));console.log(JSON.stringify({type:'turn.completed',usage:{input_tokens:10,output_tokens:5,cached_input_tokens:0}}));process.exit(0);`}
`,
        { mode: 0o700 },
      );
      const controller = new AbortController();
      let threads = 0;
      let usage = 0;
      const pending = new CodexProvider({ codexPath: cli }).invoke({
        mode: 'plan',
        state: f.state,
        node: node({
          role: 'planner',
          kind: 'decision',
          title: 'Inspect current files',
          objective: 'Inspect current files.',
          reason: 'Test',
          criterionId: 'render',
        }),
        signal: controller.signal,
        onThread() {
          threads++;
          if (abort) setTimeout(() => controller.abort(new Error('Injected timeout')), 100);
        },
        onUsage(tokens) {
          usage += tokens;
        },
      });
      if (abort)
        await assert.rejects(
          pending,
          (e: unknown) => e instanceof ProviderInterruption && e.quiesced,
        );
      else {
        assert(((await pending) as { tasks: unknown[] }).tasks.length);
        assert.equal(usage, 15);
      }
      assert.equal(threads, 1);
      await delay(1900);
      await assert.rejects(
        readFile(lateWrite),
        /ENOENT/,
        'old tool must never write after a retry can start',
      );
    },
  );
}
