# Product hypothesis and competitive check

Checked 2026-10-16 against primary documentation and source. Names such as
AgentFlow are ambiguous; the visual coding workflow project below is the chosen
comparison, not every project sharing that name. No competitor was benchmarked.

| Product                                                                                              | Existing capability / inspected source                                                                                                                           | Implication                                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [Codex Goals](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)            | Persistent completion contracts, bounded continuation and evidence checks                                                                                        | Autonomy and acceptance language are already available.                                                          |
| [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)                                                | Programmatic threads; installed SDK types checked for streaming, schemas, cancellation and resume                                                                | Use the official integration rather than parse CLI prose.                                                        |
| [Ralph](https://github.com/snarktank/ralph/blob/main/ralph.sh)                                       | Bounded repeated invocations and textual completion marker; this implementation uses permissive flags                                                            | A loop is not differentiation. Iterfox retains the sandbox and owns verification.                                |
| [Symphony](https://github.com/openai/symphony/blob/main/elixir/lib/symphony_elixir/orchestrator.ex)  | Tracker-driven orchestration, isolated workspaces, retry scheduling and recovery; [spec](https://github.com/openai/symphony/blob/main/SPEC.md)                   | Do not rebuild a tracker integration or multi-issue dispatcher.                                                  |
| [Fabro](https://github.com/fabro-sh/fabro)                                                           | Workflow graphs, deterministic checks/fix loops, checkpoints, durable events, web UI and reports; [source tree](https://github.com/fabro-sh/fabro/tree/main/lib) | Strong overlap. Neither graph visualization nor evidence alone establishes an advantage.                         |
| [AgentFlow](https://github.com/v1xerunt/AgentFlow)                                                   | Visual role workflows, review/revise edges, interactive agent conversations                                                                                      | Avoid a general visual editor and provider catalog. Public repository scope is not proof of runtime reliability. |
| [AgentFlow Live](https://github.com/david-kijko/agentflow-live/blob/main/extension/src/extension.ts) | Agent event visualization and timeline/transcript views                                                                                                          | A live graph alone is already served.                                                                            |

Our testable hypothesis is that an acceptance graph independent of execution,
scoped evidence freshness, explicit verification provenance and a brief driven by
the same ledger will make an unattended result quicker to audit. The integrated
experience is a product hypothesis, not a claim of technical novelty or superiority.

For this MVP: one repository, sequential work, explicit acceptance configuration,
Codex only, local command verification. A failed runtime check is the trigger for
diagnosis and correction. The model cannot rewrite the contract. No automatic
merge, push or deployment. A builder claim always remains unverified.

See [validation](validation.md) for measured results and an honest comparison
protocol. User comprehension and competitive advantage remain unmeasured.

## 2026-10-18: evolving handoff before more execution infrastructure

The operator's actual workflow mixes product direction, implementation, design,
innovation and naming in incoming messages while an agent already implements.
A fixed-task throughput comparison does not measure this coordination burden.
The product hypothesis is reduced operator attention and rework during absence,
not a claim that a larger orchestration loop is cheaper than direct Codex.

Project Compass preserves all incoming instructions, asks the existing planner to
reconcile them in batches and holds only work dependent on operator decisions.
Planning context remains separate from approved acceptance. We chose one read-only
turn per changed batch, within the original budget, rather than periodic model
supervision. The Mac can own unattended execution; an optional server is unnecessary
for this workflow. This design is an implemented product hypothesis, not a claim of
technical novelty or a measured user-time advantage.
