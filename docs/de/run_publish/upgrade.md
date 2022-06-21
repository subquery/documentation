# Stellen Sie eine neue Version Ihres SubQuery-Projekts bereit

## Richtlinien

Obwohl Sie jederzeit die Freiheit haben, neue Versionen Ihres SubQuery-Projekts zu aktualisieren und bereitzustellen, nehmen Sie bitte während dieses Vorgangs Rücksicht, wenn Ihr SubQuery-Projekt weltweit öffentlich ist. Einige wichtige Punkte, die Sie beachten sollten:

- Wenn Ihr Upgrade eine bahnbrechende Änderung darstellt, erstellen Sie entweder ein neues Projekt (z. B. `My SubQuery Project V2`) oder warnen Sie Ihre Community über die Social-Media-Kanäle ausreichend vor der Änderung.
- Das Bereitstellen einer neuen SubQuery-Projektversion verursacht eine gewisse Ausfallzeit, da die neue Version die vollständige Chain aus dem Genesis-Block indiziert.

## Deploy-Änderungen

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Abschließende Validierung von Änderungen an Ihrem SubQuery-Projekt in einer separaten Umgebung. Der Staging-Slot hat eine andere URL als die Produktion, die Sie in Ihren dApps verwenden können.
- Aufwärmen und Indizierung von Daten für ein aktualisiertes SubQuery-Projekt, um Ausfallzeiten in Ihrer dApp zu vermeiden
- Vorbereitung einer neuen Version für Ihr SubQuery-Projekt, ohne sie öffentlich zugänglich zu machen. Der Staging-Slot wird im Explorer nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist.

![Staging slot](/assets/img/staging_slot.png)

Geben Sie den Commit-Hash von GitHub ein (kopieren Sie den vollständigen Commit-Hash) der Version Ihrer SubQuery-Projektcodebasis, die Sie bereitstellen möchten. Dies führt zu einer längeren Ausfallzeit, je nachdem, wie lange es dauert, die aktuelle Chain zu indizieren. Hier können Sie jederzeit über Fortschritte berichten.

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

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
