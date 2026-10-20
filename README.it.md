# Iterfox — come si governa il lavoro

[English README](README.md)

**Tu stabilisci il risultato, i criteri di successo e i confini. Iterfox organizza
il lavoro, lo esegue, verifica e adatta il piano. Al ritorno decidi come integrare
il risultato.**

Questa guida descrive la versione attuale. Iterfox è un MVP locale che usa Codex:
alcuni passaggi, soprattutto la preparazione dell'ambiente e delle verifiche,
richiedono ancora attenzione tecnica.

## Il processo in un minuto

1. **Tu descrivi il risultato** e le decisioni che vuoi riservarti.
2. **Si prepara la delega.** Per più risultati approvi una roadmap con prerequisiti,
   verifiche, file modificabili e una finestra di lavoro condivisa.
3. **Autorizzi una volta quel perimetro.** Il worker può attraversare gli esiti
   approvati senza chiederti un nuovo avvio per ciascuno.
4. **Iterfox sviluppa, verifica e adatta il piano.** Puoi lasciarlo procedere,
   aggiungere contesto o interromperlo; le decisioni riservate restano tue.
5. **Tu rivedi il risultato e le prove**, poi decidi cosa integrare nel progetto.

Per lavoro continuo usa **Delegations**. **Projects** conserva memoria e roadmap;
**New run** prepara una singola missione. La creazione di una delega completa
richiede ancora una configurazione tecnica: un assistente può prepararla dal tuo
obiettivo, poi puoi importarla, controllare il preflight e autorizzarla. La UI
non genera ancora automaticamente una roadmap completa e verificata da una frase.

Al ritorno: **Delegations → Read project brief**. Leggi risultati, lavoro
rimanente e attenzione richiesta; scarica JSON, Markdown o **Download project
report HTML**. Le schede dei risultati mostrano i prerequisiti; **Open mission in
Live Trail** apre attività e prove della singola missione. Puoi mettere in pausa
o fermare l’intera delega. I limiti e i criteri approvati restano gli stessi.

