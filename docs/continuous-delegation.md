# Continuous project delegation

One authorization can cover a finite graph of project outcomes. The detached host
worker chooses the next eligible approved outcome, starts an isolated project-mode
mission, verifies it and stores a local Git checkpoint before continuing. Inside
each mission Codex plans, implements, diagnoses and reviews the result, and owns
ordinary reversible implementation choices. The graph holds outcomes and approved
checks, rather than individual coding prompts. Host-managed continuation does not
grant the coding agent authority to commit, authorize a new contract, change
acceptance, alter protections or extend permissions or aggregate limits.

Open **Delegations** to inspect progress, pause/stop the whole delegation and open
an actual mission in Live Trail. The first version imports an explicit JSON
configuration: repository, contract, milestones and optional prepared environment.
Review the preflight once, then authorize continuous work. An uncertain response
keeps its request ID; refresh and inspect instead of creating another delegation.

The CLI supports:

```sh
iterfox delegation run --config delegation.json --night --yes
iterfox delegation status <id>
iterfox delegation pause <id>
iterfox delegation resume <id> --night
iterfox delegation stop <id>
iterfox delegation brief <id>
```

`--yes` authorizes the printed preflight. `--night` detaches the entire delegation,
which remains independent of the page/terminal. On macOS the worker requests idle
sleep inhibition while active. Explicit sleep, shutdown and power loss still
interrupt local work. Recovery after an unexpected worker exit requires explicit
inspection/resume; it does not silently relaunch an uncertain mission.

The contract contains the overall goal, all exact check argv, editable/protected
paths and aggregate turn/token/time limits. Each milestone has `id`, `title`,
`outcome`, `criterionIds` and `dependsOn`. Every criterion must be covered; IDs and
dependencies are validated. Limits cover the entire delegation, including pauses.
A following mission gets the remaining budget and cumulative checks for all prior
outcomes. A new mission or Resume never resets the original delegation window.
Reported tokens retain the existing boundary-based accounting limitations.

The authenticated `GET /api/delegations/:id/brief` returns a read-only aggregate
project brief as JSON. Add `?format=markdown` for a portable `text/markdown`
document, or `?format=json` for explicit JSON. Authenticated
`GET /api/delegations/:id/report` renders the same saved-record brief as
`text/html; charset=utf-8`, with `Content-Disposition: attachment` and a safe
`iterfox-project-report-<id>.html` filename. HTML uses this separate route, not a
`format=html` brief request. All three formats retain the existing local-host,
same-origin and `X-Iterfox-Token` header guards. A bare report URL without that
header is not an authenticated download. These routes run before delegation GET
recovery: generating any format reads saved records without recovering workers,
launching or resuming missions, calling a model, auditing evidence, executing
checks or writing history.

Save the HTML attachment and open it locally in a browser. The report uses static
inline styling and native expandable details, with no scripts, remote resources
or embedded active content. Offline reading needs neither a running Iterfox server
nor model access and spends no model tokens. Saved strings, including goals,
questions, commands, evidence output and paths, are HTML-escaped text. Artifact
paths remain references; referenced files are not bundled, fetched or executed.
The runtime token is used for the request and is not added to the report. The
downloaded file can be read without that token, so sharing it shares the saved
content it contains.

The brief counts approved outcomes separately from repeated cumulative checks and
sums reported turns/tokens once per unique linked mission. It retains the original
goal, authorization time, limits and approval hash. Remaining time includes
pauses; a new mission or resume does not reset the window. Missing mission history
is explicit, makes usage partial and leaves remaining turn/token budgets unknown.
Checkpoint receipts retain their SHA, ref, source fingerprint and source sequence.
Their evidence is replayed only through that saved sequence; later recorded
mission state is shown separately. If the prefix cannot be read, checkpoint proof
is unavailable rather than reconstructed from newer evidence. Current worktree
freshness is unobserved, and technical checkpoints still require operator product
review. AI assessments and project reviews are labeled claims from the same
integration, separate from deterministic checks and operator acceptance. Attention
includes saved blocking reasons and unresolved linked questions; answered Compass
questions are excluded. The HTML report carries these same boundaries alongside
the original goal, limits, usage and criterion results. Its read timestamp records
when the saved data was read, not a new verification or worktree audit. It never
refreshes itself; download another snapshot to see later saved progress. Unreported
or interrupted-turn token usage and monetary cost remain unavailable.

For a selected delegation, **Read project brief** opens the **Project morning
brief**. It leads with the selected goal, checkpointed outcome count, remaining
work and saved attention. **Open source mission in Live Trail** opens the actual
linked mission for an outcome or attention item. Each outcome shows its saved
status and criterion results. Expand
**Checkpoint provenance** or a criterion's provenance for the exact SHA, source
fingerprint, sequence and evidence references. **Latest recorded mission state**
is separately labeled and cannot replace unavailable checkpoint proof. The usage
section shows original limits, unique-mission totals and unknown remaining budgets
when history is missing; its expandable accounting retains the original clock.
These saved results do not establish current source freshness or operator product
acceptance.

