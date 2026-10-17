import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  targetSchema,
  sshArgs,
  serviceArgs,
  shellQuote,
  executeRemote,
  saveBundle,
} from '../src/cloud.js';
import { Engine } from '../src/core/engine.js';
import { DemoProvider } from '../src/providers/demo.js';
import { artifactRoot, saveArtifact } from '../src/core/artifacts.js';
import { fixture } from './helpers.js';

const target = targetSchema.parse({
  host: 'runner@example.org',
  serviceManager: 'detached',
  entry: '/opt/iterfox/dist/cli.js',
  repository: '/srv/project',
  contract: '/srv/project/iterfox.json',
  data: '/srv/iterfox',
});
test('SSH transport fixes host-key checking, local tunnel binding and literal quoting', () => {
  assert(sshArgs(target).includes('StrictHostKeyChecking=yes'));
  assert(sshArgs(target).includes('BatchMode=yes'));
  assert(sshArgs(target, true).includes('127.0.0.1:4320:127.0.0.1:4320'));
  assert(!sshArgs(target).includes('-A'));
  assert(serviceArgs(target, 'worker', 'abc-123').includes('--unit=iterfox-run-abc-123'));
  assert(serviceArgs(target, 'worker', 'abc-123').includes('--property=Restart=no'));
  assert(serviceArgs(target, 'worker', 'abc-123').includes('--expand-environment=no'));
  assert(serviceArgs(target, 'ui').includes('--remote-target'));
  assert.throws(() => serviceArgs(target, 'worker', '../escape'));
  assert.equal(shellQuote("/srv/it's a $(literal)`path`"), "'/srv/it'\\''s a $(literal)`path`'");
  for (const host of ['-oProxyCommand=bad', 'host; echo bad', 'host\nnext'])
    assert.throws(() => targetSchema.parse({ ...target, host }));
  assert.throws(() => targetSchema.parse({ ...target, data: '/srv/../etc' }));
});
test('remote protocol pins approved source and contract and exports verifiable results', async (t) => {
  const f = await fixture(t);
  const local = {
    ...target,
    repository: f.repository,
    contract: join(f.repository, 'iterfox.json'),
    data: f.dir,
    entry: fileURLToPath(new URL('../src/cli.ts', import.meta.url)),
  };
  const review = (await executeRemote({ action: 'preflight', target: local })) as {
    head: string;
    contractHash: string;
  };
  assert.equal(review.head, f.state.baseHead);
  assert.match(review.contractHash, /^[a-f0-9]{64}$/);
  await assert.rejects(
    executeRemote({
      action: 'start',
      target: local,
      expectedHead: review.head,
      contractHash: '0'.repeat(64),
    }),
    /changed after preflight/,
  );
  await new Engine(f.store, f.id, new DemoProvider()).run();
  const runs = (await executeRemote({ action: 'status', target: local, id: f.id })) as {
    status: string;
  }[];
  assert.equal(runs[0].status, 'COMPLETED');
  const bundle = await executeRemote({ action: 'export', target: local, id: f.id });
  const out = join(f.dir, 'download');
  await saveBundle(out, bundle);
  assert.match(await readFile(join(out, 'brief.md'), 'utf8'), /COMPLETED/);
  assert.equal(
    JSON.parse(await readFile(join(out, 'events.json'), 'utf8')).length,
    f.store.events(f.id).length,
  );
  await assert.rejects(saveBundle(out, bundle), /EEXIST/);
  const bad = structuredClone(bundle) as { artifacts: unknown[] };
  bad.artifacts.push({ ref: { id: 'evil', path: '../../oops' }, base64: 'aA==' });
  const invalid = join(f.dir, 'invalid');
  await assert.rejects(saveBundle(invalid, bad), /Incomplete/);
  await assert.rejects(access(invalid));
});
test('remote-agent launch returns while its detached DEMO finishes after the client exits', async (t) => {
  const f = await fixture(t);
  const local = {
    ...target,
    repository: f.repository,
    contract: join(f.repository, 'iterfox.json'),
    data: f.dir,
    entry: fileURLToPath(new URL('../src/cli.ts', import.meta.url)),
  };
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const input = JSON.stringify({ action: 'start', target: local, demo: true });
  const script = `import {executeRemote} from ${JSON.stringify(fileURLToPath(new URL('../src/cloud.ts', import.meta.url)))}; console.log(JSON.stringify(await executeRemote(JSON.parse(process.argv[1]))));`;
  const { stdout } = await promisify(execFile)(
    process.execPath,
    ['--import', 'tsx', '--input-type=module', '-e', script, input],
    { env: { ...process.env, ITERFOX_DEMO_DELAY_MS: '80' } },
  );
  const launched = JSON.parse(stdout) as { id: string; pid: number };
  assert(launched.pid > 0);
  const until = Date.now() + 15000;
  while (f.store.get(launched.id).status === 'RUNNING' && Date.now() < until)
    await new Promise((r) => setTimeout(r, 50));
  assert.equal(f.store.get(launched.id).status, 'COMPLETED', f.store.get(launched.id).reason);
  while (f.store.lease(launched.id) && Date.now() < until)
    await new Promise((r) => setTimeout(r, 20));
  assert.equal(f.store.lease(launched.id), undefined);
});

test('download checks real artifact bytes and rejects corruption and traversal before creating output', async (t) => {
  const f = await fixture(t);
  await new Engine(f.store, f.id, new DemoProvider()).run();
  const bytes = Buffer.from('Explicit artifact export test fixture.');
  const ref = await saveArtifact(
    artifactRoot(f.store.path),
    f.id,
    'receipt.txt',
    bytes,
    'text/plain',
  );
  const events = structuredClone(f.store.events(f.id));
  const event = [...events].reverse().find((e) => e.type === 'verification.passed')!;
  (event.data.evidence as { artifacts?: unknown[] }).artifacts = [ref];
  const bundle = { events, artifacts: [{ ref, base64: bytes.toString('base64') }] };
  const out = join(f.dir, 'artifact-download');
  await saveBundle(out, bundle);
  assert.deepEqual(await readFile(join(out, 'artifacts', ref.path)), bytes);
  const corrupt = structuredClone(bundle);
  corrupt.artifacts[0].base64 = Buffer.from('corrupted content').toString('base64');
  const invalid = join(f.dir, 'corrupt');
  await assert.rejects(saveBundle(invalid, corrupt), /hash mismatch/);
  await assert.rejects(access(invalid));
  const escaped = structuredClone(bundle);
  const badRef = { ...ref, path: '../../outside.txt' };
  escaped.artifacts[0].ref = badRef;
  const last = [...escaped.events].reverse().find((e) => e.type === 'verification.passed')!;
  (last.data.evidence as { artifacts?: unknown[] }).artifacts = [badRef];
  await assert.rejects(saveBundle(join(f.dir, 'escaped'), escaped), /path or metadata/);
});
