import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Engine } from '../src/core/engine.js';
import { project } from '../src/core/model.js';
import { brief } from '../src/core/brief.js';
import { activeNotes } from '../src/core/compass.js';
import { validateProjectReview, type ProjectReviewProposal } from '../src/core/supervision.js';
import { stamp } from '../src/core/workspace.js';
import { addDirectionNote, resumeRun, auditStoredEvidence } from '../src/service.js';
import type { AgentRequest } from '../src/providers/provider.js';
import { fixture } from './helpers.js';

const built = {
  summary: 'TEST FIXTURE implementation; runtime checks remain authoritative.',
  blocked: false,
  reason: '',
};
const plan = {
  tasks: [
    {
      title: 'Build avatar behavior',
      objective: 'Handle missing names and make the second avatar reply.',
      criterionId: 'render',
    },
  ],
};
const ready: ProjectReviewProposal = {
  outcome: 'ready',
  summary: 'TEST FIXTURE: the inspected goal is ready for operator review.',
  findings: [],
  decisions: [],
  tasks: [],
  operatorQuestion: '',
};
function gap(r: AgentRequest): ProjectReviewProposal {
  return {
    outcome: 'continue',
    summary: 'TEST FIXTURE: checks pass but the requested reusable summary is missing.',
    findings: [
      {
        id: 'summary',
        gap: 'The goal requires an exported reviewSummary function; avatar.mjs only has labels and dialogue.',
        files: ['avatar.mjs'],
        evidenceIds: r.state.evidence.filter((e) => e.status === 'passed').map((e) => e.id),
      },
    ],
    decisions: [
      {
        choice: 'Reuse dialogue formatting in the summary rather than inventing a second format.',
        basis: 'A reversible implementation detail within the approved source file.',
      },
    ],
    tasks: [
      {
        title: 'Expose the missing project summary',
        objective:
          'Add reviewSummary(names) returning dialogue(names). Preserve all existing behavior.',
        criterionId: 'dialogue',
        findingIds: ['summary'],
        waitsFor: [],
      },
    ],
    operatorQuestion: '',
  };
}
async function repair(cwd: string) {
  const path = join(cwd, 'avatar.mjs');
  const s = (await readFile(path, 'utf8'))
    .replace(
      'return name.trim()[0].toUpperCase();',
      "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
    )
    .replace(
      'names.map(name => `${avatarLabel(name)}: Hello!`)',
      'names.map((name, i) => i === 0 ? `${avatarLabel(name)}: Hello!` : `${avatarLabel(name)}: Hi, ${avatarLabel(names[i - 1])}!`)',
    );
  await writeFile(path, s);
}
async function addSummary(cwd: string) {
  const path = join(cwd, 'avatar.mjs');
  await writeFile(
    path,
    (await readFile(path, 'utf8')) +
      '\nexport function reviewSummary(names) { return dialogue(names); }\n',
  );
}

test('after green gates, project supervision discovers and implements missing goal work without a new operator prompt', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
    c.goal += ' Also expose a reusable reviewSummary(names) function.';
  });
  const calls: string[] = [];
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      calls.push(r.mode);
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        assert(r.state.criteria.every((c) => c.status === 'PASSED'));
        return r.state.projectReviews?.length ? ready : gap(r);
      }
      assert.equal(r.mode, 'build');
      if (r.node.discoveredBy) await addSummary(r.state.worktree);
      else await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.deepEqual(calls, ['plan', 'build', 'oversee', 'build', 'oversee']);
  assert.equal(final.notes, undefined, 'no queue or new message supplied the missing task');
  assert.equal(final.projectReviews?.length, 2);
  assert.equal(final.nodes.filter((n) => n.discoveredBy && n.startedAt).length, 1);
  assert.equal(final.contractVersion, 1);
  assert(!f.store.events(f.id).some((e) => e.type === 'task.skipped'));
  const module = await import(pathToFileURL(join(final.worktree, 'avatar.mjs')).href);
  assert.equal(module.reviewSummary(['Ada', 'Bea']), 'A: Hello!\nB: Hi, A!');
  assert.equal(brief(final, f.store.events(f.id)).discoveredTasks.length, 1);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('a project cannot finish just because its old command checks pass when a checkpoint still needs execution', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
    c.limits.maxTurns = 4;
  });
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') return gap(r);
      assert.equal(r.mode, 'build');
      if (r.node.discoveredBy) await addSummary(r.state.worktree);
      else await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.match(final.reason!, /turn limit/);
  assert(final.criteria.every((c) => c.status === 'PASSED'));
  assert(brief(final, f.store.events(f.id)).attention.some((a) => a.includes('turn limit')));
  assert.throws(
    () => f.store.append(f.id, 'workflow.completed', 'green checks are enough'),
    /Acceptance is incomplete/,
  );
});

