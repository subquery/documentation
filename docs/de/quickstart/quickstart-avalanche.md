# Avalanche-Schnellstart

In dieser Kurzanleitung beginnen wir mit einem einfachen Avalanche-Starterprojekt und schließen dann mit der Indizierung einiger echter Daten ab. Dies ist eine hervorragende Basis, um mit der Entwicklung Ihres eigenen SubQuery-Projekts zu beginnen.

**Wenn Sie nach Anleitungen für Substrat/Polkadot suchen, können Sie die [Substrat/Polkadot-spezifische Kurzanleitung](./quickstart-polkadot) lesen.**

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

**Das Ziel dieser Kurzanleitung ist es, alle Pangolin-Token-_Approve_-Protokolle zu indizieren, dies sollte nur 10-15 Minuten dauern**

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

- Project Name: A name for your SubQuery project
- Netzwerkfamilie: Die Layer-1-Blockchain-Netzwerkfamilie, für deren Indexierung dieses SubQuery-Projekt entwickelt wird, verwenden Sie die Pfeiltasten auf Ihrer Tastatur, um aus den Optionen auszuwählen. Für diese Anleitung verwenden wir _"Avalanche"_
- Netzwerk: Das spezifische Netzwerk, für dessen Indexierung dieses SubQuery-Projekt entwickelt wird, verwenden Sie die Pfeiltasten auf Ihrer Tastatur, um aus den Optionen auszuwählen. Für diese Anleitung verwenden wir _"Avalanche"_
- Vorlage: Wählen Sie eine SubQuery-Projektvorlage aus, die einen Ausgangspunkt für den Beginn der Entwicklung bietet. Wir empfehlen die Auswahl des _"Starter-Projekts"_
- Git-Repository (optional): Geben Sie eine Git-URL zu einem Repository an, in dem dieses SubQuery-Projekt gehostet wird (wenn es in SubQuery Explorer gehostet wird).
- RPC-Endpunkt (erforderlich): Geben Sie eine HTTPS-URL zu einem ausgeführten RPC-Endpunkt an, der standardmäßig für dieses Projekt verwendet wird. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). Für diese Anleitung verwenden wir den Standardwert _"avalanche.api.onfinality.io"_
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

1. The GraphQL Schema in `schema.graphql`
2. Das Projektmanifest in `project.yaml`
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

Das Ziel dieser Schnellstartanleitung ist es, das standardmäßige Starterprojekt so anzupassen, dass alle Transaktionsprotokolle von Pangolin `Approve` indiziert werden.

### Aktualisieren Ihrer GraphQL-Schemadatei

Die Datei `schema.graphql` definiert die verschiedenen GraphQL-Schemas. Aufgrund der Funktionsweise der GraphQL-Abfragesprache bestimmt die Schemadatei im Wesentlichen die Form Ihrer Daten aus SubQuery. Es ist ein großartiger Ausgangspunkt, da es Ihnen ermöglicht, Ihr Endziel im Voraus zu definieren.

