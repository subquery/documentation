# Швидкий старт Polkadot

У цьому короткому посібнику ми почнемо з простого початкового проекту Substrate/Polkadot, а потім завершимо індексацією деяких фактичних реальних даних. Це чудова основа для початку розробки власного проекту Substrate/Polkadot SubQuery.

**Якщо ви шукаєте посібники для Terra, ви можете прочитати [короткий посібник із застосування Terra](./quickstart-terra).**

В кінці цього посібника у вас буде робочий проєкт SubQuery, який працює на вузлі SubQuery з кінцевою точкою GraphQL, з якої можна запитувати дані.

Якщо ви ще цього не зробили, ми пропонуємо вам ознайомитись із [ terminology ](../#terminology), що використовується в SubQuery.

**Метою цього короткого посібника є адаптація стандартного стартового проекту, щоб почати індексацію всіх переказів з Polkadot, це займе всього 10-15 хвилин**

## Підготовка

### Місцеве середовище розвитку

- [Node](https://nodejs.org/en/): сучасна (наприклад, версія LTS) інсталяція Node.
- [Docker](https://docker.com/): у цьому посібнику буде використовуватися необхідний Docker

### Встановити SubQuery CLI

Встановіть SubQuery CLI глобально на свій термінал за допомогою NPM:

```shell
# NPM
npm install -g @subql/cli
```

Зауважте, що ми **НЕ** заохочуємо використання `yarn global` для встановлення `@subql/cli` через погане керування залежностями, що може призвести до помилки в подальшому.

Потім ви можете запустити довідку, щоб побачити доступні команди та використання, надані CLI

```shell
subql help
```

## Ініціалізуйте проект SubQuery Starter

У каталозі, в якому ви хочете створити проект SubQuery, просто виконайте таку команду, щоб почати.

```shell
subql init
```

Під час ініціалізації проекту SubQuery вам зададуть певні запитання:

- Ім'я: ім'я вашого проекту SubQuery
- Сімейство мереж: Сімейство мережі блокчейну рівня 1, для індексації якого буде розроблено цей проект SubQuery, використовуйте клавіші зі стрілками на клавіатурі, щоб вибрати один із варіантів, для цього посібника ми будемо використовувати *"Polkadot"*
- Мережа: конкретна мережа, для індексації якої буде розроблено цей проект SubQuery, використовуйте клавіші зі стрілками на клавіатурі, щоб вибрати один із параметрів, для цього посібника ми будемо використовувати *"Polkadot"*
- Шаблон: виберіть шаблон проекту SubQuery, який буде відправною точкою для початку розробки, ми пропонуємо вибрати *"Початковий проект"*
- Репозиторій Git (необов’язково): надайте URL-адресу Git до репозиторію, в якому буде розміщено цей проект SubQuery (якщо він розміщено в SubQuery Explorer)
- Кінцева точка RPC (обов’язково): надайте URL-адресу HTTPS для запущеної кінцевої точки RPC, яка буде використовуватися за замовчуванням для цього проекту. Ви можете швидко отримати доступ до загальнодоступних кінцевих точок для різних мереж Polkadot або навіть створити власний приватний виділений вузол за допомогою [OnFinality](https://app.onfinality.io) або просто використовувати кінцеву точку Polkadot за замовчуванням. Цей вузол RPC повинен бути вузлом архіву (мати стан повного ланцюга). Для цього посібника ми будемо використовувати значення за замовчуванням *"https://polkadot.api.onfinality.io"*
- Автори (обов’язково): Введіть тут власника цього проекту SubQuery (наприклад, ваше ім’я!)
- Опис (необов’язково): ви можете надати короткий абзац про ваш проект, який описує, які дані він містить і що користувачі можуть з ними робити
- Версія (обов’язково): введіть користувацький номер версії або використовуйте стандартний (`1.0.0`)
- Ліцензія (обов’язково): надайте ліцензію на програмне забезпечення для цього проекту або прийміть стандартну (`Apache-2.0`)

Після завершення процесу ініціалізації ви побачите, що в каталозі створена папка з назвою вашого проекту. Вміст цього каталогу має бути ідентичним тому, що вказано в [Структурі каталогу](../create/introduction.md#directory-structure).

Нарешті, у каталозі проекту виконайте наступну команду, щоб встановити залежності нового проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. You will mainly be working on the following files:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest in `project.yaml`
3. Картографування функціонує в каталозі ` src / mappings / `

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Updating your GraphQL Schema File

The `schema.graphql` file defines the various GraphQL schemas. Due to the way that the GraphQL query language works, the schema file essentially dictates the shape of your data from SubQuery. Its a great place to start becuase it allows you to define your end goal up front.

We're going to update the `schema.graphql` file to read as follows

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Important: When you make any changes to the schema file, please ensure that you regenerate your types directory. Do this now.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. For more information about the `schema.graphql` file, check out our documentation under [Build/GraphQL Schema](../build/graphql.md)

### Updating the Project Manifest File

The Projet Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

We won't do many changes to the manifest file as it already has been setup correctly, but we need to change our handlers. Remember we are planning to index all Polkadot transfers, as a result, we need to update the `datasources` section to read the following.

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

For more information about the Project Manifest (`project.yaml`) file, check out our documentation under [Build/Manifest File](../build/manifest.md)

### Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You'll see three exported functions, `handleBlock`, `handleEvent`, and `handleCall`. You can delete both the `handleBlock` and `handleCall` functions, we are only dealing with the `handleEvent` function.

The `handleEvent` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

You can update the `handleEvent` function to the following (note the additional imports):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
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

What this is doing is receiving a SubstrateEvent which includes transfer data on the payload. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### Build the Project

In order run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker.

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run_publish/run.md)

Under the project directory run following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Be patient here.

### Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground is showing in the explorer and the schemas that are ready to query. У верхньому правому куті ігрового майданчика ви знайдете кнопку _ Docs _, яка відкриє розіграш документації. Ця документація генерується автоматично і допомагає вам знайти, які сутності та методи ви можете запитувати.

For a new SubQuery starter project, you can try the following query to get a taste of how it works or [learn more about the GraphQL Query language](../run_publish/graphql.md).

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

### Publish your SubQuery Project

SubQuery provides a free managed service when you can deploy your new project to. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md)

## Next Steps

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Now that you've had an insight into how to build a basic SubQuery project, the question is where to from here? If you are feeling confident, you can jump into learning more about the three key files. The manifest file, the GraphQL schema, and the mappings file under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
