# Запуск SubQuery локально

В этом руководстве описано, как запустить локальный узел SubQuery на вашей инфраструктуре, который включает в себя как индексатор, так и службу запросов. Не хотите беспокоиться о создании собственной инфраструктуры SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Следуйте нашему руководству по публикации](../run_publish/publish.md), чтобы узнать, как загрузить свой проект в [SubQuery Projects](https://project.subquery.network).

## Использование Docker

Альтернативным решением является запуск <strong>Docker Container</strong>, определенного файлом `docker-compose.yml`. Для нового проекта, который был только что инициализирован, вам не нужно будет ничего менять.

В каталоге проекта выполните следующую команду:

```shell
docker-compose pull && docker-compose up
```

::: info Примечание Для первой загрузки необходимых пакетов ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) и Postgres) может потребоваться некоторое время, но вскоре вы увидите работающий узел SubQuery. :::

## Запуск индексатора (subql/node)

Требования:

- База данных [Postgres](https://www.postgresql.org/) (версия 12 или выше). Пока узел [SubQuery](run.md#start-a-local-subquery-node) индексирует блокчейн, извлеченные данные хранятся во внешнем экземпляре базы данных.

Узел SubQuery - это реализация, которая извлекает данные блокчейна на основе Substrate/Polkadot в соответствии с проектом SubQuery и сохраняет их в базе данных Postgres.

### Установка

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
# NPM
npm install -g @subql/node-avalanche
```

</CodeGroupItem>
</CodeGroup>

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line. :::

После установки вы можете запустить узел с помощью следующей команды:

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

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Чтобы узнать больше, вы всегда можете выполнить команду `--help`.

#### Укажите путь к локальному проекту

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``Оболочка
subql-node -f your-project-path

````

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```шелл
subql-node-terra -f your-project-path
````

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``оболочка
subql-node-avalanche -f your-project-path

```

</CodeGroupItem>
</CodeGroup>

#### Использование словаря

Использование словаря полной цепочки может значительно ускорить обработку проекта SubQuery во время тестирования или при первом индексировании. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

Вы можете добавить конечную точку словаря в файл `project.yaml` (см. [Файл манифеста](../build/manifest/polkadot.md)) или указать ее во время выполнения с помощью следующей команды:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

``Оболочка
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```оболочка
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``оболочка
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary

````

</CodeGroupItem>
</CodeGroup>

::: info Примечание Вы можете прочитать больше о [как работает словарь SubQuery ](../academy/tutorials_examples/dictionary.md). :::

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
````

В зависимости от конфигурации вашей базы данных Postgres (например, другой пароль базы данных), убедитесь также, что индексатор (`subql/node`) и служба запросов (`subql/query`) могут установить соединение с ней.

#### Укажите файл конфигурации

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``Оболочка
subql-node -c your-project-config.yml

````

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```оболочка
subql-node-terra -c your-project-config.yml
````

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```оболочка
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

Это укажет узлу запроса на файл конфигурации, который может быть в формате YAML или JSON. Посмотрите пример ниже.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Изменение размера пакета выборки блоков

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Когда индексатор впервые индексирует цепочку, выборка отдельных блоков значительно снижает производительность. Увеличение размера пакета для регулировки количества извлекаемых блоков уменьшит общее время обработки. Текущий размер пакета по умолчанию - 100.

#### Запуск в локальном режиме

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

В целях отладки пользователи могут запустить узел в локальном режиме. При переключении на локальную модель будут созданы таблицы Postgres в схеме по умолчанию `public`.

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