Per una sola missione, segui [La prima sessione](#la-prima-sessione).
Altrimenti trovi più sotto [come avviarla](#avviare-linterfaccia).

## La ripresa tecnica ora è verificata

Dopo il limite emerso con Custode, **due prove con Codex reale** hanno scartato
la prima risposta del builder. Iterfox è ripartito da solo e ha completato in
**2 min 10 s e 2 min 7 s**, ogni volta con due criteri verificati e nessun Resume
dell’assistente. La seconda prova usa la versione finale. Le riprese sono limitate
a due per run, dopo la chiusura dei processi posseduti e il controllo dei file;
restano validi i limiti originali. Il Morning Brief mostra causa ed esito.
Sono prove brevi con guasto iniettato; una sessione lunga resta da collaudare.
[Protocollo, ledger, dieci casi di recupero e schermate](docs/validation/technical-recovery-20261020/index.html).

## Una simulazione di assenza su un’app nuova

Il 20 ottobre 2026 una delega ha sviluppato **Custode**, inventario domestico,
manutenzioni e backup, senza nuovi prompt dell’utente. La configurazione e i sei
controlli erano stati preparati dall’assistente. La prima esecuzione è rimasta
attiva per 152.0 minuti: tre checkpoint,
quarta funzionalità già verificata, poi blocco su una chiamata interrotta.
**Non ha ripreso da sola e resta registrata a 3/4.**

Un recupero dell’assistente, con snapshot di revisione non certificato e seconda
delega separata, ha completato integrazione e guida in 17.3 minuti. Nessun
altro prompt è stato richiesto all’utente; nessuna correzione manuale al codice
applicativo. Quattro guide sono state rettificate dopo la run per distinguere
ricevute runtime e revisione AI della stessa integrazione.

La consegna passa sei criteri host, **12 gruppi di audit esterno e 3 prove con
risposte di rete perse**; interfaccia e ripristino sono verificati anche a 390px.
Il valore osservato è lavoro utile durante l’assenza, con risultati e prove al
ritorno. In questa prova il limite concreto era il recupero autonomo delle interruzioni tecniche;
questa prova non stabilisce una superiorità universale su Codex diretto.
[Rapporto, codice, cronologia e schermate](docs/validation/night-custode-20261020/index.html).

## La prova sul prodotto reale

Il 20 ottobre 2026 Iterfox ha completato **tre esiti sul proprio codice con una
sola delega**: riepilogo delle prove, vista da consultare al ritorno e rapporto
HTML offline. L’host ha trasferito codice e ambiente fra missioni e salvato tre
checkpoint. Le verifiche approvate sono cresciute da 5 a 6 a 7; ogni missione è
partita senza prove ereditate. Il supervisore ha inoltre scoperto e fatto svolgere
un task sulle guide dopo i controlli verdi.

**È servito un recupero tecnico dell’assistente durante l’ultima missione:** il
monitor rileggeva troppo spesso lo storico. La stessa delega è stata messa in
pausa e ripresa con un runtime alleggerito, conservando orario originale, limiti,
criteri, run e checkpoint. Un precedente tentativo si era fermato prima di Codex
per un difetto nella preparazione delle dipendenze, anch’esso corretto e
conservato. Nessuna decisione aggiuntiva è stata chiesta all’utente. Non è una
prova interamente senza interventi né una validazione per una notte intera.
[Rapporto, protocollo, interventi e immagini reali](docs/validation/continuous-project-real-20261020.html).

La consegna aggiunge controlli regolari per API, esportazioni, HTML offline e
risposte lente: **86 test backend superati, 7 opzionali saltati, 11 casi Chrome e
3 flussi browser aggiuntivi**. Download e report offline sono stati verificati
anche sui dati delle tre missioni reali, senza modificare lo storico.

I precedenti [sviluppi sul prodotto](docs/validation/project-continuity-real.html)
e il [confronto Valigia con Codex diretto](docs/validation/valigia-comparison-20261020.html)
restano documentati nei rispettivi perimetri. Valigia ha dato risultati funzionali
uguali con criteri già preparati; la prova attuale misura la continuità fra
missioni e i recuperi necessari, senza stabilire un vantaggio universale su Codex.

## Chi decide cosa

| Aspetto                                                 | Il tuo controllo                                                            | Autonomia di Iterfox                                                                                                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Risultato da ottenere                                   | Descrivi l'obiettivo e approvi la versione proposta.                        | Codex può aiutarti a formularlo nella bozza iniziale.                                                                                                   |
| Criteri di successo e comandi di verifica               | Li controlli e autorizzi prima dell'avvio.                                  | Il motore esegue le verifiche approvate e registra gli esiti.                                                                                           |
| File modificabili e file protetti                       | Approvi i confini; restano attive anche le protezioni del motore.           | L'agente lavora nel perimetro autorizzato.                                                                                                              |
| Piano e ordine di lavoro                                | Puoi indicare priorità.                                                     | Pianifica, corregge i problemi e scopre ulteriore lavoro utile allo stesso obiettivo.                                                                   |
| Scelte di implementazione e design reversibili          | Puoi riservarti esplicitamente una decisione.                               | Negli altri casi sceglie e registra le proprie valutazioni.                                                                                             |
| Durata e limiti della sessione                          | Li approvi e puoi interrompere il lavoro.                                   | Continua finché può progredire entro quei limiti.                                                                                                       |
| Esiti successivi di una delegazione e checkpoint locali | Approvi il grafo degli esiti, le verifiche cumulative e i limiti condivisi. | L'host prosegue e crea i commit locali di checkpoint entro quei confini; l'agente di sviluppo non può committare o autorizzare il contratto successivo. |
| Integrazione e pubblicazione                            | Rivedi il risultato e decidi cosa portare nel progetto.                     | Push, merge, deploy e pubblicazione restano decisioni dell'operatore.                                                                                   |

Una **run** è una sessione autorizzata. Il **contratto** è l'insieme approvato di
obiettivo, criteri, comandi, percorsi e limiti. Il **piano** descrive le attività per
arrivarci e può cambiare durante il lavoro. Il **handoff** è il contesto aggiuntivo
che lasci all'agente: priorità, decisioni già prese e ipotesi da verificare.

**Il piano può cambiare senza chiederti ogni passaggio. I criteri di successo e i
limiti non possono essere cambiati silenziosamente per dichiarare il completamento.**

**Projects** conserva una scheda persistente e una roadmap di milestone, anche
senza una run aperta. Puoi creare e riaprire progetti, modificare decisioni e ipotesi
in elenchi separati, ispezionare prerequisiti e revisioni, collegare sessioni esistenti
e catturare handoff con provenienza e prove storiche ispezionabili. Puoi preparare la
milestone selezionata nel flusso modificabile **New run**, che richiede ancora bozza,
revisione e autorizzazione esplicita. La revisione di una milestone è una decisione
dell'operatore; le prove storiche non verificano una nuova sessione. Il riepilogo iniziale
mostra il lavoro corrente e l'accesso alla sessione collegata; **Project brief and
editing** apre memoria completa e cronologia. Dopo un salvataggio incerto o una
revisione concorrente, conserva la bozza, ispeziona i dati salvati e riconcilia
esplicitamente. I dati persistono in `ledger.sqlite` nella directory dati scelta;
gli input non salvati restano solo nella pagina. Nel flusso manuale New Run, per
continuare il codice serve un checkpoint committato e revisionato: viene copiato
il solo HEAD committato. Vedi
[procedura, recupero e limiti osservati](docs/project-workspace.md).

## Delegazioni continue e rapporto offline

Una delegazione approvata copre un grafo finito di esiti con un unico contratto.
L'host avvia la missione successiva ammissibile, ripete le verifiche cumulative
approvate e registra un checkpoint Git locale prima di proseguire, nei limiti
condivisi originali. L'agente sceglie i normali dettagli reversibili della missione
corrente; non può cambiare contratto, protezioni o permessi, committare o autorizzare
altro lavoro. Il checkpoint è un risultato tecnico: accettazione del prodotto,
integrazione, push, merge, pubblicazione e deploy restano all'operatore. Le milestone
di **Projects** mantengono il proprio processo di revisione.

Apri **Delegations**, seleziona una delegazione e scegli **Read project brief**.
Il **Project morning brief** riunisce avanzamento salvato degli esiti, lavoro
rimanente e domande o blocchi, con collegamenti alle missioni sorgenti e provenienza
espandibile. **Export project brief JSON** e **Export project brief Markdown**
mantengono i download `.json` e `.md` esistenti.

Per un rapporto portabile, scegli **Download project report HTML** nel **Project
morning brief**, accanto alle esportazioni JSON e Markdown. Il pulsante richiede
`GET /api/delegations/:id/report` autenticato e invia per te l'header
`X-Iterfox-Token`. La route restituisce un allegato `text/html` con nome `.html`
sicuro, mantenendo i controlli su host locale e stessa origine delle route del
brief; aprire il solo URL senza quell'header non autorizza il download. Salva
l'allegato e aprilo localmente nel browser. Stili incorporati e dettagli espandibili nativi
funzionano offline, senza script, risorse remote, server Iterfox attivo o chiamate
al modello. Stringhe salvate, comandi e percorsi degli artefatti sono testo con
escaping HTML; i file delle prove citate non sono inclusi.

Il rapporto conserva obiettivo e limiti originali, utilizzo registrato, questioni
aperte, risultati dei criteri e SHA/ref/fingerprint/sequenza dei checkpoint.
Legge i dati salvati senza avviare lavoro, consumare token del modello o rieseguire
controlli. Se manca lo storico di una missione, i totali sono parziali e i budget
rimanenti di turni e token sono sconosciuti; utilizzo non registrato e costo
monetario non sono disponibili. Lo stato successivo di una missione è distinto
dalle prove al checkpoint e non sostituisce la provenienza mancante. L'ora di
lettura non certifica la freschezza del codice corrente; il file offline non si
aggiorna da solo. Affermazioni AI e checkpoint tecnici non costituiscono accettazione
del prodotto. La [guida alle delegazioni](docs/continuous-delegation.md) descrive
route, aggiornamento, recupero e limiti delle verifiche.

Il controllo browser protetto della prova originaria copriva JSON/Markdown e
390px, senza il pulsante HTML. La suite ordinaria della consegna comprende ora
anche download HTML, lettura offline con JavaScript disabilitato e risposte lente
o fallite del brief. Un audit browser separato ha usato il ledger delle tre
missioni Codex concluse. [Risultati e recupero tecnico necessario](docs/validation/continuous-project-real-20261020.html).
La revisione del prodotto e la decisione di pubblicarlo restano tue.

## Governarlo dal grafico

**La direzione di prodotto è usare Live Trail come plancia principale:** vedere
che cosa sta succedendo e intervenire sul punto che richiede una decisione.
L'agente genera e adatta il percorso; tu puoi orientarlo guardando risultati,
dipendenze e prove. Non devi disegnare a mano tutti i passaggi prima di partire.

### Che cosa puoi fare già oggi

1. Apri **Live Trail** e seleziona un'attività o un criterio di accettazione.
2. Nel pannello laterale leggi obiettivo, stato, motivo della creazione, ruolo,
   tentativi, file, errori e prove disponibili. I collegamenti aprono le attività
   successive. Filtri e raggruppamento aiutano a seguire una parte del lavoro.
3. Usa **Pause**, **Resume** o **Stop** nella barra della run quando occorre
   intervenire sull'esecuzione. Sono controlli dell'intera sessione.
4. Nella regione **Steer selected work** trovi titolo, criterio e versione del
   contratto. Scegli **Request**, **Decision** o **Hypothesis**, scrivi in
   **Instruction for selected work** e usa **Send instruction**. **Draft a priority
   request** prepara una richiesta modificabile senza promettere un ordine di
   esecuzione. **Review Compass history** apre lo storico della nota registrata.
5. Il salvataggio aggiunge contesto alla riconciliazione Compass al confine di
   attività: non avvia worker e non modifica prove o accettazione. Se la run è
   inattiva serve **Resume** esplicito, entro i limiti originali e dopo aver risolto
   eventuali blocchi. Una run terminale richiede una sessione successiva autorizzata;
   in una delegazione approvata l'host può crearla per l'esito successivo ammissibile.

Le bozze Live Trail restano separate per run, versione e selezione mentre la
pagina è aperta, anche cambiando vista o dopo un errore. Un invio pendente resta
vincolato al destinatario originale; una risposta incerta conserva testo e tipo e
richiede di controllare lo storico prima di un reinvio manuale. Il replay è di sola
lettura. Durante attesa o incertezza il testo rimane copiabile e non modificabile;
sbloccare il retry manuale non invia nulla. Nei run terminali il testo conservato
resta copiabile per una sessione successiva da rivedere e autorizzare. Con Tab e
Invio/Spazio selezioni un nodo con focus visibile; Escape o la chiusura dei dettagli
riporta il focus al nodo. Le risposte collegate alle domande restano in **Project Compass** e le
revisioni del contratto usano il flusso di approvazione esistente.

**Recorded instructions** nell’inspector elenca le note pertinenti anche dopo un
ricaricamento, con un collegamento alla singola nota in Compass. Mostra criterio,
attività e versione registrati separatamente dalla disposizione e dalla versione
della riconciliazione. Dopo rinomina o rimozione di un criterio, il titolo originale
resta leggibile come riferimento storico. Gli export JSON e Markdown del Morning
Brief conservano questa provenienza: istruzione registrata e piano riconciliato
non costituiscono accettazione runtime.

La riconciliazione Compass riceve anche una descrizione limitata e di solo
riferimento dell’attività esatta: ID, titolo, tipo e obiettivo, incluse verifiche e
decisioni, insieme al titolo del criterio nella versione registrata. Questo rende
risolvibile «questo risultato» fra più attività dello stesso criterio, senza
modificare la nota salvata o conferire autorità di esecuzione o accettazione.

La prova finale usa il codice delle tre missioni completate: un'istruzione inviata
su una vera attività pianificata dal modello compare come **In the plan**, con
riferimento originale e motivazione. Otto controlli Chrome aggiuntivi coprono
bozze, errori e risposte incerte, invio da tastiera, replay, mobile e run completata;
sono fixture dichiarate. La prova separata con **Codex reale** ha corretto un errore
semantico introdotto apposta, poi completato sviluppo e tre criteri, con contratto
strutturalmente invariato e nessun altro messaggio dell'operatore dopo la ripresa
iniziale. Non misura l'effetto causale della nota sulla priorità del lavoro.

Il [rapporto del 19–20 ottobre](docs/validation/project-continuity-real.html)
distingue missioni reali, fixture, interventi e limiti. La
[guida tecnica dei controlli](docs/graph-controls.md#observation-status-for-this-change)
conserva anche le prove precedenti e il problema del confronto JSON nel vecchio
report, corretto nel test finale. I giudizi qualitativi sono **ASSESSED** della
stessa integrazione, non certificazioni indipendenti. Non sono disponibili
trascinamento per cambiare priorità, collegamenti modificabili o un editor visuale
del contratto; la copertura da tastiera resta parziale.

Una disposizione grafica diversa non può trasformare un controllo fallito in
passato, cancellare lo storico o eliminare un criterio senza revisione approvata.
La modifica del piano deve diventare un comando registrato dal runtime: spostare
un riquadro sullo schermo da solo non cambia l'esecuzione.

## La prima sessione

### 1. Scegli il progetto e descrivi il risultato

Apri **New run → From a goal**. In **Repository root** scegli la cartella Git del
progetto, anche tramite **Browse local folders**. In **Desired result** scrivi in
italiano ciò che vuoi trovare al ritorno.

Per esempio, per una futura sessione su Iterfox:

> Migliora il Morning Brief affinché chi torna dopo una sessione autonoma capisca
> subito che cosa è cambiato, quali risultati hanno prove e quali decisioni restano
> aperte. Mantieni funzionanti esportazione e viste esistenti. Rendi il riepilogo
> leggibile anche su schermo stretto, senza modificare il motore di esecuzione.

Indica risultati osservabili e vincoli. Non serve elencare ogni attività da fare.
La bozza e il lavoro isolato partono dal **commit corrente**: salva prima in Git
il codice che vuoi includere. Le modifiche non ancora committate restano escluse.

### 2. Lascia una consegna per la tua assenza

Nel campo facoltativo **Handoff for your absence** puoi aggiungere:

> Prima rendi completo e comprensibile il riepilogo, poi cura la grafica. Puoi
> scegliere autonomamente disposizione, spaziature e testi provvisori. La
> pubblicazione e le modifiche alle API restano decisioni mie. Se una parte
> dipende da una mia scelta, segnala la domanda e continua sul lavoro indipendente
> che rientra nell'obiettivo approvato.

Mantieni selezionato **Develop the project autonomously**. Questa opzione abilita
la revisione dei risultati e la scoperta di altro lavoro verso l'obiettivo dopo i
controlli verdi. Non richiede nuovi messaggi per ciascuna attività.

### 3. Genera e controlla la bozza

Premi **Generate draft with Codex**. Iterfox legge una selezione dei file committati
e propone obiettivo, criteri, comandi, percorsi e finestra di lavoro. In questa fase
non modifica il progetto, non esegue i controlli proposti e non avvia una run.

Prima di procedere, controlla soprattutto:

- **Risultato:** la formulazione corrisponde a quello che vuoi davvero?
- **Verifiche:** i criteri coprono il nuovo risultato, oltre a proteggere ciò che
  già funzionava? Un `npm test` esistente può essere utile ma non dimostrare la
  nuova funzionalità. I comandi mostrati sono programmi che autorizzi a eseguire
  sulla macchina; devono essere pertinenti e affidabili.
- **Confini:** i percorsi consentono il lavoro necessario? I file da preservare
  sono protetti? Una lista ampia non disabilita le protezioni del motore.
- **Finestra:** il tempo concesso è adeguato? Le nuove bozze normalmente propongono
  **8 ore**, modificabili. I controlli secondari sono in **Advanced session settings**.

La bozza distingue fonti lette, assunzioni e verifiche non ancora eseguite. Se manca
un comando di verifica, devi risolvere la lacuna prima dell'avvio. Puoi modificare
la bozza senza scrivere un file JSON completo; il campo tecnico del singolo comando
usa comunque una lista di argomenti, per esempio `["npm", "test"]`.

Oggi questo è un punto di governo ancora tecnico: la qualità delle verifiche
approvate determina che cosa Iterfox potrà certificare. Le politiche visive e le
rubriche qualitative richiedono una configurazione esplicita, caricabile con
**From a configuration file**; il semplice testo «controlla che sia bello» non
configura da solo una verifica grafica. [Guida alle verifiche](docs/verification.md).

### 4. Approva la sessione

Premi **Review preflight** e leggi il riepilogo finale di repository, commit,
obiettivo, controlli, percorsi, limiti e consegna. **Preflight** significa anteprima
di ciò che stai autorizzando.

Solo **Authorize & start Night Run** crea la sessione e avvia il lavoro. Modificare
la bozza dopo l'anteprima richiede una nuova revisione. Puoi approvare un'intera
sessione senza dover autorizzare ogni normale attività interna al suo perimetro.

## Che cosa fa mentre sei assente

Il ciclo è: **pianifica → sviluppa → verifica → valuta il risultato → adatta → continua**.
Le attività sono sequenziali. I ruoli di pianificazione, sviluppo e supervisione
usano la stessa integrazione Codex.

Quando emerge un problema, Iterfox conserva gli esiti, può creare una correzione e
ripete la verifica pertinente. Se una modifica rende obsoleta una prova, quella
prova perde validità. Quando i controlli sono verdi, in modalità progetto il
supervisore confronta anche il risultato con l'obiettivo e può aggiungere lavoro
ancora mancante senza aspettare un tuo messaggio.

Si ferma quando il risultato è considerato pronto, quando occorre un tuo intervento
o quando raggiunge un limite approvato. **Otto ore sono una finestra massima:** può
finire prima e non aggiunge funzionalità estranee per riempire il tempo. La durata
è tempo trascorso e comprende anche le pause. **Resume** non azzera il tempo né
estende automaticamente i limiti.

Se Codex restituisce una direzione Compass strutturata con riferimenti a criteri,
dipendenze, disposizioni delle note o gestione delle domande non validi, il motore
può chiedere una correzione fornendo il motivo. Il primo tentativo conta nel
`maxAttempts` originale; ogni chiamata consuma i limiti di turni, token e tempo già
approvati. Le proposte rifiutate restano ispezionabili e ricostruibili dal replay,
senza diventare lavoro attivo o prove. Restano conservati handoff ordinati e domande
con risposta collegata. L'audit precede ogni correzione; errori del provider,
autenticazione, timeout, rete, sandbox, integrità delle fonti e modifiche protette
continuano a bloccare.

Il [resoconto del recupero](docs/autonomous-recovery.md) conserva la ripresa
esplicita della prima missione, il tentativo fermato per il conflitto nei test e
la decisione dell'operatore che separa timeout e rifiuti semantici. In locale sono
passati i sette casi protetti di recupero e gli otto Compass, incluse 40 proiezioni
storiche congelate, oltre al typecheck. Le ricevute host del runtime, distinte dai
resoconti locali, registrano sullo snapshot dopo l'implementazione (`ccde5f1b4a4d…`,
19 ottobre 2026, 22:22–22:23 UTC) **7/7 casi di recupero, 73 test di regressione
passati con 7 opzionali saltati, typecheck server/UI e build di produzione riusciti,
9 casi Chrome passati**. La build conserva l'avviso Vite esistente: un chunk
JavaScript minificato di 668,44 kB supera 500 kB. Il resoconto include gli ID delle
ricevute e il fingerprint completo dello snapshot verificato. Le ricevute precedono
questo aggiornamento documentale; i successivi controlli di freschezza delle prove
e la revisione di progetto richiesta restano al processo di accettazione runtime
invariato.

Le verifiche sono poi tornate attuali e la missione ha raggiunto **COMPLETED**.
Dopo la raccolta, la prova SDK facoltativa sul codice revisionato è passata in
**4 min 20 s**: un errore semantico iniettato dopo una risposta valida, due chiamate
reali di orientamento, tre criteri verificati e contratto invariato. Task iniziale
e guasto di questa prova sono fixture esplicite; la missione sul prodotto è separata.
[Prove, versioni e limiti](docs/validation/project-continuity-real.json).

Il lavoro vive in una cartella Git separata, chiamata **worktree**, su un branch
`iterfox/<id>`. L'archivio conserva eventi, decisioni e prove. Le dipendenze necessarie
in quella cartella non vengono installate automaticamente: se mancano, occorre
prepararle nel worktree indicato dalla run prima di poter procedere con quei controlli.

Puoi chiudere la pagina o il terminale che ha avviato un Night Run. Il processo di
lavoro è separato. **Il computer deve restare acceso e operativo.** Su macOS il
worker richiede di impedire lo stop automatico per inattività; stop esplicito,
spegnimento e riavvio interrompono il processo locale. Se il worker resta vivo,
un timeout della chiamata o una disconnessione riconosciuta può essere recuperato
automaticamente, fino a **due riprese per run**, dopo la chiusura dei processi
Codex posseduti e il controllo dei file. Ogni ripresa consuma i limiti originali: non
riapre la finestra di lavoro e non azzera turni o utilizzo riportato.

**Pausa e Stop hanno sempre precedenza.** Un worker morto, processi la cui chiusura
non è confermata, modifiche protette e decisioni riservate rimangono bloccati: li
controlli e riprendi esplicitamente. Nel **Morning Brief → Technical recovery**
vedi la causa registrata e se la chiamata è ripartita da sola.
[Prova reale con risposta persa e recupero automatico](docs/validation/technical-recovery-20261020/index.html).

Non serve un server separato se lasci acceso il Mac. Il runner SSH è un'opzione
per una macchina Linux remota già disponibile; il ciclo completo su un vero host
SSH non è ancora collaudato. [Runner remoto](docs/cloud-runner.md).

## Come intervenire durante il lavoro

Apri la run e scegli **Project Compass**. Puoi aggiungere tre tipi di contesto:

| Tipo nell'interfaccia | Quando usarlo                                     | Esempio                                                |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| **Request**           | Richiesta di lavoro o priorità entro l'obiettivo. | «Prima completa il riepilogo, poi rifinisci i colori.» |
| **Decision**          | Una scelta che hai già fatto.                     | «Conserva i nomi attuali delle sezioni.»               |
| **Hypothesis**        | Un'idea ancora da verificare.                     | «Forse tre sezioni sono più comprensibili di cinque.»  |

Un messaggio nuovo viene conciliato con il resto della direzione **dopo l'attività
in corso**. Non interrompe a metà una chiamata Codex. Se devi fermare subito il
lavoro, usa **Pause** e attendi che lo stato diventi `PAUSED`.

Per ogni nota puoi vedere:

- **Awaiting reconciliation:** ricevuta, ancora da valutare.
- **In the plan:** considerata nel piano; non significa già implementata.
- **Later:** rimandata, con una motivazione.
- **Your decision:** serve una tua scelta; il lavoro dipendente può essere sospeso
  mentre quello indipendente continua.
- **Answered:** una risposta collegata ha sostituito la nota precedente, che resta
  nello storico.

Per una domanda usa **Answer this question**, scrivi la risposta e salvala. Il
collegamento alla domanda conta: un messaggio generico non la chiude automaticamente.
Se nel frattempo la run è diventata `BLOCKED`, devi anche premere **Resume**.
Salvare una nota su una run ferma non avvia un worker.

Compass è interno a Iterfox: i messaggi lasciati nella coda di un'altra chat Codex
non vengono importati. Le run `COMPLETED` o `FAILED` richiedono una nuova sessione
per un nuovo obiettivo.

### Cambiare priorità o cambiare il contratto?

«Fai prima il riepilogo mobile» è una priorità: usa Compass.
«Modifica anche le API protette», «rimuovi questo controllo» o «lavora altre otto
ore» cambia i confini approvati: una nota non basta.

Per cambiare il contratto, oggi usi la CLI: metti in pausa la run, attendi l'uscita
del worker, proponi una configurazione completa aggiornata, confrontala con quella
attuale e approvala esplicitamente. Poi riprendi. La revisione è versionata e
invalida le prove precedenti. Le protezioni del motore restano attive; per modifiche
legittime a test o configurazioni protette prepara tu un commit rivisto e una nuova
run. Il testo delle note non può concedere permessi aggiuntivi.

## Come leggere lo stato e agire

| Stato della run | Significato e azione                                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RUNNING`       | Il lavoro procede. Puoi osservare, aggiungere contesto o interrompere.                                                                                                                                         |
| `PAUSED`        | Il lavoro è stato interrotto; file e storico restano. **Resume** riprende nei limiti originali.                                                                                                                |
| `STOPPED`       | Hai arrestato la sessione. Non cancella i cambiamenti; anche questo stato può essere ripreso esplicitamente.                                                                                                   |
| `BLOCKED`       | Leggi **Attention required**: può mancare una decisione, una dipendenza, una condizione operativa o essere stato raggiunto un limite. Risolvi la causa prima di riprendere; **Resume** da solo non la elimina. |
| `PARTIAL`       | Il risultato non è più interamente certificato, per esempio perché una modifica ha reso obsolete delle prove. Controlla cosa manca prima di riprendere.                                                        |
| `COMPLETED`     | Le politiche approvate sono soddisfatte con prove correnti e, in modalità progetto, il supervisore considera il risultato pronto. È il momento della tua revisione.                                            |
| `FAILED`        | La run è terminata in errore. Ispeziona motivo e storico; non è uno stato riprendibile.                                                                                                                        |

**Pause** e **Stop** interrompono l'attività corrente e conservano quanto già
scritto: non sono un annullamento delle modifiche. Attendi che il worker termini
prima di fare interventi manuali o di riprendere. Dopo un arresto forzato del
processo, controlla anche eventuali processi rimasti attivi per quella run.

Se si perde la risposta all'avvio, usa **Refresh and inspect runs** e apri la
sessione esistente. **Browse runs** permette di ritrovare le run anche nel layout
mobile. Verificare una sessione già creata evita di autorizzarne una seconda per
recuperare la prima. [Dettagli del recupero](docs/goal-launch.md#discarding-and-recovery).

## Che cosa guardare al ritorno

Apri **Morning Brief** per capire cosa è stato ottenuto, cosa manca e quali
decisioni richiedono te. Poi usa **Proof Ledger** per aprire le prove e confronta
il codice nel worktree con il commit di partenza. Il Morning Brief mostra il
percorso della cartella e **Inspect worktree diff** apre le modifiche registrate.

| Indicazione  | Cosa puoi concludere                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `PASSED`     | Il controllo deterministico approvato è passato sugli input registrati e ancora validi.                            |
| `ASSESSED`   | Una valutazione AI ha soddisfatto la rubrica approvata. È un giudizio probabilistico, distinto da un test passato. |
| `STALE`      | La prova è storica e non certifica più il risultato corrente.                                                      |
| `UNVERIFIED` | Il risultato non ha ancora una prova valida che soddisfi il criterio.                                              |

**Live Trail** mostra le attività e i cambiamenti del piano; **Project Compass**
mostra direzione, note, scelte provvisorie e revisioni del supervisore. Un'attività
finita e un criterio verificato sono cose diverse.

Controlla anche l'esperienza reale del prodotto: i test configurati possono non
coprire una richiesta. Il supervisore usa la stessa integrazione AI e non è un
revisore indipendente. Decidi poi quali modifiche conservare e integrare. Il commit
locale di checkpoint creato dall'host in una delegazione approvata conserva il
risultato tecnico e non sostituisce questa decisione. Push, merge, pubblicazione e
deploy richiedono una decisione separata dell'operatore.

## Avviare l'interfaccia

Da una copia del repository servono Node 22.13 o successivo, npm e Git.
Per il lavoro reale serve anche l'autenticazione Codex funzionante.

```sh
# Dalla cartella di Iterfox.
npm ci
npm run build

# Sostituisci il percorso con la cartella dove conservare le sessioni.
node dist/cli.js ui --data /percorso/assoluto/iterfox-data --port 4310
```

Apri <http://127.0.0.1:4310>. Se hai già un'istanza su un'altra porta, usa il suo
indirizzo. Tutti i comandi di gestione devono usare lo stesso percorso `--data`:
è l'archivio delle sessioni e degli eventi, distinto dal repository da sviluppare.

La dimostrazione senza modello si avvia con `npm run demo` e crea un piccolo
progetto con un provider etichettato **DEMO**. Il pulsante **New run** avvia invece
il percorso con Codex reale. [Installazione e autenticazione](README.md#run-real-codex).

## Comandi essenziali, se servono

Eseguili dalla cartella di Iterfox. Sostituisci `RUN_ID` con l'identificativo della
sessione e usa sempre il suo archivio `--data`. Per governare una run già avviata
dalla UI non serve lanciare un altro comando `run`.

```sh
node dist/cli.js status --data /percorso/assoluto/iterfox-data
node dist/cli.js pause RUN_ID --data /percorso/assoluto/iterfox-data
node dist/cli.js resume RUN_ID --night --data /percorso/assoluto/iterfox-data
node dist/cli.js stop RUN_ID --data /percorso/assoluto/iterfox-data
node dist/cli.js brief RUN_ID --out morning.md --data /percorso/assoluto/iterfox-data
```

Per una revisione del contratto, dopo la pausa e l'uscita del worker:

```sh
# revised.json deve essere una configurazione completa che hai controllato.
node dist/cli.js contract RUN_ID --propose revised.json --data /percorso/assoluto/iterfox-data

# Mostra il confronto e chiede conferma interattiva.
node dist/cli.js contract RUN_ID --approve --data /percorso/assoluto/iterfox-data

node dist/cli.js resume RUN_ID --night --data /percorso/assoluto/iterfox-data
```

La pausa consente di cambiare un contratto di una run non conclusa. Nel flusso
manuale, per una run già completata o una nuova direzione di progetto avvia una
nuova sessione. La continuazione fra esiti già approvati di una delegazione è
invece responsabilità dell'host e resta nei limiti originali.

## Che cosa è già stato osservato

Il 19 ottobre 2026 una sessione su Iterfox stesso ha completato sei unità di
sviluppo in circa 66 minuti. Dopo i controlli verdi il supervisore ha individuato
un problema di recupero delle run su mobile e ha aggiunto e implementato un nuovo
compito. Non sono serviti ulteriori messaggi dell'utente dopo l'avvio; un assistente
esterno ha fornito una nota con preferenze già espresse su durata e controlli.

Quella consegna originaria aveva superato 58 test automatici e 7 test nel browser. Prove separate
hanno osservato la generazione con Codex reale, l'avvio effettivo del worker e il
recupero dopo una risposta di autorizzazione deliberatamente persa. I worker di
quelle prove di avvio sono stati fermati intenzionalmente.

È una prova circoscritta, non un collaudo di una notte intera o della preparazione
automatica di qualunque progetto. [Risultati e limiti](docs/validation.md).

Per approfondire: [avvio da un obiettivo](docs/goal-launch.md),
[sviluppo autonomo](docs/project-development.md), [Project Compass](docs/project-compass.md),
[verifiche visive e qualitative](docs/verification.md), [sicurezza e recupero](docs/safety.md).
