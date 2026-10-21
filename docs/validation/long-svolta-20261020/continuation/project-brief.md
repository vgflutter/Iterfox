# Project brief

Delegation: 5b9630cd-ff8a-4636-ba99-a49b077cb364; saved status: COMPLETED; revision: 11.
Saved update: 2026-10-21T00:05:40.998Z; report observed at: 2026-10-21T00:05:41.067Z.

2/2 outcomes checkpointed; 0 pending. Repeated cumulative checks do not count as additional outcomes.

Product review required: true. Not established by technical checkpoints; operator product review is required.

## Original goal

```text
Realizzare Svolta, app locale in italiano per progetti, attività, settimana, tempo dedicato e backup. Proseguire sul candidato esistente, che ha già cinque criteri host verdi ma non un checkpoint certificato: la revisione precedente si è fermata per riferimenti a file o prove non validi. Il nuovo runtime può chiedere una revisione corretta entro maxAttempts, mantenendo invariati contratto, prove e limiti. Ricertificare da zero e completare il backup e la consegna, conservando funzionalità e scelte visuali già implementate. Non rifare flussi già funzionanti. Correggere solo lacune concrete osservate. Seguire BRIEF.md; scelte reversibili autonome, niente servizi esterni, dipendenze o pubblicazione. Le evidenze precedenti restano contesto storico.
```

## Original authorization and limits

Authorized at: 2026-10-20T23:19:56.574Z. Approval hash: d709e9d758158e91b750d0c97fde876f700f2f0f034ce22dd0e747af56c2e70a. Original source HEAD: d9cb9d910812e6a632d2765b205963466a47c16a.
Repository: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/source; provider: codex.

```json
{
  "maxTurns": 104,
  "maxAttempts": 4,
  "maxDurationMs": 5429746,
  "maxTokens": 86305444,
  "turnTimeoutMs": 720000,
  "maxNoProgress": 4
}
```

## Shared usage and remaining budgets

17 reported turns; 8375327 reported tokens. Totals cover all linked missions.

Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable.

```json
{
  "turns": 17,
  "tokens": 8375327,
  "runIds": [
    "20261020T231956-19cf8a63",
    "20261020T234131-6d40b050"
  ],
  "unavailableRunIds": [],
  "complete": true,
  "missions": [
    {
      "runId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "turns": 7,
      "tokens": 3278323
    },
    {
      "runId": "20261020T234131-6d40b050",
      "sourceSeq": 159,
      "turns": 10,
      "tokens": 5097004
    }
  ],
  "authorizedAt": "2026-10-20T23:19:56.574Z",
  "observedAt": "2026-10-21T00:05:41.067Z",
  "elapsedMs": 2744493,
  "authorizationDeadline": "2026-10-21T00:50:26.320Z",
  "remainingDurationMs": 2685253,
  "remainingTurns": 87,
  "remainingTokens": 77930117,
  "accounting": "Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable."
}
```

## Attention

No saved blocking reason or unresolved linked question is recorded in the available history.

## Outcomes

### Dalla lista al piano settimanale e al tempo reale (weekly-work)

Saved outcome status: CHECKPOINTED. Source run: 20261020T231956-19cf8a63.

```text
Ricertificare tutti e cinque i criteri sul candidato già sviluppato: progetti, attività, interfaccia, settimana e sessioni API/UI. Questi cinque controlli passavano nella prova precedente; preservare il codice. Colmare soltanto eventuali lacune concrete della guida o dell’esperienza individuate dalle nuove prove e dalla revisione. Il backup resta il risultato successivo.
```

Prerequisite outcomes: none.

#### Recorded checkpoint

Checkpoint SHA: a8cebbaa4e32b45f46a04fc0b2c30d95511cf473
Ref: refs/iterfox/checkpoints/5b9630cd-ff8a-4636-ba99-a49b077cb364/weekly-work
Source fingerprint: 402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b
Source sequence: 84; recorded at: 2026-10-20T23:41:31.047Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T231956-19cf8a63",
    "seq": 84,
    "eventId": "7ce33a78-9f42-4846-a55a-a18cd7d7d805",
    "at": "2026-10-20T23:41:30.697Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- projects-api: Archivio progetti persistente e revisioni — PASSED; evidence ID: 4a133a1a-745c-4843-ae3a-556453cf99c5.

