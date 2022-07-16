# Bendera Baris Perintah

## subql (cli)

### --help

```shell
> subql --help

PERINTAH
  build Bangun kode proyek SubQuery ini
  codegen Hasilkan skema untuk simpul graf
  help menampilkan bantuan untuk subql
  init Inisialisasi proyek subquery perancah
  migrate Migrasikan Manifest proyek SubQuery v0.0.1 ke v0.2.0
  publish Unggah proyek SubQuery ini ke IPFS
  validate Memeriksa folder atau repo github adalah proyek subquery yang validate
```

### build

Perintah ini menggunakan webpack untuk menghasilkan bundel proyek subquery.

| Pilihan            | Deskripsi                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | folder lokal proyek subquery (jika belum ada di folder)                                                    |
| -o, --output       | tentukan folder keluaran build mis. membangun-folder                                                       |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- Dengan `subql build` Anda dapat menentukan titik masuk tambahan di bidang ekspor meskipun itu akan selalu dibangun `index.ts` secara otomatis.

- Anda harus memiliki @subql/cli v0.19.0 atau lebih tinggi untuk menggunakan bidang ekspor.

- Setiap bidang `ekspor` harus dipetakan ke tipe string (mis. `"entry": "./src/file.ts"`), jika tidak, akan diabaikan dari build.

