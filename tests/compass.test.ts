import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { appendFileSync } from 'node:fs';
import { Engine } from '../src/core/engine.js';
import {
  activeNotes,
  heldCriteria,
  needsOrientation,
  questions,
  validateDirection,
  type DirectionProposal,
} from '../src/core/compass.js';
import { project } from '../src/core/model.js';
import { brief, markdownBrief } from '../src/core/brief.js';
import { addDirectionNote, resumeRun } from '../src/service.js';
import { fixture } from './helpers.js';
import type { AgentRequest } from '../src/providers/provider.js';

const result = {
  summary: 'Explicit test fixture edit. Runtime checks are authoritative.',
  blocked: false,
  reason: '',
};
const tasks = [
  {
    title: 'Normalize labels',
    objective: 'Handle missing and empty names.',
    criterionId: 'render',
    waitsFor: [],
  },
  {
    title: 'Make a reply',
    objective: 'Second speaker answers the first.',
    criterionId: 'dialogue',
    waitsFor: [],
  },
];
function proposal(r: AgentRequest): DirectionProposal {
  return {
    focus: 'TEST FIXTURE: preserve the operator direction across unattended work.',
    nextArtifact: 'TEST FIXTURE target: a working two-avatar exchange with evidence.',
    assumptions: ['TEST FIXTURE assumption: initials remain the temporary visual identity.'],
    notes: activeNotes(r.state).map((n) => ({
      noteId: n.id,
      disposition: 'applied',
      reason: 'TEST FIXTURE: incorporated into the unchanged contract.',
      criterionIds: [],
    })),
    tasks,
  };
}
async function edit(cwd: string, render: boolean, dialogue: boolean) {
  const path = join(cwd, 'avatar.mjs');
  let source = await readFile(path, 'utf8');
  if (render)
    source = source.replace(
      'return name.trim()[0].toUpperCase();',
      "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
    );
  if (dialogue)
    source = source.replace(
      'names.map(name => `${avatarLabel(name)}: Hello!`)',
      'names.map((name, i) => i === 0 ? `${avatarLabel(name)}: Hello!` : `${avatarLabel(name)}: Hi, ${avatarLabel(names[i - 1])}!`)',
    );
  await writeFile(path, source);
}

