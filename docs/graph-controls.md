# Selected-work direction

## Giving an instruction

Select an activity or acceptance node in **Live Trail**. The inspector's **Steer
selected work** region shows the selected title, criterion and contract version
before the form. **Selection reference** discloses the run, criterion and optional
activity ID. Existing details, evidence, filters, grouping and next-activity links
remain available below or alongside the composer.

Choose **Request** for work or priority, **Decision** for an operator choice, or
**Hypothesis** for an idea still requiring evidence. Enter an **Instruction for
selected work**, then **Send instruction**. **Draft a priority request** prepares
editable request text and focuses the editor; it neither sends the note nor
guarantees scheduling. The existing reconciliation decides subsequent work within
approved dependencies and limits.

The form displays sending, saved, rejected or unconfirmed state. A confirmed save
records a Compass instruction, not completed work or runtime acceptance. **Review
Compass history** opens the matching note when its receipt is known, or the
history otherwise. History displays the recorded criterion, node and version;
older versions are labeled historical. JSON Morning Brief export retains `context`
through its existing note projection; Markdown includes the same reference.

## Inspecting recorded instructions

Below the direction controls, **Recorded instructions** lists saved notes relevant
to the selection, including after a reload. An activity shows its own notes and
criterion-wide notes; an acceptance criterion shows all contextual notes for that
criterion. Notes from older contract versions remain visible with a historical
label. **Review instruction in Compass** opens and focuses that particular note in
the handoff history, without sending a new instruction or changing its handling.

Both surfaces show the note text, type, recorded criterion ID and original title,
optional activity ID/title, and recorded contract version. Criterion titles come
from the stored contract at that version, including after a rename or removal;
a missing historical title is explicitly unavailable rather than replaced by a
current title. **Recorded instruction reference** discloses the note ID, timestamp,
linked reply ID when present, and reconciliation node when available.

The disposition belongs to the direction in the inspected snapshot. **In the
plan**, **Later** and **Your decision** show planning handling and its reason, with
the direction revision and contract version. An older direction is explicitly a
historical plan, not current reconciliation. A recorded note can reference an old
contract while being considered by a newer plan; those two versions are displayed
separately. A linked reply is labeled **Answered**. Earlier direction snapshots
remain accessible through existing Decision replay; this list does not reconstruct
every past disposition.

Morning Brief JSON preserves the note's original `context` unchanged and adds
resolved `reference` and `reconciliation` metadata, plus `directionHistorical`.
Markdown includes note IDs, timestamps, original reference titles/IDs/versions and
the planning disposition with its reconciliation reference. Compass and Morning
Brief label a previous contract's focus and artifact as historical until current
reconciliation. A saved instruction, a reconciled plan and runtime acceptance
remain distinct; only runtime evidence establishes the acceptance result.

## Resolving the selected target during reconciliation

The existing Codex prompt receives active Compass notes with a server-derived
`target` alongside their unchanged `context`. This closes the ambiguity of a note
such as “Prioritize this result” when several activities share a criterion. The
target resolves the exact activity ID and criterion together, including verification
and decision activities, rather than relying on the prompt's task-only progress
summary. It supplies the activity's title, kind and objective, and the criterion's
title from the recorded contract version. Criterion-only instructions retain a
criterion target without an activity.

This metadata is bounded (500 characters per title, 4,000 for the objective),
marked `referenceOnly`, and labeled historical when its contract version differs
from the current one. Missing references have explicit `resolved: false` flags;
they are not silently matched to another activity or a newer criterion title.
The original note text, IDs and context remain intact. Notes without context keep
their original shape, and linked replies still supersede the answered note.

The enrichment reaches both orientation and subsequent activities through the
unchanged provider prompt. It is derived for model input, never appended to the
operator's stored note or used to grant authority. Display/export provenance
remains separate. Source inspection establishes this mapping in code; the earlier
focused prompt diagnostic is narrower implementation evidence, not a model trial.
The real Codex probe below predates this correction and does not establish its
behavior with multiple ambiguous activities.

## Persistence and authority

The existing token- and same-origin-protected `POST /api/runs/:id/direction`
accepts the ordinary note fields and optional strict context:

```json
{
  "text": "Review the empty-name result before visual refinements.",
  "kind": "request",
  "context": {
    "criterionId": "render",
    "contractVersion": 1,
    "nodeId": "an-existing-activity-in-this-run"
  }
}
```

