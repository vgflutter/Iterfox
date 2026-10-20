# Safety and operational limits

## Authorization and isolation

`run` prints a preflight. An interactive operator types `yes`; `--yes` is explicit
authorization of that printed contract and its commands. The UI requires a reviewed
preflight and a separate **Authorize & start Night Run** action. It always starts
real Codex; the no-token fixture is an explicitly named CLI demo.

Every run creates an `iterfox/<id>` branch and a worktree from the repository's
committed HEAD. Uncommitted source work is not copied or reset. Ordinary single-run execution does not commit. A continuous delegation explicitly
authorizes the host to create verified local checkpoint commits under
`refs/iterfox/checkpoints/<delegation>/<outcome>` with a private Git index. Original
source and run HEAD/index remain unchanged; coding agents cannot commit. There is
no automatic push, merge, deployment, cleanup, dependency installation or secret edit.
Prepare dependencies in the isolated worktree yourself when required by your checks.

The builder uses Codex `workspace-write`, no command network access and
`approvalPolicy: never`. Here `never` denies escalation; it does not grant permission
or disable the sandbox. A denied operation must be reported as blocked. Planning and
diagnosis and qualitative assessment use `read-only`. Managed Codex requirements still apply; incompatible
requirements block the run rather than being overridden with broader permissions.

Codex apps, plugins, hooks, browser/computer/image tools and sub-agents are disabled
for this slice. Before each turn, Iterfox enumerates MCP servers using the official
CLI's structured JSON, disables each by name, and confirms none remain enabled.
Failure to inspect/enforce that policy blocks execution. This matters because
external tool integrations are separate from the command sandbox; see the
[official security cookbook](https://learn.chatgpt.com/docs/enterprise/security-cookbook).
MCP IDs that cannot be safely addressed with CLI dotted overrides must be renamed
or disabled by the operator. A compatible CLI can be selected with
`ITERFOX_CODEX_PATH=/absolute/path/to/codex`.

## Trusted checks and protected contracts

Verification commands are explicit user-approved argv arrays, run without an
implicit shell. The model cannot propose a new check executable. Commands are
trusted local code and inherit the operator's environment: they are **not** placed
inside the Codex sandbox. Tests can execute arbitrary code. Do not approve untrusted
repositories, shell wrappers, package scripts or commands. Use an OS/container boundary
when that is required; this MVP does not create one for verification.

The runtime blocks results if the agent changes HEAD, edits outside allowed paths,
changes tests/specs, acceptance files, package/configuration/lock files, ignore rules,
agent settings or obvious secret/key files. These are post-execution integrity
checks, not a filesystem permission system. They cannot undo external effects or
detect every malicious test bypass inside permitted application code. Review the diff.

The operator can propose and explicitly approve a new contract version while no
worker is alive. Prior evidence is invalidated and the original version is retained.
Codex cannot approve changes. For legitimate test/config edits, prepare a reviewed
commit yourself and start a fresh run; autonomous test editing is not implemented.

Evidence records argv, output (last 64,000 characters), exit code, duration, Git HEAD,
contract version and content fingerprints. Scope prefixes are literal relative paths,
not glob patterns. An empty scope means all tracked/unignored files. Include all
relevant inputs; omitted transitive dependencies cannot be inferred automatically.
Changes outside an explicitly declared scope retain evidence. Unknown validity and
relevant changes become STALE. Status/brief reads and the UI periodically audit idle
worktrees, so external edits can make a previously completed run PARTIAL.

## Budgets and stopping

Each contract limits agent turns, verification failures per criterion, consecutive
builds without a changed fingerprint, wall-clock duration and per-turn time.
The duration includes paused time. Resume does not silently reset limits or retries.
Only an explicitly approved revision can change the contract's limits.

Reported tokens include input plus output, including cached input. Token limits are
checked before starting another model turn; they are not a hard in-flight spend cap.
After a reported-token/turn boundary, runtime-only checks can still certify already
implemented work within the original duration limit. Further model work, including
qualitative assessment or diagnosis, remains blocked. An
interrupted turn may not report usage. Monetary cost is not estimated. A coding
model may require substantial context even for a small task.

Pause/stop abort the SDK call or verifier. Local check process groups receive
termination and a bounded kill fallback on macOS/Linux. SIGINT/SIGTERM requests a
safe pause; the current activity becomes BLOCKED, with no fictitious RUNNING node.
Stop is resumable through an explicit operator action; original budgets remain.

## Local persistence and recovery

The worker is separate from the UI. `--night` starts a detached local Node process
and redirects output to `.iterfox/logs/<id>.log`. Closing the page or launching
terminal does not stop it. Signing out of the OS, machine sleep/shutdown, a process
kill, disk failure or loss of Codex connectivity can interrupt work. This is not an
OS service and does not restart itself after reboot.

Keep the computer awake using your OS settings; on macOS an operator may use
`caffeinate -i` in a separate terminal for the intended work period. Do not claim that
local work continues while the machine is asleep.

SQLite uses WAL and synchronous FULL commits. Per-run event sequences and a database
lease prevent concurrent workers for the same run. A dead worker is reconciled to
BLOCKED when status/the UI next reads it. Recovery does not pretend an interrupted
check passed. Resume rebuilds projections from events, rechecks fingerprints, and
retries incomplete activities, retaining SDK thread IDs when available.

After SIGKILL, an SDK child or grandchild may outlive the worker. Inspect the recorded
worktree and OS process list; terminate any orphan work for that run **before**
resuming. The SDK does not offer an orphan-process ownership API. PID reuse can
conservatively refuse recovery; verify process ownership rather than force another
worker. Do not edit the SQLite ledger to bypass a live-worker check.

```sh
node dist/cli.js status --data /absolute/path/to/.iterfox
node dist/cli.js events RUN_ID --data /absolute/path/to/.iterfox
node dist/cli.js resume RUN_ID --night --data /absolute/path/to/.iterfox
node dist/cli.js brief RUN_ID --out morning.md --data /absolute/path/to/.iterfox
```

Use the same absolute `--data` directory across terminals. Keep the ledger, WAL,
worktree and Codex session files. Back up SQLite using its backup facilities or
while all writers are stopped; copying only the database during a run can omit WAL
records. Session data contains local paths, code diffs and test output. Keep it private.

The HTTP server binds only `127.0.0.1`, validates Host and Origin, and requires an
unguessable same-origin token for mutation. It has no remote authentication and must
not be exposed through a public proxy or public port forward. The SSH runner
uses a loopback-only tunnel to the same port; see [cloud setup](cloud-runner.md). Trusted same-user processes
can access the ledger. Windows process-tree cancellation and unattended operation
have not been validated; macOS is locally validated and Linux is covered by CI configuration.

## Additional verification policies

Visual policies start only the approved argv server and capture only a loopback HTTP
origin in a real browser, with the browser sandbox enabled. Baselines are protected
operator inputs and never auto-approved. Screenshots, baseline copies, diffs and
reports have immutable receipts. Qualitative policies use an explicit bounded rubric
and selected text/PNG files. They can satisfy their own criterion as ASSESSED, not
deterministic PASS; uncertainty blocks. The same integration performs assessment.

Declared baseline/assessment files are always fingerprinted, including ignored
files; symlinked selected inputs are refused. Current evidence also depends on
artifact size/hash integrity. This does not freeze system libraries, browser versions
or every transitive dependency. See [verification](verification.md) for exact limits.
