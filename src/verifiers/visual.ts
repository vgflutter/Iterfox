import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { chromium, type Browser } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { evidenceFile, hash, saveArtifact } from '../core/artifacts.js';
import type { ArtifactRef, Criterion, Evidence } from '../core/model.js';

export async function captureVisual(cwd: string, criterion: Criterion, signal: AbortSignal) {
  const policy = criterion.verification;
  if (policy?.kind !== 'visual') throw new Error('Visual policy required');
  const { NODE_TEST_CONTEXT: _context, ...environment } = process.env;
  const child = policy.server
    ? spawn(policy.server[0], policy.server.slice(1), {
        cwd,
        env: environment,
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: process.platform !== 'win32',
        shell: false,
      })
    : undefined;
  let serverOutput = '';
  let serverError: Error | undefined;
  let exited = false;
  const collect = (chunk: Buffer) => {
    serverOutput = (serverOutput + chunk.toString()).slice(-16000);
  };
  child?.stdout.on('data', collect);
  child?.stderr.on('data', collect);
  child?.on('error', (error) => {
    serverError = error;
  });
  child?.on('exit', () => {
    exited = true;
  });
  const stop = () => {
    if (!child?.pid) return;
    try {
      if (process.platform === 'win32') child.kill('SIGTERM');
      else process.kill(-child.pid, 'SIGTERM');
    } catch {}
  };
  signal.addEventListener('abort', stop, { once: true });
  let browser: Browser | undefined;
  try {
    const readyUntil = Date.now() + Math.min(15000, criterion.timeoutMs);
    while (true) {
      signal.throwIfAborted();
      if (serverError || exited)
        throw new Error(
          'Approved visual server exited before capture: ' + (serverError?.message ?? serverOutput),
        );
      try {
        const res = await fetch(policy.url, {
          signal: AbortSignal.any([signal, AbortSignal.timeout(1000)]),
          redirect: 'error',
        });
        if (res.ok) break;
      } catch {
        signal.throwIfAborted();
      }
      if (Date.now() >= readyUntil)
        throw new Error('Visual target did not become ready: ' + policy.url + '\n' + serverOutput);
      await new Promise((r) => setTimeout(r, 100));
    }
    browser = await chromium.launch({
      channel: process.env.ITERFOX_BROWSER_CHANNEL,
      headless: true,
      chromiumSandbox: true,
      timeout: Math.min(15000, criterion.timeoutMs),
    });
    signal.throwIfAborted();
    const abort = () => {
      void browser?.close();
    };
    signal.addEventListener('abort', abort, { once: true });
    try {
      const context = await browser.newContext({
        viewport: policy.viewport,
        deviceScaleFactor: 1,
        locale: 'en-US',
        timezoneId: 'UTC',
        colorScheme: policy.colorScheme,
        reducedMotion: 'reduce',
        serviceWorkers: 'block',
      });
      const origin = new URL(policy.url).origin;
      const blockedRequests: string[] = [];
      const errors: string[] = [];
      await context.route('**/*', (route) => {
        const target = new URL(route.request().url());
        if (target.origin === origin) return route.continue();
        blockedRequests.push(target.origin);
        return route.abort('blockedbyclient');
      });
      await context.routeWebSocket('**/*', (ws) => {
        const target = new URL(ws.url());
        target.protocol = target.protocol === 'wss:' ? 'https:' : 'http:';
        if (target.origin === origin) {
          ws.connectToServer();
          return;
        }
        blockedRequests.push(target.origin);
        ws.close();
      });
      const page = await context.newPage();
      page.setDefaultTimeout(Math.min(15000, criterion.timeoutMs));
      page.on('pageerror', (e) => errors.push(e.message.slice(0, 2000)));
      await page.goto(policy.url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const screenshot = policy.selector
        ? await page
            .locator(policy.selector)
            .screenshot({ animations: 'disabled', timeout: criterion.timeoutMs })
        : await page.screenshot({
            animations: 'disabled',
            fullPage: false,
            timeout: criterion.timeoutMs,
          });
      signal.throwIfAborted();
      return {
        screenshot,
        browser: browser.version(),
        platform: process.platform + '/' + process.arch,
        viewport: policy.viewport,
        errors,
        blockedRequests: [...new Set(blockedRequests)],
        serverOutput,
      };
    } finally {
      signal.removeEventListener('abort', abort);
    }
  } finally {
    signal.removeEventListener('abort', stop);
    await browser?.close();
    stop();
    if (child?.pid) {
      // Reap owned server/descendants; never leave a capture server as an unattended job.
      await new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          try {
            if (process.platform === 'win32') child.kill('SIGKILL');
            else process.kill(-child.pid!, 'SIGKILL');
          } catch {}
          resolve();
        }, 500);
        // Keep the timer even if the leader exits: descendants may still hold sockets.
      });
    }
  }
}

