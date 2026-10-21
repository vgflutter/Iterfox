# Persistent project memory

The current implementation provides authenticated project memory, milestone
revisions, stored-run links, audited handoff receipts and continuation proposals.
It stores the project name, purpose, audience, constraints, operator
decisions, provisional hypotheses and a dependency-aware milestone roadmap. Decisions
and hypotheses remain separate lists. Project text supplies context and grants no
execution permissions.

The Projects UI supports brief and roadmap editing, revision inspection, linking
existing sessions, capturing and inspecting actual derived handoffs, and preparing
an editable New Run goal. Current source includes the complete path through these
controls. The supplied host Chrome walkthrough observed creation, dependent
milestones, actual run linking and handoff inspection, preparation/restoration,
stale-edit reconciliation and a genuine server/store restart. Its older UI bundle,
the historical receipts for the first milestone's five fixed commands and the
separate audits are distinguished below. This is bounded observation, with explicit
remaining geometry, error and input-method limits; it does not certify every
workflow variant or a future session.

## Selected work in current sessions

In **Live Trail**, select an activity or acceptance node and use **Steer selected
work → Send instruction**. Its contextual Compass note records the selected
criterion, exact contract version and optional activity. **Recorded instructions**
and Compass history expose the original reference separately from the disposition
and version of its reconciled plan. Historical criterion titles resolve from their
original contract after rename/removal; Morning Brief JSON/Markdown retain that
provenance. Saving supplies context without execution or acceptance authority.
Projects, milestone review and prepared New Run authorization keep their existing
boundary: preparing a session still requires draft review and explicit launch.

Existing reconciliation now receives the exact selected activity's ID, title, kind
and objective alongside the recorded criterion title/version, including verification
and decision activities. This bounded, reference-only metadata resolves a selected
result among several activities under one criterion. Historical versions and
unresolved references are explicit; the stored note is unchanged. It is context
for planning, with no execution or acceptance authority.

Live Trail drafts remain page-local, separated by run, version and selection;
reload discards unsent text. Selection/view changes and rejected submissions keep
text and type. Pending or unconfirmed submissions keep copyable read-only text,
with replies bound to the captured submission. Inspect history before manually
unlocking an uncertain send; there is no automatic retry. Terminal runs retain
text for copying into a reviewed follow-up, replay stays read-only, and inactive
runs require explicit **Resume**. Keyboard selection/focus restoration and narrow
layout controls are implemented; the observation limits below still apply.

