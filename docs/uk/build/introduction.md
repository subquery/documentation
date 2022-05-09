# Підручники та приклади

У посібнику [ quick start ](/quickstart/quickstart-polkadot.md) ми дуже швидко пройшли приклад, щоб дати вам смак того, що таке SubQuery і як він працює. Тут ми детальніше розглянемо робочий процес під час створення вашого проекту та ключові файли, з якими ви будете працювати.

## Приклади SubQuery

Деякі з наступних прикладів припускають, що ви успішно ініціалізували стартовий пакет у розділі [ Quick start ](../quickstart/quickstart-polkadot.md). З цього стартового пакету ми пройдемо стандартний процес для налаштування та реалізації вашого проекту SubQuery.

1. Ініціалізуйте своє проектне використання `subql init Project_name`.
2. Оновіть файл Manifest (`project.yaml`), щоб включити інформацію про ваш блокчейн та об'єкти, які ви будете відображати - див. [ Manifest File ](./manifest.md)
3. Створення графічних об'єктів у вашій схемі (`схемі. raphql`), що визначає форму даних, які ви будете вилучати і зберігати запити - дивіться [GraphQL Схема](./graphql.md)
4. Додайте всі функції відображення (наприклад, `mappingHandlers.ts`), які ви хочете викликати для перетворення даних ланцюга в визначені вами об'єкти GraphQL - див. [ Mapping ](./mapping.md)
5. Створіть, побудуйте та опублікуйте свій код у проектах SubQuery (або запустіть у власному локальному вузлі) - див. [ Running and Querying your Starter Project ](./quickstart-polkadot.md#running-and-querying-your-starter-project) у нашому швидкому посібнику з запуску.

## Структура каталогу

Наступна карта надає огляд структури каталогів проекту SubQuery, коли запускається команда `init`.

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

![SubQuery структура каталогу](/assets/img/subQuery_directory_stucture.png)

## Генерація коду

Щоразу, коли ви змінюєте об'єкти GraphQL, ви повинні регенерувати каталог типів за допомогою наступної команди.

```
yarn codegen
```

Це створить новий каталог (або оновить існуючий) `src / types`, які містять створені класи сутності для кожного типу, який ви визначили раніше, у `schema.graphql`. Ці класи забезпечують безпечне для типу об'єкт завантаження, читання та запис доступу до полів сутності - детальніше про цей процес див. У [ Схемі GraphQL ](./graphql.md).

## Побудова

Для того, щоб запустити проект SubQuery на локально розміщеному вузлі SubQuery, потрібно спочатку створити свою роботу.

Запустіть команду збірки з кореневого каталогу проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

### Альтернатива будують вибір

Ми підтримуємо додатковим будують вибір для використання проектів підзапиту `subql build`.

З цим ви можете визначити додаткові точки входу, щоб побудувати користування полем експорту в package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Потім бігши `subql build ` це робитиме dist теку з наступною структурою:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Зауважте, що він буде створювати ` index.ts </ 0> чи не вказано в поле експорту. </p>

<p spaces-before="0">Для отримання додаткової інформації про використання цього, включаючи прапори, див. Розділ <a href="https://doc.subquery.network/run_publish/references/#build"> Довідник </ 0>.</p>

<h2 spaces-before="0">Ведення журналу</h2>

<p spaces-before="0">Метод <code>console.log` **більше не підтримується**. Замість цього ` logger ` модуль був введений в типи, який означає, що ми можемо підтримувати лісоруба, який може прийняти різні реєстраційні рівні.

```typescript
logger.info("Інформаційне повідомлення ");
logger.debug("Рівень повідомлення про Debugger ");
logger.warn("Попередження про рівень повідомлень ");
```

Для використання ` logger.info` чи `logger.warn`, просто розмістіть лінію у вашому файлі відображення.

![logging.info](/assets/img/logging_info.png)

Для використання `logger.debug` необхідний додатковий крок. Додайте `--log-level=debug` до вашого командного рядка.

Якщо ви управляєте контейнером докера, додайте цей рядок до вас `docker-compose.yaml` файл.

![logging.debug](/assets/img/logging_debug.png)

Тепер ви повинні побачити новий журнал на екрані терміналу.

![logging.debug](/assets/img/subquery_logging.png)
