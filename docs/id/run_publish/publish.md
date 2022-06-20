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

Mari kita mulai dengan mengklik "Buat Proyek". Anda akan dibawa ke formulir Proyek Baru. Silakan masukkan yang berikut ini (Anda dapat mengubahnya di masa mendatang):

- **Akun GitHub:** Jika Anda memiliki lebih dari satu akun GitHub, pilih akun mana yang akan dibuat proyek ini. Proyek yang dibuat di akun organisasi GitHub dibagikan di antara anggota di organisasi itu.
- **Nama Projek**
- **Subtitle**
- **Deskripsi**
- **URL Repositori GitHub:** Ini harus berupa URL GitHub yang valid untuk repositori publik yang memiliki proyek SubQuery Anda. File `schema.graphql` harus berada di root direktori Anda ([pelajari lebih lanjut tentang struktur direktori](../create/introduction.md#directory-structure)).
- **Database:** Pelanggan premium dapat mengakses database khusus untuk menghosting proyek SubQuery produksi. Jika ini menarik minat Anda, Anda dapat menghubungi [sales@subquery.network](mailto:sales@subquery.network) untuk mengaktifkan setelan ini.
- **Sumber Penerapan:** Anda dapat memilih agar proyek di-deploy dari repositori GitHub atau sebagai alternatif di-deploy dari IPFS CID, lihat panduan kami tentang [hosting dengan IPFS.](ipfs.md)
- **Sembunyikan proyek:** Jika dipilih, ini akan menyembunyikan proyek dari penjelajah SubQuery publik. Biarkan ini tidak dipilih jika Anda ingin membagikan SubQuery Anda dengan komunitas! ![Buat Proyek pertama Anda](/assets/img/projects-create.png)

Buat proyek Anda dan Anda akan melihatnya di daftar Proyek SubQuery Anda. _Kita hampir sampai! Kami hanya perlu menerapkan versi barunya._

![Membuat Proyek tanpa penerapan](/assets/img/projects-no-deployment.png)

### Creating Projects using CLI

You can also use `@subql/cli` to create your project
#### Persyaratan
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Deploy your first Version

### Pilihan 1:

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

### Pilihan 2:
#### Deploying using CLI
#### Persyaratan
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
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

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Tambahkan Akun Organisasi GitHub ke Proyek SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Beralih antar akun GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Cabut persetujuan dari akun GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.



