# Добро пожаловать

В этом кратком руководстве мы начнем с простого начального проекта, а затем закончим индексированием реальных актуальных данных. Это отличная основа для начала разработки собственного проекта SubQuery.

В конце этого руководства у вас будет рабочий проект SubQuery, запущенный на узле SubQuery с конечной точкой GraphQL, из которой вы можете запрашивать данные.

Если вы еще этого не сделали, мы предлагаем вам ознакомиться с [ терминологией ](../#terminology), используемой в SubQuery.

**Целью этого краткого руководства является адаптация стандартного базового проекта для начала индексации всех переводов из Polkadot, это займет всего 10-15 минут**

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

Обратите внимание, что мы **НЕ** рекомендуем использовать `yarn global` для установки `@subql/cli` из-за плохого управления зависимостями, что может привести к ошибке в дальнейшем.

Затем вы можете запустить справку, чтобы увидеть доступные команды и варианты применения, предоставляемые CLI

```shell
помощь subql
```

## Инициализируем Начальный Проект SubQuery

Внутри каталога, в котором вы хотите создать проект SubQuery, для начала просто выполните следующую команду:

```shell
subql init
```

По мере инициализации проекта SubQuery вам будут заданы определенные вопросы:

- Name: имя для вашего проекта SubQuery
- Network: Блокчейн-сеть, для индексирования которой будет разработан этот проект SubQuery, используйте клавиши со стрелками на клавиатуре, чтобы выбрать один из вариантов, в этом руководстве мы будем использовать *"Polkadot"*
- Template: Выберите шаблон проекта SubQuery, который послужит отправной точкой для начала разработки. Мы предлагаем выбрать *"Стартовый проект"*
- Git repository (Опционально): Укажите URL-адрес Git для репозитория, в котором будет размещен этот проект SubQuery (при размещении в SubQuery Explorer)
- RPC endpoint (Обязательно): Укажите URL-адрес HTTPS для работающей конечной точки RPC, которая будет использоваться по умолчанию для этого проекта. Вы можете быстро получить доступ к общедоступным конечным точкам для различных сетей Polkadot или даже создать свой собственный выделенный узел с помощью [OnFinality](https://app.onfinality.io) или просто использовать конечную точку Polkadot по умолчанию. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). В этом руководстве мы будем использовать значение по умолчанию *"https://polkadot.api.onfinality.io"*
- Authors (Обязательно): Введите здесь владельца этого проекта SubQuery (например, ваше имя!)
- Description (Опционально): Вы можете предоставить короткий абзац о своем проекте, описывающий, какие данные он содержит и что пользователи могут с ним делать
- Version (Обязательно): Введите собственный номер версии или используйте версию по умолчанию (`1.0.0`)
- License (Обязательно): Предоставьте лицензию на программное обеспечение для этого проекта или примите лицензию по умолчанию (`Apache-2.0`)

После завершения процесса инициализации вы должны увидеть, что внутри каталога создана папка с названием вашего проекта. Содержимое этого каталога должно совпадать с тем, что указано в [Структуре каталогов](../create/introduction.md#directory-structure).

Наконец, в каталоге проекта выполните следующую команду, чтобы установить зависимости нового проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd ИМЯ_ПРОЕКТА yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd ИМЯ_ПРОЕКТА npm install ``` </CodeGroupItem> </CodeGroup>

## Внесение изменений в проект

В стартовом пакете, который вы только что инициализировали, мы предоставили стандартную конфигурацию для вашего нового проекта. В основном вы будете работать со следующими файлами:

1. Схема GraphQL в `schema.graphql`
2. Манифест проекта в `project.yaml`
3. Функции сопоставления в каталоге src / mappings /

Целью этого краткого руководства является адаптация стандартного начального проекта для начала индексации всех переводов из Polkadot.

### Обновление файла схемы GraphQL

Файл `schema.graphql` определяет различные схемы GraphQL. Из-за того, как работает язык запросов GraphQL, файл схемы по существу диктует форму ваших данных из SubQuery. Это отличное место для начала, потому что оно позволяет заранее определить конечную цель.

Мы собираемся обновить файл `schema.graphql`, чтобы он читался следующим образом

```graphql
type Transfer @entity {
  id: ID! # Поле id всегда обязательно и должно выглядеть так
  amount: BigInt # Сумма, которая передается
  blockNumber: BigInt # Высота блока передачи
  from: Account! # Аккаунт, с которого осуществляются переводы
  to: Account! # Аккаунт, на который осуществляются переводы
}
```

**Важно: когда вы вносите какие-либо изменения в файл schema, убедитесь, что вы заново создали каталог типов. Сделайте это сейчас.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Вы найдете сгенерированные модели в каталоге `/src/types/models`. Для получения дополнительной информации о файле `schema.graphql` ознакомьтесь с нашей документацией в разделе [Build/GraphQL Schema](../build/graphql.md)

### Обновление файла Манифеста Проекта

Файл манифеста проекта (`project.yaml`) можно рассматривать как точку входа в ваш проект, и он определяет большинство деталей того, как SubQuery будет индексировать и преобразовывать данные цепочки.

Мы не будем вносить много изменений в файл манифеста, поскольку он уже настроен правильно, но нам нужно изменить наши обработчики. Помните, что мы планируем индексировать все передачи Polkadot, поэтому нам нужно обновить раздел `datasources`, чтобы прочитать следующее.

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

Это означает, что мы будем запускать функцию сопоставления `handleEvent` каждый раз, когда происходит событие `balances.Transfer`.

Дополнительные сведения о файле манифеста проекта (`project.yaml`) см. в нашей документации в разделе [Build/Manifest File](../build/manifest.md)

### Добавление функции сопоставления

Функции сопоставления определяют, как данные цепочки преобразуются в оптимизированные сущности GraphQL, которые мы ранее определили в файле `schema.graphql`.

Перейдите к функции сопоставления по умолчанию в каталоге `src/mappings`. Вы увидите три экспортированные функции: `handleBlock`, `handleEvent` и `handleCall`. Вы можете удалить обе функции `handleBlock` и `handleCall`, мы имеем дело только с функцией `handleEvent`.

Функция `handleEvent` получала данные о событиях всякий раз, когда событие соответствовало фильтрам, которые мы указали ранее в нашем `project.yaml`. We are going to update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

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

You should see a GraphQL playground is showing in the explorer and the schemas that are ready to query. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

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
