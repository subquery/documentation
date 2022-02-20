# Прапори командної лінії

## subql (cli)

### --допомогти

```shell
> subql --довідка

КОМАНДІ
   build Створіть цей код проекту SubQuery
   codegen Створення схем для вузла графа
   help відобразити довідку для subql
   init Ініціалізація проекту підзапиту каркаса
   migrate маніфест проекту Migrate Subquery v0.0.1 до v0.2.0
   publish Завантажте цей проект SubQuery до IPFS
   validate Перевірте те, що папка або репозиторія github є проектом subquery перевірки
```

### build

Ця команда використовує webpack для створення пакета проекту subquery.

| Параметри          | Описання                                                     |
| ------------------ | ------------------------------------------------------------ |
| -l, --location     | локальна папка проекту subquery (якщо ще не в папці)         |
| -o, --output       | Вкажіть вихідну папку збірки, напр. build-folder             |
| --mode=(production | prod | development | dev) | [ за замовчуванням: production ] |

- За допомогою `subql build` ви можете вказати додаткові точки входу в полі експорту, хоча воно завжди збиратиметься `index.ts` автоматично

- Щоб використовувати поле експорту, потрібно мати @subql/cli версії 0.19.0 або вище.

- Будь-яке поле `exports` має відповідати типу рядка (наприклад, `"entry": "./src/file.ts"`), інакше воно ігноруватиметься під час збірки.

