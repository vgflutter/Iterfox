import { z } from 'zod';
import type { CodeStamp, RunState } from './model.js';
import { heldCriteria, questions } from './compass.js';

export const supervisionSchema = z
  .object({
    mode: z.literal('project'),
    maxReviews: z.number().int().min(1).max(100).default(20),
  })
  .strict();
export const projectReviewSchema = z
  .object({
    outcome: z.enum(['continue', 'ready', 'needs-operator']),
    summary: z.string().min(5).max(4000),
    findings: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/),
            gap: z.string().min(10).max(3000),
            files: z.array(z.string().min(1)).min(1).max(12),
            evidenceIds: z.array(z.string()).max(30),
          })
          .strict(),
      )
      .max(12),
    decisions: z
      .array(
        z
          .object({
            choice: z.string().min(5).max(2000),
            basis: z.string().min(5).max(2000),
          })
          .strict(),
      )
      .max(12),
    tasks: z
      .array(
        z
          .object({
            title: z.string().min(3).max(200),
            objective: z.string().min(5).max(4000),
            criterionId: z.string(),
            findingIds: z.array(z.string()).min(1).max(12),
            waitsFor: z.array(z.string()).max(30),
          })
          .strict(),
      )
      .max(8),
    operatorQuestion: z.string().max(4000),
  })
  .strict();
export type ProjectReviewProposal = z.infer<typeof projectReviewSchema>;
export interface ProjectReview extends ProjectReviewProposal {
  nodeId: string;
  at: string;
  stamp: CodeStamp;
  contractVersion: number;
  noteIds: string[];
  directionRevision: number;
  independent: false;
  invalidatedReason?: string;
}
export function validateProjectReview(
  s: RunState,
  raw: unknown,
  stamp: CodeStamp,
): ProjectReviewProposal {
  const p = projectReviewSchema.parse(raw);
  const findings = new Set(p.findings.map((f) => f.id));
  const held = heldCriteria(s);
  if (
    findings.size !== p.findings.length ||
    p.findings.some(
      (f) =>
        f.files.some((path) => !Object.hasOwn(stamp.files, path)) ||
        f.evidenceIds.some((id) => !s.evidence.some((e) => e.id === id)),
    )
  )
    throw new Error('Project findings must reference actual recorded files and known evidence');
  if (
    p.tasks.some(
      (t) =>
        !s.criteria.some((c) => c.id === t.criterionId) ||
        held.has(t.criterionId) ||
        t.findingIds.some((id) => !findings.has(id)) ||
        t.waitsFor.some(
          (id) => !s.criteria.some((c) => c.id === id) || held.has(id) || id === t.criterionId,
        ),
    )
  )
    throw new Error(
      'Discovered work must reference a concrete finding and an unheld approved criterion',
    );
  if (p.outcome === 'continue' && (!p.tasks.length || !p.findings.length || p.operatorQuestion))
    throw new Error(
      'Continuing supervision requires concrete work, not a new prompt from the operator',
    );
  if (p.outcome !== 'continue' && p.tasks.length)
    throw new Error('A final project review cannot contain unexecuted work');
  if (p.outcome === 'needs-operator' && !p.operatorQuestion.trim())
    throw new Error('Operator attention needs a specific question');
  if (p.outcome === 'ready' && (p.operatorQuestion || questions(s).length))
    throw new Error('An unresolved operator question prevents a ready project review');
  const deps = new Map<string, string[]>();
  for (const t of p.tasks)
    deps.set(t.criterionId, [...(deps.get(t.criterionId) ?? []), ...t.waitsFor]);
  const visit = (id: string, trail: Set<string>) => {
    if (trail.has(id)) throw new Error('Discovered work contains a dependency cycle');
    for (const next of deps.get(id) ?? []) visit(next, new Set([...trail, id]));
  };
  for (const id of deps.keys()) visit(id, new Set());
  return p;
}
export function projectReviewCurrent(s: RunState, stamp: CodeStamp): boolean {
  const last = s.projectReviews?.at(-1);
  return (
    !!last &&
    last.outcome !== 'continue' &&
    !last.invalidatedReason &&
    !s.projectNeedsReview &&
    last.stamp.head === stamp.head &&
    last.stamp.fingerprint === stamp.fingerprint &&
    last.contractVersion === s.contractVersion &&
    last.directionRevision === (s.direction?.revision ?? 0) &&
    JSON.stringify(last.noteIds) === JSON.stringify((s.notes ?? []).map((n) => n.id))
  );
}
