# Project Compass: an evolving handoff

Project Compass is a working experimental layer above the acceptance runtime. It
addresses the developer who keeps adding strategy, implementation, design and
naming instructions while a coding agent is already working.

The operator leaves context; Iterfox preserves each note and reconciles the batch
at an activity boundary. It can replace unstarted work without discarding completed
work or silently changing the approved goal, checks, permissions or budget.

## The smallest useful workflow

1. Authorize a run with an existing acceptance configuration. Add a plain-language
   handoff: the outcome to inspect when you return, settled choices and ideas still
   needing evidence. This replaces the ordinary initial planning call.
2. Add requests, decisions or hypotheses in **Project Compass**, even while a
   builder is active. The current activity finishes first; new context is applied
   at the next boundary. Use Pause when the current activity must stop immediately.
3. The read-only planner returns a focus, a concrete next-artifact target,
   provisional assumptions, remaining implementation units and one disposition for
   every active note: **In the plan**, **Later**, or **Your decision**.
4. A question can hold specified criteria and their declared dependent work.
   Independent work runs sequentially and is checked by the runtime. When only
   questions/dependent work remain, the run becomes BLOCKED with its progress kept.
5. Answer the actual question with a linked reply, then resume. An unlinked new
   instruction cannot silently erase a previously open question. Original limits
   still apply; resume does not extend the budget or duration.
6. Return to the Morning Brief for acceptance evidence, current direction,
   provisional assumptions, deferred ideas and unanswered questions.

“In the plan” records handling of a request, not completion. “Next artifact” is a
target, not an observed result. Tests and selected rubric evidence still determine
acceptance. An agent's strategic or editorial judgment remains probabilistic.

## CLI and UI

```sh
iterfox run --repo /path/to/repo --config /path/to/repo/iterfox.json \
  --handoff /path/to/handoff.txt --night --yes
iterfox ui --data /path/to/.iterfox
iterfox steer RUN_ID --message "Produce a complete preview before polishing naming."
iterfox steer RUN_ID --kind hypothesis --message "Three minutes may be a suitable duration."
iterfox steer RUN_ID --kind decision --reply-to NOTE_ID --message "Use Faro as the name."
iterfox resume RUN_ID --night
```

Use the same `--data` directory on every command. `--handoff` imports one text note
(up to 4,000 characters) and shows it in preflight. The UI offers an optional
handoff in New Run and individual notes in Project Compass. The API is
`POST /api/runs/:id/direction`, protected by the existing same-origin token policy.
Notes are bounded to 64 entries and 64,000 total characters per run. Completed or
failed runs require a new run for a new goal. Saving on a paused/blocked/stopped
run does not start a worker; resume explicitly.

The labeled DEMO provider does not understand free-form instructions. It explicitly
defers them; use real Codex for semantic planning. The browser fixture's parked
question is a clearly labeled deterministic test, not a model-quality evaluation.

## Continuity on a Mac

Night workers already run independently of the browser and launching terminal.
On macOS, the worker requests idle-system-sleep inhibition with the built-in
`caffeinate -i -w <worker-pid>` helper. The helper is released when the worker exits.
This does not prevent explicit sleep, shutdown, battery exhaustion, network outages
or a forced process kill. If the helper cannot start, the event history records
that the Mac must be kept awake manually. Other platforms require their own host
power settings. No server is required when the Mac remains operational.

## Cost and persistence

Reconciliation shares the ordinary planner's read-only Codex integration. There is
no background polling model or per-step supervisor call. An initial handoff takes
one planning turn; each new batch costs one reconciliation turn. Messages arriving
during reconciliation remain pending for a subsequent snapshot. Each turn is
charged to the original time/turn/token limits. A stream of new instructions can
therefore consume the budget; no automatic budget extension is implemented.

Notes, source snapshots, structured planner results and plan replacements are
SQLite events. Replacing unstarted work and creating its replacement tasks is one
atomic append. Recovery can reuse a completed response for the same snapshot.
Replay reconstructs direction without further model calls. Superseded tasks retain
an explicit reason and are not reopened when old evidence becomes stale.

## Current limits

The planner's classification, prioritization and dependency declarations are AI
judgments. The runtime validates schemas, source coverage, known criterion IDs,
dependency cycles and linked operator replies; it cannot prove semantic adequacy.
The original protected checks may miss a product requirement. No automatic new
acceptance-policy generation or approval is implemented.

An incoming request takes effect after the current activity, not in the middle of
a Codex turn. A blocked builder caused by permission/integrity failures still
stops the run. The decision-parking path is produced during planning. No connection
to another Codex chat's Steer queue is implemented: enter context in Iterfox or its
CLI. The first slice records an artifact target and links to existing verification
results; it does not automatically render every arbitrary product artifact.

The bounded real trial is documented in [validation](validation.md). It is not an
all-night soak, user study or evidence of a net competitive advantage. The next
product test should measure developer interventions, rework after late decisions,
verified progress during absence and time to review the morning result.

## Direction is not the work queue

Project Compass now sits alongside [autonomous project development](project-development.md).
A note is optional additional direction, not a requirement to unlock each next task.
With project supervision enabled, the engine reviews actual milestones and discovers
remaining goal work even when there are no new messages and regression checks pass.
Its main success measure is useful progress during the developer's absence.
