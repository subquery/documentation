# Запуск SubQuery локально

В этом руководстве описано, как запустить локальный узел SubQuery на вашей инфраструктуре, который включает в себя как индексатор, так и службу запросов. Не хотите беспокоиться о создании собственной инфраструктуры SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## Использование Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. Для нового проекта, который был только что инициализирован, вам не нужно будет ничего менять.

В каталоге проекта выполните следующую команду:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Запуск индексатора (subql/node)

Требования:

- База данных [Postgres](https://www.postgresql.org/) (версия 12 или выше). Пока узел [SubQuery](run.md#start-a-local-subquery-node) индексирует блокчейн, извлеченные данные хранятся во внешнем экземпляре базы данных.

Узел SubQuery - это реализация, которая извлекает данные блокчейна на основе Substrate/Polkadot в соответствии с проектом SubQuery и сохраняет их в базе данных Postgres.

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

::: риски Обратите внимание, что мы ** НЕ** поощряем использование `yarn global` из-за его плохого управления зависимостями, что может в дальнейшем привести к ошибкам. :::

После установки вы можете запустить узел с помощью следующей команды:

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

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Чтобы узнать больше, вы всегда можете выполнить команду `--help`.

#### Укажите путь к локальному проекту

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

В зависимости от конфигурации вашей базы данных Postgres (например, другой пароль базы данных), убедитесь также, что индексатор (`subql/node`) и служба запросов (`subql/query`) могут установить соединение с ней.

##### SSL Database

If your database is using SSL, you can use the following command to connect to it:

```shell 
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.pem
```

```shell

#### Specify a configuration file

::: code-tabs
@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
```

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

Когда индексатор впервые индексирует цепочку, выборка отдельных блоков значительно снижает производительность. Увеличение размера пакета для регулировки количества извлекаемых блоков уменьшит общее время обработки. Текущий размер пакета по умолчанию - 100.

#### Запуск в локальном режиме

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

For debugging purposes, users can run the node in local mode. При переключении на локальную модель будут созданы таблицы Postgres в схеме по умолчанию `public`.

Если локальный режим не используется, будет создана новая схема Postgres с исходным `subquery_` и соответствующими таблицами проекта.

#### Проверка состояния вашего узла

Существует 2 конечные точки, которые вы можете использовать для проверки и мониторинга состояния работоспособности узла SubQuery.

- Конечная точка проверки работоспособности, которая возвращает простой ответ 200.
- Конечная точка метаданных, которая включает дополнительную аналитику вашего работающего узла SubQuery.

Добавьте это к базовому URL-адресу вашего узла SubQuery. Например, `http: // localhost: 3000 / meta` вернет:

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

`http: // localhost: 3000 / health` вернет HTTP 200 в случае успеха.

Если индексатор неисправен, будет возвращена ошибка 500. Это часто можно увидеть при загрузке узла.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Если используется неправильный URL, будет возвращена ошибка 404 not found.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Отладка вашего проекта

Используйте [инспектор узлов](https://nodejs.org/en/docs/guides/debugging-getting-started/) для выполнения следующей команды.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Например:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Затем откройте инструменты разработчика Chrome , перейдите в Source > Filesystem, добавьте свой проект в рабочую область и начните отладку. Для получения дополнительной информации посмотрите [Как отладить проект SubQuery](../academy/tutorials_examples/debug-projects.md).

## Запуск службы запросов (subql / query)

### Установка

```shell
# NPM
npm install -g @subql/query
```

::: риски Обратите внимание, что мы ** НЕ** поощряем использование `yarn global` из-за его плохого управления зависимостями, что может в дальнейшем привести к ошибкам. :::

### Запуск службы Запросов

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Убедитесь, что имя проекта совпадает с именем проекта при [инициализации проекта](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Также проверьте правильность переменных среды.

После успешного запуска службы subql-query откройте браузер и перейдите по следующему пути: `http://localhost:3000`. Вы должны увидеть площадку GraphQL, отображаемую в проводнике, и схему, готовую для запросов.

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
