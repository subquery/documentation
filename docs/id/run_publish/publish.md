# Publikasikan ke Layanan Terkelola

## Manfaat hosting proyek Anda dengan Layanan Terkelola SubQuery

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- Kami akan menjalankan proyek SubQuery untuk Anda dalam layanan publik berkinerja tinggi, skalabel, dan terkelola.
- Layanan ini disediakan bagi komunitas dengan tingkat gratis yang murah hati! You can host your first two SubQuery projects for absolutely free!
- Anda dapat menjadikan proyek Anda publik sehingga akan dicantumkan di [SubQuery Explorer](https://explorer.subquery.network) dan siapa saja di seluruh dunia dapat melihatnya.

Anda bisa meningkatkan untuk memanfaatkan layanan berbayar berikut ini:

- Hosting siap produksi untuk data penting misi dengan penerapan zero-downtime biru/hijau
- Basis data khusus
- Beberapa klaster geo-redundan dan perutean cerdas
- Pemantauan dan analitik lanjutan.

## Publikasikan proyek SubQuery Anda ke IPFS

Saat menerapkan ke Layanan Terkelola SubQuery, Anda harus terlebih dahulu meng-host basis kode Anda di [IPFS](https://ipfs.io/). Hosting a project in IPFS makes it available for everyone and reduces your reliance on centralised services like GitHub.

:::warning GitHub Deployment flows have been deprecated for IPFS

Jika proyek Anda masih disebarkan melalui GitHub, baca panduan migrasi untuk penyebaran IPFS [di sini](./ipfs.md) :::

### Persyaratan

- `@subql/cli` version 0.21.0 atau lebih tinggi.
- Manifest `specVersion` 1.0.0 ke atas.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### Persiapkan SUBQL_ACCESS_TOKEN

- Step 1: Go to [SubQuery Managed Service](https://managedservice.subquery.network/) and log in.
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

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content Identifier). Please note down this `CID`.

```
Kode bangunan dan pengepakan... selesai
Mengunggah proyek SupQuery ke IPFS
Proyek SubQuery yang diunggah ke IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.yaml. For example, if your manifest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

::: details What happens during IPFS Deployment?

Penyebaran IPFS mewakili keberadaan proyek SubQuery yang independen dan unik pada jaringan yang terdesentralisasi. Oleh karena itu, setiap perubahan dengan kode dalam proyek akan mempengaruhi keunikannya. Jika Anda perlu menyesuaikan logika bisnis Anda, mis. mengubah fungsi pemetaan, Anda harus memublikasikan ulang proyek, dan `CID` akan berubah.

For now, to view the project you have published, use a `REST` API tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

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

:::

## Login to SubQuery Projects

To create your first project, head to [SubQuery Managed Service](https://managedservice.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects_account_switcher.png)

## Create Your First Project

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

### Using the UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/project_created.png)

### Using the CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Please follow the guide on how to [create a new project](./cli.md#create-a-new-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

## Deploy your First Version

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

### Using the UI

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

### Using the CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Please follow the guide on how to [deploy to an existing project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

## Deploy new versions of your SubQuery project

Although you have the freedom to always upgrade and deploy new versions of your SubQuery project, please be considerate during this process if your SubQuery project is public to the world. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

Ada tiga metode untuk menyebarkan versi baru proyek Anda ke Layanan Terkelola SubQuery: Anda dapat menggunakan UI, membuatnya langsung melalui alat `subql` cli, atau menggunakan tindakan GitHub otomatis.

### Using the UI

Masuk ke SubQuery Project dan pilih proyek yang ingin Anda gunakan versi barunya. Anda bisa memilih untuk men-deploy ke slot produksi atau staging. Kedua slot ini adalah lingkungan yang terisolasi dan masing-masing memiliki database sendiri dan melakukan sinkronisasi secara independen.

Kami merekomendasikan untuk menyebarkan ke slot staging Anda hanya untuk pengujian staging akhir atau ketika Anda perlu menyinkronkan ulang data proyek Anda. Anda kemudian dapat mempromosikannya ke produksi tanpa downtime. Anda akan menemukan pengujian lebih cepat ketika [menjalankan proyek secara lokal](../run_publish/run.md) karena Anda dapat lebih [mempermudah masalah debug](../academy/tutorials_examples/debug-projects.md).

Slot pementasan sangat cocok untuk:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Pemanasan dan pengindeksan data untuk proyek SubQuery yang diperbarui untuk menghilangkan waktu henti di dApp Anda.
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Slot staging](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documentation to publish to IPFS [here](#publish-your-subquery-project-to-ipfs). Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

### Using the CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Please follow the guide on how to [deploy a new version of your project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) and another secret with the name `ENDPOINT` which matches the RPC API endpoint that you want to connect (you can retrieve this from your `project.yaml` and include a private API key).
- Step 2: If you haven't already, create a project on [SubQuery Managed Service](https://managedservice.subquery.network). This can be done using the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Langkah 3: Setelah proyek Anda dibuat, navigasikan ke halaman Tindakan GitHub dari proyek Anda, dan pilih alur kerja `CLI deploy`.
- Langkah 4: Anda akan melihat bidang input di mana Anda dapat memasukkan kode unik proyek Anda yang dibuat di SubQuery Projects. You can get the code from the URL in SubQuery's Managed Service [SubQuery Managed Service](https://managedservice.subquery.network). Kode ini didasarkan pada nama proyek Anda, di mana spasi diganti dengan tanda hubung `-`. misalnya `nama proyek saya` menjadi `nama proyek saya`.

:::: tips Tip
Setelah alur kerja selesai, Anda seharusnya dapat melihat proyek Anda diterapkan ke Managed Service kami.
:::

Pendekatan umum adalah memperluas Tindakan GitHub default untuk secara otomatis menyebarkan perubahan ke Layanan Terkelola kami ketika kode digabungkan ke cabang utama. Perubahan berikut pada alur kerja GitHub Action melakukan hal ini:

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

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer's GraphQL playground here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects_explorer.png)

## Project Alert Notifications

[SubQuery Managed Service](https://managedservice.subquery.network) provides a service where you can receive alerts on the health status of your projects. This means you can be alerted in real-time when your project becomes unhealthy and you can quickly resolve the issue to avoid any impact to your users.

You can easily set up a webhook endpoint to receive alert notifications on the health status of your projects on the Alerting page inside of the [Managed Service](https://managedservice.subquery.network). All you need to do is enter the URL of the endpoint that you would like us to send webhooks to (e.g. Slack, Telegram). For example, you can easily receive notifications in [Slack by following this guide](https://api.slack.com/messaging/webhooks), or [Discord by following this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

[SubQuery Managed Service](https://managedservice.subquery.network) makes POST requests to send these notifications to your specified endpoint as a JSON payload. You can then use these notifications to execute actions in your backend systems. The JSON payload is in the following format

```json
{
  "event_type": "indexer_unhealthy", // Event Type enum
  "event_message": "The indexer service for [jamesbayly/transaction-list][primary] is now unhealthy",
  "text": "The indexer service for [https://explorer.subquery.network/subquery/jamesbayly/projects/transaction-list> ][primary] is now unhealthy", // A longer version of event_message that is compatible with Slack
  "project": "jamesbayly/transaction-list", // Project key
  "project_name": "Polkadot Transactions",
  "project_url": "https://explorer.subquery.network/subquery/jamesbayly/projects/transaction-list?stage=false",
  "slot": "primary" // Either primary or stage
}
```

We currently support the following event types.

| Event Type           | What will trigger this event                                        |
| -------------------- | ------------------------------------------------------------------- |
| `block_sync_stalled` | The block height has stalled in the last 15 mins                    |
| `block_sync_recover` | The block height resumes syncing after a `block_sync_stalled` event |
| `indexer_unhealthy`  | The Indexer service transitions to unhealthy                        |
| `indexer_healthy`    | The Indexer service transitions to healthy status                   |
| `query_unhealthy`    | The Query service transitions to unhealthy                          |
| `query_healthy`      | The Query service transitions to healthy status                     |
| `deployment_started` | A deployment starts                                                 |
| `deployment_success` | A deployment succeeds                                               |
| `deployment_failed`  | A deployment fails                                                  |

## Tingkatkan ke Pengindeks dan Layanan Kueri Terbaru

Jika Anda hanya ingin meng-upgrade ke indexer terbaru ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) atau layanan kueri ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) untuk memanfaatkan peningkatan kinerja dan stabilitas reguler kami, cukup pilih versi terbaru dari paket kami dan simpan. Ini hanya akan menyebabkan downtime beberapa menit karena layanan yang menjalankan proyek Anda dimulai ulang.

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Managed Service](https://managedservice.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, then you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Managed Service](https://managedservice.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an administrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
