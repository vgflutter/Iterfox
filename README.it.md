# Iterfox

**Affida lo sviluppo al tuo agente. Iterfox porta avanti il lavoro mentre ti assenti.**

[English](README.md) · [Guida pratica](docs/usage.it.md) · [Istruzioni per gli agenti](docs/agent-guide.md)

Iterfox è un supervisore locale per Codex. Tu descrivi il progetto al tuo agente;
l'agente prepara risultati attesi, controlli e confini, poi avvia il lavoro entro
il perimetro autorizzato. Un worker in background sviluppa, verifica, corregge i
problemi e passa al risultato successivo.

Puoi chiudere conversazione e browser. Al ritorno trovi il codice, le prove di ciò
che funziona e una spiegazione di ciò che richiede ancora attenzione.

È un **MVP**: ha già consegnato applicazioni reali, ma nella prova lunga sono
servite anche riprese preparate dall'assistente. L'affidabilità per una notte
intera senza interventi resta da dimostrare. [Risultati e limiti](docs/evidence.md).

## Come lo usi davvero

**Non devi scrivere tu il JSON o novanta prompt successivi.** Un agente con accesso
al terminale può preparare e governare Iterfox tramite CLI. Gli agenti di sviluppo
interni usano Codex e lavorano in sequenza.

Puoi iniziare così:

> Usa Iterfox per sviluppare [progetto/risultato] nel repository [percorso].
> Prepara tu roadmap, controlli e ambiente. Spiegami cosa consegnerai, quali file
> potrai modificare e quali decisioni lasci a me. La finestra è [durata]. Quando
> il perimetro è autorizzato, avvia la delega in background e conserva una ricevuta
> della sessione. Al ritorno mostrami il prodotto, le prove e i problemi aperti.
> Segui AGENTS.md e docs/agent-guide.md nel repository Iterfox.

Il processo ha cinque passaggi:

1. **Tu descrivi il risultato.** L'agente legge il progetto e prepara gli esiti
   utilizzabili, le verifiche, i file modificabili e i limiti.
2. **Autorizzi quel perimetro.** Il preflight mostra cosa verrà eseguito. Le
   autorizzazioni già date valgono; i normali task non richiedono nuove conferme.
3. **Iterfox lavora.** Codex pianifica, sviluppa, diagnostica e rivede il risultato.
   Il motore esegue le verifiche e salva un checkpoint prima dell'esito successivo.
4. **Puoi governarlo.** Chiedi stato o correzioni di direzione al tuo agente,
   metti in pausa o fermi il lavoro. Puoi farlo anche dal grafico.
5. **Valuti la consegna.** Leggi il rapporto, provi il prodotto e decidi come
   integrarlo. Il codice rimane in una copia Git isolata fino all'integrazione.

