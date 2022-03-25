# Distribuire una nuova versione del tuo progetto SubQuery

## Linee guida

Anche se hai la libertà di aggiornare e distribuire sempre nuove versioni del tuo progetto SubQuery, per favore sii cauto durante questo processo se il tuo progetto SubQuery è pubblico per il mondo. Alcuni punti chiave da notare:
- Se il tuo aggiornamento è un cambiamento radicale, crea un nuovo progetto (ad esempio `My SubQuery Project V2`) o avvisa la tua comunità del cambiamento attraverso i canali dei social media.
- Il deploy di una nuova versione del progetto SubQuery causa un certo tempo di inattività poiché la nuova versione indicizza la catena completa dal blocco di genesi.

## Distribuire le modifiche

Accedi a SubQuery Projects e trova il progetto di cui vuoi distribuire una nuova versione. Puoi scegliere di distribuire nello slot di produzione o in quello di staging. Questi due slot sono ambienti isolati e ognuno ha i propri database e si sincronizzano indipendentemente.

Raccomandiamo di effettuare il deploy sul tuo slot di staging solo per i test finali di staging o quando hai bisogno di risincronizzare i dati del tuo progetto. Potete poi promuoverlo alla produzione con zero downtime. Troverete che i test sono più veloci quando [eseguite un progetto localmente](../run/run.md) poiché potete più [facilmente eseguire il debug dei problemi](../tutorials_examples/debug-projects.md).

Lo slot per la messa in scena è perfetto per:
* Convalida finale delle modifiche al tuo progetto SubQuery in un ambiente separato. Lo slot di staging ha un URL diverso da quello di produzione che puoi usare nelle tue dApps.
* Riscaldamento e indicizzazione dei dati per un progetto SubQuery aggiornato per eliminare i tempi morti nella tua dApp
* Preparare una nuova release per il tuo progetto SubQuery senza esporlo pubblicamente. Lo slot di staging non è mostrato al pubblico nell'Explorer e ha un URL unico che è visibile solo a te.

![Slot per la messa in scena](/assets/img/staging_slot.png)

#### Aggiornamento all'ultimo Indexer e servizio di query

Se vuoi solo aggiornare all'ultimo indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) o servizio di query ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) per approfittare dei nostri regolari miglioramenti di prestazioni e stabilità, basta selezionare una versione più recente dei nostri pacchetti e salvare. Questo causerà solo pochi minuti di inattività.

#### Distribuire una nuova versione del tuo progetto SubQuery

Compila il Commit Hash da GitHub (copia l'hash di commit completo) della versione del codice del tuo progetto SubQuery che vuoi distribuire. Questo causerà un tempo di inattività più lungo a seconda del tempo necessario per indicizzare la catena corrente. Puoi sempre fare rapporto qui per i progressi.

## Passi successivi - Collegati al tuo progetto
Una volta che il tuo deployment è stato completato con successo e i nostri nodi hanno indicizzato i tuoi dati dalla catena, sarai in grado di connetterti al tuo progetto tramite l'endpoint GraphQL Query visualizzato.

![Progetto distribuito e sincronizzato](/assets/img/projects-deploy-sync.png)

In alternativa, puoi cliccare sui tre puntini accanto al titolo del tuo progetto e visualizzarlo su SubQuery Explorer. Lì puoi usare il parco giochi nel browser per iniziare - [leggi di più su come usare il nostro Explorer qui](../query/query.md).
