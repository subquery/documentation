# Avalanche быстрый старт

В этом кратком руководстве мы начнем с простого начального проекта Avalanche, а затем закончим индексированием актуальных реальных данных. Это отличная основа для начала разработки собственного проекта SubQuery.

**Если вам нужны руководства для Substrate/Polkadot, вы можете прочитать [краткое руководство по использованию Substrate/Polkadot](./quickstart-polkadot).**

В конце этого руководства у вас будет рабочий проект SubQuery, запущенный на узле SubQuery с конечной точкой GraphQL, из которой вы можете запрашивать данные.

Если вы еще этого не сделали, мы предлагаем вам ознакомиться с [ терминологией ](../#terminology), используемой в SubQuery.

**Цель этого краткого руководства - проиндексировать все журналы токена Pangolin _Approve_, это займет всего 10-15 минут.**

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
- Семейство сетей: Семейство блокчейн-сетей первого уровня, для индексации которого будет разработан этот проект SubQuery. Используйте клавиши со стрелками на клавиатуре, чтобы выбрать один из вариантов, в данном руководстве мы будем использовать _ "Avalanche"_.
- Сеть: Конкретная сеть, для индексации которой будет разработан этот проект SubQuery, используйте клавиши со стрелками на клавиатуре, чтобы выбрать один из вариантов, для данного руководства мы будем использовать _ "Avalanche"_.
- Шаблон: Выберите шаблон проекта SubQuery, который станет отправной точкой для начала разработки, мы предлагаем выбрать _ "Starter project"_.
- Git repository (Опционально): Укажите URL-адрес Git для репозитория, в котором будет размещен этот проект SubQuery (при размещении в SubQuery Explorer)
- RPC endpoint (Обязательно): Укажите URL-адрес HTTPS для работающей конечной точки RPC, которая будет использоваться по умолчанию для этого проекта. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). В данном руководстве мы будем использовать значение по умолчанию _ "avalanche.api.onfinality.io"_.
- Authors (Обязательно): Введите здесь владельца этого проекта SubQuery (например, ваше имя!)
- Description (Опционально): Вы можете предоставить короткий абзац о своем проекте, описывающий, какие данные он содержит и что пользователи могут с ним делать
- Version (Обязательно): Введите собственный номер версии или используйте версию по умолчанию (`1.0.0`)
- License (Обязательно): Предоставьте лицензию на программное обеспечение для этого проекта или примите лицензию по умолчанию (`Apache-2.0`)

