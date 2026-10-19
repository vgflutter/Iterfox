import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Engine } from '../src/core/engine.js';
import { project } from '../src/core/model.js';
import { buildSchema } from '../src/providers/provider.js';
import { fixture } from './helpers.js';

async function repair(cwd: string, labels: boolean, dialogue: boolean) {
  const path = join(cwd, 'avatar.mjs');
  let source = await readFile(path, 'utf8');
  if (labels)
    source = source.replace(
      'return name.trim()[0].toUpperCase();',
      "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
    );
  if (dialogue)
    source = source.replace(
      'names.map(name => `${avatarLabel(name)}: Hello!`)',
      'names.map((name, i) => i === 0 ? `${avatarLabel(name)}: Hello!` : `${avatarLabel(name)}: Hi, ${avatarLabel(names[i - 1])}!`)',
    );
  await writeFile(path, source + '\n// Explicit test-provider implementation.\n');
}

for (const immediate of [true, false]) {
  test(`host verification handoff continues planned work when its probe ${immediate ? 'passes' : 'still needs later implementation'}`, async (t) => {
    const f = await fixture(t, (c) => {
      c.criteria[0].command = [
        'node',
        '--input-type=module',
        '-e',
        "import assert from 'node:assert/strict';import {createServer} from 'node:net';import {avatarLabel} from './avatar.mjs';assert.equal(avatarLabel(''), '?');const s=createServer();s.listen(0,'127.0.0.1',()=>s.close());",
      ];
    });
    let builds = 0;
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan')
          return {
            tasks: [
              {
                title: 'Implement labels',
                objective: 'Normalize empty names before dialogue work.',
                criterionId: 'render',
              },
              {
                title: 'Implement dialogue',
                objective: 'Finish dialogue and any remaining normalization.',
                criterionId: 'dialogue',
              },
            ],
          };
        assert.equal(r.mode, 'build', 'Agent-local verification must not invent a diagnosis');
        builds++;
        if (builds === 1) {
          await repair(r.state.worktree, immediate, false);
          return {
            summary:
              'Implementation checkpoint; sandbox-local listener verification is unobserved.',
            blocked: false,
            reason: 'Agent-local EPERM is not an implementation blocker.',
            verificationRequest: { criterionIds: ['render'] },
          };
        }
        assert.equal(r.state.criteria[0].status, immediate ? 'PASSED' : 'UNVERIFIED');
        await repair(r.state.worktree, true, true);
        return {
          summary: 'Completed remaining planned implementation.',
          blocked: false,
          reason: '',
          verificationRequest: null,
        };
      },
    }).run();
    assert.equal(final.status, 'COMPLETED', final.reason);
    assert.equal(builds, 2);
    assert(final.criteria.every((c) => c.status === 'PASSED'));
    const events = f.store.events(f.id);
    assert(events.some((e) => e.data.kind === 'verification.handoff'));
    assert(
      !events.some((e) =>
        ['workflow.blocked', 'verification.failed', 'diagnosis.proposed'].includes(e.type),
      ),
    );
    assert(
      final.evidence.some(
        (e) => e.criterionId === 'render' && e.status === 'passed' && e.exitCode === 0,
      ),
    );
    assert.deepEqual(project(events), final);
  });
}

test('handoff cannot invent checks and genuine implementation blockers still stop execution', async (t) => {
  for (const unknown of [false, true]) {
    const f = await fixture(t, (c) => {
      c.criteria = [c.criteria[0]];
    });
    const final = await new Engine(f.store, f.id, {
      name: 'demo',
      async invoke(r) {
        if (r.mode === 'plan')
          return {
            tasks: [
              {
                title: 'Implement labels',
                objective: 'Normalize labels within approved paths.',
                criterionId: 'render',
              },
            ],
          };
        return unknown
          ? {
              summary: 'Requesting an unapproved check.',
              blocked: false,
              reason: '',
              verificationRequest: { criterionIds: ['invented-check'] },
            }
          : {
              summary: 'Implementation needs a protected configuration change.',
              blocked: true,
              reason: 'Protected edits require operator review.',
            };
      },
    }).run();
    assert.equal(final.status, 'BLOCKED');
    assert.match(
      final.reason!,
      unknown ? /Invalid runtime verification request/ : /Protected edits/,
    );
    assert(!f.store.events(f.id).some((e) => e.data.kind === 'verification.handoff'));
  }
  assert.throws(() =>
    buildSchema.parse({
      summary: 'Contradictory state',
      blocked: true,
      reason: 'Protected edit',
      verificationRequest: { criterionIds: ['render'] },
    }),
  );
});
