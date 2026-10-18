import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createDemoRepository, createRun, loadContract, openStore } from '../../src/service.js';
import { Engine } from '../../src/core/engine.js';
import { DemoProvider } from '../../src/providers/demo.js';
import { evidenceFixtures } from './evidence-fixtures.js';
import { serve } from '../../src/server.js';
import { launchWorker } from '../../src/cli.js';
import { compassFixture } from './compass-fixture.js';

const dir = await mkdtemp(join(tmpdir(), 'iterfox-browser-'));
const repo = await createDemoRepository(dir);
const store = openStore(dir);
await evidenceFixtures(dir, store);
const compass = await compassFixture(dir, store);
const state = await createRun(
  store,
  dir,
  repo,
  await loadContract(join(repo, 'iterfox.json')),
  'demo',
);
await new Engine(store, state.id, new DemoProvider()).run();
await serve(store, dir, Number(process.env.ITERFOX_UI_TEST_PORT ?? 4311), (id) =>
  id === compass.id ? new Engine(store, id, compass.provider).run() : launchWorker(id, dir),
);
