# Project brief

Delegation: ba19c3c0-677b-4354-9729-fd66916ed929; saved status: STOPPED; revision: 11.
Saved update: 2026-10-20T22:33:17.130Z; report observed at: 2026-10-20T22:33:17.153Z.

1/3 outcomes checkpointed; 2 pending. Repeated cumulative checks do not count as additional outcomes.

Product review required: true. Not established by technical checkpoints; operator product review is required.

## Original goal

```text
Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione. Continuazione dichiarata della prova originale bloccata per un difetto del runtime: il candidato già prodotto non è un checkpoint certificato. Conservare interfaccia, comportamento e scelte già implementati; completare soltanto le lacune concrete e i rimanenti esiti, senza ridisegnare da capo. Le prove precedenti sono contesto storico, non certificazione di questa nuova missione.
```

## Original authorization and limits

Authorized at: 2026-10-20T22:07:00.066Z. Approval hash: e06241642dba9398c08e90b66e7b898b29572b004ce0087d8b4ea0a9c506df0c. Original source HEAD: 8fbf6801cdda04de5f9153c737902289d355e59f.
Repository: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/source; provider: codex.

```json
{
  "maxTurns": 125,
  "maxAttempts": 4,
  "maxDurationMs": 9806266,
  "maxTokens": 94975983,
  "turnTimeoutMs": 720000,
  "maxNoProgress": 4
}
```

## Shared usage and remaining budgets

11 reported turns; 3442735 reported tokens. Totals cover all linked missions.

Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable.

```json
{
  "turns": 11,
  "tokens": 3442735,
  "runIds": [
    "20261020T220700-5ec53331",
    "20261020T222034-5d68bce5"
  ],
  "unavailableRunIds": [],
  "complete": true,
  "missions": [
    {
      "runId": "20261020T220700-5ec53331",
      "sourceSeq": 81,
      "turns": 7,
      "tokens": 2417305
    },
    {
      "runId": "20261020T222034-5d68bce5",
      "sourceSeq": 63,
      "turns": 4,
      "tokens": 1025430
    }
  ],
  "authorizedAt": "2026-10-20T22:07:00.066Z",
  "observedAt": "2026-10-20T22:33:17.153Z",
  "elapsedMs": 1577087,
  "authorizationDeadline": "2026-10-21T00:50:26.332Z",
  "remainingDurationMs": 8229179,
  "remainingTurns": 114,
  "remainingTokens": 91533248,
  "accounting": "Reported turns and tokens are summed once per unique mission linked to an approved outcome. Unrelated missions are excluded. Unreported or interrupted-turn token usage and monetary cost are unavailable. The authorization window includes pauses and is never reset by a mission or resume. Missing ledgers make totals partial and remaining turn/token budgets unavailable."
}
```

## Attention

- Operator requested stop. Operator requested stop (mission-reason)

```json
{
  "runId": "20261020T222034-5d68bce5",
  "seq": 63,
  "at": "2026-10-20T22:33:17.110Z",
  "contractVersion": 1,
  "outcomeIds": [
    "weekly-work"
  ]
}
```

## Outcomes

### Un flusso attività che si usa davvero (usable-board)

Saved outcome status: CHECKPOINTED. Source run: 20261020T220700-5ec53331.

```text
Certificare e consegnare il candidato di interfaccia già implementato, preservando progetti, attività, bozze e scelte visuali. Le API erano verificate e un audit separato ha esercitato quattro flussi UI; i selettori host del nuovo contratto correggono la sola rigidità su suffissi obbligatori e controlli nascosti. Ottenere nuove prove per tutti e tre i criteri; allineare la guida ai risultati effettivi. Non rifare funzionalità già presenti; gli esiti successivi restano al supervisore host.
```

Prerequisite outcomes: none.

#### Recorded checkpoint

Checkpoint SHA: f765280cde7671df2ede74245b56dcb3e3b5496b
Ref: refs/iterfox/checkpoints/ba19c3c0-677b-4354-9729-fd66916ed929/usable-board
Source fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Source sequence: 81; recorded at: 2026-10-20T22:20:34.378Z.

```json
{
  "status": "AVAILABLE",
  "sourceRunId": "20261020T220700-5ec53331",
  "sourceSeq": 81,
  "contractVersion": 1,
  "runStatus": "COMPLETED",
  "boundaryEvent": {
    "runId": "20261020T220700-5ec53331",
    "seq": 81,
    "eventId": "310a31c2-0490-40fe-b1ac-9c6dee112f11",
    "at": "2026-10-20T22:20:33.999Z",
    "type": "workflow.completed"
  },
  "unavailableReason": null
}
```

#### Criteria (historical checkpoint boundary)

