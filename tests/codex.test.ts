import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Engine } from '../src/core/engine.js';
import { CodexProvider } from '../src/providers/codex.js';
import { brief } from '../src/core/brief.js';
import { fixture } from './helpers.js';

test(
  'REAL Codex SDK: structured plan, worktree edits, runtime verification and adaptive correction',
  {
    skip:
      process.env.ITERFOX_REAL_CODEX !== '1'
        ? 'Opt in with npm run test:codex; requires Codex authentication and network.'
        : false,
    timeout: 600_000,
  },
  async (t) => {
    const f = await fixture(
      t,
      (c) => {
        c.goal =
          'Start with one read-only inspection task for avatar normalization: inspect avatar.mjs without editing it. Let the runtime record the failing check first. Then repair failing avatar and dialogue checks using their evidence. Preserve all tests and config.';
        c.limits.maxDurationMs = 580_000;
        c.limits.turnTimeoutMs = 150_000;
        c.limits.maxTokens = 500_000;
      },
      'codex',
    );
    const started = Date.now();
    const state = await new Engine(
      f.store,
      f.id,
      new CodexProvider({
        codexPath: process.env.ITERFOX_CODEX_PATH,
        model: process.env.ITERFOX_MODEL,
      }),
    ).run();
    const events = f.store.events(f.id);
    if (process.env.ITERFOX_VALIDATION_OUT)
      await writeFile(
        resolve(process.env.ITERFOX_VALIDATION_OUT),
        JSON.stringify(
          {
            measuredAt: new Date().toISOString(),
            elapsedMs: Date.now() - started,
            sdk: '0.163.0',
            result: brief(state, events),
            events,
          },
          null,
          2,
        ),
        { mode: 0o600 },
      );
    assert.equal(state.provider, 'codex');
    assert.equal(state.status, 'COMPLETED', state.reason);
    assert(
      state.nodes.some((n) => n.threadId),
      'actual SDK session ID persisted',
    );
    assert(state.tokens > 0, 'actual usage event received');
    assert(state.evidence.every((e) => e.kind === 'deterministic' && e.command));
    assert.equal(state.criteria.filter((c) => c.status === 'PASSED').length, 2);
    assert(
      events.some((e) => e.type === 'verification.failed'),
      'real runtime failure, not a scripted model decision',
    );
    assert(
      events.some((e) => e.type === 'corrective.inserted'),
      'real diagnosis changed the execution graph',
    );
  },
);
