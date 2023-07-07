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

Anda akan ditanyai pertanyaan tertentu saat Anda melanjutkan perjalanan:

- **Nama proyek**: Nama proyek untuk proyek SubQuery Anda.
- **Keluarga Network**: Keluarga jaringan blockchain layer-1 yang akan diindeks oleh proyek SubQuery ini. Gunakan tombol panah untuk memilih dari opsi yang tersedia. Misalnya, Polkadot, Avalanche, Cosmos, atau jaringan lain yang didukung.
- **Network**: Jaringan spesifik yang akan diindeks oleh proyek SubQuery ini. Gunakan tombol panah untuk memilih dari opsi yang tersedia. Misalnya, Polkadot, Avalanche, atau jaringan lain yang didukung.
- **Proyek template**: Pilih proyek template SubQuery yang akan memberikan titik awal dalam pengembangan. Kami menyarankan untuk memilih proyek _"subql-starter"_.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. Anda dapat dengan cepat mengakses titik akhir publik untuk jaringan yang berbeda, membuat node khusus pribadi Anda sendiri menggunakan [OnFinality](https://app.onfinality.io), atau hanya menggunakan titik akhir default. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node. Kita akan menggunakan nilai default untuk panduan ini. Berdasarkan jaringan yang Anda pilih, nilai default mungkin:
  - For Polkadot - _"wss://polkadot.api.onfinality.io/public-ws"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io/public/ext/bc/C/rpc"_,
  - For Ethereum - _“https://eth.api.onfinality.io/public”_ and likewise for other networks.
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

::: code-tabs @tab:active yarn

```shell
cd PROJECT_NAME
yarn install
```

@tab npm

```shell
cd PROJECT_NAME
npm install
```

:::

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. Ini adalah:

1. The GraphQL Schema in `schema.graphql`.
2. Manifes Proyek di `project.yaml`.
3. Fungsi-fungsi pemetaan dalam direktori `src/mappings/`.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under **2. Specific Chains** and continue the quick start guide.
