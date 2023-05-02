# Флаги командной строки

## subql (cli)

### - помощь

This shows all the current command options for your current verison of `subql-cli`.

### создать

This command is uses webpack to generate a bundle of a subquery project.

| Параметры      | Описание                                                   |
| -------------- | ---------------------------------------------------------- |
| -l, --location | локальная папка проекта subquery (если ее еще нет в папке) |
| -o, --output   | указать выходную папку сборки, например, build-folder      |
| --mode         | production or development (default: production)            |

- В `subql build` вы можете указать дополнительные точки входа в поле exports, хотя он всегда будет строить `index.ts` автоматически.

- Для использования поля exports необходимо иметь @subql/cli версии 0.19.0 или выше.

- Любое поле `exports` должно соответствовать строковому типу (например, `"entry": "./src/file.ts"`), иначе оно будет проигнорировано при сборке.

For more info, visit [basic workflows](../build/introduction.md#build).

## subql-node

### - помощь

This shows all the current command options for your current verison of `subql-node`.

### --размер партии

Этот флаг позволяет задать размер партии в командной строке. Если размер партии также задан в конфигурационном файле, он имеет приоритет.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --block-confirmations

(EVM only) The number of blocks behind the head to be considered finalized, this has no effect with non-EVM networks. This is by default 20.

### -c, --конфигурация

Все эти различные конфигурации можно поместить в файл .yml или .json, а затем сослаться на него с помощью флага config.

Пример файла subquery_config.yml:

```shell
subquery: . // Обязательно. Это локальный путь проекта. Точка здесь означает текущий локальный каталог.
subqueryName: hello // Необязательное имя
batchSize: 55 // Необязательная конфигурация
```

Поместите этот файл в тот же каталог, что и проект. Затем в текущем каталоге проекта запустите:

```shell
> subql-node -c ./subquery_config.yml
```

### -d, --сетевой словарь

Это позволяет вам указать конечную точку словаря, который является бесплатной услугой, предоставляемой и размещаемой в SubQuery's [Project Explorer](https://explorer.subquery.network/) (поиск словаря) и представляет конечную точку API: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Обычно этот параметр задается в файле манифеста, но ниже показан пример использования его в качестве аргумента в командной строке.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

For more info, visit [How does a SubQuery Dictionary works?](../academy/tutorials_examples/dictionary.md)

### --db-схема

Этот флаг позволяет задать имя для схемы базы данных проекта. При указании нового имени создается новая схема базы данных с настроенным именем и начинается блочное индексирование.

```shell
subql-node -f . --db-schema=test2
```

### отладка

Это выводит отладочную информацию на консольный вывод и принудительно устанавливает уровень журнала на отладочный.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;

```

### --disable-historical

Отключает автоматическое отслеживание исторических состояний, [ см. Historic State Tracking](./historical.md). По умолчанию установлено значение `false`.

### --dictionary-resolver

Uses the provided SubQuery Network dictionary resolver to find a dictionary, this will overwrite dictionaries specified by `--network-dictionary`

### --dictionary-timeout

Changes the timeout for dictionary queries, this number is expressed in seconds. By default we use 30 seconds.

### -f, --subquery

Используйте этот флаг для запуска проекта SubQuery.

```shell
subql-node -f . // или
subql-node --subquery .
```

### force-clean

- In order to use this command you need to have `@subql/node` v1.10.0 or above.

This command forces the project schemas and tables to be regenerated. It is helpful to use when iteratively developing graphql schemas in order to ensure a clean state when starting a project. Обратите внимание, что этот флаг также сотрет все индексированные данные. This will also drop all related schema and tables of the project.

`-f`, `--subquery` flag must be passed in, to set path of the targeted project.

::: tip Note Similar to `reindex` command, the application would exit upon completion. :::

```shell
subql-node -f /example/subql-project force-clean
```

### --локальный (устаревший)

Этот флаг используется в основном для отладочных целей, где он создает таблицу starter_entity по умолчанию в схеме "postgres" по умолчанию.

```shell
subql-node -f . --local
```

Обратите внимание, что если вы используете этот флаг, его удаление не означает, что он будет указывать на другую базу данных. Для перенаправления на другую базу данных вам придется создать НОВУЮ базу данных и изменить настройки env на эту новую базу данных. Другими словами, "export DB_DATABASE=<new_db_here>".

### --уровень лога

На выбор предлагается 7 вариантов. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. В приведенном ниже примере ничего не показывается. В терминале ничего не будет выведено, поэтому единственный способ узнать, работает узел или нет, - это запросить в базе данных количество строк (select count(\*) from subquery_1.starter_entities) или запросить высоту блока.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Предупреждение: bindings.level устарел, вместо него используйте опцию options.level
(Используйте `node --trace-warnings ...`, чтобы показать, где было создано предупреждение)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Пользовательские аксессоры PerformanceEntry устарели. Пожалуйста, используйте свойство детализации.
(node:24686) [PINODEP007] Предупреждение: bindings.level устарел, вместо него используйте опцию options.level
```

### --multi-chain

Enables indexing multiple subquery projects into the same database schema.

```shell
> subql-node -f . --multi-chain --db-schema=SCHEMA_NAME
```

For more info, visit [Multi-Chain Support](../build/multi-chain.md).

### --Сетевая конечная точка

Этот флаг позволяет пользователям переопределять конфигурацию конечной точки сети из файла манифеста.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"

```

Обратите внимание, что это также должно быть установлено в файле манифеста, иначе вы получите:

```shell
ERROR Создать проект Subquery по заданному пути не удалось! Ошибка: не удалось разобрать project.yaml.
Экземпляр ProjectManifestImpl не прошел проверку:
 - свойство network не выполнило следующие ограничения: isObject
 - свойство network.network не прошло следующие ограничения: nestedValidation
```

### --Вывод

Существует два различных формата вывода терминала. JSON или цвет. Colored (Цветной) используется по умолчанию и содержит цветной текст.

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

### -p, --порт

Порт, к которому привязывается служба индексирования подзапросов. По умолчанию установлено значение `3000`.

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### профиль

Здесь отображается информация о профилировщике.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### reindex

:::warning In order to use this command, you require `@subql/node:v1.10.0`/`@subql/node-YOURNETWORK:v1.10.0` or above. :::

When using reindex command, historical must be enabled for the targeted project (`--disable-historical=false`). After starting the project, it would print out a log stating if historical is enabled or not.

For more info, visit [Automated Historical State Tracking](./historical.md)

Use `--targetHeight=<blockNumber>` with `reindex` to remove indexed data and reindex from specified block height.

`-f` or `--subquery` flag must be passed in, to set path of the targeted project.

If the `targetHeight` is less than the declared starting height, it will execute the `--force-clean` command.

```shell
subql-node -f /example/subql-project reindex --targetHeight=30
```

::: tip Note
Once the command is executed and the state has been rolled back the the specified height, the application will exit. You can then start up the indexer to proceed again from this height.
:::

### --масштабируемый размер партии

Масштабируйте размер пакета выборки блоков в зависимости от использования памяти.

### --store-cache-threshold

This can be specified when `--store-cache-async=false`. Store cache will flush data to the database when number of records excess this threshold, a higher number reduces number of transactions to database in order to save time but requires more memory. The default is 1000 records.

### --store-get-cache-size

This can be specified when `--store-cache-async=false`. The number of items from the store retained in a memory cache for faster retrieval of recent data within handlers. A higher number may increase indexing speed, but will require more memory. The default is 500.

### --store-cache-async

If enabled the store cache will flush data asynchronously relative to indexing data (enabled by default)

### --подписка

Это создаст триггер уведомления на сущность, что также является необходимым условием для включения функции подписки в службе запросов.

### --subquery-имя (устаревшее)

Этот флаг позволяет задать имя для вашего проекта, которое действует так, как будто создает экземпляр вашего проекта. При указании нового имени создается новая схема базы данных, и синхронизация блоков начинается с нуля. Утратил силу в пользу `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### --тайм-аут

Установите пользовательский таймаут для javascript-песочницы для выполнения функций отображения над блоком до того, как функция отображения блока выбросит исключение по таймауту.

### --поле временной метки

По умолчанию это значение истина. When set to false, it removes the created_at and updated_at columns in the starter_entities table.

```shell
> subql-node -f . –timestamp-field=false
```

### --unfinalized-blocks

This allows you to index blocks before they become finalized. It can be very useful if you want the most up-to-date data possible. It will detect any forks and remove any blocks that don't become finalized. By default it is set to `false`. To change it to `true` run following command:

```shell
> subql-node -f . --unfinalized-blocks
```

::: tip Tip Note that this feature **requires historical indexing** to be enabled. Learn more [here](./historical.md). :::

::: tip Note
This feature is only available for Substrate-based blockchains; more networks will be supported in the future.
:::

### --unsafe (Node Service)

Unsafe mode controls various features that compromise the determinism of a SubQuery project. It makes it impossible to guarantee that the data within two identical projects running independently, will be 100% consistent.

One way we control this is by running all projects in a JS sandbox for security to limit the scope of access the project has to your system. Песочница ограничивает доступный импорт javascript следующими модулями:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security, we understand that this limits the available functionality of your SubQuery project. The `--unsafe` command allows any import which greatly increases functionality with the tradeoff of decreased security.

By extension, the `--unsafe` command on the SubQuery Node also allows:

- making external requests (e.g. via Fetch to an external HTTP address or fs)
- querying block data at any height via the unsafeApi

**Note that users must be on a paid plan to run projects with the `--unsafe` command (on the node service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

Also review the [--unsafe command on the query service](#unsafe-query-service).

### --версия

Здесь отображается текущая версия.

```shell
> subql-node --version
0.19.1
```

### -w, --workers

Это позволит перевести добычу блока и обработку данных в рабочее состояние. По умолчанию эта функция будет выглядеть как **disabled**. Вы можете активировать это с помощью флага `--workers=<number>`.

Обращаем ваше внимание, что количество доступных ядер процессора строго ограничивает использование рабочих потоков. Итак, при использовании флага `--workers=<number>` всегда задавайте количество работников. Без указания флага все будет выполняться в одном потоке.

:::tip Это позволит увеличить производительность в 4 раза. Попробуйте и оставьте нам обратную связь!

На данный момент он находится на ранней стадии эксперимента, но мы планируем включить его по умолчанию. :::

On initialisation, once the main thread is established, then the fetching and processing workload is distributed across all worker threads. Each worker has their own buffer (a set of blocks that they are responsible to fetch/process). For example:

- Worker A: Will execute the `fetch` and `indexing` of blocks `[n,..n+10]`
- Worker B: Will execute the `fetch` and `indexing` of blocks `[n+11,..n+20]`
- Worker C: Will execute the `fetch` and `indexing` of blocks `[n+21,..n+30]`
- Then repeat with `n = n + 30`

In the case where Worker C completes its fetch prior to Worker A and B, it will remain in an idle state until A and B have completed, as the processing phase executes sequentially.

## subql-query

### - помощь

This shows all the current command options for your current verison of `subql-query`.

### --aggregate

Enables or disables the GraphQL aggregation feature, [read more about this here](../run_publish/aggregate.md). By default this is set to true.

### --disable-hot-schema

Disables the hot reload schema on project schema changes, by default this is set to false.

### --индексатор

Установите пользовательский url для расположения конечных точек индексатора, служба запросов использует эти конечные точки для определения состояния здоровья индексатора, метаданных и статуса готовности.

### --уровень лога

Смотрите [--loglevel](../run_publish/references.md#log-level).

### --log-path

Включите ведение журнала файлов, указав путь к файлу, в который будет вестись журнал.

### --log-поворот

Включите ротацию журналов с параметрами интервала ротации 1d, максимум 7 файлов и с максимальным размером файла 1GB.

### --max-connection

The maximum simultaneous connections allowed to this GraphQL query service expressed as a positive integer. The default value is 10.

### -n, --имя

Этот флаг используется для запуска службы запросов. Если флаг --subquery-name не указан при запуске индексатора, имя здесь будет ссылаться на имя проекта по умолчанию. Если задано --subquery-name, то имя здесь должно соответствовать заданному.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld --playground // имя по умолчанию соответствует имени каталога проекта
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground // имя указывает на проект subql-helloworld, но с именем hiworld
```

### --Вывод

Смотрите [--output-fmt](../run_publish/references.md#output-fmt).

### игровая площадка

Этот флаг включает игровую площадку graphql, поэтому он всегда должен быть включен по умолчанию, чтобы быть полезным.

### --playground-settings

You can use this flag to pass additional settings to the GraphQL playground (in JSON format). Additional settings can be found here https://github.com/graphql/graphql-playground#settings

### --port

The port the subquery query service binds to. By default this is set to `3000`

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --query-complexity

The level of query complexity that this service will accept expressed as a positive integer. By default this is set to 10. If a client makes a query with a query complexity higher than this level, the GraphQL query service will reject the request.

We use the [graphqql-query-complexity](https://www.npmjs.com/package/graphql-query-complexity) plugin to calculate this value.

### --query-limit

The query service by default has a limit of 100 entities for to prevent unbounded GraphQL queries and encourage the use of pagination. This flag accepts a positive integer value that will change this limit (by default this is set to 100). Setting a high value may cause performance issues on the query service, it is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

### --query-timeout

The timeout for long running graphql queries expressed in milliseconds, by default this value is 10000 milliseconds

### --подписка

Этот флаг включает [GraphQL Subscriptions](./subscription.md), для включения этой функции требуется `subql-node` также включить `--subscription`.

### --unsafe (Query Service)

Этот флаг позволяет использовать некоторые функции агрегирования, включая sum, max, avg и другие. Подробнее об этой функции [здесь](../run_publish/aggregate.md).

These are disabled by default for database performance reasons.

**Note that must be on a Partner plan if you would like to run projects with the `--unsafe` command (on the query service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

### --версия

Здесь отображается текущая версия.

```shell
> subql-query --version
0.7.0
```
