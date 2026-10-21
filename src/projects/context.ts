import { projectLimits } from '../shared/projects.js';

export interface ContextSection {
  title: string;
  items: string[];
}

// Render untrusted prose as indented context under its provenance label. Never
// use project/agent text as execution instructions, check results or permissions.
function line(text: string): string {
  return `- ${text.replaceAll('\n', '\n  ')}`;
}

function shorten(text: string, limit: number): { text: string; omitted: number } {
  if (text.length <= limit) return { text, omitted: 0 };
  const suffixLength = `… [${text.length} characters omitted]`.length;
  const kept = text.slice(0, Math.max(0, limit - suffixLength)).replace(/[\uD800-\uDBFF]$/, '');
  const omitted = text.length - kept.length;
  return { text: `${kept}… [${omitted} characters omitted]`, omitted };
}

/** Fairly reserve space for every section before including additional items. */
export function boundedContext(prelude: string, sections: ContextSection[]) {
  const groups = sections.map((section) => ({
    ...section,
    items: section.items.length ? section.items.map(line) : ['- None recorded.'],
    included: [] as { original: string; text: string; omitted: number }[],
    next: 0,
  }));
  const render = () =>
    [
      prelude,
      ...groups.map(
        (group) => `${group.title}\n${group.included.map((item) => item.text).join('\n')}`,
      ),
    ].join('\n\n');
  // The fixed footer is always visible. Detailed omissions are also returned
  // separately so the inspector can explain which material was left out.
  const footerReserve = 200;
  let available = projectLimits.handoff - render().length - footerReserve - 2;
  if (available < groups.length * 40) throw new Error('Project context header exceeds its bound');
  const firstBudget = Math.min(350, Math.floor(available / Math.max(1, groups.length)));
  for (const group of groups) {
    const original = group.items[group.next++]!;
    const item = shorten(original, firstBudget);
    group.included.push({ original, ...item });
    available -= item.text.length;
  }
  while (available >= 80) {
    let added = false;
    for (const group of groups) {
      if (group.next >= group.items.length || available < 80) continue;
      const original = group.items[group.next++]!;
      const item = shorten(original, Math.min(350, available - 1));
      group.included.push({ original, ...item });
      available -= item.text.length + 1;
      added = true;
    }
    if (!added) break;
  }

  // Small projects should not lose useful prose merely because each section's
  // initial allocation was conservative. Share remaining space among clipped
  // items rather than leaving it unused or giving it all to one long purpose.
  while (available > 0) {
    let restored = false;
    for (const group of groups) {
      for (const item of group.included) {
        if (!item.omitted || available <= 0) continue;
        const expanded = shorten(item.original, item.text.length + Math.min(128, available));
        const growth = expanded.text.length - item.text.length;
        if (growth <= 0) continue;
        Object.assign(item, expanded);
        available -= growth;
        restored = true;
      }
    }
    if (!restored) break;
  }

  let omittedItems = 0;
  let omittedCharacters = 0;
  const omissions: string[] = [];
  for (const group of groups) {
    const remaining = group.items.slice(group.next);
    const clippedCharacters = group.included.reduce((sum, item) => sum + item.omitted, 0);
    omittedItems += remaining.length;
    omittedCharacters += remaining.reduce((sum, item) => sum + item.length, 0) + clippedCharacters;
    if (remaining.length || clippedCharacters)
      omissions.push(
        `${group.title}: ${remaining.length} items omitted; ${clippedCharacters} characters omitted from included items.`,
      );
  }
  const footer = omissions.length
    ? `Context omissions: ${omittedItems} items and ${omittedCharacters} characters. Inspect the full project revision and stored handoff receipts for omitted context.`
    : 'Context omissions: none.';
  const handoff = `${render()}\n\n${footer}`;
  if (handoff.length > projectLimits.handoff) throw new Error('Project context exceeds its bound');
  return { handoff, omissions };
}

export const historicalBoundary =
  'Historical context only: earlier checks and agent claims do not verify a new run. ' +
  'Preparation grants no permissions and starts no work; draft, review and explicitly authorize a new contract. ' +
  'Only committed HEAD is copied: review a code checkpoint before continuing from prior worktree changes.';
