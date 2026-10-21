# Morning Brief — COMPLETED

**Provider: real Codex SDK.**

Original goal: Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione.

Current delegated outcome: Dati affidabili per progetti e attività
Implementare API e persistenza di progetti e attività, filtri, date e revisioni ottimistiche. Fare controllare i due criteri host e lasciare una base coerente. Non implementare ancora pianificazione, sessioni o backup. Interfaccia minima solo se serve per avviare l’app.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

Current contract: v1 — Realizzare Svolta, app locale in italiano per piccoli progetti personali, attività, pianificazione settimanale e tempo dedicato, con backup portabile e gestione coerente degli errori. Consegnare un prodotto utilizzabile su desktop e mobile e una guida onesta. Seguire il contratto pubblico BRIEF.md. Scegliere autonomamente i dettagli reversibili; non introdurre account, servizi, dipendenze o pubblicazione.

Current delegated outcome: Dati affidabili per progetti e attività
Implementare API e persistenza di progetti e attività, filtri, date e revisioni ottimistiche. Fare controllare i due criteri host e lasciare una base coerente. Non implementare ancora pianificazione, sessioni o backup. Interfaccia minima solo se serve per avviare l’app.
Complete this outcome and preserve earlier verified behavior. Subsequent outcomes remain delegated to the host.

2/2 criteria deterministically verified; 0 AI-assessed. 0 still open.

