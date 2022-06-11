# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. Це чудова основа для початку розробки власного проекту SubQuery.

**Якщо ви шукаєте посібники для Substrate/Polkadot, ви можете прочитати [Посібник із короткого запуску спеціального Substrate/Polkadot](./quickstart-polkadot).**

В кінці цього посібника у вас буде робочий проєкт SubQuery, який працює на вузлі SubQuery з кінцевою точкою GraphQL, з якої можна запитувати дані.

Якщо ви ще цього не зробили, ми пропонуємо вам ознайомитись із [ terminology ](../#terminology), що використовується в SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

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

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

Після завершення процесу ініціалізації ви побачите, що в каталозі створена папка з назвою вашого проекту. Вміст цього каталогу має бути ідентичним тому, що вказано в [Структурі каталогу](../create/introduction.md#directory-structure).

Нарешті, у каталозі проекту виконайте наступну команду, щоб встановити залежності нового проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> ``` оболонка компакт-диск PROJECT_NAME установка yarn ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ``` оболонка компакт-диск PROJECT_NAME npm встановити ``` </CodeGroupItem> </CodeGroup>

## Внесення змін до проекту

У стартовому пакеті, який ви щойно ініціалізували, ми надали стандартну конфігурацію для вашого нового проекту. Ви в основному працюватимете з такими файлами:

1. Схема GraphQL в `schema.graphql`
2. Маніфест проекту в `project.yaml`
3. Картографування функціонує в каталозі ` src / mappings / `

Метою цього короткого посібника є адаптація стандартного стартового проекту, щоб почати індексацію всіх переказів із смарт-контракту bLuna.

### Оновлення файлу схеми GraphQL

Файл `schema.graphql` визначає різні схеми GraphQL. Завдяки тому, як працює мова запитів GraphQL, файл схеми по суті визначає форму ваших даних із SubQuery. Це чудове місце для початку, тому що воно дає змогу заздалегідь визначити кінцеву мету.

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

**Важливо: коли ви вносите будь-які зміни до файлу схеми, переконайтеся, що ви повторно створили каталог типів. Зробіть це зараз.**

<CodeGroup> <CodeGroupItem title="YARN" active> ``` оболонка кодоген yarn ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ``` оболонка npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Згенеровані моделі можна знайти в каталозі `/src/types/models`. Щоб отримати додаткові відомості про файл `schema.graphql`, перегляньте нашу документацію в розділі [Build/GraphQL Schema](../build/graphql.md)

### Оновлення файлу маніфесту проекту

Файл маніфесту проекту (`project.yaml`) можна розглядати як точку входу до вашого проекту, і він визначає більшість деталей про те, як SubQuery буде індексувати та перетворювати дані ланцюга.

Ми не будемо робити багато змін у файлі маніфесту, оскільки він уже налаштований правильно, але нам потрібно змінити наші обробники. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
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

Щоб отримати додаткові відомості про файл маніфесту проекту (`project.yaml`), перегляньте нашу документацію в розділі [Файл збірки/маніфесту](../build/manifest.md)

### Додайте функцію відображення

Функції відображення визначають, як дані ланцюга перетворюються в оптимізовані сутності GraphQL, які ми раніше визначили у файлі `schema.graphql`.

Перейдіть до функції відображення за замовчуванням у каталозі `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

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

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Ми додаємо додаткову інформацію, а потім використовуємо функцію `.save()` для збереження нової сутності (SubQuery автоматично збереже це в базі даних).

Щоб отримати додаткові відомості про функції відображення, перегляньте нашу документацію в розділі [Build/Mappings](../build/mapping.md)

### Створіть проект

Щоб запустити ваш новий проект SubQuery, нам спочатку потрібно створити нашу роботу. Запустіть команду збірки з кореневого каталогу проекту.

<CodeGroup> <CodeGroupItem title="YARN" active> ``` оболонка побудова yarn ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ``` оболонка npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Важливо: щоразу, коли ви вносите зміни у свої функції відображення, вам потрібно буде перебудувати свій проект**

## Запуск і запити вашого проекту

### Запустіть свій проект за допомогою Docker

Кожного разу, коли ви створюєте новий проект SubQuery, ви завжди повинні запускати його локально на своєму комп’ютері, щоб спочатку перевірити його. Найпростіший спосіб зробити це за допомогою Docker.

Уся конфігурація, яка керує запуском вузла SubQuery, визначена в цьому файлі `docker-compose.yml`. Для нового проекту, який щойно ініційовано, вам не потрібно нічого змінювати тут, але ви можете прочитати більше про файл і налаштування в нашому розділі [Запуск проекту](../run_publish/run.md)

У каталозі проекту виконайте таку команду:

<CodeGroup> <CodeGroupItem title="YARN" active> ``` оболонка початок yarn ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ``` оболонка npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Завантаження необхідних пакетів може зайняти деякий час ([`@subql/node`](https://www.npmjs.com/package/@subql/node),

`@subql/query`</7 > і Postgres) вперше, але незабаром ви побачите запущений вузол SubQuery. Будьте терплячі тут.</p> 



### Запитуйте свій проект

Відкрийте свій браузер і перейдіть до [http://localhost:3000](http://localhost:3000).

Ви повинні побачити, що ігровий майданчик GraphQL відображається в провіднику та схеми, які готові до запиту. У верхньому правому куті ігрового майданчика ви знайдете кнопку _ Docs _, яка відкриє розіграш документації. Ця документація генерується автоматично і допомагає вам знайти, які сутності та методи ви можете запитувати.

Для нового початкового проекту SubQuery ви можете спробувати такий запит, щоб зрозуміти, як він працює, або [дізнатися більше про мову Query GraphQL](../run_publish/graphql.md).



```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
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


You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)



### Опублікуйте проект SubQuery

SubQuery надає безкоштовну керовану службу, коли ви можете розгорнути свій новий проект. Ви можете розгорнути його в [SubQuery Projects](https://project.subquery.network) і зробити запит за допомогою нашого [ Explorer](https://explorer.subquery.network).

[Прочитайте посібник, щоб опублікувати свій новий проект у SubQuery Projects](../run_publish/publish.md)



## Настуні кроки

Вітаємо, тепер у вас є локально запущений проект SubQuery, який приймає запити GraphQL API для передачі даних з bLuna.

Тепер, коли ви зрозуміли, як створити базовий проект SubQuery, виникає питання, куди звідси? Якщо ви почуваєтеся впевнено, ви можете перейти до вивчення трьох ключових файлів. Файл маніфесту, схема GraphQL і файл зіставлення в розділі [Створення цих документів](../build/introduction.md).

В іншому випадку перейдіть до нашого [розділу Академія](../academy/academy.md), де є докладніші семінари, навчальні посібники та приклади проектів. Там ми розглянемо більш просунуті модифікації та глибше зануримось у запуск проектів SubQuery, запустивши легкодоступні проекти з відкритим кодом.

Нарешті, якщо ви шукаєте більше способів запустити та опублікувати свій проект, наш [розділ «Виконати та опублікувати»](../run_publish/run.md) надає детальну інформацію про всі способи запуску проекту SubQuery та інші розширені функції агрегації та підписки GraphQL.
