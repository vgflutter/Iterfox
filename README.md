# Iterfox

**Delegate project development to your agent. Let Iterfox keep the work moving.**

[Italiano: come si usa](README.it.md) · [Agent runbook](docs/agent-guide.md) · [Documentation](docs/README.md)

Iterfox is a local supervisor for Codex. Give your assistant a project goal and a
work window. The assistant prepares a roadmap, checks and boundaries, then starts
Iterfox within your authorization. A background worker develops each approved
outcome, verifies it, corrects failures and continues to the next outcome.

You can close the conversation and browser. Return to a product you can inspect,
a record of what passed and a clear explanation of anything still blocked.

This is an **MVP**. Real applications have been delivered, but the long trial also
needed assistant-prepared recoveries. Full-night unattended reliability remains
to be demonstrated. [Measured results and limitations](docs/evidence.md).

## Use it through your assistant

An assistant with terminal access can operate Iterfox through its CLI. **You do
not need to write its JSON configuration or supply every next coding prompt.**
The assistant does that preparation; the detached worker owns continued execution.
Development inside Iterfox currently uses sequential Codex roles.

Start with a message like this:

> Use Iterfox to develop [project/result] in [repository path]. Prepare the
> roadmap, checks and environment yourself. Explain the proposed delivery,
> editable files and decisions reserved for me. Work within [duration] and the
> agreed boundaries. Once authorized, launch in the background, save a session
> receipt and return the usable result, evidence and remaining issues.
> Follow Iterfox's AGENTS.md and docs/agent-guide.md.

The workflow is:

1. **You describe the result.** The assistant reads the repository and prepares
   usable outcomes, fixed checks, edit boundaries and limits.
2. **You authorize that scope.** A preflight shows exactly what will run. Existing
   authorization applies; normal coding tasks need no new confirmation.
3. **Iterfox works.** Codex plans, builds, diagnoses failures and reviews progress.
   The runtime runs approved checks and checkpoints each completed outcome.
4. **You govern when needed.** Ask your assistant for status, give direction,
   pause or stop. The same controls are available in the graph.
5. **You inspect the delivery.** Read the report, try the product and decide how
   to integrate it. A checkpoint keeps code in an isolated Git worktree.

There is no automatic connection to an arbitrary chat or its Steer queue. This
workflow requires an assistant that can invoke the local CLI. The assistant should
save the delegation ID and absolute data/configuration paths in a session receipt
so another conversation can pick up the same job. [Exact agent procedure](docs/agent-guide.md).

## Install and try the interface

Requires **Node 22.13+**, npm and Git. Install from this checkout:

```sh
npm ci
npm run build
npm run demo
npm run iterfox -- ui --data .iterfox --port 4310
```

Open **http://127.0.0.1:4310**. This demo executes actual Node checks using an
explicitly scripted **DEMO provider**; it does not call a model. Select a graph
node, inspect the failed check and correction, then open Morning Brief or replay.
Real development needs working Codex authentication and network access.

Use `node /absolute/path/to/Iterfox/dist/cli.js` from an assistant, or install the
built checkout on your PATH with `npm install --global .` to use `iterfox`.
The [agent runbook](docs/agent-guide.md#try-the-two-outcome-example) includes a
complete two-outcome example and a preflight you can inspect without model calls.

## What the graph controls

| View                      | Use it for                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Delegations**           | The approved outcomes, prerequisites and checkpoints; pause/resume/stop the whole job.               |
| **Live Trail**            | Open a mission, select an activity or criterion, inspect evidence and send a contextual instruction. |
| **Project morning brief** | Results, open work, attention and downloadable reports.                                              |
| **Projects**              | Persistent project memory and a manually maintained roadmap. Saving it does not start work.          |
| **New run**               | Draft and authorize one mission from a goal or configuration.                                        |

The graph follows recorded events. Dragging or connecting nodes does not edit the
workflow. A recorded instruction influences planning at an activity boundary;
it cannot silently change approved checks or certify a result.

![Live Trail, recorded DEMO fixture](docs/screenshots/live-trail.png)

_Actual UI capture of the scripted DEMO, not a real-Codex validation run._

## The commands an agent uses

For a multi-outcome delegation, the assistant prepares `delegation.json`, then:

```sh
iterfox delegation preflight --config delegation.json --out preflight.json
iterfox delegation run --config delegation.json --preflight preflight.json --data /absolute/data --night --yes
iterfox delegation status DELEGATION_ID --data /absolute/data --json
iterfox delegation report DELEGATION_ID --data /absolute/data --format json
iterfox delegation pause DELEGATION_ID --data /absolute/data
iterfox delegation resume DELEGATION_ID --data /absolute/data --night
iterfox delegation stop DELEGATION_ID --data /absolute/data
iterfox delegation report DELEGATION_ID --data /absolute/data --format html --out result.html
```

Keep configuration, preflight and reports outside the target source repository.
Use the **same absolute data directory** for every command and for the UI.
`--yes` expresses authorization; `--preflight` pins the reviewed HEAD and parsed
configuration. Neither a preflight nor a generated configuration grants permission.
Preflight starts no worker and executes no checks. Reports read saved evidence;
they do not reverify current source. For a single mission use `iterfox run` with
`--project`; see [project development](docs/project-development.md).

## What runs while you are away

A detached local worker survives closing the browser, conversation or launching
terminal. **The computer must remain awake and connected.** On macOS the worker
requests idle-sleep inhibition; explicit sleep, shutdown and power loss interrupt
execution. A dead worker requires inspection and explicit resume; this is not an
OS service that restarts after reboot. You do not need a server for local work.

Within the authorized scope, Iterfox can revise implementation plans, fix defects,
rerun checks and move between outcomes without new user prompts. Known technical
interruptions have bounded automatic recovery. Original time/turn/token limits
persist across pauses and resumes. New permissions, acceptance changes and
reserved decisions remain under operator control.

The runtime records deterministic checks separately from screenshots and AI
judgments. An agent's “done” is not a passed check. Changed inputs can make earlier
proof stale. Qualitative review comes from the same Codex integration and is not
independent certification. [Verification](docs/verification.md) · [Safety and recovery](docs/safety.md).

## Current scope and evidence

The Svolta trial delivered a local project/task/week/time/backup app with **7 host
criteria and 8 additional audit groups passing**. It required four distinct
technical authorizations and three assistant-prepared continuations, without new
user development prompts or manual application-code edits. Useful work during
absence is observed; one uninterrupted autonomous night is not established.
[Full report, code and preserved failures](docs/validation/long-svolta-20261020/index.html).

The runtime is local and headless-first, with an optional browser UI. An SSH runner
for an existing host is implemented; a real Linux SSH/systemd deployment remains
unvalidated. There are no parallel agent teams, generic provider integrations,
automatic merges/deployments or monetary-cost estimates.

For contributors, `npm run check` runs type checking, deterministic tests and the
production build. Real-Codex tests are opt-in. [Contributing](CONTRIBUTING.md).

[Documentation index](docs/README.md) · [Architecture](docs/architecture.md) · [Roadmap](docs/roadmap.md) · [MIT license](LICENSE)
