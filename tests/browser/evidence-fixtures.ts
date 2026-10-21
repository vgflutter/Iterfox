import { cp, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import type { AddressInfo } from 'node:net';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { captureVisual } from '../../src/verifiers/visual.js';
import { contractSchema } from '../../src/core/model.js';
import { git } from '../../src/core/workspace.js';
import { Engine } from '../../src/core/engine.js';
import type { Store } from '../../src/core/store.js';
import { createRun } from '../../src/service.js';

export async function evidenceFixtures(dir: string, store: Store): Promise<void> {
  const repo = join(dir, 'visual-repo');
  await cp(fileURLToPath(new URL('../../examples/visual-lab/', import.meta.url)), repo, {
    recursive: true,
  });
  const s = createServer();
  await new Promise<void>((r) => s.listen(0, '127.0.0.1', r));
  const port = (s.address() as AddressInfo).port;
  await new Promise<void>((r) => s.close(() => r()));
  const c = contractSchema.parse(JSON.parse(await readFile(join(repo, 'iterfox.json'), 'utf8')));
  c.goal = 'TEST FIXTURE visual avatar evidence';
  const v = c.criteria[0].verification;
  if (v?.kind !== 'visual') throw new Error('Expected visual fixture');
  v.server = ['node', 'server.mjs', String(port)];
  v.url = `http://127.0.0.1:${port}/`;
  const reference = structuredClone(c.criteria[0]);
  if (reference.verification?.kind !== 'visual') throw new Error('Expected reference');
  reference.verification.url += 'approved';
  await writeFile(
    join(repo, 'baseline.png'),
    (await captureVisual(repo, reference, AbortSignal.timeout(30000))).screenshot,
  );
  await writeFile(join(repo, 'dialogue.txt'), 'Mira: Hello Rowan.\nRowan: Hi Mira! How are you?\n');
  await git(repo, ['init', '-q']);
  await git(repo, ['add', '.']);
  await git(repo, [
    '-c',
    'user.name=Iterfox Fixture',
    '-c',
    'user.email=test@iterfox.local',
    'commit',
    '-qm',
    'Reviewed browser evidence fixtures',
  ]);
  const visual = await createRun(store, dir, repo, c, 'demo');
  await new Engine(store, visual.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan')
        return {
          tasks: [
            {
              title: 'Restore round avatar',
              objective: 'Match the approved shape.',
              criterionId: 'avatar',
            },
          ],
        };
      const path = join(r.state.worktree, 'index.html');
      await writeFile(
        path,
        (await readFile(path, 'utf8')).replace('border-radius:0%', 'border-radius:50%'),
      );
      return {
        summary: 'TEST FIXTURE edit, checked by actual browser.',
        blocked: false,
        reason: '',
      };
    },
  }).run();
  const qualitative = contractSchema.parse({
    goal: 'TEST FIXTURE qualitative dialogue assessment',
    allowedPaths: ['dialogue.txt'],
    criteria: [
      {
        id: 'dialogue',
        title: 'Dialogue clarity',
        command: ['node', '-e', "console.log(require('fs').readFileSync('dialogue.txt','utf8'))"],
        verification: {
          kind: 'qualitative',
          files: ['dialogue.txt'],
          rubric: [
            {
              id: 'clear',
              description: 'The response clearly addresses the first speaker.',
              minScore: 4,
            },
          ],
        },
      },
    ],
  });
  const assessed = await createRun(store, dir, repo, qualitative, 'demo');
  await new Engine(store, assessed.id, {
    name: 'demo',
    async invoke(r) {
      if (r.mode === 'plan')
        return {
          tasks: [
            {
              title: 'Review dialogue',
              objective: 'Keep the transcript for an assessment fixture.',
              criterionId: 'dialogue',
            },
          ],
        };
      if (r.mode === 'assess')
        return {
          outcome: 'sufficient',
          ratings: [
            { id: 'clear', score: 4, explanation: 'TEST FIXTURE: the reply directly greets Mira.' },
          ],
          summary: 'TEST FIXTURE assessment; no model was called.',
          limitations: ['Deterministic fixture, not a real qualitative judgment.'],
        };
      return { summary: 'TEST FIXTURE: preserve transcript.', blocked: false, reason: '' };
    },
  }).run();
}
