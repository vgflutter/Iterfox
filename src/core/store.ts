import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { project, reduce, type EventType, type RunEvent, type RunState } from './model.js';

export class Store {
  readonly db: DatabaseSync;
  constructor(readonly path: string) {
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path);
    // A worker and its UI can open the same ledger concurrently. Install the
    // lock wait before journal-mode/schema setup, which itself needs a lock.
    this.db.exec(`PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;
      CREATE TABLE IF NOT EXISTS events (run_id TEXT NOT NULL, seq INTEGER NOT NULL, id TEXT NOT NULL UNIQUE, body TEXT NOT NULL, PRIMARY KEY(run_id,seq));
      CREATE TABLE IF NOT EXISTS leases (run_id TEXT PRIMARY KEY, owner TEXT NOT NULL, pid INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS controls (run_id TEXT PRIMARY KEY, action TEXT NOT NULL);`);
  }
  events(id: string, after = 0): RunEvent[] {
    return (
      this.db
        .prepare('SELECT body FROM events WHERE run_id=? AND seq>? ORDER BY seq')
        .all(id, after) as { body: string }[]
    ).map((r) => JSON.parse(r.body));
  }
  get(id: string): RunState {
    return project(this.events(id));
  }
  list(): RunState[] {
    return (this.db.prepare('SELECT DISTINCT run_id FROM events').all() as { run_id: string }[])
      .map((r) => this.get(r.run_id))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  append(
    id: string,
    type: EventType,
    message: string,
    data: Record<string, unknown> = {},
    expectedSeq?: number,
  ): RunState {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const events = this.events(id);
      const prev = events.length ? project(events) : undefined;
      if (expectedSeq !== undefined && expectedSeq !== (prev?.seq ?? 0))
        throw new Error('Concurrent event append');
      const event: RunEvent = {
        schemaVersion: 1,
        id: randomUUID(),
        runId: id,
        seq: (prev?.seq ?? 0) + 1,
        at: new Date().toISOString(),
        type,
        message,
        data,
      };
      const state = reduce(prev, event);
      this.db
        .prepare('INSERT INTO events VALUES (?,?,?,?)')
        .run(id, event.seq, event.id, JSON.stringify(event));
      this.db.exec('COMMIT');
      return state;
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
  }
  acquire(id: string, owner: string): void {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const lease = this.lease(id);
      if (lease && alive(lease.pid)) throw new Error(`Worker ${lease.pid} already owns this run`);
      this.db.prepare('INSERT OR REPLACE INTO leases VALUES (?,?,?)').run(id, owner, process.pid);
      this.db.exec('COMMIT');
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
  }
  lease(id: string): { owner: string; pid: number } | undefined {
    return this.db.prepare('SELECT owner,pid FROM leases WHERE run_id=?').get(id) as
      { owner: string; pid: number } | undefined;
  }
  release(id: string, owner: string): void {
    this.db.prepare('DELETE FROM leases WHERE run_id=? AND owner=?').run(id, owner);
  }
  control(id: string, action: 'pause' | 'stop'): void {
    this.get(id);
    this.db.prepare('INSERT OR REPLACE INTO controls VALUES (?,?)').run(id, action);
  }
  takeControl(id: string): 'pause' | 'stop' | undefined {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db.prepare('SELECT action FROM controls WHERE run_id=?').get(id) as
        { action: 'pause' | 'stop' } | undefined;
      this.db.prepare('DELETE FROM controls WHERE run_id=?').run(id);
      this.db.exec('COMMIT');
      return row?.action;
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
  }
  close(): void {
    this.db.close();
  }
}
export function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return (e as NodeJS.ErrnoException).code === 'EPERM';
  }
}