[Додатковий приклад](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --допомогти

Тут показані варіанти допомоги.

```shell
> subql-вузол --довідка
Параметри:
      --help Показати довідку [boolean]
      --version Показати номер версії [boolean]
  -f, --subquery Локальний шлях проекту subquery [рядок]
      --subquery-name Назва проекту subquery [застаріло] [рядок]
  -c, --config Вкажіть файл конфігурації [рядок]
      --local Використовувати локальний режим [застарілий] [логічний]
      --force-clean Примусово очистити базу даних, видаливши схеми проекту
                            і таблиці [логічні значення]
      --db-schema Назва схеми БД проекту [рядок]
      --unsafe Дозволяє використовувати будь-який вбудований модуль в межах
                            пісочниця [boolean][за замовчуванням: false]
      --batch-size Розмір пакету блоків для отримання за один раунд [число]
      --scale-batch-size масштабує розмір пакету на основі використання пам'яті
                                                      [логічний] [за замовчуванням: false]
      --timeout Тайм-аут для пісочниці індексатора для виконання зіставлення
                            функції [число]
      --debug Показати інформацію про налагодження для виводу консолі. буде
                             примусово встановити рівень журналу для налагодження
                                                       [логічний] [за замовчуванням: false]
       --profiler Показати інформацію про профільувальник у виводі консолі
                                                       [логічний] [за замовчуванням: false]
       --network-endpoint кінцева точка мережі Blockchain для підключення [рядок]
       --output-fmt Роздрукувати журнал як json або звичайний текст
                                            [рядок] [вибір: "json", "кольоровий"]
       --log-level Вкажіть рівень журналу для друку. Ігнорується, коли --debug є
                             використаний
           [рядок] [вибір: "фатальний", "помилка", "попередження", "інформація", "налагодження", "відстежування",
                                                                        "тихий"]
       --migrate Перенести схему БД (лише для таблиць керування)
                                                       [логічний] [за замовчуванням: false]
       --timestamp-field Увімкнути/вимкнути created_at та updated_at у схемі
                                                       [логічний] [за замовчуванням: false]
   -d, --network-dictionary Вкажіть API словника для цієї мережі [рядок]
   -m, --mmr-path Локальний шлях до файлу гірського хребта Меркла (.mmr).
                                                                         [рядок]
       --proof-of-index Увімкнути/вимкнути підтвердження індексу
                                                       [логічний] [за замовчуванням: false]
   -p, --port Порт, до якого служба буде прив'язана [число]
```

### --версія

Це відображає поточну версію.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Використовуйте цей прапор, щоб запустити проект SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (не підтримується)

Цей прапорець дозволяє вам надати назву для вашого проекту, яка діє так, ніби створюється екземпляр вашого проекту. Після введення нового імені створюється нова схема бази даних і блокова синхронізація починається з нуля. Не підтримується на користь `--db-schema`

```shell
підql-вузол -f. --subquery-name=test2
```

### -c, --config

Усі ці різноманітні конфігурації можна помістити у файл .yml або .json, а потім посилатися на нього за допомогою прапорця конфігурації.

Зразок файлу subquery_config.yml:

```shell
subquery: . // Mandatory. Це локальний шлях проекту. Крапка тут означає поточний локальний каталог.
subqueryName: hello // Необов'язкове ім'я
batchSize: 55 // Додаткова конфігурація
```

Розмістіть цей файл у тому самому каталозі, що й проект. Потім у поточному каталозі проекту запустіть:

```shell
> subql-node -c ./subquery_config.yml
```

### -local (застарів)

Цей прапор в основному використовується для налагодження, коли він створює таблицю starter_entity за замовчуванням у схемі postgres за замовчуванням.

```shell
підql-вузол -f. --local
```

Зауважте, що як тільки ви використовуєте цей прапор, його видалення не означатиме, що він вказуватиме на іншу базу даних. Щоб повторно вказати на іншу базу даних, вам доведеться створити НОВУ базу даних і змінити налаштування env на цю нову базу даних. Іншими словами, "export DB_DATABASE=<new_db_here>"

### --force-clean

Цей прапорець змушує схеми та таблиці проекту відновлюватися, що корисно використовувати під час ітеративної розробки схем graphql, щоб нові запуски проекту завжди працювали в чистому стані. Зауважте, що цей прапор також видалить усі індексовані дані.

### --db-схема

Цей прапорець дозволяє надати ім’я для схеми бази даних проекту. Після надання нового імені створюється нова схема бази даних із налаштованим ім’ям і починається індексація блоків.

```shell
підql-вузол -f. --db-schema=тест2
```

### --unsafe

Проєкти SubQuery зазвичай запускаються в пісочниці javascript для безпеки, щоб обмежити обсяг доступу проекту до вашої системи. Пісочниця обмежує доступний імпорт JavaScript до таких модулів:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Хоча це підвищує безпеку, ми розуміємо, що це обмежує доступні функції вашого Хоча це підвищує безпеку, ми розуміємо, що це обмежує доступні функції вашого SubQuery. Команда `--unsafe` імпортує всі модулі JavaScript за замовчуванням, що значно розширює функціональність пісочниці за рахунок зниження безпеки.

**Зверніть увагу, що команда `--unsafe` не дозволить вашому проєкту запустити в підпроцесній мережі, і ви повинні звернутися в службу підтримки, якщо хочете, щоб ця команда працювала з вашим проєкт в сервісі керування SubQuery ([проекті. ubquery.network](https://project.subquery.network))**

### --batch-size

Цей прапорець дозволяє встановити розмір пакету в командному рядку. Якщо розмір пакету також встановлено у файлі конфігурації, це має прецедент.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --Розмір масштабування

Масштабуйте розмір пакету вибору блоку з використанням пам’яті

### тайм-аут

Встановіть спеціальний тайм-аут для пісочниці javascript для виконання функцій зіставлення над блоком, перш ніж функція відображення блоку видає виняток часу очікування

### --debug

Це виводить інформацію про налагодження на вихід консолі та примусово встановлює рівень журналу на налагодження.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Це показує інформацію профайлера.

```shell
підql-вузол -f. --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --кінцева точка мережі

Цей прапор дозволяє користувачам змінювати конфігурацію кінцевої точки мережі з файлу маніфесту.

```shell
підql-вузол -f. --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Зауважте, що це також має бути встановлено у файлі маніфесту, інакше ви отримаєте:

```shell
ПОМИЛКА Створіть проект Subquery з заданого шляху! Помилка: не вдалося проаналізувати проект.yaml.
Примірник ProjectManifestImpl не пройшов перевірку:
  - мережа властивостей не відповідає таким обмеженням: isObject
  - властивість network.network не відповідає таким обмеженням: nestedValidation
```

### --output-fmt

Існує два різних формати виводу терміналів. JSON або кольоровий. Кольоровий є за замовчуванням і містить кольоровий текст.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=кольоровий
2021-08-10T11:57:41.480Z <subql-node> Запущено вузол INFO
(node:24707) [PINODEP007] Попередження: bindings.level не підтримується, замість цього використовуйте параметр options.level
2021-08-10T11:57:48.981Z <fetch> Блок отримання INFO [10201,10300], всього 100 блоків
2021-08-10T11:57:51.862Z <fetch> Блок отримання INFO [10301,10400], всього 100 блоків
```

### --log-рівень

Є 7 варіантів на вибір. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. The example below shows silent. Nothing will be printed in the terminal so the only way to tell if the node is working or not is to query the database for row count (select count(\*) from subquery_1.starter_entities) or query the block height.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

By default this is true. when set to false with:

```shell
> subql-node -f . –timestamp-field=false
```

This removes the created_at and updated_at columns in the starter_entities table.

### -d, --network-dictionary

This allows you to specify a dictionary endpoint which is a free service that is provided and hosted at: [https://explorer.subquery.network/](https://explorer.subquery.network/) (search for dictionary) and presents an API endpoint of: https://api.subquery.network/sq/subquery/dictionary-polkadot

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
підql-вузол -f. -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[ Детальніше про те, як працює SubQuery Dictionary ](../tutorials_examples/dictionary.md).

### -p, --port

The port the subquery indexing service binds to. By default this is set to `3000`

## subql-query

### --допомогти

Тут показані варіанти допомоги.

```shell
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        Project name                             [string] [required]
      --playground  Enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path    Path to create log file e.g ./src/name.log          [string]
      --log-rotate  Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer     Url that allows query to access indexer metadata    [string]
      --unsafe      Disable limits on query depth and allowable number returned
                    query records                                      [boolean]
  -p, --port        The port the service will bind to                   [number
```

### --версія

Це відображає поточну версію.

```shell
> subql-query --version
0.7.0
```

### -n, --name

This flag is used to start the query service. If the --subquery-name flag is not provided when running an indexer, the name here will refer to the default project name. If --subquery-name is set, then the name here should match what was set.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

This flag enables the graphql playground so should always be included by default to be of any use.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-рівень

See [--log-level](https://doc.subquery.network/references/references.html#log-level)

### --log-path

Enable file logging by providing a path to a file to log to

### --log-rotate

Enable file log rotations with the options of a 1d rotation interval, a maximum of 7 files and with a max file size of 1GB

### --indexer

Set a custom url for the location of the endpoints of the indexer, the query service uses these endpoints for indexer health, metadata and readiness status

### --unsafe

The query service has a limit of 100 entities for unbounded graphql queries. The unsafe flag removes this limit which may cause performance issues on the query service. It is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

This flag can also be used to enable certain aggregation functions including sum, max, avg and [others](https://github.com/graphile/pg-aggregates#aggregates).

These are disabled by default due to the entity limit.

**Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in SubQuery's managed service [project.subquery.network](https://project.subquery.network).**

### --port

The port the subquery query service binds to. By default this is set to `3000`
