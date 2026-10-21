# Agent control-path review — 21 October 2026

Scope: review of the latest delivered code at `0cc584c`, specifically preparation,
authorization, detached execution, status/control, steering and saved-record
delivery. This is a focused engineering review, not a complete security audit.

## What already works

| Responsibility                                         | Implementation                                                                                                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Assistant operates Iterfox without the browser         | [CLI](../src/cli.ts) and [delegation commands](../src/delegations/cli.ts).                                                                                   |
| Approved roadmap, source identity and aggregate limits | [Delegation schema and service](../src/delegations/service.ts); approval hash and HEAD, dependency validation, parent lease, remaining-budget handoff.       |
| Plan, implement, check and correct                     | [Engine](../src/core/engine.ts), [state reducer](../src/core/model.ts) and [project review](../src/core/supervision.ts).                                     |
| Bound interrupted Codex calls                          | [Codex session](../src/providers/codex-session.ts), [owned processes](../src/providers/session-processes.ts) and [recovery policy](../src/core/recovery.ts). |
| Give direction without changing acceptance             | CLI `steer`, [Compass](../src/core/compass.ts) and [graph instructions](../src/ui/selected-work.tsx).                                                        |
| Return cross-mission evidence                          | [Saved-record brief](../src/delegations/brief.ts) and [HTML renderer](../src/delegations/export.ts).                                                         |

The outer assistant can prepare the job, launch it and later retrieve the result.
The worker is independent of that conversation. The inner development agent has
no authority to approve its own criteria or expand the job.

## Findings addressed in this commit

1. **The entry guide obscured the workflow.** Long experiment narratives preceded
   practical instructions. Replaced both READMEs with the operator journey;
   evidence remains accessible from a dedicated index and original reports.
2. **Agents had no obvious operating contract.** Added `AGENTS.md`, a concrete
   runbook, an Italian operator guide and a complete two-outcome configuration.
   The runbook includes a durable session receipt and uncertain-launch handling.
3. **CLI preparation was coupled to authorization/start.** Added `delegation
preflight`: validates source and configuration without opening a ledger,
   starting workers, calling models or executing checks. Optional `run --preflight`
   compares the reviewed source HEAD and normalized configuration hash before
   authorization; changed inputs require a fresh review.
4. **CLI brief exposed less than the UI.** Existing `delegation brief` is a short
   checkpoint listing (`--json` returns saved metadata). Added `delegation report`
   using the existing aggregate generator for Markdown, JSON or offline HTML.
   Existing brief/status output is preserved. Report generation does not recover
   workers, audit worktrees, rerun checks or call a model.

The preflight pin verifies consistency of trusted local inputs. It is not a signed
authorization receipt or protection against a malicious local operator who can
replace files. The final service still checks source identity when creating work.

## Remaining usability gaps

- The conversational handoff is a documented agent workflow, not an installed
  chat connector. The user still needs an assistant with local CLI access.
- A complete delegation still needs assistant-authored configuration and prepared
  checks/dependencies. The UI goal draft prepares one mission, not a full roadmap.
- CLI `run` prints human-readable launch information and has no caller-supplied
  idempotency key. The agent must persist the ID and inspect existing delegations
  after uncertain responses. Do not blindly retry a launch.
- Steering is bound to the active mission; changing future outcomes or the approved
  roadmap requires another reviewed configuration. The graph cannot edit execution
  by dragging or connecting nodes.
- CLI session receipts are agent-maintained. There is no built-in chat handover,
  automatic reboot recovery or automatic final-code integration.
- Long-trial reliability still needed assistant intervention; the new interface
  commands do not resolve or remeasure that limitation.

## Verification for this change

The focused CLI regressions exercise a real child-process CLI against temporary
Git repositories: no-work preflight, source/config drift rejection and refusal of
noninteractive unapproved launch. A completed deterministic two-outcome fixture
exercises JSON/Markdown/HTML reports, exact checkpoint references and unchanged
saved history. These are CLI/runtime checks, not new real-Codex or overnight trials.

`npm run check` passed: type checks, **111 tests passed / 7 optional tests skipped**,
and production build. Formatting, local documentation links and whitespace checks
also passed. `AGENTS.md` is included in the package manifest alongside the guides.
