# Publikasikan Proyek SubQuery Anda

## Manfaat menghosting proyek Anda dengan SubQuery

- Kami akan menjalankan proyek SubQuery untuk Anda dalam layanan publik berkinerja tinggi, skalabel, dan terkelola.
- This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!”
- Anda dapat menjadikan proyek Anda publik sehingga akan dicantumkan di [SubQuery Explorer](https://explorer.subquery.network) dan siapa saja di seluruh dunia dapat melihatnya.
- Kami terintegrasi dengan GitHub, jadi siapa pun di organisasi GitHub Anda dapat melihat proyek organisasi bersama.

## Buat proyek pertama Anda di Proyek SubQuery

### Hosting Basis Kode Proyek

Ada dua cara Anda dapat menghosting basis kode proyek SubQuery Anda sebelum dipublikasikan.

**IPFS (Disarankan)**: Basis kode proyek Anda dapat disimpan di IPFS, Anda dapat mengikuti panduan hosting IPFS kami untuk melihat bagaimana cara [mempublikasikan pertama kali ke IPFS](../run_publish/ipfs.md).

**GitHub (will be deprecated)**: Your project's codebase must be in a public GitHub repository, this process may be deprecated soon.

### Masuk ke Proyek SubQuery

Sebelum memulai, pastikan bahwa basis kode proyek SubQuery Anda online di repositori GitHub publik atau di IPFS. File `schema.graphql` harus berada di root direktori Anda.

Untuk membuat proyek pertama Anda, buka [Proyek SubQuery](https://project.subquery.network). Anda harus mengautentikasi dengan akun GitHub Anda untuk masuk.

Pada login pertama, Anda akan diminta untuk mengotorisasi SubQuery. Kami hanya memerlukan alamat email Anda untuk mengidentifikasi akun Anda, dan kami tidak menggunakan data lain dari akun GitHub Anda untuk alasan lain apa pun. Pada langkah ini, Anda juga dapat meminta atau memberikan akses ke akun Organisasi GitHub Anda sehingga Anda dapat memposting proyek SubQuery di bawah Organisasi GitHub alih-alih akun pribadi Anda.

![Cabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Proyek SubQuery adalah tempat Anda mengelola semua proyek yang dihosting yang diunggah ke platform SubQuery. Anda dapat membuat, menghapus, dan bahkan meningkatkan proyek semua dari aplikasi ini.

![Login Projek](/assets/img/projects-dashboard.png)

Jika Anda memiliki akun Organisasi GitHub yang terhubung, Anda dapat menggunakan pengalih di header untuk mengubah antara akun pribadi Anda dan akun Organisasi GitHub Anda. Proyek yang dibuat di akun Organisasi GitHub dibagikan di antara anggota di Organisasi GitHub tersebut. Untuk menghubungkan akun Organisasi GitHub Anda, Anda dapat [mengikuti langkah-langkah di sini](publish.md#add-github-organization-account-to-subquery-projects).

![Beralih antar akun GitHub](/assets/img/projects-account-switcher.png)

### Buat Proyek Pertama Anda

Ada dua metode untuk membuat proyek di SubQuery Managed Service, Anda dapat menggunakan UI atau langsung melalui alat `subql` cli.

#### Menggunakan UI

Mari kita mulai dengan mengklik "Create Project". Anda akan dibawa ke formulir Proyek Baru. Silakan masukkan yang berikut ini (Anda bisa mengubahnya di masa mendatang):

- **Akun GitHub:** Jika Anda memiliki lebih dari satu akun GitHub, pilih akun mana yang akan dibuat proyek ini. Proyek yang dibuat di akun organisasi GitHub dibagikan di antara anggota di organisasi itu.
- **Nama Projek**
- **Subtitle**
- **Deskripsi**
- **URL Repositori GitHub:** Ini harus berupa URL GitHub yang valid untuk repositori publik yang memiliki proyek SubQuery Anda. File `schema.graphql` harus berada di root direktori Anda ([pelajari lebih lanjut tentang struktur direktori](../build/introduction.md#directory-structure)).
- **Database:** Pelanggan premium dapat mengakses database khusus untuk menghosting proyek SubQuery produksi. Jika ini menarik minat Anda, Anda dapat menghubungi [sales@subquery.network](mailto:sales@subquery.network) untuk mengaktifkan setelan ini.
- **Sumber Penerapan:** Anda dapat memilih agar proyek di-deploy dari repositori GitHub atau sebagai alternatif di-deploy dari IPFS CID, lihat panduan kami tentang [hosting dengan IPFS.](ipfs.md)
- **Sembunyikan proyek:** Jika dipilih, ini akan menyembunyikan proyek dari penjelajah SubQuery publik. Biarkan ini tidak dipilih jika Anda ingin membagikan SubQuery Anda dengan komunitas!

![Buat Proyek pertama Anda](/assets/img/projects-create.png)

Buat proyek Anda dan Anda akan melihatnya di daftar Proyek SubQuery Anda. _Kita hampir sampai! Kita hanya perlu menerapkan versi barunya._

![Membuat Proyek tanpa penerapan](/assets/img/projects-no-deployment.png)

#### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk mempublikasikan proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

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

### Terapkan Versi pertama Anda

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Menggunakan UI

Saat membuat proyek akan mengatur perilaku tampilan proyek, Anda harus menerapkan sebuah versi sebelum menjadi operasional. Menerapkan versi memicu operasi pengindeksan SubQuery baru untuk memulai, dan menyiapkan layanan kueri yang diperlukan untuk mulai menerima permintaan GraphQL. Anda juga dapat menerapkan versi-versi baru ke proyek yang ada di sini.

Dengan proyek baru Anda, Anda akan melihat tombol Deploy New Version. Klik ini, dan isi informasi yang diperlukan tentang penerapan:

- **Cabang:** Dari GitHub, pilih cabang proyek yang ingin Anda gunakan.
- **Commit Hash:** Dari GitHub, pilih komit spesifik dari versi basis kode proyek SubQuery yang ingin Anda terapkan.
- **IPFS:** Jika menerapkan dari IPFS, tempel CID penerapan IPFS Anda (tanpa awalan `ipfs://`).
- **Ganti Titik Akhir Jaringan dan Kamus:** Anda dapat mengganti titik akhir dalam manifes proyek Anda di sini.
- **Versi Pengindeks:** Ini adalah versi layanan simpul SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Versi Kueri:** Ini adalah versi layanan kueri SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Terapkan Proyek pertama Anda](https://static.subquery.network/media/projects/projects-first-deployment.png)

Jika berhasil diterapkan, Anda akan melihat pengindeks mulai bekerja dan melaporkan kembali kemajuan pengindeksan chain saat ini. Proses ini mungkin memakan waktu hingga mencapai 100%.

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

#### Using Github actions

With the introduction of the deployment feature for the CLI, we've added a default Action workflow to GitHub that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: Create a project on [SubQuery Projects](https://project.subquery.network), this can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page for your project, and select the workflow `CLI deploy`
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects, you can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`
- Once the workflow is complete, you should be see your project deployed to our Managed Service

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. The following change to the GitHub Action workflow do this:

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

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Proyek di SubQuery Explorer](/assets/img/projects-explorer.png)

## Tambahkan Akun Organisasi GitHub ke Proyek SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Beralih antar akun GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Cabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
