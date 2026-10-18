import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Engine } from '../../src/core/engine.js';
import { activeNotes } from '../../src/core/compass.js';
import { Store } from '../../src/core/store.js';
import {
  addDirectionNote,
  createDemoRepository,
  createRun,
  loadContract,
} from '../../src/service.js';
import type { AgentProvider } from '../../src/providers/provider.js';

export async function compassFixture(dir: string, store: Store) {
  const repo = await createDemoRepository(dir);
  const contract = await loadContract(join(repo, 'iterfox.json'));
  contract.goal =
    'TEST FIXTURE project direction: deliver a reviewable avatar prototype while a naming decision waits.';
  contract.criteria[1].command = ['node', '--version'];
  const state = await createRun(store, dir, repo, contract, 'demo');
  addDirectionNote(store, state.id, {
    text: 'TEST FIXTURE: Ask me whether avatar labels should use initials or full names. Continue independent checks while I decide.',
    kind: 'request',
  });
  addDirectionNote(store, state.id, {
    text: 'TEST FIXTURE: A short exchange may be easier to review. Its duration is provisional.',
    kind: 'hypothesis',
  });
  const questionId = store.get(state.id).notes![0].id;
  const provider: AgentProvider = {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'orient')
        return {
          focus: 'TEST FIXTURE: make one avatar prototype reviewable before expanding the product.',
          nextArtifact: 'TEST FIXTURE target: safe avatar labels with the chosen naming style.',
          assumptions: ['TEST FIXTURE: the ideal exchange duration has not been measured.'],
          notes: activeNotes(r.state).map((n) => ({
            noteId: n.id,
            disposition: n.id === questionId ? 'question' : 'applied',
            reason:
              n.id === questionId
                ? 'Which label style should we use: initials or full names?'
                : 'TEST FIXTURE: incorporated as provisional planning context.',
            criterionIds: n.id === questionId ? ['render'] : [],
          })),
          tasks: [
            {
              title: 'TEST FIXTURE normalize labels',
              objective: 'Use initials and safe empty-name handling after the operator reply.',
              criterionId: 'render',
              waitsFor: [],
            },
            {
              title: 'TEST FIXTURE independent environment',
              objective: 'Confirm the approved Node executable.',
              criterionId: 'dialogue',
              waitsFor: [],
            },
          ],
        };
      if (r.mode !== 'build') throw new Error(`Unexpected fixture mode ${r.mode}`);
      const path = join(r.state.worktree, 'avatar.mjs');
      await writeFile(
        path,
        (await readFile(path, 'utf8')).replace(
          'return name.trim()[0].toUpperCase();',
          "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
        ),
      );
      return { summary: 'TEST FIXTURE applied safe initial labels.', blocked: false, reason: '' };
    },
  };
  await new Engine(store, state.id, provider).run();
  return { id: state.id, provider };
}
