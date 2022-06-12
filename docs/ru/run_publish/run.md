# Запуск SubQuery локально

В этом руководстве рассказывается как локально запустить ноду SubQuery на вашем устройстве, который включает как индексатор, так и службу запросов. Не хотите беспокоиться о запуске SubQuery на собственном устройстве? SubQuery обеспечивает [выделенный сервер](https://explorer.subquery.network) для комьюнити бесплатно. [Следуйте нашему руководству по публикации](../run_publish/publish.md), чтобы узнать, как загрузить свой проект в [SubQuery Projects](https://project.subquery.network).

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

Узел SubQuery — это имплементация, которая извлекает данные блокчейна на основе Substrate/Polkadot для проекта SubQuery и сохраняет их в базе данных Postgres.

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

Обратите внимание, что мы **НЕ** рекомендуем использовать `yarn global` из-за плохого управления зависимостями, что может привести к ошибкам в дальнейшем.

После установки вы можете запустить ноду с помощью следующей команды:


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

### Ключевые команды

Следующие команды помогут вам завершить настройку узла SubQuery и начать индексирование. Чтобы узнать больше, вы всегда можете запустить `--help`.

#### Укажите путь к локальному проекту

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

#### Использование Словаря

Использование словаря полной цепочки может значительно ускорить обработку проекта SubQuery во время тестирования или во время вашего первого индексирования. В некоторых случаях мы наблюдали увеличение производительности индексирования до 10 раз.

Словарь полной цепочки предварительно индексирует местоположение всех событий и внешних элементов в определенной цепочке и позволяет службе узла пропускать соответствующие местоположения при индексировании, а не проверять каждый блок.

Вы можете добавить конечную точку словаря в файл `project.yaml` (см. [Файл манифеста](../create/manifest.md)) или указать ее во время выполнения с помощью следующей команды:

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

[Подробнее о том, как работает Словарь SubQuery](../academy/tutorials_examples/dictionary.md).

#### Подключаемся к базе данных

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

В зависимости от конфигурации вашей базы данных Postgres (например, другой пароль базы данных), убедитесь, что и индексатор (`subql/node`), и служба запросов (`subql/query`) может установить с ним соединение.

#### Укажите файл конфигурации

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

Это укажет узлу запроса файл конфигурации, который может быть в формате YAML или JSON. Посмотрите пример ниже.

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

В целях отладки пользователи могут запускать узел в локальном режиме. При переключении на локальную модель таблицы Postgres будут созданы в схеме по умолчанию `public`.

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

Затем откройте инструменты разработчика Chrome, перейдите в Source & # 062; Filesystem, добавьте свой проект в рабочую область и начните отладку. Для получения дополнительной информации, посмотрите [Как отладить проект SubQuery](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

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

Убедитесь, что имя проекта совпадает с именем проекта при [ инициализации проекта ](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project). Также проверьте правильность переменных среды.

После успешного запуска службы subql-query откройте браузер и перейдите по адресу `http: // localhost: 3000`. Вы должны увидеть игровую площадку GraphQL, отображаемую в проводнике, и схему, готовую к запросу.
