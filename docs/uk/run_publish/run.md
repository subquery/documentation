# Запустити SubQuery локально

У цьому посібнику описано, як запустити локальний вузол SubQuery на вашій інфраструктурі, який включає в себе як індексатор, так і службу запитів. Не хочете турбуватися про створення власної інфраструктури SubQuery? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Дотримуйтесь нашого посібника з публікації](../run_publish/publish.md), щоб дізнатися, як завантажити свій проєкт в [SubQuery Projects](https://project.subquery.network).

## Використовувати Docker

Альтернативним рішенням є запуск <strong>Docker Container</strong>, визначеного файлом `docker-compose.yml`. Для нового проєкт, який був тільки що ініціалізований, вам не потрібно буде нічого змінювати.

У каталозі проекту виконайте таку команду:

```shell
docker-compose pull && docker-compose up
```

: інформація Примітка Завантаження необхідних пакетів ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) та Postgres) вперше, але незабаром ви побачите запущений вузол SubQuery. :::

## Запуск індексатора (subql/node)

Вимога:

- База даних [Postgres](https://www.postgresql.org/) (версія 12 або вище). Поки [SubQuery](run.md#start-a-local-subquery-node) індексує блокчейн, витягнуті дані зберігаються в зовнішньому екземплярі бази даних.

Вузол SubQuery - це реалізація, яка витягує дані блокчейна на основі Substrate/Polkadot відповідно до проекту SubQuery і зберігає їх в базі даних Postgres.

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

#### Використовуйте словник

Використання повного ланцюжкового словника може значно пришвидшити обробку проекту SubQuery під час тестування або під час першого індексування. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

Ви можете додати кінцеву точку словника у свій файл `project.yaml` (див. [Файл маніфесту](../build/manifest/polkadot.md)) або вказати її під час виконання за допомогою такої команди:

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

:::інформація Примітка Ви можете прочитати більше про [як працює словник підзапитів](../academy/tutorials_examples/dictionary.md). :::

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

Це вкаже вузол запиту на файл конфігурації, який може бути у форматі YAML або JSON. Перегляньте приклад нижче.

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

З метою налагодження користувачі можуть запускати вузол у локальному режимі. Перемикання на локальну модель створить таблиці Postgres у схемі за замовчуванням `public`.

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

Наприклад:

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
