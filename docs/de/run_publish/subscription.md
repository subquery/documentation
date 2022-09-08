# Abonnements

## Was ist ein GraphQL-Abonnement

SubQuery unterstützt jetzt auch Graphql-Abonnements. Wie Abfragen ermöglichen Ihnen Abonnements das Abrufen von Daten. Im Gegensatz zu Abfragen sind Abonnements langlebige Vorgänge, die ihr Ergebnis im Laufe der Zeit ändern können.

Abonnements sind sehr nützlich, wenn Sie möchten, dass Ihre Clientanwendung Daten ändert oder einige neue Daten anzeigt, sobald diese Änderung eintritt oder die neuen Daten verfügbar sind. Subscriptions allow you to _subscribe_ to your SubQuery project for changes.

::: info Note Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). :::

## So abonnieren Sie eine Entität

Das grundlegende Beispiel eines GraphQL-Abonnements besteht darin, benachrichtigt zu werden, wenn neue Entitäten erstellt werden. Im folgenden Beispiel abonnieren wir die Entität `Transfer` und erhalten eine Aktualisierung, wenn Änderungen an dieser Tabelle vorgenommen werden.

Sie können das Abonnement erstellen, indem Sie den GraphQL-Endpunkt wie folgt abfragen. Ihre Verbindung abonniert dann alle Änderungen, die an der Entitätstabelle `Transfer` vorgenommen wurden.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Der Körper der Entität in Ihrer Abfrage gibt an, welche Daten Sie über Ihr Abonnement erhalten möchten, wenn die Tabelle `Transfer` aktualisiert wird:

- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: Die Aktion, die an dieser Entität vorgenommen wurde. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: Der Wert der Entität selbst im JSON-Format.

## die Filterung

Wir unterstützen auch Filter für Abonnements, was bedeutet, dass ein Kunde nur dann aktualisierte Abonnementdaten erhalten sollte, wenn diese Daten oder Mutationen bestimmte Kriterien erfüllen.

Es gibt zwei Arten von Filtern, die wir unterstützen:

- `id` : Filtern, um nur Änderungen zurückzugeben, die eine bestimmte Entität betreffen (durch die ID bezeichnet).
- `mutation_type`: Nur der gleiche Mutationstyp wird aktualisiert.

Angenommen, wir haben eine Entität ` Balances `, die den Saldo jedes Kontos aufzeichnet.

```graphql
type Balances {
  id: ID! # jemandes Konto,z.B.
15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # Balance dieses Kontos
}
```

Wenn wir Saldoaktualisierungen abonnieren möchten, die ein bestimmtes Konto betreffen, können wir den Abonnementfilter wie folgt festlegen:

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
The subcription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. Es funktioniert nicht innerhalb des GraphQL-Playgrounds im Browser.
:::
