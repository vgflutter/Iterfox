# Operate Iterfox from an agent

This runbook is for an assistant with terminal access to the machine running
Iterfox. The user describes a project in conversation; you prepare and operate
the delegation. The user does not need to author JSON or keep sending coding
prompts. Any assistant able to invoke the CLI can act as this outer operator;
the current runtime executes development through **Codex only**, sequentially.
There is no built-in connection to another chat's queue, general agent adapter
or MCP control server. Your outer chat may end after the detached worker starts.

## 1. Establish the job

Read the repository and existing tests. Translate the user's goal into a small
finite roadmap of **outcomes**, with observable checks and prerequisites. For
each outcome say what the user can actually do when it is delivered.

Prepare the technical configuration yourself. Explain the goal, outcomes, checks,
editable files, reserved decisions and work window in plain language. Use existing
authorization for the agreed scope; request only missing decisions or permission.
Do not treat `--yes` or a generated preflight as authorization from the user.

The source must be a clean Git repository with a committed HEAD. Preserve unrelated
user work. Only committed source enters the isolated missions. Install required
dependencies beforehand; the runtime does not install them. For delegations,
`environment.copyIgnoredPaths: ["node_modules"]` can privately copy an already
prepared, ignored dependency tree into each mission. Otherwise leave it empty.

## 2. Prepare the configuration and session receipt

Use [the complete two-outcome example](../examples/avatar-lab/delegation.json)
as a schema example. It targets a **separate copy of the avatar fixture**; do not
point its relative paths at an unrelated repository. Replace the goal, repository,
criteria, edit boundaries, outcomes and limits for a real project.

Important fields:

| Field                            | Meaning                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `repository`                     | Git repository root; use an absolute path in real sessions.                                                                           |
| `contract.goal`                  | The overall result, including any reserved decisions.                                                                                 |
| `contract.criteria`              | Approved IDs, titles and exact check argument arrays. The host executes them in the mission worktree.                                 |
| `allowedPaths`, `protectedPaths` | Relative literal file/directory prefixes, not globs. Built-in protections still apply.                                                |
| `supervision`                    | Use `{"mode":"project","maxReviews":20}` for review against the whole outcome after checks.                                           |
| `limits`                         | Shared duration, turns and reported-token allowance; attempt, turn-timeout and no-progress bounds also apply.                         |
| `milestones`                     | Outcome IDs, titles, desired results, criterion IDs and acyclic `dependsOn` prerequisites. Every criterion must belong to an outcome. |

Each following mission receives the earlier code and **cumulative checks**, with
fresh evidence. Check scopes must include all relevant inputs; omit `scope` for
conservative whole-repository freshness. Checks are trusted executable programs,
not text: inspect them and do not weaken them to get green results.

Store configuration and operational files **outside the target repository** so
they do not make its source dirty. Keep a small `session.json` containing the
absolute CLI path, repository, data directory, configuration path, preflight path,
source HEAD, configuration hash, delegation ID and latest known run/checkpoint.
This is an agent-maintained receipt, not a file Iterfox generates automatically.
Never store credentials there. Use the same absolute `--data` directory throughout.

## 3. Inspect without starting work

Examples below assume Iterfox is built and these shell variables have been set:

```sh
ITERFOX_CLI=/absolute/path/to/Iterfox/dist/cli.js
ITERFOX_SESSION=/absolute/path/to/session-files
ITERFOX_DATA=/absolute/path/to/iterfox-data

node "$ITERFOX_CLI" delegation preflight \
  --config "$ITERFOX_SESSION/delegation.json" \
  --out "$ITERFOX_SESSION/preflight.json"
```

Preflight validates the schema, clean repository and committed HEAD. It writes
only the requested output file, creates no ledger/run, executes no checks and
calls no model. Inspect `spec`, `expectedHead`, `specHash`, `permissions` and
`limits`. It is a configuration/source check, not proof that dependencies,
authentication, checks or the proposed plan will work.

## 4. Launch within the user's authorization

```sh
node "$ITERFOX_CLI" delegation run \
  --config "$ITERFOX_SESSION/delegation.json" \
  --preflight "$ITERFOX_SESSION/preflight.json" \
  --data "$ITERFOX_DATA" --night --yes
```

`--preflight` refuses a different committed HEAD or normalized configuration.
It does not grant permission. `--yes` applies the authorization already obtained
for that scope. Without it, an interactive terminal asks; noninteractive launch
fails rather than inventing consent.

Save the printed **Delegation ID** immediately in the receipt. Launch output is
human-readable; `status` and `report` provide JSON for subsequent tool use. If the
launch response is lost, list delegations in the same data directory and inspect
their source HEAD, hash and authorization time before any retry. CLI launch has
no user-supplied idempotency key; a blind repeated `run` can create a second job.

The detached parent worker creates missions, verifies results, records local
checkpoint commits and moves to the next eligible outcome. It can continue
without this chat, browser or launching terminal. It cannot run through explicit
sleep, shutdown or power loss. On macOS it requests idle-sleep inhibition.

## 5. Observe and steer

