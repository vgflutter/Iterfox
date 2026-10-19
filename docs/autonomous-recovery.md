# Bounded recovery of rejected directions

Compass can request a correction when a provider successfully returns a structured
orientation that fails semantic validation. The runtime supplies the validation
reason through the existing model `failure` field. No new operator instruction or
Resume is needed while the run is active. The boundary is fixed in
[the recovery contract](direction-retry-contract.md).

Eligible rejections are unknown criterion references, self or circular
dependencies, incomplete/duplicate active-note accounting, and attempts to remove
an unanswered operator question or its held criteria. Correction means returning
a valid proposal under the same approved contract; it does not answer the question
on the operator's behalf.

Malformed output and schema failures, provider/authentication/network/sandbox
errors, timeouts, source/handoff integrity failures and protected edits still
block. This change adds no general retry of provider calls, new permissions,
scheduler, dependency installation or acceptance-policy changes.

## Attempts and inspectable history

Every rejected orientation emits a guarded `direction.rejected` event. The reducer
checks the active planner, contract/snapshot, attempt number and actual semantic
error before recording it. Its failed planner retains the complete returned
proposal, ordered source IDs, contract version and reason in `result`; `error`
and the event message expose the reason. It is never compiled into a direction,
builder activity, acceptance result, operator note or evidence. Replay reconstructs
the rejection without another provider call.

A correction uses a separate planner activity. The first invalid proposal counts
toward the original `limits.maxAttempts`: with three attempts, at most two further
calls can correct that consecutive rejection sequence. The count comes from the
recorded rejections since the last accepted direction in the current contract.
New notes and explicit Resume do not reset it. An accepted direction closes that
sequence; later handoff reconciliation has its own bounded sequence within the
remaining session budgets. A contract revision still requires operator approval.

Each call uses normal model-turn, reported-token, turn-timeout and elapsed-session
accounting. The first applicable limit stops progress. Neither incoming
instructions nor retries restart the clock, discard usage or extend limits.
Worktree audits run before calls and after returned proposals, including invalid
ones. A rejection is retained even if the following audit detects a protected edit;
that audit blocks another attempt. Evidence freshness is checked before further
work, and integrity failures retain the existing invalidation behavior.

## Handoffs, questions and continuation

Each response is validated against a complete ordered handoff snapshot. The model
sees that exact note snapshot even if another note arrives between boundary
capture and invocation. A correction boundary captures the newly available notes;
notes arriving during a successful call remain pending for subsequent
reconciliation. Stored note text, reply links and selected-node provenance are
preserved. A selected-node reference supplies context, never extra authority.

Held operator questions and their dependent criteria remain held until a linked
reply. Independent work can continue after a valid reconciliation. A generic new
note cannot answer an existing question. When dependent work is all that remains,
the run still blocks for the operator.

Existing `direction.superseded` retirement remains guarded and replayable: only an
unstarted obsolete orientation covered by a longer validated current handoff can
be retired. It cannot retire builders or the current planner. Rejected attempts
remain failed and inspectable. Completed work and historical evidence stay in the
ledger; replacement, evidence invalidation, acceptance checks and required project
review keep their existing guards. Pause/Stop still interrupt execution, and real
operational failures still need resolution and explicit recovery. No synthetic
Resume event is emitted by semantic correction.

## Why this milestone exists

The first real project-memory mission, `20261019T191726-329482b8`, blocked at ledger
sequence 199, **2026-10-19 20:37:58 UTC**, with “Direction referenced an unapproved
criterion or self dependency.” An explicit corrective instruction at sequence 200
explained approved IDs and `waitsFor`; sequence 201 resumed the run at
**20:44:38 UTC**. That was an observed real-Codex rejection followed by explicit
recovery, not evidence of automatic correction. A later project-review snapshot
guard also blocked at sequence 236 and was explicitly resumed at sequence 237.
The completed handoff retains these events at sequence 241.

The earlier recovery attempt, `20261019T220012-163d561e`, started from `5edad6b` and
was stopped over conflicting protected test expectations. It remains STOPPED;
its stored handoff `9a433bb1-f953-46d8-8969-fb32da5c9aa0` at sequence 28 retains
pending recovery/regression work and the operator's decision. Project
`44b52c8e-4010-4778-b291-a9527e292097`, revision 11, records the reconciliation
at reviewed checkpoint `d401a60f36124206794f3fb1577d43da3ec1e48d`: the Compass
explicit-resume case uses a genuine provider timeout, while returned semantic
errors belong to the new correction cases. The superseded-planner and invalid
retirement assertions remain. This implementation changes no protected test and
contains no fixture-specific exception.

