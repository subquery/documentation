# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. Dies ist eine hervorragende Basis, um mit der Entwicklung Ihres eigenen SubQuery-Projekts zu beginnen.

**Wenn Sie nach Anleitungen für Substrat/Polkadot suchen, können Sie die [Substrat/Polkadot-spezifische Kurzanleitung](./quickstart-polkadot) lesen.**

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

## Vorbereitung

### Lokale Entwicklungsumgebung

- [Node](https://nodejs.org/en/): Eine moderne (z. B. die LTS-Version) Installation von Node.
- [Docker](https://docker.com/): Für dieses Tutorial wird Docker benötigt

### Installieren Sie die SubQuery-CLI

Installieren Sie die SubQuery-CLI mithilfe von NPM global auf Ihrem Terminal:

```shell
# NPM
npm install -g @subql/cli
```

Bitte beachten Sie, dass wir **NICHT** die Verwendung von `yarn global` für die Installation von `@subql/cli` empfehlen, da die Abhängigkeitsverwaltung schlecht ist, was zu einer Fehler auf der ganzen Linie.

Sie können dann help ausführen, um die verfügbaren Befehle und die Nutzung anzuzeigen, die von der CLI bereitgestellt werden

```shell
subql help
```

## Initialisieren Sie das SubQuery-Starterprojekt

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

Nachdem der Initialisierungsprozess abgeschlossen ist, sollten Sie sehen, dass ein Ordner mit Ihrem Projektnamen im Verzeichnis erstellt wurde. Der Inhalt dieses Verzeichnisses sollte mit dem identisch sein, was in der [Verzeichnisstruktur](../create/introduction.md#directory-structure) aufgeführt ist.

Führen Sie zuletzt im Projektverzeichnis den folgenden Befehl aus, um die Abhängigkeiten des neuen Projekts zu installieren.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Änderungen an Ihrem Projekt vornehmen

Im Startpaket, das Sie gerade initialisiert haben, haben wir eine Standardkonfiguration für Ihr neues Projekt bereitgestellt. Sie werden hauptsächlich an den folgenden Dateien arbeiten:

1. Das GraphQL-Schema in `schema.graphql`
2. Das Projektmanifest in `project.yaml`
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

Das Ziel dieser Schnellstartanleitung ist es, das Standard-Starterprojekt so anzupassen, dass mit der Indizierung aller Übertragungen aus dem bLuna-Smart-Vertrag begonnen werden kann.

### Aktualisierung Ihrer GraphQL-Schemadatei

Die Datei `schema.graphql` definiert die verschiedenen GraphQL-Schemas. Aufgrund der Funktionsweise der GraphQL-Abfragesprache bestimmt die Schemadatei im Wesentlichen die Form Ihrer Daten aus SubQuery. Es ist ein großartiger Ausgangspunkt, da es Ihnen ermöglicht, Ihr Endziel im Voraus zu definieren.

We're going to update the `schema.graphql` file to read as follows so we can index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**Wichtig: Wenn Sie Änderungen an der Schemadatei vornehmen, stellen Sie bitte sicher, dass Sie Ihr Typenverzeichnis neu generieren. Tun Sie dies jetzt.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Sie finden die generierten Modelle im Verzeichnis `/src/types/models`. Weitere Informationen zur Datei `schema.graphql` finden Sie in unserer Dokumentation unter [Build/GraphQL Schema](../build/graphql.md)

### Aktualisierung der Projektmanifestdatei

Die Projektmanifestdatei (`project.yaml`) kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Chaindaten indiziert und umwandelt.

Wir werden nicht viele Änderungen an der Manifestdatei vornehmen, da sie bereits korrekt eingerichtet wurde, aber wir müssen unsere Handler ändern. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Weitere Informationen zur Projektmanifestdatei (`project.yaml`) finden Sie in unserer Dokumentation unter [Build-/Manifestdatei](../build/manifest.md)

### Mapping Funktion hinzufügen

Zuordnungsfunktionen definieren, wie Chaindaten in die optimierten GraphQL-Entitäten umgewandelt werden, die wir zuvor in der Datei `schema.graphql` definiert haben.

Navigieren Sie zur Standardzuordnungsfunktion im Verzeichnis `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Wir fügen zusätzliche Informationen hinzu und verwenden dann die Funktion `.save()`, um die neue Entität zu speichern (SubQuery speichert diese automatisch in der Datenbank).

Weitere Informationen zu Mapping-Funktionen finden Sie in unserer Dokumentation unter [Build/Mappings](../build/mapping.md)

### Erstellen Sie das Projekt

Um Ihr neues SubQuery-Projekt auszuführen, müssen wir zuerst unsere Arbeit erstellen. Führen Sie den Build-Befehl im Stammverzeichnis des Projekts aus.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Wichtig: Wenn Sie Änderungen an Ihren Zuordnungsfunktionen vornehmen, müssen Sie Ihr Projekt neu erstellen**

## Ihr Projekt ausführen und abfragen

### Führen Sie Ihr Projekt mit Docker aus

Wann immer Sie ein neues SubQuery-Projekt erstellen, sollten Sie es immer lokal auf Ihrem Computer ausführen, um es zuerst zu testen. Der einfachste Weg, dies zu tun, ist die Verwendung von Docker.

Die gesamte Konfiguration, die steuert, wie ein SubQuery-Node ausgeführt wird, ist in dieser `docker-compose.yml`-Datei definiert. Für ein neues Projekt, das gerade initialisiert wurde, müssen Sie hier nichts ändern, aber Sie können mehr über die Datei und die Einstellungen in unserem Abschnitt [Ein Projekt ausführen](../run_publish/run.md) lesen

Führen Sie im Projektverzeichnis den folgenden Befehl aus:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Es kann einige Zeit dauern, die erforderlichen Pakete herunterzuladen ([`@subql/node`](https://www.npmjs.com/package/@subql/node),

`@subql/query`</7 > und Postgres) zum ersten Mal, aber bald werden Sie einen laufenden SubQuery-Knoten sehen. Seien Sie hier bitte geduldig.</p> 



### Fragen Sie Ihr Projekt ab

Öffnen Sie Ihren Browser und gehen Sie zu [http://localhost:3000](http://localhost:3000).

Sie sollten sehen, dass im Explorer ein GraphQL-Playground angezeigt wird und die Schemas, die zur Abfrage bereit sind. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

Für ein neues SubQuery-Starterprojekt können Sie die folgende Abfrage ausprobieren, um einen Eindruck davon zu bekommen, wie sie funktioniert, oder [mehr über die GraphQL-Abfragesprache erfahren](../run_publish/graphql.md).



```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```


You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)



### Veröffentlichen Sie Ihr SubQuery-Projekt

SubQuery bietet einen kostenlosen verwalteten Dienst, wenn Sie Ihr neues Projekt bereitstellen können. Sie können es in [SubQuery-Projekten](https://project.subquery.network) bereitstellen und mit unserem [Explorer](https://explorer.subquery.network) abfragen.

[Lesen Sie die Anleitung zum Veröffentlichen Ihres neuen Projekts in SubQuery Projects](../publish/publish.md)



## Weitere Schritte

Herzlichen Glückwunsch, Sie haben jetzt ein lokal ausgeführtes SubQuery-Projekt, das GraphQL-API-Anforderungen für die Übertragung von Daten von bLuna akzeptiert.

Nachdem Sie nun einen Einblick in die Erstellung eines grundlegenden SubQuery-Projekts erhalten haben, stellt sich die Frage, wie es weitergehen soll. Wenn Sie sich sicher fühlen, können Sie mehr über die drei Schlüsseldateien erfahren. Die Manifestdatei, das GraphQL-Schema und die Zuordnungsdatei im [Build-Abschnitt dieser Dokumentation](../build/introduction.md).

Fahren Sie andernfalls mit unserem [Academy-Bereich](../academy/academy.md) fort, wo Sie ausführlichere Workshops, Tutorials und Beispielprojekte finden. Dort sehen wir uns fortgeschrittenere Modifikationen an und tauchen tiefer in die Ausführung von SubQuery-Projekten ein, indem wir leicht verfügbare und Open-Source-Projekte ausführen.

Wenn Sie schließlich nach weiteren Möglichkeiten zum Ausführen und Veröffentlichen Ihres Projekts suchen, ist unser [Run & Der Abschnitt „Veröffentlichen“](../run_publish/run.md) enthält detaillierte Informationen zu allen Möglichkeiten zum Ausführen Ihres SubQuery-Projekts und zu anderen erweiterten GraphQL-Aggregations- und Abonnementfunktionen.
