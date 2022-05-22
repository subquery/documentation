# Polkadot Quick Start

In this quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. This is an excellent basis to start with when developing your own Substrate/Polkadot SubQuery Project.

Di akhir panduan ini, Anda akan memiliki proyek SubQuery yang berjalan pada node SubQuery dengan titik akhir GraphQL tempat dimana Anda dapat membuat kueri data.

Jika Anda belum melakukannya, sebaiknya Anda membiasakan diri dengan [terminologi](../#terminology) yang digunakan di SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot, it should only take 10-15 minutes**

## Persiapan

### Lingkungan Pengembangan Lokal

- [Node](https://nodejs.org/en/): Instalasi Node.js modern (misalnya versi LTS).
- [Docker](https://docker.com/): Tutorial ini akan membutuhkan Docker

### Pasang CLI SubQuery

Instal SubQuery CLI secara global di terminal Anda dengan menggunakan NPM:

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to errors down the line.

You can then run help to see available commands and usage provided by the CLI:

```shell
bantuan subql
```

## Inisialisasi Proyek Pemula SubQuery

Di dalam direktori tempat Anda ingin membuat proyek SubQuery, cukup jalankan perintah berikut untuk memulai.

```shell
subql init
```

Anda akan ditanyai pertanyaan tertentu saat proyek SubQuery diinisialisasi:

- Project name: A project name for your SubQuery project
- Network family: The layer-1 blockchain network family that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Substrate"*
- Network: The specific network that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Polkadot"*
- Template project: Select a SubQuery template project that will provide a starting point to begin development. We suggest selecting the *"subql-starter"* project.
- RPC endpoint: Provide an HTTPS URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. Node RPC ini harus berupa node arsip (memiliki status rantai penuh). For this guide, we will use the default value *"https://polkadot.api.onfinality.io"*
- Git repository: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- Authors: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- Description: Provide a short paragraph about your project that describes what data it contains and what users can do with it or accept the provided default.
- Version: Enter a custom version number or use the default (`1.0.0`)
- License: Provide the software license for this project or accept the default (`MIT`)

After the initialisation process is complete, you should see that a folder with your project name has been created inside the directory. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run the following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. Manifes Proyek di `project.yaml`
3. Fungsi Pemetaan di direktori `src/mappings/`

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Memperbarui File Skema GraphQL Anda

`schema.graphql` file mendefinisikan berbagai skema GraphQL. Karena cara kerja bahasa kueri GraphQL, file skema pada dasarnya menentukan bentuk data Anda dari SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Penting: Saat Anda membuat perubahan apa pun pada file skema, pastikan Anda membuat ulang direktori tipe Anda.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Untuk informasi lebih lanjut tentang file `schema.graphql`, lihat dokumentasi kami di bawah [Build/GraphQL Schema](../build/graphql.md)

### Memperbarui File Manifes Proyek

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

Untuk informasi selengkapnya tentang file Project Manifest (`project.yaml`), lihat dokumentasi kami di [Build/Manifest File](../build/manifest.md)

### Tambahkan Fungsi Pemetaan

Fungsi pemetaan menentukan bagaimana data rantai diubah menjadi entitas GraphQL yang dioptimalkan yang sebelumnya telah kita definisikan dalam file `schema.graphql`.

Navigasikan ke fungsi pemetaan default di direktori `src/mappings`. Anda akan melihat tiga fungsi yang diekspor, `handleBlock`, `handleEvent`, dan `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

Anda dapat memperbarui fungsi `handleEvent` sebagai berikut (perhatikan impor tambahan):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. Kami mengekstrak data ini dan kemudian membuat instance entitas `Transfer` baru yang kami definisikan sebelumnya di file `schema.graphql`. Kami menambahkan informasi tambahan dan kemudian menggunakan fungsi `.save()` untuk menyimpan entitas baru (SubQuery akan secara otomatis menyimpan ini ke database).

Untuk informasi lebih lanjut tentang fungsi pemetaan, lihat dokumentasi kami di bawah [Build/Mappings](../build/mapping.md)

### Bangun Proyek

In order to run your new SubQuery Project we first need to build our work. Jalankan perintah build dari direktori root proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Cara termudah untuk melakukannya adalah dengan menggunakan Docker.

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Kueri Proyek Anda

Buka browser Anda dan buka [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. Di kanan atas taman bermain, Anda akan menemukan tombol _Dokumen_ yang akan membuka undian dokumentasi. Dokumentasi ini dibuat secara otomatis dan membantu Anda menemukan entitas dan metode apa yang dapat Anda kueri.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### Publikasikan Proyek SubQuery Anda

SubQuery provides a free managed service where you can deploy your new project to. Anda dapat menerapkannya ke [Proyek SubQuery](https://project.subquery.network) dan menanyakannya menggunakan [Explorer](https://explorer.subquery.network) kami.

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Langkah selanjutnya

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Sekarang setelah Anda memiliki wawasan tentang cara membangun proyek SubQuery dasar, pertanyaannya adalah dari mana dari sini? Jika Anda merasa percaya diri, Anda dapat mempelajari lebih lanjut tentang tiga file utama. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. Di sana kita akan melihat modifikasi yang lebih canggih, dan kita akan menyelami lebih dalam dalam menjalankan proyek SubQuery dengan menjalankan proyek yang tersedia dan open source.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
