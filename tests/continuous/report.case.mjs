import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reportFixture } from './fixture.mjs';
test('portable project report is authenticated, script-free, escaped and tied to real checkpoint provenance', async () => {
  const f = await reportFixture();
  try {
    const path = '/api/delegations/' + f.completed.id + '/report';
    assert.equal((await fetch(f.baseUrl + path)).status, 403);
    const response = await fetch(f.baseUrl + path, { headers: { 'X-Iterfox-Token': f.token } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(response.headers.get('content-disposition'), /attachment/);
    const html = await response.text();
    assert(html.includes(f.completed.stages[0].checkpoint.head));
    assert(html.includes(f.completed.stages[1].checkpoint.head));
    assert.match(html, /review|revisione/i);
    assert(!/<script[\s>]/i.test(html));
    assert(!/<(?:iframe|object|embed)[\s>]/i.test(html));
    assert(!/<(?:link|img)[^>]+(?:href|src)=["']https?:/i.test(html));
    const { renderDelegationReport } = await import('../../src/delegations/export.ts');
    const { buildDelegationBrief } = await import('../../src/delegations/brief.ts');
    const brief = await buildDelegationBrief(f.runs, f.completed.id);
    const malicious = renderDelegationReport({
      ...brief,
      goal: '<script>globalThis.pwned=true</script> & "text"',
    });
    assert(!/<script[\s>]/i.test(malicious));
    assert(malicious.includes('&lt;script&gt;'));
    assert(malicious.includes('&amp;'));
    const before = f.runs.list().map((r) => r.seq);
    await fetch(f.baseUrl + path, { headers: { 'X-Iterfox-Token': f.token } });
    assert.deepEqual(
      f.runs.list().map((r) => r.seq),
      before,
    );
  } finally {
    await f.close();
  }
});