test('a completed read-only supervisor response survives interruption without a duplicate model turn', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  let reviews = 0;
  const provider = {
    name: 'demo' as const,
    async invoke(r: AgentRequest) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        reviews++;
        return ready;
      }
      assert.equal(r.mode, 'build');
      await repair(r.state.worktree);
      return built;
    },
  };
  const engine = new Engine(f.store, f.id, provider);
  const emit = engine.emit.bind(engine);
  engine.emit = (type, message, data) => {
    const s = emit(type, message, data);
    if (
      type === 'task.completed' &&
      s.nodes.find((n) => n.id === data?.nodeId)?.title === 'Review the project against its goal'
    )
      throw new Error('TEST interruption after durable review response');
    return s;
  };
  assert.equal((await engine.run()).status, 'BLOCKED');
  resumeRun(f.store, f.id);
  const final = await new Engine(f.store, f.id, provider).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(reviews, 1);
  assert.equal(final.projectReviews?.length, 1);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

test('new context during a project review is reconciled and reviewed before completion', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  let reviews = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        reviews++;
        if (reviews === 1)
          addDirectionNote(f.store, f.id, {
            kind: 'decision',
            text: 'Keep the existing API and output format.',
          });
        return ready;
      }
      if (r.mode === 'orient')
        return {
          focus: 'TEST FIXTURE: preserve the existing API.',
          nextArtifact: 'TEST FIXTURE: current verified behavior, with API preserved.',
          assumptions: [],
          notes: activeNotes(r.state).map((n) => ({
            noteId: n.id,
            disposition: 'applied',
            reason: 'TEST FIXTURE: preserve the existing behavior.',
            criterionIds: ['render', 'dialogue'],
          })),
          tasks: [],
        };
      assert.equal(r.mode, 'build');
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(reviews, 2);
  assert.equal(final.projectReviews?.at(-1)?.noteIds.length, 1);
});

test('project review and no-progress limits stop repeated work with an explicit incomplete result', async (t) => {
  for (const noProgress of [false, true]) {
    const f = await fixture(t, (c) => {
      c.supervision = { mode: 'project', maxReviews: 1 };
      if (noProgress) {
        c.supervision.maxReviews = 5;
        c.criteria.forEach((c) => (c.command = ['node', '--version']));
      }
    });
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan') return plan;
        if (r.mode === 'oversee') return gap(r);
        assert.equal(r.mode, 'build');
        if (!noProgress) {
          if (r.node.discoveredBy) await addSummary(r.state.worktree);
          else await repair(r.state.worktree);
        }
        return built;
      },
    }).run();
    assert.equal(final.status, 'BLOCKED');
    assert.match(final.reason!, noProgress ? /no-progress/ : /review limit/);
  }
});