Oggi serve un agente capace di usare il terminale sulla macchina di Iterfox. Non
c'è un collegamento automatico a una chat qualsiasi o alla sua coda Steer. Dopo
l'avvio il worker continua anche se la chat termina. L'agente conserva ID e
percorsi in una ricevuta, così una nuova conversazione può ritrovare il lavoro.
[La guida pratica spiega l'intero percorso](docs/usage.it.md).

## Installazione e prima prova

Servono **Node 22.13+**, npm e Git. Dal repository Iterfox:

```sh
npm ci
npm run build
npm run demo
npm run iterfox -- ui --data .iterfox --port 4310
```

Apri **http://127.0.0.1:4310**. La demo esegue veri test Node con un provider
**DEMO programmato**: non chiama un modello. Seleziona un nodo del grafico, leggi
il controllo fallito e la correzione, poi apri Morning Brief o il replay.
Per sviluppare con Codex reale servono autenticazione Codex valida e connessione.

L'agente può usare direttamente `node /percorso/Iterfox/dist/cli.js`. Con
`npm install --global .` dopo la build, il comando diventa `iterfox`.
La [guida agli agenti](docs/agent-guide.md#try-the-two-outcome-example) contiene un
esempio completo su due risultati, con preflight eseguibile senza chiamare modelli.

## Come leggi e usi il grafico

| Vista                     | A cosa serve                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Delegations**           | Mostra esiti, prerequisiti e checkpoint; controlla pausa, ripresa e stop di tutta la delega.                 |
| **Live Trail**            | Apri una missione, selezioni attività o criterio, leggi prove ed errori e invii indicazioni contestuali.     |
| **Project morning brief** | Leggi risultati, lavoro aperto, decisioni richieste e scarichi il rapporto.                                  |
| **Projects**              | Conserva memoria del progetto e una roadmap gestita dall'operatore. Salvare un progetto non avvia il lavoro. |
| **New run**               | Prepara e autorizza una singola missione da un obiettivo o da un file.                                       |

Il grafico segue gli eventi registrati. Non puoi ancora trascinare o collegare
nodi per modificare il flusso. Un'indicazione viene considerata al confine tra
attività; non modifica da sola i criteri e non certifica il risultato.

![Live Trail della demo registrata](docs/screenshots/live-trail.png)

_Schermata reale della demo programmata; non è una prova con Codex reale._

## I comandi che usa l'agente

Per una delega con più risultati, l'agente prepara `delegation.json`, poi usa:

```sh
iterfox delegation preflight --config delegation.json --out preflight.json
iterfox delegation run --config delegation.json --preflight preflight.json --data /percorso/dati --night --yes
iterfox delegation status ID_DELEGA --data /percorso/dati --json
iterfox delegation report ID_DELEGA --data /percorso/dati --format json
iterfox delegation pause ID_DELEGA --data /percorso/dati
iterfox delegation resume ID_DELEGA --data /percorso/dati --night
iterfox delegation stop ID_DELEGA --data /percorso/dati
iterfox delegation report ID_DELEGA --data /percorso/dati --format html --out risultato.html
```

Configurazione, preflight e rapporti vanno fuori dal repository da sviluppare.
Si usa **lo stesso percorso assoluto dei dati** anche quando si apre l'interfaccia.
`--yes` esprime l'autorizzazione; `--preflight` controlla che commit e configurazione
siano quelli esaminati. Il preflight non avvia lavoro, non esegue verifiche e non
conferisce permessi. Il rapporto legge prove salvate senza ricontrollare il codice
attuale. Per una sola missione esiste `iterfox run --project`.
[Istruzioni esatte per l'agente](docs/agent-guide.md).

## Cosa succede quando vai a dormire

Il worker sopravvive alla chiusura di pagina, conversazione e terminale di avvio.
**Il Mac deve restare acceso, sveglio e connesso.** Il worker richiede il blocco
dello stop automatico per inattività; stop esplicito, spegnimento o perdita di
alimentazione interrompono il lavoro. Un worker terminato richiede controllo e
ripresa esplicita; non è un servizio che riparte al riavvio. Per lavorare dal Mac
non serve un server.

Nel perimetro autorizzato Iterfox può cambiare il piano, correggere difetti,
ripetere verifiche e attraversare gli esiti senza altri prompt. Le interruzioni
tecniche riconosciute hanno recuperi automatici limitati. Pause e riprese non
azzerano la durata o gli altri limiti. Cambi di permessi, criteri e decisioni
riservate restano sotto il tuo controllo.

Il motore distingue test deterministici, schermate osservate e giudizi AI. Il
«finito» dell'agente non basta per ottenere una spunta verde. Se cambiano gli
input, le prove possono diventare obsolete. Le valutazioni qualitative usano la
stessa integrazione Codex e non sono una certificazione indipendente.
[Verifiche](docs/verification.md) · [Sicurezza e recupero](docs/safety.md).

## Cosa abbiamo misurato

Svolta, l'app di progetti, attività, settimana, tempo e backup, passa **7 criteri
host e 8 gruppi di audit aggiuntivi**. L'esperimento ha richiesto quattro distinte
autorizzazioni tecniche e tre continuazioni preparate dall'assistente, senza nuovi
prompt di sviluppo dell'utente né modifiche manuali al codice applicativo. È
lavoro utile durante l'assenza; non dimostra ancora una notte interamente autonoma.
[Rapporto completo con codice, schermate e blocchi conservati](docs/validation/long-svolta-20261020/index.html).

È disponibile anche un runner SSH per un host esistente, ma il ciclo reale
Linux/SSH/systemd resta da validare. Non sono disponibili team paralleli di agenti,
integrazioni generiche con altri provider, merge/deploy automatici o stime del costo
monetario.

Per sviluppare Iterfox: `npm run check` esegue controlli dei tipi, test deterministici
e build. Le prove con Codex reale sono separate e facoltative.

[Documentazione](docs/README.md) · [Architettura](docs/architecture.md) · [Contribuire](CONTRIBUTING.md) · [Licenza MIT](LICENSE)
