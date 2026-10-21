import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { createDemoRepository, createRun, loadContract, controlRun } from '../../src/service.js';
import type { Store } from '../../src/core/store.js';

export async function graphControlFixture(dir: string, store: Store) {
  const repository = await createDemoRepository(dir);
  const contract = await loadContract(join(repository, 'iterfox.json'));
  contract.goal = 'TEST FIXTURE selected graph control: inspect and steer a paused result.';
  const state = await createRun(store, dir, repository, contract, 'demo');
  store.append(state.id, 'task.planned', 'Explicit graph-control task fixture.', {
    node: {
      id: randomUUID(),
      kind: 'task',
      title: 'TEST FIXTURE review avatar labels',
      objective: 'Make the selected result understandable.',
      reason: 'Explicit UI fixture, not a model-generated task.',
      criterionId: 'render',
      role: 'builder',
      status: 'PENDING',
      attempt: 1,
      files: [],
      evidenceIds: [],
    },
  });
  controlRun(store, state.id, 'pause');
  return state.id;
}