- projects-api: Archivio progetti persistente e revisioni — PASSED; evidence ID: 5f535d8a-91b0-45fe-b9ef-4489ba300b07.

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
  "sourceRunId": "20261020T220700-5ec53331",
  "sourceSeq": 81,
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
  "evidenceId": "5f535d8a-91b0-45fe-b9ef-4489ba300b07",
  "evidence": {
    "id": "5f535d8a-91b0-45fe-b9ef-4489ba300b07",
    "nodeId": "5fbbc497-2ca7-4ebf-9335-37eea15d1c2b",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:23.645Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1581,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 70,
        "eventId": "371b4cad-a450-4666-80cd-6c48cb3ff43e",
        "at": "2026-10-20T22:19:23.710Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- tasks-api: Attività, filtri e conflitti senza perdita di dati — PASSED; evidence ID: d16b6c2c-ec8f-4e1c-8c37-8017bc280f17.

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
  "sourceRunId": "20261020T220700-5ec53331",
  "sourceSeq": 81,
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
  "evidenceId": "d16b6c2c-ec8f-4e1c-8c37-8017bc280f17",
  "evidence": {
    "id": "d16b6c2c-ec8f-4e1c-8c37-8017bc280f17",
    "nodeId": "bdf77f32-448d-464e-8e1d-a841a1b117ae",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:25.473Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1516,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 72,
        "eventId": "c94e57d8-97b4-4278-8728-c27f3f31a902",
        "at": "2026-10-20T22:19:25.526Z",
        "type": "verification.passed"
      }
    }
  },
  "unavailableReason": null
}
```

- board-ui: Interfaccia progetti e attività su desktop e mobile — PASSED; evidence ID: 7151d55d-fa40-43d0-b0c2-4a2772e999e6.

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
  "sourceRunId": "20261020T220700-5ec53331",
  "sourceSeq": 81,
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
  "evidenceId": "7151d55d-fa40-43d0-b0c2-4a2772e999e6",
  "evidence": {
    "id": "7151d55d-fa40-43d0-b0c2-4a2772e999e6",
    "nodeId": "83e010ac-177b-4dd6-8aaf-054ec8b63501",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:29.350Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 3540,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 74,
        "eventId": "c99295f9-9dfa-41db-867d-b19072cd6c3c",
        "at": "2026-10-20T22:19:29.411Z",
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
    "id": "97d2269d-53e9-49f3-b3c5-62ad578f0774",
    "nodeId": "9439d9c9-a299-452b-8a7f-773df0f9bd4b",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:08:10.721Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1338,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a49b5979ee5a746732112c2d0cbaa59213e42856f8b08568aac08094af5cb792",
        "docs/guida.md": "23ee0b93ee37d5f78a9c8010f9df5a81082d28bd2f37bc365f30151cddfc2c10",
        "docs/verifiche.md": "e9b4ec6f5a999ef426a7df683225a6307f4c93d9325bc0aee9dfb2ad19450733",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "eeb29ca77eb8037dc0d0ed9a44a057679051daf2e311041da7281c4ca46e62ee"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 11,
        "eventId": "0566c417-5cad-412a-8872-f571ced4d1dc",
        "at": "2026-10-20T22:08:10.770Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "b90d9b34-63e4-4536-ba24-a6efc446d984",
    "nodeId": "fd68519c-9212-4107-901f-386ade7676b9",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:08:12.144Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1371,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a49b5979ee5a746732112c2d0cbaa59213e42856f8b08568aac08094af5cb792",
        "docs/guida.md": "23ee0b93ee37d5f78a9c8010f9df5a81082d28bd2f37bc365f30151cddfc2c10",
        "docs/verifiche.md": "e9b4ec6f5a999ef426a7df683225a6307f4c93d9325bc0aee9dfb2ad19450733",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "eeb29ca77eb8037dc0d0ed9a44a057679051daf2e311041da7281c4ca46e62ee"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 13,
        "eventId": "1067488f-2872-46fd-bc6c-06429b99af66",
        "at": "2026-10-20T22:08:12.188Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "91a059f9-44b3-4e62-b9ff-2e65c6003350",
    "nodeId": "65f7c09d-1647-4a84-9500-d1bf5abb440b",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:08:15.543Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 3360,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "a49b5979ee5a746732112c2d0cbaa59213e42856f8b08568aac08094af5cb792",
        "docs/guida.md": "23ee0b93ee37d5f78a9c8010f9df5a81082d28bd2f37bc365f30151cddfc2c10",
        "docs/verifiche.md": "e9b4ec6f5a999ef426a7df683225a6307f4c93d9325bc0aee9dfb2ad19450733",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "eeb29ca77eb8037dc0d0ed9a44a057679051daf2e311041da7281c4ca46e62ee"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 15,
        "eventId": "5b1a735a-aa12-4ef9-b365-a7cc0e144efb",
        "at": "2026-10-20T22:08:15.597Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "f60e43e0-fa6a-41d4-86b6-66d60162424a",
    "nodeId": "80920d3b-8234-4d17-9ddb-5b43389d9ff0",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:11:00.744Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1457,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "ed5835bbad43e33033a4d6efc3b6808c9ea06fed425315fa3f987c257c359aae",
        "docs/guida.md": "d8c7676057d0bde0ef32eb76362e9d59d370a576f40be66643879bc65d4235c6",
        "docs/verifiche.md": "c058cd635fa69b67ef514a62bb4c89bb8ce47214229bdf5881183049ff9d7e32",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "5018d26a1347ca6ff55f4882ac5d05e8fc86806a1eb296f961a235fa4db2012f"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 27,
        "eventId": "86451420-fd2d-4e70-8dc6-4ee6b07efd56",
        "at": "2026-10-20T22:11:00.790Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d3604e71-b3db-4e32-b9d1-bcad4d646638",
    "nodeId": "a37a1e50-78ce-435f-a7e5-1c9ee0f84da2",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:11:02.315Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1472,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "ed5835bbad43e33033a4d6efc3b6808c9ea06fed425315fa3f987c257c359aae",
        "docs/guida.md": "d8c7676057d0bde0ef32eb76362e9d59d370a576f40be66643879bc65d4235c6",
        "docs/verifiche.md": "c058cd635fa69b67ef514a62bb4c89bb8ce47214229bdf5881183049ff9d7e32",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "5018d26a1347ca6ff55f4882ac5d05e8fc86806a1eb296f961a235fa4db2012f"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 29,
        "eventId": "20edd841-8207-4d91-9ecc-c273cf150e72",
        "at": "2026-10-20T22:11:02.362Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "98c0ea1d-4856-4507-ac1f-7be70ff53f2c",
    "nodeId": "7e41768e-0482-4fd3-bb28-98264a3b2594",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:11:06.451Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 4002,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "ed5835bbad43e33033a4d6efc3b6808c9ea06fed425315fa3f987c257c359aae",
        "docs/guida.md": "d8c7676057d0bde0ef32eb76362e9d59d370a576f40be66643879bc65d4235c6",
        "docs/verifiche.md": "c058cd635fa69b67ef514a62bb4c89bb8ce47214229bdf5881183049ff9d7e32",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "5018d26a1347ca6ff55f4882ac5d05e8fc86806a1eb296f961a235fa4db2012f"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 31,
        "eventId": "49673ddd-17af-4fda-af77-0c7aabbac045",
        "at": "2026-10-20T22:11:06.505Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "012fb1ac-b472-4c52-b1eb-4d0cc555cf80",
    "nodeId": "4bd41373-b2a0-45e0-a8b1-be43621f6031",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:15:36.655Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1453,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "738837a336aa73e06a8871a8940155b3a8bbb5ca584030e061adbf38fc981331",
        "docs/guida.md": "eea62d44262ce1b43248181d59127b2ea9088aec2dfd89f8bba27929b983548f",
        "docs/verifiche.md": "77f66c0dafb56eafa79c1cab9ba88458d01eb89d9257ba83ae7619d2f24b258b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3af16ec1562c27e0384a73f196827a0d0cae1cbb568f2b325a2592ccd9a096d6"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 48,
        "eventId": "aec23897-8b86-4e10-8b11-1217381b3356",
        "at": "2026-10-20T22:15:36.703Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "244ba0db-8f0b-49e0-bd9b-4de958ed08fe",
    "nodeId": "b78547f1-1182-47de-81cd-0b4cc3bebfcc",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:15:38.307Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1483,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "738837a336aa73e06a8871a8940155b3a8bbb5ca584030e061adbf38fc981331",
        "docs/guida.md": "eea62d44262ce1b43248181d59127b2ea9088aec2dfd89f8bba27929b983548f",
        "docs/verifiche.md": "77f66c0dafb56eafa79c1cab9ba88458d01eb89d9257ba83ae7619d2f24b258b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3af16ec1562c27e0384a73f196827a0d0cae1cbb568f2b325a2592ccd9a096d6"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 50,
        "eventId": "a53966ec-c41c-4f85-97d4-90b5d821e7a4",
        "at": "2026-10-20T22:15:38.358Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "79628235-3e15-4575-acb6-131502408579",
    "nodeId": "4d13611a-f20f-4609-84a5-d12b7516a044",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "stale",
    "createdAt": "2026-10-20T22:15:42.058Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 3522,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "738837a336aa73e06a8871a8940155b3a8bbb5ca584030e061adbf38fc981331",
        "docs/guida.md": "eea62d44262ce1b43248181d59127b2ea9088aec2dfd89f8bba27929b983548f",
        "docs/verifiche.md": "77f66c0dafb56eafa79c1cab9ba88458d01eb89d9257ba83ae7619d2f24b258b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3af16ec1562c27e0384a73f196827a0d0cae1cbb568f2b325a2592ccd9a096d6"
    },
    "scope": [],
    "inputs": [],
    "invalidatedReason": "Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.",
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 52,
        "eventId": "c4102d63-3b8b-40d7-95a3-2914a4146e20",
        "at": "2026-10-20T22:15:42.117Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "5f535d8a-91b0-45fe-b9ef-4489ba300b07",
    "nodeId": "5fbbc497-2ca7-4ebf-9335-37eea15d1c2b",
    "criterionId": "projects-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:23.645Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "projects-api"
    ],
    "exitCode": 0,
    "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1581,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 70,
        "eventId": "371b4cad-a450-4666-80cd-6c48cb3ff43e",
        "at": "2026-10-20T22:19:23.710Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "d16b6c2c-ec8f-4e1c-8c37-8017bc280f17",
    "nodeId": "bdf77f32-448d-464e-8e1d-a841a1b117ae",
    "criterionId": "tasks-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:25.473Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "tasks-api"
    ],
    "exitCode": 0,
    "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
    "durationMs": 1516,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 72,
        "eventId": "c94e57d8-97b4-4278-8728-c27f3f31a902",
        "at": "2026-10-20T22:19:25.526Z",
        "type": "verification.passed"
      }
    }
  },
  {
    "id": "7151d55d-fa40-43d0-b0c2-4a2772e999e6",
    "nodeId": "83e010ac-177b-4dd6-8aaf-054ec8b63501",
    "criterionId": "board-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "passed",
    "createdAt": "2026-10-20T22:19:29.350Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "board-ui"
    ],
    "exitCode": 0,
    "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
    "durationMs": 3540,
    "stamp": {
      "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "source": {
      "runId": "20261020T220700-5ec53331",
      "throughSeq": 81,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T220700-5ec53331",
        "seq": 74,
        "eventId": "c99295f9-9dfa-41db-867d-b19072cd6c3c",
        "at": "2026-10-20T22:19:29.411Z",
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
  "runId": "20261020T220700-5ec53331",
  "seq": 81,
  "at": "2026-10-20T22:20:33.999Z",
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
      "sourceRunId": "20261020T220700-5ec53331",
      "sourceSeq": 81,
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
      "evidenceId": "5f535d8a-91b0-45fe-b9ef-4489ba300b07",
      "evidence": {
        "id": "5f535d8a-91b0-45fe-b9ef-4489ba300b07",
        "nodeId": "5fbbc497-2ca7-4ebf-9335-37eea15d1c2b",
        "criterionId": "projects-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T22:19:23.645Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "projects-api"
        ],
        "exitCode": 0,
        "output": "PASS empty archive\nPASS create project with stable defaults\nPASS optimistic project edit\nPASS invalid names and missing revisions do not write\nPASS project archival survives restart\nPASS unknown project does not create a record\n{\"criterion\":\"projects-api\",\"result\":\"PASS\",\"groups\":6}\n",
        "durationMs": 1581,
        "stamp": {
          "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
            "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
            "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
            "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
            "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
            "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
            "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
            "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
            "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
            "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T220700-5ec53331",
          "throughSeq": 81,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T220700-5ec53331",
            "seq": 70,
            "eventId": "371b4cad-a450-4666-80cd-6c48cb3ff43e",
            "at": "2026-10-20T22:19:23.710Z",
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
      "sourceRunId": "20261020T220700-5ec53331",
      "sourceSeq": 81,
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
      "evidenceId": "d16b6c2c-ec8f-4e1c-8c37-8017bc280f17",
      "evidence": {
        "id": "d16b6c2c-ec8f-4e1c-8c37-8017bc280f17",
        "nodeId": "bdf77f32-448d-464e-8e1d-a841a1b117ae",
        "criterionId": "tasks-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T22:19:25.473Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "tasks-api"
        ],
        "exitCode": 0,
        "output": "PASS task defaults and exact fields\nPASS task edit, revision conflicts and combined filters\nPASS civil dates, invalid states and numeric validation\nPASS parallel stale writers cannot overwrite each other\nPASS archived projects disappear from general activity list\nPASS task persistence and malformed JSON\n{\"criterion\":\"tasks-api\",\"result\":\"PASS\",\"groups\":6}\n",
        "durationMs": 1516,
        "stamp": {
          "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
            "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
            "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
            "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
            "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
            "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
            "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
            "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
            "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
            "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T220700-5ec53331",
          "throughSeq": 81,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T220700-5ec53331",
            "seq": 72,
            "eventId": "c94e57d8-97b4-4278-8728-c27f3f31a902",
            "at": "2026-10-20T22:19:25.526Z",
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
      "sourceRunId": "20261020T220700-5ec53331",
      "sourceSeq": 81,
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
      "evidenceId": "7151d55d-fa40-43d0-b0c2-4a2772e999e6",
      "evidence": {
        "id": "7151d55d-fa40-43d0-b0c2-4a2772e999e6",
        "nodeId": "83e010ac-177b-4dd6-8aaf-054ec8b63501",
        "criterionId": "board-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "passed",
        "createdAt": "2026-10-20T22:19:29.350Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "board-ui"
        ],
        "exitCode": 0,
        "output": "PASS create a project and task through the actual interface\nPASS edit, filter and preserve the changed activity after reopening\nPASS concurrent interface edits cannot silently overwrite another tab\nPASS literal hostile text and mobile layout\n{\"criterion\":\"board-ui\",\"result\":\"PASS\",\"groups\":4}\n",
        "durationMs": 3540,
        "stamp": {
          "head": "8fbf6801cdda04de5f9153c737902289d355e59f",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
            "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
            "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
            "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
            "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
            "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
            "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
            "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
            "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
            "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
            "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
            "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
            "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
            "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
            "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
        },
        "scope": [],
        "inputs": [],
        "source": {
          "runId": "20261020T220700-5ec53331",
          "throughSeq": 81,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T220700-5ec53331",
            "seq": 74,
            "eventId": "c99295f9-9dfa-41db-867d-b19072cd6c3c",
            "at": "2026-10-20T22:19:29.411Z",
            "type": "verification.passed"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Dalla lista al piano settimanale e al tempo reale (weekly-work)

Saved outcome status: RUNNING. Source run: 20261020T222034-5d68bce5.

```text
Aggiungere pianificazione settimanale, sessioni di tempo con cronologia, riepilogo coerente e relativi flussi browser, preservando attività e conflitti. Gestire date civili senza spostamenti da fuso orario. Backup rimane il prossimo esito.
```

Prerequisite outcomes: usable-board.

#### Recorded checkpoint

Checkpoint receipt unavailable: no checkpoint is recorded.

```json
{
  "status": "NOT_RECORDED",
  "sourceRunId": "20261020T222034-5d68bce5",
  "sourceSeq": null,
  "contractVersion": null,
  "runStatus": null,
  "boundaryEvent": null,
  "unavailableReason": "No checkpoint receipt is recorded."
}
```

#### Criteria (latest recorded state; no checkpoint proof)

- planning-api: Settimana civile, sessioni e riepilogo coerente — UNVERIFIED; evidence ID: 2491f697-733c-4cbb-8ccb-2bf4f12a9bb5.

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
  "status": "UNVERIFIED",
  "basis": "latest-recorded-state",
  "sourceRunId": "20261020T222034-5d68bce5",
  "sourceSeq": 63,
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
  "evidenceId": "2491f697-733c-4cbb-8ccb-2bf4f12a9bb5",
  "evidence": {
    "id": "2491f697-733c-4cbb-8ccb-2bf4f12a9bb5",
    "nodeId": "43652ae2-6740-4408-a034-4f07626213c8",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:31:54.451Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 1,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:\n+ actual - expected\n\n  {\n    doing: 1,\n    done: 1,\n    minutesThisWeek: 60,\n+   overdue: 2,\n-   overdue: 1,\n    todo: 3\n  }\n\n    at file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:255\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)\n    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:5)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: { todo: 3, doing: 1, done: 1, overdue: 2, minutesThisWeek: 60 },\n  expected: { todo: 3, doing: 1, done: 1, overdue: 1, minutesThisWeek: 60 },\n  operator: 'deepStrictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 336,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
        "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
        "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 54,
        "eventId": "8ee314b6-44d5-4f1a-a5ff-44e3b9ce9b43",
        "at": "2026-10-20T22:31:54.504Z",
        "type": "verification.deferred"
      }
    }
  },
  "unavailableReason": null
}
```

