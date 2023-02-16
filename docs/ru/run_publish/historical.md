# Автоматическое отслеживание Исторического Состояния

## Справочный материал

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. В настоящее время SubQuery работает как изменяемое хранилище данных, где вы можете добавлять, обновлять, удалять или иным образом изменять существующие сохраненные сущности в наборе данных, которые индексируются SubQuery. Поскольку SubQuery индексирует каждый блок, состояние каждой сущности может быть обновлено или удалено в соответствии с логикой вашего проекта.

Базовый проект SubQuery, индексирующий остатки на счетах, может иметь сущность, которая выглядит следующим образом.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Историческое индексирование](/assets/img/historic_indexing.png)

В приведенном выше примере баланс DOT Алисы постоянно меняется, и по мере индексации данных свойство `balance` на сущности `Account` будет меняться. Базовый проект SubQuery, индексирующий остатки на счетах, утратит эти исторические данные и будет хранить только состояние текущего уровня блока индексирования. Например, если в данный момент мы индексируем до блока 100, данные в базе данных могут представлять только состояние счета Алисы в блоке 100.

Тогда мы сталкиваемся с проблемой. Если предположить, что данные изменились при индексировании до блока 200, как мы можем запросить состояние данных в блоке 100?

## Автоматическое отслеживание Исторического Состояния

Теперь в SubQuery автоматизировано отслеживание исторического состояния сущностей для всех новых проектов. Вы можете автоматически запрашивать состояние вашего проекта SubQuery на любом уровне блоков. Это означает, что вы можете создавать приложения, позволяющие пользователям возвращаться в прошлое или показывать, как состояние ваших данных меняется с течением времени.

Короче говоря, когда вы создаете, обновляете или удаляете любую сущность SubQuery, мы сохраняем предыдущее состояние с диапазоном блоков, для которого оно было действительно. Затем вы можете запрашивать данные с определенного уровня блока, используя те же конечные точки GraphQL и API.

## Активизация

Эта функция включена по умолчанию для всех новых проектов, запущенных как минимум с `@subql/node@1.1.1` и `@subql/query1.1.0`. Если вы хотите добавить его в существующий проект, обновите `@subql/node` и `@subql/query`, а затем переиндексируйте проект с чистой базой данных.

Если вы хотите отключить эту функцию по какой-либо причине, вы можете установить параметр `--disable-historical=true` на `subql-node`.

При запуске текущее состояние этой функции выводится на консоль (`Историческое состояние включено`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Запрос исторического состояния

Существует специальное (необязательное) свойство фильтра сущностей GraphQL под названием `blockHeight`. Если вы оставите это свойство без внимания, SubQuery будет запрашивать состояние сущности на текущей отметке блока.

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Чтобы запросить владельцев RMRK NFTs на уровне блока 5 000 000, добавьте параметр blockHeight, как показано ниже:

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

Чтобы запросить владельцев этих коллекций RMRK NFTs на последнем уровне блока, опустите параметр blockHeight, как показано ниже.

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

You can also use the reindex feature in the [SubQuery Managed Service](https://managedservice.subquery.network).

## DB Schema

When the Automated Historical State Tracking is enabled, we make some key underlying changes to the DB tables to manage this for you automatically.

The below example shows the table of the `Account` entity provided before

```graphql
type Account @entity {
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
