import { test } from 'node:test';
import assert from 'node:assert/strict';
import { productName, renderLanding } from '../src/landing.mjs';
test('landing uses the chosen name and describes the prototype honestly', () => {
  assert(typeof productName === 'string' && productName.length >= 3 && productName.length <= 40);
  const html = renderLanding();
  assert(html.includes(productName));
  assert.match(html, /prototype/i);
  assert.match(html, /fictional/i);
  assert(!/https?:\/\//i.test(html), 'local preview only, no live external actions');
});
