import { test } from 'node:test';
import assert from 'node:assert/strict';
import { avatarLabel } from './avatar.mjs';
test('avatar rendering handles empty and missing names', () => {
  assert.equal(avatarLabel(' Ada '), 'A');
  assert.equal(avatarLabel(''), '?');
  assert.equal(avatarLabel(undefined), '?');
});
