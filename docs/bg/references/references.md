# Флагове на командния ред

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     Build this SubQuery project code
  codegen   Generate schemas for graph node
  help      display help for subql
  init      Initialize a scaffold subquery project
  migrate   Migrate Subquery project manifest v0.0.1 to v0.2.0
  publish   Upload this SubQuery project to IPFS
  validate  Check a folder or github repo is a validate subquery project
```

### build

Тази команда използва webpack за създаване на пакет за проект на подзаявка.

| Опции              | Описание                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | local folder of subquery project (if not in folder already)                                                |
| -o, --output       | specify output folder of build e.g. build-folder                                                           |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- With `subql build` you can specify additional entry points in exports field although it will always build `index.ts` automatically

- You need to have @subql/cli v0.19.0 or above to use exports field.

- Any `exports` field must map to string type (e.g. `"entry": "./src/file.ts"`), else it will be ignored from build.

[Futher example](https://doc.subquery.network/create/introduction/#build).

## subql-node

### -- помогна

Тук са показани опциите за помощ.

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
                                                      [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
```

### --version

This displays the current version.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Use this flag to start the SubQuery project.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### име на подзаявка (оттеглено)

Този флаг ви позволява да посочите име за вашия проект, което действа така, сякаш създава екземпляр на вашия проект. След предоставяне на ново име се създава нова схема на база данни и синхронизирането на блокове започва от нула. Остарял в полза на`--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Всички тези различни конфигурации могат да бъдат поставени в.yml or .json файлът и след това се препраща с конфигурационен флаг.

Sample subquery_config.yml file:

```shell
subquery: . // Mandatory. Това е локалният път на проекта. Точката тук означава текущата локална директория.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Поставете този файл в същата директория като проекта. След това в текущата директория на проекта изпълнете:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (deprecated)

Този флаг се използва главно за отстраняване на грешки, където създава стойност по подразбиране starter_entity таблица по подразбиране"postgres" схема.

```shell
subql-node -f . --local
```

Имайте предвид, че след като използвате този флаг, премахването му няма да означава, че ще сочи към друга база данни. За да насочите към друга база данни, ще трябва да създадете нова база данни и да промените настройките на env за тази нова база данни. In other words, "export DB_DATABASE=<new_db_here>"

### --force-clean

Този флаг кара схемите и таблиците на проекта да се регенерират, което е полезно да се използва при итеративно проектиране на GraphQL схеми по такъв начин, че новите стартирания на проекта винаги да работят в чисто състояние. Имайте предвид, че този флаг също ще изтрие всички индексирани данни.

### --db-schema

Този флаг ви позволява да посочите име за схемата на базата данни на проекта. След предоставяне на ново име се създава нова схема на база данни с конфигурираното име и започва индексирането на блокове.

```shell
subql-node -f . --db-schema=test2
```

### --unsafe

Проектите заSubQuery обикновено се изпълняват в изолирана среда на javascript за сигурност, за да се ограничи количеството достъп на проекта до вашата система. Изолираната среда ограничава наличния импорт на javascript до следните модули:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Въпреки че това повишава сигурността, ние разбираме, че ограничава наличната функционалност на вашата SubQuery. То`--unsafe` командата импортира всички javascript модули по подразбиране, което значително увеличава функционалността на пясъчника, като намалява нивото на сигурност.

**Имайте предвид, че `--unsafe` командата ще попречи на вашия проект да се изпълнява в мрежа за SubQuery и трябва да се свържете с поддръжката, ако искате тази команда да се изпълнява с вашия проект в управлявана услуга за SubQuery's([project.subquery.network](https://project.subquery.network))**

### --batch-size

Този флаг ви позволява да зададете размера на пакета в командния ред. Ако размерът на пакета също е зададен в конфигурационния файл, това има прецедент.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Мащабирайте размера на пакета за вземане на проби от блокове въз основа на използването на паметта

### --timeout

Задайте персонализирано време за изчакване на javascript Sandbox за изпълнение на функции за картографиране над блока, преди функцията за картографиране на блокове да хвърли изключение за изчакване

### --debug

Това извежда информация за отстраняване на грешки на изхода на конзолата и принуждава нивото на регистрационния файл за отстраняване на грешки.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Тук се показва информацията за профила.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Този флаг позволява на потребителите да заменят конфигурацията на крайната точка на мрежата от файла на манифеста.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Имайте предвид, че това също трябва да бъде зададено във файла на манифеста, в противен случай ще получите:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

There are two different terminal output formats. JSON or colored. Цветната стойност е по подразбиране и съдържа цветен текст.

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

Има 7 възможности за избор. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Примерът по-долу показва безшумен режим. Нищо няма да бъде отпечатано в терминала, така че единственият начин да се определи дали даден възел работи или не е да се направи заявка в базата данни за броя на редовете (select count(\*) from subquery_1.starter_entities)или поискайте височината на блока.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Моля, използвайте свойството detail.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

По подразбиране тази стойност е true. когато е зададено на false с:

```shell
> subql-node -f . –timestamp-field=false
```

This removes the created_at and updated_at columns in the starter_entities table.

### -d, --network-dictionary

This allows you to specify a dictionary endpoint which is a free service that is provided and hosted at: [https://explorer.subquery.network/](https://explorer.subquery.network/) (search for dictionary) and presents an API endpoint of: https://api.subquery.network/sq/subquery/dictionary-polkadot

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Прочетете повече за това как работи SubQuery речникът.](../tutorials_examples/dictionary.md).

### -p, --port

Портът, към който е свързана услугата за индексиране на подзаявки. По подразбиране тази стойност е`3000`

## subql-query

### --help

Тук са показани опциите за помощ.

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

### --version

Това показва текущата версия.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Този флаг се използва за стартиране на услуга за заявки. Ако --subquery-name флагът не се предоставя при стартиране на индексатора, името тук ще се отнася до името на проекта по подразбиране. Ако --subquery-name дадено, тогава името тук трябва да съответства на зададеното.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  //името му показва  subql-helloworld но с името hiworld
```

### --playground

Този флаг позволява graphql so playground винаги трябва да бъде включен по подразбиране, за да бъде полезен.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

See [--log-level](https://doc.subquery.network/references/references.html#log-level)

### --log-path

Активирайте регистрирането на файлове, като посочите пътя на файла за влизане

### --log-rotate

Активирайте въртенето на файловия дневник с опции за интервал на въртене 1d, максимум 7 файла и с максимален размер на файла 1 Gb

### --indexer

Задайте персонализиран Url адрес за местоположението на крайните точки на индексите, услугата за заявки използва тези крайни точки, за да определи здравето на индексатора, метаданните и състоянието на готовност

### --unsafe

Услугата за заявки има ограничение от 100 обекта за неограничени заявки graphql. Флагът unsafe премахва това ограничение, което може да причини проблеми с производителността на услугата за заявки. Вместо това се препоръчва заявките да бъдат [е пагиниран](https://graphql.org/learn/pagination /).

This flag can also be used to enable certain aggregation functions including sum, max, avg and [others](https://github.com/graphile/pg-aggregates#aggregates).

Те са деактивирани по подразбиране поради ограничение на обекта.

**Моля, обърнете внимание, че отборът `--опасни` ще попречи на стартирането на проекта в мрежата на подзаявки, и вие трябва да се свържете с поддръжката, ако искате, за тази команда се изпълнява с вашия проект в управлявана услуга subquery [project.subquery.network](https://project.subquery.network).**

### --port

Портът, към който е свързана услугата за заявки за подзаявка. По подразбиране тази стойност е`3000`
