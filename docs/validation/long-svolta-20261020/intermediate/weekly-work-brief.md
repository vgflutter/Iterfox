# Morning Brief — STOPPED

**Provider: real Codex SDK.**

Original goal: Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione. Continuazione dichiarata della prova originale bloccata per un difetto del runtime: il candidato già prodotto non è un checkpoint certificato. Conservare interfaccia, comportamento e scelte già implementati; completare soltanto le lacune concrete e i rimanenti esiti, senza ridisegnare da capo. Le prove precedenti sono contesto storico, non certificazione di questa nuova missione.

Current delegated outcome: Dalla lista al piano settimanale e al tempo reale
Aggiungere pianificazione settimanale, sessioni di tempo con cronologia, riepilogo coerente e relativi flussi browser, preservando attività e conflitti. Gestire date civili senza spostamenti da fuso orario. Backup rimane il prossimo esito.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

Current contract: v1 — Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione. Continuazione dichiarata della prova originale bloccata per un difetto del runtime: il candidato già prodotto non è un checkpoint certificato. Conservare interfaccia, comportamento e scelte già implementati; completare soltanto le lacune concrete e i rimanenti esiti, senza ridisegnare da capo. Le prove precedenti sono contesto storico, non certificazione di questa nuova missione.

Current delegated outcome: Dalla lista al piano settimanale e al tempo reale
Aggiungere pianificazione settimanale, sessioni di tempo con cronologia, riepilogo coerente e relativi flussi browser, preservando attività e conflitti. Gestire date civili senza spostamenti da fuso orario. Backup rimane il prossimo esito.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

3/5 criteria deterministically verified; 0 AI-assessed. 2 still open.

