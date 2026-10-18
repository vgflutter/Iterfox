import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Engine } from '../src/core/engine.js';
import { questions } from '../src/core/compass.js';
import { brief } from '../src/core/brief.js';
import { project } from '../src/core/model.js';
import { auditChanges, git } from '../src/core/workspace.js';
import { CodexProvider } from '../src/providers/codex.js';
import { addDirectionNote, createRun, loadContract, openStore, resumeRun } from '../src/service.js';
import type { AgentProvider } from '../src/providers/provider.js';

test(
  'REAL Codex: evolving product handoff, independent progress, parked naming decision and linked reply',
  {
    skip: process.env.ITERFOX_REAL_COMPASS !== '1',
    timeout: 620000,
  },
  async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'iterfox-compass-real-'));
    const repo = join(dir, 'repository');
    await cp(fileURLToPath(new URL('../examples/handoff-lab/', import.meta.url)), repo, {
      recursive: true,
    });
    await git(repo, ['init', '-q']);
    await git(repo, ['add', '.']);
    await git(repo, [
      '-c',
      'user.name=Iterfox Test',
      '-c',
      'user.email=test@iterfox.local',
      'commit',
      '-qm',
      'Frozen evolving-handoff text prototype',
    ]);
    const contract = await loadContract(join(repo, 'iterfox.json'));
    const store = openStore(dir);
    t.after(async () => {
      store.close();
      if (!process.env.ITERFOX_COMPASS_OUT) await rm(dir, { recursive: true, force: true });
    });
    const paragraphs = (await readFile(join(repo, 'handoff.txt'), 'utf8')).trim().split('\n');
    const initial = await createRun(
      store,
      dir,
      repo,
      contract,
      'codex',
      undefined,
      paragraphs.map((text) => ({ text, kind: 'request' as const })),
    );
    const codex = new CodexProvider({
      model: process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol',
      reasoningEffort: 'medium',
      codexPath: process.env.ITERFOX_CODEX_PATH,
    });
    let steered = false;
    const modes: string[] = [];
    const provider: AgentProvider = {
      name: 'codex',
      invoke(r) {
        modes.push(r.mode);
        if (r.mode === 'build' && !steered) {
          steered = true;
          // Simulated user message arrival; every planner and builder response is real SDK output.
          addDirectionNote(store, initial.id, {
            text: 'Keep the duration provisional; audience retention has not been measured.',
            kind: 'hypothesis',
          });
          addDirectionNote(store, initial.id, {
            text: 'The landing must explicitly say this is a text prototype using fictional sources. Do not add subscriptions or publishing.',
            kind: 'decision',
          });
        }
        return codex.invoke(r);
      },
    };
    const started = Date.now();
    const first = await new Engine(store, initial.id, provider).run();
    const firstElapsedMs = Date.now() - started;
    const record = async () => {
      const final = store.get(initial.id);
      const report = {
        measuredAt: new Date().toISOString(),
        fixture: 'handoff-lab',
        dataDir: dir,
        model: process.env.ITERFOX_MODEL ?? 'gpt-6.1-sol',
        reasoningEffort: 'medium',
        limits: contract.limits,
        sourceHead: initial.baseHead,
        firstPhase: {
          elapsedMs: firstElapsedMs,
          status: first.status,
          criteria: first.criteria,
          questions: questions(first),
          direction: first.direction,
        },
        elapsedMs: Date.now() - started,
        modes,
        scheduledSteeringMessages: steered ? 2 : 0,
        operatorReplies: final.notes?.filter((n) => n.replyTo).length ?? 0,
        result: brief(final, store.events(initial.id)),
        events: store.events(initial.id),
        limitations: [
          'Bounded fixture trial, not an overnight soak or comparative benchmark.',
          'Text/local HTML only: no actual audio, video, live news or publishing.',
          'Deterministic checks cover structure and basic escaping, not editorial quality.',
          'Two incoming notes are injected by the harness; all planner and builder responses use the real SDK.',
        ],
      };
      if (process.env.ITERFOX_COMPASS_OUT)
        await writeFile(process.env.ITERFOX_COMPASS_OUT, JSON.stringify(report, null, 2), {
          mode: 0o600,
        });
      console.log(
        JSON.stringify({
          dataDir: dir,
          status: final.status,
          firstPhase: first.status,
          elapsedMs: report.elapsedMs,
          turns: final.turns,
          tokens: final.tokens,
          modes,
        }),
      );
    };
    try {
      assert.equal(first.status, 'BLOCKED', first.reason);
      assert.equal(first.criteria.find((c) => c.id === 'edition')?.status, 'PASSED');
      assert.equal(first.criteria.find((c) => c.id === 'preview')?.status, 'PASSED');
      assert.notEqual(first.criteria.find((c) => c.id === 'landing')?.status, 'PASSED');
      assert(
        !first.nodes.some((n) => n.kind === 'task' && n.criterionId === 'landing' && n.startedAt),
      );
      assert.equal(first.direction?.sourceIds.length, 5, 'incoming notes reconciled without loss');
      const naming = questions(first).find((q) => q.criterionIds.includes('landing'));
      assert(naming, 'naming decision must be explicitly parked');
      addDirectionNote(store, initial.id, {
        text: 'Use Faro as the product name. Keep the fictional text-prototype limitation explicit.',
        kind: 'decision',
        replyTo: naming.noteId,
      });
      resumeRun(store, initial.id);
      const final = await new Engine(store, initial.id, provider).run();
      assert.equal(final.status, 'COMPLETED', final.reason);
      assert.equal(final.criteria.filter((c) => c.status === 'PASSED').length, 3);
      assert.equal(questions(final).length, 0);
      assert.equal(final.contractVersion, 1);
      assert(final.tokens > 0 && final.nodes.some((n) => n.threadId));
      assert.match(await readFile(join(final.worktree, 'src/landing.mjs'), 'utf8'), /Faro/);
      await auditChanges(final);
      assert.deepEqual(project(store.events(initial.id)), final);
    } finally {
      await record();
    }
  },
);
