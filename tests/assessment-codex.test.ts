import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { git } from '../src/core/workspace.js';
import { Engine } from '../src/core/engine.js';
import { CodexProvider } from '../src/providers/codex.js';
import { createRun, openStore, loadContract } from '../src/service.js';

test(
  'REAL Codex qualitative assessor: structured rubric and provenance on an actual transcript',
  { skip: !process.env.ITERFOX_REAL_ASSESSOR, timeout: 240000 },
  async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'iterfox-assessor-'));
    const repo = join(dir, 'repo');
    await cp(fileURLToPath(new URL('../examples/qualitative-lab/', import.meta.url)), repo, {
      recursive: true,
    });
    if (process.env.ITERFOX_ASSESSOR_IMAGE)
      await cp(process.env.ITERFOX_ASSESSOR_IMAGE, join(repo, 'portrait.png'));
    await git(repo, ['init', '-q']);
    await git(repo, ['add', '.']);
    await git(repo, [
      '-c',
      'user.name=Iterfox Test',
      '-c',
      'user.email=test@iterfox.local',
      'commit',
      '-qm',
      'Approved dialogue rubric fixture',
    ]);
    const contract = await loadContract(join(repo, 'iterfox.json'));
    contract.limits.maxAttempts = 1;
    const policy = contract.criteria[0].verification;
    assert(policy?.kind === 'qualitative');
    if (process.env.ITERFOX_ASSESSOR_IMAGE) {
      policy.files.push('portrait.png');
      policy.rubric.push({
        id: 'avatar-image',
        description:
          'The supplied portrait PNG visibly contains a round green avatar with a light face and two dark eyes. Judge only visible features, not text claims.',
        minScore: 4,
      });
      policy.instructions +=
        ' Also assess the attached PNG against the avatar-image rubric. Explicitly state if you cannot see it.';
    }
    const store = openStore(dir);
    t.after(async () => {
      store.close();
      await rm(dir, { recursive: true, force: true });
    });
    const state = await createRun(store, dir, repo, contract, 'codex');
    const codex = new CodexProvider({
      model: process.env.ITERFOX_MODEL,
      codexPath: process.env.ITERFOX_CODEX_PATH,
    });
    const started = Date.now();
    const final = await new Engine(store, state.id, {
      name: 'codex',
      invoke(r) {
        // This test isolates the real assessor. Planning and building are explicit no-edit fixtures.
        if (r.mode === 'plan')
          return Promise.resolve({
            tasks: [
              {
                title: 'Read the dialogue fixture',
                objective: 'Preserve the transcript for an assessor integration test.',
                criterionId: 'dialogue',
              },
            ],
          });
        if (r.mode === 'build')
          return Promise.resolve({
            summary: 'TEST FIXTURE: no edits; isolate the real Codex assessor.',
            blocked: false,
            reason: '',
          });
        return codex.invoke(r);
      },
    }).run();
    const e = final.evidence.find((e) => e.kind === 'ai-assessed');
    assert(e, final.reason);
    assert.equal(e.assessment?.reviewer, 'codex');
    assert.equal(e.assessment?.independent, false);
    assert.deepEqual(
      e.assessment!.ratings.map((r) => r.id).sort(),
      policy.rubric.map((r) => r.id).sort(),
    );
    if (process.env.ITERFOX_ASSESSOR_IMAGE)
      assert(e.artifacts?.some((a) => a.name === 'portrait.png'));
    assert(final.tokens > 0);
    assert(!store.events(state.id).some((e) => e.type === 'verification.passed'));
    const result = {
      status: final.status,
      evidenceStatus: e.status,
      assessor: 'real Codex SDK',
      otherRoles: 'no-edit test fixtures',
      pngInput: Boolean(process.env.ITERFOX_ASSESSOR_IMAGE),
      durationMs: Date.now() - started,
      reportedTokens: final.tokens,
      assessment: e.assessment,
    };
    console.log(JSON.stringify(result));
    if (process.env.ITERFOX_ASSESSOR_OUTPUT)
      await writeFile(process.env.ITERFOX_ASSESSOR_OUTPUT, JSON.stringify(result, null, 2));
  },
);
