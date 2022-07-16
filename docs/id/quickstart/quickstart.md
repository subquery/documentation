# 1. Buat proyek baru

Tujuan dari panduan memulai cepat ini adalah untuk memberi Anda pengaturan pengembangan lengkap dan langkah-langkah yang dipandu untuk membuat proyek blockchain SubQuery pertama Anda. Ini ditargetkan untuk pengembang berpengalaman hingga mereka yang baru memulai perjalanan blockchain mereka.

Panduan mulai cepat ini akan memakan waktu sekitar 10-15 menit.

Setelah menyelesaikan panduan memulai cepat ini, Anda akan memiliki proyek SubQuery yang berfungsi yang akan berjalan pada node SubQuery. Anda akan dapat mengadaptasi proyek starter standar dan transfer indeks dari jaringan blockchain favorit Anda seperti Polkadot, Avalanche, Cosmos, dll.

Mari kita mulai proses pembuatan proyek blockchain SubQuery pertama Anda.

## Prasyarat

Sebelum Anda mulai membuat proyek blockchain pertama Anda dengan SubQuery, pastikan Anda telah menginstal aplikasi perangkat lunak pendukung yang diperlukan. Ini adalah:

- [Node](https://nodejs.org/en/): Instalasi Node.js modern (misalnya versi LTS).
- [Docker](https://docker.com/): Tutorial ini akan menggunakan Docker yang diperlukan.

Sekarang, Anda siap untuk memulai dengan langkah pertama, yaitu instalasi SubQuery CLI.

## 1. Pasang CLI SubQuery

Instal SubQuery CLI secara global di terminal Anda dengan menggunakan NPM:

```shell
# NPM
npm install -g @subql/cli
```

::::: bahaya Kami **JANGAN** mendorong penggunaan `yarn global` untuk menginstal `@subql/cli` karena manajemen ketergantungannya yang buruk. Hal ini dapat menyebabkan beberapa kesalahan. :::

Lihatlah semua perintah yang tersedia dan penggunaannya. Jalankan perintah yang diberikan di bawah ini di CLI:

```shell
bantuan subql
```

## 2. Inisialisasi Proyek Pemula SubQuery

Jalankan perintah berikut di dalam direktori yang ingin Anda buat proyek SubQuery:

```shell
subql init
```

:::: peringatan Penting

**Untuk Pengguna Cosmos**

Cosmos belum didukung dalam CLI SubQuery (`subql`). Oleh karena itu, jika Anda menggunakan Cosmos, Anda harus mulai dengan klon Juno atau fork [starter project](https://github.com/subquery/cosmos-subql-starter) ini.

Untuk menginisialisasi proyek Anda dengan Cosmos, lihat 4 langkah yang ditunjukkan dalam [link](https://github.com/subquery/juno-subql-starter#readme) ini. Setelah anda menyelesaikan 4 langkah ini, **lompat** ke bagian [Make Changes to Your Project](../quickstart/quickstart.md#_3-make-changes-to-your-project). :::

Anda akan ditanyai pertanyaan tertentu saat Anda melanjutkan perjalanan:

- **Nama proyek**: Nama proyek untuk proyek SubQuery Anda.
- **Keluarga Network**: Keluarga jaringan blockchain layer-1 yang akan diindeks oleh proyek SubQuery ini. Gunakan tombol panah untuk memilih dari opsi yang tersedia. Misalnya, Polkadot, Avalanche, Cosmos, atau jaringan lain yang didukung.
- **Network**: Jaringan spesifik yang akan diindeks oleh proyek SubQuery ini. Gunakan tombol panah untuk memilih dari opsi yang tersedia. Misalnya, Polkadot, Avalanche, atau jaringan lain yang didukung.
- **Proyek template**: Pilih proyek template SubQuery yang akan memberikan titik awal dalam pengembangan. Kami menyarankan untuk memilih proyek _"subql-starter"_.
- **Titik akhir RPC**: Berikan URL HTTPS ke endpoint RPC yang sedang berjalan, yang akan digunakan secara default untuk proyek ini. Anda dapat dengan cepat mengakses titik akhir publik untuk jaringan yang berbeda, membuat node khusus pribadi Anda sendiri menggunakan [OnFinality](https://app.onfinality.io), atau hanya menggunakan titik akhir default. Node RPC ini harus berupa node arsip (memiliki status rantai penuh). Kita akan menggunakan nilai default untuk panduan ini. Berdasarkan jaringan yang Anda pilih, nilai default mungkin:
  - Untuk Polkadot - _"https://polkadot.api.onfinality.io"_,
  - Untuk Avalanche - _"https://avalanche.api.onfinality.io"_,
  - Untuk Terra - _"https://terra-columbus-5.beta.api.onfinality.io"_ dan demikian juga untuk jaringan lain. <br/>
- ** Repositori Git**: Berikan URL Git ke repo tempat proyek SubQuery ini akan dihosting (saat dihosting di SubQuery Explorer) atau terima default yang disediakan.
- **Authors**: Masukkan pemilik proyek SubQuery ini di sini (misalnya nama Anda!) atau terima default yang disediakan.
- **Deskripsi**: Sediakan paragraf singkat tentang proyek Anda yang menjelaskan data apa saja yang ada di dalamnya dan apa yang bisa dilakukan pengguna dengannya, atau terima default yang disediakan.
- **Versi**: Masukkan nomor versi khusus atau gunakan default (`1.0.0`).
- **Lisensi**: Berikan lisensi perangkat lunak untuk proyek ini atau terima default (`MIT`).

Mari kita lihat sebuah contoh:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

Setelah Anda menyelesaikan proses inisialisasi, Anda akan melihat folder dengan nama proyek Anda dibuat di dalam direktori. Harap dicatat bahwa isi direktori ini harus identik dengan apa yang tercantum dalam [Directory Structure](../build/introduction.md#directory-structure).

Terakhir, jalankan perintah berikut untuk menginstal dependensi proyek baru dari dalam direktori proyek baru.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Sekarang mari kita sesuaikan proyek templat standar untuk blockchain tertentu yang diminati.

Anda mungkin ingin merujuk ke [argumen baris perintah](../run_publish/references.md) yang digunakan dalam SubQuery. Ini akan membantu Anda memahami perintah dengan lebih baik.

## 3. Membuat Perubahan pada Proyek Anda

Ada 3 file penting yang perlu dimodifikasi. Ini adalah:

1. Skema GraphQL di `schema.graphql`.
2. Manifes Proyek di `project.yaml`.
3. Fungsi-fungsi pemetaan dalam direktori `src/mappings/`.

SubQuery mendukung berbagai jaringan blockchain dan memberi Anda panduan khusus untuk masing-masing jaringan.

Pilih jaringan pilihan Anda dan lanjutkan ke depan untuk melakukan modifikasi yang diperlukan, dan bergerak satu inci lebih dekat untuk menyelesaikan proyek pertama Anda:

- **[Polkadot/Substrate](../quickstart/quickstart_chains/polkadot.md)**

- **[Avalanche](../quickstart/quickstart_chains/avalanche.md)**

- **[Cosmos](../quickstart/quickstart_chains/cosmos.md)**

- **[Terra](../quickstart/quickstart_chains/terra.md)**
