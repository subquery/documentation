# Създаване на SubQuery проект

В [ръководството за бързо стартиране](/quickstart/quickstart.md), ние много набързо разгледахме пример, за да ви дадем представа какво представлява SubQuery и как работи. Тук ще разгледаме по-отблизо работния процес при създаването на вашия проект и ключовите файлове, с които ще работите.

## Основният работен процес

Някои от следните примери предполагат, че сте инициализирали успешно стартовия пакет в секцията [Бърз старт](../quickstart/quickstart.md). В този стартов пакет ще преминем през стандартния процес за персонализиране и изпълнение на вашия SubQuery проект.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Актуализирайте файла на манифеста (`project.yaml`) за да включите информация за вашия блокчейн и обектите, които ще преобразувате - вижте [Manifest File](./manifest.md)
3. Създайте GraphQL обекти във вашата схема (`schema.graphql`) които дефинират формата на данните, които ще извлечете и ще запазите за заявка - вижте [GraphQL Schema](./graphql.md)
4. Добавете всички функции за мапинг (eg `mappingHandlers.ts`) които искате да включите, за да трансформирате верижните данни към обектите на GraphQL, които сте дефинирали - вижте [Mapping](./mapping.md)
5. Генерирайте, изградете и публикувайте своя код в SubQuery Projects (или стартирайте във вашия собствен локален нод) - вижте [Изпълнение и запитване на вашия начален проект](./quickstart.md#running-and-querying-your-starter-project) в нашето ръководство за бърз старт.

## Структура на директорията

Следващата карта предоставя общ преглед на структурата на директорията на SubQuery проект, когато се изпълнява командата `init`.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Например:

![Структура на директория на Subquery](/assets/img/subQuery_directory_stucture.png)

## Генериране на код

Всеки път, когато променяте вашите GraphQL обекти, трябва да регенерирате вашата директория с типове, със следната команда.

```
yarn codegen
```

Това ще създаде нова директория (или ще актуализира съществуващите) `src/types` които съдържат генерирани класове на обекти за всеки тип, който сте дефинирали по-рано в `schema.graphql`. Тези класове осигуряват безопасно зареждане на обекти, достъп за четене и запис до полета на обект - вижте повече за този процес в [the GraphQL Schema](./graphql.md).

## Изграждане

За да стартирате вашия SubQuery Project на локално хостван SubQuery нод, първо трябва да изградите своята работа.

Изпълнете командата за изграждане от основната директория на проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Logging

`console.log` методът **вече не се поддържа.**. Вместо това `logger` модул е инжектиран в типовете, което означава, че можем да поддържаме регистратор, който може да приема различни нива на регистриране.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

За да използвате `logger.info` или `logger.warn`, просто поставете реда във вашия файл за преобразуване.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Добавете `--log-level=debug` към вашия команден ред.

Ако използвате докер контейнер, добавете този ред към вашия файл `docker-compose.yaml`.

![logging.debug](/assets/img/logging_debug.png)

Сега трябва да видите новото регистриране на екрана на терминала.

![logging.debug](/assets/img/subquery_logging.png)
