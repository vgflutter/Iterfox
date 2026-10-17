// Opt-in follow-up using an existing frozen assessment, never altering its files.
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { parseArgs, promisify } from 'node:util';
import { join, resolve } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRun, loadContract, openStore } from '../src/service.js';
import { Engine } from '../src/core/engine.js';
import { CodexProvider } from '../src/providers/codex.js';
import { auditChanges, git, stamp, worktreeDiff } from '../src/core/workspace.js';
import { brief, markdownBrief } from '../src/core/brief.js';
import { project } from '../src/core/model.js';

const execute = promisify(execFile);
const { values } = parseArgs({
  options: { assessment: { type: 'string' }, out: { type: 'string' } },
});
if (!values.assessment)
  throw new Error(
    'Provide --assessment <directory-containing-protocol.json-and-frozen-fixture>. This explicitly opts in to a real Codex run.',
  );
const old = resolve(values.assessment);
const output = resolve(
  values.out ??
    `/private/tmp/iterfox-scheduling-followup-${Date.now()}-${randomUUID().slice(0, 8)}`,
);
const hash = (b: Uint8Array | string) => createHash('sha256').update(b).digest('hex');
const protocolBytes = await readFile(join(old, 'protocol.json'));
const protocol = JSON.parse(protocolBytes.toString());
assert.equal(
  protocol.model,
  'gpt-6.1-sol',
  'Review a different model/protocol before reusing this measurement script',
);
assert.match(protocol.reasoningEffort, /^xhigh/);
assert.equal(
  hash(await readFile(join(old, 'holdout.mjs'))),
  protocol.holdoutSha256,
  'Frozen holdout must be unchanged',
);
const runtime = fileURLToPath(new URL('..', import.meta.url));
if (await git(runtime, ['status', '--porcelain', '--untracked-files=normal']))
  throw new Error(
    'Commit the runtime and harness before freezing a follow-up. No dirty runtime trials.',
  );
