# Флагове на командния ред

## subql (cli)

### --help

```shell
> subql --help

Команди
  build     Изграждане на SubQuery кода
  codegen  Генериране на схеми за graph node
  help      десплей помощ за subql
  init      инициализиране на scaffold subquery проект
  migrate   мигриране на Subquery project манифеста v0.0.1 към v0.2.0
  publish   ъплоад на проекта SubQuery към IPFS
  validate  проверете папка или github репо дали проект е валидиран
```

### изграждане

Тази команда използва webpack за създаване на пакет за проекта subquery.

| Опции              | Описание                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | локална папка на проекта subquery (ако все още не сте в папка)                                             |
| -o, --output       | посочете изходната папка на build например build-folder                                                    |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- С помощта на `subql build` можете да посочите допълнителни входни точки в полето за експортиране, въпреки че то постоянно ще се изгражда `index.ts` автоматично

- Трябва да притежавате версия @subql/cli v0.19.0 или по-висока за да използвате полето за експортране.

- Всяко поле `exports` трябва да съответства на типа (напр. `"entry": "./src/file.ts"`), или ще бъде игнорирано при изграждането.

[Futher example](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

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
      --subscription        Enable subscription       [boolean] [default: false]                                                     
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

Това показва текущата версия.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Използвайте този флаг, за да стартирате проекта SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-име (отхвърлено)

Този флаг ви позволява да посочите име за вашия проект, което действа по начин, пресъздаващ екземпляр на вашия проект. След предоставяне на ново име се създава нова схема на базата данни и синхронизирането на блокове започва от нула. Остарял в полза на `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Всички тези различни конфигурации могат да бъдат позиционирани във файла .yml или .json, към който ще препращат след това чрез конфигурационен флаг.

Пример на subquery_config.yml файл:

```shell
subquery: . // Mandatory. Това е локалният път на проекта. Точката тук означава текущата локална директория.
subqueryName: hello // Име по избор
batchSize: 55 // Незадължителна конфигурация
```

Поставете този файл в същата директория, в която се намира и проекта. След това в текущата директория на проекта стартирайте:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (deprecated)

Този флаг се използва главно за отстраняване на грешки или бъгове, като създава таблица starter_entity таблица по подразбиране в стандартната схема "postgres".

```shell
subql-node -f . --local
```

Имайте предвид, че след като използвате този флаг, премахването му няма да означава, че той ще насочва към друга база данни. За да насочите към друга база данни, ще трябва да създадете НОВА база данни и да промените настройките на env към тази нова база данни. С други думу, "export DB_DATABASE=<new_db_here>"

### --force-clean

Този флаг принуждава схемите и таблиците на проекта да се опресняват, което е полезно при итеративното проектиране на graphql схеми по такъв начин, че новите стартирания на проекта винаги да работят с обновено състояние. Имайте предвид, че този флаг също така ще изтрие всички индексирани данни.

### --db-schema

Този флаг ви позволява да посочите име за схемата на базата данни за проекта. След предоставяне на ново име създава се нова схема на базата данни с това име и започва индексирането на блокове.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
Това ще създаде тригер за уведомяване за обект, това също е предпоставка за активиране на функцията за абонамент в услугата за заявки.

### --unsafe

Проектите SubQuery обикновено се стартират в изолирана среда javascript, спазвайки изискванията за сигурност, за да се ограничи достъп на проекта към вашата система. Sandbox ограничава наличния импорт на javascript към следните модули:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Въпреки че това повишава сигурността, ние разбираме също така, че се ограничава наличната функционалност на вашата SubQuery. Командата `--unsafe` импортира всички javascript модули по подразбиране, което значително увеличава sandbox функционалността за сметка намаляването нивото на сигурност.

**Обърнете внимание, че командата `--unsafe` ще попречи на вашия проект да се изпълнява в SubQuery мрежата и трябва да се свържете с поддръжката, ако искате тази команда да се изпълнява с вашия проект в управляваната услуга на SubQuery ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Този флаг ви позволява да зададете размера на партидата в командния ред. Ако размерът на партидата е зададен и в конфигурационния файл, това има решение.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Мащабирайте размера на патидата за вземане въз основа на използването на паметта

### --timeout

Задайте персонализирано време за изчакване javascript Sandbox за изпълнение на функции за картографиране след блока, преди функцията за картографиране на блокове да изиска тайм-аут изключение

### --debug

Това извежда информация за отстраняване на грешки към изхода на конзолата и принудително активира нивото на регистрационния файл за отстраняване на грешки.

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
Пример на ProjectManifestImpl не е преминал валидирането:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Има два различни изходни формата на терминала. JSON or colored. Colored е значение по подразбиране и съдържа цветен текст.

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

Има 7 възможности за избор. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Примерът по-долу показва безшумния режим. Нищо няма да бъде отпечатано в терминала, така че единственият начин да се определи дали дадена нода работи или не е да се направи заявка в базата данни за броя на редовете (select count(\*) from subquery_1.starter_entities) или да се поиска височината на блока.

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
(node:24686) [PINODEP007] Предупреждение: bindings.level е отхвърлен, вместо това използвайте опцията options.level
```

<!-- ### --migrate TBA -->

### --timestamp-field

По подразбиране тази стойност е true. когато е зададено значение false:

```shell
> subql-node -f . –timestamp-field=false
```

Това премахва колоните created_at и updated_at в таблицата starter_entities.

### -d, --network-dictionary

Това ви позволява да посочите крайна точка на речника, безплатна услуга, която се предоставя и разполага на:[https://explorer.subquery.network/](https://explorer.subquery.network/) (search for dictionary) и представлява крайната точка на API: https://api.subquery.network/sq/subquery/dictionary-polkadot

Обикновено това ще бъде зададено във вашия манифест файл, по-долу е показан пример за използването му като аргумент в командния ред.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Прочетете повече за това как работи SubQuery Dictionary](../academy/tutorials_examples/dictionary.md).

### -p, --port

Портът, към който е свързана услугата за индексиране subquery. По подразбиране тази стойност е`3000`

## subql-query

### --help

Тук са показани опциите за помощ.

```shell
Options:
      --help          Show help                                          [boolean]
      --version       Show version number                                [boolean]
  -n, --name          Project name                             [string] [required]
      --playground    Enable graphql playground                          [boolean]
      --subscription  Enable subscription               [boolean] [default: false]   
      --output-fmt    Print log as json or plain text
                        [string] [choices: "json", "colored"] [default: "colored"]
      --log-level     Specify log level to print.
            [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [default: "info"]
      --log-path      Path to create log file e.g ./src/name.log          [string]
      --log-rotate    Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer       Url that allows query to access indexer metadata    [string]
      --unsafe        Disable limits on query depth and allowable number returned
                      query records                                      [boolean]
  -p, --port          The port the service will bind to                   [number]
```

### --version

Това показва текущата версия.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Този флаг се използва за стартиране на услуга за заявки. Ако --subquery-name флагът не се предоставя при стартирането на индексатора, името тук ще се отнася до името на проекта по подразбиране. Ако --subquery-name е указано, тогава името тук трябва да съответства на зададеното.

```shell
> subql-node -f . // --subquery-не е установено

> subql-query -n subql-helloworld  --playground // името по подразбиране е името на директорията на проекта
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  //името му показва  subql-helloworld но с името hiworld
```

### --playground

Този флаг активира graphql playground затова винаги трябва да бъде включен по подразбиране, за да бъде използван.

### --output-fmt

Вижте [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

Вижте [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Активирайте регистрирането на файлове, като посочите пътя на файла за логване

### --log-rotate

Активирайте ротацията на лог файла със зададени опции за ротационен интервал на 1 ден, максимум 7 файла и с максимален размер на файла 1 Gb

### --indexer

Задайте персонализиран Url адрес за местоположението на крайните точки на индексите, услугата за заявки използва тези крайни точки, за да определи работоспособността на индексатора, метаданните и състоянието на готовност

### --subscription

Този флаг активира [GraphQL Subscriptions](./subscription.md), за да активирате тази функция, изисква `subql-node` също така активирайте `--subscription`

### --unsafe

Услугата за заявки има ограничение от 100 обекта за неограничени заявки graphql. Флагът unsafe премахва това ограничение, което може да причини проблеми с производителността на услугата за заявки. Вместо това се препоръчва заявките да бъдат [разделени на страници](https://graphql.org/learn/pagination/).

Този флаг позволява определени функции за агрегиране, включително sum, max, avg и други. Прочетете повече за тази функция [тук](./aggregate.md)

Те са деактивирани по подразбиране поради ограничение на обекта.

**Моля, обърнете внимание, че отборът `--опасни` ще попречи на стартирането на проекта в мрежата на подзаявки, и вие трябва да се свържете с поддръжката, ако искате, за тази команда се изпълнява с вашия проект в управлявана услуга subquery [project.subquery.network](https://project.subquery.network).**

### --port

Портът, към който е свързана услугата за заявки за подзаявка. По подразбиране тази стойност е`3000`
