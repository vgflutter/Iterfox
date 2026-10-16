import { z } from 'zod';
import type { RunState, TaskNode } from '../core/model.js';

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
export interface AgentRequest {
  mode: 'plan' | 'build' | 'diagnose';
  state: RunState;
  node: TaskNode;
  signal: AbortSignal;
  failure?: string;
  onThread: (id: string) => void;
  onUsage: (tokens: number) => void;
}
export interface AgentProvider {
  name: 'codex' | 'demo';
  invoke(request: AgentRequest): Promise<unknown>;
}
export function resultSchema(mode: AgentRequest['mode']) {
  return mode === 'plan' ? planSchema : mode === 'build' ? buildSchema : diagnosisSchema;
}
