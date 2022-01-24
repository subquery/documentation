# Підручники та приклади

У посібнику [ quick start ](/quickstart/quickstart.md) ми дуже швидко пройшли приклад, щоб дати вам смак того, що таке SubQuery і як він працює. Тут ми детальніше розглянемо робочий процес під час створення вашого проекту та ключові файли, з якими ви будете працювати.

## Приклади SubQuery

Деякі з наступних прикладів припускають, що ви успішно ініціалізували стартовий пакет у розділі [ Quick start ](../quickstart/quickstart.md). З цього стартового пакету ми пройдемо стандартний процес для налаштування та реалізації вашого проекту SubQuery.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Оновіть файл Manifest (` project.yaml `), щоб включити інформацію про ваш блокчейн та об'єкти, які ви будете відображати - див. [ Manifest File ](./manifest.md)
3. Створення графічних об'єктів у вашій схемі (`схемі. raphql`), що визначає форму даних, які ви будете вилучати і зберігати запити - дивіться [GraphQL Схема](./graphql.md)
4. Додайте всі функції відображення (наприклад, ` mappingHandlers.ts `), які ви хочете викликати для перетворення даних ланцюга в визначені вами об'єкти GraphQL - див. [ Mapping ](./mapping.md)
5. Створіть, побудуйте та опублікуйте свій код у проектах SubQuery (або запустіть у власному локальному вузлі) - див. [ Running and Querying your Starter Project ](./quickstart.md#running-and-querying-your-starter-project) у нашому швидкому посібнику з запуску.

## Структура каталогу

Наступна карта надає огляд структури каталогів проекту SubQuery, коли запускається команда ` init `.

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

Наприклад:

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## Генерація коду

Щоразу, коли ви змінюєте об'єкти GraphQL, ви повинні регенерувати каталог типів за допомогою наступної команди.

```
yarn codegen
```

Це створить новий каталог (або оновить існуючий) ` src / types `, які містять створені класи сутності для кожного типу, який ви визначили раніше, у ` schema.graphql `. Ці класи забезпечують безпечне для типу об'єкт завантаження, читання та запис доступу до полів сутності - детальніше про цей процес див. У [ Схемі GraphQL ](./graphql.md).

## Побудова

Для того, щоб запустити проект SubQuery на локально розміщеному вузлі SubQuery, потрібно спочатку створити свою роботу.

Запустіть команду збірки з кореневого каталогу проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Logging

The `console.log` method is **no longer supported**. Натомість в типи введено модуль ` logger `, а це означає, що ми можемо підтримувати реєстратор, який може приймати різні рівні реєстрації.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Щоб використовувати ` logger.info ` або ` logger.warn `, просто помістіть рядок у файл відображення.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Додайте `--log-level=debug` до вашого командного рядка.

Якщо ви працюєте з контейнером докера, додайте цей рядок у файл ` docker-compose.yaml `.

![logging.debug](/assets/img/logging_debug.png)

Тепер ви повинні побачити новий журнал на екрані терміналу.

![logging.debug](/assets/img/subquery_logging.png)
