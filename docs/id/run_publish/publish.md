# Publikasikan ke Layanan Terkelola

## Manfaat hosting proyek Anda dengan Layanan Terkelola SubQuery

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- Kami akan menjalankan proyek SubQuery untuk Anda dalam layanan publik berkinerja tinggi, skalabel, dan terkelola.
- Layanan ini disediakan bagi komunitas dengan tingkat gratis yang murah hati! Anda dapat meng-host dua proyek SubQuery pertama Anda secara gratis!
- Anda dapat menjadikan proyek Anda publik sehingga akan dicantumkan di [SubQuery Explorer](https://explorer.subquery.network) dan siapa saja di seluruh dunia dapat melihatnya.

Anda bisa meningkatkan untuk memanfaatkan layanan berbayar berikut ini:

- Hosting siap produksi untuk data penting misi dengan penerapan zero-downtime biru/hijau
- Basis data khusus
- Beberapa klaster geo-redundan dan perutean cerdas
- Pemantauan dan analitik lanjutan.

## Publikasikan proyek SubQuery Anda ke IPFS

Saat menerapkan ke Layanan Terkelola SubQuery, Anda harus terlebih dahulu meng-host basis kode Anda di [IPFS](https://ipfs.io/). Hosting a project in IPFS makes it available for everyone and reduces your reliance on centralised services like GitHub.

:::peringatan Alur Penyebaran GitHub sudah tidak digunakan lagi untuk IPFS

Jika proyek Anda masih disebarkan melalui GitHub, baca panduan migrasi untuk penyebaran IPFS [di sini](./ipfs.md) :::

### Persyaratan

- `@subql/cli` version 0.21.0 atau lebih tinggi.
- Manifest `specVersion` 1.0.0 ke atas.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### Persiapkan SUBQL_ACCESS_TOKEN

- Langkah 1: Buka [Proyek SubQuery](https://project.subquery.network/) dan masuk.
- Langkah 2: Klik profil Anda di kanan atas menu navigasi, lalu klik **_Refresh Token_**.
- Langkah 3: Salin token yang dihasilkan.
- Langkah 4: Untuk menggunakan token ini:
  - Opsi 1: Tambahkan SUBQL_ACCESS_TOKEN di variabel lingkungan Anda. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) atau `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Opsi 2: Segera hadir, `subql/cli` akan mendukung penyimpanan SUBQL_ACCESS_TOKEN Anda secara lokal.

### Cara mempublikasikan proyek

Run the following command, which will read the project's default manifest `project.yaml` for the required information.

```
// Publikasikan dari direktori root proyek Anda
subql publish

// ATAU arahkan ke root proyek Anda
subql publish -f ~/my-project/
```

Alternatively, if your project has multiple manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

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

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content IDentifier). Please note down this `CID`.

```
Kode bangunan dan pengepakan... selesai
Mengunggah proyek SupQuery ke IPFS
Proyek SubQuery yang diunggah ke IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

### IPFS Deployment

Penyebaran IPFS mewakili keberadaan proyek SubQuery yang independen dan unik pada jaringan yang terdesentralisasi. Oleh karena itu, setiap perubahan dengan kode dalam proyek akan mempengaruhi keunikannya. Jika Anda perlu menyesuaikan logika bisnis Anda, mis. mengubah fungsi pemetaan, Anda harus memublikasikan ulang proyek, dan `CID` akan berubah.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

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

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects_account_switcher.png)

### Buat Proyek Pertama Anda

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

#### Menggunakan UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/project_created.png)

#### Menggunakan CLI

You can also use `@subql/cli` to publish your project to our Managed Service. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) yang valid sudah siap.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName    Enter project name
```

### Menyebarkan Versi Pertama Anda

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Menggunakan UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a "Deploy your first version" button. Click this, and fill in the required information about the deployment:

- **CID:** Provide your IPFS deployment CID (without the leading `ipfs://`). This can be acquired by running `subql publish` with the CLI. The rest of the fields should then auto-populate.
- **Manifest:** The details are obtained from the contents of the provided CID.
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).
- **Advanced Settings:** There are numerous advanced settings which are explained via the inbuild help feature.

![Deploy your first Project](/assets/img/projects_first_deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

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

Dengan diperkenalkannya fitur penyebaran untuk CLI, kami telah menambahkan **Default Action Workflow** ke [proyek starter di GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) yang akan memungkinkan Anda untuk menerbitkan dan menyebarkan perubahan Anda secara otomatis:

- Langkah 1: Setelah mendorong proyek Anda ke GitHub, buat lingkungan `DEPLOYMENT` di GitHub, dan tambahkan rahasia [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ke dalamnya.
- Langkah 2: Buat proyek pada [Proyek SubQuery](https://project.subquery.network), ini dapat dilakukan dengan menggunakan [UI](#using-the-ui) atau [CLI](#using-the-cli).
- Langkah 3: Setelah proyek Anda dibuat, navigasikan ke halaman GitHub Actions untuk proyek Anda, dan pilih alur kerja `CLI deploy`
- Langkah 4: Anda akan melihat kolom input di mana Anda dapat memasukkan kode unik proyek Anda yang dibuat di SubQuery Projects, Anda bisa mendapatkan kode dari URL di SubQuery Projects [SubQuery Projects](https://project.subquery.network). Kode ini didasarkan pada nama proyek Anda, di mana spasi diganti dengan tanda hubung `-`. contoh: `nama proyek saya` menjadi `nama-proyek-saya`
- Setelah alur kerja selesai, Anda akan melihat proyek Anda dikerahkan ke Managed Service kami

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. Perubahan berikut pada alur kerja GitHub Action melakukan hal ini:

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

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects_deploy_sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Proyek di SubQuery Explorer](/assets/img/projects_explorer.png)

## Tambahkan Akun Organisasi GitHub ke Proyek SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
