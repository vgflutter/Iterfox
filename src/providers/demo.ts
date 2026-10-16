import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { AgentProvider, AgentRequest } from './provider.js';

// Explicit fixture, never selected as fallback for a failed real provider.
// All file edits still go through the real runtime, Git and command verifiers.
export class DemoProvider implements AgentProvider {
  readonly name = 'demo' as const;
  constructor(private delayMs = 0) {}
  async invoke(r: AgentRequest): Promise<unknown> {
    r.signal.throwIfAborted();
    if (this.delayMs)
      await new Promise<void>((resolve, reject) => {
        const abort = () => {
          clearTimeout(timer);
          reject(r.signal.reason);
        };
        const timer = setTimeout(() => {
          r.signal.removeEventListener('abort', abort);
          resolve();
        }, this.delayMs);
        r.signal.addEventListener('abort', abort, { once: true });
      });
    r.signal.throwIfAborted();
    if (r.mode === 'plan')
      return {
        tasks: [
          {
            title: 'Normalize avatar names',
            objective:
              'Handle missing and empty avatar names safely. Preserve dialogue behavior until its check is run.',
            criterionId: 'render',
          },
        ],
      };
    if (r.mode === 'diagnose')
      return {
        hypothesis:
          'The observed dialogue assertion expects the second avatar to answer the first; both currently repeat the greeting.',
        correctiveTitle: 'Give the second avatar a reply',
        correctiveObjective:
          'Use the previous avatar label in the second response while preserving safe normalization.',
        blocked: false,
      };
    const path = join(r.state.worktree, 'avatar.mjs');
    let source = await readFile(path, 'utf8');
    if (r.node.criterionId === 'render')
      source = source.replace(
        'return name.trim()[0].toUpperCase();',
        "return String(name ?? '').trim()[0]?.toUpperCase() ?? '?';",
      );
    else
      source = source.replace(
        'names.map(name => `${avatarLabel(name)}: Hello!`)',
        'names.map((name, i) => i === 0 ? `${avatarLabel(name)}: Hello!` : `${avatarLabel(name)}: Hi, ${avatarLabel(names[i - 1])}!`)',
      );
    await writeFile(path, source);
    return {
      summary:
        r.node.criterionId === 'render'
          ? 'DEMO fixture normalized empty avatar labels.'
          : 'DEMO fixture changed the second dialogue turn.',
      blocked: false,
      reason: '',
    };
  }
}
