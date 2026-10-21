# Selected-work graph control: second milestone acceptance boundary

This specification and tests are fixed before the second autonomous session.
Use the project memory and previous handoff as context; retain the original
runtime and reviewed launch boundary. Add contextual direction to Live Trail,
not a second scheduler or a generic diagram editor.

## Commands and provenance

Extend the existing direction note with optional strict `context`:
`{criterionId, contractVersion, nodeId?}`. With no context, existing Compass behavior
is unchanged. With context, require a current approved criterion and exact current
contract version. A supplied node must exist in that run and belong to that
criterion. Reject unknown fields, fake statuses/permissions, unknown/mismatched
nodes and invalid versions with 400, without a partial event. Preserve context
in events, projection, replay, Compass history and exported review information.
Context is a reference, never a permission or an assertion of correctness.

Use the existing `POST /api/runs/:id/direction`, token and same-origin protections.
Sending feedback does not start/resume a worker, reorder execution directly,
erase questions or change acceptance state. Existing activity-boundary
reconciliation decides subsequent work. An inactive run requires explicit Resume;
completed/failed runs keep the existing terminal guard. Preserve a user's text
and show errors when submission fails.

## Graph interaction

Selecting an activity or acceptance node opens the existing inspector with a
region **Steer selected work**. Show the selected result's title and its context
before submission. Offer a textarea **Instruction for selected work** and button
**Send instruction**. Distinguish Request, Decision and Hypothesis where useful;
provide a priority-request shortcut without implying guaranteed scheduling.
Record and display a clear saved/pending/error state. Do not claim the requested
work is already implemented. Let the developer inspect the matching history or
Compass context. Respect pending submission and avoid accidentally retargeting a
message when selection changes.

Historical replay is read-only. Terminal runs explain the need for a follow-up
session; they do not silently reopen. Support keyboard use and 390px layouts.
Keep earlier project/milestone, New Run, evidence and graph behaviors intact.
No arbitrary edge editing, execution-branch deletion or click-to-PASS action.

Read the actual result against the goal after the fixed gates pass. Document only
implemented and observed interactions. Same-model judgment is not independent
evidence. The first mission's receipts remain historical context for this one.

## Observed visual evidence

The approved host renderer `tests/graph-capture.mjs` creates explicitly labelled
deterministic fixtures, exercises the real compiled UI in Chrome and writes six
actual PNGs under ignored `dist/qualification/`. It never calls a builder/model or
starts a worker. A separately approved qualitative policy uses these observed
images for scored context/action/layout/provenance review. The verdict is
probabilistic ASSESSED, never deterministic PASS. Builders must not edit the
renderer, its fixtures, policy, thresholds or PNGs; request the approved host
capture check when needed. The capture runs after the production build and before
assessment. Initial selected-work viewport captures preserve whether the action
is discoverable before the renderer scrolls to fill it. Failed/missing evidence
must be fixed, not waived.

The opt-in `tests/graph-codex.test.ts` adds a real integration probe: a browser
submits contextual feedback to a paused, explicitly labelled initial task fixture,
then explicitly resumes. Actual Codex reconciles the note, implements the approved
avatar behavior and passes protected regression/Unicode checks with no additional
operator prompt. It is skipped by default and explicitly enabled in the approved
final qualitative gate's command. The check has its own finite fixture limits;
it does not claim the fixture's initial task was AI-generated or establish a
competitive advantage. Do not change or bypass this integration check.
