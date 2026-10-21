import { parseArgs } from 'node:util';
import { spawn } from 'node:child_process';
import { mkdirSync, openSync, closeSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openStore, exportFile } from '../service.js';
import { buildDelegationBrief, renderDelegationBriefMarkdown } from './brief.js';
import { renderDelegationReport } from './export.js';
import {
  createDelegation,
  previewDelegation,
  runDelegation,
  DelegationStore,
  requestDelegationControl,
  resumeDelegation,
  recoverDelegations,
} from './service.js';

const help = `Iterfox delegation — one approved roadmap, sequential missions.

  iterfox delegation preflight --config delegation.json [--out preflight.json]
  iterfox delegation run --config delegation.json [--preflight preflight.json] [--night] [--yes]
  iterfox delegation status [delegation-id] [--json]
  iterfox delegation pause|resume|stop <delegation-id> [--night]
  iterfox delegation brief <delegation-id> [--json]
  iterfox delegation report <delegation-id> [--format markdown|json|html] [--out file]

All commands accept --data <directory>; use the same absolute directory throughout.
Preflight validates configuration and source without creating a ledger or starting work.
Run --preflight refuses a changed source HEAD or configuration; --yes authorizes work.
Status/brief --json return saved delegation metadata; report includes mission evidence.
Reports read saved records only; they do not recover workers, audit files or run checks.
`;

export function launchDelegationWorker(id: string, dataDir: string) {
  const runs = openStore(dataDir);
  try {
    new DelegationStore(runs).change(id, (d) => {
      d.launchRequested = true;
    });
  } finally {
    runs.close();
  }
  mkdirSync(join(dataDir, 'logs'), { recursive: true });
  const log = openSync(join(dataDir, 'logs', `delegation-${id}.log`), 'a', 0o600);
  const source = import.meta.url.endsWith('.ts');
  const entry = fileURLToPath(new URL(source ? '../cli.ts' : '../cli.js', import.meta.url));
  const child = spawn(
    process.execPath,
    [
      ...(source ? ['--import', import.meta.resolve('tsx')] : []),
      entry,
      'delegation',
      'worker',
      id,
      '--data',
      dataDir,
    ],
    { detached: true, stdio: ['ignore', log, log], env: process.env },
  );
  closeSync(log);
  child.unref();
  if (!child.pid) throw new Error('Delegation worker could not start');
  return child.pid;
}
export async function delegationCli(
  args: string[],
  authorize: (yes: boolean, text: string) => Promise<void>,
) {
  const { positionals, values: v } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      config: { type: 'string' },
      data: { type: 'string', default: '.iterfox' },
      yes: { type: 'boolean' },
      night: { type: 'boolean' },
      json: { type: 'boolean' },
      help: { type: 'boolean' },
      preflight: { type: 'string' },
      format: { type: 'string' },
      out: { type: 'string' },
    },
  });
  const [action, id] = positionals;
  if (!action || action === 'help' || v.help) {
    console.log(help);
    return;
  }
  if (action === 'preflight') {
    if (!v.config) throw new Error('delegation preflight requires --config <delegation.json>');
    const preview = await previewDelegation(JSON.parse(await readFile(resolve(v.config), 'utf8')));
    const output = JSON.stringify(preview, null, 2);
    if (v.out) await exportFile(v.out, output);
    else console.log(output);
    return;
  }
  const data = resolve(v.data!);
  const runs = openStore(data);
  try {
    if (action === 'report') {
      if (!id) throw new Error('Provide a delegation ID');
      const format = v.format ?? (v.json ? 'json' : 'markdown');
      if (!['markdown', 'json', 'html'].includes(format))
        throw new Error('Report format must be markdown, json or html');
      const report = await buildDelegationBrief(runs, id);
      const output =
        format === 'json'
          ? JSON.stringify(report, null, 2)
          : format === 'html'
            ? renderDelegationReport(report)
            : renderDelegationBriefMarkdown(report);
      if (v.out) await exportFile(v.out, output);
      else console.log(output);
      return;
    }
    const ds = new DelegationStore(runs);
    if (action === 'run') {
      if (!v.config) throw new Error('delegation run requires --config <delegation.json>');
      const preview = await previewDelegation(
        JSON.parse(await readFile(resolve(v.config), 'utf8')),
      );
      if (v.preflight) {
        const reviewed = JSON.parse(await readFile(resolve(v.preflight), 'utf8'));
        if (
          reviewed?.expectedHead !== preview.expectedHead ||
          reviewed?.specHash !== preview.specHash
        )
          throw new Error(
            'Source or configuration changed since preflight; review a new preflight.',
          );
      }
      await authorize(Boolean(v.yes), JSON.stringify(preview, null, 2));
      const d = await createDelegation(runs, {
        spec: preview.spec,
        expectedHead: preview.expectedHead,
        authorized: true,
      });
      console.log(`Delegation ${d.id}`);
      if (v.night) console.log(`Detached worker PID ${launchDelegationWorker(d.id, data)}`);
      else {
        const result = await runDelegation(runs, data, d.id);
        console.log(JSON.stringify(result, null, 2));
        if (result.status !== 'COMPLETED') process.exitCode = 2;
      }
      return;
    }
    if (action === 'status') {
      recoverDelegations(runs);
      console.log(JSON.stringify(id ? ds.get(id) : ds.list(), null, 2));
      return;
    }
    if (!id) throw new Error('Provide a delegation ID');
    if (action === 'worker') {
      await runDelegation(runs, data, id);
      return;
    }
    if (action === 'pause' || action === 'stop') {
      console.log(JSON.stringify(requestDelegationControl(runs, id, action), null, 2));
      return;
    }
    if (action === 'resume') {
      recoverDelegations(runs);
      resumeDelegation(runs, id);
      if (v.night) console.log(`Detached worker PID ${launchDelegationWorker(id, data)}`);
      else console.log(JSON.stringify(await runDelegation(runs, data, id), null, 2));
      return;
    }
    if (action === 'brief') {
      const d = ds.get(id);
      if (v.json) {
        console.log(JSON.stringify(d, null, 2));
        return;
      }
      console.log(
        `# ${d.spec.contract.goal}\n\nStatus: ${d.status}${d.reason ? ' — ' + d.reason : ''}\n\n` +
          d.stages
            .map(
              (s) =>
                `- ${d.spec.milestones.find((m) => m.id === s.id)!.title}: ${s.status}${s.runId ? ' · run ' + s.runId : ''}${s.checkpoint ? ' · checkpoint ' + s.checkpoint.head : ''}`,
            )
            .join('\n') +
          '\n\nCheckpointed is a technical outcome. Product review and integration remain with you.',
      );
      return;
    }
    throw new Error('Use delegation preflight|run|status|pause|resume|stop|brief|report');
  } finally {
    runs.close();
  }
}
