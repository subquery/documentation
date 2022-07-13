# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:

- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

Es gibt zwei Methoden zum Bereitstellen einer neuen Version Ihres Projekts für den SubQuery Managed Service: Sie können die Benutzeroberfläche oder direkt über das CLI-Tool `subql` verwenden.

### Verwendung von UI

Melden Sie sich bei SubQuery Project an und wählen Sie das Projekt aus, von dem Sie eine neue Version bereitstellen möchten. Sie können wählen, ob Sie entweder im Produktions- oder im Staging-Slot bereitstellen möchten. Diese beiden Slots sind isolierte Umgebungen und jeder hat seine eigenen Datenbanken und synchronisiert sich unabhängig voneinander.

Wir empfehlen die Bereitstellung in Ihrem Staging-Slot nur für abschließende Staging-Tests oder wenn Sie Ihre Projektdaten erneut synchronisieren müssen. Sie können es dann ohne Ausfallzeit in die Produktion hochstufen. Sie werden feststellen, dass das Testen schneller ist, wenn Sie [ein Projekt lokal ausführen](../run_publish/run.md), da Sie [Probleme einfacher debuggen](../academy/tutorials_examples/debug-projects.md) können.

Der Staging-Slot ist perfekt für:

- Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging-Slot](/assets/img/staging_slot.png)

Geben Sie den Commit-Hash von GitHub ein (kopieren Sie den vollständigen Commit-Hash) der Version Ihrer SubQuery-Projektcodebasis, die Sie bereitstellen möchten. Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken)  ist bereit.

```shell
// Sie können Ihre Indexer- und Abfrageversionen direkt festlegen
$ subql Bereitstellung: Bereitstellung --indexerVersion=1.1.2 --queryVersion=1.1.1

// ODER Sie können die Schnittstelle verwenden, sie validiert Ihre IPFS-CID und rendert eine Liste von Bildversionen, die mit Ihrer Manifestdatei „project.yaml“ übereinstimmen

$ subql deployment:deploy
```

## Führen Sie ein Upgrade auf den neuesten Indexer- und Abfragedienst durch

Wenn Sie nur auf den neuesten Indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) oder Abfragedienst (

`@subql/query`</) aktualisieren möchten 2>) Um von unseren regelmäßigen Leistungs- und Stabilitätsverbesserungen zu profitieren, wählen Sie einfach eine neuere Version unserer Pakete aus und speichern Sie. Dies verursacht nur wenige Minuten Ausfallzeit, da die Dienste, auf denen Ihr Projekt ausgeführt wird, neu gestartet werden.</p> 



## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