test('project findings cannot invent files/evidence, bypass held criteria, introduce cycles or use empty continuation', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  const code = await stamp(f.state.worktree);
  const proposal = gap({ state: f.state } as AgentRequest);
  assert.throws(
    () =>
      validateProjectReview(
        f.state,
        { ...proposal, findings: [{ ...proposal.findings[0], files: ['invented.mjs'] }] },
        code,
      ),
    /actual recorded/,
  );
  assert.throws(
    () =>
      validateProjectReview(
        f.state,
        { ...proposal, findings: [{ ...proposal.findings[0], evidenceIds: ['invented'] }] },
        code,
      ),
    /actual recorded/,
  );
  assert.throws(
    () => validateProjectReview(f.state, { ...proposal, tasks: [] }, code),
    /concrete work/,
  );
  assert.throws(
    () =>
      validateProjectReview(
        f.state,
        { ...proposal, tasks: [{ ...proposal.tasks[0], criterionId: 'invented' }] },
        code,
      ),
    /unheld approved/,
  );
  assert.throws(
    () =>
      validateProjectReview(
        f.state,
        {
          ...proposal,
          tasks: [
            { ...proposal.tasks[0], waitsFor: ['render'] },
            { ...proposal.tasks[0], criterionId: 'render', waitsFor: ['dialogue'] },
          ],
        },
        code,
      ),
    /cycle/,
  );
});

test('a read-only project reviewer changing source cannot certify the altered result', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        await addSummary(r.state.worktree);
        return ready;
      }
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.match(final.reason!, /changed during read-only/);
  assert.equal(final.projectReviews, undefined);
  assert(final.evidence.some((e) => e.status === 'stale'));
});

test('a whole-project change outside command scopes invalidates ready status without falsifying still-current regression proofs', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') return ready;
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  await writeFile(
    join(final.worktree, 'README.md'),
    'Operator added a new project artifact outside the test scopes.',
  );
  await auditStoredEvidence(f.store, f.id);
  const changed = f.store.get(f.id);
  assert.equal(changed.status, 'PARTIAL');
  assert(changed.projectReviews?.at(-1)?.invalidatedReason);
  assert(
    changed.criteria.every((c) => c.status === 'PASSED'),
    'unchanged regression proofs remain honest',
  );
  assert.deepEqual(project(f.store.events(f.id)), changed);
});

test('a rejected project review is corrected within the original limits without activating its invented work', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
    c.limits.maxAttempts = 2;
  });
  let reviews = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        reviews++;
        r.onUsage(7);
        if (reviews === 1) {
          const p = gap(r);
          p.findings[0].files = ['invented.mjs'];
          return p;
        }
        assert.match(r.failure!, /actual recorded files and known evidence/);
        return ready;
      }
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert.equal(reviews, 2);
  assert.equal(final.tokens, 14);
  assert.equal(final.projectReviews?.length, 1);
  assert(!final.nodes.some((n) => n.discoveredBy), 'invalid review supplied no executable work');
  assert.equal(f.store.events(f.id).filter((e) => e.type === 'project.review.rejected').length, 1);
  assert.equal(brief(final, f.store.events(f.id)).projectReviewRejections.length, 1);
  assert.deepEqual(project(f.store.events(f.id)), final);
});

for (const invalid of ['evidence', 'shape']) {
  test(`a project review can repair invalid ${invalid} while preserving the rejected response`, async (t) => {
    const f = await fixture(t, (c) => {
      c.supervision = { mode: 'project', maxReviews: 5 };
    });
    let reviews = 0;
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan') return plan;
        if (r.mode === 'oversee') {
          if (++reviews > 1) {
            assert(r.failure);
            return ready;
          }
          if (invalid === 'shape') return { outcome: 'ready' };
          const p = gap(r);
          p.findings[0].evidenceIds = ['invented-proof'];
          return p;
        }
        await repair(r.state.worktree);
        return built;
      },
    }).run();
    assert.equal(final.status, 'COMPLETED', final.reason);
    assert.equal(reviews, 2);
    assert.equal(final.nodes.filter((n) => n.result?.reviewRejection).length, 1);
    assert.deepEqual(project(f.store.events(f.id)), final);
  });
}

