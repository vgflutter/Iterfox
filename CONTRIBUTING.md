# Contributing

Use Node 22.13+ and Git. Run `npm ci`, `npm run check`, then
`npx playwright install chromium && npm run test:ui`.

The default test suite never calls Codex. `npm run test:codex` is an explicit,
metered integration check requiring local Codex authentication and network access.

Keep state transitions in the pure reducer and scheduling in the engine. The UI
must project recorded events. New success paths need evidence, and new failure
paths need bounded recovery tests. Never substitute a provider claim for a runtime
check or weaken sandbox settings to make a test pass.

Include the problem, resulting behavior and relevant validation in a pull request.
Screenshots should show the actual runtime; label fixtures DEMO.
