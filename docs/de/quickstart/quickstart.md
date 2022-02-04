# Schnellstartanleitung

In dieser Kurzanleitung erstellen wir ein einfaches Starterprojekt, das Sie als Framework für die Entwicklung Ihres eigenen SubQuery-Projekts verwenden können.

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

## Vorbereitung

### Lokale Entwicklungsumgebung

- [Typescript](https://www.typescriptlang.org/) ist erforderlich, um Projekte zu kompilieren und Typen zu definieren.
- Sowohl die SubQuery-CLI als auch das generierte Projekt haben Abhängigkeiten und erfordern eine moderne Version [Node](https://nodejs.org/en/).
- SubQuery-Nodes erfordern Docker

### Installieren Sie die SubQuery-CLI

Installieren Sie SubQuery CLI global auf Ihrem Terminal, indem Sie NPM verwenden:

```shell
# NPM
npm install -g @subql/cli
```

Beachten Sie bitte, dass wir **NICHT** zur Verwendung von `yarn global` ermutigen, da dies aufgrund seines schlechten Abhängigkeitsmanagements zu Fehlern auf der ganzen Linie führen kann.

Sie können dann die Hilfe ausführen, um die verfügbaren Befehle und die Verwendung anzuzeigen, die von CLI bereitgestellt werden

```shell
subql help
```

## Initialisieren Sie das Starter-SubQuery-Projekt

Ersetzen Sie in dem Verzeichnis, in dem Sie ein SubQuery-Projekt erstellen möchten, einfach `PROJECT_NAME` durch Ihr eigenes und führen Sie den Befehl aus:

```shell
subql init PROJECT_NAME
```

Beim Initialisieren des SubQuery-Projekts werden Ihnen bestimmte Fragen gestellt:

- Network: A blockchain network that this SubQuery project will be developed to index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

Nachdem der Initialisierungsvorgang abgeschlossen ist, sollten Sie sehen, dass im Verzeichnis ein Ordner mit Ihrem Projektnamen erstellt wurde. Der Inhalt dieses Verzeichnisses sollte mit dem übereinstimmen, was in der [Verzeichnisstruktur](../create/introduction.md#directory-structure) aufgeführt ist.

Führen Sie zuletzt im Projektverzeichnis den folgenden Befehl aus, um die Abhängigkeiten des neuen Projekts zu installieren.

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install Sie werden hauptsächlich an den folgenden Dateien arbeiten:

- The Manifest in `project.yaml`
- Das GraphQL-Schema in `schema.graphql`
- Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

Weitere Informationen zum Schreiben einer eigenen SubQuery finden Sie in unserer Dokumentation unter [Projekt erstellen](../create/introduction.md)

### GraphQL Model Generation

Um Ihr SubQuery-Projekt [indizieren](../run/run.md) zu können, müssen Sie zuerst die erforderlichen GraphQL-Modelle generieren, die Sie in Ihrer GraphQL-Schemadatei (`schema.graphql`) definiert haben. Führen Sie diesen Befehl im Stammverzeichnis des Projektverzeichnisses aus.

<CodeGroup> # Yarn yarn codegen # NPM npm run-script codegen

## Bauen Sie das Projekt auf

Um Ihr SubQuery-Projekt auf einem lokal gehosteten SubQuery-Node auszuführen, müssen Sie Ihre Arbeit erstellen.

Führen Sie den Build-Befehl im Stammverzeichnis des Projekts aus.

<CodeGroup> All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. Für ein neues Projekt, das gerade initialisiert wurde, müssen Sie hier nichts ändern, aber Sie können mehr über die Datei und die Einstellungen in unserem Abschnitt [Projekt ausführen](../run/run.md) lesen

Führen Sie im Projektverzeichnis folgenden Befehl aus:

```shell
docker-compose pull && docker-compose up
```

Es kann einige Zeit dauern, die erforderlichen Pakete ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) und Postgres) zum ersten Mal herunterzuladen, aber bald sehen Sie eine laufende SubQuery-Node.

### Fragen Sie Ihr Projekt an

Öffnen Sie Ihren Browser und gehen Sie zu [http://localhost:3000](http://localhost:3000).

Im Explorer sollte ein GraphQL-Playground angezeigt werden und die Schemas, die zur Abfrage bereit sind. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

Für ein neues SubQuery-Starterprojekt können Sie die folgende Abfrage ausprobieren, um einen Eindruck davon zu bekommen, wie es funktioniert, oder [mehr über die GraphQL-Abfragesprache erfahren](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Weitere Schritte

Herzliche Glückwünsche! Sie haben jetzt ein lokal ausgeführtes SubQuery-Projekt, das GraphQL-API-Anforderungen für Beispieldaten akzeptiert. In der nächsten Anleitung zeigen wir Ihnen, wie Sie Ihr neues Projekt in [SubQuery-Projekte](https://project.subquery.network) veröffentlichen und mit unserem [Explorer](https://explorer.subquery.network) abfragen

[Veröffentlichen Sie Ihr neues Projekt in SubQuery Projects](../publish/publish.md)
