# Швидкий посібник із початку роботи

У цьому посібнику зі швидкого старту ми створимо простий стартовий проєкт, який можна використовувати як основу для розробки власного проєкту SubQuery.

В кінці цього посібника у вас буде робочий проєкт SubQuery, який працює на вузлі SubQuery з кінцевою точкою GraphQL, з якої можна запитувати дані.

Якщо ви ще цього не зробили, ми пропонуємо вам ознайомитись із [ terminology ](../#terminology), що використовується в SubQuery.

## Підготовка

### Місцеве середовище розвитку

- [ Typescript ](https://www.typescriptlang.org/) необхідний для складання проєкту та визначення типів
- Як SubQuery CLI, так і створений Project мають залежності та потребують сучасної версії [ Node ](https://nodejs.org/en/).
- SubQuery Nodes потребують Docker

### Встановити SubQuery CLI

Встановіть SubQuery CLI у всьому світі на свій термінал за допомогою NPM :

```shell
# NPM
npm install -g @subql/cli
```

Зверніть увагу, що ми ** DO NOT ** заохочуємо використовувати ` yarn global </ 1> через погане управління залежністю, що може призвести до помилок у лінії.</p>

<p spaces-before="0">Потім ви можете запустити довідку, щоб побачити доступні команди та використання, надані CLI</p>

<pre><code class="shell">subql help
`</pre>

## Ініціалізувати проект Starter SubQuery

Всередині каталогу, в якому ви хочете створити проєкт SubQuery, просто замініть ` PROJECT_NAME ` на свій власний і запустіть команду:

```shell
subql init PROJECT_NAME
```

Вам будуть задані певні запитання, оскільки проект SubQuery є італізованим:

- Network: A blockchain network that this SubQuery project will be developed to index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

Після завершення процесу ініціалізації ви побачите папку з назвою проекту, створену всередині каталогу. Вміст цього приводу повинен бути ідентичним тому, що вказано в [Directory Structure](../create/introduction.md#directory-structure).

Останнє, у каталозі проектів запустіть наступну команду для встановлення залежностей нового проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Налаштуйте та побудуйте стартовий проект

У стартовому пакеті, який ви тільки що ініціалізували, ми надали стандартну конфігурацію для вашого нового проекту. Ви працюватимете над наступними файлами:

- Маніфест в `проекті .yaml`
- Схема GraphQL в `схемі a.graphql`
- Картографування функціонує в каталозі ` src / mappings / `

Для отримання додаткової інформації про те, як написати власний SubQuery, ознайомтеся з нашою документацією під [ Створити проект ](../create/introduction.md)

### Генерація моделі GraphQL

Для того, щоб [ індексувати ](../run/run.md) ваш проект SubQuery, спочатку потрібно створити необхідні моделі GraphQL, які ви визначили у своєму файлі GraphQL Schema (` schema.graphql `). Запустіть цю команду в корені каталогу проектів.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Ви знайдете створені моделі в каталозі `/src/types/models` directory

## Побудуйте проєкт

Для того, щоб запустити проєкт SubQuery на локально розміщеному вузлі SubQuery, вам потрібно створити свою роботу.

Запустіть команду збірки з кореневого каталогу проєкту.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Запуск та запит на ваш стартовий проект

Хоча ви можете швидко опублікувати свій новий проект на  [SubQuery Projects](https://project.subquery.network)  і запитати його за допомогою нашого [Explorer](https://explorer.subquery.network), найпростіший спосіб локального запуску вузлів SubQuery знаходиться в контейнері Docker, якщо у вас ще немає Docker, ви можете встановити його з [docker.com](https://docs.docker.com/get-docker/).

[_Skip this and publish your new project to SubQuery Projects_](../publish/publish.md)

### Run your SubQuery Project

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. Для нового проекту, який щойно був інтиталізований, вам тут нічого не потрібно буде змінювати, але ви можете прочитати більше про файл та налаштування в нашому розділі [ Запустити проект ](../run/run.md)

У каталозі проекту запустіть наступну команду:

```shell
docker-compose pull && docker-compose up
```

Можливо, знадобиться певний час, щоб завантажити необхідні пакети ([` @ subql / node `](https://www.npmjs.com/package/@subql/node), [` @ subql / query `](https://www.npmjs.com/package/@subql/query) та Postgres) вперше, але незабаром ви побачите запущений вузол SubQuery.

### Запитайте свій проєкт

Відкрийте веб-переглядач і перейдіть до [ http: //localhost: 3000 ](http://localhost:3000).

Ви повинні побачити ігровий майданчик GraphQL, який відображається у досліднику, та схеми, готові до запиту. У верхньому правому куті ігрового майданчика ви знайдете кнопку _ Docs _, яка відкриє розіграш документації. Ця документація генерується автоматично і допомагає вам знайти, які сутності та методи ви можете запитувати.

Для нового стартового проекту SubQuery ви можете спробувати наступний запит, щоб скуштувати, як він працює, або [ дізнатися більше про мову запитів GraphQL ](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Настуні кроки

Вітаємо, тепер у вас є локальний проект SubQuery, який приймає запити GraphQL API для вибіркових даних. У наступному посібнику ми покажемо вам, як опублікувати ваш новий проект на [ Проекти SubQuery ](https://project.subquery.network) та запитайте його за допомогою нашого [ Explorer ](https://explorer.subquery.network)

[Опублікуйте свій новий проект на SubQuery Projects](../publish/publish.md)