test('an operator question holds dependent work; independent work finishes, then a linked reply resumes the same run', async (t) => {
  const f = await fixture(t, (c) => {
    // A genuinely independent gate: the other fixture check also needs empty-name normalization.
    c.criteria[1].command = [
      'node',
      '--input-type=module',
      '-e',
      "import assert from 'node:assert/strict'; import {dialogue} from './avatar.mjs'; assert.equal(dialogue(['Ada','Bea']), 'A: Hello!\\nB: Hi, A!');",
    ];
  });
  const original = JSON.stringify(f.contract);
  addDirectionNote(f.store, f.id, {
    text: 'Choose initials or full names only after I answer.',
    kind: 'request',
  });
  const questionId = f.store.get(f.id).notes![0].id;
  const calls: string[] = [];
  const provider = {
    name: 'demo' as const,
    async invoke(r: AgentRequest) {
      calls.push(r.mode === 'build' ? r.node.criterionId : r.mode);
      if (r.mode === 'orient') {
        const p = proposal(r);
        if (!r.state.notes?.some((n) => n.replyTo === questionId)) {
          p.notes[0] = {
            noteId: questionId,
            disposition: 'question',
            reason: 'Which label style should we use: initials or full names?',
            criterionIds: ['render'],
          };
        } else p.tasks = [tasks[0]];
        return p;
      }
      assert.equal(r.mode, 'build');
      await edit(
        r.state.worktree,
        r.node.criterionId === 'render',
        r.node.criterionId === 'dialogue',
      );
      return result;
    },
  };
  const first = await new Engine(f.store, f.id, provider).run();
  assert.equal(first.status, 'BLOCKED', first.reason);
  assert.deepEqual(calls, ['orient', 'dialogue']);
  assert.equal(first.criteria.find((c) => c.id === 'dialogue')!.status, 'PASSED');
  assert.equal(questions(first).length, 1);
  assert.deepEqual([...heldCriteria(first)], ['render']);
  assert(!first.nodes.some((n) => n.kind === 'verification' && n.criterionId === 'render'));
  assert.throws(
    () => f.store.append(f.id, 'workflow.completed', 'false completion'),
    /Acceptance is incomplete/,
  );
  assert.match(markdownBrief(first, f.store.events(f.id)), /Which label style/);
  addDirectionNote(f.store, f.id, {
    text: 'Use initials, with a question mark for a missing name.',
    kind: 'decision',
    replyTo: questionId,
  });
  assert(needsOrientation(f.store.get(f.id)));
  resumeRun(f.store, f.id);
  const final = await new Engine(f.store, f.id, provider).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.deepEqual(calls, ['orient', 'dialogue', 'orient', 'render']);
  assert.equal(final.direction?.revision, 2);
  assert.equal(questions(final).length, 0);
  assert.equal(brief(final, f.store.events(f.id)).handoff[0].answered, true);
  assert.equal(JSON.stringify(final.contract), original);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('multiple steering notes received during one build are batched; only unstarted work is replaced', async (t) => {
  const f = await fixture(t);
  addDirectionNote(f.store, f.id, {
    text: 'First produce something I can inspect.',
    kind: 'request',
  });
  const calls: string[] = [];
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls.push(r.mode);
      if (r.mode === 'orient') {
        const p = proposal(r);
        if (r.state.direction) p.tasks = [{ ...tasks[1], title: 'Updated dialogue direction' }];
        return p;
      }
      assert.equal(r.mode, 'build');
      if (r.node.criterionId === 'render') {
        addDirectionNote(f.store, f.id, {
          text: 'Revisit innovation after we can see an actual exchange.',
          kind: 'hypothesis',
        });
        addDirectionNote(f.store, f.id, {
          text: 'Use the existing labels for this iteration.',
          kind: 'decision',
        });
      }
      await edit(
        r.state.worktree,
        r.node.criterionId === 'render',
        r.node.criterionId === 'dialogue',
      );
      return result;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.deepEqual(calls, ['orient', 'build', 'orient', 'build']);
  assert.equal(final.direction?.notes.length, 3);
  const replaced = final.nodes.find((n) => n.title === 'Make a reply')!;
  assert.equal(replaced.status, 'SKIPPED');
  assert(replaced.supersededBy);
  assert.equal(replaced.startedAt, undefined);
  assert(final.nodes.find((n) => n.title === 'Normalize labels')?.startedAt);
  assert.equal(final.nodes.filter((n) => n.title === 'Updated dialogue direction').length, 1);
  assert.equal(final.contractVersion, 1);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('notes arriving during reconciliation stay pending for the next snapshot instead of disappearing', async (t) => {
  const f = await fixture(t);
  addDirectionNote(f.store, f.id, { text: 'Prepare a complete example.', kind: 'request' });
  let orientations = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'orient') {
        orientations++;
        if (orientations === 1)
          addDirectionNote(f.store, f.id, {
            text: 'Keep branding provisional.',
            kind: 'hypothesis',
          });
        return { ...proposal(r), tasks: [tasks[0]] };
      }
      assert.equal(r.mode, 'build');
      assert.equal(r.state.direction?.sourceIds.length, 2);
      await edit(r.state.worktree, true, true);
      return result;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(orientations, 2);
  assert(!needsOrientation(final));
});

test('recovery reuses a persisted orientation response; replacement of the remaining plan is atomic', async (t) => {
  const f = await fixture(t);
  addDirectionNote(f.store, f.id, {
    text: 'Keep one useful deliverable in focus.',
    kind: 'request',
  });
  let orientations = 0;
  const provider = {
    name: 'demo' as const,
    async invoke(r: AgentRequest) {
      if (r.mode === 'orient') {
        orientations++;
        return { ...proposal(r), tasks: [tasks[0]] };
      }
      assert.equal(r.mode, 'build');
      await edit(r.state.worktree, true, true);
      return result;
    },
  };
  const engine = new Engine(f.store, f.id, provider);
  const emit = engine.emit.bind(engine);
  engine.emit = (type, message, data) => {
    const next = emit(type, message, data);
    if (
      type === 'task.completed' &&
      next.nodes.find((n) => n.id === data?.nodeId)?.role === 'planner'
    )
      throw new Error('TEST interruption after persisted response');
    return next;
  };
  assert.equal((await engine.run()).status, 'BLOCKED');
  assert.equal(f.store.get(f.id).direction, undefined);
  resumeRun(f.store, f.id);
  const final = await new Engine(f.store, f.id, provider).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(orientations, 1);
  assert.equal(final.nodes.filter((n) => n.kind === 'task').length, 1);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('direction rejects lost instructions, fabricated criteria, circular dependencies and self-answered operator questions', async (t) => {
  const f = await fixture(t);
  addDirectionNote(f.store, f.id, { text: 'Ask me before choosing the name.', kind: 'request' });
  const s = f.store.get(f.id);
  const req = { state: s } as AgentRequest;
  const p = proposal(req);
  const ids = s.notes!.map((n) => n.id);
  assert.throws(() => validateDirection(s, { ...p, notes: [] }, ids));
  assert.throws(
    () => validateDirection(s, { ...p, tasks: [{ ...tasks[0], criterionId: 'invented' }] }, ids),
    /unapproved/,
  );
  assert.throws(
    () =>
      validateDirection(
        s,
        {
          ...p,
          tasks: [
            { ...tasks[0], waitsFor: ['dialogue'] },
            { ...tasks[1], waitsFor: ['render'] },
          ],
        },
        ids,
      ),
    /cycle/,
  );
  assert.throws(() => validateDirection(s, p, []), /active handoff/);
  const waiting = {
    ...s,
    direction: {
      ...p,
      revision: 1,
      nodeId: 'test',
      sourceIds: ids,
      contractVersion: 1,
      notes: [{ ...p.notes[0], disposition: 'question' as const, criterionIds: ['render'] }],
    },
  };
  assert.throws(() => validateDirection(waiting, p, ids), /linked operator reply/);
  assert.throws(
    () =>
      validateDirection(
        waiting,
        { ...p, notes: [{ ...p.notes[0], disposition: 'question', criterionIds: [] }] },
        ids,
      ),
    /linked operator reply/,
  );
  assert.throws(
    () =>
      addDirectionNote(f.store, f.id, {
        text: 'I choose initials.',
        kind: 'decision',
        replyTo: 'missing',
      }),
    /open operator question/,
  );
  const dependent = {
    ...waiting,
    nodes: [
      {
        ...tasks[1],
        kind: 'task',
        role: 'builder',
        id: 'dependent',
        status: 'PENDING',
        reason: 'test',
        attempt: 1,
        files: [],
        evidenceIds: [],
        waitsFor: ['render'],
      },
    ],
  } as typeof s;
  assert.deepEqual([...heldCriteria(dependent)], ['render', 'dialogue']);
});

test('evidence invalidation cannot resurrect skipped work from a superseded direction', async (t) => {
  const f = await fixture(t);
  const modes: string[] = [];
  const engine = new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      modes.push(r.mode);
      if (r.mode === 'plan') return { tasks: tasks.map(({ waitsFor, ...task }) => task) };
      if (r.mode === 'orient') return { ...proposal(r), tasks: [tasks[0]] };
      assert.equal(r.mode, 'build');
      await edit(r.state.worktree, true, true);
      return result;
    },
  });
  const emit = engine.emit.bind(engine);
  let sent = false;
  engine.emit = (type, message, data) => {
    const s = emit(type, message, data);
    if (type === 'task.skipped' && !sent) {
      sent = true;
      addDirectionNote(f.store, f.id, { text: 'Keep one prototype in focus.', kind: 'request' });
    }
    if (type === 'direction.compiled')
      appendFileSync(
        join(s.worktree, 'avatar.mjs'),
        '\n// TEST: relevant input changed after plan replacement.\n',
      );
    return s;
  };
  const final = await engine.run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  const old = final.nodes.find((n) => n.title === 'Make a reply')!;
  assert.equal(old.status, 'SKIPPED');
  assert(old.supersededBy);
  assert.equal(old.startedAt, undefined);
  assert.equal(
    f.store.events(f.id).filter((e) => e.type === 'task.skipped' && e.data.nodeId === old.id)
      .length,
    1,
  );
  assert.deepEqual(modes, ['plan', 'build', 'orient']);
});

test('reconciliation uses the existing model budget and never silently extends an unattended session', async (t) => {
  const f = await fixture(t, (c) => {
    c.limits.maxTurns = 1;
  });
  addDirectionNote(f.store, f.id, { text: 'Work while I am away.', kind: 'request' });
  let calls = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls++;
      assert.equal(r.mode, 'orient');
      return proposal(r);
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.match(final.reason!, /turn limit/);
  assert.equal(calls, 1);
  assert.equal(final.turns, 1);
});

test('a new handoff after rejected orientation retires only the obsolete planner and can complete project review', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 4 };
    c.limits.maxTurns = 12;
  });
  addDirectionNote(f.store, f.id, {
    text: 'Keep useful project progress across an interruption.',
    kind: 'request',
  });
  let orientations = 0;
  const provider = {
    name: 'demo' as const,
    async invoke(r: AgentRequest) {
      if (r.mode === 'orient') {
        const p = proposal(r);
        if (++orientations === 1)
          p.tasks = p.tasks.map((task, index) =>
            index === 0 ? { ...task, waitsFor: ['render'] } : task,
          );
        return p;
      }
      if (r.mode === 'oversee')
        return {
          outcome: 'ready',
          summary: 'Explicit fixture: current behavior is ready for review.',
          findings: [],
          decisions: [],
          tasks: [],
          operatorQuestion: '',
        };
      assert.equal(r.mode, 'build');
      const beforeRejectedRetirement = f.store.get(f.id);
      for (const nodeId of [r.node.id, r.state.direction!.nodeId])
        assert.throws(
          () =>
            f.store.append(f.id, 'direction.superseded', 'Invalid retirement fixture.', {
              nodeId,
              supersededBy: r.state.direction!.nodeId,
            }),
          /Only an obsolete orientation/,
        );
      assert.deepEqual(f.store.get(f.id), beforeRejectedRetirement);
      await edit(
        r.state.worktree,
        r.node.criterionId === 'render',
        r.node.criterionId === 'dialogue',
      );
      return result;
    },
  };
  const first = await new Engine(f.store, f.id, provider).run();
  assert.equal(first.status, 'BLOCKED');
  assert.match(first.reason!, /self dependency/);
  const rejected = first.nodes.find((n) => n.title === 'Reconcile the project direction')!;
  addDirectionNote(f.store, f.id, {
    text: 'Preserve the original contract and use only valid dependencies.',
    kind: 'decision',
  });
  resumeRun(f.store, f.id);
  const final = await new Engine(f.store, f.id, provider).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(orientations, 2);
  const obsolete = final.nodes.find((n) => n.id === rejected.id)!;
  assert.equal(obsolete.status, 'SKIPPED');
  assert.equal(obsolete.supersededBy, final.direction!.nodeId);
  assert.match(obsolete.error!, /self dependency/);
  assert(final.criteria.every((c) => c.status === 'PASSED'));
  assert.equal(final.projectReviews!.at(-1)!.outcome, 'ready');
  assert.deepEqual(final.contract, f.contract);
  assert.deepEqual(project(f.store.events(f.id)), final);
});
