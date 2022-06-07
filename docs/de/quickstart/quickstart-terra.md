# Terra-Schnellstart

In dieser Schnellstartanleitung beginnen wir mit einem einfachen Terra-Starterprojekt und schließen dann mit der Indizierung einiger echter Daten ab. Dies ist eine hervorragende Basis, um mit der Entwicklung Ihres eigenen SubQuery-Projekts zu beginnen.

**Wenn Sie nach Anleitungen für Substrat/Polkadot suchen, können Sie die [Substrat/Polkadot-spezifische Kurzanleitung](./quickstart-polkadot) lesen.**

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

**Das Ziel dieser Schnellstartanleitung ist es, das Standard-Starterprojekt so anzupassen, dass es mit der Indexierung aller Übertragungen von Terra beginnt, es sollte nur 10-15 Minuten dauern**

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

Führen Sie in dem Verzeichnis, in dem Sie ein SubQuery-Projekt erstellen möchten, einfach den folgenden Befehl aus, um zu beginnen.

```shell
subql init
```

Während das SubQuery-Projekt initialisiert wird, werden Ihnen bestimmte Fragen gestellt:

- Name: Ein Name für Ihr SubQuery-Projekt
- Netzwerkfamilie: Die Layer-1-Blockchain-Netzwerkfamilie, für deren Indizierung dieses SubQuery-Projekt entwickelt wird, verwenden Sie die Pfeiltasten auf Ihrer Tastatur, um aus den Optionen auszuwählen. Für diese Anleitung verwenden wir *"Terra"*
- Netzwerk: Das spezifische Netzwerk, für dessen Indexierung dieses SubQuery-Projekt entwickelt wird, verwenden Sie die Pfeiltasten auf Ihrer Tastatur, um aus den Optionen auszuwählen. Für diese Anleitung verwenden wir *"Terra"*
- Vorlage: Wählen Sie eine SubQuery-Projektvorlage aus, die einen Ausgangspunkt für den Beginn der Entwicklung bietet. Wir empfehlen die Auswahl des *"Starter-Projekts"*
- Git-Repository (optional): Geben Sie eine Git-URL zu einem Repository an, in dem dieses SubQuery-Projekt gehostet wird (wenn es in SubQuery Explorer gehostet wird).
- RPC-Endpunkt (erforderlich): Geben Sie eine HTTPS-URL zu einem ausgeführten RPC-Endpunkt an, der standardmäßig für dieses Projekt verwendet wird. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). Für diese Anleitung verwenden wir den Standardwert *"https://terra-columbus-5.beta.api.onfinality.io"*
- Autoren (erforderlich): Geben Sie hier den Eigentümer dieses SubQuery-Projekts ein (z. B. Ihren Namen!)
- Beschreibung (Optional): Sie können einen kurzen Absatz über Ihr Projekt bereitstellen, der beschreibt, welche Daten es enthält und was Benutzer damit tun können
- Version (erforderlich): Geben Sie eine benutzerdefinierte Versionsnummer ein oder verwenden Sie die Standardversion (`1.0.0`).
- Lizenz (erforderlich): Stellen Sie die Softwarelizenz für dieses Projekt bereit oder akzeptieren Sie die Standardeinstellung (`Apache-2.0`).

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

Wir werden die Datei `schema.graphql` so aktualisieren, dass sie wie folgt lautet

```graphql
type Transfer @entity {
  id: ID! # id-Feld ist immer erforderlich und muss so aussehen
  txHash: String!
  blockHeight: BigInt # Die Blockhöhe der Übertragung
  sender: String! # Das Konto, von dem Überweisungen getätigt werden
  recipient: String! # Das Konto, auf das Überweisungen getätigt werden
  amount: String! # Betrag, der überwiesen wurde
}
```

**Wichtig: Wenn Sie Änderungen an der Schemadatei vornehmen, stellen Sie bitte sicher, dass Sie Ihr Typenverzeichnis neu generieren. Tun Sie dies jetzt.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Sie finden die generierten Modelle im Verzeichnis `/src/types/models`. Weitere Informationen zur Datei `schema.graphql` finden Sie in unserer Dokumentation unter [Build/GraphQL Schema](../build/graphql.md)

### Aktualisierung der Projektmanifestdatei

Die Projektmanifestdatei (`project.yaml`) kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Chaindaten indiziert und umwandelt.

