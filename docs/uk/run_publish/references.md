# Прапори командного рядка

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     Створіть цей код проекту SubQuery
  codegen   Створення схем для вузла graph
  help      відображення довідки для subql
  init      Ініціалізуйте проект SubQuery scaffold
  migrate   Перенести маніфест проекту SubQuery v0.0.1 в v0.2.0
  publish   Завантажте цей проект SubQuery в IPFS
  validate  Перевірка папки або сховища github - це проект перевірки SubQuery
```

### будувати

Ця команда використовує webpack для створення пакету проєкту subquery.

| Опція              | Описання                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | локальна тека проєкту subquery (якщо вона ще не знаходиться в теці)                                        |
| -o, --output       | вкажіть вихідну теку збірки, наприклад, build-folder                                                       |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- За допомогою `subql build` ви можете вказати додаткові точки входу в поле exports, хоча він завжди буде будуватися `index.Ts` автоматично.

- Для використання поля експорту у вас повинен бути @subql/cli версії 0.19.0 або вище.

- Будь-яке поле `exports` має відповідати рядковому типу (наприклад, `"entry": "./src/file.ts"`), інакше воно буде проігноровано при складанні.

[ ще один приклад](../build/introduction.md#build).

## subql-node

### --help

Тут показуватися параметри довідки.

```shell
> subql-node --help
Options:
      --help                Показати довідку                                  [boolean]
      --version             Показати номер версії                        [boolean]
  -f, --subquery            Локальний шлях до проекту subquery          [string]
      --subquery-name       Назва проекту subquery   [deprecated] [string]
  -c, --config              Вкажіть файл конфігурації                  [string]
      --local               Використовуйте локальний режим                [deprecated] [boolean]
      --force-clean         Примусово очистіть базу даних, видаливши схеми проекту
                            і таблиці                                 [boolean]
      --db-schema           Назва схеми db проекту               [string]
      --unsafe              Дозволяє використовувати будь-який вбудований модуль в
                            sandbox                    [boolean][default: false]
      --batch-size          Розмір партії блоків для вибірки за один раунд  [number]
      --scale-batch-size    масштабуйте розмір пакета в залежності від використання пам'яті
                                                      [boolean] [default: false]
      --timeout             Тайм-аут для пісочниці індексатора для виконання зіставлення
                            функція                                   [number]
      --debug               Відображення налагоджувальної інформації на вивід консолі. буде
                            примусово встановіть рівень журналу для налагодження
                                                      [boolean] [default: false]
      --profiler            Відображення інформації профілювальника на вивід консолі
                                                      [boolean] [default: false]
      --subscription        Увімкнути підписку       [boolean] [default: false]                                                     
      --network-endpoint    Кінцева точка блокчейн-мережі для підключення      [string]
      --output-fmt          Друк журналу у форматі json або звичайного тексту
                                           [string] [choices: "json", "colored"]
      --log-level           Вкажіть рівень журналу для друку. Ігнорується, коли --debug is
                            використаний
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Перенесення схеми Бд (тільки для таблиць управління)
                                                      [boolean] [default: false]
      --timestamp-field     Включити/відключити created_at і updated_at в схемі
                                                      [boolean] [default: false]
  -d, --network-dictionary  Вкажіть api-інтерфейс словника для цієї мережі [string]
  -m, --mmr-path            Місцева стежка гірського хребта Меркле (.mmr) файл
                                                                        [string]
      --proof-of-index      Включення/відключення перевірки індексу
                                                      [boolean] [default: false]
  -p, --port                Порт, до якого буде прив'язана служба           [number]
```

### --version

При цьому показуватися поточна версія.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Використовуйте цей прапорець, щоб запустити проєкт SubQuery.

```shell
subql-node -f . // бо
subql-node --subquery .
```

### --subquery-name (засуджувати)

Цей прапорець дозволяє вказати ім'я для вашого проєкту, яке діє так, як якби він створив екземпляр вашого проєкту. Після надання нового імені створюється нова схема бази даних, і синхронізація блоків починається з нуля. Застарів на користь `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Всі ці різні конфігурації можуть бути поміщені в .yml yml або .json, на який потім посилаються за допомогою прапора конфігурації.

