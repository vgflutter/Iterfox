#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { mkdirSync, openSync, closeSync, realpathSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import {
  openStore,
  loadContract,
  preflight,
  createRun,
  createDemoRepository,
  runWorker,
  controlRun,
  resumeRun,
  proposeContract,
  approveContract,
  exportFile,
  recoverDeadWorkers,
  auditStoredEvidence,
} from './service.js';
import { brief, markdownBrief } from './core/brief.js';

const help = `Iterfox — Delegate the work. Wake up to evidence.

  iterfox run --config iterfox.json [--repo .] [--night] [--yes]
  iterfox demo [--codex] [--night] [--yes]
  iterfox status [run-id] [--json]
  iterfox ui [--port 4310]
  iterfox pause|resume|stop <run-id> [--night]
  iterfox brief <run-id> [--json] [--out brief.md]
  iterfox events <run-id>
  iterfox contract <run-id> --propose contract.json
  iterfox contract <run-id> --approve --yes

All commands accept --data <directory> (default: .iterfox in current directory).
--yes explicitly authorizes the printed preflight or proposed contract revision.
Night workers survive browser/terminal close, but cannot run during sleep/shutdown.
Demo is a labeled deterministic fixture. --codex uses real Codex and credentials.
`;

export function launchWorker(id: string, dataDir: string): number {
  mkdirSync(join(dataDir, 'logs'), { recursive: true });
  const log = openSync(join(dataDir, 'logs', `${id}.log`), 'a', 0o600);
  const entry = fileURLToPath(import.meta.url);
  // Never inherit -e, --test, --inspect or other launcher execution flags.
  const loader = entry.endsWith('.ts') ? ['--import', import.meta.resolve('tsx')] : [];
  const child = spawn(process.execPath, [...loader, entry, 'worker', id, '--data', dataDir], {
    detached: true,
    stdio: ['ignore', log, log],
    env: process.env,
  });
  closeSync(log);
  child.unref();
  if (!child.pid) throw new Error('Could not launch detached worker');
  return child.pid;
}
async function authorize(yes: boolean, text: string): Promise<void> {
  console.log(text);
  if (yes) return;
  if (!process.stdin.isTTY)
    throw new Error(
      'Authorization required. Inspect the preflight, then pass --yes to explicitly authorize.',
    );
  const input = createInterface({ input: process.stdin, output: process.stdout });
  try {
    if ((await input.question('Authorize this run? Type yes: ')).trim() !== 'yes')
      throw new Error('Run not authorized');
  } finally {
    input.close();
  }
}
async function main() {
  const { positionals, values: v } = parseArgs({
    allowPositionals: true,
    options: {
      config: { type: 'string' },
      repo: { type: 'string', default: '.' },
      data: { type: 'string', default: '.iterfox' },
      night: { type: 'boolean' },
      yes: { type: 'boolean' },
      json: { type: 'boolean' },
      out: { type: 'string' },
      port: { type: 'string', default: '4310' },
      codex: { type: 'boolean' },
      help: { type: 'boolean' },
      propose: { type: 'string' },
      approve: { type: 'boolean' },
    },
  });
  const [command = 'help', requestedId] = positionals;
  if (command === 'help' || v.help) {
    console.log(help);
    return;
  }
  const dataDir = resolve(v.data!);
  const store = openStore(dataDir);
  try {
    if (command === 'ui') {
      const { serve } = await import('./server.js');
      await serve(store, dataDir, Number(v.port), (id) => launchWorker(id, dataDir));
      return; // server owns the store until it closes
    }
    if (command === 'run' || command === 'demo') {
      if (command === 'run' && !v.config)
        throw new Error('Provide --config <file>. See examples/avatar-lab/iterfox.json.');
      const repo = command === 'demo' ? await createDemoRepository(dataDir) : resolve(v.repo!);
      const contract = await loadContract(
        command === 'demo' ? join(repo, 'iterfox.json') : resolve(v.config!),
      );
      const provider = command === 'demo' && !v.codex ? 'demo' : 'codex';
      await authorize(
        Boolean(v.yes),
        JSON.stringify(await preflight(repo, contract, provider), null, 2),
      );
      const state = await createRun(store, dataDir, repo, contract, provider);
      console.log(`Run ${state.id}\nWorktree: ${state.worktree}`);
      if (v.night)
        console.log(
          `Night worker PID ${launchWorker(state.id, dataDir)}. Logs: ${join(dataDir, 'logs', state.id + '.log')}`,
        );
      else {
        const result = await runWorker(store, state.id);
        console.log(markdownBrief(result, store.events(state.id)));
        if (result.status !== 'COMPLETED') process.exitCode = 2;
      }
      return;
    }
    if (command === 'status') {
      recoverDeadWorkers(store);
      for (const s of requestedId ? [store.get(requestedId)] : store.list())
        await auditStoredEvidence(store, s.id);
      const runs = requestedId ? [store.get(requestedId)] : store.list();
      console.log(
        v.json
          ? JSON.stringify(runs, null, 2)
          : runs
              .map(
                (s) =>
                  `${s.id}  ${s.status.padEnd(10)}  ${s.criteria.filter((c) => c.status === 'PASSED').length}/${s.criteria.length} verified  ${s.provider.toUpperCase()}  ${s.goal}`,
              )
              .join('\n') || 'No runs. Start with iterfox demo.',
      );
      return;
    }
    if (!requestedId) throw new Error('Provide a run ID; list runs with iterfox status');
    const id = requestedId;
    if (command === 'worker') {
      await runWorker(store, id);
      return;
    }
    if (command === 'pause' || command === 'stop') {
      controlRun(store, id, command);
      console.log(`${command} requested for ${id}`);
      return;
    }
    if (command === 'resume') {
      resumeRun(store, id);
      if (v.night) console.log(`Resumed worker PID ${launchWorker(id, dataDir)}`);
      else {
        const result = await runWorker(store, id);
        console.log(`${id}: ${result.status}${result.reason ? ` — ${result.reason}` : ''}`);
        if (result.status !== 'COMPLETED') process.exitCode = 2;
      }
      return;
    }
    if (command === 'brief' || command === 'events') {
      if (command === 'brief') await auditStoredEvidence(store, id);
      const state = store.get(id);
      const events = store.events(id);
      const text =
        command === 'events'
          ? JSON.stringify(events, null, 2)
          : v.json
            ? JSON.stringify(brief(state, events), null, 2)
            : markdownBrief(state, events);
      if (v.out) await exportFile(v.out, text);
      else console.log(text);
      return;
    }
    if (command === 'contract') {
      if (v.propose) {
        proposeContract(store, id, await loadContract(v.propose));
        console.log(JSON.stringify(store.get(id).revisionProposal, null, 2));
        return;
      }
      if (v.approve) {
        await authorize(
          Boolean(v.yes),
          JSON.stringify(
            { current: store.get(id).contract, proposal: store.get(id).revisionProposal },
            null,
            2,
          ),
        );
        approveContract(store, id);
        console.log('Acceptance revision approved. Resume explicitly.');
        return;
      }
    }
    throw new Error(`Unknown command.\n${help}`);
  } finally {
    if (command !== 'ui') store.close();
  }
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  });
