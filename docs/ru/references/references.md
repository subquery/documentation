# Флаги команд

## subql-node

### - помощь

Здесь показаны параметры помощи.

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

### --версия

Это отображает текущую версию.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Используйте этот флаг, чтобы запустить проект SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name

Этот флаг позволяет задать имя для вашего проекта, которое действует так, как будто создает экземпляр вашего проекта. При указании нового имени создается новая схема базы данных, и синхронизация блоков начинается с нуля.

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Все эти различные конфигурации можно поместить в файл .yml или .json, а затем сослаться на него с помощью флага config.

Пример файла subquery_config.yml:

```shell
subQuery: . // Mandatory. Это локальный путь проекта. Период здесь означает текущий локальный каталог.
subqueryName: hello // Дополнительное имя
batchSize: 55 // Необязательная конфигурация
```

Разместите этот файл в тот же каталог, что и проект. Затем в текущем каталоге проекта, запустите:

```shell
> subql-node -c ./subquery_config.yml
```

### local

Этот флаг используется в основном для отладочных целей, где он создает таблицу starter_entity по умолчанию в схеме "postgres" по умолчанию.

```shell
subql-node -f . local
```

Обратите внимание, что если вы используете этот флаг, его удаление не означает, что он будет указывать на другую базу данных. Для перенаправления на другую базу данных вам придется создать НОВУЮ базу данных и изменить настройки env на эту новую базу данных. Другими словами, "export DB_DATABASE=<new_db_here>"

### --force-clean

Этот флаг заставляет схемы и таблицы проекта регенерироваться, что полезно использовать при итеративном развитии схем graphql, чтобы новые запуски проекта всегда работали с чистым состоянием. Обратите внимание, что этот флаг также удалит все индексированные данные.

### --batch-size

Этот флаг позволяет задать размер партии в командной строке. Если размер партии также задан в конфигурационном файле, он имеет приоритет.

```shell
> subql-node -f . --batch-size=20
2021-09T23:24:43.775Z <fetch> блок ИНФО получения [6601,6620], всего 20 блоков
2021-08-09T23:24:45. 06Z <fetch> Блок INFO fetch [6621,6640], всего 20 блоков
2021-08-09T23:24:47. 15Z <fetch> INFO fetch блок [6641,6660], всего 20 блоков
2021-08-09T23:24:49.235Z <fetch> INFO блок выборки [6661,6680], всего 20 блоков
```

<!-- ### --timeout -->

### отладка

Это выводит отладочную информацию на консольный вывод и принудительно устанавливает уровень журнала на отладочный.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED. updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39. 72Z <db> DEBUG Executing (по умолчанию): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### профиль

Здесь показана информация о профиле.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --Сетевая конечная точка

Этот флаг позволяет пользователям переопределить конфигурацию сетевой конечной точки из файла манифеста.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Обратите внимание, что это также должно быть установлено в файле манифеста, иначе вы получите:

```shell
ОШИБКА не удалось создать проект субзапроса из заданного пути! Ошибка: не удалось разобрать project.yaml.
Экземпляр ProjectManifestImpl не выполнил проверку:
 - сеть свойств не выполнила следующие ограничения: isObject
 - сеть свойств. etwork провалил следующие ограничения: вложенная проверка
```

### --Вывод

Существует два различных терминальных выходных формата. JSON или цвет. Цвет по умолчанию и содержит цветной текст.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch блока [10501,10600], всего 100 блоков"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --уровень лога

На выбор предлагается 7 вариантов. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. В приведенном ниже примере ничего не показывается. В терминале ничего не будет печататься, так что единственным способом определить, работает ли узел или нет является запрос к базе данных по счету рядов (\*) из subquery_1. tarter_entities) или запросить высоту блока.

```shell
> subql-node -f . --log-level=беззвучный
(node:24686) [PINODEP007] Предупреждение: привязка к уровню устарела, используйте опцию уровней вместо
(Используйте `node --trace-warnings . .`, чтобы показать, где было создано предупреждение)
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте параметры. опция evel вместо
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте options.level вместо
(node:24686) [PINODEP007] Предупреждение: привязки. evel является устаревшим, используйте опцию options.level вместо
(node:24686) [PINODEP007] Предупреждение: привязывания. evel устарел, используйте опцию options.level вместо
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте параметры. опция evel взамен
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте опции options.level вместо
(node:24686) [PINODEP007] Предупреждение: привязки. evel устарел, используйте опцию options.level вместо
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте параметры. опция evel (evel
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry являются устаревшими. Пожалуйста, используйте свойство детали.
(node:24686) [PINODEP007] Предупреждение: bindings.level является устаревшим, используйте опции options.level вместо этого
```

<!-- ### --migrate TBA -->

### --timestamp-поле

По умолчанию это верно. когда задано значение false с:

```shell
> subql-node -f . –timestamp-field=false
```

Это удаляет created_at и updated_at columns из таблицы starter_its.

### -d, --сетевой словарь

Это позволяет вам указать конечную точку словаря, который является бесплатной услугой, предоставляемой и размещаемой по адресу: [https://explorer.subquery.network/](https://explorer.subquery.network/) (поиск словаря) и представляет конечную точку API: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Обычно этот параметр задается в файле манифеста, но ниже показан пример использования его в качестве аргумента в командной строке.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[ Подробнее о том, как работает словарь SubQuery ](../tutorials_examples/dictionary.md).

## subql-query

### - помощь

Здесь показаны параметры помощи.

```shell
ns:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        project name                             [string] [required]
      --playground  enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [выборы: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [по умолчанию: "info"]
      --indexer Url разрешающий запрос получить доступ к метаданным индекса     [string]
```

### --версия

Это отображает текущую версию.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Этот флаг используется для запуска службы запросов. Если флаг --subquery-name не указан при запуске индексатора, имя здесь будет ссылаться на имя проекта по умолчанию. Если параметр --subquery-name установлен, то имя здесь должно совпадать с тем, что было установлено.

```shell
> subql-node -f . // --subquery-name не задано

> subql-query -n subql-helloworld --playground // имя по умолчанию для каталога проекта
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground // название указывает на subql-helloworld project but with the name of hiworld
```

### игровая площадка

Этот флаг включает игровую площадку graphql, поэтому он всегда должен быть включен по умолчанию, чтобы быть полезным.

### --Вывод

Смотрите [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --уровень лога

Смотрите [--loglevel](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
