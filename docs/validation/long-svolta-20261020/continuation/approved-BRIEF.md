# Svolta — obiettivo e contratto pubblico

Costruire un'app locale in italiano per organizzare piccoli progetti personali,
vedere le attività della settimana e capire dove si è dedicato tempo. Deve essere
utilizzabile da una persona senza strumenti di sviluppo: creazione, modifiche,
filtri, messaggi d'errore leggibili, schermo mobile e backup con consenso esplicito.
Niente account, servizi esterni, telemetria o installazione di dipendenze.

Il lavoro è delegato in quattro esiti. Completare l'esito corrente e conservare le
funzioni precedenti; il supervisore host avvia gli esiti successivi. Le verifiche
host sono una soglia di regressione, non sostituiscono la revisione del prodotto.
Scegliere autonomamente stile, struttura interna e dettagli reversibili. Non
aggiungere funzioni fuori obiettivo e non aspettare altre istruzioni per routine.

## Avvio e persistenza

Node >=22.13 con moduli standard, avvio `node src/server.mjs` oppure `npm start`.
Usare `PORT` (anche 0), bind soltanto 127.0.0.1. Scrivere una riga
`SVOLTA_READY http://127.0.0.1:<porta>` dopo l'ascolto. Dati persistenti fuori dai
sorgenti in `SVOLTA_DATA_DIR`, default `~/.local/share/svolta`. Conservare i dati
dopo riavvio. SQLite oppure file atomici sono scelte delegate. L'app parte vuota;
nessun dato dimostrativo automatico. Nessuna scrittura nei test o nella configurazione.

Il browser usa la stessa origine. Nessuna risorsa di rete esterna. Progetti,
attività, note e file importati sono dati non fidati: mostrarli come testo, senza
eseguire markup. Non servire sorgenti, database o percorsi fuori da public/.
Risposte API JSON, errore di validazione 4xx con messaggio comprensibile, ID ignoti
404 e conflitti di revisione 409. JSON malformato non deve diventare errore 500.

## 1. Progetti e attività

- GET /api/projects -> array, inclusi progetti archiviati.
- POST /api/projects `{name}` -> 201: `{id,name,archived:false,revision:1,...}`.
  Nome trim non vuoto, massimo 100 caratteri.
- PATCH /api/projects/:id `{revision,name?,archived?}` -> progetto aggiornato,
  revision incrementata. La revisione è obbligatoria. Una vecchia revisione dà
  409 e non modifica i dati. Non cancellare fisicamente un progetto archiviato.
- GET /api/tasks -> array, attività non archiviate; filtri facoltativi combinabili
  `projectId`, `status=todo|doing|done`, `q` sottostringa senza distinzione di
  maiuscole in titolo e note. La richiesta generale esclude anche attività di
  progetti archiviati. Un projectId esplicito può mostrare il relativo archivio
  se utile, ma non deve includere altri progetti.
- POST /api/tasks `{projectId,title,notes?,dueDate?,estimateMinutes?}` -> 201:
  `{id,projectId,title,notes,status:'todo',dueDate,estimateMinutes,archived:false,revision:1,...}`.
  Progetto esistente e attivo; titolo trim non vuoto <=160, note <=4000;
  dueDate null oppure data civile YYYY-MM-DD reale; estimateMinutes intero
  0..10080 (default 0). I valori omessi diventano notes='', dueDate=null.
- PATCH /api/tasks/:id `{revision,title?,notes?,dueDate?,estimateMinutes?,status?,archived?}`
  -> attività aggiornata e revisione incrementata. Revisione vecchia 409, nessuna
  sovrascrittura. Date impossibili e stati ignoti sono rifiutati. Le modifiche di
  stato e l'archiviazione conservano eventuali sessioni di tempo successive.

## 2. Interfaccia attività

Titolo principale Svolta. Navigazione con pulsanti accessibili Progetti,
Attività, Settimana, Riepilogo, Backup. È ammesso un menu mobile accessibile Menu.
Nella sezione Progetti: Nome progetto, Crea progetto. Nell'inserimento attività:
Progetto (select), Titolo attività, Note, Scadenza (date), Stima (minuti),
Crea attività. Ogni scheda è un article con nome accessibile uguale al titolo
e pulsante `Modifica <titolo>`. Dialog Modifica attività con gli stessi campi
testuali, Stato (todo/doing/done) e Salva modifiche. Non perdere gli input in caso
di errore. Filtri: Filtra per progetto, Filtra per stato, Cerca attività.
Le opzioni di stato possono avere etichette italiane ma valori API immutati.
Mostrare aggiornamenti senza refresh manuale; riaprendo l'app i dati restano.
Gestire conflitti senza sovrascrivere silenziosamente le modifiche concorrenti.

