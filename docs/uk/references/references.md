# Прапори командної лінії

## subql-node

### --допомогти

Це показує варіанти допомоги.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project   [deprecated] [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                [deprecated] [boolean]
      --force-clean         Force clean the database, dropping project schemas
                            and tables                                 [boolean]
      --db-schema           Db schema name of the project               [string]
      --unsafe              Allows usage of any built-in module within the
                            sandbox                    [boolean][default: false]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --scale-batch-size    scale batch size based on memory usage
                                                      [boolean] [default: false]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. буде
                            насильно встановити рівень журналу для налагодження
                                                      [булева] [за замовчуванням: false]
      --profiler Показати інформацію про профілер для консольного виводу
                                                      [булева] [за замовчуванням: false]
      --network-endpoint Blockchain endpoint для підключення [string]
      --output-fmt Друк журналу як json або звичайний текст
                                           [string] [вибір: "json", "кольоровий"]
      --log-рівень Вкажіть рівень журналу для друку. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                      [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
```

### --версія

Це відображає поточну версію.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Використовуйте цей прапор для запуску проекту SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (deprecated)

Цей прапор дозволяє надати назву для вашого проекту, який діє так, ніби він створює екземпляр вашого проекту. Після надання нового імені створюється нова схема бази даних, а синхронізація блоків починається з нуля. Deprecated in favour of `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Усі ці різні конфігурації можна розмістити у файлі .yml або .json, а потім посилатися на прапор конфігурації.

Зразок файлу subquery_config.yml:

```shell
subquery: . // Mandatory. Це місцевий шлях проекту. Період тут означає поточний локальний каталог.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Помістіть цей файл у той самий каталог, що і проект. Потім у поточному каталозі проектів запустіть:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (deprecated)

Цей прапор використовується в основному для налагодження, коли він створює таблицю starter_entity за замовчуванням у схемі "postgres" за замовчуванням.

```shell
subql-node -f . --local
```

Зауважте, що після використання цього прапора видалення його не означає, що він буде вказувати на іншу базу даних. Щоб переробити іншу базу даних, вам доведеться створити НОВУ базу даних та змінити налаштування env на цю нову базу даних. Іншими словами, "експорт DB_DATABASE =<new_db_here>"

### --force-clean

Цей прапор змушує регенерувати схеми та таблиці проектів, корисні для використання при ітераційній розробці схем graphql таким чином, що нові запуски проекту завжди працюють з чистим станом. Зауважте, що цей прапор також видалить усі індексовані дані.

### --db-schema

This flag allows you to provide a name for the project database schema. Upon providing a new name, a new database schema is created with the configured name and block indexing starts.

```shell
підql-вузол -f. --db-schema=test2
```

### --unsafe

SubQuery Projects are usually run in a javascript sandbox for security to limit the scope of access the project has to your system. The sandbox limits the available javascript imports to the following modules:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security we understand that this limits the available functionality of your SubQuery. The `--unsafe` command imports all default javascript modules which greatly increases sandbox functionality with the tradeoff of decreased security.

**Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in SubQuery's managed service (https://project.subquery.network)**

### --batch-size

This flag allows you to set the batch size in the command line. If batch size is also set in the config file, this takes precedent.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Scale the block fetch batch size with memory usage

### --timeout

Set custom timeout for the javascript sandbox to execute mapping functions over a block before the block mapping function throws a timeout exception

### --debug

This outputs debug information to the console output and forcefully sets the log level to debug.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

This shows profiler information.

```shell
підql-вузол -f. --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

This flag allows users to override the network endpoint configuration from the manifest file.

```shell
підql-вузол -f. --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Note that this must also be set in the manifest file, otherwise you'll get:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

There are two different terminal output formats. JSON or colored. Colored is the default and contains colored text.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

There are 7 options to choose from. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. The example below shows silent. Nothing will be printed in the terminal so the only way to tell if the node is working or not is to query the database for row count (select count(\*) from subquery_1.starter_entities) or query the block height.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

By default this is true. when set to false with:

```shell
> subql-node -f . –timestamp-field=false
```

This removes the created_at and updated_at columns in the starter_entities table.

### -d, --network-dictionary

This allows you to specify a dictionary endpoint which is a free service that is provided and hosted at: [https://explorer.subquery.network/](https://explorer.subquery.network/) (search for dictionary) and presents an API endpoint of: https://api.subquery.network/sq/subquery/dictionary-polkadot

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
підql-вузол -f. -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[ Детальніше про те, як працює SubQuery Dictionary ](../tutorials_examples/dictionary.md).

### -p, --port

The port the subquery indexing service binds to. By default this is set to `3000`

## subql-query

### --допомогти

Це показує варіанти допомоги.

```shell
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        Project name                             [string] [required]
      --playground  Enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path    Path to create log file e.g ./src/name.log          [string]
      --log-rotate  Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer     Url that allows query to access indexer metadata    [string]
      --unsafe      Disable limits on query depth and allowable number returned
                    query records                                      [boolean]
  -p, --port        The port the service will bind to                   [number
```

### --версія

Це відображає поточну версію.

```shell
> subql-query --version
0.7.0
```

### -n, --name

This flag is used to start the query service. If the --subquery-name flag is not provided when running an indexer, the name here will refer to the default project name. If --subquery-name is set, then the name here should match what was set.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

This flag enables the graphql playground so should always be included by default to be of any use.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

See [--log-level](https://doc.subquery.network/references/references.html#log-level)

### --log-path

Enable file logging by providing a path to a file to log to

### --log-rotate

Enable file log rotations with the options of a 1d rotation interval, a maximum of 7 files and with a max file size of 1GB

### --indexer

Set a custom url for the location of the endpoints of the indexer, the query service uses these endpoints for indexer health, metadata and readiness status

### --unsafe

The query service has a limit of 100 entities for unbounded graphql queries. The unsafe flag removes this limit which may cause performance issues on the query service. It is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in SubQuery's managed service (https://project.subquery.network).

### --port

The port the subquery query service binds to. By default this is set to `3000`
