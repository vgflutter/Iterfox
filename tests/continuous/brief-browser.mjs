import assert from 'node:assert/strict';
import { reportFixture } from './fixture.mjs';
import { chromium } from 'playwright';
const f = await reportFixture();
const browser = await chromium.launch({
  channel: process.env.ITERFOX_BROWSER_CHANNEL ?? 'chrome',
  headless: true,
  chromiumSandbox: true,
  args: ['--disable-gpu'],
});
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 },
    reducedMotion: 'reduce',
  });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(f.baseUrl);
  await page.getByRole('button', { name: 'Delegations', exact: true }).click();
  await page.getByRole('button', { name: 'Read project brief', exact: true }).click();
  const panel = page.getByRole('region', { name: 'Project morning brief', exact: true });
  await panel
    .getByText(f.completed.spec.contract.goal, { exact: true })
    .waitFor({ timeout: 10000 });
  assert((await panel.textContent()).includes('2'));
  assert((await panel.textContent()).match(/review|revisione/i));
  for (const [name, extension] of [
    ['Export project brief JSON', '.json'],
    ['Export project brief Markdown', '.md'],
  ]) {
    const downloaded = page.waitForEvent('download');
    await panel.getByRole('button', { name, exact: true }).click();
    const download = await downloaded;
    assert(download.suggestedFilename().endsWith(extension));
    assert(await download.path());
  }
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  assert.deepEqual(errors, []);
  assert.equal(f.runs.list().length, 2);
  console.log(
    'PASS real cross-mission project brief, JSON/Markdown downloads, 390px and no page errors; explicit DEMO fixture, no model worker.',
  );
} finally {
  await browser.close();
  await f.close();
}
