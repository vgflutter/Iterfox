# Iterfox

**Delegate the work. Wake up to evidence.**

Iterfox is a local, acceptance-driven supervisor for Codex. Give it a goal and
checks you trust. It builds a plan, runs work sequentially, verifies results itself,
and inserts corrective tasks when checks fail. Return to an evidence ledger and a
Morning Brief instead of a long conversation.

This is an early working MVP. Only Codex is supported. It does not automatically
push, merge or deploy. A completed agent turn is not a passing acceptance check.

![Actual Live Trail showing a recorded DEMO run](docs/screenshots/live-trail.png)

_Real UI screenshot of the labeled DEMO fixture: a failed command check caused a
corrective task, invalidated an earlier proof, and triggered a recheck. The screenshot
is not a real-Codex run. Real integration evidence is linked below._

## Quickstart

Requires **Node 22.13+**, npm and Git. macOS is locally validated; a Linux/macOS CI
matrix is included. Native Windows unattended execution has not been validated.
Node 22 may print an experimental warning for its built-in SQLite module.

Install from this source checkout; no npm release is assumed:

```sh
npm ci
npm run build
npm run demo
npm run iterfox -- ui
```

Open **http://127.0.0.1:4310**. The demo makes a fresh small Git repository, runs real
Node tests, fixes two fixture defects with a **DEMO** provider, and consumes no model
tokens. Its provider behavior is intentionally scripted; the production engine is not.
Use the graph, click a node, inspect the Proof Ledger, or replay the recorded failure.

To add the CLI to your local PATH after building:

```sh
npm install --global .
iterfox status
```

You can always use `node /absolute/path/to/Iterfox/dist/cli.js` without a global install.

## Run real Codex

