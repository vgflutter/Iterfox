# Cloud runner over SSH

Iterfox can run on an existing Linux host. The ledger, worktree, Codex authentication
and worker stay on that host. Your Mac only starts work and displays the UI. No
cloud vendor, paid server creation, Docker daemon or credential upload is required.

**Validation status:** transport argument/quoting tests, preflight pinning, result
export, integrity checks and a detached remote-agent protocol test passed locally
on macOS. A real SSH host, Linux systemd lifecycle, reboot and sustained overnight
execution have **not** been tested in this checkout. These instructions are a
deployment procedure, not a claim of a deployed cloud service.

## Prepare an existing host

Use an ordinary unprivileged account, Node **22.13+**, Git, SSH, persistent disk and
Linux **systemd 254+** user services. Keep the host awake. Authenticate Codex **on that host**
using the official CLI's normal login. Local credentials are never copied by Iterfox.

Build/package this checkout locally:

```sh
npm ci
npm run build
npm pack --pack-destination /tmp
```

Transfer the resulting `iterfox-0.1.0.tgz` through your normal reviewed SSH workflow.
On the host, unpack it in `/home/runner/iterfox` and run `npm install --omit=dev`
there; the package already contains `dist`. Alternatively clone this branch on
the host and run `npm ci && npm run build`. Do not copy a macOS `node_modules` tree
to Linux. Commit the project and its acceptance contract on the host. Iterfox
does not clone projects or install their build dependencies inside worktrees.

For visual checks install the package's matching browser and Linux libraries:

```sh
cd /home/runner/iterfox
npx playwright install --with-deps chromium
```

This setup step may need an administrator to install OS libraries. Browser capture
keeps Chromium's sandbox enabled. Resolve host sandbox support instead of disabling
it. Baselines depend on browser/OS/rendering environment; approve a Linux baseline
on the host if a macOS image differs. See [verification](verification.md).

The default `systemd` launcher creates transient user services using `systemd-run
--user`. Have the host administrator enable lingering for the runner account:

```sh
sudo loginctl enable-linger runner
```

Lingering lets that user's services survive the last SSH logout. Start/resume
refuses systemd execution if lingering cannot be verified. These units use
`Restart=no`: an interrupted task needs an explicit resume after inspection.
Codex authentication must be available to the user service, not only a temporary
SSH shell. Units use the absolute Node/package paths in the target file. If using
an API key or model settings, configure the remote user's service environment
through your existing secret-management process. The runner does not transfer keys.

## Connect and run

Copy [`deploy/cloud.example.json`](../deploy/cloud.example.json) to a private local
`cloud.json` and replace its host and absolute paths. This file contains locations,
not passwords. SSH must already work with normal keys/agent authentication and a
verified host key in `known_hosts`. Iterfox uses `BatchMode=yes` and
`StrictHostKeyChecking=yes`; unknown hosts fail instead of being silently trusted.

```sh
iterfox cloud doctor --target cloud.json
iterfox cloud run --demo --target cloud.json
iterfox cloud status --target cloud.json
iterfox cloud run --target cloud.json
```

`doctor` reports Node/platform, systemd version, user-service availability and lingering. It does
not verify Codex credentials or certify a whole deployment. Start with `--demo`
to exercise the remote lifecycle without model tokens. A real `run` fetches the
remote preflight and asks you to authorize the displayed commands/limits. `--yes`
can explicitly authorize it in automation. The start request pins both the approved
Git commit and a SHA-256 of the parsed contract; changes require a fresh preflight.
The isolated worktree is created at the pinned commit, even if a branch moves later.

```sh
iterfox cloud status RUN_ID --target cloud.json
iterfox cloud pause RUN_ID --target cloud.json
iterfox cloud resume RUN_ID --target cloud.json
iterfox cloud stop RUN_ID --target cloud.json
iterfox cloud brief RUN_ID --target cloud.json
iterfox cloud fetch RUN_ID --target cloud.json --out ./download-RUN_ID
```

`fetch` creates a **new** directory with `brief.md`, `events.json`, `changes.diff`
and captured artifacts. Artifact bytes and SHA-256 receipts are checked before
writing; existing output directories are refused. It does not apply the diff,
change the local checkout, push or merge. It exports up to 32 MiB of artifacts;
download individual larger run collections through the UI. Hashes check integrity
against the ledger, not the trustworthiness of the host or model judgments.

## Open the UI

```sh
iterfox cloud ui --start --target cloud.json
```

This starts the remote localhost UI if needed, verifies that it serves the expected
data directory, and opens an SSH tunnel. Visit **http://127.0.0.1:4320**. Both ends
use the target's `port` so Host/Origin protections remain effective. If that local
port is busy, select a free port in the target file for both ends. The sidebar
identifies the execution host. Keep the tunnel command open while viewing; closing
it leaves the remote worker/service running. Later use `cloud ui` without `--start`.
No public listener, reverse proxy or web authentication service is created.

On the host, inspect services with:

```sh
systemctl --user status iterfox-run-RUN_ID
journalctl --user -u iterfox-run-RUN_ID
systemctl --user status iterfox-ui-4320
systemctl --user stop iterfox-ui-4320
```

Transient completed units are collected. The durable event ledger remains in the
configured data directory. After host failure/reboot/hard kill, inspect worktrees,
orphan processes and remaining budgets, then explicitly resume. An automatically
restarted UI does not resume interrupted coding work.

For hosts without systemd, `"serviceManager":"detached"` uses the local detached
worker implementation. Logout survival then depends on host/session policy and is
not guaranteed by detaching alone. Use it only after validating that policy. No
container recipe is included: Docker was present locally but its daemon was not
running, and a container sandbox/volume deployment has not been validated.

Implementation references: official systemd documentation for
[transient services and literal arguments](https://github.com/systemd/systemd/blob/main/man/systemd-run.xml)
and [user lingering](https://github.com/systemd/systemd/blob/main/man/loginctl.xml).
The runner disables systemd environment expansion and refuses percent specifiers
in paths, preserving literal remote command arguments. Workers launched/resumed
from the remote UI use the same service launcher as the CLI.
