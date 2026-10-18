# Architecture and decisions

Iterfox 0.1 is headless first, with a local worker or SSH host. A single worker owns one run at a time.
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

Approve preflight → isolated Git worktree → read-only Codex plan → group adjacent
steps sharing a gate → probe existing deterministic coverage → execute remaining
planned implementation → runtime acceptance → (remaining failure → diagnosis →
corrective build → original check) → freshness audit → Morning Brief.

Failed preliminary command probes are recorded as deferred observations while
planned implementation remains. They do not consume failure retries or trigger
model diagnosis. Negative probes are cached only within the current worker for
unchanged declared inputs. Browser/qualitative policies are not speculatively probed.
A current deterministic PASS can skip an already-covered pending task, with the
receipt linked to the skip. Invalidating that receipt reopens the original task.
Adjacent steps are combined without reordering, retaining every proposed objective;
nonadjacent contributions keep their execution order. Legacy partial plans remain
replayable. The original planner result stays in the ledger.

Builder completion is an unverified claim. Only a runtime verification can earn a
green check. Qualitative policies can earn ASSESSED, a separate probabilistic
result with rubric scores and limitations. Planner, builder, diagnosis and assessor
are roles of the same sequential Codex integration, not independent reviewers.
Qualitative assessments cannot substitute for required deterministic checks.

## Small dependencies

TypeScript/Node 22.13+, official Codex TypeScript SDK, built-in SQLite, Zod,
React, React Flow, Vite, Playwright, pixelmatch and pngjs. The SSH runner uses
existing host services; no vendor SDK, queue, ORM or generic adapter framework.
The demo provider is only an explicitly labeled test fixture. Runtime interfaces
leave room for future providers without implementing unused adapters.

## Scope

Available: command checks, real browser capture/pixel comparison, explicit qualitative
rubrics, bounded correction, durable history, isolated worktrees, pause/resume/stop,
detached workers, graph, artifact panel, contract revision approvals, replay and briefs.

Artifacts live outside the code worktree and are addressed by recorded IDs and
SHA-256. Final PASS/ASSESSED receipts bind their input scope and artifact hashes;
changed/missing proof becomes STALE. Supporting observed/command receipts remain
historical snapshots. See [verification](verification.md).

The [SSH runner](cloud-runner.md) sends bounded JSON requests to the installed CLI
on an existing host. A preflight pins source commit and parsed-contract hash.
Remote user services own workers independently of the client connection; a same-port
localhost tunnel preserves HTTP Host/Origin checks. Downloaded bundles validate
artifact paths and hashes before writing into a fresh local directory. The remote
host remains trusted. Live SSH/Linux/systemd behavior is pending validation.

Deferred: graph editing, parallelism, provisioning, automatic reboot continuation,
adversarial verifier isolation and cost estimation. A local runner stops during
sleep/shutdown; a remote runner needs its host awake and correctly configured.

## Evolving project direction

An optional [Project Compass](project-compass.md) overlays the immutable contract.
`direction.noted` appends operator context; a read-only `orient` turn replaces the
ordinary initial planner or reconciles a later batch. `direction.compiled` atomically
records its source snapshot, per-note dispositions and replacement unstarted tasks.
Completed work and evidence retain their history. The pure projector requires one
disposition for every active source note and validates known criteria and acyclic
dependencies. Every model turn consumes the existing budget.

Questions hold the named criteria and declared transitive dependent work. The
scheduler continues on the remaining criteria, then blocks with preserved progress.
Only linked operator replies retire questions; new notes arriving during a turn
remain pending. No qualitative direction statement becomes acceptance evidence.
The morning brief and event replay include the direction history.
