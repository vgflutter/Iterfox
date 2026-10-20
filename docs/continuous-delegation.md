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
