# Valigia

Una piccola lista da viaggio in italiano, utilizzabile su desktop e telefono. Nessun account, dipendenza da installare, font remoto o servizio esterno: l’app funziona con i file locali e il browser.

## Avvio locale

Con Node.js disponibile, dalla cartella del progetto esegui:

```sh
node server.mjs
```

Apri **http://127.0.0.1:4350** in Chrome. Per scegliere un’altra porta puoi usare, per esempio, `PORT=4351 node server.mjs`. Mantieni la stessa combinazione di indirizzo e porta per ritrovare i dati: `localStorage` è separato per origine. Aprire direttamente `index.html` dal filesystem non è supportato, perché l’app usa moduli JavaScript. Non servono npm o connessioni a Internet; il server serve solo i file del progetto su localhost.

## Uso

- Inserisci **Nome oggetto**, **Quantità** e, se vuoi, **Categoria**. Una categoria vuota diventa **Generale**. Usa **Aggiungi** oppure Invio dal modulo; il focus torna a Nome oggetto. La quantità torna a 1, mentre la categoria resta disponibile per l’oggetto successivo.
- Spunta un oggetto per indicare che tutte le sue unità sono **preparate**. La quantità si modifica direttamente nella riga: conferma con Invio o uscendo dal campo. **Elimina** rimuove subito la riga; dopo l’eliminazione il focus passa a un oggetto vicino o al modulo.
- **Filtra categoria** mostra una categoria oppure **Tutte**. I tre indicatori e la barra di avanzamento contano sempre le unità dell’intera lista, incluse quelle nascoste dal filtro. Se aggiungi un oggetto fuori dalla categoria selezionata, il messaggio invita a scegliere Tutte per vederlo.
- I controlli sono nativi e utilizzabili da tastiera: Tab e Maiusc+Tab per spostarti, Spazio per le checkbox, frecce per il filtro. Gli errori sono mostrati nel relativo riquadro e annunciati tramite `role="alert"`.

## Backup JSON

**Esporta backup** inserisce l’intera lista, anche quando è filtrata, nel campo **Backup JSON** e seleziona il testo. Copialo e salvalo in un file di testo. Il pulsante non crea un file automaticamente e il contenuto del campo non viene conservato al ricaricamento.

Per ripristinare una copia, incolla il documento nel campo e usa **Importa backup**. L’app valida tutto il documento prima di modificare la lista. Un backup valido **sostituisce integralmente la lista**, senza unire le righe; un backup valido vuoto la svuota. Il filtro torna a Tutte. Esporta prima la lista attuale se desideri conservarla. Un backup non valido lascia invariati lista, filtro e dati salvati; il testo errato rimane modificabile nel campo.

Formato di esempio:

```json
{
  "version": 1,
  "items": [
    {
      "id": "esempio-1",
      "name": "Calze 🧦",
      "quantity": 3,
      "category": "Vestiti",
      "packed": false
    }
  ]
}
```

Il documento richiede esattamente `version` e `items`; ogni riga richiede esattamente `id`, `name`, `quantity`, `category` e `packed`. Campi aggiuntivi o mancanti non sono accettati. La versione supportata è il numero `1`.

- Massimo **500 righe**, anche se hanno nomi uguali; le righe duplicate non vengono unite.
- ID stringa non vuota e non composta solo da spazi, unica nella lista, lunga al massimo 100 unità UTF-16. Gli ID delle nuove righe sono generati automaticamente e preservati dal backup.
- Nome da **1 a 80 caratteri Unicode**, categoria da **1 a 40** (conteggiati come punti di codice). Nel modulo e nelle modifiche del dominio vengono rimossi gli spazi agli estremi. Nel backup nome e categoria devono già essere privi di tali spazi. Accenti, emoji, alfabeti diversi e testo simile a HTML restano normale testo; non vengono interpretati come markup.
- Quantità numerica intera tra **1 e 99**. `packed` deve essere un booleano JSON `true` o `false`. Stringhe come `"3"` e `"false"` non vengono convertite. Una spunta riguarda tutta la riga: per preparare solo parte di una quantità, usa righe distinte.

## Salvataggio e limiti

La chiave del browser è **`valigia.v1`**, con lo stesso formato JSON del backup. Le modifiche valide e le importazioni vengono salvate automaticamente. Il solo caricamento, il filtro, l’esportazione e le operazioni rifiutate non scrivono nello storage.

Se i dati già salvati sono illeggibili o non validi, l’app mostra un avviso e parte da una lista vuota in memoria, senza sovrascriverli al caricamento. Una successiva aggiunta o importazione valida tenta di sostituire quei dati. Se ti servono gli originali, copiali dagli strumenti di sviluppo del browser prima di modificare la lista.

Se l’accesso o il salvataggio locale fallisce, l’avviso dichiara che i dati **non sono salvati**. La lista resta utilizzabile in memoria: puoi aggiungere, modificare, eliminare ed esportare. A ogni modifica successiva viene ritentato il salvataggio; l’avviso si risolve solo dopo un salvataggio riuscito. Finché compare, conserva un backup esterno prima di ricaricare o chiudere la pagina.

I dati non sono sincronizzati tra dispositivi, browser o schede aperte. In schede diverse l’ultima modifica salvata può sostituire quelle dell’altra scheda. Cancellare i dati del sito o usare la navigazione privata può far perdere la lista. I backup e il salvataggio non sono cifrati. Il supporto richiesto è Chrome recente con JavaScript abilitato; il server Node deve essere attivo per aprire o ricaricare la pagina.

## Controlli predisposti

Il progetto include i controlli del dominio (`node --test tests/domain.test.mjs`) e del browser (`node tests/browser.mjs`). Per il secondo, l’ambiente di verifica deve fornire Chrome e `VALIGIA_PLAYWRIGHT` con il percorso assoluto del modulo Playwright già disponibile. L’app non richiede queste risorse per essere utilizzata.
