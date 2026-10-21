import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, writeFile, rm, access, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDemoRepository, openStore } from '../../src/service.ts';
import { git, stamp } from '../../src/core/workspace.ts';
import { DelegationStore } from '../../src/delegations/service.ts';
import { reportFixture } from './fixture.mjs';

const execute = promisify(execFile);
const cli = fileURLToPath(new URL('../../src/cli.ts', import.meta.url));
const template = new URL('../../examples/avatar-lab/delegation.json', import.meta.url);

function runCli(args, cwd) {
  return execute(process.execPath, ['--import', import.meta.resolve('tsx'), cli, ...args], {
    cwd,
    timeout: 30000,
    maxBuffer: 8 * 1024 * 1024,
    // These tests must never launch a real model, even if a regression reaches a provider.
    env: {
      ...process.env,
      ITERFOX_CODEX_PATH: join(tmpdir(), 'iterfox-no-real-codex-in-cli-tests'),
    },
  });
}

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-agent-cli-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const repo = await createDemoRepository(dir);
  const config = join(dir, 'delegation.json');
  const data = join(dir, 'not-opened-by-preflight');
  const spec = JSON.parse(await readFile(template, 'utf8'));
  await writeFile(config, JSON.stringify(spec));
  return { dir, repo, config, data, spec };
}

test('agent CLI preflight validates the complete example without a ledger, source edits or checks', async (t) => {
  const f = await fixture(t);
  const before = await stamp(f.repo);
  const args = ['delegation', 'preflight', '--config', f.config, '--data', f.data];
  const { stdout } = await runCli(args, f.repo);
  const result = JSON.parse(stdout);
  assert.equal(result.expectedHead, before.head);
  assert.equal(result.spec.repository, await realpath(f.repo));
  assert.match(result.specHash, /^[a-f0-9]{64}$/);
  assert.equal(result.authorizationRequired, true);
  assert.equal(result.spec.milestones.length, 2);
  assert.deepEqual(result.spec.milestones[1].dependsOn, ['labels']);
  assert.deepEqual(await stamp(f.repo), before);
  await assert.rejects(access(f.data), { code: 'ENOENT' });

  const out = join(f.dir, 'preflight.json');
  const saved = await runCli([...args, '--out', out], f.repo);
  assert.equal(saved.stdout, '');
  assert.deepEqual(JSON.parse(await readFile(out, 'utf8')), result);
  await assert.rejects(access(f.data), { code: 'ENOENT' });

  await runCli(['delegation', '--help', '--data', f.data], f.repo);
  await assert.rejects(access(f.data), { code: 'ENOENT' });
  await writeFile(join(f.repo, 'unreviewed.txt'), 'Uncommitted source must be rejected.');
  await assert.rejects(runCli(args, f.repo), (e) => /Commit and review/.test(e.stderr));
  await assert.rejects(access(f.data), { code: 'ENOENT' });
});

test('agent CLI pinned launch rejects changed configuration or HEAD and still requires authorization', async (t) => {
  const f = await fixture(t);
  const receipt = join(f.dir, 'preflight.json');
  await runCli(['delegation', 'preflight', '--config', f.config, '--out', receipt], f.repo);
  const args = [
    'delegation',
    'run',
    '--config',
    f.config,
    '--preflight',
    receipt,
    '--data',
    f.data,
  ];
  // Matching inputs reach authorization, but noninteractive callers cannot invent consent.
  await assert.rejects(runCli(args, f.repo), (e) => /Authorization required/.test(e.stderr));
  await writeFile(
    f.config,
    JSON.stringify({
      ...f.spec,
      contract: { ...f.spec.contract, goal: 'A different goal needs a fresh reviewed preflight.' },
    }),
  );
  await assert.rejects(runCli([...args, '--night', '--yes'], f.repo), (e) =>
    /changed since preflight/.test(e.stderr),
  );
  await writeFile(f.config, JSON.stringify(f.spec));
  await writeFile(
    join(f.repo, 'avatar.mjs'),
    (await readFile(join(f.repo, 'avatar.mjs'), 'utf8')) + '\n',
  );
  await git(f.repo, ['add', 'avatar.mjs']);
  await git(f.repo, [
    '-c',
    'user.name=Fixture',
    '-c',
    'user.email=fixture@iterfox.local',
    'commit',
    '-qm',
    'Changed committed source after preflight',
  ]);
  await assert.rejects(runCli([...args, '--night', '--yes'], f.repo), (e) =>
    /changed since preflight/.test(e.stderr),
  );
  const runs = openStore(f.data);
  try {
    assert.deepEqual(new DelegationStore(runs).list(), []);
    assert.deepEqual(runs.list(), []);
  } finally {
    runs.close();
  }
});

test('agent CLI exports cross-mission proof in three formats without changing saved history', async () => {
  const f = await reportFixture();
  try {
    const data = join(f.dir, 'data');
    const counts = f.runs.list().map((r) => [r.id, r.seq]);
    const original = JSON.stringify(f.store.get(f.completed.id));
    const calls = f.modelCalls;
    const args = ['delegation', 'report', f.completed.id, '--data', data];
    const { stdout } = await runCli([...args, '--format', 'json'], f.dir);
    const report = JSON.parse(stdout);
    assert.equal(report.schemaVersion, 1);
    assert.equal(report.status, 'COMPLETED');
    assert.equal(report.completedOutcomeCount, 2);
    assert.equal(report.pendingOutcomeCount, 0);
    assert.equal(report.requiresProductReview, true);
    assert.equal(report.sourceFreshness.status, 'UNOBSERVED');
    for (const stage of f.completed.stages) {
      const outcome = report.outcomes.find((o) => o.id === stage.id);
      assert.equal(outcome.runId, stage.runId);
      assert.equal(outcome.checkpoint.head, stage.checkpoint.head);
      assert(outcome.criteria.every((c) => c.status === 'PASSED' && c.evidence));
    }
    for (const format of ['markdown', 'html']) {
      const out = join(f.dir, `result.${format}`);
      const result = await runCli([...args, '--format', format, '--out', out], f.dir);
      assert.equal(result.stdout, '');
      const text = await readFile(out, 'utf8');
      assert(text.includes(f.completed.stages[1].checkpoint.head));
      assert(
        /2\s*\/\s*2 outcomes checkpointed/.test(text),
        'Report retains both completed outcomes',
      );
      if (format === 'html') assert.doesNotMatch(text, /<script\b/i);
    }
    const metadata = await runCli(
      ['delegation', 'brief', f.completed.id, '--data', data, '--json'],
      f.dir,
    );
    assert.equal(JSON.parse(metadata.stdout).specHash, f.completed.specHash);
    const status = await runCli(
      ['delegation', 'status', f.completed.id, '--data', data, '--json'],
      f.dir,
    );
    assert.equal(JSON.parse(status.stdout).id, f.completed.id);
    const invalidOut = join(f.dir, 'must-not-exist');
    await assert.rejects(
      runCli([...args, '--format', 'unknown', '--out', invalidOut], f.dir),
      (e) => /Report format must be/.test(e.stderr),
    );
    await assert.rejects(access(invalidOut), { code: 'ENOENT' });
    assert.deepEqual(
      f.runs.list().map((r) => [r.id, r.seq]),
      counts,
    );
    assert.equal(JSON.stringify(f.store.get(f.completed.id)), original);
    assert.equal(f.modelCalls, calls);
  } finally {
    await f.close();
  }
});
