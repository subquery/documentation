# Tutorials & Examples

В инструкции [быстрого старта](/quickstart/quickstart.md), мы очень быстро разобрали пример, чтобы показать Вам, что такое SubQuery и как он работает. В данной статье, мы более подробно рассмотрим рабочий процесс создания вашего проекта и ключевых файлов, с которыми вы будете работать.

## Примеры SubQuery

Некоторые из следующих примеров предполагают, что вы успешно запустили стартовый пакет из в раздела [Быстрый старт](../quickstart/quickstart.md). С этого стартового пакета мы рассмотрим стандартный процесс по настройке и внедрению вашего SubQuery проекта.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Обновите файл манифеста (`проект. aml`), чтобы включить информацию о вашем блокчейне, и сущности, которые вы собираетесь сопоставить - см. [Файл манифеста](./manifest.md)
3. Создайте GraphQL сущности в вашей схеме (`schema.raphql`), которые определяют форму ваших данных, которые вы будете извлекать и использовать для запроса - см. [GraphQL Schema](./graphql.md)
4. Добавьте все функции сопоставления (например, `mappingHandlers.ts`), которые вы хотите использовать для преобразования данных цепи в GraphQL сущности, которые вы определили ранее - см. [Mapping](./mapping.md)
5. Сгенерируйте, постройте, и опубликуйте ваш код в SubQuery Projects (или запустите на вашем локальном узле) - см. [Запуск и запрос вашего стартового проекта](./quickstart.md#running-and-querying-your-starter-project) в нашей инструкции быстрого старта.

## Структура каталогов

Следующая карта предоставляет обзор структуры директория SubQuery проекта при запуске команды `init`.

```
- project-name
  L package.json
  L проект. aml
  L README.md
  L schema.graphql
  L tsconfig. son
  L docker-compose.yml
  L src
    L index. s
    L сопоставления
      L mappingHandlers.ts
  L .gitignore
```

Example

![Структура каталогов SubQuery](/assets/img/subQuery_directory_stucture.png)

## Генерирование кода

Каждый раз, когда вы меняете сущности GraphQL, вы должны регенерировать типы каталогов следующей командой.

```
yarn codegen
```

Это команда создаст новый каталог (или обновит существующий) `src/types`, который содержит сгенерированные классы сущностей для каждого типа, который вы ранее задали в `schema.graphql`. Эти классы обеспечивают безопасную загрузку сущностей, доступ к чтению и записи на поле сущности - подробнее об этом процессе можно прочитать на [GraphQL-схеме](./graphql.md).

## Сборка

Для того, чтобы запустить свой проект SubQuery на локальном узле SubQuery Node, вам нужно сначала завершить свою работу.

Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
