# SubQuery lokal ausführen

In dieser Anleitung erfahren Sie, wie Sie eine lokale SubQuery-Node in Ihrer Infrastruktur ausführen, der sowohl den Indexer als auch den Abfragedienst umfasst. Sie möchten sich nicht um den Betrieb Ihrer eigenen SubQuery-Infrastruktur kümmern? SubQuery stellt der Community einen [verwalteten gehosteten Dienst](https://explorer.subquery.network) kostenlos zur Verfügung. [Folgen Sie unserem Veröffentlichungsleitfaden](../publish/publish.md), um zu erfahren, wie Sie Ihr Projekt in [SubQuery-Projekte](https://project.subquery.network) hochladen können.

## Die Verwendung von Docker

Eine alternative Lösung besteht darin, einen <strong>Docker-Container</strong> auszuführen, der durch die Datei `docker-compose.yml` definiert wird. Für ein neues Projekt, das gerade initialisiert wurde, müssen Sie hier nichts ändern.

Führen Sie im Projektverzeichnis den folgenden Befehl aus:

```shell
docker-compose pull && docker-compose up
```

Es kann einige Zeit dauern, die erforderlichen Pakete ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) und Postgres) zum ersten Mal herunterzuladen, aber bald sehen Sie eine laufende SubQuery-Node.

## Die Ausführung eines Indexers (subql/node)

Anforderungen:

- [Postgres](https://www.postgresql.org/)-Datenbank (Version 12 oder höher). Während die [SubQuery-Node](#start-a-local-subquery-node) die Blockchain indiziert, werden die extrahierten Daten in einer externen Datenbankinstanz gespeichert.

Eine SubQuery-Node ist eine Implementierung, die substratbasierte Blockchain-Daten pro SubQuery-Projekt extrahiert und in einer Postgres-Datenbank speichert.

### Installation

```shell
# NPM
npm install -g @subql/node
```

Beachten Sie bitte, dass wir **NICHT** zur Verwendung von `yarn global` ermutigen, da dies aufgrund seines schlechten Abhängigkeitsmanagements zu Fehlern auf der ganzen Linie führen kann.

Nach der Installation können Sie eine Node mit dem folgenden Befehl starten:

```shell
subql-node <command>
```

### Tastenbefehle

Die folgenden Befehle helfen Ihnen, die Konfiguration einer SubQuery-Node abzuschließen und mit der Indizierung zu beginnen. Um mehr zu erfahren, können Sie jederzeit `--help` ausführen.

#### Zeigen Sie auf den lokalen Projektpfad

```
subql-node -f your-project-path
```

#### Die Verwendung von Wörterbuch

Die Verwendung eines vollständigen Chainwörterbuchs kann die Verarbeitung eines SubQuery-Projekts während des Tests oder während Ihres ersten Indexes erheblich beschleunigen. In einigen Fällen konnten wir eine bis zu 10-fache Leistungssteigerung bei der Indizierung feststellen.

Ein vollständiges Chainwörterbuch indiziert die Position aller Ereignisse und Extrinsiken innerhalb der spezifischen Chain vor und ermöglicht Ihrem Nodedienst, bei der Indizierung zu relevanten Positionen zu springen, anstatt jeden Block zu überprüfen.

Sie können den Wörterbuchendpunkt zu Ihrer Datei `project.yaml` hinzufügen (siehe [Manifestdatei](../create/manifest.md)) oder ihn zur Laufzeit mit dem folgenden Befehl angeben:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[Lesen Sie mehr darüber, wie ein SubQuery Dictionary funktioniert](../tutorials_examples/dictionary.md).

#### Mit Datenbank verbinden

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path 
````

Bitte stellen Sie je nach Konfiguration Ihrer Postgres-Datenbank (z.B. ein anderes Datenbankpasswort) auch sicher, dass sowohl der Indexer (`subql/node`) als auch der Abfragedienst (`subql/query`) eine Verbindung dazu aufbauen können.


#### Geben Sie eine Konfigurationsdatei an

```
subql-node -c your-project-config.yml
```

Dadurch wird die Abfragenode auf eine Konfigurationsdatei verwiesen, die im YAML- oder JSON-Format vorliegen kann. Sehen Sie sich das Beispiel unten an.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Ändern Sie die Batchgröße für den Blockabruf

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Wenn der Indexer die Chain zum ersten Mal indiziert, verringert das Abrufen einzelner Blöcke die Leistung erheblich. Wenn Sie die Stapelgröße erhöhen, um die Anzahl der abgerufenen Blöcke anzupassen, verringert sich die Gesamtverarbeitungszeit. Die aktuelle Standardbatchgröße ist 100.

#### Im lokalen Modus ausführen

```
subql-node -f your-project-path --local
```

Zu Debugging-Zwecken können Benutzer die Node im lokalen Modus ausführen. Beim Wechsel zum lokalen Modell werden Postgres-Tabellen im Standardschema `öffentlich` erstellt.

Wenn der lokale Modus nicht verwendet wird, wird ein neues Postgres-Schema mit der anfänglichen `subquery_` und entsprechenden Projekttabellen erstellt.


#### Überprüfen Sie den Zustand Ihrer Node

Es gibt 2 Endpunkte, die Sie verwenden können, um den Zustand einer laufenden SubQuery-Node zu überprüfen und zu überwachen.

- Endpunkt der Integritätsprüfung, der eine einfache 200-Antwort zurückgibt
- Metadaten-Endpunkt, der zusätzliche Analysen Ihrer laufenden SubQuery-Node enthält

Hängen Sie dies an die Basis-URL Ihrer SubQuery-Node an. Beispiel: `http://localhost:3000/meta` gibt Folgendes zurück:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` gibt bei Erfolg HTTP 200 zurück.

Ein Fehler 500 wird zurückgegeben, wenn der Indexer nicht fehlerfrei ist. Dies ist oft beim Booten der Node zu sehen.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Wenn eine falsche URL verwendet wird, wird ein Fehler 404 nicht gefunden zurückgegeben.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debuggen Sie Ihr Projekt

Verwenden Sie den [Nodeinspektor](https://nodejs.org/en/docs/guides/debugging-getting-started/), um den folgenden Befehl auszuführen.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Zum Beispiel:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Hilfe finden Sie unter: https://nodejs.org/en/docs/inspector
Debugger attached.
```
Öffnen Sie dann die Chrome-Entwicklungstools, gehen Sie zu Quelle > Dateisystem, fügen Sie Ihr Projekt zum Arbeitsbereich hinzu und beginnen Sie mit dem Debuggen. Weitere Informationen finden Sie unter [So debuggen Sie ein SubQuery-Projekt](https://doc.subquery.network/tutorials_examples/debug-projects/)
## Die Ausführung eines Abfragedienstes (subql/query)

### Installation

```shell
# NPM
npm install -g @subql/query
```

Beachten Sie bitte, dass wir **NICHT** zur Verwendung von `yarn global` ermutigen, da dies aufgrund seines schlechten Abhängigkeitsmanagements zu Fehlern auf der ganzen Linie führen kann.

### Die Ausführung des Abfragedienstes
``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Stellen Sie sicher, dass der Projektname mit dem Projektnamen übereinstimmt, wenn Sie [das Projekt initialisieren](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Überprüfen Sie außerdem, ob die Umgebungsvariablen korrekt sind.

Nachdem Sie den subql-query-Dienst erfolgreich ausgeführt haben, öffnen Sie Ihren Browser und gehen Sie zu `http://localhost:3000`. Sie sollten einen GraphQL-Playground im Explorer und das Schema sehen, das zur Abfrage bereit ist.
