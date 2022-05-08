# Добре дошли

В това ръководство за Бърз старт ще започнем с обикновен проект в начална стадия и ще завършим с индексиране някои актуални реални данни. Това е перфекта основа, с която да започнете при разработка свой собствен проект SubQuery.

В края на това ръководство ще получите работещ SubQuery проект, стартиран върху нодата SubQuery и с крайна точка GraphQL, от която можете да изисквате необходими данни.

Ако все още не сте го направили, ви предлагаме да разгледате [терминологията](../#terminology)използвана в SubQuery.

**Целта на това кратко ръководство е адаптиране на стандартния базов проект, за започване индексирането на всички преводи от Polkadot, което трябва да отнеме само 10-15 минути**

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
- Network: блокчейн мрежа, за индексиране на която ще бъде разработен този проект SubQuery, използвайте клавишите със стрелки на клавиатурата си, за да изберете от опциите, за това ръководство ще използваме *"Polkadot"*
- Template: Изберете шаблон за проекта SubQuery, който ще служи като начална точка за започване на разработка, предлагаме да изберете *"Starter project"*
- Git repository (опционално): посочете Git URL хранилище, в което ще се съхранява този проект SubQuery (при разполагане в SubQuery Explorer)
- RPC endpoint (Необходимо): Укажете HTTPS URL за работеща крайна точка RPC която ще бъде използвана по подразбиране за този проект. Можете бързо да получите достъп до публични крайни точки за различни мрежи на Polkadot или дори да създадете своя собствена частна специална нода с помощта на[OnFinality](https://app.onfinality.io) или просто използвайте крайната точка по подразбиране на Polkadot. Този вид нода RPC трябва да представлява архивна нода (да има състояние на пълна веригата). В това ръководство ще използваме по подразбиране *"https://polkadot.api.onfinality.io"*
- Authors (задължително): въведете собственика на този проект за SubQuery тук (например вашето име!)
- Description (опционално): можете да предоставите кратко описание за вашия проект, който описва какви данни съдържа и какво могат да правят потребителите с него
- Version (Задължително): въведете свой персонализиран номер на версията или използвайте стойността по подразбиране (`1.0.0`)
- License (задължително): предоставете софтуерен лиценз за този проект или потвърдете такъв по подразбиране (`Apache-2.0`)

След като процесът на инициализация приключи, трябва да видите, че в директорията е създадена папка с името на вашия проект. Съдържанието на тази директория трябва да бъде идентично с посоченото в [Структурата на директорията](../create/introduction.md#directory-structure).

И накрая, в директорията на проекта изпълнете следната команда, за да инсталирате зависимостите на новия проект.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd ИМЕ_ПРОЕКТ yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd ИМЕ_ПРОЕКТ npm install ``` </CodeGroupItem> </CodeGroup>

## Внасяне на промени във вашия проект

В стартовия пакет, който току-що инициализирахте, ние сме предоставили стандартна конфигурация за вашия нов проект. Основно ще работите върху следните файлове:

1. Схема GraphQL `schema.graphql`
2. Манифест на проекта в `project.yaml`
3. Показване на Функции в директорията `src/mappings/`

Целта на това кратко ръководство е адаптиране на стандартния базов проект, за започване индексирането на всички преводи от Polkadot.

### Актуализиране на вашия файл със схема на GraphQL

Файлът `schema.graphql` дефинира различните схеми на GraphQL. В зависимост от начина, по който работи езикът за заявки GraphQL, файлът със схемата по същество диктува формата на вашите данни от SubQuery. Това е страхотно място за начало, защото ви позволява предварително да дефинирате крайната си цел.

Щв актуализираме файла `schema.graphql` за да го прочетете, както следва

```graphql
type Transfer @entity {
  id: ID! # id поле винаги трябва да изглежда така
  amount: BigInt # Сума за трансфер
  blockNumber: BigInt # Височината на блока на трансфера
  from: Account! # Акаунт, от който се извършват преводите
  to: Account! # Акаунт, към който се извършват преводите
}
```

**Важно: Когато правите промени във файла schema, моля, уверете се, че отново сте създали директорията си с типове със следната команда yarn codegen. Направете го сега.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Ще намерите генерираните модели в директорията `/src/types/models`. За повече информация относно файла `schema.graphql`, проверете нашата документация в раздела [Build/GraphQL Schema](../build/graphql.md)

### Обновяване на файла Project Manifest

Файлът Projet Manifest (`project.yaml`) може да се разглежда като начална точка за вашия проект, той определя повечето подробности за това как SubQuery ще индексира и трансформира данните от веригата.

Няма да правим много промени във файла на манифеста, тъй като той вече е настроен правилно, но трябва да променим нашите handlers. Не забравяйте, че ние планираме да индексираме всички трансфери в Polkadot, затова трябва да обновим секцията `datasources` за да прочетем следващото.

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

Това означава, че ще стартираме функцията за планиране `handleEvent` всеки път, когато се случва следното събитие `balances.Transfer`.

За повече информация относна файла Project Manifest (`project.yaml`), проверете документацията ни в раздела [Build/Manifest File](../build/manifest.md)

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

You should see a GraphQL playground is showing in the explorer and the schemas that are ready to query. В горния десен ъгъл на playground ще намерите бутон _Docs_, който ще отвори чертеж с документация. Тази документация се генерира автоматично и ви помага да намерите за какви обекти и методи можете да направите заявка.

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