The [selected-work guide](graph-controls.md#observation-status-for-this-change)
contains the six approved Chrome captures and seven passing host probes after the
mapping correction, from **2026-10-19 21:44–21:45 UTC**, including all nine browser
cases. The captures show selected context and direction controls on desktop and
at 390px, plus the project overview. They are explicitly labeled fixtures.

The earlier qualitative receipt records **context 5/5, action 5/5, layout 5/5 and
provenance 5/5**, a probabilistic **ASSESSED** result from the same Codex
integration (`independent: false`). Its bounded real-Codex probe used
**`gpt-6.1-sol`**, took **174130 ms** after explicit Resume and reached
**COMPLETED**, with **three verified fixture criteria** (`render`, `dialogue`,
`unicode`), **one applied graph instruction** and **zero additional operator
messages**. Its reason prioritized Unicode extraction, kept dialogue separate and
said the approved checks/protected files remained unchanged. The report also
records **`contractPreserved: false`**. Its order-sensitive JSON-string comparison
can be false after schema normalization alone while the structures remain equal;
this was reproduced read-only. No final structural equality of that probe's
contract was independently observed or claimed.

Those assessment/integration receipts precede the mapping correction and are
superseded for current-tree proof; they do not assess the regenerated capture set.
The guide retains receipt IDs, stamps, the full handling reason and probe limits.
Full keyboard, asynchronous-error and terminal/replay workflows remain unobserved
in Chrome. These documentation edits change the source stamp; runtime checks and
project review own acceptance of the edited tree.
The first-milestone history below retains its original IDs, versions, older bundle
observations and limits; none transfers PASS to the current eight criteria. The
stored milestone-boundary handoff and its later historical probe IDs are also
recorded in [the selected-work source history](graph-controls.md#source-and-historical-handoff).

## Projects workspace

Open **Projects** in the workspace navigation. It works independently of a current
run, including while run reads are loading or unavailable. **Browse runs** and the
existing run views remain available; opening a run from Projects returns to Live
Trail. Projects are loaded from the runtime's selected data directory, not from
browser storage. The browser remembers only the selected project ID across reloads.

1. Choose **New project**. Fill **Project name**, **Repository root**, **Project
   purpose** and **Audience**, then **Save project**. The repository must exist on
   the runtime host. The three separate lists and roadmap can initially be empty.
2. Reopen a project from **Saved projects**. The picker collapses after selection;
   its button retains the selected project's name and reopens the list. The opening
   summary shows the revision, active/selected milestone, a short outcome, **Open
   linked session** when available and **Prepare next session**. **Inspect sessions
   and handoffs** moves keyboard focus to the full inspector. Open **Project brief
   and editing** for the complete purpose, audience, constraints, explicit operator
   decisions and provisional hypotheses. **Edit project** edits these fields; the
   repository binding remains read-only.
3. Use **Edit milestones** or the milestone section of the editor to add an ID,
   title, outcome, planning status and prerequisite checkboxes. Add or revise several
   milestones in one save, including reviewing a prerequisite and activating its
   dependent. A milestone used as a prerequisite cannot be removed in the editor
   until its dependent links are removed. Saved IDs stay stable in this UI.
4. The **Project milestone graph** follows the opening summary, without requiring
   scrolling through the complete brief. Milestones are arranged by dependency
   depth with downward arrow connections from prerequisite to dependent. Independent
   milestones share a stage. **Dependency links in text** provides the same links
   as named buttons. The active milestone is initially selected. Selection updates
   the opening summary and full inspector, including outcome, prerequisite status,
   linked sessions and available handoffs. **Return to active milestone** restores
   focus to current work after inspecting another milestone. **Reviewed by operator**
   is a planning choice; it does not create or change runtime evidence. Existing
   linked runs open through the normal run views.
5. **Inspect revision history**, under **Project brief and editing**, reads the latest saved project and ordered full
   snapshots. Expand a revision to inspect its brief, roadmap and complete stored
   provenance. This reads saved state without discarding an open draft.
6. In the milestone inspector, **Refresh runs**, select an **Existing run** and
   inspect its goal, provider, repository, worktree and base HEAD. **Inspect selected
   run** opens the normal run view without starting work. **Link run to milestone**
   saves its original binding and increments the project revision. Runs with matching
   repository/worktree paths appear first, but path equality is only a convenience:
   the server checks canonical Git common-repository identity. Other worktrees stay
   selectable; unrelated repositories are rejected. Already-linked runs are excluded
   because a run retains one immutable milestone binding per project.
7. **Capture handoff** on a linked session audits stored evidence and saves a
   derived snapshot. A live worker must first be paused in its run view; capture
   reports the server's busy/conflict errors. **Capture updated handoff** adds a
   further immutable snapshot. It never replaces an old receipt or executes checks.
   The latest capture opens under **Available handoffs**. Inspect its HEAD, ledger
   sequence, contract, repository identity, source goal and original milestone;
   expand unfinished work, questions, historical evidence, criterion state and
   unverified agent claims. Evidence descriptors show actual IDs, kinds, statuses,
   criteria, observed HEADs/fingerprints and invalidation reasons. Source-run buttons
   provide the original logs, artifacts and current evidence. The last retrieved run
   state is labeled as such; later ledger records produce a stale-handoff notice.
8. Select a saved milestone and choose **Prepare next session**. The server checks
   revision, repository and prerequisites before the existing **Night Run preflight**
   dialog opens in goal mode. Repository, desired result and handoff are editable.
   Its notice names the source revision and milestone, with expandable run and
   receipt IDs and omissions. Changes to the prepared fields are visibly identified
   as edits of the original proposal. Drafting, review and explicit authorization
   remain separate actions. Preparation itself creates no run or verification.

If an edit removes a milestone that already has sessions, **Sessions from removed
milestones** retains access to its original linked outcomes, source runs and stored
handoffs. Full snapshots remain available in revision history. Removing or renaming
roadmap text does not rewrite link or receipt provenance.

Drafts are retained separately for each project and the new-project form while
this page stays open, including when switching back to run views. **Discard edits**
explicitly removes a draft. Unsaved drafts are not durable across a browser reload
or page close; save useful memory to the runtime before leaving.

If preparation opens while earlier New Run inputs exist, those inputs remain under
**Previous New Run inputs kept** and can be restored. An uncertain or already-created
launch retains its existing recovery flow and prevents replacing its context.
These retained New Run inputs also live only in page memory.
Preparation is disabled while an uncertain or already-created launch still needs
recovery. The existing recovery controls remain reachable; no old draft, preflight
receipt or acceptance result is carried into the newly prepared dialog. A late
preparation response cannot replace an already-open New Run dialog. If you leave
Projects before the proposal returns, it opens no dialog; return and prepare again.

The compact opening summary, dependency-stage layout, path-first run ordering and
expandable receipt layout are provisional interface choices. They do not judge repository suitability, resolve questions or promote
agent claims to operator decisions. Those boundaries remain in the service and
existing reviewed run flow.

### Stale and uncertain saves

A failed save retains entered text and displays server validation details. A stale
revision is never retried with a newer revision automatically. Use **Read latest
saved state and history**, inspect **Compare changed fields**, and choose saved
values for fields you want to restore. The comparison identifies fields changed
in both versions. After explicitly confirming the comparison, **Keep edited fields
on revision N** retains your edited fields and uses the latest values for fields
you did not edit. That confirmation applies only to the inspected revision; a later
revision requires another comparison. If the document and history reads straddle a
write, inspect again until history includes the current revision. Review the
reconciled draft, then save explicitly. Lists and the roadmap are compared as whole
fields; there is no per-entry automatic merge.

A timeout, unreadable response or server error can leave a save uncertain. Saving
is disabled until a fresh read and explicit acknowledgment that saved state was
inspected. For a new project, inspect **Saved projects** before enabling a retry to
avoid duplicate creation. For existing projects, inspect the latest revision and
history. **Reconnect to runtime** refreshes an expired server token without reloading
the page or discarding drafts; it never retries a write. Read errors preserve the
last retrieved state and identify it as such. Late responses from an old project
selection cannot replace the currently selected project's inspector. An older
project-list response also cannot hide a project whose creation was just confirmed.
Successful responses must contain valid project/receipt/proposal records before the
UI reports success; a malformed write response remains uncertain.

Run-link and capture failures identify the attempted run, milestone and revision.
Stale or uncertain writes disable further session actions until **Read latest sessions
and revision history** succeeds and you explicitly acknowledge the saved state.
No automatic write retry occurs. If capture returned a confirmed receipt but reading
the updated project then fails, the receipt remains available for inspection with a
**Handoff saved; project refresh failed** message. Refresh the saved project before
continuing; a read failure does not reclassify that confirmed capture as a failed save.
Saving or discarding an open project draft is required before linking, capturing or
preparing, so these actions cannot silently sidestep unsaved roadmap edits.

The layout keeps the compact picker and progress summary above the graph, with
full brief/history behind explicit inspection. On narrow screens controls stack,
text and paths wrap, and dependency connections are measured within the graph's
own bounds. Form controls have accessible names and visible focus, graph cards are
keyboard buttons, and history/receipt inspection uses native disclosures. The host
walkthrough exercised the interactions recorded below at 1440×1080 and 390×844,
including modal focus containment and six checks with no page overflow. The viewed
screenshots and measurements cover those particular states, rather than every
expanded, error, keyboard or touch variant.

## HTTP API

All project routes, including reads, require the existing `X-Iterfox-Token` obtained
from `/api/meta`. Requests with an Origin must use the existing local same-origin
policy. A missing or expired token returns 403; reload metadata after a server
restart. POST bodies must be JSON objects and are bounded by the existing 256 KiB
request limit.

| Request                                | Result                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `GET /api/projects`                    | 200, current project documents; an empty workspace returns `[]`     |
| `POST /api/projects`                   | 201, the saved document at revision 1                               |
| `GET /api/projects/:id`                | 200, the current document; 404 for an unknown project               |
| `POST /api/projects/:id/revisions`     | 200, the complete document at the next revision                     |
| `GET /api/projects/:id/history`        | 200, full snapshots in ascending revision order, including creation |
| `POST /api/projects/:id/runs`          | 200, project with an immutable stored-run link at the next revision |
| `POST /api/projects/:id/handoffs`      | 201, immutable derived receipt; project revision also increments    |
| `POST /api/projects/:id/continuations` | 200, a proposed editable goal and historical context; no mutation   |

Creation accepts only `name`, `repository`, `purpose`, `audience`, `constraints`,
`decisions`, `hypotheses` and `milestones`. The name, repository, purpose and audience
are required. The three text lists and milestones default to empty arrays, permitting
a brief to be saved before the roadmap is developed. Brief text is trimmed and may
not be empty or contain null characters. Filesystem paths retain literal whitespace.

The repository must be an accessible Git working repository root. Creation resolves
symbolic links and stores both the canonical root and the canonical Git common
directory in `repositoryIdentity.commonDirectory`. That identity also accommodates Git
worktrees when linking existing runs. Project creation reads Git metadata only;
it does not commit, change HEAD, create a run, execute a check or invoke a model.
An initialized repository can hold project memory before its first commit. Existing
run preflight and reviewed committed-HEAD requirements remain in force for execution.

Revision requests have this shape:

```json
{
  "expectedRevision": 1,
  "changes": {
    "decisions": ["Review useful deliverables before cosmetic polish."],
    "hypotheses": ["A compact project brief may help a returning developer."]
  }
}
```

Only brief fields and milestones are editable. Unknown fields, empty changes,
invalid types and attempts to change identity, repository, timestamps or revision
return 400 without a partial write. Omitted fields retain their saved values. Each
supplied list replaces that entire list; milestones likewise replace the roadmap
as one revision. Successful responses contain `id`, `schemaVersion`, `revision`,
`createdAt` and `updatedAt`, alongside the brief and repository binding.

## Milestone rules and limits

Each milestone requires `id`, `title`, `outcome`, `dependsOn` and `status`. Status is
`planned`, `active` or `reviewed`. Reviewed is an operator planning decision, never
a runtime PASS or a claim of fresh verification.

IDs use 1–64 ASCII letters, digits, hyphens or underscores, beginning with a letter
or digit. Duplicate IDs, duplicate prerequisites, missing prerequisites, dependency
cycles and multiple active milestones return 400. An active milestone requires every
direct prerequisite to have status `reviewed`; otherwise the mutation returns 409.
The same guard prevents reverting a prerequisite while its dependent remains active.
Reviewing a prerequisite and activating its dependent can be saved in one revision.
All transitive prerequisites are checked as well. Zero active milestones is
permitted while planning or after roadmap completion.

The brief is bounded to 160 characters for its name, 4,000 for its purpose and 2,000
for its audience. Each text list has at most 32 entries of 1,000 characters each.
There are at most 32 milestones, with titles up to 200 characters, outcomes up to
4,000 and at most 31 prerequisite IDs each. Repository paths are bounded to 4,096
characters. The overall HTTP request size may impose a smaller combined limit.

## Link an actual session and capture a handoff

Link requests accept exactly `expectedRevision`, `runId` and `milestoneId`. The run
must already exist in the selected data directory's ledger and the milestone must
exist in the current project. Linking appends to the project's `runs` array and
increments its revision; it does not create, resume or inspect acceptance checks.

Repository matching compares canonical Git common directories, not path prefixes,
branch names or equal HEADs. An existing run sourced from another worktree of the
same common repository is suitable. An unrelated clone is a different binding,
even when it contains the same commits. The service inspects both the recorded
source repository and run worktree. At least one must be accessible for linking;
every accessible identity must match the saved project binding. Git inspection
uses fixed metadata reads with hooks, optional locks and lazy fetching disabled.

A link retains its source sequence, repository, worktree, base HEAD, timestamp,
project revision and milestone snapshot. One run has one immutable milestone
binding within a project. Duplicate links and attempts to reassign a run are
rejected. Linking does not mark a milestone reviewed or active.

Capture requests accept only `expectedRevision` and a previously linked `runId`.
Client-authored evidence, statuses or PASS claims are rejected as unknown fields.
Capture rejects a live worker with 409 (`run-busy`); pause it through the existing
run controls and wait for worker exit. The service invokes the existing stored
evidence auditor, which can invalidate changed or unavailable proof. This auditor
does not execute checks or call a model. Only a stable post-audit run sequence is
captured. Concurrent run activity returns 409 (`run-changed`); a competing project
write returns the normal stale-revision response. No partial receipt is saved.
Audit invalidations remain in the source run even if a later project write fails.

The returned receipt is also appended to `project.handoffs`. It includes:

- Receipt/run/milestone IDs, the original milestone binding, capture time and the
  project revision containing this receipt.
- `sourceSeq`, source timestamp, repository/common-directory identity, worktree,
  branch, `baseHead`, `contractVersion`, `runStatus`, provider and recorded goal/reason.
- Every recorded evidence ID, node ID, criterion ID, kind, status, contract version,
  timestamp, observed HEAD/fingerprint, probe label and invalidation reason, plus
  current criterion statuses and their evidence IDs.
- Unfinished criteria, tasks, unreconciled/deferred notes, run attention and pending
  project review; agent questions; explicitly labeled unverified builder summaries,
  plan targets, hypotheses, review findings and provisional agent choices.

An operator's linked reply resolves a direction question using the existing run
rules. The latest supervisor review question is retained until a subsequent review
replaces it. Changed review context is labeled `requires-reconciliation`: arbitrary
new notes are not treated as proof that the question was answered.

Logs and artifacts stay in the source run rather than being copied into receipts.
Missing old worktrees do not erase their history: already-linked runs can be
captured after the auditor marks unavailable proof stale. An accessible replacement
belonging to a different common repository is rejected. Brief/roadmap edits, including
renaming or removing a milestone, retain the link and receipt snapshots unchanged.
Use stable milestone IDs; an ID removed from the roadmap keeps its historical links.

The receipt's textual `handoff` is bounded to 4,000 UTF-16 characters, with visible
clipping markers, omission counts and a separate `omissions` list. Its structured
descriptors remain available for inspection. There are at most 128 links and 128
receipts per project, 4,096 items per receipt collection, and 1 MiB of serialized
structured data per receipt. Source text fields are bounded to 64,000 characters.
Oversized structured receipts are rejected rather than silently losing evidence.
There is no unlink, receipt edit, automatic pruning or source-run import endpoint.

## Prepare a reviewed continuation

Preparation accepts exactly `expectedRevision` and `milestoneId`. It checks the
current revision and all prerequisite milestones' operator-reviewed status,
rechecks the saved repository identity, then rechecks revision and prerequisites
after inspection. A missing or replaced repository returns 400; saved project
memory remains readable. A proposal contains:

```json
{
  "projectId": "saved-project-id",
  "projectRevision": 4,
  "milestoneId": "next-milestone",
  "repository": "/canonical/repository/root",
  "goal": "Milestone: Selected title\nThe selected milestone outcome.",
  "handoff": "Bounded project and historical session context...",
  "sourceRunIds": ["an-actual-linked-run"],
  "sourceHandoffIds": ["a-captured-receipt"],
  "omissions": [],
  "authorizationRequired": true
}
```

The service considers the selected milestone and its transitive prerequisites,
prefers captured handoffs and then recent sources, and covers distinct prerequisite
milestones before older sessions of one milestone. Newly linked sessions without
handoffs do not displace all audited context for a milestone. Up to four source runs are selected, using each run's
latest captured handoff. A linked run without a receipt is identified as having no
audited handoff. Runs belonging solely to other milestones are not used. Additional
relevant runs and older receipts are explicitly reported as omissions.

The handoff separately labels project purpose/audience, selected and prerequisite
outcomes, operator constraints/decisions, provisional hypotheses, source provenance,
unfinished work, questions, historical checks and unverified agent claims. Each
section receives space before additional items are included. Long values are
visibly shortened and omitted items counted; the full selected outcome remains in
the editable `goal`. Source run IDs remain explicit even when their detailed context
does not fit. The response includes omission details for an inspector.

Preparation is read-only: it neither captures a new receipt nor audits or changes
the source run. It returns text and provenance, not a contract, check command list
or authorization receipt. Historical passed/assessed results describe the captured
source only; later audits do not rewrite old receipts. A new run starts with its own
fresh acceptance state and still needs the existing drafting, preflight review and
explicit authorization flow.

Preparation also does not copy or commit code. Existing New Run preflight copies
only committed HEAD, excluding uncommitted source work. Before continuing useful
changes from an old isolated worktree, the operator must review and arrange a code
checkpoint in the bound repository or an appropriate worktree, then review the new
run's pinned HEAD. Project context cannot bypass protected paths, contract revisions,
HEAD checks or authorization. No automatic checkpoint or cross-run scheduler is
provided by these endpoints.

## Persistence and recovery

Projects use an additive `project_revisions` table in the selected data directory's
existing `ledger.sqlite`. The protected run-ledger implementation and its tables
are unchanged. The owning store retains its WAL journal, full synchronous commits
and lock wait. No dependencies or separate storage process are required.

Each write uses `BEGIN IMMEDIATE`, checks the expected revision under that lock,
appends a complete snapshot and commits before reporting success. Earlier snapshots
remain unchanged. Multiple server processes opening the same data directory share
the SQLite concurrency guard. Closing and reopening the owning store recovers
projects and their history from disk.
Snapshots written before run links existed read with empty `runs` and `handoffs`
arrays. Their stored bodies and the protected run tables are not rewritten.

A stale write returns 409 with code `stale-revision` and `currentRevision`. Clients
should retain unsaved text, retrieve the latest document and history, reconcile the
changes and retry with the reviewed revision. They should not silently retry with
a newer revision. Repository unavailability does not prevent reading saved memory
or editing an existing brief.

Storage failures return 503 without a success response. A disconnected request or
lost response can leave a save uncertain: retain the draft and inspect current state
and history before retrying. Automatic mutation retries and creation deduplication
are not implemented. There is no project deletion or repository-rebinding API.

<a id="observed-validation-and-remaining-limits"></a>

## Historical first-milestone validation and remaining limits

### Evidence scope and source versions

The first-milestone reconciliation read actual host reports, their drivers, snapshot
metadata, stored run/project records and screenshots. The evidence files named here
live
under `/Users/vins/work/iterfox/.iterfox/missions/project-continuity-20261019/`;
they are mission artifacts, not files shipped with this documentation. No browser
workflow or full test suite was rerun in this builder session. The runtime owns the
subsequent fixed checks and review of the edited document. References to the latest
receipts and source stamps in this historical section describe that earlier
inspection, not the current graph-control worktree.

`host-workflow-a.json`, recorded at **2026-10-19 20:31:27.739 UTC**, reports
`status: passed`. Its SHA256 was independently recomputed and matches the supplied
checksum:

```text
89f2c5b16bf2ef07d5ad073680a167f67fe6eef3eb3ecbe03e94cecad469867c
```

The inspected `host-workflow-a.mjs` imports the compiled server/service from
`workflow-snapshot-a`. Its metadata, `workflow-snapshot-a.json`, records that target
at 20:25:17.270 UTC. The snapshot's `dist/ui/index.html` references
**`index-CmzEG7de.js`**. The first milestone's later compiled HTML referenced
**`index-Bi1-ClOA.js`**, which contains the later wrapped-sibling routing repair.
Both reference `index-fn-aH02F.css`. The report checksum identifies the report's
bytes; neither the report nor snapshot metadata supplies a full source fingerprint.
The older-bundle walkthrough observes the interaction handlers it exercised; it
cannot validate the later SVG routing by association. The separate routing audit
and its narrower limits are recorded below.

The live mission's `data/ledger.sqlite` was opened read-only for run
`20261019T191726-329482b8`. At inspection, the latest host receipts for all five
fixed acceptance commands matched that first-milestone worktree's 148-file stamp,
including its uncommitted implementation files: base HEAD
`69d70e5753ff73c38d943bd8954f361aeee3d145`, fingerprint
`89aedfb25011b81c2063bb7c082060029e1a5c30f0c9b671b015e246e733d299`.
The comparison uses file contents and executable modes, as the existing stamp
implementation does; HEAD alone does not identify this source.

| Criterion    | Latest host receipt ID                 | UTC / ledger sequence | Recorded result                                                                                          |
| ------------ | -------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| `continuity` | `f6f2d1eb-56c8-4a00-9d82-d48f39b9e8a1` | 20:30:34 / 177        | Four fixed API cases passed, including actual server/store close and reopen.                             |
| `regression` | `afbe7de8-b477-4b8b-9b87-107d290d1413` | 20:30:50 / 179        | 62 passed, 6 optional cases skipped, no failures.                                                        |
| `types`      | `5d907f4a-16bb-44b2-ab55-7748833dbeb2` | 20:30:52 / 181        | Server and UI TypeScript checks exited zero.                                                             |
| `build`      | `fa13db8e-620b-4641-8a33-033812480704` | 20:30:54 / 183        | Production build exited zero and emitted `index-Bi1-ClOA.js`; the existing large-chunk advisory remains. |
| `interface`  | `966ad523-6b26-4368-a3ab-8bb7f855ef46` | 20:31:11 / 185        | Eight Chrome cases passed. The fixed project case supplies milestones over HTTP.                         |

All five are contract-v1 deterministic receipts with exit code zero and the same
stamp. Their recorded `purpose` is **`probe`** while planned work remains; they are
passing observations of the approved acceptance commands, not a completed project
review or a new session's proof. This documentation edit changes their whole-tree
stamp. The resulting tree requires runtime recheck; this table does not certify
itself. The fixed browser case and the separate host walkthrough cover different
interactions, and neither substitutes for the other.

The older table below is retained as history, not current coverage. Its receipts
used fingerprint
`16f47967748bc112234582ef57e2ce7586ec993454219899364cb652028c86d3`
and the same base HEAD/148-file count. At that reconciliation their recorded source
differs in `docs/project-workspace.md` and `src/ui/project-roadmap.tsx`.

| Criterion    | Earlier host receipt ID                | UTC / ledger sequence | Historical observation                               |
| ------------ | -------------------------------------- | --------------------- | ---------------------------------------------------- |
| `continuity` | `3631e8e9-db84-4da8-99eb-f06bf8cfab06` | 20:10:35 / 122        | Four API cases passed on the earlier source.         |
| `regression` | `bf254e9c-6f7b-4c38-be2e-5eb8ecd02d30` | 20:10:51 / 124        | 62 passed, 6 skipped on the earlier source.          |
| `types`      | `bd5d7bbe-fea0-4c67-93b0-f1f67bd68b5d` | 20:10:53 / 126        | TypeScript checks exited zero on the earlier source. |
| `build`      | `4f8919c2-dafa-4920-8f73-a7ba6b932ab9` | 20:10:56 / 128        | Build emitted the older `index-CmzEG7de.js` bundle.  |
| `interface`  | `c115a738-1748-4f92-9657-a60f524bb92c` | 20:11:14 / 130        | Eight Chrome cases passed on the earlier source.     |

Still earlier 19:58 receipts were explicitly invalidated at ledger sequences
107–111. Retaining historical results never restores their validity or transfers
PASS to a continuation.

### Observed host workflow

The successful walkthrough used the dedicated archive
`host-workflow-data/1792441883834/`, rather than pausing or restarting the live
mission. Its source run is **`20261019T203123-395f8c5e`**, provider **DEMO**, and its
UI-created project is **`ba7927a0-c743-47a8-b876-4c845f24764e`**, named
**HOST WORKFLOW FIXTURE — complete project handoff**, ending at revision **7**.
The repository is that archive's `demo-repositories/2a427410`; the run worktree is
`worktrees/20261019T203123-395f8c5e`, with the repository's `.git` as common identity.

The driver deliberately creates one deterministic DEMO source run before browser
interaction, completes it through the existing engine with actual protected Node
checks, then links that idle stored run through the UI. This is real ledger/check
evidence from a labelled fixture, not a Codex/model-quality or long-horizon
productivity claim. The walkthrough created no additional run, launched zero
workers and made zero model calls. It asserted the source ledger sequence remained
unchanged from the completed fixture through capture and preparation.

| Workflow                             | Actual bounded observation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create and edit roadmap              | At 1440×1080, **New project** focused the project-name field. The browser filled name, repository, purpose and audience, entered a separate operator decision and provisional hypothesis, and added active `memory` plus planned `followup` with `memory` checked as its prerequisite. Revision 1 preserved that dependency.                                                                                                                                                                                                                                                    |
| Link and inspect actual handoff      | The UI selected the existing idle run, linked it to `memory` at revision 2, and captured its audited handoff at revision 3. The historical-evidence disclosure was expanded; the driver compared its stored descriptors against every completed source criterion's actual evidence ID.                                                                                                                                                                                                                                                                                          |
| Guard preparation and restore inputs | Selecting `followup` before prerequisite review produced a prerequisite alert and no dialog. One explicit edit reviewed `memory` and activated `followup` at revision 4. Preparation then opened **Night Run preflight** with the dependent outcome and source run ID in editable context. Focus remained inside the dialog after Tab and Shift+Tab. Closing and using **Previous New Run inputs kept / Restore inputs** restored the earlier goal and handoff; the driver compared both values. No draft, review or launch was requested.                                      |
| Reconcile a real stale revision      | A separate API write changed purpose and audience to revision 5 while the browser retained its own conflicting purpose. Its stale save was rejected with 409 and retained the draft. The browser read latest state/history, opened **Compare changed fields**, explicitly acknowledged the comparison, and chose **Keep edited fields on revision N**. Its edited purpose survived, untouched audience adopted the latest saved value, and a separate save produced revision 6. This used a browser plus a competing API write, not two independently operated browser editors. |
| Survive genuine restart              | With unsaved purpose text still in the open page, the driver closed all server connections, closed the server and owning store, then called `openStore` on the same data directory and served again on the same port. The old browser token was rejected; **Reconnect to runtime** retained the unsaved text. A subsequent explicit save produced revision 7. Reads confirmed the retained handoff and dependency. This was a real server/store restart, not just a page reload.                                                                                                |
| Revisit on a phone-sized viewport    | A new 390×844 page reopened the persisted project, selected prerequisite `memory` from the graph and expanded its actual handoff. The selected `followup` inspector also supplied a real no-linked-sessions/no-handoffs state before returning to `memory`.                                                                                                                                                                                                                                                                                                                     |

An independent read of the closed fixture's database confirmed ordered revisions
1–7 and immutable handoff **`e84b076d-a675-4de3-87d4-ed90f5b70c41`**, captured at
20:31:26.088 UTC in project revision 3, bound to `memory`, source sequence **34**,
base HEAD **`142ee43e28e9f4490a5c2901d66baa7c2b6e52bb`**, contract **v1**, source
status **COMPLETED**, provider **demo**, and no capture omissions. Its six evidence
descriptors retain two recorded probes, a stale render result, a failed dialogue
result and the two final passed results, rather than flattening history into PASS.
The final render evidence ID is `036f53ec-6fdd-4847-81eb-d6299aec6495`; the final
dialogue evidence ID is `de4ce647-0bdf-4f5d-8e83-c5f0ca52d819`. These identify that
source's history only, not acceptance evidence for this Iterfox implementation.

The report contains exactly six checks of
`document.documentElement.scrollWidth > innerWidth`, all **false**:

| Observed state           | Viewport  | Page overflow |
| ------------------------ | --------- | ------------- |
| Desktop milestone editor | 1440×1080 | false         |
| Expanded actual handoff  | 1440×1080 | false         |
| Prepared next session    | 1440×1080 | false         |
| Desktop after restart    | 1440×1080 | false         |
| Mobile project overview  | 390×844   | false         |
| Mobile handoff           | 390×844   | false         |

`pageErrors` is **`[]`**, collected from both observed pages' `pageerror` events.
This does not claim a separate console-log audit or overflow measurement of every
editor, disclosure, comparison or error combination.

The builder opened **`artifacts/host-workflow-desktop.png`** and
**`artifacts/host-workflow-mobile.png`**. The desktop screenshot shows the active
follow-up inspector with its reviewed prerequisite, empty linked-session/handoff
sections, and the already-linked-run notice. The phone screenshot shows the
expanded prerequisite handoff and the historical-evidence warning wrapping within
the narrow inspector. These are viewport captures at the driver's current scroll
positions, not whole-page images of all workflow states. The report/driver supply
the interaction and overflow evidence that the pixels alone cannot establish.

Earlier attempts remain distinct: `host-workflow-selector-attempt.json` records a
selector failure, and `host-workflow-before-restart.json` records four completed
workflows followed by a metadata-fetch failure during restart reconnection for a
different project (`75f75942-460d-4589-b491-bbd1a32fd949`). The final driver retries
that metadata connection with a closed HTTP connection. Only the checksum-matched
successful report above establishes all six observations for its named fixture.

### Separate recovery and provenance audits

`audit-ui-a.json` at **19:54:53.681 UTC**, with its inspected driver
`audit-ui-a.mjs`, records a deliberately lost creation response: the upstream
creation actually returned **201**, then the browser response was aborted. Entered
values remained, exactly **one** save POST occurred, and the persisted project was
reopened after reload. The run archive was empty and usable on desktop and 390px;
the measured mobile state had no page overflow, `pageErrors: []`, no run creation
or worker launch and zero model calls. Its failed predecessor was diagnosed as a
locator problem in `audit-ui-a-locator-diagnosis.json`. This is historical evidence
for uncertain **creation** and an empty archive; it does not exercise an uncertain
existing-project edit, link or capture, or every read-error recovery variant.

`audit-a.json` at **19:44:07.830 UTC** separately records concurrent writes yielding
one winner and one 409 with complete history; actual derived evidence and rejection
of client-authored proof; relevant edits invalidating current proof while old
receipts remain historical; linking distinct worktrees of one Git common
repository; bounded continuation with decisions/uncertainty and no launch or PASS
transfer; and persistence of versions, links and receipts across an actual
store/server restart. Its source uses deterministic DEMO fixtures and real checks,
not a model-quality claim. `audit-a-final.json` at **20:45:16.369 UTC** repeats those
six backend checks and records per-file backend SHA256 values matching the source
read for this reconciliation. These service audits do not supply browser coverage
for missing-repository errors or transport faults.

The inspected implementation boundaries remain:

| Source                                                                                                                     | Implemented responsibility; observation scope is recorded above                                         |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Projects UI](../src/ui/projects.tsx)                                                                                      | Brief/milestone forms, field comparison, uncertain writes, token reconnection and late-response guards. |
| [Sessions](../src/ui/project-sessions.tsx) and [receipt inspector](../src/ui/project-handoff.tsx)                          | Run selection/linking, capture controls, immutable provenance and expandable evidence.                  |
| [Workspace](../src/ui/main.tsx) and [New Run](../src/ui/new-run.tsx)                                                       | Retained prior inputs, editable prepared context, omissions and the existing authorization boundary.    |
| [Project service](../src/projects/service.ts) and [store](../src/projects/store.ts)                                        | Guarded revisions, Git common-repository identity, idle-run evidence audit and committed snapshots.     |
| [Continuations](../src/projects/continuations.ts) and [context budget](../src/projects/context.ts)                         | Selected/prerequisite sources, unfinished work, explicit omissions and historical labels.               |
| [Protected API cases](../tests/project-continuity.test.ts) and [protected browser case](../tests/browser/projects.spec.ts) | Fixed public acceptance coverage; neither was changed.                                                  |

### Historical orientation images

The earlier image review recorded `revised-project-desktop.png`,
`revised-project-mobile.png`, `revised-milestones-desktop.png` and
`revised-milestones-mobile.png` under `artifacts/`.
`project-layout-observation-revised.json` records capture at **20:13:10.025 UTC**.
`preview-current.mjs` served the worktree's then-compiled server/service against
mission data and `capture-project.mjs` selected the real project. Those artifacts
contain no source fingerprint and cannot bind their pixels to the later receipt
stamp or routing repair.

That project was **`44b52c8e-4010-4778-b291-a9527e292097`**, revision 2, with two
milestones, one linked mission session and zero handoffs. The earlier read-only
inspection found only the live mission run and its worker lease, not an idle
capture source. Those observations remain true of that earlier archive; the later
successful handoff walkthrough used the distinct DEMO archive/project above.

| View      | Earlier image-only observation                                                                                                                                                                                              | Relationship to later coverage                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1440×1080 | Active milestone, outcome, **Open linked session**, **Prepare next session** and brief disclosure precede the graph. Graph bounds x=262, y≈696, width=1144; a downward arrow connects the two milestones.                   | Later host interaction/overflow coverage is recorded for the separate workflow fixture, not inferred from these pixels.             |
| 390×844   | Active milestone and both session controls fit the initial viewport; the outcome is shortened. Graph bounds x=78, y≈859, width=298, so its path requires scrolling. The crop shows the arrow and wrapped prerequisite text. | The later report supplies two mobile overflow measurements and handoff inspection; these older crops alone do not establish either. |

These images support the orientation improvement from the earlier y=1137 desktop /
y=1826 phone graph positions. They do not demonstrate wrapped independent siblings
or a complete keyboard/touch path.

### Later wrapped-sibling routing: diagnostics and bounded browser evidence

The former height heuristic could route `A → C` through independent root `B`
when `A` and `B` stacked in one stage. The source-derived reproduction used 152px
cards, the existing 14px sibling gap and 48px stage gap. With `B` spanning
y=166–318 and `C` starting at y=366, the old center route crossed `B`; its height
threshold missed the obstruction. The two-milestone historical images and
`host-workflow-a.json` do not exercise this layout.

[ProjectRoadmap](../src/ui/project-roadmap.tsx) now measures each card and stage
relative to the diagram, finds clear row gaps and checks a compact route against
unrelated cards with 2px stroke clearance. A blocked route uses the existing
reserved right gutter before returning above the target. Stages, cards and diagram
are observed for resizing; 8px arrowheads fit the 14px sibling gap and point toward
the dependent. Milestone buttons and **Dependency links in text** remain available.

The earlier agent-local diagnostic imported the actual routing function and
validated these roadmaps against the existing milestone schema:

| Roadmap           | Dependencies                              | Recorded source-derived geometry at 1440px / 390px   |
| ----------------- | ----------------------------------------- | ---------------------------------------------------- |
| Independent roots | Roots `A`, `B`; `C` requires only `A`     | Paths clear unrelated cards at both sizes.           |
| Fork and join     | `A → B`, `A → C`, `B → D`, `C → D`        | Incoming and outgoing routes clear wrapped siblings. |
| Skipped stage     | Roots `A`, `B`; `A → C`, `C → D`, `A → D` | The long dependency clears intervening cards.        |

It derived diagram widths of 1094px and 268px from the padding rules, retaining the
28px gutter, and exercised 481px, 482px, 715.5px and 716px wrapping boundaries with
uniform 152px and mixed 97–310px heights: 36 layouts, 96 directed edges. Assertions
covered finite coordinates, containment, endpoint attachment, downward direction,
stroke/arrow clearance and the old collision. Static rendering retained text links,
selection and ARIA labels; the earlier local type/format checks passed. These were
source-geometry diagnostics, not browser observations or tests rerun here.

A separate later host **`audit-roadmap-a.json`**, at **20:46:09.149 UTC**, and its
inspected driver `audit-roadmap-a.mjs` provide narrower actual Chrome evidence for
one three-card fixture: independent roots `A`, `B`, with `C` depending only on `A`.
The driver imports this worktree's compiled server/service, creates a labelled
project fixture and checks the rendered SVG path against `B` with 2px clearance.
At 1440×1080 and 390×844 it records **`intersects: false`** and **`overflow: false`**;
no model or worker is launched. The builder also opened the resulting
`artifacts/roadmap-siblings-desktop.png` and `artifacts/roadmap-siblings-mobile.png`.
The phone crop visibly routes around `B` through the right gutter; its measured
path is
`M 120 127.765625 L 120 134.765625 L 254 134.765625 L 254 293.53125 L 120 293.53125 L 120 312.53125`.
The report supplies no whole-tree fingerprint. This separate observation does not
extend the older workflow report to the current bundle or establish all browser
geometry of the repair.

### Remaining observation limits

The supplied observations leave these specific limits:

- **Later routing variants:** the three-card browser audit covers one independent
  sibling at two fixed sizes. Fork/join, skipped stages, mixed card heights,
  breakpoint transitions and remeasurement after resizing/revisiting remain
  source-geometry evidence only. Shared gutter segments can overlap. Complete
  browser connector/arrowhead geometry and the whole workflow on the later bundle
  are not established by the older walkthrough or the eight fixed browser cases.
- **Repository and empty/error variants:** missing or replaced repositories during
  creation, linking or preparation, and unrelated-run rejection have no supplied
  end-to-end UI observation. Service guards and API checks do not establish their
  visible error/focus behavior. The empty archive and selected milestone's empty
  session/handoff states were observed; every loading-versus-empty/failed-read
  combination, removed-milestone view and late-response race was not.
- **Input methods and expanded states:** project-name autofocus and one modal
  Tab/Shift+Tab containment sequence were observed. Full keyboard navigation,
  focus restoration at every boundary, touch gestures and actual phone-device
  use were not. The 390×844 page is a resized Chrome page. Not every receipt
  disclosure, omission case, constraint/list edit, history expansion or comparison
  variant was exercised or measured for overflow.
- **Transport recovery:** the real 409 and restart/token recovery plus the
  separate lost-creation-response fixture are observed. Uncertain link/capture
  responses, confirmed capture followed by failed project refresh, malformed
  mutation responses and all list/history/run-read transport faults remain
  unobserved in Chrome. Their implemented recovery controls are not claimed as
  observed success.
- **Continuity outcome:** preparation/restoration retained source context without
  launching work. Whether the bounded handoff carries enough unfinished work for
  a useful independent Codex session, and whether larger roadmaps remain easy to
  govern, remain provisional hypotheses. No model-quality or subsequent-session
  success is inferred from deterministic DEMO evidence or historical PASS.

### Operating limits

Unsaved edits and previous New Run inputs remain page-local. Lists/roadmaps are
reconciled as whole fields. Creation has no idempotency key: inspect saved projects
after an uncertain creation before any retry. Full revision snapshots can grow the
SQLite file; there is no retention pruning, project deletion, repository rebinding
or automatic storage backup. Removing the data directory loses project memory.
Back up the selected data directory with the server/workers stopped, or use a
SQLite-consistent backup method; copying only a live main database file can omit
WAL records. Different data directories show different project/run archives.

There is no automatic checkpoint, launch, continuation-time re-audit or linking of
a newly authorized run. A prepared proposal records a particular project revision;
subsequent edits do not update an open New Run dialog. Close it and prepare again
for newer context. Historical evidence never transfers its validity. Selected
execution-node feedback is now implemented through Compass; its current observations
and limits are recorded in [Selected-work direction](graph-controls.md).
