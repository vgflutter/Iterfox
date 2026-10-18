import { z } from 'zod';
import type { RunState, TaskNode } from '../core/model.js';
import { directionSchema } from '../core/compass.js';

export const planSchema = z
  .object({
    tasks: z
      .array(
        z
          .object({
            title: z.string().min(3).max(200),
            objective: z.string().min(5).max(4000),
            criterionId: z.string(),
          })
          .strict(),
      )
      .min(1)
      .max(8),
  })
  .strict();
export const buildSchema = z
  .object({
    summary: z.string().min(1).max(8000),
    blocked: z.boolean(),
    reason: z.string().max(4000),
  })
  .strict();
export const diagnosisSchema = z
  .object({
    hypothesis: z.string().min(3).max(4000),
    correctiveTitle: z.string().min(3).max(200),
    correctiveObjective: z.string().min(5).max(4000),
    blocked: z.boolean(),
  })
  .strict();
export const assessmentSchema = z
  .object({
    outcome: z.enum(['sufficient', 'insufficient', 'uncertain']),
    ratings: z
      .array(
        z
          .object({
            id: z.string().min(1),
            score: z.number().int().min(0).max(5),
            explanation: z.string().min(3).max(2000),
          })
          .strict(),
      )
      .min(1)
      .max(12),
    summary: z.string().min(3).max(4000),
    limitations: z.array(z.string().min(3).max(2000)).min(1).max(10),
  })
  .strict();
export interface AgentRequest {
  mode: 'plan' | 'orient' | 'build' | 'diagnose' | 'assess';
  state: RunState;
  node: TaskNode;
  signal: AbortSignal;
  failure?: string;
  assessmentInput?: { text: string; images: string[]; rubric: unknown; instructions: string };
  onThread: (id: string) => void;
  onUsage: (tokens: number) => void;
}
export interface AgentProvider {
  name: 'codex' | 'demo';
  invoke(request: AgentRequest): Promise<unknown>;
}
export function resultSchema(mode: AgentRequest['mode']) {
  return mode === 'orient'
    ? directionSchema
    : mode === 'plan'
      ? planSchema
      : mode === 'build'
        ? buildSchema
        : mode === 'assess'
          ? assessmentSchema
          : diagnosisSchema;
}
