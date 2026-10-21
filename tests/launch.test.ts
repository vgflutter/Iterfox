import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { LaunchService } from '../src/launch/service.js';
import { collectRepositoryEvidence } from '../src/proposals/evidence.js';
import type { Proposal } from '../src/proposals/model.js';
import { git } from '../src/core/workspace.js';
import { fixture } from './helpers.js';

test('review never executes a proposed command; one reviewed authorization can be consumed only once', async (t) => {
  const f = await fixture(t);
  const service = new LaunchService();
  t.after(() => service.close());
  const contract = structuredClone(f.contract);
  contract.criteria[0].command = [
    'node',
    '-e',
    "require('node:fs').writeFileSync('unexpected-execution', 'executed')",
  ];
  const before = f.store.events(f.id).length;
  const preview = await service.review({ repository: f.repository, contract });
  await assert.rejects(access(join(f.repository, 'unexpected-execution')));
  const request = {
    authorized: true,
    authorizationId: preview.authorization.id,
    repository: preview.repository,
    contract: preview.contract,
  };
  const results = await Promise.allSettled([
    service.authorize(request),
    service.authorize(request),
  ]);
  assert.equal(results.filter((r) => r.status === 'fulfilled').length, 1);
  assert.equal(results.filter((r) => r.status === 'rejected').length, 1);
  const success = results.find((r) => r.status === 'fulfilled')!;
  assert.equal(success.value.expectedHead, preview.head);
  assert.equal(f.store.events(f.id).length, before, 'Review and authorization do not create a run');
  await assert.rejects(access(join(f.repository, 'unexpected-execution')));
  const changed = await service.review({ repository: f.repository, contract });
  await assert.rejects(
    service.authorize({
      ...request,
      authorizationId: changed.authorization.id,
      contract: { ...changed.contract, goal: 'Changed after the reviewed preflight' },
    }),
    /changed/i,
  );
});

test('changing HEAD invalidates reviewed authorization and cancelling ignores a late model response', async (t) => {
  const f = await fixture(t);
  const snapshot = await collectRepositoryEvidence(
    f.repository,
    f.contract.goal,
    new AbortController().signal,
  );
  const proposal: Proposal = {
    id: randomUUID(),
    status: 'draft',
    provider: 'codex',
    originalGoal: f.contract.goal,
    inputKey: 'fixture',
    createdAt: new Date().toISOString(),
    repository: f.repository,
    head: snapshot.head,
    snapshot,
    draft: {
      ...f.contract,
      supervision: { mode: 'project', maxReviews: 10 },
      criteria: f.contract.criteria.map((c) => ({
        ...c,
        sources: [],
        rationale: 'Explicit local lifecycle fixture, not a model assessment.',
        gap: null,
      })),
      observations: [],
      assumptions: [],
    },
    observations: [],
    checkStatus: 'not-run',
    authorizationRequired: true,
    usage: { inputTokens: 0, outputTokens: 0 },
    notices: ['Explicit test fixture; no model response is claimed.'],
  };
  let finish!: (value: Proposal) => void;
  const service = new LaunchService({
    generate: () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  });
  t.after(() => service.close());
  const job = service.start({ repository: f.repository, goal: f.contract.goal });
  await new Promise((resolve) => setImmediate(resolve));
  service.cancel(job.id);
  finish(proposal);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(service.get(job.id).status, 'cancelled');
  assert.equal(service.get(job.id).proposal, undefined);
  const preview = await service.review({ repository: f.repository, contract: f.contract });
  await git(f.repository, [
    '-c',
    'user.name=Iterfox Test',
    '-c',
    'user.email=test@iterfox.local',
    'commit',
    '--allow-empty',
    '-qm',
    'Advance HEAD after review',
  ]);
  await assert.rejects(
    service.authorize({
      authorized: true,
      authorizationId: preview.authorization.id,
      repository: preview.repository,
      contract: preview.contract,
    }),
    /HEAD changed/,
  );
});
