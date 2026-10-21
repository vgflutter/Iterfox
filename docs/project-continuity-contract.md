# Project continuity: approved product boundary for the first implementation

This is a pre-implementation acceptance specification, fixed by the operator before
the autonomous session. `tests/project-continuity.test.ts` and
`tests/browser/projects.spec.ts` exercise these public behaviors. They are not
claims that the feature already exists. The agent chooses internal architecture.

## Outcome

A developer can retain a project brief and a small milestone roadmap across server
and worker sessions, inspect the milestone graph, attach actual runs and capture
an evidence-linked handoff. Preparing the next session opens the existing editable
goal/authorization flow with project context. Preparation alone never runs a model,
executes checks, starts a worker or certifies the next milestone. Every new run
retains the existing reviewed authorization boundary.

The current bounded slice uses operator-reviewed milestones and explicitly prepared
continuations. It does not claim an always-on, cross-run scheduler or automatic Git
checkpointing. Reuse existing run scheduling, sandbox policy and acceptance engine.

## Public HTTP contract

Project reads and writes require the existing same-origin `X-Iterfox-Token` policy.
POST requests use JSON. Unknown or invalid input is 400, stale revisions and unmet
milestone prerequisites are 409, missing authorization is 403. Project storage is
durable in the selected data directory, with ordered version history and optimistic
concurrency. Mutations atomically preserve prior versions. No dependencies are needed.

- `GET /api/projects` returns project documents; `GET /api/projects/:id` returns one.
- `POST /api/projects` returns 201 and a project with `id` and `revision: 1`. Input:
  `name`, `repository` (an existing Git repository), `purpose`, `audience`,
  `constraints`, `decisions`, `hypotheses`, `milestones`. The last three text-list
  fields keep operator decisions distinct from provisional hypotheses.
- Milestones have `id`, `title`, `outcome`, `dependsOn` and `status`
  (`planned`, `active`, `reviewed`). IDs are unique. Reject unknown dependencies,
  cycles, multiple active milestones and activation before dependencies are reviewed.
  `reviewed` records an operator milestone decision, never a runtime PASS.
- `POST /api/projects/:id/revisions` accepts `expectedRevision` and `changes`,
  returns the complete updated project with incremented revision and status 200.
  Changes may edit the brief/text lists/milestones, never the project identity or
  repository binding. Reject unknown fields and stale writes without partial changes.
  `GET /api/projects/:id/history` returns full snapshots in revision order.
- `POST /api/projects/:id/runs` accepts `expectedRevision`, `runId`, `milestoneId`,
  returns the updated project (200). Require an actual stored run and matching
  repository identity. Another worktree of the same Git common repository can be
  used for a reviewed code checkpoint; unrelated repositories cannot be attached.
- `POST /api/projects/:id/handoffs` accepts `expectedRevision` and a linked `runId`,
  returns an immutable derived receipt (201), stored in the project's `handoffs`.
  It contains at least `id`, `runId`, `milestoneId`, `sourceSeq`, `baseHead`,
  `contractVersion`, `runStatus` and `evidence` (actual IDs/status/kind/criterion).
  Include unfinished work, questions and clearly labeled unverified agent claims.
  Audit current run proof before capture; historical snapshots never become proof
  for another run. Do not accept client-authored verification results or PASS claims.
- `POST /api/projects/:id/continuations` accepts `expectedRevision`, `milestoneId`,
  returns a proposal (200): `projectId`, `projectRevision`, `milestoneId`,
  `repository`, `goal`, `handoff`, `sourceRunIds`, `authorizationRequired: true`.
  The goal includes that milestone's outcome. The handoff fits the existing 4,000
  character limit, distinguishes decisions/hypotheses and historical checks, names
  relevant source runs and carries useful unfinished work. Bound context deliberately;
  surface omissions rather than silently truncating or promoting claims to facts.
  Recheck revision and dependencies. Do not start a run or mutate its contract.

Use finite length/count limits and literal safe identifiers. Persist data before
reporting success. Preserve prior run APIs and old ledgers. The project layer must
not make it possible to evade protected paths, contract revisions, HEAD pinning or
launch authorization. Treat project text as context, not execution permissions.

## User experience

Provide a **Projects** navigation button, **New project**, a form with accessible
labels **Project name**, **Repository root**, **Project purpose**, **Audience** and
**Save project**. Projects and their current state must be reachable after reload,
including with no current run. Existing run views remain available.

Allow editing of decisions, hypotheses and milestones, selecting an existing
project and linking appropriate runs. The graph is a region labeled
**Project milestone graph**. Selecting a milestone opens its outcome, prerequisites,
linked sessions and available handoffs. Distinguish planning/review decisions from
actual verification. **Prepare next session** seeds the existing New Run dialog
with the repository, milestone outcome and contextual handoff; it still requires
drafting/review/authorization. It is not a second orchestrator.

Support desktop and a 390px-wide viewport without page overflow. Handle empty data,
validation errors, stale revisions, server restarts and loading without discarding
unsaved edits or implying success. Keep main interactions accessible and clearly
separate implemented behavior, operator choices and AI judgments in documentation.
