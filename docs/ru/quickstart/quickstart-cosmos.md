# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. Это отличная основа для начала разработки собственного проекта SubQuery.

**Если вам нужны руководства для Substrate/Polkadot, вы можете прочитать [краткое руководство по использованию Substrate/Polkadot](./quickstart-polkadot).**

В конце этого руководства у вас будет рабочий проект SubQuery, запущенный на узле SubQuery с конечной точкой GraphQL, из которой вы можете запрашивать данные.

Если вы еще этого не сделали, мы предлагаем вам ознакомиться с [ терминологией ](../#terminology), используемой в SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

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

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

После завершения процесса инициализации вы должны увидеть, что внутри каталога создана папка с названием вашего проекта. Содержимое этого каталога должно совпадать с тем, что указано в [Структуре каталогов](../create/introduction.md#directory-structure).

Наконец, в каталоге проекта выполните следующую команду, чтобы установить зависимости нового проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Внесение изменений в ваш проект

В стартовом пакете, который вы только что инициализировали, мы предоставили стандартную конфигурацию для вашего нового проекта. В основном вы будете работать со следующими файлами:

1. Схема GraphQL в `schema.graphql`
2. Манифест проекта в `project.yaml`
3. Функции сопоставления в каталоге src / mappings /

Целью этого краткого руководства является адаптация стандартного начального проекта для индексации всех переводов из смарт-контракта bLuna.

### Обновление файла схемы GraphQL

Файл `schema.graphql` определяет различные схемы GraphQL. Из-за того, как работает язык запросов GraphQL, файл схемы по существу диктует форму ваших данных из SubQuery. Это отличное место для начала, потому что оно позволяет заранее определить конечную цель.

We're going to update the `schema.graphql` file to read as follows so we can index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**Важно: когда вы вносите какие-либо изменения в файл schema, убедитесь, что вы заново создали каталог типов. Сделайте это сейчас.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Вы найдете сгенерированные модели в каталоге `/src/types/models`. Для получения дополнительной информации о файле `schema.graphql` ознакомьтесь с нашей документацией в разделе [Build/GraphQL Schema](../build/graphql.md)

### Обновление файла Манифеста Проекта

Файл манифеста проекта (`project.yaml`) можно рассматривать как точку входа в ваш проект, и он определяет большинство деталей того, как SubQuery будет индексировать и преобразовывать данные цепочки.

Мы не будем вносить много изменений в файл манифеста, поскольку он уже настроен правильно, но нам нужно изменить наши обработчики. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3082705 # The block when this contract was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Дополнительные сведения о файле манифеста проекта (`project.yaml`) см. в нашей документации в разделе [Build/Manifest File](../build/manifest.md)

### Добавление функции сопоставления

Функции сопоставления определяют, как данные цепочки преобразуются в оптимизированные сущности GraphQL, которые мы ранее определили в файле `schema.graphql`.

Перейдите к функции сопоставления по умолчанию в каталоге `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Мы добавляем дополнительную информацию, а затем используем функцию `.save()` для сохранения нового объекта (SubQuery автоматически сохранит его в базе данных).

Для получения дополнительной информации о функциях сопоставления ознакомьтесь с нашей документацией в разделе [Build/Mappings](../build/mapping.md)

### Сборка проекта

Чтобы запустить ваш новый проект SubQuery, нам сначала нужно собрать нашу работу. Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Важно: всякий раз, когда вы вносите изменения в свои функции сопоставления, вам нужно будет пересобрать свой проект**.

## Запуск и запрос вашего проекта

### Запустите свой проект с помощью Docker

Всякий раз, когда вы создаете новый проект подзапроса, вы всегда должны запускать его локально на своем компьютере, чтобы сначала протестировать его. Проще всего это сделать с помощью Docker.

Вся конфигурация, управляющая запуском узла SubQuery, определяется в этом файле `docker-compose.yml`. Для нового проекта, который был только что инициализирован, вам не нужно ничего здесь менять, но вы можете прочитать больше о файле и настройках в нашем разделе [Запуск проекта](../run_publish/run.md)

В каталоге проекта выполните следующую команду:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Загрузка необходимых пакетов ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) и Postgres) в первый раз может занять некоторое время, но вскоре вы увидите работающий узел SubQuery. Проявите терпение.

### Отправьте запрос своему проекту

Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000).

Вы должны увидеть, что в проводнике отображается игровая площадка GraphQL и схемы, которые готовы к запросу. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

Для нового начального проекта SubQuery вы можете попробовать следующий запрос, чтобы понять, как он работает, или [узнать больше о языке запросов GraphQL](../run_publish/graphql.md).

```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

### Опубликуйте свой проект SubQuery

SubQuery предоставляет бесплатный управляемый сервис, на котором вы можете развернуть свой новый проект. Вы можете развернуть его в [SubQuery Projects](https://project.subquery.network) и запросить его с помощью нашего [Проводника](https://explorer.subquery.network).

[Ознакомьтесь с руководством по публикации нового проекта в SubQuery Projects](../run_publish/publish.md)

## Следующие шаги

Поздравляем, теперь у вас есть локально работающий проект SubQuery, который принимает запросы API GraphQL для передачи данных от bLuna.

Теперь, когда вы поняли, как создать базовый проект SubQuery, возникает вопрос: что дальше? Если вы чувствуете себя уверенно, вы можете перейти к более подробному изучению трех ключевых файлов. Файл манифеста, схема GraphQL и файл сопоставлений в разделе ["Сборка" этой документации](../build/introduction.md).

В противном случае перейдите в раздел [Академия](../academy/academy.md), где вы найдете более подробные семинары, учебные пособия и примеры проектов. Там мы рассмотрим более продвинутые модификации и более глубоко погрузимся в выполнение проектов SubQuery, запуская легкодоступные проекты и проекты с открытым исходным кодом.

Наконец, если вы ищете другие способы запуска и публикации своего проекта, наш [Run & Publish Раздел](../run_publish/run.md) содержит подробную информацию обо всех способах запуска вашего проекта SubQuery и других расширенных функциях агрегации и подписки GraphQL.
