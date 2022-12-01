# Автоматичне Відстеження Історичного Стану

## Фон

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Зараз SubQuery працює як змінюване сховище даних, де ви можете додавати, оновлювати, видаляти або іншим чином змінювати що існує збережені об'єкти в наборі даних, який індексується SubQuery. Оскільки SubQuery індексує кожен блок, стан кожного об'єкта може бути оновлено або видалено в залежності від логіки вашого проєкту.

Базовий проєкт SubQuery, який індексує залишки на рахунках, може мати об'єкт, який виглядає наступним чином.

```graphql
Введіть обліковий запис @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Історична індексація](/assets/img/historic_indexing.png)

У наведеному вище прикладі баланс DOT Аліси постійно змінюється, і в міру того, як ми індексуємо дані, властивість ` balance ` по суті ` Account ` буде змінюватися. Базовий проєкт SubQuery, який індексує залишки на рахунках, втратить ці Історичні дані й збереже тільки стан поточної висоти блоку індексації. Наприклад, якщо ми зараз індексуємо блок 100, дані в базі даних можуть представляти лише стан облікового запису Аліси в блоці 100.

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

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Щоб запросити власників RMRK NFTs з висотою блоку 5 000 000, додайте параметр blockHeight, як показано нижче:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      id
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
      id
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. Например:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.

You can also use the reindex feature in the [SubQuery Managed Service](https://project.subquery.network).

## DB Schema

When the Automated Historical State Tracking is enabled, we make some key underlying changes to the DB tables to manage this for you automatically.

The below example shows the table of the `Account` entity provided before

```graphql
Введіть обліковий запис @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

| `id`      | `_id`                                  | `_block_range` | `balance` |
| --------- | -------------------------------------- | -------------- | --------- |
| `alice`   | `0e6a444d-cc33-415b-9bfc-44b5ee64d3f4` | `[0,1000)`     | `5`       |
| `alice`   | `943c3191-ea96-452c-926e-db31ab5b95c7` | `[1000,2000)`  | `15`      |
| `alice`   | `b43ef216-967f-4192-975c-b14a0c5cef4b` | `[2000,)`      | `25`      |
| `bob`     | `4876a354-bd75-4370-9621-24ce1a5b9606` | `[0,)`         | `15`      |
| `charlie` | `6e319240-ef14-4fd9-86e9-c788ff5de152` | `[1000,)`      | `100`     |
| ...       | ...                                    | ...            | ...       |

When the historical feature is enabled, the `id` field is no longer used as primary key for the database table, instead we automatically generate an unique GUID key `_id` for this row within the DB table.

The `_block_range` indicates the start to end block for this record using Postgres' [range type](https://www.postgresql.org/docs/current/rangetypes.html). For example, between block 0 to 999, `alice`'s `balance` is 5. Then from block 1000 to 1999, `alice`'s `balance` is 15.

`_id` and `_block_range` are not visible to end users via the query service (GraphQL API), they are internal datatypes automatically generated and handled by the query service.
