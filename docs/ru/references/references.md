# Флаги команд

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

Эта команда использует webpack для создания пакета проекта subquery.

| Параметры          | Описание                                                  |
| ------------------ | --------------------------------------------------------- | ----------- | ---- | ----------------------- |
| -l, --location     | локальная папка проекта subquery (если вы еще не в папке) |
| -o, --output       | указать выходную папку сборки, например build-folder      |
| --mode=(production | prod                                                      | development | dev) | [ default: production ] |

- С помощью `subql build` вы можете указать дополнительные точки входа в поле экспорта, хотя он всегда будет создавать `index.ts` автоматически

- Вам нужно иметь @subql/cli v0.19.0 или выше, чтобы использовать поле экспорта.

- Любое поле `exports` должно сопоставляться со строковым типом (например, `"entry": "./src/file.ts"`), иначе оно будет проигнорировано при сборке.

[Еще один пример](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Эта команда показывает варианты справки.

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

Это отображает текущую версию.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Используйте этот флаг, чтобы запустить проект SubQuery.

```shell
subql-node -f . // или
subql-node --subquery .
```

### --subquery-name (устарел)

Этот флаг позволяет вам указать имя для вашего проекта, которое действует так, как будто он создает экземпляр вашего проекта. После предоставления нового имени создается новая схема базы данных, и синхронизация блоков начинается с нуля. Устарело в пользу `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Все эти различные конфигурации можно поместить в файл .yml или .json, а затем ссылаться на них с помощью флага конфигурации.

Пример файла subquery_config.yml:

```shell
subquery: . // Обязательно. Это локальный путь проекта. Точка здесь означает текущий локальный каталог.
subqueryName: hello // Опциональное имя
batchSize: 55 // Опциональный конфиг
```

Поместите этот файл в тот же каталог, что и проект. Затем в текущем каталоге проекта запустите:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (устарело)

Этот флаг в основном используется для целей отладки, когда он создает таблицу starter_entity по умолчанию в стандартной схеме «postgres».

```shell
subql-node -f . --local
```

Обратите внимание, что если вы используете этот флаг, его удаление не будет означать, что он будет указывать на другую базу данных. Чтобы перенаправить на другую базу данных, вам нужно будет создать НОВУЮ базу данных и изменить настройки env на эту новую базу данных. Другими словами, "export DB_DATABASE=<new_db_here>"

### --force-clean

Этот флаг принудительно создает схемы и таблицы проекта, что полезно при итеративной разработке схем graphql, чтобы новые запуски проекта всегда работали с чистым состоянием. Обратите внимание, что этот флаг также сотрет все проиндексированные данные.

### --db-schema

Этот флаг позволяет указать имя схемы базы данных проекта. После предоставления нового имени создается новая схема базы данных с с этим именем, и начинается индексация блока.

```shell
subql-node -f . --db-schema=test2
```

### --unsafe

Проекты SubQuery обычно запускаются в изолированной программной среде javascript в целях безопасности, чтобы ограничить сферу доступа, который проект имеет к вашей системе. Песочница ограничивает доступный импорт javascript следующими модулями:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Хотя это повышает безопасность, мы понимаем, что это ограничивает доступную функциональность вашего SubQuery. Команда `--unsafe` импортирует все модули javascript по умолчанию, что значительно увеличивает функциональность песочницы за счет снижения безопасности.

**Обратите внимание, что команда `--unsafe` предотвратит запуск вашего проекта в сети SubQuery, и вы должны обратиться в службу поддержки, если хотите, чтобы эта команда выполнялась с вашим проектом в управляемой службе SubQuery ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Этот флаг позволяет установить размер пакета в командной строке. Если размер пакета также установлен в файле конфигурации, то это имеет приоритет.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Масштабируйте размер пакета выборки блоков с использованием памяти

### --timeout

Установите пользовательский тайм-аут для песочницы javascript для выполнения функций сопоставления через блок до того, как функция сопоставления блоков вызовет исключение тайм-аута

### --debug

Эта команда выводит отладочную информацию в консоль и принудительно устанавливает уровень логирования для отладки.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Эта команда показывает информацию профайлера.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Этот флаг позволяет пользователям переопределять конфигурацию конечной точки сети из файла манифеста.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Обратите внимание, что это также должно быть задано в файле манифеста, иначе вы получите:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Существует два разных формата вывода в терминал. JSON или colored. Colored — значение по умолчанию и содержит цветной текст.

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

Есть 7 вариантов на выбор. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. В приведенном ниже примере показано молчание. В терминале ничего не будет напечатано, поэтому единственный способ узнать, работает узел или нет, — запросить в базе данных количество строк (выберите count(\*) из subquery_1.starter_entities) или запросить высоту блока.

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

По умолчанию это true. когда установлено значение false:

```shell
> subql-node -f . –timestamp-field=false
```

Это удаляет столбцы created_at и updated_at в таблице starter_entities.

### -d, --network-dictionary

Это позволяет вам указать конечную точку словаря, бесплатную службу, которая предоставляется и размещается по адресу: [https://explorer.subquery.network/](https://explorer.subquery.network/) (поиск словаря) и представляет конечную точку API: https://api.subquery.network/sq/subquery/словарь-polkadot

Обычно это устанавливается в вашем файле манифеста, но ниже показан пример использования в качестве аргумента в командной строке.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Подробнее о том, как работает SubQuery Dictionary](../academy/tutorials_examples/dictionary.md).

### -p, --port

Порт, к которому привязывается служба индексации подзапросов. По умолчанию установлено значение `3000`

## subql-query

### --help

Эта команда показывает варианты справки.

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

Это отображает текущую версию.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Этот флаг используется для запуска службы запросов. Если флаг --subquery-name не указан при запуске индексатора, имя здесь будет ссылаться на имя проекта заданное по умолчанию. Если --subquery-name указано, то имя здесь должно совпадать с тем, что было установлено.

```shell
> subql-node -f . // --subquery-name не установлено

> subql-query -n subql-helloworld  --playground //имя по умолчанию соответствует имени каталога проекта
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name установлено

> subql-query -n hiworld --playground  // имя указывает на проект subql-helloworld, но с именем hiworld
```

### --playground

Этот флаг делает доступной игровую площадку graphql, поэтому всегда должен быть включен по умолчанию для любого использования.

### --output-fmt

Смотри [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

Смотри [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Включите логгирование файлов, указав путь к файлу для ведения лога

### --log-rotate

Включить ротацию лог-файла с параметрами интервала ротации 1 день, максимум 7 файлов и максимальный размер файла 1 Гб

### --indexer

Установите настраиваемый url-адрес для расположения конечных точек индексатора, служба запросов использует эти конечные точки для проверки работоспособности индексатора, метаданных и состояния готовности

### --unsafe

Служба запросов имеет лимит в 100 объектов для неограниченных запросов graphql. Unsafe флаг снимает это ограничение, что может вызвать проблемы с производительностью службы запросов. Вместо этого рекомендуется, чтобы запросы были [разбиты на страницы](https://graphql.org/learn/pagination/).

Этот флаг также можно использовать для включения определенных функций агрегирования, включая сумму, максимум, среднее и [другие](https://github.com/graphile/pg-aggregates#aggregates).

Они отключены по умолчанию из-за ограничения сущностей.

**Обратите внимание, что команда `--unsafe` предотвратит запуск вашего проекта в SubQuery Network, и вы должны обратиться в службу поддержки, если хотите, чтобы эта команда выполнялась с вашим проектом в службе управляемой SubQuery [project.subquery.network](https://project.subquery.network).**

### --port

Порт, к которому привязывается служба запросов Subquery. По умолчанию установлено значение `3000`
