import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { reportFixture } from './fixture.mjs';

// Explicit DEMO fixture: verifies the shipped reader and export, not model quality.
const f = await reportFixture();
const browser = await chromium.launch({
  channel: process.env.ITERFOX_BROWSER_CHANNEL,
  headless: true,
  chromiumSandbox: true,
});
try {
  const before = f.runs.list().map((r) => [r.id, r.seq]);
  const revision = f.store.get(f.completed.id).revision;
  const calls = f.modelCalls;
  const errors = [];
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 },
    reducedMotion: 'reduce',
  });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(f.baseUrl);
  await page.getByRole('button', { name: 'Delegations', exact: true }).click();
  await page.getByRole('button', { name: 'Read project brief', exact: true }).click();
  const panel = page.getByRole('region', { name: 'Project morning brief', exact: true });
  await panel.getByText(f.completed.spec.contract.goal, { exact: true }).waitFor();
  const downloaded = page.waitForEvent('download');
  await panel.getByRole('button', { name: 'Download project report HTML', exact: true }).click();
  const download = await downloaded;
  assert(download.suggestedFilename().endsWith('.html'));
  const path = join(f.dir, 'project-report.html');
  await download.saveAs(path);
  const html = await readFile(path, 'utf8');
  for (const stage of f.completed.stages) assert(html.includes(stage.checkpoint.head));
  assert(!/<script[\s>]/i.test(html));
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  const offline = await browser.newContext({
    offline: true,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const report = await offline.newPage();
  const remote = [];
  report.on('request', (r) => {
    if (/^https?:/.test(r.url())) remote.push(r.url());
  });
  await report.goto(pathToFileURL(path).href);
  assert(
    (await report.locator('body').innerText()).includes(f.completed.stages[1].checkpoint.head),
  );
  assert.equal(await report.locator('script,iframe,object,embed').count(), 0);
  assert.equal(
    await report.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  await report.locator('summary').first().click();
  assert.notEqual(await report.locator('details').first().getAttribute('open'), null);
  assert.deepEqual(remote, []);
  await offline.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(
    f.runs.list().map((r) => [r.id, r.seq]),
    before,
  );
  assert.equal(f.store.get(f.completed.id).revision, revision);
  assert.equal(f.modelCalls, calls);
  console.log(
    'PASS explicit DEMO HTML download, real checkpoint references, offline report with JavaScript disabled, native details, 390px and read-only history.',
  );
} finally {
  await browser.close();
  await f.close();
}
