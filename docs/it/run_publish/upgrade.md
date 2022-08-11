# Distribuire una nuova versione del tuo progetto SubQuery

## Linee guida

Anche se hai la libertà di aggiornare e distribuire sempre nuove versioni del tuo progetto SubQuery, per favore sii cauto durante questo processo se il tuo progetto SubQuery è pubblico per il mondo. Alcuni punti chiave da notare:

- Se il tuo aggiornamento è un cambiamento radicale, crea un nuovo progetto (ad esempio `My SubQuery Project V2`) o avvisa la tua comunità del cambiamento attraverso i canali dei social media.
- Il deploy di una nuova versione del progetto SubQuery causa un certo tempo di inattività poiché la nuova versione indicizza la catena completa dal blocco di genesi.

## Distribuire le modifiche

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Convalida finale delle modifiche al tuo progetto SubQuery in un ambiente separato. Lo slot di staging ha un URL diverso da quello di produzione che puoi usare nelle tue dApps.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Preparare una nuova release per il tuo progetto SubQuery senza esporlo pubblicamente. Lo slot di staging non è mostrato al pubblico nell'Explorer e ha un URL unico che è visibile solo a te.

![Staging slot](/assets/img/staging_slot.png)

Compila il Commit Hash da GitHub (copia l'hash di commit completo) della versione del codice del tuo progetto SubQuery che vuoi distribuire. Questo causerà un tempo di inattività più lungo a seconda del tempo necessario per indicizzare la catena corrente. Puoi sempre fare rapporto qui per i progressi.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: If you haven't already, create a project on [SubQuery Projects](https://project.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Passi successivi - Collegati al tuo progetto

Una volta che il tuo deployment è stato completato con successo e i nostri nodi hanno indicizzato i tuoi dati dalla catena, sarai in grado di connetterti al tuo progetto tramite l'endpoint GraphQL Query visualizzato.

![Progetto distribuito e sincronizzato](/assets/img/projects-deploy-sync.png)

In alternativa, puoi cliccare sui tre puntini accanto al titolo del tuo progetto e visualizzarlo su SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
