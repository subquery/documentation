# Terra Quick Start

In this Quick start guide, we're going to start with a simple Terra starter project and then finish by indexing some actual real data. Это отличная основа для начала разработки собственного проекта SubQuery.

**If your are looking for guides for Substrate/Polkadot, you can read the [Substrate/Polkadot specific quick start guide](./quickstart-polkadot).**

В конце этого руководства у вас будет рабочий проект SubQuery, запущенный на узле SubQuery с конечной точкой GraphQL, из которой вы можете запрашивать данные.

Если вы еще этого не сделали, мы предлагаем вам ознакомиться с [ терминологией ](../#terminology), используемой в SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Terra, it should only take 10-15 minutes**

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
- Network: A blockchain network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Terra"*
- Template: Выберите шаблон проекта SubQuery, который послужит отправной точкой для начала разработки. Мы предлагаем выбрать *"Стартовый проект"*
- Git repository (Опционально): Укажите URL-адрес Git для репозитория, в котором будет размещен этот проект SubQuery (при размещении в SubQuery Explorer)
- RPC endpoint (Обязательно): Укажите URL-адрес HTTPS для работающей конечной точки RPC, которая будет использоваться по умолчанию для этого проекта. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). For this guide we will use the default value *"https://terra-columbus-5.beta.api.onfinality.io"*
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

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from the bLuna smart contract.

### Обновление файла схемы GraphQL

Файл `schema.graphql` определяет различные схемы GraphQL. Из-за того, как работает язык запросов GraphQL, файл схемы по существу диктует форму ваших данных из SubQuery. Это отличное место для начала, потому что оно позволяет заранее определить конечную цель.

Мы собираемся обновить файл `schema.graphql`, чтобы он читался следующим образом

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  txHash: String!
  blockHeight: BigInt # The block height of the transfer
  sender: String! # The account that transfers are made from
  recipient: String! # The account that transfers are made to
  amount: String! # Amount that is transferred
}
```

**Важно: когда вы вносите какие-либо изменения в файл schema, убедитесь, что вы заново создали каталог типов. Сделайте это сейчас.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Для получения дополнительной информации о файле `schema.graphql` ознакомьтесь с нашей документацией в разделе [Build/GraphQL Schema](../build/graphql.md)

### Обновление файла Манифеста Проекта

Файл манифеста проекта (`project.yaml`) можно рассматривать как точку входа в ваш проект, и он определяет большинство деталей того, как SubQuery будет индексировать и преобразовывать данные цепочки.

Мы не будем вносить много изменений в файл манифеста, поскольку он уже настроен правильно, но нам нужно изменить наши обработчики. Remember we are planning to index all Terra transfer events, as a result, we need to update the `datasources` section to read the following.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

This means we'll run a `handleEvent` mapping function each and every time there is a `transfer` event from the bLuna smart contract.

Дополнительные сведения о файле манифеста проекта (`project.yaml`) см. в нашей документации в разделе [Build/Manifest File](../build/manifest.md)

### Добавление функции сопоставления

Функции сопоставления определяют, как данные цепочки преобразуются в оптимизированные сущности GraphQL, которые мы ранее определили в файле `schema.graphql`.

Перейдите к функции сопоставления по умолчанию в каталоге `src/mappings`. Вы увидите три экспортированные функции: `handleBlock`, `handleEvent` и `handleCall`. Вы можете удалить обе функции `handleBlock` и `handleCall`, мы имеем дело только с функцией `handleEvent`.

Функция `handleEvent` получала данные о событиях всякий раз, когда событие соответствовало фильтрам, которые мы указали ранее в нашем `project.yaml`. We are going to update it to process all `transfer` events and save them to the GraphQL entities that we created earlier.

Вы можете обновить функцию `handleEvent` следующим образом (обратите внимание на дополнительный импорт):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));

    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

Что мы здесь делаем? Получаем SubstrateEvent, который включает данные о передаче полезной нагрузки. Мы извлекаем эти данные, а затем создаем экземпляр нового объекта `Transfer`, который мы определили ранее в файле `schema.graphql`. Мы добавляем дополнительную информацию, а затем используем функцию `.save()` для сохранения нового объекта (SubQuery автоматически сохранит его в базе данных).

Для получения дополнительной информации о функциях сопоставления ознакомьтесь с нашей документацией в разделе [Build/Mappings](../build/mapping.md)

### Сборка проекта

Чтобы запустить ваш новый проект SubQuery, нам сначала нужно собрать нашу работу. Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Проще всего это сделать с помощью Docker.

Вся конфигурация, управляющая запуском узла SubQuery, определяется в этом файле `docker-compose.yml`. Для нового проекта, который был только что инициализирован, вам не нужно ничего здесь менять, но вы можете прочитать больше о файле и настройках в нашем разделе [Запуск проекта](../run_publish/run.md)

В каталоге проекта выполните следующую команду:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Проявите терпение.

### Отправьте запрос своему проекту

Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000).

Вы должны увидеть, что в проводнике отображается игровая площадка GraphQL и схемы, которые готовы к запросу. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

Для нового начального проекта SubQuery вы можете попробовать следующий запрос, чтобы понять, как он работает, или [узнать больше о языке запросов GraphQL](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

### Опубликуйте свой проект SubQuery

SubQuery предоставляет бесплатный управляемый сервис, на котором вы можете развернуть свой новый проект. Вы можете развернуть его в [SubQuery Projects](https://project.subquery.network) и запросить его с помощью нашего [Проводника](https://explorer.subquery.network).

[Ознакомьтесь с руководством по публикации нового проекта в SubQuery Projects](../run_publish/publish.md)

## Следующие шаги

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data from bLuna.

Теперь, когда вы поняли, как создать базовый проект SubQuery, возникает вопрос: что дальше? Если вы чувствуете себя уверенно, вы можете перейти к более подробному изучению трех ключевых файлов. Файл манифеста, схема GraphQL и файл сопоставлений в разделе ["Сборка" этой документации](../build/introduction.md).

В противном случае перейдите в раздел [Академия](../academy/academy.md), где вы найдете более подробные семинары, учебные пособия и примеры проектов. Там мы рассмотрим более продвинутые модификации и более глубоко погрузимся в выполнение проектов SubQuery, запуская легкодоступные проекты и проекты с открытым исходным кодом.

Наконец, если вы ищете другие способы запуска и публикации своего проекта, наш [Run & Publish Раздел](../run_publish/run.md) содержит подробную информацию обо всех способах запуска вашего проекта SubQuery и других расширенных функциях агрегации и подписки GraphQL.
