# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. Това е перфекта основа, с която да започнете при разработка свой собствен проект SubQuery.

**Ако търсите ръководства за Substrate/Polkadot, можете да прочетете [Специфичното за субстрат/Polkadot ръководство за бързо начало](./quickstart-polkadot).**

В края на това ръководство ще получите работещ SubQuery проект, стартиран върху нодата SubQuery и с крайна точка GraphQL, от която можете да изисквате необходими данни.

Ако все още не сте го направили, ви предлагаме да разгледате [терминологията](../#terminology)използвана в SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

## Подготовка

### Локална Среда за Разработка

- [Node](https://nodejs.org/en/): Модерна (например LTS версия) инсталация на Node.
- [Docker](https://docker.com/): В това ръководство ще бъде използван Docker

### Инсталирайте SubQuery CLI

Инсталирайте SubQuery CLI глобално на вашият терминал с помощта на NPM:

```shell
# NPM
npm install -g @subql/cli
```

Обърнете внимание, ние **НЕ** препоръчваме използването на `yarn global` за инсталиране на `@subql/cli` поради лошото управление на зависимостите, което може да доведе до грешки в бъдеще.

След това можете да стартирате помощ, за да видите наличните команди и начините на използване, предоставени от CLI

```shell
subql помощ
```

## Инициализиране на Стартов Проект в SubQuery

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

След като процесът на инициализация приключи, трябва да видите, че в директорията е създадена папка с името на вашия проект. Съдържанието на тази директория трябва да бъде идентично с посоченото в [Структурата на директорията](../create/introduction.md#directory-structure).

И накрая, в директорията на проекта изпълнете следната команда, за да инсталирате зависимостите на новия проект.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Промени във вашият проект

В стартовия пакет, който току-що инициализирахте, ние сме предоставили стандартна конфигурация за вашия нов проект. Основно ще работите върху следните файлове:

1. Схема GraphQL `schema.graphql`
2. Манифест на проекта в `project.yaml`
3. Показване на Функции в директорията `src/mappings/`

Целта на това ръководство за бързо стартиране е да адаптира стандартния стартов проект, за да започне индексирането на всички трансфери от интелигентния договор bLuna.

### Актуализиране на вашия файл със схема на GraphQL

Файлът `schema.graphql` дефинира различните схеми на GraphQL. В зависимост от начина, по който работи езикът за заявки GraphQL, файлът със схемата по същество диктува формата на вашите данни от SubQuery. Това е страхотно място за начало, защото ви позволява предварително да дефинирате крайната си цел.

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

**Важно: Когато правите промени във файла schema, моля, уверете се, че отново сте създали директорията си с типове със следната команда yarn codegen. Направете го сега.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Ще намерите генирираните модели в директорията `/src/types/models`. За повече информация относно файла `schema.graphql`, проверете нашата документация в раздела [Build/GraphQL Schema](../build/graphql.md)

### Обновяване на файла Project Manifest

Файлът Projet Manifest (`project.yaml`) може да се разглежда като начална точка за вашия проект, той определя повечето подробности за това как SubQuery ще индексира и трансформира данните от веригата.

Няма да правим много промени във файла на манифеста, тъй като той вече е настроен правилно, но трябва да променим нашите handlers. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

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

За повече информация относна файла Project Manifest (`project.yaml`), проверете документацията ни в раздела [Build/Manifest File](../build/manifest.md)

### Добавяне на Mappring функция

Mapping функциите определят как данните от веригата се трансформират в оптимизирани обекти GraphQL, които по-рано сме дефинирали във файла `schema.graphql`.

Преминете към функцията за картографиране по подразбиране в директорията `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

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

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Добавяме допълнителна информация и след това използваме функцията `.save()` за запазване на новият обект (SubQuery автоматично ще го съхрани в базата данни).

За повече информация относно mapping функциите вижте нашата документация под[Build/Mappings](../build/mapping.md)

### Изграждане на проект

За да стартираме вашия нов проект SubQuery, първо трябва да изградим нашата работа. Изпълнете командата за изграждане от основната директория на проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

** Важно: Всеки път, когато правите промени във вашите mapping функции, ще трябва да изградите отново своя проект**

## Стартиране и запитване във вашия проект

### Стартиране на вашия проект с Docker

Всеки път, когато създавате нов проект на SubQuery, винаги трябва да го стартирате локално на вашия компютър, за да го тествате първо. Най-лесният начин да се направи това е чрез Docker.

Всички конфигурации, които контролират изпълнението на нодата SubQuery, са дефинирани в този файл `docker-compose.yml`. За нов проект, който току-що беше инициализиран, няма да е необходимо да променяте нищо, но можете да прочетете повече за файла и настройките в нашата [Секция за стартиране на Проекта](../run_publish/run.md)

В директорията на проекта изпълнете следната команда:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Изтеглянето на необходимите пакети може да отнеме известно време ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) за първи път, но скоро ще видите работеща нода SubQuery. Бъдете търпеливи.

### Направете заявка за вашият проект

Отворете браузъра си и отидете на [http://localhost:3000](http://localhost:3000).

Трябва да може да видите платформа GraphQL, показана в explorer, и готовите за заявка схеми. В горния десен ъгъл на playground ще намерите бутон _Docs_, който ще отвори чертеж с документация. Тази документация се генерира автоматично и ви помага да намерите за какви обекти и методи можете да направите заявка.

За нов стартов SubQuery проект можете да опитате следната заявка, за да получите представа как работи или [научете повече относно езика за заявки GraphQL ](../run_publish/graphql.md).

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

### Публикувайте своя SubQuery проект

SubQuery предоставя безплатна управлявана услуга, с помощта който можете да разгърнете новия си проект. Може да го разгърнете в [SubQuery Projects](https://project.subquery.network) и да направите запитване с помощта на нашият [Explorer](https://explorer.subquery.network).

[Прочетете ръководството, за да публикувате новия си проект в SubQuery Projects](../run_publish/publish.md)

## Следващите стъпки

Поздравления, вече имате локално работещ SubQuery проект, който приема заявки за GraphQL API за прехвърляне на данни от bLuna.

Сега, когато имате представа как се изгражда базисен SubQuery проект, възниква въпросът: какво да правите по-нататък? Ако се чувствате уверени, можете да започнете да научите повече за трите ключови файла. Файлът на манифеста, схемата GraphQL и mapping файл за съпоставяне в [секцията за изграждане на тези документи](../build/introduction.md).

В противен случай продължете към [раздел Академия](../academy/academy.md), където ще намерите повече обучителни семинари, уроци и примерни проекти. Там ще разгледаме по-разширени модификации и ще се потопим по-дълбоко в изпълнението на проекти на SubQuery, като стартираме лесно достъпни проекти с отворен код.

И накрая, ако търсите повече начини да стартирате и публикувате вашия проект, нашият [Run & Раздел за публикуване](../run_publish/run.md) предоставя подробна информация за всички начини за стартиране на вашия проект SubQuery и други разширени функции за агрегиране и абонамент на GraphQL.