Wir werden nicht viele Änderungen an der Manifestdatei vornehmen, da sie bereits korrekt eingerichtet wurde, aber wir müssen unsere Handler ändern. Denken Sie daran, dass wir planen, alle Terra-Übertragungsereignisse zu indizieren, daher müssen wir den Abschnitt `Datenquellen` aktualisieren, um Folgendes zu lesen.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Columbus-5 Startet in dieser Höhe
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # Dies wird bei allen Ereignissen ausgelöst, die der folgenden Filterbedingung für intelligente Verträge entsprechen
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # Wir abonnieren den bLuna-Smart-Vertrag (z. B. nur Ereignisse aus diesem Vertrag übertragen)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

Das bedeutet, dass wir jedes Mal eine `handleEvent`-Mapping-Funktion ausführen, wenn es ein `transfer`-Ereignis vom bLuna Smart Contract gibt.

Weitere Informationen zur Projektmanifestdatei (`project.yaml`) finden Sie in unserer Dokumentation unter [Build-/Manifestdatei](../build/manifest.md)

### Mapping Funktion hinzufügen

Zuordnungsfunktionen definieren, wie Chaindaten in die optimierten GraphQL-Entitäten umgewandelt werden, die wir zuvor in der Datei `schema.graphql` definiert haben.

Navigieren Sie zur Standardzuordnungsfunktion im Verzeichnis `src/mappings`. Sie sehen drei exportierte Funktionen, `handleBlock`, `handleEvent` und `handleCall`. Sie können sowohl die Funktionen `handleBlock` als auch `handleCall` löschen, wir haben es nur mit der Funktion `handleEvent` zu tun.

Die Funktion `handleEvent` hat Ereignisdaten empfangen, wenn das Ereignis mit den Filtern übereinstimmt, die wir zuvor in unserer `project.yaml` angegeben haben. Wir werden es aktualisieren, um alle `Übertragungs`-Ereignisse zu verarbeiten und sie in den zuvor erstellten GraphQL-Entitäten zu speichern.

Sie können die Funktion `handleEvent` wie folgt aktualisieren (beachten Sie die zusätzlichen Importe):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Debugging-Daten aus dem Ereignis drucken
    // logger.info(JSON.stringify(event));

    // Erstellen Sie die neue Übertragungsentität mit einer eindeutigen ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

Was dies tut, ist das Empfangen eines SubstrateEvent, das Übertragungsdaten auf der Nutzlast enthält. Wir extrahieren diese Daten und instanziieren dann eine neue Entität `Transfer`, die wir zuvor in der Datei `schema.graphql` definiert haben. Wir fügen zusätzliche Informationen hinzu und verwenden dann die Funktion `.save()`, um die neue Entität zu speichern (SubQuery speichert diese automatisch in der Datenbank).

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
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```




### Veröffentlichen Sie Ihr SubQuery-Projekt

SubQuery bietet einen kostenlosen verwalteten Dienst, wenn Sie Ihr neues Projekt bereitstellen können. Sie können es in [SubQuery-Projekten](https://project.subquery.network) bereitstellen und mit unserem [Explorer](https://explorer.subquery.network) abfragen.

[Lesen Sie die Anleitung zum Veröffentlichen Ihres neuen Projekts in SubQuery Projects](../publish/publish.md)



## Weitere Schritte

Herzlichen Glückwunsch, Sie haben jetzt ein lokal ausgeführtes SubQuery-Projekt, das GraphQL-API-Anforderungen für die Übertragung von Daten von bLuna akzeptiert.

Nachdem Sie nun einen Einblick in die Erstellung eines grundlegenden SubQuery-Projekts erhalten haben, stellt sich die Frage, wie es weitergehen soll. Wenn Sie sich sicher fühlen, können Sie mehr über die drei Schlüsseldateien erfahren. Die Manifestdatei, das GraphQL-Schema und die Zuordnungsdatei im [Build-Abschnitt dieser Dokumentation](../build/introduction.md).

Fahren Sie andernfalls mit unserem [Academy-Bereich](../academy/academy.md) fort, wo Sie ausführlichere Workshops, Tutorials und Beispielprojekte finden. Dort sehen wir uns fortgeschrittenere Modifikationen an und tauchen tiefer in die Ausführung von SubQuery-Projekten ein, indem wir leicht verfügbare und Open-Source-Projekte ausführen.

Wenn Sie schließlich nach weiteren Möglichkeiten zum Ausführen und Veröffentlichen Ihres Projekts suchen, ist unser [Run & Der Abschnitt „Veröffentlichen“](../run_publish/run.md) enthält detaillierte Informationen zu allen Möglichkeiten zum Ausführen Ihres SubQuery-Projekts und zu anderen erweiterten GraphQL-Aggregations- und Abonnementfunktionen.
