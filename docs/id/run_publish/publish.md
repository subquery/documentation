# Publikasikan ke Layanan Terkelola

## Manfaat hosting proyek Anda dengan Layanan Terkelola SubQuery

Dapps terbesar bergantung pada Layanan Terkelola tingkat perusahaan SubQuery - dengan 100 juta permintaan harian dan ratusan proyek aktif, Layanan Terkelola SubQuery menyediakan hosting terdepan di industri untuk pelanggan kami.

- Kami akan menjalankan proyek SubQuery untuk Anda dalam layanan publik berkinerja tinggi, skalabel, dan terkelola.
- Layanan ini disediakan bagi komunitas dengan tingkat gratis yang murah hati! Anda dapat meng-host dua proyek SubQuery pertama Anda secara gratis!
- Anda dapat menjadikan proyek Anda publik sehingga akan dicantumkan di [SubQuery Explorer](https://explorer.subquery.network) dan siapa saja di seluruh dunia dapat melihatnya.
- Kami terintegrasi dengan GitHub, jadi siapa pun di organisasi GitHub Anda dapat melihat proyek organisasi bersama.

Anda bisa meningkatkan untuk memanfaatkan layanan berbayar berikut ini:

- Hosting siap produksi untuk data penting misi dengan penerapan zero-downtime biru/hijau
- Basis data khusus
- Beberapa klaster geo-redundan dan perutean cerdas
- Pemantauan dan analitik lanjutan.

## Publikasikan proyek SubQuery Anda ke IPFS

Saat menerapkan ke Layanan Terkelola SubQuery, Anda harus terlebih dahulu meng-host basis kode Anda di [IPFS](https://ipfs.io/). Hosting proyek di IPFS membuatnya tersedia untuk semua dan mengurangi ketergantungan Anda pada layanan terpusat seperti GitHub.

::::peringatan Alur Penyebaran GitHub sudah tidak digunakan lagi untuk IPFS

Jika proyek Anda masih disebarkan melalui GitHub, baca panduan migrasi untuk penyebaran IPFS [di sini](./ipfs.md) :::

### Persyaratan

- `@subql/cli` version 0.21.0 atau lebih tinggi.
- Manifest `specVersion` 1.0.0 ke atas.
- Siapkan [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) Anda.
- Untuk memastikan penerapan Anda berhasil, kami sangat menyarankan agar Anda membangun proyek Anda dengan perintah `subql build`, dan mengujinya secara lokal sebelum memublikasikannya.

### Persiapkan SUBQL_ACCESS_TOKEN

- Langkah 1: Buka [Proyek SubQuery](https://project.subquery.network/) dan masuk.
- Langkah 2: Klik profil Anda di kanan atas menu navigasi, lalu klik **_Refresh Token_**.
- Langkah 3: Salin token yang dihasilkan.
- Langkah 4: Untuk menggunakan token ini:
  - Opsi 1: Tambahkan SUBQL_ACCESS_TOKEN di variabel lingkungan Anda. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) atau `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Opsi 2: Segera hadir, `subql/cli` akan mendukung penyimpanan SUBQL_ACCESS_TOKEN Anda secara lokal.

### Cara mempublikasikan proyek

Karena anda memiliki `@subql/cli` yang sudah terinstal, anda dapat menjalankan perintah berikut ini, yang akan membaca proyek dan informasi yang diperlukan dari manifes defaultnya `project.yaml`:

```
// Publikasikan dari direktori root proyek Anda
subql publish

// ATAU arahkan ke root proyek Anda
subql publish -f ~/my-project/
```

Atau, misalkan proyek Anda memiliki beberapa file Manifes, misalnya Anda mendukung beberapa jaringan tetapi berbagi pemetaan dan logika bisnis yang sama, dan memiliki struktur proyek sebagai berikut:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Anda selalu dapat memublikasikan proyek dengan file manifes yang Anda pilih.

```
 # Ini akan menerbitkan dukungan proyek pengindeksan jaringan Polkadot
subql publish -f ~/my-projectRoot/polkadot.yaml
```

### Setelah diterbitkan

Setelah berhasil memublikasikan proyek, log di bawah menunjukkan bahwa proyek dibuat di klaster IPFS dan telah mengembalikan `CID` (pengidentifikasi konten).

```
Kode bangunan dan pengepakan... selesai
Mengunggah proyek SupQuery ke IPFS
Proyek SubQuery yang diunggah ke IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd //CID
```

Harap perhatikan `CID` ini. Dengan `CID` ini, anda dapat melihat proyek anda yang diterbitkan sebagai apa yang kita sebut [IPFS Deployment](ipfs.md#ipfs-deployment).

Dengan `@subql/cli` versi 1.3.0 atau di atasnya, ketika menggunakan `subql publish`, ia akan menyimpan salinan `IPFS CID` proyek di dalam file di direktori proyek anda, penamaan file akan konsisten dengan project.yaml anda. Misalnya, jika file manfiest Anda bernama `project.yaml`, file IPFS akan diberi nama `.project-cid`.

### IPFS Deployment

Penyebaran IPFS mewakili keberadaan proyek SubQuery yang independen dan unik pada jaringan yang terdesentralisasi. Oleh karena itu, setiap perubahan dengan kode dalam proyek akan mempengaruhi keunikannya. Jika Anda perlu menyesuaikan logika bisnis Anda, mis. mengubah fungsi pemetaan, Anda harus memublikasikan ulang proyek, dan `CID` akan berubah.

Untuk saat ini, untuk melihat proyek yang telah Anda publikasikan, gunakan alat `REST` api seperti [Postman](https://web.postman.co/), dan gunakan metode `POST` dengan contoh URL berikut untuk mengambilnya:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

Anda akan melihat contoh deployment proyek seperti di bawah ini.

Penerapan ini terlihat sangat mirip dengan file manifes Anda. Anda dapat mengharapkan bidang deskriptif tersebut, dan titik akhir jaringan dan kamus telah dihapus karena tidak secara langsung memengaruhi hasil eksekusi proyek.

File-file tersebut telah digunakan dalam proyek lokal Anda telah dikemas dan dipublikasikan ke IPFS juga.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Menyebarkan proyek SubQuery Anda di Managed Service

### Masuk ke Proyek SubQuery

Sebelum memulai, pastikan bahwa basis kode proyek SubQuery Anda dipublikasikan ke IPFS.

Untuk membuat proyek pertama Anda, buka [Proyek SubQuery](https://project.subquery.network). Anda harus mengautentikasi dengan akun GitHub Anda untuk masuk.

Pada login pertama, Anda akan diminta untuk mengotorisasi SubQuery. Kami hanya membutuhkan alamat email anda untuk mengidentifikasi akun anda, dan kami tidak menggunakan data lain dari akun GitHub anda untuk alasan lain. Pada langkah ini, Anda juga dapat meminta atau memberikan akses ke akun Organisasi GitHub Anda sehingga Anda dapat memposting proyek SubQuery di bawah Organisasi GitHub Anda alih-alih akun pribadi Anda.

![Mencabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Proyek SubQuery adalah tempat Anda mengelola semua proyek host Anda yang diunggah ke platform SubQuery. Anda bisa membuat, menghapus, dan bahkan meningkatkan proyek, semuanya dari aplikasi ini.

![Proyek Masuk](/assets/img/projects-dashboard.png)

Jika Anda memiliki akun Organisasi GitHub yang terhubung, Anda dapat menggunakan pengalih pada header untuk mengubah antara akun pribadi Anda dan akun Organisasi GitHub Anda. Proyek yang dibuat dalam akun Organisasi GitHub dibagikan di antara anggota di Organisasi GitHub itu. Untuk menghubungkan akun Organisasi GitHub Anda, Anda dapat [mengikuti langkah-langkah di sini](publish.md#add-github-organization-account-to-subquery-projects).

![Beralih di antara akun GitHub](/assets/img/projects-account-switcher.png)

### Buat Proyek Pertama Anda

Ada dua metode untuk membuat proyek di SubQuery Managed Service: Anda dapat menggunakan UI atau secara langsung melalui alat `subql` cli

#### Menggunakan UI

Mari kita mulai dengan mengklik "Create Project". Anda akan dibawa ke formulir Proyek Baru. Silakan masukkan yang berikut ini (Anda bisa mengubahnya di masa mendatang):

- **Akun GitHub:** Jika Anda memiliki lebih dari satu akun GitHub, pilih akun mana proyek ini akan dibuat. Proyek yang dibuat dalam akun organisasi GitHub dibagikan di antara anggota dalam organisasi itu.
- **Nama Projek**
- **Subtitle**
- **Deskripsi**
- ** URL Repositori GitHub:** Ini harus berupa URL GitHub yang valid ke repositori publik yang memiliki proyek SubQuery Anda. File `schema.graphql` harus berada di root direktori anda ([pelajari lebih lanjut tentang struktur direktori](../build/introduction.md#directory-structure)).
- **Database:** Pelanggan premium dapat mengakses database khusus untuk meng-host proyek SubQuery produksi. Jika hal ini menarik minat Anda, Anda dapat menghubungi [sales@subquery.network](mailto:sales@subquery.network) untuk mengaktifkan pengaturan ini.
- **Sumber Penyebaran:** Anda dapat memilih agar proyek disebarkan dari repositori GitHub atau sebagai alternatifnya disebarkan dari IPFS CID, lihat panduan kami tentang [hosting dengan IPFS.](ipfs.md)
- ** Sembunyikan proyek:** Jika dipilih, ini akan menyembunyikan proyek dari penjelajah SubQuery publik. Jangan pilih ini jika Anda ingin berbagi SubQuery Anda dengan komunitas!

![Buat Proyek pertama Anda](/assets/img/projects-create.png)

Buat proyek Anda dan Anda akan melihatnya di daftar Proyek SubQuery Anda. _Kita hampir sampai! Kita hanya perlu menyebarkan versi baru dari itu._

![Membuat Proyek tanpa penyebaran](/assets/img/projects-no-deployment.png)

#### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk mempublikasikan proyek Anda ke Managed Service kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) yang valid sudah siap.

```shell
// Membuat proyek menggunakan CLI
$ subql project:create-project

// ATAU menggunakan non-interaktif, ia akan meminta Anda jika bidang yang diperlukan tidak ada
$ subql project:create-project
    --apiVersion=apiVersion Versi Api secara default adalah 2
    --description=description Masukkan deskripsi
    --gitRepo=gitRepo Masukkan repositori git
    --org=org Masukkan nama organisasi
    --projectName=projectName Masukkan nama proyek
```

### Menyebarkan Versi Pertama Anda

Ada tiga metode untuk menyebarkan versi baru proyek Anda ke Layanan Terkelola SubQuery, Anda dapat menggunakan UI atau secara langsung, melalui alat `subql` cli, atau menggunakan Tindakan GitHub otomatis.

#### Menggunakan UI

Meskipun membuat proyek akan menyiapkan perilaku tampilan proyek, Anda harus men-deploy versinya sebelum menjadi operasional. Menyebarkan versi memicu operasi pengindeksan SubQuery baru untuk memulai, dan menyiapkan layanan kueri yang diperlukan untuk mulai menerima permintaan GraphQL. Anda juga bisa menyebarkan versi baru ke proyek yang sudah ada di sini.

Dengan proyek baru Anda, Anda akan melihat tombol Deploy New Version. Klik ini, dan isi informasi yang diperlukan tentang penyebaran:

- **Cabang:** Dari GitHub, pilih cabang proyek yang ingin Anda gunakan.
- **Commit Hash:** Dari GitHub, pilih komit spesifik dari versi basis kode proyek SubQuery Anda yang ingin Anda gunakan.
- **IPFS:** Jika menerapkan dari IPFS, tempel CID penerapan IPFS Anda (tanpa awalan `ipfs://`).
- **Ganti Titik Akhir Jaringan dan Kamus:** Anda dapat mengganti titik akhir dalam manifes proyek Anda di sini.
- **Versi Pengindeks:** Ini adalah versi layanan simpul SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat[`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Versi Kueri:** Ini adalah versi layanan kueri SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Terapkan Proyek pertama Anda](https://static.subquery.network/media/projects/projects-first-deployment.png)

Jika berhasil diterapkan, Anda akan melihat pengindeks mulai bekerja dan melaporkan kembali kemajuan pengindeksan rantai saat ini. Proses ini mungkin memakan waktu hingga mencapai 100%.

#### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) yang valid sudah siap.

```shell
// Menyebarkan menggunakan CLI
$ subql deployment:deploy

// ATAU Menyebarkan menggunakan CLI non-interaktif
$ subql deployment:deploy

  -d, --useDefaults Gunakan nilai default untuk indexerVerion, queryVersion, dictionary, endpoint
  --dict=dict Masukkan kamus
  --endpoint=endpoint Masukkan endpoint
  --indexerVersion=indexerVersion Masukkan indexer-version
  --ipfsCID=ipfsCID Masukkan IPFS CID
  --org=org Masukkan nama organisasi
  --projectName=projectName Masukkan nama proyek
  --queryVersion=queryVersion Masukkan versi query
  --type=(stage|primary) [default: primary]
```

#### Menggunakan tindakan GitHub

Dengan diperkenalkannya fitur penyebaran untuk CLI, kami telah menambahkan **Default Action Workflow** ke [proyek starter di GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) yang akan memungkinkan Anda untuk menerbitkan dan menyebarkan perubahan Anda secara otomatis:

- Langkah 1: Setelah mendorong proyek Anda ke GitHub, buat lingkungan `DEPLOYMENT` di GitHub, dan tambahkan rahasia [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ke dalamnya.
- Langkah 2: Buat proyek pada [Proyek SubQuery](https://project.subquery.network), ini dapat dilakukan dengan menggunakan [UI](#using-the-ui) atau [CLI](#using-the-cli).
- Langkah 3: Setelah proyek Anda dibuat, navigasikan ke halaman GitHub Actions untuk proyek Anda, dan pilih alur kerja `CLI deploy`
- Langkah 4: Anda akan melihat kolom input di mana Anda dapat memasukkan kode unik proyek Anda yang dibuat di SubQuery Projects, Anda bisa mendapatkan kode dari URL di SubQuery Projects [SubQuery Projects](https://project.subquery.network). Kode ini didasarkan pada nama proyek Anda, di mana spasi diganti dengan tanda hubung `-`. contoh: `nama proyek saya` menjadi `nama-proyek-saya`
- Setelah alur kerja selesai, Anda akan melihat proyek Anda dikerahkan ke Managed Service kami

Pendekatan umum adalah memperluas Tindakan GitHub default untuk secara otomatis menyebarkan perubahan ke Layanan Terkelola kami ketika kode digabungkan ke dalam utama. Perubahan berikut pada alur kerja GitHub Action melakukan hal ini:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. Di sana Anda dapat menggunakan taman bermain dalam peramban untuk memulai - [baca lebih lanjut tentang cara menggunakan Explorer kami di sini](../run_publish/query.md).

![Proyek di SubQuery Explorer](/assets/img/projects-explorer.png)

## Tambahkan Akun Organisasi GitHub ke Proyek SubQuery

Adalah umum untuk mempublikasikan proyek SubQuery Anda di bawah nama akun Organisasi GitHub Anda daripada akun GitHub pribadi Anda. Kapan saja Anda dapat mengubah akun yang saat ini Anda pilih pada [Proyek SubQuery](https://project.subquery.network) menggunakan pengalih akun.

![Beralih di antara akun GitHub](/assets/img/projects-account-switcher.png)

Jika Anda tidak dapat melihat akun Organisasi GitHub Anda terdaftar di switcher, Anda mungkin perlu memberikan akses ke SubQuery untuk Organisasi GitHub Anda (atau memintanya dari administrator). Untuk melakukan ini, pertama-tama Anda harus mencabut izin dari akun GitHub Anda ke Aplikasi SubQuery. Untuk melakukan ini, masuk ke pengaturan akun Anda di GitHub, buka Aplikasi, dan di bawah tab Aplikasi OAuth Resmi, cabut SubQuery - [Anda dapat mengikuti langkah-langkah yang tepat di sini](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Jangan khawatir, ini tidak akan menghapus proyek SubQuery Anda dan Anda tidak akan kehilangan data apa pun.**

![Mencabut akses ke akun GitHub](/assets/img/project_auth_revoke.png)

Setelah anda mencabut akses, log keluar dari [SubQuery Projects](https://project.subquery.network) dan masuk kembali. Anda akan diarahkan ke halaman berjudul _Otorisasi SubQuery_ di mana Anda dapat meminta atau memberikan akses SubQuery ke akun Organisasi GitHub Anda. Jika Anda tidak memiliki izin admin, Anda harus mengajukan permintaan kepada adminstrator untuk mengaktifkan ini untuk Anda.

![Mencabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Setelah permintaan ini disetujui oleh administrator anda (atau jika anda dapat mengabulkannya sendiri), anda akan melihat akun Organisasi GitHub yang benar di pengalih akun.
