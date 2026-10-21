import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { check } from '../core/check.js';
import { auditChanges, stamp } from '../core/workspace.js';
import { evidenceFile, saveArtifact } from '../core/artifacts.js';
import {
  assessmentSufficient,
  type Assessment,
  type Criterion,
  type Evidence,
  type RunState,
} from '../core/model.js';
import { assessmentSchema, type AgentRequest } from '../providers/provider.js';
import { verifyVisual } from './visual.js';

export function verificationScope(c: Criterion): string[] {
  if (!c.scope.length) return [];
  const extra =
    c.verification?.kind === 'visual'
      ? [c.verification.baseline]
      : c.verification?.kind === 'qualitative'
        ? c.verification.files
        : [];
  return [...new Set([...c.scope, ...extra])];
}

// Commands, capture inputs, thresholds and evidence receipts belong to the runtime.
// A provider can supply an assessment, but cannot select its own rubric or proof.
export async function verify(
  state: RunState,
  nodeId: string,
  c: Criterion,
  root: string,
  signal: AbortSignal,
  record: (e: Evidence) => void,
  assess: (input: NonNullable<AgentRequest['assessmentInput']>) => Promise<unknown>,
): Promise<Evidence> {
  const started = Date.now();
  const scope = verificationScope(c);
  const inputs =
    c.verification?.kind === 'visual'
      ? [c.verification.baseline]
      : c.verification?.kind === 'qualitative'
        ? c.verification.files
        : [];
  const before = await stamp(state.worktree, scope, inputs);
  const result = await check(state.worktree, c, signal);
  const make = (overrides: Partial<Evidence> = {}): Evidence => ({
    id: randomUUID(),
    nodeId,
    criterionId: c.id,
    contractVersion: state.contractVersion,
    kind: 'deterministic',
    status: 'failed',
    createdAt: new Date().toISOString(),
    command: c.command,
    exitCode: result.exitCode,
    output: result.output,
    durationMs: Date.now() - started,
    stamp: before,
    scope,
    inputs,
    ...overrides,
  });
  const final = make({ status: result.exitCode === 0 ? 'passed' : 'failed' });
  if (result.exitCode === 0 && c.verification) {
    const stdout = await saveArtifact(
      root,
      state.id,
      'check-output.txt',
      Buffer.from(result.output),
      'text/plain',
    );
    final.artifacts = [stdout];
    record(make({ status: 'recorded', artifacts: [stdout] }));
    if (c.verification.kind === 'visual') {
      const visual = await verifyVisual(state.worktree, c, root, state.id, signal);
      final.artifacts.push(...visual.artifacts);
      final.visual = visual.visual;
      final.status = visual.passed ? 'passed' : 'failed';
      final.exitCode = visual.passed ? 0 : 1;
      final.output += '\nPixel comparison (not an aesthetic judgment):\n' + visual.output;
      record(
        make({
          kind: 'observed',
          status: 'recorded',
          artifacts: visual.artifacts,
          visual: visual.visual,
          output: visual.output,
        }),
      );
    } else {
      const images: string[] = [];
      let text = 'Approved command output:\n' + result.output;
      for (const file of c.verification.files) {
        const path = await evidenceFile(state.worktree, file);
        const bytes = await readFile(path);
        if (bytes.length > 4 * 1024 * 1024)
          throw new Error('Qualitative input exceeds 4 MiB: ' + file);
        if (file.toLowerCase().endsWith('.png')) {
          const artifact = await saveArtifact(root, state.id, basename(file), bytes, 'image/png');
          final.artifacts.push(artifact);
          // Review the immutable copy, not an input that can change mid-turn.
          images.push(await evidenceFile(root, artifact.path));
        } else {
          if (bytes.includes(0) || bytes.length > 128_000)
            throw new Error('Qualitative text input must be UTF-8 and at most 128 KB: ' + file);
          text += '\n\nFile: ' + file + '\n' + bytes.toString('utf8');
          final.artifacts.push(
            await saveArtifact(root, state.id, basename(file) + '.txt', bytes, 'text/plain'),
          );
        }
      }
      const input = {
        text,
        images,
        rubric: c.verification.rubric,
        instructions: c.verification.instructions,
      };
      record(
        make({
          kind: 'observed',
          status: 'recorded',
          artifacts: final.artifacts,
          output: 'Operator-selected assessment inputs captured.',
        }),
      );
      const answer = assessmentSchema.parse(await assess(input));
      const expected = c.verification.rubric.map((r) => r.id).sort();
      if (JSON.stringify(answer.ratings.map((r) => r.id).sort()) !== JSON.stringify(expected))
        throw new Error('Assessor did not return exactly the approved rubric IDs');
      const assessment: Assessment = { ...answer, reviewer: state.provider, independent: false };
      final.kind = 'ai-assessed';
      final.assessment = assessment;
      final.status =
        assessment.outcome === 'uncertain'
          ? 'unverified'
          : assessmentSufficient(assessment, c)
            ? 'assessed'
            : 'failed';
      final.output = JSON.stringify(assessment, null, 2);
      final.artifacts.push(
        await saveArtifact(
          root,
          state.id,
          'assessment.json',
          Buffer.from(final.output),
          'application/json',
        ),
      );
    }
  }
  const after = await stamp(state.worktree, scope, inputs);
  await auditChanges(state);
  if (before.head !== after.head || before.fingerprint !== after.fingerprint) {
    final.status = 'failed';
    final.exitCode = null;
    final.output += '\nCheck inputs changed during execution; result cannot be certified.';
  }
  final.durationMs = Date.now() - started;
  return final;
}
