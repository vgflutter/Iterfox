import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';
import { randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { AddressInfo } from 'node:net';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import { Engine } from '../src/core/engine.js';
import { directionSchema, activeNotes } from '../src/core/compass.js';
import type { RunState } from '../src/core/model.js';
import { auditChanges, git } from '../src/core/workspace.js';
import { CodexProvider } from '../src/providers/codex.js';
import { serve } from '../src/server.js';
import {
  openStore,
  createDemoRepository,
  createRun,
  loadContract,
  controlRun,
} from '../src/service.js';

test(
  'REAL Codex consumes feedback submitted from a selected graph node and verifies the resulting implementation',
  {
    skip: process.env.ITERFOX_REAL_GRAPH !== '1',
    timeout: 930000,
  },
  async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'iterfox-graph-real-'));
    const repository = await createDemoRepository(dir);
    await writeFile(
      join(repository, 'unicode.test.mjs'),
      `import {test} from 'node:test';\nimport assert from 'node:assert/strict';\nimport {avatarLabel} from './avatar.mjs';\ntest('complete Unicode initials',()=>{assert.equal(avatarLabel('😀 Vega'),'😀');assert.equal(avatarLabel('𐐨 user'),'𐐀');});\n`,
    );
    await git(repository, ['add', 'unicode.test.mjs']);
    await git(repository, [
      '-c',
      'user.name=Iterfox Integration',
      '-c',
      'user.email=integration@iterfox.local',
      'commit',
      '-qm',
      'Protected real graph-feedback acceptance',
    ]);
    const contract = await loadContract(join(repository, 'iterfox.json'));
    contract.goal =
      'Deliver robust initial labels and distinct two-presenter dialogue for real user names. Preserve the complete first Unicode code point, including emoji and supplementary-plane letters, uppercase it when applicable and use ? for missing/blank names. Preserve the public API and protected tests.';
    contract.criteria.push({
      id: 'unicode',
      title: 'Complete Unicode initials are preserved',
      command: ['node', '--test', 'unicode.test.mjs'],
      scope: ['avatar.mjs', 'unicode.test.mjs'],
      timeoutMs: 60000,
    });
    contract.protectedPaths.push('unicode.test.mjs');
    contract.supervision = { mode: 'project', maxReviews: 6 };
    contract.limits = {
      maxDurationMs: 900000,
      maxTurns: 24,
      maxTokens: 10000000,
      maxAttempts: 3,
      turnTimeoutMs: 420000,
      maxNoProgress: 3,
    };
    const store = openStore(dir);
    const run = await createRun(store, dir, repository, contract, 'codex');
    const nodeId = randomUUID();
    store.append(
      run.id,
      'task.planned',
      'Explicit initial task fixture for testing the graph input route.',
      {
        node: {
          id: nodeId,
          kind: 'task',
          title: 'Review Unicode avatar initials',
          objective: 'Preserve complete Unicode initials in the selected result.',
          reason:
            'Explicit initial task fixture; subsequent reconciliation, implementation and checks use real Codex.',
          criterionId: 'unicode',
          role: 'builder',
          status: 'PENDING',
          attempt: 1,
          files: [],
          evidenceIds: [],
        },
      },
    );
    controlRun(store, run.id, 'pause');
    const provider = new CodexProvider({
      model: process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol',
      codexPath: process.env.ITERFOX_CODEX_PATH,
    });
    const modes: string[] = [];
    const injectDirectionFault = process.env.ITERFOX_INJECT_DIRECTION_FAULT === '1';
    let faultInjected = false;
    const engine = new Engine(store, run.id, {
      name: 'codex',
      async invoke(request) {
        modes.push(request.mode);
        const reply = await provider.invoke(request);
        if (injectDirectionFault && request.mode === 'orient' && !faultInjected) {
          // Explicit synthetic transport/provider-result fault after an actual
          // SDK response. It is never described as a spontaneous model error.
          const proposal = directionSchema.parse(reply);
          faultInjected = true;
          return {
            ...proposal,
            notes: proposal.notes.map((note, index) =>
              index === 0 ? { ...note, criterionIds: ['not-approved'] } : note,
            ),
          };
        }
        return reply;
      },
    });
    let running: Promise<RunState> | undefined;
    const server = await serve(store, dir, 0, () => {
      assert(!running, 'One explicit resume only.');
      running = engine.run();
      return process.pid;
    });
    const browser = await chromium.launch({
      channel: process.env.ITERFOX_BROWSER_CHANNEL ?? 'chrome',
      headless: true,
      chromiumSandbox: true,
      args: ['--disable-gpu'],
    });
    t.after(async () => {
      if (running && store.get(run.id).status === 'RUNNING') engine.request('stop');
      if (running) await running.catch(() => {});
      await browser.close();
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      store.close();
      await rm(dir, { recursive: true, force: true });
    });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1080 },
      reducedMotion: 'reduce',
    });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${(server.address() as AddressInfo).port}`);
    await page
      .getByRole('button', { name: /Live Trail/ })
      .first()
      .click();
    await page.locator(`.react-flow__node[data-id="${nodeId}"]`).click();
    const steering = page.getByRole('region', { name: 'Steer selected work', exact: true });
    await expect(steering).toBeVisible();
    const message =
      'Prioritize this Unicode-label result: preserve complete code points, including emoji and supplementary letters, then finish independent dialogue work. Keep the approved checks unchanged.';
    await steering.getByLabel('Instruction for selected work', { exact: true }).fill(message);
    await steering.getByRole('button', { name: 'Send instruction', exact: true }).click();
    await expect(steering.getByRole('status')).toContainText(/saved|recorded|salvat/i);
    const paused = store.get(run.id);
    assert.equal(paused.status, 'PAUSED');
    const note = paused.notes!.find((note) => note.text === message)!;
    assert(note);
    assert.deepEqual((note as unknown as { context: unknown }).context, {
      nodeId,
      criterionId: 'unicode',
      contractVersion: 1,
    });
    assert.deepEqual(paused.contract, contract);
    const plannerTarget = activeNotes(paused).find((item) => item.id === note.id)?.target;
    assert(plannerTarget);
    assert.equal(plannerTarget.referenceOnly, true);
    assert.equal(plannerTarget.criterion.id, 'unicode');
    assert.equal(plannerTarget.activity?.id, nodeId);
    assert.equal(plannerTarget.activity?.title, 'Review Unicode avatar initials');
    assert.equal(plannerTarget.activity?.resolved, true);
    assert.equal(running, undefined, 'Saving feedback never launches the worker.');
    const start = Date.now();
    await page.getByRole('button', { name: /Resume/ }).click();
    await expect.poll(() => !!running).toBe(true);
    function completion(): Promise<RunState> {
      assert(running);
      return running;
    }
    const final = await completion();
    assert.equal(final.status, 'COMPLETED', final.reason);
    assert.deepEqual(final.contract, contract);
    if (injectDirectionFault) {
      assert.equal(faultInjected, true);
      assert(
        modes.filter((mode) => mode === 'orient').length >= 2,
        'The injected rejected proposal requires another actual SDK orientation call.',
      );
    }
    assert(final.criteria.every((criterion) => criterion.status === 'PASSED'));
    const handling = final.direction?.notes.find((item) => item.noteId === note.id);
    assert(handling && ['applied', 'deferred'].includes(handling.disposition));
    assert(handling.reason.length > 0, 'The model must account for the actual instruction.');
    assert.equal(
      final.notes!.length,
      1,
      'No follow-up prompt after the submitted graph instruction.',
    );
    assert(modes.includes('orient') && modes.includes('build') && modes.includes('oversee'));
    assert((await auditChanges(final)).every((path) => path === 'avatar.mjs'));
    assert(
      final.nodes.some((node) => node.id === nodeId),
      'The original context target remains in history.',
    );
    assert.deepEqual(errors, []);
    const report = {
      at: new Date().toISOString(),
      status: 'passed',
      model: process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol',
      elapsedMs: Date.now() - start,
      modes,
      context: (note as unknown as { context: unknown }).context,
      finalStatus: final.status,
      feedbackDisposition: handling.disposition,
      feedbackReason: handling.reason,
      verified: final.criteria.length,
      graphInstructions: 1,
      additionalOperatorMessages: 0,
      contractPreserved: isDeepStrictEqual(final.contract, contract),
      faultInjection: {
        enabled: injectDirectionFault,
        injected: faultInjected,
        kind: 'One explicit semantic-reference fault after the first successful real SDK orientation response.',
        realOrientationCalls: modes.filter((mode) => mode === 'orient').length,
      },
      limitations: [
        ...(injectDirectionFault
          ? [
              'The invalid reference is explicitly injected; this is not an observation of a spontaneous model mistake.',
            ]
          : []),
        'Initial task is an explicit fixture. Plan reconciliation, implementation, checks and project review use real Codex.',
        'This exercises the input route and intended behavior; it is not a matched comparison or an overnight reliability trial.',
      ],
    };
    await mkdir(join(process.cwd(), 'dist/qualification'), { recursive: true });
    await writeFile(
      join(process.cwd(), 'dist/qualification/real-graph-integration.json'),
      JSON.stringify(report, null, 2),
    );
    console.log(JSON.stringify(report));
  },
);
