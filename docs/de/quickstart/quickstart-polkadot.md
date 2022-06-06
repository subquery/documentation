# Polkadot Schnellstart

In dieser Kurzanleitung beginnen wir mit einem einfachen Substrate/Polkadot-Starterprojekt und schließen dann mit der Indizierung einiger echter Daten ab. Dies ist eine hervorragende Grundlage, um mit der Entwicklung Ihres eigenen SubQuery-Projekts für Substrate/Polkadots zu beginnen.

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

**Das Ziel dieser Kurzanleitung ist es, das Standard-Starterprojekt so anzupassen, dass es mit der Indexierung aller Transfers von Polkadot beginnen kann, es sollte nur 10-15 Minuten dauern**

## Vorbereitung

### Lokale Entwicklungsumgebung

- [Node](https://nodejs.org/en/): Eine moderne (z. B. die LTS-Version) Installation von Node.
- [Docker](https://docker.com/): Für dieses Tutorial wird Docker benötigt

### Installieren Sie die SubQuery-CLI

Installieren Sie SubQuery CLI global auf Ihrem Terminal, indem Sie NPM verwenden:

```shell
# NPM
npm install -g @subql/cli
```

Bitte beachten Sie, dass wir die Verwendung von `yarn global` für die Installation von `@subql/cli` **NICHT** empfehlen, da es ein schlechtes Abhängigkeitsmanagement gibt, das zu Fehlern führen kann auf der ganzen Linie.

Sie können dann help ausführen, um die verfügbaren Befehle und die Verwendung anzuzeigen, die von der CLI bereitgestellt werden:

```shell
subql help
```

## Initialisieren Sie das SubQuery-Starterprojekt

Führen Sie in dem Verzeichnis, in dem Sie ein SubQuery-Projekt erstellen möchten, einfach den folgenden Befehl aus, um zu beginnen.

```shell
subql init
```

Während das SubQuery-Projekt initialisiert wird, werden Ihnen bestimmte Fragen gestellt:

- Projektname: Ein Projektname für Ihr SubQuery-Projekt
- Netzwerkfamilie: Die Layer-1-Blockchain-Netzwerkfamilie, für deren Indizierung dieses SubQuery-Projekt entwickelt wird. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Für diese Anleitung verwenden wir *"Substrat"*
- Netzwerk: Das spezifische Netzwerk, für das dieses SubQuery-Projekt entwickelt wird, um es zu indizieren. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Für diese Anleitung verwenden wir *"Polkadot"*
- Vorlagenprojekt: Wählen Sie ein SubQuery-Vorlagenprojekt aus, das als Ausgangspunkt für den Beginn der Entwicklung dient. Wir empfehlen, das Projekt *"subql-starter"* auszuwählen.
- RPC-Endpunkt: Geben Sie eine HTTPS-URL zu einem ausgeführten RPC-Endpunkt an, der standardmäßig für dieses Projekt verwendet wird. Sie können schnell auf öffentliche Endpunkte für verschiedene Polkadot-Netzwerke zugreifen, Ihren eigenen privaten dedizierten Nodes mit [OnFinality](https://app.onfinality.io) erstellen oder einfach den standardmäßigen Polkadot-Endpunkt verwenden. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). Für diese Anleitung verwenden wir den Standardwert *"https://polkadot.api.onfinality.io"*
- Git-Repository: Geben Sie eine Git-URL zu einem Repository an, in dem dieses SubQuery-Projekt gehostet wird (wenn es in SubQuery Explorer gehostet wird), oder akzeptieren Sie die bereitgestellte Standardeinstellung.
- Autoren: Geben Sie hier den Eigentümer dieses SubQuery-Projekts ein (z. B. Ihren Namen!) oder übernehmen Sie die vorgegebene Vorgabe.
- Beschreibung: Geben Sie einen kurzen Absatz zu Ihrem Projekt an, der beschreibt, welche Daten es enthält und was Benutzer damit tun können, oder akzeptieren Sie die bereitgestellte Standardeinstellung.
- Version: Geben Sie eine benutzerdefinierte Versionsnummer ein oder verwenden Sie die Standardversion (`1.0.0`).
- Lizenz: Stellen Sie die Softwarelizenz für dieses Projekt bereit oder akzeptieren Sie die Standardeinstellung (`MIT`).

Nachdem der Initialisierungsprozess abgeschlossen ist, sollten Sie sehen, dass ein Ordner mit Ihrem Projektnamen im Verzeichnis erstellt wurde. Der Inhalt dieses Verzeichnisses sollte mit dem identisch sein, was in der [Verzeichnisstruktur](../create/introduction.md#directory-structure) aufgeführt ist.

Führen Sie zuletzt im Projektverzeichnis den folgenden Befehl aus, um die Abhängigkeiten des neuen Projekts zu installieren.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Änderungen an Ihrem Projekt vornehmen

In dem gerade initialisierten Starterpaket ist eine Standardkonfiguration vorgesehen. Dies sind:

1. Das GraphQL-Schema in `schema.graphql`
2. Das Projektmanifest in `project.yaml`
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

Das Ziel dieser Schnellstartanleitung besteht darin, das Standard-Starterprojekt so anzupassen, dass mit der Indexierung aller Übertragungen von Polkadot begonnen werden kann.

### Aktualisierung Ihrer GraphQL-Schemadatei

Die Datei `schema.graphql` definiert die verschiedenen GraphQL-Schemas. Aufgrund der Funktionsweise der GraphQL-Abfragesprache bestimmt die Schemadatei im Wesentlichen die Form Ihrer Daten aus SubQuery. Es ist ein großartiger Ausgangspunkt, da Sie Ihr Endziel im Voraus definieren können.

Aktualisieren Sie die Datei `schema.graphql` wie folgt:

```graphql
type Transfer @entity {
  id: ID! # id-Feld ist immer erforderlich und muss so aussehen
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # Die Blockhöhe der Übertragung
  from: String! # Das Konto, von dem Überweisungen getätigt werden
  to: String! # Das Konto, von dem Überweisungen getätigt werden
}
```

**Wichtig: Wenn Sie Änderungen an der Schemadatei vornehmen, stellen Sie bitte sicher, dass Sie Ihr Typenverzeichnis neu generieren.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Sie finden die generierten Modelle im Verzeichnis `/src/types/models`. Weitere Informationen zur Datei `schema.graphql` finden Sie in unserer Dokumentation unter [Build/GraphQL Schema](../build/graphql.md)

### Aktualisierung der Projektmanifestdatei

Die Projektmanifestdatei (`project.yaml`) kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Chaindaten indiziert und umwandelt.

Die Manifestdatei wurde bereits korrekt eingerichtet, aber wir müssen unsere Handler ändern. Da wir planen, alle Polkadot-Übertragungen zu indizieren, müssen wir den Abschnitt `datasources` wie folgt aktualisieren:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer

```

Das bedeutet, dass wir jedes Mal, wenn ein `balances.Transfer`-Ereignis auftritt, eine `handleEvent`-Mapping-Funktion ausführen.

Weitere Informationen zur Projektmanifestdatei (`project.yaml`) finden Sie in unserer Dokumentation unter [Build-/Manifestdatei](../build/manifest.md)

### Mapping Funktion hinzufügen

Zuordnungsfunktionen definieren, wie Chaindaten in die optimierten GraphQL-Entitäten umgewandelt werden, die wir zuvor in der Datei `schema.graphql` definiert haben.

Navigieren Sie zur Standardzuordnungsfunktion im Verzeichnis `src/mappings`. Sie sehen drei exportierte Funktionen, `handleBlock`, `handleEvent` und `handleCall`. Löschen Sie sowohl die Funktionen `handleBlock` als auch `handleCall`, da wir uns nur mit der Funktion `handleEvent` befassen werden.

Die Funktion `handleEvent` empfängt Ereignisdaten, wenn ein Ereignis mit den Filtern übereinstimmt, die wir zuvor in unserer `project.yaml` angegeben haben. Wir werden es aktualisieren, um alle `balances.Transfer`-Ereignisse zu verarbeiten und sie in den zuvor erstellten GraphQL-Entitäten zu speichern.

Sie können die Funktion `handleEvent` wie folgt aktualisieren (beachten Sie die zusätzlichen Importe):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

Was dies tut, ist das Empfangen eines SubstrateEvent, das Übertragungsdaten in der Nutzlast enthält. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### Build the Project

In order to run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker.

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### Publish your SubQuery Project

SubQuery provides a free managed service where you can deploy your new project to. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Next Steps

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Now that you've had an insight into how to build a basic SubQuery project, the question is where to from here? If you are feeling confident, you can jump into learning more about the three key files. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
