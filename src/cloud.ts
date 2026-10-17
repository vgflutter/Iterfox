import { spawn, execFile, type ChildProcess } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { z } from 'zod';
import { hash, artifactRoot, readArtifact } from './core/artifacts.js';
import { project, type RunEvent } from './core/model.js';
import { markdownBrief } from './core/brief.js';
import { git } from './core/workspace.js';
import { alive } from './core/store.js';
import {
  openStore,
  loadContract,
  preflight,
  createRun,
  controlRun,
  resumeRun,
  auditStoredEvidence,
  recoverDeadWorkers,
  createDemoRepository,
} from './service.js';
import { launchWorker, launchUi } from './cli.js';

const absolute = z
  .string()
  .regex(/^\//)
  .max(4096)
  .refine(
    (v) => !/[\x00-\x1f%]/.test(v) && !v.split('/').includes('..'),
    'Absolute remote path without traversal, controls or percent specifiers required',
  );
export const targetSchema = z
  .object({
    host: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*(?:@[a-zA-Z0-9][a-zA-Z0-9_.-]*)?$/),
    sshPort: z.number().int().min(1).max(65535).default(22),
    node: absolute.default('/usr/bin/node'),
    entry: absolute,
    repository: absolute,
    contract: absolute,
    data: absolute,
    serviceManager: z.enum(['systemd', 'detached']).default('systemd'),
    port: z.number().int().min(1024).max(65535).default(4320),
  })
  .strict();
export type CloudTarget = z.infer<typeof targetSchema>;
const requestSchema = z
  .object({
    action: z.enum([
      'doctor',
      'preflight',
      'start',
      'status',
      'pause',
      'resume',
      'stop',
      'brief',
      'export',
      'ui',
    ]),
    target: targetSchema,
    id: z
      .string()
      .regex(/^[a-zA-Z0-9-]+$/)
      .optional(),
    expectedHead: z
      .string()
      .regex(/^[a-f0-9]{40,64}$/)
      .optional(),
    contractHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    demo: z.boolean().default(false),
  })
  .strict();
export type CloudRequest = z.infer<typeof requestSchema>;

export const shellQuote = (value: string): string => "'" + value.replaceAll("'", "'\\''") + "'";
export function sshArgs(target: CloudTarget, tunnel = false): string[] {
  target = targetSchema.parse(target);
  const base = [
    '-o',
    'BatchMode=yes',
    '-o',
    'StrictHostKeyChecking=yes',
    '-o',
    'ConnectTimeout=10',
    '-o',
    'ServerAliveInterval=15',
    '-o',
    'ServerAliveCountMax=3',
    '-p',
    String(target.sshPort),
  ];
  if (tunnel)
    return [
      ...base,
      '-o',
      'ExitOnForwardFailure=yes',
      '-N',
      '-L',
      `127.0.0.1:${target.port}:127.0.0.1:${target.port}`,
      '--',
      target.host,
    ];
  return [
    ...base,
    '-T',
    '--',
    target.host,
    `cd ${shellQuote(target.repository)} && exec ${shellQuote(target.node)} ${shellQuote(target.entry)} remote-agent`,
  ];
}

export async function remote(request: CloudRequest): Promise<unknown> {
  request = requestSchema.parse(request);
  const child = spawn('ssh', sshArgs(request.target), {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: false,
  });
  const signal = AbortSignal.timeout(120_000);
  let output = '';
  let error = '';
  const abort = () => child.kill('SIGTERM');
  signal.addEventListener('abort', abort, { once: true });
  child.stdout.on('data', (chunk) => {
    output += chunk;
    if (Buffer.byteLength(output) > 64 * 1024 * 1024) child.kill('SIGTERM');
  });
  child.stderr.on('data', (chunk) => {
    error = (error + chunk).slice(-16000);
  });
  child.stdin.on('error', () => {});
  child.stdin.end(JSON.stringify(request));
  try {
    const code = await new Promise<number | null>((r, reject) => {
      child.once('error', reject);
      child.once('close', r);
    });
    signal.throwIfAborted();
    if (code !== 0) throw new Error('SSH runner failed: ' + error);
    const envelope = JSON.parse(output) as { result?: unknown; error?: string };
    if (envelope.error) throw new Error(envelope.error);
    return envelope.result;
  } finally {
    signal.removeEventListener('abort', abort);
  }
}

