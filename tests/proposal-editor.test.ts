import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editDuration, durationMilliseconds, formatDuration } from '../src/ui/proposal-editor.js';

const bounds = { min: 0, max: 604_800_000 };

test('editing a work window preserves the approved duration, including fractional seconds', () => {
  assert.equal(
    durationMilliseconds({ hours: '1', minutes: '30', seconds: '0.125' }, bounds),
    5_400_125,
  );
  assert.deepEqual(editDuration(28_800_001, true), { hours: '8', minutes: '0', seconds: '0.001' });
  assert.equal(formatDuration(28_800_001), '8 h 0.001 s');
  const samples = [0, 1, 999, 1001, 60_001, 3_600_001, bounds.max];
  let seed = 42;
  for (let index = 0; index < 100; index++) {
    seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
    samples.push(seed % (bounds.max + 1));
  }
  for (const value of samples)
    for (const hours of [true, false])
      assert.equal(durationMilliseconds(editDuration(value, hours), bounds), value);
});

test('incomplete, overprecise and out-of-window inputs cannot silently become other limits', () => {
  assert.throws(() => durationMilliseconds({ hours: '', minutes: '0', seconds: '0' }, bounds));
  assert.throws(() => durationMilliseconds({ hours: '0.5', minutes: '0', seconds: '0' }, bounds));
  assert.throws(() =>
    durationMilliseconds({ hours: '0', minutes: '0', seconds: '1.0001' }, bounds),
  );
  assert.throws(() =>
    durationMilliseconds(
      { hours: '0', minutes: '0', seconds: '0.999' },
      { min: 1000, max: bounds.max },
    ),
  );
  assert.throws(() =>
    durationMilliseconds({ hours: '168', minutes: '0', seconds: '0.001' }, bounds),
  );
});
