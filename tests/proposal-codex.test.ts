import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateProposal } from '../src/proposals/generate.js';
import { discoverCheckCandidates } from '../src/proposals/commands.js';
import { git, stamp } from '../src/core/workspace.js';
import { createDemoRepository, openStore } from '../src/service.js';

test(
  'REAL Codex drafts grounded checks from an Italian goal without changing the repository or creating a run',
  {
    skip: process.env.ITERFOX_REAL_PROPOSAL !== '1',
    timeout: 240000,
  },
  async (t) => {
    const directory = await mkdtemp(join(tmpdir(), 'iterfox-proposal-real-'));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const repository = await createDemoRepository(directory);
    await writeFile(
      join(repository, 'package.json'),
      JSON.stringify(
        {
          name: 'proposal-review-fixture',
          private: true,
          scripts: { test: 'node --test render.test.mjs dialogue.test.mjs' },
        },
        null,
        2,
      ),
    );
    await git(repository, ['add', 'package.json']);
    await git(repository, [
      '-c',
      'user.name=Iterfox Test',
      '-c',
      'user.email=test@iterfox.local',
      'commit',
      '-qm',
      'Document the existing regression command for proposal discovery',
    ]);
    const store = openStore(directory);
    t.after(() => store.close());
    const before = await stamp(repository);
    const worktrees = await git(repository, ['worktree', 'list', '--porcelain']);
    const started = Date.now();
    const result = await generateProposal(
      {
        repository,
        goal: 'Rendi robusti i nomi vuoti degli avatar e fai rispondere il secondo interlocutore al primo. Conserva i test esistenti e proponi il comando di regressione già documentato nel progetto.',
      },
      { model: process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol' },
    );
    const report = {
      at: new Date().toISOString(),
      elapsedMs: Date.now() - started,
      result,
      repositoryUnchanged: (await stamp(repository)).fingerprint === before.fingerprint,
      runCount: store.list().length,
    };
    if (process.env.ITERFOX_PROPOSAL_OUT)
      await writeFile(process.env.ITERFOX_PROPOSAL_OUT, JSON.stringify(report, null, 2));
    assert.equal(result.status, 'draft');
    assert.equal(result.provider, 'codex');
    assert.equal(result.checkStatus, 'not-run');
    assert.equal(result.authorizationRequired, true);
    assert.equal(result.head, before.head);
    assert.deepEqual(await stamp(repository), before);
    assert.equal(await git(repository, ['worktree', 'list', '--porcelain']), worktrees);
    assert.equal(store.list().length, 0);
    const candidates = discoverCheckCandidates(result.snapshot);
    const checks = result.draft.criteria.filter((c) => c.command !== null);
    assert(checks.length > 0, 'At least one existing regression command should be proposed');
    for (const check of checks)
      assert(
        candidates.some((c) => JSON.stringify(c.command) === JSON.stringify(check.command)),
        'Every proposed command must be established in committed source',
      );
    console.log(
      JSON.stringify({
        elapsedMs: report.elapsedMs,
        groundedChecks: checks.length,
        repositoryUnchanged: report.repositoryUnchanged,
        runCount: report.runCount,
      }),
    );
  },
);
