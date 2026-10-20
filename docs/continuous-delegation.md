# Continuous project delegation

One authorization can cover a finite graph of project outcomes. The detached host
worker chooses the next eligible outcome, starts an isolated project-mode mission,
verifies it and stores a local Git checkpoint before continuing. Inside each
mission Codex plans, implements, diagnoses and reviews the result. The graph holds
outcomes and approved checks, rather than individual coding prompts.

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

The authenticated `GET /api/delegations/<id>/brief` returns a read-only aggregate
project brief as JSON. Add `?format=markdown` for a portable `text/markdown`
document, or `?format=json` for explicit JSON. Both use the existing local host,
same-origin and `X-Iterfox-Token` guards. Generating either format reads saved
records without recovering workers, launching missions, auditing evidence,
executing checks or writing history.

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
review. Attention includes saved blocking reasons and unresolved linked questions;
answered Compass questions are excluded.

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

**Export project brief JSON** downloads a `.json` document, and **Export project
brief Markdown** downloads a `.md` text document. Both fetch the selected
delegation's latest saved brief through the authenticated read-only routes above;
the runtime token stays in the request header. Downloads retain the original goal,
limits and checkpoint provenance. Preparing a download disables the export buttons;
failures appear in the brief and can be retried with the same buttons. Changing
delegations or leaving the view cancels pending downloads. Temporary download links
and object URLs are released after use. The view wraps long goals, identifiers and
provenance at a 390px viewport, with keyboard-accessible buttons and expandable
details. Reading and exporting a brief never authorizes or resumes work.

Successful current checks and a matching ready project review are required before
checkpointing. The host uses a private Git index and commits under
`refs/iterfox/checkpoints/<delegation>/<outcome>`. The source HEAD/index and each
original run worktree stay unchanged. The following mission starts from that commit
with zero inherited evidence and a labeled historical handoff. Product acceptance,
push, merge and deployment remain operator decisions. Checkpointed outcomes are
technical results, separate from operator-reviewed Project milestones.

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

The first boundary suite has nine cases with an explicitly deterministic provider:
real Git/SQLite/Node verification, dependent handoff, fresh evidence, pause/resume,
aggregate limits, lease exclusion, protected edits, checkpoint-boundary recovery
and authenticated/idempotent HTTP approval. Two additional Chrome cases use a
labeled UI-only fixture; no model or worker is started by those cases. The actual
Codex development trial is recorded separately when it has finished.