Зразок subquery_config.yml file:

```shell
subquery: . // Mandatory. Це локальний шлях проєкту. Точка тут означає поточний локальний каталог.
subqueryName: hello // Необов'язкове ім'я
batchSize: 55 // Додаткова конфігурація
```

Помістіть цей файл в той же каталог, що і проєкт. Потім в поточному каталозі проєкту запустіть:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (засуджувати)

Цей прапор в основному використовується для цілей налагодження, де він створює таблицю starter_entity за замовчуванням у схемі postgres за замовчуванням.

```shell
subql-node -f . --local
```

Зверніть увагу, що як тільки ви використовуєте цей прапор, його видалення не означатиме, що він буде вказувати на іншу базу даних. Щоб вказати на іншу базу даних, вам потрібно буде створити нову базу даних та змінити налаштування env для цієї нової бази даних. Іншими словами, "export DB_DATABASE=<new_db_here>".

### --force-clean

Цей прапор змушує схеми й таблиці проєкту регенеруватися, що корисно використовувати при ітеративній розробці схем graphql таким чином, щоб нові запуски проєкту завжди працювали в чистому стані. Зверніть увагу, що цей прапор також призведе до видалення всіх індексованих даних.

### --db-schema

Цей прапорець дозволяє вказати ім'я для схеми бази даних проєкту. Після надання нового імені створюється нова схема бази даних з налаштованим ім'ям і починається індексація блоків.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
Це створить тригер повідомлення для об'єкта, це також є необхідною умовою для включення функції підписки в службі запитів.

### --unsafe

Проєкти SubQuery зазвичай виконуються в ізольованому середовищі javascript для забезпечення безпеки, щоб обмежити обсяг доступу проєкту до вашої системи. Ізольоване середовище обмежує доступний імпорт javascript наступними модулями:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Хоча це підвищує безпеку, ми розуміємо, що це обмежує доступну функціональність вашого SubQuery. Команда `--unsafe ` імпортує всі модулі javascript за замовчуванням, що значно збільшує функціональність пісочниці з компромісом у вигляді зниження безпеки.

