# Architecture and decisions

Iterfox 0.1 is local and headless first. A single worker owns one run at a time.
The browser never schedules work. Closing it does not stop the worker.

## Ownership

- An immutable, versioned acceptance contract defines checks, their input scopes,
  allowed edit paths, protected files and limits. Only the operator can accept a
  proposed contract revision, while no worker is active. Every revision is logged.
- An execution graph records the plan, verification attempts, diagnoses and
  corrective tasks. A model may propose work; the runtime checks its shape and
  links it to an existing criterion. It cannot change checks or mark them passed.
- Checks are approved executable/argument arrays, launched directly by the runtime
  without shell interpretation. Exit codes and bounded output are stored with
  file fingerprints. Tests and configuration are protected from autonomous edits.
- A SQLite WAL event ledger is the source of truth. Each append has a per-run
  monotonic sequence and UUID. Appends use a transaction and expected version.
  State and both graphs are pure projections, also used for replay in the UI.
- A database lease fences duplicate workers. Interrupted activities become
  BLOCKED on recovery, never silently remain RUNNING. Resume reruns interrupted
  work and revalidates evidence before continuing. SDK thread IDs are persisted.
- Evidence scopes use literal file/directory prefixes. Omitted scope means all
  tracked and unignored files. Fingerprints include deletions, additions, bytes
  and symlinks. Unknown scope is conservative. A disjoint change retains evidence;
  overlapping changes make it STALE with an explicit event and require a rerun.

## Loop

Approve preflight → isolated Git worktree → read-only Codex plan → one build task
→ runtime check → (failure → Codex diagnosis → corrective build → original check)
→ audit all criteria and fingerprints → Morning Brief.

Builder completion is an unverified claim. Only a runtime verification can earn a
green check. Planner, builder and diagnosis are roles of the same sequential
Codex integration, not independent reviewers. Qualitative assessments cannot
substitute for required deterministic checks in this slice.

## Small dependencies

TypeScript/Node 22.13+, official Codex TypeScript SDK, built-in SQLite, Zod,
React, React Flow, Vite. No cloud service, queue, ORM or generic adapter framework.
The demo provider is only an explicitly labeled test fixture. Runtime interfaces
leave room for future providers without implementing unused adapters.

## Scope

Available: command checks, dynamic bounded correction, durable history, isolated
worktrees, pause/resume/stop, local detached worker, graph, evidence panel,
contract revision approvals, replay and Markdown/JSON brief export.

Deferred: automatic screenshot capture, qualitative acceptance gates, editing the
graph, parallelism, remote runners, OS service installation and cost estimation.
The ledger can label observed and AI-assessed artifacts, but these do not certify
acceptance in 0.1. A local runner stops during sleep/shutdown.
