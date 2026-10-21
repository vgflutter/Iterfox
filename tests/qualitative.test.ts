import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Engine } from '../src/core/engine.js';
import { DemoProvider } from '../src/providers/demo.js';
import type { AgentProvider } from '../src/providers/provider.js';
import { project, assessmentSufficient } from '../src/core/model.js';
import { readArtifact, artifactRoot } from '../src/core/artifacts.js';
import { brief, markdownBrief } from '../src/core/brief.js';
import { fixture } from './helpers.js';

async function setup(t: Parameters<typeof fixture>[0], outcome: string = 'sufficient', score = 4) {
  const f = await fixture(t, (c) => {
    c.criteria = [
      {
        ...c.criteria[0],
        timeoutMs: 30000,
        verification: {
          kind: 'qualitative',
          rubric: [
            { id: 'clear', description: 'Missing avatar names are handled clearly.', minScore: 4 },
          ],
          files: ['avatar.mjs'],
          instructions: 'Only assess supplied code.',
        },
      },
    ];
  });
  const demo = new DemoProvider();
  const provider: AgentProvider = {
    name: 'demo',
    async invoke(r) {
      if (r.mode !== 'assess') return demo.invoke(r);
      assert(r.assessmentInput?.text.includes('avatar.mjs'));
      r.onUsage(7);
      return {
        outcome,
        ratings: [
          {
            id: 'clear',
            score,
            explanation: 'TEST FIXTURE: normalization uses an explicit fallback.',
          },
        ],
        summary: 'TEST FIXTURE assessment, not a real model judgment.',
        limitations: ['This is a deterministic assessor fixture.'],
      };
    },
  };
  return { ...f, provider };
}
test('qualitative receipt is ASSESSED, never deterministic PASS; replay and brief preserve provenance', async (t) => {
  const f = await setup(t);
  const state = await new Engine(f.store, f.id, f.provider).run();
  assert.equal(state.status, 'COMPLETED', state.reason);
  assert.equal(state.criteria[0].status, 'ASSESSED');
  const final = state.evidence.find((e) => e.status === 'assessed')!;
  assert.equal(final.kind, 'ai-assessed');
  assert.equal(final.assessment?.independent, false);
  assert.equal(final.assessment?.reviewer, 'demo');
  assert(state.evidence.some((e) => e.kind === 'observed'));
  assert(!f.store.events(f.id).some((e) => e.type === 'verification.passed'));
  assert.deepEqual(project(f.store.events(f.id)), state);
  assert.equal(brief(state, []).verified, 0);
  assert.equal(brief(state, []).assessed, 1);
  assert.equal(brief(state, []).open, 0);
  assert.match(markdownBrief(state, []), /not independent review/);
  assert.equal(state.turns, 3);
  assert.equal(state.tokens, 7);
  for (const a of final.artifacts!)
    assert((await readArtifact(artifactRoot(f.store.path), a)).length > 0);
  await writeFile(join(f.state.worktree, 'avatar.mjs'), 'changed after assessment');
  await new Engine(f.store, f.id, f.provider).refreshEvidence();
  assert.equal(f.store.get(f.id).criteria[0].status, 'STALE');
});
test('uncertainty blocks and retains the assessor report instead of certifying acceptance', async (t) => {
  const f = await setup(t, 'uncertain');
  const state = await new Engine(f.store, f.id, f.provider).run();
  assert.equal(state.status, 'BLOCKED');
  assert.match(state.reason!, /uncertain/);
  assert(state.evidence.some((e) => e.kind === 'ai-assessed' && e.status === 'unverified'));
  assert(!state.criteria.some((c) => c.status === 'ASSESSED' || c.status === 'PASSED'));
});
test('runtime rubric thresholds reject a sufficient claim with low scores, unknown IDs or a deterministic pass', async (t) => {
  const f = await setup(t);
  const state = await new Engine(f.store, f.id, f.provider).run();
  const final = state.evidence.find((e) => e.status === 'assessed')!;
  assert(
    !assessmentSufficient(
      { ...final.assessment!, ratings: [{ id: 'clear', score: 3, explanation: 'Too low' }] },
      state.contract.criteria[0],
    ),
  );
  assert(
    !assessmentSufficient(
      {
        ...final.assessment!,
        ratings: [{ id: 'invented', score: 5, explanation: 'Wrong rubric' }],
      },
      state.contract.criteria[0],
    ),
  );
  const events = f.store.events(f.id);
  const i = events.findIndex((e) => e.type === 'verification.assessed');
  const forged = structuredClone(events.slice(0, i + 1));
  forged[i].type = 'verification.passed';
  assert.throws(() => project(forged), /cannot become deterministic/);
  const badCheck = structuredClone(events.slice(0, i + 1));
  (badCheck[i].data.evidence as { exitCode: number }).exitCode = 1;
  assert.throws(() => project(badCheck), /does not satisfy/);
  const g = await setup(t, 'sufficient', 3);
  const failed = await new Engine(g.store, g.id, g.provider).run();
  assert.equal(failed.status, 'BLOCKED');
  assert.equal(failed.evidence.filter((e) => e.status === 'failed').length, 3); // maxAttempts defaults to 3
  assert(failed.nodes.some((n) => n.reason.startsWith('Corrective')));
});
test('missing or tampered evidence artifacts invalidate an otherwise current assessment', async (t) => {
  const f = await setup(t);
  await new Engine(f.store, f.id, f.provider).run();
  const a = f.store.get(f.id).evidence.find((e) => e.status === 'assessed')!.artifacts![0];
  await writeFile(join(artifactRoot(f.store.path), a.path), 'tampered');
  await new Engine(f.store, f.id, f.provider).refreshEvidence();
  assert.equal(f.store.get(f.id).status, 'PARTIAL');
  assert.equal(f.store.get(f.id).criteria[0].status, 'STALE');
});