**Зверніть увагу, що команда `--unsafe` запобігає запуску вашого проєкту в мережі SubQuery, і ви повинні звернутися в службу підтримки, якщо хочете, щоб ця команда виконувалася з вашим проєктом в [керованому сервісі SubQuery ](https://project.subquery.network).**

### --batch-size

Цей прапор дозволяє встановити розмір пакета в командному рядку. Якщо розмір пакета також заданий в конфігураційному файлі, це має прецедент.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Масштабуйте розмір пакета вибірки блоків залежно від використання пам'яті.

### --timeout

Встановіть користувальницький тайм-аут для пісочниці javascript для виконання функцій зіставлення над блоком, перш ніж функція зіставлення блоків видасть виняток тайм-ауту.

### --debug

Це виводить налагоджувальну інформацію на висновок консолі й примусово встановлює рівень журналу для налагодження.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Тут показуватися інформація про профілювальника.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Цей прапорець дозволяє користувачам перевизначати конфігурацію кінцевої точки мережі з файлу маніфесту.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Зверніть увагу, що це також має бути задано у файлі маніфесту, в іншому випадку ви отримаєте:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Існує два різних форматів виводу терміналу. JSON або кольоровий. Кольорове значення за замовчуванням і містить кольоровий текст.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Є 7 варіантів на вибір. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. У наведеному нижче прикладі показано мовчання. У терміналі нічого не буде надруковано, тому єдиним способом визначити, чи працює вузол чи ні, є запит на кількість рядків у базі даних (виберіть count(\*) з subquery_1.starter_entities) або запитати висоту блоку.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Будь ласка, використовуйте властивість detail.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

За замовчуванням це значення дорівнює true. коли встановлено значення false за допомогою:

```shell
> subql-node -f . –timestamp-field=false
```

При цьому видаляються стовпці created_at і updated_at в таблиці starter_entities.

### -d, --network-dictionary

Це дозволяє вказати кінцеву точку словника, яка є безплатною службою, що надається та розміщується в [Project Explorer](https://explorer.subquery.network/) SubQuery's (пошук за словником) і представляє кінцеву точку API: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Зазвичай це значення задається у вашому файлі маніфесту, але нижче наведено приклад його використання в якості аргументу в командному рядку.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[докладніше про те, як працює словник SubQuery, читайте тут](../academy/tutorials_examples/dictionary.md).

### -p, --port

Порт, до якого прив'язується служба індексації subquery. За замовчуванням це значення дорівнює `3000`.

### --disable-historical

Вимикає автоматичне відстеження історичного стану, [див. розділ відстеження історичного стану](./historical.md). За замовчуванням для цього параметра встановлено значення `false`.

## subql-query

### --help

Тут показуватися параметри довідки.

```shell
Options:
      --help          Показати довідку                                          [boolean]
      --version       Показати номер версії                                [boolean]
  -n, --name          Назва проекту                             [string] [required]
      --playground    Включити graphql playground                          [boolean]
      --subscription  Увімкнути підписку               [boolean] [default: false]   
      --output-fmt    Друк журналу у форматі json або звичайного тексту
                        [string] [choices: "json", "colored"] [default: "colored"]
      --log-level     Вкажіть рівень журналу для друку.
            [string] [вибір: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [default: "info"]
      --log-path      Шлях для створення файлу журналу e.g ./src/name.log          [string]
      --log-rotate    Поворот файлів журналу в каталозі, зазначеному log-path
                                                      [boolean] [default: false]
      --indexer       Url-адреса, що дозволяє запиту отримати доступ до метаданих індексатора    [string]
      --unsafe        Вимкніть обмеження на глибину запиту і допустиме число, що повертається
                      записи query                                      [boolean]
  -p, --port          Порт, до якого буде прив'язана служба                   [number]
```

### --version

При цьому показуватися поточна версія.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Цей прапор використовується для запуску служби query. Якщо прапор -- subquery-name не вказано при запуску індексатора, ім'я тут буде посилатися на ім'я проєкту за замовчуванням. Якщо задано --subquery-name, то ім'я тут має відповідати тому, що було задано.

```shell
> subql-node -f . // --subquery-name не встановлено

> subql-query -n subql-helloworld  --playground // ім'я за замовчуванням дорівнює імені каталогу проекту
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // назва вказує на проєкт subql-helloworld, але з назвою hiworld
```

### --playground

Цей прапор включає ігровий майданчик graphql, тому вона завжди повинна бути включена за замовчуванням, щоб бути корисною.

### --output-fmt

Бачачи [--output-fmt](../run_publish/references.md#output-fmt).

### --log-level

Бачачи [--log-level](../run_publish/references.md#log-level).

### --log-path

Увімкніть ведення журналу файлів, вказавши шлях до файлу для входу в систему.

### --log-rotate

Увімкніть обертання журналу файлів з параметрами інтервалу обертання 1D, максимум 7 файлів і з максимальним розміром файлу 1 Гб.

### --indexer

Задайте користувацьку Url-адресу для розташування кінцевих точок індексів, служба запитів використовує ці кінцеві точки для визначення працездатності індексатора, метаданих і стану готовності.

### --subscription

Цей прапорець включає [підписки на GraphQL](./subscription.md), для включення цієї функції потрібно `subql-node` також включити `--subscription`.

### --unsafe

Служба запитів має обмеження в 100 об'єктів для необмежених запитів graphql. Прапор unsafe видаляє це обмеження, яке може викликати проблеми з продуктивністю служби запитів. Замість цього рекомендується, щоб запити були [розбиті на сторінки](https://graphql.org/learn/pagination/).

Цей прапор включає певні функції агрегування, включаючи sum, max, avg та інші. Докладніше про цю функцію [читайте тут](../run_publish/aggregate.md).

За замовчуванням вони відключені через обмеження сутності.

**Зверніть увагу, що команда `--unsafe` запобігає запуску вашого проєкту в мережі SubQuery, і ви повинні звернутися в службу підтримки, якщо хочете, щоб ця команда виконувалася з вашим проєктом в [керованих службах SubQuery's ](https://project.subquery.network).**

### --port

Порт, до якого прив'язується служба запитів subquery. За замовчуванням це значення дорівнює `3000`
