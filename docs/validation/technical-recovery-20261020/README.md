# Technical recovery validation — 20 October 2026

The final real run is `20261020T202008-6d7c8eb4`, using the backend in implementation
commit `6e62254` on `feat/bounded-technical-recovery`. Its seven source hashes match
`runtime-hashes.json`. The earlier successful trial remains in
`first-trial-result.json`; its transport classifier predates the final conservative
credential/permission filter. Neither trial was resumed by the assistant.

The driver deliberately aborts the first builder response after real reported usage.
The model completed that API turn; the supervisor did not accept its structured
answer. This tests a lost-result boundary, not an observed spontaneous API outage.
The separate timeout and process-lifecycle cases use explicit local test providers
and a fake CLI through the actual SDK, without model/network calls.

`framework-check.log` and `recovery-cases.log` preserve the complete final test run:
96 passed, 7 optional tests skipped, including ten recovery cases. `browser-check.log`
records 11 Chrome cases and three additional browser flows. `browser-audit.mjs`
checked the final real run at desktop/mobile sizes without altering its ledger.
The offline report and its links, images and receipts were also checked in Chrome.

Native Markdown exports and logs are preserved byte-for-byte, including trailing
whitespace emitted by the runtime or test tools. Source changes pass Git's whitespace
check with this archived evidence directory excluded. Do not reformat the raw proof
files: their bytes are part of `manifest.json`.

`trial-driver.mjs` is the exact archived driver, with local experiment paths. For a
new trial, prepare a separate empty experiment directory and a frozen runtime from
the reviewed commit, then adapt the paths before running. Do not overwrite this
experiment. The full local frozen runtime and SQLite ledger remain under
`.iterfox/missions/technical-recovery-20261020-r2` in the source workspace.

This is a short fault-injection validation. A full overnight session, physical mobile
device, screen-reader use and real remote Linux host were not tested in this follow-up.
