# Custode — una sera di delega, un prodotto al ritorno

Costruisci una piccola applicazione locale, in italiano, per ricordare gli oggetti
che possiedo e la loro manutenzione. Voglio ritrovare velocemente cosa ho, dove si
trova, cosa scade e cosa ho già fatto. Deve essere comoda anche dal telefono.
Scegli tu architettura interna, gerarchia visiva e dettagli reversibili. Consegnami
un prodotto coerente, non una raccolta di schermate dimostrative.

Il risultato finale comprende inventario modificabile e ricercabile, interventi
una tantum o ricorrenti, scadenze ordinate, completamento e storico, backup e
ripristino con protezione dagli errori. Dati persistenti anche dopo il riavvio.
Spiega in README come avviare, usare e salvare i dati, e i limiti reali.
Nessun account, servizio esterno, email, push notification o pubblicazione.

## Confini tecnici già predisposti

Node 22, nessuna dipendenza da installare. `npm start` esegue `src/server.mjs`.
Il server usa `HOST` (default 127.0.0.1), `PORT` e `CUSTODE_DATA_DIR` per i dati.
L'interfaccia è servita dallo stesso processo. Non scrivere dati nel repository.
Puoi usare i moduli integrati, incluso node:sqlite. Le prove host avviano copie
isolate con porte e directory temporanee; il coding sandbox non deve eseguire
browser o listener per completare l'implementazione. Richiedi i controlli host.
Non cambiare package.json, tests, questo brief o l'accettazione.

## Esiti delegati

1. Inventario affidabile: API dati, validazione, ricerca e persistenza.
2. Inventario usabile: vera interfaccia CRUD con ricerca, stati vuoti/errori,
   layout desktop/390px e controlli accessibili, senza dipendenze remote.
3. Manutenzione: interventi collegati agli oggetti, scadenze, completamento
   ricorrente o una tantum e storico. Interfaccia end-to-end, non solo API.
4. Ritorno sicuro: backup JSON, ripristino esplicito e atomico, guida d'uso e
   revisione dell'intero prodotto. Correggi lacune concrete prima di consegnare.

Ogni esito preserva i precedenti. I controlli di un esito futuro non sono
requisiti dell'esito corrente. I test sono una soglia minima: valuta anche
completezza, leggibilità, stati di errore e coerenza rispetto a questo obiettivo.

## Contratto HTTP per rendere il risultato verificabile

Tutte le risposte API sono JSON, gli errori hanno `error` testuale e status 4xx.
Il server non espone file di dati o percorsi fuori da public. Soltanto loopback.

### Inventario

- GET /api/health -> {ok:true}.
- GET /api/items -> array. Filtri q, category, location combinabili, case-insensitive.
  q cerca in nome, categoria, posizione e note.
- POST /api/items con {name,category,location,notes} -> 201, oggetto creato.
- PATCH /api/items/:id aggiorna i campi forniti -> oggetto.
- DELETE /api/items/:id -> 200/204. Se interventi collegati: 409, senza perdere dati.
- Campi oggetto: id stringa stabile, name obbligatorio e non vuoto, category,
  location e notes stringhe, createdAt/updatedAt ISO. Testo Unicode e markup
  sono dati letterali. Campi mancanti facoltativi default stringa vuota.
- Nome massimo 200 caratteri, categoria/posizione 100, note 5000. Tipi errati,
  campi sconosciuti e identificativi non esistenti non modificano i dati.

### Manutenzione

- GET/POST /api/tasks -> array / 201 oggetto.
- PATCH/DELETE /api/tasks/:id -> oggetto / 200 o 204.
- Campi: id, itemId esistente, title obbligatorio max200, dueDate data civile
  valida YYYY-MM-DD, intervalDays intero 0..3660 (0=una tantum), notes max5000,
  completed booleano, createdAt/updatedAt. POST non accetta id/completed.
- POST /api/tasks/:id/complete con {completedOn:YYYY-MM-DD} registra uno storico
  e aggiorna l'intervento nella stessa operazione. Intervento una tantum diventa
  completed:true; un secondo completamento è 409. Ricorrente rimane attivo con
  dueDate = completedOn + intervalDays, calcolo civile indipendente dal fuso.
- GET /api/history -> array con id, taskId, itemId, title, completedOn.
- GET /api/overview?today=YYYY-MM-DD -> {overdue,today,upcoming,tasks}, conteggi
  degli attivi, upcoming nei successivi 30 giorni inclusi, tasks tutti gli attivi
  ordinati per dueDate. Data assente = oggi locale. Data invalida -> 4xx.

### Backup

- GET /api/backup -> {schemaVersion:1,items:[],tasks:[],history:[]}.
- POST /api/restore con {backup,mode:'replace'} sostituisce tutti i dati in modo
  atomico soltanto dopo validazione completa. Conserva identificativi e date.
  Rifiuta versioni sconosciute, tipi errati, duplicati, riferimenti pendenti e
  date invalide; nessun cambiamento parziale. Errori non fanno cadere il server.
- Corpo HTTP limitato a 2 MiB. Non fidarsi dei nomi file o dei dati importati.

## Contratto accessibile minimo per la prova browser

Titolo h1 Custode. Navigazione tramite pulsanti Oggetti, Manutenzioni, Backup.
L'inventario offre Nuovo oggetto; campi etichettati Nome oggetto, Categoria,
Posizione, Note; Salva oggetto. Ricerca etichettata Cerca oggetti. Azioni accessibili
Modifica <nome>, Elimina <nome>, con conferma esplicita prima dell'eliminazione.

Manutenzioni offre Nuovo intervento; campi Titolo intervento, Oggetto (select),
Scadenza, Ripeti ogni (giorni), Note intervento; Salva intervento. Azione Completa
<titolo>, Data completamento, Conferma completamento. Sezione Storico visibile.
Mostra conteggi e distingue scaduti, oggi e prossimi, senza suggerire invii esterni.

Backup offre Scarica backup (download JSON), File backup (input file),
Ripristina backup. Il ripristino richiede consenso esplicito in un secondo
passaggio: casella Confermo la sostituzione dei dati e Conferma ripristino.
Presenta esito/errore leggibile; nessuna sostituzione al solo caricamento del file.
Le altre scelte UI sono tue. Non aggiungere dati dimostrativi ai dati dell'utente.
