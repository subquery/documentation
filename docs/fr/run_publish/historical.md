# Suivi historique automatique des états

## Arrière-plan

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Actuellement, SubQuery fonctionne comme un stockage de données mutable, où vous pouvez ajouter, mettre à jour, supprimer, ou autrement modifier les entités enregistrées existantes dans le jeu de données indexé par SubQuery. Comme SubQuery indexe chaque bloc, l'état de chaque entité peut être mis à jour ou supprimé selon la logique de votre projet.

Un projet SubQuery basique qui indexe les soldes du compte peut avoir une entité qui ressemble à ce qui suit.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Indexation historique](/assets/img/historic_indexing.png)

Dans l'exemple ci-dessus, le solde DOT d'Alice change constamment, et alors que nous indexons les données, la propriété `solde` sur l'entité `Compte` va changer. Un projet SubQuery de base qui indexe les soldes du compte perdra ces données historiques et stockera uniquement l'état de la hauteur du bloc d'indexation actuel. Par exemple, si nous indexons actuellement le bloc 100, les données dans la base de données ne peuvent représenter que l'état du compte d'Alice au bloc 100.

Nous sommes alors confrontés à un problème. En supposant que les données ont changé lors de l'indexation vers le bloc 200, comment pouvons-nous interroger l'état des données au bloc 100?

## Suivi historique automatique des états

SubQuery automatise maintenant le suivi historique des entités pour tous les nouveaux projets. Vous pouvez automatiquement interroger l'état de votre projet SubQuery à n'importe quelle hauteur de bloc. Cela signifie que vous pouvez construire des applications qui permettent aux utilisateurs de revenir dans le temps, ou montrer comment l'état de vos données change au fil du temps.

En bref, lorsque vous créez, mettez à jour ou supprimez une entité SubQuery, nous stockons l'état précédent avec la plage de blocs pour laquelle il était valide. Vous pouvez alors interroger des données à partir d'une hauteur de bloc spécifique en utilisant les mêmes points de terminaison GraphQL et API.

## Activer ceci

Cette fonctionnalité est activée par défaut pour tous les nouveaux projets démarrés avec au moins `@subql/node@1.1.1` et `@subql/query1.1.0`. Si vous voulez l'ajouter à votre projet existant, mettez à jour `@subql/node` et `@subql/query` puis réindexez votre projet avec une base de données propre.

Si vous voulez désactiver cette fonctionnalité pour une raison quelconque, vous pouvez définir le paramètre `--disable-historical=true` sur `subql-node`.

Au démarrage, l'état actuel de cette fonctionnalité est imprimé dans la console (`L'état historique est activé`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Interrogation de l'état historique

Il y a une propriété spéciale (facultative) sur le filtre d'entité GraphQL appelé `blockHeight`. Si vous omettez cette propriété, SubQuery interroge l'état de l'entité à la hauteur du bloc courant.

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Pour interroger les propriétaires de NFT RMRK à la hauteur du bloc 5.000,000, ajoutez le paramètre blockHeight comme montré ci-dessous:

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

Pour interroger les propriétaires de ces collections RMRK NFTs à la dernière hauteur de bloc, omettez le paramètre blockHeight comme indiqué ci-dessous.

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
