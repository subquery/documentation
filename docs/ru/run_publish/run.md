# Запуск SubQuery локально

В этом руководстве описано, как запустить локальный узел SubQuery на вашей инфраструктуре, который включает в себя как индексатор, так и службу запросов. Не хотите беспокоиться о создании собственной инфраструктуры SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

::: tip Location is everything

Run the services geographically close to one another and where you think most requests will come from. Running the node or query service far away from the DB will massively decrease performance.

:::

## Использование Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. Для нового проекта, который был только что инициализирован, вам не нужно будет ничего менять.

В каталоге проекта выполните следующую команду:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Запуск индексатора (subql/node)

Требования:

- [Postgres](https://www.postgresql.org/) database (version 16 or higher). Пока узел [SubQuery](run.md#start-a-local-subquery-node) индексирует блокчейн, извлеченные данные хранятся во внешнем экземпляре базы данных.

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

@tab EVM

```shell
# NPM
npm install -g @subql/node-ethereum
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

@tab Near

```shell
# NPM
npm install -g @subql/node-near
```

@tab stellar

```shell
# NPM
npm install -g @subql/node-stellar
```

@tab Concordium

```shell
# NPM
npm install -g @subql/node-concordium
```

:::

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

После установки вы можете запустить узел с помощью следующей команды:

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab EVM

```shell
subql-node-ethereum <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

@tab Near

```shell
subql-node-near <command>
```

@tab Stellar

```shell
subql-node-stellar <command>
```

@tab Concordium

```shell
subql-node-concordium <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Чтобы узнать больше, вы всегда можете выполнить команду `--help`.

#### Укажите путь к локальному проекту

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab EVM

```shell
subql-node-ethereum -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

@tab Near

```shell
subql-node-near -f your-project-path
```

@tab Stellar

```shell
subql-node-stellar -f your-project-path
```

@tab Concordium

```shell
subql-node-concordium -f your-project-path
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

If your database is using SSL, you can use the following command to add the server certificate to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.key
```

#### Specify a configuration file

::: code-tabs

@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
```

@tab EVM (Ethereum, Polygon, BNB Smart Chain, Avalanche, Flare)

```shell
subql-node-ethereum -c your-project-config.yml
```

@tab Cosmos

```shell
subql-node-cosmos -c your-project-config.yml
```

@tab Algorand

```shell
subql-node-algorand -c your-project-config.yml
```

@tab Near

```shell
subql-node-near -c your-project-config.yml
```

:::

This will point the query node to a manifest file which can be in TS, YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
<BlockDispatcherService> INFO Enqueueing blocks 203...402, total 200 blocks
<BlockDispatcherService> INFO Enqueueing blocks 403...602, total 200 blocks
```

Когда индексатор впервые индексирует цепочку, выборка отдельных блоков значительно снижает производительность. Увеличение размера пакета для регулировки количества извлекаемых блоков уменьшит общее время обработки. Текущий размер пакета по умолчанию - 100.

::: tip Note SubQuery uses Node.js, by default this will use 4GB of memory. If you are running into memory issues or wish to get the most performance out of indexing you can increase the memory that will be used by setting the following environment variable `export NODE_OPTIONS=--max_old_space_size=<memory-in-MB>`. It's best to make sure this only applies to the node and not the query service. :::

#### Monitoring Indexer Health

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

You should also be [regularly monitoring your query service health](#monitoring-query-service-health).

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

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

### Запуск службы Запросов

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Убедитесь, что имя проекта совпадает с именем проекта при [инициализации проекта](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Также проверьте правильность переменных среды.

После успешного запуска службы subql-query откройте браузер и перейдите по следующему пути: `http://localhost:3000`. Вы должны увидеть площадку GraphQL, отображаемую в проводнике, и схему, готовую для запросов.

::: warning

The query service will fail to start if the node has not yet created the DB schema for your project. If you are automating the startup of your project, please ensure that the node service always starts and is running healthy first - you can see an example of how we do this in the default `docker-compose.yaml`

:::

### Monitoring Query Service Health

Unlike the indexer node, there is no specific health check route. Instead you can make a simple GraphQL query such as getting the metadata:

```shell
curl 'http://localhost:3000' -X POST --data-raw '{"query":"{\n  _metadata {\n    chain\n    lastProcessedHeight\n    lastProcessedTimestamp\n  }\n}"}'
```

## Recommendations for Self Hosting in a Production Environment

If you wish to self host SubQuery in a production manner there are many other things to consider. These can vary greatly depending on how you choose to run SubQuery so we while we might find it hard to support your team, we hope to point you in the right direction.

It is recommended that you are familiar with running web services in production, if this sounds like too much work we provide the [SubQuery Managed Service](https://managedservice.subquery.network) to provide all of this functionality for you.

**You will want to review [Running High Performance SubQuery Infrastructure](./optimisation.md).**
