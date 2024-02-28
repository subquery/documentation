# Pelacakan Status Historis Otomatis

## Latar Belakang

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Saat ini, SubQuery beroperasi sebagai penyimpanan data yang dapat diubah, tempat Anda dapat menambahkan, memperbarui, menghapus, atau mengubah entitas tersimpan yang ada dalam kumpulan data yang diindeks oleh SubQuery. Saat SubQuery mengindeks setiap blok, status setiap entitas dapat diperbarui atau dihapus berdasarkan logika proyek Anda.

Proyek SubQuery dasar yang mengindeks saldo akun mungkin memiliki entitas yang terlihat seperti berikut ini.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Histori Pengindeksan](/assets/img/historic_indexing.png)

Dalam contoh di atas, saldo DOT Alice terus berubah, dan saat kami mengindeks data, properti `saldo` pada entitas `Akun` akan berubah. Dalam contoh di atas, saldo Dot Alice terus berubah, dan saat kami mengindeks data, properti <0>saldo</0> pada entitas <0>Akun</0> akan berubah. Misalnya, jika saat ini kita mengindeks ke blok 100, data dalam database hanya dapat mewakili status akun Alice di blok 100.

Kemudian kita dihadapkan pada suatu masalah. Dengan asumsi data telah berubah saat mengindeks ke blok 200, bagaimana kita bisa menanyakan status data di blok 100?

## Automated Historical State Tracking

SubQuery sekarang mengotomatiskan pelacakan status historis entitas untuk semua proyek baru. Anda dapat secara otomatis menanyakan status proyek SubQuery Anda pada ketinggian blok apa pun. Ini berarti Anda dapat membuat aplikasi yang memungkinkan pengguna kembali ke masa lalu, atau menunjukkan bagaimana status data Anda berubah seiring waktu.

Singkatnya, saat Anda membuat, memperbarui, atau menghapus entitas SubQuery apa pun, kami menyimpan status sebelumnya dengan rentang blok yang valid untuknya. Anda kemudian dapat meminta data dari ketinggian blok tertentu menggunakan titik akhir dan API GraphQL yang sama.

## Mengaktifkan Ini

Fitur ini diaktifkan secara default untuk semua proyek baru yang dimulai dengan setidaknya `@subql/node@1.1.1` dan `@subql/query1.1.0`. Jika Anda ingin menambahkannya ke proyek yang sudah ada, perbarui `@subql/node` dan `@subql/query` lalu indeks ulang proyek Anda dengan database yang bersih.

Jika Anda ingin menonaktifkan fitur ini karena alasan apa pun, Anda dapat menyetel parameter `--disable-historical=true` pada `subql-node`.

Saat startup, status terkini dari fitur ini dicetak ke konsol (`Status historis diaktifkan`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Menanyakan Status Historis

Ada properti khusus (opsional) pada filter entitas GraphQL yang disebut `blockHeight`. Jika Anda menghilangkan properti ini, SubQuery akan menanyakan status entitas pada ketinggian blok saat ini.

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Untuk menanyakan pemilik RMRK NFT pada tinggi blok 5.000.000, tambahkan parameter blockHeight seperti yang ditunjukkan di bawah ini:

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

Untuk menanyakan pemilik koleksi NFT RMRK tersebut pada ketinggian blok terbaru, hilangkan parameter blockHeight seperti yang ditunjukkan di bawah ini.

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