function png(bytes: Buffer): PNG {
  if (
    bytes.length > 16 * 1024 * 1024 ||
    bytes.length < 24 ||
    bytes.readUInt32BE(16) * bytes.readUInt32BE(20) > 16_777_216
  )
    throw new Error('PNG exceeds visual verification limits');
  return PNG.sync.read(bytes);
}
export async function verifyVisual(
  cwd: string,
  criterion: Criterion,
  root: string,
  runId: string,
  signal: AbortSignal,
): Promise<{
  passed: boolean;
  artifacts: ArtifactRef[];
  visual: NonNullable<Evidence['visual']>;
  output: string;
}> {
  const policy = criterion.verification;
  if (policy?.kind !== 'visual') throw new Error('Visual policy required');
  const baselinePath = await evidenceFile(cwd, policy.baseline).catch(() => {
    throw new Error(
      'Approved visual baseline is missing or outside the repository. Capture and review a candidate before a run; baselines are never auto-updated.',
    );
  });
  const baseline = await readFile(baselinePath);
  const reference = png(baseline);
  const capture = await captureVisual(cwd, criterion, signal);
  const actual = png(capture.screenshot);
  const artifacts = [
    await saveArtifact(root, runId, 'actual.png', capture.screenshot, 'image/png'),
    await saveArtifact(root, runId, 'approved-baseline.png', baseline, 'image/png'),
  ];
  const totalPixels = actual.width * actual.height;
  let diffPixels = totalPixels;
  const dimensionsMatch = actual.width === reference.width && actual.height === reference.height;
  if (dimensionsMatch) {
    const diff = new PNG({ width: actual.width, height: actual.height });
    diffPixels = pixelmatch(reference.data, actual.data, diff.data, actual.width, actual.height, {
      threshold: policy.pixelThreshold,
      includeAA: false,
    });
    artifacts.push(await saveArtifact(root, runId, 'diff.png', PNG.sync.write(diff), 'image/png'));
  }
  const visual = {
    diffPixels,
    totalPixels,
    diffRatio: diffPixels / totalPixels,
    maxDiffRatio: policy.maxDiffRatio,
    dimensionsMatch,
    pageErrorCount: capture.errors.length,
    blockedRequestCount: capture.blockedRequests.length,
    baselineHash: hash(baseline),
    browser: capture.browser,
    platform: capture.platform,
    viewport: capture.viewport,
  };
  const passed =
    dimensionsMatch &&
    visual.diffRatio <= policy.maxDiffRatio &&
    capture.errors.length === 0 &&
    capture.blockedRequests.length === 0;
  const report = {
    ...visual,
    passed,
    dimensionsMatch,
    pageErrors: capture.errors,
    blockedRequests: capture.blockedRequests,
    serverOutput: capture.serverOutput,
  };
  artifacts.push(
    await saveArtifact(
      root,
      runId,
      'visual-report.json',
      Buffer.from(JSON.stringify(report, null, 2)),
      'application/json',
    ),
  );
  return { passed, artifacts, visual, output: JSON.stringify(report, null, 2) };
}
