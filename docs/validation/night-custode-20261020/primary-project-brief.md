# Project brief

Delegation: 4067d97a-eaea-4343-b726-7b33c05bdf7d; saved status: BLOCKED; revision: 19.
Saved update: 2026-10-20T16:58:48.583Z; report observed at: 2026-10-20T19:09:28.052Z.

3/4 outcomes checkpointed; 1 pending. Repeated cumulative checks do not count as additional outcomes.

Product review required: true. Not established by technical checkpoints; operator product review is required.

## Original goal

```text
Build Custode, a useful Italian local application for household inventory and maintenance, from the product objective in BRIEF.md. Own ordinary implementation, design and product decisions and deliver a coherent end-to-end result. Read the fixed brief for the API/accessibility interfaces required for host verification. Work only on the current outcome, preserve previous behavior and leave later outcomes to automatic continuation. Do not ask the operator to choose routine details. Green tests are a minimum: inspect the actual result, discover and repair concrete goal gaps within scope. Do not create demo user data. No network, package installation, external notifications, publication, push or merge. Use host verificationRequest for browser/listener tests; sandbox observation limits do not block implementation. The operator is absent: report a real boundary blocker honestly, rather than changing acceptance or claiming success.
```

## Original authorization and limits

Authorized at: 2026-10-20T14:26:48.615Z. Approval hash: e8857473a37e2e63a659099888fb644f103cf3a088c0136ab5bb342ce952e7c1. Original source HEAD: 1892c983f18b7332a0c24b431b02d3ee3be3e668.
Repository: /Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/source; provider: codex.

```json
{
  "maxTurns": 180,
  "maxAttempts": 5,
  "maxDurationMs": 14400000,
  "maxTokens": 100000000,
  "turnTimeoutMs": 1200000,
  "maxNoProgress": 8
}
```

## Shared usage and remaining budgets

24 reported turns; 13244417 reported tokens. Totals cover all linked missions.

Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable.

```json
{
  "turns": 24,
  "tokens": 13244417,
  "runIds": [
    "20261020T142648-35f27844",
    "20261020T144512-fd44a424",
    "20261020T152604-46b3d576",
    "20261020T161136-f1baf0a7"
  ],
  "unavailableRunIds": [],
  "complete": true,
  "missions": [
    {
      "runId": "20261020T142648-35f27844",
      "sourceSeq": 47,
      "turns": 5,
      "tokens": 997378
    },
    {
      "runId": "20261020T144512-fd44a424",
      "sourceSeq": 95,
      "turns": 8,
      "tokens": 3284568
    },
    {
      "runId": "20261020T152604-46b3d576",
      "sourceSeq": 115,
      "turns": 7,
      "tokens": 7109567
    },
    {
      "runId": "20261020T161136-f1baf0a7",
      "sourceSeq": 72,
      "turns": 4,
      "tokens": 1852904
    }
  ],
  "authorizedAt": "2026-10-20T14:26:48.615Z",
  "observedAt": "2026-10-20T19:09:28.052Z",
  "elapsedMs": 16959437,
  "authorizationDeadline": "2026-10-20T18:26:48.615Z",
  "remainingDurationMs": 0,
  "remainingTurns": 156,
  "remainingTokens": 86755583,
  "accounting": "Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable."
}
```

## Attention

- Outcome safe-return requires attention: BLOCKED: The operation was aborted (delegation-reason)

```json
{
  "delegationId": "4067d97a-eaea-4343-b726-7b33c05bdf7d",
  "revision": 19,
  "at": "2026-10-20T16:58:48.583Z"
}
```

- The operation was aborted (mission-reason)

```json
{
  "runId": "20261020T161136-f1baf0a7",
  "seq": 72,
  "at": "2026-10-20T16:58:48.571Z",
  "contractVersion": 1,
  "outcomeIds": [
    "safe-return"
  ]
}
```

## Outcomes

### Reliable inventory (reliable-inventory)

Saved outcome status: CHECKPOINTED. Source run: 20261020T142648-35f27844.

```text
Implement outcome 1 in BRIEF.md: real validated inventory HTTP API, case-insensitive combined search and durable storage. No UI or maintenance/backup behavior is required in this first outcome. Future acceptance cases are not active yet.
```

Prerequisite outcomes: none.

#### Recorded checkpoint

