# Запустити SubQuery локально

У цьому посібнику описано, як запустити локальний вузол SubQuery на вашій інфраструктурі, який включає в себе як індексатор, так і службу запитів. Не хочете турбуватися про створення власної інфраструктури SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

::: tip Location is everything

Run the services geographically close to one another and where you think most requests will come from. Running the node or query service far away from the DB will massively decrease performance.

:::

## Використовувати Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. Для нового проєкт, який був тільки що ініціалізований, вам не потрібно буде нічого змінювати.

У каталозі проекту виконайте таку команду:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Запуск індексатора (subql/node)

Вимога:

- [Postgres](https://www.postgresql.org/) database (version 16 or higher). Поки [SubQuery](run.md#start-a-local-subquery-node) індексує блокчейн, витягнуті дані зберігаються в зовнішньому екземплярі бази даних.

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

Після встановлення ви можете запустити вузол за допомогою наступної команди:

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

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Щоб дізнатися більше, ви завжди можете виконати команду `--help`.

#### Вкажіть шлях до локального проекту

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

Залежно від конфігурації вашої бази даних Postgres (наприклад, інший пароль бази даних), переконайтеся також, що індексатор (`subql/node`) і служба запитів (`subql/query`) можуть встановити з'єднання з нею.

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

Коли індексатор вперше індексує ланцюжок, вибірка окремих блоків значно знижує продуктивність. Збільшення розміру пакета для регулювання кількості видобутих блоків зменшить загальний час обробки. Поточний розмір пакета за замовчуванням становить 100.

::: tip Note SubQuery uses Node.js, by default this will use 4GB of memory. If you are running into memory issues or wish to get the most performance out of indexing you can increase the memory that will be used by setting the following environment variable `export NODE_OPTIONS=--max_old_space_size=<memory-in-MB>`. It's best to make sure this only applies to the node and not the query service. :::

#### Monitoring Indexer Health

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

You should also be [regularly monitoring your query service health](#monitoring-query-service-health).

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

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

### Запуск служби запитів

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Під час ініціалізації проекту переконайтеся, що ім’я проекту збігається з ім’ям проекту. Також перевірте правильність змінних середовища.

Після успішного запуску служби subql-query відкрийте браузер і перейдіть до http://localhost:3000. Ви повинні побачити ігровий майданчик GraphQL у Провіднику та схему, готову для запиту.

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
