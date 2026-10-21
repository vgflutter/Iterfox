import type { Contract } from '../core/model.js';
import { proposalToContract, type Proposal, type ProposalDraft } from '../proposals/model.js';

type DraftCriterion = ProposalDraft['criteria'][number];
export interface DurationEdit {
  hours: string;
  minutes: string;
  seconds: string;
}
type DurationLimit = 'maxDurationMs' | 'turnTimeoutMs';
type CountLimit = Exclude<keyof Contract['limits'], DurationLimit>;

export interface CriterionEdit {
  key: string;
  id: string;
  title: string;
  command: string;
  scope: string;
  timeout: DurationEdit;
  original?: DraftCriterion;
}
export interface ProposalEdit {
  goal: string;
  criteria: CriterionEdit[];
  allowedPaths: string;
  protectedPaths: string;
  maxReviews: string;
  limits: Record<CountLimit, string> & Record<DurationLimit, DurationEdit>;
}

export interface DurationBounds {
  min: number;
  max: number;
}
type LimitField = DurationBounds & {
  label: string;
} & ({ kind: 'duration'; key: DurationLimit } | { kind: 'count'; key: CountLimit });

export const checkTimeoutBounds: DurationBounds = { min: 100, max: 3_600_000 };
export const limitFields: LimitField[] = [
  { kind: 'duration', key: 'maxDurationMs', label: 'Work window', min: 1000, max: 604_800_000 },
  { kind: 'count', key: 'maxTurns', label: 'Maximum turns', min: 1, max: 1000 },
  { kind: 'count', key: 'maxAttempts', label: 'Attempts per check', min: 1, max: 20 },
  { kind: 'count', key: 'maxTokens', label: 'Reported token limit', min: 1, max: 100_000_000 },
  { kind: 'duration', key: 'turnTimeoutMs', label: 'Timeout per turn', min: 1000, max: 3_600_000 },
  { kind: 'count', key: 'maxNoProgress', label: 'Turns without progress', min: 1, max: 20 },
];

/** Split integer milliseconds; fractional seconds are decimal text, never rounded. */
export function editDuration(milliseconds: number, includeHours = false): DurationEdit {
  const hours = includeHours ? Math.floor(milliseconds / 3_600_000) : 0;
  const minutes = Math.floor((milliseconds - hours * 3_600_000) / 60_000);
  const seconds = Math.floor((milliseconds % 60_000) / 1000);
  const fraction = String(milliseconds % 1000)
    .padStart(3, '0')
    .replace(/0+$/, '');
  return {
    hours: String(hours),
    minutes: String(minutes),
    seconds: `${seconds}${fraction ? `.${fraction}` : ''}`,
  };
}

/** Human-readable display of the actual contract value, including every millisecond. */
export function formatDuration(milliseconds: number): string {
  const value = editDuration(milliseconds, true);
  return (
    [
      ...(value.hours !== '0' ? [`${value.hours} h`] : []),
      ...(value.minutes !== '0' ? [`${value.minutes} min`] : []),
      ...(value.seconds !== '0' ? [`${value.seconds} s`] : []),
    ].join(' ') || '0 s'
  );
}

/** Exact conversion at the contract boundary; empty inputs cannot become defaults. */
export function durationMilliseconds(value: DurationEdit, bounds: DurationBounds): number {
  const hours = value.hours.trim();
  const minutes = value.minutes.trim();
  const seconds = value.seconds.trim();
  if (!hours || !minutes || !seconds)
    throw new Error('Complete every duration field; enter 0 for unused units.');
  if (!/^\d+$/.test(hours) || !/^\d+$/.test(minutes))
    throw new Error('Enter whole hours and minutes; use seconds for smaller units.');
  if (!/^\d+(?:\.\d{1,3})?$/.test(seconds))
    throw new Error('Enter seconds with at most 3 decimal places. Values are never rounded.');
  const [wholeSeconds, fraction = ''] = seconds.split('.');
  const parts = [Number(hours), Number(minutes), Number(wholeSeconds)];
  if (parts.some((part) => !Number.isSafeInteger(part)))
    throw new Error('This duration is too large to convert exactly.');
  // Only multiply whole integers. Floating-point decimal multiplication can lose a millisecond.
  const milliseconds =
    parts[0] * 3_600_000 + parts[1] * 60_000 + parts[2] * 1000 + Number(fraction.padEnd(3, '0'));
  if (!Number.isSafeInteger(milliseconds))
    throw new Error('This duration is too large to convert exactly.');
  if (milliseconds < bounds.min || milliseconds > bounds.max)
    throw new Error(
      `Use a duration from ${formatDuration(bounds.min)} to ${formatDuration(bounds.max)}.`,
    );
  return milliseconds;
}

