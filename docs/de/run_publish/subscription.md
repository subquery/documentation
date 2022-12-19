# Abonnements

## Was ist ein GraphQL-Abonnement

SubQuery unterstützt jetzt auch Graphql-Abonnements. Wie Abfragen ermöglichen Ihnen Abonnements das Abrufen von Daten. Im Gegensatz zu Abfragen sind Abonnements langlebige Vorgänge, die ihr Ergebnis im Laufe der Zeit ändern können.

Abonnements sind sehr nützlich, wenn Sie möchten, dass Ihre Clientanwendung Daten ändert oder einige neue Daten anzeigt, sobald diese Änderung eintritt oder die neuen Daten verfügbar sind. Mit Abonnements können Sie Ihr SubQuery-Projekt für Änderungen _abonnieren_.

::: tip Hinweis Lesen Sie mehr über [Abonnements](https://www.apollographql.com/docs/react/data/subscriptions/). :::

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

- `id`: Gibt die ID der geänderten Entität zurück.
- `mutation_type`: Die Aktion, die an dieser Entität vorgenommen wurde. Mutationstypen können entweder `INSERT`, `UPDATE` oder `DELETE` sein.
- `_entity`: Der Wert der Entität selbst im JSON-Format.

## die Filterung

Wir unterstützen auch Filter für Abonnements, was bedeutet, dass ein Kunde nur dann aktualisierte Abonnementdaten erhalten sollte, wenn diese Daten oder Mutationen bestimmte Kriterien erfüllen.

Es gibt zwei Arten von Filtern, die wir unterstützen:

- `id` : Filtern, um nur Änderungen zurückzugeben, die eine bestimmte Entität betreffen (durch die ID bezeichnet).
- `mutation_type`: Nur der gleiche Mutationstyp wird aktualisiert.

Angenommen, wir haben eine Entität `Balances`, die den Saldo jedes Kontos aufzeichnet.

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

Beachten Sie, dass der Filter `Mutation` einer der Filter `INSERT`, `UPDATE` oder `DELETE` sein kann.

::: Warnung Wichtig Bitte beachten Sie, dass Sie das `--subscription`-Flag sowohl im Knoten- als auch im Abfragedienst aktivieren müssen, um diese Funktionen nutzen zu können. :::

::: wichtige Warnung
Die Abonnementfunktion funktioniert auf SubQueries Managed Service, wenn Sie den aufgelisteten GraphQL-Endpunkt direkt aufrufen. Es funktioniert nicht innerhalb des GraphQL-Playgrounds im Browser.
:::
