# New Run from a project goal

The local UI offers **From a goal** and **From a configuration file** in the New Run
dialog. Existing runs continue to use their original contracts and views.

## From a goal

1. Enter the repository root directly or use **Browse local folders**. The folders
   belong to the host running Iterfox. Choose a Git repository with committed HEAD;
   uncommitted files are excluded from the draft and isolated run.
2. Describe the desired result in ordinary language. Italian is supported as input;
   there is no requirement to translate the goal into English or write acceptance JSON.
3. Choose **Generate draft with Codex**. This calls the existing official Codex
   proposal service. Authenticated polling displays collecting, securing, generating
   and validating progress. The service's external-tool policy remains in force.
4. Review and edit the proposed goal, criterion titles, exact argv, allowed and
   protected paths, and work window. These stay outside expandable sections.
   The summary shows the window, maximum turns and reported-token limit. New
   drafts normally propose **8 hours, 150 turns and 100,000,000 tokens**, adapting
   to specific instructions in the goal within the existing bounds. These limits
   are editable assumptions requiring review and authorization, not repository
   evidence, permission already granted or a guarantee of completion.
   Enter the window in **hours and minutes**. **Add seconds** exposes finer units;
   existing nonzero or fractional seconds remain visible. Seconds accept up to
   three decimal places without rounding. Empty fields need an explicit value,
   including `0` for unused units; they do not acquire defaults.
   Open **Advanced session settings** to change turns, tokens, attempts per check,
   turn timeout, no-progress turns and maximum project reviews. Open each check's
   **Check details · ID, scope and timeout** for its technical fields. Check and
   turn timeouts use minutes, with seconds available when needed. Criteria can
   be added or removed; at least one is required.
5. Review the observed source excerpts at the pinned commit, inferred assumptions,
   omissions and notices. A declaration of a command is source evidence, not a
   successful check. An operator-edited command does not inherit the original
   command's source grounding. Original rationale and references remain available
   separately for comparison.
6. Resolve missing check commands explicitly. A gap includes the model/service's
   explanation; no placeholder command is supplied. Preflight is unavailable while
   a command is missing or is not a valid, nonempty JSON argv array.
7. Optionally add a handoff and choose autonomous project development. **Review
   preflight** converts the edited draft through `proposalToContract` into the
   existing runtime contract, binding it to the proposal ID and unchanged original
   goal. Proposal rationale and observations are not runtime verification receipts.
8. Read the canonical repository, commit, complete checks, paths, session summary,
   handoff, permissions and authorization expiry. Expand check details and
   advanced session settings to inspect scopes, timeouts and secondary limits.
   All displayed values come from the server-returned contract, including exact
   fractional durations; a loaded file's limits are not replaced by proposal
   defaults. **Authorize & start Night Run**
   submits that returned contract, repository and handoff with the one-use
   `authorizationId`, then opens the existing run view.

Commands are JSON arrays, for example `["npm", "run", "test"]`. Each element is
one exact argument. Iterfox does not parse a shell command line or insert a shell.
Paths and scopes are literal relative file/directory prefixes, one per line.
An empty scope uses the whole repository fingerprint. Narrow scopes need every
input relevant to the check. Checks remain trusted local programs after approval.

Drafting and preflight do not execute proposed checks, modify the source checkout
or create/launch a run. The draft service reads a bounded committed snapshot and
uses command-free Codex settings in a separate temporary directory. The existing
isolated runtime starts only after explicit authorization.

## From a configuration file

Select **From a configuration file**, choose the repository and enter the local
acceptance configuration path. Preflight uses the existing complete file loader;
it does not reconstruct the file through the goal editor. This preserves advanced
visual/qualitative verification settings, criteria, scope, protections and limits.
An optional checkbox adds project supervision only when absent; existing supervision
settings are preserved even when the checkbox is off. Review the returned preflight
and explicitly authorize it using the same one-use receipt flow.

The existing CLI configuration route is unchanged. No existing run is migrated.

## Finding existing runs on desktop and phone

**Browse runs** is available beside **New run** at every viewport width, including
the narrow mobile sidebar. It opens the **Existing runs** modal and refreshes the
list through the existing `/api/runs` API. Desktop retains its compact sidebar
list and refresh control as well. No current selection is needed to browse or
open a run. Opening a run uses the existing views and runtime controls; it does
not submit authorization, create a run or resume its worker.

Each full-list button shows the goal, status, creation date/time, provider,
repository and full run ID. The current selection is identified in text and with
`aria-current`. **Open run** selects that exact ID; the modal then closes. A run
whose events are still loading has an **Opening run…** state. A failed or empty
event read offers **Retry opening run** instead of the new-run welcome screen.