An opened brief refreshes when delegation polling finds a newer saved revision,
when you choose **Refresh delegations**, after a successful **Reconnect runtime**
(even when its token stays the same), and when you return to the Delegations view.
Unchanged polling results do not reread the full brief. Linked mission events that
do not change the delegation revision appear on the next explicit refresh or return.
Only the active selection is read; changing delegations starts with a closed brief.
Leaving the view cancels pending reads. Refresh failures retain and label the
previous snapshot, with **Retry project brief** available. Brief loading and errors
do not disable delegation controls or clear preflight inputs or an uncertain
authorization request ID; use **Inspect saved authorization** to recover that
request before another submission.

In **Project morning brief**, choose **Download project report HTML** to save a
portable `.html` report for local reading. It sits beside **Export project brief
JSON** (`.json`) and **Export project brief Markdown** (`.md`). The HTML button
fetches `/api/delegations/:id/report`; the interface supplies the runtime token in
the `X-Iterfox-Token` request header, so no manual API request is needed. All three
downloads read the selected delegation's latest saved brief and retain the
original goal, limits and checkpoint provenance. Save the HTML file and open it
locally for offline reading. While any download is preparing, the download buttons
are disabled and a status message is announced. Failures appear in the brief and
can be retried with the same buttons. Changing
delegations or leaving the view cancels pending downloads. Temporary download links
and object URLs are released after use. The view wraps long goals, identifiers and
provenance at a 390px viewport, with keyboard-accessible buttons and expandable
details. Reading and exporting a brief never authorizes or resumes work.

Successful current checks and a matching ready project review are required before
checkpointing. Within the approved delegation, the host uses a private Git index
and makes local checkpoint commits under
`refs/iterfox/checkpoints/<delegation>/<outcome>`. The source HEAD/index and each
original run worktree stay unchanged. The following mission starts from that commit
with zero inherited evidence and a labeled historical handoff. This continuation
uses the existing approval and remaining aggregate budget; the coding agent does
not commit, reauthorize itself or choose a later outcome's contract. Product
acceptance, push, merge, deployment and publication remain operator decisions.
Even a fully checkpointed delegation still requires operator product review.
Checkpointed outcomes are technical results, separate from operator-reviewed
Project milestones.

Dependency preparation is optional and explicit: `environment.copyIgnoredPaths`
can contain only `node_modules`. The directory must already exist in the source
and be ignored by Git; the host makes a private copy preserving symlinks. No
dependency installation, arbitrary bootstrap program or network provisioning is
performed. General repository-environment provisioning remains outside this slice.

Blocked/failed missions retain their files and stop advancement. Protected edits,
unresolved operator decisions, exhausted aggregate limits, source drift, a changed
repository binding and uncertain mission creation never produce a checkpoint or a
new authorization. A checkpoint ref is reused only if its tree and parent match
the verified snapshot. Two delegation workers cannot own the same delegation.

## Validation boundary and current trial

The boundary suite has ten cases with an explicitly deterministic provider:
real Git/SQLite/Node verification, dependent handoff, fresh evidence, pause/resume,
aggregate limits, lease exclusion, protected edits, checkpoint-boundary recovery
and authenticated/idempotent HTTP approval. Two additional Chrome cases use a
labeled UI-only fixture; no model or worker is started by those cases. These are
bounded fixture checks, not evidence of real-model behavior or unattended
reliability. Dated earlier results in the READMEs and validation reports retain
their original scope. Their manual environment preparation, checkpointing and
reauthorization between missions describe those earlier trials, not a requirement
to prompt again for each outcome in an approved continuous delegation.

## Measured trial and delivered validation

The [three-outcome return-to-work trial](validation/continuous-project-real-20261020.html)
completed on 20 October 2026: three real Codex missions, one original authorization,
three local checkpoints and fresh cumulative sets of five, six and seven criteria.
A source review discovered one further documentation task after green checks.

One technical recovery by the coding assistant was necessary during the third
mission: the original 100 ms control monitor replayed all linked histories just
to inspect the clock. The assistant paused, preserved the original runtime and
resumed the same delegation with a separately frozen monitor fix. Shared limits,
authorization time, run IDs, source worktrees and existing checkpoints stayed
unchanged. Both worker starts and the explicit resume are recorded. A separate
earlier attempt failed before any model call and required a dependency-copy fix.
This is a recovered bounded trial, not a zero-intervention or overnight claim.

The delivered monitor checks control and a deadline derived from the original
authorization without replaying linked histories at each tick. Aggregate accounting
still runs at mission boundaries. Existing pause/resume and shared-limit checks
pass. The reviewed mobile header also keeps the full approved goal expandable so
status and the brief action remain accessible for long goals.

The protected original cases remain preserved with the actual trial. In the
reviewed delivery, `npm test` includes the three brief/report API cases alongside
existing tests: 86 passed and seven optional cases skipped. `npm run test:ui`
now runs eleven Playwright cases plus separate brief-download, offline HTML and
adversarial selection/network drivers. Those fixtures explicitly use a deterministic
provider; they do not measure model quality. They support the configured
`ITERFOX_BROWSER_CHANNEL`, or Playwright's bundled browser by default.

A separate read-only browser audit used the three completed Codex missions. It
checked JSON, Markdown and HTML downloads, checkpoint identity, desktop/390px,
offline HTML with JavaScript disabled, native details, no remote requests and no
history writes. Product acceptance remains an operator decision. Complete initial
configuration, a recurring scheduler and overnight resilience remain separate work.
