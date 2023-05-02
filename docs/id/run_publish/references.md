# Bendera Baris Perintah

## subql (cli)

### --help

This shows all the current command options for your current verison of `subql-cli`.

### build

This command is uses webpack to generate a bundle of a subquery project.

| Pilihan        | Deskripsi                                               |
| -------------- | ------------------------------------------------------- |
| -l, --location | folder lokal proyek subquery (jika belum ada di folder) |
| -o, --output   | tentukan folder keluaran build mis. membangun-folder    |
| --mode         | production or development (default: production)         |

- Dengan `subql build` Anda dapat menentukan titik masuk tambahan di bidang ekspor meskipun itu akan selalu dibangun `index.ts` secara otomatis.

- Anda harus memiliki @subql/cli v0.19.0 atau lebih tinggi untuk menggunakan bidang ekspor.

- Setiap bidang `ekspor` harus dipetakan ke tipe string (mis. `"entry": "./src/file.ts"`), jika tidak, akan diabaikan dari build.

For more info, visit [basic workflows](../build/introduction.md#build).

## subql-node

### --help

This shows all the current command options for your current verison of `subql-node`.

### --batch-size

Bendera ini memungkinkan Anda untuk mengatur ukuran batch di baris perintah. Jika ukuran batch juga diatur dalam file konfigurasi, ini akan menjadi preseden.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --block-confirmations

(EVM only) The number of blocks behind the head to be considered finalized, this has no effect with non-EVM networks. This is by default 20.

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

### -d, --network-dictionary

Ini memungkinkan Anda untuk menentukan titik akhir kamus yang merupakan layanan gratis yang disediakan dan dihosting di: [https://explorer.subquery.network/](https://explorer.subquery.network/) (mencari kamus) dan menyajikan titik akhir API: https //api.subquery.network/sq/subquery/dictionary-polkadot.

Biasanya ini akan diatur dalam file manifes Anda, tetapi di bawah ini menunjukkan contoh penggunaannya sebagai argumen di baris perintah.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

For more info, visit [How does a SubQuery Dictionary works?](../academy/tutorials_examples/dictionary.md)

### --db-schema

Bendera ini memungkinkan Anda untuk memberikan nama untuk skema database proyek. Setelah memberikan nama baru, skema database baru dibuat dengan nama yang dikonfigurasi dan pengindeksan blok dimulai.

```shell
subql-node -f . --db-schema=test2
```

### --debug

Ini mengeluarkan informasi debug ke keluaran konsol dan secara paksa menyetel level log ke debug.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --disable-historical

Menonaktifkan pelacakan status historis otomatis, [lihat Pelacakan Status Historis](./historical.md). Secara default ini diatur ke `3000`.

### --dictionary-resolver

Uses the provided SubQuery Network dictionary resolver to find a dictionary, this will overwrite dictionaries specified by `--network-dictionary`

### --dictionary-timeout

Changes the timeout for dictionary queries, this number is expressed in seconds. By default we use 30 seconds.

### -f, --subquery

Gunakan tanda ini untuk memulai proyek SubQuery.

```shell
subql-node -f . // ATAU
subql-node --subquery .
```

### force-clean

- In order to use this command you need to have `@subql/node` v1.10.0 or above.

This command forces the project schemas and tables to be regenerated. It is helpful to use when iteratively developing graphql schemas in order to ensure a clean state when starting a project. Perhatikan bahwa tanda ini juga akan menghapus semua data yang diindeks. This will also drop all related schema and tables of the project.

`-f`, `--subquery` flag must be passed in, to set path of the targeted project.

::: tip Note Similar to `reindex` command, the application would exit upon completion. :::

```shell
subql-node -f /example/subql-project force-clean
```

### --local (usang)

Bendera ini terutama digunakan untuk tujuan debugging di mana ia membuat tabel starter_entity default dalam skema "postgres" default.

```shell
subql-node -f . --local
```

Perhatikan bahwa setelah Anda menggunakan bendera ini, menghapusnya tidak berarti bahwa itu akan mengarah ke database lain. Untuk menunjuk kembali ke database lain, Anda harus membuat database BARU dan mengubah pengaturan env ke database baru ini. Dengan kata lain, "ekspor DB_DATABASE=<new_db_here>".

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

### --multi-chain

Enables indexing multiple subquery projects into the same database schema.

```shell
> subql-node -f . --multi-chain --db-schema=SCHEMA_NAME
```

For more info, visit [Multi-Chain Support](../build/multi-chain.md).

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

### -p, --port

Port yang diikat oleh layanan pengindeksan subquery. Secara default ini diatur ke `3000`.

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --profiler

Ini menunjukkan informasi profiler.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### reindex

:::warning In order to use this command, you require `@subql/node:v1.10.0`/`@subql/node-YOURNETWORK:v1.10.0` or above. :::

When using reindex command, historical must be enabled for the targeted project (`--disable-historical=false`). After starting the project, it would print out a log stating if historical is enabled or not.

For more info, visit [Automated Historical State Tracking](./historical.md)

Use `--targetHeight=<blockNumber>` with `reindex` to remove indexed data and reindex from specified block height.

`-f` or `--subquery` flag must be passed in, to set path of the targeted project.

If the `targetHeight` is less than the declared starting height, it will execute the `--force-clean` command.

```shell
subql-node -f /example/subql-project reindex --targetHeight=30
```

::: tip Note
Once the command is executed and the state has been rolled back the the specified height, the application will exit. You can then start up the indexer to proceed again from this height.
:::

### --scale-batch-size

Skala ukuran batch pengambilan blok dengan penggunaan memori.

### --store-cache-threshold

This can be specified when `--store-cache-async=false`. Store cache will flush data to the database when number of records excess this threshold, a higher number reduces number of transactions to database in order to save time but requires more memory. The default is 1000 records.

### --store-get-cache-size

This can be specified when `--store-cache-async=false`. The number of items from the store retained in a memory cache for faster retrieval of recent data within handlers. A higher number may increase indexing speed, but will require more memory. The default is 500.

### --store-cache-async

If enabled the store cache will flush data asynchronously relative to indexing data (enabled by default)

### --berlangganan

Ini akan membuat pemicu notifikasi pada entitas, ini juga merupakan prasyarat untuk mengaktifkan fitur berlangganan di layanan kueri.

### --subquery-name (usang)

Bendera ini memungkinkan Anda untuk memberikan nama untuk proyek Anda yang bertindak seolah-olah itu membuat turunan dari proyek Anda. Setelah memberikan nama baru, skema database baru dibuat dan sinkronisasi blok dimulai dari nol. Tidak digunakan lagi karena `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### --timeout

Setel batas waktu khusus untuk kotak pasir javascript untuk menjalankan fungsi pemetaan di atas satu blok sebelum fungsi pemetaan blok mengeluarkan pengecualian batas waktu.

### --timestamp-field

Secara default ini benar. When set to false, it removes the created_at and updated_at columns in the starter_entities table.

```shell
> subql-node -f . –timestamp-field=false
```

### --unfinalized-blocks

This allows you to index blocks before they become finalized. It can be very useful if you want the most up-to-date data possible. It will detect any forks and remove any blocks that don't become finalized. By default it is set to `false`. To change it to `true` run following command:

```shell
> subql-node -f . --unfinalized-blocks
```

::: tip Tip Note that this feature **requires historical indexing** to be enabled. Learn more [here](./historical.md). :::

::: tip Note
This feature is only available for Substrate-based blockchains; more networks will be supported in the future.
:::

### --unsafe (Node Service)

Unsafe mode controls various features that compromise the determinism of a SubQuery project. It makes it impossible to guarantee that the data within two identical projects running independently, will be 100% consistent.

One way we control this is by running all projects in a JS sandbox for security to limit the scope of access the project has to your system. Kotak pasir membatasi impor javascript yang tersedia ke modul berikut:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security, we understand that this limits the available functionality of your SubQuery project. The `--unsafe` command allows any import which greatly increases functionality with the tradeoff of decreased security.

By extension, the `--unsafe` command on the SubQuery Node also allows:

- making external requests (e.g. via Fetch to an external HTTP address or fs)
- querying block data at any height via the unsafeApi

**Note that users must be on a paid plan to run projects with the `--unsafe` command (on the node service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

Also review the [--unsafe command on the query service](#unsafe-query-service).

### --version

Ini menampilkan versi saat ini.

```shell
> subql-node --version
0.19.1
```

### -w, --workers

Ini akan memindahkan pengambilan dan pemrosesan blok ke dalam worker. Secara default, fitur ini **disabled**. Anda bisa mengaktifkannya dengan flag `--workers=<number>`.

Perhatikan bahwa jumlah core CPU yang tersedia sangat membatasi penggunaan thread pekerja. Jadi, ketika menggunakan flag `--workers=<number>`, selalu tentukan jumlah pekerja. Tanpa flag yang disediakan, semuanya akan berjalan dalam thread yang sama.

:::tip Tip Tip Ini bisa meningkatkan performa hingga 4 kali lipat. Cobalah dan beri tahu kami tanggapan Anda!

Saat ini, ini masih dalam tahap percobaan awal, tetapi kami berencana untuk mengaktifkannya secara default. :::

On initialisation, once the main thread is established, then the fetching and processing workload is distributed across all worker threads. Each worker has their own buffer (a set of blocks that they are responsible to fetch/process). For example:

- Worker A: Will execute the `fetch` and `indexing` of blocks `[n,..n+10]`
- Worker B: Will execute the `fetch` and `indexing` of blocks `[n+11,..n+20]`
- Worker C: Will execute the `fetch` and `indexing` of blocks `[n+21,..n+30]`
- Then repeat with `n = n + 30`

In the case where Worker C completes its fetch prior to Worker A and B, it will remain in an idle state until A and B have completed, as the processing phase executes sequentially.

## subql-query

### --help

This shows all the current command options for your current verison of `subql-query`.

### --aggregate

Enables or disables the GraphQL aggregation feature, [read more about this here](../run_publish/aggregate.md). By default this is set to true.

### --disable-hot-schema

Disables the hot reload schema on project schema changes, by default this is set to false.

### --indexer

Tetapkan url khusus untuk lokasi titik akhir pengindeks, layanan kueri menggunakan titik akhir ini untuk kesehatan pengindeks, metadata, dan status kesiapan.

### --log-level

Lihat [--log-level](../run_publish/references.md#log-level).

### --log-path

Aktifkan logging file dengan menyediakan jalur ke file untuk login ke.

### --log-rotate

Aktifkan rotasi log file dengan opsi interval rotasi 1d, maksimal 7 file dan dengan ukuran file maksimal 1GB.

### --max-connection

The maximum simultaneous connections allowed to this GraphQL query service expressed as a positive integer. The default value is 10.

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

### --output-fmt

Lihat [--output-fmt](../run_publish/references.md#output-fmt).

### --playground

Bendera ini mengaktifkan taman bermain graphql sehingga harus selalu disertakan secara default untuk digunakan apa pun.

### --playground-settings

You can use this flag to pass additional settings to the GraphQL playground (in JSON format). Additional settings can be found here https://github.com/graphql/graphql-playground#settings

### --port

The port the subquery query service binds to. By default this is set to `3000`

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --query-complexity

The level of query complexity that this service will accept expressed as a positive integer. By default this is set to 10. If a client makes a query with a query complexity higher than this level, the GraphQL query service will reject the request.

We use the [graphqql-query-complexity](https://www.npmjs.com/package/graphql-query-complexity) plugin to calculate this value.

### --query-limit

The query service by default has a limit of 100 entities for to prevent unbounded GraphQL queries and encourage the use of pagination. This flag accepts a positive integer value that will change this limit (by default this is set to 100). Setting a high value may cause performance issues on the query service, it is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

### --query-timeout

The timeout for long running graphql queries expressed in milliseconds, by default this value is 10000 milliseconds

### --subscription

Tanda ini mengaktifkan [GraphQL Langganan](./subscription.md), untuk mengaktifkan fitur ini memerlukan `subql-node` juga mengaktifkan `--langganan`.

### --unsafe (Query Service)

Bendera ini memungkinkan fungsi agregasi tertentu termasuk jumlah, maks, rata-rata, dan lainnya. Baca selengkapnya tentang fitur ini [di sini](../run_publish/aggregate.md).

These are disabled by default for database performance reasons.

**Note that must be on a Partner plan if you would like to run projects with the `--unsafe` command (on the query service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

### --version

Ini menampilkan versi saat ini.

```shell
> subql-query --version
0.7.0
```
