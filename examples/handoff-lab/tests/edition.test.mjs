import { test } from 'node:test';
import assert from 'node:assert/strict';
import sources from '../sources.json' with { type: 'json' };
import { buildEdition } from '../src/edition.mjs';
test('edition is a complete bounded text prototype based on the supplied fictional sources', () => {
  const e = buildEdition();
  assert(e.title.length >= 5);
  assert(e.durationSeconds >= 120 && e.durationSeconds <= 240);
  assert.equal(e.stories.length, 3);
  assert.deepEqual(e.stories.map((s) => s.id).sort(), sources.map((s) => s.id).sort());
  for (const s of e.stories)
    for (const field of ['headline', 'whyItMatters', 'whatChanged', 'uncertainty'])
      assert(typeof s[field] === 'string' && s[field].length >= 20, `${s.id}.${field}`);
  assert(e.dialogue.length >= 6 && e.dialogue.length <= 12);
  for (const turn of e.dialogue) {
    assert(['Mira', 'Rowan'].includes(turn.speaker));
    assert(turn.text.length >= 20);
  }
  assert(new Set(e.dialogue.map((t) => t.speaker)).size === 2);
});
