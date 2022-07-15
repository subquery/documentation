# Флаги командной строки

## subql (cli)

### - помощь

```shell
> subql --help

КОМАНДЫ
  build Построить код проекта SubQuery
  codegen Генерировать схемы для узла графа
  help Вывести справку для subql
  init Инициализировать проект Subquery на основе эшафота
  migrate Мигрировать манифест проекта Subquery с v0.0.1 на v0.2.0
  publish Загрузите этот проект Subquery в IPFS
  validate Проверить папку или репозиторий github на наличие проекта Subquery validate
```

### создать

Эта команда использует webpack для генерации пакета проекта subquery.

| Параметры          | Описание                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | локальная папка проекта subquery (если ее еще нет в папке)                                                 |
| -o, --output       | указать выходную папку сборки, например, build-folder                                                      |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- В `subql build` вы можете указать дополнительные точки входа в поле exports, хотя он всегда будет строить `index.ts` автоматически.

- Для использования поля exports необходимо иметь @subql/cli версии 0.19.0 или выше.

- Любое поле `exports` должно соответствовать строковому типу (например, `"entry": "./src/file.ts"`), иначе оно будет проигнорировано при сборке.

[Еще один пример](../build/introduction.md#build).

## subql-node

### - помощь

Здесь отображаются параметры справки.

```shell
> subql-node --help
Опции:
      --help Показать справку [boolean]
      --version Показать номер версии [boolean]
  -f, --subquery Локальный путь проекта подзапроса [string]
      --subquery-name Имя проекта подзапроса [deprecated] [string]
  -c, --config Укажите файл конфигурации [string]
      --local Использовать локальный режим [deprecated] [boolean]
      --force-clean Принудительно очистить базу данных, удаляя схемы проекта
                            и таблицы [boolean]
      --db-schema Имя схемы базы данных проекта [string]
      --unsafe Разрешает использование любого встроенного модуля в пределах
                            песочницы [boolean][по умолчанию: false]
      --batch-size Пакетный размер блоков для выборки за один раунд [число]
      --scale-batch-size Масштабировать размер пакета на основе использования памяти
                                                      [булево] [по умолчанию: false]
      --timeout Тайм-аут для песочницы индексатора для выполнения отображения
                            функции [число]
      --debug Показать отладочную информацию в консольном выводе. будет
                            принудительно установить уровень журнала на отладочный
                                                      [boolean] [по умолчанию: false]
      --profiler Показывать информацию профилировщика в консольном выводе
                                                      [boolean] [по умолчанию: false]
      --subscription Включить подписку [boolean] [по умолчанию: false]                                                     
      --network-endpoint Конечная точка сети блокчейн для подключения [string]
      --output-fmt Печать журнала в формате json или обычного текста
                                           [string] [варианты: "json", "colored"]
      --log-level Укажите уровень журнала для печати. Игнорируется, если используется параметр --debug
                            используется
          [string] [варианты: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate Мигрировать схему базы данных (только для управляющих таблиц)
                                                      [boolean] [по умолчанию: false]
      --timestamp-field Включить/выключить created_at и updated_at в схеме
                                                      [boolean] [по умолчанию: false]
  -d, --network-dictionary Укажите api словаря для этой сети [строка].
  -m, --mmr-path Локальный путь файла merkle mountain range (.mmr)
                                                                        [string]
      --proof-of-index Включить/выключить доказательство индекса
                                                      [boolean] [по умолчанию: false]
  -p, --port Порт, к которому будет привязан сервис [число]
```

### --версия

Здесь отображается текущая версия.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Используйте этот флаг для запуска проекта SubQuery.

```shell
subql-node -f . // или
subql-node --subquery .
```

### --subquery-имя (устаревшее)

Этот флаг позволяет задать имя для вашего проекта, которое действует так, как будто создает экземпляр вашего проекта. При указании нового имени создается новая схема базы данных, и синхронизация блоков начинается с нуля. Утратил силу в пользу `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --конфигурация

Все эти различные конфигурации можно поместить в файл .yml или .json, а затем сослаться на него с помощью флага config.

Пример файла subquery_config.yml:

```shell
subquery: . // Обязательно. Это локальный путь проекта. Точка здесь означает текущий локальный каталог.
subqueryName: hello // Необязательное имя
batchSize: 55 // Необязательная конфигурация
```

Поместите этот файл в тот же каталог, что и проект. Затем в текущем каталоге проекта запустите:

```shell
> subql-node -c ./subquery_config.yml
```

### --локальный (устаревший)

Этот флаг используется в основном для отладочных целей, где он создает таблицу starter_entity по умолчанию в схеме "postgres" по умолчанию.

```shell
subql-node -f . --local
```

Обратите внимание, что если вы используете этот флаг, его удаление не означает, что он будет указывать на другую базу данных. Для перенаправления на другую базу данных вам придется создать НОВУЮ базу данных и изменить настройки env на эту новую базу данных. Другими словами, "export DB_DATABASE=<new_db_here>".

### --force-очистка

Этот флаг заставляет схемы и таблицы проекта регенерироваться, что полезно использовать при итеративном развитии схем graphql, чтобы новые запуски проекта всегда работали с чистым состоянием. Обратите внимание, что этот флаг также сотрет все индексированные данные.

### --db-схема

Этот флаг позволяет задать имя для схемы базы данных проекта. При указании нового имени создается новая схема базы данных с настроенным именем и начинается блочное индексирование.

```shell
subql-node -f . --db-schema=test2
```

### --подписка
Это создаст триггер уведомления на сущность, что также является необходимым условием для включения функции подписки в службе запросов.

### - небезопасно

Проекты SubQuery обычно запускаются в песочнице javascript для безопасности, чтобы ограничить объем доступа проекта к вашей системе. Песочница ограничивает доступный импорт javascript следующими модулями:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Хотя это повышает безопасность, мы понимаем, что это ограничивает доступную функциональность вашего SubQuery. Команда `--unsafe` импортирует все модули javascript по умолчанию, что значительно увеличивает функциональность песочницы, но при этом снижает безопасность.

**Обратите внимание, что команда `--unsafe` не позволит запустить ваш проект в сети SubQuery, и вы должны обратиться в службу поддержки, если хотите, чтобы эта команда была запущена с вашим проектом в [ управляемой службе SubQuery](https://project.subquery.network).**

### --размер партии

Этот флаг позволяет задать размер партии в командной строке. Если размер партии также задан в конфигурационном файле, он имеет приоритет.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --масштабируемый размер партии

Масштабируйте размер пакета выборки блоков в зависимости от использования памяти.

### --тайм-аут

Установите пользовательский таймаут для javascript-песочницы для выполнения функций отображения над блоком до того, как функция отображения блока выбросит исключение по таймауту.

### отладка

Это выводит отладочную информацию на консольный вывод и принудительно устанавливает уровень журнала на отладочный.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;

```

### профиль

Здесь отображается информация о профилировщике.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --Сетевая конечная точка

Этот флаг позволяет пользователям переопределять конфигурацию конечной точки сети из файла манифеста.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"

```

Обратите внимание, что это также должно быть установлено в файле манифеста, иначе вы получите:

```shell
ERROR Создать проект Subquery по заданному пути не удалось! Ошибка: не удалось разобрать project.yaml.
Экземпляр ProjectManifestImpl не прошел проверку:
 - свойство network не выполнило следующие ограничения: isObject
 - свойство network.network не прошло следующие ограничения: nestedValidation
```

### --Вывод

Существует два различных формата вывода терминала. JSON или цвет. Colored (Цветной) используется по умолчанию и содержит цветной текст.

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

### --уровень лога

На выбор предлагается 7 вариантов. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. В приведенном ниже примере ничего не показывается. В терминале ничего не будет выведено, поэтому единственный способ узнать, работает узел или нет, - это запросить в базе данных количество строк (select count(\*) from subquery_1.starter_entities) или запросить высоту блока.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Предупреждение: bindings.level устарел, вместо него используйте опцию options.level
(Используйте `node --trace-warnings ...`, чтобы показать, где было создано предупреждение)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Пользовательские аксессоры PerformanceEntry устарели. Пожалуйста, используйте свойство детализации.
(node:24686) [PINODEP007] Предупреждение: bindings.level устарел, вместо него используйте опцию options.level
```

<!-- ### --migrate TBA -->

### --поле временной метки

По умолчанию это значение истина. если установлено значение ложь:

```shell
> subql-node -f . –timestamp-field=false
```

Это удаляет столбцы created_at и updated_at в таблице starter_entities.

### -d, --сетевой словарь

Это позволяет вам указать конечную точку словаря, который является бесплатной услугой, предоставляемой и размещаемой в SubQuery's [Project Explorer](https://explorer.subquery.network/) (поиск словаря) и представляет конечную точку API: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Обычно этот параметр задается в файле манифеста, но ниже показан пример использования его в качестве аргумента в командной строке.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Подробнее о том, как работает словарь SubQuery ](../academy/tutorials_examples/dictionary.md).

### -p, --порт

Порт, к которому привязывается служба индексирования подзапросов. По умолчанию установлено значение `3000`.

### --disable-historical

Отключает автоматическое отслеживание исторических состояний, [ см. Historic State Tracking](./historical.md). По умолчанию установлено значение `false`.

## subql-query

### - помощь

Здесь отображаются параметры справки.

```shell
Опции:
      --help Показать справку [булево]
      --version Показать номер версии [булево]
  -n, --name Имя проекта [строка] [обязательно]
      --playground Включить graphql playground [boolean]
      --subscription Включить подписку [булево] [по умолчанию: false]   
      --output-fmt Выводить журнал в формате json или обычного текста
                        [string] [варианты: "json", "colored"] [по умолчанию: "colored"]
      --log-level Укажите уровень журнала для печати.
            [string] [варианты: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [по умолчанию: "info"]
      --log-path Путь для создания файла журнала, например ./src/name.log [string]
      --log-rotate Вращать файлы журнала в каталоге, указанном log-path
                                                      [boolean] [по умолчанию: false]
      --indexer Url, позволяющий запросу получить доступ к метаданным индексатора [string]
      --unsafe Отключить ограничения на глубину запроса и допустимое количество возвращаемых
                      query records [boolean]
  -p, --port Порт, к которому будет привязан сервис [число]

```

### --версия

Здесь отображается текущая версия.

```shell
> subql-query --version
0.7.0
```

### -n, --имя

Этот флаг используется для запуска службы запросов. Если флаг --subquery-name не указан при запуске индексатора, имя здесь будет ссылаться на имя проекта по умолчанию. Если задано --subquery-name, то имя здесь должно соответствовать заданному.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld --playground // имя по умолчанию соответствует имени каталога проекта
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground // имя указывает на проект subql-helloworld, но с именем hiworld
```

### игровая площадка

Этот флаг включает игровую площадку graphql, поэтому он всегда должен быть включен по умолчанию, чтобы быть полезным.

### --Вывод

Смотрите [--output-fmt](../run_publish/references.md#output-fmt).

### --уровень лога

Смотрите [--loglevel](../run_publish/references.md#log-level).

### --log-path

Включите ведение журнала файлов, указав путь к файлу, в который будет вестись журнал.

### --log-поворот

Включите ротацию журналов с параметрами интервала ротации 1d, максимум 7 файлов и с максимальным размером файла 1GB.

### --индексатор

Установите пользовательский url для расположения конечных точек индексатора, служба запросов использует эти конечные точки для определения состояния здоровья индексатора, метаданных и статуса готовности.

### --подписка

Этот флаг включает [GraphQL Subscriptions](./subscription.md), для включения этой функции требуется `subql-node` также включить `--subscription`.

### - небезопасно

Служба запросов имеет ограничение в 100 сущностей для неограниченных запросов graphql. Флаг unsafe снимает это ограничение, что может вызвать проблемы с производительностью службы запросов. Вместо этого рекомендуется, чтобы запросы были [пагинированными](https://graphql.org/learn/pagination/).

Этот флаг позволяет использовать некоторые функции агрегирования, включая sum, max, avg и другие. Подробнее об этой функции [здесь](../run_publish/aggregate.md).

По умолчанию они отключены из-за лимита сущностей.

**Обратите внимание, что команда `--unsafe` не позволит запустить ваш проект в сети SubQuery, и вы должны обратиться в службу поддержки, если хотите, чтобы эта команда была запущена с вашим проектом в [SubQuery's Managed Services](https://project.subquery.network).**

### --порт

Порт, к которому привязывается служба запросов Subquery. По умолчанию установлено значение `3000`
