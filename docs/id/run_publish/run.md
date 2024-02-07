# Menjalankan SubQuery Secara Lokal

Panduan ini bekerja melalui cara menjalankan node SubQuery lokal pada infrastruktur Anda, yang mencakup pengindeks dan layanan kueri. Tidak ingin khawatir menjalankan infrastruktur SubQuery Anda sendiri? SubQuery menyediakan [Layanan Terkelola](https://explorer.subquery.network) kepada komunitas secara gratis. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## Gunakan Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. Untuk proyek baru yang baru saja diinisialisasi, Anda tidak perlu mengubah apa pun di sini.

Di bawah direktori proyek jalankan perintah berikut:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Menjalankan Pengindeks (subql/node)

Persyaratan:

- [Postgres](https://www.postgresql.org/) database (version 16 or higher). Sementara [Node SubQuery](run.md#start-a-local-subquery-node) mengindeks blockchain, data yang diekstraksi disimpan dalam instance database eksternal.

Node SubQuery adalah implementasi yang mengekstrak data blockchain berbasis substrat per proyek SubQuery dan menyimpannya ke dalam database Postgres.

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

### Instalasi

::: code-tabs @tab Substrate/Polkadot

```shell
# NPM
npm install -g @subql/node
```

@tab EVM

```shell
# NPM
npm install -g @subql/node-ethereum
```

@tab Cosmos

```shell
# NPM
npm install -g @subql/node-cosmos
```

@tab Algorand

```shell
# NPM
npm install -g @subql/node-algorand
```

@tab Near

```shell
# NPM
npm install -g @subql/node-near
```

@tab stellar

```shell
# NPM
npm install -g @subql/node-stellar
```

@tab Concordium

```shell
# NPM
npm install -g @subql/node-concordium
```

:::

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

Setelah terinstal, Anda dapat memulai node dengan perintah berikut:

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab EVM

```shell
subql-node-ethereum <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

@tab Near

```shell
subql-node-near <command>
```

@tab Stellar

```shell
subql-node-stellar <command>
```

@tab Concordium

```shell
subql-node-concordium <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Untuk mengetahui lebih lanjut, Anda selalu dapat menjalankan `--help`.

#### Arahkan ke jalur proyek lokal

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab EVM

```shell
subql-node-ethereum -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

@tab Near

```shell
subql-node-near -f your-project-path
```

@tab Stellar

```shell
subql-node-stellar -f your-project-path
```

@tab Concordium

```shell
subql-node-concordium -f your-project-path
```

:::

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Bergantung pada konfigurasi database Postgres Anda (misalnya kata sandi database yang berbeda), harap pastikan juga bahwa pengindeks (`subql/node`) dan layanan kueri (`subql/query`) dapat membuat koneksi ke sana.

If your database is using SSL, you can use the following command to add the server certificate to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.key
```

#### Specify a configuration file

::: code-tabs

@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
```

@tab EVM (Ethereum, Polygon, BNB Smart Chain, Avalanche, Flare)

```shell
subql-node-ethereum -c your-project-config.yml
```

@tab Cosmos

```shell
subql-node-cosmos -c your-project-config.yml
```

@tab Algorand

```shell
subql-node-algorand -c your-project-config.yml
```

@tab Near

```shell
subql-node-near -c your-project-config.yml
```

:::

This will point the query node to a manifest file which can be in TS, YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
<BlockDispatcherService> INFO Enqueueing blocks 203...402, total 200 blocks
<BlockDispatcherService> INFO Enqueueing blocks 403...602, total 200 blocks
```

Saat pengindeks pertama kali mengindeks rantai, mengambil blok tunggal akan secara signifikan menurunkan kinerja. Meningkatkan ukuran batch untuk menyesuaikan jumlah blok yang diambil akan mengurangi waktu pemrosesan secara keseluruhan. Ukuran batch default saat ini adalah 100.


::: tip Note SubQuery uses Node.js, by default this will use 4GB of memory. If you are running into memory issues or wish to get the most performance out of indexing you can increase the memory that will be used by setting the following environment variable `export NODE_OPTIONS=--max_old_space_size=<memory-in-MB>`. It's best to make sure this only applies to the node and not the query service. :::

#### Mengcek kesehatan Node

Ada 2 endpoint yang dapat Anda gunakan untuk memeriksa dan memantau kesehatan node SubQuery yang sedang berjalan.

- Titik akhir pemeriksaan kesehatan yang mengembalikan respons 200 sederhana.
- Endpoint metadata yang mencakup analisis tambahan dari node SubQuery yang sedang berjalan.

Tambahkan ini ke URL dasar node SubQuery Anda. Misalnya `http://localhost:3000/meta` akan kembali:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` akan mengembalikan HTTP 200 jika berhasil.

Kesalahan 500 akan dikembalikan jika pengindeks tidak sehat. Hal ini sering terlihat ketika node sedang booting.

```shell
{
    "status": 500,
    "error": "Pengindeks tidak sehat"
}
```

Jika URL yang digunakan salah, kesalahan 404 tidak ditemukan akan ditampilkan.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debug proyek Anda

Gunakan [inspektur simpul](https://nodejs.org/en/docs/guides/debugging-getting-started/) untuk menjalankan perintah berikut.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

For example:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Untuk bantuan, klik link berikut: https://nodejs.org/en/docs/inspector
Debugger Terpasang.
```

Kemudian buka alat pengembang Chrome, buka Sumber > Filesystem dan tambahkan proyek Anda ke ruang kerja dan mulai debugging. Untuk informasi lebih lanjut, periksa [Cara men-debug proyek SubQuery](../academy/tutorials_examples/debug-projects.md).

## Menjalankan Layanan Kueri (subql/query)

### Instalasi

```shell
# NPM
npm install -g @subql/query
```

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

### Menjalankan layanan Kueri

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Pastikan nama proyek sama dengan nama proyek saat Anda [menginisialisasi proyek](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Juga, periksa variabel lingkungan sudah benar.

Setelah menjalankan layanan subql-query dengan sukses, buka browser Anda dan buka `http://localhost:3000`. Anda akan melihat taman bermain GraphQL ditampilkan di Explorer dan skema yang siap untuk kueri.
