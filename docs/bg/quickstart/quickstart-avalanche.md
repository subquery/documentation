# Avalanche Quick Start

In this Quick start guide, we're going to start with a simple Avalanche starter project and then finish by indexing some actual real data. Това е перфекта основа, с която да започнете при разработка свой собствен проект SubQuery.

**Ако търсите ръководства за Substrate/Polkadot, можете да прочетете [Специфичното за субстрат/Polkadot ръководство за бързо начало](./quickstart-polkadot).**

В края на това ръководство ще получите работещ SubQuery проект, стартиран върху нодата SubQuery и с крайна точка GraphQL, от която можете да изисквате необходими данни.

Ако все още не сте го направили, ви предлагаме да разгледате [терминологията](../#terminology)използвана в SubQuery.

**The goal of this quick start guide is to index all Pangolin token *Approve* events, it should only take 10-15 minutes**

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

Вътре в директорията, в която искате да създадете проект SubQuery, изпълнете следната команда, за да започнете.

```shell
subql init
```

Ще ви бъдат зададени някои въпроси, по време на инициализирането на проекта SubQuery:

- Name: Име на вашият SubQuery проект
- Network Family: The layer-1 blockchain network family that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Avalanche"*
- Network: The specific network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Avalanche"*
- Template: Изберете шаблон за проекта SubQuery, който ще служи като начална точка за започване на разработка, предлагаме да изберете *"Starter project"*
- Git repository (опционално): посочете Git URL хранилище, в което ще се съхранява този проект SubQuery (при разполагане в SubQuery Explorer)
- RPC endpoint (Необходимо): Укажете HTTPS URL за работеща крайна точка RPC която ще бъде използвана по подразбиране за този проект. Този вид нода RPC трябва да представлява архивна нода (да има състояние на пълна веригата). For this guide we will use the default value *"avalanche.api.onfinality.io"*
- Authors (задължително): въведете собственика на този проект за SubQuery тук (например вашето име!)
- Description (опционално): можете да предоставите кратко описание за вашия проект, който описва какви данни съдържа и какво могат да правят потребителите с него
- Version (Задължително): въведете свой персонализиран номер на версията или използвайте стойността по подразбиране (`1.0.0`)
- License (задължително): предоставете софтуерен лиценз за този проект или потвърдете такъв по подразбиране (`Apache-2.0`)

След като процесът на инициализация приключи, трябва да видите, че в директорията е създадена папка с името на вашия проект. Съдържанието на тази директория трябва да бъде идентично с посоченото в [Структурата на директорията](../create/introduction.md#directory-structure).

И накрая, в директорията на проекта изпълнете следната команда, за да инсталирате зависимостите на новия проект.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Промени във вашият проект

В стартовия пакет, който току-що инициализирахте, ние сме предоставили стандартна конфигурация за вашия нов проект. Основно ще работите върху следните файлове:

1. Схема GraphQL `schema.graphql`
2. Манифест на проекта в `project.yaml`
3. Показване на Функции в директорията `src/mappings/`

The goal of this quick start guide is to adapt the standard starter project to index all Pangolin `Approve` events.

### Актуализиране на вашия файл със схема на GraphQL

Файлът `schema.graphql` дефинира различните схеми на GraphQL. В зависимост от начина, по който работи езикът за заявки GraphQL, файлът със схемата по същество диктува формата на вашите данни от SubQuery. Това е страхотно място за начало, защото ви позволява предварително да дефинирате крайната си цел.

We're going to update the `schema.graphql` file to remove all existing entities and read as follows

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

**Важно: Когато правите промени във файла schema, моля, уверете се, че отново сте създали директорията си с типове със следната команда yarn codegen. Направете го сега.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Ще намерите генирираните модели в директорията `/src/types/models`. За повече информация относно файла `schema.graphql`, проверете нашата документация в раздела [Build/GraphQL Schema](../build/graphql.md)

### Обновяване на файла Project Manifest

Файлът Projet Manifest (`project.yaml`) може да се разглежда като начална точка за вашия проект, той определя повечето подробности за това как SubQuery ще индексира и трансформира данните от веригата.

Няма да правим много промени във файла на манифеста, тъй като той вече е настроен правилно, но трябва да променим нашите handlers. Remember we are planning to index all Pangolin approval events, as a result, we need to update the `datasources` section to read the following.

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
        - handler: handleEvent
          kind: avalanche/EventHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

This means we'll run a `handleApproveTransaction` mapping function each and every time there is a `approve` transaction from the [Pangolin contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

За повече информация относна файла Project Manifest (`project.yaml`), проверете документацията ни в раздела [Build/Manifest File](../build/manifest.md)

### Добавяне на Mappring функция

Mapping функциите определят как данните от веригата се трансформират в оптимизирани обекти GraphQL, които по-рано сме дефинирали във файла `schema.graphql`.

Преминете към функцията за картографиране по подразбиране в директорията `src/mappings`. Ще забележите три експортирани функции, `handleBlock`, `handleEvent`, and `handleCall`. Може да изтриете двете функции `handleBlock` и `handleCall`, ще продължим работа само с функцията `handleEvent`.

Функцията `handleEvent` получава данни всеки път, когато събитието е съответствало на филтрите, които сме указали в `project.yaml`. Ще го актуализираме, за да обработим всички събития `transfer` и да ги запазим в GraphQL обектите, които създадохме по-рано.

Може да актуализирате функцията `handleEvent` по следният начин (обърнете внимание на допълнителния импорт):

```ts
import { PangolinApproval } from "../types";
import { AvalancheEvent } from "@subql/types-avalanche";

export async function handleEvent(event: AvalancheEvent): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[0];
  pangolinApprovalRecord.amount = event.topics[0];

  await pangolinApprovalRecord.save();
}
```

What this is doing is receiving an Avalanche Event which includes the transation data on the payload. We extract this data and then instantiate a new `PangolinApproval` entity that we defined earlier in the `schema.graphql` file. Добавяме допълнителна информация и след това използваме функцията `.save()` за запазване на новият обект (SubQuery автоматично ще го съхрани в базата данни).

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

### Публикувайте своя SubQuery проект

SubQuery предоставя безплатна управлявана услуга, с помощта който можете да разгърнете новия си проект. Може да го разгърнете в [SubQuery Projects](https://project.subquery.network) и да направите запитване с помощта на нашият [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md), **Note that you must deploy via IPFS**.

## Следващите стъпки

Поздравления, вече имате локално работещ SubQuery проект, който приема заявки за GraphQL API за прехвърляне на данни от bLuna.

Сега, когато имате представа как се изгражда базисен SubQuery проект, възниква въпросът: какво да правите по-нататък? Ако се чувствате уверени, можете да започнете да научите повече за трите ключови файла. Файлът на манифеста, схемата GraphQL и mapping файл за съпоставяне в [секцията за изграждане на тези документи](../build/introduction.md).

В противен случай продължете към [раздел Академия](../academy/academy.md), където ще намерите повече обучителни семинари, уроци и примерни проекти. Там ще разгледаме по-разширени модификации и ще се потопим по-дълбоко в изпълнението на проекти на SubQuery, като стартираме лесно достъпни проекти с отворен код.

И накрая, ако търсите повече начини да стартирате и публикувате вашия проект, нашият [Run & Раздел за публикуване](../run_publish/run.md) предоставя подробна информация за всички начини за стартиране на вашия проект SubQuery и други разширени функции за агрегиране и абонамент на GraphQL.
