# Швидкий старт Polkadot

У цьому короткому посібнику ми почнемо з простого початкового проекту Substrate/Polkadot, а потім завершимо індексацією деяких реальних даних. Це чудова основа для початку розробки власного проекту Substrate/Polkadot SubQuery.

В кінці цього посібника у вас буде робочий проєкт SubQuery, який працює на вузлі SubQuery з кінцевою точкою GraphQL, з якої можна запитувати дані.

Якщо ви ще цього не зробили, ми пропонуємо вам ознайомитись із [ terminology ](../#terminology), що використовується в SubQuery.

**Метою цього короткого посібника є адаптація стандартного стартового проєкту, щоб почати індексацію всіх переказів з Polkadot, це займе всього 10-15 хвилин**

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

Зверніть увагу, що ми **НЕ**заохочуємо використання `yarn global` для встановлення`@subql/cli` через погане керування залежностями, що може призвести до помилок у майбутньому.

You can then run help to see available commands and usage provided by the CLI:

```shell
subql help
```

## Ініціалізуйте проект SubQuery Starter

У каталозі, в якому ви хочете створити проект SubQuery, просто виконайте таку команду, щоб почати.

```shell
subql init
```

Під час ініціалізації проекту SubQuery вам зададуть певні запитання:

- Назва проєкту: Найменування для вашого проєкту SubQuery
- Сімейство мереж: Сімейство блокчейну рівня 1, для індексації якого буде розроблено цей проєкт SubQuery. Використовуйте клавіші зі стрілками, щоб вибрати з доступних параметрів. Для цього посібника ми будемо використовувати _"Substrate"_
- Network: конкретна мережа, для індексації якої буде розроблено цей проєкт SubQuery. Використовуйте клавіші зі стрілками, щоб вибрати з доступних параметрів. Для цього посібника ми будемо використовувати _"Polkadot"_
- Шаблонний проєкт: виберіть проєкт шаблону SubQuery, який стане відправною точкою для початку розробки. Ми пропонуємо вибрати проєкт _"subql-starter"_.
- Кінцева точка RPC: надайте URL-адресу HTTPS для запущеної кінцевої точки RPC, яка буде використовуватися за замовчуванням для цього проєкту. Ви можете швидко отримати доступ до загальнодоступних кінцевих точок для різних мереж Polkadot, створити власний приватний виділений вузол за допомогою [OnFinality](https://app.onfinality.io) або просто використовувати кінцеву точку Polkadot за замовчуванням. Цей вузол RPC повинен бути вузлом архіву (мати стан повного ланцюга). Для цього посібника ми будемо використовувати значення за замовчуванням _"https://polkadot.api.onfinality.io"_
- Репозиторій Git: надайте URL-адресу Git до репозиторію, в якому буде розміщено цей проєкт SubQuery (якщо він розміщений у SubQuery Explorer) або прийміть надане за замовчуванням.
- Автори: Введіть тут власника цього проєкту SubQuery (наприклад, ваше ім’я!) або прийміть надане за замовчуванням.
- Опис: надайте короткий абзац про ваш проєкт, який описує дані, які він містить, і що користувачі можуть робити з ними або прийняти надане за замовчуванням.
- Версія: введіть спеціальний номер версії або використовуйте стандартний (`1.0.0`)
- Ліцензія: надайте ліцензію на програмне забезпечення для цього проекту або прийміть значення за замовчуванням (`MIT`)

Після завершення процесу ініціалізації ви повинні побачити, що всередині каталогу створено папку з назвою вашого проєкту. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Нарешті, у каталозі проєкту виконайте таку команду, щоб встановити залежності нового проєкту.

::: code-tabs @tab:active yarn `оболонка компакт-диск PROJECT_NAME установка yarn`
@tab npm `оболонка компакт-диск PROJECT_NAME npm встановити` :::

## Внесення змін до проекту

У стартовому пакеті, який ви щойно ініціалізували, ми надали стандартну конфігурацію для вашого нового проекту. These are:

1. The GraphQL Schema in `schema.graphql`
2. Маніфест проекту в `project.yaml`
3. Картографування функціонує в каталозі `src / mappings /`

Метою цього короткого посібника є адаптація стандартного стартового проєкту, щоб почати індексацію всіх переказів із Polkadot.

### Оновлення файлу схеми GraphQL

Файл `schema.graphql` визначає різні схеми GraphQL. Завдяки тому, як працює мова запитів GraphQL, файл схеми по суті визначає форму ваших даних із SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Важливо: коли ви вносите будь-які зміни до файлу схеми, переконайтеся, що ви повторно створили каталог типів.**

::: code-tabs @tab:active yarn `shell yarn codegen `
@tab npm `shell npm run-script codegen ` :::

You'll find the generated models in the `/src/types/models` directory. Щоб отримати додаткові відомості про файл `schema.graphql`, перегляньте нашу документацію в розділі [Build/GraphQL Schema](../build/graphql.md)

### Оновлення файлу маніфесту проекту

Файл маніфесту проєкту (`project.yaml`) можна розглядати як точку входу вашого проєкту, і він визначає більшість деталей про те, як SubQuery буде індексувати та перетворювати дані ланцюга.

Файл маніфесту вже налаштовано правильно, але нам потрібно змінити наші обробники. Оскільки ми плануємо індексувати всі передачі Polkadot, нам потрібно оновити розділ `джерела даних` таким чином:

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

Це означає, що ми запускатимемо функцію відображення `handleEvent` кожного разу, коли відбувається подія `balances.Transfer`.

Щоб отримати додаткові відомості про файл маніфесту проекту (`project.yaml`), перегляньте нашу документацію в розділі [Файл збірки/маніфесту](../build/manifest/polkadot.md)

### Додайте функцію відображення

Функції відображення визначають, як дані ланцюга перетворюються в оптимізовані сутності GraphQL, які ми раніше визначили у файлі `schema.graphql`.

Перейдіть до функції відображення за замовчуванням у каталозі `src/mappings`. Ви побачите три експортовані функції: `handleBlock`, `handleEvent` і `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

Функція `handleEvent` отримує дані про події щоразу, коли подія відповідає фільтрам, які ми вказали раніше в нашому `project.yaml`. Ми оновимо його, щоб обробити всі події `balance.Transfer` та зберегти їх у сутності GraphQL, які ми створили раніше.

Ви можете оновити функцію `handleEvent` до наступного (зверніть увагу на додатковий імпорт):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.amount = (amount as Balance).toBigInt();
  await transfer.save();
}
```

Це отримує SubstrateEvent, який включає дані передачі в корисне навантаження. Ми витягуємо ці дані, а потім створюємо новий об’єкт `Transfer`, який ми визначили раніше у файлі `schema.graphql`. Ми додаємо додаткову інформацію, а потім використовуємо функцію `.save()` для збереження нової сутності (SubQuery автоматично збереже це в базі даних).

Щоб отримати додаткові відомості про функції відображення, перегляньте нашу документацію в розділі [Build/Mappings](../build/mapping/polkadot.md)

### Створіть проект

Щоб запустити ваш новий проєкт SubQuery, нам спочатку потрібно побудувати нашу роботу. Запустіть команду збірки з кореневого каталогу проекту.

::: code-tabs @tab:active yarn `оболонка побудова` @tab npm `оболонка npm run-script build` :::

**Важливо: щоразу, коли ви вносите зміни у свої функції відображення, вам потрібно буде перебудувати свій проєкт**

## Запуск і запити вашого проекту

### Запустіть свій проєкт за допомогою Docker

Кожного разу, коли ви створюєте новий проєкт SubQuery, ви завжди повинні запускати його локально на своєму комп’ютері, щоб спочатку перевірити його. Найпростіший спосіб зробити це за допомогою Docker.

Уся конфігурація, яка керує запуском вузла SubQuery, визначається у файлі `docker-compose.yml`. Для нового проєкту, який щойно ініціалізовано, вам не потрібно нічого змінювати, але ви можете прочитати більше про файл і налаштування в нашому розділі [Запуск проєкту](../run_publish/run.md).

У каталозі проєкту, виконайте таку команду:

::: code-tabs @tab:active yarn `shell yarn start:docker ` @tab npm `shell npm run-script start:docker ` :::

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Запитуйте свій проект

Відкрийте свій браузер і перейдіть до [http://localhost:3000](http://localhost:3000).

Ви повинні побачити ігровий майданчик GraphQL у браузері та схеми, які готові до запиту. У верхньому правому куті ігрового майданчика ви знайдете кнопку _ Docs _, яка відкриє розіграш документації. Ця документація генерується автоматично і допомагає вам знайти, які сутності та методи ви можете запитувати.

Для нового початкового проєкту SubQuery спробуйте виконати наступний запит, щоб зрозуміти, як він працює, або дізнайтеся більше про [мову запитів GraphQL](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(first: 10, orderBy: AMOUNT_DESC) {
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

### Опублікуйте проект SubQuery

SubQuery provides a free managed service where you can deploy your new project to. Ви можете розгорнути його в [SubQuery Managed Service](https://managedservice.subquery.network) і зробити запит за допомогою нашого [ Explorer](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Настуні кроки

Вітаємо, тепер у вас є локально запущений проєкт SubQuery, який приймає запити GraphQL API для передачі даних.

Тепер, коли ви зрозуміли, як створити базовий проект SubQuery, виникає питання, куди звідси? Якщо ви почуваєтеся впевнено, ви можете перейти до вивчення трьох ключових файлів. Файл маніфесту, схема GraphQL і файл зіставлення знаходяться в [розділі Build цих документів](../build/introduction.md).

В іншому випадку перейдіть до нашого [розділу Академія](../academy/academy.md), де ми маємо більш глибокі семінари, навчальні посібники та приклади проєктів. Там ми розглянемо більш просунуті модифікації та глибше зануримось у запуск проектів SubQuery, запустивши легкодоступні проекти з відкритим кодом.

Нарешті, якщо ви шукаєте більше способів запустити та опублікувати свій проєкт, наш [Run & Розділ Публікація](../run_publish/run.md) містить детальну інформацію про всі способи запуску вашого проєкту SubQuery та інші розширені функції агрегації та підписки GraphQL.
