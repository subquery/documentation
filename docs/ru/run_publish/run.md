# Запуск SubQuery локально

В этом руководстве рассказывается как локально запустить ноду SubQuery на вашем устройстве, который включает как индексатор, так и службу запросов. Не хотите беспокоиться о запуске SubQuery на собственном устройстве? SubQuery обеспечивает [выделенный сервер](https://explorer.subquery.network) для комьюнити бесплатно. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Projects](https://project.subquery.network).

## Использование Docker

Как альтернативное решение это запустить <strong>Docker Container</strong>, определенный `docker-compose.yml` файлом. Для нового проекта которой уже был установлен вам не понадобится ничего менять здесь.

В командной строке проекта выполните следующую команду:

```shell
docker-compose pull && docker-compose up
```

В начале может потребоваться некоторое время для загрузки требующихся пакетов ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), Postgres) далее вы увидите запущенную SubQuery ноду.

## Запуск индексатора (subql/node)

Требования:

- [Postgres](https://www.postgresql.org/) база данных ( версия 12 или выше). Пока [SubQuery node](#start-a-local-subquery-node) индексируется в блокчейн, извлеченные данные хранятся во внешнем экземпляре базы данных.

Нода SubQuery - это реализация, которая извлекает данные блокчейна на основе субстрата для проекта SubQuery и сохраняет их в базе данных Postgres.

### Установка

<CodeGroup>
<CodeGroupItem title='Substrate'>

``` shell
# NPM
npm install -g @subql/node
```
</CodeGroupItem>

<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

После установки вы можете запустить ноду с помощью следующей команды:


<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command>
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Чтобы узнать больше, вы всегда можете запустить `--help`.

#### Укажите путь к локальному проекту

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -c your-project-config.yml
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

#### Изменить размер пакета выборки блока

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Когда индексатор впервые индексирует цепочку, выборка отдельных блоков значительно снизит производительность. Увеличение размера пакета для корректировки количества извлекаемых блоков уменьшит общее время обработки. Текущий размер пакета по умолчанию - 100.

#### Запуск в локальном режиме

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. При переключении на локальную модель таблицы Postgres будут созданы в схеме по умолчанию `public`.

Если локальный режим не используется, будет создана новая схема Postgres с начальным `subquery_` и соответствующими таблицами проекта.

#### Проверьте состояние вашего узла

Есть 2 конечные точки, которые можно использовать для проверки и мониторинга работоспособности работающей ноды SubQuery.

- Конечная точка проверки работоспособности, которая возвращает простой ответ 200
- Конечная точка метаданных, которая включает дополнительную аналитику вашей работающей ноды SubQuery

Добавьте это к базовому URL-адресу вашей ноды SubQuery. Например, `http: // localhost: 3000 / meta` вернет:

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

Если индексатор неисправен, будет возвращена ошибка 500. Это часто можно увидеть, когда узел загружается.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Если используется неправильный URL-адрес, будет возвращена ошибка 404: не найден.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Отладить свой проект

Используйте [ инспектор нод ](https://nodejs.org/en/docs/guides/debugging-getting-started/) для выполнения следующей команды.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Например:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Для помощи смотрите: https://nodejs.org/en/docs/inspector 
Прилагается отладчик.
```

Затем откройте инструменты разработчика Chrome, перейдите в Source & # 062; Filesystem, добавьте свой проект в рабочую область и начните отладку. For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Запуск службы запросов (subql / query)

### Установка

```shell
# NPM
npm install -g @subql/query
```

Обратите внимание, что мы ** НЕ ** поддерживаем использование `yarn global` из-за его плохого управления зависимостями, что может привести к ошибкам в дальнейшем.

### Запуск службы запросов

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Убедитесь, что имя проекта совпадает с именем проекта при [ инициализации проекта ](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Также проверьте правильность переменных среды.

После успешного запуска службы subql-query откройте браузер и перейдите по адресу `http: // localhost: 3000`. Вы должны увидеть игровую площадку GraphQL, отображаемую в проводнике, и схему, готовую к запросу.