export function serviceArgs(t: CloudTarget, kind: 'worker' | 'ui', id?: string): string[] {
  const unit = kind === 'worker' ? `iterfox-run-${id}` : `iterfox-ui-${t.port}`;
  if (kind === 'worker' && (!id || !/^[a-zA-Z0-9-]+$/.test(id)))
    throw new Error('Invalid systemd run ID');
  return [
    '--user',
    '--quiet',
    '--collect',
    '--expand-environment=no',
    '--unit=' + unit,
    '--property=Type=exec',
    '--property=Restart=no',
    '--working-directory=' + t.repository,
    '--',
    t.node,
    t.entry,
    kind === 'worker' ? 'worker' : 'ui',
    ...(kind === 'worker'
      ? [id!]
      : ['--port', String(t.port), '--remote-target', JSON.stringify(t)]),
    '--data',
    t.data,
  ];
}
export async function launchRemote(
  t: CloudTarget,
  kind: 'worker' | 'ui',
  id?: string,
): Promise<Record<string, unknown>> {
  if (t.serviceManager === 'detached')
    return {
      pid: kind === 'worker' ? launchWorker(id!, t.data) : launchUi(t.data, t.port),
      persistence: 'detached; host login-session policy must permit logout survival',
    };
  await requirePersistentService(t);
  await promisify(execFile)('systemd-run', serviceArgs(t, kind, id), {
    timeout: 15000,
    maxBuffer: 128000,
  });
  return {
    unit: kind === 'worker' ? `iterfox-run-${id}` : `iterfox-ui-${t.port}`,
    persistence: 'systemd user service; lingering must be enabled for logout survival',
  };
}

async function requirePersistentService(t: CloudTarget): Promise<void> {
  if (t.serviceManager !== 'systemd') return;
  if (process.platform !== 'linux')
    throw new Error(
      'The systemd runner requires a Linux host. Use detached mode only after validating host logout policy.',
    );
  const version = await promisify(execFile)('systemd-run', ['--version'], { timeout: 10000 });
  if (Number(version.stdout.match(/^systemd (\d+)/)?.[1] ?? 0) < 254)
    throw new Error(
      'The systemd runner requires systemd >=254 to preserve literal command arguments.',
    );
  let lingering = '';
  try {
    const result = await promisify(execFile)(
      'loginctl',
      ['show-user', String(process.getuid!()), '-p', 'Linger', '--value'],
      { timeout: 10000 },
    );
    lingering = result.stdout.trim();
  } catch {}
  if (lingering !== 'yes')
    throw new Error(
      'User lingering is not enabled or could not be verified. Ask the host administrator to enable-linger for the runner account, then run cloud doctor.',
    );
}

