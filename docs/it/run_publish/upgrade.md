# Distribuire una nuova versione del tuo progetto SubQuery

## Linee guida

Anche se hai la libertà di aggiornare e distribuire sempre nuove versioni del tuo progetto SubQuery, per favore sii cauto durante questo processo se il tuo progetto SubQuery è pubblico per il mondo. Alcuni punti chiave da notare:

- Se il tuo aggiornamento è un cambiamento radicale, crea un nuovo progetto (ad esempio `My SubQuery Project V2`) o avvisa la tua comunità del cambiamento attraverso i canali dei social media.
- Il deploy di una nuova versione del progetto SubQuery causa un certo tempo di inattività poiché la nuova versione indicizza la catena completa dal blocco di genesi.

## Distribuire le modifiche

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Convalida finale delle modifiche al tuo progetto SubQuery in un ambiente separato. Lo slot di staging ha un URL diverso da quello di produzione che puoi usare nelle tue dApps.
- Riscaldamento e indicizzazione dei dati per un progetto SubQuery aggiornato per eliminare i tempi morti nella tua dApp
- Preparare una nuova release per il tuo progetto SubQuery senza esporlo pubblicamente. Lo slot di staging non è mostrato al pubblico nell'Explorer e ha un URL unico che è visibile solo a te.

![Staging slot](/assets/img/staging_slot.png)

Compila il Commit Hash da GitHub (copia l'hash di commit completo) della versione del codice del tuo progetto SubQuery che vuoi distribuire. Questo causerà un tempo di inattività più lungo a seconda del tempo necessario per indicizzare la catena corrente. Puoi sempre fare rapporto qui per i progressi.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Passi successivi - Collegati al tuo progetto

Una volta che il tuo deployment è stato completato con successo e i nostri nodi hanno indicizzato i tuoi dati dalla catena, sarai in grado di connetterti al tuo progetto tramite l'endpoint GraphQL Query visualizzato.

![Progetto distribuito e sincronizzato](/assets/img/projects-deploy-sync.png)

In alternativa, puoi cliccare sui tre puntini accanto al titolo del tuo progetto e visualizzarlo su SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
