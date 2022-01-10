# Bendera Baris Perintah

## subql-node

### --help

Ini menunjukkan opsi bantuan.

```shell
> subql-simpul --help
Pilihan:
       --help Tampilkan bantuan [boolean]
       --version Tampilkan nomor versi [boolean]
   -f, --subquery Jalur lokal dari proyek subquery [string]
       --subquery-name Nama proyek subquery [string]
   -c, --config Tentukan file konfigurasi [string]
       --local Gunakan mode lokal [boolean]
       --force-clean Memaksa membersihkan database, menghapus skema proyek
                             dan tabel [boolean]
       --batch-size Ukuran batch blok yang akan diambil dalam satu putaran [angka]
       --timeout Timeout untuk sandbox pengindeks untuk menjalankan pemetaan
                             fungsi [nomor]
       --debug Menampilkan informasi debug ke keluaran konsol. akan
                             secara paksa mengatur level log ke debug
                                                       [boolean] [default: salah]
       --profiler Tampilkan informasi profiler ke keluaran konsol
                                                       [boolean] [default: salah]
       --network-endpoint Titik akhir jaringan blockchain untuk menghubungkan [string]
       --output-fmt Cetak log sebagai json atau teks biasa
                                            [string] [pilihan: "json", "berwarna"]
       --log-level Tentukan level log yang akan dicetak. Diabaikan ketika --debug adalah
                            digunakan
          [string] [pilihan: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "diam"]
      --migrate Migrate db schema (hanya untuk tabel manajemen)
                                                      [boolean] [default: salah]
      --timestamp-field Aktifkan/nonaktifkan create_at dan updated_at dalam skema
                                                       [boolean] [default: benar]
  -d, --network-dictionary Tentukan kamus api untuk jaringan ini [string]
  -m, --mmr-path Jalur lokal dari berkas pegunungan merkle (.mmr)
                                                                        [rangkaian]
      --proof-of-index Mengaktifkan/menonaktifkan bukti indeks
                                                      [boolean] [default: salah]
  -p, --port Port yang akan diikat oleh layanan
                                                        [angka] [default: 3000]
```

### --version

Ini menampilkan versi saat ini.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Gunakan tanda ini untuk memulai proyek SubQuery.

```shell
subql-node -f . // Atau
subql-node --subquery .
```

### --subquery-name

Bendera ini memungkinkan Anda untuk memberikan nama untuk proyek Anda yang bertindak seolah-olah itu membuat turunan dari proyek Anda. Setelah memberikan nama baru, skema database baru dibuat dan sinkronisasi blok dimulai dari nol.

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Semua berbagai konfigurasi ini dapat ditempatkan ke dalam file .yml atau .json dan kemudian dirujuk dengan flag config.

Contoh file subquery_config.yml:

```shell
subquery: . // Mandatory. Ini adalah jalur lokal proyek. Titik di sini berarti direktori lokal saat ini.
subqueryName: halo // Nama opsional
batchSize: 55 // Konfigurasi opsional
```

Tempatkan file ini di direktori yang sama dengan proyek. Kemudian di direktori proyek saat ini, jalankan:

```shell
> subql-node -c ./subquery_config.yml
```

### --local

Bendera ini terutama digunakan untuk tujuan debugging di mana ia membuat tabel starter_entity default dalam skema "postgres" default.

```shell
subql-node -f . --local
```

Perhatikan bahwa setelah Anda menggunakan bendera ini, menghapusnya tidak berarti bahwa itu akan mengarah ke database lain. Untuk menunjuk kembali ke database lain, Anda harus membuat database BARU dan mengubah pengaturan env ke database baru ini. Dengan kata lain, "ekspor DB_DATABASE=<new_db_here>"

### --force-clean

Bendera ini memaksa skema dan tabel proyek untuk dibuat ulang, berguna untuk digunakan saat mengembangkan skema graphql secara iteratif sehingga proyek yang baru berjalan selalu bekerja dengan keadaan bersih. Perhatikan bahwa tanda ini juga akan menghapus semua data yang diindeks.

### --batch-size

Bendera ini memungkinkan Anda untuk mengatur ukuran batch di baris perintah. Jika ukuran batch juga diatur dalam file konfigurasi, ini akan menjadi preseden.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

Ini mengeluarkan informasi debug ke keluaran konsol dan secara paksa menyetel level log ke debug.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Ini menunjukkan informasi profiler.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Bendera ini memungkinkan pengguna untuk mengganti konfigurasi titik akhir jaringan dari file manifes.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Perhatikan bahwa ini juga harus diatur dalam file manifes, jika tidak, Anda akan mendapatkan:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Ada dua format keluaran terminal yang berbeda. JSON atau berwarna. Berwarna adalah default dan berisi teks berwarna.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Ada 7 pilihan yang bisa dipilih. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Contoh di bawah ini menunjukkan diam. Tidak ada yang akan dicetak di terminal sehingga satu-satunya cara untuk mengetahui apakah node berfungsi atau tidak adalah dengan menanyakan database untuk jumlah baris (pilih count(\*) dari subquery_1.starter_entities) atau kueri ketinggian blok.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Silakan gunakan properti detail.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

Secara default ini benar. ketika disetel ke false dengan:

```shell
> subql-node -f . –timestamp-field=false
```

Ini menghapus kolom create_at dan updated_at di tabel starter_entities.

### -d, --network-dictionary

Ini memungkinkan Anda untuk menentukan titik akhir kamus yang merupakan layanan gratis yang disediakan dan dihosting di: [https://explorer.subquery.network/](https://explorer.subquery.network/) (mencari kamus) dan menyajikan titik akhir API: https //api.subquery.network/sq/subquery/dictionary-polkadot

Biasanya ini akan diatur dalam file manifes Anda, tetapi di bawah ini menunjukkan contoh penggunaannya sebagai argumen di baris perintah.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Baca selengkapnya tentang cara kerja Kamus SubQuery](../tutorials_examples/dictionary.md).

## subql-query

### --help

Ini menunjukkan opsi bantuan.

```shell
Pilihan:
       --help Tampilkan bantuan [boolean]
       --version Tampilkan nomor versi [boolean]
   -n, --name Nama proyek [string] [wajib]
       --playground Aktifkan taman bermain graphql [boolean]
       --output-fmt Cetak log sebagai json atau teks biasa
                       [string] [pilihan: "json", "berwarna"] [default: "berwarna"]
       --log-level Tentukan level log yang akan dicetak.
          [string] [pilihan: "fatal", "error", "warn", "info", "debug", "trace",
                                                      "diam"] [default: "info"]
       --indexer Url yang memungkinkan kueri mengakses metadata pengindeks [string]
```

### --version

Ini menampilkan versi saat ini.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Bendera ini digunakan untuk memulai layanan kueri. Jika flag --subquery-name tidak disediakan saat menjalankan pengindeks, nama di sini akan merujuk ke nama proyek default. Jika --subquery-name disetel, maka nama di sini harus sesuai dengan yang disetel.

```shell
> subql-node -f . // --nama-subquery tidak disetel

> subql-query -n subql-helloworld --playground // nama default ke nama direktori proyek
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground // nama menunjuk ke proyek subql-helloworld tetapi dengan nama hiworld
```

### --playground

Bendera ini mengaktifkan taman bermain graphql sehingga harus selalu disertakan secara default untuk digunakan apa pun.

### --output-fmt

Lihat [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

Lihat [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
