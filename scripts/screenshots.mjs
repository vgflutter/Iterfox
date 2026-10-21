import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch({
  channel: process.env.ITERFOX_BROWSER_CHANNEL,
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1160 },
    reducedMotion: 'reduce',
  });
  await page.goto(process.env.ITERFOX_UI_URL ?? 'http://127.0.0.1:4310');
  await page.getByRole('heading', { name: 'Follow the work.' }).waitFor();
  await page.locator('.react-flow__node').first().waitFor();
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await page.screenshot({ path: 'docs/screenshots/live-trail.png', fullPage: true });
  await page.getByRole('button', { name: 'Morning Brief' }).click();
  await page.screenshot({ path: 'docs/screenshots/morning-brief.png', fullPage: true });
  console.log(
    'Captured the actual running UI. Verify the provider label before publishing screenshots.',
  );
} finally {
  await browser.close();
}