- [x] Archivio progetti persistente e revisioni — PASSED ([evidence](#evidence-402dc1c0-fdaa-469c-93c0-bc6e2e65c05d))
- [x] Attività, filtri e conflitti senza perdita di dati — PASSED ([evidence](#evidence-c61de25d-24e9-4ad2-9f7f-a0f8917872bd))
- [x] Interfaccia progetti e attività su desktop e mobile — PASSED ([evidence](#evidence-c8a96f99-266e-4e71-a378-472dab292b26))
- [ ] Settimana civile, sessioni e riepilogo coerente — UNVERIFIED ([evidence](#evidence-2491f697-733c-4cbb-8ccb-2bf4f12a9bb5))
- [ ] Pianificazione e tempo dal browser — UNVERIFIED ([evidence](#evidence-3a8357ef-fdf3-4496-9648-e3f9cea2d999))

## Project direction

Focus (plan): Completare l’esito weekly-work aggiungendo settimana civile, sessioni persistenti, cronologia e riepilogo alle funzioni esistenti. Conservare interfaccia, attività, filtri, bozze e conflitti. Backup e ripristino restano all’esito successivo. Tutti i cinque criteri risultano attualmente PENDING.
Next artifact (target, not proof): Una sezione Settimana collegata a GET /api/week, con sette giorni civili, attività senza scadenza e riprogrammazione tramite l’editor esistente, utilizzabile anche a 390px.
Direction v1; contract v1; planning, not runtime acceptance.

- request: Delegation ba19c3c0-677b-4354-9729-fd66916ed929; approval e06241642dba9398c08e90b66e7b898b29572b004ce0087d8b4ea0a9c506df0c; outcome weekly-work.
Previous checkpoint f765280cde7671df2ede74245b56dcb3e3b5496b. Historical evidence is context only; this new mission must obtain fresh proof.
Source run 20261020T220700-5ec53331, sequence 81.
Unverified implementation claims:
Aggiornati README.md, docs/guida.md e docs/verifiche.md con riferimento al candidato 8fbf6801cdda04de5f9153c737902289d355e59f. Separate evidenze API storiche e audit UI dalla certificazione corrente: tutti e tre i criteri restano IN ATTESA, senza nuove ricevute. Conservati i limiti delle bozze e delle funzioni indisponibili. Controllati 13 collegamenti locali e il diff; nessuna modifica funzionale o suite API/browser eseguita.
Aggiornati README.md, docs/guida.md e docs/verifiche.md con comandi, ID, PASS, copertura 6/6/4 e metadati delle ricevute correnti. Distinti storico e limiti residui, senza attribuire nuove revisioni verificate. Nessuna modifica funzionale. Controllati ricevute, collegamenti e diff; nessuna suite rieseguita.
Aggiornati README.md, docs/guida.md e docs/verifiche.md come fotografia alla redazione: registrate le ricevute 012fb1ac…, 244ba0db… e 79628235… con comandi e copertura 6/6/4; separate le precedenti stale, senza trasferire date o stamp. Conservati istruzioni, limiti e storico. Nessuna modifica funzionale. Controllati 13 collegamenti e ancore e il diff; suite non rieseguite localmente.
  - Recorded instruction: 411682d9-e96a-47d0-b73d-09e1a33a183f; 2026-10-20T22:20:34.450Z.
  - Disposition (planning, not runtime acceptance): applied: Incorporata la continuità del candidato e delle scelte esistenti. Le dichiarazioni documentali e i PASS 6/6/4 del run sorgente restano contesto storico: non certificano questo esito, per il quale non sono fornite prove correnti. Il piano interviene sulle lacune riscontrate nei sorgenti e aggiorna la guida senza attribuire verifiche non osservate..
  - Reconciliation: direction v1; contract v1; node 719ce746-27af-40d0-9697-3fb5a20ab54e; planning only.
- Provisional assumption: L’archivio JSON atomico dovrebbe poter accogliere timeEntries mantenendo leggibili gli archivi precedenti tramite integrazione in memoria dei campi mancanti.
- Provisional assumption: Si assume provvisoriamente che i minuti delle sessioni conservate continuino a contribuire al riepilogo settimanale anche dopo l’archiviazione dell’attività o del progetto.

## What changed

### Autonomous project development

0 project checkpoints; 0 implementation units discovered without a new operator prompt.
Project reviews are AI judgments from the same integration, separate from runtime acceptance evidence.


No corrective tasks recorded.
- 6 preliminary command observations were not yet satisfied while implementation remained; these did not consume corrective retries.

## Problems and decisions

- Event 9: Project direction updated. Unstarted work replaced; independent work can continue while operator questions wait.
- Event 24: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.
- Event 25: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.
- Event 26: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.
- Event 28: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 44: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.
- Event 45: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.
- Event 46: Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.
- Event 48: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.

## What needs attention

- Operator requested stop. Operator requested stop

## Resources and worktree

763 seconds elapsed; 4 agent turns; 1025430 reported tokens. Cost not measured. Interrupted-turn usage may be unavailable.

Repository: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/source
Branch: iterfox/20261020T222034-5d68bce5
Worktree: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5

## Evidence

<a id="evidence-e1ad0c37-19cb-4f63-a9d6-a88bac7af2d1"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1482ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-ca94df04-723a-4a93-9ee0-fb32f895677e"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1521ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-a64369e4-7b3e-4afb-b96a-19c9d79915b0"></a>
### board-ui — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 0; duration: 3786ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/dates.mjs, src/week.mjs. Scope: all repository files.

```text
PASS create a project and task through the actual interface
PASS edit, filter and preserve the changed activity after reopening
PASS concurrent interface edits cannot silently overwrite another tab
PASS literal hostile text and mobile layout
{"criterion":"board-ui","result":"PASS","groups":4}

```

<a id="evidence-bc87c720-080c-4409-98cb-ea3896fea6b0"></a>
### planning-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-api"]
Exit: 1; duration: 492ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: GET /api/week?start=2026-10-19: {"error":"Indirizzo non trovato.","code":"NOT_FOUND"}

404 !== 200

    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:34:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:36:82
    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)
    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:36:5)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 404,
  expected: 200,
  operator: 'strictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-ebcfc4a4-2d01-41e6-949f-da491ac64c19"></a>
### planning-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-ui"]
Exit: 1; duration: 31337ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: fdf4560566f456b5e8f9822309f40f6d4811f38c36d77e47642fd17325014a2d
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel(/^(?:Inizio settimana)(?:\s*\(obbligatorio\))?$/).visible()

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  log: [
    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()'
  ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-5bd95a14-21a8-4681-bec9-e5f822d643a1"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1391ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-0d8f19ed-0d99-488b-8959-094500cbbcaf"></a>
### planning-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-api"]
Exit: 1; duration: 336ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf
Scope: all repository files

```text
PASS civil seven-day plan and unscheduled work
PASS Monday and impossible-date rejection
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: POST /api/time-entries: {"error":"Indirizzo non trovato.","code":"NOT_FOUND"}

404 !== 201

    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:34:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:38:17)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 404,
  expected: 201,
  operator: 'strictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-4168430f-9a8d-467b-8a58-1a2c5805c1c9"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1346ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-8903fe29-4669-4e21-97cd-c120bcf7783f"></a>
### board-ui — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 0; duration: 3077ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf
Scope: all repository files

Evidence is STALE: README.md, docs/guida.md, docs/verifiche.md, src/app.mjs, src/archive.mjs, src/errors.mjs, src/summary.mjs, src/time-entries.mjs. Scope: all repository files.

```text
PASS create a project and task through the actual interface
PASS edit, filter and preserve the changed activity after reopening
PASS concurrent interface edits cannot silently overwrite another tab
PASS literal hostile text and mobile layout
{"criterion":"board-ui","result":"PASS","groups":4}

```

<a id="evidence-504680c9-8bed-47be-82fe-764d3ac6c95d"></a>
### planning-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-ui"]
Exit: 1; duration: 31037ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3207e548bf17ccd13894715b4353c54a82e315572d5e63a24baf4223f63c12bf
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel(/^(?:Inizio settimana)(?:\s*\(obbligatorio\))?$/).visible()

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  log: [
    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()'
  ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

<a id="evidence-402dc1c0-fdaa-469c-93c0-bc6e2e65c05d"></a>
### projects-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1341ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800
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

<a id="evidence-c61de25d-24e9-4ad2-9f7f-a0f8917872bd"></a>
### tasks-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1367ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800
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

<a id="evidence-2491f697-733c-4cbb-8ccb-2bf4f12a9bb5"></a>
### planning-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-api"]
Exit: 1; duration: 336ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800
Scope: all repository files

```text
PASS civil seven-day plan and unscheduled work
PASS Monday and impossible-date rejection
PASS time records preserve links and task status
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
+ actual - expected

  {
    doing: 1,
    done: 1,
    minutesThisWeek: 60,
+   overdue: 2,
-   overdue: 1,
    todo: 3
  }

    at file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:255
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:7:31)
    at async planning-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:40:5)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: { todo: 3, doing: 1, done: 1, overdue: 2, minutesThisWeek: 60 },
  expected: { todo: 3, doing: 1, done: 1, overdue: 1, minutesThisWeek: 60 },
  operator: 'deepStrictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-c8a96f99-266e-4e71-a378-472dab292b26"></a>
### board-ui — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","board-ui"]
Exit: 0; duration: 3074ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800
Scope: all repository files

```text
PASS create a project and task through the actual interface
PASS edit, filter and preserve the changed activity after reopening
PASS concurrent interface edits cannot silently overwrite another tab
PASS literal hostile text and mobile layout
{"criterion":"board-ui","result":"PASS","groups":4}

```

<a id="evidence-3a8357ef-fdf3-4496-9648-e3f9cea2d999"></a>
### planning-ui — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","planning-ui"]
Exit: 1; duration: 30995ms
Git: f765280cde7671df2ede74245b56dcb3e3b5496b; fingerprint: 3bd6d410d7cdf338af4dab1cc63696345da53f490db31b788be94b3125c8b800
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

locator.fill: Timeout 30000ms exceeded.
Call log:
  - waiting for getByLabel(/^(?:Inizio settimana)(?:\s*\(obbligatorio\))?$/).visible()

    at /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:569
    at async check (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:9:31)
    at async browserCheck (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/browser.mjs:23:4)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:120
    at async appTest (/Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020-r2/data/worktrees/20261020T222034-5d68bce5/tests/acceptance.mjs:56:1 {
  log: [
    '  - waiting for getByLabel(/^(?:Inizio settimana)(?:\\s*\\(obbligatorio\\))?$/).visible()'
  ],
  name: 'TimeoutError'
}

Node.js v22.21.1

```

## Agent assessments

- Implementate aritmetica civile indipendente dal fuso e GET /api/week: sette giorni ordinati, attività senza scadenza, completate distinguibili ed esclusione degli archivi. Date impossibili e inizi non lunedì restituiscono 400. Documentazione aggiornata. Controlli mirati locali passati; HTTP e browser non osservati. Sessioni e riepilogo restano ai task successivi. (agent claim; 0 linked runtime checks)
- Implementate sessioni persistenti POST/GET/DELETE con validazione, risposte 204/404, compatibilità degli archivi e storico dopo archiviazione e riavvio, senza modificare le revisioni delle attività. Aggiunto riepilogo con conteggi attivi e minuti settimanali inclusivi, indipendente dal fuso. Documentazione aggiornata. Controlli locali mirati superati; HTTP/browser e verifiche host non osservati. Interfaccia e backup restano delegati. (agent claim; 0 linked runtime checks)
- No summary (agent claim; 0 linked runtime checks)

## Limits

- Local execution pauses during sleep or shutdown.
- AI summaries and qualitative assessments are probabilistic claims from the same integration, not independent review.
- Only configured checks are covered; passing checks do not prove absence of defects.

## Worktree diff

```diff
diff --git a/README.md b/README.md
index 55fff0f..b4d4483 100644
--- a/README.md
+++ b/README.md
@@ -20,6 +20,10 @@ sotto e nel registro delle evidenze. È una fotografia delle evidenze alla
 redazione: il risultato registrato di un’esecuzione resta distinto dallo stato
 successivo della ricevuta nel runtime. Le prove precedenti restano contesto storico.
 
+Le ricevute descritte qui appartengono alla prova precedente e non certificano
+questa nuova missione. Alle API della settimana si aggiungono sessioni persistenti
+e riepilogo; non è ancora disponibile una ricevuta host per queste modifiche.
+
 ## Avvio
 
 Occorre Node.js **22.13 o successivo** e un browser moderno con JavaScript e
@@ -101,10 +105,12 @@ La cartella predefinita è `~/.local/share/svolta`, fuori dai sorgenti.
 cartella di avvio. Se cartella o `archive.json` non esistono, vengono creati con
 un archivio vuoto, senza dati dimostrativi. Cambiare cartella non trasferisce i dati.
 
-`archive.json` contiene il formato interno versione 1, progetti e attività,
-inclusi i record archiviati. Un archivio precedente con soli progetti viene
-letto aggiungendo un elenco attività vuoto in memoria, senza cambiare ID, nomi
-o revisioni; il file è aggiornato solo alla prima modifica salvata.
+`archive.json` contiene il formato interno versione 1, progetti, attività e
+`timeEntries`, inclusi i record archiviati e il loro tempo. Gli archivi precedenti
+con soli progetti o con progetti e attività vengono letti aggiungendo gli elenchi
+mancanti vuoti in memoria, senza cambiare ID, nomi o revisioni; il file è aggiornato
+solo alla prima modifica salvata. Campi presenti ma invalidi, sessioni duplicate
+o riferimenti incoerenti interrompono l’avvio conservando il file originale.
 
 Ogni scrittura prepara un file temporaneo nella stessa cartella, ne sincronizza
 i contenuti e sostituisce il principale con una rinomina atomica. Il successo
@@ -131,13 +137,14 @@ manualmente il file durante l’esecuzione.
 
 | Funzione | Stato attuale |
 | --- | --- |
-| Settimana | **Non ancora disponibile**: nessuna vista o pianificazione settimanale. |
-| Registrazione del tempo | Non disponibile: una stima non registra minuti dedicati né sessioni. |
-| Riepilogo | **Non ancora disponibile**: nessun conteggio o riepilogo del tempo. |
+| Settimana | API `GET /api/week` disponibile; vista nel browser **non ancora disponibile**. |
+| Registrazione del tempo | API di inserimento, cronologia ed eliminazione disponibili; comandi nel browser **non ancora disponibili**. |
+| Riepilogo | API disponibile con conteggi e minuti per progetto; vista nel browser **non ancora disponibile**. |
 | Backup | **Non ancora disponibile**: nessun download, importazione o ripristino portabile. |
 
-Queste funzioni non sono implementate nemmeno nelle API; i pulsanti **Settimana**,
-**Riepilogo** e **Backup** mostrano esplicitamente l’indisponibilità. Non ci sono
+Piano settimanale, sessioni e riepilogo sono disponibili nelle API; le rispettive
+viste e il backup restano da implementare. I pulsanti **Settimana**, **Riepilogo** e **Backup**
+mostrano esplicitamente l’indisponibilità delle rispettive viste. Non ci sono
 recupero automatico, migrazioni da altri formati o recupero persistente delle
 bozze. Il file interno `archive.json` non è il backup portabile previsto dal
 contratto: questa versione non offre una procedura di esportazione/ripristino.
@@ -145,7 +152,8 @@ Il percorso futuro progetti → settimana → tempo → backup si ferma alle att
 
 ## Uso delle API
 
-Le risposte sono JSON. Per inviare dati usare `Content-Type: application/json`.
+Le risposte sono JSON, salvo il 204 senza corpo dopo l’eliminazione di una sessione.
+Per inviare dati usare `Content-Type: application/json`.
 Il corpo di una richiesta può occupare al massimo 2 MiB. Gli ID negli esempi
 sono segnaposto da sostituire con quelli restituiti dal server.
 
@@ -237,12 +245,69 @@ curl -X PATCH -H 'Content-Type: application/json' \
   http://127.0.0.1:4386/api/tasks/ID_ATTIVITA
 ~~~
 
+### Settimana (API)
+
+`GET /api/week?start=2026-10-19` restituisce `{start,days,unscheduled}`:
+`days` contiene sette oggetti `{date,tasks}`, ordinati da lunedì a domenica,
+anche quando un giorno è vuoto. Le attività senza scadenza sono in `unscheduled`.
+Sono incluse solo attività non archiviate di progetti attivi; le completate
+restano presenti con `status: "done"`. Le attività con scadenza fuori dalla
+settimana sono escluse. In ogni elenco resta l’ordine di creazione e i record
+conservano tutti i campi, comprese le revisioni.
+
+`start` è obbligatorio e deve essere un lunedì reale nel formato `YYYY-MM-DD`.
+Valori mancanti, date impossibili e giorni diversi dal lunedì danno 400.
+Il calcolo usa il calendario gregoriano senza conversioni di fuso e gestisce
+cambi di mese, anno e bisestili. Tutti e sette i giorni devono rientrare negli
+anni 0001–9999: una settimana che supera questo intervallo dà 400.
+La lettura non modifica attività, revisioni o archivio. La vista **Settimana**
+nel browser resta da implementare.
+
+### Sessioni di tempo (API)
+
+| Richiesta | Corpo o filtri | Risultato |
+| --- | --- | --- |
+| `POST /api/time-entries` | `{"taskId":"<id>","date":"2026-10-21","minutes":25,"note":"Capitolo 1"}` | 201, sessione salvata con `id` e `projectId` assegnati dal server |
+| `GET /api/time-entries` | — | Tutte le sessioni in ordine di registrazione, anche di attività o progetti archiviati |
+| `GET /api/time-entries?taskId=<id>` | ID di un’attività esistente, anche archiviata | Solo le sessioni di quella attività |
+| `DELETE /api/time-entries/<id>` | Nessun corpo richiesto | 204 senza corpo, elimina solo la sessione indicata |
+
+La registrazione richiede un’attività e un progetto non archiviati; è ammessa anche
+per attività completate. `date` è una data civile reale `YYYY-MM-DD`, `minutes` è
+un numero intero da 1 a 1440 e `note` è testo letterale di massimo 2000 caratteri
+Unicode (default `""`). Le stringhe numeriche e i campi non previsti sono rifiutati.
+Un ID di attività o sessione sconosciuto dà 404. Registrare o eliminare una sessione
+non cambia stato, campi o revisione dell’attività. L’archiviazione conserva la
+cronologia e l’eliminazione resta possibile anche dopo l’archiviazione.
+
+### Riepilogo (API)
+
+`GET /api/summary?date=2026-10-21` restituisce `date`, `weekStart`, `weekEnd`,
+`totals` e `byProject`. La data è obbligatoria e segue le stesse regole civili
+della settimana, senza conversioni di fuso; nell’esempio l’intervallo incluso
+è `2026-10-19`–`2026-10-25`. Una data invalida o una settimana che oltrepassa
+gli anni 0001–9999 dà 400.
+
+`totals.todo`, `doing` e `done` contano tutte le attività non archiviate di progetti
+attivi, anche fuori settimana. `overdue` conta quelle non completate con scadenza
+anteriore alla data di riferimento, escludendo le attività senza scadenza.
+`minutesThisWeek` somma solo le sessioni dal lunedì alla domenica inclusi.
+
+La scelta attuale è conservare nel totale anche il tempo di attività e progetti
+archiviati: l’archiviazione non cancella il lavoro svolto. `byProject` include
+tutti i progetti nell’ordine di creazione, con `projectId`, nome corrente,
+`minutesThisWeek` e numero di attività attive `done`. Un progetto archiviato ha
+quindi `done: 0`, ma può avere minuti. Le somme di minuti e `done` per progetto
+coincidono con i rispettivi totali; eliminare una sessione aggiorna i minuti
+senza alterare i conteggi delle attività.
+Questa lettura non modifica l’archivio. La vista nel browser resta da implementare.
+
 ### Revisioni ed errori
 
 Per modificare, leggere prima la revisione corrente e inviarla nel PATCH.
 Ogni aggiornamento riuscito incrementa la revisione di uno, anche a valori
-invariati. Progetti e attività condividono una coda: confronto della revisione,
-controllo del progetto attivo alla creazione e salvataggio sono serializzati.
+invariati. Progetti, attività e sessioni condividono una coda: confronto della
+revisione, controlli dei riferimenti e dell’archiviazione e salvataggio sono serializzati.
 Due aggiornamenti concorrenti dello stesso record con la stessa revisione
 producono un successo e un 409, se il salvataggio riesce. Il client deve
 conservare i propri input su un conflitto, rileggere i dati e scegliere cosa
@@ -297,8 +362,15 @@ successivo occorre consultare il runtime: questa pagina non lo aggiorna in tempo
 reale e non certifica una nuova revisione o impronta dei documenti modificati.
 
 I PASS API della prova originale e l’audit UI separato rimangono nel registro
-come contesto. I controlli locali di questo task riguardano collegamenti e diff;
-non sono stati avviati server o browser né rieseguite suite. La copertura
+come contesto. Per l’API Settimana sono stati eseguiti controlli mirati delle date
+in quattro fusi e del gestore richieste in memoria, oltre a sintassi e diff;
+non sono stati avviati server o browser né eseguite suite complete. Questi
+controlli non dimostrano il funzionamento HTTP o una certificazione host.
+Per sessioni e riepilogo sono passati controlli locali mirati su archivio
+temporaneo e gestore in memoria: compatibilità dei file, validazione dei
+riferimenti, cronologia dopo riavvio, eliminazione, coda e salvataggio fallito,
+conteggi e confini settimanali in quattro fusi. Anche questi non sono ricevute
+host e non osservano il browser. La copertura
 registrata non si estende a ogni risoluzione dei conflitti per campo, al focus,
 all’intero layout o all’uso con lettori di schermo. Le funzioni successive
 restano indisponibili come descritto sopra.
diff --git a/docs/guida.md b/docs/guida.md
index 80b1a8f..d67afcd 100644
--- a/docs/guida.md
+++ b/docs/guida.md
@@ -169,8 +169,24 @@ Per errori di avvio vedere [Cartella dati e affidabilità](../README.md#cartella
 **Settimana**, **Riepilogo** e **Backup** mostrano «Non ancora disponibile».
 Il percorso futuro **progetti → settimana → tempo → backup** si ferma qui alle
 attività: una scadenza non genera una vista settimanale e una stima non registra
-sessioni. Mancano conteggi, riepiloghi, backup portabile e ripristino; il file
-interno non è quel backup. Non c’è recupero automatico dei dati o delle bozze.
+sessioni nel browser. Mancano le viste di conteggi e riepiloghi, backup portabile
+e ripristino; il file interno non è quel backup. Non c’è recupero automatico dei
+dati o delle bozze.
+
+La lettura della settimana è disponibile tramite
+[`GET /api/week`](../README.md#settimana-api): restituisce sette giorni da un
+lunedì e le attività senza scadenza, senza includere attività o progetti
+archiviati. Questa aggiunta non abilita ancora la vista nel browser.
+
+Sono disponibili anche le API per [registrare, consultare ed eliminare sessioni](../README.md#sessioni-di-tempo-api)
+e per il [riepilogo](../README.md#riepilogo-api). Le sessioni richiedono attività
+e progetti attivi, una data reale e da 1 a 1440 minuti; non cambiano lo stato o
+la revisione dell’attività. La cronologia rimane consultabile dopo archiviazione
+e riavvio. Nel riepilogo i conteggi riguardano solo le attività non archiviate di
+progetti attivi, mentre il tempo settimanale comprende anche lo storico archiviato.
+Eliminare una sessione toglie soltanto quei minuti. Sono funzioni API: il dialogo
+di registrazione, la cronologia e la vista Riepilogo non sono ancora nel browser.
+Gli archivi precedenti vengono letti con sessioni vuote senza riscrittura all’avvio.
 
 Il server ascolta solo sul dispositivo che lo esegue: il layout adattivo non
 permette di collegare il telefono al computer con lo stesso indirizzo locale.
@@ -178,5 +194,6 @@ Le evidenze API della prova originale, l’audit UI e le ricevute precedenti
 segnalate come `stale` alla redazione sono separati dalle nuove ricevute nel
 [registro delle evidenze](verifiche.md). I tre PASS riportati riguardano le
 rispettive esecuzioni, entro i 6/6/4 gruppi registrati; non attestano le funzioni
-successive né un collaudo completo di accessibilità. Questo task aggiorna solo
-la documentazione e non riesegue i controlli host.
+successive né un collaudo completo di accessibilità. Quelle ricevute restano
+storiche per questa nuova missione; gli interventi sulle API Settimana, sessioni
+e riepilogo hanno solo controlli locali mirati, senza nuove ricevute host.
diff --git a/docs/verifiche.md b/docs/verifiche.md
index df6e362..bb59c3a 100644
--- a/docs/verifiche.md
+++ b/docs/verifiche.md
@@ -225,8 +225,10 @@ scartano le modifiche nei dialoghi. Non c’è recupero persistente delle bozze.
 Se un’attività è stata archiviata altrove, la versione corrente non è consultabile
 negli elenchi per risolvere il conflitto: copiare gli input utili prima di annullare.
 
-Settimana, sessioni di tempo, Riepilogo e Backup/ripristino rimangono indisponibili
-anche nelle API e spettano agli esiti successivi del supervisore host. Il file
+Le viste Settimana, sessioni di tempo, Riepilogo e Backup/ripristino rimangono
+indisponibili e spettano ai task successivi del supervisore host. Le API per
+sessioni e riepilogo sono descritte nell’intervento in fondo; quelle per
+backup/ripristino restano da implementare. Il file
 interno `archive.json` non è un backup portabile; non esiste ancora una procedura
 di esportazione o ripristino. Una stima non registra tempo e una scadenza non
 genera una vista settimanale. Il layout per schermi stretti non abilita l’accesso
@@ -237,3 +239,57 @@ collaudi desktop/mobile o con lettori di schermo, revisioni indipendenti o
 pubblicazioni. I criteri automatici non esauriscono la revisione d’uso: conflitti
 per campo, tastiera, focus, nomi lunghi e assenza di scorrimento orizzontale vanno
 riferiti solo alla copertura realmente osservata.
+
+## Intervento corrente: date civili e API Settimana
+
+Le ricevute riportate sopra appartengono alla prova precedente: sono contesto
+storico e non certificano la nuova missione. Non è disponibile una nuova
+ricevuta host per l’intervento qui descritto.
+
+Sono stati aggiunti `addCivilDays` e `civilWeekday` in `src/dates.mjs` e
+`GET /api/week?start=YYYY-MM-DD`. Il piano include attività non archiviate di
+progetti attivi, conserva completate e revisioni e separa quelle senza scadenza.
+La scelta per il limite del calendario è rifiutare con 400 una settimana che
+oltrepassa gli anni 0001–9999; non si troncano i sette giorni.
+
+Nella sandbox sono passati controlli mirati eseguiti direttamente con Node:
+validazione e aritmetica delle date in quattro fusi, cambi di mese e anno,
+bisestili secolari, anni iniziali e limiti; gestore richieste in memoria con
+filtri degli archivi, completate, giorni vuoti, input errati, risposta 405 e
+assenza di mutazioni. Sono passati anche controllo sintattico dei moduli
+modificati e `git diff --check`. Non sono stati aperti socket né avviati browser
+o suite di accettazione. Non sono prove HTTP, di persistenza o ricevute host.
+Il criterio `planning-api` include anche sessioni e riepilogo: questi controlli
+della sola API Settimana non ne attestano l’esito.
+
+## Intervento corrente: sessioni persistenti e riepilogo
+
+Implementati `POST/GET /api/time-entries`, `DELETE /api/time-entries/:id` con
+204 senza corpo e `GET /api/summary?date=YYYY-MM-DD`. L’archivio valida le sessioni,
+gli ID duplicati e i riferimenti all’attività e allo stesso progetto. I file
+precedenti senza sessioni vengono integrati solo in memoria all’apertura.
+Controlli e scritture usano la coda esistente senza cambiare revisioni o stato
+delle attività; la cronologia resta leggibile dopo archiviazione e riavvio.
+
+Scelte esplicite: il tempo archiviato continua a contribuire al riepilogo nella
+settimana della sessione; `byProject` include tutti i progetti, anche archiviati
+e senza minuti, mentre i conteggi delle attività escludono entrambi gli archivi.
+Il riepilogo riusa l’aritmetica civile della settimana, con estremi inclusi e
+400 per settimane che oltrepassano gli anni 0001–9999.
+
+Controlli mirati locali passati con Node, senza socket: gestore in memoria per
+limiti e input invalidi, JSON malformato, 204/404/405, lettura della cronologia,
+revisioni immutate, conteggi e minuti. Su filesystem temporaneo sono stati
+controllati riavvio, compatibilità senza riscrittura, rifiuto di record e grafi
+corrotti conservando il file, archiviazione concorrente alla registrazione,
+scrittura fallita senza pubblicazione e successivo riutilizzo della coda,
+salvataggi concorrenti senza perdere sessioni. I calcoli sono stati confrontati
+in quattro fusi, su cambio d’anno, bisestili e cambio d’ora. Passati inoltre
+controllo sintattico dei moduli modificati e `git diff --check`.
+
+Nessuna suite completa di accettazione o browser è stata eseguita nella sandbox;
+questi controlli non osservano HTTP o l’interfaccia e non sono ricevute host.
+Il criterio richiesto al runtime è `planning-api`; per le regressioni della
+persistenza condivisa sono richiesti anche `projects-api` e `tasks-api`.
+Non è disponibile alcun nuovo esito host per queste modifiche. Le viste
+rimangono delegate ai task successivi; backup e ripristino al prossimo esito.
diff --git a/src/app.mjs b/src/app.mjs
index f0db111..718ceac 100644
--- a/src/app.mjs
+++ b/src/app.mjs
@@ -1,6 +1,9 @@
-import { AppError, sendError, sendJSON } from './errors.mjs';
+import { AppError, sendError, sendJSON, sendNoContent } from './errors.mjs';
 import { createProject, updateProject } from './projects.mjs';
 import { createTask, listTasks, updateTask } from './tasks.mjs';
+import { getWeek } from './week.mjs';
+import { createTimeEntry, deleteTimeEntry, listTimeEntries } from './time-entries.mjs';
+import { getSummary } from './summary.mjs';
 import { servePublic } from './public.mjs';
 
 const MAX_BODY_BYTES = 2 * 1024 * 1024;
@@ -98,6 +101,54 @@ export function createRequestHandler(archive) {
         }
         return;
       }
+      if (path === '/api/week') {
+        if (request.method === 'GET') {
+          sendJSON(response, 200, getWeek(archive.snapshot(), url.searchParams.get('start')));
+        } else {
+          methodNotAllowed(response, ['GET']);
+        }
+        return;
+      }
+      if (path === '/api/time-entries') {
+        if (request.method === 'GET') {
+          sendJSON(response, 200, listTimeEntries(archive.snapshot(), url.searchParams));
+        } else if (request.method === 'POST') {
+          const input = await readJSON(request);
+          const entry = await archive.mutate(data => {
+            const next = createTimeEntry(input, data);
+            data.timeEntries.push(next);
+            return next;
+          });
+          sendJSON(response, 201, entry);
+        } else {
+          methodNotAllowed(response, ['GET', 'POST']);
+        }
+        return;
+      }
+      if (path === '/api/summary') {
+        if (request.method === 'GET') {
+          sendJSON(response, 200, getSummary(archive.snapshot(), url.searchParams.get('date')));
+        } else {
+          methodNotAllowed(response, ['GET']);
+        }
+        return;
+      }
+      const entryMatch = path.match(/^\/api\/time-entries\/([^/]+)$/);
+      if (entryMatch) {
+        if (request.method !== 'DELETE') {
+          methodNotAllowed(response, ['DELETE']);
+          return;
+        }
+        let id;
+        try {
+          id = decodeURIComponent(entryMatch[1]);
+        } catch {
+          throw new AppError(400, 'INVALID_ID', 'L’identificativo della sessione non è valido.');
+        }
+        await archive.mutate(data => deleteTimeEntry(data, id));
+        sendNoContent(response);
+        return;
+      }
       const taskMatch = path.match(/^\/api\/tasks\/([^/]+)$/);
       if (taskMatch) {
         if (request.method !== 'PATCH') {
diff --git a/src/archive.mjs b/src/archive.mjs
index 1f2a810..e899006 100644
--- a/src/archive.mjs
+++ b/src/archive.mjs
@@ -4,11 +4,13 @@ import { join, resolve } from 'node:path';
 import { AppError } from './errors.mjs';
 import { validateStoredProject } from './projects.mjs';
 import { validateStoredTask } from './tasks.mjs';
+import { validateStoredTimeEntry } from './time-entries.mjs';
 
 function validateArchive(archive) {
   if (archive === null || typeof archive !== 'object' || Array.isArray(archive)
       || archive.version !== 1 || !Array.isArray(archive.projects) || !Array.isArray(archive.tasks)
-      || Object.keys(archive).some(key => !['version', 'projects', 'tasks'].includes(key))) {
+      || !Array.isArray(archive.timeEntries)
+      || Object.keys(archive).some(key => !['version', 'projects', 'tasks', 'timeEntries'].includes(key))) {
     throw new Error('Formato dell’archivio non riconosciuto.');
   }
   const ids = new Set();
@@ -17,12 +19,23 @@ function validateArchive(archive) {
     if (ids.has(project.id)) throw new Error('Identificativi di progetto duplicati.');
     ids.add(project.id);
   }
-  const taskIds = new Set();
+  const tasksById = new Map();
   for (const task of archive.tasks) {
     validateStoredTask(task);
-    if (taskIds.has(task.id)) throw new Error('Identificativi di attività duplicati.');
+    if (tasksById.has(task.id)) throw new Error('Identificativi di attività duplicati.');
     if (!ids.has(task.projectId)) throw new Error('Attività con riferimento a un progetto inesistente.');
-    taskIds.add(task.id);
+    tasksById.set(task.id, task);
+  }
+  const entryIds = new Set();
+  for (const entry of archive.timeEntries) {
+    validateStoredTimeEntry(entry);
+    if (entryIds.has(entry.id)) throw new Error('Identificativi di sessione duplicati.');
+    const task = tasksById.get(entry.taskId);
+    if (!task) throw new Error('Sessione con riferimento a un’attività inesistente.');
+    if (task.projectId !== entry.projectId) {
+      throw new Error('Il progetto della sessione non corrisponde a quello dell’attività.');
+    }
+    entryIds.add(entry.id);
   }
 }
 
@@ -76,7 +89,7 @@ export class Archive {
 
     let data;
     if (source === undefined) {
-      data = { version: 1, projects: [], tasks: [] };
+      data = { version: 1, projects: [], tasks: [], timeEntries: [] };
       await writeAtomic(absolute, data);
     } else {
       try {
@@ -86,6 +99,8 @@ export class Archive {
         // Upgrade in memory; opening an archive never overwrites its contents.
         if (data !== null && typeof data === 'object' && !Array.isArray(data)
             && data.version === 1 && !Object.hasOwn(data, 'tasks')) data.tasks = [];
+        if (data !== null && typeof data === 'object' && !Array.isArray(data)
+            && data.version === 1 && !Object.hasOwn(data, 'timeEntries')) data.timeEntries = [];
         validateArchive(data);
       } catch (cause) {
         throw new Error(`L’archivio ${file} è illeggibile o non valido. Avvio interrotto; il file è conservato.`, { cause });
diff --git a/src/dates.mjs b/src/dates.mjs
index b1932cb..0cdb6fb 100644
--- a/src/dates.mjs
+++ b/src/dates.mjs
@@ -1,11 +1,62 @@
 // Civil dates are calendar values, never instants in the machine's timezone.
+const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
+
+function daysInMonth(year, month) {
+  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
+  return month === 2 && leap ? 29 : MONTH_DAYS[month - 1];
+}
+
 export function isCivilDate(value) {
   if (typeof value !== 'string' || value.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
   const year = Number(value.slice(0, 4));
   const month = Number(value.slice(5, 7));
   const day = Number(value.slice(8, 10));
   if (year < 1 || month < 1 || month > 12 || day < 1) return false;
-  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
-  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
-  return day <= days[month - 1];
+  return day <= daysInMonth(year, month);
+}
+
+function daysBeforeYear(year) {
+  const previous = year - 1;
+  return previous * 365 + Math.floor(previous / 4)
+    - Math.floor(previous / 100) + Math.floor(previous / 400);
+}
+
+// Zero is 0001-01-01, a Monday in the proleptic Gregorian calendar.
+function civilDayNumber(value) {
+  if (!isCivilDate(value)) {
+    throw new RangeError('La data deve essere reale nel formato YYYY-MM-DD, con anno da 0001 a 9999.');
+  }
+  const [year, month, day] = value.split('-').map(Number);
+  let number = daysBeforeYear(year) + day - 1;
+  for (let current = 1; current < month; current++) number += daysInMonth(year, current);
+  return number;
+}
+
+// Monday = 0, ..., Sunday = 6. No Date, UTC conversion or daylight-saving rules.
+export function civilWeekday(value) {
+  return civilDayNumber(value) % 7;
+}
+
+export function addCivilDays(value, amount) {
+  if (!Number.isSafeInteger(amount)) throw new RangeError('Il numero di giorni deve essere un intero sicuro.');
+  const number = civilDayNumber(value) + amount;
+  if (!Number.isSafeInteger(number) || number < 0 || number >= daysBeforeYear(10000)) {
+    throw new RangeError('La data risultante deve avere un anno da 0001 a 9999.');
+  }
+
+  // Find the year with integer comparisons, including years 0001–0099.
+  let year = 1;
+  let upper = 10000;
+  while (year + 1 < upper) {
+    const middle = Math.floor((year + upper) / 2);
+    if (daysBeforeYear(middle) <= number) year = middle;
+    else upper = middle;
+  }
+  let day = number - daysBeforeYear(year);
+  let month = 1;
+  while (day >= daysInMonth(year, month)) {
+    day -= daysInMonth(year, month);
+    month++;
+  }
+  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`;
 }
diff --git a/src/errors.mjs b/src/errors.mjs
index 15b5603..b4a15fa 100644
--- a/src/errors.mjs
+++ b/src/errors.mjs
@@ -20,6 +20,15 @@ export function sendJSON(response, status, value, headers = {}) {
   response.end(body);
 }
 
+export function sendNoContent(response) {
+  if (response.destroyed || response.writableEnded) return;
+  response.writeHead(204, {
+    'cache-control': 'no-store',
+    'x-content-type-options': 'nosniff',
+  });
+  response.end();
+}
+
 export function sendError(response, error) {
   const known = error instanceof AppError;
   if (!known || error.status >= 500) console.error('Svolta:', error);
diff --git a/src/summary.mjs b/src/summary.mjs
new file
--- /dev/null
+++ b/src/summary.mjs
+import { addCivilDays, civilWeekday, isCivilDate } from './dates.mjs';
+import { AppError } from './errors.mjs';
+import { listTasks } from './tasks.mjs';
+
+export function getSummary(data, date) {
+  if (!isCivilDate(date)) {
+    throw new AppError(400, 'INVALID_SUMMARY_DATE',
+      'La data di riferimento deve essere reale nel formato YYYY-MM-DD, con anno da 0001 a 9999.');
+  }
+
+  let weekStart;
+  let weekEnd;
+  try {
+    weekStart = addCivilDays(date, -civilWeekday(date));
+    weekEnd = addCivilDays(weekStart, 6);
+  } catch (error) {
+    if (!(error instanceof RangeError)) throw error;
+    throw new AppError(400, 'WEEK_OUT_OF_RANGE',
+      'Tutti e sette i giorni della settimana devono avere un anno da 0001 a 9999.');
+  }
+
+  const totals = { todo: 0, doing: 0, done: 0, overdue: 0, minutesThisWeek: 0 };
+  // Include archived projects too: their saved time still belongs to them.
+  const byProject = data.projects.map(project => ({
+    projectId: project.id,
+    name: project.name,
+    minutesThisWeek: 0,
+    done: 0,
+  }));
+  const projectsById = new Map(byProject.map(project => [project.projectId, project]));
+
+  for (const task of listTasks(data, new URLSearchParams())) {
+    totals[task.status]++;
+    if (task.status === 'done') projectsById.get(task.projectId).done++;
+    else if (task.dueDate !== null && task.dueDate < date) totals.overdue++;
+  }
+
+  // Valid fixed-width civil dates compare in calendar order, without timezones.
+  for (const entry of data.timeEntries) {
+    if (entry.date >= weekStart && entry.date <= weekEnd) {
+      totals.minutesThisWeek += entry.minutes;
+      projectsById.get(entry.projectId).minutesThisWeek += entry.minutes;
+    }
+  }
+  return { date, weekStart, weekEnd, totals, byProject };
+}
+
diff --git a/src/time-entries.mjs b/src/time-entries.mjs
new file
--- /dev/null
+++ b/src/time-entries.mjs
+import { randomUUID } from 'node:crypto';
+import { isCivilDate } from './dates.mjs';
+import { AppError } from './errors.mjs';
+
+const INPUT_FIELDS = ['taskId', 'date', 'minutes', 'note'];
+
+function invalid(message) {
+  throw new AppError(400, 'INVALID_TIME_ENTRY', message);
+}
+
+function objectWithFields(value, allowed) {
+  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
+    invalid('Invia un oggetto JSON con i campi della sessione.');
+  }
+  if (Object.keys(value).some(key => !allowed.includes(key))) {
+    invalid('La sessione contiene campi non previsti per questa operazione.');
+  }
+}
+
+function identifier(value) {
+  return typeof value === 'string' && value.length > 0 && value.trim() === value;
+}
+
+export function validateStoredTimeEntry(entry) {
+  objectWithFields(entry, ['id', 'projectId', ...INPUT_FIELDS]);
+  if (!identifier(entry.id)) invalid('Identificativo della sessione non valido.');
+  if (!identifier(entry.taskId)) invalid('Identificativo dell’attività non valido.');
+  if (!identifier(entry.projectId)) invalid('Identificativo del progetto non valido.');
+  if (!isCivilDate(entry.date)) {
+    invalid('La data della sessione deve essere reale nel formato YYYY-MM-DD, con anno da 0001 a 9999.');
+  }
+  if (!Number.isInteger(entry.minutes) || entry.minutes < 1 || entry.minutes > 1440) {
+    invalid('I minuti della sessione devono essere un numero intero tra 1 e 1440.');
+  }
+  if (typeof entry.note !== 'string' || [...entry.note].length > 2000) {
+    invalid('La nota della sessione deve essere un testo di massimo 2000 caratteri.');
+  }
+}
+
+export function createTimeEntry(input, data) {
+  objectWithFields(input, INPUT_FIELDS);
+  if (!identifier(input.taskId)) invalid('Scegli un’attività per la sessione.');
+  const task = data.tasks.find(item => item.id === input.taskId);
+  if (!task) throw new AppError(404, 'TASK_NOT_FOUND', 'L’attività richiesta non esiste.');
+  if (task.archived) {
+    throw new AppError(400, 'TASK_ARCHIVED', 'L’attività è archiviata. Riattivala prima di registrare tempo.');
+  }
+  const project = data.projects.find(item => item.id === task.projectId);
+  if (!project) throw new AppError(404, 'PROJECT_NOT_FOUND', 'Il progetto richiesto non esiste.');
+  if (project.archived) {
+    throw new AppError(400, 'PROJECT_ARCHIVED', 'Il progetto è archiviato. Riattivalo prima di registrare tempo.');
+  }
+
+  const entry = {
+    id: randomUUID(),
+    taskId: task.id,
+    projectId: project.id,
+    date: input.date,
+    minutes: input.minutes,
+    note: Object.hasOwn(input, 'note') ? input.note : '',
+  };
+  validateStoredTimeEntry(entry);
+  return entry;
+}
+
+export function listTimeEntries(data, searchParams) {
+  const taskId = searchParams.get('taskId');
+  if (taskId === null) return data.timeEntries;
+  if (!identifier(taskId)) {
+    throw new AppError(400, 'INVALID_TIME_ENTRY_FILTER', 'Il filtro attività richiede un identificativo non vuoto.');
+  }
+  if (!data.tasks.some(task => task.id === taskId)) {
+    throw new AppError(404, 'TASK_NOT_FOUND', 'L’attività richiesta non esiste.');
+  }
+  // History remains readable even when the task or its project is archived.
+  return data.timeEntries.filter(entry => entry.taskId === taskId);
+}
+
+export function deleteTimeEntry(data, id) {
+  const index = data.timeEntries.findIndex(entry => entry.id === id);
+  if (index === -1) {
+    throw new AppError(404, 'TIME_ENTRY_NOT_FOUND', 'La sessione richiesta non esiste.');
+  }
+  data.timeEntries.splice(index, 1);
+}
+
diff --git a/src/week.mjs b/src/week.mjs
new file
--- /dev/null
+++ b/src/week.mjs
+import { addCivilDays, civilWeekday, isCivilDate } from './dates.mjs';
+import { AppError } from './errors.mjs';
+import { listTasks } from './tasks.mjs';
+
+export function getWeek(data, start) {
+  if (!isCivilDate(start) || civilWeekday(start) !== 0) {
+    throw new AppError(400, 'INVALID_WEEK_START',
+      'L’inizio settimana deve essere un lunedì reale nel formato YYYY-MM-DD, con anno da 0001 a 9999.');
+  }
+
+  let days;
+  try {
+    days = Array.from({ length: 7 }, (_, offset) => ({
+      date: addCivilDays(start, offset),
+      tasks: [],
+    }));
+  } catch (error) {
+    if (!(error instanceof RangeError)) throw error;
+    throw new AppError(400, 'WEEK_OUT_OF_RANGE',
+      'Tutti e sette i giorni della settimana devono avere un anno da 0001 a 9999.');
+  }
+
+  const tasksByDate = new Map(days.map(day => [day.date, day.tasks]));
+  const unscheduled = [];
+  // The general task list excludes archived tasks and archived projects,
+  // while retaining completed tasks and their status, revision and other fields.
+  for (const task of listTasks(data, new URLSearchParams())) {
+    if (task.dueDate === null) unscheduled.push(task);
+    else tasksByDate.get(task.dueDate)?.push(task);
+  }
+  return { start, days, unscheduled };
+}
+
```
