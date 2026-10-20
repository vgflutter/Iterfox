import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dialogue } from './avatar.mjs';
test('conversation has two identifiable, distinct turns', () => {
  assert.equal(dialogue(['Ada', 'Bea']), 'A: Hello!\nB: Hi, A!');
  assert.equal(dialogue(['', 'Ada']), '?: Hello!\nA: Hi, ?!');
});