Wir werden die Datei `schema.graphql` aktualisieren, um alle vorhandenen Entitäten zu entfernen, und wie folgt lesen

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNummer: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```

**Wichtig: Wenn Sie Änderungen an der Schemadatei vornehmen, stellen Sie bitte sicher, dass Sie Ihr Typenverzeichnis neu generieren. Tun Sie dies jetzt.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Sie finden die generierten Modelle im Verzeichnis `/src/types/models`. Weitere Informationen zur Datei `schema.graphql` finden Sie in unserer Dokumentation unter [Build/GraphQL Schema](../build/graphql.md)

### Aktualisieren der Projektmanifestdatei

Die Projektmanifestdatei (`project.yaml`) kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Chaindaten indiziert und umwandelt.

Wir werden nicht viele Änderungen an der Manifestdatei vornehmen, da sie bereits korrekt eingerichtet wurde, aber wir müssen unsere Handler ändern. Denken Sie daran, dass wir planen, alle Pangolin-Genehmigungsprotokolle zu indizieren, daher müssen wir den Abschnitt `Datenquellen` aktualisieren, um Folgendes zu lesen.

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block wann der Pangolin-Vertrag erstellt wurde
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

Das bedeutet, dass wir jedes Mal eine `handleLog`-Zuordnungsfunktion ausführen, wenn es ein `genehmigtes` Protokoll für eine Transaktion aus dem [Pangolin-Vertrag](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1) gibt.

Weitere Informationen zur Projektmanifestdatei (`project.yaml`) finden Sie in unserer Dokumentation unter [Build-/Manifestdatei](../build/manifest.md)

### Mapping Funktion hinzufügen

Zuordnungsfunktionen definieren, wie Kettendaten in die optimierten GraphQL-Entitäten umgewandelt werden, die wir zuvor in der Datei `schema.graphql` definiert haben.

Navigieren Sie zur Standardzuordnungsfunktion im Verzeichnis `src/mappings`. Sie sehen drei exportierte Funktionen, `handleBlock`, `handleLog` und `handleTransaction`. Sie können sowohl die Funktionen `handleBlock` als auch `handleTransaction` löschen, wir haben es nur mit der Funktion `handleLog` zu tun.

Die Funktion `handleLog` hat Ereignisdaten empfangen, wenn das Ereignis mit den Filtern übereinstimmt, die wir zuvor in unserer `project.yaml` angegeben haben. Wir werden es aktualisieren, um alle `Genehmigungs`-Transaktionsprotokolle zu verarbeiten und sie in den zuvor erstellten GraphQL-Entitäten zu speichern.

Sie können die Funktion `handleLog` wie folgt aktualisieren (beachten Sie die zusätzlichen Importe):

```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```

Was dies tut, ist das Empfangen eines Avalanche-Protokolls, das die Transaktionsprotokolldaten der Nutzlast enthält. Wir extrahieren diese Daten und instanziieren dann eine neue Entität `PangolinApproval`, die wir zuvor in der Datei `schema.graphql` definiert haben. Wir fügen zusätzliche Informationen hinzu und verwenden dann die Funktion `.save()`, um die neue Entität zu speichern (SubQuery speichert diese automatisch in der Datenbank).

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

`@subql/query`</7 > und Postgres) zum ersten Mal, aber bald werden Sie einen laufenden SubQuery-Node sehen. Seien Sie hier bitte geduldig.</p> 



### Fragen Sie Ihr Projekt ab

Öffnen Sie Ihren Browser und gehen Sie zu [http://localhost:3000](http://localhost:3000).

Sie sollten sehen, dass im Explorer ein GraphQL-Playground angezeigt wird und die Schemas, die zur Abfrage bereit sind. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

Für ein neues SubQuery-Starterprojekt können Sie die folgende Abfrage ausprobieren, um einen Eindruck davon zu bekommen, wie sie funktioniert, oder [mehr über die GraphQL-Abfragesprache erfahren](../run_publish/graphql.md).



```graphql
query {
  pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}


```




### Veröffentlichen Sie Ihr SubQuery-Projekt

SubQuery bietet einen kostenlosen verwalteten Dienst, wenn Sie Ihr neues Projekt bereitstellen können. Sie können es in [SubQuery-Projekten](https://project.subquery.network) bereitstellen und mit unserem [Explorer](https://explorer.subquery.network) abfragen.

[Lesen Sie den Leitfaden zur Veröffentlichung Ihres neuen Projekts in SubQuery Projects](../run_publish/publish.md), **Beachten Sie, dass Sie es über IPFS bereitstellen müssen**.



## Weitere Schritte

Herzlichen Glückwunsch, Sie haben jetzt ein lokal ausgeführtes SubQuery-Projekt, das GraphQL-API-Anforderungen für die Übertragung von Daten von bLuna akzeptiert.

Nachdem Sie nun einen Einblick in die Erstellung eines grundlegenden SubQuery-Projekts erhalten haben, stellt sich die Frage, wie es weitergehen soll. Wenn Sie sich sicher fühlen, können Sie mehr über die drei Schlüsseldateien erfahren. Die Manifestdatei, das GraphQL-Schema und die Zuordnungsdatei im [Build-Abschnitt dieser Dokumentation](../build/introduction.md).

Fahren Sie andernfalls mit unserem [Academy-Bereich](../academy/academy.md) fort, wo Sie ausführlichere Workshops, Tutorials und Beispielprojekte finden. Dort sehen wir uns fortgeschrittenere Modifikationen an und tauchen tiefer in die Ausführung von SubQuery-Projekten ein, indem wir leicht verfügbare und Open-Source-Projekte ausführen.

Wenn Sie schließlich nach weiteren Möglichkeiten zum Ausführen und Veröffentlichen Ihres Projekts suchen, ist unser [Run & Der Abschnitt „Veröffentlichen“](../run_publish/run.md) enthält detaillierte Informationen zu allen Möglichkeiten zum Ausführen Ihres SubQuery-Projekts und zu anderen erweiterten GraphQL-Aggregations- und Abonnementfunktionen.
