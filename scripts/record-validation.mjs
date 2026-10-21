import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

await mkdir('docs/validation', { recursive: true });
for (const [input, output] of [
  ['.iterfox/real-codex-validation.json', 'docs/validation/codex-real.json'],
  ['.iterfox/comparison/codex-baseline.json', 'docs/validation/codex-baseline.json'],
]) {
  const report = JSON.parse(await readFile(input, 'utf8'));
  const worktree = report.result?.worktree ?? report.worktree;
  const root = dirname(dirname(worktree));
  let text = JSON.stringify(report, null, 2);
  for (const path of new Set([
    root,
    root.startsWith('/private/') ? root.slice(8) : '/private' + root,
  ]))
    text = text.replaceAll(path, '<local-fixture>');
  const threads = new Map();
  text = text.replace(/"threadId": "([^"]+)"/g, (_, id) => {
    if (!threads.has(id)) threads.set(id, `redacted-session-${threads.size + 1}`);
    return `"threadId": "${threads.get(id)}"`;
  });
  const cleaned = JSON.parse(text);
  cleaned.redactions = [
    'Local fixture paths replaced.',
    'Codex session identifiers replaced; event ordering, metrics, outputs and content fingerprints preserved.',
  ];
  await writeFile(resolve(output), JSON.stringify(cleaned, null, 2) + '\n');
  console.log(output);
}
