# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:

- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

Melden Sie sich bei SubQuery Project an und wählen Sie das Projekt aus, von dem Sie eine neue Version bereitstellen möchten. Sie können wählen, ob Sie entweder im Produktions- oder Staging-Slot bereitstellen möchten. Diese beiden Slots sind isolierte Umgebungen und haben jeweils ihre eigenen Datenbanken und werden unabhängig synchronisiert.

Wir empfehlen die Bereitstellung in Ihrem Staging-Slot nur für abschließende Staging-Tests oder wenn Sie Ihre Projektdaten erneut synchronisieren müssen. Sie können es dann ohne Ausfallzeiten in die Produktion überführen. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

Der Staging-Slot ist perfekt für:

- Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
- Aufwärmen und Indizierung von Daten für ein aktualisiertes SubQuery-Projekt, um Ausfallzeiten in Ihrer dApp zu vermeiden
- Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging-Slot](/assets/img/staging_slot.png)

#### Upgrade auf den neuesten Indexer- und Abfragedienst

Wenn Sie nur auf den neuesten Indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) oder den Abfragedienst ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) aktualisieren möchten, um von unseren regelmäßigen Leistungs- und Stabilitätsverbesserungen zu profitieren, Wählen Sie einfach eine neuere Version unserer Pakete aus und sparen Sie. Dies führt zu einer Ausfallzeit nur von wenigen Minuten.

#### When using `@subql/cli`
#### Requirement
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.
```
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```
#### Deploy New Version of your SubQuery Project

Geben Sie den Commit-Hash von GitHub ein (kopieren Sie den vollständigen Commit-Hash) der Version Ihrer SubQuery-Projektcodebasis, die Sie bereitstellen möchten. Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
