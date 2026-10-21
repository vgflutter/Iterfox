import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test(
  'ledger startup waits for a concurrent opener before configuring WAL',
  { timeout: 15000 },
  async (t) => {
    const directory = await mkdtemp(join(tmpdir(), 'iterfox-store-startup-'));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const path = join(directory, 'ledger.sqlite');
    const lock = new DatabaseSync(path);
    lock.exec('BEGIN EXCLUSIVE');
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      lock.exec('COMMIT');
      lock.close();
    };
    t.after(release);
    const source = new URL('../src/core/store.ts', import.meta.url).href;
    const child = spawn(
      process.execPath,
      [
        '--import',
        'tsx',
        '--input-type=module',
        '-e',
        `
    import { Store } from ${JSON.stringify(source)};
    process.stdout.write('opening\\n');
    const store = new Store(process.argv[1]);
    console.log('opened:' + store.db.prepare('PRAGMA journal_mode').get().journal_mode);
    store.close();
  `,
        path,
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    t.after(() => {
      if (child.exitCode === null) child.kill();
    });
    let stdout = '';
    let stderr = '';
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
      if (stdout.includes('opening\n') && !releaseTimer) releaseTimer = setTimeout(release, 300);
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    const code = await new Promise<number | null>((resolve, reject) => {
      child.once('error', reject);
      child.once('close', resolve);
    });
    if (releaseTimer) clearTimeout(releaseTimer);
    release();
    assert.equal(code, 0, stderr);
    assert.match(stdout, /opened:wal/);
  },
);
