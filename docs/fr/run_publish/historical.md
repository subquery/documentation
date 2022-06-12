# Suivi historique automatique des états

## Arrière-plan

SubQuery vous permet d'indexer toutes les données que vous voulez de Substrate, Avalance et d'autres réseaux. Actuellement, SubQuery fonctionne comme un stockage de données mutable, où vous pouvez ajouter, mettre à jour, supprimer, ou autrement modifier les entités enregistrées existantes dans le jeu de données indexé par SubQuery. Comme SubQuery indexe chaque bloc, l'état de chaque entité peut être mis à jour ou supprimé selon la logique de votre projet.

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

## Interrogation de l'état historique

Il y a une propriété spéciale (facultative) sur le filtre d'entité GraphQL appelé `blockHeight`. Si vous omettez cette propriété, SubQuery interroge l'état de l'entité à la hauteur du bloc courant.

Veuillez consulter l'un de nos exemples de projets : [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical)

Pour interroger les propriétaires de NFT RMRK à la hauteur du bloc 5.000,000, ajoutez le paramètre blockHeight comme montré ci-dessous:

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

Pour interroger les propriétaires de ces collections RMRK NFTs à la dernière hauteur de bloc, omettez le paramètre blockHeight comme indiqué ci-dessous.

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