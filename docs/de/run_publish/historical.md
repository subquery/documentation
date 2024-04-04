# Automatisierte historische Zustandsverfolgung

## Hintergrund

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Derzeit fungiert SubQuery als veränderlicher Datenspeicher, in dem Sie vorhandene gespeicherte Entitäten in dem von SubQuery indizierten Datensatz anhängen, aktualisieren, löschen oder anderweitig ändern können. Da SubQuery jeden Block indiziert, kann der Status jeder Entität basierend auf der Logik Ihres Projekts aktualisiert oder gelöscht werden.

Ein einfaches SubQuery-Projekt, das Kontostände indiziert, könnte eine Entität haben, die wie folgt aussieht.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Historische Indizierung](/assets/img/run_publish/historic_indexing.png)

Im obigen Beispiel ändert sich Alices DOT-Guthaben ständig, und während wir die Daten indexieren, ändert sich die Eigenschaft `balance` der Entität `Account`. Ein einfaches SubQuery-Projekt, das Kontostände indiziert, verliert diese historischen Daten und speichert nur den Status der aktuellen Indizierungsblockhöhe. Wenn wir beispielsweise derzeit auf Block 100 indexieren, können die Daten in der Datenbank nur den Status von Alices Konto in Block 100 darstellen.

Dann stehen wir vor einem Problem. Angenommen, die Daten haben sich beim Indizieren zu Block 200 geändert, wie können wir dann den Zustand der Daten bei Block 100 abfragen?

## Automatisierte historische Zustandsverfolgung

SubQuery automatisiert jetzt die historische Zustandsverfolgung von Entitäten für alle neuen Projekte. Sie können den Status Ihres SubQuery-Projekts automatisch auf jeder Blockhöhe abfragen. Das bedeutet, dass Sie Anwendungen erstellen können, mit denen Benutzer in der Zeit zurückgehen oder zeigen können, wie sich der Status Ihrer Daten im Laufe der Zeit ändert.

Kurz gesagt, wenn Sie eine SubQuery-Entität erstellen, aktualisieren oder löschen, speichern wir den vorherigen Zustand mit dem Blockbereich, für den er gültig war. Sie können dann Daten von einer bestimmten Blockhöhe mit denselben GraphQL-Endpunkten und derselben API abfragen.

## Dies aktivieren

Diese Funktion ist standardmäßig für alle neuen Projekte aktiviert, die mit mindestens `@subql/node@1.1.1` und `@subql/query1.1.0` gestartet werden. Wenn Sie es zu Ihrem bestehenden Projekt hinzufügen möchten, aktualisieren Sie `@subql/node` und `@subql/query` und indizieren Sie dann Ihr Projekt mit einer sauberen Datenbank neu.

Wenn Sie diese Funktion aus irgendeinem Grund deaktivieren möchten, können Sie den Parameter `--disable-historical=true` für `subql-node` festlegen.

Beim Start wird der aktuelle Status dieser Funktion auf der Konsole ausgegeben (`Historischer Status ist aktiviert`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Historischen Zustand abfragen

Es gibt eine spezielle (optionale) Eigenschaft für den GraphQL-Entitätsfilter namens `blockHeight`. Wenn Sie diese Eigenschaft weglassen, fragt SubQuery den Entity-Status auf der aktuellen Blockhöhe ab.

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Um die Eigentümer von RMRK-NFTs bei Blockhöhe 5.000.000 abzufragen, fügen Sie den blockHeight-Parameter wie unten gezeigt hinzu:

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

Um die Eigentümer dieser RMRK-NFTs-Sammlungen bei der neuesten Blockhöhe abzufragen, lassen Sie den Parameter blockHeight wie unten gezeigt weg.

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
