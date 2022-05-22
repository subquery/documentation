# Polkadot Быстрый старт

In this quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. Это отличная основа для начала разработки собственного Substrate/Polkadot SubQuery проекта.

В конце этого руководства у вас будет рабочий проект SubQuery, запущенный на узле SubQuery с конечной точкой GraphQL, из которой вы можете запрашивать данные.

Если вы еще этого не сделали, мы предлагаем вам ознакомиться с [ терминологией ](../#terminology), используемой в SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot, it should only take 10-15 minutes**

## Подготовка

### Локальная среда разработки

- [Node](https://nodejs.org/en/): современная (например, LTS-версия) установка Node.
- [Docker](https://docker.com/): в этом руководстве будет использоваться Docker

### Установите SubQuery CLI

Установите SubQuery CLI глобально на свой терминал с помощью NPM:

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to errors down the line.

You can then run help to see available commands and usage provided by the CLI:

```shell
помощь subql
```

## Инициализируем Начальный Проект SubQuery

Внутри каталога, в котором вы хотите создать проект SubQuery, для начала просто выполните следующую команду:

```shell
subql init
```

По мере инициализации проекта SubQuery вам будут заданы определенные вопросы:

- Project name: A project name for your SubQuery project
- Network family: The layer-1 blockchain network family that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Substrate"*
- Network: The specific network that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Polkadot"*
- Template project: Select a SubQuery template project that will provide a starting point to begin development. We suggest selecting the *"subql-starter"* project.
- RPC endpoint: Provide an HTTPS URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). For this guide, we will use the default value *"https://polkadot.api.onfinality.io"*
- Git repository: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- Authors: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- Description: Provide a short paragraph about your project that describes what data it contains and what users can do with it or accept the provided default.
- Version: Enter a custom version number or use the default (`1.0.0`)
- License: Provide the software license for this project or accept the default (`MIT`)

After the initialisation process is complete, you should see that a folder with your project name has been created inside the directory. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run the following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. Манифест проекта в `project.yaml`
3. Функции сопоставления в каталоге src / mappings /

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Обновление файла схемы GraphQL

Файл `schema.graphql` определяет различные схемы GraphQL. Из-за того, как работает язык запросов GraphQL, файл схемы по существу диктует форму ваших данных из SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Важно: когда вы вносите какие-либо изменения в файл schema, убедитесь, что вы заново создали каталог типов.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Для получения дополнительной информации о файле `schema.graphql` ознакомьтесь с нашей документацией в разделе [Build/GraphQL Schema](../build/graphql.md)

### Обновление файла Манифеста Проекта

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

Дополнительные сведения о файле манифеста проекта (`project.yaml`) см. в нашей документации в разделе [Build/Manifest File](../build/manifest.md)

### Добавление функции сопоставления

Функции сопоставления определяют, как данные цепочки преобразуются в оптимизированные сущности GraphQL, которые мы ранее определили в файле `schema.graphql`.

Перейдите к функции сопоставления по умолчанию в каталоге `src/mappings`. Вы увидите три экспортированные функции: `handleBlock`, `handleEvent` и `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

Вы можете обновить функцию `handleEvent` следующим образом (обратите внимание на дополнительный импорт):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. Мы извлекаем эти данные, а затем создаем экземпляр нового объекта `Transfer`, который мы определили ранее в файле `schema.graphql`. Мы добавляем дополнительную информацию, а затем используем функцию `.save()` для сохранения нового объекта (SubQuery автоматически сохранит его в базе данных).

Для получения дополнительной информации о функциях сопоставления ознакомьтесь с нашей документацией в разделе [Build/Mappings](../build/mapping.md)

### Сборка проекта

In order to run your new SubQuery Project we first need to build our work. Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Проще всего это сделать с помощью Docker.

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Отправьте запрос своему проекту

Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### Опубликуйте свой проект SubQuery

SubQuery provides a free managed service where you can deploy your new project to. Вы можете развернуть его в [SubQuery Projects](https://project.subquery.network) и запросить его с помощью нашего [Проводника](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Следующие шаги

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Теперь, когда вы поняли, как создать базовый проект SubQuery, возникает вопрос: что дальше? Если вы чувствуете себя уверенно, вы можете перейти к более подробному изучению трех ключевых файлов. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. Там мы рассмотрим более продвинутые модификации и более глубоко погрузимся в выполнение проектов SubQuery, запуская легкодоступные проекты и проекты с открытым исходным кодом.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
