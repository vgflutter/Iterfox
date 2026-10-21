import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { captureVisual } from '../src/verifiers/visual.js';
import { contractSchema, project } from '../src/core/model.js';
import { Engine } from '../src/core/engine.js';
import { git, protectedFile } from '../src/core/workspace.js';
import { openStore, createRun } from '../src/service.js';
import { artifactRoot, readArtifact } from '../src/core/artifacts.js';
import { serve } from '../src/server.js';
import type { AddressInfo } from 'node:net';

test(
  'real browser: screenshot mismatch → corrective task → original pixel check → artifact tamper becomes STALE',
  { skip: !process.env.ITERFOX_VISUAL_TESTS },
  async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'iterfox-visual-'));
    const repo = join(dir, 'repo');
    await cp(fileURLToPath(new URL('../examples/visual-lab/', import.meta.url)), repo, {
      recursive: true,
    });
    const portServer = createServer();
    await new Promise<void>((r) => portServer.listen(0, '127.0.0.1', r));
    const port = (portServer.address() as AddressInfo).port;
    await new Promise<void>((r) => portServer.close(() => r()));
    const contract = contractSchema.parse(
      JSON.parse(await readFile(join(repo, 'iterfox.json'), 'utf8')),
    );
    const criterion = contract.criteria[0];
    assert(criterion.verification?.kind === 'visual');
    criterion.verification.server = ['node', 'server.mjs', String(port)];
    criterion.verification.url = `http://127.0.0.1:${port}/`;
    const reference = structuredClone(criterion);
    assert(reference.verification?.kind === 'visual');
    reference.verification.url += 'approved';
    // Explicit operator-reference setup for this test; production never accepts or updates a baseline.
    const capture = await captureVisual(repo, reference, AbortSignal.timeout(30000));
    await writeFile(join(repo, 'baseline.png'), capture.screenshot);
    await git(repo, ['init', '-q']);
    await git(repo, ['add', '.']);
    await git(repo, [
      '-c',
      'user.name=Iterfox Test',
      '-c',
      'user.email=test@iterfox.local',
      'commit',
      '-qm',
      'Approved visual reference and defective avatar',
    ]);
    assert(protectedFile('baseline.png', contract));
    const alias = structuredClone(contract);
    if (alias.criteria[0].verification?.kind === 'visual')
      alias.criteria[0].verification.baseline = './BASELINE.png';
    assert(protectedFile('baseline.png', alias), 'baseline path aliases cannot evade protection');
    const store = openStore(dir);
    t.after(async () => {
      store.close();
      await rm(dir, { recursive: true, force: true });
    });
    const state = await createRun(store, dir, repo, contract, 'demo');
    const engine = new Engine(store, state.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan')
          return {
            tasks: [
              {
                title: 'Inspect avatar layout',
                objective: 'Preserve reference and inspect the avatar.',
                criterionId: 'avatar',
              },
            ],
          };
        if (r.mode === 'diagnose')
          return {
            hypothesis: 'Pixel diff reveals square corners instead of the approved circle.',
            correctiveTitle: 'Restore round corners',
            correctiveObjective: 'Use the approved 50% radius on the avatar only.',
            blocked: false,
          };
        if (r.node.reason.startsWith('Corrective')) {
          const path = join(r.state.worktree, 'index.html');
          await writeFile(
            path,
            (await readFile(path, 'utf8')).replace('border-radius:0%', 'border-radius:50%'),
          );
        }
        return {
          summary: 'TEST FIXTURE builder action; evaluated by the real browser.',
          blocked: false,
          reason: '',
        };
      },
    });
    const final = await engine.run();
    assert.equal(final.status, 'COMPLETED', final.reason);
    const failed = final.evidence.find((e) => e.status === 'failed')!;
    const passed = final.evidence.find((e) => e.status === 'passed')!;
    assert(failed.visual!.diffRatio > 0.001);
    assert.equal(passed.visual!.diffRatio, 0);
    assert(passed.artifacts!.some((a) => a.name === 'diff.png'));
    assert(final.evidence.some((e) => e.kind === 'observed'));
    assert(store.events(state.id).some((e) => e.type === 'corrective.inserted'));
    assert.deepEqual(project(store.events(state.id)), final);
    const server = await serve(store, dir, 0, () => 0);
    t.after(async () => {
      server.closeAllConnections();
      await new Promise<void>((r) => server.close(() => r()));
    });
    const root = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/runs/${state.id}/artifacts/`;
    const image = passed.artifacts!.find((a) => a.name === 'actual.png')!;
    const response = await fetch(root + image.id);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'image/png');
    assert.deepEqual(
      Buffer.from(await response.arrayBuffer()),
      await readArtifact(artifactRoot(store.path), image),
    );
    assert.equal((await fetch(root + 'nonexistent')).status, 404);
    // Persist a reviewable screenshot outside disposable fixtures when requested.
    if (process.env.ITERFOX_VISUAL_OUTPUT) {
      const { mkdir } = await import('node:fs/promises');
      await mkdir(process.env.ITERFOX_VISUAL_OUTPUT, { recursive: true });
      for (const e of [failed, passed])
        for (const a of e.artifacts ?? [])
          if (a.mime === 'image/png')
            await writeFile(
              join(process.env.ITERFOX_VISUAL_OUTPUT, `${e.status}-${a.name}`),
              await readArtifact(artifactRoot(store.path), a),
            );
    }
    await writeFile(join(artifactRoot(store.path), image.path), 'tampered');
    assert.equal((await fetch(root + image.id)).status, 400);
    assert.equal(store.get(state.id).status, 'PARTIAL');
    assert.equal(store.get(state.id).criteria[0].status, 'STALE');
  },
);

test('visual policies reject external origins and approval-like threshold changes', () => {
  const base = {
    goal: 'Validate a local screenshot',
    allowedPaths: ['index.html'],
    criteria: [
      {
        id: 'avatar',
        title: 'Approved visual',
        command: ['node', '--version'],
        verification: { kind: 'visual', baseline: 'baseline.png', url: 'https://public.example' },
      },
    ],
  };
  assert.throws(() => contractSchema.parse(base), /local HTTP/);
  base.criteria[0].verification.url = 'http://127.0.0.1:4357/';
  assert.equal(contractSchema.parse(base).criteria[0].verification?.kind, 'visual');
});
