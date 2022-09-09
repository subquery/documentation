# Menjalankan SubQuery Secara Lokal

Panduan ini bekerja melalui cara menjalankan node SubQuery lokal pada infrastruktur Anda, yang mencakup pengindeks dan layanan kueri. Tidak ingin khawatir menjalankan infrastruktur SubQuery Anda sendiri? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Ikuti panduan penerbitan kami](../run_publish/publish.md) untuk melihat bagaimana Anda dapat mengunggah proyek Anda ke [Proyek SubQuery](https://project.subquery.network).

## Gunakan Docker

Solusi alternatif adalah dengan menjalankan <strong>Docker Container</strong>, yang ditentukan oleh file `docker-compose.yml`. Untuk proyek baru yang baru saja diinisialisasi, Anda tidak perlu mengubah apa pun di sini.

Di bawah direktori proyek jalankan perintah berikut:

```shell
docker-compose pull && docker-compose up
```

::: Mungkin perlu beberapa waktu untuk mengunduh paket yang diperlukan ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), dan Postgres) untuk pertama kalinya tetapi segera Anda akan melihat Node subkueri. :::

## Menjalankan Pengindeks (subql/node)

Persyaratan:

- Basis data [Postgres](https://www.postgresql.org/) (versi 12 atau lebih tinggi). Sementara [Node SubQuery](run.md#start-a-local-subquery-node) mengindeks blockchain, data yang diekstraksi disimpan dalam instance database eksternal.

Node SubQuery adalah implementasi yang mengekstrak data blockchain berbasis substrat per proyek SubQuery dan menyimpannya ke dalam database Postgres.

### Instalasi

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
# NPM
npm install -g @subql/node-avalanche
```

</CodeGroupItem>
</CodeGroup>

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line. :::

Setelah terinstal, Anda dapat memulai node dengan perintah berikut:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command>
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Untuk mengetahui lebih lanjut, Anda selalu dapat menjalankan `--help`.

#### Arahkan ke jalur proyek lokal

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Menggunakan kamus rantai lengkap dapat secara dramatis mempercepat pemrosesan proyek SubQuery selama pengujian atau selama indeks pertama Anda. Dalam beberapa kasus, kami telah melihat peningkatan kinerja pengindeksan hingga 10x.

Kamus rantai penuh mengindeks lokasi semua peristiwa dan ekstrinsik dalam rantai tertentu dan memungkinkan layanan node Anda untuk melompat ke lokasi yang relevan saat mengindeks daripada memeriksa setiap blok.

Anda dapat menambahkan titik akhir kamus di file `project.yaml` Anda (lihat [File Manifes](../build/manifest/polkadot.md)), atau tentukan saat dijalankan menggunakan perintah berikut:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --jaringan-kamus=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --kamus jaringan=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --kamus jaringan=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

::::: info Catatan Anda dapat membaca lebih lanjut tentang [bagaimana Kamus SubQuery bekerja](../academy/tutorials_examples/dictionary.md). :::

#### Hubungkan ke basis data

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Bergantung pada konfigurasi database Postgres Anda (misalnya kata sandi database yang berbeda), harap pastikan juga bahwa pengindeks (`subql/node`) dan layanan kueri (`subql/query`) dapat membuat koneksi ke sana.

#### Tentukan file konfigurasi

<CodeGroup>
<CodeGroupItem title='Substrate'>

``shell
subql-node -c your-project-config.yml

````

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
````

</CodeGroupItem>
</CodeGroup>

This will redirect the query node to the configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Bagaimana cara mengubah ukuran blockchain fetching batch

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Saat pengindeks pertama kali mengindeks rantai, mengambil blok tunggal akan secara signifikan menurunkan kinerja. Meningkatkan ukuran batch untuk menyesuaikan jumlah blok yang diambil akan mengurangi waktu pemrosesan secara keseluruhan. Ukuran batch default saat ini adalah 100.

#### Berjalan dalam mode lokal

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

Untuk tujuan debugging, pengguna dapat menjalankan node dalam mode lokal. Beralih ke model lokal akan membuat tabel Postgres dalam skema default `publik`.

Jika mode lokal tidak digunakan, skema Postgres baru dengan `subquery_` awal dan tabel proyek yang sesuai akan dibuat.

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

Sebagai contoh:

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

::: Harap dicatat bahwa kami **JANGAN** mendorong penggunaan `global benang` karena manajemen ketergantungannya yang buruk yang dapat menyebabkan kesalahan di masa mendatang. :::

### Menjalankan layanan Kueri

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Pastikan nama proyek sama dengan nama proyek saat Anda [menginisialisasi proyek](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Juga, periksa variabel lingkungan sudah benar.

Setelah menjalankan layanan subql-query dengan sukses, buka browser Anda dan buka `http://localhost:3000`. Anda akan melihat taman bermain GraphQL ditampilkan di Explorer dan skema yang siap untuk kueri.
