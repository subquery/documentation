# Abonnements

## Qu'est-ce qu'un abonnement GraphQL

SubQuery prend désormais en charge les abonnements Graphql. Comme les requêtes, les abonnements vous permettent d'aller chercher des données. Contrairement aux requêtes, les abonnements sont des opérations de longue durée qui peuvent modifier leur résultat au fil du temps.

Les abonnements sont très utiles lorsque vous souhaitez que votre application client modifie des données ou affiche de nouvelles données dès que ce changement se produit ou que les nouvelles données sont disponibles. Subscriptions allow you to _subscribe_ to your SubQuery project for changes.

::: info Note Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). :::

## Comment souscrire à une entité

L'exemple de base d’un abonnement GraphQL est d'être notifié lorsque de nouvelles entités sont créées. Dans l'exemple suivant, nous nous abonnons à l'entité `Transfer` et recevons une mise à jour lorsqu'il y a des changements dans cette table.

Vous pouvez créer l'abonnement en interrogeant le point de terminaison GraphQL comme suit. Votre connexion s'abonnera alors à toutes les modifications apportées à la table d'entités `Transfer`.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Le corps de l'entité de votre requête indique les données que vous souhaitez recevoir via votre abonnement lorsque la table `Transfert` est mise à jour :

- `id`: Returns the ID of the entity that has changed.
- `mutation_type` : L'action qui a été faite à cette entité. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity` : la valeur de l'entité elle-même au format JSON.

## Filtrage

Nous prenons également en charge le filtrage des abonnements, ce qui signifie qu'un client ne doit recevoir les données d'abonnement mises à jour que si ces données ou cette mutation répondent à certains critères.

Il existe deux types de filtres que nous soutenons :

- `id` : Filtre pour ne retourner que les changements qui affectent une entité spécifique (désignée par l'ID).
- `type_mutation` : Seul le même type de mutation effectué renverra une mise à jour.

Supposons que nous ayons une entité `Balances`, et qu'elle enregistre le solde de chaque compte.

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

Si nous voulons nous abonner à toutes les mises à jour de solde qui affectent un compte spécifique, nous pouvons spécifier le filtre d'abonnement comme suit :

```graphql
subscription {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

::: warning Important Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions. :::

::: warning Important
The subcription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. Il ne fonctionnera pas dans l'environnement GraphQL du navigateur.
:::