An acceptance selection omits `nodeId`; its virtual graph ID is never submitted
as an execution node. The shared note schema rejects unknown fields, including
declared statuses or permissions. Before appending, the service requires the
exact current contract version, a currently approved criterion and, when supplied,
a node in that run belonging to the criterion. Rejected input returns 400 with
no note event. The append uses the validated ledger sequence and the existing
transaction. Initial handoff references are validated before workspace creation.
Notes without context retain their previous behavior and limits: 64 notes and
64,000 total text characters, with 3–4,000 characters per note.

The direction route performs only this append, without the read-side recovery or
evidence audit. It starts no worker, changes no contract, criteria, tasks or proof,
and supplies no implicit linked answer to an open question. Compass uses the
existing activity-boundary reconciliation; a disposition such as **In the plan**
describes handling, not implementation. Explicit **Resume** is still necessary
on inactive runs, within original limits and after resolving blocking reasons.
Completed/failed runs retain the terminal guard and explain the need for an
explicitly authorized follow-up session. Replay is read-only.

Saving does not interrupt an in-flight Codex activity; use the run's **Pause**
control when that is necessary. To answer a parked question, use Compass's
**Answer this question** so the reply is explicitly linked. Requests and decisions
cannot authorize protected edits or change acceptance. Amend approved goals,
checks, paths or limits through the existing explicitly reviewed, versioned
contract flow after pausing and waiting for worker exit. Engine protections remain;
legitimate protected test/configuration changes need an operator-prepared reviewed
checkpoint and a new run. Graph selection adds no edge editing, branch deletion
or click-to-PASS control.

## Drafts and input

Unsent Live Trail drafts live in workspace page memory, separately keyed by run,
contract version and selection. Text and type survive selection/view/run changes,
closing the inspector and rejected submissions while the page stays open. They
are not durable across page reloads. A changed contract version gets a separate
draft; old text is never silently retargeted to the new version.

Each submission captures its destination and contents. Its form is locked while
pending; other selections retain independent drafts. A late response updates only
the captured draft and only while that exact submission still owns it. Text remains
read-only and copyable while sending or unconfirmed; type and send/priority controls
are disabled. Confirmed saves retain the text and prevent accidental repeat
submission until edited. Network errors, a 20-second timeout, server errors or a
missing matching receipt are treated as uncertain, never invented success. Check
Compass history before choosing **I checked history; allow manual retry**. There
is no automatic retry or idempotency key; a manual resend can duplicate a note.
Allowing a manual retry unlocks the same draft and focuses its editor; it does not
send it. The appended receipt must match the captured instruction before showing
saved state; an older matching note in a stale response cannot confirm a send.

If a run ends while a draft or submission exists, its kept text and type remain
available in a read-only field for copying, alongside the actual saved/rejected/
unconfirmed outcome. This does not send anything to another session. There is no
retry or send control on terminal runs. Replay hides the live composer and its
draft; returning to Live restores the independently kept page state. Inactive
runs still require the run's explicit **Resume** control; sending a note never
invokes it.

Graph nodes have descriptive accessible names, button semantics, expanded state
and a visible keyboard focus ring. Tab to a node and use Enter or Space to open
the inspector; selection focuses its direction heading. Escape in the inspector
or **Close details** closes it and returns focus to the selected graph node, or
the graph when that node is hidden by a filter. A native type selector keeps its
own Escape behavior. Escape on a graph node closes the inspector there. On selection
the region is brought into view, including when it follows the graph on narrow
layouts. Form controls have visible keyboard focus, wrapping text and 44px action
targets, including the inspector close button. The mobile editor and type selector
use 16px text. The inspector uses ordinary page scrolling so its form and existing
details can remain accessible at 390px. The selected title/context precede the form;
existing details, proof, filters and graph navigation remain in place. The host
observations below distinguish visible layout from unexercised input paths.

## Observation status for this change

### Source and historical handoff

The starting code is the actual clean checkpoint `b79aefe`
(`b79aefeb8317e3cda495ae35ed6d47f90df48aeb`), including the first milestone
implementation at `c0be7c5` and its subsequent fixes. Project
`44b52c8e-4010-4778-b291-a9527e292097`, revision 4, and stored handoff
`78d387ed-2f37-4788-8e66-31a7f1085558` were inspected read-only. The roadmap
marks `memory` reviewed by the operator and `graph` active; those are planning
states. The handoff was captured at **2026-10-19 21:00:54.802 UTC**, project
revision 3, from run `20261019T191726-329482b8`, ledger sequence 241, contract v1,
provider Codex, status COMPLETED, base HEAD
`69d70e5753ff73c38d943bd8954f361aeee3d145`. Its questions and unfinished-work
lists are empty.

