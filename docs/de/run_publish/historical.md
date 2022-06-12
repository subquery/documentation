# Automatisierte historische Zustandsverfolgung

## Hintergrund

Mit SubQuery können Sie beliebige Daten von Substrate, Avalance und anderen Netzwerken indizieren. Derzeit fungiert SubQuery als veränderlicher Datenspeicher, in dem Sie vorhandene gespeicherte Entitäten in dem von SubQuery indizierten Datensatz anhängen, aktualisieren, löschen oder anderweitig ändern können. Da SubQuery jeden Block indiziert, kann der Status jeder Entität basierend auf der Logik Ihres Projekts aktualisiert oder gelöscht werden.

Ein einfaches SubQuery-Projekt, das Kontostände indiziert, könnte eine Entität haben, die wie folgt aussieht.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Historische Indizierung](/assets/img/historic_indexing.png)

Im obigen Beispiel ändert sich Alices DOT-Guthaben ständig, und während wir die Daten indexieren, ändert sich die Eigenschaft `balance` der Entität `Account`. Ein einfaches SubQuery-Projekt, das Kontostände indiziert, verliert diese historischen Daten und speichert nur den Status der aktuellen Indizierungsblockhöhe. Wenn wir beispielsweise derzeit auf Block 100 indexieren, können die Daten in der Datenbank nur den Status von Alices Konto in Block 100 darstellen.

Dann stehen wir vor einem Problem. Angenommen, die Daten haben sich beim Indizieren zu Block 200 geändert, wie können wir dann den Zustand der Daten bei Block 100 abfragen?

## Automatisierte historische Zustandsverfolgung

SubQuery automatisiert jetzt die historische Zustandsverfolgung von Entitäten für alle neuen Projekte. Sie können den Status Ihres SubQuery-Projekts automatisch auf jeder Blockhöhe abfragen. Das bedeutet, dass Sie Anwendungen erstellen können, mit denen Benutzer in der Zeit zurückgehen oder zeigen können, wie sich der Status Ihrer Daten im Laufe der Zeit ändert.

Kurz gesagt, wenn Sie eine SubQuery-Entität erstellen, aktualisieren oder löschen, speichern wir den vorherigen Zustand mit dem Blockbereich, für den er gültig war. Sie können dann Daten von einer bestimmten Blockhöhe mit denselben GraphQL-Endpunkten und derselben API abfragen.

## Dies aktivieren

Diese Funktion ist standardmäßig für alle neuen Projekte aktiviert, die mit mindestens `@subql/node@1.1.1` und `@subql/query1.1.0` gestartet werden. Wenn Sie es zu Ihrem bestehenden Projekt hinzufügen möchten, aktualisieren Sie `@subql/node` und `@subql/query` und indizieren Sie dann Ihr Projekt mit einer sauberen Datenbank neu.

Wenn Sie diese Funktion aus irgendeinem Grund deaktivieren möchten, können Sie den Parameter `--disable-historical=true` für `subql-node` festlegen.

Beim Start wird der aktuelle Status dieser Funktion auf der Konsole ausgegeben (`Historischer Status ist aktiviert`).

## Historischen Zustand abfragen

Es gibt eine spezielle (optionale) Eigenschaft für den GraphQL-Entitätsfilter namens `blockHeight`. Wenn Sie diese Eigenschaft weglassen, fragt SubQuery den Entity-Status auf der aktuellen Blockhöhe ab.

Bitte sehen Sie sich eines unserer Beispielprojekte an: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical)

Um die Eigentümer von RMRK-NFTs bei Blockhöhe 5.000.000 abzufragen, fügen Sie den blockHeight-Parameter wie unten gezeigt hinzu:

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

Um die Eigentümer dieser RMRK-NFTs-Sammlungen bei der neuesten Blockhöhe abzufragen, lassen Sie den Parameter blockHeight wie unten gezeigt weg.

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