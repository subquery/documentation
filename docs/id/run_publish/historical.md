# Pelacakan Status Historis Otomatis

## Latar Belakang

SubQuery memungkinkan Anda untuk mengindeks data apa pun yang Anda inginkan dari Substrat, Avalance, dan jaringan lainnya. Saat ini, SubQuery beroperasi sebagai penyimpanan data yang dapat diubah, tempat Anda dapat menambahkan, memperbarui, menghapus, atau mengubah entitas tersimpan yang ada dalam kumpulan data yang diindeks oleh SubQuery. Saat SubQuery mengindeks setiap blok, status setiap entitas dapat diperbarui atau dihapus berdasarkan logika proyek Anda.

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

## Menanyakan Status Historis

Ada properti khusus (opsional) pada filter entitas GraphQL yang disebut `blockHeight`. Jika Anda menghilangkan properti ini, SubQuery akan menanyakan status entitas pada ketinggian blok saat ini.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

Untuk menanyakan pemilik RMRK NFT pada tinggi blok 5.000.000, tambahkan parameter blockHeight seperti yang ditunjukkan di bawah ini:

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

Untuk menanyakan pemilik koleksi NFT RMRK tersebut pada ketinggian blok terbaru, hilangkan parameter blockHeight seperti yang ditunjukkan di bawah ini.

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