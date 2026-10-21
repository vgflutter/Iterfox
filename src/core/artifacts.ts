import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import type { ArtifactRef } from './model.js';
export const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');
export function artifactRoot(ledger: string): string {
  return resolve(dirname(ledger), 'artifacts');
}
export async function saveArtifact(
  root: string,
  runId: string,
  name: string,
  bytes: Buffer,
  mime: ArtifactRef['mime'],
): Promise<ArtifactRef> {
  if (
    !/^[a-zA-Z0-9-]+$/.test(runId) ||
    !/^[a-zA-Z0-9_.-]+$/.test(name) ||
    bytes.length > 16 * 1024 * 1024
  )
    throw new Error('Invalid or oversized evidence artifact');
  const id = randomUUID();
  const relative = runId + '/' + id + '-' + name;
  await mkdir(resolve(root, runId), { recursive: true, mode: 0o700 });
  await writeFile(resolve(root, relative), bytes, { flag: 'wx', mode: 0o600 });
  return { id, name, path: relative, sha256: hash(bytes), bytes: bytes.length, mime };
}
export async function readArtifact(root: string, ref: ArtifactRef): Promise<Buffer> {
  const base = await realpath(root);
  const path = await realpath(resolve(base, ref.path));
  if (!path.startsWith(base + sep)) throw new Error('Artifact path escaped evidence directory');
  const bytes = await readFile(path);
  if (bytes.length !== ref.bytes || hash(bytes) !== ref.sha256)
    throw new Error('Evidence artifact integrity mismatch');
  return bytes;
}
export async function evidenceFile(root: string, relative: string): Promise<string> {
  const base = await realpath(root);
  const path = await realpath(resolve(base, relative));
  if (!path.startsWith(base + sep) || path !== resolve(base, relative))
    throw new Error('Evidence input escaped repository or uses symlinks');
  return path;
}