```json
{
  "id": "projects-api",
  "title": "Archivio progetti persistente e revisioni",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "projects-api"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "projects-api",
    "title": "Archivio progetti persistente e revisioni",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "4a133a1a-745c-4843-ae3a-556453cf99c5",
  "evidence": {
    "id": "4a133a1a-745c-4843-ae3a-556453cf99c5",
    "nodeId": "15156033-b1a0-4ad5-a674-52caf6e35951",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:42.091Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1339,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 69,
        "eventId": "d11b755b-eed7-4c8b-8b09-8426bff74ad5",
        "at": "2026-10-20T23:39:42.127Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- tasks-api: Attività, filtri e conflitti senza perdita di dati — PASSED; evidence ID: d40f7a51-dc52-4c93-8b78-b6842c88c326.

```json
{
  "id": "tasks-api",
  "title": "Attività, filtri e conflitti senza perdita di dati",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "tasks-api"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "tasks-api",
    "title": "Attività, filtri e conflitti senza perdita di dati",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "d40f7a51-dc52-4c93-8b78-b6842c88c326",
  "evidence": {
    "id": "d40f7a51-dc52-4c93-8b78-b6842c88c326",
    "nodeId": "df5449f1-fca6-4782-841f-41ac56475143",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:43.644Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1355,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 71,
        "eventId": "e7fd3c06-684f-40ef-a0e7-6f9e26ecbe23",
        "at": "2026-10-20T23:39:43.683Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- board-ui: Interfaccia progetti e attività su desktop e mobile — PASSED; evidence ID: a05b5131-324c-4757-8174-8d497962c355.

```json
{
  "id": "board-ui",
  "title": "Interfaccia progetti e attività su desktop e mobile",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "board-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "board-ui",
    "title": "Interfaccia progetti e attività su desktop e mobile",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "a05b5131-324c-4757-8174-8d497962c355",
  "evidence": {
    "id": "a05b5131-324c-4757-8174-8d497962c355",
    "nodeId": "8aaf2810-d1c6-4c56-9c2e-cae8b2a2f2a3",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:46.864Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 2973,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 73,
        "eventId": "7774f916-4999-4c47-8419-510257dad23e",
        "at": "2026-10-20T23:39:46.908Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- planning-api: Settimana civile, sessioni e riepilogo coerente — PASSED; evidence ID: e2261532-1401-4deb-9282-62e0192aaeea.

```json
{
  "id": "planning-api",
  "title": "Settimana civile, sessioni e riepilogo coerente",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "planning-api"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "planning-api",
    "title": "Settimana civile, sessioni e riepilogo coerente",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "e2261532-1401-4deb-9282-62e0192aaeea",
  "evidence": {
    "id": "e2261532-1401-4deb-9282-62e0192aaeea",
    "nodeId": "406c9dc5-bf72-47ca-8bd1-d7928c77d4a4",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:48.552Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 0,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nPASS weekly time and full-archive task counts are distinguished\nPASS invalid time entries do not write\nPASS deleting one session updates totals without deleting others\nPASS archiving a task preserves history and restart\n{\"criterion\":\"planning-api\",\"result\":\"PASS\",\"groups\":7}\n",
    "durationMs": 1378,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 75,
        "eventId": "7ea75f6f-038d-484d-9816-a6936489706d",
        "at": "2026-10-20T23:39:48.589Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- planning-ui: Pianificazione e tempo dal browser — PASSED; evidence ID: 8345fd57-feef-41ff-8748-2372fbc0fffc.

```json
{
  "id": "planning-ui",
  "title": "Pianificazione e tempo dal browser",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "planning-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T231956-19cf8a63",
  "sourceSeq": 84,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "planning-ui",
    "title": "Pianificazione e tempo dal browser",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "8345fd57-feef-41ff-8748-2372fbc0fffc",
  "evidence": {
    "id": "8345fd57-feef-41ff-8748-2372fbc0fffc",
    "nodeId": "6f55dcab-92b6-4362-8441-dfae0f528fc3",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:51.177Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 0,
    "output": "PASS reschedule a task and see it in its actual weekly day\nPASS time entry changes the real week summary\nPASS weekly mobile layout and persisted sessions\n{\"criterion\":\"planning-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2267,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 77,
        "eventId": "c0d2b6b7-4858-4d29-8055-006f84b8e99f",
        "at": "2026-10-20T23:39:51.219Z",
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
    "id": "facf3661-7b99-4c93-b517-2c4243e13fe1",
    "nodeId": "80b13580-f782-4f85-b429-2aa2975b568f",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:21:07.146Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1325,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "66888882a54cfc1141b2b069976a7c1d83b54d28f3f65d60d61d835545e35ed4",
        "docs/guida.md": "1674703f22a654a73d601fcabdfd0f998fd5c59a05cbe829aced1f95467e036f",
        "docs/verifiche.md": "56c6354ccd853948940dd67c6579bef72fff630f01941d064ed58eb78da64090",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "14acd491b91b02bc5303cbbeeba818b05a164dfa845d5b30376b0641c5b11376"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 11,
        "eventId": "58a44059-104c-4f87-88d0-e0476f499f7d",
        "at": "2026-10-20T23:21:07.189Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "1cfa0cc1-186d-48d9-9fb3-b32f8a10cb96",
    "nodeId": "fcdbd644-1a87-4cd5-94e6-c1f9b501f435",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:21:08.536Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1345,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "66888882a54cfc1141b2b069976a7c1d83b54d28f3f65d60d61d835545e35ed4",
        "docs/guida.md": "1674703f22a654a73d601fcabdfd0f998fd5c59a05cbe829aced1f95467e036f",
        "docs/verifiche.md": "56c6354ccd853948940dd67c6579bef72fff630f01941d064ed58eb78da64090",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "14acd491b91b02bc5303cbbeeba818b05a164dfa845d5b30376b0641c5b11376"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 13,
        "eventId": "9fea1875-f1b3-4060-8463-c0794217c386",
        "at": "2026-10-20T23:21:08.578Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "1c7906dd-faf3-4732-997b-71b026751ab5",
    "nodeId": "d0c15913-3b72-4813-85ae-025a56f3796e",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:21:11.132Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 2549,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "66888882a54cfc1141b2b069976a7c1d83b54d28f3f65d60d61d835545e35ed4",
        "docs/guida.md": "1674703f22a654a73d601fcabdfd0f998fd5c59a05cbe829aced1f95467e036f",
        "docs/verifiche.md": "56c6354ccd853948940dd67c6579bef72fff630f01941d064ed58eb78da64090",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "14acd491b91b02bc5303cbbeeba818b05a164dfa845d5b30376b0641c5b11376"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 15,
        "eventId": "31e8168b-9c08-4f92-82ba-ef994f09b326",
        "at": "2026-10-20T23:21:11.176Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "16ee71cc-5da5-43d5-ba3c-ec00ffc63539",
    "nodeId": "012b48b2-8db7-4436-a9b5-d3894ad3c408",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:21:12.553Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 0,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nPASS weekly time and full-archive task counts are distinguished\nPASS invalid time entries do not write\nPASS deleting one session updates totals without deleting others\nPASS archiving a task preserves history and restart\n{\"criterion\":\"planning-api\",\"result\":\"PASS\",\"groups\":7}\n",
    "durationMs": 1370,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "66888882a54cfc1141b2b069976a7c1d83b54d28f3f65d60d61d835545e35ed4",
        "docs/guida.md": "1674703f22a654a73d601fcabdfd0f998fd5c59a05cbe829aced1f95467e036f",
        "docs/verifiche.md": "56c6354ccd853948940dd67c6579bef72fff630f01941d064ed58eb78da64090",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "14acd491b91b02bc5303cbbeeba818b05a164dfa845d5b30376b0641c5b11376"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 17,
        "eventId": "3f1b5c77-613d-4e85-995e-64de388a2f02",
        "at": "2026-10-20T23:21:12.596Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "c7e940fe-0f71-4517-84bc-4c87abb245a5",
    "nodeId": "a4578e95-e8c4-44e5-b95f-b033661d002a",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:21:14.827Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 0,
    "output": "PASS reschedule a task and see it in its actual weekly day\nPASS time entry changes the real week summary\nPASS weekly mobile layout and persisted sessions\n{\"criterion\":\"planning-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2226,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "66888882a54cfc1141b2b069976a7c1d83b54d28f3f65d60d61d835545e35ed4",
        "docs/guida.md": "1674703f22a654a73d601fcabdfd0f998fd5c59a05cbe829aced1f95467e036f",
        "docs/verifiche.md": "56c6354ccd853948940dd67c6579bef72fff630f01941d064ed58eb78da64090",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "14acd491b91b02bc5303cbbeeba818b05a164dfa845d5b30376b0641c5b11376"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 19,
        "eventId": "aa1af638-2e1f-46ae-a12d-23261fd9161c",
        "at": "2026-10-20T23:21:14.871Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "3c82b042-9f7c-4207-8427-fb9c3406ce17",
    "nodeId": "27ecd3e8-4d88-4d49-8560-984cc155695b",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:23:06.336Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1345,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "6c3119adcf1a4a81760553de43941f9a5abe329db9cf7b5eff57e77af8b51960",
        "docs/guida.md": "61607a6c375a3f4132eebb3a3d39208e4a92ddf447d2733cd48368b1bfc084f2",
        "docs/verifiche.md": "52511bc3053c576e6e65270a41ea914f4c1e44a18d3b7db82e3e5f256106e6be",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "17defd4dcff0883747c7d2aa4aa673621ee0c9a8020e81620fc4af7f5c8fc30d"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 33,
        "eventId": "1532cad2-51a2-4164-8e6f-20a70d6e67cc",
        "at": "2026-10-20T23:23:06.380Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "baae52cf-7226-4160-b412-8c863433580a",
    "nodeId": "669034f1-17b5-4c23-b6f7-c05938498573",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:23:07.796Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1365,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "6c3119adcf1a4a81760553de43941f9a5abe329db9cf7b5eff57e77af8b51960",
        "docs/guida.md": "61607a6c375a3f4132eebb3a3d39208e4a92ddf447d2733cd48368b1bfc084f2",
        "docs/verifiche.md": "52511bc3053c576e6e65270a41ea914f4c1e44a18d3b7db82e3e5f256106e6be",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "17defd4dcff0883747c7d2aa4aa673621ee0c9a8020e81620fc4af7f5c8fc30d"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 35,
        "eventId": "6100e5b5-0175-4d1f-9a6a-1bccedfa9b60",
        "at": "2026-10-20T23:23:07.837Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "e822bee2-e285-4dbf-b70f-eff14886d902",
    "nodeId": "ec385023-eb90-4a0e-99cf-5735598c7823",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:23:10.516Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 2595,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "6c3119adcf1a4a81760553de43941f9a5abe329db9cf7b5eff57e77af8b51960",
        "docs/guida.md": "61607a6c375a3f4132eebb3a3d39208e4a92ddf447d2733cd48368b1bfc084f2",
        "docs/verifiche.md": "52511bc3053c576e6e65270a41ea914f4c1e44a18d3b7db82e3e5f256106e6be",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "17defd4dcff0883747c7d2aa4aa673621ee0c9a8020e81620fc4af7f5c8fc30d"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 37,
        "eventId": "f8c4d0cb-c5ae-4875-ba69-002ee814e59f",
        "at": "2026-10-20T23:23:10.551Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "1065d21b-6b6d-4bb2-ac36-1e7177cfb9ba",
    "nodeId": "21b95f9b-0f3c-4411-a61e-d11eb6282839",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:23:12.037Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 0,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nPASS weekly time and full-archive task counts are distinguished\nPASS invalid time entries do not write\nPASS deleting one session updates totals without deleting others\nPASS archiving a task preserves history and restart\n{\"criterion\":\"planning-api\",\"result\":\"PASS\",\"groups\":7}\n",
    "durationMs": 1372,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "6c3119adcf1a4a81760553de43941f9a5abe329db9cf7b5eff57e77af8b51960",
        "docs/guida.md": "61607a6c375a3f4132eebb3a3d39208e4a92ddf447d2733cd48368b1bfc084f2",
        "docs/verifiche.md": "52511bc3053c576e6e65270a41ea914f4c1e44a18d3b7db82e3e5f256106e6be",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "17defd4dcff0883747c7d2aa4aa673621ee0c9a8020e81620fc4af7f5c8fc30d"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 39,
        "eventId": "f2c742ff-6142-4666-b226-eb51f733f6a8",
        "at": "2026-10-20T23:23:12.073Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "e2fafac5-859e-4a51-877b-8def02d67b1b",
    "nodeId": "4f1862ce-9874-4789-a5d4-b091bb35d8f4",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:23:14.473Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 0,
    "output": "PASS reschedule a task and see it in its actual weekly day\nPASS time entry changes the real week summary\nPASS weekly mobile layout and persisted sessions\n{\"criterion\":\"planning-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2247,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "6c3119adcf1a4a81760553de43941f9a5abe329db9cf7b5eff57e77af8b51960",
        "docs/guida.md": "61607a6c375a3f4132eebb3a3d39208e4a92ddf447d2733cd48368b1bfc084f2",
        "docs/verifiche.md": "52511bc3053c576e6e65270a41ea914f4c1e44a18d3b7db82e3e5f256106e6be",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "17defd4dcff0883747c7d2aa4aa673621ee0c9a8020e81620fc4af7f5c8fc30d"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 41,
        "eventId": "64a4f486-8b6e-4b4c-88e0-3b92a4b482e4",
        "at": "2026-10-20T23:23:14.507Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "4a133a1a-745c-4843-ae3a-556453cf99c5",
    "nodeId": "15156033-b1a0-4ad5-a674-52caf6e35951",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:42.091Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1339,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 69,
        "eventId": "d11b755b-eed7-4c8b-8b09-8426bff74ad5",
        "at": "2026-10-20T23:39:42.127Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d40f7a51-dc52-4c93-8b78-b6842c88c326",
    "nodeId": "df5449f1-fca6-4782-841f-41ac56475143",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:43.644Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1355,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 71,
        "eventId": "e7fd3c06-684f-40ef-a0e7-6f9e26ecbe23",
        "at": "2026-10-20T23:39:43.683Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "a05b5131-324c-4757-8174-8d497962c355",
    "nodeId": "8aaf2810-d1c6-4c56-9c2e-cae8b2a2f2a3",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:46.864Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 2973,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 73,
        "eventId": "7774f916-4999-4c47-8419-510257dad23e",
        "at": "2026-10-20T23:39:46.908Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "e2261532-1401-4deb-9282-62e0192aaeea",
    "nodeId": "406c9dc5-bf72-47ca-8bd1-d7928c77d4a4",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:48.552Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 0,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nPASS weekly time and full-archive task counts are distinguished\nPASS invalid time entries do not write\nPASS deleting one session updates totals without deleting others\nPASS archiving a task preserves history and restart\n{\"criterion\":\"planning-api\",\"result\":\"PASS\",\"groups\":7}\n",
    "durationMs": 1378,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 75,
        "eventId": "7ea75f6f-038d-484d-9816-a6936489706d",
        "at": "2026-10-20T23:39:48.589Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "8345fd57-feef-41ff-8748-2372fbc0fffc",
    "nodeId": "6f55dcab-92b6-4362-8441-dfae0f528fc3",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T23:39:51.177Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 0,
    "output": "PASS reschedule a task and see it in its actual weekly day\nPASS time entry changes the real week summary\nPASS weekly mobile layout and persisted sessions\n{\"criterion\":\"planning-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2267,
    "stamp": {
      "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T231956-19cf8a63",
      "throughSeq": 84,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T231956-19cf8a63",
        "seq": 77,
        "eventId": "c0d2b6b7-4858-4d29-8055-006f84b8e99f",
        "at": "2026-10-20T23:39:51.219Z",
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
  "runId": "20261020T231956-19cf8a63",
  "seq": 84,
  "at": "2026-10-20T23:41:30.697Z",
  "status": "COMPLETED",
  "reason": null,
  "contractVersion": 1,
  "hasLaterEvents": false,
  "criteria": [
    {
      "id": "projects-api",
      "title": "Archivio progetti persistente e revisioni",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "projects-api"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "projects-api",
        "title": "Archivio progetti persistente e revisioni",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "projects-api"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "4a133a1a-745c-4843-ae3a-556453cf99c5",
      "evidence": {
        "id": "4a133a1a-745c-4843-ae3a-556453cf99c5",
        "nodeId": "15156033-b1a0-4ad5-a674-52caf6e35951",
        "criterionId": "projects-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T23:39:42.091Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "projects-api"
        ],
        "exitCode": 0,
        "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
        "durationMs": 1339,
        "stamp": {
          "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
            "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
            "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
            "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
            "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
            "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
            "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T231956-19cf8a63",
          "throughSeq": 84,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T231956-19cf8a63",
            "seq": 69,
            "eventId": "d11b755b-eed7-4c8b-8b09-8426bff74ad5",
            "at": "2026-10-20T23:39:42.127Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "tasks-api",
      "title": "Attività, filtri e conflitti senza perdita di dati",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "tasks-api"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "tasks-api",
        "title": "Attività, filtri e conflitti senza perdita di dati",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "tasks-api"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "d40f7a51-dc52-4c93-8b78-b6842c88c326",
      "evidence": {
        "id": "d40f7a51-dc52-4c93-8b78-b6842c88c326",
        "nodeId": "df5449f1-fca6-4782-841f-41ac56475143",
        "criterionId": "tasks-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T23:39:43.644Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "tasks-api"
        ],
        "exitCode": 0,
        "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
        "durationMs": 1355,
        "stamp": {
          "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
            "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
            "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
            "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
            "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
            "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
            "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T231956-19cf8a63",
          "throughSeq": 84,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T231956-19cf8a63",
            "seq": 71,
            "eventId": "e7fd3c06-684f-40ef-a0e7-6f9e26ecbe23",
            "at": "2026-10-20T23:39:43.683Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "board-ui",
      "title": "Interfaccia progetti e attività su desktop e mobile",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "board-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "board-ui",
        "title": "Interfaccia progetti e attività su desktop e mobile",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "board-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "a05b5131-324c-4757-8174-8d497962c355",
      "evidence": {
        "id": "a05b5131-324c-4757-8174-8d497962c355",
        "nodeId": "8aaf2810-d1c6-4c56-9c2e-cae8b2a2f2a3",
        "criterionId": "board-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T23:39:46.864Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "board-ui"
        ],
        "exitCode": 0,
        "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
        "durationMs": 2973,
        "stamp": {
          "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
            "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
            "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
            "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
            "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
            "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
            "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T231956-19cf8a63",
          "throughSeq": 84,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T231956-19cf8a63",
            "seq": 73,
            "eventId": "7774f916-4999-4c47-8419-510257dad23e",
            "at": "2026-10-20T23:39:46.908Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "planning-api",
      "title": "Settimana civile, sessioni e riepilogo coerente",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "planning-api"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "planning-api",
        "title": "Settimana civile, sessioni e riepilogo coerente",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-api"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "e2261532-1401-4deb-9282-62e0192aaeea",
      "evidence": {
        "id": "e2261532-1401-4deb-9282-62e0192aaeea",
        "nodeId": "406c9dc5-bf72-47ca-8bd1-d7928c77d4a4",
        "criterionId": "planning-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T23:39:48.552Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-api"
        ],
        "exitCode": 0,
        "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nPASS weekly time and full-archive task counts are distinguished\nPASS invalid time entries do not write\nPASS deleting one session updates totals without deleting others\nPASS archiving a task preserves history and restart\n{\"criterion\":\"planning-api\",\"result\":\"PASS\",\"groups\":7}\n",
        "durationMs": 1378,
        "stamp": {
          "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
            "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
            "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
            "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
            "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
            "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
            "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T231956-19cf8a63",
          "throughSeq": 84,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T231956-19cf8a63",
            "seq": 75,
            "eventId": "7ea75f6f-038d-484d-9816-a6936489706d",
            "at": "2026-10-20T23:39:48.589Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "planning-ui",
      "title": "Pianificazione e tempo dal browser",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "planning-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T231956-19cf8a63",
      "sourceSeq": 84,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "planning-ui",
        "title": "Pianificazione e tempo dal browser",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "8345fd57-feef-41ff-8748-2372fbc0fffc",
      "evidence": {
        "id": "8345fd57-feef-41ff-8748-2372fbc0fffc",
        "nodeId": "6f55dcab-92b6-4362-8441-dfae0f528fc3",
        "criterionId": "planning-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T23:39:51.177Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-ui"
        ],
        "exitCode": 0,
        "output": "PASS reschedule a task and see it in its actual weekly day\nPASS time entry changes the real week summary\nPASS weekly mobile layout and persisted sessions\n{\"criterion\":\"planning-ui\",\"result\":\"PASS\",\"groups\":3}\n",
        "durationMs": 2267,
        "stamp": {
          "head": "d9cb9d910812e6a632d2765b205963466a47c16a",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
            "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
            "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
            "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
            "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
            "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
            "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T231956-19cf8a63",
          "throughSeq": 84,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T231956-19cf8a63",
            "seq": 77,
            "eventId": "c0d2b6b7-4858-4d29-8055-006f84b8e99f",
            "at": "2026-10-20T23:39:51.219Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Portabilità e ritorno al prodotto finito (safe-delivery)

Saved outcome status: CHECKPOINTED. Source run: 20261020T234131-6d40b050.

```text
Aggiungere backup completo e ripristino atomico validato con consenso esplicito. Verificare l’integrazione di tutti i flussi e i layout mobili. Completare README e guida pratica in italiano con avvio, dati, limiti e prove effettive, distinguendo affermazioni del modello da controlli host. Risolvere soltanto lacune concrete entro l’obiettivo approvato.
```

Prerequisite outcomes: weekly-work.

#### Recorded checkpoint

Checkpoint SHA: 09feec68a2410b467f9df7a93f3d07e5d411a68b
Ref: refs/iterfox/checkpoints/5b9630cd-ff8a-4636-ba99-a49b077cb364/safe-delivery
Source fingerprint: 67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377
Source sequence: 159; recorded at: 2026-10-21T00:05:40.967Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T234131-6d40b050",
  "sourceSeq": 159,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T234131-6d40b050",
    "seq": 159,
    "eventId": "a7e9e818-0808-4903-b3ab-c4de7ac8bc0d",
    "at": "2026-10-21T00:05:40.083Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- backup-api: Backup completo e ripristino atomico — PASSED; evidence ID: a50f7e0d-4c7b-44d2-a4a0-2e432b555224.

```json
{
  "id": "backup-api",
  "title": "Backup completo e ripristino atomico",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "backup-api"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T234131-6d40b050",
  "sourceSeq": 159,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "backup-api",
    "title": "Backup completo e ripristino atomico",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "a50f7e0d-4c7b-44d2-a4a0-2e432b555224",
  "evidence": {
    "id": "a50f7e0d-4c7b-44d2-a4a0-2e432b555224",
    "nodeId": "6ce030ba-c03a-41ec-9332-35f73518ebec",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-21T00:02:27.144Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 0,
    "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 1393,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
        "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
        "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 150,
        "eventId": "4819942b-bf6f-485c-ba37-c8295c96e0b6",
        "at": "2026-10-21T00:02:27.229Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- backup-ui: Consenso al ripristino e interfaccia di portabilità — PASSED; evidence ID: be2489c4-579a-4357-ad22-2cee766f9f2d.

```json
{
  "id": "backup-ui",
  "title": "Consenso al ripristino e interfaccia di portabilità",
  "command": [
    "node",
    "tests/acceptance.mjs",
    "backup-ui"
  ],
  "scope": [],
  "timeoutMs": 120000,
  "status": "PASSED",
  "basis": "checkpoint",
  "sourceRunId": "20261020T234131-6d40b050",
  "sourceSeq": 159,
  "contractVersion": 1,
  "recordedCriterion": {
    "id": "backup-ui",
    "title": "Consenso al ripristino e interfaccia di portabilità",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "scope": [],
    "timeoutMs": 120000
  },
  "evidenceId": "be2489c4-579a-4357-ad22-2cee766f9f2d",
  "evidence": {
    "id": "be2489c4-579a-4357-ad22-2cee766f9f2d",
    "nodeId": "c3902a28-726c-4fd5-9440-80ef8e7cffba",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-21T00:02:30.753Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS download a real portable backup\nPASS restore requires file and explicit consent before any POST\nPASS bad JSON cannot replace data and is readable on mobile\n{\"criterion\":\"backup-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2040,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
        "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
        "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 152,
        "eventId": "d11546a2-e121-41ce-b64d-5378fa0d3818",
        "at": "2026-10-21T00:02:30.808Z",
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
    "id": "02e3e026-e4b4-47f6-8306-c3b7ee40fa73",
    "nodeId": "0354af4e-a90b-48d0-b4ab-2c7dbbe5e081",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T23:44:06.955Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: GET /api/backup: {\"error\":\"Indirizzo non trovato.\",\"code\":\"NOT_FOUND\"}\n\n404 !== 200\n\n    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/harness.mjs:34:17)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async backup-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:47:20)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:1 {\n  generatedMessage: false,\n  code: 'ERR_ASSERTION',\n  actual: 404,\n  expected: 200,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 290,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 26,
        "eventId": "2859e6be-710c-40a2-81fc-9bf714cb1dfb",
        "at": "2026-10-20T23:44:06.999Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "435da765-ec9f-4708-9bdc-ae15723baaba",
    "nodeId": "a39a2079-d5ee-4016-9a53-32fc5adc53ce",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T23:44:37.684Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/process/promises:394\n    triggerUncaughtException(err, true /* fromPromise */);\n    ^\n\npage.waitForEvent: Timeout 30000ms exceeded while waiting for event \"download\"\n=========================== logs ===========================\nwaiting for event \"download\"\n============================================================\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:31:83\n    at check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:9:37)\n    at browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:31:10)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:1 {\n  log: [],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 30670,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "4d368778a32ca98583d1c0e7e67015bd8f943039b52df577cfaca16b25522d7a",
        "src/archive.mjs": "1f0dc4aea4cf6d55c122c65e3f111edef4798a48c610a515e175146575a22d03",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "402bef9f153031be45e695af2d7fc0812ca72ecf55ad52e1c62d44d0a2a5701b"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 28,
        "eventId": "350ebd49-3f5f-4852-bfe0-31a7be497931",
        "at": "2026-10-20T23:44:37.734Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "84cb515d-faa3-4987-9d12-942b3b7ab294",
    "nodeId": "0d0dd8db-e480-4e5e-9f0c-a35d91371e48",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:46:52.718Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 0,
    "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 1343,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "c0298933858a9a2a44b054a200107bd8076085fe18a28d1bfdc5c1a7fbf0b1f5"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 45,
        "eventId": "a68d319f-8933-4e20-b413-219674482e2d",
        "at": "2026-10-20T23:46:52.766Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "414c559d-abe2-4538-be46-d455360d40fb",
    "nodeId": "47c51aad-d791-44fa-af88-b973a358b21a",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T23:47:32.945Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/process/promises:394\n    triggerUncaughtException(err, true /* fromPromise */);\n    ^\n\npage.waitForEvent: Timeout 30000ms exceeded while waiting for event \"download\"\n=========================== logs ===========================\nwaiting for event \"download\"\n============================================================\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:31:83\n    at check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:9:37)\n    at browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:31:10)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:1 {\n  log: [],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 30667,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "7a1ae3b34056e816da69888ea6236c12ec2a4a110e84503589978411107090b9",
        "docs/guida.md": "32402e2a1024fa042f508e9a74cba0420b2596d08b780a937a3e4dfaf13ed5ea",
        "docs/verifiche.md": "9a2e98bc2d14ea6d2dd904dcd105c54131bd2666d7d8d31e1a5efad0de2b0629",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "6fac8f98234b9a2861abc405819c28698f1dd9db91e145cde8956bbcffc79479",
        "public/svolta.css": "f81904ebcf820f2f00c79464ff76642ab5255ae3af3899183957a915b43f646f",
        "public/svolta.js": "426e33279a1739e4e43b488deff13b2b9817c1ea6436249a8f78f50bdeb64675",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "c0298933858a9a2a44b054a200107bd8076085fe18a28d1bfdc5c1a7fbf0b1f5"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 58,
        "eventId": "14b5ce15-684b-4e45-8556-954fa253f851",
        "at": "2026-10-20T23:47:32.994Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "daff84c1-e5f8-4020-860d-00f3c8e867a1",
    "nodeId": "0e35224e-4ec5-4b73-8923-6a0a3d470d27",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:54:54.175Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 0,
    "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 1347,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "fdd2f181a322b34f4b199124f927414cb75c9e78fab5d3624574ef459f6904cb",
        "docs/guida.md": "d7d1a0dd164dc6fcb23e443fa0ca89546ba36c2751eae98b1063482c99312381",
        "docs/verifiche.md": "eb05de96fcbd2e6a713906e9b47e6c08a9f4e4c091909070435a58e76b0af890",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "a722d00d09e3a1f7b35d9e4f73a1990d8f71c76535a5840adcdbeae895606dc6",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "9fa2451b9dbd7c40586df41745c57bf7501d310ce697a8c80c179cc3f0ca3efc"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: public/index.html. Scope: all repository files.",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 83,
        "eventId": "ef6b97cf-96d2-41d3-a778-767a457702ef",
        "at": "2026-10-20T23:54:54.219Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "89f8fb02-e36f-4775-be92-c4f7fec6124e",
    "nodeId": "1f174e2c-f923-4cac-bcc9-8e03e06fe94e",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "failed",
    "createdAt": "2026-10-20T23:55:25.654Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 1,
    "output": "PASS download a real portable backup\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.check: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Ho capito: il ripristino sostituisce i dati correnti)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:32:663\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/browser.mjs:32:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r4/data/worktrees/20261020T234131-6d40b050/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Ho capito: il ripristino sostituisce i dati correnti)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 30898,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "fdd2f181a322b34f4b199124f927414cb75c9e78fab5d3624574ef459f6904cb",
        "docs/guida.md": "d7d1a0dd164dc6fcb23e443fa0ca89546ba36c2751eae98b1063482c99312381",
        "docs/verifiche.md": "eb05de96fcbd2e6a713906e9b47e6c08a9f4e4c091909070435a58e76b0af890",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "a722d00d09e3a1f7b35d9e4f73a1990d8f71c76535a5840adcdbeae895606dc6",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "9fa2451b9dbd7c40586df41745c57bf7501d310ce697a8c80c179cc3f0ca3efc"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 85,
        "eventId": "9683b1df-ada4-486c-bc31-20f7e679cdc8",
        "at": "2026-10-20T23:55:25.696Z",
        "type": "verification.failed"
      }
    }
  },
  {
    "id": "1d0148b8-dd77-477d-828d-c606b27c11e9",
    "nodeId": "a7f092c6-64c6-4154-875f-5ac25649a054",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:56:37.676Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS download a real portable backup\nPASS restore requires file and explicit consent before any POST\nPASS bad JSON cannot replace data and is readable on mobile\n{\"criterion\":\"backup-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2421,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "fdd2f181a322b34f4b199124f927414cb75c9e78fab5d3624574ef459f6904cb",
        "docs/guida.md": "d7d1a0dd164dc6fcb23e443fa0ca89546ba36c2751eae98b1063482c99312381",
        "docs/verifiche.md": "eb05de96fcbd2e6a713906e9b47e6c08a9f4e4c091909070435a58e76b0af890",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "e14055459a8bc10a7601deb8fc179a5e8d7ad76b79b97dcc7c3520ccb7db1679"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 107,
        "eventId": "04751536-21c4-45e0-8cb4-629af1e802a6",
        "at": "2026-10-20T23:56:37.734Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "45816252-0498-4b82-ab13-7cf1591bf244",
    "nodeId": "2a1c426d-e4d2-4b93-b2b1-38e410d0fdae",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T23:56:52.388Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 0,
    "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 1353,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "fdd2f181a322b34f4b199124f927414cb75c9e78fab5d3624574ef459f6904cb",
        "docs/guida.md": "d7d1a0dd164dc6fcb23e443fa0ca89546ba36c2751eae98b1063482c99312381",
        "docs/verifiche.md": "eb05de96fcbd2e6a713906e9b47e6c08a9f4e4c091909070435a58e76b0af890",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "e14055459a8bc10a7601deb8fc179a5e8d7ad76b79b97dcc7c3520ccb7db1679"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 119,
        "eventId": "f77088b7-71ed-479d-96d7-b683b0fec189",
        "at": "2026-10-20T23:56:52.434Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "a50f7e0d-4c7b-44d2-a4a0-2e432b555224",
    "nodeId": "6ce030ba-c03a-41ec-9332-35f73518ebec",
    "criterionId": "backup-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-21T00:02:27.144Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-api"
    ],
    "exitCode": 0,
    "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 1393,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
        "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
        "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 150,
        "eventId": "4819942b-bf6f-485c-ba37-c8295c96e0b6",
        "at": "2026-10-21T00:02:27.229Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "be2489c4-579a-4357-ad22-2cee766f9f2d",
    "nodeId": "c3902a28-726c-4fd5-9440-80ef8e7cffba",
    "criterionId": "backup-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-21T00:02:30.753Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "backup-ui"
    ],
    "exitCode": 0,
    "output": "PASS download a real portable backup\nPASS restore requires file and explicit consent before any POST\nPASS bad JSON cannot replace data and is readable on mobile\n{\"criterion\":\"backup-ui\",\"result\":\"PASS\",\"groups\":3}\n",
    "durationMs": 2040,
    "stamp": {
      "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
        "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
        "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
        "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
        "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
        "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
        "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
        "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
        "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T234131-6d40b050",
      "throughSeq": 159,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T234131-6d40b050",
        "seq": 152,
        "eventId": "d11546a2-e121-41ce-b64d-5378fa0d3818",
        "at": "2026-10-21T00:02:30.808Z",
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
  "runId": "20261020T234131-6d40b050",
  "seq": 159,
  "at": "2026-10-21T00:05:40.083Z",
  "status": "COMPLETED",
  "reason": null,
  "contractVersion": 1,
  "hasLaterEvents": false,
  "criteria": [
    {
      "id": "backup-api",
      "title": "Backup completo e ripristino atomico",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "backup-api"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T234131-6d40b050",
      "sourceSeq": 159,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "backup-api",
        "title": "Backup completo e ripristino atomico",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-api"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "a50f7e0d-4c7b-44d2-a4a0-2e432b555224",
      "evidence": {
        "id": "a50f7e0d-4c7b-44d2-a4a0-2e432b555224",
        "nodeId": "6ce030ba-c03a-41ec-9332-35f73518ebec",
        "criterionId": "backup-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-21T00:02:27.144Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-api"
        ],
        "exitCode": 0,
        "output": "PASS portable export includes archived links and versions\nPASS own backup restores exact IDs, revisions and archive\nPASS invalid graphs and record types leave all data unchanged\nPASS malformed and oversized restore leave archive and server intact\n{\"criterion\":\"backup-api\",\"result\":\"PASS\",\"groups\":4}\n",
        "durationMs": 1393,
        "stamp": {
          "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
            "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
            "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
            "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
            "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
            "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
            "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
            "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T234131-6d40b050",
          "throughSeq": 159,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T234131-6d40b050",
            "seq": 150,
            "eventId": "4819942b-bf6f-485c-ba37-c8295c96e0b6",
            "at": "2026-10-21T00:02:27.229Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    },
    {
      "id": "backup-ui",
      "title": "Consenso al ripristino e interfaccia di portabilità",
      "command": [
        "node",
        "tests/acceptance.mjs",
        "backup-ui"
      ],
      "scope": [],
      "timeoutMs": 120000,
      "status": "PASSED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T234131-6d40b050",
      "sourceSeq": 159,
      "contractVersion": 1,
      "recordedCriterion": {
        "id": "backup-ui",
        "title": "Consenso al ripristino e interfaccia di portabilità",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-ui"
        ],
        "scope": [],
        "timeoutMs": 120000
      },
      "evidenceId": "be2489c4-579a-4357-ad22-2cee766f9f2d",
      "evidence": {
        "id": "be2489c4-579a-4357-ad22-2cee766f9f2d",
        "nodeId": "c3902a28-726c-4fd5-9440-80ef8e7cffba",
        "criterionId": "backup-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-21T00:02:30.753Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "backup-ui"
        ],
        "exitCode": 0,
        "output": "PASS download a real portable backup\nPASS restore requires file and explicit consent before any POST\nPASS bad JSON cannot replace data and is readable on mobile\n{\"criterion\":\"backup-ui\",\"result\":\"PASS\",\"groups\":3}\n",
        "durationMs": 2040,
        "stamp": {
          "head": "a8cebbaa4e32b45f46a04fc0b2c30d95511cf473",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "a79b7fd48a59dcdd247ddbd532c0d6ef0a6096712e7e0b5ffe341302f3e7ba92",
            "docs/guida.md": "552d5755a32fdf2e1b369bef167dc4d05153f5684bc594fe64e0b528ba85a6ef",
            "docs/verifiche.md": "022044bd6e6b4d93a9be0b2f948ce3fb75a3045b7cacce511166e26637d55310",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "e2288b008e9d068a4b9ee21e0dbffb4b7fa612915d335f86627c373ce8b510d9",
            "public/svolta.css": "a1257ea0b6bf57b78c63611bc22001094cb4e3b7b828209574b8d2c9cf0b4fb9",
            "public/svolta.js": "a27d0f3bee3068b824ca74fe7dca3cbb8ae59f4dea5b3efdc23b4fe17d076da8",
            "src/app.mjs": "3a4e90b260823681e89bc6e9bf9afedfc35d1937e2da2161bb90358c8a79167d",
            "src/archive.mjs": "92e8df199869909d40b864dacbc553e47ec3486f63ed99e95aeca9c46ddf788a",
            "src/backup.mjs": "590a4f1ca93235d73820d3bb48ddb31313874c4542c7cdc6091618e09ecc2b76",
            "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
            "src/errors.mjs": "acbb23489da8c799787caf170d2ff70a9f26c875de462e287cfc911c856baa5f",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/summary.mjs": "a58abb9c5ef8a37c51f2e6cf434faf761ca5f552fdba000708c6cc61085502e8",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "src/time-entries.mjs": "5a4ff445656c9f15639159e253db1e99e97c010953ee7c2198db4441f0348ebf",
            "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
            "tests/acceptance.mjs": "ee4f811515605a5cbab795c9ad4e40777774006bad8fe350c54590e1836c3235",
            "tests/browser.mjs": "fe87ad9b4d5feeae587e1d030403bcffe4d5e78a236dcd6f5f6b1c305edaba84",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "67046245adee6046d208b80a9b71936d3a24807e9220b47c93bd6857fb2ae377"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T234131-6d40b050",
          "throughSeq": 159,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T234131-6d40b050",
            "seq": 152,
            "eventId": "d11546a2-e121-41ce-b64d-5378fa0d3818",
            "at": "2026-10-21T00:02:30.808Z",
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