const runtimeCommit = await git(runtime, ['rev-parse', 'HEAD']);
await mkdir(output, { mode: 0o700 }); // an existing output directory is refused
const repository = join(output, 'fixture');
await execute('git', [
  'clone',
  '--no-hardlinks',
  '--no-checkout',
  '--',
  join(old, 'fixture'),
  repository,
]);
await git(repository, ['checkout', '--detach', protocol.fixtureCommit]);
assert.equal(await git(repository, ['rev-parse', 'HEAD']), protocol.fixtureCommit);
const contract = await loadContract(join(repository, 'iterfox.json'));
assert.deepEqual(contract, protocol.contract, 'Same approved checks, scopes, goal and limits');
const data = join(output, 'run');
const store = openStore(data);
const state = await createRun(store, data, repository, contract, 'codex', protocol.fixtureCommit);
await writeFile(
  join(output, 'protocol.json'),
  JSON.stringify(
    {
      frozenAt: new Date().toISOString(),
      runtimeCommit,
      sourceAssessmentSha256: hash(protocolBytes),
      originalProtocol: protocol,
      model: protocol.model,
      reasoningEffort: 'xhigh, explicitly pinned',
      SDK: '0.163.0',
      runId: state.id,
      design:
        'One prospective Iterfox follow-up against the same frozen initial fixture, tests and limits. Prior direct/Iterfox samples are historical references, not a new randomized pair.',
      intervention:
        'Adjacent acceptance-unit grouping, deterministic coverage probes, deferred corrections and evidence-backed skips. Same network/tool restrictions.',
      restrictions: [
        'No prompt changes, source edits, reruns or budget increases after start.',
        'Independent protected commands and unchanged holdout after the primary run.',
        'Reported usage is not monetary cost or a hard in-flight cap.',
      ],
    },
    null,
    2,
  ),
  { flag: 'wx', mode: 0o600 },
);
console.log(
  `Frozen follow-up: ${output}\nRuntime ${runtimeCommit}; fixture ${protocol.fixtureCommit}; ${protocol.model}/xhigh`,
);
const provider = new CodexProvider({
  model: protocol.model,
  reasoningEffort: 'xhigh',
  codexPath: process.env.ITERFOX_CODEX_PATH,
});
const started = Date.now();
let cursor = 0;
const timer = setInterval(() => {
  for (const e of store.events(state.id, cursor)) {
    cursor = e.seq;
    if (
      [
        'task.started',
        'task.completed',
        'task.skipped',
        'verification.passed',
        'verification.failed',
        'verification.deferred',
        'corrective.inserted',
        'agent.usage',
        'workflow.blocked',
        'workflow.completed',
      ].includes(e.type)
    )
      console.log(JSON.stringify({ seq: e.seq, type: e.type, message: e.message }));
  }
}, 1000);
let final;
try {
  final = await new Engine(store, state.id, provider).run();
} finally {
  clearInterval(timer);
}
const solveElapsedMs = Date.now() - started;
let integrityError: string | undefined;
try {
  await auditChanges(final);
} catch (e) {
  integrityError = String(e);
}
const checks = [];
for (const c of contract.criteria) {
  try {
    const r = await execute(c.command[0], c.command.slice(1), {
      cwd: final.worktree,
      timeout: c.timeoutMs,
      maxBuffer: 4 * 1024 * 1024,
    });
    checks.push({ id: c.id, exitCode: 0, output: r.stdout + r.stderr });
  } catch (e) {
    const r = e as { code?: string | number; stdout?: string; stderr?: string; message?: string };
    checks.push({
      id: c.id,
      exitCode: r.code ?? null,
      output: (r.stdout ?? '') + (r.stderr ?? ''),
      error: r.message,
    });
  }
}
let holdout;
try {
  const r = await execute(process.execPath, ['--test', join(old, 'holdout.mjs')], {
    cwd: final.worktree,
    timeout: 60000,
    maxBuffer: 4 * 1024 * 1024,
  });
  holdout = { exitCode: 0, output: r.stdout + r.stderr };
} catch (e) {
  const r = e as { code?: string | number; stdout?: string; stderr?: string; message?: string };
  holdout = {
    exitCode: r.code ?? null,
    output: (r.stdout ?? '') + (r.stderr ?? ''),
    error: r.message,
  };
}
const events = store.events(final.id);
assert.deepEqual(project(events), final);
const report = {
  runtimeCommit,
  fixtureCommit: protocol.fixtureCommit,
  model: protocol.model,
  reasoningEffort: 'xhigh',
  runId: final.id,
  worktree: final.worktree,
  solveElapsedMs,
  reportedTokens: final.tokens,
  agentTurns: final.turns,
  operatorInterventionsAfterStart: 0,
  status: final.status,
  reason: final.reason,
  runtimeCertified: final.criteria.filter((c) => c.status === 'PASSED').length,
  independentlyPassingCriteria: checks.filter((c) => c.exitCode === 0).length,
  integrityError,
  checks,
  holdout,
  diff: await worktreeDiff(final.worktree, final.baseHead),
  finalFingerprint: await stamp(final.worktree),
  events,
  result: brief(final, events),
  priorSamples: JSON.parse(await readFile(join(old, 'assessment.json'), 'utf8')),
  finishedAt: new Date().toISOString(),
};
await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2), {
  flag: 'wx',
  mode: 0o600,
});
await writeFile(join(output, 'brief.md'), markdownBrief(final, events), {
  flag: 'wx',
  mode: 0o600,
});
console.log(
  JSON.stringify({
    output,
    status: final.status,
    reason: final.reason,
    solveElapsedMs,
    reportedTokens: final.tokens,
    agentTurns: final.turns,
    runtimeCertified: report.runtimeCertified,
    independentlyPassingCriteria: report.independentlyPassingCriteria,
    holdoutExit: holdout.exitCode,
    integrityError,
  }),
);
store.close();
