# Project brief

Delegation: c59044fd-9fc4-4362-bfd5-2f35522c4d47; saved status: COMPLETED; revision: 8.
Saved update: 2026-10-20T18:45:29.838Z; report observed at: 2026-10-20T19:09:29.075Z.

1/1 outcomes checkpointed; 0 pending. Repeated cumulative checks do not count as additional outcomes.

Product review required: true. Not established by technical checkpoints; operator product review is required.

## Original goal

```text
Finish and independently review Custode from the preserved interrupted candidate. Read BRIEF.md for the original approved product goal. Inventory, maintenance, backup API and interface already exist; inspect actual code and current evidence rather than rebuilding them. Finish only material remaining integration, recovery/error states and truthful README/guide gaps, then request fresh host checks and a source-based ready review. The preceding independent absence trial stopped during an aborted Codex call; this is a separately authorized recovery, not a continuation with a reset clock. Own reversible decisions, do not ask for routine choices. Preserve protected acceptance and all earlier behavior. No network, dependencies, publication, push or merge.
```

## Original authorization and limits

Authorized at: 2026-10-20T18:28:10.237Z. Approval hash: e7c7f110e0fa0289c7c0e0b42ccfc71b78d6cc73726e4bf26b443ecbb75d9eda. Original source HEAD: 7dc07f5cd1e3faf5ae946caf084762f72d45ebc3.
Repository: /Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-source; provider: codex.

```json
{
  "maxTurns": 80,
  "maxAttempts": 5,
  "maxDurationMs": 7200000,
  "maxTokens": 100000000,
  "turnTimeoutMs": 1200000,
  "maxNoProgress": 8
}
```

## Shared usage and remaining budgets

5 reported turns; 3227317 reported tokens. Totals cover all linked missions.

Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable.

```json
{
  "turns": 5,
  "tokens": 3227317,
  "runIds": [
    "20261020T182810-4cfa5d18"
  ],
  "unavailableRunIds": [],
  "complete": true,
  "missions": [
    {
      "runId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "turns": 5,
      "tokens": 3227317
    }
  ],
  "authorizedAt": "2026-10-20T18:28:10.237Z",
  "observedAt": "2026-10-20T19:09:29.075Z",
  "elapsedMs": 2478838,
  "authorizationDeadline": "2026-10-20T20:28:10.237Z",
  "remainingDurationMs": 4721162,
  "remainingTurns": 75,
  "remainingTokens": 96772683,
  "accounting": "Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable."
}
```

## Attention

No saved blocking reason or unresolved linked question is recorded in the available history.

## Outcomes

### Complete the preserved Custode product (complete-return)

Saved outcome status: CHECKPOINTED. Source run: 20261020T182810-4cfa5d18.

```text
Inspect the existing preserved candidate against BRIEF.md. Finish material missing error recovery, archive-change integration and factual user guidance; do not repeat implemented features or polish indefinitely. Verify all six fixed host checks and resolve real gaps before returning ready.
```

Prerequisite outcomes: none.

#### Recorded checkpoint

Checkpoint SHA: c11af3764f1deec8a596daa235c8dc85f983d1c8
Ref: refs/iterfox/checkpoints/c59044fd-9fc4-4362-bfd5-2f35522c4d47/complete-return
Source fingerprint: 9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad
Source sequence: 103; recorded at: 2026-10-20T18:45:29.828Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T182810-4cfa5d18",
    "seq": 103,
    "eventId": "a6b67f38-9610-48be-bbaa-8b0aab654816",
    "at": "2026-10-20T18:45:29.415Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- inventory: Inventory API stores valid searchable data across a process restart — PASSED; evidence ID: 4662d120-ac7a-487e-b0b8-4378d560394e.

