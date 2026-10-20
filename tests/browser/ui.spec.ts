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
  await expect(
    page.getByRole('checkbox', { name: 'Develop the project autonomously', exact: false }),
  ).toBeChecked();
  await expect(page.getByRole('button', { name: 'Authorize & start Night Run' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close preflight' }).click();
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(
    true,
  );
});

test('actual screenshot artifacts and explicit qualitative provenance are inspectable on desktop and mobile', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .locator('.run-item')
    .filter({ hasText: 'TEST FIXTURE visual avatar evidence' })
    .click();
  await page.getByRole('button', { name: 'Proof Ledger' }).click();
  const images = page.locator('.evidence-card[open] .artifact-gallery img');
  await expect(images.first()).toBeVisible();
  await expect
    .poll(() =>
      images.evaluateAll((nodes) =>
        nodes.every(
          (n) => (n as HTMLImageElement).complete && (n as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);
  await expect(page.locator('.proof-view')).toContainText('Pixel difference 0.000%');
  await page.screenshot({ path: 'test-results/visual-evidence.png', fullPage: true });
  await page
    .locator('.run-item')
    .filter({ hasText: 'TEST FIXTURE qualitative dialogue assessment' })
    .click();
  await expect(page.locator('.assessment-report')).toContainText('not independent review');
  await expect(page.locator('.assessment-report')).toContainText('TEST FIXTURE');
  await expect(page.locator('.assessment-report th')).toContainText([
    'Rubric',
    'Score / 5',
    'Required',
    'Evidence',
  ]);
  await expect(page.locator('.proof-view')).toContainText('ASSESSED');
  await page.screenshot({ path: 'test-results/qualitative-rubric.png', fullPage: true });
  await page.getByRole('button', { name: 'Morning Brief' }).click();
  await expect(page.locator('.brief-criterion')).toContainText('ASSESSED');
  await expect(page.locator('.brief-view')).toContainText(
    '0 criteria verified. 1 AI-assessed. 0 still need attention.',
  );
  await page.screenshot({ path: 'test-results/qualitative-evidence.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Proof Ledger' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('Project Compass accounts for instructions, persists a new thought, and resumes dependent work after a linked answer', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.locator('.run-item').filter({ hasText: 'TEST FIXTURE project direction' }).click();
  await page.getByRole('button', { name: 'Project Compass', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Project Compass' })).toBeVisible();
  await expect(page.locator('.compass-state')).toContainText('Direction recorded');
  await expect(page.getByRole('article', { name: 'Operator decisions' })).toContainText(
    'Which label style',
  );
  await expect(page.locator('.compass-overview')).toContainText('1 criterion on hold');
  await expect(page.locator('.run-controls')).toContainText('BLOCKED');
  await page.screenshot({ path: 'test-results/compass-decision.png', fullPage: true });
  await page
    .getByLabel('Handoff note', { exact: true })
    .fill('TEST FIXTURE: review the complete prototype before adding more features.');
  await page.getByRole('button', { name: 'Save to handoff' }).click();
  await expect(page.getByRole('status')).toContainText('Saved. Resume');
  await expect(page.getByRole('article', { name: 'Handoff history' })).toContainText(
    'review the complete prototype',
  );
  await page.reload();
  await page.getByRole('button', { name: 'Project Compass', exact: true }).click();
  await expect(page.locator('.compass-state')).toContainText('Awaiting reconciliation');
  await page.getByRole('button', { name: 'Answer this question' }).click();
  await expect(page.getByLabel('Type of context')).toHaveValue('decision');
  await page
    .getByLabel('Handoff note', { exact: true })
    .fill('TEST FIXTURE: Use initials, and a question mark for missing names.');
  await page.getByRole('button', { name: 'Save to handoff' }).click();
  await expect(page.getByRole('status')).toContainText('Saved. Resume');
  await expect(page.getByRole('article', { name: 'Handoff history' })).toContainText(
    'LINKED REPLY',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: 'test-results/compass-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.getByRole('button', { name: 'Resume', exact: false }).click();
  await expect(page.locator('.run-controls')).toContainText('COMPLETED');
  await expect(page.locator('.compass-state')).toContainText('Direction recorded');
  await expect(page.getByRole('article', { name: 'Operator decisions' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Morning Brief', exact: true }).click();
  await expect(page.locator('.brief-view')).toContainText('2 criteria verified');
  expect(errors).toEqual([]);
});

test('autonomous checkpoints explain goal work discovered after green regression checks', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.run-item').filter({ hasText: 'TEST FIXTURE autonomous project' }).click();
  await page.getByRole('button', { name: 'Project Compass', exact: true }).click();
  const checkpoints = page.getByRole('article', { name: 'Autonomous project checkpoints' });
  await expect(checkpoints).toContainText('green checks miss the requested reusable summary');
  await expect(checkpoints).toContainText('1 next implementation unit discovered and scheduled');
  await expect(checkpoints).toContainText('Autonomous provisional choice');
  await expect(checkpoints).toContainText('CHECKPOINT 2 · READY');
  await expect(page.locator('.metrics')).toContainText('1 next step discovered autonomously');
  await page.screenshot({ path: 'test-results/project-checkpoints.png', fullPage: true });
  await page.getByRole('button', { name: 'Morning Brief', exact: true }).click();
  await expect(page.locator('.brief-view')).toContainText('2 criteria verified');
  const rejected = page.getByRole('article', { name: 'Project review corrections', exact: true });
  await expect(rejected).toContainText('actual recorded files and known evidence');
  await expect(rejected).toContainText('Later valid review recorded');
});
