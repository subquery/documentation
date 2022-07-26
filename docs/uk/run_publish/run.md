# Запустити SubQuery локально

У цьому посібнику описано, як запустити локальний вузол SubQuery на вашій інфраструктурі, який включає в себе як індексатор, так і службу запитів. Не хочете турбуватися про створення власної інфраструктури SubQuery? SubQuery надає спільноті [Керований хостинг-сервіс](https://explorer.subquery.network) безплатно. [Дотримуйтесь нашого посібника з публікації](../run_publish/publish.md), щоб дізнатися, як завантажити свій проєкт в [SubQuery Projects](https://project.subquery.network).

## Використовувати Docker

Альтернативним рішенням є запуск <strong>Docker Container</strong>, визначеного файлом `docker-compose.yml`. Для нового проєкт, який був тільки що ініціалізований, вам не потрібно буде нічого змінювати.

У каталозі проекту виконайте таку команду:

```shell
docker-compose pull && docker-compose up
```

::: info Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Запуск індексатора (subql/node)

Вимога:

- База даних [Postgres](https://www.postgresql.org/) (версія 12 або вище). Поки [SubQuery](run.md#start-a-local-subquery-node) індексує блокчейн, витягнуті дані зберігаються в зовнішньому екземплярі бази даних.

Вузол SubQuery - це реалізація, яка витягує дані блокчейна на основі Substrate/Polkadot відповідно до проекту SubQuery і зберігає їх в базі даних Postgres.

### Установка

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line. :::

Після встановлення ви можете запустити вузол за допомогою наступної команди:


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Щоб дізнатися більше, ви завжди можете виконати команду `--help`.

#### Вкажіть шлях до локального проекту

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. У деяких випадках ми спостерігали збільшення продуктивності індексування до 10 разів.

повний словник ланцюжка попередньо індексує місце розташування всіх подій і екстрінсіков в межах конкретної ланцюжка і дозволяє вашій службі вузлів переходити до відповідних місць при індексуванні, а не перевіряти кожен блок.

ви можете додати кінцеву точку словника в файл `project.Yaml` (див. [Manifest File](../build/manifest.md)), або вказати її під час виконання за допомогою наступної команди:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

::: info Note You can read more about [how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md). :::

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

#### Вкажіть файл конфігурації

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Зміна розміру пакета вибірки блоків

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Коли індексатор вперше індексує ланцюжок, вибірка окремих блоків значно знижує продуктивність. Збільшення розміру пакета для регулювання кількості видобутих блоків зменшить загальний час обробки. Поточний розмір пакета за замовчуванням становить 100.

#### Запуск в локальному режимі

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. Перемикання на локальну модель створить таблиці Postgres у схемі за замовчуванням `public`.

Якщо локальний режим не використовується, буде створена нова схема Postgres з початковим `subquery_` і відповідними таблицями проекту.

#### Перевірте стан вашого вузла

Існує 2 кінцеві точки, які ви можете використовувати для перевірки та моніторингу стану справного вузла SubQuery.

- Health check endpoint that returns a simple 200 response.
- Metadata endpoint that includes additional analytics of your running SubQuery node.

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

Наприклад:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Then open up the Chrome dev tools, go to Source > Filesystem and add your project to the workspace and start debugging. For more information, check out [How to debug a SubQuery project](../academy/tutorials_examples/debug-projects.md).

## Running a Query Service (subql/query)

### Установка

```shell
# NPM
npm install -g @subql/query
```

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line. :::

### Running the Query service

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.
