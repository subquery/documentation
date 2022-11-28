# Автоматическое отслеживание Исторического Состояния

## Справочный материал

SubQuery позволяет вам индексировать любые данные из Substrate, Avalanche и других сетей. В настоящее время SubQuery работает как изменяемое хранилище данных, где вы можете добавлять, обновлять, удалять или иным образом изменять существующие сохраненные сущности в наборе данных, которые индексируются SubQuery. Поскольку SubQuery индексирует каждый блок, состояние каждой сущности может быть обновлено или удалено в соответствии с логикой вашего проекта.

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

Пожалуйста, ознакомьтесь с одним из наших примеров проектов: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

Чтобы запросить владельцев RMRK NFTs на уровне блока 5 000 000, добавьте параметр blockHeight, как показано ниже:

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

Чтобы запросить владельцев этих коллекций RMRK NFTs на последнем уровне блока, опустите параметр blockHeight, как показано ниже.

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

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. Например:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.
