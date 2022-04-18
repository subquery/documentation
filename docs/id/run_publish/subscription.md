# Berlangganan

## Apa itu Berlangganan GraphQL

SubQuery sekarang juga mendukung Graphql Subscriptions. Seperti kueri, langganan memungkinkan Anda mengambil data. Tidak seperti kueri, langganan adalah operasi jangka panjang yang dapat mengubah hasilnya seiring waktu.

Langganan sangat berguna ketika Anda ingin aplikasi klien Anda mengubah data atau menampilkan beberapa data baru segera setelah perubahan itu terjadi atau data baru tersedia. Langganan memungkinkan Anda untuk *berlangganan* ke proyek SubQuery Anda untuk perubahan.

[Baca lebih lanjut tentang langganan di sini](https://www.apollographql.com/docs/react/data/subscriptions/)

## Cara Berlangganan Entitas

Contoh dasar dari langganan GraphQL adalah untuk diberi tahu ketika ada entitas baru yang dibuat. Dalam contoh berikut, kami berlangganan entitas `Transfer` dan menerima pembaruan bila ada perubahan pada tabel ini.

Anda dapat membuat langganan dengan menanyakan titik akhir GraphQL sebagai berikut. Sambungan Anda kemudian akan berlangganan setiap perubahan yang dibuat pada tabel entitas `Transfer`.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Badan entitas dalam kueri Anda menunjukkan data apa yang ingin Anda terima melalui langganan Anda saat tabel `Transfer` diperbarui:
- `id`: Mengembalikan ID entitas yang telah diubah
- `mutation_type`: Tindakan yang telah dilakukan pada entitas ini. Jenis mutasi dapat berupa `INSERT`, `UPDATE` or `DELETE`
- `_entity`: nilai entitas itu sendiri dalam format JSON.

## Penyaringan

Kami juga mendukung filter pada langganan, yang berarti klien hanya boleh menerima data langganan yang diperbarui jika data atau mutasi tersebut memenuhi kriteria tertentu.

Ada dua jenis filter yang kami dukung:

- `id` : Filter untuk hanya mengembalikan perubahan yang memengaruhi entitas tertentu (ditunjuk oleh ID).
- `mutation_type`: Hanya jenis mutasi yang sama yang telah dibuat yang akan mengembalikan pembaruan.

Asumsikan kita memiliki entitas `Saldo`, dan itu mencatat saldo setiap akun.

```graphql
type Balances {
  id: ID! # akun seseorang , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # saldo akun ini
}
```

Jika kami ingin berlangganan pembaruan saldo apa pun yang memengaruhi akun tertentu, kami dapat menentukan filter langganan sebagai berikut:

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

Perhatikan bahwa filter `mutasi` dapat menjadi salah satu dari `INSERT`, `UPDATE` or `DELETE`

**Harap perhatikan bahwa Anda harus mengaktifkan tanda `--berlangganan` pada node dan layanan kueri untuk menggunakan fungsi ini.**

Fitur berlangganan berfungsi pada layanan terkelola SubQuery saat Anda langsung memanggil titik akhir GraphQL yang terdaftar. Ini tidak akan berfungsi dalam taman bermain GraphQL dalam browser.
