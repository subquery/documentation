# Прапори командного рядка

## subql (cli)

### --help

This shows all the current command options for your current verison of `subql-cli`.

### будувати

This command is uses webpack to generate a bundle of a subquery project.

| Опція          | Описання                                                            |
| -------------- | ------------------------------------------------------------------- |
| -l, --location | локальна тека проєкту subquery (якщо вона ще не знаходиться в теці) |
| -o, --output   | вкажіть вихідну теку збірки, наприклад, build-folder                |
| --mode         | production or development (default: production)                     |

- За допомогою `subql build` ви можете вказати додаткові точки входу в поле exports, хоча він завжди буде будуватися `index.Ts` автоматично.

- Для використання поля експорту у вас повинен бути @subql/cli версії 0.19.0 або вище.

- Будь-яке поле `exports` має відповідати рядковому типу (наприклад, `"entry": "./src/file.ts"`), інакше воно буде проігноровано при складанні.

For more info, visit [basic workflows](../build/introduction.md#build).

## subql-node

### --help

This shows all the current command options for your current verison of `subql-node`.

### --batch-size

Цей прапор дозволяє встановити розмір пакета в командному рядку. Якщо розмір пакета також заданий в конфігураційному файлі, це має прецедент.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --block-confirmations

(EVM only) The number of blocks behind the head to be considered finalized, this has no effect with non-EVM networks. This is by default 20.

### -c, --config

Всі ці різні конфігурації можуть бути поміщені в .yml yml або .json, на який потім посилаються за допомогою прапора конфігурації.

Зразок subquery_config.yml file:

```shell
subquery: . // Mandatory. Це локальний шлях проєкту. Точка тут означає поточний локальний каталог.
subqueryName: hello // Необов'язкове ім'я
batchSize: 55 // Додаткова конфігурація
```

Помістіть цей файл в той же каталог, що і проєкт. Потім в поточному каталозі проєкту запустіть:

```shell
> subql-node -c ./subquery_config.yml
```

### -d, --network-dictionary

Це дозволяє вказати кінцеву точку словника, яка є безплатною службою, що надається та розміщується в [Project Explorer](https://explorer.subquery.network/) SubQuery's (пошук за словником) і представляє кінцеву точку API: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Зазвичай це значення задається у вашому файлі маніфесту, але нижче наведено приклад його використання в якості аргументу в командному рядку.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

For more info, visit [How does a SubQuery Dictionary works?](../academy/tutorials_examples/dictionary.md)

### --db-schema

Цей прапорець дозволяє вказати ім'я для схеми бази даних проєкту. Після надання нового імені створюється нова схема бази даних з налаштованим ім'ям і починається індексація блоків.

```shell
subql-node -f . --db-schema=test2
```

### --debug

Це виводить налагоджувальну інформацію на висновок консолі й примусово встановлює рівень журналу для налагодження.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --disable-historical

Вимикає автоматичне відстеження історичного стану, [див. розділ відстеження історичного стану](./historical.md). За замовчуванням для цього параметра встановлено значення `false`.

### --dictionary-resolver

Uses the provided SubQuery Network dictionary resolver to find a dictionary, this will overwrite dictionaries specified by `--network-dictionary`

### --dictionary-timeout

Changes the timeout for dictionary queries, this number is expressed in seconds. By default we use 30 seconds.

### -f, --subquery

Використовуйте цей прапорець, щоб запустити проєкт SubQuery.

```shell
subql-node -f . // бо
subql-node --subquery .
```

### force-clean

- In order to use this command you need to have `@subql/node` v1.10.0 or above.

This command forces the project schemas and tables to be regenerated. It is helpful to use when iteratively developing graphql schemas in order to ensure a clean state when starting a project. Зверніть увагу, що цей прапор також призведе до видалення всіх індексованих даних. This will also drop all related schema and tables of the project.

`-f`, `--subquery` flag must be passed in, to set path of the targeted project.

::: tip Note Similar to `reindex` command, the application would exit upon completion. :::

```shell
subql-node -f /example/subql-project force-clean
```

### --local (засуджувати)

Цей прапор в основному використовується для цілей налагодження, де він створює таблицю starter_entity за замовчуванням у схемі postgres за замовчуванням.

```shell
subql-node -f . --local
```

Зверніть увагу, що як тільки ви використовуєте цей прапор, його видалення не означатиме, що він буде вказувати на іншу базу даних. Щоб вказати на іншу базу даних, вам потрібно буде створити нову базу даних та змінити налаштування env для цієї нової бази даних. Іншими словами, "export DB_DATABASE=<new_db_here>".

### --log-level

Є 7 варіантів на вибір. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. У наведеному нижче прикладі показано мовчання. У терміналі нічого не буде надруковано, тому єдиним способом визначити, чи працює вузол чи ні, є запит на кількість рядків у базі даних (виберіть count(\*) з subquery_1.starter_entities) або запитати висоту блоку.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Будь ласка, використовуйте властивість detail.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

### --multi-chain

Enables indexing multiple subquery projects into the same database schema.

```shell
> subql-node -f . --multi-chain --db-schema=SCHEMA_NAME
```

For more info, visit [Multi-Chain Support](../build/multi-chain.md).

### --network-endpoint

Цей прапорець дозволяє користувачам перевизначати конфігурацію кінцевої точки мережі з файлу маніфесту.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Зверніть увагу, що це також має бути задано у файлі маніфесту, в іншому випадку ви отримаєте:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Існує два різних форматів виводу терміналу. JSON або кольоровий. Кольорове значення за замовчуванням і містить кольоровий текст.

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

### -p, --port

Порт, до якого прив'язується служба індексації subquery. За замовчуванням це значення дорівнює `3000`.

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --profiler

Тут показуватися інформація про профілювальника.

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

### --scale-batch-size

Масштабуйте розмір пакета вибірки блоків залежно від використання пам'яті.

### --store-cache-threshold

This can be specified when `--store-cache-async=false`. Store cache will flush data to the database when number of records excess this threshold, a higher number reduces number of transactions to database in order to save time but requires more memory. The default is 1000 records.

### --store-get-cache-size

This can be specified when `--store-cache-async=false`. The number of items from the store retained in a memory cache for faster retrieval of recent data within handlers. A higher number may increase indexing speed, but will require more memory. The default is 500.

### --store-cache-async

If enabled the store cache will flush data asynchronously relative to indexing data (enabled by default)

### --subscription

Це створить тригер повідомлення для об'єкта, це також є необхідною умовою для включення функції підписки в службі запитів.

### --subquery-name (засуджувати)

Цей прапорець дозволяє вказати ім'я для вашого проєкту, яке діє так, як якби він створив екземпляр вашого проєкту. Після надання нового імені створюється нова схема бази даних, і синхронізація блоків починається з нуля. Застарів на користь `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### --timeout

Встановіть користувальницький тайм-аут для пісочниці javascript для виконання функцій зіставлення над блоком, перш ніж функція зіставлення блоків видасть виняток тайм-ауту.

### --timestamp-field

За замовчуванням це значення дорівнює true. When set to false, it removes the created_at and updated_at columns in the starter_entities table.

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

One way we control this is by running all projects in a JS sandbox for security to limit the scope of access the project has to your system. Ізольоване середовище обмежує доступний імпорт javascript наступними модулями:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security, we understand that this limits the available functionality of your SubQuery project. The `--unsafe` command allows any import which greatly increases functionality with the tradeoff of decreased security.

By extension, the `--unsafe` command on the SubQuery Node also allows:

- making external requests (e.g. via Fetch to an external HTTP address or fs)
- querying block data at any height via the unsafeApi

**Note that users must be on a paid plan to run projects with the `--unsafe` command (on the node service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

Also review the [--unsafe command on the query service](#unsafe-query-service).

### --version

При цьому показуватися поточна версія.

```shell
> subql-node --version
0.19.1
```

### -w, --workers

Це перемістить вибірку та обробку блоків у Worker. За умовчанням цю функцію ** disabled **. Ви можете ввімкнути його за допомогою позначки `--workers=<number>`.

Зауважте, що кількість доступних ядер ЦП суворо обмежує використання робочих потоків. Отже, використовуючи прапорець `--workers=<number>`, завжди вказуйте кількість працівників. Якщо прапорець не надано, усе працюватиме в одному потоці.

:::tip Порада Це може збільшити продуктивність до 4 разів. Спробуйте й повідомте нам свій відгук!

На даний момент він знаходиться на ранній експериментальній стадії, але ми плануємо ввімкнути його за умовчанням. :::

On initialisation, once the main thread is established, then the fetching and processing workload is distributed across all worker threads. Each worker has their own buffer (a set of blocks that they are responsible to fetch/process). For example:

- Worker A: Will execute the `fetch` and `indexing` of blocks `[n,..n+10]`
- Worker B: Will execute the `fetch` and `indexing` of blocks `[n+11,..n+20]`
- Worker C: Will execute the `fetch` and `indexing` of blocks `[n+21,..n+30]`
- Then repeat with `n = n + 30`

In the case where Worker C completes its fetch prior to Worker A and B, it will remain in an idle state until A and B have completed, as the processing phase executes sequentially.

## subql-query

### --help

This shows all the current command options for your current verison of `subql-query`.

### --aggregate

Enables or disables the GraphQL aggregation feature, [read more about this here](../run_publish/aggregate.md). By default this is set to true.

### --disable-hot-schema

Disables the hot reload schema on project schema changes, by default this is set to false.

### --indexer

Задайте користувацьку Url-адресу для розташування кінцевих точок індексів, служба запитів використовує ці кінцеві точки для визначення працездатності індексатора, метаданих і стану готовності.

### --log-level

Бачачи [--log-level](../run_publish/references.md#log-level).

### --log-path

Увімкніть ведення журналу файлів, вказавши шлях до файлу для входу в систему.

### --log-rotate

Увімкніть обертання журналу файлів з параметрами інтервалу обертання 1D, максимум 7 файлів і з максимальним розміром файлу 1 Гб.

### --max-connection

The maximum simultaneous connections allowed to this GraphQL query service expressed as a positive integer. The default value is 10.

### -n, --name

Цей прапор використовується для запуску служби query. Якщо прапор -- subquery-name не вказано при запуску індексатора, ім'я тут буде посилатися на ім'я проєкту за замовчуванням. Якщо задано --subquery-name, то ім'я тут має відповідати тому, що було задано.

```shell
> subql-node -f . // --subquery-name не встановлено

> subql-query -n subql-helloworld  --playground // ім'я за замовчуванням дорівнює імені каталогу проекту
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // назва вказує на проєкт subql-helloworld, але з назвою hiworld
```

### --output-fmt

Бачачи [--output-fmt](../run_publish/references.md#output-fmt).

### --playground

Цей прапор включає ігровий майданчик graphql, тому вона завжди повинна бути включена за замовчуванням, щоб бути корисною.

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

### --subscription

Цей прапорець включає [підписки на GraphQL](./subscription.md), для включення цієї функції потрібно `subql-node` також включити `--subscription`.

### --unsafe (Query Service)

Цей прапор включає певні функції агрегування, включаючи sum, max, avg та інші. Докладніше про цю функцію [читайте тут](../run_publish/aggregate.md).

These are disabled by default for database performance reasons.

**Note that must be on a Partner plan if you would like to run projects with the `--unsafe` command (on the query service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

### --version

При цьому показуватися поточна версія.

```shell
> subql-query --version
0.7.0
```
