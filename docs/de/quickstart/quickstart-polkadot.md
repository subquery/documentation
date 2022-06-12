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

Was dies tut, ist das Empfangen eines SubstrateEvent, das Übertragungsdaten in der Nutzlast enthält. Wir extrahieren diese Daten und instanziieren dann eine neue Entität `Transfer`, die wir zuvor in der Datei `schema.graphql` definiert haben. Wir fügen zusätzliche Informationen hinzu und verwenden dann die Funktion `.save()`, um die neue Entität zu speichern (SubQuery speichert diese automatisch in der Datenbank).

Weitere Informationen zu Mapping-Funktionen finden Sie in unserer Dokumentation unter [Build/Mappings](../build/mapping.md)

### Erstellen Sie das Projekt

Um Ihr neues SubQuery-Projekt auszuführen, müssen wir zuerst unsere Arbeit erstellen. Führen Sie den Build-Befehl im Stammverzeichnis des Projekts aus.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Wichtig: Wenn Sie Änderungen an Ihren Zuordnungsfunktionen vornehmen, müssen Sie Ihr Projekt neu erstellen**

## Ihr Projekt ausführen und abfragen

### Führen Sie Ihr Projekt mit Docker aus

Wann immer Sie ein neues SubQuery-Projekt erstellen, sollten Sie es immer lokal auf Ihrem Computer ausführen, um es zuerst zu testen. Der einfachste Weg, dies zu tun, ist die Verwendung von Docker.

Die gesamte Konfiguration, die steuert, wie ein SubQuery-Node ausgeführt wird, ist in der Datei `docker-compose.yml` definiert. Für ein neues Projekt, das gerade initialisiert wurde, müssen Sie nichts ändern, aber Sie können mehr über die Datei und die Einstellungen in unserem Abschnitt [Ein Projekt ausführen](../run_publish/run.md) lesen.

Führen Sie im Projektverzeichnis den folgenden Befehl aus:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Es kann einige Zeit dauern, die erforderlichen Pakete herunterzuladen ([`@subql/node`](https://www.npmjs.com/package/@subql/node),

`@subql/query`</7 > und Postgres) zum ersten Mal, aber bald sollten Sie einen laufenden SubQuery-Node auf dem Terminalbildschirm sehen. </p> 



### Fragen Sie Ihr Projekt ab

Öffnen Sie Ihren Browser und gehen Sie zu [http://localhost:3000](http://localhost:3000).

Sie sollten einen GraphQL-Playground im Browser und die Schemas sehen, die zur Abfrage bereit sind. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

Probieren Sie für ein neues SubQuery-Starterprojekt die folgende Abfrage aus, um zu verstehen, wie sie funktioniert, oder erfahren Sie mehr über die [GraphQL-Abfragesprache](../run_publish/graphql.md).



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




### Veröffentlichen Sie Ihr SubQuery-Projekt

SubQuery bietet einen kostenlosen verwalteten Dienst, in dem Sie Ihr neues Projekt bereitstellen können. Sie können es in [SubQuery-Projekten](https://project.subquery.network) bereitstellen und mit unserem [Explorer](https://explorer.subquery.network) abfragen.

Lesen Sie den Leitfaden zum [Veröffentlichen Ihres neuen Projekts in SubQuery Projects](../run_publish/publish.md)



## Weitere Schritte

Herzlichen Glückwunsch, Sie haben jetzt ein lokal ausgeführtes SubQuery-Projekt, das GraphQL-API-Anforderungen für die Datenübertragung akzeptiert.

Nachdem Sie nun einen Einblick in die Erstellung eines grundlegenden SubQuery-Projekts erhalten haben, stellt sich die Frage, wie es weitergehen soll. Wenn Sie sich sicher fühlen, können Sie mehr über die drei Schlüsseldateien erfahren. Die Manifestdatei, das GraphQL-Schema und die Zuordnungsdatei befinden sich im [Abschnitt „Build“ dieser Dokumentation](../build/introduction.md).

Fahren Sie andernfalls mit unserem [Academy-Bereich](../academy/academy.md) fort, wo wir ausführlichere Workshops, Tutorials und Beispielprojekte anbieten. Dort sehen wir uns fortgeschrittenere Modifikationen an und tauchen tiefer in die Ausführung von SubQuery-Projekten ein, indem wir leicht verfügbare und Open-Source-Projekte ausführen.

Wenn Sie schließlich nach weiteren Möglichkeiten zum Ausführen und Veröffentlichen Ihres Projekts suchen, ist unser [Run & Der Abschnitt „Veröffentlichen“](../run_publish/run.md) enthält detaillierte Informationen zu allen Möglichkeiten zum Ausführen Ihres SubQuery-Projekts und zu anderen erweiterten GraphQL-Aggregations- und Abonnementfunktionen.
