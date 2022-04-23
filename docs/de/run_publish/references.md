# Befehlszeilen-Flags

## subql (cli)

### --help

```shell
> subql --help

BEFEHLE
   build Erstellt diesen SubQuery-Projektcode
   codegen Erzeugt Schemata für Graph-Node
   help Zeigt Hilfe für subql an
   init Initialisiert ein Gerüst-SubQuery-Projekt
   migrate Migration von  SubQuery-Projektmanifest v0.0.1 auf v0.2.0
   publish Laden Sie dieses SubQuery-Projekt in IPFS hoch
   validate Überprüfen Sie, ob ein Ordner oder ein Github-Repo ein validiertes SubQuery-Projekt ist
```

### build

Dieser Befehl verwendet webpack, um ein Bündel eines SubQuery-Projekts zu generieren.

| Optionen           | Beschreibung                                                                   |
| ------------------ | ------------------------------------------------------------------------------ |
| -l, --Standort     | lokaler Ordner des SubQuery-Projekts (falls nicht bereits im Ordner vorhanden) |
| -o, --Ausgabe      | Geben Sie den Ausgabeordner des Builds an, z. build-Ordner                     |
| --mode=(Produktion | prod | development | dev) | [ Standard: Produktion ]                           |

- Mit `subql build` können Sie zusätzliche Einstiegspunkte im Exportfeld angeben, obwohl es immer `index.ts` automatisch bauen wird

- Sie benötigen @subql/cli v0.19.0 oder höher, um das Exportfeld zu verwenden.

- Alle `Exporte` müssen dem String zugeordnet werden (z.B. `"Eintrag": "./src/file.ts"`), sonst wird es vom Build ignoriert.

