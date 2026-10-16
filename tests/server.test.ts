import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import type { AddressInfo } from 'node:net';
import { Engine } from '../src/core/engine.js';
import { project } from '../src/core/model.js';
import { DemoProvider } from '../src/providers/demo.js';
import { serve } from '../src/server.js';
import { fixture } from './helpers.js';

test('HTTP serves real state, replays ordered SSE, rejects unapproved controls, and exports a consistent brief', async (t) => {
  const f = await fixture(t);
  const engine = new Engine(f.store, f.id, new DemoProvider());
  const server = await serve(f.store, f.dir, 0, () => {
    throw new Error('No real worker may launch in this test');
  });
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((r) => server.close(() => r()));
  });
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const meta = (await (await fetch(base + '/api/meta')).json()) as { token: string };
  const headers = { 'Content-Type': 'application/json', 'X-Iterfox-Token': meta.token };
  const path = `/api/runs/${f.id}`;
  assert.equal(
    (
      await fetch(base + path + '/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"action":"stop"}',
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fetch(base + path + '/control', {
        method: 'POST',
        headers: { ...headers, Origin: 'https://untrusted.example' },
        body: '{"action":"stop"}',
      })
    ).status,
    403,
  );
  const state = await engine.run();
  assert.deepEqual(await (await fetch(base + path)).json(), state);
  const abort = new AbortController();
  const response = await fetch(base + path + '/stream?after=2', { signal: abort.signal });
  const reader = response.body!.getReader();
  let data = '';
  while (!data.includes(`id: ${state.seq}\n`)) {
    const r = await reader.read();
    data += new TextDecoder().decode(r.value);
  }
  abort.abort();
  await reader.cancel().catch(() => {});
  const streamed = data
    .split('\n')
    .filter((l) => l.startsWith('data: '))
    .map((l) => JSON.parse(l.slice(6)));
  assert.equal(streamed[0].seq, 3);
  assert.equal(streamed.at(-1).seq, state.seq);
  assert.deepEqual(project([...f.store.events(f.id).slice(0, 2), ...streamed]), state);
  assert.match(
    await (await fetch(base + path + '/brief?format=markdown')).text(),
    /Morning Brief — COMPLETED/,
  );
  assert.equal(
    ((await (await fetch(base + path + '/brief')).json()) as { verified: number }).verified,
    2,
  );
});

test('a detached worker finishes after its launching process and browser disconnect', async (t) => {
  const f = await fixture(t);
  const launcher = fileURLToPath(new URL('../src/cli.ts', import.meta.url));
  const snippet = `import { launchWorker } from ${JSON.stringify(launcher)}; console.log(launchWorker(process.argv[1], process.argv[2]));`;
  const { stdout } = await promisify(execFile)(
    process.execPath,
    ['--import', 'tsx', '--input-type=module', '-e', snippet, f.id, f.dir],
    {
      cwd: process.cwd(),
      env: { ...process.env, ITERFOX_DEMO_DELAY_MS: '100' },
    },
  );
  assert(Number(stdout.trim()) > 0, 'short-lived launcher returned a detached PID and has exited');
  const timeout = Date.now() + 15_000;
  while (f.store.get(f.id).status === 'RUNNING' && Date.now() < timeout)
    await new Promise((r) => setTimeout(r, 50));
  const state = f.store.get(f.id);
  assert.equal(state.status, 'COMPLETED', state.reason);
  // Let the process release the lease before fixture cleanup.
  while (f.store.lease(f.id) && Date.now() < timeout) await new Promise((r) => setTimeout(r, 20));
  assert.equal(f.store.lease(f.id), undefined);
});