// Same protocol for a remote installed package and local integration tests.
// This handler never receives keys or copies local Codex credentials.
export async function executeRemote(input: unknown): Promise<unknown> {
  const r = requestSchema.parse(input);
  const t = r.target;
  if (r.action === 'doctor') {
    const head = await git(t.repository, ['rev-parse', 'HEAD']);
    const [major, minor] = process.versions.node.split('.').map(Number);
    let systemdVersion: number | null = null;
    let userServiceAvailable = false;
    let lingering = false;
    if (process.platform === 'linux' && t.serviceManager === 'systemd') {
      try {
        const result = await promisify(execFile)('systemd-run', ['--version'], { timeout: 10000 });
        systemdVersion = Number(result.stdout.match(/^systemd (\d+)/)?.[1] ?? 0);
      } catch {}
      try {
        await promisify(execFile)('systemctl', ['--user', 'show-environment'], {
          timeout: 10000,
          maxBuffer: 128000,
        });
        userServiceAvailable = true;
      } catch {}
      try {
        const result = await promisify(execFile)(
          'loginctl',
          ['show-user', String(process.getuid!()), '-p', 'Linger', '--value'],
          { timeout: 10000 },
        );
        lingering = result.stdout.trim() === 'yes';
      } catch {}
    }
    return {
      node: process.version,
      platform: process.platform,
      head,
      data: t.data,
      runtimeCompatible:
        (major > 22 || (major === 22 && minor >= 13)) && process.platform === 'linux',
      credentialsChecked: false,
      serviceManager: t.serviceManager,
      systemdVersion,
      userServiceAvailable,
      lingering,
      notes: [
        'Requires Node >=22.13, Git and a normal unprivileged user.',
        'Authenticate Codex on this host before a real run.',
        'For visual checks install the matching Playwright Chromium and Linux libraries.',
        'No server provisioning or local credential transfer is performed.',
        'For logout survival use systemd and enable user lingering; detached mode depends on login-session policy.',
      ],
    };
  }
  if (r.action === 'preflight') {
    const contract = await loadContract(t.contract);
    return {
      ...(await preflight(t.repository, contract, 'codex')),
      contractHash: hash(Buffer.from(JSON.stringify(contract))),
      execution: 'remote host; persists across SSH/browser disconnect; host must remain awake',
    };
  }
  const store = openStore(t.data);
  try {
    if (r.action === 'start') {
      await requirePersistentService(t);
      if (r.demo) {
        const repo = await createDemoRepository(t.data);
        const state = await createRun(
          store,
          t.data,
          repo,
          await loadContract(join(repo, 'iterfox.json')),
          'demo',
        );
        return { id: state.id, ...(await launchRemote(t, 'worker', state.id)), provider: 'demo' };
      }
      const contract = await loadContract(t.contract);
      const head = await git(t.repository, ['rev-parse', 'HEAD']);
      if (
        !r.expectedHead ||
        !r.contractHash ||
        r.expectedHead !== head ||
        r.contractHash !== hash(Buffer.from(JSON.stringify(contract)))
      )
        throw new Error(
          'Remote HEAD or acceptance contract changed after preflight. Review a new preflight.',
        );
      const state = await createRun(store, t.data, t.repository, contract, 'codex', r.expectedHead);
      return { id: state.id, ...(await launchRemote(t, 'worker', state.id)), provider: 'codex' };
    }
    if (r.action === 'ui') {
      const url = `http://127.0.0.1:${t.port}`;
      const probe = async () => {
        let response;
        try {
          response = await fetch(url + '/api/meta', {
            signal: AbortSignal.timeout(1000),
            redirect: 'error',
          });
        } catch {
          return false;
        }
        if (!response.ok)
          throw new Error('The configured remote UI port belongs to another service');
        const meta = (await response.json()) as { dataDir?: string };
        if (meta.dataDir !== resolve(t.data))
          throw new Error('The remote UI port is already serving a different data directory');
        return true;
      };
      if (await probe()) return { alreadyRunning: true, url };
      const started = await launchRemote(t, 'ui');
      for (let n = 0; n < 30; n++) {
        if (await probe()) return { ...started, url };
        if (typeof started.pid === 'number' && !alive(started.pid)) break;
        await new Promise((r) => setTimeout(r, 100));
      }
      throw new Error(
        `UI did not become ready. Inspect ${t.serviceManager === 'systemd' ? 'journalctl --user -u iterfox-ui-' + t.port : t.data + '/logs/ui-' + t.port + '.log'}`,
      );
    }
    recoverDeadWorkers(store);
    if (r.action === 'status') {
      const runs = r.id ? [store.get(r.id)] : store.list();
      for (const s of runs) await auditStoredEvidence(store, s.id);
      return runs.map((s) => store.get(s.id));
    }
    if (!r.id) throw new Error('A remote run ID is required');
    if (r.action === 'pause' || r.action === 'stop') {
      controlRun(store, r.id, r.action);
      return { requested: r.action, id: r.id };
    }
    if (r.action === 'resume') {
      await requirePersistentService(t);
      resumeRun(store, r.id);
      return { id: r.id, ...(await launchRemote(t, 'worker', r.id)) };
    }
    await auditStoredEvidence(store, r.id);
    const state = store.get(r.id);
    const events = store.events(r.id);
    if (r.action === 'brief') return markdownBrief(state, events);
    if (r.action === 'export') {
      const refs = [
        ...new Map(state.evidence.flatMap((e) => e.artifacts ?? []).map((a) => [a.id, a])).values(),
      ];
      if (refs.reduce((n, a) => n + a.bytes, 0) > 32 * 1024 * 1024)
        throw new Error(
          'Artifact export exceeds 32 MiB; download individual artifacts through the UI',
        );
      const artifacts = [];
      for (const ref of refs)
        artifacts.push({
          ref,
          base64: (await readArtifact(artifactRoot(store.path), ref)).toString('base64'),
        });
      return { events, artifacts };
    }
    throw new Error('Unknown cloud operation');
  } finally {
    store.close();
  }
}

export async function remoteAgent(): Promise<void> {
  try {
    let input = '';
    for await (const chunk of process.stdin) {
      input += chunk;
      if (Buffer.byteLength(input) > 64_000) throw new Error('Runner request too large');
    }
    process.stdout.write(JSON.stringify({ result: await executeRemote(JSON.parse(input)) }));
  } catch (error) {
    process.stdout.write(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
    );
  }
}