[Beispiel](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Dies zeigt die Hilfeoptionen an.

```shell
> subql-node --help
Optionen:
      --help Hilfe anzeigen [boolean]
      --version Versionsnummer anzeigen [boolean]
  -f, --subquery Lokaler Pfad des Subquery-Projekts [string]
      --subquery-name Name des SubQuery-Projekts [veraltet] [string]
  -c, --config Konfigurationsdatei angeben [string]
      --local Lokalen Modus verwenden [veraltet] [boolean]
      --force-clean Erzwingt die Bereinigung der Datenbank und löscht Projektschemas
                            und Tabellen [boolean]
      --db-schema Db-Schemaname des Projekts [string]
      --unsafe Erlaubt die Nutzung jedes eingebauten Moduls innerhalb von
                            Sandkasten [boolean][Standard: falsch]
      --batch-size Stapelgröße der Blöcke, die in einer Runde abgerufen werden sollen [Zahl]
      --scale-batch-size Skaliert die Batchgröße basierend auf der Speichernutzung
                                                      [boolesch] [Standard: falsch]
      --timeout Timeout für die Indexer-Sandbox zum Ausführen des Mappings
                            Funktionen [Zahl]
      --debug Debug-Informationen in der Konsolenausgabe anzeigen. will
                            Setzt die Protokollebene zwangsweise auf Debug
                                                      [boolean] [default: false]
      --profiler            Zeigt Profiler-Informationen in der Konsolenausgabe an
                                                      [boolean] [default: false]
      --network-endpoint    Blockchain-Netzwerkendpunkt zum Verbinden     [string]
      --output-fmt          Drückt das Protokoll als json oder einfachen Text
                                           [string] [choices: "json", "colored"]
      --log-level           Gibt die zu druckende Protokollebene an. Ignoriert, wenn --debug ist
                             gebraucht
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             DB-Schema migrieren (nur für Verwaltungstabellen)
                                                      [boolean] [default: false]
      --timestamp-field    created_at und updated_at im Schema aktivieren/deaktivieren
                                                      [boolean] [default: false]
  -d, --network-dictionary  Geben Sie die Wörterbuch-API für dieses Netzwerk an [string]
  -m, --mmr-path            Lokaler Pfad der Merkle-Bergkette(.mmr) file
                                                                        [string]
      --proof-of-index       proof of index aktivieren/deaktivieren
                                                      [boolean] [default: false]
  -p, --port                Der Port, an den der Dienst gebunden wird          [number]
```

### --Version

Dies zeigt die aktuelle Version an.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Verwenden Sie dieses Flag, um das SubQuery-Projekt zu starten.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (veraltet)

Mit diesem Flag können Sie Ihrem Projekt einen Namen geben, der so wirkt, als ob es eine Instanz Ihres Projekts erstellt. Nach Angabe eines neuen Namens wird ein neues Datenbankschema erstellt und die Blocksynchronisierung beginnt bei Null. Veraltet für `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

All diese verschiedenen Konfigurationen können in eine .yml- oder .json-Datei platziert und dann mit dem config-Flag referenziert werden.

Beispieldatei subquery_config.yml:

```shell
subquery: . // Verpflichtend. Dies ist der lokale Pfad des Projekts. Der Punkt bedeutet hier das aktuelle lokale Verzeichnis.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Legen Sie diese Datei in das gleiche Verzeichnis wie das Projekt. Führen Sie dann im aktuellen Projektverzeichnis Folgendes aus:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (veraltet)

Dieses Flag wird hauptsächlich für Debugging-Zwecke verwendet, wo es die Standardtabelle starter_entity im Standardschema "postgres" erstellt.

```shell
subql-node -f . --local
```

Beachten Sie, dass das Entfernen dieses Flags nicht bedeutet, dass es auf eine andere Datenbank verweist, sobald Sie dieses Flag verwenden. Um erneut auf eine andere Datenbank zu verweisen, müssen Sie eine NEUE Datenbank erstellen und die Umgebungseinstellungen auf diese neue Datenbank ändern. Mit anderen Worten,"export DB_DATABASE=<new_db_here>"

### --force-clean

Dieses Flag erzwingt die Neugenerierung der Projektschemata und -tabellen, was bei der iterativen Entwicklung von graphql-Schemas hilfreich ist, sodass neue Projektläufe immer mit einem sauberen Zustand arbeiten. Beachten Sie, dass dieses Flag auch alle indizierten Daten löscht.

### --db-schema

Dieses Flag erlaubt es Ihnen, einen Namen für das Projektdatenbank-Schema anzugeben. Bei der Angabe eines neuen Namens wird ein neues Datenbankschema mit dem konfigurierten Namen erstellt und die Blockindizierung gestartet.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
This will create a notification trigger on entity, this also is the prerequisite to enable subscription feature in query service.

### --unsicher

SubQuery Projekte werden in der Regel in einer Javascript-Sandbox durchgeführt, um den Umfang des Zugriffs auf Ihr System zu begrenzen. Die Sandbox begrenzt die verfügbaren Javascript-Importe auf folgende Module:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Obwohl dies die Sicherheit erhöht, verstehen wir, dass dies die verfügbare Funktionalität Ihrer SubQuery einschränkt. Der `--unsafe` Befehl importiert alle Standard-Javascript-Module, was die Funktionalität der Sandbox mit dem Ausgleich der verringerten Sicherheit erheblich erhöht.

**Beachten Sie, dass der Befehl `--unsafe` verhindert, dass Ihr Projekt im SubQuery-Netzwerk ausgeführt wird, und Sie müssen sich an den Support wenden, wenn Sie möchten, dass dieser Befehl mit Ihrem Projekt im verwalteten Dienst von SubQuery ausgeführt wird ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Mit diesem Flag können Sie die Stapelgröße in der Befehlszeile festlegen. Wenn die Batchgröße auch in der Konfigurationsdatei festgelegt ist, hat dies Vorrang.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Die Batch-Größe des Blocks mit Speicherauslastung skalieren

### --timeout

Setze benutzerdefiniertes Timeout für die JavaScript-Sandbox um Mapping-Funktionen über einen Block auszuführen, bevor die Blockzuordnungsfunktion eine Timeout-Ausnahme auslöst

### --debug

Dadurch werden Debuginformationen an die Konsolenausgabe ausgegeben und die Protokollebene erzwungen auf Debug gesetzt.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Dies zeigt Profilerinformationen an.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Dieses Flag ermöglicht es Benutzern, die Netzwerkendpunktkonfiguration aus der Manifestdatei zu überschreiben.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Beachten Sie, dass dies auch in der Manifestdatei festgelegt werden muss, andernfalls erhalten Sie:

```shell
ERROR Erstellen eines SubQuery-Projekts aus dem angegebenen Pfad wurde fehlgeschlagen! Error: Fehler beim Analysieren von project.yaml.
Eine Instanz von ProjectManifestImpl hat die Validierung nicht bestanden:
  - property network hat die folgenden Einschränkungen nicht erfüllt: isObject
  - property network.network hat die folgenden Einschränkungen nicht erfüllt: nestedValidation
```

### --output-fmt

Es gibt zwei verschiedene Terminal-Output-Formate. JSON oder bunt. Farblich ist die Standardeinstellung und enthält gefärbten Text.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warnung: Bindings.Level ist veraltet, verwenden Sie stattdessen die Option options.level
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Es stehen 7 Optionen zur Auswahl. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Das folgende Beispiel zeigt lautlos. Im Terminal wird nichts ausgegeben. Die einzige Möglichkeit, um festzustellen, ob die Node funktioniert oder nicht, besteht darin, die Datenbank nach der Zeilenanzahl abzufragen (select count(\*) from subquery_1.starter_entities) oder die Blockhöhe ab.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(Verwenden Sie `node --trace-warnings ...`, um anzuzeigen, wo die Warnung erstellt wurde)
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
(node:24686) [DEP0152] DeprecationWarning: Benutzerdefinierte PerformanceEntry-Accessoren sind veraltet. Bitte verwenden Sie die Detaileigenschaft.
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
```

<!-- ### --migrate TBA -->

### --timestamp-field

Standardmäßig ist dies wahr. wenn auf false gesetzt mit:

```shell
> subql-node -f . –timestamp-field=false
```

Dadurch werden die Spalten created_at und updated_at in der Tabelle starter_entities entfernt.

### -d, --network-dictionary

Auf diese Weise können Sie einen Wörterbuchendpunkt angeben, bei dem es sich um einen kostenlosen Dienst handelt, der bereitgestellt und gehostet wird unter: [https://explorer.subquery.network/](https://explorer.subquery.network/) (Suche nach Wörterbuch) und einen API-Endpoint von: https://api.subquery.network/sq/subquery/dictionary-polkadot

Normalerweise wird dies in Ihrer Manifestdatei festgelegt, aber unten zeigt ein Beispiel für die Verwendung als Argument in der Befehlszeile.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Lesen Sie mehr darüber, wie ein SubQuery Dictionary funktioniert](../academy/tutorials_examples/dictionary.md).

### -p, --port

Der Port, an den der Indexdienst für Subquery bindet. Standardmäßig ist dies auf `3000` gesetzt

## subql-query

### --help

Dies zeigt die Hilfeoptionen an.

```shell
Optionen:
  --help Hilfe anzeigen [boolean]
       --version Versionsnummer anzeigen [boolean]
   -n, --name Projektname [string] [erforderlich]
       --playground Graphql Playground aktivieren [boolean]
       --output-fmt Protokoll als json oder einfachen Text drucken
                       [string] [Optionen: "json", "farbig"] [Standard: "farbig"]
       --log-level Gibt die zu druckende Protokollebene an.
          [string] [Auswahlmöglichkeiten: "fatal", "error", "warn", "info", "debug", "trace",
                                                      "leise"] [Standard: "info"]
       --log-path Pfad zum Erstellen der Protokolldatei, z. B. ./src/name.log [string]
       --log-rotate Protokolldateien in dem durch Protokollpfad angegebenen Verzeichnis rotieren
                                                         [boolean] [Standard: falsch]
       --indexer URL, die der Abfrage den Zugriff auf Indexer-Metadaten ermöglicht [string]
       --unsafe Deaktiviert die Beschränkungen für die Abfragetiefe und die zulässige zurückgegebene Anzahl
                     Datensätze abfragen [boolean]
   -p, --port Der Port, an den der Dienst bindet [Nummer
```

### --Version

Dies zeigt die aktuelle Version an.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Dieses Flag wird verwendet, um den Abfragedienst zu starten. Wenn das Flag --subquery-name beim Ausführen eines Indexers nicht bereitgestellt wird, bezieht sich der Name hier auf den Standardprojektnamen. Wenn --subquery-name gesetzt ist, sollte der Name hier mit dem übereinstimmen, der eingestellt wurde.

```shell
> subql-node -f . // --subquery-name nicht gesetzt

> subql-query -n subql-helloworld --playground // der Name ist standardmäßig der Name des Projektverzeichnisses
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name gesetzt

> subql-query -n hiworld --playground // der Name zeigt auf das Projekt subql-helloworld, aber mit dem Namen hiworld
```

### --playground

Dieses Flag aktiviert den Graphql-Playground und sollte daher immer standardmäßig enthalten sein, um von Nutzen zu sein.

### --output-fmt

Siehe [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

Siehe [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Aktiviere Datei-Protokollierung durch Angabe eines Pfades zu einer zu loggenden Datei

### --log-rotate

Aktiviere Datei-Log-Rotationen mit den Optionen eines 1d-Rotationsintervalls, maximal 7 Dateien und einer maximalen Dateigröße von 1GB

### --Indexer

Legen Sie eine benutzerdefinierte URL für den Speicherort der Endpunkte des Indexers fest. Der Abfragedienst verwendet diese Endpunkte für Indexerintegrität, Metadaten und Bereitschaftsstatus

### --subscription

This flag enables [GraphQL Subscriptions](./subscription.md), to enable this feature requires `subql-node` also enable `--subscription`

### --unsicher

Der Abfragedienst hat ein Limit von 100 Entitäten für unbegrenzte Graphql-Abfragen. Das unsichere Flag entfernt dieses Limit, was Performance-Probleme im Abfrage-Dienst verursachen kann. Es wird stattdessen empfohlen, dass Abfragen [paginiert werden](https://graphql.org/learn/pagination/).

Dieses Flag kann auch verwendet werden, um bestimmte Aggregationsfunktionen wie Summe, Max, Avg und [andere](https://github.com/graphile/pg-aggregates#aggregates) zu aktivieren.

Diese sind standardmäßig aufgrund der Entitätsgrenze deaktiviert.

**Beachten Sie, dass der Befehl `--unsafe` verhindert, dass Ihr Projekt im SubQuery-Netzwerk ausgeführt wird, und Sie müssen sich an den Support wenden, wenn Sie möchten, dass dieser Befehl mit Ihrem Projekt im verwalteten Dienst von SubQuery ausgeführt wird ([project.subquery.network](https://project.subquery.network).**

### --Port

Der Port, an den der Indexdienst für Subquery bindet. Standardmäßig ist dies auf `3000` gesetzt
