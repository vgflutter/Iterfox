# Custode — prova di assenza del 20 ottobre 2026

Aprire index.html per risultati, interventi e immagini. La prima delega resta
BLOCKED a 3/4; il completamento ha una seconda autorizzazione separata. Non è
una prova riuscita senza recuperi. Il ledger originale e i worktree rimangono
nella directory locale della prova; primary-ended.json ed event-history documentano
i risultati salvati. Lo snapshot intermedio non è un checkpoint certificato.

Lo ZIP contiene l’app del checkpoint c11af3764f1deec8a596daa235c8dc85f983d1c8
con quattro guide rettificate dopo la run, come dichiarato in delivery-review.json.
Src, public, package e test sono identici al checkpoint. Per avviare l’app basta
Node 22 e npm start; non occorrono dipendenze o l’account del modello.

I test congelati e gli script di audit sono strumenti di questa prova e fanno
riferimento ai percorsi locali originali e a Chrome/Playwright del runtime Iterfox.
Per riprodurre l’audit altrove occorre adattare quei percorsi e predisporre il
browser. Questi strumenti non sono dipendenze necessarie per usare l’app.

I nove gruppi esterni iniziali e i tre di robustezza erano pronti prima del blocco.
I tre casi di rete sono controlli successivi sulle nuove recovery della fase di
completamento. Le osservazioni visive sono giudizi dell’assistente; non sono
certificazioni deterministiche o valutazioni di un secondo modello indipendente.

Nessun push, merge o pubblicazione. Le anteprime HTTP richiedono i processi sul Mac.

ledger-audit.mjs conserva le asserzioni iniziali per una prova senza recuperi;
non è il controllo finale del risultato osservato. audit-recovered.mjs verifica
la prima delega bloccata e il completamento separato, mantenendo tutte le prove
e le protezioni originali. Il rapporto non presenta quel primo controllo come superato.