**Refresh runs** shows progress and a retrieval time/count. Empty results have an
explicit message and another refresh action. Errors preserve the last retrieved
list, label it as previous results and permit another refresh. Older list responses
cannot overwrite newer results. The native modal contains keyboard focus, closes
with Escape or **Close runs**, returns focus to its opener and scrolls internally.
Full goal names and paths wrap, and its controls have at least 44-pixel touch
targets. These are implementation descriptions, not observed browser trials.

## Advanced fields, keyboard and mobile

The same **New run** button remains available in the narrow sidebar. The dialog
uses one column on a small screen; long argv and paths wrap, inputs use readable
text sizes, and buttons and disclosure summaries have touch targets of at least
44 pixels. The existing accessible names **Night Run preflight**, **Close
preflight**, **Review preflight** and **Authorize & start Night Run** are retained.

On a preflight attempt, invalid fields inside closed details open before native
validation focuses them. Duration conversion errors also participate in form
validation; duplicate criterion IDs are identified in the check details. An error
badge on a closed technical section signals fields needing attention. Structured
errors retain their field paths and messages. When a path corresponds to an
editable field, the error summary provides a keyboard-operable link, opens the
section and associates the message with that field. File-content errors remain
listed for correction in the original configuration file.

Adding a criterion focuses its title; removing one focuses the next or previous
title. Adding seconds focuses the new seconds input, and entering zero keeps it
mounted. Editing keeps the current field in place and invalidates the preflight;
opening a disclosure alone does not change reviewed values. The native modal
contains keyboard focus, scrolls internally and returns focus to its opener on
close. These describe the implemented behavior; interaction validation is listed
below.

## Discarding and recovery

- Changing repository or original goal, switching input route, discarding a draft,
  or closing the dialog invalidates the local proposal and preflight. Draft jobs
  are cancelled; late responses are ignored, and a late job ID is cancelled when
  it arrives. Editable proposal fields, handoff and project options invalidate the
  preflight while retaining the draft.
- Closing and reopening New Run in the same page retains the repository, original
  goal, configuration path, handoff and options in memory. Drafts and preflight
  receipts are discarded. A known run ID or uncertain authorization outcome also
  remains locked to its recovery action when reopened. Merely refreshing or
  opening an arbitrary run for inspection does not clear an uncertain outcome.
  Reloading the page clears these temporary inputs.
- A polling error preserves inputs and offers **Resume progress polling**. Codex
  errors and timeouts allow a fresh draft; nothing is authorized by retrying draft
  generation. An expired or missing job instead requires a fresh draft. Requests
  have a 30-second response deadline, including reading their response body;
  authorization allows two minutes. These are transport deadlines, separate from
  the server's displayed drafting timeout. A failed cancellation retains its code
  and issues and offers **Retry cancellation**, without restoring the draft.
  Pending discarded requests and cancellation requests have their own status.
  If a draft request loses its response before returning an ID, the UI explains
  that cancellation cannot be confirmed; an unobserved draft cannot start a run.
- Editing launch inputs aborts an in-flight preflight and immediately removes its
  authorization action. Revision guards discard late preflight and polling results
  even if the transport ignores cancellation. Draft creation remains observable
  until its response deadline so an ID received after an input change or close can
  still be cancelled. No request is automatically retried.
- The server enforces proposal expiry, preflight expiry and commit pinning. An
  expired draft needs regeneration. An expired preflight needs another review.
  If HEAD changed, generate a current draft. The repository, original goal, handoff
  and options remain available. Reviewed edits stay visible for reference when a
  draft becomes unavailable, but cannot be preflighted or authorized. Generating
  a fresh draft or explicitly discarding it replaces those draft edits.
  If a server restart invalidates the connection token, **Reconnect local runtime**
  refreshes it without reloading the page or losing inputs. It discards the old
  preflight; server-side expiry and proposal validation still apply on retry.
- Structured errors retain their code, field issues and any run ID. If a worker
  fails after creation, **Open existing run** opens that run for inspection/resume.
  Do not authorize another run to recover the worker. An error opening that run is
  shown separately, keeping the original launch error and run ID. If the
  authorization response is lost, unreadable or times out, the dialog stops
  further launches and offers **Refresh and inspect runs**. This keeps the dialog
  open and presents the retrieved runs in the same full-list browser, with no
  automatic choice or assumption that a matching goal identifies the authorized
  run. Empty results explicitly do not resolve the unknown outcome. Both refresh
  actions can be repeated after an error or an empty result without another
  authorization; previous results and the original launch error remain available.
  Choosing a run verifies that its ID is still listed, selects it and opens Live
  Trail. An opening error stays in the dialog with the recovery controls.
