# Publikasikan Proyek SubQuery Anda

## Manfaat menghosting proyek Anda dengan SubQuery

- Kami akan menjalankan proyek SubQuery untuk Anda dalam layanan publik berkinerja tinggi, skalabel, dan terkelola
- Layanan ini disediakan untuk komunitas secara gratis!
- Anda dapat menjadikan proyek Anda publik sehingga akan dicantumkan di [SubQuery Explorer](https://explorer.subquery.network) dan siapa saja di seluruh dunia dapat melihatnya
- Kami terintegrasi dengan GitHub, jadi siapa pun di organisasi GitHub Anda dapat melihat proyek organisasi bersama

## Buat proyek pertama Anda di Proyek SubQuery

### Hosting Basis Kode Proyek

Ada dua cara Anda dapat menghosting basis kode proyek SubQuery Anda sebelum dipublikasikan.

**GitHub**: Basis kode proyek Anda harus berada di repositori GitHub publik

**IPFS**: Basis kode proyek Anda dapat disimpan di IPFS, Anda dapat mengikuti panduan hosting IPFS kami untuk melihat cara [memublikasikan pertama ke IPFS](ipfs.md)

### Masuk ke Proyek SubQuery

Sebelum memulai, pastikan bahwa basis kode proyek SubQuery Anda online di repositori GitHub publik atau di IPFS. File `schema.graphql` harus berada di root direktori Anda.

Untuk membuat proyek pertama Anda, buka [project.subquery.network](https://project.subquery.network). Anda harus mengautentikasi dengan akun GitHub Anda untuk masuk.

Pada login pertama, Anda akan diminta untuk mengotorisasi SubQuery. Kami hanya memerlukan alamat email Anda untuk mengidentifikasi akun Anda, dan kami tidak menggunakan data lain dari akun GitHub Anda untuk alasan lain apa pun. Pada langkah ini, Anda juga dapat meminta atau memberikan akses ke akun Organisasi GitHub Anda sehingga Anda dapat memposting proyek SubQuery di bawah Organisasi GitHub alih-alih akun pribadi Anda.

![Cabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Proyek SubQuery adalah tempat Anda mengelola semua proyek yang dihosting yang diunggah ke platform SubQuery. Anda dapat membuat, menghapus, dan bahkan meningkatkan proyek semua dari aplikasi ini.

![Login Projek](/assets/img/projects-dashboard.png)

Jika Anda memiliki akun Organisasi GitHub yang terhubung, Anda dapat menggunakan pengalih di header untuk mengubah antara akun pribadi Anda dan akun Organisasi GitHub Anda. Proyek yang dibuat di akun Organisasi GitHub dibagikan di antara anggota di Organisasi GitHub tersebut. Untuk menghubungkan akun Organisasi GitHub Anda, Anda dapat [mengikuti langkah-langkah di sini](#add-github-organization-account-to-subquery-projects).

![Beralih antar akun GitHub](/assets/img/projects-account-switcher.png)

### Buat Proyek Pertama Anda

Ada dua metode untuk membuat proyek di SubQuery Managed Service, Anda dapat menggunakan UI atau langsung melalui alat `subql` cli.

#### Menggunakan UI

Mari kita mulai dengan mengklik "Create Project". Anda akan dibawa ke formulir Proyek Baru. Silakan masukkan yang berikut ini (Anda bisa mengubahnya di masa mendatang):

- **Akun GitHub:** Jika Anda memiliki lebih dari satu akun GitHub, pilih akun mana yang akan dibuat proyek ini. Proyek yang dibuat di akun organisasi GitHub dibagikan di antara anggota di organisasi itu.
- **Nama Projek**
- **Subtitle**
- **Deskripsi**
- **URL Repositori GitHub:** Ini harus berupa URL GitHub yang valid untuk repositori publik yang memiliki proyek SubQuery Anda. File `schema.graphql` harus berada di root direktori Anda ([pelajari lebih lanjut tentang struktur direktori](../create/introduction.md#directory-structure)).
- **Database:** Pelanggan premium dapat mengakses database khusus untuk menghosting proyek SubQuery produksi. Jika ini menarik minat Anda, Anda dapat menghubungi [sales@subquery.network](mailto:sales@subquery.network) untuk mengaktifkan setelan ini.
- **Sumber Penerapan:** Anda dapat memilih agar proyek di-deploy dari repositori GitHub atau sebagai alternatif di-deploy dari IPFS CID, lihat panduan kami tentang [hosting dengan IPFS.](ipfs.md)
- **Sembunyikan proyek:** Jika dipilih, ini akan menyembunyikan proyek dari penjelajah SubQuery publik. Biarkan ini tidak dipilih jika Anda ingin membagikan SubQuery Anda dengan komunitas! ![Buat Proyek pertama Anda](/assets/img/projects-create.png)

Buat proyek Anda dan Anda akan melihatnya di daftar Proyek SubQuery Anda. _Kita hampir sampai! Kita hanya perlu menerapkan versi barunya._

![Membuat Proyek tanpa penerapan](/assets/img/projects-no-deployment.png)

#### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk mempublikasikan proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) yang valid sudah siap.

```shell
// Membuat proyek menggunakan CLI
$ subql project:create-project

// ATAU menggunakan non-interaktif, ini akan meminta Anda jika bidang yang diperlukan tidak ada
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Terapkan Versi pertama Anda

Ada dua metode untuk menyebarkan versi baru proyek Anda ke SubQuery Managed Service, Anda dapat menggunakan UI atau secara langsung melalui alat `subql` cli.

#### Menggunakan UI

Meskipun membuat proyek akan menyiapkan perilaku tampilan proyek, Anda harus men-deploy versinya sebelum menjadi operasional. Menyebarkan versi memicu operasi pengindeksan SubQuery baru untuk memulai, dan menyiapkan layanan kueri yang diperlukan untuk mulai menerima permintaan GraphQL. Anda juga bisa menyebarkan versi baru ke proyek yang sudah ada di sini.

Dengan proyek baru Anda, Anda akan melihat tombol Deploy New Version. Klik ini, dan isi informasi yang diperlukan tentang penyebaran:

- **Cabang:** Dari GitHub, pilih cabang proyek yang ingin Anda gunakan
- **Komit Hash:** Dari GitHub, pilih komit spesifik dari versi basis kode proyek SubQuery yang ingin Anda terapkan
- **IPFS:** Jika menerapkan dari IPFS, tempel CID penerapan IPFS Anda (tanpa awalan `ipfs://`)
- **Ganti Titik Akhir Jaringan dan Kamus:** Anda dapat mengganti titik akhir dalam manifes proyek Anda di sini
- **Versi Pengindeks:** Ini adalah versi layanan simpul SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat[`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Versi Kueri:** Ini adalah versi layanan kueri SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Terapkan Proyek pertama Anda](https://static.subquery.network/media/projects/projects-first-deployment.png)

Jika berhasil diterapkan, Anda akan melihat pengindeks mulai bekerja dan melaporkan kembali kemajuan pengindeksan rantai saat ini. Proses ini mungkin memakan waktu hingga mencapai 100%.

#### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) yang valid sudah siap.

```shell
// Terapkan menggunakan CLI
$ suqbl deployment:deploy

// ATAU Terapkan menggunakan CLI non-interaktif
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. Di sana Anda dapat menggunakan taman bermain dalam peramban untuk memulai - [baca lebih lanjut tentang cara menggunakan Explorer kami di sini](../run_publish/query.md).

![Proyek di SubQuery Explorer](/assets/img/projects-explorer.png)

## Tambahkan Akun Organisasi GitHub ke Proyek SubQuery

Adalah umum untuk mempublikasikan proyek SubQuery Anda di bawah nama akun Organisasi GitHub Anda daripada akun GitHub pribadi Anda. Kapan saja Anda dapat mengubah akun yang saat ini Anda pilih pada [Proyek SubQuery](https://project.subquery.network) menggunakan pengalih akun.

![Beralih antar akun GitHub](/assets/img/projects-account-switcher.png)

Jika Anda tidak dapat melihat akun Organisasi GitHub Anda terdaftar di switcher, Anda mungkin perlu memberikan akses ke SubQuery untuk Organisasi GitHub Anda (atau memintanya dari administrator). Untuk melakukan ini, pertama-tama Anda harus mencabut izin dari akun GitHub Anda ke Aplikasi SubQuery. Untuk melakukan ini, masuk ke pengaturan akun Anda di GitHub, buka Aplikasi, dan di bawah tab Aplikasi OAuth Resmi, cabut SubQuery - [Anda dapat mengikuti langkah-langkah yang tepat di sini](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Jangan khawatir, ini tidak akan menghapus proyek SubQuery Anda dan Anda tidak akan kehilangan data apa pun.**

![Cabut akses ke akun GitHub](/assets/img/project_auth_revoke.png)

Setelah anda mencabut akses, log keluar dari [SubQuery Projects](https://project.subquery.network) dan masuk kembali. Anda akan diarahkan ke halaman berjudul _Authorize SubQuery_ di mana Anda dapat meminta atau memberikan akses SubQuery ke akun Organisasi GitHub Anda. Jika Anda tidak memiliki izin admin, Anda harus mengajukan permintaan kepada adminstrator untuk mengaktifkan ini untuk Anda.

![Cabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Setelah permintaan ini disetujui oleh administrator anda (atau jika anda dapat mengabulkannya sendiri), anda akan melihat akun Organisasi GitHub yang benar di pengalih akun.