test('rejected project reviews remain bounded across explicit resume', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
    c.limits.maxAttempts = 2;
  });
  let reviews = 0;
  const provider = {
    name: 'demo' as const,
    async invoke(r: AgentRequest) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        reviews++;
        const p = gap(r);
        p.findings[0].files = ['invented.mjs'];
        return p;
      }
      await repair(r.state.worktree);
      return built;
    },
  };
  const first = await new Engine(f.store, f.id, provider).run();
  assert.equal(first.status, 'BLOCKED');
  assert.match(first.reason!, /review proposal attempt limit/);
  assert.equal(reviews, 2);
  assert.equal(first.projectReviews, undefined);
  resumeRun(f.store, f.id);
  const again = await new Engine(f.store, f.id, provider).run();
  assert.equal(again.status, 'BLOCKED');
  assert.equal(reviews, 2);
  assert.deepEqual(project(f.store.events(f.id)), again);
});

test('invalid review plus a read-only source mutation blocks instead of requesting a repair', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  let reviews = 0;
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        reviews++;
        await addSummary(r.state.worktree);
        const p = gap(r);
        p.findings[0].files = ['invented.mjs'];
        return p;
      }
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'BLOCKED');
  assert.match(final.reason!, /changed during read-only/);
  assert.equal(reviews, 1);
  assert.equal(final.projectReviews, undefined);
  assert(final.evidence.some((e) => e.status === 'stale'));
});

for (const action of ['pause', 'stop'] as const) {
  test(`${action} after a rejected project review prevents another model call`, async (t) => {
    const f = await fixture(t, (c) => {
      c.supervision = { mode: 'project', maxReviews: 5 };
    });
    let reviews = 0;
    const engine = new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan') return plan;
        if (r.mode === 'oversee') {
          reviews++;
          const p = gap(r);
          p.findings[0].files = ['invented.mjs'];
          return p;
        }
        await repair(r.state.worktree);
        return built;
      },
    });
    const emit = engine.emit.bind(engine);
    engine.emit = (type, message, data) => {
      const result = emit(type, message, data);
      if (type === 'project.review.rejected') engine.request(action);
      return result;
    };
    const final = await engine.run();
    assert.equal(final.status, action === 'pause' ? 'PAUSED' : 'STOPPED');
    assert.equal(reviews, 1);
    assert.deepEqual(project(f.store.events(f.id)), final);
  });
}

for (const budget of ['turns', 'tokens']) {
  test(`project review repair preserves the original ${budget} cap`, async (t) => {
    const f = await fixture(t, (c) => {
      c.supervision = { mode: 'project', maxReviews: 5 };
      if (budget === 'turns') c.limits.maxTurns = 3;
      else c.limits.maxTokens = 5;
    });
    let reviews = 0;
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan') return plan;
        if (r.mode === 'oversee') {
          reviews++;
          if (budget === 'tokens') r.onUsage(5);
          const p = gap(r);
          p.findings[0].files = ['invented.mjs'];
          return p;
        }
        await repair(r.state.worktree);
        return built;
      },
    }).run();
    assert.equal(final.status, 'BLOCKED');
    assert.match(final.reason!, budget === 'turns' ? /turn limit/ : /token budget/);
    assert.equal(reviews, 1);
  });
}

test('a valid project review cannot be forged into a rejection receipt', async (t) => {
  const f = await fixture(t, (c) => {
    c.supervision = { mode: 'project', maxReviews: 5 };
  });
  const final = await new Engine(f.store, f.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan') return plan;
      if (r.mode === 'oversee') {
        const code = await stamp(r.state.worktree);
        const context = JSON.parse(r.node.objective);
        assert.throws(
          () =>
            f.store.append(f.id, 'project.review.rejected', 'Forged rejection', {
              nodeId: r.node.id,
              proposal: ready,
              stamp: code,
              noteIds: context.noteIds,
              directionRevision: context.directionRevision,
              reason: 'invented failure',
            }),
          /Only an invalid project review/,
        );
        return ready;
      }
      await repair(r.state.worktree);
      return built;
    },
  }).run();
  assert.equal(final.status, 'COMPLETED', final.reason);
  assert(!f.store.events(f.id).some((e) => e.type === 'project.review.rejected'));
});
