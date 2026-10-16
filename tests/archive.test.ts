import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { project } from '../src/core/model.js';
import { brief } from '../src/core/brief.js';

test('the archived real-Codex ledger replays offline and supports its published acceptance claim', async () => {
  const recorded = JSON.parse(
    await readFile(new URL('../docs/validation/codex-real.json', import.meta.url), 'utf8'),
  );
  const state = project(recorded.events);
  assert.equal(state.provider, 'codex');
  assert.equal(state.status, 'COMPLETED');
  assert.equal(state.tokens, recorded.result.resources.reportedTokens);
  assert.equal(brief(state, recorded.events).verified, 2);
  assert(recorded.events.some((e: { type: string }) => e.type === 'corrective.inserted'));
  assert(
    state.evidence
      .filter((e) => e.status === 'passed')
      .every((e) => e.exitCode === 0 && e.stamp.fingerprint),
  );
});
