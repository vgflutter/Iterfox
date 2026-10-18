import { z } from 'zod';
import type { RunState } from './model.js';

export const noteInputSchema = z
  .object({
    text: z.string().trim().min(3).max(4000),
    kind: z.enum(['request', 'decision', 'hypothesis']).default('request'),
    replyTo: z.string().min(1).optional(),
  })
  .strict();
export type NoteInput = z.infer<typeof noteInputSchema>;
export interface DirectionNote extends NoteInput {
  id: string;
  at: string;
}

// This is a plan proposal, never an acceptance policy or evidence of product quality.
export const directionSchema = z
  .object({
    focus: z.string().min(5).max(2000),
    nextArtifact: z.string().min(5).max(2000),
    assumptions: z.array(z.string().min(3).max(1000)).max(8),
    notes: z
      .array(
        z
          .object({
            noteId: z.string().min(1),
            disposition: z.enum(['applied', 'deferred', 'question']),
            reason: z.string().min(5).max(2000),
            criterionIds: z.array(z.string()).max(30),
          })
          .strict(),
      )
      .min(1)
      .max(64),
    tasks: z
      .array(
        z
          .object({
            title: z.string().min(3).max(200),
            objective: z.string().min(5).max(4000),
            criterionId: z.string(),
            waitsFor: z.array(z.string()).max(30),
          })
          .strict(),
      )
      .max(8),
  })
  .strict();
export type DirectionProposal = z.infer<typeof directionSchema>;
export interface Direction extends DirectionProposal {
  revision: number;
  nodeId: string;
  sourceIds: string[];
  contractVersion: number;
}

export function activeNotes(s: RunState): DirectionNote[] {
  const superseded = new Set((s.notes ?? []).map((n) => n.replyTo).filter(Boolean));
  return (s.notes ?? []).filter((n) => !superseded.has(n.id));
}
export function needsOrientation(s: RunState): boolean {
  return (
    !!activeNotes(s).length &&
    (s.direction?.contractVersion !== s.contractVersion ||
      (s.notes ?? []).some((n) => !s.direction?.sourceIds.includes(n.id)))
  );
}
export function questions(s: RunState) {
  if (s.direction?.contractVersion !== s.contractVersion) return [];
  const active = new Set(activeNotes(s).map((n) => n.id));
  return (s.direction?.notes ?? []).filter(
    (n) => n.disposition === 'question' && active.has(n.noteId),
  );
}
export function heldCriteria(s: RunState): Set<string> {
  const held = new Set(questions(s).flatMap((n) => n.criterionIds));
  let changed = true;
  while (changed) {
    changed = false;
    for (const n of s.nodes.filter(
      (n) => n.kind === 'task' && ['PENDING', 'BLOCKED'].includes(n.status),
    ))
      if (!held.has(n.criterionId) && n.waitsFor?.some((id) => held.has(id))) {
        held.add(n.criterionId);
        changed = true;
      }
  }
  return held;
}
export function validateDirection(
  s: RunState,
  raw: unknown,
  sourceIds: string[],
): DirectionProposal {
  const p = directionSchema.parse(raw);
  const snapshot = { ...s, notes: (s.notes ?? []).filter((n) => sourceIds.includes(n.id)) };
  const expected = activeNotes(snapshot).map((n) => n.id);
  if (
    new Set(sourceIds).size !== sourceIds.length ||
    sourceIds.some((id) => !s.notes?.some((n) => n.id === id))
  )
    throw new Error('Unknown or duplicate direction source');
  if (
    JSON.stringify(sourceIds) !==
    JSON.stringify((s.notes ?? []).slice(0, sourceIds.length).map((n) => n.id))
  )
    throw new Error('Direction must preserve its complete ordered handoff snapshot');
  if (
    new Set(p.notes.map((n) => n.noteId)).size !== expected.length ||
    p.notes.length !== expected.length ||
    p.notes.some((n) => !expected.includes(n.noteId))
  )
    throw new Error('Every active handoff note needs exactly one disposition');
  const ids = new Set(s.criteria.map((c) => c.id));
  if (
    p.notes.some((n) => n.criterionIds.some((id) => !ids.has(id))) ||
    p.tasks.some(
      (t) =>
        !ids.has(t.criterionId) || t.waitsFor.some((id) => !ids.has(id) || id === t.criterionId),
    )
  )
    throw new Error('Direction referenced an unapproved criterion or self dependency');
  // A model cannot answer its own request for an operator decision on the next replan.
  for (const q of questions(snapshot))
    if (
      expected.includes(q.noteId) &&
      (p.notes.find((n) => n.noteId === q.noteId)?.disposition !== 'question' ||
        q.criterionIds.some(
          (id) => !p.notes.find((n) => n.noteId === q.noteId)?.criterionIds.includes(id),
        ))
    )
      throw new Error('An operator question needs a linked operator reply');
  const deps = new Map<string, string[]>();
  for (const t of p.tasks)
    deps.set(t.criterionId, [...(deps.get(t.criterionId) ?? []), ...t.waitsFor]);
  const visit = (id: string, trail: Set<string>) => {
    if (trail.has(id)) throw new Error('Direction contains a dependency cycle');
    for (const next of deps.get(id) ?? []) visit(next, new Set([...trail, id]));
  };
  for (const id of deps.keys()) visit(id, new Set());
  return p;
}
