# Validation — 2026-10-16

## What actually ran

The deterministic suite covers state guards, single activity/single worker,
transaction rollback and event ordering, dynamic corrective insertion, original
check retry, scoped freshness, protected tests/contracts, approved revisions,
interruption recovery, SDK-session retention, budgets, process cancellation, graph
reconstruction, HTTP/SSE projection, detached workers and Markdown/JSON briefs.
It launches real Node test commands. Only its **provider** is a deterministic DEMO.
The default suite skips the separately opted-in real integration test.

Real Chrome browser tests cover graph reconstruction after refresh, proof counts,
brief export, history-to-graph replay, criterion filtering, details, mobile width,
reduced motion and the explicit preflight action. Screenshots under `screenshots/`
were captured from the running UI using a DEMO ledger, not rendered from mock data.

## Real Codex integration — passed

The official `@openai/codex-sdk` **0.163.0** and its bundled CLI were used with
existing local Codex authentication. A read-only plan was generated with a JSON
schema, SDK thread IDs and usage were recorded, and the builder edited an isolated
worktree. The test explicitly asked to inspect before editing so the runtime could
observe a failure. This is an integration scenario, not a claim that every goal
necessarily follows the same path.

The recorded run completed after **131.5 seconds**, **6 agent turns** and
**342,078 reported input + output tokens**. The ledger contains a genuine failed
command check, a model-generated diagnosis, **1 inserted correction**, **2 stale
historical proofs**, and **2 current passing acceptance checks**. No manual
intervention was made after starting the bounded test. Monetary cost was not measured.
The local default model was not pinned, so these figures are not a repeatable
performance baseline across accounts or dates.

External integrations were disabled and the effective MCP server list was checked
before every SDK turn. The record excludes reasoning items. Local paths and session
IDs are redacted; ordering, outputs, file fingerprints and metrics are preserved:

- [Recorded real-Codex events and brief](validation/codex-real.json)
- [The real integration test](../tests/codex.test.ts)

An earlier trial correctly stopped after the original 100,000-token boundary was
exceeded by reported usage. A fresh test contract explicitly used a 500,000-token
ceiling. Budgets were not silently raised on the blocked run. This also exposed and
fixed a generic abort message that had hidden the budget reason.

Reproduce with an account you authorize to spend tokens:

```sh
npm ci
npm run build
mkdir -p .iterfox
ITERFOX_VALIDATION_OUT="$PWD/.iterfox/real-codex-validation.json" npm run test:codex
```

`ITERFOX_MODEL` can pin an available model. `ITERFOX_CODEX_PATH` can select an
installed compatible official CLI. The fixture is fresh each time, commands are
executed by the runtime and failed checks cannot be replaced with agent claims.
Real-Codex tests are not run in public CI or by `npm test`.

## Practical comparison

| Observation                         | Iterfox integration scenario            | One-shot Codex SDK reference           | Native Codex Goals | Fabro                             |
| ----------------------------------- | --------------------------------------- | -------------------------------------- | ------------------ | --------------------------------- |
| Actually executed here              | Yes                                     | Yes                                    | No                 | No — CLI not installed/configured |
| Independently verified criteria     | 2/2                                     | 2/2, checked by the measurement script | Not measured       | Not measured                      |
| Human interventions after start     | 0                                       | 0                                      | Not measured       | Not measured                      |
| Elapsed                             | 131.5 s                                 | 32.0 s                                 | Not measured       | Not measured                      |
| Reported tokens                     | 342,078                                 | 65,569                                 | Not measured       | Not measured                      |
| Agent turns                         | 6                                       | 1                                      | Not measured       | Not measured                      |
| Runtime-observed unexpected failure | 1, recorded; correction inserted        | No external correction was needed      | Not measured       | Not measured                      |
| Recovery test                       | Deterministic interruption tests passed | Not exercised                          | Not measured       | Not measured                      |
| User comprehension                  | Not measured                            | Not measured                           | Not measured       | Not measured                      |

