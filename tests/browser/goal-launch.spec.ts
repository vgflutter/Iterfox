import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import type { Proposal } from '../../src/proposals/model.js';
import type { ProposalJob } from '../../src/shared/launch.js';

// Explicit UI-state fixtures. These tests neither call a model nor launch a worker;
// the separately recorded live probes cover those integrations.
function draft(repository: string, goal: string): ProposalJob {
  const id = randomUUID();
  const now = new Date().toISOString();
  const progress = { stage: 'collecting' as const, message: 'Explicit browser-state fixture' };
  const head = 'a'.repeat(40);
  const proposal: Proposal = {
    id,
    status: 'draft',
    provider: 'codex',
    originalGoal: goal,
    inputKey: 'fixture',
    createdAt: now,
    repository,
    head,
    snapshot: {
      repository,
      head,
      capturedAt: now,
      trackedEntries: 0,
      tree: [],
      treeTruncated: false,
      files: [],
      omissions: [],
      notices: ['Synthetic browser fixture, not repository evidence.'],
    },
    draft: {
      goal,
      criteria: [
        {
          id: 'regression',
          title: 'Explicit UI fixture check',
          command: ['node', '--version'],
          scope: [],
          timeoutMs: 60000,
          sources: [],
          rationale: 'Synthetic state fixture; no program is executed.',
          gap: null,
        },
      ],
      allowedPaths: ['src'],
      protectedPaths: ['tests'],
      supervision: { mode: 'project', maxReviews: 3 },
      limits: {
        maxDurationMs: 28800000,
        maxTurns: 150,
        maxAttempts: 3,
        maxTokens: 100000000,
        turnTimeoutMs: 600000,
        maxNoProgress: 2,
      },
      observations: [],
      assumptions: ['This is an explicit browser fixture, not a real model response.'],
    },
    observations: [],
    checkStatus: 'not-run',
    authorizationRequired: true,
    usage: { inputTokens: 0, outputTokens: 0 },
    notices: ['Explicit browser fixture.'],
  };
  return {
    id,
    request: { repository, goal },
    status: 'ready',
    createdAt: now,
    updatedAt: now,
    expiresAt: new Date(Date.now() + 1800000).toISOString(),
    timeoutMs: 180000,
    progress,
    history: [{ ...progress, at: now }],
    proposal,
  };
}

test('late draft IDs are cancelled, edits invalidate review, and no UI-state fixture authorizes a run', async ({
  page,
}) => {
  const jobs = new Map<string, ProposalJob>();
  const cancelled: string[] = [];
  let posts = 0;
  let launches = 0;
  let releaseFirst!: () => void;
  let notifyFirst!: () => void;
  const firstSeen = new Promise<void>((resolve) => {
    notifyFirst = resolve;
  });
  const released = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  await page.route('**/api/proposals', async (route) => {
    const input = route.request().postDataJSON() as { repository: string; goal: string };
    const job = draft(input.repository, input.goal);
    jobs.set(job.id, job);
    if (++posts === 1) {
      notifyFirst();
      await released;
    }
    await route.fulfill({ status: 202, json: { ...job, status: 'drafting', proposal: undefined } });
  });
  await page.route('**/api/proposals/**', async (route) => {
    expect(route.request().headers()['x-iterfox-token']).toBeTruthy();
    const parts = new URL(route.request().url()).pathname.split('/');
    const job = jobs.get(parts[3])!;
    expect(job).toBeTruthy();
    if (parts[4] === 'cancel') {
      cancelled.push(job.id);
      await route.fulfill({ json: { ...job, status: 'cancelled', proposal: undefined } });
    } else await route.fulfill({ json: job });
  });
  await page.route('**/api/preflight', async (route) => {
    const input = route.request().postDataJSON();
    await route.fulfill({
      json: {
        repository: input.repository,
        sourceBranch: 'fixture',
        runBranch: 'iterfox/<fixture>',
        head: 'a'.repeat(40),
        dirty: false,
        provider: 'codex',
        contract: input.contract,
        permissions: [],
        requiresOperator: [],
        limits: input.contract.limits,
        notes: [],
        authorization: {
          id: randomUUID(),
          proposalId: input.proposalId,
          expiresAt: new Date(Date.now() + 600000).toISOString(),
        },
      },
    });
  });
  await page.route('**/api/runs', async (route) => {
    if (route.request().method() === 'POST') {
      launches++;
      await route.abort();
    } else await route.continue();
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'New run', exact: true }).click();
  await page.getByLabel('Repository root', { exact: true }).fill('/fixture/project');
  const goal = page.getByLabel(/Desired result/);
  await goal.fill('First explicit UI fixture goal.');
  await page.getByRole('button', { name: /Generate draft with Codex/ }).click();
  await firstSeen;
  await goal.fill('Revised goal while the first request is pending.');
  releaseFirst();
  await expect.poll(() => cancelled.length).toBe(1);
  await expect(
    page.getByRole('heading', { name: 'Review and edit the proposed work' }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: /Generate.*draft/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Review and edit the proposed work' }),
  ).toBeVisible();
  await page.getByRole('button', { name: /Review preflight/ }).click();
  await expect(page.getByRole('button', { name: /Authorize & start Night Run/ })).toBeVisible();
  await page
    .getByLabel(/^Proposed goal/)
    .fill('A changed proposal needs a new reviewed authorization.');
  await expect(page.getByRole('button', { name: /Authorize & start Night Run/ })).toHaveCount(0);
  await page.getByLabel(/Exact command argv/).fill('["node","--help"]');
  await expect(
    page.getByText('Operator-supplied command · source grounding unverified · not run.', {
      exact: true,
    }),
  ).toBeVisible();
  await goal.fill('Changing the original goal discards the whole proposal.');
  await expect(
    page.getByRole('heading', { name: 'Review and edit the proposed work' }),
  ).toHaveCount(0);
  expect(launches).toBe(0);
});

test('mobile uncertain-launch recovery keeps inputs and opens existing runs without reauthorizing', async ({
  page,
  request,
}) => {
  const runs = await (await request.get('/api/runs')).json();
  const existing = runs[0];
  let launches = 0;
  await page.route('**/api/runs', async (route) => {
    if (route.request().method() === 'POST') {
      launches++;
      await route.abort('failed');
    } else await route.continue();
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'New run', exact: true }).click();
  await page.getByRole('button', { name: 'From a configuration file', exact: true }).click();
  await page.getByLabel('Repository root', { exact: true }).fill(existing.repository);
  const config = existing.repository + '/iterfox.json';
  await page.getByPlaceholder('/absolute/path/to/iterfox.json', { exact: true }).fill(config);
  await page.getByRole('button', { name: /Review preflight/ }).click();
  await page.getByRole('button', { name: /Authorize & start Night Run/ }).click();
  const recovery = page.getByRole('region', { name: 'Launch recovery', exact: true });
  await expect(recovery).toBeVisible();
  await page.getByRole('button', { name: 'Refresh and inspect runs', exact: true }).click();
  await expect(recovery.getByRole('button', { name: new RegExp(existing.id) })).toBeVisible();
  await expect(
    page.getByPlaceholder('/absolute/path/to/iterfox.json', { exact: true }),
  ).toHaveValue(config);
  await recovery.getByRole('button', { name: new RegExp(existing.id) }).click();
  await expect(page.getByRole('dialog', { name: 'Night Run preflight' })).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Return to launch recovery', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Browse runs', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Existing runs', exact: true })).toBeVisible();
  expect(launches).toBe(1);
});
