# Valigia — caso controllato del 20 ottobre 2026

Il rapporto principale è ../valigia-comparison-20261020.html; la ricevuta completa è ../valigia-comparison-20261020.json. prompt.txt è il testo condiviso, starter/SPEC.md il contratto osservabile, protocol.json contiene modello, ordine e hash fissati. Le cartelle direct e iterfox conservano app, controlli, audit, screenshot e tracce prive di ragionamenti interni. Gli screenshot finali usano gli stessi dati di esempio inseriti dal driver, non contenuti inventati per rappresentare un risultato del modello.

## Aprire una delle app senza modello

Da direct/app oppure iterfox/app eseguire PORT=4350 node server.mjs e aprire http://127.0.0.1:4350. Il codice e localStorage sono locali; l'avvio non chiama Codex. Le pagine usano percorsi dalla root HTTP, quindi vanno servite e non aperte direttamente come file HTML.

## Ripetere il confronto con Codex reale

Servono Node 22.13+, Git, Chrome, un checkout Iterfox con node_modules già preparato e autenticazione Codex. Il seguente comando autorizza due nuove esecuzioni reali, massimo 20 minuti ciascuna; non installa dipendenze o cambia permessi. La directory di output deve essere nuova:

    node reproduce.mjs --source /percorso/al/checkout/iterfox --out /private/tmp/valigia-nuova-prova --authorize

Il riproduttore compila una copia privata del checkout, ricrea lo starter e sorteggia l'ordine. Report e dati restano nella nuova directory. Il sourceHead del nuovo runtime è registrato: usare una versione diversa produce un nuovo caso, non replica esattamente il software storico. La ripetizione completa non è stata eseguita dopo il confezionamento; il caso originale è realmente terminato e conservato. Reproducer e runner sono stati controllati sintatticamente.
