import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { hostname } from 'node:os';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { artifactRoot, readArtifact } from './core/artifacts.js';
import { contractSchema } from './core/model.js';
import { noteInputSchema } from './core/compass.js';
import { brief, markdownBrief } from './core/brief.js';
import { Store } from './core/store.js';
import { LaunchService } from './launch/service.js';
import { LaunchError, launchError } from './launch/errors.js';
import { browseRepositories } from './launch/repositories.js';
import { ProjectStore } from './projects/store.js';
import { ProjectService } from './projects/service.js';
import { ProjectError, projectError } from './projects/errors.js';
import {
  createRun,
  controlRun,
  resumeRun,
  recoverDeadWorkers,
  auditStoredEvidence,
  addDirectionNote,
} from './service.js';

export async function serve(
  store: Store,
  dataDir: string,
  port: number,
  launch: (id: string) => number | Promise<unknown>,
) {
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port');
  const token = randomBytes(32).toString('hex');
  const uiRoot = fileURLToPath(new URL('../dist/ui/', import.meta.url));
  // In a compiled package server.js is in dist, so resolve its UI sibling.
  const root = import.meta.url.endsWith('/dist/server.js')
    ? fileURLToPath(new URL('./ui/', import.meta.url))
    : uiRoot;
  const streams = new Set<ServerResponse>();
  const proposals = new LaunchService();
  const projects = new ProjectService(new ProjectStore(store.db), store);
  const server = createServer(async (req, res) => {
    try {
      const localPort = (server.address() as { port: number }).port;
      const hosts = [`127.0.0.1:${localPort}`, `localhost:${localPort}`];
      if (!hosts.includes(req.headers.host ?? ''))
        return json(res, 403, { error: 'Local host required' });
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'no-referrer');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Cache-Control', 'no-store');
      const url = new URL(req.url ?? '/', `http://127.0.0.1:${localPort}`);
      const parts = url.pathname.split('/').filter(Boolean);
      // Draft polling exposes local paths and source evidence, so new resource
      // reads require the same token as mutations.
      const privateApi =
        parts[0] === 'api' && ['repositories', 'proposals', 'projects'].includes(parts[1]);
      if (req.method === 'POST' || privateApi) {
        const origin = req.headers.origin;
        if (origin && !hosts.some((h) => origin === `http://${h}`))
          return json(res, 403, { error: 'Same-origin request required' });
        const supplied = Buffer.from(String(req.headers['x-iterfox-token'] ?? ''));
        const expected = Buffer.from(token);
        if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected))
          return json(
            res,
            403,
            launchError(
              new LaunchError(
                'expired',
                'Authorization token required. Reload Iterfox and retry.',
                403,
              ),
            ),
          );
        if (req.method === 'POST' && !req.headers['content-type']?.startsWith('application/json'))
          return json(res, 415, { error: 'JSON required' });
      }
      if (parts[0] === 'api') {
        if (req.method === 'GET' && parts[1] === 'meta')
          return json(res, 200, { token, dataDir, localOnly: true, executionHost: hostname() });
        if (parts[1] === 'projects') {
          if (parts.length === 2 && req.method === 'GET')
            return json(res, 200, projects.store.list());
          if (parts.length === 2 && req.method === 'POST')
            return json(res, 201, await projects.create(await body(req), disconnected(res)));
          if (parts.length === 3 && req.method === 'GET')
            return json(res, 200, projects.store.get(parts[2]));
          if (parts.length === 4 && parts[3] === 'history' && req.method === 'GET')
            return json(res, 200, projects.store.history(parts[2]));
          if (parts.length === 4 && parts[3] === 'revisions' && req.method === 'POST')
            return json(res, 200, projects.revise(parts[2], await body(req)));
          if (parts.length === 4 && parts[3] === 'runs' && req.method === 'POST')
            return json(
              res,
              200,
              await projects.linkRun(parts[2], await body(req), disconnected(res)),
            );
          if (parts.length === 4 && parts[3] === 'handoffs' && req.method === 'POST')
            return json(
              res,
              201,
              await projects.captureHandoff(parts[2], await body(req), disconnected(res)),
            );
          if (parts.length === 4 && parts[3] === 'continuations' && req.method === 'POST')
            return json(
              res,
              200,
              await projects.prepareContinuation(parts[2], await body(req), disconnected(res)),
            );
          return json(res, 404, { error: 'Not found' });
        }
        if (parts[1] === 'repositories') {
          if (parts.length === 3 && parts[2] === 'browse' && req.method === 'POST') {
            const signal = disconnected(res);
            return json(res, 200, await browseRepositories(await body(req), signal));
          }
          return json(res, 404, { error: 'Not found' });
        }
        if (parts[1] === 'proposals') {
          if (parts.length === 2 && req.method === 'POST') {
            const job = proposals.start(await body(req));
            res.once('close', () => {
              if (!res.writableFinished) {
                try {
                  proposals.cancel(job.id);
                } catch {
                  /* server may have closed */
                }
              }
            });
            return json(res, 202, job);
          }
          if (parts.length === 3 && req.method === 'GET')
            return json(res, 200, proposals.get(parts[2]));
          if (parts.length === 4 && parts[3] === 'cancel' && req.method === 'POST') {
            await body(req);
            return json(res, 200, proposals.cancel(parts[2]));
          }
          return json(res, 404, { error: 'Not found' });
        }
        if (req.method === 'POST' && parts[1] === 'preflight' && parts.length === 2) {
          const signal = disconnected(res);
          return json(res, 200, await proposals.review(await body(req), signal));
        }
        if (parts[1] !== 'runs') return json(res, 404, { error: 'Not found' });
        if (parts.length === 2 && req.method === 'GET') {
          recoverDeadWorkers(store);
          for (const s of store.list()) await auditStoredEvidence(store, s.id);
          return json(res, 200, store.list());
        }
        if (parts.length === 2 && req.method === 'POST') {
          const b = await body(req);
          if (b.authorized !== true) throw new Error('Explicit preflight authorization required');
          const reviewed =
            b.authorizationId !== undefined ||
            b.proposalId !== undefined ||
            b.originalGoal !== undefined
              ? await proposals.authorize(b, disconnected(res))
              : undefined;
          const state = await createRun(
            store,
            dataDir,
            reviewed?.repository ?? String(b.repository),
            reviewed?.contract ?? contractSchema.parse(b.contract),
            'codex',
            reviewed?.expectedHead,
            reviewed?.notes ?? (b.handoff ? [noteInputSchema.parse(b.handoff)] : []),
          );
          try {
            await launch(state.id);
          } catch {
            throw new LaunchError(
              'worker-launch',
              `Run ${state.id} was created, but its worker could not start. Open that run and resume it; do not authorize another run.`,
              503,
              state.id,
            );
          }
          return json(res, 201, state);
        }
        const id = parts[2];
        recoverDeadWorkers(store);
        await auditStoredEvidence(store, id);
        const state = store.get(id);
        if (parts.length === 3 && req.method === 'GET') return json(res, 200, state);
        if (parts[3] === 'direction' && parts.length === 4 && req.method === 'POST') {
          return json(
            res,
            201,
            addDirectionNote(store, id, noteInputSchema.parse(await body(req))),
          );
        }
        if (parts[3] === 'artifacts' && parts.length === 5 && req.method === 'GET') {
          const artifact = state.evidence
            .flatMap((e) => e.artifacts ?? [])
            .find((a) => a.id === parts[4]);
          if (!artifact) return json(res, 404, { error: 'Artifact not found' });
          const bytes = await readArtifact(artifactRoot(store.path), artifact);
          res.setHeader('Content-Type', artifact.mime);
          res.setHeader(
            'Content-Disposition',
            `${artifact.mime === 'image/png' ? 'inline' : 'attachment'}; filename="${artifact.id}"`,
          );
          return res.end(bytes);
        }
        if (parts[3] === 'events' && req.method === 'GET') return json(res, 200, store.events(id));
        if (parts[3] === 'brief' && req.method === 'GET') {
          if (url.searchParams.get('format') === 'markdown') {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="iterfox-${id}.md"`);
            return res.end(markdownBrief(state, store.events(id)));
          }
          return json(res, 200, brief(state, store.events(id)));
        }
        if (parts[3] === 'control' && req.method === 'POST') {
          const b = await body(req);
          if (b.action === 'resume') {
            resumeRun(store, id);
            await launch(id);
          } else if (b.action === 'pause' || b.action === 'stop') controlRun(store, id, b.action);
          else throw new Error('Unknown control action');
          return json(res, 202, { requested: b.action });
        }
        if (parts[3] === 'stream' && req.method === 'GET') {
          let cursor = Number(req.headers['last-event-id'] ?? url.searchParams.get('after') ?? 0);
          if (!Number.isSafeInteger(cursor) || cursor < 0) throw new Error('Invalid event cursor');
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
          });
          streams.add(res);
          res.write(': connected\n\n');
          let auditing = false;
          let auditedAt = Date.now();
          const send = async () => {
            if (auditing) return;
            auditing = true;
            try {
              recoverDeadWorkers(store);
              if (Date.now() - auditedAt > 5000) {
                await auditStoredEvidence(store, id);
                auditedAt = Date.now();
              }
              for (const event of store.events(id, cursor)) {
                res.write(`id: ${event.seq}\ndata: ${JSON.stringify(event)}\n\n`);
                cursor = event.seq;
              }
            } catch {
              res.end();
            } finally {
              auditing = false;
            }
          };
          send();
          const timer = setInterval(send, 250);
          const heartbeat = setInterval(() => res.write(': heartbeat\n\n'), 15_000);
          req.on('close', () => {
            clearInterval(timer);
            clearInterval(heartbeat);
            streams.delete(res);
          });
          return;
        }
        return json(res, 404, { error: 'Not found' });
      }
      if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
      const pathname = decodeURIComponent(url.pathname);
      const target = resolve(root, '.' + pathname);
      if (target !== root.replace(/\/$/, '') && !target.startsWith(root.replace(/\/$/, '') + sep))
        return json(res, 403, { error: 'Invalid path' });
      let content: Buffer;
      let file = target;
      try {
        if (!extname(pathname)) file = resolve(root, 'index.html');
        content = await readFile(file);
      } catch {
        return json(res, 404, { error: 'UI is not built. Run npm run build first.' });
      }
      const types: Record<string, string> = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
      };
      res.setHeader(
        'Content-Type',
        `${types[extname(file)] ?? 'application/octet-stream'}; charset=utf-8`,
      );
      res.end(content);
    } catch (e) {
      if (!res.headersSent && e instanceof ProjectError) json(res, e.status, projectError(e));
      else if (!res.headersSent)
        json(res, e instanceof LaunchError ? e.status : 400, launchError(e));
      else res.end();
    }
  });
  // A slow/incomplete body must not keep an unactioned request alive forever.
  server.requestTimeout = 30_000;
  server.headersTimeout = 15_000;
  server.on('close', () => {
    proposals.close();
    for (const stream of streams) stream.end();
  });
  try {
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(port, '127.0.0.1', resolve);
    });
  } catch (error) {
    proposals.close();
    throw error;
  }
  console.log(`Iterfox UI: http://127.0.0.1:${(server.address() as { port: number }).port}`);
  console.log(
    'Worker state persists independently of this page. Keep the execution host awake for Night Runs.',
  );
  return server;
}
function disconnected(res: ServerResponse): AbortSignal {
  const controller = new AbortController();
  res.once('close', () => {
    if (!res.writableFinished) controller.abort();
  });
  return controller.signal;
}
function json(res: ServerResponse, status: number, value: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}
async function body(req: IncomingMessage): Promise<Record<string, unknown>> {
  let bytes = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > 262_144) throw new Error('Request body too large');
    chunks.push(chunk);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    throw new LaunchError(
      'invalid-request',
      'The request must contain valid JSON. Correct it and retry.',
    );
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
    throw new LaunchError('invalid-request', 'A JSON object is required.');
  return parsed as Record<string, unknown>;
}
