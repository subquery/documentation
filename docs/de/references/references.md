# Befehlszeilen-Flags

## subql-node

### --help

Dies zeigt die Hilfeoptionen an.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project                [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                             [boolean]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                       [boolean] [default: true]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
```

### --version

Dies zeigt die aktuelle Version an.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Verwenden Sie dieses Flag, um das SubQuery-Projekt zu starten.

```shell
subql-node -f . subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name

Mit diesem Flag können Sie Ihrem Projekt einen Namen geben, der so wirkt, als ob es eine Instanz Ihres Projekts erstellt. Nach Angabe eines neuen Namens wird ein neues Datenbankschema erstellt und die Blocksynchronisierung beginnt bei Null.

```shell
subql-node -f . subql-node -f . --subquery-name=test2
```

### -c, --config

All diese verschiedenen Konfigurationen können in eine .yml- oder .json-Datei platziert und dann mit dem config-Flag referenziert werden.

Sample subquery_config.yml file:

```shell
subquery: . subquery: . // Mandatory. Dies ist der lokale Pfad des Projekts. Der Punkt bedeutet hier das aktuelle lokale Verzeichnis.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Legen Sie diese Datei in das gleiche Verzeichnis wie das Projekt. Führen Sie dann im aktuellen Projektverzeichnis Folgendes aus:

```shell
> subql-node -c ./subquery_config.yml
```

### --local

Dieses Flag wird hauptsächlich für Debugging-Zwecke verwendet, wo es die Standardtabelle starter_entity im Standardschema "postgres" erstellt.

```shell
subql-node -f . --local
```

Beachten Sie, dass das Entfernen dieses Flags nicht bedeutet, dass es auf eine andere Datenbank verweist, sobald Sie dieses Flag verwenden. Um erneut auf eine andere Datenbank zu verweisen, müssen Sie eine NEUE Datenbank erstellen und die Umgebungseinstellungen auf diese neue Datenbank ändern. Mit anderen Worten,"export DB_DATABASE=<new_db_here>"

### --force-clean

Dieses Flag erzwingt die Neugenerierung der Projektschemata und -tabellen, was bei der iterativen Entwicklung von graphql-Schemas hilfreich ist, sodass neue Projektläufe immer mit einem sauberen Zustand arbeiten. Beachten Sie, dass dieses Flag auch alle indizierten Daten löscht.

### --batch-size

Mit diesem Flag können Sie die Stapelgröße in der Befehlszeile festlegen. Wenn die Batchgröße auch in der Konfigurationsdatei festgelegt ist, hat dies Vorrang.

```shell
> subql-node -f . > subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

Dadurch werden Debuginformationen an die Konsolenausgabe ausgegeben und die Protokollebene erzwungen auf Debug gesetzt.

```shell
> subql-node -f . > subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Dies zeigt Profilerinformationen an.

```shell
subql-node -f . --local subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Dieses Flag ermöglicht es Benutzern, die Netzwerkendpunktkonfiguration aus der Manifestdatei zu überschreiben.

```shell
subql-node -f . subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Beachten Sie, dass dies auch in der Manifestdatei festgelegt werden muss, andernfalls erhalten Sie:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Es gibt zwei verschiedene Terminal-Output-Formate. JSON oder colored. Colored ist die Standardeinstellung und enthält farbigen Text.

```shell
> subql-node -f . > subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . > subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Es stehen 7 Optionen zur Auswahl. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Das folgende Beispiel zeigt lautlos. Im Terminal wird nichts ausgegeben. Die einzige Möglichkeit, um festzustellen, ob die Node funktioniert oder nicht, besteht darin, die Datenbank nach der Zeilenanzahl abzufragen (select count(\*) from subquery_1.starter_entities) oder die Blockhöhe ab.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Bitte verwenden Sie die Detaileigenschaft.
(node:24686) [PINODEP007] Warnung: bindings.level ist veraltet, verwenden Sie stattdessen die Option options.level
```

<!-- ### --migrate TBA -->

### --timestamp-field

Standardmäßig ist dies wahr. wenn auf false gesetzt mit:

```shell
> subql-node -f . > subql-node -f . –timestamp-field=false
```

Dadurch werden die Spalten created_at und updated_at in der Tabelle starter_entities entfernt.

### -d, --network-dictionary

Auf diese Weise können Sie einen Wörterbuchendpunkt angeben, bei dem es sich um einen kostenlosen Dienst handelt, der bereitgestellt und gehostet wird unter: [https://explorer.subquery.network/](https://explorer.subquery.network/) (Suche nach Wörterbuch) und einen API-Endpoint von: https://api.subquery.network/sq/subquery/dictionary-polkadot

Normalerweise wird dies in Ihrer Manifestdatei festgelegt, aber unten zeigt ein Beispiel für die Verwendung als Argument in der Befehlszeile.

```shell
subql-node -f . subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Lesen Sie mehr darüber, wie ein SubQuery Dictionary funktioniert](../tutorials_examples/dictionary.md).

## subql-query

### --help

Dies zeigt die Hilfeoptionen an.

```shell
ns:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        project name                             [string] [required]
      --playground  enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer     Url that allow query to access indexer metadata     [string]
```

### --version

Dies zeigt die aktuelle Version an.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Dieses Flag wird verwendet, um den Abfragedienst zu starten. Wenn das Flag --subquery-name beim Ausführen eines Indexers nicht bereitgestellt wird, bezieht sich der Name hier auf den Standardprojektnamen. Wenn --subquery-name gesetzt ist, sollte der Name hier mit dem übereinstimmen, der eingestellt wurde.

```shell
> subql-node -f . > subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . > subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

Dieses Flag aktiviert den Graphql-Playground und sollte daher immer standardmäßig enthalten sein, um von Nutzen zu sein.

### --output-fmt

Siehe [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

Siehe [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
