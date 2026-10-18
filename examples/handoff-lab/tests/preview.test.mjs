import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildEdition } from '../src/edition.mjs';
import { renderEdition } from '../src/preview.mjs';
test('preview exposes the edition, sources and dialogue in a standalone responsive document', () => {
  const e = buildEdition();
  const html = renderEdition(e);
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<meta[^>]+name=["']viewport["']/i);
  assert.match(html, /<main[\s>]/i);
  assert.match(html, /<style[\s>]/i);
  assert(html.includes(e.title));
  for (const s of e.stories) assert(html.includes(s.id));
  assert(html.includes('Mira') && html.includes('Rowan'));
  assert.match(html, /fictional|prototype/i);
  const attack = renderEdition({ ...e, title: '<script>alert(1)</script>' });
  assert(!attack.includes('<script>alert(1)</script>'), 'operator content is escaped');
});
