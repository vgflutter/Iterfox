import { randomUUID } from 'node:crypto';
import type { DatabaseSync } from 'node:sqlite';
import {
  projectDocumentSchema,
  projectIdentifierSchema,
  projectRevisionSchema,
  type ProjectDocument,
} from '../shared/projects.js';
import { parseProjectInput, ProjectError } from './errors.js';

type SnapshotRow = { body: string };

/** Additive tables in the existing durable ledger; no run tables are changed. */
export class ProjectStore {
  constructor(private readonly db: DatabaseSync) {
    // The owning run Store installs WAL, FULL synchronous writes and busy_timeout.
    // It also owns this connection's lifecycle, including genuine store restarts.
    this.db.exec(`CREATE TABLE IF NOT EXISTS project_revisions (
      project_id TEXT NOT NULL,
      revision INTEGER NOT NULL CHECK (revision >= 1),
      updated_at TEXT NOT NULL,
      body TEXT NOT NULL,
      PRIMARY KEY (project_id, revision)
    );`);
  }

  list(): ProjectDocument[] {
    return this.read(() =>
      (
        this.db
          .prepare(
            `SELECT p.body FROM project_revisions p
        JOIN (SELECT project_id, MAX(revision) AS revision FROM project_revisions GROUP BY project_id) latest
        ON p.project_id = latest.project_id AND p.revision = latest.revision
        ORDER BY p.updated_at DESC, p.project_id ASC`,
          )
          .all() as SnapshotRow[]
      ).map((row) => this.decode(row)),
    );
  }

  get(id: string): ProjectDocument {
    parseProjectInput(projectIdentifierSchema, id);
    return this.read(() => {
      const row = this.db
        .prepare(
          'SELECT body FROM project_revisions WHERE project_id = ? ORDER BY revision DESC LIMIT 1',
        )
        .get(id) as SnapshotRow | undefined;
      if (!row) throw new ProjectError('not-found', 'Project not found.', 404);
      return this.decode(row);
    });
  }

  history(id: string): ProjectDocument[] {
    parseProjectInput(projectIdentifierSchema, id);
    return this.read(() => {
      const rows = this.db
        .prepare('SELECT body FROM project_revisions WHERE project_id = ? ORDER BY revision ASC')
        .all(id) as SnapshotRow[];
      if (!rows.length) throw new ProjectError('not-found', 'Project not found.', 404);
      return rows.map((row) => this.decode(row));
    });
  }

  atRevision(id: string, expectedRevision: number): ProjectDocument {
    parseProjectInput(projectRevisionSchema, expectedRevision);
    const current = this.get(id);
    if (current.revision !== expectedRevision)
      throw new ProjectError(
        'stale-revision',
        `Project changed to revision ${current.revision}. Keep your edits, inspect the latest version and reconcile before saving.`,
        409,
        current.revision,
      );
    return current;
  }

  create(
    input: Omit<
      ProjectDocument,
      'schemaVersion' | 'id' | 'revision' | 'createdAt' | 'updatedAt' | 'runs' | 'handoffs'
    >,
  ): ProjectDocument {
    return this.transaction(() => {
      const now = new Date().toISOString();
      const project = projectDocumentSchema.parse({
        ...input,
        schemaVersion: 1,
        id: randomUUID(),
        revision: 1,
        runs: [],
        handoffs: [],
        createdAt: now,
        updatedAt: now,
      });
      this.insert(project);
      return project;
    });
  }

  /** The callback is synchronous; the revision check and append share a lock. */
  update(
    id: string,
    expectedRevision: number,
    change: (current: ProjectDocument) => ProjectDocument,
  ): ProjectDocument {
    parseProjectInput(projectIdentifierSchema, id);
    parseProjectInput(projectRevisionSchema, expectedRevision);
    return this.transaction(() => {
      const current = this.atRevision(id, expectedRevision);
      const changed = change(structuredClone(current));
      if (
        changed.id !== current.id ||
        changed.repository !== current.repository ||
        changed.repositoryIdentity.commonDirectory !== current.repositoryIdentity.commonDirectory ||
        changed.schemaVersion !== current.schemaVersion ||
        changed.createdAt !== current.createdAt
      )
        throw new ProjectError(
          'invalid-request',
          'Project identity and repository binding cannot change.',
        );
      // Links and receipts are append-only, including their original milestone
      // snapshots. Brief/roadmap edits cannot silently rewrite old provenance.
      for (const field of ['runs', 'handoffs'] as const)
        if (
          changed[field].length < current[field].length ||
          current[field].some(
            (record, index) => JSON.stringify(record) !== JSON.stringify(changed[field][index]),
          )
        )
          throw new ProjectError(
            'invalid-request',
            'Session links and handoff receipts are immutable.',
          );
      const next = projectDocumentSchema.parse({
        ...changed,
        revision: current.revision + 1,
        updatedAt: new Date().toISOString(),
      });
      this.insert(next);
      return next;
    });
  }

  private insert(project: ProjectDocument): void {
    this.db
      .prepare(
        'INSERT INTO project_revisions (project_id, revision, updated_at, body) VALUES (?, ?, ?, ?)',
      )
      .run(project.id, project.revision, project.updatedAt, JSON.stringify(project));
  }

  private decode(row: SnapshotRow): ProjectDocument {
    return projectDocumentSchema.parse(JSON.parse(row.body));
  }

  private read<T>(action: () => T): T {
    try {
      return action();
    } catch (error) {
      if (error instanceof ProjectError) throw error;
      throw new ProjectError(
        'storage',
        'Project storage could not be read. Keep your edits and retry after checking the server.',
        503,
      );
    }
  }

  private transaction<T>(action: () => T): T {
    let begun = false;
    try {
      this.db.exec('BEGIN IMMEDIATE');
      begun = true;
      const result = action();
      this.db.exec('COMMIT');
      begun = false;
      return result;
    } catch (error) {
      if (begun) {
        try {
          this.db.exec('ROLLBACK');
        } catch {
          /* Preserve the original write failure. */
        }
      }
      if (error instanceof ProjectError) throw error;
      throw new ProjectError(
        'storage',
        'The project save could not be confirmed. Keep your edits and reload the project before retrying.',
        503,
      );
    }
  }
}