После завершения процесса инициализации вы должны увидеть, что внутри каталога создана папка с названием вашего проекта. Содержимое этого каталога должно совпадать с тем, что указано в [Структуре каталогов](../create/introduction.md#directory-structure).

Наконец, в каталоге проекта выполните следующую команду, чтобы установить зависимости нового проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. В основном вы будете работать со следующими файлами:

1. Схема GraphQL в `schema.graphql`
2. Манифест проекта в `project.yaml`
3. Функции сопоставления в каталоге src / mappings /

The goal of this quick start guide is to adapt the standard starter project to index all Pangolin `Approve` transaction logs.

### Обновление файла схемы GraphQL

Файл `schema.graphql` определяет различные схемы GraphQL. Из-за того, как работает язык запросов GraphQL, файл схемы по существу диктует форму ваших данных из SubQuery. Это отличное место для начала, потому что оно позволяет заранее определить конечную цель.

Мы собираемся обновить файл `schema.graphql`, чтобы удалить все существующие объекты и увидеть следующее

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNumber: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```

**Важно: когда вы вносите какие-либо изменения в файл schema, убедитесь, что вы заново создали каталог типов. Сделайте это сейчас.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Для получения дополнительной информации о файле `schema.graphql` ознакомьтесь с нашей документацией в разделе [Build/GraphQL Schema](../build/graphql.md)

### Обновление файла Манифеста Проекта

Файл манифеста проекта (`project.yaml`) можно рассматривать как точку входа в ваш проект, и он определяет большинство деталей того, как SubQuery будет индексировать и преобразовывать данные цепочки.

Мы не будем вносить много изменений в файл манифеста, поскольку он уже настроен правильно, но нам нужно изменить наши обработчики. Remember we are planning to index all Pangolin approval logs, as a result, we need to update the `datasources` section to read the following.

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

This means we'll run a `handleLog` mapping function each and every time there is a `approve` log on any transaction from the [Pangolin contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

Дополнительные сведения о файле манифеста проекта (`project.yaml`) см. в нашей документации в разделе [Build/Manifest File](../build/manifest.md)

### Добавление функции сопоставления

Функции сопоставления определяют, как данные цепочки преобразуются в оптимизированные сущности GraphQL, которые мы ранее определили в файле `schema.graphql`.

Перейдите к функции сопоставления по умолчанию в каталоге `src/mappings`. You'll see three exported functions, `handleBlock`, `handleLog`, and `handleTransaction`. You can delete both the `handleBlock` and `handleTransaction` functions, we are only dealing with the `handleLog` function.

The `handleLog` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `approval` transaction logs and save them to the GraphQL entities that we created earlier.

You can update the `handleLog` function to the following (note the additional imports):

```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```

What this is doing is receiving an Avalanche Log which includes the transation log data on the payload. Мы извлекаем эти данные, а затем создаем экземпляр нового объекта `PangolinApproval`, который мы определили ранее в файле `schema.graphql`. Мы добавляем дополнительную информацию, а затем используем функцию `.save()` для сохранения нового объекта (SubQuery автоматически сохранит его в базе данных).

Для получения дополнительной информации о функциях сопоставления ознакомьтесь с нашей документацией в разделе [Build/Mappings](../build/mapping.md)

### Сборка проекта

Чтобы запустить ваш новый проект SubQuery, нам сначала нужно собрать нашу работу. Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker.

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. Для нового проекта, который был только что инициализирован, вам не нужно ничего здесь менять, но вы можете прочитать больше о файле и настройках в нашем разделе [Запуск проекта](../run_publish/run.md)

В каталоге проекта выполните следующую команду:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Проявите терпение.

### Отправьте запрос своему проекту

Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000).

Вы должны увидеть, что в проводнике отображается игровая площадка GraphQL и схемы, которые готовы к запросу. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

Для нового начального проекта SubQuery вы можете попробовать следующий запрос, чтобы понять, как он работает, или [узнать больше о языке запросов GraphQL](../run_publish/graphql.md).

```graphql
query {
  pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

### Опубликуйте свой проект SubQuery

SubQuery предоставляет бесплатный управляемый сервис, на котором вы можете развернуть свой новый проект. Вы можете развернуть его в [SubQuery Projects](https://project.subquery.network) и запросить его с помощью нашего [Проводника](https://explorer.subquery.network).

[Прочитайте руководство по публикации вашего нового проекта в SubQuery Projects](../run_publish/publish.md). **Обратите внимание, что развертывание необходимо выполнять через IPFS**.

## Следующие шаги

Поздравляем, теперь у вас есть локально работающий проект SubQuery, который принимает запросы API GraphQL для передачи данных от bLuna.

Теперь, когда вы поняли, как создать базовый проект SubQuery, возникает вопрос: что дальше? Если вы чувствуете себя уверенно, вы можете перейти к более подробному изучению трех ключевых файлов. Файл манифеста, схема GraphQL и файл сопоставлений в разделе ["Сборка" этой документации](../build/introduction.md).

В противном случае перейдите в раздел [Академия](../academy/academy.md), где вы найдете более подробные семинары, учебные пособия и примеры проектов. Там мы рассмотрим более продвинутые модификации и более глубоко погрузимся в выполнение проектов SubQuery, запуская легкодоступные проекты и проекты с открытым исходным кодом.

Наконец, если вы ищете другие способы запуска и публикации своего проекта, наш [Run & Publish Раздел](../run_publish/run.md) содержит подробную информацию обо всех способах запуска вашего проекта SubQuery и других расширенных функциях агрегации и подписки GraphQL.
