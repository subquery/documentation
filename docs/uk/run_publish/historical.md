# Автоматичне Відстеження Історичного Стану

## Фон

SubQuery дозволяє індексувати будь-які дані, які ви хочете отримати з Substrate, Avalanche та інших мереж. Зараз SubQuery працює як змінюване сховище даних, де ви можете додавати, оновлювати, видаляти або іншим чином змінювати що існує збережені об'єкти в наборі даних, який індексується SubQuery. Оскільки SubQuery індексує кожен блок, стан кожного об'єкта може бути оновлено або видалено в залежності від логіки вашого проєкту.

Базовий проєкт SubQuery, який індексує залишки на рахунках, може мати об'єкт, який виглядає наступним чином.

```graphql
Введіть обліковий запис @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Історична індексація](/assets/img/historic_indexing.png)

У наведеному вище прикладі баланс DOT Аліси постійно змінюється, і в міру того, як ми індексуємо дані, властивість `balance` по суті `Account` буде змінюватися. Базовий проєкт SubQuery, який індексує залишки на рахунках, втратить ці Історичні дані й збереже тільки стан поточної висоти блоку індексації. Наприклад, якщо ми зараз індексуємо блок 100, дані в базі даних можуть представляти лише стан облікового запису Аліси в блоці 100.

Тоді ми стикаємося з проблемою. Припускаючи, що дані змінилися при індексації в блок 200, як ми можемо запитати стан даних в блоці 100?

## Автоматичне Відстеження Історичного Стану

SubQuery тепер автоматизує відстеження історичного стану об'єктів для всіх нових проєктів. Ви можете автоматично запитувати стан вашого проєкту SubQuery на будь-якій висоті блоку. Це означає, що ви можете створювати додатки, які дозволяють користувачам повертатися в минуле або показувати, як стан ваших даних змінюється з плином часу.

Коротко кажучи, Коли ви створюєте, оновлюєте або видаляєте будь-який об'єкт SubQuery, ми зберігаємо попередній стан з діапазоном блоків, для якого він був дійсним. Потім ви можете запросити дані з певної висоти блоку, використовуючи ті ж кінцеві точки GraphQL і API.

## Включення Цього

Ця функція включена за замовчуванням для всіх нових проєктів, розпочатих як мінімум з `@subql/node@1.1.1` і `@subql/query1.1.0`. Якщо ви хочете додати його до що існує проєкт, оновіть `@subql/node` та `@subql/query`, а потім переіндексуйте свій проєкту за допомогою чистої бази даних.

Якщо ви хочете вимкнути цю функцію з будь-якої причини, ви можете встановити параметр `--disable-historical=true` на `subql-node`.

При запуску поточний стан цієї функції виводиться на консоль (`Historical state is enabled`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Запит історичного стану

У фільтрі сутностей GraphQL є спеціальна (необов'язкова) властивість, яка називається `blockHeight`. Якщо ви опустите цю властивість, SubQuery буде запитувати стан об'єкта на поточній висоті блоку.

Будь ласка, ознайомтеся з одним з наших прикладів проєктів: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

Щоб запросити власників RMRK NFTs з висотою блоку 5 000 000, додайте параметр blockHeight, як показано нижче:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      name
      currentOwner
    }
  }
}
```

Щоб запросити власників цих колекцій RMRK NFTs з останньою висотою блоку, опустіть параметр blockHeight, як показано нижче.

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. Наприклад:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.