```json
{
  "id": "inventory",
  "title": "Inventory API stores valid searchable data across a process restart",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "inventory"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "inventory",
    "title": "Inventory API stores valid searchable data across a process restart",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "4662d120-ac7a-487e-b0b8-4378d560394e",
  "evidence": {
    "id": "4662d120-ac7a-487e-b0b8-4378d560394e",
    "nodeId": "4c6737a7-555a-4ac6-8d7f-28f636212a5d",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:26.709Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:26.702Z\"}\n",
    "durationMs": 318,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 85,
        "eventId": "f9c3cb90-c958-4e11-a23d-0440615ed99c",
        "at": "2026-10-20T18:43:26.769Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- inventory-ui: Accessible responsive inventory supports create/search/edit and reload — PASSED; evidence ID: 456bd0c1-aad1-4827-980a-5a5c8e89694e.

```json
{
  "id": "inventory-ui",
  "title": "Accessible responsive inventory supports create/search/edit and reload",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "inventory-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "inventory-ui",
    "title": "Accessible responsive inventory supports create/search/edit and reload",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "456bd0c1-aad1-4827-980a-5a5c8e89694e",
  "evidence": {
    "id": "456bd0c1-aad1-4827-980a-5a5c8e89694e",
    "nodeId": "fc13f99d-4fb3-45d7-9018-073eedd78962",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:28.872Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:28.862Z\"}\n",
    "durationMs": 2036,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 87,
        "eventId": "785f4425-c31b-4cc9-bf01-67ebcaa20d75",
        "at": "2026-10-20T18:43:28.932Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- maintenance: Linked one-off and recurring maintenance has civil-date and durable history semantics — PASSED; evidence ID: cc4cd09b-e185-49b5-8fa7-e05d94aa5926.

```json
{
  "id": "maintenance",
  "title": "Linked one-off and recurring maintenance has civil-date and durable history semantics",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "maintenance"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "maintenance",
    "title": "Linked one-off and recurring maintenance has civil-date and durable history semantics",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "cc4cd09b-e185-49b5-8fa7-e05d94aa5926",
  "evidence": {
    "id": "cc4cd09b-e185-49b5-8fa7-e05d94aa5926",
    "nodeId": "21454498-4dc3-4c52-a135-c859586234a2",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:29.328Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:29.321Z\"}\n",
    "durationMs": 318,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 89,
        "eventId": "af49d3a6-2bc1-443d-b5a4-08c030a74100",
        "at": "2026-10-20T18:43:29.381Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- maintenance-ui: User can schedule and complete maintenance end-to-end — PASSED; evidence ID: 347ce7f1-7a27-4745-a065-2e1a763998b2.

```json
{
  "id": "maintenance-ui",
  "title": "User can schedule and complete maintenance end-to-end",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "maintenance-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "maintenance-ui",
    "title": "User can schedule and complete maintenance end-to-end",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "347ce7f1-7a27-4745-a065-2e1a763998b2",
  "evidence": {
    "id": "347ce7f1-7a27-4745-a065-2e1a763998b2",
    "nodeId": "a31b0aab-d471-4ebe-9a79-8d397da1e509",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:31.253Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.239Z\"}\n",
    "durationMs": 1788,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 91,
        "eventId": "8ffc7149-8b0e-4eb0-889d-11eab746af2e",
        "at": "2026-10-20T18:43:31.306Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- backup: Exact backup/restore is validated, atomic and documented — PASSED; evidence ID: 613f5d6a-01f4-4c92-984c-2afbfee21fd4.

```json
{
  "id": "backup",
  "title": "Exact backup/restore is validated, atomic and documented",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "backup"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "backup",
    "title": "Exact backup/restore is validated, atomic and documented",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "613f5d6a-01f4-4c92-984c-2afbfee21fd4",
  "evidence": {
    "id": "613f5d6a-01f4-4c92-984c-2afbfee21fd4",
    "nodeId": "efbab4e6-785d-49e0-9fe4-cbe52c8abe3e",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:31.711Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.705Z\"}\n",
    "durationMs": 321,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 93,
        "eventId": "2ffd0031-cc2d-4f30-b8ef-8f9608fe2e60",
        "at": "2026-10-20T18:43:31.763Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- backup-ui: User downloads and explicitly confirms data replacement in the interface — PASSED; evidence ID: dfc15702-8037-482f-a4f5-c027dc7c1f82.

```json
{
  "id": "backup-ui",
  "title": "User downloads and explicitly confirms data replacement in the interface",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "backup-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T182810-4cfa5d18",
  "sourceSeq": 103,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "backup-ui",
    "title": "User downloads and explicitly confirms data replacement in the interface",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "dfc15702-8037-482f-a4f5-c027dc7c1f82",
  "evidence": {
    "id": "dfc15702-8037-482f-a4f5-c027dc7c1f82",
    "nodeId": "5caaaf6e-97e6-4bfb-bd52-3c09f4f54566",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:33.836Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:33.822Z\"}\n",
    "durationMs": 1986,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 95,
        "eventId": "387bf3e9-9855-48df-8a41-fc1d99183658",
        "at": "2026-10-20T18:43:33.890Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

#### Evidence at this boundary

Evidence IDs, source run/sequence, contract versions, original timestamps and code stamps are retained below. AI assessments remain distinct from deterministic checks.

```json
[
  {
    "id": "4a632096-faa0-40e9-81e8-0aed4e3339d0",
    "nodeId": "b86da686-f3a4-492d-af5a-07f049b6c12a",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:21.386Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:21.380Z\"}\n",
    "durationMs": 314,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 11,
        "eventId": "312e5dca-33ba-41d4-b22a-cc6cc284744e",
        "at": "2026-10-20T18:30:21.425Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "78e2245b-e984-4610-af83-4a84e1054cbb",
    "nodeId": "55224526-1b27-4aad-b0e6-05abdb882260",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:23.066Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:23.056Z\"}\n",
    "durationMs": 1637,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 13,
        "eventId": "258e8aa1-e431-45c8-887f-432d11884799",
        "at": "2026-10-20T18:30:23.105Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "8c0b4708-839c-4f7c-928f-ac54a32c9e41",
    "nodeId": "60a8f1cb-512c-417f-b651-426d5e14e6c3",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:23.424Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:23.417Z\"}\n",
    "durationMs": 317,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 15,
        "eventId": "a06484ec-098a-458b-a542-90523bd9e029",
        "at": "2026-10-20T18:30:23.465Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "51e1e000-9a09-4594-8f63-0fd2fd726c2a",
    "nodeId": "d771bd89-f533-4b00-b1e9-6668d9b00ba9",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:25.276Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:25.266Z\"}\n",
    "durationMs": 1806,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 17,
        "eventId": "f95cb21d-9821-4f95-ae05-5d245169b0e7",
        "at": "2026-10-20T18:30:25.314Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "e28d87b9-e774-4d4a-9d17-59b9f4a9767c",
    "nodeId": "c5d6e8d7-67da-4807-bd22-5b137861a9b5",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:25.642Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:25.634Z\"}\n",
    "durationMs": 321,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 19,
        "eventId": "f9d74c5a-0e14-4131-a52d-e36c578c2184",
        "at": "2026-10-20T18:30:25.683Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d597e306-3203-4c52-bc5a-638ba35bee96",
    "nodeId": "a9a874ea-ceaf-4177-9dd5-1def8a0eab85",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:30:27.708Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:30:27.698Z\"}\n",
    "durationMs": 2017,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "0bec981f3308415340624a2ea3ebf55e4858d18c544620cb579e86e24e2b7c4a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "5baa34856e5ad0a16eb82e504132d3013b75c7919ca46af91de6063b4d3d87aa",
        "public/styles.css": "8e46008a500cf20c42d290904477f64d17fb893024445fef346a7aa3659064c3",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "f0c268743c131f0d72310dd0d30cb8b8d308305d791e942b3fde57722f8ad7ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 21,
        "eventId": "932b67ed-7b39-49f4-9dad-8693c775dfaf",
        "at": "2026-10-20T18:30:27.748Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d45062fe-f029-4352-b526-1e1fb6b18194",
    "nodeId": "c52889d0-c60d-43b2-af8d-b7d130ddd0a7",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:35.082Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:35.075Z\"}\n",
    "durationMs": 313,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 35,
        "eventId": "809efa20-5123-4a8b-b1cd-87e4237061fc",
        "at": "2026-10-20T18:34:35.123Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "60f4e99b-1ee4-4d61-9fc3-fce7306015e4",
    "nodeId": "eab40447-f69c-4e7f-9030-492ef23a7950",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:36.826Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:36.817Z\"}\n",
    "durationMs": 1684,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 37,
        "eventId": "13ac809a-99a4-4ff2-831d-5d31e0c5a6e1",
        "at": "2026-10-20T18:34:36.870Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "94ee23c5-8f17-4c23-8614-175e9210b655",
    "nodeId": "ae71d418-26be-43db-94d6-16c8a634dfc1",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:37.205Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:37.199Z\"}\n",
    "durationMs": 315,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 39,
        "eventId": "132e0fc2-ab10-48b6-8217-a856085ebcdb",
        "at": "2026-10-20T18:34:37.247Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "8b8cc29d-a591-4f6b-82b6-47d9af9599fc",
    "nodeId": "4701d11e-8ad0-4665-b06e-6ca0864b7a29",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:39.056Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:39.047Z\"}\n",
    "durationMs": 1790,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 41,
        "eventId": "47b3f456-7f4b-4b5e-9cbd-3cb7bc5724d6",
        "at": "2026-10-20T18:34:39.099Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "37cb8350-7a74-4f05-8f5b-18c7a515b699",
    "nodeId": "3465dd85-5fbc-4493-8bfb-dec852f3ac27",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:39.445Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:39.438Z\"}\n",
    "durationMs": 320,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 43,
        "eventId": "9e770ff3-86c9-44b4-b273-78ebc73854e8",
        "at": "2026-10-20T18:34:39.488Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "a5049d69-7e33-4f2d-ab77-92a2ec2f1b88",
    "nodeId": "9f6d5341-a240-47d2-b6d1-4bdc9c4be211",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:34:41.528Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:34:41.518Z\"}\n",
    "durationMs": 2013,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f9b4958235e534487dcb2e5f04f0c1fa95a36c1f38186bd529c87ab444fb23cc",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "cf3e4b6476f7e36251ea878d51ef6616f5ef6a79dfcef27056f3e52d90215362",
        "public/styles.css": "633c2a058a467565fda27d953a44c93203684d401dce322640ecf59707ada1d5",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "ee272c89a6e1f5896473639d7798618788e900c45e8f88dcf946a67468a33c94"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 45,
        "eventId": "bbe87cd9-77b5-41d0-80eb-0351f7adcd86",
        "at": "2026-10-20T18:34:41.571Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "98a0f38f-fc6e-4598-84fc-a7a3ec75134d",
    "nodeId": "ff4af319-333a-417d-8d73-8c43f1aa6db8",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:51.850Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:51.841Z\"}\n",
    "durationMs": 1771,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 60,
        "eventId": "4d811638-99c3-4543-bfc8-587cd397ed35",
        "at": "2026-10-20T18:39:51.898Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "607e54eb-4dda-434a-a7cf-80bb1a1505e4",
    "nodeId": "488e6182-fa60-4bdb-92f6-360e55d4e9cb",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:53.750Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:53.740Z\"}\n",
    "durationMs": 1812,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 62,
        "eventId": "89352ce2-da18-4dcf-9aa3-d3c052d93ff7",
        "at": "2026-10-20T18:39:53.796Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "6a1785be-8af1-4635-a8dc-93a0d2e9650a",
    "nodeId": "21398b39-de98-4da1-87c5-b14c33b5e592",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:55.853Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:55.842Z\"}\n",
    "durationMs": 2008,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 64,
        "eventId": "c3042420-aa4e-44eb-843a-fa9574c5acbe",
        "at": "2026-10-20T18:39:55.896Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "1c56ebc9-bff9-44e7-ba57-6497205a8731",
    "nodeId": "822a0f14-9fc9-48ce-bf1f-302ed8748cae",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:56.376Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:56.366Z\"}\n",
    "durationMs": 315,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 67,
        "eventId": "e1a0b8cb-e885-403b-9df2-a4b9644b11fa",
        "at": "2026-10-20T18:39:56.422Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "f5d7438e-df71-495d-8645-f2a9a223292c",
    "nodeId": "95af8b5b-f48e-4663-b195-2f2cd6537160",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:56.800Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:56.793Z\"}\n",
    "durationMs": 314,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 69,
        "eventId": "87032320-c7e1-4237-9244-cf12fc602d90",
        "at": "2026-10-20T18:39:56.848Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "f3577273-48da-4024-8ad1-3a10accb8c1a",
    "nodeId": "3ad60cd4-f5d4-4cca-ae62-54d9d9e2c870",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T18:39:57.234Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:39:57.228Z\"}\n",
    "durationMs": 321,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9830315497d148108510e1a40bffa0fb298270dea591b6dde330461b30cbfaa9",
        "docs/api-backup.md": "1ead43623d8611072252a70594fd3c08d057a055010a5273a08959514a423ca2",
        "docs/api-manutenzioni.md": "38179abe3587a8e1ec9d9e900b7e927158870767eb889d3bc910890f9f0f94eb",
        "docs/ui-backup.md": "5fab75328aea57acb34480b4dc2cc27cf5dbd537aee028ea3b6d3d7a3dd946e8",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "d1ce74415ce1f4c0bfd0faacb28354e5a054c763f3bce640ee25acb53ec6d456",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "0d4bf672a30b7c41fbcc241f93b63a34c25c63529a4e4acdfaeb25bdb89ab9b9"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-backup.md, docs/ui-inventario.md, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 71,
        "eventId": "450fdcc2-dcca-4e01-a934-2ad10154a92c",
        "at": "2026-10-20T18:39:57.282Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "4662d120-ac7a-487e-b0b8-4378d560394e",
    "nodeId": "4c6737a7-555a-4ac6-8d7f-28f636212a5d",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:26.709Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:26.702Z\"}\n",
    "durationMs": 318,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 85,
        "eventId": "f9c3cb90-c958-4e11-a23d-0440615ed99c",
        "at": "2026-10-20T18:43:26.769Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "456bd0c1-aad1-4827-980a-5a5c8e89694e",
    "nodeId": "fc13f99d-4fb3-45d7-9018-073eedd78962",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:28.872Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:28.862Z\"}\n",
    "durationMs": 2036,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 87,
        "eventId": "785f4425-c31b-4cc9-bf01-67ebcaa20d75",
        "at": "2026-10-20T18:43:28.932Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "cc4cd09b-e185-49b5-8fa7-e05d94aa5926",
    "nodeId": "21454498-4dc3-4c52-a135-c859586234a2",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:29.328Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:29.321Z\"}\n",
    "durationMs": 318,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 89,
        "eventId": "af49d3a6-2bc1-443d-b5a4-08c030a74100",
        "at": "2026-10-20T18:43:29.381Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "347ce7f1-7a27-4745-a065-2e1a763998b2",
    "nodeId": "a31b0aab-d471-4ebe-9a79-8d397da1e509",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:31.253Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.239Z\"}\n",
    "durationMs": 1788,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 91,
        "eventId": "8ffc7149-8b0e-4eb0-889d-11eab746af2e",
        "at": "2026-10-20T18:43:31.306Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "613f5d6a-01f4-4c92-984c-2afbfee21fd4",
    "nodeId": "efbab4e6-785d-49e0-9fe4-cbe52c8abe3e",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:31.711Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.705Z\"}\n",
    "durationMs": 321,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 93,
        "eventId": "2ffd0031-cc2d-4f30-b8ef-8f9608fe2e60",
        "at": "2026-10-20T18:43:31.763Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "dfc15702-8037-482f-a4f5-c027dc7c1f82",
    "nodeId": "5caaaf6e-97e6-4bfb-bd52-3c09f4f54566",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T18:43:33.836Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:33.822Z\"}\n",
    "durationMs": 1986,
    "stamp": {
      "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
        "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
        "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
        "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
        "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
        "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
        "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T182810-4cfa5d18",
      "throughSeq": 103,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T182810-4cfa5d18",
        "seq": 95,
        "eventId": "387bf3e9-9855-48df-8a41-fc1d99183658",
        "at": "2026-10-20T18:43:33.890Z",
        "type": "verification.passed"
      }
    }
  }
]
```

#### Latest recorded mission state (separate from checkpoint proof)

```json
{
  "availability": "AVAILABLE",
  "unavailableReason": null,
  "runId": "20261020T182810-4cfa5d18",
  "seq": 103,
  "at": "2026-10-20T18:45:29.415Z",
  "status": "COMPLETED",
  "reason": null,
  "contractVersion": 1,
  "hasLaterEvents": false,
  "criteria": [
    {
      "id": "inventory",
      "title": "Inventory API stores valid searchable data across a process restart",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "inventory"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "inventory",
        "title": "Inventory API stores valid searchable data across a process restart",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "4662d120-ac7a-487e-b0b8-4378d560394e",
      "evidence": {
        "id": "4662d120-ac7a-487e-b0b8-4378d560394e",
        "nodeId": "4c6737a7-555a-4ac6-8d7f-28f636212a5d",
        "criterionId": "inventory",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:26.709Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory"
        ],
        "exitCode": 0,
        "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:26.702Z\"}\n",
        "durationMs": 318,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 85,
            "eventId": "f9c3cb90-c958-4e11-a23d-0440615ed99c",
            "at": "2026-10-20T18:43:26.769Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "inventory-ui",
      "title": "Accessible responsive inventory supports create/search/edit and reload",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "inventory-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "inventory-ui",
        "title": "Accessible responsive inventory supports create/search/edit and reload",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "456bd0c1-aad1-4827-980a-5a5c8e89694e",
      "evidence": {
        "id": "456bd0c1-aad1-4827-980a-5a5c8e89694e",
        "nodeId": "fc13f99d-4fb3-45d7-9018-073eedd78962",
        "criterionId": "inventory-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:28.872Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:28.862Z\"}\n",
        "durationMs": 2036,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 87,
            "eventId": "785f4425-c31b-4cc9-bf01-67ebcaa20d75",
            "at": "2026-10-20T18:43:28.932Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "maintenance",
      "title": "Linked one-off and recurring maintenance has civil-date and durable history semantics",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "maintenance"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "maintenance",
        "title": "Linked one-off and recurring maintenance has civil-date and durable history semantics",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "cc4cd09b-e185-49b5-8fa7-e05d94aa5926",
      "evidence": {
        "id": "cc4cd09b-e185-49b5-8fa7-e05d94aa5926",
        "nodeId": "21454498-4dc3-4c52-a135-c859586234a2",
        "criterionId": "maintenance",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:29.328Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance"
        ],
        "exitCode": 0,
        "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:29.321Z\"}\n",
        "durationMs": 318,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 89,
            "eventId": "af49d3a6-2bc1-443d-b5a4-08c030a74100",
            "at": "2026-10-20T18:43:29.381Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "maintenance-ui",
      "title": "User can schedule and complete maintenance end-to-end",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "maintenance-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "maintenance-ui",
        "title": "User can schedule and complete maintenance end-to-end",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "347ce7f1-7a27-4745-a065-2e1a763998b2",
      "evidence": {
        "id": "347ce7f1-7a27-4745-a065-2e1a763998b2",
        "nodeId": "a31b0aab-d471-4ebe-9a79-8d397da1e509",
        "criterionId": "maintenance-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:31.253Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.239Z\"}\n",
        "durationMs": 1788,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 91,
            "eventId": "8ffc7149-8b0e-4eb0-889d-11eab746af2e",
            "at": "2026-10-20T18:43:31.306Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "backup",
      "title": "Exact backup/restore is validated, atomic and documented",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "backup"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "backup",
        "title": "Exact backup/restore is validated, atomic and documented",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "613f5d6a-01f4-4c92-984c-2afbfee21fd4",
      "evidence": {
        "id": "613f5d6a-01f4-4c92-984c-2afbfee21fd4",
        "nodeId": "efbab4e6-785d-49e0-9fe4-cbe52c8abe3e",
        "criterionId": "backup",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:31.711Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup"
        ],
        "exitCode": 0,
        "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:31.705Z\"}\n",
        "durationMs": 321,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 93,
            "eventId": "2ffd0031-cc2d-4f30-b8ef-8f9608fe2e60",
            "at": "2026-10-20T18:43:31.763Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "backup-ui",
      "title": "User downloads and explicitly confirms data replacement in the interface",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "backup-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T182810-4cfa5d18",
      "sourceSeq": 103,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "backup-ui",
        "title": "User downloads and explicitly confirms data replacement in the interface",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "dfc15702-8037-482f-a4f5-c027dc7c1f82",
      "evidence": {
        "id": "dfc15702-8037-482f-a4f5-c027dc7c1f82",
        "nodeId": "5caaaf6e-97e6-4bfb-bd52-3c09f4f54566",
        "criterionId": "backup-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T18:43:33.836Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/recovery-data/worktrees/20261020T182810-4cfa5d18\",\"at\":\"2026-10-20T18:43:33.822Z\"}\n",
        "durationMs": 1986,
        "stamp": {
          "head": "7dc07f5cd1e3faf5ae946caf084762f72d45ebc3",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "9d93a8177adbbff10dcb2a11259cd395f28ad09fdd65e10989bc3c1374481315",
            "docs/api-backup.md": "62f24aa7d569e8c3cb428479b0d239fb580abc1fb4c1ff8e4bae8dfcdc74745c",
            "docs/api-manutenzioni.md": "6b788bfb9f68957e73a4a596abd1bba8e319daaa15ddb053cae0f0bad154f340",
            "docs/ui-backup.md": "dd64f9673c976692997c4e5c1076255e01a9c4ad64711fba26f3f4b062245192",
            "docs/ui-inventario.md": "75a55fabfe6aff8cf30f51d631769ded5700cb62a38ba02ecd657b9c59644e19",
            "docs/ui-manutenzioni.md": "cd616dd13a6dd14b6c4c198614ab410934c5d454e9487a122cef6f0475c5ea9d",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "14672081434d4ecc1459afeef57af251c01fad737fa53204a3178c82dbf27430",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "f59426340f00513517e59197efbc01b357101a1f33205a68e01ee38f0b821220",
            "public/styles.css": "43808ae7f6e280c905a0b00afbc5c5a13c124fa05c223763ed8c3eb263eb164c",
            "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
            "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "9fd6cc05a50adbb7a3e3252ac4e26a392f14c29da061643f85a454073764f4ad"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T182810-4cfa5d18",
          "throughSeq": 103,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T182810-4cfa5d18",
            "seq": 95,
            "eventId": "387bf3e9-9855-48df-8a41-fc1d99183658",
            "at": "2026-10-20T18:43:33.890Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

## Evidence boundary and product review

Checkpoint evidence is historical proof from the source mission event prefix through the recorded sourceSeq. Later recorded state is shown separately and cannot rewrite that checkpoint. Current source freshness is unobserved: this read-only report does not inspect worktrees, audit evidence or rerun checks. Each future mission needs fresh verification. AI assessments and project reviews are claims from the same integration, not independent proof or operator acceptance. A checkpoint is a technical result; product review and acceptance remain with the operator.

Current source freshness: UNOBSERVED. No current source files, Git refs or evidence artifacts were inspected or verified to generate this report.