- Opening an arbitrary result for inspection keeps the inputs, original error,
  uncertain outcome and inspector state in page memory. A **Return to launch
  recovery** banner on the main screen reopens them, and **Browse runs** remains
  available on desktop and phone. Closing during a list refresh cancels that
  request without unlocking launch. The list and refresh error are shared with
  the main run browser and retained in memory. Only opening a confirmed created
  run, receiving a confirmed ID, or explicitly choosing **Finish launch recovery**
  changes the recovery path. Inside that disclosure, **Dismiss recovery and keep
  inputs** explains that the old outcome remains unknown. It discards the old
  draft/receipt and permits fresh review; it does not start or stop a run. Late
  responses from the dismissed authorization cannot affect a subsequent launch.
  If a late authorization response supplies a run ID before dismissal or close,
  the dialog offers that existing run directly, including a worker-start failure.
- Inputs and close actions are held while authorization is being submitted to avoid
  changing the reviewed launch during its creation. Closing the browser after a
  successful launch does not stop the runtime.

## Implementation choices and validation status

The reversible choices remain one New Run dialog and two input routes, exact JSON
argv arrays, literal path lists, human-readable duration fields and expandable
technical settings. The session summary is shared by editor and preflight. The
proposed overnight window is limited to new drafts; existing configurations, runs,
core defaults and policy are unchanged. Provisional UX assumption: keeping the
decision-making fields visible while collapsing technical settings will make
review easier on desktop and phone. No measured reduction in review effort is
claimed.

The run-selection task adds a separate native **Existing runs** modal and reuses
its run-list controls inside launch recovery, avoiding nested dialogs. The
provisional choice is to keep an unknown launch locked while the developer opens
arbitrary runs for inspection; finishing that recovery is a distinct, explicit
action. Repository/goal inputs and list state stay in page memory without saving
drafts or authorization receipts to browser storage. No server API, runtime,
Codex policy, dependencies or stored contracts were changed for run selection.

The supervising-host review on **2026-10-19** observed the following. See the
[structured record](validation/goal-launch-real.json) and
[dated validation scope](validation.md#real-project-goal-launch--2026-10-19).

| Check                  | Result and scope                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autonomous development | COMPLETED in 65 min 52 s, six implementation units, five current host gates and two project reviews. The supervisor discovered missing mobile run recovery after green checks and executed a new implementation unit.                                                                                                                   |
| Operator attention     | No additional human message was required after launch. One assistant quality note forwarded the existing preference for generous overnight defaults and readable time controls; this is not presented as an unassisted discovery.                                                                                                       |
| Delivery checks        | Typecheck, build, 58 deterministic tests and seven Chrome browser regressions passed. Two permanent browser tests use explicit UI-state fixtures without a model or worker. Six optional integrations are skipped in the default suite; real proposal checks separately ran in the development runtime.                                 |
| Actual new flow        | Italian goal, real Codex draft, editable goal and bounds, preflight invalidation after edits, no source changes or run creation before authorization, and actual isolated worker startup were observed in Chrome. The disposable worker was intentionally stopped.                                                                      |
| Recovery on phone      | A real HTTP 201 authorization response was deliberately dropped before the browser received it. The resulting run was retrieved and opened from the mobile recovery list, with retained inputs and no second authorization or duplicate run. Older runs were also opened through the mobile browser. The disposable worker was stopped. |
| Additional checks      | Five recorded-proposal browser fixtures cover late job IDs, changed inputs, edited-command provenance and the configuration route. 214 duration round-trips preserve precision; blank and overprecise inputs are rejected.                                                                                                              |
| Integrity              | Event replay matched stored state. Recorded frozen-runtime core hashes matched, tracked protected paths were unchanged, and the original run worktree/HEAD remain intact. Delivered implementation files match the tested generated source.                                                                                             |

Expiry, reconnect, worker-start failure, long-value/zoom cases, error links in every
advanced field, and all keyboard/touch sequences are not exhaustively covered.
The supervisor uses the same Codex integration and its readiness judgment is
probabilistic. This is one bounded feature-development case, not an eight-hour
soak or a matched comparison with direct Codex. The development worktree used a
private prepared dependency copy; automatic environment provisioning for arbitrary
repositories is not established by this trial.
