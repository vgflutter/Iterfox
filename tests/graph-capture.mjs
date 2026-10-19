// Approved host-side renderer for a qualitative policy. The records below are
// explicit deterministic fixtures, never claimed as real autonomous development.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';
import {
  openStore,
  createDemoRepository,
  createRun,
  loadContract,
  controlRun,
} from '../dist/service.js';
import { serve } from '../dist/server.js';

const dir = await mkdtemp(join(tmpdir(), 'iterfox-graph-capture-'));
const repository = await createDemoRepository(dir);
const store = openStore(dir);
const contract = await loadContract(join(repository, 'iterfox.json'));
contract.goal = 'SCREENSHOT FIXTURE: review and steer a paused selected result.';
const run = await createRun(store, dir, repository, contract, 'demo');
const nodeId = randomUUID();
store.append(run.id, 'task.planned', 'Explicit observed-interface fixture.', {
  node: {
    id: nodeId,
    kind: 'task',
    title: 'SCREENSHOT FIXTURE avatar-label result',
    objective: 'Make the selected result understandable before polishing.',
    reason: 'Explicit deterministic fixture for UI inspection; no model implementation is claimed.',
    criterionId: 'render',
    role: 'builder',
    status: 'PENDING',
    attempt: 1,
    files: [],
    evidenceIds: [],
  },
});
controlRun(store, run.id, 'pause');
let launches = 0;
const server = await serve(store, dir, 0, () => ++launches);
const base = `http://127.0.0.1:${server.address().port}`;
const token = (await (await fetch(base + '/api/meta')).json()).token;
async function api(path, body) {
  const response = await fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Iterfox-Token': token },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  assert(response.ok, JSON.stringify({ path, status: response.status, data }));
  return data;
}
let project = await api('/api/projects', {
  name: 'SCREENSHOT FIXTURE project continuity',
  repository,
  purpose:
    'A developer returning after an absence should see the current milestone and useful next action immediately.',
  audience: 'A returning developer',
  constraints: ['Preserve the approved acceptance checks.'],
  decisions: ['Useful verified progress comes before cosmetic refinement.'],
  hypotheses: ['Contextual graph control may reduce repeated instructions.'],
  milestones: [
    {
      id: 'memory',
      title: 'Keep project memory',
      outcome: 'Decisions survive separate work sessions.',
      dependsOn: [],
      status: 'reviewed',
    },
    {
      id: 'graph',
      title: 'Steer the selected result',
      outcome: 'Give contextual feedback and inspect its recorded handling.',
      dependsOn: ['memory'],
      status: 'active',
    },
  ],
});
project = await api(`/api/projects/${project.id}/runs`, {
  expectedRevision: project.revision,
  runId: run.id,
  milestoneId: 'graph',
});
const output = resolve('dist/qualification');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.ITERFOX_BROWSER_CHANNEL ?? 'chrome',
  headless: true,
  chromiumSandbox: true,
  args: ['--disable-gpu'],
});
const errors = [];
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  for (const [name, viewport] of [
    ['desktop', { width: 1440, height: 1080 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const page = await context.newPage();
    await page.setViewportSize(viewport);
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base);
    await page.getByRole('button', { name: 'Projects', exact: true }).click();
    if (name === 'desktop')
      await page.getByRole('button', { name: /SCREENSHOT FIXTURE project continuity/ }).click();
    await expect(page.getByRole('heading', { name: project.name, exact: true })).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      scrollTo(0, 0);
    });
    await page.screenshot({ path: join(output, `project-overview-${name}.png`) });
    await page
      .getByRole('button', { name: /Live Trail/ })
      .first()
      .click();
    await page.locator(`.react-flow__node[data-id="${nodeId}"]`).click();
    const steering = page.getByRole('region', { name: 'Steer selected work', exact: true });
    await expect(steering).toBeVisible();
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    await page.screenshot({ path: join(output, `selected-initial-${name}.png`) });
    await steering
      .getByLabel('Instruction for selected work', { exact: true })
      .fill('Review the empty-name result before visual refinements.');
    if (name === 'desktop') {
      await steering.getByRole('button', { name: 'Send instruction', exact: true }).click();
      await expect(steering.getByRole('status')).toContainText(/saved|recorded|salvat/i);
    }
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await steering.screenshot({ path: join(output, `selected-work-${name}.png`) });
    await page.close();
  }
  assert.deepEqual(errors, []);
  assert.equal(launches, 0);
  assert.equal(store.get(run.id).status, 'PAUSED');
  console.log(
    JSON.stringify({
      captured: [
        'selected-initial-desktop.png',
        'selected-initial-mobile.png',
        'selected-work-desktop.png',
        'selected-work-mobile.png',
        'project-overview-desktop.png',
        'project-overview-mobile.png',
      ],
      browserVersion: browser.version(),
      platform: process.platform,
      viewports: { desktop: [1440, 1080], mobile: [390, 844] },
      provenance:
        'Actual Chrome captures of explicitly labelled deterministic UI fixtures. No real model implementation or completed milestone is claimed by these fixtures.',
      pageErrors: errors,
      launchedWorkers: launches,
    }),
  );
} finally {
  await browser.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  store.close();
  await rm(dir, { recursive: true, force: true });
}
