# Real continuous project trial — fixed scope

Develop Iterfox's return-to-work experience through three outcome missions under
one stored delegation. This trial measures automatic continuation and verified
project progress, not direct-Codex speed or token efficiency. The host runtime is
frozen before launch; implementation targets cannot edit its delegation engine,
core engine, providers, protected checks, dependency files or acceptance policy.

## Outcome 1: an evidence-derived project brief

Create `src/delegations/brief.ts`, exporting async-compatible
`buildDelegationBrief(runs, delegationId)` and
`renderDelegationBriefMarkdown(brief)`. The brief derives actual saved delegation
and run/checkpoint history. Return at least:

- `schemaVersion: 1`, `delegationId`, `goal`, `status`, `requiresProductReview: true`;
- `completedOutcomeCount`, `pendingOutcomeCount`, original `limits`;
- `usage.turns`, `usage.tokens` summed once from actual linked missions, plus useful
  elapsed/remaining-window information without resetting the original clock;
- `outcomes`: ID/title/status/run ID, exact recorded `checkpoint` provenance and
  criterion descriptors with ID/title/status; evidence retains its source;
- `attention`: objects with `text`, including a saved blocking reason and any
  genuine unresolved linked question; no invented instructions or decisions;
- `evidenceBoundary`: readable explanation of checkpoint/historical context and
  fresh verification in future missions.

Do not count repeated checks as extra outcomes or AI claims as proof. Distinguish
stored checkpoint proof from current source freshness and operator acceptance.
The summary may read records/files but cannot run a model, launch/resume work,
run verifier commands or append run/delegation history merely to generate a report.
Do not claim live freshness you did not observe. No private reasoning is stored.

Add authenticated GET `/api/delegations/:id/brief` for JSON and
`?format=markdown` for `text/markdown`. Existing routes and host guards remain.
Export must carry original goals, limits, checkpoint SHA and source fingerprint.

## Outcome 2: a useful return view

Add a **Read project brief** button on the selected delegation and a region named
**Project morning brief**, preferably in `src/ui/delegation-brief.tsx`. Show the
actual selected goal, verified outcomes, remaining work and attention first. Let
the user open source missions; keep historical claims and review needs explicit.
Support buttons **Export project brief JSON** and **Export project brief Markdown**
that download `.json` and `.md` documents from authenticated read-only results.
Respect selection changes, pending/error states, reconnect and a 390px viewport.
Avoid raw logs as the primary experience. Preserve existing authorization recovery
and whole-delegation controls. Use only local assets and existing dependencies.

## Outcome 3: a portable project report

Create `src/delegations/export.ts`, exporting `renderDelegationReport(brief)` for
a self-contained readable HTML report. Add authenticated GET
`/api/delegations/:id/report`, `text/html`, attachment disposition. Show the goal,
outcomes, open questions/blocks, original limits, actual usage and checkpoint/
evidence provenance. Escape untrusted strings. No scripts, remote resources or
embedded active content. The report must be readable offline, on desktop/mobile,
without spending tokens or rerunning work. Expose an appropriate download action
in the project brief. Retain JSON/Markdown exports and current views.

## Acceptance and authority

The three protected cases under `tests/continuous/` are introduced before the real
mission. The API/browser fixtures use an explicit deterministic provider to create
real Git/SQLite/Node receipts. They do not measure real-model behavior. The real
product missions use Codex. Existing regression, typecheck, build and eleven
Chrome cases stay required. Later outcome checks are not prematurely assigned to
earlier missions. Each following mission repeats cumulative approved checks.

Routine reversible layout/content/implementation decisions are delegated. Do not
ask for naming, polish or permission to implement this approved scope. Add useful
missing work through existing project review. Do not change the acceptance,
thresholds, tests, host runtime, permission policy, global limits, package files or
source history. Local checkpoint commits are the host's approved responsibility;
the coding agent must not commit. No push, merge, deployment or publication.

The final milestone remains subject to product review even after all technical
checks and checkpoints pass. This is a bounded multi-mission trial, not a claim
of general unattended overnight reliability or automatic discovery of complete
acceptance from a vague instruction.
