# Polkadot Quick Start

In this Quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. This is an excellent basis to start with when developing your own Substrate/Polkadot SubQuery Project.

**If your are looking for guides for Terra, you can read the [Terra specific quick start guide](./quickstart-terra).**

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

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. Основно ще работите върху следните файлове:

1. Схема GraphQL `schema.graphql`
2. Манифест на проекта в `project.yaml`
3. Показване на Функции в директорията `src/mappings/`

Целта на това кратко ръководство е адаптиране на стандартния базов проект, за започване индексирането на всички преводи от Polkadot.

### Актуализиране на вашия файл със схема на GraphQL

Файлът `schema.graphql` дефинира различните схеми на GraphQL. В зависимост от начина, по който работи езикът за заявки GraphQL, файлът със схемата по същество диктува формата на вашите данни от SubQuery. Това е страхотно място за начало, защото ви позволява предварително да дефинирате крайната си цел.

Щв актуализираме файла `schema.graphql` за да го прочетете, както следва

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # Акаунт, към който се извършват преводите
}
```

**Важно: Когато правите промени във файла schema, моля, уверете се, че отново сте създали директорията си с типове със следната команда yarn codegen. Направете го сега.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. За повече информация относно файла `schema.graphql`, проверете нашата документация в раздела [Build/GraphQL Schema](../build/graphql.md)

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

### Добавяне на Mappring функция

Mapping функциите определят как данните от веригата се трансформират в оптимизирани обекти GraphQL, които по-рано сме дефинирали във файла `schema.graphql`.

Преминете към функцията за картографиране по подразбиране в директорията `src/mappings`. Ще забележите три експортирани функции, `handleBlock`, `handleEvent`, and `handleCall`. Може да изтриете двете функции `handleBlock` и `handleCall`, ще продължим работа само с функцията `handleEvent`.

Функцията `handleEvent` получава данни всеки път, когато събитието е съответствало на филтрите, които сме указали в `project.yaml`. Ще го актуализираме, за да обработим всички събития `balances.Transfer` и да ги запазим в обектите GraphQL, които създадохме по-рано.

Може да актуализирате функцията `handleEvent` по следният начин (обърнете внимание на допълнителния импорт):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
    // Получете данни от събитието
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Създайте новият обект за прехвърляне
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
 
Text
XPath: /p[12]/CodeGroup/pre[3]/code
```

Това, което прави, е получаване на SubstrateEvent, който включва данни за прехвърляне на payload. Ние извличаме тези данни и след това създаваме нов обект `Transfer`, който сме определили по-рано във файла `schema.graphql`. Добавяме допълнителна информация и след това използваме функцията `.save()` за запазване на новият обект (SubQuery автоматично ще го съхрани в базата данни).

За повече информация относно mapping функциите вижте нашата документация под[Build/Mappings](../build/mapping.md)

### Изграждане на проект

За да стартираме вашия нов проект SubQuery, първо трябва да изградим нашата работа. Изпълнете командата за изграждане от основната директория на проекта.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Най-лесният начин да се направи това е чрез Docker.

Всички конфигурации, които контролират изпълнението на нодата SubQuery, са дефинирани в този файл `docker-compose.yml`. За нов проект, който току-що беше инициализиран, няма да е необходимо да променяте нищо, но можете да прочетете повече за файла и настройките в нашата [Секция за стартиране на Проекта](../run_publish/run.md)

В директорията на проекта изпълнете следната команда:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Бъдете търпеливи.

### Направете заявка за вашият проект

Отворете браузъра си и отидете на [http://localhost:3000](http://localhost:3000).

Трябва да може да видите платформа GraphQL, показана в explorer, и готовите за заявка схеми. В горния десен ъгъл на playground ще намерите бутон _Docs_, който ще отвори чертеж с документация. Тази документация се генерира автоматично и ви помага да намерите за какви обекти и методи можете да направите заявка.

За нов стартов SubQuery проект можете да опитате следната заявка, за да получите представа как работи или [научете повече относно езика за заявки GraphQL ](../run_publish/graphql.md).

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

### Публикувайте своя SubQuery проект

SubQuery предоставя безплатна управлявана услуга, с помощта който можете да разгърнете новия си проект. Може да го разгърнете в [SubQuery Projects](https://project.subquery.network) и да направите запитване с помощта на нашият [Explorer](https://explorer.subquery.network).

[Прочетете ръководството, за да публикувате новия си проект в SubQuery Projects](../run_publish/publish.md)

## Следващите стъпки

Поздравления, сега имате локално работещ SubQuery проект, който приема API GraphQL заявки за извличане на данни.

Сега, когато имате представа как се изгражда базисен SubQuery проект, възниква въпросът: какво да правите по-нататък? Ако се чувствате уверени, можете да започнете да научите повече за трите ключови файла. Файлът на манифеста, схемата GraphQL и mapping файл за съпоставяне в [секцията за изграждане на тези документи](../build/introduction.md).

В противен случай продължете към [раздел Академия](../academy/academy.md), където ще намерите повече обучителни семинари, уроци и примерни проекти. Там ще разгледаме по-разширени модификации и ще се потопим по-дълбоко в изпълнението на проекти на SubQuery, като стартираме лесно достъпни проекти с отворен код.

И накрая, ако търсите повече начини да стартирате и публикувате вашия проект, нашият [Run & Раздел за публикуване](../run_publish/run.md) предоставя подробна информация за всички начини за стартиране на вашия проект SubQuery и други разширени функции за агрегиране и абонамент на GraphQL.
