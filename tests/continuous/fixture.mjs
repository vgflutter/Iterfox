// Explicit deterministic provider fixture for report/API/browser acceptance.
// Real product-development missions use Codex; these checks do not assess a model.
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore, createDemoRepository, loadContract } from '../../src/service.ts';
import {
  createDelegation,
  previewDelegation,
  runDelegation,
  DelegationStore,
} from '../../src/delegations/service.ts';
import { DemoProvider } from '../../src/providers/demo.ts';
import { activeNotes } from '../../src/core/compass.ts';
import { serve } from '../../src/server.ts';
export async function reportFixture() {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-project-brief-'));
  const repository = await createDemoRepository(dir);
  const runs = openStore(join(dir, 'data'));
  const base = await loadContract(join(repository, 'iterfox.json'));
  const spec = {
    repository,
    contract: {
      ...base,
      goal: 'DEMO: return to two verified avatar outcomes after an absence.',
      supervision: { mode: 'project', maxReviews: 4 },
      limits: { ...base.limits, maxTurns: 30, maxDurationMs: 120000, maxTokens: 1000000 },
    },
    milestones: base.criteria.map((c, i) => ({
      id: c.id,
      title: c.title,
      outcome: 'Complete the approved ' + c.title,
      criterionIds: [c.id],
      dependsOn: i ? [base.criteria[i - 1].id] : [],
    })),
    environment: { copyIgnoredPaths: [] },
  };
  const preview = await previewDelegation(spec);
  const d = await createDelegation(
    runs,
    { spec: preview.spec, expectedHead: preview.expectedHead, authorized: true },
    'demo',
  );
  let modelCalls = 0;
  const demo = new DemoProvider();
  const provider = {
    name: 'demo',
    async invoke(r) {
      modelCalls++;
      const id = r.state.contract.criteria.some((c) => c.id === 'dialogue') ? 'dialogue' : 'render';
      if (r.mode === 'orient')
        return {
          focus: 'DEMO: complete ' + id,
          nextArtifact: 'DEMO: verified ' + id,
          assumptions: [],
          notes: activeNotes(r.state).map((n) => ({
            noteId: n.id,
            disposition: 'applied',
            reason: 'Historical prior outcome guides this fixture; new checks still execute.',
            criterionIds: [id],
          })),
          tasks: [
            {
              title: 'Implement ' + id,
              objective: 'Complete the approved ' + id + ' behavior.',
              criterionId: id,
              waitsFor: [],
            },
          ],
        };
      if (r.mode === 'oversee')
        return {
          outcome: 'ready',
          summary: 'DEMO fixture: approved checks and the intended fixture result are ready.',
          findings: [],
          decisions: [],
          tasks: [],
          operatorQuestion: '',
        };
      return demo.invoke(r);
    },
  };
  const completed = await runDelegation(runs, join(dir, 'data'), d.id, () => provider);
  if (completed.status !== 'COMPLETED')
    throw new Error('Fixture did not complete: ' + completed.reason);
  const server = await serve(
    runs,
    join(dir, 'data'),
    0,
    () => {
      throw Error('No workers allowed in brief audit');
    },
    () => {
      throw Error('No delegation launch allowed in brief audit');
    },
  );
  const baseUrl = 'http://127.0.0.1:' + server.address().port;
  const token = (await (await fetch(baseUrl + '/api/meta')).json()).token;
  return {
    dir,
    runs,
    completed,
    baseUrl,
    token,
    get modelCalls() {
      return modelCalls;
    },
    store: new DelegationStore(runs),
    async close() {
      server.closeAllConnections();
      await new Promise((r) => server.close(r));
      runs.close();
      await rm(dir, { recursive: true, force: true });
    },
  };
}
