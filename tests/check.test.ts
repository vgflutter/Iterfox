import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, chmod, mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { criterionSchema } from '../src/core/model.js';
import { check } from '../src/core/check.js';
import { codexPolicy } from '../src/providers/codex-policy.js';

test('command checks preserve argv literally, record nonzero/spawn failures and time out', async () => {
  const signal = new AbortController().signal;
  const literal = criterionSchema.parse({
    id: 'literal',
    title: 'Literal arguments',
    command: [
      process.execPath,
      '-e',
      'console.log(process.argv[1]); process.exitCode=7',
      '$(echo should-not-execute)',
    ],
  });
  const result = await check(process.cwd(), literal, signal);
  assert.equal(result.exitCode, 7);
  assert.match(result.output, /\$\(echo should-not-execute\)/);
  const missing = await check(
    process.cwd(),
    { ...literal, command: ['iterfox-nonexistent-command-5731'] },
    signal,
  );
  assert.equal(missing.exitCode, null);
  assert.match(missing.output, /ENOENT/);
  const timed = await check(
    process.cwd(),
    { ...literal, command: [process.execPath, '-e', 'setInterval(()=>{},1000)'], timeoutMs: 100 },
    signal,
  );
  assert.equal(timed.timedOut, true);
  assert.equal(timed.exitCode, null);
  assert(timed.durationMs < 3000);
});

test('stop terminates an actual verifier process before reporting interruption', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-process-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const pidFile = join(dir, 'pid');
  const controller = new AbortController();
  const work = check(
    dir,
    criterionSchema.parse({
      id: 'process',
      title: 'Long check',
      command: [
        process.execPath,
        '-e',
        'require("node:fs").writeFileSync(process.argv[1],String(process.pid));setInterval(()=>{},1000)',
        pidFile,
      ],
    }),
    controller.signal,
  );
  // Attach the rejection handler before aborting to avoid an unhandled-rejection race.
  const rejected = assert.rejects(work, /Operator stopped/);
  let pid = 0;
  for (let i = 0; i < 100 && !pid; i++) {
    try {
      pid = Number(await readFile(pidFile, 'utf8'));
    } catch {
      await new Promise((r) => setTimeout(r, 10));
    }
  }
  assert(pid > 0);
  controller.abort(new Error('Operator stopped'));
  await rejected;
  assert.throws(() => process.kill(pid, 0), /ESRCH/);
});

test('Codex policy disables inherited integrations and fails closed if the policy cannot be confirmed', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'iterfox-policy-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const executable = join(dir, 'codex-fixture');
  await writeFile(
    executable,
    '#!/usr/bin/env node\nconst args=process.argv; const disabled=args.includes("mcp_servers.external.enabled=false"); console.log(JSON.stringify([{name:"external",enabled:!disabled}]));\n',
  );
  await chmod(executable, 0o755);
  const policy = await codexPolicy(dir, AbortSignal.timeout(5000), executable);
  assert.equal(policy.config.features.apps, false);
  assert.equal(policy.config.features.multi_agent, false);
  assert.deepEqual(policy.configOverrides, ['mcp_servers.external.enabled=false']);
  await writeFile(
    executable,
    '#!/usr/bin/env node\nconsole.log(JSON.stringify([{name:"external",enabled:true}]));\n',
  );
  await assert.rejects(codexPolicy(dir, AbortSignal.timeout(5000), executable), /still exposes/);
  await writeFile(executable, '#!/usr/bin/env node\nconsole.log("not valid JSON");\n');
  await assert.rejects(
    codexPolicy(dir, AbortSignal.timeout(5000), executable),
    /could not be verified/,
  );
});