export function durationProblem(value: DurationEdit, bounds: DurationBounds): string | undefined {
  try {
    durationMilliseconds(value, bounds);
  } catch (error) {
    return (error as Error).message;
  }
}

let nextKey = 0;
export function newCriterion(original?: DraftCriterion): CriterionEdit {
  return {
    key: `criterion-${++nextKey}`,
    id: original?.id ?? '',
    title: original?.title ?? '',
    command: original?.command ? JSON.stringify(original.command) : '',
    scope: original?.scope.join('\n') ?? '',
    timeout: editDuration(original?.timeoutMs ?? 60_000),
    ...(original ? { original } : {}),
  };
}

export function editProposal(proposal: Proposal): ProposalEdit {
  const draft = proposal.draft;
  return {
    goal: draft.goal,
    criteria: draft.criteria.map(newCriterion),
    allowedPaths: draft.allowedPaths.join('\n'),
    protectedPaths: draft.protectedPaths.join('\n'),
    maxReviews: String(draft.supervision.maxReviews),
    limits: Object.fromEntries(
      limitFields.map((field) => [
        field.key,
        field.kind === 'duration'
          ? editDuration(draft.limits[field.key], field.key === 'maxDurationMs')
          : String(draft.limits[field.key]),
      ]),
    ) as ProposalEdit['limits'],
  };
}

export function paths(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function commandArguments(text: string): string[] {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('Enter exact arguments as a JSON array of strings.');
  }
  if (
    !Array.isArray(value) ||
    !value.length ||
    value.length > 50 ||
    typeof value[0] !== 'string' ||
    !value[0].trim() ||
    value.some(
      (arg) => typeof arg !== 'string' || !arg.length || arg.length > 2000 || arg.includes('\0'),
    )
  )
    throw new Error(
      'Supply 1–50 nonempty string arguments, at most 2,000 characters each, as a JSON array. No check has been run.',
    );
  return value;
}

export function commandProblem(criterion: CriterionEdit): string | undefined {
  if (!criterion.command.trim())
    return (
      criterion.original?.gap ??
      'No check is established. Supply and review exact arguments before preflight.'
    );
  try {
    commandArguments(criterion.command);
  } catch (error) {
    return (error as Error).message;
  }
}

export function commandChanged(criterion: CriterionEdit): boolean {
  if (!criterion.original?.command) return true;
  try {
    return (
      JSON.stringify(commandArguments(criterion.command)) !==
      JSON.stringify(criterion.original.command)
    );
  } catch {
    return true;
  }
}

/** Explicit, pure conversion: proposal-only metadata never becomes runtime evidence. */
export function editedContract(proposal: Proposal, edit: ProposalEdit, project: boolean): Contract {
  const contract = proposalToContract({
    ...proposal.draft,
    goal: edit.goal,
    criteria: edit.criteria.map((criterion, index) => {
      const problem = commandProblem(criterion);
      if (problem)
        throw new Error(`Check ${index + 1} (${criterion.id || 'missing ID'}): ${problem}`);
      const changed = commandChanged(criterion);
      return {
        id: criterion.id,
        title: criterion.title,
        command: commandArguments(criterion.command),
        scope: paths(criterion.scope),
        timeoutMs: checkedDuration(
          criterion.timeout,
          checkTimeoutBounds,
          `Check ${index + 1} timeout`,
        ),
        sources: changed ? [] : (criterion.original?.sources ?? []),
        rationale: changed
          ? 'Operator-supplied arguments; source grounding and results are unverified.'
          : criterion.original!.rationale,
        gap: null,
      };
    }),
    allowedPaths: paths(edit.allowedPaths),
    protectedPaths: paths(edit.protectedPaths),
    supervision: {
      mode: 'project',
      maxReviews: project ? numberInput(edit.maxReviews) : proposal.draft.supervision.maxReviews,
    },
    limits: Object.fromEntries(
      limitFields.map((field) => [
        field.key,
        field.kind === 'duration'
          ? checkedDuration(edit.limits[field.key], field, field.label)
          : numberInput(edit.limits[field.key]),
      ]),
    ),
  });
  if (!project) delete contract.supervision;
  return contract;
}

function checkedDuration(value: DurationEdit, bounds: DurationBounds, label: string): number {
  try {
    return durationMilliseconds(value, bounds);
  } catch (error) {
    throw new Error(`${label}: ${(error as Error).message}`);
  }
}

function numberInput(value: string): number {
  // A blank numeric field is incomplete, never an implicit zero or schema default.
  return value.trim() ? Number(value) : NaN;
}