- planning-ui: Pianificazione e tempo dal browser — UNVERIFIED; evidence ID: 3a8357ef-fdf3-4496-9648-e3f9cea2d999.

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
  "status": "UNVERIFIED",
  "basis": "latest-recorded-state",
  "sourceRunId": "20261020T222034-5d68bce5",
  "sourceSeq": 63,
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
  "evidenceId": "3a8357ef-fdf3-4496-9648-e3f9cea2d999",
  "evidence": {
    "id": "3a8357ef-fdf3-4496-9648-e3f9cea2d999",
    "nodeId": "54207cda-b0a8-4d54-bf15-9a4e07f029be",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:32:28.876Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.fill: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 30995,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
        "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
        "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 59,
        "eventId": "b5a868a5-bc63-4cdf-9a74-df37a56271fb",
        "at": "2026-10-20T22:32:28.932Z",
        "type": "verification.deferred"
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
    "id": "bc87c720-080c-4409-98cb-ea3896fea6b0",
    "nodeId": "cb9accb8-edeb-43f3-8eeb-843ca819fcb4",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:22:49.172Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: GET /api/week?start=2026-10-19: {\"error\":\"Indirizzo non trovato.\",\"code\":\"NOT_FOUND\"}\n\n404 !== 200\n\n    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:34:17)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:36:82\n    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)\n    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:36:5)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  generatedMessage: false,\n  code: 'ERR_ASSERTION',\n  actual: 404,\n  expected: 200,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 492,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 17,
        "eventId": "a341c2f0-1445-4e68-8349-4907a9bc35e0",
        "at": "2026-10-20T22:22:49.240Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "ebcfc4a4-2d01-41e6-949f-da491ac64c19",
    "nodeId": "ca38c058-66e3-4a19-b35a-e582d5d74c63",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:23:20.616Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.fill: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 31337,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "523d22b76bbc924c28e294948cf3f58df7e5538a6a213c2bb35f268843f1a1ea",
        "docs/guida.md": "b1569ab12898d516e41102be8826c0b288732808d6fb4457752cf3eeb58ac299",
        "docs/verifiche.md": "9ee108947948d7d61720498b3ddc7311fbef9236707eae753427b2b2b91e1e5b",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "04453e9d589045bc64eb12c64ce69766fa55fa541f75fdeeff0ea8e237e3b14b",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "97166e73d0b44fc0758dba28a8e89c24e643efb97202e484c79cf9903906bde2",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 19,
        "eventId": "67358d6c-20c9-4555-ac3b-66d253dfa77c",
        "at": "2026-10-20T22:23:20.664Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "0d8f19ed-0d99-488b-8959-094500cbbcaf",
    "nodeId": "8e56a770-0e86-458c-b085-c02b3ad98d0f",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:26:42.852Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 1,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: POST /api/time-entries: {\"error\":\"Indirizzo non trovato.\",\"code\":\"NOT_FOUND\"}\n\n404 !== 201\n\n    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:34:17)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:38:17)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  generatedMessage: false,\n  code: 'ERR_ASSERTION',\n  actual: 404,\n  expected: 201,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 336,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "ebbb8f89ac82039aefd206b70be3180972a0c3a20e8d62ac6e907f86e539476b",
        "docs/guida.md": "2bddc3b0cc50a4011cea95a871acc1048f407cdaaf36999e4a4c5f4a123c1f9f",
        "docs/verifiche.md": "546567044e127025a86c5d0d409ab7b24cfc67ad9e55fbf5c75d28b2897c68e2",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "b1ea18c955068368c3d6b8c8fd6e55f004102d0b1c5838fcb991847b082272d5",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 32,
        "eventId": "9a7bc8c2-43ee-4098-bf5e-d92e76ea9480",
        "at": "2026-10-20T22:26:42.902Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "504680c9-8bed-47be-82fe-764d3ac6c95d",
    "nodeId": "84646b88-6a56-4910-a02b-42e04395185e",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:27:18.607Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.fill: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 31037,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "ebbb8f89ac82039aefd206b70be3180972a0c3a20e8d62ac6e907f86e539476b",
        "docs/guida.md": "2bddc3b0cc50a4011cea95a871acc1048f407cdaaf36999e4a4c5f4a123c1f9f",
        "docs/verifiche.md": "546567044e127025a86c5d0d409ab7b24cfc67ad9e55fbf5c75d28b2897c68e2",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
        "src/app.mjs": "b1ea18c955068368c3d6b8c8fd6e55f004102d0b1c5838fcb991847b082272d5",
        "src/archive.mjs": "07d8f1c116184f827d5da85b0874f0849f441a3e9a0bff6279b635a7f66de443",
        "src/dates.mjs": "befb2084c723419e957dd976a1e2f9ecd5b92b5c8d768158ba99ce452d794515",
        "src/errors.mjs": "594ce35930d8da6b7abec818d5c0111a1d2488cd02d2bc2359297f7f12d11996",
        "src/projects.mjs": "3b896216037c45ae9d335d585d6caddb44d27a8ab30b56909298ea32e2428bdc",
        "src/public.mjs": "54415785a2a0288443db6abf2c8655c8d8b2f66d73570c90566ab99c6598bc3c",
        "src/server.mjs": "cd0a73c7ab3880a8da4bdd66887f2f9de4ec2c697100eef6dc91b0ee1afd6628",
        "src/tasks.mjs": "8e252c5f36750e305d977113360aeacf08bb71ba9dc86ef6ca97a8b03e721c8c",
        "src/week.mjs": "f533bdaed237f9b051608355d588f3b5147653c0d81143e7b5d7148a0dee2eeb",
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 39,
        "eventId": "fe268f76-ac93-4aa5-8283-9f2ef90035ea",
        "at": "2026-10-20T22:27:18.659Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "2491f697-733c-4cbb-8ccb-2bf4f12a9bb5",
    "nodeId": "43652ae2-6740-4408-a034-4f07626213c8",
    "criterionId": "planning-api",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:31:54.451Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-api"
    ],
    "exitCode": 1,
    "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:\n+ actual - expected\n\n  {\n    doing: 1,\n    done: 1,\n    minutesThisWeek: 60,\n+   overdue: 2,\n-   overdue: 1,\n    todo: 3\n  }\n\n    at file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:255\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)\n    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:5)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: { todo: 3, doing: 1, done: 1, overdue: 2, minutesThisWeek: 60 },\n  expected: { todo: 3, doing: 1, done: 1, overdue: 1, minutesThisWeek: 60 },\n  operator: 'deepStrictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 336,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
        "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
        "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 54,
        "eventId": "8ee314b6-44d5-4f1a-a5ff-44e3b9ce9b43",
        "at": "2026-10-20T22:31:54.504Z",
        "type": "verification.deferred"
      }
    }
  },
  {
    "id": "3a8357ef-fdf3-4496-9648-e3f9cea2d999",
    "nodeId": "54207cda-b0a8-4d54-bf15-9a4e07f029be",
    "criterionId": "planning-ui",
    "contractVersion": 1,
    "kind": "deterministic",
    "status": "recorded",
    "createdAt": "2026-10-20T22:32:28.876Z",
    "command": [
      "node",
      "tests/acceptance.mjs",
      "planning-ui"
    ],
    "exitCode": 1,
    "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.fill: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
    "durationMs": 30995,
    "stamp": {
      "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
      "files": {
        ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
        "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
        "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
        "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
        "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
        "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
        "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
        "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
        "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
        "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
        "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
        "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
      },
      "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
    },
    "scope": [],
    "inputs": [],
    "purpose": "probe",
    "source": {
      "runId": "20261020T222034-5d68bce5",
      "throughSeq": 63,
      "contractVersion": 1,
      "recordedEvent": {
        "runId": "20261020T222034-5d68bce5",
        "seq": 59,
        "eventId": "b5a868a5-bc63-4cdf-9a74-df37a56271fb",
        "at": "2026-10-20T22:32:28.932Z",
        "type": "verification.deferred"
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
  "runId": "20261020T222034-5d68bce5",
  "seq": 63,
  "at": "2026-10-20T22:33:17.110Z",
  "status": "STOPPED",
  "reason": "Operator requested stop. Operator requested stop",
  "contractVersion": 1,
  "hasLaterEvents": null,
  "criteria": [
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
      "status": "UNVERIFIED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T222034-5d68bce5",
      "sourceSeq": 63,
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
      "evidenceId": "2491f697-733c-4cbb-8ccb-2bf4f12a9bb5",
      "evidence": {
        "id": "2491f697-733c-4cbb-8ccb-2bf4f12a9bb5",
        "nodeId": "43652ae2-6740-4408-a034-4f07626213c8",
        "criterionId": "planning-api",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "recorded",
        "createdAt": "2026-10-20T22:31:54.451Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-api"
        ],
        "exitCode": 1,
        "output": "PASS civil seven-day plan and unscheduled work\nPASS Monday and impossible-date rejection\nPASS time records preserve links and task status\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:\n+ actual - expected\n\n  {\n    doing: 1,\n    done: 1,\n    minutesThisWeek: 60,\n+   overdue: 2,\n-   overdue: 1,\n    todo: 3\n  }\n\n    at file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:255\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)\n    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:5)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49\n    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: { todo: 3, doing: 1, done: 1, overdue: 2, minutesThisWeek: 60 },\n  expected: { todo: 3, doing: 1, done: 1, overdue: 1, minutesThisWeek: 60 },\n  operator: 'deepStrictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.21.1\n",
        "durationMs": 336,
        "stamp": {
          "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
            "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
            "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
            "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
            "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
            "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
            "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T222034-5d68bce5",
          "throughSeq": 63,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T222034-5d68bce5",
            "seq": 54,
            "eventId": "8ee314b6-44d5-4f1a-a5ff-44e3b9ce9b43",
            "at": "2026-10-20T22:31:54.504Z",
            "type": "verification.deferred"
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
      "status": "UNVERIFIED",
      "basis": "latest-recorded-state",
      "sourceRunId": "20261020T222034-5d68bce5",
      "sourceSeq": 63,
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
      "evidenceId": "3a8357ef-fdf3-4496-9648-e3f9cea2d999",
      "evidence": {
        "id": "3a8357ef-fdf3-4496-9648-e3f9cea2d999",
        "nodeId": "54207cda-b0a8-4d54-bf15-9a4e07f029be",
        "criterionId": "planning-ui",
        "contractVersion": 1,
        "kind": "deterministic",
        "status": "recorded",
        "createdAt": "2026-10-20T22:32:28.876Z",
        "command": [
          "node",
          "tests/acceptance.mjs",
          "planning-ui"
        ],
        "exitCode": 1,
        "output": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nlocator.fill: Timeout 30000ms exceeded.\nCall log:\n  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()\n\n    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569\n    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)\n    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120\n    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)\n    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {\n  log: [\n    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\\\s*\\\\(obbligatorio\\\\))?$/).visible()'\n  ],\n  name: 'TimeoutError'\n}\n\nNode.js v22.21.1\n",
        "durationMs": 30995,
        "stamp": {
          "head": "f765280cde7671df2ede74245b56dcb3e3b5496b",
          "files": {
            ".gitignore": "76e5bf79efd73d28dab918fd8fc3c76bc4c89311d4bf6a8fa1ca4822fded0fa3",
            "BRIEF.md": "be8a77631856096abe3eecc4370651506d11ade532812a648c50f3d9d0cb71c3",
            "README.md": "80aed329d1575ddaa960ec01496d7bf14e532532b9b7f84235799c5d28aa78ea",
            "docs/guida.md": "0671bc6a3f4b7ebacfc10aa5c13456fcecf9a810c809ba3ee944a611c65d7abd",
            "docs/verifiche.md": "8d2982949c2f0aefd4e201751d7b7f59e44d34106306c5ef964bcc109c687462",
            "package.json": "b4cd0a98ba144ec52ab38059c5712ed5aaeb750141bf2a88ef3383249d61f6b8",
            "public/index.html": "1e798be6470daa454678337196f2076ca008b3922756dea7d79bbade5b259dee",
            "public/svolta.css": "235865d7c676b8cf5cd7a9df2936252c335ffdf87d0d996ce90dd086e888a799",
            "public/svolta.js": "8494e848b135e8dd8e4ecd4d29bc37705c1256b73ba5322f20438056bb1c5ab4",
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
            "tests/acceptance.mjs": "5759467fd1c94b32c4044e4e7809c8b19afa636bd2b73ec210952d5c2bdcd4da",
            "tests/browser.mjs": "94c628f46208c5fe55cc5e6b318fd72b43b95e3a73020a028cd2b02248a89d8a",
            "tests/harness.mjs": "122df72fd6e9dc6a0cecddc429682006893dd28a708b3a54c3c074a6ba02ca16"
          },
          "fingerprint": "3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800"
        },
        "scope": [],
        "inputs": [],
        "purpose": "probe",
        "source": {
          "runId": "20261020T222034-5d68bce5",
          "throughSeq": 63,
          "contractVersion": 1,
          "recordedEvent": {
            "runId": "20261020T222034-5d68bce5",
            "seq": 59,
            "eventId": "b5a868a5-bc63-4cdf-9a74-df37a56271fb",
            "at": "2026-10-20T22:32:28.932Z",
            "type": "verification.deferred"
          }
        }
      },
      "unavailableReason": null
    }
  ]
}
```

### Portabilità e ritorno al prodotto finito (safe-delivery)

Saved outcome status: PENDING. Source run: unavailable (no linked mission).

```text
Aggiungere backup completo e ripristino atomico validato con consenso esplicito. Verificare l’integrazione di tutti i flussi e i layout mobili. Completare README e guida pratica in italiano con avvio, dati, limiti e prove effettive, distinguendo affermazioni del modello da controlli host. Risolvere soltanto lacune concrete entro l’obiettivo approvato.
```

Prerequisite outcomes: weekly-work.

#### Recorded checkpoint

Checkpoint receipt unavailable: no checkpoint is recorded.

```json
{
  "status": "NOT_RECORDED",
  "sourceRunId": null,
  "sourceSeq": null,
  "contractVersion": null,
  "runStatus": null,
  "boundaryEvent": null,
  "unavailableReason": "No checkpoint receipt is recorded."
}
```

#### Criteria (latest recorded state; no checkpoint proof)

- backup-api: Backup completo e ripristino atomico — UNAVAILABLE; evidence ID: unavailable.

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
  "status": "UNAVAILABLE",
  "basis": "latest-recorded-state",
  "sourceRunId": null,
  "sourceSeq": null,
  "contractVersion": null,
  "recordedCriterion": null,
  "evidenceId": null,
  "evidence": null,
  "unavailableReason": "No criterion state is available at this evidence boundary."
}
```