The handoff retains these passed deterministic **probe** descriptors, all contract
v1 with historical source fingerprint
`4d260c1eb32120a2b2c430c264b63fc471aeb799625a455451de74aa8e6251e3`:

| Criterion    | Historical receipt ID                  | UTC on 2026-10-19 |
| ------------ | -------------------------------------- | ----------------- |
| `continuity` | `f16d326d-acda-411a-b7a6-b6bb2ea99c50` | 20:52:02.981      |
| `regression` | `d13e5c6a-103d-42b4-9b7c-13114c73cc4e` | 20:52:19.119      |
| `types`      | `bddbb0df-aabc-495e-8955-a80cb820bb7a` | 20:52:21.495      |
| `build`      | `cc51eda5-212d-4a86-9e28-42ff7c9c2fdc` | 20:52:23.781      |
| `interface`  | `edf7f39f-fe66-4c2a-810c-527d5590f03a` | 20:52:43.104      |

These descriptors supply historical context, not proof for this session. Earlier
first-milestone receipt IDs, timestamps, source stamps, UI bundle versions,
walkthroughs and their limits remain in
[the project workspace history](project-workspace.md#historical-first-milestone-validation-and-remaining-limits).

### Recorded host checks

The current run is `20261019T210114-4d752b17`, contract v1. After the target-mapping
correction, its latest seven plain-command receipts through ledger sequence **173**
were the following deterministic, exit-zero **probes**, recorded on **2026-10-19
UTC**. Their outputs and stamps were read from the mission's `data/ledger.sqlite`
in read-only mode; no full test or browser suite was rerun in this documentation
task.

| Criterion    | Host receipt ID                        | UTC / sequence     | Recorded observation                                                                                     |
| ------------ | -------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| `continuity` | `b4572ed7-2e07-4533-92ec-f280c924fe94` | 21:44:55.225 / 167 | Four fixed project API/restart cases passed.                                                             |
| `graph`      | `24b4abef-0b43-4cad-aa66-094e73df54e3` | 21:44:34.537 / 160 | Three fixed context, compatibility and atomic-rejection cases passed.                                    |
| `regression` | `6cbbba96-d424-4b13-808d-a4077a45abd3` | 21:44:49.508 / 162 | 66 passed, 7 optional cases skipped, no failures.                                                        |
| `types`      | `913402e7-0e14-40e1-bc16-1fdf235064ee` | 21:44:51.050 / 164 | Server and UI TypeScript compilation exited zero.                                                        |
| `build`      | `698451d7-edf9-4dd6-aa44-632035c606ab` | 21:44:57.299 / 169 | Production build emitted `index-vOsGjFk7.js` and `index-aWDoHxBs.css`; the large-chunk advisory remains. |
| `interface`  | `4d4b005c-8a54-4483-8798-9a60e7ee6d41` | 21:45:14.436 / 171 | All nine Chrome browser cases passed.                                                                    |
| `capture`    | `66a0320f-8473-4939-b0f1-3fc3de24ef93` | 21:45:17.404 / 173 | Six approved fixture captures; no page errors or worker launches.                                        |

All seven share a 157-file stamp at the starting HEAD above, fingerprint
`2c16ce277545afb7eab8ef722d58778822a8fa81f5ebbcd9e710087954845040`.
The recorded file set, contents and executable modes matched the worktree before
this documentation edit. Editing these guides changes that whole-tree stamp:
these observations do not certify the resulting tree or complete all eight
criteria. Runtime checks and project review own subsequent acceptance.

The earlier selected-work probes at sequences 90–102 (21:28–21:29 UTC,
fingerprint `9365157a3879c2e93eabdd561cd0f68b4a011500da9d78ce8f56ac7e103f358a`)
and 118–130 (21:34–21:35 UTC, fingerprint
`9fdd3409e7687dd3e94f5b09ce2cec7657da48b026375603f12bfdf23b2b5335`)
are superseded observations. Neither set covers the later Compass correction.
The assessment and real integration below also precede that correction; their
recorded outcomes remain available without transferring proof to a newer tree.

The fixed graph browser case saved both an activity instruction and a criterion-only
instruction, checked their exact contexts and retained PAUSED status/contract,
then checked no page-width overflow at 390×844. The three graph API cases also
checked unchanged criteria, nodes and evidence, zero launches, replay equality,
legacy notes and atomic rejection of false/mismatched/stale/authority-bearing
references. This is deterministic fixture coverage, not observed model behavior.

### Six observed Chrome captures

All six PNGs below were opened for this reconciliation from the sequence-173
capture. The approved renderer
`tests/graph-capture.mjs` ran after the recorded production build in Chrome
**155.0.8059.85**, **darwin**, with **1440×1080** and **390×844** viewports. It
reported no page errors or worker launches, asserted no selected-work page-width
overflow and retained PAUSED status. It calls no model. The initial captures
precede form filling and the renderer's later interaction scrolling; the UI itself
brings the selected region into view.

These are actual browser images of explicitly labeled deterministic fixtures.
They do not depict an autonomously implemented result or a verified milestone.
The links refer to ignored host artifacts under `dist/qualification/`; a fresh
checkout needs the approved build/capture to create them. The renderer replaces
them on later runs, so use the corresponding receipt and source stamp when
interpreting a later image set. The qualitative receipt below archives the earlier
sequence-130 capture set: its two initial views and saved desktop image are
byte-identical to the current files; the mobile detail and both project overview
images differ. Its scores apply to those archived inputs, not a new assessment of
the regenerated files.

#### Initial selection, desktop and mobile

![Initial selected-work viewport in Chrome at 1440×1080, before form filling](../dist/qualification/selected-initial-desktop.png)

![Initial selected-work viewport in Chrome at 390×844, before form filling](../dist/qualification/selected-initial-mobile.png)

Both initial viewports visibly show **Steer selected work**, the fixture result's
title, criterion/contract version, instruction type, editor, **Send instruction**,
priority shortcut and Compass-history action. The wording separates saving context
from implementation/acceptance and explains explicit Resume. The mobile viewport
reaches the **Recorded instructions · 1** heading; its record is below the fold.
The orange outline shows the selected heading's focus styling, not a completed
keyboard-navigation trial.

#### Detailed steering, saved desktop and draft mobile

![Desktop selected-work region after a confirmed Compass save](../dist/qualification/selected-work-desktop.png)

![Mobile selected-work region with an unsent draft and the fixture's earlier recorded instruction](../dist/qualification/selected-work-mobile.png)

The desktop region shows the confirmed **Saved to Compass. Awaiting
reconciliation** message while the run remains paused. The mobile region shows
an editable draft and one recorded instruction with its original criterion,
activity ID, contract v1 and **Awaiting reconciliation** disposition. The renderer
reuses the fixture: that record comes from the desktop send; the mobile draft
has not been sent. These are region captures, not initial viewport captures;
the tall mobile image includes content reached through ordinary scrolling.
Visible essential text and controls appear legible without overlap in these
images. They do not show every expanded disclosure or an actual reconciled plan.

#### Project overview, desktop and mobile

![Projects overview in Chrome at 1440×1080 with the fixture's active milestone](../dist/qualification/project-overview-desktop.png)

![Projects overview in Chrome at 390×844 with the fixture's active milestone and preparation action](../dist/qualification/project-overview-mobile.png)

Both show the fixture project title, revision 2, active **Steer the selected
result** milestone, outcome, **Open linked session** and **Prepare next session**.
The desktop also shows **Operator reviewed** on the prerequisite and explains
that graph states are planning states. The mobile graph lies below this viewport;
its geometry cannot be judged from this image. Both show one linked session and
zero handoffs: neither establishes a captured handoff or completed project.

### Qualitative gate and bounded real Codex integration

The approved `usability` gate completed before the target-mapping correction.
The command receipt `98054ef8-121d-4474-92cc-9837514af75e` at sequence **133**,
**21:38:05.691 UTC**, records exit zero and one passing real-Codex integration
case (no skips). Observed-input receipt `8bff9786-0d97-42e6-8d29-0a1ff851b9f4`
at sequence **134** archives its output and all six PNGs. Qualitative receipt
`a52978da-2c80-4571-84c9-bcbbd3aece96` at sequence **138** records
`outcome: sufficient`, **ASSESSED**, with these official scores:

| Dimension  | Score | Assessor's visible basis                                                                                                                                           |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Context    | 5/5   | Selected result, criterion and contract version are named; Projects names the active milestone.                                                                    |
| Action     | 5/5   | Initial desktop and mobile views expose the instruction field and actions; saving starts no worker.                                                                |
| Layout     | 5/5   | Essential titles, controls and text are legible at both sizes without visible overlap or clipping.                                                                 |
| Provenance | 5/5   | Wording separates recorded instructions, reconciliation, planning and runtime acceptance; fixture labels and empty evidence avoid a verified-implementation claim. |

All four exceed the fixed **4/5** threshold; no dimension was marked insufficient.
This is a **probabilistic, same-integration assessment**, with `reviewer: codex`
and `independent: false`, distinct from deterministic **PASS**. The assessor's
limitations explicitly exclude unseen interactions, a complete project outcome
and general autonomous development quality. These scores do not resolve the
target-mapping gap later found by project review.

These three receipts share a 163-file stamp at the starting HEAD, fingerprint
`0f201139dc76951b9d1ce5ec2e7c3a286d524a50ea803d1ce9907558341403d5`,
including the six image inputs. The assessment became stale after the Compass
edit. The newer deterministic probes above do not rerun the model integration or
renew its assessment. The archived image/assessment hashes were checked read-only;
the loose files in `dist/qualification/` are replaceable host outputs.

The integration report at
[`dist/qualification/real-graph-integration.json`](../dist/qualification/real-graph-integration.json),
written **21:38:05.506 UTC**, records:

| Field                             | Observed value                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Model                             | `gpt-6.1-sol`                                                                     |
| Duration after explicit Resume    | **174130 ms**, about 2 min 54 s; enclosing command: 175240 ms                     |
| Provider activities               | `orient`, three `build` calls, `oversee`                                          |
| Final state                       | `COMPLETED`; all three fixture criteria `PASSED`: `render`, `dialogue`, `unicode` |
| Selected context                  | Criterion `unicode`, contract v1, activity `3b2cbd6f-9362-41fe-a034-489e7ce86dfd` |
| Feedback handling                 | `applied`                                                                         |
| Messages                          | **1** graph instruction, **0** additional operator messages                       |
| Contract serialization comparison | **`contractPreserved: false`**                                                    |

The recorded handling reason is: “Unicode extraction is the first implementation
unit; dialogue remains separate. All approved checks and protected files remain
unchanged.” This is the model's planning explanation. The passing protected test
separately asserted three passed criteria, only `avatar.mjs` changes, retention of
the original activity in history and no page errors. Before explicit Resume it
also asserted PAUSED status, structural contract equality and zero worker launch.

The browser submitted one contextual note to an explicitly supplied initial task;
real Codex then reconciled it, implemented complete Unicode initials and independent
dialogue behavior, ran checks and performed project review. The initial task is a
fixture, not an AI-generated plan. The run limits were **15 minutes, 24 turns,
10,000,000 reported tokens, 3 attempts, 6 reviews**, with a 420-second turn timeout
and no-progress limit of 3. The test timeout is 930 seconds; the approved gate
timeout is 20 minutes. No model call was made again by this documentation task.

#### Contract comparison limitation

The report's `contractPreserved` field compares
`JSON.stringify(final.contract) === JSON.stringify(contract)`; the protected test
does not assert that field. It is sensitive to property insertion order. A
read-only reconstruction of the same fixture input, followed only by
`contractSchema.parse(input)`, reproduced **string equality false** and
**`isDeepStrictEqual` true**. The input appends `supervision` after `limits`, while
the schema emits `supervision` before `limits`; their limit-property orders also
differ. Schema normalization alone can therefore produce this flag without a
structural contract change.

That reproduction explains a limitation of the measurement. It does **not**
establish structural equality of the probe's final contract: that final comparison
was not asserted or retained in the report, and was not independently observed
here. The reported false remains disclosed; no final structural-equality claim or
replacement true is inferred from the passing command, the handling reason or
the reproduction. The protected probe and its policy remain unchanged.

### Interaction coverage limits

Full keyboard focus movement/restoration, touch/device use, all asynchronous
draft/error races, terminal/replay interactions and historical-title exports are
not established by these six images or the fixed graph browser case. Earlier
local typechecks and synthetic logic/static-markup diagnostics supply narrower
implementation evidence; they are not browser observation or host acceptance.
The real probe adds one desktop submission and explicit Resume, not coverage of
every asynchronous race or the corrected ambiguous-target case. The correction
and these guide updates resolve the concrete review findings; fresh acceptance
for the edited tree belongs to runtime checks and project review. Neither fixtures
nor the successful bounded integration establish overnight reliability, general
usefulness or reduced operator effort. Only the four guides were edited in this
task; protected checks, fixtures, renderer, policies and thresholds are unchanged.
