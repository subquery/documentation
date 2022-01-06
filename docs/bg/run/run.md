# Стартиране на SubQuery локално

Това ръководство показва как да стартирате локален SubQuery нод във вашата инфраструктура, който включва индексатора и услугата за заявки. Не желаете да се занимавате със стартирането на собствена SubQuery инфраструктура? SubQuery предоставя [управлявана хоствана услуга](https://explorer.subquery.network) безплатно за общността. [Следвайте нашето ръководство](../publish/publish.md) за да разберете как да качите вашия проект в [SubQuery Projects](https://project.subquery.network).

## Използване на Docker

Алтернативно решение е да стартирате <strong>Docker Container</strong>, дефиниран от файла `docker-compose.yml`. За нов проект, който току-що е инициализиран, няма да е необходимо да променяте нищо тук.

Под директорията на проекта изпълнете следната команда:

```shell
docker-compose pull && docker-compose up
```

Може да отнеме известно време, за да изтеглите необходимите пакети ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), и Postgres) за първи път, но скоро ще видите работещ SubQuery нод.

## Изпълнение на индексатор (subql/node)

Изисквания:

- База данни [Postgres](https://www.postgresql.org/) (версия 12 или по-нова). Докато [SubQuery нодът ](#start-a-local-subquery-node) индексира блокчейна, извлечените данни се съхраняват във външна база данни.

SubQuery нодът е реализация, която извлича базирани на Substrate блокчейн данни за проекта SubQuery и ги записва в базата данни на Postgres.

### Инсталация

```shell
# NPM
npm install -g @subql/node
```

Моля, имайте предвид, че ние **НЕ** насърчаваме използването на `yarn global` поради лошото управление на зависимостта, което може да доведе до грешки в бъдеще.

Веднъж инсталиран, можете да стартирате нода със следната команда:

```shell
subql-node <command>
```

### Ключови команди

Следващите команди ще ви помогнат да завършите конфигурацията на SubQuery нода и да започнете индексирането. За да научите повече, винаги можете да стартирате `--help`.

#### Посочете пътя към локалния проект

```
subql-node -f your-project-path
```

#### Използвайте речник

Използването на речник за цяла верига може драстично да ускори обработката на SubQuery проект по време на тестване или по време на първия ви индекс. В някои случаи сме виждали увеличение на ефективността на индексирането до 10 пъти.

Цял верижен речник предварително индексира местоположението на всички събития и ненужни данни в рамките на конкретната верига и позволява на вашата нод услуга да прескача до съществените местоположения при индексиране, вместо да инспектира всеки блок.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[Read more about how a SubQuery Dictionary works](../tutorials_examples/dictionary.md).

#### Connect to database

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path 
````

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

```
subql-node -c your-project-config.yml
```

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Change the block fetching batch size

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

When the indexer first indexes the chain, fetching single blocks will significantly decrease the performance. Increasing the batch size to adjust the number of blocks fetched will decrease the overall processing time. The current default batch size is 100.

#### Run in local mode

```
subql-node -f your-project-path --local
```

For debugging purposes, users can run the node in local mode. Switching to local model will create Postgres tables in the default schema `public`.

If local mode is not used, a new Postgres schema with the initial `subquery_` and corresponding project tables will be created.


#### Check your node health

There are 2 endpoints that you can use to check and monitor the health of a running SubQuery node.

- Health check endpoint that returns a simple 200 response
- Metadata endpoint that includes additional analytics of your running SubQuery node

Append this to the base URL of your SubQuery node. Eg `http://localhost:3000/meta` will return:

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

`http://localhost:3000/health` will return HTTP 200 if successful.

A 500 error will be returned if the indexer is not healthy. This can often be seen when the node is booting up.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

If an incorrect URL is used, a 404 not found error will be returned.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debug your project

Use the [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) to run the following command.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

For example:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```
Then open up the Chrome dev tools, go to Source > Filesystem and add your project to the workspace and start debugging. For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/tutorials_examples/debug-projects/)
## Running a Query Service (subql/query)

### Инсталация

```shell
# NPM
npm install -g @subql/query
```

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

### Running the Query service
``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.