## 3. Settimana e tempo

- GET /api/week?start=YYYY-MM-DD: start è un lunedì reale, altrimenti 4xx.
  -> `{start,days:[{date,tasks:[...]} x7],unscheduled:[...]}`. Giorni ordinati dal
  lunedì alla domenica, attività attive di progetti attivi con scadenza nel giorno;
  unscheduled contiene quelle senza scadenza. Attività completate della settimana
  rimangono distinguibili, quelle fuori settimana non sono nei sette giorni.
- POST /api/time-entries `{taskId,date,minutes,note?}` ->201:
  `{id,taskId,projectId,date,minutes,note,...}`. Attività e progetto attivi, data
  civile valida, minuti interi 1..1440, nota <=2000. Non cambiare lo stato del task.
- GET /api/time-entries?taskId=<id> -> array delle sessioni, senza filtro tutte.
- DELETE /api/time-entries/:id ->204, elimina solo quella sessione; ID ignoto 404.
- GET /api/summary?date=YYYY-MM-DD ->
  `{date,weekStart,weekEnd,totals:{todo,doing,done,overdue,minutesThisWeek},byProject:[{projectId,name,minutesThisWeek,done},...]}`.
  Conteggi todo/doing/done su tutte le attività attive di progetti attivi;
  overdue conta attività non done con scadenza anteriore a date. I minuti sono
  solo della settimana lunedì-domenica contenente date. Nessuna dipendenza dal
  fuso orario per queste date civili; weekStart/weekEnd sono date incluse.

UI Settimana: Inizio settimana (date), Mostra settimana. Ogni giorno espone
`data-date=YYYY-MM-DD` e il suo elenco; nessuna scroll orizzontale su 390px.
Riprogrammare una scadenza mediante Modifica attività aggiorna la settimana.
Ogni scheda attività offre `Registra tempo per <titolo>`; dialog Registra tempo
con Data, Minuti, Nota sessione, Salva sessione. La cronologia delle sessioni
deve essere consultabile. Riepilogo: Data di riferimento, Aggiorna riepilogo,
nome progetto e minuti della settimana leggibili. Mostrare stati vuoti e errori (role=alert); gli esiti positivi sono annunciati con role=status oppure role=alert.

## 4. Portabilità e consegna

- GET /api/backup -> JSON scaricabile
  `{format:'svolta',version:1,projects:[...],tasks:[...],timeEntries:[...]}`,
  inclusi archivi, revisioni, sessioni e ID originali.
- POST /api/restore con lo stesso oggetto ->200 `{restored:true}`.
  Validare TUTTO prima di sostituire atomicamente l'archivio: formato/versione,
  tipi/campi dei record, date/stati/revisioni, ID duplicati e riferimenti tra
  progetti/attività/sessioni. Un errore non modifica nulla. Un backup esportato
  dall'app stessa deve essere reimportabile e riprodurre gli stessi dati e ID.
  Un corpo >2 MiB è rifiutato con 413 senza interrompere il server.

UI Backup: Scarica backup (download JSON), File di backup (file input), checkbox
`Ho capito: il ripristino sostituisce i dati correnti`, Ripristina backup. Prima
di un file valido e del consenso il pulsante è disabilitato e non avviene alcun
POST. Un JSON malformato dà un errore visibile; non cancellare dati. Dopo il
ripristino aggiornare le viste, senza mantenere revisioni o selezioni obsolete.

README in italiano: avvio, requisiti, cartella dati, uso pratico, backup/ripristino,
limiti reali, verifica host distinta dalle sole affermazioni del modello. In docs/
una guida breve del flusso progetti -> settimana -> tempo -> backup. Niente
asserzioni di revisore indipendente, pubblicazione o collaudo non osservati.

## Verifica host

I comandi approvati sono `node tests/acceptance.mjs <criterio>`. Il browser host
usa Chrome già installato e Playwright dal runtime del supervisore. La sandbox
dell'agente può impedire socket/browser: finire il codice e richiedere i criteri
host tramite verificationRequest; non trattare questi limiti locali come un blocco
di implementazione. Non modificare o aggirare test, contratto, dipendenze o permessi.
