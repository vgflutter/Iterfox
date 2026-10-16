import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/browser',
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:4311',
    headless: true,
    channel: process.env.ITERFOX_BROWSER_CHANNEL,
    viewport: { width: 1440, height: 1080 },
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'node --import tsx tests/browser/server.ts',
    url: 'http://127.0.0.1:4311',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
