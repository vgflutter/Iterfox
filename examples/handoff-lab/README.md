# Evolving handoff laboratory

This deliberately incomplete fixture tests project supervision, not news production.
All stories are fictional. Its deliverables are text and local HTML, with no actual audio, video, publishing or current news.

Use the handoff below with real Codex (`--handoff handoff.txt`). The planner should hold the naming decision, finish the independent edition/preview, then wait. Answer the recorded question in Project Compass and resume within the original budget. A DEMO provider cannot interpret these instructions.

The deterministic checks cover structure, bounded content and basic escaping. They do not establish editorial quality, factual adequacy or visual appeal. Inspect the resulting edition and HTML yourself.

Generate a local preview from the completed isolated worktree:

```sh
node --input-type=module -e "import {buildEdition} from './src/edition.mjs'; import {renderEdition} from './src/preview.mjs'; import {writeFileSync} from 'node:fs'; writeFileSync('/tmp/iterfox-edition.html', renderEdition(buildEdition()));"
```
