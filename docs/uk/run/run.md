# Запуск SubQuery Місцево

Цей посібник працює над тим, як запустити локальний вузол SubQuery на вашій інфраструктурі, який включає як індексатор, так і службу запитів. Не хочете турбуватися про роботу власної інфраструктури SubQuery? SubQuery надає спільноті [ керований ходовий сервіс ](https://explorer.subquery.network) безкоштовно. [ Дотримуйтесь нашого видавничого посібника ](../publish/publish.md), щоб побачити, як ви можете завантажити свій проект на [ SubQuery Projects ](https://project.subquery.network).

## Використання Docker

Альтернативним рішенням є запуск <strong> Docker Container </strong>, визначеного файлом ` docker-compose.yml `. Для нового проекту, який був тільки ініціалізований, вам тут нічого не потрібно буде змінювати.

У каталозі проекту запустіть таку команду:

```shell
docker-compose pull && docker-compose up
```

Можливо, знадобиться певний час, щоб завантажити необхідні пакети ([` @ subql / node `](https://www.npmjs.com/package/@subql/node), [` @ subql / query `](https://www.npmjs.com/package/@subql/query) та Postgres) вперше, але незабаром ви побачите запущений вузол SubQuery.

## Запуск індексатора (subql / node)

Вимоги:

- [Postgres](https://www.postgresql.org/) база даних (версія 12 або вище). Хоча вузол [ SubQuery ](#start-a-local-subquery-node) індексує блокчейн, витягнуті дані зберігаються у зовнішньому екземплярі бази даних.

SubQuery  node - це реалізація, яка витягує дані блокчейна на основі субстрату за проектом SubQuery і зберігає їх у базі даних Postgres.

### Установка

```shell
# NPM
npm install -g @subql/node
```

Зверніть увагу, що ми ** НЕ ** заохочуємо використовувати ` ріг глобального </ 1> через погане управління залежністю, що може призвести до помилок у лінії.</p>

<p spaces-before="0">Після встановлення ви можете запустити вузол за допомогою наступної команди:</p>

<pre><code class="shell">subql-node <command>
`</pre>

### Основні команди

Наступні команди допоможуть вам виконати конфігурацію вузла SubQuery та розпочати індексацію. Щоб дізнатися більше, завжди можна запустити ` - help `.

#### Вкажіть на місцевий шлях проекту

```
subql-node -f your-project-path
```

#### Використовуйте словник

Використання повного словника ланцюга може різко прискорити обробку проекту SubQuery під час тестування або під час першого індексу. У деяких випадках ми спостерігаємо підвищення продуктивності до 10 разів.

Повний словник ланцюга попередньо індексує розташування всіх подій та екстринік у межах конкретного ланцюга та дозволяє службі вузлів переходити до відповідних місць при індексації, а не перевіряти кожен блок.

Ви можете додати кінцеву точку словника у файл ` project.yaml ` (див. [ Файл маніфесту ](../create/manifest.md)) або вказати його під час виконання за допомогою наступної команди:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[ Детальніше про те, як працює SubQuery Dictionary ](../tutorials_examples/dictionary.md).

#### Підключіться до бази даних

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path 
````

Залежно від конфігурації вашої бази даних Postgres (наприклад,. інший пароль бази даних), будь ласка, переконайтеся також, що і індексатор (`subql / node`), і служба запитів (`subql / query`) можуть встановити з'єднання з ним.

#### Specify a configuration file

```
subql-node -c your-project-config.yml
```

Це вкаже вузол запиту на файл конфігурації, який може бути у форматі YAML або JSON. Подивіться на приклади нижче.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Змініть розмір партії, що отримує блок

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Коли індексатор вперше індексує ланцюг, отримання одиночних блоків значно знизить продуктивність. Збільшення розміру партії для регулювання кількості отриманих блоків зменшить загальний час обробки. Поточний розмір пакета по замовчуванню дорівнює 100.

#### Запуск у локальному режимі

```
subql-node -f your-project-path --local
```

Для налагодження користувачі можуть запускати вузол у локальному режимі. Перехід на локальну модель створить таблиці Postgres у схемі за замовчуванням ` public `.

Якщо локальний режим не використовується, буде створена нова схема Postgres з початковою ` subquery_ ` та відповідними таблицями проектів.


#### Перевірте стан свого вузла

Є 2 кінцеві точки, які ви можете використовувати для перевірки та моніторингу стану здоров'я запущеного вузла SubQuery.

- Кінцева точка перевірки здоров’я, яка повертає просту відповідь 200
- Кінцева точка метаданих, яка включає додаткову аналітику вашого запущеного вузла SubQuery

Додайте це до базової URL-адреси SubQuery node. Наприклад, ` http: //localhost: 3000 / meta ` повернеться:

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

` http: //localhost: 3000 / health ` поверне HTTP 200 у разі успіху.

Помилка 500 буде повернута, якщо індексатор не здоровий. Це часто можна побачити, коли вузол завантажується.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Якщо використовується неправильна URL-адреса, 404 не знайдена помилка буде повернуто.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Налагоджуйте проект

Використовуйте [ node inspector ](https://nodejs.org/en/docs/guides/debugging-getting-started/) для виконання наступної команди.

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
Потім відкрийте інструменти для розробки Chrome, перейдіть до Source & # 062; Файлова система та додайте свій проект до робочої області та починайте налагоджувати. Для отримання додаткової інформації перевірте [ Як налагодити проект SubQuery ](https://doc.subquery.network/tutorials_examples/debug-projects/)
## Запуск служби запитів (підql / запит)

### Установка

```shell
# NPM
npm install -g @subql/query
```

Зверніть увагу, що ми ** НЕ ** заохочуємо використовувати ` ріг глобального </ 1> через погане управління залежністю, що може призвести до помилок у лінії.</p>

<h3 spaces-before="0">Запуск служби запитів</h3>

<p spaces-before="0">```
export DB_HOST=localhost
subql-query --name <project_name> --playground
````</p>

<p spaces-before="0">Переконайтесь, що назва проекту збігається з назвою проекту, коли ви <a href="../quickstart/quickstart.md#initialise-the-starter-subquery-project"> ініціалізуєте проект </a>. Також перевірте, чи є змінні середовища правильними.</p>

<p spaces-before="0">Після успішного запуску послуги subql-query відкрийте веб-переглядач і перейдіть до <code> http: //localhost: 3000 `. Ви повинні побачити ігровий майданчик GraphQL, який відображається в Провіднику, і схему, яка готова до запиту.
