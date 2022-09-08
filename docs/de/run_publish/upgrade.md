# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:

- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Verwendung von UI

Melden Sie sich bei SubQuery Project an und wählen Sie das Projekt aus, von dem Sie eine neue Version bereitstellen möchten. Sie können wählen, ob Sie entweder im Produktions- oder im Staging-Slot bereitstellen möchten. Diese beiden Slots sind isolierte Umgebungen und jeder hat seine eigenen Datenbanken und synchronisiert sich unabhängig voneinander.

Wir empfehlen die Bereitstellung in Ihrem Staging-Slot nur für abschließende Staging-Tests oder wenn Sie Ihre Projektdaten erneut synchronisieren müssen. Sie können es dann ohne Ausfallzeit in die Produktion hochstufen. Sie werden feststellen, dass das Testen schneller ist, wenn Sie [ein Projekt lokal ausführen](../run_publish/run.md), da Sie [Probleme einfacher debuggen](../academy/tutorials_examples/debug-projects.md) können.

Der Staging-Slot ist perfekt für:

- Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging-Slot](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

### Verwendung von CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Sie können Ihre Indexer- und Abfrageversionen direkt festlegen
$ subql Bereitstellung: Bereitstellung --indexerVersion=1.1.2 --queryVersion=1.1.1

// ODER Sie können die Schnittstelle verwenden, sie validiert Ihre IPFS-CID und rendert eine Liste von Bildversionen, die mit Ihrer Manifestdatei „project.yaml“ übereinstimmen

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

## Führen Sie ein Upgrade auf den neuesten Indexer- und Abfragedienst durch

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
