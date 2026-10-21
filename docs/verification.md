# Visual and qualitative acceptance

Each criterion retains an approved `command`. Without a `verification` policy,
the existing command verifier is unchanged. A visual/qualitative criterion first
requires this command to exit zero, then applies its extra policy. Commands and
optional local web-server argv are trusted programs; review them in the preflight.

## Visual reference checks

```json
"verification": {
  "kind": "visual",
  "server": ["node", "server.mjs"],
  "url": "http://127.0.0.1:4357/",
  "selector": "#avatar",
  "baseline": "baseline.png",
  "viewport": {"width":800,"height":600},
  "maxDiffRatio": 0.001,
  "pixelThreshold": 0.1,
  "colorScheme": "light"
}
```

Playwright captures an actual Chromium screenshot with fixed viewport, device
scale, locale, timezone, reduced motion and blocked service workers. Only the
approved loopback HTTP origin is allowed; other-origin requests and WebSockets
are blocked and prevent a pass. Page errors also prevent a pass. The optional
server is started with literal argv and terminated after capture. Without `server`,
you must provide the running local app yourself. Use a dedicated unused port.

The runtime records an **observed** screenshot receipt, then a **deterministic**
pixel comparison with `pixelmatch`. PASS means dimensions match, pixel difference
is within the approved ratio, and capture reported no page errors/blocked requests.
It does not mean the design is attractive, accessible, semantically correct or
fully exercised. `pixelThreshold` is the per-pixel color sensitivity, not the
allowed proportion of changed pixels. Anti-aliased edge pixels are excluded.

The baseline is an operator-approved input, automatically protected from builder
edits even if a broad allowed path contains it. Missing baselines block the run.
They are never generated or updated to make a failing acceptance check pass.
Candidate capture deliberately writes **outside** the project and refuses overwrites:

```sh
# From this package root; first copy visual-lab to its own project directory.
iterfox capture reference --repo /path/to/visual-lab \
  --config /path/to/visual-lab/reference.json --out /tmp/avatar-candidate.png
```

Open and inspect the candidate from the protected `/approved` page. If it is the
intended reference, copy it to `/path/to/visual-lab/baseline.png` and commit the
fixture and baseline in that project's own Git repository. Then run its `iterfox.json`.
Its `index.html` intentionally has square corners, while the protected reference
is round. **Do not use `reference.json` as the coding goal**; it is for capture only.

Install a browser with `npx playwright install chromium`, or use
`ITERFOX_BROWSER_CHANNEL=chrome` with locally installed Chrome. The Ubuntu CI
browser job installs and uses this channel so the system AppArmor profile can
permit Chrome's sandbox; the runtime still launches with `chromiumSandbox: true`.
See the [Chromium explanation of Ubuntu namespace restrictions](https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md).
Keep the same
browser, OS, fonts and dependencies for reference and run. Receipts record browser
version, platform, viewport, baseline hash, actual/baseline/diff PNGs and a JSON report.
Cross-platform visual equivalence is not assumed. See the primary Playwright
[screenshot](https://playwright.dev/docs/screenshots) and
[snapshot](https://playwright.dev/docs/test-snapshots) documentation.

## Qualitative rubric checks

```json
"verification": {
  "kind": "qualitative",
  "files": ["dialogue.txt", "portrait.png"],
  "rubric": [
    {"id":"responsive","description":"The reply directly acknowledges the other speaker's stated preference.","minScore":4},
    {"id":"clear","description":"The exchange is concise and understandable without confusing repetition.","minScore":4}
  ],
  "instructions":"Evaluate only the supplied transcript and image; state uncertainty."
}
```

The sequential Codex assessor receives the command output and explicitly selected
UTF-8 text/PNG inputs. Images use the official SDK's `local_image` input. Input
snapshots and the structured report are stored as artifacts outside the code
worktree. Text files are limited to 128 KB, PNG inputs to 4 MiB, and the rubric to
12 unique dimensions with operator-defined minimum scores from 1 to 5.

The model returns a 0–5 score and explanation for each approved rubric ID, summary,
limitations, and `sufficient`, `insufficient` or `uncertain`. The runtime validates
the schema/IDs and enforces thresholds. It neither lets the model change the
rubric nor interprets a claim of sufficiency as enough when scores are too low.

- Sufficient with every threshold met → **ASSESSED**, purple and distinct from PASS.
- Insufficient or below threshold → FAILED, bounded diagnosis/correction and the
  original rubric are used again.
- Uncertain or invalid/missing evidence → BLOCKED with operator attention; no
  guessed success and no automatic weakening of the contract.

The assessor is a read-only role of the **same Codex integration**, not an
independent reviewer. Its judgments are probabilistic and can be wrong. A run may
complete when all its configured policies are satisfied, including qualitative
criteria, but its brief separately counts deterministic verification and AI
assessment. An AI assessment cannot satisfy a required deterministic criterion.
The avatar DEMO provider does not silently impersonate an assessor.

`examples/qualitative-lab` provides a short dialogue and explicit rubric. In the
recorded real text and text-plus-PNG assessor trials its preference acknowledgment was judged uncertain;
Iterfox preserved the report and blocked acceptance. See [validation](validation.md).

## Freshness and artifacts

Every final receipt binds contract version, Git commit, code/input fingerprint,
scope and artifact hashes. Declared baseline/assessment files are included even
when outside an explicit scope or ignored by Git. Symlinked input files are refused.
Inputs must stay unchanged throughout verification; commands should report on
existing files rather than generate changing files inside the worktree.

Relevant edits, input changes, missing/corrupt artifacts or a contract revision
make a current PASS/ASSESSED receipt STALE. Status, brief and the UI audit idle
runs; the active worker owns its own audits. Historical observed receipts remain
snapshots, not current acceptance. Artifact endpoints look up recorded IDs, enforce
directory boundaries and check size/hash before serving bytes. The UI shows real
thumbnails, diff links, rubric scores, approved minima and limitations.

This is provenance and ordinary integrity checking, not adversarial execution
isolation or a complete capture of tools, dependencies and environment. Other
transitive dependencies still need appropriate declared scopes and review.
