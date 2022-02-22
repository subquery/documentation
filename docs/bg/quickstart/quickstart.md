# Кратко ръководство за започване на работа

В този Quick Start  урок ще създадем прост първоначален проект, който можете да използвате като основа за разработване на собствен проект за SubQuery.

В края на този урок ще имате работещ проект за SubQuery, работещ на възел за SubQueryс крайна точка GraphQL, от която можете да поискате данни.

Ако все още не сте го направили, ви предлагаме да разгледате  [terminology](../#terminology)използва се в SubQuery.

## Подготовка

### Местна Среда За Развитие

- [Машинопис](https://www.typescriptlang.org/)Изисква се за компилиране на проект и дефиниране на типове.
- Както CLI на  SubQuery, така и генерираният проект имат зависимости и изискват модерна версия[Node](https://nodejs.org/en/).
- Възлите на подзаявката изискват Docker

### Инсталирайте интерфейса на SubQuery CLI

Инсталирайте CLI SubQuery глобално на вашия терминал с NPM:

```shell
# NPM
npm install -g @subql/cli
```

Моля, имайте предвид, че ние **DO NOT**насърчаване на използването `yarn global`поради лошо управление на зависимостите, което може да доведе до грешки по-късно.

След това можете да стартирате помощ, за да видите наличните команди и употреби, предоставени от CLI

```shell
subql help
```

## Инициализирам Starter SubQuery Project

Вътре в директорията, в която искате да създадете проекта за SubQuery, просто заменете`PROJECT_NAME` използвайки своя собствена и изпълнете командата:

```shell
subql init PROJECT_NAME
```

Ще ви бъдат зададени определени въпроси, когато инициализирате проекта за подзаявка:

- Мрежа: блокчейн мрежа, за индексиране на която ще бъде разработен този проект за подзаявка
- Шаблон: Изберете шаблон за проект за подзаявка, който ще служи като отправна точка за започване на разработката
- Git хранилище (незадължително): посочете Git URL за хранилището, което ще хоства този проект за подзаявка (когато се хоства в подзаявка Explorer)
- Крайна точка на RPC (задължително): посочете URL адреса на websocket (wss) за изпълняваната крайна точка на RPC, която ще бъде по подразбиране за този проект Можете бързо да получите достъп до публични крайни точки за различни мрежи на Polkadot или дори да създадете свой собствен частен специален възел с[OnFinality](https://app.onfinality.io)  или просто използвайте крайната точка по подразбиране на Polkadot. Този RPC възел трябва да бъде архивен възел (да има пълно състояние на веригата).
- Автори( задължително): въведете собственика на този проект за SubQuery тук
- Описание (незадължително): можете да предоставите кратък параграф за вашия проект, който описва какви данни съдържа и какво могат да правят потребителите с него.
- Версия( Задължително): въведете персонализиран номер на версията или използвайте стойността по подразбиране(`1.0.0`)
- Лиценз (задължително): предоставете софтуерен лиценз за този проект или приемете стандартен(`Apache-2.0`)

След като процесът на инициализация приключи, трябва да видите, че в директорията е създадена папка с името на вашия проект. Съдържанието на тази директория трябва да бъде идентично с посоченото в [Directory Structure](../create/introduction.md#directory-structure).

И накрая, в директорията на проекта изпълнете следната команда, за да инсталирате зависимостите на новия проект.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Configure and Build the Starter Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. You will mainly be working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- Показване на Функции в `src/mappings/`директория

За повече информация как да напишете своя собствена подзаявка, разгледайте нашата документация под [Create a Project](../create/introduction.md)

### GraphQL Model Generation

За да [index](../run/run.md)във вашия проект за SubQuery първо трябва да генерирате необходимите модели GraphQL, които сте дефинирали във вашия файл със схема GraphQL(`schema.graphql`). Изпълнете тази команда в основната директория на проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory

## Създайте проект

За да стартирате проекта си за SubQuery на локално хоствана SubQuery, трябва да създадете работата си.

Изпълнете командата за изграждане от основната директория на проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Running and Querying your Starter Project

Although you can quickly publish your new project to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network), the easiest way to run SubQuery nodes locally is in a Docker container, if you don't already have Docker you can install it from [docker.com](https://docs.docker.com/get-docker/).

[_Skip this and publish your new project to SubQuery Projects_](../publish/publish.md)

### Run your SubQuery Project

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. За нов проект, който току-що беше инициализиран, няма да е необходимо да променяте нищо тук, но можете да прочетете повече за файла и настройките в нашия [Run a Project section](../run/run.md)

В директорията на проекта изпълнете следната команда:

```shell
docker-compose pull && docker-compose up
```

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node.

### Subquery на вашия проект

Отворете браузъра си и отидете на [http://localhost:3000](http://localhost:3000).

Трябва да видите площадка GraphQL, показана във File Explorer, и схеми, готови за заявка. В горния десен ъгъл на детската площадка ще намерите _Docs_бутон, който ще отвори чертежа на документацията. Тази документация се генерира автоматично и Ви помага да намерите кои обекти и методи можете да заявите.

За нов първоначален проект за подзаявка можете да опитате следната заявка, за да получите представа как работи или [learn more about the GraphQL Query language](../query/graphql.md).

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

## стъпка

Поздравления, сега имате локално работещ проект за SubQuery, който приема заявки за API на GraphQL за извличане на данни. В следващия урок ще ви покажем как да публикувате новия си проект в[SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network)

[Публикувайте новия си проект SubQuery в проекти](../publish/publish.md)