export async function saveBundle(path: string, value: unknown): Promise<string> {
  const bundle = z
    .object({
      events: z.array(z.unknown()).min(2),
      artifacts: z.array(z.object({ ref: z.unknown(), base64: z.string() }).strict()),
    })
    .strict()
    .parse(value);
  const events = bundle.events as RunEvent[];
  const state = project(events);
  const refs = new Map(state.evidence.flatMap((e) => e.artifacts ?? []).map((a) => [a.id, a]));
  if (
    bundle.artifacts.length !== refs.size ||
    new Set(bundle.artifacts.map((a) => (a.ref as { id: string }).id)).size !== refs.size
  )
    throw new Error('Incomplete or duplicate artifact bundle');
  const verified = bundle.artifacts.map((a) => {
    const ref = a.ref as { id: string };
    const expected = refs.get(ref.id);
    if (!/^[a-zA-Z0-9-]+$/.test(state.id)) throw new Error('Invalid exported run ID');
    if (
      !expected ||
      JSON.stringify(expected) !== JSON.stringify(ref) ||
      !new RegExp(`^${state.id}/[a-f0-9-]+-[a-zA-Z0-9_.-]+$`).test(expected.path)
    )
      throw new Error('Invalid bundle artifact path or metadata');
    const bytes = Buffer.from(a.base64, 'base64');
    if (bytes.length !== expected.bytes || hash(bytes) !== expected.sha256)
      throw new Error('Bundle artifact hash mismatch');
    return { ref: expected, bytes };
  });
  const output = resolve(path);
  // Refuse overwrites and validate the entire bundle before creating any output.
  await mkdir(output, { mode: 0o700 });
  await writeFile(join(output, 'events.json'), JSON.stringify(events, null, 2), {
    flag: 'wx',
    mode: 0o600,
  });
  await writeFile(join(output, 'brief.md'), markdownBrief(state, events), {
    flag: 'wx',
    mode: 0o600,
  });
  await writeFile(join(output, 'changes.diff'), state.diff ?? '', { flag: 'wx', mode: 0o600 });
  for (const a of verified) {
    const file = join(output, 'artifacts', a.ref.path);
    await mkdir(dirname(file), { recursive: true, mode: 0o700 });
    await writeFile(file, a.bytes, { flag: 'wx', mode: 0o600 });
  }
  return output;
}

export async function cloudCli(
  args: string[],
  authorize: (yes: boolean, text: string) => Promise<void>,
): Promise<void> {
  const { positionals, values: v } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      target: { type: 'string' },
      help: { type: 'boolean' },
      yes: { type: 'boolean' },
      out: { type: 'string' },
      demo: { type: 'boolean' },
      start: { type: 'boolean' },
    },
  });
  const [action, id] = positionals;
  if (v.help || action === 'help') {
    console.log(
      'iterfox cloud doctor|run [--demo]|status|pause|resume|stop|brief|fetch|ui [--start] [RUN_ID] --target cloud.json [--yes] [--out NEW_DIRECTORY]\nSee docs/cloud-runner.md and deploy/cloud.example.json. Existing SSH host required only for remote execution.',
    );
    return;
  }
  if (!v.target) throw new Error('Provide --target cloud.json. See docs/cloud-runner.md.');
  const target = targetSchema.parse(JSON.parse(await readFile(v.target, 'utf8')));
  if (action === 'run') {
    if (v.demo) {
      await authorize(
        Boolean(v.yes),
        'Launch a labeled offline DEMO on the SSH host. No Codex tokens are used.',
      );
      console.log(JSON.stringify(await remote({ action: 'start', target, demo: true }), null, 2));
      return;
    }
    const review = (await remote({ action: 'preflight', target, demo: false })) as {
      head: string;
      contractHash: string;
    };
    await authorize(Boolean(v.yes), JSON.stringify(review, null, 2));
    console.log(
      JSON.stringify(
        await remote({
          action: 'start',
          target,
          expectedHead: review.head,
          contractHash: review.contractHash,
          demo: false,
        }),
        null,
        2,
      ),
    );
    return;
  }
  if (action === 'fetch') {
    if (!id || !v.out) throw new Error('cloud fetch <id> requires --out <new-directory>');
    console.log(
      await saveBundle(v.out, await remote({ action: 'export', target, id, demo: false })),
    );
    return;
  }
  if (action === 'ui') {
    if (v.start) console.log(JSON.stringify(await remote({ action: 'ui', target, demo: false })));
    console.log(
      `Tunnel: http://127.0.0.1:${target.port} — keep this command open; closing it leaves remote workers running.`,
    );
    const child = spawn('ssh', sshArgs(target, true), { stdio: 'inherit', shell: false });
    let requestedStop = false;
    const cleanup = () => {
      requestedStop = true;
      child.kill('SIGTERM');
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    try {
      const code = await exitCode(child);
      if (code && !requestedStop) throw new Error(`SSH tunnel exited ${code}`);
    } finally {
      process.off('SIGINT', cleanup);
      process.off('SIGTERM', cleanup);
    }
    return;
  }
  if (!['doctor', 'status', 'pause', 'resume', 'stop', 'brief'].includes(action))
    throw new Error(
      'Cloud commands: doctor, run [--demo], status, pause, resume, stop, brief, fetch --out <new-directory>, ui [--start]',
    );
  const result = await remote({
    action: action as CloudRequest['action'],
    target,
    id,
    demo: false,
  });
  console.log(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
}
async function exitCode(child: ChildProcess): Promise<number | null> {
  return new Promise((r, reject) => {
    child.once('error', reject);
    child.once('close', r);
  });
}
