# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:
- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

Melden Sie sich bei SubQuery Project an und wählen Sie das Projekt aus, von dem Sie eine neue Version bereitstellen möchten. Sie können wählen, ob Sie entweder im Produktions- oder Staging-Slot bereitstellen möchten. Diese beiden Slots sind isolierte Umgebungen und haben jeweils ihre eigenen Datenbanken und werden unabhängig synchronisiert.

Wir empfehlen die Bereitstellung in Ihrem Staging-Slot nur für abschließende Staging-Tests oder wenn Sie Ihre Projektdaten erneut synchronisieren müssen. Sie können es dann ohne Ausfallzeiten in die Produktion überführen. Man kann feststellen, dass das Testen schneller ist, wenn man [ein Projekt lokal ausführt](../run/run.md), da man [Probleme leichter beheben](../tutorials_examples/debug-projects.md) könnte.

Der Staging-Slot ist perfekt für:
* Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
* Aufwärmen und Indizierung von Daten für ein aktualisiertes SubQuery-Projekt, um Ausfallzeiten in Ihrer dApp zu vermeiden
* Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging-Slot](/assets/img/staging_slot.png)

#### Upgrade auf den neuesten Indexer- und Abfragedienst

Wenn Sie nur auf den neuesten Indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) oder den Abfragedienst ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) aktualisieren möchten, um von unseren regelmäßigen Leistungs- und Stabilitätsverbesserungen zu profitieren, Wählen Sie einfach eine neuere Version unserer Pakete aus und sparen Sie. Dies führt zu einer Ausfallzeit nur von wenigen Minuten.

#### Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

Geben Sie den Commit-Hash von GitHub ein (kopieren Sie den vollständigen Commit-Hash) der Version Ihrer SubQuery-Projektcodebasis, die Sie bereitstellen möchten. Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt
Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. Dort können Sie den In-Browser-Playground verwenden, um loszulegen - [lesen Sie hier mehr darüber, wie Sie unseren Explorer verwenden](../query/query.md).
