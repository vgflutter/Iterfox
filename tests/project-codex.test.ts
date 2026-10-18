import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Engine } from '../src/core/engine.js';
import { project } from '../src/core/model.js';
import { auditChanges } from '../src/core/workspace.js';
import { brief } from '../src/core/brief.js';
import { CodexProvider } from '../src/providers/codex.js';
import { createDemoRepository, createRun, loadContract, openStore } from '../src/service.js';

test(
  'REAL Codex project session: discover and fix a goal defect despite green regression gates, without new operator instructions',
  {
    skip: process.env.ITERFOX_REAL_PROJECT !== '1',
    timeout: 620000,
  },
  async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'iterfox-project-real-'));
    const repo = await createDemoRepository(dir);
    const contract = await loadContract(join(repo, 'iterfox.json'));
    contract.goal =
      'Deliver a robust avatar-label and two-presenter dialogue module ready for real user names. Missing or whitespace-only names use ?. Labels preserve the complete first Unicode code point (including emoji and supplementary-plane letters) and uppercase it when applicable. Two speakers exchange distinct turns. Work toward this complete behavior, preserve the tests and existing API, and choose reversible implementation details autonomously.';
    contract.supervision = { mode: 'project', maxReviews: 10 };
    contract.limits = {
      maxTurns: 30,
      maxAttempts: 3,
      maxDurationMs: 600000,
      maxTokens: 10000000,
      turnTimeoutMs: 180000,
      maxNoProgress: 3,
    };
    const store = openStore(dir);
    t.after(async () => {
      store.close();
      if (!process.env.ITERFOX_PROJECT_OUT) await rm(dir, { recursive: true, force: true });
    });
    const initial = await createRun(store, dir, repo, contract, 'codex');
    const model = process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol';
    const modes: string[] = [];
    const codex = new CodexProvider({
      model,
      reasoningEffort: 'high',
      codexPath: process.env.ITERFOX_CODEX_PATH,
    });
    const engine = new Engine(store, initial.id, {
      name: 'codex',
      invoke(r) {
        modes.push(r.mode);
        return codex.invoke(r);
      },
    });
    const emit = engine.emit.bind(engine);
    let injected = false;
    engine.emit = (type, message, data) => {
      const s = emit(type, message, data);
      if (
        type === 'verification.passed' &&
        !injected &&
        s.criteria.every((c) => c.status === 'PASSED') &&
        !s.nodes.some((n) => ['RUNNING', 'VERIFYING', 'PENDING'].includes(n.status))
      ) {
        injected = true;
        // Controlled latent regression, no model output or task is scripted. Existing gates still pass.
        writeFileSync(
          join(s.worktree, 'avatar.mjs'),
          `// Controlled fault injected after a verified milestone in the test harness.\nexport function avatarLabel(name) { const text = String(name ?? '').trim(); return text ? text[0].toUpperCase() : '?'; }\nexport function dialogue(names) { return names.map((name, i) => i === 0 ? \`\${avatarLabel(name)}: Hello!\` : \`\${avatarLabel(name)}: Hi, \${avatarLabel(names[i-1])}!\`).join('\\n'); }\n`,
        );
        emit(
          'decision.recorded',
          'TEST HARNESS: injected a Unicode-splitting regression after green gates, without adding an operator prompt.',
          { kind: 'test.fault', path: 'avatar.mjs' },
        );
      }
      return s;
    };
    const start = Date.now();
    const final = await engine.run();
    const events = store.events(initial.id);
    const report = {
      measuredAt: new Date().toISOString(),
      model,
      reasoningEffort: 'high',
      dataDir: dir,
      elapsedMs: Date.now() - start,
      modes,
      faultInjected: injected,
      operatorMessages: final.notes?.length ?? 0,
      result: brief(final, events),
      events,
      limitations: [
        'One bounded fault-injection trial, not an overnight soak or a user-time comparison.',
        'All planner, builder, diagnosis and supervisor responses use the real SDK. The harness injects one source regression; it does not script the review or repair.',
        'Supervisor judgments use the same integration and are probabilistic. Independent holdout cases check the specific Unicode behavior.',
      ],
    };
    if (process.env.ITERFOX_PROJECT_OUT)
      await writeFile(process.env.ITERFOX_PROJECT_OUT, JSON.stringify(report, null, 2), {
        mode: 0o600,
      });
    console.log(
      JSON.stringify({
        dataDir: dir,
        status: final.status,
        elapsedMs: report.elapsedMs,
        modes,
        reviews: final.projectReviews?.length,
        discovered: final.nodes.filter((n) => n.discoveredBy).length,
        operatorMessages: report.operatorMessages,
      }),
    );
    assert(injected, 'protocol requires a regression after a verified milestone');
    assert.equal(final.status, 'COMPLETED', final.reason);
    assert.equal(report.operatorMessages, 0);
    assert(final.projectReviews?.some((r) => r.outcome === 'continue' && r.tasks.length));
    assert(final.nodes.some((n) => n.discoveredBy && n.startedAt));
    assert.equal(final.projectReviews?.at(-1)?.outcome, 'ready');
    assert(final.criteria.every((c) => c.status === 'PASSED'));
    await auditChanges(final);
    const module = await import(pathToFileURL(join(final.worktree, 'avatar.mjs')).href);
    for (const [name, label] of [
      ['🦊 Fox', '🦊'],
      ['😀 Smile', '😀'],
      ['𐐨name', '𐐀'],
      [' Ada', 'A'],
      ['', '?'],
      [null, '?'],
    ])
      assert.equal(module.avatarLabel(name), label, `independent holdout ${JSON.stringify(name)}`);
    assert.deepEqual(project(events), final);
  },
);
