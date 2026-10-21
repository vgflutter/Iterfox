# Usare Iterfox con il tuo agente

**Parli con un agente; gli chiedi di usare Iterfox per portare avanti il progetto.**
L'agente prepara il lavoro e usa i comandi di Iterfox. Il worker di Iterfox prosegue
anche quando quella conversazione finisce. Tu puoi seguire il grafico oppure
tornare più tardi e chiedere all'agente di leggere il risultato.

Oggi questo funziona con un agente che può usare il terminale sulla macchina dove
è installato Iterfox. Non c'è ancora un pulsante che collega automaticamente una
chat qualsiasi, e Iterfox non legge la coda Steer di un'altra conversazione.
Gli agenti di sviluppo interni usano Codex ed eseguono il lavoro in sequenza.

## Un primo messaggio da copiare

> Usa Iterfox per sviluppare questo progetto: [descrivi cosa vuoi ottenere].
> Il repository è [percorso]. Prepara tu una roadmap di risultati utilizzabili,
> i controlli e l'ambiente. Spiegami in poche righe cosa consegnerai, cosa potrai
> modificare e quali decisioni lasci a me. La finestra di lavoro è [durata].
> Quando il perimetro è autorizzato, avvia la delega in background. Conserva una
> ricevuta con ID e percorsi, così potremo riprendere anche in una nuova chat.
> Al ritorno mostrami il prodotto, le prove e i problemi ancora aperti.
> Segui `AGENTS.md` e `docs/agent-guide.md` nel repository Iterfox.

Non devi preparare i file JSON: è lavoro dell'agente. L'agente deve distinguere le
normali scelte già delegate dalle decisioni ancora riservate a te. Un'autorizzazione
può coprire tutti gli esiti della roadmap; non serve un nuovo prompt per ogni task.

## Cosa succede davvero

| Passaggio    | Cosa fai tu                                                             | Cosa fa il sistema                                                                                                       |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Preparazione | Descrivi il risultato e i confini.                                      | L'agente legge il progetto, prepara controlli, configurazione e dipendenze.                                              |
| Preflight    | Esamini il risultato proposto, i limiti e le decisioni che vuoi tenere. | Iterfox controlla configurazione e sorgente senza iniziare lo sviluppo.                                                  |
| Lavoro       | Autorizzi quel perimetro; puoi assentarti.                              | Il worker fa pianificare, sviluppare, verificare e correggere da Codex. Salva un checkpoint prima dell'esito successivo. |
| Governo      | Puoi dare un'indicazione, mettere in pausa o fermare.                   | Iterfox registra il contesto e rispetta limiti, verifiche e controlli del processo.                                      |
| Consegna     | Valuti il prodotto e decidi l'integrazione.                             | L'agente legge il rapporto, individua il codice e ti mostra risultati, prove e limiti.                                   |

Una **delega** copre più risultati. Una **missione** sviluppa uno di quei risultati.
I task sono il piano interno della missione e possono cambiare dopo un problema.
I **criteri** descrivono cosa deve passare; il **checkpoint** conserva il codice
verificato di un risultato. Il successo dei test e il tuo giudizio sul prodotto
restano due cose diverse.

## Come governi il lavoro

Puoi dire all'agente:

- «Apri lo stato della delega: cosa è pronto e cosa lo blocca?»
- «Nella missione attiva dai priorità a un flusso completo utilizzabile.»
- «Metti in pausa tutta la delega e mostrami il motivo del blocco.»
- «Riprendi entro gli stessi limiti, dopo aver risolto il problema.»
- «Prepara il rapporto e mostrami come avviare il risultato.»

Se inizi una nuova chat, indica la ricevuta `session.json` che l'agente ha salvato:
contiene ID, percorso dei dati e configurazione. Senza quei riferimenti la nuova
chat non eredita automaticamente lo stato della precedente. Il motore conserva
comunque il lavoro nel proprio archivio.

Le indicazioni durante il lavoro si applicano alla missione attiva e vengono
considerate al confine tra attività. Non cambiano da sole gli esiti futuri o i
criteri approvati. Per un cambio sostanziale di obiettivo o roadmap serve una nuova
configurazione esaminata. Un agente non deve rilanciare alla cieca una delega se ha
perso la risposta di avvio: prima controlla l'archivio esistente.

## A cosa serve il grafico

Avvia l'interfaccia sullo **stesso archivio dati** della delega. L'agente può farlo
per te; il comando è riportato nella [guida operativa](agent-guide.md).

- **Delegations:** vedi i risultati attesi, i prerequisiti e i checkpoint.
  Qui metti in pausa, riprendi o fermi l'intero lavoro.
- **Open mission in Live Trail:** entri nella missione e selezioni un'attività
  o una verifica per leggere prove, errori e correzioni. **Steer selected work**
  permette di inviare un'indicazione contestuale.
- **Read project brief:** leggi l'esito aggregato e scarichi il rapporto.
- **Projects:** conserva memoria del progetto e roadmap da preparare. Salvare
  un progetto non avvia una delega.
- **New run:** prepara una singola missione da un obiettivo o da un file.

Il grafico serve per capire e indirizzare il processo. Non puoi ancora trascinare
o collegare nodi per cambiare il flusso. Puoi governarlo anche interamente tramite
l'agente, senza tenere il browser aperto.

## La sera e il mattino

La sera l'agente ti lascia ID, percorso dei dati e conferma del worker avviato.
Il Mac deve restare acceso, con connessione disponibile: chiudere pagina o
terminale va bene; spegnere o mettere esplicitamente in stop il computer interrompe
il lavoro. Su macOS il worker richiede il blocco dello stop automatico per inattività.
Per questa modalità locale non serve un server.

Il mattino chiedi: «Leggi la ricevuta, controlla la delega e mostrami cosa posso
usare». L'agente legge stato e rapporto senza ricominciare da capo. Se trova un
blocco lo spiega, controlla cosa è rimasto e prosegue solo nel perimetro autorizzato.
Pause e riprese non azzerano la scadenza originale. Il processo non si riavvia da
solo dopo un riavvio del Mac.

Il codice viene sviluppato in copie Git isolate. Un checkpoint non porta
automaticamente le modifiche sul branch iniziale: l'agente deve indicarti la copia
di lavoro e preparare l'integrazione secondo le tue istruzioni.

## Cosa è già provato

La prova Svolta ha consegnato un'app utilizzabile con sette criteri e otto gruppi
di audit aggiuntivi. Sono servite anche tre continuazioni preparate dall'assistente:
nessun nuovo prompt di sviluppo dell'utente, ma nemmeno una notte interamente
autonoma. È un MVP utile da collaudare sul tuo flusso, con affidabilità ancora da
consolidare. [Risultati e limiti](evidence.md).

Per i comandi esatti e la configurazione, passa la [guida agli agenti](agent-guide.md)
al tuo assistente. Per installazione e demo, torna al [README](../README.it.md).