[Contoh lebih lanjut](../build/introduction.md#build).

## subql-node

### --help

Ini menunjukkan opsi bantuan.

```shell
> subql-node --help
Options:
      --help                Menunjukkan bantuan                          [boolean]
      --version             Tampilkan nomor versi                        [boolean]
  -f, --subquery            Jalur lokal dari proyek subquery             [string]
      --subquery-name       Nama proyek subquery                         [deprecated] [string]
  -c, --config              Tentukan file konfigurasi                    [string]
      --local               Gunakan mode lokal                     [deprecated] [boolean]
      --force-clean         Bersihkan paksa database, hapus skema proyek dan meja                            [boolean]
      --db-schema           Nama skema db proyek               [string]
      --unsafe              Mengizinkan penggunaan modul bawaan apa pun di dalam bak pasir                    [boolean][default: false]
      --batch-size          Ukuran batch balok untuk diambil dalam satu putaran  [number]
      --scale-batch-size    skala ukuran batch berdasarkan penggunaan memori  [boolean] [default: false]
      --timeout             Batas waktu untuk kotak pasir pengindeks untuk menjalankan pemetaan fungsi                                   [number]
      --debug               Tampilkan informasi debug ke keluaran konsol. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --subscription        Enable subscription       [boolean] [default: false]                                                     
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Diabaikan ketika --debug adalah
                             digunakan
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrasikan skema db (hanya untuk tabel manajemen)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                      [boolean] [default: false]
  -d, --network-dictionary  Tentukan api kamus untuk jaringan ini [string]
  -m, --mmr-path            Jalur lokal pegunungan merkle (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                Port yang akan diikat oleh layanan           [number]
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
subql-node -f . // ATAU
subql-node --subquery .
```

### --subquery-name (usang)

Bendera ini memungkinkan Anda untuk memberikan nama untuk proyek Anda yang bertindak seolah-olah itu membuat turunan dari proyek Anda. Setelah memberikan nama baru, skema database baru dibuat dan sinkronisasi blok dimulai dari nol. Tidak digunakan lagi karena `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Semua berbagai konfigurasi ini dapat ditempatkan ke dalam file .yml atau .json dan kemudian dirujuk dengan flag config.

Contoh file subquery_config.yml:

```shell
subquery: . // Mandatory. Ini adalah jalur lokal proyek. Titik di sini berarti direktori lokal saat ini.
subqueryName: hello // Pilihan nama
batchSize: 55 // Pilihan config
```

Tempatkan file ini di direktori yang sama dengan proyek. Kemudian di direktori proyek saat ini, jalankan:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (usang)

Bendera ini terutama digunakan untuk tujuan debugging di mana ia membuat tabel starter_entity default dalam skema "postgres" default.

```shell
subql-node -f . --local
```

Perhatikan bahwa setelah Anda menggunakan bendera ini, menghapusnya tidak berarti bahwa itu akan mengarah ke database lain. Untuk menunjuk kembali ke database lain, Anda harus membuat database BARU dan mengubah pengaturan env ke database baru ini. Dengan kata lain, "ekspor DB_DATABASE=<new_db_here>".

### --force-clean

Bendera ini memaksa skema dan tabel proyek untuk dibuat ulang, berguna untuk digunakan saat mengembangkan skema graphql secara iteratif sehingga proyek yang berjalan baru selalu bekerja dengan keadaan bersih. Perhatikan bahwa tanda ini juga akan menghapus semua data yang diindeks.

### --db-schema

Bendera ini memungkinkan Anda untuk memberikan nama untuk skema database proyek. Setelah memberikan nama baru, skema database baru dibuat dengan nama yang dikonfigurasi dan pengindeksan blok dimulai.

```shell
subql-node -f . --db-schema=test2
```

### --berlangganan
Ini akan membuat pemicu notifikasi pada entitas, ini juga merupakan prasyarat untuk mengaktifkan fitur berlangganan di layanan kueri.

### --unsafe

Proyek SubQuery biasanya dijalankan dalam kotak pasir javascript untuk keamanan guna membatasi cakupan akses yang dimiliki proyek ke sistem Anda. Kotak pasir membatasi impor javascript yang tersedia ke modul berikut:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Meskipun ini meningkatkan keamanan, kami memahami bahwa ini membatasi fungsionalitas SubQuery Anda yang tersedia. Perintah `--unsafe` mengimpor semua modul javascript default yang sangat meningkatkan fungsionalitas kotak pasir dengan pengorbanan keamanan yang menurun.

**Juga, perhatikan bahwa perintah `--unsafe` akan mencegah proyek Anda dijalankan di Jaringan SubQuery, dan Anda harus menghubungi dukungan jika Anda ingin perintah ini dijalankan dengan proyek Anda di [ layanan terkelola SubQuery](https://project.subquery.network).**

### --batch-size

Bendera ini memungkinkan Anda untuk mengatur ukuran batch di baris perintah. Jika ukuran batch juga diatur dalam file konfigurasi, ini akan menjadi preseden.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Skala ukuran batch pengambilan blok dengan penggunaan memori.

### --timeout

Setel batas waktu khusus untuk kotak pasir javascript untuk menjalankan fungsi pemetaan di atas satu blok sebelum fungsi pemetaan blok mengeluarkan pengecualian batas waktu.

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
GALAT Buat proyek Subquery dari jalur yang diberikan gagal! Kesalahan: gagal mengurai project.yaml.
Sebuah instance dari ProjectManifestImpl telah gagal validasi:
 - jaringan properti telah gagal dalam batasan berikut: isObject
 - properti network.network telah gagal dalam batasan berikut: nestedValidation
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

Ini memungkinkan Anda untuk menentukan titik akhir kamus yang merupakan layanan gratis yang disediakan dan dihosting di: [https://explorer.subquery.network/](https://explorer.subquery.network/) (mencari kamus) dan menyajikan titik akhir API: https //api.subquery.network/sq/subquery/dictionary-polkadot.

Biasanya ini akan diatur dalam file manifes Anda, tetapi di bawah ini menunjukkan contoh penggunaannya sebagai argumen di baris perintah.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Baca selengkapnya tentang cara kerja Kamus SubQuery](../academy/tutorials_examples/dictionary.md).

### -p, --port

Port yang diikat oleh layanan pengindeksan subquery. Secara default ini diatur ke `3000`.

### --disable-historical

Menonaktifkan pelacakan status historis otomatis, [lihat Pelacakan Status Historis](./historical.md). Secara default ini diatur ke `3000`.

## subql-query

### --help

Ini menunjukkan opsi bantuan.

```shell
Options:
      --help          Menunjukan help                                          [boolean]
      --version       Menunjukan version number                                [boolean]
  -n, --name          Nama Project                              [string] [required]
      --playground    Enable graphql playground                          [boolean]
      --subscription  Enable subscription               [boolean] [default: false]   
      --output-fmt    Print log as json or plain text
                        [string] [choices: "json", "colored"] [default: "colored"]
      --log-level     Specify log level to print.
            [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [default: "info"]
      --log-path      Path to create log file e.g ./src/name.log          [string]
      --log-rotate    Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer       Url yang memungkinkan kueri mengakses metadata pengindeks    [string]
      --unsafe        Nonaktifkan batasan pada kedalaman kueri dan jumlah yang diizinkan yang dikembalikan
                       catatan kueri                                      [boolean]
  -p, --port          Port yang akan diikat oleh layanan                 [number]
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
> subql-node -f . // --subquery-name tidak diatur

> subql-query -n subql-helloworld  --playground // nama default ke nama direktori proyek
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // namanya menunjuk ke proyek subql-helloworld tetapi dengan nama hiworld
```

### --playground

Bendera ini mengaktifkan taman bermain graphql sehingga harus selalu disertakan secara default untuk digunakan apa pun.

### --output-fmt

Lihat [--output-fmt](../run_publish/references.md#output-fmt).

### --log-level

Lihat [--log-level](../run_publish/references.md#log-level).

### --log-path

Aktifkan logging file dengan menyediakan jalur ke file untuk login ke.

### --log-rotate

Aktifkan rotasi log file dengan opsi interval rotasi 1d, maksimal 7 file dan dengan ukuran file maksimal 1GB.

### --indexer

Tetapkan url khusus untuk lokasi titik akhir pengindeks, layanan kueri menggunakan titik akhir ini untuk kesehatan pengindeks, metadata, dan status kesiapan.

### --subscription

Tanda ini mengaktifkan [GraphQL Langganan](./subscription.md), untuk mengaktifkan fitur ini memerlukan `subql-node` juga mengaktifkan `--langganan`.

### --unsafe

Layanan kueri memiliki batas 100 entitas untuk kueri graphql tak terbatas. Bendera tidak aman menghapus batas ini yang dapat menyebabkan masalah kinerja pada layanan kueri. Sebagai gantinya, disarankan agar kueri [diberi halaman](https://graphql.org/learn/pagination/).

Bendera ini memungkinkan fungsi agregasi tertentu termasuk jumlah, maks, rata-rata, dan lainnya. Baca selengkapnya tentang fitur ini [di sini](../run_publish/aggregate.md).

Ini dinonaktifkan secara default karena batas entitas.

**Juga, perhatikan bahwa perintah `--unsafe` akan mencegah proyek Anda dijalankan di Jaringan SubQuery, dan Anda harus menghubungi dukungan jika Anda ingin perintah ini dijalankan dengan proyek Anda di [ layanan terkelola SubQuery](https://project.subquery.network).**

### --port

Port yang diikat oleh layanan kueri subkueri. Secara default ini diatur ke `3000`
