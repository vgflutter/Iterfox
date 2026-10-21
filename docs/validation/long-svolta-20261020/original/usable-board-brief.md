# Morning Brief — BLOCKED

**Provider: real Codex SDK.**

Original goal: Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione.

Current delegated outcome: Un flusso attività che si usa davvero
Costruire il flusso visuale Progetti e Attività: inserimento, modifica, filtri, gestione dei conflitti fra schede senza perdere gli input, testo non fidato letterale e layout mobile. Preservare le API già verificate. Le funzioni Settimana, Riepilogo e Backup possono ancora mostrare uno stato non disponibile esplicito.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

Current contract: v1 — Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione.

Current delegated outcome: Un flusso attività che si usa davvero
Costruire il flusso visuale Progetti e Attività: inserimento, modifica, filtri, gestione dei conflitti fra schede senza perdere gli input, testo non fidato letterale e layout mobile. Preservare le API già verificate. Le funzioni Settimana, Riepilogo e Backup possono ancora mostrare uno stato non disponibile esplicito.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

2/3 criteria deterministically verified; 0 AI-assessed. 1 still open.

- [x] Archivio progetti persistente e revisioni — PASSED ([evidence](#evidence-321b507b-eaf0-4f77-b0c8-350a4957c7e3))
- [x] Attività, filtri e conflitti senza perdita di dati — PASSED ([evidence](#evidence-682b18e0-f7e0-47fd-8538-f5cad52a19c9))
- [ ] Interfaccia progetti e attività su desktop e mobile — BLOCKED ([evidence](#evidence-05dba237-7f3c-4a87-81a7-a542c033d0c8))

## Project direction

Focus (plan): Completare il flusso visuale Progetti e Attività, preservando archivio e API esistenti. Le prove storiche restano contesto: il runtime dovrà ottenere nuove evidenze per projects-api, tasks-api e board-ui. Settimana, Riepilogo e Backup mostreranno esplicitamente la loro indisponibilità.
Next artifact (target, not proof): Una prima pagina su /, con asset locali in public/, che permetta di creare un progetto, selezionarlo e creare un’attività visibile come article accessibile, usando le API esistenti e mostrando errori senza cancellare gli input.
Direction v1; contract v1; planning, not runtime acceptance.

- request: Delegation de2c27e8-446b-492c-9825-2f2abe2e0e57; approval 5d7cd586ae6b062d7b629a44922cdcc950eab6b707c6308ad0689b06fd7b597e; outcome usable-board.
Previous checkpoint d3e570da7f20fb6f81fa5f6d8af89f710e9926d1. Historical evidence is context only; this new mission must obtain fresh proof.
Source run 20261020T205056-641e33a8, sequence 64.
Unverified implementation claims:
Implementati archivio progetti atomico, API GET/POST/PATCH, revisioni serializzate, archiviazione ed errori JSON italiani. README aggiornato; file protetti invariati. Controlli locali mirati superati; avvio HTTP e criterio projects-api restano da verificare sull’host.
Implementate API attività persistenti con filtri combinabili, validazione delle date, revisioni obbligatorie e mutazioni serializzate. Conservati record archiviati e compatibilità con l’archivio progetti. README aggiornato. Controlli locali mirati superati; HTTP e riavvio del processo ancora da verificare sull’host. Interfaccia, pianificazione, sessioni e backup restano esclusi.
Aggiornato README.md con i comandi projects-api e tasks-api, entrambi PASS host con sei gruppi, e la copertura osservata, inclusi HTTP, annuncio porta e riavvio. Distinti i controlli locali dichiarati; resta esplicita l’assenza di collaudi browser, desktop e mobile. Nessun test rieseguito.
  - Recorded instruction: f613b328-f51d-4424-961e-f4ee3037f0e3; 2026-10-20T21:15:11.893Z.
  - Disposition (planning, not runtime acceptance): applied: Il piano incorpora l’archivio atomico e le API progetti/attività presenti nel codice, senza prevederne una riscrittura. README e handoff riportano verifiche precedenti, ma questa missione non dispone ancora di prove correnti. Il lavoro restante riguarda interfaccia e guida; pianificazione, tempo e portabilità rimangono agli esiti successivi delegati dall’host..
  - Reconciliation: direction v1; contract v1; node c3872323-7c37-488f-9699-49f852704db3; planning only.
- Provisional assumption: Provvisoriamente, le API presenti sembrano sufficienti per il flusso visuale senza nuove rotte dati o migrazioni dell’archivio.
- Provisional assumption: Provvisoriamente, HTML, CSS e JavaScript nativi dovrebbero bastare per interazioni accessibili e layout desktop e mobile.

## What changed

### Autonomous project development

0 project checkpoints; 0 implementation units discovered without a new operator prompt.
Project reviews are AI judgments from the same integration, separate from runtime acceptance evidence.


- Technical interruption (provider-abort): provider-abort: Injected supervisor fault: usable-board / observed-partial-edit. Process group joined: yes. Automatic retry at 2026-10-20T21:19:16.518Z, within original limits.
No corrective tasks recorded.
- 6 preliminary command observations were not yet satisfied while implementation remained; these did not consume corrective retries.

## Problems and decisions

- 2026-10-20T21:56:23.077Z: A deferred check requires unfinished planned work and a non-passing probe
- Event 9: Project direction updated. Unstarted work replaced; independent work can continue while operator questions wait.
- Event 19: Evidence is STALE: src/app.mjs, public/index.html, src/public.mjs. Scope: all repository files.
- Event 20: Evidence is STALE: src/app.mjs, public/index.html, src/public.mjs. Scope: all repository files.
- Event 21: Automatic technical recovery 1/2; previous process group joined, worktree audited, original limits retained.
- Event 26: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 38: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 39: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 41: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 53: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 54: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 56: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 68: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 69: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 71: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 83: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 84: Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.
- Event 86: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 98: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.
- Event 99: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.
- Event 101: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.

## What needs attention

- A deferred check requires unfinished planned work and a non-passing probe

## Resources and worktree

2471 seconds elapsed; 8 agent turns; 3831397 reported tokens. Cost not measured. Interrupted-turn usage may be unavailable.

Repository: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/source
Branch: iterfox/20261020T211511-838aa23e
Worktree: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e

## Evidence

<a id="evidence-a4a243af-9cf0-4b50-ba1e-014cedbf2d7a"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1348ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: d4be2d94025d39f88c9a5cd35afec5cc9a90c6f6eb72f4379eec3cc751dd2ba5
Scope: all repository files

Evidence is STALE: src/app.mjs, public/index.html, src/public.mjs. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-931b9911-843b-49c4-843a-137bab8e8588"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1370ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: d4be2d94025d39f88c9a5cd35afec5cc9a90c6f6eb72f4379eec3cc751dd2ba5
Scope: all repository files

Evidence is STALE: src/app.mjs, public/index.html, src/public.mjs. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-c4d0629d-1956-4ae2-b89f-eb9572ead8ca"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 31012ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: d4be2d94025d39f88c9a5cd35afec5cc9a90c6f6eb72f4379eec3cc751dd2ba5
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: 'Svolta', exact: true }).first() to be visible

    at browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:14:96)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [
    "  - waiting for getByRole('heading', { name: 'Svolta', exact: true }).first() to be visible"
  ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-45aed870-ade4-4e3d-b2b3-7a039082035f"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1553ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: eea0efe5afeeb7eaf4323c66599ebde7c3fe58af92c4bad21b21994420651be0
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-37620b16-e990-4170-83b2-feb125d1b341"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1559ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: eea0efe5afeeb7eaf4323c66599ebde7c3fe58af92c4bad21b21994420651be0
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-101f1fe1-60c6-4482-b8c8-a257f0822ca4"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 31601ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: eea0efe5afeeb7eaf4323c66599ebde7c3fe58af92c4bad21b21994420651be0
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel('Nome progetto', { exact: true })

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:157
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [ "  - waiting for getByLabel('Nome progetto', { exact: true })" ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-149dd2fe-f590-41fe-8dd7-cf5a3de183a4"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1444ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 265b5079fd52e7b579bdcece3d1e1b45ab9129a8d426097fe54d8d17ecf92e22
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-49f295f9-fd39-4533-bb7c-05101b44a02e"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1499ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 265b5079fd52e7b579bdcece3d1e1b45ab9129a8d426097fe54d8d17ecf92e22
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-391149d6-c7b7-47c3-8106-135fe7136842"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 31513ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 265b5079fd52e7b579bdcece3d1e1b45ab9129a8d426097fe54d8d17ecf92e22
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel('Nome progetto', { exact: true })

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:157
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [ "  - waiting for getByLabel('Nome progetto', { exact: true })" ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-302302ab-438f-4bf8-89ca-d15f8e1e99e0"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1375ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3d214565a79575ad04da65a9cfd910abfad38493030e9fc073cca8bebac8c0e6
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-8f538ce7-e150-481b-866f-8d9a26f0c411"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1388ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3d214565a79575ad04da65a9cfd910abfad38493030e9fc073cca8bebac8c0e6
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-d35a4703-f59e-43a7-9aaa-1f25bc47c658"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 30978ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3d214565a79575ad04da65a9cfd910abfad38493030e9fc073cca8bebac8c0e6
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel('Nome progetto', { exact: true })

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:157
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [ "  - waiting for getByLabel('Nome progetto', { exact: true })" ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-07b80e3b-7446-4c19-98b1-5e50f558eb2e"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 31242ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 269bb7983d2582e2472d646c31c188cc6422df23b34887c56950ddb73ae62655
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel('Nome progetto', { exact: true })

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:157
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [ "  - waiting for getByLabel('Nome progetto', { exact: true })" ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-c8916623-e197-473d-867e-53cf34805e0d"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1349ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 269bb7983d2582e2472d646c31c188cc6422df23b34887c56950ddb73ae62655
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-ccef309a-5c30-4314-b4d0-62048d8ea4e4"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1369ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 269bb7983d2582e2472d646c31c188cc6422df23b34887c56950ddb73ae62655
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, public/index.html, public/svolta.css, public/svolta.js. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-05dba237-7f3c-4a87-81a7-a542c033d0c8"></a>
### board-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 1; duration: 31405ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3ad48ac83770199444b9a0b3f34e14a1a9b3033538849235912a916b42c5f4ef
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel('Nome progetto', { exact: true })

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:157
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/browser.mjs:16:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T211511-838aa23e/tests/acceptance.mjs:56:1 {
  log: [ "  - waiting for getByLabel('Nome progetto', { exact: true })" ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-1d2ff194-016c-4a2d-9151-09609c3e8462"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1341ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3ad48ac83770199444b9a0b3f34e14a1a9b3033538849235912a916b42c5f4ef
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-717a4cce-ce90-421b-a851-edaec45d5a97"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1358ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: 3ad48ac83770199444b9a0b3f34e14a1a9b3033538849235912a916b42c5f4ef
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-321b507b-eaf0-4f77-b0c8-350a4957c7e3"></a>
### projects-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1903ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: f12a9b2ef4c2c8e76d1449d5ddbddd53696d6e771e188496612ebe30e339ab6b
Scope: all repository files

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-682b18e0-f7e0-47fd-8538-f5cad52a19c9"></a>
### tasks-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1539ms
Git: d3e570da7f20fb6f81fa5f6d8af89f710e9926d1; fingerprint: f12a9b2ef4c2c8e76d1449d5ddbddd53696d6e771e188496612ebe30e339ab6b
Scope: all repository files

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

## Agent assessments

- Implementato il primo flusso progetto → attività con asset locali, navigazione accessibile, moduli collegati alle API, article nominati dal titolo, testo letterale e input conservati sugli errori. API invariate; guida aggiornata. Controlli mirati e sintassi superati, browser/mobile non osservati. Modifica, filtri e conflitti restano ai task successivi; sezioni future esplicitamente indisponibili. (agent claim; 0 linked runtime checks)
- Implementate rinomina, archiviazione e riattivazione con revisioni, confronto esplicito dei conflitti e conservazione delle bozze. Aggiunti elenchi distinti, filtro progetto e guida aggiornata; API invariate. Controlli locali mirati superati; browser e mobile da verificare sull’host. Modifica attività e altri filtri restano ai task successivi. (agent claim; 0 linked runtime checks)
- Implementati modifica attività, archiviazione con conferma e filtri combinati. Conservati input e revisione iniziale sugli errori; scartate risposte obsolete. Guide aggiornate e controlli locali mirati superati. Confronto guidato dei conflitti riservato al task successivo. Browser, mobile e persistenza reale restano da verificare sull’host. (agent claim; 0 linked runtime checks)
- Implementato confronto per campo tra versione iniziale, corrente e bozza. I conflitti conservano tutti gli input; ogni nuovo PATCH richiede scelte esplicite e preserva i campi concorrenti. Aggiornamenti degli elenchi e letture tardive lasciano intatti gli editor. Guida aggiornata. Sintassi e prove mirate con DOM simulato superate; comportamento browser e mobile ancora da verificare sull’host. (agent claim; 0 linked runtime checks)
- Rafforzati layout mobile, etichette, focus durante aggiornamenti e salvataggi, gestione di Escape e ritorno del focus. Nomi lunghi leggibili e testo sempre letterale. Aggiornata la guida. Controlli statici e DOM simulato superati; layout e comportamento nativo nel browser restano da verificare sull’host. API invariate. (agent claim; 0 linked runtime checks)
- Aggiornati README.md, docs/guida.md e docs/verifiche.md con avvio, dati, flusso operativo, conflitti e limiti reali. Separate le ricevute storiche dalle nuove verifiche richieste. Controllati 12 collegamenti locali; nessuna suite o prova browser eseguita in questo task. (agent claim; 0 linked runtime checks)

## Limits

- Local execution pauses during sleep or shutdown.
- AI summaries and qualitative assessments are probabilistic claims from the same integration, not independent review.
- Only configured checks are covered; passing checks do not prove absence of defects.

## Worktree diff

```diff
diff --git a/README.md b/README.md
index e4b51ea..74a43dd 100644
--- a/README.md
+++ b/README.md
@@ -1,16 +1,20 @@
 # Svolta
 
-App locale in italiano, attualmente con API per progetti e attività persistenti,
-filtri e revisioni ottimistiche. Non offre ancora un’interfaccia grafica,
-pianificazione settimanale, sessioni di tempo, riepiloghi o backup/ripristino.
-Per ora l’uso richiede un client HTTP o il terminale; l’esperienza desktop e
-mobile destinata all’utente finale resta agli esiti successivi.
-Il contratto completo è in [BRIEF.md](BRIEF.md).
+App locale in italiano per piccoli progetti personali. Il flusso attuale permette
+creazione, rinomina, archiviazione e riattivazione dei progetti; creazione,
+modifica, archiviazione e filtri combinati delle attività. I conflitti tra schede
+si risolvono confrontando i dati e scegliendo esplicitamente le modifiche.
+Nessun account, servizio esterno o telemetria; nessuna dipendenza da installare.
+
+La [guida breve](docs/guida.md) descrive l’uso quotidiano e il recupero dai
+conflitti. Il contratto completo, incluse le funzioni successive ancora
+indisponibili, è in [BRIEF.md](BRIEF.md). La descrizione del codice qui presente
+è distinta dalle [evidenze di verifica](docs/verifiche.md).
 
 ## Avvio
 
-Occorre Node.js **22.13 o successivo**. Non occorrono dipendenze né `npm install`.
-Dalla cartella del progetto:
+Occorre Node.js **22.13 o successivo** e un browser moderno con JavaScript e
+supporto ai dialoghi nativi. Non occorre `npm install`. Dalla cartella del progetto:
 
 ~~~sh
 node src/server.mjs
@@ -18,57 +22,117 @@ node src/server.mjs
 npm start
 ~~~
 
-Il server ascolta soltanto su `127.0.0.1`, porta predefinita `4386`. Dopo aver
-caricato l’archivio e aperto la porta stampa, per esempio:
+Lasciare il terminale aperto e aprire nel browser l’indirizzo annunciato, per esempio:
 
 ~~~text
 SVOLTA_READY http://127.0.0.1:4386
 ~~~
 
-Per scegliere cartella e porta (esempio per shell macOS/Linux):
+La pagina dell’app è su `/`. Il server ascolta soltanto su `127.0.0.1`, porta
+predefinita `4386`. Per scegliere cartella e porta, in una shell macOS/Linux:
 
 ~~~sh
 SVOLTA_DATA_DIR="$HOME/DatiSvolta" PORT=4387 node src/server.mjs
 ~~~
 
-`PORT=0` sceglie una porta libera: usare quella annunciata in `SVOLTA_READY`.
-Fermare il processo con Ctrl+C. L’indirizzo `/` restituisce per ora un errore JSON
-404: non è ancora una pagina dell’app. Non vengono serviti sorgenti o file dati.
+`PORT=0` sceglie una porta libera: usare l’indirizzo stampato in `SVOLTA_READY`.
+Fermare il processo con **Ctrl+C**. Ai riavvii usare la stessa cartella dati.
+Non sono caricate risorse esterne: il server serve la pagina e gli asset locali,
+non i sorgenti, la documentazione o i file dati. Questa guida si legge dal repository.
+
+Il layout prevede schermi stretti, ma l’indirizzo locale sul telefono raggiunge
+il telefono stesso, non il computer. Non è disponibile un accesso tra dispositivi
+né una sincronizzazione. Il server non è predisposto per pubblicazione remota.
+
+## Primo utilizzo
+
+1. In **Progetti**, compilare **Nome progetto** e premere **Crea progetto**.
+2. Sul progetto scegliere **Aggiungi un’attività**, oppure aprire **Attività** e
+   scegliere **Progetto**. Compilare **Titolo attività** e, se utili, **Note**,
+   **Scadenza** e **Stima (minuti)**, quindi **Crea attività**. Lo stato iniziale
+   è «Da fare». Il messaggio di successo conferma il salvataggio sul server.
+3. **Modifica** sulla scheda apre **Modifica attività**. Cambiare i dettagli o
+   **Stato** e premere **Salva modifiche**; il progetto dell’attività resta invariato.
+4. **Filtra per progetto**, **Filtra per stato** e **Cerca attività** si combinano
+   e aggiornano l’elenco senza invio. La ricerca ignora maiuscole e minuscole in
+   titolo e note. **Azzera filtri** torna alle attività di tutti i progetti attivi.
+5. In **Progetti**, **Rinomina**, **Archivia** e **Riattiva** aprono un dialogo da
+   confermare. Archiviare un progetto conserva i dati e nasconde le sue attività
+   dalla vista generale; il filtro progetto permette ancora di consultarle.
+6. **Archivia** su una singola attività richiede una conferma e la nasconde da
+   tutti gli elenchi. Non c’è ancora una riattivazione delle attività dall’interfaccia.
+
+I dati salvati vengono riletti alla riapertura. Nomi, titoli e note sono testo
+letterale: eventuali tag HTML non diventano markup. Le attività completate
+restano nell’elenco, salvo i filtri; un record appena salvato può non comparire
+se non soddisfa quelli selezionati.
+
+Gli errori conservano gli input. Se il server non conferma un salvataggio per
+un’interruzione di connessione, usare **Aggiorna progetti** o **Aggiorna attività**
+e controllare i dati prima di riprovare: la modifica potrebbe essere già salvata.
+Gli elenchi si rileggono anche al ritorno nella scheda/finestra, senza
+sincronizzazione continua e senza sostituire gli editor aperti.
+
+Su conflitto, lasciare aperta la bozza, scegliere **Leggi versione corrente** e
+confrontare prima di inviare di nuovo. Per le attività si sceglie il valore da
+applicare per ciascun campo modificato; per i progetti si conferma solo la
+rinomina o lo stato richiesto. La [guida ai conflitti](docs/guida.md#conflitti-tra-schede)
+spiega le scelte e il caso di un’attività non più consultabile.
+
+Le bozze vivono solo nella pagina: cambiare sezione o aggiornare gli elenchi le
+conserva; ricaricare o chiudere la pagina le perde. **Annulla** o **Escape**
+scartano le modifiche del dialogo. Durante un salvataggio occorre attendere la
+risposta prima di chiuderlo. Per tastiera e schermi stretti vedere la
+[guida](docs/guida.md#tastiera-e-schermi-stretti).
 
 ## Cartella dati e affidabilità
 
 La cartella predefinita è `~/.local/share/svolta`, fuori dai sorgenti.
-`SVOLTA_DATA_DIR` permette di cambiarla; un percorso relativo viene risolto dalla
-cartella di avvio. Se la cartella o `archive.json` non esistono, vengono creati
-con un archivio vuoto, senza progetti dimostrativi. Usare la stessa cartella ai
-riavvii per ritrovare i dati.
-
-`archive.json` contiene il formato interno versione 1, i progetti e le attività,
-inclusi i record archiviati. Un archivio della precedente versione con soli
-progetti viene letto aggiungendo un elenco attività vuoto in memoria; il file
-viene aggiornato solo alla prima modifica salvata. ID, nomi e revisioni dei
-progetti esistenti sono conservati. Ogni creazione riceve un UUID stabile.
+`SVOLTA_DATA_DIR` permette di cambiarla; un percorso relativo è risolto dalla
+cartella di avvio. Se cartella o `archive.json` non esistono, vengono creati con
+un archivio vuoto, senza dati dimostrativi. Cambiare cartella non trasferisce i dati.
+
+`archive.json` contiene il formato interno versione 1, progetti e attività,
+inclusi i record archiviati. Un archivio precedente con soli progetti viene
+letto aggiungendo un elenco attività vuoto in memoria, senza cambiare ID, nomi
+o revisioni; il file è aggiornato solo alla prima modifica salvata.
+
 Ogni scrittura prepara un file temporaneo nella stessa cartella, ne sincronizza
-i contenuti e sostituisce il file
-principale con una rinomina atomica. La risposta di successo viene inviata solo
-dopo la sostituzione. In caso di errore di salvataggio, anche lo stato in memoria
-resta quello precedente e le richieste successive possono riprovare.
-
-Un file presente ma illeggibile, vuoto, con JSON o struttura non validi interrompe
-l’avvio con un messaggio sul terminale e uscita non riuscita: non viene azzerato
-né sostituito. Vengono controllati anche i campi delle attività, gli ID duplicati
-e i riferimenti ai progetti. Conservare il file e controllare percorso, permessi
-e contenuto prima di riprovare. I temporanei di una chiusura improvvisa non sono caricati come
-dati. `archive.json` deve essere un file regolare, non un collegamento simbolico.
-Non modificare manualmente l’archivio durante l’esecuzione.
+i contenuti e sostituisce il principale con una rinomina atomica. Il successo
+viene inviato dopo la sostituzione. Se il salvataggio fallisce, lo stato in
+memoria resta quello precedente e le richieste successive possono riprovare.
+I temporanei di una chiusura improvvisa non sono caricati come dati.
 
 Usare **un solo processo per cartella dati**, su un filesystem locale che supporti
-la rinomina atomica. La coda serializza le modifiche del singolo processo; non
-esiste un blocco tra processi. L’archivio è letto interamente in memoria, pensato
-per piccoli volumi personali. La sincronizzazione del file non costituisce una
-garanzia contro guasti del disco o perdita improvvisa di alimentazione. Non ci
-sono ancora una funzione di backup, recupero automatico o migrazioni da altri
-formati. Il file interno non è il backup portabile previsto dal contratto.
+la rinomina atomica. La coda serializza le modifiche del singolo processo;
+non esiste un blocco tra processi. L’archivio è letto interamente in memoria ed
+è pensato per piccoli volumi personali. La scrittura atomica non è una garanzia
+contro guasti del disco o perdita improvvisa di alimentazione. Non modificare
+manualmente il file durante l’esecuzione.
+
+| Problema | Come procedere |
+| --- | --- |
+| Nessun annuncio `SVOLTA_READY` | Leggere l’errore nel terminale: l’avvio non è completato. Controllare Node, `PORT` (intero 0–65535) e cartella dati. |
+| Porta già in uso | Scegliere un’altra `PORT` o `PORT=0`; se Svolta è già avviato sulla stessa cartella, usare quel processo. |
+| Archivio illeggibile, vuoto o non valido | L’avvio si interrompe conservando il file. Controllare percorso, permessi e contenuto; non cancellarlo per far partire l’app. `archive.json` deve essere un file regolare, non un collegamento simbolico. |
+| Impossibile caricare i dati | Controllare il processo e l’indirizzo, poi usare **Aggiorna progetti** o **Aggiorna attività** per conservare gli input. |
+| Salvataggio rifiutato | Correggere il campo segnalato o controllare la cartella dati; su conflitto seguire il confronto, senza ricaricare la pagina. |
+
+## Funzioni successive e backup
+
+| Funzione | Stato attuale |
+| --- | --- |
+| Settimana | **Non ancora disponibile**: nessuna vista o pianificazione settimanale. |
+| Registrazione del tempo | Non disponibile: una stima non registra minuti dedicati né sessioni. |
+| Riepilogo | **Non ancora disponibile**: nessun conteggio o riepilogo del tempo. |
+| Backup | **Non ancora disponibile**: nessun download, importazione o ripristino portabile. |
+
+Queste funzioni non sono implementate nemmeno nelle API; i pulsanti **Settimana**,
+**Riepilogo** e **Backup** mostrano esplicitamente l’indisponibilità. Non ci sono
+recupero automatico, migrazioni da altri formati o recupero persistente delle
+bozze. Il file interno `archive.json` non è il backup portabile previsto dal
+contratto: questa versione non offre una procedura di esportazione/ripristino.
+Il percorso futuro progetti → settimana → tempo → backup si ferma alle attività.
 
 ## Uso delle API
 
@@ -187,53 +251,27 @@ Gli errori hanno forma `{"error":"Messaggio in italiano","code":"CODICE"}`:
 - 503: salvataggio fallito, senza applicare la modifica;
 - 500: errore interno inatteso, dettagli nel terminale.
 
-Non vengono introdotti account, servizi esterni o telemetria. Il server non è
-pubblicato né predisposto per accesso remoto. L’uso da browser mobile e
-l’interfaccia accessibile restano da realizzare negli esiti successivi.
-
 ## Stato delle verifiche
 
-Le ricevute host correnti riportano entrambi i criteri approvati **PASS**, con
-sei gruppi superati ciascuno:
+Le ricevute del checkpoint precedente riportano **PASS storico** per
+`projects-api` e `tasks-api` (sei gruppi ciascuno). Non attestano questa versione
+dell’interfaccia. Il [registro delle evidenze](docs/verifiche.md) ne indica la
+provenienza e separa le dichiarazioni locali precedenti dalle verifiche correnti.
 
-| Comando host | Esito | Gruppi superati |
-| --- | --- | --- |
-| `node tests/acceptance.mjs projects-api` | PASS | 6 |
-| `node tests/acceptance.mjs tasks-api` | PASS | 6 |
-
-Per `projects-api` la copertura osservata comprende archivio inizialmente vuoto,
-creazione con nome ripulito e valori predefiniti, modifica con incremento della
-revisione e conflitto senza sovrascrittura, rifiuto di nomi invalidi e revisioni
-mancanti, archiviazione persistente dopo riavvio e 404 per un ID sconosciuto
-senza creare record.
-
-Per `tasks-api` comprende campi e valori predefiniti, modifica e conflitti di
-revisione, filtri combinati e ricerca senza distinzione di maiuscole, validazione
-di date civili, stato, titolo, note e stime, due modifiche concorrenti con un solo
-successo e un 409, esclusione dalla lista generale delle attività di progetti
-archiviati, rifiuto della creazione in progetti archiviati o sconosciuti,
-persistenza dopo riavvio e rifiuto del JSON malformato senza modificare i dati.
-
-Le verifiche host hanno osservato anche l’avvio con `PORT=0` e una cartella
-`SVOLTA_DATA_DIR` temporanea, l’annuncio `SVOLTA_READY` con l’indirizzo
-`http://127.0.0.1:<porta>`, le risposte HTTP e il riavvio del processo sulla stessa
-cartella dati.
-
-Separatamente, durante l’implementazione sono stati dichiarati superati controlli
-locali di sintassi e prove mirate del gestore delle
-richieste su filesystem temporaneo: valori predefiniti e validazione, JSON
-malformato, filtri combinati e ricerca, un solo successo tra scritture
-concorrenti, archiviazione e riattivazione, riapertura dell’archivio, fallimenti
-forzati di creazione e aggiornamento senza perdita di dati e successivo recupero
-della coda. Sono stati controllati anni bisestili e secolari in quattro fusi
-orari, compatibilità con l’archivio dei soli progetti e rifiuto di attività
-salvate non valide senza sovrascrivere il file.
-
-Questi controlli locali non aprono socket e non eseguono i comandi di accettazione;
-sono dichiarazioni distinte dalle ricevute host riportate sopra e non sono stati
-rieseguiti per questo aggiornamento della guida.
-
-Non sono stati osservati collaudi browser, desktop o mobile. I PASS delle API
-non attestano queste esperienze d’uso e non sostituiscono la successiva revisione
-del prodotto. Pianificazione, sessioni, riepiloghi, backup e ripristino non sono
-implementati né dichiarati collaudati.
+Questo aggiornamento riguarda solo la documentazione: lettura dei sorgenti e
+controllo dei collegamenti locali. Non sono stati avviati server HTTP o browser
+né rieseguite suite API o di accettazione; non si dichiara alcun collaudo desktop,
+mobile a 390px o con lettori di schermo. Non è disponibile qui una nuova ricevuta host.
+
+Per il flusso corrente sono richieste al runtime nuove esecuzioni dei criteri
+approvati; questi sono comandi da eseguire sull’host, non esiti osservati:
+
+~~~sh
+node tests/acceptance.mjs projects-api
+node tests/acceptance.mjs tasks-api
+node tests/acceptance.mjs board-ui
+~~~
+
+Le nuove ricevute del runtime vanno riferite alla revisione verificata e tenute
+distinte da quelle storiche. Un PASS dei criteri automatici non sostituisce la
+revisione d’uso, in particolare dei conflitti per campo, del focus e del layout.
diff --git a/src/app.mjs b/src/app.mjs
index 05a1433..f0db111 100644
--- a/src/app.mjs
+++ b/src/app.mjs
@@ -1,6 +1,7 @@
 import { AppError, sendError, sendJSON } from './errors.mjs';
 import { createProject, updateProject } from './projects.mjs';
 import { createTask, listTasks, updateTask } from './tasks.mjs';
+import { servePublic } from './public.mjs';
 
 const MAX_BODY_BYTES = 2 * 1024 * 1024;
 
@@ -143,6 +144,7 @@ export function createRequestHandler(archive) {
         sendJSON(response, 200, project);
         return;
       }
+      if (await servePublic(request, response, path)) return;
       throw new AppError(404, 'NOT_FOUND', 'Indirizzo non trovato.');
     } catch (error) {
       sendError(response, error);
diff --git a/docs/guida.md b/docs/guida.md
new file
--- /dev/null
+++ b/docs/guida.md
+# Usare Progetti e Attività
+
+Occorre Node.js 22.13 o successivo. Dalla cartella del progetto avviare
+`node src/server.mjs` oppure `npm start`, senza installare dipendenze. Aprire nel
+browser l’indirizzo della riga `SVOLTA_READY http://127.0.0.1:…` e lasciare il
+terminale aperto. **Ctrl+C** ferma il server. Per porta e cartella personalizzate,
+vedere [Avvio](../README.md#avvio).
+
+## Creare un progetto e la prima attività
+
+1. Aprire **Progetti**, scrivere **Nome progetto** (1–100 caratteri) e premere
+   **Crea progetto**. Il messaggio di successo conferma il salvataggio.
+2. Sul progetto premere **Aggiungi un’attività**. Si apre **Attività** con il
+   progetto scelto; si può anche arrivare dalla navigazione e scegliere **Progetto**.
+3. Compilare **Titolo attività** (1–160 caratteri), ed eventualmente **Note**
+   (fino a 4000 caratteri), **Scadenza** e **Stima (minuti)**. La stima accetta
+   interi 0–10080; 0 significa senza stima. Nome e titolo vengono ripuliti dagli
+   spazi ai bordi; le note conservano spazi e a capo.
+4. Premere **Crea attività**. Dopo il successo compare una scheda «Da fare» e
+   si svuotano i dettagli, mantenendo il progetto per l’attività successiva.
+
+Le schede mostrano progetto, stato, note se presenti, scadenza e stima. Nomi,
+titoli e note sono testo letterale: eventuali tag HTML non vengono interpretati.
+Se non ci sono progetti attivi, crearne uno o riattivarne uno archiviato.
+
+## Modificare e filtrare
+
+**Modifica** sulla scheda apre **Modifica attività**. Cambiare titolo, note,
+scadenza, stima o **Stato** (Da fare, In corso, Completata), poi **Salva modifiche**.
+Il progetto rimane lo stesso; una scadenza vuota rimuove quella precedente.
+Il dialogo si chiude dopo il successo. Gli errori conservano i campi;
+**Annulla** o **Escape** scartano la bozza. Durante il salvataggio occorre attendere.
+
+**Filtra per progetto**, **Filtra per stato** e **Cerca attività** si applicano
+insieme e aggiornano l’elenco senza invio. La ricerca trova sottostringhe nel
+titolo o nelle note ignorando maiuscole e minuscole; gli spazi digitati contano.
+**Azzera filtri** torna alle attività non archiviate di tutti i progetti attivi,
+comprese quelle completate. Se un’attività appena salvata non appare, controllare
+i filtri; il messaggio di successo conferma comunque il salvataggio.
+
+Il filtro progetto non cambia il progetto scelto nel modulo di creazione.
+**Filtra per progetto** include anche progetti archiviati: selezionarne uno
+per consultare le sue attività non archiviate.
+
+## Rinomina, archiviazione e riattivazione
+
+In **Progetti**, **Rinomina** apre **Nuovo nome progetto**: correggerlo e premere
+**Salva nome**. Il nome cambia anche sulle attività e nei selettori, conservando
+l’associazione allo stesso progetto.
+
+**Archivia** richiede **Archivia progetto** per confermare. Il progetto passa
+negli **Archiviati**, conserva i dati e nasconde le sue attività dalla vista
+generale. Non accetta nuove attività. **Riattiva** e poi **Riattiva progetto**
+lo rendono disponibile e mostrano di nuovo le attività non archiviate.
+
+**Archivia** su un’attività richiede **Archivia attività** e la nasconde da tutti
+gli elenchi, anche usando il filtro progetto. I dati restano salvati. Riattivare
+il progetto non riattiva le singole attività archiviate: questa versione non
+offre un comando visuale per recuperarle. Le API permettono la riattivazione
+solo conoscendo ID e revisione corrente; vedere [Attività](../README.md#attività).
+Annullare una conferma non modifica i dati.
+
+## Errori e bozze
+
+Gli errori non svuotano gli input. Correggere il campo indicato o verificare che
+il server sia attivo. Se una connessione interrotta impedisce la conferma, il
+server potrebbe avere già salvato: usare **Aggiorna progetti** o **Aggiorna attività**
+e controllare i dati prima di inviare di nuovo, soprattutto per evitare duplicati.
+
+Questi comandi e il ritorno nella scheda/finestra aggiornano gli elenchi senza
+cambiare gli editor aperti. Non c’è sincronizzazione continua. Cambiare sezione
+conserva i campi; **ricaricare o chiudere la pagina perde le bozze non salvate**.
+
+Se un progetto scelto viene archiviato in un’altra scheda, una nuova attività
+viene rifiutata e il progetto risulta «non disponibile» dopo l’aggiornamento.
+Gli altri input restano compilati: scegliere esplicitamente un progetto attivo
+oppure riattivare quello originale. Svolta non ne sceglie un altro automaticamente.
+
+## Conflitti tra schede
+
+Un conflitto significa che il record salvato è cambiato da quando si è aperto
+l’editor. Il salvataggio viene rifiutato e il dialogo conserva la bozza e la
+revisione iniziale. Aggiornare l’elenco non risolve il conflitto e non modifica
+la bozza. Nessun nuovo tentativo parte automaticamente.
+
+Per un’attività:
+
+1. Premere **Leggi versione corrente**. Confrontare **Versione aperta**,
+   **Versione corrente letta** e **La tua bozza** per titolo, note, scadenza,
+   stima, stato e archiviazione. La lettura non cambia i campi del modulo.
+2. Per ogni campo modificato nella bozza che differisce anche dalla versione
+   corrente, scegliere **Mantieni versione corrente** oppure **Applica la mia bozza**.
+   I campi non modificati conservano i dati correnti. Per esempio, applicare solo
+   le proprie note conserva il titolo cambiato nell’altra scheda.
+3. Premere **Applica le modifiche scelte alla revisione…**. Sono inviati solo
+   i campi scelti dalla bozza sulla versione confrontata. Per un conflitto durante
+   l’archiviazione, scegliere **Archiviazione** e confermare **Archivia alla revisione…**.
+
+Si può ancora correggere la bozza: cambiare un campo richiede una nuova scelta
+per quel campo. Se si mantengono tutti i dati correnti, o coincidono già con la
+bozza, non c’è nulla da inviare e il pulsante resta disabilitato: **Annulla**
+chiude senza salvare la bozza. Un ulteriore conflitto conserva gli input e
+richiede una nuova lettura e nuove scelte. Se la lettura fallisce, si può riprovare.
+
+Il confronto ignora i filtri e funziona anche nei progetti archiviati. Se invece
+è stata archiviata l’attività stessa, la versione corrente non è più consultabile
+tramite gli elenchi: il dialogo lo segnala e non permette un invio senza confronto.
+Copiare i valori utili dalla bozza prima di annullare.
+
+Per un progetto, **Leggi versione corrente** confronta nome, stato e revisioni.
+**Applica la rinomina alla revisione…** conferma solo il nome digitato, conservando
+lo stato corrente. **Archivia alla revisione…** o **Riattiva alla revisione…**
+cambiano solo lo stato, conservando il nome corrente. Si può annullare oppure,
+se arriva un altro conflitto, leggere e confrontare di nuovo.
+
+## Tastiera e schermi stretti
+
+**Vai al contenuto** salta la navigazione. Usare **Tab** e **Maiusc+Tab** per
+spostarsi, **Invio** o **Spazio** per i pulsanti. Il contorno indica il focus;
+i campi hanno etichette e gli errori di compilazione portano al campo da correggere.
+Il dialogo nativo mantiene la navigazione al suo interno; alla chiusura il focus
+torna al comando di apertura o al titolo della sezione se il record non è più
+visibile. Durante il salvataggio occorre attendere la risposta prima di chiudere.
+
+Il layout prevede navigazione su più righe, campi in colonna e dialoghi con
+scorrimento verticale su schermi stretti; nomi, note e confronti vanno a capo.
+Il nome completo del progetto selezionato appare sotto i selettori. Gli stati
+sono scritti in italiano oltre al colore, le scadenze come giorno/mese/anno.
+Queste indicazioni descrivono l’implementazione, non un collaudo browser osservato.
+
+## Dati e funzioni successive
+
+I record salvati rimangono in `~/.local/share/svolta/archive.json`, oppure nella
+cartella `SVOLTA_DATA_DIR`. Usare un solo processo per cartella e la stessa
+cartella ai riavvii; non modificare il file mentre il server è attivo.
+Per errori di avvio vedere [Cartella dati e affidabilità](../README.md#cartella-dati-e-affidabilità).
+
+**Settimana**, **Riepilogo** e **Backup** mostrano «Non ancora disponibile».
+Il percorso futuro **progetti → settimana → tempo → backup** si ferma qui alle
+attività: una scadenza non genera una vista settimanale e una stima non registra
+sessioni. Mancano conteggi, riepiloghi, backup portabile e ripristino; il file
+interno non è quel backup. Non c’è recupero automatico dei dati o delle bozze.
+
+Il server ascolta solo sul dispositivo che lo esegue: il layout adattivo non
+permette di collegare il telefono al computer con lo stesso indirizzo locale.
+Le ricevute storiche e le nuove verifiche richieste, senza dichiarare collaudi
+non osservati, sono descritte nel [registro delle evidenze](verifiche.md).
+
diff --git a/docs/verifiche.md b/docs/verifiche.md
new file
--- /dev/null
+++ b/docs/verifiche.md
+# Provenienza e limiti delle verifiche
+
+La descrizione delle funzioni nel [README](../README.md) e nella [guida](guida.md)
+è basata sui sorgenti presenti. Una funzione descritta, un controllo locale
+dichiarato e una ricevuta del runtime sono informazioni diverse.
+
+## Ricevute host storiche
+
+Il contesto operatore di questa delega riporta dal checkpoint
+`d3e570da7f20fb6f81fa5f6d8af89f710e9926d1` (run sorgente
+`20261020T205056-641e33a8`, sequenza 64) questi risultati:
+
+| Comando approvato | Esito riportato dal checkpoint | Gruppi |
+| --- | --- | --- |
+| `node tests/acceptance.mjs projects-api` | PASS storico | 6 |
+| `node tests/acceptance.mjs tasks-api` | PASS storico | 6 |
+
+La copertura riportata per `projects-api` comprende archivio vuoto, creazione e
+normalizzazione del nome, aggiornamento con revisione, conflitto senza
+sovrascrittura, validazione, archiviazione persistente dopo riavvio e ID ignoto.
+
+Per `tasks-api` comprende valori predefiniti, aggiornamento e conflitti,
+filtri combinati e ricerca, validazione dei campi e delle date civili,
+concorrenza con un solo successo, progetti archiviati o sconosciuti,
+persistenza dopo riavvio e JSON malformato senza modifica dei dati.
+Il checkpoint riferisce anche avvio con `PORT=0`, cartella dati temporanea,
+annuncio `SVOLTA_READY`, richieste HTTP e riavvio sulla stessa cartella.
+
+Questa documentazione riporta il contesto ricevuto; non riproduce né rinnova
+quegli esiti. Non c’è in esso una ricevuta `board-ui`. I PASS API storici non
+verificano la nuova interfaccia né dimostrano la conservazione delle API nella
+versione corrente.
+
+## Controlli locali dichiarati nei task precedenti
+
+Il README ereditato elencava controlli di sintassi e prove mirate del gestore
+su filesystem temporaneo o dati in memoria: validazione, filtri, revisioni,
+errori di salvataggio, recupero della coda, compatibilità dell’archivio,
+date civili e accesso ai soli asset consentiti.
+
+Per l’interfaccia dichiarava controlli statici di ID, etichette e riferimenti
+ARIA e simulazioni del DOM: gestione dei progetti, modifica e archiviazione
+attività, filtri, risposte fuori ordine, conservazione delle bozze, confronto
+per campo, conflitti ripetuti e logica del focus.
+
+Sono dichiarazioni locali ereditate, non nuove esecuzioni di questo task né
+ricevute host. Le simulazioni del DOM non osservano il layout a 390px, il focus
+nativo, Tab/Escape, lettori di schermo o l’esperienza effettiva nel browser.
+Le prove senza socket non dimostrano il funzionamento HTTP; quelle in memoria
+non dimostrano la persistenza su disco.
+
+## Aggiornamento corrente della documentazione
+
+In questo task sono stati letti i sorgenti server, archivio, API e interfaccia
+per allineare le istruzioni alle etichette e ai percorsi presenti. È stato
+eseguito un controllo dei collegamenti locali della documentazione. Non sono
+state modificate le API o gli asset, avviati server/browser o rieseguite suite
+API o di accettazione. Questo controllo documentale non attesta il funzionamento
+dell’app. Non è stata osservata qui una nuova ricevuta host.
+
+I criteri da richiedere al runtime per il flusso attuale sono:
+
+| Comando approvato | Scopo | Nuova evidenza disponibile in questo task |
+| --- | --- | --- |
+| `node tests/acceptance.mjs projects-api` | Regressione dell’archivio e delle API progetti | Nessuna |
+| `node tests/acceptance.mjs tasks-api` | Regressione delle attività, dei filtri e dei conflitti API | Nessuna |
+| `node tests/acceptance.mjs board-ui` | Flusso visuale su desktop e schermo stretto | Nessuna |
+
+Una richiesta di verifica non equivale a un’esecuzione o a un PASS. Le ricevute
+che il runtime produrrà successivamente saranno nuove evidenze: riferirle alla
+revisione controllata, al comando, all’esito e al relativo output, senza
+sostituire retroattivamente lo storico o attribuirgli la copertura corrente.
+
+Non si dichiarano collaudi browser, desktop/mobile o con lettori di schermo
+osservati in questo task, né una revisione indipendente o una pubblicazione.
+I criteri automatici non esauriscono la revisione d’uso, in particolare per
+scelte nei conflitti, tastiera, focus, nomi lunghi e assenza di scorrimento
+orizzontale. Settimana, sessioni di tempo, Riepilogo e Backup/ripristino sono
+indisponibili, senza dichiarazioni di implementazione o collaudo.
+
diff --git a/public/index.html b/public/index.html
new file
--- /dev/null
+++ b/public/index.html
+<!doctype html>
+<html lang="it">
+  <head>
+    <meta charset="utf-8">
+    <meta name="viewport" content="width=device-width, initial-scale=1">
+    <meta name="theme-color" content="#225849">
+    <title>Svolta · Un passo alla volta</title>
+    <link rel="stylesheet" href="/assets/svolta.css">
+    <script src="/assets/svolta.js" defer></script>
+  </head>
+  <body>
+    <a class="skip-link" href="#contenuto">Vai al contenuto</a>
+    <div class="app-shell">
+      <header class="sidebar">
+        <div class="brand">
+          <span class="brand-mark" aria-hidden="true">s.</span>
+          <div>
+            <h1>Svolta</h1>
+            <p>Un passo alla volta.</p>
+          </div>
+        </div>
+        <nav aria-label="Navigazione principale">
+          <button type="button" data-page="progetti" aria-controls="progetti" aria-current="page"><span aria-hidden="true">01</span> Progetti</button>
+          <button type="button" data-page="attivita" aria-controls="attivita"><span aria-hidden="true">02</span> Attività</button>
+          <button type="button" data-page="settimana" aria-controls="settimana"><span aria-hidden="true">03</span> Settimana</button>
+          <button type="button" data-page="riepilogo" aria-controls="riepilogo"><span aria-hidden="true">04</span> Riepilogo</button>
+          <button type="button" data-page="backup" aria-controls="backup"><span aria-hidden="true">05</span> Backup</button>
+        </nav>
+        <p class="local-note">Il tuo spazio locale.<br>Nessun account, nessuna distrazione.</p>
+      </header>
+
+      <main id="contenuto" tabindex="-1">
+        <noscript><p class="message error" role="alert">Per usare i moduli di Svolta, abilita JavaScript nel browser e ricarica la pagina.</p></noscript>
+
+        <section id="progetti" aria-labelledby="progetti-heading">
+          <header class="page-heading">
+            <p class="eyebrow">FAI SPAZIO ALLE TUE IDEE</p>
+            <h2 id="progetti-heading" tabindex="-1">Progetti</h2>
+            <p>Un posto per ciò che vuoi portare avanti. Inizia da un nome, poi aggiungi il prossimo passo.</p>
+          </header>
+          <div class="workspace">
+            <div class="panel form-panel">
+              <h3>Un nuovo inizio</h3>
+              <p class="muted">Grande o piccolo, dagli un nome.</p>
+              <form id="project-form" novalidate>
+                <fieldset id="project-fields" disabled>
+                  <legend class="sr-only">Crea un progetto</legend>
+                  <div class="field">
+                    <label for="project-name">Nome progetto <span class="required-note" aria-hidden="true">(obbligatorio)</span></label>
+                    <input id="project-name" name="name" type="text" required aria-describedby="project-name-help" placeholder="Es. Il mio piccolo orto" autocomplete="off">
+                    <p id="project-name-help" class="field-help">Da 1 a 100 caratteri.</p>
+                  </div>
+                  <button type="submit" class="primary">Crea progetto</button>
+                </fieldset>
+                <p id="project-form-error" class="message error" role="alert" tabindex="-1" hidden></p>
+                <p id="project-form-status" class="message success" role="status" tabindex="-1" hidden></p>
+              </form>
+            </div>
+            <div class="collection" aria-labelledby="project-list-heading">
+              <div class="collection-heading">
+                <h3 id="project-list-heading">I tuoi progetti <span id="project-count" class="count"></span></h3>
+                <button id="reload-projects" class="subtle" type="button" disabled>Aggiorna progetti</button>
+              </div>
+              <p id="projects-loading" class="muted" role="status">Caricamento dei progetti…</p>
+              <p id="projects-error" class="message error" role="alert" hidden></p>
+              <p id="project-updates-status" class="message success" role="status" hidden></p>
+              <div id="projects-empty" class="empty-state" hidden>
+                <span class="empty-symbol" aria-hidden="true">↗</span>
+                <h4>Ogni progetto inizia qui</h4>
+                <p>Non hai ancora progetti. Crea il primo con il modulo Nome progetto.</p>
+              </div>
+              <div id="active-projects" class="project-group" hidden>
+                <h4>Attivi <span id="active-project-count" class="count"></span></h4>
+                <p id="active-projects-empty" class="muted" hidden>Non ci sono progetti attivi. Crea un progetto o riattivane uno archiviato.</p>
+                <ul id="project-list" class="project-list" aria-label="Progetti attivi"></ul>
+              </div>
+              <div id="archived-projects" class="project-group" hidden>
+                <h4>Archiviati <span id="archived-project-count" class="count"></span></h4>
+                <p class="field-help">I dati restano salvati. Riattiva un progetto per aggiungere nuove attività.</p>
+                <ul id="archived-project-list" class="project-list" aria-label="Progetti archiviati"></ul>
+              </div>
+            </div>
+          </div>
+        </section>
+
+        <section id="attivita" aria-labelledby="attivita-heading" hidden>
+          <header class="page-heading">
+            <p class="eyebrow">DA UN’IDEA A UN PASSO CONCRETO</p>
+            <h2 id="attivita-heading" tabindex="-1">Attività</h2>
+            <p>Scrivi cosa vuoi fare. Una scadenza e una stima possono aiutarti a iniziare.</p>
+          </header>
+          <div class="workspace">
+            <div class="panel form-panel">
+              <h3>Il prossimo passo</h3>
+              <p class="muted">Scegli un progetto e aggiungi un’attività.</p>
+              <form id="task-form" novalidate>
+                <fieldset id="task-fields" disabled>
+                  <legend class="sr-only">Crea un’attività</legend>
+                  <div class="field">
+                    <label for="task-project">Progetto <span class="required-note" aria-hidden="true">(obbligatorio)</span></label>
+                    <select id="task-project" name="projectId" required aria-describedby="task-project-selection task-project-help project-availability"><option value="">Scegli un progetto</option></select>
+                    <p id="task-project-selection" class="field-help selected-project" hidden></p>
+                    <p id="task-project-help" class="field-help">Puoi aggiungere attività ai progetti attivi.</p>
+                    <p id="project-availability" class="message error" role="alert" hidden></p>
+                    <button id="go-to-projects" type="button" class="text-button">Vai ai progetti</button>
+                  </div>
+                  <div class="field">
+                    <label for="task-title">Titolo attività <span class="required-note" aria-hidden="true">(obbligatorio)</span></label>
+                    <input id="task-title" name="title" type="text" required aria-describedby="task-title-help" placeholder="Es. Scegliere le prime piantine" autocomplete="off">
+                    <p id="task-title-help" class="field-help">Da 1 a 160 caratteri.</p>
+                  </div>
+                  <div class="field">
+                    <label for="task-notes">Note</label>
+                    <textarea id="task-notes" name="notes" rows="4" aria-describedby="task-notes-help" placeholder="Dettagli, idee o qualcosa da ricordare…"></textarea>
+                    <p id="task-notes-help" class="field-help">Facoltative, fino a 4000 caratteri.</p>
+                  </div>
+                  <div class="field-row">
+                    <div class="field">
+                      <label for="task-due">Scadenza</label>
+                      <input id="task-due" name="dueDate" type="date" min="0001-01-01" max="9999-12-31" aria-describedby="task-due-help">
+                      <p id="task-due-help" class="field-help">Facoltativa.</p>
+                    </div>
+                    <div class="field">
+                      <label for="task-estimate">Stima (minuti)</label>
+                      <input id="task-estimate" name="estimateMinutes" type="number" min="0" max="10080" step="1" value="0" inputmode="numeric" aria-describedby="task-estimate-help">
+                      <p id="task-estimate-help" class="field-help">Da 0 a 10080. 0 = senza stima.</p>
+                    </div>
+                  </div>
+                  <button type="submit" class="primary">Crea attività</button>
+                </fieldset>
+                <p id="task-form-error" class="message error" role="alert" tabindex="-1" hidden></p>
+                <p id="task-form-status" class="message success" role="status" tabindex="-1" hidden></p>
+              </form>
+            </div>
+            <div class="collection" aria-labelledby="task-list-heading">
+              <div class="collection-heading">
+                <h3 id="task-list-heading">Le tue attività <span id="task-count" class="count"></span></h3>
+                <button id="reload-tasks" class="subtle" type="button" disabled>Aggiorna attività</button>
+              </div>
+              <fieldset class="task-filters">
+                <legend class="sr-only">Filtri attività</legend>
+                <div class="field">
+                  <label for="filter-project">Filtra per progetto</label>
+                  <select id="filter-project" aria-describedby="filter-project-selection filter-project-help"><option value="">Tutti i progetti attivi</option></select>
+                  <p id="filter-project-selection" class="field-help selected-project" hidden></p>
+                  <p id="filter-project-help" class="field-help">La vista generale esclude i progetti archiviati. Puoi selezionarli per consultarne le attività.</p>
+                </div>
+                <div class="field-row">
+                  <div class="field">
+                    <label for="filter-status">Filtra per stato</label>
+                    <select id="filter-status">
+                      <option value="">Tutti gli stati</option>
+                      <option value="todo">Da fare</option>
+                      <option value="doing">In corso</option>
+                      <option value="done">Completata</option>
+                    </select>
+                  </div>
+                  <div class="field">
+                    <label for="filter-search">Cerca attività</label>
+                    <input id="filter-search" type="search" autocomplete="off" aria-describedby="filter-search-help" placeholder="Nel titolo o nelle note">
+                    <p id="filter-search-help" class="field-help">I tre filtri si combinano. La ricerca ignora maiuscole e minuscole.</p>
+                  </div>
+                </div>
+                <button id="reset-task-filters" class="subtle" type="button">Azzera filtri</button>
+              </fieldset>
+              <p id="tasks-loading" class="muted" role="status">Caricamento delle attività…</p>
+              <p id="tasks-error" class="message error" role="alert" hidden></p>
+              <p id="task-updates-status" class="message success" role="status" hidden></p>
+              <p id="task-results-status" class="field-help" role="status" hidden></p>
+              <div id="tasks-empty" class="empty-state" hidden>
+                <span class="empty-symbol" aria-hidden="true">✓</span>
+                <h4 id="tasks-empty-heading">Qual è il prossimo passo?</h4>
+                <p id="tasks-empty-help">Non ci sono attività visibili. Scegli un progetto attivo e crea la prima.</p>
+              </div>
+              <div id="task-list" class="task-list"></div>
+            </div>
+          </div>
+        </section>
+
+        <section id="settimana" aria-labelledby="settimana-heading" hidden>
+          <header class="page-heading"><p class="eyebrow">IL TEMPO PER LE TUE IDEE</p><h2 id="settimana-heading" tabindex="-1">Settimana</h2></header>
+          <div class="panel unavailable"><h3>Non ancora disponibile</h3><p>La pianificazione settimanale e la registrazione del tempo saranno aggiunte in un passaggio successivo. Per ora puoi creare progetti e attività, con scadenza e stima.</p></div>
+        </section>
+        <section id="riepilogo" aria-labelledby="riepilogo-heading" hidden>
+          <header class="page-heading"><p class="eyebrow">UNO SGUARDO AL PERCORSO</p><h2 id="riepilogo-heading" tabindex="-1">Riepilogo</h2></header>
+          <div class="panel unavailable"><h3>Non ancora disponibile</h3><p>I conteggi e il riepilogo del tempo dedicato non sono ancora disponibili.</p></div>
+        </section>
+        <section id="backup" aria-labelledby="backup-heading" hidden>
+          <header class="page-heading"><p class="eyebrow">LE TUE IDEE, DA CONSERVARE</p><h2 id="backup-heading" tabindex="-1">Backup</h2></header>
+          <div class="panel unavailable"><h3>Non ancora disponibile</h3><p>Esportazione e ripristino di backup portabili non sono ancora disponibili. I salvataggi attuali restano nella cartella dati del server e vengono riletti alla riapertura.</p></div>
+        </section>
+
+        <footer class="page-footer">Svolta · Progetti personali, al tuo ritmo.</footer>
+      </main>
+    </div>
+    <dialog id="project-dialog" aria-labelledby="project-dialog-heading" aria-describedby="project-dialog-help">
+      <form id="project-edit-form" novalidate>
+        <h2 id="project-dialog-heading">Rinomina progetto</h2>
+        <p id="project-dialog-help" class="muted"></p>
+        <p id="project-edit-context" class="project-name"></p>
+        <fieldset id="project-edit-fields">
+          <legend class="sr-only">Modifica del progetto</legend>
+          <div id="project-edit-name-field" class="field">
+            <label for="project-edit-name">Nuovo nome progetto</label>
+            <input id="project-edit-name" name="name" type="text" required aria-describedby="project-edit-name-help" autocomplete="off">
+            <p id="project-edit-name-help" class="field-help">Da 1 a 100 caratteri, esclusi gli spazi ai bordi.</p>
+          </div>
+          <p id="project-edit-error" class="message error" role="alert" tabindex="-1" hidden></p>
+          <p id="project-edit-status" class="message success" role="status" tabindex="-1" hidden></p>
+          <section id="project-conflict" class="conflict" aria-labelledby="project-conflict-heading" hidden>
+            <h3 id="project-conflict-heading">Confronta le versioni</h3>
+            <p>La tua modifica non è stata applicata. Puoi rileggere la versione corrente senza perdere la bozza.</p>
+            <button id="project-read-current" class="subtle" type="button">Leggi versione corrente</button>
+            <div id="project-comparison" hidden>
+              <dl id="project-comparison-details" class="comparison-details"></dl>
+              <p id="project-retry-help" class="field-help"></p>
+              <button id="project-retry" class="primary" type="button">Applica alla versione letta</button>
+            </div>
+          </section>
+          <div class="dialog-actions">
+            <button id="project-edit-save" class="primary" type="submit">Salva nome</button>
+            <button id="project-edit-cancel" class="subtle" type="button">Annulla</button>
+          </div>
+        </fieldset>
+      </form>
+    </dialog>
+    <dialog id="task-dialog" aria-labelledby="task-dialog-heading" aria-describedby="task-dialog-help">
+      <form id="task-edit-form" novalidate>
+        <h2 id="task-dialog-heading">Modifica attività</h2>
+        <p id="task-dialog-help" class="muted"></p>
+        <p id="task-edit-context" class="project-name"></p>
+        <fieldset id="task-edit-fields">
+          <legend class="sr-only">Modifica dell’attività</legend>
+          <div id="task-edit-details">
+            <div class="field">
+              <label for="task-edit-title">Titolo attività <span class="required-note" aria-hidden="true">(obbligatorio)</span></label>
+              <input id="task-edit-title" name="title" type="text" required aria-describedby="task-edit-title-help" autocomplete="off">
+              <p id="task-edit-title-help" class="field-help">Da 1 a 160 caratteri, esclusi gli spazi ai bordi.</p>
+            </div>
+            <div class="field">
+              <label for="task-edit-notes">Note</label>
+              <textarea id="task-edit-notes" name="notes" rows="4" aria-describedby="task-edit-notes-help"></textarea>
+              <p id="task-edit-notes-help" class="field-help">Facoltative, fino a 4000 caratteri.</p>
+            </div>
+            <div class="field-row">
+              <div class="field">
+                <label for="task-edit-due">Scadenza</label>
+                <input id="task-edit-due" name="dueDate" type="date" min="0001-01-01" max="9999-12-31" aria-describedby="task-edit-due-help">
+                <p id="task-edit-due-help" class="field-help">Lascia vuoto per rimuovere la scadenza.</p>
+              </div>
+              <div class="field">
+                <label for="task-edit-estimate">Stima (minuti)</label>
+                <input id="task-edit-estimate" name="estimateMinutes" type="number" min="0" max="10080" step="1" value="0" inputmode="numeric" aria-describedby="task-edit-estimate-help">
+                <p id="task-edit-estimate-help" class="field-help">Da 0 a 10080. 0 = senza stima.</p>
+              </div>
+            </div>
+            <div class="field">
+              <label for="task-edit-state">Stato</label>
+              <select id="task-edit-state" name="status">
+                <option value="todo">Da fare</option>
+                <option value="doing">In corso</option>
+                <option value="done">Completata</option>
+              </select>
+            </div>
+          </div>
+          <p id="task-edit-error" class="message error" role="alert" tabindex="-1" hidden></p>
+          <p id="task-edit-status" class="message success" role="status" tabindex="-1" hidden></p>
+          <section id="task-conflict" class="conflict" aria-labelledby="task-conflict-heading" hidden>
+            <h3 id="task-conflict-heading">Confronta le versioni</h3>
+            <p>La bozza e la revisione iniziale sono conservate. Leggi la versione corrente, poi scegli quali modifiche applicare. Nessun nuovo salvataggio parte automaticamente.</p>
+            <button id="task-read-current" class="subtle" type="button">Leggi versione corrente</button>
+            <div id="task-comparison" hidden>
+              <p id="task-comparison-context"></p>
+              <p>Per ogni campo modificato nella bozza, scegli se usare il tuo valore o mantenere quello corrente. I campi che non hai modificato conservano il valore corrente. Puoi ancora correggere la bozza nel modulo: cambiare un campo richiede di sceglierlo di nuovo.</p>
+              <div id="task-comparison-details" class="field-comparisons"></div>
+              <p id="task-retry-help" class="field-help" role="status"></p>
+              <button id="task-retry" class="primary" type="button" disabled>Applica le modifiche scelte</button>
+            </div>
+          </section>
+          <div class="dialog-actions">
+            <button id="task-edit-save" class="primary" type="submit">Salva modifiche</button>
+            <button id="task-edit-cancel" class="subtle" type="button">Annulla</button>
+          </div>
+        </fieldset>
+      </form>
+    </dialog>
+  </body>
+</html>
+
diff --git a/public/svolta.css b/public/svolta.css
new file
--- /dev/null
+++ b/public/svolta.css
+:root {
+  color-scheme: light;
+  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
+  color: #263b34;
+  background: #f6f5ef;
+  font-synthesis: none;
+  --green: #225849;
+  --muted: #5b6a62;
+  --border: #d9dfd6;
+}
+
+* { box-sizing: border-box; }
+[hidden] { display: none !important; }
+body { margin: 0; font-size: 16px; line-height: 1.55; }
+button, input, select, textarea { font: inherit; }
+button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
+button { cursor: pointer; white-space: normal; }
+button:disabled, button[aria-disabled="true"] { cursor: wait; opacity: .65; }
+button, input, select, textarea { max-width: 100%; }
+button, h1, h2, h3, h4, p, li, label, dt, dd { overflow-wrap: anywhere; }
+:focus-visible { outline: 3px solid #a15a13; outline-offset: 4px; }
+/* Leave room for focus outlines when a control is scrolled into view. */
+button, input, select, textarea, [tabindex="-1"] { scroll-margin-block: 1rem; }
+h1, h2, h3, h4, p { margin: 0; }
+h1 { font-size: 1.65rem; letter-spacing: -.05em; line-height: 1.2; }
+h2 { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 650; letter-spacing: -.045em; line-height: 1.2; }
+h3 { font-size: 1.15rem; line-height: 1.4; }
+h4 { font-size: 1.05rem; }
+
+.skip-link { position: absolute; top: .75rem; left: 1rem; z-index: 2; padding: .6rem 1rem; background: white; color: var(--green); transform: translateY(-200%); }
+.skip-link:focus { transform: translateY(0); }
+.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
+.app-shell { display: grid; grid-template-columns: 235px minmax(0, 1fr); min-height: 100vh; }
+.sidebar { padding: 2.5rem 1.25rem; background: #e9ede3; border-right: 1px solid var(--border); display: flex; flex-direction: column; gap: 2.8rem; }
+.brand { display: flex; align-items: center; gap: .8rem; padding: 0 .6rem; }
+.brand-mark { display: grid; place-items: center; flex: 0 0 44px; height: 44px; background: var(--green); color: #fff; border-radius: 14px 14px 14px 3px; font: italic 2rem Georgia, serif; }
+.brand p { margin-top: .25rem; color: var(--muted); font-size: .75rem; }
+nav { display: flex; flex-direction: column; gap: .35rem; }
+nav button { min-height: 46px; text-align: left; padding: .7rem .9rem; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #3e554a; }
+nav button span { font-size: .75rem; margin-right: .65rem; opacity: .8; }
+nav button:hover { background: #dde5d7; }
+nav button[aria-current="page"] { color: #fff; background: var(--green); font-weight: 600; }
+.local-note { margin-top: auto; padding: .6rem; color: var(--muted); font-size: .78rem; }
+main { width: 100%; max-width: 1440px; padding: 3rem clamp(1.25rem, 4vw, 4rem) 1.5rem; min-width: 0; }
+section, form { min-width: 0; }
+.page-heading { margin-bottom: 2rem; max-width: 740px; }
+.eyebrow { font-size: .68rem; font-weight: 700; letter-spacing: .14em; color: #526a5c; margin-bottom: .7rem; }
+.page-heading > p:last-child:not(.eyebrow) { color: var(--muted); margin-top: .85rem; max-width: 600px; }
+.workspace { display: grid; grid-template-columns: minmax(260px, .9fr) minmax(0, 1.2fr); align-items: start; gap: 1.75rem; }
+.panel { padding: 1.5rem; border: 1px solid var(--border); background: #fffefa; border-radius: 14px; box-shadow: 0 3px 14px #263b3405; min-width: 0; }
+.form-panel > p { font-size: .88rem; margin: .4rem 0 1.4rem; }
+.muted, .field-help { color: var(--muted); }
+fieldset { border: 0; min-width: 0; padding: 0; margin: 0; }
+.field { min-width: 0; margin-bottom: 1.15rem; }
+label { display: block; margin-bottom: .35rem; font-size: .88rem; font-weight: 600; }
+.required-note { font-size: .73rem; color: var(--muted); font-weight: 400; }
+input, select, textarea { display: block; width: 100%; min-width: 0; min-height: 44px; border: 1px solid #a7b4a9; border-radius: 7px; background: #fff; color: #263b34; padding: .6rem .7rem; }
+input::placeholder, textarea::placeholder { color: #727c75; opacity: 1; }
+input[type="date"] { min-width: 0; appearance: none; }
+input[type="date"]::-webkit-date-and-time-value { text-align: left; }
+select { text-overflow: ellipsis; }
+textarea { resize: vertical; min-height: 108px; }
+[aria-invalid="true"] { border: 2px solid #a63125; }
+.field-help { font-size: .75rem; margin-top: .35rem; }
+.selected-project { white-space: pre-wrap; }
+.field-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: .9rem; }
+.primary { border: 1px solid var(--green); border-radius: 7px; color: white; background: var(--green); padding: .65rem 1.1rem; min-height: 44px; font-weight: 600; }
+.primary:hover:not(:disabled) { background: #164435; }
+.subtle { background: #fffefa; border: 1px solid var(--border); border-radius: 7px; color: var(--green); font-size: .78rem; min-height: 44px; padding: .5rem .65rem; }
+.subtle:hover:not(:disabled) { background: #eaf0e5; }
+.text-button { background: transparent; border: 0; color: var(--green); text-decoration: underline; text-underline-offset: 3px; min-height: 44px; padding: .5rem 0; font-size: .8rem; }
+.collection { min-width: 0; }
+.collection-heading { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: center; gap: .75rem; margin-bottom: 1rem; }
+.count { font-size: .75rem; font-weight: 400; color: var(--muted); }
+.project-list { padding: 0; margin: 0; list-style: none; display: grid; gap: .75rem; }
+.project-group + .project-group { margin-top: 1.75rem; }
+.project-group > h4 { margin-bottom: .65rem; }
+.project-group > p { margin-bottom: .85rem; }
+.project-card { display: flex; flex-direction: column; gap: 1rem; align-items: stretch; padding: 1.2rem; border: 1px solid var(--border); border-radius: 10px; background: #fffefa; }
+.project-card > div { min-width: 0; }
+.project-name { font-weight: 600; margin-bottom: .4rem; white-space: pre-wrap; }
+.project-actions { display: flex; flex-wrap: wrap; gap: .5rem; }
+.project-actions button { min-width: 0; max-width: 100%; }
+.task-filters { margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
+.badge { display: inline-block; font-size: .72rem; font-weight: 600; padding: .18rem .55rem; color: #2c6245; background: #edf2e6; border-radius: 5px; }
+.badge.archived { color: #655e53; background: #eeeae1; }
+.badge.doing { color: #765210; background: #fbefd6; }
+.badge.done { color: #385888; background: #e9eff9; }
+.empty-state { border: 1px dashed #b9c7b6; border-radius: 12px; padding: 2.25rem 1.4rem; text-align: center; color: var(--muted); }
+.empty-symbol { display: inline-grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: #e7eddf; color: var(--green); font-size: 1.4rem; margin-bottom: .85rem; }
+.empty-state h4 { color: #3f5548; margin-bottom: .5rem; }
+.empty-state p { font-size: .88rem; max-width: 330px; margin-inline: auto; }
+.task-list { display: grid; gap: 1rem; }
+.task-card { background: #fffefa; padding: 1.3rem; border: 1px solid var(--border); border-radius: 12px; min-width: 0; }
+.task-card h4 { font-size: 1.1rem; line-height: 1.4; margin: .75rem 0 .5rem; white-space: pre-wrap; }
+.task-project { font-size: .78rem; color: var(--muted); white-space: pre-wrap; }
+.task-notes { white-space: pre-wrap; font-size: .9rem; margin-top: .7rem; }
+.task-details { display: flex; flex-wrap: wrap; gap: .35rem 1rem; margin: 1rem 0 0; font-size: .78rem; color: var(--muted); }
+.task-details div { min-width: 0; }
+.task-details dt, .task-details dd { display: inline; margin: 0; }
+.task-details dt::after { content: ": "; }
+.task-actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
+.task-actions button { min-width: 0; }
+#task-results-status { margin-bottom: .85rem; }
+.message { font-size: .85rem; padding: .8rem; border-radius: 7px; margin: 1rem 0; border: 1px solid; white-space: pre-wrap; }
+.error { color: #812b24; background: #fff1ee; border-color: #e9bcb2; }
+.success { color: #245538; background: #edf6e9; border-color: #c6dcb9; }
+.unavailable { max-width: 640px; }
+.unavailable p { color: var(--muted); margin-top: .65rem; }
+.page-footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: .75rem; color: var(--muted); }
+dialog { color: inherit; background: #fffefa; border: 1px solid var(--border); border-radius: 14px; padding: 1.5rem; width: min(620px, calc(100% - 2rem)); min-width: 0; max-width: calc(100% - 2rem); max-height: calc(100vh - 2rem); max-height: calc(100dvh - 2rem); overflow-y: auto; overscroll-behavior: contain; overflow-wrap: anywhere; box-shadow: 0 12px 60px #10291e40; }
+html:has(dialog[open]) { overflow: hidden; }
+dialog::backdrop { background: #142d2466; }
+dialog h2 { font-size: 1.65rem; margin-bottom: .75rem; }
+dialog .muted { margin-bottom: .85rem; font-size: .9rem; }
+#project-edit-context, #task-edit-context { margin-bottom: 1.25rem; }
+.dialog-actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.25rem; }
+.conflict { padding: 1rem; background: #f6f5ef; border: 1px solid var(--border); border-radius: 8px; }
+.conflict > p { margin: .65rem 0; font-size: .85rem; }
+.comparison-details { display: grid; gap: .75rem; margin-block: 1rem; }
+.comparison-details div { min-width: 0; }
+.comparison-details dt { font-size: .8rem; color: var(--muted); }
+.comparison-details dd { margin: .2rem 0 0; white-space: pre-wrap; overflow-wrap: anywhere; }
+#project-retry-help { margin-bottom: .85rem; }
+.field-comparisons { display: grid; gap: 1rem; margin-block: 1rem; }
+.field-comparison { min-width: 0; border-top: 1px solid var(--border); padding-top: .85rem; }
+.field-comparison .comparison-details { grid-template-columns: repeat(3, minmax(0, 1fr)); }
+.field-comparison label { margin-top: .85rem; }
+#task-retry-help { margin-bottom: .85rem; }
+
+@media (max-width: 1100px) {
+  .app-shell { grid-template-columns: 205px minmax(0, 1fr); }
+  .workspace { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
+  .form-panel { max-width: 620px; width: 100%; }
+}
+
+@media (max-width: 640px) {
+  .app-shell { display: block; }
+  .sidebar { padding: 1.25rem 1rem 1rem; gap: 1.3rem; border-right: 0; border-bottom: 1px solid var(--border); }
+  .brand { padding: 0; }
+  nav { flex-direction: row; flex-wrap: wrap; gap: .35rem; }
+  nav button { flex: 1 1 auto; min-width: 0; font-size: .88rem; padding: .6rem .7rem; text-align: center; }
+  nav button span, .local-note { display: none; }
+  main { padding: 1.75rem 1rem 1.25rem; }
+  .page-heading { margin-bottom: 1.5rem; }
+  .page-heading > p:last-child:not(.eyebrow) { font-size: .9rem; }
+  .panel { padding: 1.15rem; }
+  .field-row { grid-template-columns: minmax(0, 1fr); gap: 0; }
+  .primary { width: 100%; }
+  .project-card { gap: .65rem; }
+  .project-card button { max-width: 100%; }
+  dialog { padding: 1.15rem; }
+  .field-comparison .comparison-details { grid-template-columns: minmax(0, 1fr); }
+  .dialog-actions { flex-direction: column; }
+  .collection-heading h3 { font-size: 1.05rem; }
+}
+
+@media (forced-colors: active) {
+  :focus-visible { outline-color: Highlight; }
+  nav button[aria-current="page"] { border-color: Highlight; }
+  .badge { border: 1px solid; }
+}
+
diff --git a/public/svolta.js b/public/svolta.js
new file
--- /dev/null
+++ b/public/svolta.js
+'use strict';
+
+// Keep server records separate from the live form controls. Refreshing a list
+// must never replace an unsaved draft, including its project selection.
+const byId = id => document.getElementById(id);
+const projectForm = byId('project-form');
+const taskForm = byId('task-form');
+const projectSelect = byId('task-project');
+const projectFilter = byId('filter-project');
+const statusFilter = byId('filter-status');
+const searchFilter = byId('filter-search');
+const projectDialog = byId('project-dialog');
+const projectEditForm = byId('project-edit-form');
+const taskDialog = byId('task-dialog');
+const taskEditForm = byId('task-edit-form');
+const taskStates = { todo: 'Da fare', doing: 'In corso', done: 'Completata' };
+const taskComparisonFields = [
+  ['title', 'Titolo attività'], ['notes', 'Note'], ['dueDate', 'Scadenza'],
+  ['estimateMinutes', 'Stima (minuti)'], ['status', 'Stato'], ['archived', 'Archiviazione'],
+];
+let projectEditor = null;
+let taskEditor = null;
+let projects = [];
+let tasks = [];
+let projectsLoaded = false;
+let projectsFailed = false;
+let tasksLoaded = false;
+let tasksLoading = true;
+let projectRead = 0;
+let taskRead = 0;
+let creatingProject = false;
+let creatingTask = false;
+
+function message(id, text = '') {
+  const target = byId(id);
+  target.textContent = text;
+  target.hidden = !text;
+}
+
+function element(tag, className, text) {
+  const node = document.createElement(tag);
+  if (className) node.className = className;
+  if (text !== undefined) node.textContent = text;
+  return node;
+}
+
+// Native disabled controls can lose focus. Keep a focusable progress message
+// in the modal while its controls are locked, then expose errors in reading order.
+function focusDialogError(prefix) {
+  const error = byId(`${prefix}-edit-error`);
+  if (!error.hidden) error.focus();
+}
+
+function restoreActionFocus(container, previous, kind, fallback) {
+  const buttons = [...container.querySelectorAll(`[data-${kind}-action]`)];
+  const id = previous.dataset[`${kind}Id`];
+  const action = previous.dataset[`${kind}Action`];
+  const replacement = buttons.find(button => button.dataset[`${kind}Id`] === id && button.dataset[`${kind}Action`] === action)
+    ?? buttons.find(button => button.dataset[`${kind}Id`] === id);
+  (replacement ?? fallback).focus({ preventScroll: true });
+}
+
+function navigate(page, moveFocus = true) {
+  for (const button of document.querySelectorAll('nav [data-page]')) {
+    const selected = button.dataset.page === page;
+    byId(button.dataset.page).hidden = !selected;
+    if (selected) button.setAttribute('aria-current', 'page');
+    else button.removeAttribute('aria-current');
+  }
+  if (moveFocus) byId(`${page}-heading`).focus();
+}
+
+class RequestError extends Error {
+  constructor(text, code, status) {
+    super(text);
+    this.code = code;
+    this.status = status;
+  }
+}
+
+async function api(path, input, method = 'POST') {
+  const saving = input !== undefined;
+  let response;
+  let data;
+  try {
+    response = await fetch(path, {
+      method: saving ? method : 'GET',
+      cache: 'no-store',
+      headers: saving ? { 'Content-Type': 'application/json' } : {},
+      ...(saving ? { body: JSON.stringify(input) } : {}),
+    });
+    data = await response.json();
+  } catch {
+    throw new RequestError(saving
+      ? 'Non è stato possibile confermare il salvataggio. Gli input sono conservati. Aggiorna l’elenco e controlla se il record è presente prima di riprovare.'
+      : 'Impossibile caricare i dati. Controlla che il server Svolta sia avviato e riprova con Aggiorna.', 'CONNECTION');
+  }
+  if (!response.ok) {
+    throw new RequestError(typeof data?.error === 'string' ? data.error : 'La richiesta non è riuscita. Riprova.', data?.code, response.status);
+  }
+  return data;
+}
+
+function renderProjectFilter() {
+  const selected = projectFilter.value;
+  const previousName = projectFilter.selectedOptions[0]?.dataset.name ?? 'Progetto selezionato';
+  const options = document.createDocumentFragment();
+  options.append(new Option('Tutti i progetti attivi', ''));
+  for (const archived of [false, true]) {
+    const group = element('optgroup');
+    group.label = archived ? 'Archiviati' : 'Attivi';
+    for (const project of projects.filter(item => item.archived === archived)) {
+      const option = new Option(`${project.name}${archived ? ' (archiviato)' : ''}`, project.id);
+      option.dataset.name = project.name;
+      group.append(option);
+    }
+    if (group.children.length) options.append(group);
+  }
+  if (selected && !projects.some(item => item.id === selected)) {
+    const option = new Option(`${previousName} (non disponibile)`, selected);
+    option.dataset.name = previousName;
+    options.append(option);
+  }
+  projectFilter.replaceChildren(options);
+  projectFilter.value = selected;
+  const project = projects.find(item => item.id === selected);
+  message('filter-project-selection', selected ? `Progetto filtrato: ${project?.name ?? previousName}` : '');
+  byId('filter-project-help').textContent = selected && !project && projectsLoaded
+    ? 'Il progetto selezionato non è disponibile. Scegli esplicitamente un altro filtro; la bozza attività è conservata.'
+    : project?.archived
+      ? 'Stai consultando un progetto archiviato. Le sue attività restano salvate; riattivalo per crearne altre.'
+      : 'La vista generale esclude i progetti archiviati. Puoi selezionarli per consultarne le attività.';
+}
+
+function renderProjectOptions() {
+  const selected = projectSelect.value;
+  const previousName = projectSelect.selectedOptions[0]?.dataset.name ?? 'Progetto selezionato';
+  const options = document.createDocumentFragment();
+  options.append(new Option('Scegli un progetto', ''));
+  for (const project of projects.filter(item => !item.archived)) {
+    const option = new Option(project.name, project.id);
+    option.dataset.name = project.name;
+    options.append(option);
+  }
+  if (selected && !projects.some(item => item.id === selected && !item.archived)) {
+    const name = projects.find(item => item.id === selected)?.name ?? previousName;
+    const option = new Option(`${name} (non disponibile)`, selected);
+    option.dataset.name = name;
+    option.disabled = true;
+    options.append(option);
+  }
+  projectSelect.replaceChildren(options);
+  projectSelect.value = selected;
+  showAvailability();
+}
+
+function showAvailability() {
+  const selected = projectSelect.value;
+  const project = projects.find(item => item.id === selected);
+  const available = project && !project.archived;
+  message('task-project-selection', selected
+    ? `Progetto scelto: ${project?.name ?? projectSelect.selectedOptions[0]?.dataset.name ?? 'Progetto non disponibile'}`
+    : '');
+  message('project-availability', projectsFailed && !projectsLoaded
+    ? 'Impossibile caricare i progetti. Usa Aggiorna attività per riprovare. Gli input sono conservati.'
+    : selected && !available
+      ? project?.archived
+        ? 'Il progetto selezionato è archiviato e non accetta nuove attività. La bozza è conservata: riattiva il progetto in Progetti oppure scegli esplicitamente un altro progetto attivo.'
+        : 'Il progetto selezionato non è più disponibile per nuove attività. Gli altri input sono conservati: scegli esplicitamente un progetto attivo.'
+      : '');
+  byId('task-project-help').textContent = !projectsLoaded
+    ? 'I progetti devono essere caricati prima di creare un’attività.'
+    : !projects.some(item => !item.archived)
+      ? 'Non ci sono progetti attivi. Crea prima un progetto nella sezione Progetti.'
+      : 'Puoi aggiungere attività ai progetti attivi.';
+}
+
+function renderProjects() {
+  const focusedAction = document.activeElement;
+  const restoreFocus = focusedAction?.dataset.projectAction && byId('progetti').contains(focusedAction);
+  const active = document.createDocumentFragment();
+  const archived = document.createDocumentFragment();
+  for (const project of projects) {
+    const card = element('li', 'project-card');
+    const info = element('div');
+    info.append(element('p', 'project-name', project.name));
+    info.append(element('span', `badge${project.archived ? ' archived' : ''}`, project.archived ? 'Archiviato' : 'Attivo'));
+    const actions = element('div', 'project-actions');
+    if (!project.archived) {
+      const button = element('button', 'subtle', 'Aggiungi un’attività');
+      button.type = 'button';
+      button.setAttribute('aria-label', `Aggiungi un’attività a ${project.name}`);
+      button.dataset.projectId = project.id;
+      button.dataset.projectAction = 'add';
+      button.addEventListener('click', () => {
+        if (creatingTask) return;
+        // This explicit action may change the project; background refreshes may not.
+        projectSelect.value = project.id;
+        showAvailability();
+        navigate('attivita');
+        byId('task-title').focus();
+      });
+      actions.append(button);
+    }
+    for (const action of ['rename', project.archived ? 'restore' : 'archive']) {
+      const label = { rename: 'Rinomina', archive: 'Archivia', restore: 'Riattiva' }[action];
+      const button = element('button', 'subtle', label);
+      button.type = 'button';
+      button.setAttribute('aria-label', `${label} ${project.name}`);
+      button.dataset.projectId = project.id;
+      button.dataset.projectAction = action;
+      button.addEventListener('click', () => openProjectEditor(project, action));
+      actions.append(button);
+    }
+    card.append(info, actions);
+    (project.archived ? archived : active).append(card);
+  }
+  const activeCount = projects.filter(item => !item.archived).length;
+  const archivedCount = projects.length - activeCount;
+  byId('project-list').replaceChildren(active);
+  byId('archived-project-list').replaceChildren(archived);
+  byId('project-count').textContent = projectsLoaded ? `(${projects.length})` : '';
+  byId('active-project-count').textContent = `(${activeCount})`;
+  byId('archived-project-count').textContent = `(${archivedCount})`;
+  byId('active-projects').hidden = !projectsLoaded || projects.length === 0;
+  byId('active-projects-empty').hidden = activeCount > 0;
+  byId('archived-projects').hidden = archivedCount === 0;
+  byId('projects-empty').hidden = !projectsLoaded || projects.length > 0;
+  renderProjectOptions();
+  renderProjectFilter();
+  renderTasks();
+  if (restoreFocus) restoreActionFocus(byId('progetti'), focusedAction, 'project', byId('progetti-heading'));
+}
+
+function visibleTasks() {
+  const selected = projectFilter.value;
+  const query = searchFilter.value.toLowerCase();
+  // Also filter optimistic save results by the current controls. Never insert
+  // a newly saved task into an unrelated filtered view while its GET is pending.
+  return tasks.filter(task => !task.archived
+    && (selected ? task.projectId === selected
+      : !projectsLoaded || projects.some(project => project.id === task.projectId && !project.archived))
+    && (!statusFilter.value || task.status === statusFilter.value)
+    && (task.title.toLowerCase().includes(query) || task.notes.toLowerCase().includes(query)));
+}
+
+function renderTasks() {
+  const list = document.createDocumentFragment();
+  const focusedAction = document.activeElement;
+  const restoreFocus = focusedAction?.dataset.taskAction && byId('task-list').contains(focusedAction);
+  const visible = visibleTasks();
+  visible.forEach((task, index) => {
+    const card = element('article', 'task-card');
+    const title = element('h4', '', task.title);
+    title.id = `task-heading-${index}`;
+    card.setAttribute('aria-labelledby', title.id);
+    card.append(element('span', `badge ${task.status}`, taskStates[task.status] ?? task.status), title);
+    card.append(element('p', 'task-project', projects.find(item => item.id === task.projectId)?.name
+      ?? (projectsLoaded ? 'Progetto non disponibile' : 'Nome progetto non caricato')));
+    if (task.notes) card.append(element('p', 'task-notes', task.notes));
+    const details = element('dl', 'task-details');
+    const due = element('div');
+    due.append(element('dt', '', 'Scadenza'));
+    const dueValue = element('dd');
+    if (task.dueDate) {
+      // Civil dates are formatted without time zones or Date conversions.
+      const [year, month, day] = task.dueDate.split('-');
+      const time = element('time', '', `${day}/${month}/${year}`);
+      time.dateTime = task.dueDate;
+      dueValue.append(time);
+    } else dueValue.textContent = 'Nessuna';
+    due.append(dueValue);
+    const estimate = element('div');
+    estimate.append(element('dt', '', 'Stima'), element('dd', '', task.estimateMinutes ? `${task.estimateMinutes} min` : 'Non indicata'));
+    details.append(due, estimate);
+    card.append(details);
+    const actions = element('div', 'task-actions');
+    for (const action of ['edit', 'archive']) {
+      const label = action === 'edit' ? 'Modifica' : 'Archivia';
+      const button = element('button', 'subtle', label);
+      button.type = 'button';
+      button.setAttribute('aria-label', `${label} ${task.title}`);
+      button.dataset.taskId = task.id;
+      button.dataset.taskAction = action;
+      button.addEventListener('click', () => openTaskEditor(task, action));
+      actions.append(button);
+    }
+    card.append(actions);
+    list.append(card);
+  });
+  byId('task-list').replaceChildren(list);
+  byId('task-count').textContent = tasksLoaded ? `(${visible.length})` : '';
+  byId('tasks-empty').hidden = !tasksLoaded || tasksLoading || visible.length > 0;
+  const filtered = projectFilter.value || statusFilter.value || searchFilter.value;
+  byId('tasks-empty-heading').textContent = filtered ? 'Nessuna attività trovata' : 'Qual è il prossimo passo?';
+  byId('tasks-empty-help').textContent = filtered
+    ? 'Nessuna attività corrisponde a tutti i filtri. Modificali o usa Azzera filtri per tornare alla vista generale.'
+    : 'Non ci sono attività visibili. Scegli un progetto attivo e crea la prima.';
+  message('task-results-status', tasksLoaded && !tasksLoading
+    ? `${visible.length === 1 ? '1 attività visibile' : `${visible.length} attività visibili`}${filtered ? ' con i filtri selezionati' : ''}.`
+    : '');
+  if (restoreFocus) {
+    restoreActionFocus(byId('task-list'), focusedAction, 'task', byId('attivita-heading'));
+  }
+}
+
+async function loadProjects() {
+  const read = ++projectRead;
+  byId('projects-loading').hidden = false;
+  byId('reload-projects').setAttribute('aria-disabled', 'true');
+  message('projects-error');
+  try {
+    const records = await api('/api/projects');
+    if (read !== projectRead) return;
+    projects = records;
+    projectsLoaded = true;
+    projectsFailed = false;
+    renderProjects();
+  } catch (error) {
+    if (read === projectRead) {
+      projectsFailed = true;
+      message('projects-error', `${error.message}${projectsLoaded ? ' L’elenco mostrato potrebbe non essere aggiornato.' : ''}`);
+      showAvailability();
+    }
+  } finally {
+    if (read === projectRead) {
+      byId('projects-loading').hidden = true;
+      byId('reload-projects').disabled = false;
+      byId('reload-projects').removeAttribute('aria-disabled');
+    }
+  }
+}
+
+async function loadTasks() {
+  const read = ++taskRead;
+  tasksLoading = true;
+  byId('task-list').setAttribute('aria-busy', 'true');
+  byId('tasks-loading').hidden = false;
+  byId('reload-tasks').setAttribute('aria-disabled', 'true');
+  message('tasks-error');
+  renderTasks();
+  try {
+    const query = new URLSearchParams();
+    if (projectFilter.value) query.set('projectId', projectFilter.value);
+    if (statusFilter.value) query.set('status', statusFilter.value);
+    if (searchFilter.value) query.set('q', searchFilter.value);
+    const records = await api(`/api/tasks${query.size ? `?${query}` : ''}`);
+    if (read !== taskRead) return;
+    tasks = records;
+    tasksLoaded = true;
+  } catch (error) {
+    if (read === taskRead) message('tasks-error', `${error.message}${tasksLoaded ? ' L’elenco mostrato potrebbe non essere aggiornato.' : ''}`);
+  } finally {
+    if (read === taskRead) {
+      tasksLoading = false;
+      byId('task-list').removeAttribute('aria-busy');
+      byId('tasks-loading').hidden = true;
+      byId('reload-tasks').disabled = false;
+      byId('reload-tasks').removeAttribute('aria-disabled');
+      renderTasks();
+    }
+  }
+}
+
+function formErrorId(form) {
+  if (form === projectEditForm) return 'project-edit-error';
+  if (form === taskEditForm) return 'task-edit-error';
+  return `${form === projectForm ? 'project' : 'task'}-form-error`;
+}
+
+function clearInvalid(form) {
+  for (const field of form.querySelectorAll('[aria-invalid]')) {
+    field.removeAttribute('aria-invalid');
+    const help = field.getAttribute('aria-describedby')?.split(' ').filter(id => id !== formErrorId(form));
+    if (help?.length) field.setAttribute('aria-describedby', help.join(' '));
+    else field.removeAttribute('aria-describedby');
+  }
+}
+
+function invalid(form, field, text) {
+  const errorId = formErrorId(form);
+  message(errorId, text);
+  field.setAttribute('aria-invalid', 'true');
+  field.setAttribute('aria-describedby', `${field.getAttribute('aria-describedby') ?? ''} ${errorId}`.trim());
+  field.focus();
+}
+
+function readTaskInput(prefix) {
+  return {
+    title: byId(`${prefix}-title`).value,
+    notes: byId(`${prefix}-notes`).value,
+    dueDate: byId(`${prefix}-due`).value || null,
+    estimateMinutes: byId(`${prefix}-estimate`).value === '' ? 0 : byId(`${prefix}-estimate`).valueAsNumber,
+  };
+}
+
+function validateTaskInput(form, prefix, input) {
+  // During conflict resolution only the fields explicitly chosen from the
+  // draft will be sent. An invalid value kept solely in the draft must not
+  // prevent choosing the valid current value instead.
+  if (Object.hasOwn(input, 'title') && (!input.title.trim() || [...input.title.trim()].length > 160)) {
+    invalid(form, byId(`${prefix}-title`), 'Inserisci un titolo da 1 a 160 caratteri, esclusi gli spazi ai bordi.');
+    return false;
+  }
+  if (Object.hasOwn(input, 'notes') && [...input.notes].length > 4000) {
+    invalid(form, byId(`${prefix}-notes`), 'Le note possono contenere al massimo 4000 caratteri.');
+    return false;
+  }
+  if (Object.hasOwn(input, 'dueDate') && !byId(`${prefix}-due`).validity.valid) {
+    invalid(form, byId(`${prefix}-due`), 'Inserisci una scadenza reale con anno da 0001 a 9999, oppure lascia il campo vuoto.');
+    return false;
+  }
+  if (Object.hasOwn(input, 'estimateMinutes') && (byId(`${prefix}-estimate`).validity.badInput || !Number.isInteger(input.estimateMinutes) || input.estimateMinutes < 0 || input.estimateMinutes > 10080)) {
+    invalid(form, byId(`${prefix}-estimate`), 'La stima deve essere un numero intero di minuti da 0 a 10080.');
+    return false;
+  }
+  return true;
+}
+
+function applySavedTask(task) {
+  ++taskRead; // Invalidate every list read that began before this write.
+  const exists = tasks.some(item => item.id === task.id);
+  tasks = (exists ? tasks.map(item => item.id === task.id ? task : item) : [...tasks, task])
+    .filter(item => !item.archived);
+  tasksLoaded = true;
+  renderTasks();
+}
+
+function openTaskEditor(task, action = 'edit') {
+  if (taskDialog.open) return;
+  // Neither a list refresh nor a save failure may replace this baseline or
+  // populate the live inputs again. projectId is context, never an edit field.
+  taskEditor = {
+    original: Object.freeze({ ...task }), action, current: null, conflict: false,
+    choices: {}, comparedDraft: null, pending: false, reading: false, origin: document.activeElement,
+  };
+  taskEditForm.reset();
+  clearInvalid(taskEditForm);
+  byId('task-edit-fields').disabled = false;
+  byId('task-dialog-heading').textContent = action === 'edit' ? 'Modifica attività' : 'Archivia attività';
+  byId('task-dialog-help').textContent = action === 'edit'
+    ? 'Modifica i dettagli e lo stato. Il progetto resta invariato. Annulla o Escape scartano la bozza non salvata.'
+    : 'Conferma l’archiviazione: l’attività scompare da tutti gli elenchi, ma resta salvata. La riattivazione delle singole attività è disponibile solo via API. Annulla lascia tutto invariato.';
+  const projectName = projects.find(item => item.id === task.projectId)?.name ?? 'Progetto non disponibile';
+  byId('task-edit-context').textContent = `${task.title}\nProgetto: ${projectName} · revisione ${task.revision}`;
+  byId('task-edit-details').hidden = action !== 'edit';
+  byId('task-edit-title').value = task.title;
+  byId('task-edit-notes').value = task.notes;
+  byId('task-edit-due').value = task.dueDate ?? '';
+  byId('task-edit-estimate').value = String(task.estimateMinutes);
+  byId('task-edit-state').value = task.status;
+  byId('task-edit-save').textContent = action === 'edit' ? 'Salva modifiche' : 'Archivia attività';
+  byId('task-edit-save').hidden = false;
+  byId('task-read-current').disabled = false;
+  byId('task-read-current').removeAttribute('aria-disabled');
+  byId('task-retry').disabled = true;
+  byId('task-conflict').hidden = true;
+  byId('task-conflict').removeAttribute('aria-busy');
+  byId('task-comparison').hidden = true;
+  byId('task-comparison-details').replaceChildren();
+  message('task-retry-help');
+  message('task-edit-error');
+  message('task-edit-status');
+  taskDialog.showModal();
+  byId(action === 'edit' ? 'task-edit-title' : 'task-edit-cancel').focus();
+}
+
+function readTaskDraft(editor) {
+  return editor.action === 'edit'
+    ? { ...readTaskInput('task-edit'), status: byId('task-edit-state').value, archived: editor.original.archived }
+    : { ...editor.original, archived: true };
+}
+
+function taskResolutionFields(editor, draft) {
+  return taskComparisonFields.filter(([field]) => !Object.is(draft[field], editor.original[field])
+    && !Object.is(draft[field], editor.current[field]));
+}
+
+function taskComparisonValue(field, value) {
+  if (field === 'status') return taskStates[value] ?? value;
+  if (field === 'archived') return value ? 'Archiviata' : 'Non archiviata';
+  if (field === 'estimateMinutes') return Number.isFinite(value) ? `${value} minuti` : 'Stima non valida: correggi il campo nel modulo.';
+  if (field === 'dueDate') {
+    if (!value) return 'Nessuna scadenza';
+    const [year, month, day] = value.split('-');
+    return `${day}/${month}/${year}`;
+  }
+  return value === '' ? '(campo vuoto)' : value;
+}
+
+function updateTaskRetry() {
+  const editor = taskEditor;
+  if (!editor?.current) return;
+  const fields = taskResolutionFields(editor, readTaskDraft(editor));
+  const missing = fields.filter(([field]) => !editor.choices[field]).length;
+  const selected = fields.filter(([field]) => editor.choices[field] === 'draft').length;
+  byId('task-retry').disabled = editor.pending || editor.reading || missing > 0 || selected === 0;
+  message('task-retry-help', missing
+    ? `Scegli quale valore usare per ${missing === 1 ? 'il campo rimanente' : `i ${missing} campi rimanenti`}.`
+    : selected
+      ? `Il salvataggio invierà solo ${selected === 1 ? 'il campo scelto' : `i ${selected} campi scelti`} dalla bozza, con la revisione ${editor.current.revision}. Gli altri valori correnti saranno conservati.`
+      : 'Nessuna modifica da inviare: la versione corrente sarà conservata. Puoi continuare a modificare la bozza o scegliere Annulla per chiudere senza salvarla.');
+}
+
+function renderTaskComparison() {
+  const editor = taskEditor;
+  if (!editor?.current) return;
+  const draft = readTaskDraft(editor);
+  const choicesNeeded = new Set(taskResolutionFields(editor, draft).map(([field]) => field));
+  const details = document.createDocumentFragment();
+  for (const [field, label] of taskComparisonFields) {
+    // A choice applies only to the exact draft value the person compared.
+    // Editing another field does not discard unaffected decisions.
+    if (!Object.is(editor.comparedDraft?.[field], draft[field]) || !choicesNeeded.has(field)) delete editor.choices[field];
+    const comparison = element('section', 'field-comparison');
+    const heading = element('h4', '', label);
+    heading.id = `task-compare-${field}`;
+    comparison.setAttribute('aria-labelledby', heading.id);
+    const values = element('dl', 'comparison-details');
+    for (const [version, record] of [['Versione aperta', editor.original], ['Versione corrente letta', editor.current], ['La tua bozza', draft]]) {
+      const pair = element('div');
+      pair.append(element('dt', '', version), element('dd', '', taskComparisonValue(field, record[field])));
+      values.append(pair);
+    }
+    comparison.append(heading, values);
+    if (choicesNeeded.has(field)) {
+      const choiceId = `task-resolve-${field}`;
+      const choiceLabel = element('label', '', `Quale valore usare per ${label}?`);
+      choiceLabel.htmlFor = choiceId;
+      const choice = element('select');
+      choice.id = choiceId;
+      choice.append(new Option('Scegli un valore…', ''), new Option('Mantieni versione corrente', 'current'), new Option('Applica la mia bozza', 'draft'));
+      choice.value = editor.choices[field] ?? '';
+      choice.addEventListener('change', () => {
+        if (taskEditor !== editor || editor.pending || editor.reading) return;
+        editor.choices[field] = choice.value;
+        updateTaskRetry();
+      });
+      comparison.append(choiceLabel, choice);
+    } else {
+      comparison.append(element('p', 'field-help', Object.is(draft[field], editor.current[field])
+        ? 'La bozza coincide con la versione corrente: nessuna modifica da inviare.'
+        : 'Non hai modificato questo campo: sarà mantenuto il valore corrente.'));
+    }
+    details.append(comparison);
+  }
+  editor.comparedDraft = { ...draft };
+  byId('task-comparison-context').textContent = `Versione aperta: revisione ${editor.original.revision}. Versione corrente letta: revisione ${editor.current.revision}. La revisione iniziale della bozza resta invariata.`;
+  byId('task-comparison-details').replaceChildren(details);
+  byId('task-retry').textContent = `${editor.action === 'edit' ? 'Applica le modifiche scelte' : 'Archivia'} alla revisione ${editor.current.revision}`;
+  byId('task-comparison').hidden = false;
+  updateTaskRetry();
+}
+
+async function readCurrentTask() {
+  const editor = taskEditor;
+  if (!editor?.conflict || editor.pending || editor.reading) return;
+  editor.reading = true;
+  editor.current = null;
+  editor.choices = {};
+  editor.comparedDraft = null;
+  byId('task-comparison').hidden = true;
+  byId('task-read-current').setAttribute('aria-disabled', 'true');
+  const origin = document.activeElement;
+  byId('task-conflict').setAttribute('aria-busy', 'true');
+  message('task-edit-status', 'Lettura della versione corrente…');
+  message('task-edit-error');
+  try {
+    // Ignore list filters and include the original project even if archived.
+    // The public API excludes archived tasks: if absent, never guess a revision.
+    const query = new URLSearchParams({ projectId: editor.original.projectId });
+    const records = await api(`/api/tasks?${query}`);
+    if (taskEditor !== editor || !taskDialog.open) return;
+    const current = records.find(task => task.id === editor.original.id);
+    if (!current) {
+      message('task-edit-error', 'L’attività non è più consultabile: potrebbe essere stata archiviata in un’altra scheda. La versione corrente non è disponibile per il confronto. Tutti gli input restano nella bozza; puoi copiarli prima di annullare. Nessuna modifica sarà inviata senza una versione corrente da confrontare.');
+      return;
+    }
+    // Reading a newer record never rebases the draft or rewrites its inputs.
+    editor.current = Object.freeze({ ...current });
+    renderTaskComparison();
+    message('task-edit-status', 'Versione corrente letta. Confronta i campi e scegli esplicitamente le modifiche da applicare.');
+  } catch (error) {
+    if (taskEditor === editor && taskDialog.open) message('task-edit-error', `${error.message} La bozza è conservata.`);
+  } finally {
+    editor.reading = false;
+    if (taskEditor === editor && taskDialog.open) {
+      byId('task-read-current').removeAttribute('aria-disabled');
+      byId('task-conflict').removeAttribute('aria-busy');
+      if (!editor.current) message('task-edit-status');
+      else updateTaskRetry();
+      if (document.activeElement === origin) focusDialogError('task');
+    }
+  }
+}
+
+async function saveTask(useCurrent = false) {
+  const editor = taskEditor;
+  if (!editor || editor.pending || editor.reading || (editor.conflict && !useCurrent)) return;
+  const base = useCurrent ? editor.current : editor.original;
+  if (!base) return;
+  clearInvalid(taskEditForm);
+  message('task-edit-error');
+  message('task-edit-status');
+  const draft = readTaskDraft(editor);
+  const input = { revision: base.revision };
+  if (useCurrent) {
+    const fields = taskResolutionFields(editor, draft);
+    // Recheck choices at the point of sending, including their draft values.
+    if (fields.some(([field]) => !editor.choices[field] || !Object.is(editor.comparedDraft?.[field], draft[field]))) {
+      renderTaskComparison();
+      message('task-edit-error', 'Scegli quale valore usare per ogni campo modificato prima di salvare.');
+      return;
+    }
+    for (const [field] of fields) {
+      if (editor.choices[field] === 'draft') input[field] = draft[field];
+    }
+    if (Object.keys(input).length === 1) {
+      updateTaskRetry();
+      return;
+    }
+  } else {
+    for (const [field] of taskComparisonFields) {
+      if (!Object.is(draft[field], editor.original[field])) input[field] = draft[field];
+    }
+  }
+  if (editor.action === 'edit') {
+    if (!validateTaskInput(taskEditForm, 'task-edit', useCurrent ? input : draft)) return;
+    if ((!useCurrent || Object.hasOwn(input, 'status')) && !Object.hasOwn(taskStates, draft.status)) {
+      invalid(taskEditForm, byId('task-edit-state'), 'Scegli uno stato: Da fare, In corso oppure Completata.');
+      return;
+    }
+  }
+  editor.pending = true;
+  taskEditForm.setAttribute('aria-busy', 'true');
+  message('task-edit-status', 'Salvataggio dell’attività…');
+  byId('task-edit-status').focus({ preventScroll: true });
+  byId('task-edit-fields').disabled = true;
+  try {
+    const task = await api(`/api/tasks/${encodeURIComponent(base.id)}`, input, 'PATCH');
+    applySavedTask(task);
+    message('task-updates-status', editor.action === 'edit'
+      ? `Modifiche a «${task.title}» salvate. Se non appare nell’elenco, controlla i filtri selezionati.`
+      : `Attività «${task.title}» archiviata. I dati restano salvati.`);
+    editor.pending = false;
+    taskDialog.close();
+    void loadTasks();
+  } catch (error) {
+    message('task-edit-status');
+    if (error.status === 409 && error.code !== 'REVISION_LIMIT') {
+      editor.conflict = true;
+      editor.current = null;
+      editor.choices = {};
+      editor.comparedDraft = null;
+      byId('task-conflict').hidden = false;
+      byId('task-comparison').hidden = true;
+      byId('task-edit-save').hidden = true;
+      message('task-edit-error', 'L’attività è stata modificata in un’altra scheda. La tua modifica non è stata salvata; tutti gli input e la revisione iniziale sono conservati. Leggi la versione corrente e scegli quali modifiche applicare prima di salvare di nuovo.');
+      void loadTasks();
+    } else {
+      message('task-edit-error', error.message);
+    }
+    if (error.code === 'TASK_NOT_FOUND') void loadTasks();
+  } finally {
+    editor.pending = false;
+    byId('task-edit-fields').disabled = false;
+    taskEditForm.removeAttribute('aria-busy');
+    if (taskEditor === editor && taskDialog.open) {
+      if (editor.current) updateTaskRetry();
+      focusDialogError('task');
+    }
+  }
+}
+
+taskEditForm.addEventListener('submit', event => {
+  event.preventDefault();
+  void saveTask();
+});
+byId('task-read-current').addEventListener('click', () => { void readCurrentTask(); });
+byId('task-retry').addEventListener('click', () => { void saveTask(true); });
+byId('task-edit-details').addEventListener('input', renderTaskComparison);
+byId('task-edit-details').addEventListener('change', renderTaskComparison);
+byId('task-edit-cancel').addEventListener('click', () => { if (!taskEditor?.pending) taskDialog.close(); });
+taskDialog.addEventListener('cancel', event => {
+  if (taskEditor?.pending) {
+    event.preventDefault();
+    message('task-edit-status', 'Salvataggio in corso. Attendi la risposta prima di chiudere; la bozza resta conservata in caso di errore.');
+    byId('task-edit-status').focus();
+  }
+});
+taskDialog.addEventListener('close', () => {
+  if (taskDialog.open) return;
+  const editor = taskEditor;
+  taskEditor = null;
+  if (!editor) return;
+  const buttons = [...byId('task-list').querySelectorAll('[data-task-action]')];
+  const target = editor.origin?.isConnected ? editor.origin
+    : buttons.find(button => button.dataset.taskId === editor.original.id && button.dataset.taskAction === editor.action)
+      ?? byId('attivita-heading');
+  target.focus();
+});
+
+function openProjectEditor(project, action) {
+  if (projectDialog.open) return;
+  // The revision belongs to the record read when opening, never to a later
+  // background refresh. The actual draft stays in the input until success.
+  projectEditor = { original: Object.freeze({ ...project }), action, current: null, conflict: false, pending: false, reading: false, origin: document.activeElement };
+  projectEditForm.reset();
+  clearInvalid(projectEditForm);
+  byId('project-edit-fields').disabled = false;
+  byId('project-dialog-heading').textContent = { rename: 'Rinomina progetto', archive: 'Archivia progetto', restore: 'Riattiva progetto' }[action];
+  byId('project-dialog-help').textContent = {
+    rename: 'Il nuovo nome apparirà anche sulle attività e nei selettori. Le attività restano nello stesso progetto.',
+    archive: 'Il progetto e le sue attività restano salvati. Le attività scompaiono dalla vista generale; puoi consultarle con il filtro progetto. La bozza attività resta compilata, ma non potrà essere salvata qui finché il progetto è archiviato.',
+    restore: 'Il progetto torna attivo: potrai aggiungere attività e quelle già presenti torneranno nella vista generale.',
+  }[action];
+  byId('project-edit-context').textContent = `${project.name} · ${project.archived ? 'Archiviato' : 'Attivo'} · revisione ${project.revision}`;
+  byId('project-edit-name-field').hidden = action !== 'rename';
+  byId('project-edit-name').disabled = action !== 'rename';
+  byId('project-edit-name').value = project.name;
+  byId('project-edit-save').textContent = { rename: 'Salva nome', archive: 'Archivia progetto', restore: 'Riattiva progetto' }[action];
+  byId('project-edit-save').hidden = false;
+  byId('project-edit-cancel').textContent = 'Annulla';
+  byId('project-read-current').disabled = false;
+  byId('project-read-current').removeAttribute('aria-disabled');
+  byId('project-conflict').hidden = true;
+  byId('project-comparison').hidden = true;
+  message('project-edit-error');
+  message('project-edit-status');
+  projectDialog.showModal();
+  byId(action === 'rename' ? 'project-edit-name' : 'project-edit-cancel').focus();
+}
+
+function renderProjectComparison() {
+  const editor = projectEditor;
+  if (!editor?.current) return;
+  const details = document.createDocumentFragment();
+  for (const [label, project] of [['Versione aperta', editor.original], ['Versione corrente letta', editor.current]]) {
+    const pair = element('div');
+    pair.append(element('dt', '', `${label} · revisione ${project.revision}`),
+      element('dd', '', `${project.name}\n${project.archived ? 'Archiviato' : 'Attivo'}`));
+    details.append(pair);
+  }
+  const draft = element('div');
+  draft.append(element('dt', '', 'La tua modifica'), element('dd', '', editor.action === 'rename'
+    ? byId('project-edit-name').value
+    : editor.action === 'archive' ? 'Archivia il progetto' : 'Riattiva il progetto'));
+  details.append(draft);
+  byId('project-comparison-details').replaceChildren(details);
+  byId('project-retry-help').textContent = editor.action === 'rename'
+    ? 'Conferma esplicitamente la tua rinomina sulla versione corrente letta. Lo stato attivo o archiviato di quella versione sarà conservato. Puoi ancora correggere il nome qui sopra.'
+    : 'Conferma esplicitamente l’operazione sulla versione corrente letta. Il nome di quella versione sarà conservato.';
+  byId('project-retry').textContent = `${{ rename: 'Applica la rinomina', archive: 'Archivia', restore: 'Riattiva' }[editor.action]} alla revisione ${editor.current.revision}`;
+  byId('project-comparison').hidden = false;
+}
+
+async function readCurrentProject() {
+  const editor = projectEditor;
+  if (!editor || editor.pending || editor.reading) return;
+  editor.reading = true;
+  editor.current = null;
+  byId('project-comparison').hidden = true;
+  byId('project-read-current').setAttribute('aria-disabled', 'true');
+  const origin = document.activeElement;
+  message('project-edit-status', 'Lettura della versione corrente…');
+  message('project-edit-error');
+  try {
+    const records = await api('/api/projects');
+    if (projectEditor !== editor) return;
+    const current = records.find(project => project.id === editor.original.id);
+    if (!current) {
+      message('project-edit-error', 'Il progetto non è più disponibile. La bozza resta aperta; puoi copiarne il nome prima di chiudere.');
+      return;
+    }
+    // This snapshot is only used by the explicit retry button. It never
+    // changes the original revision or any live form value.
+    editor.current = Object.freeze({ ...current });
+    renderProjectComparison();
+    message('project-edit-status', 'Versione corrente letta. Confronta i dati e scegli se applicare la tua modifica.');
+  } catch (error) {
+    if (projectEditor === editor) message('project-edit-error', error.message);
+  } finally {
+    editor.reading = false;
+    if (projectEditor === editor) {
+      byId('project-read-current').removeAttribute('aria-disabled');
+      if (!editor.current) message('project-edit-status');
+      if (document.activeElement === origin) focusDialogError('project');
+    }
+  }
+}
+
+async function saveProject(useCurrent = false) {
+  const editor = projectEditor;
+  if (!editor || editor.pending || editor.reading || (editor.conflict && !useCurrent)) return;
+  const base = useCurrent ? editor.current : editor.original;
+  if (!base) return;
+  clearInvalid(projectEditForm);
+  message('project-edit-error');
+  message('project-edit-status');
+  const input = { revision: base.revision };
+  if (editor.action === 'rename') {
+    input.name = byId('project-edit-name').value;
+    if (!input.name.trim() || [...input.name.trim()].length > 100) {
+      invalid(projectEditForm, byId('project-edit-name'), 'Inserisci un nome da 1 a 100 caratteri, esclusi gli spazi ai bordi.');
+      return;
+    }
+  } else input.archived = editor.action === 'archive';
+  editor.pending = true;
+  projectEditForm.setAttribute('aria-busy', 'true');
+  message('project-edit-status', 'Salvataggio della modifica…');
+  byId('project-edit-status').focus({ preventScroll: true });
+  byId('project-edit-fields').disabled = true;
+  try {
+    const project = await api(`/api/projects/${encodeURIComponent(base.id)}`, input, 'PATCH');
+    ++projectRead;
+    projects = projects.map(item => item.id === project.id ? project : item);
+    projectsLoaded = true;
+    projectsFailed = false;
+    renderProjects();
+    message('project-updates-status', `${{ rename: 'Nome aggiornato', archive: 'Progetto archiviato', restore: 'Progetto riattivato' }[editor.action]}: «${project.name}».`);
+    editor.pending = false;
+    projectDialog.close();
+    void loadProjects();
+    void loadTasks();
+  } catch (error) {
+    message('project-edit-status');
+    if (error.code === 'REVISION_CONFLICT') {
+      editor.conflict = true;
+      editor.current = null;
+      byId('project-conflict').hidden = false;
+      byId('project-comparison').hidden = true;
+      byId('project-edit-save').hidden = true;
+      message('project-edit-error', 'Il progetto è stato modificato in un’altra scheda. La tua modifica non è stata salvata e gli input sono conservati. Leggi la versione corrente e confrontala prima di confermare di nuovo.');
+      void loadProjects();
+      void loadTasks();
+    } else {
+      message('project-edit-error', error.message);
+    }
+    if (error.code === 'PROJECT_NOT_FOUND') void loadProjects();
+  } finally {
+    editor.pending = false;
+    byId('project-edit-fields').disabled = false;
+    projectEditForm.removeAttribute('aria-busy');
+    if (projectEditor === editor && projectDialog.open) {
+      focusDialogError('project');
+    }
+  }
+}
+
+projectEditForm.addEventListener('submit', event => {
+  event.preventDefault();
+  void saveProject();
+});
+byId('project-read-current').addEventListener('click', () => { void readCurrentProject(); });
+byId('project-retry').addEventListener('click', () => { void saveProject(true); });
+byId('project-edit-name').addEventListener('input', renderProjectComparison);
+byId('project-edit-cancel').addEventListener('click', () => { if (!projectEditor?.pending) projectDialog.close(); });
+projectDialog.addEventListener('cancel', event => {
+  if (projectEditor?.pending) {
+    event.preventDefault();
+    message('project-edit-status', 'Salvataggio in corso. Attendi la risposta prima di chiudere; la bozza resta conservata in caso di errore.');
+    byId('project-edit-status').focus();
+  }
+});
+projectDialog.addEventListener('close', () => {
+  if (projectDialog.open) return;
+  const editor = projectEditor;
+  projectEditor = null;
+  if (!editor) return;
+  const buttons = [...document.querySelectorAll('[data-project-action]')];
+  const focusTarget = editor.origin?.isConnected ? editor.origin
+    : buttons.find(button => button.dataset.projectId === editor.original.id && button.dataset.projectAction === editor.action)
+      ?? buttons.find(button => button.dataset.projectId === editor.original.id)
+      ?? byId('progetti-heading');
+  focusTarget.focus();
+});
+
+projectForm.addEventListener('submit', async event => {
+  event.preventDefault();
+  if (creatingProject) return;
+  message('project-form-error');
+  message('project-form-status');
+  clearInvalid(projectForm);
+  const name = byId('project-name').value;
+  if (!name.trim() || [...name.trim()].length > 100) {
+    invalid(projectForm, byId('project-name'), 'Inserisci un nome da 1 a 100 caratteri, esclusi gli spazi ai bordi.');
+    return;
+  }
+  creatingProject = true;
+  projectForm.setAttribute('aria-busy', 'true');
+  message('project-form-status', 'Salvataggio del progetto…');
+  const progress = byId('project-form-status');
+  if (projectForm.contains(document.activeElement)) progress.focus({ preventScroll: true });
+  byId('project-fields').disabled = true;
+  try {
+    const project = await api('/api/projects', { name });
+    ++projectRead; // A read started before the save must not hide its result.
+    projects = [...projects.filter(item => item.id !== project.id), project];
+    projectsLoaded = true;
+    renderProjects();
+    if (!projectSelect.value) {
+      projectSelect.value = project.id;
+      showAvailability();
+    }
+    projectForm.reset();
+    message('project-form-status', `Progetto «${project.name}» creato. Puoi aggiungere la prima attività.`);
+    void loadProjects();
+  } catch (error) {
+    const ownsFocus = document.activeElement === progress;
+    message('project-form-status');
+    message('project-form-error', error.message);
+    if (ownsFocus) byId('project-form-error').focus();
+  } finally {
+    creatingProject = false;
+    byId('project-fields').disabled = false;
+    projectForm.removeAttribute('aria-busy');
+    if (document.activeElement === progress && !progress.hidden) byId('project-name').focus({ preventScroll: true });
+  }
+});
+
+taskForm.addEventListener('submit', async event => {
+  event.preventDefault();
+  if (creatingTask) return;
+  message('task-form-error');
+  message('task-form-status');
+  clearInvalid(taskForm);
+  const input = { projectId: projectSelect.value, ...readTaskInput('task') };
+  if (!projectsLoaded || !projects.some(item => item.id === input.projectId && !item.archived)) {
+    invalid(taskForm, projectSelect, 'Scegli un progetto attivo. Se manca, crealo o aggiorna l’elenco in Progetti. Gli altri input sono conservati.');
+    return;
+  }
+  if (!validateTaskInput(taskForm, 'task', input)) return;
+  creatingTask = true;
+  taskForm.setAttribute('aria-busy', 'true');
+  message('task-form-status', 'Salvataggio dell’attività…');
+  const progress = byId('task-form-status');
+  if (taskForm.contains(document.activeElement)) progress.focus({ preventScroll: true });
+  byId('task-fields').disabled = true;
+  try {
+    const task = await api('/api/tasks', input);
+    applySavedTask(task);
+    taskForm.reset();
+    projectSelect.value = input.projectId;
+    showAvailability();
+    message('task-form-status', `Attività «${task.title}» creata e salvata.`);
+    void loadTasks();
+  } catch (error) {
+    const ownsFocus = document.activeElement === progress;
+    message('task-form-status');
+    message('task-form-error', error.message);
+    if (ownsFocus) byId('task-form-error').focus();
+    if (error.code === 'PROJECT_ARCHIVED' || error.code === 'PROJECT_NOT_FOUND') void loadProjects();
+  } finally {
+    creatingTask = false;
+    byId('task-fields').disabled = false;
+    taskForm.removeAttribute('aria-busy');
+    if (document.activeElement === progress && !progress.hidden) byId('task-title').focus({ preventScroll: true });
+  }
+});
+
+for (const button of document.querySelectorAll('nav [data-page]')) {
+  button.addEventListener('click', () => navigate(button.dataset.page));
+}
+byId('go-to-projects').addEventListener('click', () => navigate('progetti'));
+projectSelect.addEventListener('change', showAvailability);
+function changeTaskFilters() {
+  // Clearing the old result immediately avoids presenting results for a
+  // previous query as the new one. loadTasks owns a monotonically newer read.
+  tasks = [];
+  tasksLoaded = false;
+  renderProjectFilter();
+  void loadTasks();
+}
+projectFilter.addEventListener('change', changeTaskFilters);
+statusFilter.addEventListener('change', changeTaskFilters);
+searchFilter.addEventListener('input', changeTaskFilters);
+byId('reset-task-filters').addEventListener('click', () => {
+  projectFilter.value = '';
+  statusFilter.value = '';
+  searchFilter.value = '';
+  changeTaskFilters();
+});
+byId('reload-projects').addEventListener('click', () => {
+  if (byId('reload-projects').getAttribute('aria-disabled') === 'true') return;
+  void loadProjects(); void loadTasks();
+});
+byId('reload-tasks').addEventListener('click', () => {
+  if (byId('reload-tasks').getAttribute('aria-disabled') === 'true') return;
+  void loadTasks(); void loadProjects();
+});
+// A returning tab refreshes saved records, never an editor's baseline or draft.
+let returnRefresh;
+function refreshOnReturn() {
+  if (document.hidden) return;
+  clearTimeout(returnRefresh);
+  returnRefresh = setTimeout(() => { void loadProjects(); void loadTasks(); }, 100);
+}
+window.addEventListener('focus', refreshOnReturn);
+document.addEventListener('visibilitychange', refreshOnReturn);
+byId('project-fields').disabled = false;
+byId('task-fields').disabled = false;
+void loadProjects();
+void loadTasks();
+
diff --git a/src/public.mjs b/src/public.mjs
new file
--- /dev/null
+++ b/src/public.mjs
+import { readFile } from 'node:fs/promises';
+import { sendJSON } from './errors.mjs';
+
+// Deliberately serve only these bundled files. Never turn a request path into a
+// filesystem path, and never fall back to the application for unknown URLs.
+const assets = new Map([
+  ['/', ['index.html', 'text/html; charset=utf-8']],
+  ['/assets/svolta.css', ['svolta.css', 'text/css; charset=utf-8']],
+  ['/assets/svolta.js', ['svolta.js', 'text/javascript; charset=utf-8']],
+]);
+
+export async function servePublic(request, response, path) {
+  const asset = assets.get(path);
+  if (!asset) return false;
+  if (request.method !== 'GET' && request.method !== 'HEAD') {
+    sendJSON(response, 405, {
+      error: 'Metodo non disponibile per questo indirizzo.',
+      code: 'METHOD_NOT_ALLOWED',
+    }, { allow: 'GET, HEAD' });
+    return true;
+  }
+  const [filename, contentType] = asset;
+  const body = await readFile(new URL(`../public/${filename}`, import.meta.url));
+  response.writeHead(200, {
+    'content-type': contentType,
+    'content-length': body.length,
+    'cache-control': 'no-store',
+    'x-content-type-options': 'nosniff',
+    'referrer-policy': 'no-referrer',
+    'x-frame-options': 'DENY',
+    'content-security-policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
+  });
+  response.end(request.method === 'HEAD' ? undefined : body);
+  return true;
+}
+
```
