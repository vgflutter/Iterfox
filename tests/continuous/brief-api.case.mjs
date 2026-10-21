import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reportFixture } from './fixture.mjs';
test('project brief derives actual cross-mission results without invoking work or altering history', async () => {
  const f = await reportFixture();
  try {
    const { buildDelegationBrief, renderDelegationBriefMarkdown } =
      await import('../../src/delegations/brief.ts');
    const counts = f.runs.list().map((r) => [r.id, r.seq]);
    const revision = f.store.get(f.completed.id).revision;
    const calls = f.modelCalls;
    const brief = await buildDelegationBrief(f.runs, f.completed.id);
    assert.equal(brief.schemaVersion, 1);
    assert.equal(brief.delegationId, f.completed.id);
    assert.equal(brief.goal, f.completed.spec.contract.goal);
    assert.equal(brief.status, 'COMPLETED');
    assert.equal(brief.completedOutcomeCount, 2);
    assert.equal(brief.pendingOutcomeCount, 0);
    assert.equal(brief.requiresProductReview, true);
    assert.deepEqual(brief.limits, f.completed.spec.contract.limits);
    assert.equal(brief.outcomes.length, 2);
    for (const stage of f.completed.stages) {
      const row = brief.outcomes.find((x) => x.id === stage.id);
      assert.equal(row.runId, stage.runId);
      assert.equal(row.checkpoint.head, stage.checkpoint.head);
      assert.equal(row.checkpoint.sourceFingerprint, stage.checkpoint.sourceFingerprint);
      assert(row.criteria.length > 0);
      assert(row.criteria.every((c) => c.status === 'PASSED'));
    }
    assert.match(brief.evidenceBoundary, /historical|checkpoint|fresh/i);
    assert(brief.usage.turns > 0);
    assert.equal(
      brief.usage.tokens,
      f.runs.list().reduce((n, r) => n + r.tokens, 0),
    );
    assert.equal(
      brief.usage.turns,
      f.runs.list().reduce((n, r) => n + r.turns, 0),
    );
    const md = renderDelegationBriefMarkdown(brief);
    assert.equal(typeof md, 'string');
    assert(md.includes(brief.goal));
    assert(md.includes(f.completed.stages[1].checkpoint.head));
    assert.match(md, /review|revisione/i);
    assert.deepEqual(
      f.runs.list().map((r) => [r.id, r.seq]),
      counts,
    );
    assert.equal(f.store.get(f.completed.id).revision, revision);
    assert.equal(f.modelCalls, calls);
  } finally {
    await f.close();
  }
});
test('authenticated JSON and Markdown exports preserve boundaries and show a real blocked reason', async () => {
  const f = await reportFixture();
  try {
    const path = '/api/delegations/' + f.completed.id + '/brief';
    assert.equal((await fetch(f.baseUrl + path)).status, 403);
    const headers = { 'X-Iterfox-Token': f.token };
    let response = await fetch(f.baseUrl + path, { headers });
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.delegationId, f.completed.id);
    response = await fetch(f.baseUrl + path + '?format=markdown', { headers });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/markdown/);
    assert((await response.text()).includes(f.completed.stages[0].checkpoint.head));
    f.store.change(f.completed.id, (d) => {
      d.status = 'BLOCKED';
      d.reason = 'Operator must choose the destination before continuing.';
    });
    response = await fetch(f.baseUrl + path, { headers });
    const blocked = await response.json();
    assert.equal(blocked.status, 'BLOCKED');
    assert(blocked.attention.some((a) => a.text.includes('Operator must choose the destination')));
  } finally {
    await f.close();
  }
});
