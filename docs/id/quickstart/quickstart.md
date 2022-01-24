# Panduan Memulai Cepat

Dalam panduan Mulai Cepat ini, kita akan membuat proyek awal sederhana yang dapat Anda gunakan sebagai kerangka kerja untuk mengembangkan Proyek SubQuery Anda sendiri.

Di akhir panduan ini, Anda akan memiliki proyek SubQuery yang berjalan pada node SubQuery dengan titik akhir GraphQL tempat dimana Anda dapat membuat kueri data.

Jika Anda belum melakukannya, sebaiknya Anda membiasakan diri dengan [terminologi](../#terminology) yang digunakan di SubQuery.

## Persiapan

### Lingkungan Pengembangan Lokal

- [Naskah](https://www.typescriptlang.org/) diperlukan untuk mengkompilasi proyek dan menentukan tipe.
- Baik CLI SubQuery dan Project yang dihasilkan memiliki dependensi dan memerlukan versi modern [Node](https://nodejs.org/en/).
- Node SubQuery membutuhkan Docker

### Pasang CLI SubQuery

Pasang SubQuery CLI secara global di terminal Anda dengan menggunakan NPM:

```shell
# NPM
npm install -g @subql/cli
```

Harap dicatat bahwa kami **JANGAN** mendorong penggunaan `global benang` karena manajemen ketergantungannya yang buruk yang dapat menyebabkan kesalahan di masa mendatang.

Kemudian Anda dapat menjalankan bantuan untuk melihat perintah dan penggunaan yang tersedia yang telah disediakan oleh CLI

```shell
bantuan subql
```

## Inisialisasi Proyek SubQuery Pemula

Di dalam direktori tempat Anda ingin membuat proyek SubQuery, cukup ganti `NAMA_PROYEK` dengan milik Anda dan jalankan perintah:

```shell
subql init PROJECT_NAME
```

Anda akan ditanya pertanyaan tertentu saat proyek SubQuery diinisialisasi:

- Network: A blockchain network that this SubQuery project will be developed to index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

Setelah proses inisialisasi selesai, Anda akan melihat folder dengan nama proyek Anda telah dibuat di dalam direktori. Isi direktori ini harus sama dengan apa yang tercantum dalam [Struktur Direktori](../create/introduction.md#directory-structure).

Terakhir, di bawah direktori proyek, jalankan perintah berikut untuk memasang dependensi proyek baru.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Konfigurasikan dan Bangun Proyek Pemula

Dalam paket awal yang baru saja Anda inisialisasi, kami telah menyediakan konfigurasi standar untuk proyek baru Anda. Anda terutama akan mengerjakan file-file berikut:

- Manifes di `project.yaml`
- Skema GraphQL di `schema.graphql`
- Fungsi Pemetaan di direktori `src/mappings/`

Untuk informasi lebih lanjut tentang cara menulis SubQuery Anda sendiri, lihat dokumentasi kami di bawah [Buat Proyek](../create/introduction.md)

### Pembuatan Model GraphQL

Untuk [mengindeks](../run/run.md) proyek SubQuery Anda, Anda harus terlebih dahulu membuat model GraphQL yang diperlukan yang telah Anda tetapkan di file GraphQL Schema (`schema.graphql`). Jalankan perintah ini di root direktori proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Anda akan menemukan model yang dihasilkan di direktori `/src/types/models`

## Bangun Proyek

Untuk menjalankan Proyek SubQuery Anda pada Node SubQuery yang dihosting secara lokal, Anda perlu membangun pekerjaan Anda.

Jalankan perintah bentuk dari direktori proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Menjalankan dan Membuat Kueri Proyek Pemula Anda

Meskipun Anda dapat dengan cepat memublikasikan proyek baru Anda ke [Proyek SubQuery](https://project.subquery.network) dan menanyakannya menggunakan [Explorer](https://explorer.subquery.network) kami, cara termudah untuk menjalankan node SubQuery secara lokal adalah dalam wadah Docker, jika Anda belum memiliki Docker, Anda dapat menginstalnya dari [docker.com](https://docs.docker.com/get-docker/).

[_Lewati ini dan publikasikan proyek baru Anda ke Proyek SubQuery_](../publish/publish.md)

### Jalankan Proyek SubQuery Anda

Semua konfigurasi yang mengontrol bagaimana node SubQuery dijalankan didefinisikan dalam file `docker-compose.yml` ini. Untuk proyek baru yang baru saja diinisialisasi, Anda tidak perlu mengubah apa pun di sini, tetapi Anda dapat membaca lebih lanjut tentang file dan pengaturannya di [bagian Jalankan Proyek](../run/run.md)

Di bawah direktori proyek jalankan perintah berikut:

```shell
docker-compose pull && docker-compose up
```

Mungkin perlu beberapa waktu untuk mengunduh paket yang diperlukan ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), dan Postgres) untuk pertama kalinya tetapi segera Anda akan melihat Node subkueri.

### Kueri Proyek Anda

Buka browser Anda dan buka [http://localhost:3000](http://localhost:3000).

Anda akan melihat taman bermain GraphQL ditampilkan di explorer dan skema yang siap untuk kueri. Di kanan atas taman bermain, Anda akan menemukan tombol _Dokumen_ yang akan membuka undian dokumentasi. Dokumentasi ini dibuat secara otomatis dan membantu Anda menemukan entitas dan metode apa yang dapat Anda kueri.

Untuk proyek pemula SubQuery baru, Anda dapat mencoba kueri berikut untuk mengetahui cara kerjanya atau [pelajari lebih lanjut tentang bahasa Kueri GraphQL](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Langkah selanjutnya

Selamat, Anda sekarang memiliki proyek SubQuery yang berjalan secara lokal yang menerima permintaan GraphQL API untuk data sampel. Dalam panduan berikutnya, kami akan menunjukkan cara memublikasikan proyek baru Anda ke [Proyek SubQuery](https://project.subquery.network) dan menanyakannya menggunakan [Explorer](https://explorer.subquery.network) kami

[Publikasikan proyek baru Anda ke Proyek SubQuery](../publish/publish.md)
