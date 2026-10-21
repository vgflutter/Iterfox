# Working with Iterfox

Iterfox is a local supervisor for prolonged, sequential Codex development. It can
be operated by an assistant with terminal access; its graph is an optional view
and control surface over the same persisted work.

## Operating a project through Iterfox

When the user asks you to use Iterfox, read [the agent runbook](docs/agent-guide.md).
Prepare the configuration, checks and environment yourself from the user's goal.
Explain the proposed result and boundaries in ordinary language. Honor existing
authorization; do not ask the user to write JSON or approve every coding task.

Use the public CLI for preparation, launch, status, control and reports. Keep the
absolute CLI/config/data paths, approved HEAD/hash and delegation ID in a session
receipt outside the source repository. Reopen that receipt in a later conversation.
Inspect existing status after uncertain launches rather than blindly launching again.
Never edit the SQLite ledger or reuse a test driver as a production launcher.

The outer assistant controls the delegation. The inner coding agent cannot approve
contracts, extend limits, modify protected checks or accept its own results. When
working _inside an Iterfox-managed mission_, follow the supplied mission and
contract; do not launch nested Iterfox delegations.

## Developing this repository

Read [README.md](README.md) for the product and [CONTRIBUTING.md](CONTRIBUTING.md)
for implementation conventions. Use `npm run check` for runtime changes; default
tests use explicit fixtures and do not call Codex. UI changes also need the
relevant browser checks. Real-Codex tests are opt-in.

Keep acceptance transitions in the reducer, execution in the engine and the UI
derived from recorded events. Preserve historical failure receipts. Deterministic
PASS, observed artifacts and AI assessments are different types of evidence.

Document commands that actually exist. Update the English and Italian entry guides
when the operator workflow changes. Keep long trial logs in `docs/validation/`,
with a short explanation in [the evidence index](docs/evidence.md).
