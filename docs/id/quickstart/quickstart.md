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

- Jaringan: Jaringan blockchain yang akan diindeks oleh proyek SubQuery ini
- Template: Pilih template proyek SubQuery yang akan memberikan titik awal untuk memulai pengembangan
- Repositori Git (Opsional): Berikan URL Git ke repo tempat proyek SubQuery ini akan dihosting (saat dihosting di SubQuery Explorer)
- Titik akhir RPC (Diperlukan): Berikan URL soket web (wss) ke titik akhir RPC yang sedang berjalan yang akan digunakan secara default untuk proyek ini. Anda dapat dengan cepat mengakses titik akhir publik untuk jaringan Polkadot yang berbeda atau bahkan membuat simpul khusus pribadi Anda sendiri menggunakan OnFinality atau cukup gunakan titik akhir Polkadot default. Node RPC ini harus berupa node arsip (memiliki status rantai penuh). Anda dapat dengan cepat mengakses titik akhir publik untuk jaringan Polkadot yang berbeda atau bahkan membuat simpul khusus pribadi Anda sendiri menggunakan OnFinality atau cukup gunakan titik akhir Polkadot default. Node RPC ini harus berupa node arsip (memiliki status rantai penuh). Node RPC ini harus berupa node arsip (memiliki status rantai penuh).
- Penulis (Diperlukan): Masukkan pemilik proyek SubQuery ini di sini
- Deskripsi (Pilihan): Anda dapat memberikan paragraf singkat tentang proyek Anda yang menjelaskan data apa yang ada di dalamnya dan apa yang dapat dilakukan pengguna dengannya
- Versi (Diperlukan): Masukkan nomor versi khusus atau gunakan default (`1.0.0`)
- Lisensi (Diperlukan): Berikan lisensi perangkat lunak untuk proyek ini atau terima default (`Apache-2.0`)

Setelah proses inisialisasi selesai, Anda akan melihat folder dengan nama proyek Anda telah dibuat di dalam direktori. Isi direktori ini harus sama dengan apa yang tercantum dalam [Struktur Direktori](../create/introduction.md#directory-structure).

Terakhir, di bawah direktori proyek, jalankan perintah berikut untuk memasang dependensi proyek baru.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell cd PROJECT_NAME yarn install ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash cd PROJECT_NAME npm install ` </CodeGroupItem> </CodeGroup>

## Konfigurasikan dan Bangun Proyek Pemula

Dalam paket awal yang baru saja Anda inisialisasi, kami telah menyediakan konfigurasi standar untuk proyek baru Anda. Anda terutama akan mengerjakan file-file berikut:

- Manifes di `project.yaml`
- Skema GraphQL di `schema.graphql`
- Fungsi Pemetaan di direktori `src/mappings/`

Untuk informasi lebih lanjut tentang cara menulis SubQuery Anda sendiri, lihat dokumentasi kami di bawah [Buat Proyek](../create/introduction.md)

### Pembuatan Model GraphQL

Untuk [mengindeks](../run_publish/run.md) proyek SubQuery Anda, Anda harus terlebih dahulu membuat model GraphQL yang diperlukan yang telah Anda tetapkan di file GraphQL Schema (`schema.graphql`). Jalankan perintah ini di root direktori proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn codegen ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script codegen ` </CodeGroupItem> </CodeGroup>

Anda akan menemukan model yang dihasilkan di direktori `/src/types/models`

## Bangun Proyek

Untuk menjalankan Proyek SubQuery Anda pada Node SubQuery yang dihosting secara lokal, Anda perlu membangun pekerjaan Anda.

Jalankan perintah bentuk dari direktori proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

## Menjalankan dan Membuat Kueri Proyek Pemula Anda

Meskipun Anda dapat dengan cepat memublikasikan proyek baru Anda ke [Proyek SubQuery](https://project.subquery.network) dan menanyakannya menggunakan [Explorer](https://explorer.subquery.network) kami, cara termudah untuk menjalankan node SubQuery secara lokal adalah dalam wadah Docker, jika Anda belum memiliki Docker, Anda dapat menginstalnya dari [docker.com](https://docs.docker.com/get-docker/).

[_Lewati ini dan publikasikan proyek baru Anda ke Proyek SubQuery_](../run_publish/publish.md)

### Jalankan Proyek SubQuery Anda

Semua konfigurasi yang mengontrol bagaimana node SubQuery dijalankan didefinisikan dalam file `docker-compose.yml` ini. Untuk proyek baru yang baru saja diinisialisasi, Anda tidak perlu mengubah apa pun di sini, tetapi Anda dapat membaca lebih lanjut tentang file dan pengaturannya di [bagian Jalankan Proyek](../run_publish/run.md)

Di bawah direktori proyek jalankan perintah berikut:

```shell
docker-compose pull && docker-compose up
```

Mungkin perlu beberapa waktu untuk mengunduh paket yang diperlukan ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), dan Postgres) untuk pertama kalinya tetapi segera Anda akan melihat Node subkueri.

### Kueri Proyek Anda

Buka browser Anda dan buka [http://localhost:3000](http://localhost:3000).

Anda akan melihat taman bermain GraphQL ditampilkan di explorer dan skema yang siap untuk kueri. Di kanan atas taman bermain, Anda akan menemukan tombol _Dokumen_ yang akan membuka undian dokumentasi. Dokumentasi ini dibuat secara otomatis dan membantu Anda menemukan entitas dan metode apa yang dapat Anda kueri.

Untuk proyek pemula SubQuery baru, Anda dapat mencoba kueri berikut untuk mengetahui cara kerjanya atau [pelajari lebih lanjut tentang bahasa Kueri GraphQL](../run_publish/graphql.md).

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

[Publikasikan proyek baru Anda ke Proyek SubQuery](../run_publish/publish.md)
