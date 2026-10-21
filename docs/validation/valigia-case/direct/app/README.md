# Valigia

Una piccola app in italiano per preparare una lista da viaggio. Funziona nel browser, senza account, servizi esterni, richieste di rete esterne o dipendenze aggiuntive.

## Avvio locale

Con Node.js già disponibile, dalla cartella del progetto:

```sh
node server.mjs
```

Apri `http://127.0.0.1:4350`. Per cambiare porta, usa ad esempio `PORT=4351 node server.mjs`. Non occorrono installazioni. Usa il server locale: aprire direttamente `index.html` con `file://` può impedire il caricamento dei moduli JavaScript.

## Utilizzo

- Inserisci **Nome oggetto**, **Quantità** e, se vuoi, **Categoria**. Premi **Aggiungi** o Invio. Il focus torna al nome; la quantità torna a 1 e la categoria resta disponibile per l’oggetto successivo.
- Il nome accetta da 1 a 80 caratteri; la categoria da 1 a 40. Gli spazi agli estremi vengono rimossi. Una categoria vuota nel form diventa **Generale**. I nomi Unicode e il testo simile a HTML sono visualizzati come testo.
- Modifica la quantità direttamente nella riga e conferma lasciando il campo (anche con Tab). Sono ammessi interi da 1 a 99. Un valore non valido mostra un errore e ripristina la quantità precedente.
- Spunta un oggetto per segnare come preparate tutte le sue unità; togli la spunta per ripristinarlo. Il pulsante con il cestino elimina la riga immediatamente.
- **Filtra categoria** limita gli oggetti visibili. I tre conteggi e la barra di avanzamento considerano sempre tutta la lista e contano le unità, non le righe.
- Tutti i controlli sono utilizzabili con Tab, Maiusc+Tab, Invio, Spazio e i comandi nativi del browser. Ogni riga ha etichette accessibili con il nome dell’oggetto. Gli errori sono visibili e annunciati alle tecnologie assistive.

## Salvataggio e backup

Le modifiche vengono salvate nella chiave `valigia.v1` di `localStorage`. Ricaricando la pagina sullo stesso browser e sullo stesso indirizzo, ritrovi la lista. Il filtro non viene conservato.

**Esporta backup** inserisce nel campo **Backup JSON** l’intera lista, anche con un filtro attivo, e seleziona il testo. Copialo in un file di testo per conservarlo o trasferirlo. Per recuperare una lista, incolla il JSON e premi **Importa backup**. L’importazione sostituisce la lista corrente, senza unire gli oggetti, soltanto dopo aver validato l’intero documento. Esporta prima la lista corrente se desideri conservarla. Un backup non valido lascia invariati lista e salvataggio locale.

Il formato è:

```json
{
  "version": 1,
  "items": [
    {
      "id": "esempio-1",
      "name": "Calze",
      "quantity": 3,
      "category": "Vestiti",
      "packed": false
    }
  ]
}
```

Il documento richiede versione numerica `1`, un array di massimo 500 righe, ID stringa non vuoti e univoci (massimo 100 caratteri), nomi e categorie validi, quantità numeriche intere e `packed` booleano. Non converte stringhe numeriche o booleani. Le lunghezze del testo contano i punti di codice Unicode; gli spazi agli estremi di nomi e categorie vengono rimossi. Gli eventuali campi aggiuntivi nei backup non sono conservati. Il modello restituisce nuovi stati senza modificare gli input; `updateItem` rifiuta campi diversi da nome, quantità, categoria e preparato.

Se i dati locali sono illeggibili, l’app lo segnala e non li sovrascrive al caricamento: mostra una lista vuota in memoria. Un’aggiunta o un’importazione valida avvia una nuova lista salvata e sostituisce quei dati. Un errore di lettura o scrittura viene mostrato chiaramente; anche senza salvataggio, l’app resta utilizzabile in memoria. **Esporta un backup prima di chiudere o ricaricare**, perché le modifiche non salvate andrebbero perse. Dopo ogni nuova modifica, l’app ritenta il salvataggio e comunica l’esito.

## Limiti

I dati sono locali al browser e all’origine (protocollo, host e porta). Cancellare i dati del sito, cambiare browser o utilizzare una sessione privata può rendere la lista indisponibile. Non sono previsti sincronizzazione fra dispositivi o schede aperte, cifratura, annullamento dell’eliminazione, unione dei duplicati o preparazione parziale di una riga. L’ultima modifica salvata da una scheda può sostituire quella di un’altra. L’esportazione genera testo da copiare, non scarica un file automaticamente. Servono JavaScript attivo e il server locale in esecuzione; non è prevista l’installazione come PWA.

## Controlli predisposti

```sh
node --test tests/domain.test.mjs
node tests/browser.mjs
```

Il secondo comando richiede Chrome e `VALIGIA_PLAYWRIGHT` impostata sul percorso assoluto del modulo Playwright già predisposto nell’ambiente. Avvia da solo un server locale temporaneo. Non occorre installare pacchetti. Verifica aggiunta con Invio, quantità, stato preparato, filtro con totali globali, ricaricamento, eliminazione, backup validi e invalidi, testo Unicode/HTML, layout a 390 px, assenza di errori JavaScript e richieste esterne e funzionamento in memoria quando il salvataggio fallisce.

Nella sandbox di sviluppo i 12 test del modello sono passati, così come i controlli di sintassi JavaScript. Il test browser non ha potuto iniziare: il server locale riceve `listen EPERM` su `127.0.0.1`. Anche il tentativo di avviare Chrome senza server si è chiuso all’avvio. I flussi reali in Chrome e il layout a 390 px restano quindi **non osservati** in questo ambiente, da verificare esternamente con il controllo predisposto.