The reference uses the same starting avatar source and approved tests, a single
Codex build turn with the high-level goal, the same tool restrictions, and an
independent post-run audit/check. The Iterfox integration prompt additionally
requires an initial inspection before editing. **These are not matched timing
benchmarks.** The small fixture favors a single turn. It would be misleading to
claim a speed, token or completion-rate advantage for Iterfox from these samples.

- [Recorded one-shot reference](validation/codex-baseline.json)
- [Reproducible measurement script](../scripts/compare-codex.ts): `npm run compare:codex`

Codex alone solved this example faster with less reported usage. Iterfox's
demonstrated result is a durable graph of decisions, centrally executed checks,
scoped invalidation and a report from the same state. Whether that reduces a
developer's return-to-work effort enough to justify overhead remains unproven.
Native Goals already provide evidence-based continuation. Fabro already provides
verification/fix loops, checkpoints, graphs and reports. See the
[source-based capability review](product-decisions.md); features in documentation
are not treated as measured performance or a full implementation audit.

## Matched comparison protocol to run next

1. Record the model, tool policy, OS, dependency state and exact versions/commits
   of Codex, Iterfox and [Fabro](https://github.com/fabro-sh/fabro). Use reviewed
   configurations and separate committed copies of `examples/avatar-lab`.
2. Give each tool the **same** goal and criteria. For Goals use its supported
   `/goal` interface from the [official guide](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex).
   For Fabro follow its current official setup and define build → command gates →
   bounded correction with its documented workflow syntax. Do not grant broader
   permissions to make a competitor work. The Fabro pipeline itself must be
   reviewed and recorded, as setup effort is part of the comparison.
3. Run at least five independent trials per setup and a larger realistic repository
   task. Record time, reported usage, interventions and setup minutes. Independently
   run unchanged acceptance checks for every tool. Never count task self-reports.
4. In a separate recovery trial, interrupt at an observed command boundary, preserve
   source and logs, then resume using each tool's supported procedure. Record missing
   evidence, repeated work, operator actions and any orphan-process handling.
5. Ask developers, with order randomized, to identify what passed, the cause of a
   plan change, stale proofs and remaining work. Measure answer accuracy and elapsed
   audit time. Do not substitute our opinion for user comprehension data.

That protocol is prepared, not executed. No Fabro, Ralph or Goals benchmark result
is invented. The next product decision should depend on this evidence; if the brief
and freshness controls do not improve audit accuracy/time, reduce their overhead
or integrate them into an existing orchestrator rather than expand the framework.

## Remaining quality-gate limits

- Visual checks compare actual Chromium captures to operator-reviewed baselines;
  they do not establish design quality. Qualitative assessments are probabilistic
  judgments by the same integration, labeled ASSESSED rather than PASS.
- Test/threshold/config changes cannot be autonomously approved. Prepare a reviewed
  commit and a new run for legitimate changes to protected verifier inputs.
- No automatic reboot continuation, monetary-cost accounting or guaranteed hard
  in-flight token cap. The SSH/systemd runner is implemented; its live host lifecycle
  remains unvalidated. SIGKILL may leave SDK descendants; operator
  inspection is required before resume.
- Fingerprints cover tracked/unignored files and user-declared scopes. Ignored
  dependencies, system tools and the inherited environment are not fully captured
  or made immutable. This is not adversarial verifier isolation.
- Performance, sustained real overnight operation, native Windows cancellation,
  and large repository/graph behavior have not been validated. The included CI
  workflow is prepared; no remote CI result is claimed before a push.

## Visual, qualitative and SSH runner extension — 2026-10-17

The extension is isolated on `feat/evidence-and-cloud` so another chat's checkout
and running tests can remain untouched. Validation used Node 22.21.1, macOS arm64,
Playwright 1.64.1 and installed Chrome 155.0.8059.80; no cloud host was provisioned.

- `npm run check`: **28 passed**, **3 explicitly skipped**, no failures; type checks
  and production build passed. Skips are the two optional real-Codex tests and the
  browser-dependent visual integration. The existing original real-Codex full-loop
  archive is still replayed by the offline suite; that expensive test was not rerun.
- `ITERFOX_BROWSER_CHANNEL=chrome npm run test:visual`: **2 passed**. An actual
  screenshot mismatch caused diagnosis/corrective insertion and a retry of the
  original pixel policy. The corrected capture had **0 differing pixels**. Missing/
  corrupt proof became STALE; artifact HTTP endpoints rejected altered bytes.
  Provider decisions in this scenario are labeled test fixtures; capture/comparison,
  subprocesses, Git, ledger and HTTP are real. PNGs were visually inspected.
- `ITERFOX_UI_TEST_PORT=4321 ITERFOX_BROWSER_CHANNEL=chrome npm run test:ui`:
  **3 passed**. Covers existing graph/replay/brief/preflight behavior, actual PNG
  thumbnails and artifact links, rubric scores/minima/provenance, and mobile width.
  Support receipts start collapsed; screenshots/diffs share a wider card. Actual
  desktop screenshots were inspected after this layout refinement.
- SSH tests cover literal argv/quoting, strict host keys, loopback tunnel binding,
  pinned preflight/contract, complete/incomplete exports, real artifact bytes,
  traversal/corruption rejection and a detached remote-agent DEMO finishing after
  its short-lived client exits. **The protocol test runs locally, without SSH.**
  The installable package was also installed from its tarball into a clean local
  directory: its compiled remote-agent launched a detached DEMO, both criteria
  passed after the agent exited, and its bundle was exported and read back.
  No live SSH transport, Linux sandbox, systemd/lingering or reboot result is claimed.

The production build retains the existing Vite advisory about a JavaScript chunk
above 500 KB; bundle splitting remains an optimization, not a validation failure.

### Real qualitative assessor — uncertainty correctly blocks

`ITERFOX_REAL_ASSESSOR=1 node --import tsx --test tests/assessment-codex.test.ts`
used the official Codex SDK on the actual three-turn transcript and two approved
rubric dimensions. Only assessment used a real model; planning/building were
explicit no-edit fixtures to isolate this integration.

The assessor returned after **22.5 seconds**, reporting **12,201 input + output
tokens**. It scored responsiveness **3/5** and clarity **4/5**, with approved minima
of **4/5** for both. It considered the shade preference insufficiently acknowledged
and returned **uncertain**. Iterfox recorded the report and produced **BLOCKED /
unverified**, with no deterministic PASS or automatic lowering of the rubric. The
integration test passed because it checks structured provenance and correct runtime
handling; the dialogue criterion itself **did not pass**. This is a useful observed
limit of the sample and the probabilistic assessor, not a quality guarantee.

[Recorded structured assessor result](validation/assessor-real.json) contains scores,
explanations, limitations and measured usage, without session IDs/private reasoning.
The default model was not pinned; no inference-speed or quality benchmark is claimed.

A second real assessor trial additionally attached the **actual corrected browser
PNG** using the SDK image input. It completed in **21.1 seconds**, reporting
**12,340 tokens**. The model described the round green avatar, light peach face
and dark eyes, rating the image dimension **4/5**. Dialogue responsiveness remained
**3/5**, so the overall result correctly remained **BLOCKED / unverified**. Planning
and building were still no-edit fixtures. [Recorded text + PNG result](validation/assessor-image-real.json).
Reproduce this variant with `ITERFOX_ASSESSOR_IMAGE=/absolute/path/to/captured.png
npm run test:assessor`. This confirms image transport and rubric handling, not
independent design review or general visual reasoning accuracy.

See [verifier behavior/setup](verification.md) and the [cloud deployment procedure](cloud-runner.md).
