# Polkadot Быстрый старт

В этом кратком руководстве мы начнем с простого начального проекта Substrate/Polkadot, а затем закончим индексированием некоторых фактических реальных данных. Это отличная основа для начала разработки собственного Substrate/Polkadot SubQuery проекта.

**Если вы ищете руководства для Terra, вы можете прочитать [краткое руководство пользователя для Terra](./quickstart-terra).**

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
- Network Family: The layer-1 blockchain network family that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Polkadot"*
- Network: The specific network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Polkadot"*
- Template: Выберите шаблон проекта SubQuery, который послужит отправной точкой для начала разработки. Мы предлагаем выбрать *"Стартовый проект"*
- Git repository (Опционально): Укажите URL-адрес Git для репозитория, в котором будет размещен этот проект SubQuery (при размещении в SubQuery Explorer)
- RPC endpoint (Обязательно): Укажите URL-адрес HTTPS для работающей конечной точки RPC, которая будет использоваться по умолчанию для этого проекта. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). For this guide we will use the default value *"https://polkadot.api.onfinality.io"*
- Authors (Обязательно): Введите здесь владельца этого проекта SubQuery (например, ваше имя!)
- Description (Опционально): Вы можете предоставить короткий абзац о своем проекте, описывающий, какие данные он содержит и что пользователи могут с ним делать
- Version (Обязательно): Введите собственный номер версии или используйте версию по умолчанию (`1.0.0`)
- License (Обязательно): Предоставьте лицензию на программное обеспечение для этого проекта или примите лицензию по умолчанию (`Apache-2.0`)

После завершения процесса инициализации вы должны увидеть, что внутри каталога создана папка с названием вашего проекта. Содержимое этого каталога должно совпадать с тем, что указано в [Структуре каталогов](../create/introduction.md#directory-structure).

Наконец, в каталоге проекта выполните следующую команду, чтобы установить зависимости нового проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Внесение изменений в ваш проект

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
  from: String! # Счет, с которого осуществляются переводы
  to: String! # Аккаунт, на который осуществляются переводы
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

Функция `handleEvent` получала данные о событиях всякий раз, когда событие соответствовало фильтрам, которые мы указали ранее в нашем `project.yaml`. Мы собираемся обновить ее, чтобы она обрабатывала все события `balances.Transfer` и сохраняла их в объектах GraphQL, которые мы создали ранее.

Вы можете обновить функцию `handleEvent` следующим образом (обратите внимание на дополнительный импорт):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
    // Получить данные с события
    // Событие balances.transfer имеет следующий пэйлоад \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Создайте новый объект передачи
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

Что мы здесь делаем? Получаем SubstrateEvent, который включает данные о передаче полезной нагрузки. Мы извлекаем эти данные, а затем создаем экземпляр нового объекта `Transfer`, который мы определили ранее в файле `schema.graphql`. Мы добавляем дополнительную информацию, а затем используем функцию `.save()` для сохранения нового объекта (SubQuery автоматически сохранит его в базе данных).

Для получения дополнительной информации о функциях сопоставления ознакомьтесь с нашей документацией в разделе [Build/Mappings](../build/mapping.md)

### Сборка проекта

Чтобы запустить ваш новый проект SubQuery, нам сначала нужно собрать нашу работу. Запустите команду сборки из корневого каталога проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Важно: Всякий раз, когда вы вносите изменения в свои функции сопоставления, вам нужно будет переcобрать свой проект.**

## Запуск и запрос вашего проекта

### Запустите свой проект с помощью Docker

Всякий раз, когда вы создаете новый проект SubQuery, вы всегда должны запускать его локально на своем компьютере, чтобы сначала протестировать его. Проще всего это сделать с помощью Docker.

Вся конфигурация, управляющая запуском узла SubQuery, определяется в этом файле `docker-compose.yml`. Для нового проекта, который был только что инициализирован, вам не нужно ничего здесь менять, но вы можете прочитать больше о файле и настройках в нашем разделе [Запуск проекта](../run_publish/run.md)

В каталоге проекта выполните следующую команду:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Загрузка необходимых пакетов ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) и Postgres) в первый раз может занять некоторое время, но вскоре вы увидите работающий узел SubQuery. Проявите терпение.

### Отправьте запрос своему проекту

Откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000).

Вы должны увидеть, что в проводнике отображается игровая площадка GraphQL и схемы, которые готовы к запросу. В правом верхнем углу игровой площадки вы найдете кнопку _ Документы _, которая откроет розыгрыш документации. Эта документация создается автоматически и помогает вам найти, какие сущности и методы вы можете запрашивать.

Для нового начального проекта SubQuery вы можете попробовать следующий запрос, чтобы понять, как он работает, или [узнать больше о языке запросов GraphQL](../run_publish/graphql.md).

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

SubQuery предоставляет бесплатный управляемый сервис, на котором вы можете развернуть свой новый проект. Вы можете развернуть его в [SubQuery Projects](https://project.subquery.network) и запросить его с помощью нашего [Проводника](https://explorer.subquery.network).

[Ознакомьтесь с руководством по публикации нового проекта в SubQuery Projects](../run_publish/publish.md)

## Следующие шаги

Поздравляем, теперь у вас есть локально работающий проект SubQuery, который принимает запросы GraphQL API для передачи данных.

Теперь, когда вы поняли, как создать базовый проект SubQuery, возникает вопрос: что дальше? Если вы чувствуете себя уверенно, вы можете перейти к более подробному изучению трех ключевых файлов. Файл манифеста, схема GraphQL и файл сопоставлений в разделе ["Сборка" этой документации](../build/introduction.md).

В противном случае перейдите в раздел [Академия](../academy/academy.md), где вы найдете более подробные семинары, учебные пособия и примеры проектов. Там мы рассмотрим более продвинутые модификации и более глубоко погрузимся в выполнение проектов SubQuery, запуская легкодоступные проекты и проекты с открытым исходным кодом.

Наконец, если вы ищете другие способы запуска и публикации своего проекта, наш [Run & Publish Раздел](../run_publish/run.md) содержит подробную информацию обо всех способах запуска вашего проекта SubQuery и других расширенных функциях агрегации и подписки GraphQL.
