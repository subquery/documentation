# Създаване на SubQuery проект

В [ръководството за бързо стартиране](/quickstart/quickstart.md), набързо разгледахме пример, за да ви дадем представа какво представлява SubQuery и как работи. Тук ще разгледаме по-отблизо работния процес при създаването на вашия проект и ключовите файлове, с които ще работите.

## Основният работен процес

Някои от следните примери предполагат, че сте инициализирали успешно стартовия пакет в секцията [Бърз старт](../quickstart/quickstart.md). В този стартов пакет ще преминем през стандартния процес за персонализиране и изпълнение на вашия SubQuery проект.

1. Инициализирайте проекта си с помощта на `subql init PROJECT_NAME`.
2. Актуализирайте Манифест файла (`project.yaml`) за да включите информация относно вашият блокчейн и обектите, които ще включите - вижте [Manifest File](./manifest.md)
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

### Алтернативни опции за играждане

Поддържаме допълнителни опции за изграждане за проекти SubQuery използвайки `subql build`.

С това можете да дефинирате допълнителни входни точки за изграждане, като използвате полето за експортиране в package.json.

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

Имайте предвид, че той ще състави `index.ts` независимо дали е посочен в полето за експортиране или не.

За повече информация относно използването на обозначителните флагове, вижте [cli reference](https://doc.subquery.network/references/references/#build).

## Логване

`console.log` метод **вече не се поддържа**. Вместо това `logger` модул е инжектиран в types, което означава, че можем да поддържаме регистратор, приемащ различни нива на логване.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

За да използвате `logger.info` или `logger.warn`, просто поставете реда във вашия файл за преобразуване.

![logging.info](/assets/img/logging_info.png)

За да използвате `logger.debug`, е необходима допълнителна стъпка. Добавете `--log-level=debug` към вашия команден ред.

Ако използвате докер контейнер, добавете този ред към вашия файл `docker-compose.yaml`.

![logging.debug](/assets/img/logging_debug.png)

Сега трябва да видите новото регистриране на екрана на терминала.

![logging.debug](/assets/img/subquery_logging.png)
