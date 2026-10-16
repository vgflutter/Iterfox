import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { TestContext } from 'node:test';
import { createDemoRepository, createRun, loadContract, openStore } from '../src/service.js';
import type { Contract } from '../src/core/model.js';

export async function fixture(
  t: TestContext,
  edit?: (contract: Contract) => void,
  provider: 'demo' | 'codex' = 'demo',
) {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-test-'));
  const repository = await createDemoRepository(dir);
  const contract = await loadContract(join(repository, 'iterfox.json'));
  edit?.(contract);
  const store = openStore(dir);
  const state = await createRun(store, dir, repository, contract, provider);
  t.after(async () => {
    store.close();
    await rm(dir, { recursive: true, force: true });
  });
  return { dir, repository, contract, store, state, id: state.id };
}