Earlier project-memory and selected-work delivery records remain in
[project workspace history](project-workspace.md#historical-first-milestone-validation-and-remaining-limits)
and [graph controls](graph-controls.md#observation-status-for-this-change).
Their operator reviews and receipts are historical provenance, not proof for this
new worktree. The frozen pre-retry fixture preserves all **40** canonical ledger
prefix projections, including the old semantic rejection, explicit Resume and
superseded-orientation event. New rejection events add behavior without changing
the interpretation of those historical events.

## Observations for this delivery

The product-development mission `20261019T221229-b2caf237` uses **real Codex**. Its
ledger includes a contextual priority instruction at sequence 23 on the actual
model-planned recovery activity. This is distinct from the protected tests: their
provider faults are explicit **deterministic fixtures**, with real runtime state,
audits and Node command checks. They establish boundaries and replay compatibility,
not model reliability.

The live ledger was inspected read-only. Its baseline host receipts, before this
implementation, all reference fingerprint
`186834b3503028736a9aec247be6d82609bb85e58fffad92ea7d24d0106074a8`:

| Criterion  | Baseline receipt / UTC on 2026-10-19              | Observation before the patch                             |
| ---------- | ------------------------------------------------- | -------------------------------------------------------- |
| recovery   | `a4df4a8c-23ea-4135-96ed-0dc6a52034c8` / 22:14:08 | 3 passed, 4 failed; negative probe retained as recorded. |
| regression | `462eaea8-6b69-4e46-a2a6-e00c9560c137` / 22:14:21 | 69 passed, 4 failed, 7 optional skips; negative probe.   |
| types      | `9b43d526-c1bf-4f1d-8c39-60c7211db7e6` / 22:14:22 | Server/UI TypeScript passed.                             |
| build      | `b9f857ec-6ae1-4d72-80e4-24f9aeb1cd6f` / 22:14:23 | Production build passed; existing large-chunk advisory.  |
| interface  | `c8c5e877-3e7e-4d79-80f0-420170b5ef53` / 22:14:39 | Nine Chrome cases passed.                                |

After implementation, the builder locally ran the seven protected recovery cases
and eight Compass cases together: **15 passed**, including all 40 legacy prefixes
and the genuine timeout/resume case. `npm run typecheck` also passed. Additional
temporary deterministic probes observed attempt exhaustion across changing
handoffs and explicit Resume, token exhaustion, malformed-output blocking, and
correction of criterion, cycle and note-accounting errors. These local observations
are not runtime acceptance receipts.

After the final budget-boundary refinement, all seven recovery cases and typecheck
passed again. A temporary held-question probe initially assumed the stock dialogue
check was independent of label normalization and failed that assumption. Holding
dialogue instead confirmed correction of unsupported question handling, independent
label work, linked-reply recovery and rejection-event guards without changing any
check. Replay and the complete handoff matched the resulting state.

The runtime subsequently recorded passing **host acceptance receipts** for all
five unchanged contract-v1 criteria in mission `20261019T221229-b2caf237`. These
are separate from the builder-local reports above. All five name the same
post-implementation snapshot, before this documentation update: base HEAD
`d401a60f36124206794f3fb1577d43da3ec1e48d`, whole-tree fingerprint
`ccde5f1b4a4dde632f47254deef7f35a63f74c738eeca11cef97501f3896965d`.

| Criterion  | Host receipt / UTC on 2026-10-19               | Observation on the tested snapshot                       |
| ---------- | ---------------------------------------------- | -------------------------------------------------------- |
| recovery   | `b101a021-6027-44be-af4a-431d12440c0f` / 22:22:34 | 7/7 protected cases passed; no failures or skips.         |
| regression | `cdc0c5f9-4a2f-4e2a-ad58-ecff16ebc07d` / 22:22:47 | 73 passed, 7 optional skips, no failures.                 |
| types      | `47db8aca-9ad7-45ed-9aad-d9911c3df771` / 22:22:48 | Server and UI TypeScript checks passed.                   |
| build      | `b1fc8740-317e-42fc-8e6c-9057c03400e9` / 22:22:48 | Production server/UI build passed; advisory retained.    |
| interface  | `7769ce13-a0e2-43b3-b976-577254e66d6c` / 22:23:04 | All 9 automated Chrome cases passed.                     |

The build exited successfully with the existing Vite advisory about chunks larger
than **500 kB after minification**: the JavaScript chunk was **668.44 kB**
(**201.07 kB** gzip). No build threshold or acceptance policy was changed.

The full regression suite, production build and Chrome suite were not rerun in
the builder sandbox. The host Chrome receipt covers automated fixture cases;
no additional browser walkthrough or real-model automatic correction is claimed.
These receipts retain their tested-snapshot provenance. This documentation update
changes the whole-tree evidence stamp; subsequent freshness checks and required
project review remain with the unchanged runtime acceptance process.

## Optional real SDK probe and limits

After reviewed delivery, the existing opt-in graph integration can be enabled
with `ITERFOX_REAL_GRAPH=1` and `ITERFOX_INJECT_DIRECTION_FAULT=1`. It starts with
an explicitly seeded task, submits a contextual instruction through Chrome and
uses one explicit Resume to launch the paused fixture. After the first successful
real SDK orientation response, the harness injects one invalid criterion reference.
The same real SDK must correct it, finish implementation/checks/project review,
preserve structural contract equality and require no additional operator message.
The report records fault injection and orientation-call counts. The initial task
is a fixture; the injected error is not a spontaneous model mistake. The real
product mission's model-planned activity is separate from this seeded integration.

This optional probe was not run in this builder session; no new SDK correction
report is available here. Neither deterministic cases nor a bounded integration
would establish general unattended recovery, resilience to every provider failure,
an overnight soak, or an advantage over direct Codex. Model planning and project
review remain probabilistic judgments of the same integration. Inspect current
runtime evidence and unresolved decisions before integrating any result.
