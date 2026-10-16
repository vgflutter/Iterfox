import { test, expect } from '@playwright/test';

test('the graph, ledger, refresh, replay and brief all reflect the same durable workflow', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Follow the work.' })).toBeVisible();
  await expect(page.getByText('DEMO RUN · DETERMINISTIC FIXTURE')).toBeVisible();
  const runs = await (await request.get('/api/runs')).json();
  const state = runs[0];
  await expect(page.locator('.react-flow__node')).toHaveCount(
    state.nodes.length + state.criteria.length,
  );
  await expect(page.locator('.run-controls')).toContainText('COMPLETED');
  await page.reload();
  await expect(page.locator('.react-flow__node')).toHaveCount(
    state.nodes.length + state.criteria.length,
  );
  await page.getByRole('button', { name: 'Morning Brief' }).click();
  await expect(
    page.getByRole('heading', { name: 'The goal is backed by evidence.' }),
  ).toBeVisible();
  await expect(page.locator('.brief-view')).toContainText('Evidence is STALE');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Export brief' }).click();
  expect((await download).suggestedFilename()).toMatch(/\.md$/);
  await page.getByRole('button', { name: 'Proof Ledger' }).click();
  await expect(page.locator('.evidence-card')).toHaveCount(state.evidence.length);
  await expect(page.locator('.evidence-grid')).toContainText('FAILED');
  await page.getByRole('button', { name: 'Decision history' }).click();
  await expect(page.locator('.timeline li')).toHaveCount(state.seq);
  await page
    .locator('.timeline li')
    .filter({ hasText: 'verification.failed' })
    .getByRole('button')
    .click();
  await expect(page.locator('.replay-tag')).toBeVisible();
  await expect(page.locator('.run-controls')).toContainText('RUNNING');
  await expect(page.locator('.trail-node.failed:not(.acceptance)')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Pause', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: '● Live', exact: true }).click();
  await expect(page.locator('.run-controls')).toContainText('COMPLETED');
  await page
    .getByRole('combobox', { name: 'Filter acceptance criterion' })
    .selectOption('dialogue');
  await expect(page.locator('.trail-node.acceptance')).toHaveCount(1);
  await page.locator('.trail-node.acceptance').click();
  await expect(page.locator('.detail-panel')).toContainText('File fingerprint');
  expect(errors).toEqual([]);
});

test('mobile layout, reduced motion, and explicit Night Run preflight are usable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Follow the work.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.getByRole('button', { name: 'New run', exact: false }).click();
  await expect(page.getByRole('dialog', { name: 'Night Run preflight' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Authorize & start Night Run' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close preflight' }).click();
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(
    true,
  );
});
