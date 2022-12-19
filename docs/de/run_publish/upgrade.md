# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:

- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

Es gibt drei Methoden, um eine neue Version Ihres Projekts für den SubQuery Managed Service bereitzustellen: Sie können die Benutzeroberfläche verwenden, sie direkt über das CLI-Tool `subql` erstellen oder eine automatisierte GitHub-Aktion verwenden.

### Verwendung von UI

Melden Sie sich bei SubQuery Project an und wählen Sie das Projekt aus, von dem Sie eine neue Version bereitstellen möchten. Sie können wählen, ob Sie entweder im Produktions- oder im Staging-Slot bereitstellen möchten. Diese beiden Slots sind isolierte Umgebungen und jeder hat seine eigenen Datenbanken und synchronisiert sich unabhängig voneinander.

Wir empfehlen die Bereitstellung in Ihrem Staging-Slot nur für abschließende Staging-Tests oder wenn Sie Ihre Projektdaten erneut synchronisieren müssen. Sie können es dann ohne Ausfallzeit in die Produktion hochstufen. Sie werden feststellen, dass das Testen schneller ist, wenn Sie [ein Projekt lokal ausführen](../run_publish/run.md), da Sie [Probleme einfacher debuggen](../academy/tutorials_examples/debug-projects.md) können.

Der Staging-Slot ist perfekt für:

- Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
- Aufwärmen und Indizieren von Daten für ein aktualisiertes SubQuery-Projekt, um Ausfallzeiten in Ihrer dApp zu vermeiden.
- Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging-Slot](/assets/img/staging_slot.png)

Geben Sie die IPFS-CID der neuen Version der Codebasis Ihres SubQuery-Projekts ein, die Sie bereitstellen möchten (siehe die Dokumentation zur Veröffentlichung in IPFS [hier](./publish.md)). Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) bereit.

```shell
// Sie können Ihre Indexer- und Abfrageversionen direkt festlegen
$ subql Bereitstellung: Bereitstellung --indexerVersion=1.1.2 --queryVersion=1.1.1

// ODER Sie können die Schnittstelle verwenden, sie validiert Ihre IPFS-CID und rendert eine Liste von Bildversionen, die mit Ihrer Manifestdatei „project.yaml“ übereinstimmen

$ subql deployment:deploy
```

### Verwenden von GitHub-Aktionen

Mit der Einführung der Bereitstellungsfunktion für die CLI haben wir [dem Starterprojekt in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) einen **Standardaktions-Workflow** hinzugefügt, mit dem Sie Ihre Änderungen automatisch veröffentlichen und bereitstellen können :

- Schritt 1: Nachdem Sie Ihr Projekt auf GitHub gepusht haben, erstellen Sie eine `DEPLOYMENT`-Umgebung auf GitHub und fügen Sie das Geheimnis [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) hinzu.
- Schritt 2: Falls noch nicht geschehen, erstellen Sie ein Projekt in [SubQuery Projects](https://project.subquery.network). Dies kann über die [UI](#using-the-ui) oder die [CLI](#using-the-cli) erfolgen.
- Schritt 3: Navigieren Sie nach der Erstellung Ihres Projekts zur Seite „GitHub-Aktionen“ Ihres Projekts und wählen Sie den Workflow `CLI-Bereitstellung` aus.
- Schritt 4: Sie sehen ein Eingabefeld, in das Sie den eindeutigen Code Ihres auf SubQuery Projects erstellten Projekts eingeben können. Sie können den Code aus der URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network) abrufen. Der Code basiert auf dem Namen Ihres Projekts, wobei Leerzeichen durch Bindestriche `-` ersetzt werden. z.B. `my project name` wird zu `my-project-name`.

::: Tipps Tipp
Sobald der Workflow abgeschlossen ist, sollten Sie sehen können, wie Ihr Projekt in unserem Managed Service bereitgestellt wird.
:::

Ein gängiger Ansatz besteht darin, die standardmäßige GitHub-Aktion so zu erweitern, dass Änderungen automatisch an unserem verwalteten Dienst bereitgestellt werden, wenn Code in den Hauptzweig zusammengeführt wird. Die folgende Änderung am GitHub Action-Workflow bewirkt dies:

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

Wenn Sie nur auf den neuesten Indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) oder Abfragedienst (`@subql/query`) aktualisieren möchten. Um von unseren regelmäßigen Leistungs- und Stabilitätsverbesserungen zu profitieren, wählen Sie einfach eine neuere Version unserer Pakete aus und speichern Sie. Dies verursacht nur wenige Minuten Ausfallzeit, da die Dienste, auf denen Ihr Projekt ausgeführt wird, neu gestartet werden.

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects_deploy_sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. Dort können Sie den Playground im Browser verwenden, um loszulegen - [lesen Sie hier mehr über die Verwendung unseres Explorers](../run_publish/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects_explorer.png)

::: info Hinweis Erfahren Sie mehr über die [GraphQL-Abfragesprache.](./graphql.md) :::