- backup-ui: Consenso al ripristino e interfaccia di portabilità — UNAVAILABLE; evidence ID: unavailable.

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
  "status": "UNAVAILABLE",
  "basis": "latest-recorded-state",
  "sourceRunId": null,
  "sourceSeq": null,
  "contractVersion": null,
  "recordedCriterion": null,
  "evidenceId": null,
  "evidence": null,
  "unavailableReason": "No criterion state is available at this evidence boundary."
}
```

#### Evidence at this boundary

Evidence IDs, source run/sequence, contract versions, original timestamps and code stamps are retained below. AI assessments remain distinct from deterministic checks.

```json
[]
```

#### Latest recorded mission state (separate from checkpoint proof)

```json
{
  "availability": "UNAVAILABLE",
  "unavailableReason": "No mission is linked yet.",
  "runId": null,
  "seq": null,
  "at": null,
  "status": null,
  "reason": null,
  "contractVersion": null,
  "hasLaterEvents": null,
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
      "status": "UNAVAILABLE",
      "basis": "latest-recorded-state",
      "sourceRunId": null,
      "sourceSeq": null,
      "contractVersion": null,
      "recordedCriterion": null,
      "evidenceId": null,
      "evidence": null,
      "unavailableReason": "No criterion state is available at this evidence boundary."
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
      "status": "UNAVAILABLE",
      "basis": "latest-recorded-state",
      "sourceRunId": null,
      "sourceSeq": null,
      "contractVersion": null,
      "recordedCriterion": null,
      "evidenceId": null,
      "evidence": null,
      "unavailableReason": "No criterion state is available at this evidence boundary."
    }
  ]
}
```

## Evidence boundary and product review

Checkpoint evidence is historical proof from the source mission event prefix through the recorded sourceSeq. Later recorded state is shown separately and cannot rewrite that checkpoint. Current source freshness is unobserved: this read-only report does not inspect worktrees, audit evidence or rerun checks. Each future mission needs fresh verification. AI assessments and project reviews are claims from the same integration, not independent proof or operator acceptance. A checkpoint is a technical result; product review and acceptance remain with the operator.

Current source freshness: UNOBSERVED. No current source files, Git refs or evidence artifacts were inspected or verified to generate this report.
