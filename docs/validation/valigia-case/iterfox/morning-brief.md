# Morning Brief — COMPLETED

**Provider: real Codex SDK.**

Original goal: Crea Valigia, una piccola app web locale in italiano per preparare una lista da viaggio.
Voglio aggiungere oggetti con nome, quantità e categoria; modificare la quantità, segnare ciò che è preparato ed eliminare gli oggetti. Mostra il totale delle unità, quelle preparate e quelle rimanenti, anche mentre filtro una categoria (i totali restano globali). Conserva la lista al ricaricamento usando localStorage. Permetti di esportarla in un campo di testo JSON e reimportarla. Un backup non valido non deve cancellare o alterare la lista corrente.
L'app deve funzionare su desktop e telefono, con etichette comprensibili, navigazione da tastiera, stato vuoto utile e messaggi d'errore visibili. Nomi Unicode e testo simile a HTML devono essere gestiti come normale testo. Se il salvataggio locale fallisce, spiega che i dati non sono salvati; l'app deve restare utilizzabile. Nessuna registrazione, rete, servizio esterno o dipendenza aggiuntiva.
Usa i file iniziali e completa src/domain.mjs, src/app.mjs, index.html e style.css; documenta uso e limiti in README.md. I dettagli di implementazione sono una tua scelta. SPEC.md e i test definiscono il contratto osservabile. Sono già predisposti server e controlli. Puoi leggere ed eseguire i controlli disponibili e correggere il codice quanto serve. Non modificare SPEC.md, server.mjs, tests o configurazioni, non fare commit/push/deploy. Consegna una piccola app completa e utilizzabile, non un mockup. Se il browser o localhost non funzionano nella sandbox, completa il codice e dichiara la verifica non osservata: i controlli verranno eseguiti esternamente sugli stessi file.

Current contract: v1 — Crea Valigia, una piccola app web locale in italiano per preparare una lista da viaggio.
Voglio aggiungere oggetti con nome, quantità e categoria; modificare la quantità, segnare ciò che è preparato ed eliminare gli oggetti. Mostra il totale delle unità, quelle preparate e quelle rimanenti, anche mentre filtro una categoria (i totali restano globali). Conserva la lista al ricaricamento usando localStorage. Permetti di esportarla in un campo di testo JSON e reimportarla. Un backup non valido non deve cancellare o alterare la lista corrente.
L'app deve funzionare su desktop e telefono, con etichette comprensibili, navigazione da tastiera, stato vuoto utile e messaggi d'errore visibili. Nomi Unicode e testo simile a HTML devono essere gestiti come normale testo. Se il salvataggio locale fallisce, spiega che i dati non sono salvati; l'app deve restare utilizzabile. Nessuna registrazione, rete, servizio esterno o dipendenza aggiuntiva.
Usa i file iniziali e completa src/domain.mjs, src/app.mjs, index.html e style.css; documenta uso e limiti in README.md. I dettagli di implementazione sono una tua scelta. SPEC.md e i test definiscono il contratto osservabile. Sono già predisposti server e controlli. Puoi leggere ed eseguire i controlli disponibili e correggere il codice quanto serve. Non modificare SPEC.md, server.mjs, tests o configurazioni, non fare commit/push/deploy. Consegna una piccola app completa e utilizzabile, non un mockup. Se il browser o localhost non funzionano nella sandbox, completa il codice e dichiara la verifica non osservata: i controlli verranno eseguiti esternamente sugli stessi file.

2/2 criteria deterministically verified; 0 AI-assessed. 0 still open.