Set `DELEGATION_ID` to the ID saved in the receipt, then:

```sh
node "$ITERFOX_CLI" delegation status "$DELEGATION_ID" --data "$ITERFOX_DATA" --json
node "$ITERFOX_CLI" delegation report "$DELEGATION_ID" --data "$ITERFOX_DATA" --format json
node "$ITERFOX_CLI" ui --data "$ITERFOX_DATA" --port 4310
```

The graph is available at `http://127.0.0.1:4310`: **Delegations** shows outcomes;
**Open mission in Live Trail** shows implementation and checks. **Projects** stores
project memory and a manually maintained roadmap; saving a project does not launch
a delegation. Nodes expose real evidence. Selecting a node and sending an
instruction records context; it does not directly rewrite execution or acceptance.

For the current mission, get its `runId` from delegation `stages`, confirm it is
the active running mission, and set `RUN_ID` accordingly:

```sh
node "$ITERFOX_CLI" steer "$RUN_ID" --data "$ITERFOX_DATA" \
  --message "Prioritize one complete usable flow before visual polish."
node "$ITERFOX_CLI" brief "$RUN_ID" --data "$ITERFOX_DATA" --json
```

Instructions reconcile at an activity boundary. They apply to that mission, not
all future outcomes. There is no parent-delegation steering command; a changed
roadmap or contract needs a separately reviewed configuration/authorization.
Do not steer the child and separately resume it while its parent owns execution.
Use parent controls for the whole job:

```sh
node "$ITERFOX_CLI" delegation pause "$DELEGATION_ID" --data "$ITERFOX_DATA"
node "$ITERFOX_CLI" delegation resume "$DELEGATION_ID" --data "$ITERFOX_DATA" --night
node "$ITERFOX_CLI" delegation stop "$DELEGATION_ID" --data "$ITERFOX_DATA"
```

Pause/stop are requests: inspect status until the owning worker exits before
resuming. Known transport failures and timeouts can recover automatically at most
twice per mission, after owned processes exit and source is audited. A dead worker,
invalid/protected edits, exhausted budgets or reserved decisions need inspection.
Resume preserves the original wall-clock deadline, including pauses. Diagnose a
block before retrying; never silently enlarge the window or edit the ledger.

`status` may record recovery for dead workers; mission `status`/`brief` may audit
evidence. Use `delegation report` when a saved-record read without recovery or
worktree inspection is required.

## 6. Return a delivery the user can assess

```sh
node "$ITERFOX_CLI" delegation report "$DELEGATION_ID" \
  --data "$ITERFOX_DATA" --format markdown --out "$ITERFOX_SESSION/result.md"
node "$ITERFOX_CLI" delegation report "$DELEGATION_ID" \
  --data "$ITERFOX_DATA" --format html --out "$ITERFOX_SESSION/result.html"
```

Reports use the same saved-record generator as the UI. JSON includes `status`,
`completedOutcomeCount`, `outcomes` with criteria/evidence/checkpoint references,
`attention` and usage. They do not execute checks, call a model or certify current
source freshness. HTML works offline; referenced artifact files are not bundled.
`--out` writes the named file and replaces it if it exists.

Tell the user, in their language:

1. What they can now use, with a real launch/preview command or path.
2. What was verified, and what is an AI judgment or remains unobserved.
3. What failed, recovered or required your intervention.
4. Where the code, diff, checkpoint and report are; what still needs their decision.

Inspect `outcomes[].checkpoint` and the linked run's worktree before describing the
delivery location. A technical checkpoint does not integrate code into the source
branch. Integration, push and deployment follow the user's actual authorization.

## Try the two-outcome example

From the Iterfox checkout, with Node, npm and Git installed:

```sh
npm ci
npm run build
ITERFOX_HOME="$PWD"
ITERFOX_CLI="$ITERFOX_HOME/dist/cli.js"
ITERFOX_SESSION="$(mktemp -d /tmp/iterfox-agent-example.XXXXXX)"
ITERFOX_DATA="$ITERFOX_SESSION/data"
mkdir "$ITERFOX_SESSION/repository"
cp "$ITERFOX_HOME"/examples/avatar-lab/*.mjs "$ITERFOX_SESSION/repository/"
cp "$ITERFOX_HOME/examples/avatar-lab/delegation.json" "$ITERFOX_SESSION/delegation.json"
cd "$ITERFOX_SESSION/repository"
git init -q
git add .
git -c user.name='Example operator' -c user.email='example@iterfox.local' \
  commit -qm 'Initial fixture and fixed regression checks'
node "$ITERFOX_CLI" delegation preflight \
  --config "$ITERFOX_SESSION/delegation.json" --out "$ITERFOX_SESSION/preflight.json"
```

The example's `repository: "."` resolves to this new repository. Inspect the saved
preflight, then use step 4 from the **same working directory** if real Codex work
is authorized. That launch needs working Codex authentication/network and consumes
model usage. This is a tiny fixture, not a full-night benchmark. For a scripted
demo without model calls, use `npm run demo` from the Iterfox checkout instead.