Checkpoint SHA: 3baad1931f9f79aa9fc1bb724d843cd12eb88404
Ref: refs/iterfox/checkpoints/4067d97a-eaea-4343-b726-7b33c05bdf7d/reliable-inventory
Source fingerprint: d12cb9a31c5c21b24140bc8a9becea47baa0720b159ef5914369f62d078a1be3
Source sequence: 47; recorded at: 2026-10-20T14:45:12.218Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T142648-35f27844",
  "sourceSeq": 47,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T142648-35f27844",
    "seq": 47,
    "eventId": "a3af3e56-11c3-412d-9ac9-d487c149113b",
    "at": "2026-10-20T14:45:12.058Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- inventory: Inventory API stores valid searchable data across a process restart — PASSED; evidence ID: 275c0ecc-4ea9-4453-b706-75117f8d2d25.

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
  "sourceRunId": "20261020T142648-35f27844",
  "sourceSeq": 47,
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
  "evidenceId": "275c0ecc-4ea9-4453-b706-75117f8d2d25",
  "evidence": {
    "id": "275c0ecc-4ea9-4453-b706-75117f8d2d25",
    "nodeId": "f26512b0-23f8-4bd3-9c94-1f527cf8b0fc",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T14:43:31.324Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844\",\"at\":\"2026-10-20T14:43:31.318Z\"}\n",
    "durationMs": 307,
    "stamp": {
      "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "bebf17f533a2182cb7fe7667499cd6bbcb0ac08a4f1a4cb4d5f9088964eeead5",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "9cbbbf2a42600b0ba66c7084fbf5993bf7d8fb960869fec1171e584c5ae5aa54",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "d12cb9a31c5c21b24140bc8a9becea47baa0720b159ef5914369f62d078a1be3"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T142648-35f27844",
      "throughSeq": 47,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T142648-35f27844",
        "seq": 39,
        "eventId": "5befed0c-0d65-424f-a234-6d2f37e8a502",
        "at": "2026-10-20T14:43:31.362Z",
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
    "id": "df3ab01c-b897-4d12-9241-3d13ef83bf16",
    "nodeId": "8968321d-46fb-405a-81c1-12b4e9f265b1",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T14:27:57.222Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 1,
    "output": "AssertionError [ERR_ASSERTION]: {\"status\":501,\"data\":{\"error\":\"Not implemented\"}}\n    at good (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844/tests/acceptance.mjs:24:158)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async inventory (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844/tests/acceptance.mjs:28:20)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844/tests/acceptance.mjs:104:39\n\n",
    "durationMs": 180,
    "stamp": {
      "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/server.mjs": "b8d1ebd09a1ef104a81d705dbe62ac940528c7350d39af7d948cabb261c541bb",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "725e996e3c8b2cf515a07b6058a52d50df63df28c5c10a5af48cf4c47a5c0976"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T142648-35f27844",
      "throughSeq": 47,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T142648-35f27844",
        "seq": 11,
        "eventId": "732dd9bc-880c-4b11-ab91-6c1105670805",
        "at": "2026-10-20T14:27:57.257Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "045d2ebc-fe30-47c9-a3cf-102c56b4d3a7",
    "nodeId": "a5446415-9d25-4803-8ea5-fc2e8999a744",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T14:37:36.768Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844\",\"at\":\"2026-10-20T14:37:36.762Z\"}\n",
    "durationMs": 311,
    "stamp": {
      "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "40a36d4094a96b2f4a327e82f167aa45127a642f56cb69bfc52ccd0bc10c5f66",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "d101a326032e346af5f3ee4bfe4c6a4cec57599f94cb59fdccd3ea82bf905419",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "a245a940ccde472632f2c70b1a998be29fae2389efa774c1eb567170a0e27da0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, src/server.mjs. Scope: all repository files.",
    "source": {
      "runId": "20261020T142648-35f27844",
      "throughSeq": 47,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T142648-35f27844",
        "seq": 19,
        "eventId": "315afcb9-5523-4af6-a06b-493c344e68ef",
        "at": "2026-10-20T14:37:36.807Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "1b520137-6cf7-45ae-830b-63b788698fc0",
    "nodeId": "ece8f2e9-ad83-4b0d-adde-7755dfce9214",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T14:41:40.450Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844\",\"at\":\"2026-10-20T14:41:40.444Z\"}\n",
    "durationMs": 308,
    "stamp": {
      "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "43ab176b1c9b18d70f02c592a4083349fcd76285eeee750b08b34de288946919",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "9cbbbf2a42600b0ba66c7084fbf5993bf7d8fb960869fec1171e584c5ae5aa54",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "4efa88cef0d3518168d68b07e1f3e6298c46ab4c80c993a0dd6e77e0fce18cc2"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T142648-35f27844",
      "throughSeq": 47,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T142648-35f27844",
        "seq": 29,
        "eventId": "08bf364c-66eb-4a7f-b58a-a989a6a67dc4",
        "at": "2026-10-20T14:41:40.489Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "275c0ecc-4ea9-4453-b706-75117f8d2d25",
    "nodeId": "f26512b0-23f8-4bd3-9c94-1f527cf8b0fc",
    "criterionId": "inventory",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T14:43:31.324Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory"
    ],
    "exitCode": 0,
    "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844\",\"at\":\"2026-10-20T14:43:31.318Z\"}\n",
    "durationMs": 307,
    "stamp": {
      "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "bebf17f533a2182cb7fe7667499cd6bbcb0ac08a4f1a4cb4d5f9088964eeead5",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "9cbbbf2a42600b0ba66c7084fbf5993bf7d8fb960869fec1171e584c5ae5aa54",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "d12cb9a31c5c21b24140bc8a9becea47baa0720b159ef5914369f62d078a1be3"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T142648-35f27844",
      "throughSeq": 47,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T142648-35f27844",
        "seq": 39,
        "eventId": "5befed0c-0d65-424f-a234-6d2f37e8a502",
        "at": "2026-10-20T14:43:31.362Z",
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
  "runId": "20261020T142648-35f27844",
  "seq": 47,
  "at": "2026-10-20T14:45:12.058Z",
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
      "sourceRunId": "20261020T142648-35f27844",
      "sourceSeq": 47,
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
      "evidenceId": "275c0ecc-4ea9-4453-b706-75117f8d2d25",
      "evidence": {
        "id": "275c0ecc-4ea9-4453-b706-75117f8d2d25",
        "nodeId": "f26512b0-23f8-4bd3-9c94-1f527cf8b0fc",
        "criterionId": "inventory",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T14:43:31.324Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory"
        ],
        "exitCode": 0,
        "output": "PASS empty inventory\nPASS stable identifiers, defaults and literal Unicode\nPASS invalid writes leave inventory unchanged\nPASS partial updates preserve fields\nPASS combined case-insensitive search\nPASS missing records and malformed JSON handled\nPASS real process restart preserves data\nPASS deletion persists\n{\"result\":\"passed\",\"mode\":\"inventory\",\"groups\":8,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T142648-35f27844\",\"at\":\"2026-10-20T14:43:31.318Z\"}\n",
        "durationMs": 307,
        "stamp": {
          "head": "1892c983f18b7332a0c24b431b02d3ee3be3e668",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "bebf17f533a2182cb7fe7667499cd6bbcb0ac08a4f1a4cb4d5f9088964eeead5",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/server.mjs": "9cbbbf2a42600b0ba66c7084fbf5993bf7d8fb960869fec1171e584c5ae5aa54",
            "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "d12cb9a31c5c21b24140bc8a9becea47baa0720b159ef5914369f62d078a1be3"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T142648-35f27844",
          "throughSeq": 47,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T142648-35f27844",
            "seq": 39,
            "eventId": "5befed0c-0d65-424f-a234-6d2f37e8a502",
            "at": "2026-10-20T14:43:31.362Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Usable visual inventory (usable-inventory)

Saved outcome status: CHECKPOINTED. Source run: 20261020T144512-fd44a424.

```text
Implement outcome 2 in BRIEF.md: coherent Italian inventory UI, accessible real forms and actions, search, edit/delete with confirmation, empty/error states, desktop and phone layout. Preserve the inventory API. Maintenance and backup are following outcomes.
```

Prerequisite outcomes: reliable-inventory.

#### Recorded checkpoint

Checkpoint SHA: 6ca9f2e7e21e990662505af6b18850f56f0eae98
Ref: refs/iterfox/checkpoints/4067d97a-eaea-4343-b726-7b33c05bdf7d/usable-inventory
Source fingerprint: 1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc
Source sequence: 95; recorded at: 2026-10-20T15:26:04.510Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T144512-fd44a424",
  "sourceSeq": 95,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T144512-fd44a424",
    "seq": 95,
    "eventId": "8d0ece82-00f5-405e-b371-f22b222fcd73",
    "at": "2026-10-20T15:26:04.227Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- inventory-ui: Accessible responsive inventory supports create/search/edit and reload — PASSED; evidence ID: 7c1938f0-68d7-4f98-9278-af3bdd581694.

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
  "sourceRunId": "20261020T144512-fd44a424",
  "sourceSeq": 95,
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
  "evidenceId": "7c1938f0-68d7-4f98-9278-af3bdd581694",
  "evidence": {
    "id": "7c1938f0-68d7-4f98-9278-af3bdd581694",
    "nodeId": "9b813751-cbe4-4491-bbff-52089090f778",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T15:23:46.013Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:23:46.002Z\"}\n",
    "durationMs": 1851,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "5a8b1f1d8b325d320bbc36ac0a8834c4b0019a3bfec977b39bca3633de60ead6",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 87,
        "eventId": "3ee9d794-83c3-4c04-9b01-d5f1432edbce",
        "at": "2026-10-20T15:23:46.066Z",
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
    "id": "3939fa3f-087d-43ad-9d96-429d179e03c3",
    "nodeId": "eaa01469-514e-4532-b958-a0fbf0dbc8d3",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T14:46:40.674Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 1,
    "output": "locator.waitFor: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('heading', { name: 'Custode', exact: true }) to be visible\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:83:85)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:105:42\n(node:93775) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:56875\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-gQRfX6/data/custode.sqlite\n\n",
    "durationMs": 11216,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "bebf17f533a2182cb7fe7667499cd6bbcb0ac08a4f1a4cb4d5f9088964eeead5",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "9cbbbf2a42600b0ba66c7084fbf5993bf7d8fb960869fec1171e584c5ae5aa54",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "d12cb9a31c5c21b24140bc8a9becea47baa0720b159ef5914369f62d078a1be3"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 13,
        "eventId": "26dc9a0b-40cd-4358-9745-6381c0594ba9",
        "at": "2026-10-20T14:46:40.711Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "0682f010-e774-4484-ae98-dcda57ff71f6",
    "nodeId": "22a94b2a-f53a-4a2b-b137-f74c0c554cc5",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T14:54:38.822Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 1,
    "output": "locator.waitFor: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Modifica Macchina del caffè', exact: true }) to be visible\n\n    at fillItem (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:84:490)\n    at async browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:85:3)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:105:42\n(node:99896) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:57154\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-SjHgse/data/custode.sqlite\n\n",
    "durationMs": 11556,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "809ebaa7abb3cbd0909a1103a516423ba2776b65a541ef690df67b99d4e5f35e",
        "docs/ui-inventario.md": "ed98f0e945be211bf1f86e9d77ef02ce819c462489e449cfa3ea1d77f1f1eff9",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "f8fd963ab804441f01835b817c71c528fee479d0c21e13371467d249612fda16",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "82a7d86e2a302bd71345ca922ccceb0f553abee98017f08df8d418edb164c11e",
        "public/styles.css": "76f894ff258a1d30c2315733c4a5f035d982901977ab7ff0c97b14d1487e06af",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "242e7a65d422160be5a76b5e5fb9fb630d941253b88aac0e464e6854f73ed026"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 24,
        "eventId": "66377fb6-19bd-44e3-ac01-f78f5558e6a2",
        "at": "2026-10-20T14:54:38.865Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "96b8a144-530a-4fc8-8aa2-99f5d461e7ea",
    "nodeId": "053c41ca-47f4-490b-a902-59f6823bb230",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T15:01:57.509Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 1,
    "output": "locator.waitFor: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Modifica Macchina del caffè', exact: true }) to be visible\n\n    at fillItem (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:84:490)\n    at async browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:85:3)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424/tests/acceptance.mjs:105:42\n(node:5476) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:57499\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-LQwmBt/data/custode.sqlite\n\n",
    "durationMs": 11146,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "2ec878a220d4eb1167498b3a25c6e1938bc70a47b3abf8be7bdcc7986ecb6e4e",
        "docs/ui-inventario.md": "51841790811a479b7c4ad17449849f6a5116fa87c4809ae4e581925c3570b02f",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "6b0fc8f9348850722646548833ad039c6efc69a09dbc690b9680904619c5500a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "2f61ed6c2fbb05f776962c98c6da7f2856ee2541d993801b97e956c5b24286dd",
        "public/styles.css": "14c74573ac21719368a4e58bd8b99a395d90247f8db9f36ed18882bf65eb76a7",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "c1e0d2ea21f6ef2ec671e5d29f021c232aea2e62393da1b99603ac4d7827e2b0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 36,
        "eventId": "ea626244-9c3a-4073-97f3-466e4b67927a",
        "at": "2026-10-20T15:01:57.547Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "08867c59-19e3-4f06-a630-65eb42cd3113",
    "nodeId": "43c940cd-b445-425f-b966-49005e89ac33",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:10:24.710Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:10:24.699Z\"}\n",
    "durationMs": 2166,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "9af6f417019150845cd43dd23437bb2ca1dab386fe048617ff9953c43ae9f1e2",
        "docs/ui-inventario.md": "58738b0f49ca8c890b1eeecdd2a4cd11321e616e91a0342212ea8476d59a3f67",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "21dc7e023457567b620e968fe1c8d1415d34a5f435bc5a0c1655a4374390b766",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "d839dbb3cc59b3f791bc9120b6e8d19446ed6f816ef241bd2ce54969f6e887a5",
        "public/styles.css": "3c30afee04daad6de4d63537fc4f28431c75bcef7247e8b56276e8a235f07db5",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "53b31849ff40773e2aa5f7922eff791b430bc0ac2e14d944824f9d423fc7ff45"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/ui-inventario.md, public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 48,
        "eventId": "51d5fde8-fbbb-4ddc-bda0-9584698bd3ff",
        "at": "2026-10-20T15:10:24.766Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "9a4d8443-8820-4ba0-b3e6-c84bb3381318",
    "nodeId": "aafc3e71-c42e-4c8d-9d66-03d588630f7a",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:14:37.279Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:14:37.269Z\"}\n",
    "durationMs": 1966,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "be6f26b7030484cfaaea5f339b13c430fe1ae747ecd3ce792d5aee71315e1dce",
        "docs/ui-inventario.md": "0a7a798b8a2fab606672382d720ade07cc48675d9a7f0c5b9880f6f168804ef8",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "cd6417e3e086788797b112914c2fb82bf55f4f057295925102342542ee20f44e",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "15fa458791f6c05b13b1b524b2bef1211b97abf29b83f63f5158025e56d7a4e8",
        "public/styles.css": "602d07c7fdbebd596eb7039bf9c71a06826bfed5ad4bf6347d80a094fe76a878",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "8e08da45e235863e3cd9fad1fda4428c8a6f067cf56e0008a201395b0d89374c"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: docs/ui-inventario.md, public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 61,
        "eventId": "8c404f2b-b7d4-47ff-a92b-a0da213ff9bb",
        "at": "2026-10-20T15:14:37.331Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "c483ed81-8986-4aed-ba14-320534691b2f",
    "nodeId": "69d2678a-2b35-433b-bc20-987476d2e343",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:21:21.606Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:21:21.596Z\"}\n",
    "durationMs": 2136,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "be6f26b7030484cfaaea5f339b13c430fe1ae747ecd3ce792d5aee71315e1dce",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "e816c73164b09820fa3d87af11885a341133476566e610fd912a6135210b3e83"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 74,
        "eventId": "be819888-58ed-4ac5-b1b8-c3c9498210d1",
        "at": "2026-10-20T15:21:21.663Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "7c1938f0-68d7-4f98-9278-af3bdd581694",
    "nodeId": "9b813751-cbe4-4491-bbff-52089090f778",
    "criterionId": "inventory-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T15:23:46.013Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "inventory-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:23:46.002Z\"}\n",
    "durationMs": 1851,
    "stamp": {
      "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "5a8b1f1d8b325d320bbc36ac0a8834c4b0019a3bfec977b39bca3633de60ead6",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T144512-fd44a424",
      "throughSeq": 95,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T144512-fd44a424",
        "seq": 87,
        "eventId": "3ee9d794-83c3-4c04-9b01-d5f1432edbce",
        "at": "2026-10-20T15:23:46.066Z",
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
  "runId": "20261020T144512-fd44a424",
  "seq": 95,
  "at": "2026-10-20T15:26:04.227Z",
  "status": "COMPLETED",
  "reason": null,
  "contractVersion": 1,
  "hasLaterEvents": false,
  "criteria": [
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
      "sourceRunId": "20261020T144512-fd44a424",
      "sourceSeq": 95,
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
      "evidenceId": "7c1938f0-68d7-4f98-9278-af3bdd581694",
      "evidence": {
        "id": "7c1938f0-68d7-4f98-9278-af3bdd581694",
        "nodeId": "9b813751-cbe4-4491-bbff-52089090f778",
        "criterionId": "inventory-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T15:23:46.013Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "inventory-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"inventory-ui\",\"groups\":2,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T144512-fd44a424\",\"at\":\"2026-10-20T15:23:46.002Z\"}\n",
        "durationMs": 1851,
        "stamp": {
          "head": "3baad1931f9f79aa9fc1bb724d843cd12eb88404",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "5a8b1f1d8b325d320bbc36ac0a8834c4b0019a3bfec977b39bca3633de60ead6",
            "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
            "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
            "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T144512-fd44a424",
          "throughSeq": 95,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T144512-fd44a424",
            "seq": 87,
            "eventId": "3ee9d794-83c3-4c04-9b01-d5f1432edbce",
            "at": "2026-10-20T15:23:46.066Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Maintenance from due date to history (maintenance-workflow)

Saved outcome status: CHECKPOINTED. Source run: 20261020T152604-46b3d576.

```text
Implement outcome 3 in BRIEF.md: validated maintenance API, overview, one-off and recurring completions, durable history and integrated interface. Preserve all inventory behavior and fix concrete end-to-end gaps. Backup remains the next outcome.
```

Prerequisite outcomes: usable-inventory.

#### Recorded checkpoint

Checkpoint SHA: cb513eb21a98abdc21aae66debcd93ee98c01673
Ref: refs/iterfox/checkpoints/4067d97a-eaea-4343-b726-7b33c05bdf7d/maintenance-workflow
Source fingerprint: 557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0
Source sequence: 115; recorded at: 2026-10-20T16:11:36.801Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T152604-46b3d576",
  "sourceSeq": 115,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T152604-46b3d576",
    "seq": 115,
    "eventId": "8c759190-1714-4918-a115-361f44548f3a",
    "at": "2026-10-20T16:11:36.331Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- maintenance: Linked one-off and recurring maintenance has civil-date and durable history semantics — PASSED; evidence ID: c5abcff1-4f4a-419e-98f3-471c84e7ed1a.

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
  "sourceRunId": "20261020T152604-46b3d576",
  "sourceSeq": 115,
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
  "evidenceId": "c5abcff1-4f4a-419e-98f3-471c84e7ed1a",
  "evidence": {
    "id": "c5abcff1-4f4a-419e-98f3-471c84e7ed1a",
    "nodeId": "ff3b64d6-975c-48d8-8fba-03602011475d",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:08:57.698Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:57.691Z\"}\n",
    "durationMs": 331,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 105,
        "eventId": "96adde45-f060-49f9-a211-73bce20090bc",
        "at": "2026-10-20T16:08:57.774Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- maintenance-ui: User can schedule and complete maintenance end-to-end — PASSED; evidence ID: 29a94599-2a19-42ad-8aa0-fe36b8488e6b.

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
  "sourceRunId": "20261020T152604-46b3d576",
  "sourceSeq": 115,
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
  "evidenceId": "29a94599-2a19-42ad-8aa0-fe36b8488e6b",
  "evidence": {
    "id": "29a94599-2a19-42ad-8aa0-fe36b8488e6b",
    "nodeId": "4343a40f-13a8-4db8-87a6-01860fa546d6",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:08:59.756Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:59.738Z\"}\n",
    "durationMs": 1813,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 107,
        "eventId": "488e17e6-c8c6-46cc-9c71-81ae450b00b1",
        "at": "2026-10-20T16:08:59.817Z",
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
    "id": "5c381802-a90b-4fe7-ba02-a650d7a97cec",
    "nodeId": "3f1d0823-4fd5-41a0-855c-0e249bf038b5",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T15:28:00.869Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 1,
    "output": "AssertionError [ERR_ASSERTION]: {\"status\":404,\"data\":{\"error\":\"Risorsa non trovata.\"}}\n\n404 !== 201\n\n    at good (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:24:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async maintenance (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:46:11)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:106:41\n(node:27418) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:59380\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-kIHaID/data/custode.sqlite\n\n",
    "durationMs": 204,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "5a8b1f1d8b325d320bbc36ac0a8834c4b0019a3bfec977b39bca3633de60ead6",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 15,
        "eventId": "06cf5822-9e9e-4a1f-9f9c-91b921b3fdb9",
        "at": "2026-10-20T15:28:00.907Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "6406ef1d-cbbc-4403-912d-96140d2c2287",
    "nodeId": "9dbf0a22-19e6-4786-a03c-61ec9a946e2b",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T15:28:12.329Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 1,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nlocator.click: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Manutenzioni', exact: true })\n    - locator resolved to <button disabled type=\"button\" class=\"nav-button\" aria-label=\"Manutenzioni\" aria-describedby=\"maintenance-availability\">…</button>\n  - attempting click action\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n    - waiting 20ms\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n      - waiting 100ms\n    19 × waiting for element to be visible, enabled and stable\n       - element is not enabled\n     - retrying click action\n       - waiting 500ms\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:90:69)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:107:44\n(node:27474) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:59384\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-BaLhtW/data/custode.sqlite\n\n",
    "durationMs": 11413,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "5a8b1f1d8b325d320bbc36ac0a8834c4b0019a3bfec977b39bca3633de60ead6",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/server.mjs": "b16f4a452741a827446be9a036903914f5df055959b89c564a64c79ee29bd67d",
        "src/store.mjs": "453ba88e0f4b39bda7fae8bbe36be8be2e5b8ee4681c5b499ed30afd92681285",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "1c78a9f813a072230605bfaa7bc3c4c3f55ac59a8d386d7428a6befd9177dbdc"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 17,
        "eventId": "907a4b83-1452-4b1c-a2ae-5c123605c2b6",
        "at": "2026-10-20T15:28:12.367Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "097e99a9-0e05-4206-81a1-09e39550956d",
    "nodeId": "9966bdcc-87dd-4d83-a54c-15b76c961191",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:34:50.173Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T15:34:50.166Z\"}\n",
    "durationMs": 315,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "1c0d1b1a7f6b4588083668b96671f933dd2f672ac3031aea9178596e14714734",
        "docs/api-manutenzioni.md": "a0ace0c2a2d7a24f8a81d6bd72da06cea0725d5f695c0f484b24aba69803187c",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "2cbf0f12581b7f1f05856edc2c9bdae0a52c225df3f87e9d0bd5c57ec3194724"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-inventario.md, public/app.js, public/index.html, public/styles.css, docs/ui-manutenzioni.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 31,
        "eventId": "d4f8a204-7704-4c96-a343-534649fd53a8",
        "at": "2026-10-20T15:34:50.215Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "48d3213c-fcb6-45be-8c7a-ffb7eb30ef74",
    "nodeId": "4071628c-d4f4-4424-97e5-4f96f4fce843",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T15:35:01.914Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 1,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nlocator.click: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Manutenzioni', exact: true })\n    - locator resolved to <button disabled type=\"button\" class=\"nav-button\" aria-label=\"Manutenzioni\" aria-describedby=\"maintenance-availability\">…</button>\n  - attempting click action\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n    - waiting 20ms\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n      - waiting 100ms\n    19 × waiting for element to be visible, enabled and stable\n       - element is not enabled\n     - retrying click action\n       - waiting 500ms\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:90:69)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:107:44\n(node:32685) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:59624\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-mcmBae/data/custode.sqlite\n\n",
    "durationMs": 11617,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "1c0d1b1a7f6b4588083668b96671f933dd2f672ac3031aea9178596e14714734",
        "docs/api-manutenzioni.md": "a0ace0c2a2d7a24f8a81d6bd72da06cea0725d5f695c0f484b24aba69803187c",
        "docs/ui-inventario.md": "905aa2a62347c621d7b6f1a4e54b64dacfc2562c42bbcb21bf4c7cdc66aedae1",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "397ab27a6eae0988d97aed19ba17c974885364625bb47bb4c6e840df287e0374",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c2270f1af97317be0c956bacb4260cfb5c0df9d11a056d8bdfb80e63461e7e1",
        "public/styles.css": "6fb0d98f7b09fb63521d11cceca166a699da6707b3620e2409e5e44b4fa9429e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "2cbf0f12581b7f1f05856edc2c9bdae0a52c225df3f87e9d0bd5c57ec3194724"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 34,
        "eventId": "9eaaafbf-5608-4bce-a72e-4a5c71114774",
        "at": "2026-10-20T15:35:01.963Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "a8f887bd-d6a9-4631-8774-0765dfdabbc6",
    "nodeId": "5dcff328-701f-4253-8b02-8b7d97be5fd7",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:43:16.574Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T15:43:16.568Z\"}\n",
    "durationMs": 318,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "74911d14a1f6ecb91cd10b4d5e580ddb347c5bf85b9b4133baba6d0e8613329c",
        "docs/api-manutenzioni.md": "c00bc47a6dbd8952989472f6a87c64b6d93e8205d1a104b69860c5ee684b4b33",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "2e698e0819dbe9c85b505370c257cf419d27910ca33d05a4b0d2dbcd2e54305d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "ef7a930bf0aeac1acaaecf3b54f9f077084c6aa31991bdf59f485bbed89fe273",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "65386b972f2ec3b5d5eb4b9f686422e3a464846efa91f03f0d65294b6829655e",
        "public/styles.css": "5f0b83183876effa2963cdf53c2f41017a2f5145cecae9e7f5eda8567ac41d3a",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "136af871596e22bf1590cdec3835bdb265dda0f2a8b839e5f300e34e4f84ab81"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 49,
        "eventId": "fe3e2263-3672-4d23-a05f-2394d2d5d55a",
        "at": "2026-10-20T15:43:16.620Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "2c4507f6-1f1c-4356-9a37-2afe4790511d",
    "nodeId": "4a5ab27a-0097-42c9-91d5-fcd3195a2be6",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T15:43:28.399Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 1,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nlocator.click: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Completa Cambiare filtro', exact: true })\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:90:756)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576/tests/acceptance.mjs:107:44\n(node:39112) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:60002\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-maSOkv/data/custode.sqlite\n\n",
    "durationMs": 11747,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "74911d14a1f6ecb91cd10b4d5e580ddb347c5bf85b9b4133baba6d0e8613329c",
        "docs/api-manutenzioni.md": "c00bc47a6dbd8952989472f6a87c64b6d93e8205d1a104b69860c5ee684b4b33",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "2e698e0819dbe9c85b505370c257cf419d27910ca33d05a4b0d2dbcd2e54305d",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "ef7a930bf0aeac1acaaecf3b54f9f077084c6aa31991bdf59f485bbed89fe273",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "65386b972f2ec3b5d5eb4b9f686422e3a464846efa91f03f0d65294b6829655e",
        "public/styles.css": "5f0b83183876effa2963cdf53c2f41017a2f5145cecae9e7f5eda8567ac41d3a",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "136af871596e22bf1590cdec3835bdb265dda0f2a8b839e5f300e34e4f84ab81"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 51,
        "eventId": "26ce3811-efbb-4979-9556-a24eab028e33",
        "at": "2026-10-20T15:43:28.449Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "31a03a0e-ff1b-4102-ad7f-99fac3649aa2",
    "nodeId": "257e8cf1-2f08-4e10-b24f-abc27e174b01",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:51:41.744Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T15:51:41.737Z\"}\n",
    "durationMs": 316,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "c8d7afe6343cd50c4d3ffda5eae0b068fad7a67adc723d7d1fdfe8ded8c4b8b5",
        "docs/api-manutenzioni.md": "49fbf0cae8cfd41dd424e7df57cb562d431ee4d3f7f977fecee0ada77fbe2cbe",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "d59919912baaccfd22c30f25a35988c888607a4b3c1228c3284fdd66a8f950ac",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "955e2d558a88b4163d699be8d909104e2a4cb7496fd3122dafd7fef541784850",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c479f019ac0bdf9c1c352f6c395ca2a36f5ccf3506a8411a6177c4c3ec99336",
        "public/styles.css": "96aed8eba01813209d926000a0a2595c3e70c765400651f93c62551a91de6d8e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "7d46fb22f69c78fdf334c235957ca4f35d013b082540a006a54efb6fbb93d9c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css, src/server.mjs, src/store.mjs. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 67,
        "eventId": "05f3e9d4-1493-47f5-b921-0418d437c1ce",
        "at": "2026-10-20T15:51:41.800Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d6a6d23b-4c66-4448-bb33-fb90f1fdfa4a",
    "nodeId": "b1afb27e-beac-43a8-b48a-37084e150611",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T15:51:43.657Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T15:51:43.649Z\"}\n",
    "durationMs": 1794,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "c8d7afe6343cd50c4d3ffda5eae0b068fad7a67adc723d7d1fdfe8ded8c4b8b5",
        "docs/api-manutenzioni.md": "49fbf0cae8cfd41dd424e7df57cb562d431ee4d3f7f977fecee0ada77fbe2cbe",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "d59919912baaccfd22c30f25a35988c888607a4b3c1228c3284fdd66a8f950ac",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "955e2d558a88b4163d699be8d909104e2a4cb7496fd3122dafd7fef541784850",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "4c479f019ac0bdf9c1c352f6c395ca2a36f5ccf3506a8411a6177c4c3ec99336",
        "public/styles.css": "96aed8eba01813209d926000a0a2595c3e70c765400651f93c62551a91de6d8e",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "b6f218983367867e7fc31a9675399b0af7b0b72778843b4a64abb53a425bff4e",
        "src/store.mjs": "45ec6ddbeb7806693307c0bb6083447828b5fed68c364a88e2145379e685c721",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "7d46fb22f69c78fdf334c235957ca4f35d013b082540a006a54efb6fbb93d9c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css, src/server.mjs, src/store.mjs. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 69,
        "eventId": "bdb63af7-4585-484e-87fb-aafe6f94981b",
        "at": "2026-10-20T15:51:43.707Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "7f399004-5f39-4141-8894-73bc694fb405",
    "nodeId": "079666a3-b5d7-4aa7-86b8-8a9e20d71ee5",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T16:01:20.278Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:01:20.271Z\"}\n",
    "durationMs": 336,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "fdfa77f56dbb7deff87b680ef67eebbfcc1b5f941214d26104a394a11c8007ab",
        "docs/api-manutenzioni.md": "d3b8dfb2a7e7c240c7509c20a5a81b47f630366b9c988fd2722eb80ab823d1d5",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "515c23cae3bcf099e4e6da70de9e1bbb72df9da739bc686d197081555f45c4dd",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "2d3d3ed989c694604373342f2a66610d16f7d6bbc64dad6518c1ca0cd3eb455a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f9aec4edb055a99dd69957d8a66532fff73840ec45e9af750a81fbfaefd09b4b",
        "public/styles.css": "5a7e504cf0400336ba193231363b7814cc0254667249160c6a2cd129c102ebfe",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f3838c4dc09bf85a89ecc0c711f1da50916ec11266c1e58d67077100ba10a4f7",
        "src/store.mjs": "cd86dfbca38ec77769fd70e4452f13d45bc85aca749f78a7fae6584a95832f2c",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "4511135e594e296348ca16fabe90751495fe882b6a2e8d18cc1f87cd3bdcc02f"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-inventario.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css, src/server.mjs, src/store.mjs. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 86,
        "eventId": "2807d5f1-6668-4c69-a960-c456edd3a941",
        "at": "2026-10-20T16:01:20.346Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "06f5403d-1ccb-4713-8464-b137d7b4b7a3",
    "nodeId": "13bc5a3c-7c74-4f4f-8a89-3b1084980596",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T16:01:22.319Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:01:22.308Z\"}\n",
    "durationMs": 1862,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "fdfa77f56dbb7deff87b680ef67eebbfcc1b5f941214d26104a394a11c8007ab",
        "docs/api-manutenzioni.md": "d3b8dfb2a7e7c240c7509c20a5a81b47f630366b9c988fd2722eb80ab823d1d5",
        "docs/ui-inventario.md": "939b9c990383cb2df757fce7da10b9a25f4856947a2dd30f40d5075b89e30c10",
        "docs/ui-manutenzioni.md": "515c23cae3bcf099e4e6da70de9e1bbb72df9da739bc686d197081555f45c4dd",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "2d3d3ed989c694604373342f2a66610d16f7d6bbc64dad6518c1ca0cd3eb455a",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "f9aec4edb055a99dd69957d8a66532fff73840ec45e9af750a81fbfaefd09b4b",
        "public/styles.css": "5a7e504cf0400336ba193231363b7814cc0254667249160c6a2cd129c102ebfe",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f3838c4dc09bf85a89ecc0c711f1da50916ec11266c1e58d67077100ba10a4f7",
        "src/store.mjs": "cd86dfbca38ec77769fd70e4452f13d45bc85aca749f78a7fae6584a95832f2c",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "4511135e594e296348ca16fabe90751495fe882b6a2e8d18cc1f87cd3bdcc02f"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-manutenzioni.md, docs/ui-inventario.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css, src/server.mjs, src/store.mjs. Scope: all repository files.",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 88,
        "eventId": "dbc091b6-8579-4551-a251-e7ed91923041",
        "at": "2026-10-20T16:01:22.381Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "c5abcff1-4f4a-419e-98f3-471c84e7ed1a",
    "nodeId": "ff3b64d6-975c-48d8-8fba-03602011475d",
    "criterionId": "maintenance",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:08:57.698Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance"
    ],
    "exitCode": 0,
    "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:57.691Z\"}\n",
    "durationMs": 331,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 105,
        "eventId": "96adde45-f060-49f9-a211-73bce20090bc",
        "at": "2026-10-20T16:08:57.774Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "29a94599-2a19-42ad-8aa0-fe36b8488e6b",
    "nodeId": "4343a40f-13a8-4db8-87a6-01860fa546d6",
    "criterionId": "maintenance-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:08:59.756Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "maintenance-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:59.738Z\"}\n",
    "durationMs": 1813,
    "stamp": {
      "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T152604-46b3d576",
      "throughSeq": 115,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T152604-46b3d576",
        "seq": 107,
        "eventId": "488e17e6-c8c6-46cc-9c71-81ae450b00b1",
        "at": "2026-10-20T16:08:59.817Z",
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
  "runId": "20261020T152604-46b3d576",
  "seq": 115,
  "at": "2026-10-20T16:11:36.331Z",
  "status": "COMPLETED",
  "reason": null,
  "contractVersion": 1,
  "hasLaterEvents": false,
  "criteria": [
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
      "sourceRunId": "20261020T152604-46b3d576",
      "sourceSeq": 115,
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
      "evidenceId": "c5abcff1-4f4a-419e-98f3-471c84e7ed1a",
      "evidence": {
        "id": "c5abcff1-4f4a-419e-98f3-471c84e7ed1a",
        "nodeId": "ff3b64d6-975c-48d8-8fba-03602011475d",
        "criterionId": "maintenance",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T16:08:57.698Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance"
        ],
        "exitCode": 0,
        "output": "PASS task references, civil dates, recurrence validation\nPASS linked item deletion cannot silently lose maintenance\nPASS recurrence crosses leap day and saves history\nPASS one-off completion is single and invalid completion is atomic\nPASS due summary counts active dates at exact 30-day boundary\nPASS tasks and completion history survive restart\n{\"result\":\"passed\",\"mode\":\"maintenance\",\"groups\":6,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:57.691Z\"}\n",
        "durationMs": 331,
        "stamp": {
          "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
            "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
            "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
            "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
            "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
            "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T152604-46b3d576",
          "throughSeq": 115,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T152604-46b3d576",
            "seq": 105,
            "eventId": "96adde45-f060-49f9-a211-73bce20090bc",
            "at": "2026-10-20T16:08:57.774Z",
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
      "sourceRunId": "20261020T152604-46b3d576",
      "sourceSeq": 115,
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
      "evidenceId": "29a94599-2a19-42ad-8aa0-fe36b8488e6b",
      "evidence": {
        "id": "29a94599-2a19-42ad-8aa0-fe36b8488e6b",
        "nodeId": "4343a40f-13a8-4db8-87a6-01860fa546d6",
        "criterionId": "maintenance-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T16:08:59.756Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "maintenance-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"maintenance-ui\",\"groups\":3,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T152604-46b3d576\",\"at\":\"2026-10-20T16:08:59.738Z\"}\n",
        "durationMs": 1813,
        "stamp": {
          "head": "6ca9f2e7e21e990662505af6b18850f56f0eae98",
          "files": {
            ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
            "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
            "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
            "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
            "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
            "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
            "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
            "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
            "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
            "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
            "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
            "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
            "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
            "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
            "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
            "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
            "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
          },
          "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T152604-46b3d576",
          "throughSeq": 115,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T152604-46b3d576",
            "seq": 107,
            "eventId": "488e17e6-c8c6-46cc-9c71-81ae450b00b1",
            "at": "2026-10-20T16:08:59.817Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Safe return and complete handover (safe-return)

Saved outcome status: RUNNING. Source run: 20261020T161136-f1baf0a7.

```text
Implement outcome 4 in BRIEF.md: exact JSON backup/download and validated atomic explicit restore in API and UI, recovery/error states, truthful README with startup/data/backup/limits. Review the whole final product and resolve material gaps against the approved goal; deliver something the returning operator can use without technical coaching.
```

Prerequisite outcomes: maintenance-workflow.

#### Recorded checkpoint

Checkpoint receipt unavailable: no checkpoint is recorded.

```json
{
  "status": "NOT_RECORDED",
  "sourceRunId": "20261020T161136-f1baf0a7",
  "sourceSeq": null,
  "contractVersion": null,
  "runStatus": null,
  "boundaryEvent": null,
  "unavailableReason": "No checkpoint receipt is recorded."
}
```

#### Criteria (latest recorded state; no checkpoint proof)

- backup: Exact backup/restore is validated, atomic and documented — PASSED; evidence ID: 860e6591-6ca6-4359-81f4-d20c5f5098d5.

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
  "basis": "latest-recorded-state",
  "sourceRunId": "20261020T161136-f1baf0a7",
  "sourceSeq": 72,
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
  "evidenceId": "860e6591-6ca6-4359-81f4-d20c5f5098d5",
  "evidence": {
    "id": "860e6591-6ca6-4359-81f4-d20c5f5098d5",
    "nodeId": "508a30bc-37d1-4aa4-a108-cc85efe65a96",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:29:52.806Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:52.797Z\"}\n",
    "durationMs": 337,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 61,
        "eventId": "a051ba3d-967a-44b3-91bf-1ea1c48392d5",
        "at": "2026-10-20T16:29:52.870Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- backup-ui: User downloads and explicitly confirms data replacement in the interface — PASSED; evidence ID: d3efa6f6-7639-4e5e-acb4-d5aa8e250b98.

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
  "basis": "latest-recorded-state",
  "sourceRunId": "20261020T161136-f1baf0a7",
  "sourceSeq": 72,
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
  "evidenceId": "d3efa6f6-7639-4e5e-acb4-d5aa8e250b98",
  "evidence": {
    "id": "d3efa6f6-7639-4e5e-acb4-d5aa8e250b98",
    "nodeId": "1b7ebe21-2789-4e60-98e2-42d036ce6fbe",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:29:54.984Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:54.958Z\"}\n",
    "durationMs": 2054,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 63,
        "eventId": "c55162ce-ad48-4874-b800-cdde8e4ed7cb",
        "at": "2026-10-20T16:29:55.044Z",
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
    "id": "6a6f43fa-e44d-481c-969a-5ecef1eee737",
    "nodeId": "6842663c-9655-485b-a561-80af99b533bf",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T16:13:54.290Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 1,
    "output": "AssertionError [ERR_ASSERTION]: {\"status\":404,\"data\":{\"error\":\"Risorsa non trovata.\"}}\n    at good (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:24:158)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async backup (file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:65:11)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:108:36\n(node:65029) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:62055\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-hfukxR/data/custode.sqlite\n\n",
    "durationMs": 206,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 19,
        "eventId": "700c7154-21a0-4bc1-b440-54092af6c203",
        "at": "2026-10-20T16:13:54.330Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "14ca2c68-b545-414c-a326-b9a63697609c",
    "nodeId": "6acd091a-ce5e-4da6-926a-0560bea0fb92",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T16:14:05.957Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 1,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nlocator.click: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Backup', exact: true })\n    - locator resolved to <button disabled type=\"button\" class=\"nav-button\" aria-label=\"Backup\" aria-describedby=\"backup-availability\">…</button>\n  - attempting click action\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n    - waiting 20ms\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n      - waiting 100ms\n    19 × waiting for element to be visible, enabled and stable\n       - element is not enabled\n     - retrying click action\n       - waiting 500ms\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:94:63)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:109:39\n(node:65085) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:62060\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-IFN95e/data/custode.sqlite\n\n",
    "durationMs": 11620,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "b4adb8ae6d55b6e7b897c9e7503f979602272fb9fb86f49f737e6c4b4e18335a",
        "docs/api-manutenzioni.md": "68f61042d0860ba3352578acac89426b3ce928cf65764276ace49024c4f8f3a0",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "b9280bf4f3809df0ca81c549221e303f8c2c8430718ff3edcdc0937c82ecf108",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "f1fef9916d2ea0dabb9305a5be372736754d5e66cb52d9a24bb0bd4d07d197cb",
        "src/store.mjs": "3fa2e280d9acb4603501c345e04b105dd478bbcd388c658eb17697df140930d1",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "557abda9249d3e1508accfa61d02ba601c72cc25870fea40d997d107a4b2c3c0"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 21,
        "eventId": "86010f30-46a7-4a8c-b0e1-6e79a7f855f4",
        "at": "2026-10-20T16:14:05.999Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "cdb3a6cd-351a-4e83-b05a-369b53e976e4",
    "nodeId": "010d110c-4b4f-4aa3-9b10-7deffa465d2e",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T16:20:00.345Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:20:00.339Z\"}\n",
    "durationMs": 323,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "0c7dcad3351653fa83fae80c543847fe34fad38103b1013845df8bb2581719b8",
        "docs/api-backup.md": "6ccc584f02c16328b73584045fd72fe0ce6df9f053fc97a6856e9d19441ff04b",
        "docs/api-manutenzioni.md": "3873272bffeebe99af677e300971424ab5789f425a94f0ff1a45ef115020bcb5",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "943c1e273a7e4567af68d2912763c51eee552b3ac43170adf1299b435c5c324b",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "633954f45ad33d09af95f76e1882305522a62628e806a12fcb680d3c18898b2c"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/api-backup.md, docs/api-manutenzioni.md, docs/ui-manutenzioni.md, public/app.js, public/index.html, public/styles.css, docs/ui-backup.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 37,
        "eventId": "1f7ebbed-8f11-484c-b423-f417b86b82ad",
        "at": "2026-10-20T16:20:00.390Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "f4a563ed-8da3-418a-9d77-775eff182fcf",
    "nodeId": "e91a0cfa-b7ee-481f-ab1b-2a046d4eb875",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T16:20:15.883Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 1,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nlocator.click: Timeout 10000ms exceeded.\nCall log:\n  - waiting for getByRole('button', { name: 'Backup', exact: true })\n    - locator resolved to <button disabled type=\"button\" class=\"nav-button\" aria-label=\"Backup\" aria-describedby=\"backup-availability\">…</button>\n  - attempting click action\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n    - waiting 20ms\n    2 × waiting for element to be visible, enabled and stable\n      - element is not enabled\n    - retrying click action\n      - waiting 100ms\n    19 × waiting for element to be visible, enabled and stable\n       - element is not enabled\n     - retrying click action\n       - waiting 500ms\n\n    at browserTest (/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:94:63)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7/tests/acceptance.mjs:109:39\n(node:70388) ExperimentalWarning: SQLite is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\nCustode: http://127.0.0.1:62395\nArchivio: /private/var/folders/k7/2rlbl1h51118fckf6h7txry40000gn/T/custode-acceptance-4x1IOa/data/custode.sqlite\n\n",
    "durationMs": 11719,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
      "files": {
        ".gitignore": "38af0c189b6ea42f53b44594ce1cb8fe26b4861079fe816e4babbbb8c0b33374",
        "BRIEF.md": "6d924142cfafaf42c0f91215fa4a44e3c24022079e585d462081a732491bdb01",
        "README.md": "0c7dcad3351653fa83fae80c543847fe34fad38103b1013845df8bb2581719b8",
        "docs/api-backup.md": "6ccc584f02c16328b73584045fd72fe0ce6df9f053fc97a6856e9d19441ff04b",
        "docs/api-manutenzioni.md": "3873272bffeebe99af677e300971424ab5789f425a94f0ff1a45ef115020bcb5",
        "docs/ui-inventario.md": "b56253513a73c9bca6e8c07814c9853c1613641aa658b87f23289fa5f73f41aa",
        "docs/ui-manutenzioni.md": "943c1e273a7e4567af68d2912763c51eee552b3ac43170adf1299b435c5c324b",
        "package.json": "059e15020af9ea47307d8b9b6112991177ee25f1458b9351ea0a6c61a1bb1c1c",
        "public/app.js": "b680742d22345bd547aad5b3bd796be27bf1e5ac77c0d44f913cd49c4eee1349",
        "public/favicon.svg": "b4fddcb795fed38eb7025b73d3e941bf19b1b1407c9bd99a0d513f1f08fc424e",
        "public/index.html": "b85d872d30d339aedd10c735589895b9a60d2cdf2a591944abf561aa4666ce8e",
        "public/styles.css": "09c6b701023e2578d3f6e891ca02fe85d4ed15d8d84be9119312f7787b48b435",
        "src/backup.mjs": "e6a6b58667e1fad0d9dd2e21e351eadb500cb33d06d6c7bfdb52cf91a03c4661",
        "src/errors.mjs": "e80649a6029653512539fab5b2a950aa01ce047c48c709af23ead8d89f1a2cde",
        "src/inventory.mjs": "abd476e31241a521120d30a65de8587b7124eef594ad1264133521509867bee8",
        "src/maintenance.mjs": "9a1576c725c755efddbda8252b18f56a8616bb838cee53501817e692f51c9994",
        "src/server.mjs": "ecdcd6e7ba249b28d49c399f30cfecd5d393d63c63a69a4dd72ac4b7e537561e",
        "src/store.mjs": "e10978d6dc097997fd98a55f741708c02e3eaebdaa2cf5ef68b8eb0f9964b1c6",
        "tests/acceptance.mjs": "cd51582a782f0400fe1729ba27b4df50a388c0057f6f41ad63fed52ef8c1aaf3"
      },
      "fingerprint": "633954f45ad33d09af95f76e1882305522a62628e806a12fcb680d3c18898b2c"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 44,
        "eventId": "552856e3-6419-487e-a0c0-1a28d012d403",
        "at": "2026-10-20T16:20:15.928Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "860e6591-6ca6-4359-81f4-d20c5f5098d5",
    "nodeId": "508a30bc-37d1-4aa4-a108-cc85efe65a96",
    "criterionId": "backup",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:29:52.806Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup"
    ],
    "exitCode": 0,
    "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:52.797Z\"}\n",
    "durationMs": 337,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 61,
        "eventId": "a051ba3d-967a-44b3-91bf-1ea1c48392d5",
        "at": "2026-10-20T16:29:52.870Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d3efa6f6-7639-4e5e-acb4-d5aa8e250b98",
    "nodeId": "1b7ebe21-2789-4e60-98e2-42d036ce6fbe",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T16:29:54.984Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:54.958Z\"}\n",
    "durationMs": 2054,
    "stamp": {
      "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
    "source": {
      "runId": "20261020T161136-f1baf0a7",
      "throughSeq": 72,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T161136-f1baf0a7",
        "seq": 63,
        "eventId": "c55162ce-ad48-4874-b800-cdde8e4ed7cb",
        "at": "2026-10-20T16:29:55.044Z",
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
  "runId": "20261020T161136-f1baf0a7",
  "seq": 72,
  "at": "2026-10-20T16:58:48.571Z",
  "status": "BLOCKED",
  "reason": "The operation was aborted",
  "contractVersion": 1,
  "hasLaterEvents": null,
  "criteria": [
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
      "sourceRunId": "20261020T161136-f1baf0a7",
      "sourceSeq": 72,
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
      "evidenceId": "860e6591-6ca6-4359-81f4-d20c5f5098d5",
      "evidence": {
        "id": "860e6591-6ca6-4359-81f4-d20c5f5098d5",
        "nodeId": "508a30bc-37d1-4aa4-a108-cc85efe65a96",
        "criterionId": "backup",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T16:29:52.806Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup"
        ],
        "exitCode": 0,
        "output": "PASS backup restore round-trip preserves exact identities and dates\nPASS malformed, duplicate and dangling backups never partially overwrite\nPASS bounded HTTP input and restored data durable after restart\nPASS operator guide explains actual launch and data recovery\n{\"result\":\"passed\",\"mode\":\"backup\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:52.797Z\"}\n",
        "durationMs": 337,
        "stamp": {
          "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
        "source": {
          "runId": "20261020T161136-f1baf0a7",
          "throughSeq": 72,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T161136-f1baf0a7",
            "seq": 61,
            "eventId": "a051ba3d-967a-44b3-91bf-1ea1c48392d5",
            "at": "2026-10-20T16:29:52.870Z",
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
      "sourceRunId": "20261020T161136-f1baf0a7",
      "sourceSeq": 72,
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
      "evidenceId": "d3efa6f6-7639-4e5e-acb4-d5aa8e250b98",
      "evidence": {
        "id": "d3efa6f6-7639-4e5e-acb4-d5aa8e250b98",
        "nodeId": "1b7ebe21-2789-4e60-98e2-42d036ce6fbe",
        "criterionId": "backup-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T16:29:54.984Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-ui"
        ],
        "exitCode": 0,
        "output": "PASS browser creates, searches, edits and reloads real inventory\nPASS browser schedules, completes, advances recurrence and shows history\nPASS browser downloads and requires explicit consent before restoring\nPASS 390px layout, no page errors, no remote resources\n{\"result\":\"passed\",\"mode\":\"backup-ui\",\"groups\":4,\"worktree\":\"/Users/vins/work/iterfox/.iterfox/missions/night-custode-20261020/data/worktrees/20261020T161136-f1baf0a7\",\"at\":\"2026-10-20T16:29:54.958Z\"}\n",
        "durationMs": 2054,
        "stamp": {
          "head": "cb513eb21a98abdc21aae66debcd93ee98c01673",
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
        "source": {
          "runId": "20261020T161136-f1baf0a7",
          "throughSeq": 72,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T161136-f1baf0a7",
            "seq": 63,
            "eventId": "c55162ce-ad48-4874-b800-cdde8e4ed7cb",
            "at": "2026-10-20T16:29:55.044Z",
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
