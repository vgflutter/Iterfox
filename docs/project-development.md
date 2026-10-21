# Autonomous project development

The primary outcome is useful verified progress while the developer is absent.
The developer supplies the project direction and boundaries, not every next prompt.
Token efficiency is not the product's primary success measure.

## The development loop

Enable project development in **New Run** (selected by default), configure
`supervision` in the acceptance configuration, or pass `--project` in the CLI:

```sh
iterfox run --repo /path/to/project --config /path/to/project/iterfox.json \
  --project --handoff /path/to/direction.txt --night --yes
```

The authorized loop is:

1. Inspect the goal, repository and operator context; plan a useful implementation.
2. Implement sequentially, run approved checks and correct failures.
3. At a verified milestone, inspect the actual result against the whole project
   goal. Read source, receipts and available approved screenshot artifacts.
4. If a concrete gap remains, discover and execute the next implementation units
   without waiting for another user message. Existing green checks do not skip this
   work: they are a regression floor, not the entire project goal.
5. Repeat until the goal is ready for the operator, the work window ends, an
   authorized limit is reached or no independent progress remains without an
   operator decision. The worker is independent of the browser and terminal.

Reversible implementation and design choices are delegated to the agent and
recorded. An explicitly reserved decision stays with the operator; other useful
work continues. The goal, allowed edit paths, protected files, regression gates and
permissions remain the authorized boundaries. No automatic push, merge or deploy.
The agent does not invent unrelated features just to fill time.

An empty initial plan is not the completion condition. A project checkpoint must
consider the result ready, and the approved gates must still be current. The
checkpoint is an AI judgment from the same integration, not independent evidence
or a guarantee that every product requirement is satisfied.

## An overnight work window

For an eight-hour window, a configuration can include the following. Keep the
actual project's goal, criteria and path permissions around these fields, review
the resulting preflight, then authorize it once:

```json
{
  "supervision": { "mode": "project", "maxReviews": 40 },
  "limits": {
    "maxDurationMs": 28800000,
    "maxTurns": 250,
    "maxTokens": 100000000,
    "turnTimeoutMs": 1200000,
    "maxAttempts": 4,
    "maxNoProgress": 4
  }
}
```

This is a configuration fragment, not a standalone runnable contract. CLI
`--project` enables supervision but preserves the configuration's existing limits;
it does not silently enlarge a previously configured work window. Limits exist to
bound malfunction or repeated work. A session can finish earlier when the goal is
ready; it does not perform filler work for the remaining hours. Resume preserves
elapsed wall time and limits. On a Mac the worker inhibits idle system sleep;
explicit sleep, shutdown and network/service outages can still interrupt it.

## What is stored and shown

Each checkpoint records:

- The inspected Git HEAD and whole-worktree fingerprint, contract version,
  operator-note IDs and direction revision.
- Concrete goal gaps tied to existing source files and known evidence IDs.
- Provisional autonomous choices and their stated basis.
- Next implementation units, linked findings and regression criterion IDs.
- A ready assessment or a specific decision that needs the operator.

`project.reviewed` atomically stores the result and creates discovered tasks.
Responses persist before that append and can be reused after an interruption.
Project Compass shows checkpoints and choices; Live Trail shows real discovered
work; Morning Brief exports the history and outstanding decisions. No extra user
message is needed to move from a finding to implementation.

The runtime rejects fabricated file/evidence references, unknown or held criteria,
cyclic dependencies, empty continuations and completion without a current project
review. Current approved PNG receipts are hash-checked before at most six are
attached for supervisor inspection. They remain labeled observed evidence. A
read-only reviewer changing the source blocks the run. Review/attempt/no-progress
limits prevent endless cycling.

## Verification handoff

Builder commands run inside the Codex sandbox, while the runtime executes the exact
approved checks on its host. An agent-local `EPERM` opening a localhost listener,
an unavailable browser or an unobserved model API call is not evidence that the
implementation needs new permissions. Builders can return a structured
`verificationRequest` naming existing plain-command criterion IDs and continue
with `blocked: false`. The runtime validates those IDs and gathers current proof.
Negative probes defer diagnosis while planned implementation remains; they never
become a PASS from the builder's statement. Genuine protected edits, unauthorized
actions and reserved operator decisions still require `blocked: true` and cannot
be combined with a verification handoff. The handoff adds no commands or permissions.

## Present scope

The supervisor can develop and improve the approved code and deliverables, discover
further work toward that goal and make reversible choices. It cannot silently widen
protected edit paths, rewrite acceptance tests or authorize a deployment. Existing
contract-revision controls remain available for deliberate boundary changes.

This is not a direct connection to another chat's Steer queue. Project Compass
provides optional additional direction; the autonomous loop does not depend on
new instructions arriving. Qualitative judgments remain probabilistic, and checks
cover only their declared inputs. No all-night reliability result is claimed yet.
The real trial and deterministic/browser checks are documented in
[validation](validation.md).