- [x] Archivio progetti persistente e revisioni — PASSED ([evidence](#evidence-d50c766f-671c-406f-a5a3-9cfde4cc9a92))
- [x] Attività, filtri e conflitti senza perdita di dati — PASSED ([evidence](#evidence-c1bec71d-4fbf-4965-bb8c-78fd23c28a26))

## Project direction

Focus (plan): Completare l’esito «Dati affidabili per progetti e attività» secondo BRIEF.md. Il repository contiene soltanto un server che risponde 404; entrambi i criteri sono pendenti e non esistono prove correnti. Pianificazione, sessioni, backup e interfaccia completa restano agli esiti successivi.
Next artifact (target, not proof): Una prima versione esaminabile dell’archivio progetti: avvio conforme, persistenza dopo riavvio, API GET/POST/PATCH, archiviazione e conflitti di revisione senza sovrascritture.
Direction v1; contract v1; planning, not runtime acceptance.

- request: Delegation de2c27e8-446b-492c-9825-2f2abe2e0e57; approval 5d7cd586ae6b062d7b629a44922cdcc950eab6b707c6308ad0689b06fd7b597e; outcome reliable-foundation.
Previous checkpoint 595658b48b6d7118f46d604f4d011f681217aaf8. Historical evidence is context only; this new mission must obtain fresh proof.
This is the first delegated mission.
  - Recorded instruction: 1ae4353d-5029-4737-a9a4-1129892ce1da; 2026-10-20T20:50:56.244Z.
  - Disposition (planning, not runtime acceptance): applied: La delega reliable-foundation delimita il piano a progetti e attività. Il checkpoint storico è solo contesto: dopo l’implementazione serviranno nuove verifiche host projects-api e tasks-api, richieste tramite verificationRequest. Nessun successo è attualmente attestato..
  - Reconciliation: direction v1; contract v1; node 81303cda-10b1-4413-8664-791e9d5439aa; planning only.
- Provisional assumption: Per i volumi personali previsti dovrebbe bastare un archivio JSON con sostituzione atomica e mutazioni serializzate; la scelta resta provvisoria fino alla verifica dell’implementazione.

## What changed

### Autonomous project development

2 project checkpoints; 1 implementation units discovered without a new operator prompt.
Project reviews are AI judgments from the same integration, separate from runtime acceptance evidence.
- continue: La revisione dei sorgenti non evidenzia ulteriori lacune funzionali nella delega corrente; entrambi i criteri risultano superati nelle ricevute host. Resta da correggere il resoconto delle verifiche nel README.
  - Observed goal gap: README.md, nella sezione «Stato delle verifiche», dichiara ancora assenti gli esiti host e non osservati ascolto HTTP, annuncio della porta e riavvio. Le ricevute correnti riportano invece PASS per projects-api e tasks-api, sei gruppi ciascuno. La guida non rappresenta lo stato effettivo della consegna. (README.md)
  - Provisional autonomous choice: Limitare il lavoro residuo all’allineamento della documentazione. — Persistenza, validazione, filtri, date civili e revisioni risultano coerenti all’ispezione; le ricevute correnti coprono entrambi i criteri delegati.
  - Provisional autonomous choice: Lasciare interfaccia completa, pianificazione, sessioni e backup agli esiti successivi. — Il contratto e il contesto operatore delimitano esplicitamente questa consegna alle API di progetti e attività.
- ready: La delega «Dati affidabili per progetti e attività» è pronta per la revisione dell’operatore. L’ispezione dei sorgenti non rileva lacune concrete residue; entrambi i criteri hanno ricevute host PASS e il README rappresenta correttamente funzionalità, verifiche e limiti.
  - Provisional autonomous choice: Considerare completata la base API delegata. — I sorgenti implementano persistenza atomica, validazione, filtri combinati, date civili e revisioni serializzate. Le ricevute correnti d50c766f-671c-406f-a5a3-9cfde4cc9a92 e c1bec71d-4fbf-4965-bb8c-78fd23c28a26 riportano PASS per projects-api e tasks-api, sei gruppi ciascuno.
  - Provisional autonomous choice: Considerare risolta la precedente lacuna documentale. — README.md riporta entrambi i PASS host, la copertura osservata e la distinzione dai controlli locali dichiarati; esplicita inoltre l’assenza di collaudi browser, desktop e mobile.
  - Provisional autonomous choice: Lasciare interfaccia completa, pianificazione, sessioni e backup agli esiti successivi. — BRIEF.md e il contesto operatore delimitano esplicitamente questa consegna alle API di progetti e attività. L’assenza delle funzioni successive è documentata.


- Technical interruption (turn-timeout): turn-timeout: The operation was aborted due to timeout. Process group joined: yes. Automatic retry at 2026-10-20T21:13:05.324Z, within original limits.
No corrective tasks recorded.
- 3 preliminary command observations were not yet satisfied while implementation remained; these did not consume corrective retries.

## Problems and decisions

- Event 9: Project direction updated. Unstarted work replaced; independent work can continue while operator questions wait.
- Event 19: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 29: Evidence is STALE: README.md, src/app.mjs, src/archive.mjs, src/dates.mjs, src/tasks.mjs. Scope: all repository files.
- Event 31: Builder handed verification to the runtime host. Agent-local check limitations are unverified observations; only approved runtime checks can certify results.
- Event 41: Automatic technical recovery 1/2; previous process group joined, worktree audited, original limits retained.
- Event 45: Project supervisor discovered 1 next implementation unit(s) from the result.
- Event 50: Evidence is STALE: README.md. Scope: all repository files.
- Event 51: Evidence is STALE: README.md. Scope: all repository files.
- Event 63: Project supervisor considers the goal ready for operator review; this is an AI judgment, not independent proof.

## What needs attention

No open acceptance criterion. Review the diff before integrating changes.

## Resources and worktree

1455 seconds elapsed; 7 agent turns; 1192620 reported tokens. Cost not measured. Interrupted-turn usage may be unavailable.

Repository: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/source
Branch: iterfox/20261020T205056-641e33a8
Worktree: /Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8

## Evidence

<a id="evidence-08dd668a-edf7-4c40-b3a6-f909614b8811"></a>
### projects-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 1; duration: 410ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 01f78f59ad8edcbe291b80b52debd6d16ea67c98c50df68bd155d04d799d7154
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: GET /api/projects: {"error":"Not implemented"}

404 !== 200

    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:34:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:11:59
    at async check (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:7:31)
    at async projects-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:11:5)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:1 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 404,
  expected: 200,
  operator: 'strictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-8bf7dec4-cfea-4b75-b2c6-7678ad759d01"></a>
### tasks-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 1; duration: 371ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 01f78f59ad8edcbe291b80b52debd6d16ea67c98c50df68bd155d04d799d7154
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: POST /api/projects: {"error":"Not implemented"}

404 !== 201

    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:34:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async tasks-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:22:47)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:1 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 404,
  expected: 201,
  operator: 'strictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-08ddf1d7-4230-4a26-a9ff-1ed0b057b6a1"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1316ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 2a1e311317bf81e9e1c0b03c5dd43ff278c57b5cc0d928326861ae1d3c77cbdb
Scope: all repository files

Evidence is STALE: README.md, src/app.mjs, src/archive.mjs, src/dates.mjs, src/tasks.mjs. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-1d081c31-2df1-4435-9ac4-00da81b1e3a9"></a>
### tasks-api — RECORDED (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 1; duration: 273ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 2a1e311317bf81e9e1c0b03c5dd43ff278c57b5cc0d928326861ae1d3c77cbdb
Scope: all repository files

```text
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^

AssertionError [ERR_ASSERTION]: POST /api/tasks: {"error":"Indirizzo non trovato.","code":"NOT_FOUND"}

404 !== 201

    at api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:34:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async tasks-api (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:23:13)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:49
    at async appTest (file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/harness.mjs:42:28)
    at async file:///Users/vins/work/iterfox/.iterfox/missions/long-svolta-20261020/data/worktrees/20261020T205056-641e33a8/tests/acceptance.mjs:56:1 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 404,
  expected: 201,
  operator: 'strictEqual',
  diff: 'simple'
}

Node.js v22.21.1

```

<a id="evidence-e78a317d-c39d-4224-88a3-7365f033c348"></a>
### projects-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1325ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 5028bdf81d91b81c6c60c4dd496fa852ab46785458931adee5371825df93527b
Scope: all repository files

Evidence is STALE: README.md. Scope: all repository files.

```text
PASS empty archive
PASS create project with stable defaults
PASS optimistic project edit
PASS invalid names and missing revisions do not write
PASS project archival survives restart
PASS unknown project does not create a record
{"criterion":"projects-api","result":"PASS","groups":6}

```

<a id="evidence-18f6f4f8-e4e5-458d-8d4b-bac69931e9a2"></a>
### tasks-api — STALE (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1336ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: 5028bdf81d91b81c6c60c4dd496fa852ab46785458931adee5371825df93527b
Scope: all repository files

Evidence is STALE: README.md. Scope: all repository files.

```text
PASS task defaults and exact fields
PASS task edit, revision conflicts and combined filters
PASS civil dates, invalid states and numeric validation
PASS parallel stale writers cannot overwrite each other
PASS archived projects disappear from general activity list
PASS task persistence and malformed JSON
{"criterion":"tasks-api","result":"PASS","groups":6}

```

<a id="evidence-d50c766f-671c-406f-a5a3-9cfde4cc9a92"></a>
### projects-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","projects-api"]
Exit: 0; duration: 1362ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: d4be2d94025d39f88c9a5cd35afec5cc9a90c6f6eb72f4379eec3cc751dd2ba5
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

<a id="evidence-c1bec71d-4fbf-4965-bb8c-78fd23c28a26"></a>
### tasks-api — PASSED (deterministic)

Check: ["node","tests/acceptance.mjs","tasks-api"]
Exit: 0; duration: 1381ms
Git: 595658b48b6d7118f46d604f4d011f681217aaf8; fingerprint: d4be2d94025d39f88c9a5cd35afec5cc9a90c6f6eb72f4379eec3cc751dd2ba5
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

- Implementati archivio progetti atomico, API GET/POST/PATCH, revisioni serializzate, archiviazione ed errori JSON italiani. README aggiornato; file protetti invariati. Controlli locali mirati superati; avvio HTTP e criterio projects-api restano da verificare sull’host. (agent claim; 3 linked runtime checks)
- Implementate API attività persistenti con filtri combinabili, validazione delle date, revisioni obbligatorie e mutazioni serializzate. Conservati record archiviati e compatibilità con l’archivio progetti. README aggiornato. Controlli locali mirati superati; HTTP e riavvio del processo ancora da verificare sull’host. Interfaccia, pianificazione, sessioni e backup restano esclusi. (agent claim; 2 linked runtime checks)
- Aggiornato README.md con i comandi projects-api e tasks-api, entrambi PASS host con sei gruppi, e la copertura osservata, inclusi HTTP, annuncio porta e riavvio. Distinti i controlli locali dichiarati; resta esplicita l’assenza di collaudi browser, desktop e mobile. Nessun test rieseguito. (agent claim; 1 linked runtime checks)

## Limits

- Local execution pauses during sleep or shutdown.
- AI summaries and qualitative assessments are probabilistic claims from the same integration, not independent review.
- Only configured checks are covered; passing checks do not prove absence of defects.

## Worktree diff

```diff
diff --git a/src/server.mjs b/src/server.mjs
index fa80a45..c873578 100644
--- a/src/server.mjs
+++ b/src/server.mjs
@@ -1 +1,42 @@
-import{createServer}from'node:http';const server=createServer((req,res)=>{res.writeHead(404,{'content-type':'application/json'});res.end(JSON.stringify({error:'Not implemented'}));});server.listen(Number(process.env.PORT??4386),'127.0.0.1',()=>console.log('SVOLTA_READY http://127.0.0.1:'+server.address().port));
\ No newline at end of file
+import { createServer } from 'node:http';
+import { homedir } from 'node:os';
+import { join } from 'node:path';
+import { Archive } from './archive.mjs';
+import { createRequestHandler } from './app.mjs';
+
+function settings() {
+  const rawPort = process.env.PORT ?? '4386';
+  if (!/^\d+$/.test(rawPort) || !Number.isSafeInteger(Number(rawPort)) || Number(rawPort) > 65535) {
+    throw new Error('PORT deve essere un intero tra 0 e 65535.');
+  }
+  const directory = process.env.SVOLTA_DATA_DIR ?? join(homedir(), '.local', 'share', 'svolta');
+  if (directory.trim() === '') throw new Error('SVOLTA_DATA_DIR non può essere vuota.');
+  return { port: Number(rawPort), directory };
+}
+
+try {
+  const { port, directory } = settings();
+  const archive = await Archive.open(directory);
+  const server = createServer(createRequestHandler(archive));
+  server.requestTimeout = 30_000;
+  server.headersTimeout = 15_000;
+  const shutdown = () => server.close();
+  await new Promise((resolve, reject) => {
+    server.once('error', reject);
+    server.listen(port, '127.0.0.1', () => {
+      server.removeListener('error', reject);
+      resolve();
+    });
+  });
+  server.on('error', error => {
+    console.error('Svolta: errore del server.', error);
+    process.exitCode = 1;
+    server.close();
+  });
+  process.once('SIGINT', shutdown);
+  process.once('SIGTERM', shutdown);
+  console.log(`SVOLTA_READY http://127.0.0.1:${server.address().port}`);
+} catch (error) {
+  console.error('Svolta: avvio non riuscito.', error);
+  process.exitCode = 1;
+}
diff --git a/README.md b/README.md
new file
--- /dev/null
+++ b/README.md
+# Svolta
+
+App locale in italiano, attualmente con API per progetti e attività persistenti,
+filtri e revisioni ottimistiche. Non offre ancora un’interfaccia grafica,
+pianificazione settimanale, sessioni di tempo, riepiloghi o backup/ripristino.
+Per ora l’uso richiede un client HTTP o il terminale; l’esperienza desktop e
+mobile destinata all’utente finale resta agli esiti successivi.
+Il contratto completo è in [BRIEF.md](BRIEF.md).
+
+## Avvio
+
+Occorre Node.js **22.13 o successivo**. Non occorrono dipendenze né `npm install`.
+Dalla cartella del progetto:
+
+~~~sh
+node src/server.mjs
+# oppure
+npm start
+~~~
+
+Il server ascolta soltanto su `127.0.0.1`, porta predefinita `4386`. Dopo aver
+caricato l’archivio e aperto la porta stampa, per esempio:
+
+~~~text
+SVOLTA_READY http://127.0.0.1:4386
+~~~
+
+Per scegliere cartella e porta (esempio per shell macOS/Linux):
+
+~~~sh
+SVOLTA_DATA_DIR="$HOME/DatiSvolta" PORT=4387 node src/server.mjs
+~~~
+
+`PORT=0` sceglie una porta libera: usare quella annunciata in `SVOLTA_READY`.
+Fermare il processo con Ctrl+C. L’indirizzo `/` restituisce per ora un errore JSON
+404: non è ancora una pagina dell’app. Non vengono serviti sorgenti o file dati.
+
+## Cartella dati e affidabilità
+
+La cartella predefinita è `~/.local/share/svolta`, fuori dai sorgenti.
+`SVOLTA_DATA_DIR` permette di cambiarla; un percorso relativo viene risolto dalla
+cartella di avvio. Se la cartella o `archive.json` non esistono, vengono creati
+con un archivio vuoto, senza progetti dimostrativi. Usare la stessa cartella ai
+riavvii per ritrovare i dati.
+
+`archive.json` contiene il formato interno versione 1, i progetti e le attività,
+inclusi i record archiviati. Un archivio della precedente versione con soli
+progetti viene letto aggiungendo un elenco attività vuoto in memoria; il file
+viene aggiornato solo alla prima modifica salvata. ID, nomi e revisioni dei
+progetti esistenti sono conservati. Ogni creazione riceve un UUID stabile.
+Ogni scrittura prepara un file temporaneo nella stessa cartella, ne sincronizza
+i contenuti e sostituisce il file
+principale con una rinomina atomica. La risposta di successo viene inviata solo
+dopo la sostituzione. In caso di errore di salvataggio, anche lo stato in memoria
+resta quello precedente e le richieste successive possono riprovare.
+
+Un file presente ma illeggibile, vuoto, con JSON o struttura non validi interrompe
+l’avvio con un messaggio sul terminale e uscita non riuscita: non viene azzerato
+né sostituito. Vengono controllati anche i campi delle attività, gli ID duplicati
+e i riferimenti ai progetti. Conservare il file e controllare percorso, permessi
+e contenuto prima di riprovare. I temporanei di una chiusura improvvisa non sono caricati come
+dati. `archive.json` deve essere un file regolare, non un collegamento simbolico.
+Non modificare manualmente l’archivio durante l’esecuzione.
+
+Usare **un solo processo per cartella dati**, su un filesystem locale che supporti
+la rinomina atomica. La coda serializza le modifiche del singolo processo; non
+esiste un blocco tra processi. L’archivio è letto interamente in memoria, pensato
+per piccoli volumi personali. La sincronizzazione del file non costituisce una
+garanzia contro guasti del disco o perdita improvvisa di alimentazione. Non ci
+sono ancora una funzione di backup, recupero automatico o migrazioni da altri
+formati. Il file interno non è il backup portabile previsto dal contratto.
+
+## Uso delle API
+
+Le risposte sono JSON. Per inviare dati usare `Content-Type: application/json`.
+Il corpo di una richiesta può occupare al massimo 2 MiB. Gli ID negli esempi
+sono segnaposto da sostituire con quelli restituiti dal server.
+
+### Progetti
+
+| Richiesta | Corpo | Risultato |
+| --- | --- | --- |
+| `GET /api/projects` | — | Array di tutti i progetti, inclusi gli archiviati |
+| `POST /api/projects` | `{"name":"Studio"}` | 201, progetto creato |
+| `PATCH /api/projects/<id>` | `{"revision":1,"name":"Studio rivisto"}` | 200, progetto aggiornato |
+| `PATCH /api/projects/<id>` | `{"revision":2,"archived":true}` | 200, progetto archiviato senza cancellazione |
+
+Un nuovo progetto ha questa struttura:
+
+~~~json
+{"id":"<UUID>","name":"Studio","archived":false,"revision":1}
+~~~
+
+Il nome viene ripulito dagli spazi ai bordi e deve contenere da 1 a 100 caratteri
+Unicode. `archived` accetta soltanto booleani; `false` riattiva un progetto.
+I campi non previsti sono rifiutati. Ogni PATCH accettata incrementa la revisione
+di uno, anche quando i valori non cambiano. ID e revisione iniziale sono generati
+dal server, non scelti dal chiamante.
+
+### Attività
+
+| Richiesta | Corpo o filtri | Risultato |
+| --- | --- | --- |
+| `GET /api/tasks` | — | Array di attività non archiviate di progetti attivi |
+| `GET /api/tasks?projectId=<id>&status=doing&q=caff%C3%A8` | Filtri facoltativi e combinabili | Attività del progetto, in corso, con «caffè» nel titolo o nelle note |
+| `POST /api/tasks` | `{"projectId":"<id>","title":"Leggere"}` | 201, attività creata |
+| `PATCH /api/tasks/<id>` | `{"revision":1,"status":"doing","dueDate":"2028-02-29"}` | 200, attività aggiornata |
+| `PATCH /api/tasks/<id>` | `{"revision":2,"archived":true}` | 200, attività archiviata senza cancellazione |
+
+Una nuova attività con i soli campi obbligatori restituisce:
+
+~~~json
+{"id":"<UUID>","projectId":"<id>","title":"Leggere","notes":"","status":"todo","dueDate":null,"estimateMinutes":0,"archived":false,"revision":1}
+~~~
+
+Per creare un’attività occorre un progetto esistente e attivo. Il titolo viene
+ripulito dagli spazi ai bordi e deve contenere da 1 a 160 caratteri Unicode.
+Le note sono testo libero di massimo 4000 caratteri Unicode: spazi, a capo e
+markup restano testo. `estimateMinutes` è un numero intero da 0 a 10080, non una
+stringa. I campi omessi diventano `notes: ""`, `dueDate: null`,
+`estimateMinutes: 0`; i valori null non sono ammessi per note e stima.
+
+`dueDate` è null oppure una data civile esatta `YYYY-MM-DD`, con anno da 0001 a
+9999 e giorno reale nel calendario gregoriano. Per esempio `2028-02-29` è valida,
+`2026-02-29` e `2026-04-31` vengono rifiutate. Non si accettano orari, stringhe
+vuote o date con mese/giorno senza zero iniziale. La data viene conservata come
+stringa senza conversioni UTC o dipendenza dal fuso orario del computer.
+
+Il PATCH richiede `revision` e accetta i campi `title`, `notes`, `dueDate`,
+`estimateMinutes`, `status`, `archived`. La sola revisione è ammessa e viene
+incrementata come negli altri PATCH. Gli stati ammessi sono `todo`, `doing`,
+`done`; `archived` accetta solo booleani. `dueDate: null` rimuove la scadenza.
+ID e progetto di un’attività non possono essere cambiati. Campi sconosciuti,
+compresi stato e archiviazione alla creazione, vengono rifiutati.
+
+La lista mantiene l’ordine di creazione e include le attività completate.
+La ricerca `q` è una sottostringa senza distinzione di maiuscole in titolo o
+note; un valore vuoto non restringe l’elenco. I tre filtri sono applicati insieme.
+Uno stato non valido dà 400, un `projectId` sconosciuto dà 404.
+Un `projectId` esplicito mostra anche le attività del relativo progetto
+archiviato, sempre escludendo le attività archiviate e gli altri progetti.
+
+Archiviare un progetto nasconde le sue attività dalla lista generale senza
+alterarne i record; riattivarlo le rende nuovamente visibili. Archiviare
+un’attività la nasconde da tutte le liste senza eliminarla: è riattivabile con
+un PATCH al suo ID noto e alla revisione corrente. Modificare attività già
+archiviate o appartenenti a progetti archiviati è consentito; crearne di nuove
+in un progetto archiviato è rifiutato. Cambiare stato o archiviazione conserva
+gli ID e tutti gli altri campi.
+
+Esempio pratico con `curl`, dopo aver avviato il server:
+
+~~~sh
+curl -H 'Content-Type: application/json' \
+  -d '{"name":"Studio"}' http://127.0.0.1:4386/api/projects
+# Copiare l’id restituito e sostituire ID_PROGETTO:
+curl -H 'Content-Type: application/json' \
+  -d '{"projectId":"ID_PROGETTO","title":"Leggere","notes":"Capitolo 1","estimateMinutes":25}' \
+  http://127.0.0.1:4386/api/tasks
+curl 'http://127.0.0.1:4386/api/tasks?status=todo&q=capitolo'
+# Copiare l’id dell’attività e la sua revisione corrente:
+curl -X PATCH -H 'Content-Type: application/json' \
+  -d '{"revision":1,"status":"doing"}' \
+  http://127.0.0.1:4386/api/tasks/ID_ATTIVITA
+~~~
+
+### Revisioni ed errori
+
+Per modificare, leggere prima la revisione corrente e inviarla nel PATCH.
+Ogni aggiornamento riuscito incrementa la revisione di uno, anche a valori
+invariati. Progetti e attività condividono una coda: confronto della revisione,
+controllo del progetto attivo alla creazione e salvataggio sono serializzati.
+Due aggiornamenti concorrenti dello stesso record con la stessa revisione
+producono un successo e un 409, se il salvataggio riesce. Il client deve
+conservare i propri input su un conflitto, rileggere i dati e scegliere cosa
+applicare; non ritentare automaticamente con una revisione più recente.
+Richieste invalide, conflitti ed errori di salvataggio lasciano invariati record
+e revisioni. Il successo viene comunicato solo dopo aver salvato l’archivio.
+
+Gli errori hanno forma `{"error":"Messaggio in italiano","code":"CODICE"}`:
+
+- 400: dati non validi, revisione mancante o JSON malformato;
+- 404: indirizzo o identificativo sconosciuto;
+- 405: metodo HTTP non disponibile, con intestazione `Allow`;
+- 409: revisione obsoleta (o limite numerico delle revisioni raggiunto);
+- 413: corpo troppo grande; 415: tipo di contenuto diverso da JSON;
+- 503: salvataggio fallito, senza applicare la modifica;
+- 500: errore interno inatteso, dettagli nel terminale.
+
+Non vengono introdotti account, servizi esterni o telemetria. Il server non è
+pubblicato né predisposto per accesso remoto. L’uso da browser mobile e
+l’interfaccia accessibile restano da realizzare negli esiti successivi.
+
+## Stato delle verifiche
+
+Le ricevute host correnti riportano entrambi i criteri approvati **PASS**, con
+sei gruppi superati ciascuno:
+
+| Comando host | Esito | Gruppi superati |
+| --- | --- | --- |
+| `node tests/acceptance.mjs projects-api` | PASS | 6 |
+| `node tests/acceptance.mjs tasks-api` | PASS | 6 |
+
+Per `projects-api` la copertura osservata comprende archivio inizialmente vuoto,
+creazione con nome ripulito e valori predefiniti, modifica con incremento della
+revisione e conflitto senza sovrascrittura, rifiuto di nomi invalidi e revisioni
+mancanti, archiviazione persistente dopo riavvio e 404 per un ID sconosciuto
+senza creare record.
+
+Per `tasks-api` comprende campi e valori predefiniti, modifica e conflitti di
+revisione, filtri combinati e ricerca senza distinzione di maiuscole, validazione
+di date civili, stato, titolo, note e stime, due modifiche concorrenti con un solo
+successo e un 409, esclusione dalla lista generale delle attività di progetti
+archiviati, rifiuto della creazione in progetti archiviati o sconosciuti,
+persistenza dopo riavvio e rifiuto del JSON malformato senza modificare i dati.
+
+Le verifiche host hanno osservato anche l’avvio con `PORT=0` e una cartella
+`SVOLTA_DATA_DIR` temporanea, l’annuncio `SVOLTA_READY` con l’indirizzo
+`http://127.0.0.1:<porta>`, le risposte HTTP e il riavvio del processo sulla stessa
+cartella dati.
+
+Separatamente, durante l’implementazione sono stati dichiarati superati controlli
+locali di sintassi e prove mirate del gestore delle
+richieste su filesystem temporaneo: valori predefiniti e validazione, JSON
+malformato, filtri combinati e ricerca, un solo successo tra scritture
+concorrenti, archiviazione e riattivazione, riapertura dell’archivio, fallimenti
+forzati di creazione e aggiornamento senza perdita di dati e successivo recupero
+della coda. Sono stati controllati anni bisestili e secolari in quattro fusi
+orari, compatibilità con l’archivio dei soli progetti e rifiuto di attività
+salvate non valide senza sovrascrivere il file.
+
+Questi controlli locali non aprono socket e non eseguono i comandi di accettazione;
+sono dichiarazioni distinte dalle ricevute host riportate sopra e non sono stati
+rieseguiti per questo aggiornamento della guida.
+
+Non sono stati osservati collaudi browser, desktop o mobile. I PASS delle API
+non attestano queste esperienze d’uso e non sostituiscono la successiva revisione
+del prodotto. Pianificazione, sessioni, riepiloghi, backup e ripristino non sono
+implementati né dichiarati collaudati.
+
diff --git a/src/app.mjs b/src/app.mjs
new file
--- /dev/null
+++ b/src/app.mjs
+import { AppError, sendError, sendJSON } from './errors.mjs';
+import { createProject, updateProject } from './projects.mjs';
+import { createTask, listTasks, updateTask } from './tasks.mjs';
+
+const MAX_BODY_BYTES = 2 * 1024 * 1024;
+
+function readJSON(request) {
+  const contentType = request.headers['content-type']?.split(';', 1)[0].trim().toLowerCase();
+  if (contentType !== 'application/json') {
+    throw new AppError(415, 'JSON_REQUIRED', 'Invia i dati con Content-Type: application/json.');
+  }
+  return new Promise((resolve, reject) => {
+    let chunks = [];
+    let bytes = 0;
+    let settled = false;
+    const fail = error => {
+      if (settled) return;
+      settled = true;
+      chunks = [];
+      reject(error);
+    };
+    request.on('data', chunk => {
+      if (settled) return;
+      bytes += chunk.length;
+      if (bytes > MAX_BODY_BYTES) {
+        // Keep draining without retaining bytes, so the 413 can reach the client.
+        fail(new AppError(413, 'BODY_TOO_LARGE', 'Il corpo della richiesta supera il limite di 2 MiB.'));
+      } else {
+        chunks.push(chunk);
+      }
+    });
+    request.once('aborted', () => fail(new AppError(400, 'INCOMPLETE_REQUEST', 'La richiesta è stata interrotta.')));
+    request.once('error', () => fail(new AppError(400, 'INCOMPLETE_REQUEST', 'Impossibile leggere la richiesta.')));
+    request.once('end', () => {
+      if (settled) return;
+      let value;
+      try {
+        const text = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
+        value = JSON.parse(text);
+      } catch {
+        fail(new AppError(400, 'INVALID_JSON', 'Il corpo della richiesta non contiene un JSON valido.'));
+        return;
+      }
+      settled = true;
+      chunks = [];
+      resolve(value);
+    });
+  });
+}
+
+function methodNotAllowed(response, methods) {
+  sendJSON(response, 405, {
+    error: 'Metodo non disponibile per questo indirizzo.',
+    code: 'METHOD_NOT_ALLOWED',
+  }, { allow: methods.join(', ') });
+}
+
+export function createRequestHandler(archive) {
+  return async (request, response) => {
+    try {
+      let url;
+      try {
+        url = new URL(request.url, 'http://127.0.0.1');
+      } catch {
+        throw new AppError(400, 'INVALID_URL', 'L’indirizzo della richiesta non è valido.');
+      }
+      const path = url.pathname.replace(/\/+$/, '') || '/';
+      if (path === '/api/projects') {
+        if (request.method === 'GET') {
+          sendJSON(response, 200, archive.snapshot().projects);
+        } else if (request.method === 'POST') {
+          const input = await readJSON(request);
+          const project = await archive.mutate(data => {
+            const next = createProject(input);
+            data.projects.push(next);
+            return next;
+          });
+          sendJSON(response, 201, project);
+        } else {
+          methodNotAllowed(response, ['GET', 'POST']);
+        }
+        return;
+      }
+      if (path === '/api/tasks') {
+        if (request.method === 'GET') {
+          sendJSON(response, 200, listTasks(archive.snapshot(), url.searchParams));
+        } else if (request.method === 'POST') {
+          const input = await readJSON(request);
+          const task = await archive.mutate(data => {
+            const next = createTask(input, data.projects);
+            data.tasks.push(next);
+            return next;
+          });
+          sendJSON(response, 201, task);
+        } else {
+          methodNotAllowed(response, ['GET', 'POST']);
+        }
+        return;
+      }
+      const taskMatch = path.match(/^\/api\/tasks\/([^/]+)$/);
+      if (taskMatch) {
+        if (request.method !== 'PATCH') {
+          methodNotAllowed(response, ['PATCH']);
+          return;
+        }
+        let id;
+        try {
+          id = decodeURIComponent(taskMatch[1]);
+        } catch {
+          throw new AppError(400, 'INVALID_ID', 'L’identificativo dell’attività non è valido.');
+        }
+        const input = await readJSON(request);
+        const task = await archive.mutate(data => {
+          const index = data.tasks.findIndex(item => item.id === id);
+          if (index === -1) throw new AppError(404, 'TASK_NOT_FOUND', 'L’attività richiesta non esiste.');
+          const next = updateTask(data.tasks[index], input);
+          data.tasks[index] = next;
+          return next;
+        });
+        sendJSON(response, 200, task);
+        return;
+      }
+      const match = path.match(/^\/api\/projects\/([^/]+)$/);
+      if (match) {
+        if (request.method !== 'PATCH') {
+          methodNotAllowed(response, ['PATCH']);
+          return;
+        }
+        let id;
+        try {
+          id = decodeURIComponent(match[1]);
+        } catch {
+          throw new AppError(400, 'INVALID_ID', 'L’identificativo del progetto non è valido.');
+        }
+        const input = await readJSON(request);
+        const project = await archive.mutate(data => {
+          const index = data.projects.findIndex(item => item.id === id);
+          if (index === -1) throw new AppError(404, 'PROJECT_NOT_FOUND', 'Il progetto richiesto non esiste.');
+          const next = updateProject(data.projects[index], input);
+          data.projects[index] = next;
+          return next;
+        });
+        sendJSON(response, 200, project);
+        return;
+      }
+      throw new AppError(404, 'NOT_FOUND', 'Indirizzo non trovato.');
+    } catch (error) {
+      sendError(response, error);
+    } finally {
+      // Drain unused bodies (including on 404/405/415) for HTTP keep-alive.
+      request.resume();
+    }
+  };
+}
+
diff --git a/src/archive.mjs b/src/archive.mjs
new file
--- /dev/null
+++ b/src/archive.mjs
+import { randomUUID } from 'node:crypto';
+import { lstat, mkdir, open, readFile, rename, unlink } from 'node:fs/promises';
+import { join, resolve } from 'node:path';
+import { AppError } from './errors.mjs';
+import { validateStoredProject } from './projects.mjs';
+import { validateStoredTask } from './tasks.mjs';
+
+function validateArchive(archive) {
+  if (archive === null || typeof archive !== 'object' || Array.isArray(archive)
+      || archive.version !== 1 || !Array.isArray(archive.projects) || !Array.isArray(archive.tasks)
+      || Object.keys(archive).some(key => !['version', 'projects', 'tasks'].includes(key))) {
+    throw new Error('Formato dell’archivio non riconosciuto.');
+  }
+  const ids = new Set();
+  for (const project of archive.projects) {
+    validateStoredProject(project);
+    if (ids.has(project.id)) throw new Error('Identificativi di progetto duplicati.');
+    ids.add(project.id);
+  }
+  const taskIds = new Set();
+  for (const task of archive.tasks) {
+    validateStoredTask(task);
+    if (taskIds.has(task.id)) throw new Error('Identificativi di attività duplicati.');
+    if (!ids.has(task.projectId)) throw new Error('Attività con riferimento a un progetto inesistente.');
+    taskIds.add(task.id);
+  }
+}
+
+async function writeAtomic(directory, archive) {
+  // Same filesystem: readers see either the previous file or the complete new file.
+  const temporary = join(directory, `.archive-${randomUUID()}.tmp`);
+  let handle;
+  let created = false;
+  try {
+    handle = await open(temporary, 'wx', 0o600);
+    created = true;
+    await handle.writeFile(`${JSON.stringify(archive)}\n`, 'utf8');
+    await handle.sync();
+    await handle.close();
+    handle = undefined;
+    await rename(temporary, join(directory, 'archive.json'));
+    // Nothing fallible after rename: the caller can now publish the new state.
+  } catch (error) {
+    if (handle) await handle.close().catch(() => {});
+    if (created) await unlink(temporary).catch(() => {});
+    throw error;
+  }
+}
+
+export class Archive {
+  #directory;
+  #data;
+  #pending = Promise.resolve();
+
+  constructor(directory, data) {
+    this.#directory = directory;
+    this.#data = data;
+  }
+
+  static async open(directory) {
+    const absolute = resolve(directory);
+    await mkdir(absolute, { recursive: true, mode: 0o700 });
+    const file = join(absolute, 'archive.json');
+    let source;
+    let exists = false;
+    try {
+      const info = await lstat(file);
+      exists = true;
+      if (!info.isFile()) throw new Error('archive.json deve essere un file regolare, non un collegamento o una cartella.');
+      source = await readFile(file);
+    } catch (cause) {
+      if (exists || cause.code !== 'ENOENT') {
+        throw new Error(`Impossibile leggere l’archivio ${file}. Nessun dato è stato sostituito.`, { cause });
+      }
+    }
+
+    let data;
+    if (source === undefined) {
+      data = { version: 1, projects: [], tasks: [] };
+      await writeAtomic(absolute, data);
+    } else {
+      try {
+        const text = new TextDecoder('utf-8', { fatal: true }).decode(source);
+        data = JSON.parse(text);
+        // The projects-only version used the same format without a tasks key.
+        // Upgrade in memory; opening an archive never overwrites its contents.
+        if (data !== null && typeof data === 'object' && !Array.isArray(data)
+            && data.version === 1 && !Object.hasOwn(data, 'tasks')) data.tasks = [];
+        validateArchive(data);
+      } catch (cause) {
+        throw new Error(`L’archivio ${file} è illeggibile o non valido. Avvio interrotto; il file è conservato.`, { cause });
+      }
+    }
+    return new Archive(absolute, data);
+  }
+
+  snapshot() {
+    return structuredClone(this.#data);
+  }
+
+  mutate(change) {
+    const operation = this.#pending.then(async () => {
+      const next = this.snapshot();
+      // Lookup, revision comparison and saving share this queue. Never mutate
+      // the published snapshot before the replacement file has been saved.
+      const result = await change(next);
+      validateArchive(next);
+      const response = structuredClone(result);
+      try {
+        await writeAtomic(this.#directory, next);
+      } catch (cause) {
+        throw new AppError(503, 'SAVE_FAILED',
+          'Impossibile salvare i dati. Nessuna modifica è stata applicata; controlla la cartella dati e riprova.',
+          { cause });
+      }
+      this.#data = next;
+      return response;
+    });
+    // An invalid request or failed save must not poison subsequent operations.
+    this.#pending = operation.then(() => undefined, () => undefined);
+    return operation;
+  }
+}
+
diff --git a/src/dates.mjs b/src/dates.mjs
new file
--- /dev/null
+++ b/src/dates.mjs
+// Civil dates are calendar values, never instants in the machine's timezone.
+export function isCivilDate(value) {
+  if (typeof value !== 'string' || value.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
+  const year = Number(value.slice(0, 4));
+  const month = Number(value.slice(5, 7));
+  const day = Number(value.slice(8, 10));
+  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
+  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
+  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
+  return day <= days[month - 1];
+}
+
diff --git a/src/errors.mjs b/src/errors.mjs
new file
--- /dev/null
+++ b/src/errors.mjs
+export class AppError extends Error {
+  constructor(status, code, message, options) {
+    super(message, options);
+    this.name = 'AppError';
+    this.status = status;
+    this.code = code;
+  }
+}
+
+export function sendJSON(response, status, value, headers = {}) {
+  if (response.destroyed || response.writableEnded) return;
+  const body = JSON.stringify(value);
+  response.writeHead(status, {
+    'content-type': 'application/json; charset=utf-8',
+    'content-length': Buffer.byteLength(body),
+    'cache-control': 'no-store',
+    'x-content-type-options': 'nosniff',
+    ...headers,
+  });
+  response.end(body);
+}
+
+export function sendError(response, error) {
+  const known = error instanceof AppError;
+  if (!known || error.status >= 500) console.error('Svolta:', error);
+  sendJSON(response, known ? error.status : 500, {
+    error: known ? error.message : 'Errore interno. La richiesta non è stata completata.',
+    code: known ? error.code : 'INTERNAL_ERROR',
+  });
+}
+
diff --git a/src/projects.mjs b/src/projects.mjs
new file
--- /dev/null
+++ b/src/projects.mjs
+import { randomUUID } from 'node:crypto';
+import { AppError } from './errors.mjs';
+
+function invalid(message) {
+  throw new AppError(400, 'INVALID_PROJECT', message);
+}
+
+function objectWithFields(value, allowed) {
+  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
+    invalid('Invia un oggetto JSON con i campi del progetto.');
+  }
+  if (Object.keys(value).some(key => !allowed.includes(key))) {
+    invalid('Il progetto contiene campi non previsti per questa operazione.');
+  }
+}
+
+function projectName(value) {
+  if (typeof value !== 'string') invalid('Il nome del progetto deve essere un testo.');
+  const name = value.trim();
+  if (name.length === 0 || [...name].length > 100) {
+    invalid('Il nome del progetto deve contenere da 1 a 100 caratteri, esclusi gli spazi ai bordi.');
+  }
+  return name;
+}
+
+function validRevision(value) {
+  return Number.isSafeInteger(value) && value >= 1;
+}
+
+export function validateStoredProject(project) {
+  objectWithFields(project, ['id', 'name', 'archived', 'revision']);
+  if (typeof project.id !== 'string' || project.id.length === 0 || project.id.trim() !== project.id) {
+    invalid('Identificativo del progetto non valido.');
+  }
+  if (projectName(project.name) !== project.name) invalid('Il nome salvato non è normalizzato.');
+  if (typeof project.archived !== 'boolean') invalid('Lo stato di archiviazione deve essere vero o falso.');
+  if (!validRevision(project.revision)) invalid('La revisione del progetto deve essere un intero positivo.');
+}
+
+export function createProject(input) {
+  objectWithFields(input, ['name']);
+  return {
+    id: randomUUID(),
+    name: projectName(input.name),
+    archived: false,
+    revision: 1,
+  };
+}
+
+export function updateProject(current, input) {
+  objectWithFields(input, ['revision', 'name', 'archived']);
+  if (!validRevision(input.revision)) {
+    invalid('La revisione è obbligatoria e deve essere un intero positivo.');
+  }
+  if (input.revision !== current.revision) {
+    throw new AppError(409, 'REVISION_CONFLICT',
+      'Il progetto è stato modificato. Rileggi i dati e applica le modifiche alla revisione aggiornata.');
+  }
+  if (current.revision === Number.MAX_SAFE_INTEGER) {
+    throw new AppError(409, 'REVISION_LIMIT', 'Il progetto ha raggiunto il limite delle revisioni.');
+  }
+  const next = { ...current, revision: current.revision + 1 };
+  if (Object.hasOwn(input, 'name')) next.name = projectName(input.name);
+  if (Object.hasOwn(input, 'archived')) {
+    if (typeof input.archived !== 'boolean') invalid('Archiviato deve essere vero o falso.');
+    next.archived = input.archived;
+  }
+  return next;
+}
+
diff --git a/src/tasks.mjs b/src/tasks.mjs
new file
--- /dev/null
+++ b/src/tasks.mjs
+import { randomUUID } from 'node:crypto';
+import { AppError } from './errors.mjs';
+import { isCivilDate } from './dates.mjs';
+
+const STATUSES = new Set(['todo', 'doing', 'done']);
+const EDITABLE_FIELDS = ['title', 'notes', 'dueDate', 'estimateMinutes', 'status', 'archived'];
+
+function invalid(message) {
+  throw new AppError(400, 'INVALID_TASK', message);
+}
+
+function objectWithFields(value, allowed) {
+  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
+    invalid('Invia un oggetto JSON con i campi dell’attività.');
+  }
+  if (Object.keys(value).some(key => !allowed.includes(key))) {
+    invalid('L’attività contiene campi non previsti per questa operazione.');
+  }
+}
+
+function identifier(value) {
+  return typeof value === 'string' && value.length > 0 && value.trim() === value;
+}
+
+function validRevision(value) {
+  return Number.isSafeInteger(value) && value >= 1;
+}
+
+function fieldValue(field, value) {
+  switch (field) {
+    case 'title': {
+      if (typeof value !== 'string') invalid('Il titolo dell’attività deve essere un testo.');
+      const title = value.trim();
+      if (title.length === 0 || [...title].length > 160) {
+        invalid('Il titolo deve contenere da 1 a 160 caratteri, esclusi gli spazi ai bordi.');
+      }
+      return title;
+    }
+    case 'notes':
+      if (typeof value !== 'string' || [...value].length > 4000) {
+        invalid('Le note devono essere un testo di massimo 4000 caratteri.');
+      }
+      break;
+    case 'dueDate':
+      if (value !== null && !isCivilDate(value)) {
+        invalid('La scadenza deve essere null oppure una data reale nel formato YYYY-MM-DD, con anno da 0001 a 9999.');
+      }
+      break;
+    case 'estimateMinutes':
+      if (!Number.isInteger(value) || value < 0 || value > 10080) {
+        invalid('La stima deve essere un numero intero di minuti tra 0 e 10080.');
+      }
+      break;
+    case 'status':
+      if (!STATUSES.has(value)) invalid('Lo stato deve essere todo, doing oppure done.');
+      break;
+    case 'archived':
+      if (typeof value !== 'boolean') invalid('Archiviato deve essere vero o falso.');
+      break;
+  }
+  return value;
+}
+
+export function validateStoredTask(task) {
+  objectWithFields(task, ['id', 'projectId', 'revision', ...EDITABLE_FIELDS]);
+  if (!identifier(task.id)) invalid('Identificativo dell’attività non valido.');
+  if (!identifier(task.projectId)) invalid('Identificativo del progetto non valido.');
+  if (!validRevision(task.revision)) invalid('La revisione dell’attività deve essere un intero positivo.');
+  for (const field of EDITABLE_FIELDS) {
+    if (fieldValue(field, task[field]) !== task[field]) invalid('Il titolo salvato non è normalizzato.');
+  }
+}
+
+export function createTask(input, projects) {
+  objectWithFields(input, ['projectId', 'title', 'notes', 'dueDate', 'estimateMinutes']);
+  if (!identifier(input.projectId)) invalid('Scegli un progetto per l’attività.');
+  const project = projects.find(item => item.id === input.projectId);
+  if (!project) throw new AppError(404, 'PROJECT_NOT_FOUND', 'Il progetto richiesto non esiste.');
+  if (project.archived) {
+    throw new AppError(400, 'PROJECT_ARCHIVED', 'Il progetto è archiviato. Riattivalo prima di aggiungere un’attività.');
+  }
+  const task = {
+    id: randomUUID(),
+    projectId: project.id,
+    title: fieldValue('title', input.title),
+    notes: '',
+    status: 'todo',
+    dueDate: null,
+    estimateMinutes: 0,
+    archived: false,
+    revision: 1,
+  };
+  for (const field of ['notes', 'dueDate', 'estimateMinutes']) {
+    if (Object.hasOwn(input, field)) task[field] = fieldValue(field, input[field]);
+  }
+  return task;
+}
+
+export function updateTask(current, input) {
+  objectWithFields(input, ['revision', ...EDITABLE_FIELDS]);
+  if (!validRevision(input.revision)) {
+    invalid('La revisione è obbligatoria e deve essere un intero positivo.');
+  }
+  if (input.revision !== current.revision) {
+    throw new AppError(409, 'REVISION_CONFLICT',
+      'L’attività è stata modificata. Rileggi i dati e applica le modifiche alla revisione aggiornata.');
+  }
+  if (current.revision === Number.MAX_SAFE_INTEGER) {
+    throw new AppError(409, 'REVISION_LIMIT', 'L’attività ha raggiunto il limite delle revisioni.');
+  }
+  const next = { ...current, revision: current.revision + 1 };
+  for (const field of EDITABLE_FIELDS) {
+    if (Object.hasOwn(input, field)) next[field] = fieldValue(field, input[field]);
+  }
+  return next;
+}
+
+export function listTasks(data, searchParams) {
+  const projectId = searchParams.get('projectId');
+  const status = searchParams.get('status');
+  const query = (searchParams.get('q') ?? '').toLowerCase();
+  if (status !== null && !STATUSES.has(status)) {
+    throw new AppError(400, 'INVALID_TASK_FILTER', 'Il filtro stato deve essere todo, doing oppure done.');
+  }
+  if (projectId !== null) {
+    if (!identifier(projectId)) {
+      throw new AppError(400, 'INVALID_TASK_FILTER', 'Il filtro progetto richiede un identificativo non vuoto.');
+    }
+    if (!data.projects.some(project => project.id === projectId)) {
+      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Il progetto richiesto non esiste.');
+    }
+  }
+  const activeProjects = new Set(data.projects.filter(project => !project.archived).map(project => project.id));
+  return data.tasks.filter(task => !task.archived
+    && (projectId === null ? activeProjects.has(task.projectId) : task.projectId === projectId)
+    && (status === null || task.status === status)
+    && (task.title.toLowerCase().includes(query) || task.notes.toLowerCase().includes(query)));
+}
+
```
