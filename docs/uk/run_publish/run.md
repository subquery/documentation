# Запустити SubQuery локально

У цьому посібнику описано, як запустити локальний вузол SubQuery на вашій інфраструктурі, який включає в себе як індексатор, так і службу запитів. Не хочете турбуватися про створення власної інфраструктури SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## Використовувати Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. Для нового проєкт, який був тільки що ініціалізований, вам не потрібно буде нічого змінювати.

У каталозі проекту виконайте таку команду:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Запуск індексатора (subql/node)

Вимога:

- База даних [Postgres](https://www.postgresql.org/) (версія 12 або вище).  Поки [SubQuery](run.md#start-a-local-subquery-node) індексує блокчейн, витягнуті дані зберігаються в зовнішньому екземплярі бази даних.

Вузол SubQuery - це реалізація, яка витягує дані блокчейна на основі Substrate/Polkadot відповідно до проекту SubQuery і зберігає їх в базі даних Postgres.

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

### Установка

::: code-tabs @tab Substrate/Polkadot

```shell
# NPM
npm install -g @subql/node
```

@tab Terra

```shell
# NPM
npm install -g @subql/node-terra
```

@tab Avalanche

```shell
# NPM
npm install -g @subql/node-avalanche
```

@tab Cosmos

```shell
# NPM
npm install -g @subql/node-cosmos
```

@tab Algorand

```shell
# NPM
npm install -g @subql/node-algorand
```

:::

danger Зауважте, що ми НЕ заохочуємо використання yarn global через погане керування залежностями, яке може призвести до помилок у подальшому. :::

Після встановлення ви можете запустити вузол за допомогою наступної команди:

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab Terra

```shell
subql-node-terra <command>
```

@tab Avalanche

```shell
subql-node-avalanche <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Щоб дізнатися більше, ви завжди можете виконати команду `--help`.

#### Вкажіть шлях до локального проекту

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab Terra

```shell
subql-node-terra -f your-project-path
```

@tab Avalanche

```shell
subql-node-avalanche -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

:::

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Залежно від конфігурації вашої бази даних Postgres (наприклад, інший пароль бази даних), переконайтеся також, що індексатор (`subql/node`) і служба запитів (`subql/query`) можуть встановити з'єднання з нею.

If your database is using SSL, you can use the following command to add the server certificate to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.key
```

````shell

#### Specify a configuration file

::: code-tabs
@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
````

@tab Terra

```shell
subql-node-terra -c your-project-config.yml
```

@tab Avalanche

```shell
subql-node-avalanche -c your-project-config.yml
```

@tab Cosmos

```shell
subql-node-cosmos -c your-project-config.yml
```

@tab Algorand

```shell
subql-node-algorand -c your-project-config.yml
```

:::

This will point the query node to a manifest file which can be in YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Коли індексатор вперше індексує ланцюжок, вибірка окремих блоків значно знижує продуктивність. Збільшення розміру пакета для регулювання кількості видобутих блоків зменшить загальний час обробки. Поточний розмір пакета за замовчуванням становить 100.

#### Запуск в локальному режимі

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path --local
```

@tab Terra

```shell
subql-node-terra -f your-project-path --local
```

@tab Avalanche

```shell
subql-node-avalanche -f your-project-path --local
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path --local
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path --local
```

:::

For debugging purposes, users can run the node in local mode. Перемикання на локальну модель створить таблиці Postgres у схемі за замовчуванням `public`.

Якщо локальний режим не використовується, буде створена нова схема Postgres з початковим `subquery_` і відповідними таблицями проекту.

#### Перевірте стан вашого вузла

Існує 2 кінцеві точки, які ви можете використовувати для перевірки та моніторингу стану справного вузла SubQuery.

- Кінцева точка перевірки справності, яка повертає просту відповідь 200.
- Кінцева точка метаданих, яка включає додаткову аналітику вашого запущеного вузла SubQuery.

Додайте це до базової URL-адреси вашого вузла SubQuery. Наприклад, `http://localhost:3000/meta` поверне:

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

`http://localhost:3000/health` у разі успіху поверне HTTP 200.

Помилка 500 буде повернена, якщо індексатор несправний. Це часто можна побачити, коли вузол завантажується.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Якщо використовується неправильна URL-адреса, буде повернено помилку 404 не знайдено.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Налагодьте свій проект

Використовуйте інспектор вузлів, щоб виконати наведену нижче команду.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

For example:

```shell
вузол --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Прослуховування налагоджувача ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Для отримання допомоги див.: https://nodejs.org/en/docs/inspector
Налагоджувач додається.
```

Потім відкрийте інструменти розробника Chrome, перейдіть до «Джерело» > «Файлова система», додайте свій проект у робочу область і почніть налагодження. Щоб отримати додаткові відомості, перегляньте статтю Як налагодити проект SubQuery.

## Запуск служби запитів (subql/query)

### Установка

```shell
# NPM
npm install -g @subql/query
```

danger Зауважте, що ми НЕ заохочуємо використання yarn global через погане керування залежностями, яке може призвести до помилок у подальшому. :::

### Запуск служби запитів

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Під час ініціалізації проекту переконайтеся, що ім’я проекту збігається з ім’ям проекту. Також перевірте правильність змінних середовища.

Після успішного запуску служби subql-query відкрийте браузер і перейдіть до http://localhost:3000. Ви повинні побачити ігровий майданчик GraphQL у Провіднику та схему, готову для запиту.

## Running High Performance SubQuery Infrastructure

SubQuery is designed to provide reliable and performant indexing to production applications, we use the services that we build to run SubQuery in our own managed service which serves millions of requests each day to hundreds of customers. As such, we've added some commands that you will find useful to get the most performance out of your project and mitigate against any DDOS attacks.

### DDOS Mitigation

SubQuery runs well behind a API gateway or a DDOS mitigation service. For any public project that is run in a production configuration, setting up a gateway, web application firewall, or some other protected endpoint is recommended.

### Request Caching

Although @subql/node does not natively provide any default reqeust level caching, one of the easiest way to increase performance when the number of users hitting your SubQuery project increases is by adding a cache in front of the GraphQL endpoint with a basic TTL of a few seconds (depending on how stale you want to allow your data). Most cloud providers offer simple to setup and manage caching solutions (e.g. Redis) that will work well with the GraphQL api endpoints that we provide. If you're worried about stale data affecting your user's experience, by leveraging [GraphQl subscriptions](./subscription.md) you can ensure that the most recent data is never affected by the cache while older, slower data is mostly from the cache. Additionally, consider different TTLs for each different entity.

### Database Configuration

In our own managed service, we've been able to run a number of SubQuery projects in the same Postgres database - you do not need to run each project in a different database for suficient performance. When the I/O on the database becomes a problem, the simpliest solution is to first consider if any more [indexes can be added to your project](../build/optimisation.md#indexing-performance-advice).

The next step our team will usually carry out is split the database into a read-write replica architecture. One database instance is the writer (that the @subql/node service connects to), while the other is the reader (that the @subql/query service connects to). We will do this before splitting up projects into different databases as it generally makes a huge improvement to database I/O.

### Run Multiple Query Services

SubQuery is designed that you can run mulitple query services behind a load balancer for redundancy and performance. Just note that unless you have multiple read replicas of the database, you're performance will quickly become db constrained.

### Restrict Query Complexity

GraphQL is extremely powerful, but one of the downsides is that it allows users to make somewhat unrestricted calls that result in complex SQL that can really affect performance for other users. We provide two controls for this:

- `--query-complexity` is a flag that controls the level of query complexity that this service will accept expressed as a positive integer, [read more here](./references.md#query-complexity).
- `--query-timeout` is a flag that will restrict the time each query will be allowed to run for, [read more here](./references.md#query-timeout).
- `--max-connection` is a flag that will restrict the number of simulteneous connections to the query endpoint, [read more here](./references.md#max-connection).
- `--query-limit` is a flag that allows you to limit the number of results returned by any query and enforce pagination, [read more here](./references.md#query-limit).
- `--unsafe` is a flag that enables some advanced features like [GraphQL aggregations](./aggregate.md), these may have performance impacts, [read more here](./references.md#unsafe-query-service)