The official SDK includes a Codex CLI. It uses your existing Codex authentication;
you need a Codex account/login or a supported API-key setup and network access to
the Codex service. Iterfox does not store or ask you to paste credentials. Authenticate
with your installed official `codex login` if needed. See the
[official SDK documentation](https://learn.chatgpt.com/docs/codex-sdk).

```sh
# Same fixture, real Codex. Review the printed preflight and type yes.
npm run iterfox -- demo --codex

# A real repository, with explicit authorization of the reviewed configuration.
node /path/to/Iterfox/dist/cli.js run \
  --repo /path/to/my-project \
  --config /path/to/my-project/iterfox.json \
  --data /path/to/my-project/.iterfox \
  --night --yes
```

Only committed HEAD is copied into a separate `iterfox/<run-id>` worktree. Your
uncommitted source work stays intact. Prepare any dependencies needed by the checks
in that worktree yourself; the runtime does not install packages or grant network
access to agent commands. Missing dependencies produce failed checks or a blocker.

`ITERFOX_MODEL` optionally selects a model available to your account.
`ITERFOX_CODEX_PATH` optionally selects an absolute path to a compatible official CLI.
The runtime disables external integrations and verifies MCP restrictions before each
turn. Unsupported CLI/configuration combinations are blocked with an actionable error.

## Define what success means

Commit a configuration with explicit command checks. For example:

```json
{
  "goal": "Fix the parser without changing its public behavior or weakening tests.",
  "criteria": [
    {
      "id": "parser",
      "title": "Parser regression suite passes",
      "command": ["node", "--test", "tests/parser.test.mjs"],
      "scope": ["src", "tests", "package.json"],
      "timeoutMs": 60000
    }
  ],
  "allowedPaths": ["src"],
  "protectedPaths": ["tests", "package.json", "iterfox.json"],
  "limits": {
    "maxTurns": 12,
    "maxAttempts": 3,
    "maxDurationMs": 3600000,
    "maxTokens": 500000,
    "turnTimeoutMs": 180000,
    "maxNoProgress": 3
  }
}
```

Scopes are literal file/directory prefixes. Omit `scope` for a conservative
whole-repository fingerprint. Include all relevant inputs when narrowing it.
Commands run as trusted local programs with exact argv, without an implicit shell.
Review commands and repository code before approving them.

The runtime owns acceptance state, checks, retry limits and scheduling. Codex can
propose work but cannot change the contract or certify its own implementation.
Test/config/secret edits and out-of-scope changes block further certification.
Fingerprints make affected proofs STALE; unrelated scoped evidence remains valid.

## A run you can understand

- **Live Trail:** execution activities and separate acceptance nodes, linked to
  evidence; real events over SSE; zoom, criterion filtering, grouped checks and
  reduced-motion support. Planner, builder and diagnosis are sequential roles of
  the same Codex integration, not independent reviewers.
- **Proof Ledger:** command, exit code, output, elapsed time, contract version,
  Git HEAD and input fingerprints. Deterministic evidence is separated from agent
  claims. Historical failed/stale checks remain visible.
- **Morning Brief:** accomplished criteria, open work, failures, corrections,
  plan decisions, resources, uncertainty and the worktree diff. Export Markdown or JSON.
- **Decision replay:** rebuild any recorded event boundary without rerunning an
  agent or spending tokens. Pause, resume and stop are available in the UI and CLI.

![Actual Morning Brief for the DEMO fixture](docs/screenshots/morning-brief.png)

## Working commands

```sh
iterfox run --config iterfox.json              # interactive preflight
iterfox run --config iterfox.json --night --yes # explicitly authorize detached work
iterfox status                                # list runs; audit idle evidence
iterfox status RUN_ID --json
iterfox ui --port 4310
iterfox pause RUN_ID
iterfox resume RUN_ID --night
iterfox stop RUN_ID
iterfox events RUN_ID
iterfox brief RUN_ID --out morning.md
iterfox brief RUN_ID --json --out morning.json
iterfox contract RUN_ID --propose revised.json
iterfox contract RUN_ID --approve --yes
```

All commands accept `--data /absolute/path/to/.iterfox`. Use the same directory
across terminals. Contract revisions require a paused/stopped/blocked run and an
explicit operator approval; old versions and invalidated proofs remain in history.

`--night` runs a detached local worker with a SQLite event ledger. Closing the page
or the launching terminal is safe. **A local worker cannot execute during sleep or
shutdown.** It is not an auto-starting OS service. After an interruption, inspect
the worktree and any orphan subprocesses, then explicitly resume. Budgets persist
across resumes. Read [safety and recovery](docs/safety.md) before unattended use.

## Validation and honest limits

```sh
npm run check                  # type checks, deterministic tests, production build
npx playwright install chromium
npm run test:ui                # real browser checks against a local fixture
npm run test:codex             # OPT IN: real Codex, tokens and authentication required
npm run compare:codex          # OPT IN: single-turn Codex reference measurement
```

On a machine with Chrome installed, `ITERFOX_BROWSER_CHANNEL=chrome npm run test:ui`
uses it instead of downloading Chromium. CI does not call real Codex or require secrets.

The real Codex integration has been exercised through a failing check, diagnosis,
dynamic correction and verified completion. See [recorded evidence and measured
results](docs/validation.md), including the one-shot Codex reference. This small
fixture does **not** establish a competitive advantage. Codex alone completed it
with less time and reported usage in the recorded sample. Goals and Fabro remain
unmeasured practical comparisons; a reproducible protocol is documented.

Available acceptance gates are command checks. Observed artifacts and qualitative
AI review are not implemented as acceptance verifiers. No automated visual/avatar
assessment, cloud runner, workflow editor, parallel agents, automatic test-change
approval, hard in-flight spend ceiling or monetary cost estimation is claimed.
Passing configured checks does not prove the absence of other bugs.

See [architecture](docs/architecture.md), [product decisions and sources](docs/product-decisions.md),
[safety](docs/safety.md), [roadmap](docs/roadmap.md) and [contributing](CONTRIBUTING.md).

MIT licensed. No proprietary orchestration service is required; real runs depend
on Codex and its authentication/service availability.