- [x] Data operations, validation, summaries and backup preserve all stated invariants — PASSED ([evidence](#evidence-beafc800-5fc4-4077-a91a-ecb33f1bcef2))
- [x] Real Chrome completes the list, recovery and mobile workflows — PASSED ([evidence](#evidence-c7d43413-ae19-4ccb-92df-ac44f91aad1c))

## What changed

### Autonomous project development

1 project checkpoints; 0 implementation units discovered without a new operator prompt.
Project reviews are AI judgments from the same integration, separate from runtime acceptance evidence.
- ready: Non ho individuato lacune concrete rispetto all’obiettivo nei file richiesti. Le ricevute correnti riportano 12/12 test di dominio e 7/7 flussi Chrome superati. Progetto pronto per la revisione dell’operatore.
  - Provisional autonomous choice: Conservare l’implementazione attuale senza ulteriori attività. — L’ispezione di src/domain.mjs, src/app.mjs, index.html, style.css e README.md conferma operazioni immutabili, totali globali, importazione atomica, rendering come testo, controlli accessibili e gestione degli errori di persistenza.
  - Provisional autonomous choice: Usare le ricevute correnti come evidenza di esecuzione. — logic: beafc800-5fc4-4077-a91a-ecb33f1bcef2; workflow: c7d43413-ae19-4ccb-92df-ac44f91aad1c. Questa revisione è stata svolta in sola lettura, senza rieseguire Chrome.


No corrective tasks recorded.
- 3 preliminary command observations were not yet satisfied while implementation remained; these did not consume corrective retries.

## Problems and decisions

- Event 20: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 30: Evidence is STALE: README.md, index.html, src/app.mjs, style.css. Scope: all repository files.
- Event 32: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 43: Project supervisor considers the goal ready for operator review; this is an AI judgment, not independent proof.

## What needs attention

No open acceptance criterion. Review the diff before integrating changes.

## Resources and worktree

981 seconds elapsed; 4 agent turns; 836777 reported tokens. Cost not measured. Interrupted-turn usage may be unavailable.

Repository: /Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/fixture
Branch: iterfox/20261020T094840-aed92dac
Worktree: /Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac

## Evidence

<a id="evidence-a1485932-efda-4f92-9dd4-ee4be0e2f946"></a>
### logic — RECORDED (deterministic)

Check: ["node","--test","tests/domain.test.mjs"]
Exit: 1; duration: 103ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: 858d3a8d1cda1a61b7a7807b944b805d1d1d5e3f444aa3c28ef403f7b1735b11
Scope: all repository files

```text
TAP version 13
# Subtest: empty state
ok 1 - empty state
  ---
  duration_ms: 0.525541
  type: 'test'
  ...
# Subtest: add trims and initializes without mutating input
not ok 2 - add trims and initializes without mutating input
  ---
  duration_ms: 0.403042
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:7:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.addItem (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:2:33)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:7:94)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)
  ...
# Subtest: add generates unique ids
not ok 3 - add generates unique ids
  ---
  duration_ms: 0.034625
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:8:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.addItem (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:2:33)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:8:83)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: invalid names and quantities are rejected atomically
ok 4 - invalid names and quantities are rejected atomically
  ---
  duration_ms: 0.21025
  type: 'test'
  ...
# Subtest: update quantity and packed immutably
not ok 5 - update quantity and packed immutably
  ---
  duration_ms: 0.049792
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:10:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.updateItem (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:3:36)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:10:77)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: unknown ids reject update and delete
ok 6 - unknown ids reject update and delete
  ---
  duration_ms: 0.082292
  type: 'test'
  ...
# Subtest: delete preserves original
not ok 7 - delete preserves original
  ---
  duration_ms: 0.044667
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:12:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.removeItem (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:4:36)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:12:75)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: summary counts quantity and partitions totals
not ok 8 - summary counts quantity and partitions totals
  ---
  duration_ms: 0.03025
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:13:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.summary (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:5:33)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:13:78)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: backup roundtrip preserves Unicode and ids
not ok 9 - backup roundtrip preserves Unicode and ids
  ---
  duration_ms: 0.168334
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:14:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.exportList (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:6:36)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:14:180)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
# Subtest: reject malformed and unsupported backups
ok 10 - reject malformed and unsupported backups
  ---
  duration_ms: 0.235583
  type: 'test'
  ...
# Subtest: validate every imported row and unique ids
ok 11 - validate every imported row and unique ids
  ---
  duration_ms: 0.126333
  type: 'test'
  ...
# Subtest: 500 row limit is enforced
not ok 12 - 500 row limit is enforced
  ---
  duration_ms: 0.1345
  type: 'test'
  location: '/Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:17:1'
  failureType: 'testCodeFailure'
  error: 'Da implementare'
  code: 'ERR_TEST_FAILURE'
  stack: |-
    Module.importList (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/src/domain.mjs:7:36)
    TestContext.<anonymous> (file:///Users/vins/work/iterfox/.iterfox/missions/app-value-20261020/iterfox/worktrees/20261020T094840-aed92dac/tests/domain.test.mjs:17:118)
    Test.runInAsyncScope (node:async_hooks:214:14)
    Test.run (node:internal/test_runner/test:1047:25)
    Test.processPendingSubtests (node:internal/test_runner/test:744:18)
    Test.postRun (node:internal/test_runner/test:1173:19)
    Test.run (node:internal/test_runner/test:1101:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
  ...
1..12
# tests 12
# suites 0
# pass 5
# fail 7
# cancelled 0
# skipped 0
# todo 0
# duration_ms 39.932292

```

<a id="evidence-57715f35-5d6d-44cd-8c44-2a412edbafc3"></a>
### workflow — RECORDED (deterministic)

Check: ["node","tests/browser.mjs"]
Exit: 1; duration: 8860ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: 858d3a8d1cda1a61b7a7807b944b805d1d1d5e3f444aa3c28ef403f7b1735b11
Scope: all repository files

```text

```

<a id="evidence-6cf22d4d-e2d7-41b6-85ab-72b451f5594d"></a>
### logic — STALE (deterministic)

Check: ["node","--test","tests/domain.test.mjs"]
Exit: 0; duration: 93ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: 1a58436eb9ecccdce5a4ff50345181abc6cb3ac33e82f3b2f4456d39f9316516
Scope: all repository files

Evidence is STALE: README.md, index.html, src/app.mjs, style.css. Scope: all repository files.

```text
TAP version 13
# Subtest: empty state
ok 1 - empty state
  ---
  duration_ms: 0.520584
  type: 'test'
  ...
# Subtest: add trims and initializes without mutating input
ok 2 - add trims and initializes without mutating input
  ---
  duration_ms: 0.194541
  type: 'test'
  ...
# Subtest: add generates unique ids
ok 3 - add generates unique ids
  ---
  duration_ms: 1.526875
  type: 'test'
  ...
# Subtest: invalid names and quantities are rejected atomically
ok 4 - invalid names and quantities are rejected atomically
  ---
  duration_ms: 0.285
  type: 'test'
  ...
# Subtest: update quantity and packed immutably
ok 5 - update quantity and packed immutably
  ---
  duration_ms: 0.159417
  type: 'test'
  ...
# Subtest: unknown ids reject update and delete
ok 6 - unknown ids reject update and delete
  ---
  duration_ms: 0.103708
  type: 'test'
  ...
# Subtest: delete preserves original
ok 7 - delete preserves original
  ---
  duration_ms: 0.08975
  type: 'test'
  ...
# Subtest: summary counts quantity and partitions totals
ok 8 - summary counts quantity and partitions totals
  ---
  duration_ms: 0.054792
  type: 'test'
  ...
# Subtest: backup roundtrip preserves Unicode and ids
ok 9 - backup roundtrip preserves Unicode and ids
  ---
  duration_ms: 0.241958
  type: 'test'
  ...
# Subtest: reject malformed and unsupported backups
ok 10 - reject malformed and unsupported backups
  ---
  duration_ms: 2.398667
  type: 'test'
  ...
# Subtest: validate every imported row and unique ids
ok 11 - validate every imported row and unique ids
  ---
  duration_ms: 0.158208
  type: 'test'
  ...
# Subtest: 500 row limit is enforced
ok 12 - 500 row limit is enforced
  ---
  duration_ms: 1.133542
  type: 'test'
  ...
1..12
# tests 12
# suites 0
# pass 12
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 37.079625

```

<a id="evidence-4eb4d514-4d75-448a-9099-e3ad05ddd320"></a>
### workflow — RECORDED (deterministic)

Check: ["node","tests/browser.mjs"]
Exit: 1; duration: 9183ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: 1a58436eb9ecccdce5a4ff50345181abc6cb3ac33e82f3b2f4456d39f9316516
Scope: all repository files

```text

```

<a id="evidence-beafc800-5fc4-4077-a91a-ecb33f1bcef2"></a>
### logic — PASSED (deterministic)

Check: ["node","--test","tests/domain.test.mjs"]
Exit: 0; duration: 97ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: bf3c82b8a838ea7c4f36e238e2adde1cabafa7f12197b4d81aa5e1e83917ad18
Scope: all repository files

```text
TAP version 13
# Subtest: empty state
ok 1 - empty state
  ---
  duration_ms: 0.519916
  type: 'test'
  ...
# Subtest: add trims and initializes without mutating input
ok 2 - add trims and initializes without mutating input
  ---
  duration_ms: 0.25
  type: 'test'
  ...
# Subtest: add generates unique ids
ok 3 - add generates unique ids
  ---
  duration_ms: 1.476541
  type: 'test'
  ...
# Subtest: invalid names and quantities are rejected atomically
ok 4 - invalid names and quantities are rejected atomically
  ---
  duration_ms: 0.232916
  type: 'test'
  ...
# Subtest: update quantity and packed immutably
ok 5 - update quantity and packed immutably
  ---
  duration_ms: 0.148375
  type: 'test'
  ...
# Subtest: unknown ids reject update and delete
ok 6 - unknown ids reject update and delete
  ---
  duration_ms: 0.094416
  type: 'test'
  ...
# Subtest: delete preserves original
ok 7 - delete preserves original
  ---
  duration_ms: 0.086417
  type: 'test'
  ...
# Subtest: summary counts quantity and partitions totals
ok 8 - summary counts quantity and partitions totals
  ---
  duration_ms: 0.05225
  type: 'test'
  ...
# Subtest: backup roundtrip preserves Unicode and ids
ok 9 - backup roundtrip preserves Unicode and ids
  ---
  duration_ms: 0.228834
  type: 'test'
  ...
# Subtest: reject malformed and unsupported backups
ok 10 - reject malformed and unsupported backups
  ---
  duration_ms: 0.480416
  type: 'test'
  ...
# Subtest: validate every imported row and unique ids
ok 11 - validate every imported row and unique ids
  ---
  duration_ms: 0.158375
  type: 'test'
  ...
# Subtest: 500 row limit is enforced
ok 12 - 500 row limit is enforced
  ---
  duration_ms: 1.222708
  type: 'test'
  ...
1..12
# tests 12
# suites 0
# pass 12
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 36.504333

```

<a id="evidence-c7d43413-ae19-4ccb-92df-ac44f91aad1c"></a>
### workflow — PASSED (deterministic)

Check: ["node","tests/browser.mjs"]
Exit: 0; duration: 2582ms
Git: 78edba0c6fed5e4592e93af95416e7caf8a0c99e; fingerprint: bf3c82b8a838ea7c4f36e238e2adde1cabafa7f12197b4d81aa5e1e83917ad18
Scope: all repository files

```text
PASS empty state and keyboard addition
PASS quantities packed counts and category filter
PASS persistence across refresh and deletion
PASS backup valid and invalid imports are atomic
PASS HTML-like Unicode names render as text
PASS 390px layout and no page errors or external requests
PASS storage failure is reported and memory list still works

```

## Agent assessments

- Completato src/domain.mjs con operazioni immutabili, validazione rigorosa, ID univoci, riepiloghi per quantità e backup JSON. Unicode e testo HTML preservati. Sintassi e controllo diretto superati; suite completa da verificare sull’host. (agent claim; 2 linked runtime checks)
- Completata l’app con gestione oggetti, totali globali, filtri, persistenza, avvisi di errore, backup JSON e README. Sintassi verificata; suite complete e layout a 390px non osservati in sandbox, da verificare sull’host. (agent claim; 1 linked runtime checks)

## Limits

- Local execution pauses during sleep or shutdown.
- AI summaries and qualitative assessments are probabilistic claims from the same integration, not independent review.
- Only configured checks are covered; passing checks do not prove absence of defects.

## Worktree diff

```diff
diff --git a/README.md b/README.md
index 0e009b4..ea3fa6b 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,64 @@
 # Valigia
 
-Implementazione da completare.
+Una piccola lista da viaggio in italiano, utilizzabile su desktop e telefono. Nessun account, dipendenza da installare, font remoto o servizio esterno: l’app funziona con i file locali e il browser.
+
+## Avvio locale
+
+Con Node.js disponibile, dalla cartella del progetto esegui:
+
+~~~sh
+node server.mjs
+~~~
+
+Apri **http://127.0.0.1:4350** in Chrome. Per scegliere un’altra porta puoi usare, per esempio, `PORT=4351 node server.mjs`. Mantieni la stessa combinazione di indirizzo e porta per ritrovare i dati: `localStorage` è separato per origine. Aprire direttamente `index.html` dal filesystem non è supportato, perché l’app usa moduli JavaScript. Non servono npm o connessioni a Internet; il server serve solo i file del progetto su localhost.
+
+## Uso
+
+- Inserisci **Nome oggetto**, **Quantità** e, se vuoi, **Categoria**. Una categoria vuota diventa **Generale**. Usa **Aggiungi** oppure Invio dal modulo; il focus torna a Nome oggetto. La quantità torna a 1, mentre la categoria resta disponibile per l’oggetto successivo.
+- Spunta un oggetto per indicare che tutte le sue unità sono **preparate**. La quantità si modifica direttamente nella riga: conferma con Invio o uscendo dal campo. **Elimina** rimuove subito la riga; dopo l’eliminazione il focus passa a un oggetto vicino o al modulo.
+- **Filtra categoria** mostra una categoria oppure **Tutte**. I tre indicatori e la barra di avanzamento contano sempre le unità dell’intera lista, incluse quelle nascoste dal filtro. Se aggiungi un oggetto fuori dalla categoria selezionata, il messaggio invita a scegliere Tutte per vederlo.
+- I controlli sono nativi e utilizzabili da tastiera: Tab e Maiusc+Tab per spostarti, Spazio per le checkbox, frecce per il filtro. Gli errori sono mostrati nel relativo riquadro e annunciati tramite `role="alert"`.
+
+## Backup JSON
+
+**Esporta backup** inserisce l’intera lista, anche quando è filtrata, nel campo **Backup JSON** e seleziona il testo. Copialo e salvalo in un file di testo. Il pulsante non crea un file automaticamente e il contenuto del campo non viene conservato al ricaricamento.
+
+Per ripristinare una copia, incolla il documento nel campo e usa **Importa backup**. L’app valida tutto il documento prima di modificare la lista. Un backup valido **sostituisce integralmente la lista**, senza unire le righe; un backup valido vuoto la svuota. Il filtro torna a Tutte. Esporta prima la lista attuale se desideri conservarla. Un backup non valido lascia invariati lista, filtro e dati salvati; il testo errato rimane modificabile nel campo.
+
+Formato di esempio:
+
+~~~json
+{
+  "version": 1,
+  "items": [
+    {
+      "id": "esempio-1",
+      "name": "Calze 🧦",
+      "quantity": 3,
+      "category": "Vestiti",
+      "packed": false
+    }
+  ]
+}
+~~~
+
+Il documento richiede esattamente `version` e `items`; ogni riga richiede esattamente `id`, `name`, `quantity`, `category` e `packed`. Campi aggiuntivi o mancanti non sono accettati. La versione supportata è il numero `1`.
+
+- Massimo **500 righe**, anche se hanno nomi uguali; le righe duplicate non vengono unite.
+- ID stringa non vuota e non composta solo da spazi, unica nella lista, lunga al massimo 100 unità UTF-16. Gli ID delle nuove righe sono generati automaticamente e preservati dal backup.
+- Nome da **1 a 80 caratteri Unicode**, categoria da **1 a 40** (conteggiati come punti di codice). Nel modulo e nelle modifiche del dominio vengono rimossi gli spazi agli estremi. Nel backup nome e categoria devono già essere privi di tali spazi. Accenti, emoji, alfabeti diversi e testo simile a HTML restano normale testo; non vengono interpretati come markup.
+- Quantità numerica intera tra **1 e 99**. `packed` deve essere un booleano JSON `true` o `false`. Stringhe come `"3"` e `"false"` non vengono convertite. Una spunta riguarda tutta la riga: per preparare solo parte di una quantità, usa righe distinte.
+
+## Salvataggio e limiti
+
+La chiave del browser è **`valigia.v1`**, con lo stesso formato JSON del backup. Le modifiche valide e le importazioni vengono salvate automaticamente. Il solo caricamento, il filtro, l’esportazione e le operazioni rifiutate non scrivono nello storage.
+
+Se i dati già salvati sono illeggibili o non validi, l’app mostra un avviso e parte da una lista vuota in memoria, senza sovrascriverli al caricamento. Una successiva aggiunta o importazione valida tenta di sostituire quei dati. Se ti servono gli originali, copiali dagli strumenti di sviluppo del browser prima di modificare la lista.
+
+Se l’accesso o il salvataggio locale fallisce, l’avviso dichiara che i dati **non sono salvati**. La lista resta utilizzabile in memoria: puoi aggiungere, modificare, eliminare ed esportare. A ogni modifica successiva viene ritentato il salvataggio; l’avviso si risolve solo dopo un salvataggio riuscito. Finché compare, conserva un backup esterno prima di ricaricare o chiudere la pagina.
+
+I dati non sono sincronizzati tra dispositivi, browser o schede aperte. In schede diverse l’ultima modifica salvata può sostituire quelle dell’altra scheda. Cancellare i dati del sito o usare la navigazione privata può far perdere la lista. I backup e il salvataggio non sono cifrati. Il supporto richiesto è Chrome recente con JavaScript abilitato; il server Node deve essere attivo per aprire o ricaricare la pagina.
+
+## Controlli predisposti
+
+Il progetto include i controlli del dominio (`node --test tests/domain.test.mjs`) e del browser (`node tests/browser.mjs`). Per il secondo, l’ambiente di verifica deve fornire Chrome e `VALIGIA_PLAYWRIGHT` con il percorso assoluto del modulo Playwright già disponibile. L’app non richiede queste risorse per essere utilizzata.
diff --git a/index.html b/index.html
index f810354..042e308 100644
--- a/index.html
+++ b/index.html
@@ -1 +1,137 @@
-<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Valigia</title><link rel="stylesheet" href="/style.css"><main></main><script type="module" src="/src/app.mjs"></script></html>
+<!doctype html>
+<html lang="it">
+  <head>
+    <meta charset="utf-8">
+    <meta name="viewport" content="width=device-width, initial-scale=1">
+    <meta name="theme-color" content="#f6f5ef">
+    <title>Valigia</title>
+    <link rel="stylesheet" href="/style.css">
+    <script type="module" src="/src/app.mjs"></script>
+  </head>
+  <body>
+    <a class="skip-link" href="#main">Vai alla lista da viaggio</a>
+    <div class="page-shell">
+      <header class="site-header">
+        <a class="brand" href="#main" aria-label="Valigia, vai al contenuto">
+          <span class="brand-icon" aria-hidden="true">
+            <svg viewBox="0 0 32 32" fill="none"><path d="M11 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3M10 9v17M22 9v17M10 28v1M22 28v1"/><rect x="5" y="9" width="22" height="18" rx="4"/></svg>
+          </span>
+          <span>Valigia<span class="brand-dot">.</span></span>
+        </a>
+        <span class="local-badge"><span aria-hidden="true"></span> Solo sul tuo dispositivo</span>
+      </header>
+
+      <main id="main" tabindex="-1">
+        <div class="intro">
+          <p class="eyebrow">MENO PENSIERI, PIÙ VIAGGIO</p>
+          <h1>La tua prossima partenza,<br><span>un oggetto alla volta.</span></h1>
+          <p>Aggiungi, prepara, spunta. Fai spazio al viaggio.</p>
+        </div>
+
+        <noscript><p class="message error" role="alert">Per usare Valigia, abilita JavaScript nel browser. I tuoi dati restano su questo dispositivo.</p></noscript>
+        <p id="storage-error" class="message error" role="alert" hidden></p>
+
+        <section class="overview" aria-labelledby="overview-title">
+          <div class="overview-heading">
+            <h2 id="overview-title">A che punto sei?</h2>
+            <span class="overview-note">Tutte le categorie</span>
+          </div>
+          <dl class="totals">
+            <div class="metric">
+              <dt id="total-label">Unità totali</dt>
+              <dd><output id="total" data-testid="total" aria-labelledby="total-label">0</output></dd>
+            </div>
+            <div class="metric metric-packed">
+              <dt id="packed-label">Preparate</dt>
+              <dd><output id="packed" data-testid="packed" aria-labelledby="packed-label">0</output></dd>
+            </div>
+            <div class="metric">
+              <dt id="remaining-label">Da preparare</dt>
+              <dd><output id="remaining" data-testid="remaining" aria-labelledby="remaining-label">0</output></dd>
+            </div>
+          </dl>
+          <div class="progress-caption"><label for="packing-progress" id="progress-caption">La tua lista comincia qui.</label><span id="progress-percent">0%</span></div>
+          <progress id="packing-progress" max="1" value="0">0%</progress>
+        </section>
+
+        <div class="workspace">
+          <section class="panel add-panel" aria-labelledby="add-title">
+            <div class="section-heading"><span class="section-number" aria-hidden="true">01</span><h2 id="add-title">Cosa porti con te?</h2></div>
+            <p class="section-description">Un piccolo elenco, per non dimenticare nulla.</p>
+            <form id="add-form" novalidate>
+              <div class="field">
+                <label for="item-name">Nome oggetto</label>
+                <input id="item-name" name="name" type="text" required autocomplete="off" placeholder="Es. Il tuo maglione preferito" aria-describedby="name-hint add-error">
+                <small id="name-hint">Da 1 a 80 caratteri.</small>
+              </div>
+              <div class="form-pair">
+                <div class="field">
+                  <label for="item-quantity">Quantità</label>
+                  <input id="item-quantity" name="quantity" type="number" min="1" max="99" step="1" value="1" required inputmode="numeric" aria-describedby="quantity-hint add-error">
+                  <small id="quantity-hint">Da 1 a 99.</small>
+                </div>
+                <div class="field">
+                  <label for="item-category">Categoria</label>
+                  <input id="item-category" name="category" type="text" list="category-suggestions" autocomplete="off" placeholder="Es. Vestiti" aria-describedby="category-hint add-error">
+                  <datalist id="category-suggestions"></datalist>
+                  <small id="category-hint">Facoltativa, fino a 40 caratteri. Se vuota: Generale.</small>
+                </div>
+              </div>
+              <p id="add-error" class="message error" role="alert" hidden></p>
+              <button class="button button-primary add-button" type="submit"><span aria-hidden="true">＋</span> Aggiungi</button>
+            </form>
+            <p class="form-tip">Puoi aggiungere un oggetto anche con Invio.</p>
+          </section>
+
+          <section class="panel list-panel" aria-labelledby="list-title">
+            <div class="list-heading">
+              <div class="section-heading"><span class="section-number" aria-hidden="true">02</span><h2 id="list-title">Dentro la valigia</h2></div>
+              <span id="item-count" class="count-badge">0 oggetti</span>
+            </div>
+            <div class="filter-bar">
+              <div class="field filter-field">
+                <label for="category-filter">Filtra categoria</label>
+                <select id="category-filter" aria-describedby="filter-hint"><option value="">Tutte</option></select>
+              </div>
+              <p id="filter-hint">I totali in alto includono sempre tutta la lista.</p>
+            </div>
+            <p id="action-status" class="action-status" role="status" aria-live="polite" aria-atomic="true"></p>
+            <ul id="item-list" class="item-list" aria-labelledby="list-title" hidden></ul>
+            <div id="empty-state" class="empty-state">
+              <svg class="empty-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="38"/><path d="M31 27v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6M29 27v32M51 27v32M29 61v3M51 61v3"/><rect x="20" y="27" width="40" height="33" rx="6"/><path d="m33 43 5 5 10-11"/></svg>
+              <h3 id="empty-title">La valigia è ancora vuota</h3>
+              <p id="empty-description">Inizia dal primo oggetto. Poi spunta ciò che hai preparato: penseremo noi a contare.</p>
+              <button id="empty-action" class="button button-secondary" type="button">Aggiungi il primo oggetto</button>
+            </div>
+          </section>
+        </div>
+
+        <section class="panel backup-panel" aria-labelledby="backup-title">
+          <div class="backup-intro">
+            <p class="eyebrow">DA TENERE AL SICURO</p>
+            <h2 id="backup-title">Una copia per il viaggio.</h2>
+            <p>Esporta la lista e copia il testo in un file. Per recuperarla, incolla un backup e importalo.</p>
+            <p id="backup-hint" class="backup-warning">L’importazione di un backup valido sostituisce tutta la lista, anche se è vuoto. Un backup non valido lascia la lista intatta.</p>
+          </div>
+          <div class="backup-controls">
+            <div class="field">
+              <label for="backup-json">Backup JSON</label>
+              <textarea id="backup-json" rows="6" wrap="soft" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder='{"version":1,"items":[]}' aria-describedby="backup-hint backup-error"></textarea>
+            </div>
+            <p id="backup-error" class="message error" role="alert" hidden></p>
+            <p id="backup-status" class="backup-status" role="status" aria-live="polite" aria-atomic="true"></p>
+            <div class="backup-actions">
+              <button id="export-backup" class="button button-secondary" type="button">Esporta backup</button>
+              <button id="import-backup" class="button button-dark" type="button">Importa backup</button>
+            </div>
+          </div>
+        </section>
+      </main>
+
+      <footer class="site-footer">
+        <p id="storage-status" role="status">Controllo del salvataggio locale…</p>
+        <p>Nessun account. Nessuna fretta. Buon viaggio.</p>
+      </footer>
+    </div>
+  </body>
+</html>
diff --git a/src/app.mjs b/src/app.mjs
index 0a32dd9..788c03a 100644
--- a/src/app.mjs
+++ b/src/app.mjs
@@ -1 +1,357 @@
-document.querySelector('main').textContent='App da realizzare';
+import {
+  emptyList, addItem, updateItem, removeItem, summary, exportList, importList,
+} from './domain.mjs';
+
+const STORAGE_KEY = 'valigia.v1';
+const byId = id => document.getElementById(id);
+const form = byId('add-form');
+const nameInput = byId('item-name');
+const quantityInput = byId('item-quantity');
+const categoryInput = byId('item-category');
+const filter = byId('category-filter');
+const list = byId('item-list');
+const backup = byId('backup-json');
+const rows = new Map();
+let state = emptyList();
+let rowSequence = 0;
+
+function showError(element, message) {
+  element.textContent = message;
+  element.hidden = false;
+}
+
+function clearError(element) {
+  element.hidden = true;
+  element.textContent = '';
+}
+
+function announce(message) {
+  byId('action-status').textContent = message;
+}
+
+function loadState() {
+  let stored;
+  try {
+    // Access to localStorage itself can throw when browser storage is blocked.
+    stored = window.localStorage.getItem(STORAGE_KEY);
+  } catch {
+    showStorageFailure();
+    return;
+  }
+  if (stored === null) {
+    byId('storage-status').textContent = 'Salvataggio automatico locale attivo.';
+    return;
+  }
+  try {
+    state = importList(stored);
+    byId('storage-status').textContent = 'Lista recuperata da questo browser.';
+  } catch {
+    showError(byId('storage-error'), 'I dati locali non sono leggibili. La lista in memoria è vuota e i dati originali non sono stati sovrascritti. Puoi importare un backup valido o iniziare una nuova lista: la prima modifica sostituirà i dati locali.');
+    byId('storage-status').textContent = 'Dati locali non caricati. Nessuna modifica salvata.';
+  }
+  // Loading, filtering and exporting never write to storage.
+}
+
+function showStorageFailure() {
+  showError(byId('storage-error'), 'Il salvataggio locale non è disponibile: i dati non sono salvati. Puoi continuare a usare la lista in memoria, ma potresti perdere le modifiche alla chiusura o al ricaricamento. Esporta un backup e copialo in un file per conservarle.');
+  byId('storage-status').textContent = 'Dati non salvati · lista disponibile solo in memoria.';
+}
+
+function saveState() {
+  try {
+    window.localStorage.setItem(STORAGE_KEY, exportList(state));
+    clearError(byId('storage-error'));
+    byId('storage-status').textContent = 'Lista salvata in questo browser.';
+  } catch {
+    showStorageFailure();
+  }
+}
+
+function commit(nextState) {
+  state = nextState;
+  render();
+  // A storage failure must not roll back a successful in-memory operation.
+  saveState();
+}
+
+function renderSummary() {
+  const counts = summary(state);
+  for (const key of ['total', 'packed', 'remaining']) {
+    byId(key).textContent = String(counts[key]);
+  }
+  const percent = counts.total === 0 ? 0 : Math.floor(counts.packed / counts.total * 100);
+  const progress = byId('packing-progress');
+  progress.max = Math.max(counts.total, 1);
+  progress.value = counts.packed;
+  progress.textContent = `${percent}%`;
+  byId('progress-percent').textContent = `${percent}%`;
+  byId('progress-caption').textContent = counts.total === 0
+    ? 'La tua lista comincia qui.'
+    : counts.remaining === 0
+      ? 'Tutto pronto. Buon viaggio!'
+      : `${counts.packed} di ${counts.total} unità preparate`;
+}
+
+function renderCategories() {
+  const selected = filter.value;
+  const categories = [...new Set(state.items.map(item => item.category))]
+    .sort((a, b) => a.localeCompare(b, 'it'));
+  const all = document.createElement('option');
+  all.value = '';
+  all.textContent = 'Tutte';
+  const options = categories.map(category => {
+    const option = document.createElement('option');
+    option.value = category;
+    option.textContent = category;
+    return option;
+  });
+  filter.replaceChildren(all, ...options);
+  filter.value = categories.includes(selected) ? selected : '';
+
+  const suggestions = [...new Set([
+    'Generale', 'Vestiti', 'Tecnologia', 'Cura personale', 'Documenti', ...categories,
+  ])].sort((a, b) => a.localeCompare(b, 'it'));
+  byId('category-suggestions').replaceChildren(...suggestions.map(category => {
+    const option = document.createElement('option');
+    option.value = category;
+    return option;
+  }));
+}
+
+function createRow(id) {
+  const element = document.createElement('li');
+  element.className = 'item';
+  element.dataset.itemId = id;
+
+  const packedLabel = document.createElement('label');
+  packedLabel.className = 'packed-control';
+  const checkbox = document.createElement('input');
+  checkbox.type = 'checkbox';
+  const details = document.createElement('span');
+  details.className = 'item-details';
+  const name = document.createElement('span');
+  name.className = 'item-name';
+  const meta = document.createElement('span');
+  meta.className = 'item-meta';
+  const category = document.createElement('span');
+  category.className = 'category-tag';
+  const packedText = document.createElement('span');
+  packedText.className = 'packed-text';
+  meta.append(category, packedText);
+  details.append(name, meta);
+  packedLabel.append(checkbox, details);
+
+  const controls = document.createElement('div');
+  controls.className = 'item-controls';
+  const quantityLabel = document.createElement('label');
+  quantityLabel.className = 'item-quantity-label';
+  const quantityCaption = document.createElement('span');
+  quantityCaption.textContent = 'Quantità';
+  const quantity = document.createElement('input');
+  quantity.type = 'number';
+  quantity.min = '1';
+  quantity.max = '99';
+  quantity.step = '1';
+  quantity.required = true;
+  quantity.inputMode = 'numeric';
+  quantityLabel.append(quantityCaption, quantity);
+  const remove = document.createElement('button');
+  remove.type = 'button';
+  remove.className = 'button button-delete';
+  remove.textContent = 'Elimina';
+  controls.append(quantityLabel, remove);
+
+  const error = document.createElement('p');
+  error.className = 'message error row-error';
+  error.id = `row-error-${++rowSequence}`;
+  error.setAttribute('role', 'alert');
+  error.hidden = true;
+  quantity.setAttribute('aria-describedby', error.id);
+  checkbox.setAttribute('aria-describedby', error.id);
+  element.append(packedLabel, controls, error);
+
+  const row = {element, checkbox, name, category, packedText, quantity, remove, error};
+  checkbox.addEventListener('change', () => {
+    clearError(error);
+    try {
+      const next = updateItem(state, id, {packed: checkbox.checked});
+      const item = next.items.find(item => item.id === id);
+      commit(next);
+      announce(`${item.name}: ${item.packed ? 'preparato' : 'da preparare'}.`);
+    } catch (problem) {
+      checkbox.checked = state.items.find(item => item.id === id)?.packed ?? false;
+      showError(error, problem.message);
+    }
+  });
+
+  function changeQuantity() {
+    clearError(error);
+    const current = state.items.find(item => item.id === id);
+    if (!current) return;
+    try {
+      const next = updateItem(state, id, {quantity: quantity.valueAsNumber});
+      if (current.quantity !== quantity.valueAsNumber) {
+        commit(next);
+        announce(`Quantità aggiornata per ${current.name}.`);
+      }
+    } catch (problem) {
+      quantity.value = String(current.quantity);
+      showError(error, `${problem.message} È stata mantenuta la quantità ${current.quantity}.`);
+    }
+  }
+  quantity.addEventListener('change', changeQuantity);
+  quantity.addEventListener('keydown', event => {
+    if (event.key === 'Enter') {
+      event.preventDefault();
+      changeQuantity();
+    }
+  });
+
+  remove.addEventListener('click', () => {
+    const current = state.items.find(item => item.id === id);
+    const visibleIds = [...list.children].map(element => element.dataset.itemId);
+    const index = visibleIds.indexOf(id);
+    const focusId = visibleIds[index + 1] ?? visibleIds[index - 1];
+    try {
+      const next = removeItem(state, id);
+      commit(next);
+      announce(`Eliminato: ${current.name}.`);
+      (rows.get(focusId)?.checkbox ?? rows.values().next().value?.checkbox ?? nameInput).focus();
+    } catch (problem) {
+      showError(error, problem.message);
+    }
+  });
+  return row;
+}
+
+function updateRow(row, item) {
+  // User content is always assigned as text or a DOM property, never as HTML.
+  row.name.textContent = item.name;
+  row.category.textContent = item.category;
+  row.packedText.textContent = item.packed ? 'Preparato' : 'Da preparare';
+  row.checkbox.checked = item.packed;
+  row.checkbox.setAttribute('aria-label', `Preparato: ${item.name}`);
+  row.quantity.setAttribute('aria-label', `Quantità: ${item.name}`);
+  row.remove.setAttribute('aria-label', `Elimina: ${item.name}`);
+  row.element.classList.toggle('is-packed', item.packed);
+  if (row.quantity.value !== String(item.quantity)) row.quantity.value = String(item.quantity);
+}
+
+function renderList() {
+  const visible = state.items.filter(item => filter.value === '' || item.category === filter.value);
+  const visibleIds = new Set(visible.map(item => item.id));
+  for (const [id, row] of rows) {
+    if (!visibleIds.has(id)) {
+      row.element.remove();
+      rows.delete(id);
+    }
+  }
+  // Keep existing controls in place so editing and checking do not lose focus.
+  let position = list.firstElementChild;
+  for (const item of visible) {
+    let row = rows.get(item.id);
+    if (!row) {
+      row = createRow(item.id);
+      rows.set(item.id, row);
+    }
+    updateRow(row, item);
+    if (row.element !== position) list.insertBefore(row.element, position);
+    position = row.element.nextElementSibling;
+  }
+  list.hidden = visible.length === 0;
+  byId('empty-state').hidden = visible.length !== 0;
+  byId('item-count').textContent = filter.value === ''
+    ? `${state.items.length} ${state.items.length === 1 ? 'oggetto' : 'oggetti'}`
+    : `${visible.length} di ${state.items.length} oggetti`;
+
+  const isEmpty = state.items.length === 0;
+  byId('empty-title').textContent = isEmpty ? 'La valigia è ancora vuota' : 'Nessun oggetto in questa categoria';
+  byId('empty-description').textContent = isEmpty
+    ? 'Inizia dal primo oggetto. Poi spunta ciò che hai preparato: penseremo noi a contare.'
+    : 'Scegli Tutte per ritrovare gli oggetti delle altre categorie, oppure aggiungine uno nuovo.';
+  byId('empty-action').textContent = isEmpty ? 'Aggiungi il primo oggetto' : 'Mostra tutte le categorie';
+}
+
+function render() {
+  renderSummary();
+  renderCategories();
+  renderList();
+}
+
+form.addEventListener('submit', event => {
+  event.preventDefault();
+  clearError(byId('add-error'));
+  for (const input of [nameInput, quantityInput, categoryInput]) input.removeAttribute('aria-invalid');
+  try {
+    const input = {name: nameInput.value, quantity: quantityInput.valueAsNumber};
+    if (categoryInput.value.trim() !== '') input.category = categoryInput.value;
+    const next = addItem(state, input);
+    const added = next.items.at(-1);
+    commit(next);
+    nameInput.value = '';
+    quantityInput.value = '1';
+    const hiddenByFilter = filter.value !== '' && filter.value !== added.category;
+    announce(`Aggiunto: ${added.name}.${hiddenByFilter ? ' Scegli Tutte nel filtro per vederlo.' : ''}`);
+    nameInput.focus();
+  } catch (problem) {
+    showError(byId('add-error'), problem.message);
+    const input = problem.message.startsWith('Quantità') ? quantityInput
+      : problem.message.startsWith('Categoria') ? categoryInput
+        : problem.message.startsWith('Nome oggetto') ? nameInput : null;
+    if (input) {
+      input.setAttribute('aria-invalid', 'true');
+      input.focus();
+    } else {
+      byId('add-error').tabIndex = -1;
+      byId('add-error').focus();
+    }
+  }
+});
+
+filter.addEventListener('change', () => {
+  renderList();
+  announce(filter.value === '' ? 'Mostrate tutte le categorie.' : `Categoria: ${filter.value}. I totali restano globali.`);
+});
+
+byId('empty-action').addEventListener('click', () => {
+  if (state.items.length === 0) {
+    nameInput.focus();
+  } else {
+    filter.value = '';
+    renderList();
+    filter.focus();
+  }
+});
+
+byId('export-backup').addEventListener('click', () => {
+  clearError(byId('backup-error'));
+  backup.removeAttribute('aria-invalid');
+  backup.value = exportList(state);
+  byId('backup-status').textContent = 'Backup pronto. Copia il testo e conservalo in un file: il campo da solo non è una copia permanente.';
+  backup.focus();
+  backup.select();
+});
+
+byId('import-backup').addEventListener('click', () => {
+  clearError(byId('backup-error'));
+  byId('backup-status').textContent = '';
+  backup.removeAttribute('aria-invalid');
+  let imported;
+  try {
+    // Validate every row before replacing state, changing filters or saving.
+    imported = importList(backup.value);
+  } catch (problem) {
+    showError(byId('backup-error'), `Importazione non riuscita. ${problem.message} La lista corrente è rimasta intatta.`);
+    backup.setAttribute('aria-invalid', 'true');
+    backup.focus();
+    return;
+  }
+  for (const row of rows.values()) clearError(row.error);
+  filter.value = '';
+  commit(imported);
+  byId('backup-status').textContent = 'Importazione completata: la lista è stata sostituita con il backup.';
+  announce('Lista importata. Sono visibili tutte le categorie.');
+});
+
+loadState();
+render();
diff --git a/src/domain.mjs b/src/domain.mjs
index 16742e7..f846045 100644
--- a/src/domain.mjs
+++ b/src/domain.mjs
@@ -1,7 +1,180 @@
-export function emptyList(){ return {version:1,items:[]}; }
-export function addItem(){throw new Error('Da implementare');}
-export function updateItem(){throw new Error('Da implementare');}
-export function removeItem(){throw new Error('Da implementare');}
-export function summary(){throw new Error('Da implementare');}
-export function exportList(){throw new Error('Da implementare');}
-export function importList(){throw new Error('Da implementare');}
+const VERSION = 1;
+const MAX_ITEMS = 500;
+const ITEM_FIELDS = ['id', 'name', 'quantity', 'category', 'packed'];
+const EDITABLE_FIELDS = ['name', 'quantity', 'category', 'packed'];
+const ADD_FIELDS = ['name', 'quantity', 'category'];
+const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
+let idSequence = 0;
+
+function assertFields(value, allowed, required, label) {
+  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
+    throw new Error(`${label}: deve essere un oggetto.`);
+  }
+  for (const key of Reflect.ownKeys(value)) {
+    if (!allowed.includes(key)) {
+      throw new Error(`${label}: campo non consentito.`);
+    }
+  }
+  for (const key of required) {
+    if (!hasOwn(value, key)) {
+      throw new Error(`${label}: manca il campo ${key}.`);
+    }
+  }
+}
+
+function cleanText(value, maximum, label) {
+  if (typeof value !== 'string') {
+    throw new Error(`${label}: inserisci un testo.`);
+  }
+  const cleaned = value.trim();
+  // Count Unicode code points; keep accents, emoji and HTML-like text intact.
+  const length = [...cleaned].length;
+  if (length < 1 || length > maximum) {
+    throw new Error(`${label}: usa da 1 a ${maximum} caratteri.`);
+  }
+  return cleaned;
+}
+
+function assertQuantity(quantity) {
+  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
+    throw new Error('Quantità: inserisci un numero intero da 1 a 99.');
+  }
+}
+
+function assertId(id) {
+  if (typeof id !== 'string' || id.trim().length === 0 || id.length > 100) {
+    throw new Error('ID: deve essere un testo non vuoto di massimo 100 caratteri.');
+  }
+}
+
+function assertItem(item) {
+  assertFields(item, ITEM_FIELDS, ITEM_FIELDS, 'Oggetto');
+  assertId(item.id);
+  // Stored data and backups must already be canonical: never repair imports.
+  if (cleanText(item.name, 80, 'Nome oggetto') !== item.name) {
+    throw new Error('Nome oggetto: rimuovi gli spazi iniziali e finali.');
+  }
+  if (cleanText(item.category, 40, 'Categoria') !== item.category) {
+    throw new Error('Categoria: rimuovi gli spazi iniziali e finali.');
+  }
+  assertQuantity(item.quantity);
+  if (typeof item.packed !== 'boolean') {
+    throw new Error('Preparato: il valore deve essere booleano.');
+  }
+}
+
+function assertState(state) {
+  assertFields(state, ['version', 'items'], ['version', 'items'], 'Lista');
+  if (state.version !== VERSION) {
+    throw new Error('Versione della lista non supportata.');
+  }
+  if (!Array.isArray(state.items) || state.items.length > MAX_ITEMS) {
+    throw new Error('La lista deve contenere un elenco di massimo 500 oggetti.');
+  }
+  const ids = new Set();
+  for (const item of state.items) {
+    assertItem(item);
+    if (ids.has(item.id)) {
+      throw new Error('La lista contiene ID duplicati.');
+    }
+    ids.add(item.id);
+  }
+}
+
+function createId(items) {
+  const ids = new Set(items.map(item => item.id));
+  let id;
+  // The sequence also avoids collisions when imports contain generated IDs.
+  do {
+    idSequence += 1;
+    id = `item-${Date.now().toString(36)}-${idSequence.toString(36)}`;
+  } while (ids.has(id));
+  return id;
+}
+
+function findItemIndex(state, id) {
+  assertId(id);
+  const index = state.items.findIndex(item => item.id === id);
+  if (index === -1) {
+    throw new Error('Oggetto non trovato nella lista.');
+  }
+  return index;
+}
+
+export function emptyList() {
+  return {version: VERSION, items: []};
+}
+
+export function addItem(state, input) {
+  assertState(state);
+  assertFields(input, ADD_FIELDS, ['name', 'quantity'], 'Nuovo oggetto');
+  if (state.items.length >= MAX_ITEMS) {
+    throw new Error('La lista può contenere al massimo 500 oggetti.');
+  }
+  const name = cleanText(input.name, 80, 'Nome oggetto');
+  const category = hasOwn(input, 'category')
+    ? cleanText(input.category, 40, 'Categoria')
+    : 'Generale';
+  assertQuantity(input.quantity);
+  const item = {
+    id: createId(state.items),
+    name,
+    quantity: input.quantity,
+    category,
+    packed: false,
+  };
+  return {version: VERSION, items: [...state.items, item]};
+}
+
+export function updateItem(state, id, patch) {
+  assertState(state);
+  const index = findItemIndex(state, id);
+  assertFields(patch, EDITABLE_FIELDS, [], 'Modifica');
+  const item = {...state.items[index], ...patch};
+  if (hasOwn(patch, 'name')) {
+    item.name = cleanText(patch.name, 80, 'Nome oggetto');
+  }
+  if (hasOwn(patch, 'category')) {
+    item.category = cleanText(patch.category, 40, 'Categoria');
+  }
+  assertItem(item);
+  const items = state.items.slice();
+  items[index] = item;
+  return {version: VERSION, items};
+}
+
+export function removeItem(state, id) {
+  assertState(state);
+  const index = findItemIndex(state, id);
+  return {version: VERSION, items: state.items.filter((item, i) => i !== index)};
+}
+
+export function summary(state) {
+  assertState(state);
+  let total = 0;
+  let packed = 0;
+  for (const item of state.items) {
+    total += item.quantity;
+    if (item.packed) packed += item.quantity;
+  }
+  return {total, packed, remaining: total - packed};
+}
+
+export function exportList(state) {
+  assertState(state);
+  return JSON.stringify(state, null, 2);
+}
+
+export function importList(jsonText) {
+  if (typeof jsonText !== 'string') {
+    throw new Error('Backup JSON: inserisci un testo JSON.');
+  }
+  let state;
+  try {
+    state = JSON.parse(jsonText);
+  } catch {
+    throw new Error('Backup JSON non valido: controlla la sintassi.');
+  }
+  assertState(state);
+  return state;
+}
diff --git a/style.css b/style.css
index bb411b1..ff77077 100644
--- a/style.css
+++ b/style.css
@@ -1 +1,195 @@
-body{font-family:system-ui}
+@charset "UTF-8";
+
+:root {
+  color-scheme: light;
+  --paper: #f6f5ef;
+  --card: #ffffff;
+  --ink: #23382e;
+  --muted: #5e6c63;
+  --line: #dce2d8;
+  --green: #2f6447;
+  --lime: #dbedac;
+  --soft-green: #f0f5e8;
+  --error: #8d2925;
+  --error-bg: #fff1ed;
+  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
+  font-size: 16px;
+  line-height: 1.5;
+  color: var(--ink);
+  background: var(--paper);
+}
+
+* { box-sizing: border-box; }
+[hidden] { display: none !important; }
+body { margin: 0; }
+button, input, select, textarea { font: inherit; }
+button, input, select, textarea, progress { max-width: 100%; }
+button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
+button { cursor: pointer; }
+input, select, textarea { min-width: 0; }
+input, select, textarea, button { border-radius: 9px; }
+a { color: inherit; }
+h1, h2, h3, p, dl, dd { margin: 0; }
+h1, h2, h3 { text-wrap: balance; }
+h2 { font-size: 1.15rem; font-weight: 700; line-height: 1.35; letter-spacing: -.025em; }
+svg { display: block; }
+:focus-visible { outline: 3px solid #426bba; outline-offset: 4px; }
+main:focus { outline: none; }
+
+.page-shell { width: min(1120px, calc(100% - 64px)); margin: 0 auto; }
+.skip-link { position: fixed; top: 12px; left: 12px; z-index: 10; padding: 12px 18px; border-radius: 8px; background: var(--ink); color: white; transform: translateY(-160%); }
+.skip-link:focus { transform: none; }
+.site-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 104px; border-bottom: 1px solid var(--line); }
+.brand { display: inline-flex; align-items: center; gap: 11px; font-weight: 750; font-size: 1.6rem; letter-spacing: -.06em; text-decoration: none; }
+.brand-icon { display: grid; place-items: center; width: 42px; height: 46px; border-radius: 13px; background: var(--lime); }
+.brand-icon svg { width: 29px; stroke: var(--ink); stroke-width: 1.7; stroke-linecap: round; }
+.brand-dot { color: var(--green); }
+.local-badge { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: .78rem; }
+.local-badge > span { width: 7px; height: 7px; flex-shrink: 0; border-radius: 50%; background: var(--green); }
+.intro { padding: 41px 0 30px; }
+.eyebrow { font-size: .68rem; font-weight: 750; letter-spacing: .14em; color: var(--green); }
+h1 { margin-top: 11px; font-size: clamp(2rem, 4.1vw, 3rem); line-height: 1.15; font-weight: 700; letter-spacing: -.055em; }
+h1 span { color: #65725f; }
+.intro > p:last-child { color: var(--muted); margin-top: 14px; font-size: .95rem; }
+
+.overview { padding: 24px 28px 26px; margin-bottom: 26px; border: 1px solid #cfdcbd; border-radius: 18px; background: #edf2df; }
+.overview-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
+.overview-heading h2 { font-size: .94rem; }
+.overview-note { font-size: .74rem; color: #53634a; }
+.totals { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 23px 0 20px; }
+.metric { display: flex; flex-direction: column; padding-left: 26px; border-left: 1px solid #cbd6ba; }
+.metric:first-child { padding-left: 0; border-left: none; }
+.metric dt { color: #53634a; font-size: .8rem; }
+.metric dd { font-size: 2.5rem; line-height: 1.25; letter-spacing: -.05em; font-variant-numeric: tabular-nums; font-weight: 650; }
+.metric-packed dd { color: var(--green); }
+.progress-caption { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 8px; color: #53634a; font-size: .75rem; }
+#progress-percent { font-variant-numeric: tabular-nums; font-weight: 700; }
+progress { display: block; appearance: none; width: 100%; height: 7px; overflow: hidden; border: none; border-radius: 5px; background: #d8e1c6; accent-color: var(--green); }
+progress::-webkit-progress-bar { background: #d8e1c6; border-radius: 5px; }
+progress::-webkit-progress-value { background: var(--green); border-radius: 5px; }
+progress::-moz-progress-bar { background: var(--green); border-radius: 5px; }
+
+.workspace { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.4fr); align-items: start; gap: 24px; }
+.panel { min-width: 0; padding: 26px; background: var(--card); border: 1px solid var(--line); border-radius: 18px; box-shadow: 0 3px 12px #23382e03; }
+.section-heading { display: flex; align-items: center; gap: 10px; min-width: 0; }
+.section-number { font-size: .66rem; font-weight: 700; color: #5c6f50; background: var(--soft-green); border: 1px solid #e0e8d5; padding: 4px 6px; border-radius: 6px; }
+.section-description { margin: 10px 0 24px; color: var(--muted); font-size: .84rem; }
+.field { display: flex; min-width: 0; flex-direction: column; gap: 7px; }
+.field > label { font-size: .81rem; font-weight: 650; }
+input[type="text"], input[type="number"], select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #bfcbbf; color: var(--ink); background: #fff; box-shadow: 0 1px 2px #23382e03; }
+input[type="text"], input[type="number"], select { min-height: 45px; }
+input::placeholder, textarea::placeholder { color: #778177; opacity: 1; }
+input:hover, select:hover, textarea:hover { border-color: #82967e; }
+input:focus, select:focus, textarea:focus { border-color: var(--green); }
+input[aria-invalid="true"], textarea[aria-invalid="true"] { border-color: var(--error); }
+small { color: var(--muted); font-size: .7rem; line-height: 1.5; }
+.form-pair { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 15px; margin-top: 19px; }
+.button { display: inline-flex; justify-content: center; align-items: center; gap: 7px; min-height: 44px; padding: 10px 17px; border: 1px solid transparent; font-size: .83rem; line-height: 1.4; font-weight: 650; text-align: center; transition: background-color .12s; }
+.button-primary { background: var(--green); color: #fff; }
+.button-primary:hover { background: #245038; }
+.add-button { width: 100%; margin-top: 24px; }
+.add-button > span { font-size: 1.15rem; font-weight: 400; line-height: 1; }
+.button-secondary { background: #fff; border-color: #bfcbbf; color: var(--ink); }
+.button-secondary:hover { background: var(--soft-green); }
+.button-dark { background: var(--ink); color: #fff; }
+.button-dark:hover { background: #35523f; }
+.form-tip { color: var(--muted); font-size: .7rem; text-align: center; margin-top: 11px; }
+
+.list-panel { min-height: 431px; }
+.list-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
+.count-badge { border: 1px solid #e4e8df; background: #f6f7f2; padding: 4px 9px; border-radius: 20px; font-size: .7rem; color: var(--muted); }
+.filter-bar { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .85fr); align-items: end; gap: 20px; margin-top: 23px; padding-bottom: 17px; border-bottom: 1px solid #e5e9e1; }
+.filter-bar > p { color: var(--muted); font-size: .71rem; padding-bottom: 4px; }
+.action-status { color: var(--green); font-size: .76rem; overflow-wrap: anywhere; }
+.action-status:not(:empty) { margin-top: 14px; }
+.item-list { list-style: none; padding: 0; margin: 4px 0 0; }
+.item { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; padding: 17px 0; border-bottom: 1px solid #e5e9e1; }
+.item:last-child { border-bottom: none; padding-bottom: 0; }
+.packed-control { display: flex; align-items: center; gap: 12px; min-width: 0; cursor: pointer; }
+.packed-control > input { appearance: auto; flex: 0 0 22px; width: 22px; height: 22px; margin: 0; accent-color: var(--green); cursor: pointer; }
+.item-details { display: flex; flex-direction: column; gap: 7px; min-width: 0; overflow-wrap: anywhere; }
+.item-name { font-size: .9rem; font-weight: 650; }
+.item-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 5px 9px; font-size: .65rem; color: var(--muted); }
+.category-tag { padding: 2px 7px; background: #f0f2ed; border-radius: 5px; }
+.packed-text { font-size: .65rem; }
+.is-packed .item-name { text-decoration: line-through; text-decoration-thickness: 1px; color: #62735f; }
+.is-packed .packed-text { color: var(--green); font-weight: 650; }
+.item-controls { display: flex; align-items: center; gap: 10px; }
+.item-quantity-label { display: flex; flex-direction: column; gap: 4px; width: 70px; }
+.item-quantity-label > span { font-size: .65rem; color: var(--muted); }
+.item-quantity-label > input { padding: 8px; font-size: .85rem; }
+.button-delete { align-self: end; padding: 8px 9px; color: #82483e; background: #faf5f1; font-size: .71rem; }
+.button-delete:hover { background: #f9e6df; }
+.empty-state { display: flex; flex-direction: column; align-items: center; padding: 30px 12px 12px; text-align: center; }
+.empty-icon { width: 74px; height: 74px; margin-bottom: 16px; stroke: #6a825a; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
+.empty-icon circle { fill: #f2f6e9; stroke: none; }
+.empty-state h3 { font-size: .95rem; }
+.empty-state p { max-width: 300px; margin-top: 8px; color: var(--muted); font-size: .8rem; }
+.empty-state .button { margin-top: 19px; font-size: .76rem; }
+
+.backup-panel { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.4fr); gap: 52px; margin-top: 25px; padding: 28px; }
+.backup-intro h2 { margin-top: 9px; font-size: 1.3rem; }
+.backup-intro > p:not(.eyebrow) { color: var(--muted); font-size: .82rem; margin-top: 12px; }
+.backup-intro .backup-warning { font-size: .74rem !important; padding-left: 12px; border-left: 2px solid #c8d8ad; }
+.backup-controls { min-width: 0; }
+textarea { display: block; resize: vertical; min-height: 132px; line-height: 1.5; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .75rem; }
+.backup-actions { display: flex; gap: 10px; margin-top: 13px; flex-wrap: wrap; }
+.backup-status { color: var(--green); font-size: .76rem; }
+.backup-status:not(:empty) { margin-top: 11px; }
+.message { overflow-wrap: anywhere; padding: 13px 15px; margin: 14px 0; border-radius: 9px; font-size: .8rem; }
+.error { color: var(--error); background: var(--error-bg); border: 1px solid #e7bdb1; }
+.row-error { grid-column: 1 / -1; margin: 0; }
+.site-footer { display: flex; justify-content: space-between; gap: 14px; margin: 25px 0 28px; color: var(--muted); font-size: .7rem; }
+
+@media (max-width: 900px) {
+  .page-shell { width: calc(100% - 40px); }
+  .workspace { grid-template-columns: minmax(0, .9fr) minmax(0, 1.2fr); gap: 18px; }
+  .panel { padding: 20px; }
+  .filter-bar { grid-template-columns: minmax(0, 1fr); gap: 8px; }
+  .item { grid-template-columns: minmax(0, 1fr); }
+  .item-controls { margin-left: 34px; justify-content: space-between; }
+  .item-quantity-label { flex-direction: row; align-items: center; gap: 9px; width: auto; }
+  .item-quantity-label > input { width: 68px; }
+  .backup-panel { gap: 30px; }
+}
+
+@media (max-width: 680px) {
+  .page-shell { width: calc(100% - 32px); }
+  .site-header { min-height: 83px; flex-wrap: wrap; padding: 17px 0; gap: 12px; }
+  .brand { font-size: 1.4rem; }
+  .brand-icon { width: 36px; height: 40px; }
+  .brand-icon svg { width: 26px; }
+  .local-badge { font-size: .65rem; gap: 5px; }
+  .intro { padding: 31px 0 25px; }
+  h1 { font-size: clamp(1.85rem, 6.5vw, 2.5rem); }
+  .intro > p:last-child { font-size: .85rem; }
+  .overview { padding: 20px; margin-bottom: 18px; border-radius: 15px; }
+  .overview-heading { align-items: baseline; }
+  .overview-heading h2 { font-size: .85rem; }
+  .overview-note { font-size: .66rem; }
+  .totals { margin: 19px 0; }
+  .metric { padding-left: 16px; }
+  .metric dt { font-size: .69rem; }
+  .metric dd { font-size: 2rem; }
+  .progress-caption { font-size: .68rem; }
+  .workspace, .backup-panel { grid-template-columns: minmax(0, 1fr); gap: 18px; }
+  .panel { border-radius: 15px; }
+  .list-panel { min-height: 0; }
+  .section-description { margin-bottom: 20px; }
+  .form-pair { grid-template-columns: 84px minmax(0, 1fr); }
+  .filter-bar { margin-top: 19px; }
+  .item { gap: 11px; padding: 18px 0; }
+  .item-name { font-size: .94rem; }
+  .item-controls { margin-left: 34px; }
+  .item-quantity-label > span { font-size: .73rem; }
+  .button-delete { font-size: .78rem; padding: 10px 12px; }
+  .empty-state { padding: 25px 5px 10px; }
+  .backup-panel { margin-top: 18px; }
+  .backup-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
+  .backup-actions .button { padding: 10px 8px; font-size: .77rem; }
+  .site-footer { flex-direction: column; gap: 5px; margin-top: 21px; }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  *, *::before, *::after { transition: none !important; scroll-behavior: auto !important; }
+}
```
