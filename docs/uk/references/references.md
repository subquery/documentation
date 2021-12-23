# Прапори командної лінії

## subql-node

### --допомогти

Це показує варіанти допомоги.

```shell
& gt; subql-node --help
Варіанти:
      --help Показати допомогу                                  [булевий]      --version Показати номер версії [булева]
  -f, --підзапит Місцевий шлях проекту підзапиту [рядок]
      --підзапит-назва Назва проекту підзапиту [рядок]
  -c, --config Вкажіть файл конфігурації [string]
      --local Використовуйте локальний режим [булевий]
      --force-clean Force очищає базу даних, скидаючи схеми проекту
                            та таблиці [булеві]
      --batch-size Розмір партії блоків для отримання в одному раунді [кількість]
      --timeout Timeout для індексатора пісочниці для виконання карти
                            функції [кількість]
      --debug Показати інформацію про налагодження для консольного виводу. буде
                            насильно встановити рівень журналу для налагодження
                                                      [булева] [за замовчуванням: false]
      --profiler Показати інформацію про профілер для консольного виводу
                                                      [булева] [за замовчуванням: false]
      --network-endpoint Blockchain endpoint для підключення [string]
      --output-fmt Друк журналу як json або звичайний текст
                                           [string] [вибір: "json", "кольоровий"]
      --log-рівень Вкажіть рівень журналу для друку. Ігнорується, коли - налагодження
                            б / в
          [string] [вибір: "фатальний", "помилка", "попереджається", "інформація", "налагодження", "слід",
                                                                       "мовчазний"]
      --migrate Migrate db схема (лише для таблиць управління)
                                                      [булева] [за замовчуванням: false]
      --timestamp-field Увімкнути / вимкнути create_at та оновлено_at у схемі
                                                       [булева] [за замовчуванням: правда]
  -d, --network-dictionary Вкажіть словник api для цієї мережі [string]
  -m, --mmr-path Місцевий шлях гірського хребта Меркле (.mmr)
                                                                        [рядок]
      --proof-of-index Увімкнення / вимкнення підтвердження індексу
                                                      [булева] [за замовчуванням: false]
  -p, --port Порт, до якого буде пов'язана служба
                                                        [кількість] [за замовчуванням: 3000]
```

### --версія

Це відображає поточну версію.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Використовуйте цей прапор для запуску проекту SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name

Цей прапор дозволяє надати назву для вашого проекту, який діє так, ніби він створює екземпляр вашого проекту. Після надання нового імені створюється нова схема бази даних, а синхронізація блоків починається з нуля.

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Усі ці різні конфігурації можна розмістити у файлі .yml або .json, а потім посилатися на прапор конфігурації.

Зразок файлу subquery_config.yml:

```shell
subquery: . // Mandatory. Це місцевий шлях проекту. Період тут означає поточний локальний каталог.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Помістіть цей файл у той самий каталог, що і проект. Потім у поточному каталозі проектів запустіть:

```shell
> subql-node -c ./subquery_config.yml
```

### --local

Цей прапор використовується в основному для налагодження, коли він створює таблицю starter_entity за замовчуванням у схемі "postgres" за замовчуванням.

```shell
subql-node -f . --local
```

Зауважте, що після використання цього прапора видалення його не означає, що він буде вказувати на іншу базу даних. Щоб переробити іншу базу даних, вам доведеться створити НОВУ базу даних та змінити налаштування env на цю нову базу даних. Іншими словами, "експорт DB_DATABASE =<new_db_here>"

### --force-clean

Цей прапор змушує регенерувати схеми та таблиці проектів, корисні для використання при ітераційній розробці схем graphql таким чином, що нові запуски проекту завжди працюють з чистим станом. Зауважте, що цей прапор також видалить усі індексовані дані.

### --batch-size

Цей прапор дозволяє встановити розмір партії в командному рядку. Якщо розмір партії також встановлений у конфігураційному файлі, це має прецедент.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

Цей вихід налагоджує інформацію на вихід консолі і насильно встановлює рівень журналу для налагодження.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Це показує інформацію про профілер.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Цей прапор дозволяє користувачам перекрити конфігурацію кінцевої точки мережі з маніфестного файлу.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Зауважте, що це також має бути встановлено у маніфестному файлі, інакше ви отримаєте:

```shell
ПОМИЛКА Створіть проект підзапиту з заданого шляху! Помилка: не вдалося проаналізувати проект.yaml.
Екземпляр ProjectManifestImpl не зміг перевірити:
 - мережа властивостей зазнала таких обмежень: isObject
 - mainity network не виконала таких обмежень: nestedValidation
```

### --output-fmt

Існує два різних формати виводу терміналів. JSON або кольоровий. Кольоровий за замовчуванням і містить кольоровий текст.

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

### --log-рівень

Є 7 варіантів на вибір. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Наведений нижче приклад показує мовчання. У терміналі нічого не буде надруковано, тому єдиний спосіб визначити, працює чи ні вузол, - це запитувати базу даних для підрахунку рядків  (select count(\*) from subquery_1.starter_entities) або запитувати висоту блоку.

```shell
> subql-node -f . --log-level = мовчазний
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(Використовуйте `node --trace-warnings ...`, щоб показати, де було створено попередження)
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
(node: 24686) [DEP0152] ДепресіяПопередження: Спеціальна продуктивністьДоступники для вступу застаріли. Будь ласка, використовуйте детальнішу властивість.
(node: 24686) [PINODEP007] Попередження: bindings.level застаріло, замість цього використовуйте опцію options.level
```

<!-- ### --migrate TBA -->

### --timestamp-field

За замовчуванням це правда. коли встановлено значення false з:

```shell
> subql-node -f . –timestamp-field=false
```

Це видаляє created_at та updated_at стовпці в таблиці starter_entities.

### -d, --network-dictionary

Це дозволяє вказати кінцеву точку словника, яка є безкоштовною послугою, яка надається та розміщується за адресою: [ https://explorer.subquery.network/](https://explorer.subquery.network/) (пошук у словнику) та представляє кінцеву точку API: https ://api.subquery.network/sq/subquery/diction-polkadot

Зазвичай це буде встановлено у вашому маніфестному файлі, але нижче показаний приклад використання його як аргументу в командному рядку.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Детальніше про те, як працює словник підзапиту ](../tutorials_examples/dictionary.md)

## subql-query

### --допомогти

Це показує варіанти допомоги.

```shell
Варіанти:
      --help Показати допомогу                                          [булевий]      --version Показати номер версії [булева]
  -n, - назва Назва проекту [рядок] [обов'язково]
      --playground Увімкніть ігровий майданчик graphql [булевий]
      --output-fmt Друк журналу як json або звичайний текст
                      [string] [вибір: "json", "кольоровий"] [за замовчуванням: "кольоровий"]
      --log-рівень Вкажіть рівень журналу для друку.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer Url, що дозволяє запиту отримати доступ до метаданих індексатора [string]
```

### --версія

Це відображає поточну версію.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Цей прапор використовується для запуску служби запитів. Якщо прапор --subquery-name не вказаний під час запуску індексатора, тут ім'я буде посилатися на назву проекту за замовчуванням. Якщо встановлено ім'я підзапиту, то ім'я тут повинно відповідати встановленому.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // назва вказує на проект subql-helloworld, але з назвою hiworld
```

### Ігрове поле

Цей прапор дозволяє ігровому майданчику graphql, тому його завжди слід включати за замовчуванням, щоб мати будь-яке використання.

### --output-fmt

Дивіться [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-рівень

Дивіться [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
