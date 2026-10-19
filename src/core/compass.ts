import { z } from 'zod';
import type { RunState, TaskNode } from './model.js';

// A recorded reference only. It cannot carry execution or acceptance authority.
export const noteContextSchema = z
  .object({
    criterionId: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/),
    contractVersion: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
    nodeId: z.string().min(1).optional(),
  })
  .strict();
export type NoteContext = z.infer<typeof noteContextSchema>;

export const noteInputSchema = z
  .object({
    text: z.string().trim().min(3).max(4000),
    kind: z.enum(['request', 'decision', 'hypothesis']).default('request'),
    replyTo: z.string().min(1).optional(),
    context: noteContextSchema.optional(),
  })
  .strict();
export type NoteInput = z.infer<typeof noteInputSchema>;
export interface DirectionNote extends NoteInput {
  id: string;
  at: string;
}

export function validateNoteContext(
  state: Pick<RunState, 'contract' | 'contractVersion' | 'nodes'>,
  context: NoteContext | undefined,
): void {
  if (!context) return;
  if (context.contractVersion !== state.contractVersion)
    throw new Error(
      'Selected work uses a different contract version. Return to Live and select again.',
    );
  if (!state.contract.criteria.some((c) => c.id === context.criterionId))
    throw new Error('Selected work must reference a current approved criterion.');
  if (
    context.nodeId !== undefined &&
    !state.nodes.some((n) => n.id === context.nodeId && n.criterionId === context.criterionId)
  )
    throw new Error(
      'Selected activity must exist in this run and belong to the referenced criterion.',
    );
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

// Display/export metadata only. Resolve titles from the recorded contract, never
// from a newer criterion that happens to reuse the same ID. Handling belongs to
// the recorded direction version and is separate from the note's own reference.
export function noteProvenance(state: RunState, note: DirectionNote) {
  const context = note.context;
  const handling = state.direction?.notes.find((entry) => entry.noteId === note.id);
  return {
    reference: context
      ? {
          ...context,
          criterionTitle: state.contracts[context.contractVersion - 1]?.criteria.find(
            (criterion) => criterion.id === context.criterionId,
          )?.title,
          nodeTitle: context.nodeId
            ? state.nodes.find(
                (node) => node.id === context.nodeId && node.criterionId === context.criterionId,
              )?.title
            : undefined,
          historical: context.contractVersion !== state.contractVersion,
        }
      : undefined,
    handling,
    reconciliation:
      handling && state.direction
        ? {
            revision: state.direction.revision,
            nodeId: state.direction.nodeId,
            contractVersion: state.direction.contractVersion,
            historical: state.direction.contractVersion !== state.contractVersion,
          }
        : undefined,
    answered: (state.notes ?? []).some((reply) => reply.replyTo === note.id),
  };
}

// Model-facing metadata only; never persisted as part of an operator note.
export interface ActiveDirectionNote extends DirectionNote {
  target?: {
    referenceOnly: true;
    contractVersion: number;
    historical: boolean;
    criterion: { id: string; title?: string; resolved: boolean };
    activity?: {
      id: string;
      title?: string;
      kind?: TaskNode['kind'];
      objective?: string;
      resolved: boolean;
    };
  };
}

function targetText(value: string | undefined, limit: number): string | undefined {
  return value && value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

export function activeNotes(s: RunState): ActiveDirectionNote[] {
  const superseded = new Set((s.notes ?? []).map((n) => n.replyTo).filter(Boolean));
  return (s.notes ?? [])
    .filter((n) => !superseded.has(n.id))
    .map((note) => {
      const context = note.context;
      if (!context) return note;
      // Resolve the exact selection, including checks and decisions. A criterion
      // can contain several activities, so never infer an activity from its ID.
      const activity = s.nodes.find(
        (n) => n.id === context.nodeId && n.criterionId === context.criterionId,
      );
      const criterion = s.contracts[context.contractVersion - 1]?.criteria.find(
        (c) => c.id === context.criterionId,
      );
      return {
        ...note,
        target: {
          referenceOnly: true,
          contractVersion: context.contractVersion,
          historical: context.contractVersion !== s.contractVersion,
          criterion: {
            id: context.criterionId,
            title: targetText(criterion?.title, 500),
            resolved: !!criterion,
          },
          activity: context.nodeId
            ? {
                id: context.nodeId,
                title: targetText(activity?.title, 500),
                kind: activity?.kind,
                objective: targetText(activity?.objective, 4000),
                resolved: !!activity,
              }
            : undefined,
        },
      };
    });
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
// Only semantic rejection of a successfully returned, structured proposal can
// request correction. Schema, handoff/source integrity and provider errors block.
export class DirectionProposalRejection extends Error {}

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
    throw new DirectionProposalRejection('Every active handoff note needs exactly one disposition');
  const ids = new Set(s.criteria.map((c) => c.id));
  if (
    p.notes.some((n) => n.criterionIds.some((id) => !ids.has(id))) ||
    p.tasks.some(
      (t) =>
        !ids.has(t.criterionId) || t.waitsFor.some((id) => !ids.has(id) || id === t.criterionId),
    )
  )
    throw new DirectionProposalRejection(
      'Direction referenced an unapproved criterion or self dependency',
    );
  // A model cannot answer its own request for an operator decision on the next replan.
  for (const q of questions(snapshot))
    if (
      expected.includes(q.noteId) &&
      (p.notes.find((n) => n.noteId === q.noteId)?.disposition !== 'question' ||
        q.criterionIds.some(
          (id) => !p.notes.find((n) => n.noteId === q.noteId)?.criterionIds.includes(id),
        ))
    )
      throw new DirectionProposalRejection('An operator question needs a linked operator reply');
  const deps = new Map<string, string[]>();
  for (const t of p.tasks)
    deps.set(t.criterionId, [...(deps.get(t.criterionId) ?? []), ...t.waitsFor]);
  const visit = (id: string, trail: Set<string>) => {
    if (trail.has(id))
      throw new DirectionProposalRejection('Direction contains a dependency cycle');
    for (const next of deps.get(id) ?? []) visit(next, new Set([...trail, id]));
  };
  for (const id of deps.keys()) visit(id, new Set());
  return p;
}
