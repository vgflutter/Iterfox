// Reproducible one-shot Codex reference measurement, not a statistical benchmark.
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createDemoRepository, createRun, loadContract, openStore } from '../src/service.js';
import { node } from '../src/core/engine.js';
import { auditChanges, stamp } from '../src/core/workspace.js';
import { check } from '../src/core/check.js';
import { CodexProvider } from '../src/providers/codex.js';

const dir = resolve(process.env.ITERFOX_COMPARE_DIR ?? '.iterfox/comparison');
await mkdir(dir, { recursive: true });
const repository = await createDemoRepository(dir);
const store = openStore(dir);
try {
  const contract = await loadContract(join(repository, 'iterfox.json'));
  const state = await createRun(store, dir, repository, contract, 'codex');
  const provider = new CodexProvider({
    model: process.env.ITERFOX_MODEL,
    codexPath: process.env.ITERFOX_CODEX_PATH,
  });
  const started = Date.now();
  let tokens = 0;
  let threadId = '';
  let failure: string | undefined;
  let claim: unknown;
  try {
    claim = await provider.invoke({
      mode: 'build',
      state,
      node: node({
        kind: 'task',
        role: 'builder',
        title: 'Complete the avatar goal in a single Codex turn',
        objective: contract.goal,
        criterionId: 'render',
        reason: 'Reference run without Iterfox planning or corrective scheduling.',
      }),
      signal: AbortSignal.timeout(180_000),
      onUsage: (n) => {
        tokens += n;
      },
      onThread: (id) => {
        threadId = id;
      },
    });
    await auditChanges(state);
  } catch (e) {
    failure = e instanceof Error ? e.message : String(e);
  }
  const results = [];
  for (const criterion of contract.criteria) {
    const fingerprint = await stamp(state.worktree, criterion.scope);
    results.push({
      criterionId: criterion.id,
      fingerprint,
      ...(await check(state.worktree, criterion, AbortSignal.timeout(65_000))),
    });
  }
  const report = {
    measuredAt: new Date().toISOString(),
    method:
      'One Codex SDK build turn followed by independent approved command checks. No external replanning.',
    model: process.env.ITERFOX_MODEL ?? 'local Codex default (not pinned)',
    elapsedMs: Date.now() - started,
    reportedTokens: tokens,
    threadId,
    operatorInterventionsAfterStart: 0,
    verified: failure ? 0 : results.filter((r) => r.exitCode === 0).length,
    claim,
    failure,
    checks: results,
    worktree: state.worktree,
    caveats: [
      'Single small fixture; not statistically meaningful.',
      'Iterfox integration test uses an explicit initial inspection task and is not a matched timing benchmark.',
      'Codex Goals and third-party orchestrators are not measured by this script.',
    ],
  };
  await writeFile(join(dir, 'codex-baseline.json'), JSON.stringify(report, null, 2), {
    mode: 0o600,
  });
  console.log(
    JSON.stringify(
      {
        ...report,
        checks: results.map((r) => ({
          criterionId: r.criterionId,
          exitCode: r.exitCode,
          durationMs: r.durationMs,
        })),
      },
      null,
      2,
    ),
  );
} finally {
  store.close();
}
