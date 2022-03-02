# Hosting Proyek menggunakan IPFS

Panduan ini berfungsi melalui cara memublikasikan proyek SubQuery lokal ke [IPFS](https://ipfs.io/) dan menerapkannya di infrastruktur hosting kami.

Hosting proyek di IPFS membuatnya tersedia untuk semua orang dan mengurangi ketergantungan Anda pada layanan terpusat seperti GitHub.

## Persyaratan

- `@subql/cli` versi 0.21.0 atau lebih tinggi.
- Manifes `specVersion` 0.2.0 dan yang lebih baru.
- Siapkan [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) Anda.
- Untuk memastikan penerapan Anda berhasil, kami sangat menyarankan agar Anda membangun proyek Anda dengan perintah `subql build`, dan mengujinya secara lokal sebelum memublikasikannya.

## Siapkan SUBQL_ACCESS_TOKEN Anda

- Langkah 1: Buka [Proyek SubQuery](https://project.subquery.network/) dan masuk.
- Langkah 2: Klik profil Anda di kanan atas menu navigasi, lalu klik **_Refresh Token_**
- Langkah 3: Salin token yang dihasilkan.
- Langkah 4: Untuk menggunakan token ini:
  - Opsi 1: Tambahkan SUBQL_ACCESS_TOKEN di variabel lingkungan Anda. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Opsi 2: Segera hadir, `subql/cli` akan mendukung penyimpanan SUBQL_ACCESS_TOKEN Anda secara lokal.

## Cara mempublikasikan proyek

Kami menyediakan dua metode untuk mempublikasikan proyek Anda,

### Pilihan 1:

Karena Anda telah menginstal `@subql/cli`, Anda dapat menjalankan perintah berikut, yang akan membaca proyek dan informasi yang diperlukan dari manifes default `project.yaml`

```
// Publikasikan dari direktori root proyek Anda
subql publish

// ATAU arahkan ke root proyek Anda
subql publish -f ~/my-project/
```

### Pilihan 2:

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

## Setelah diterbitkan

Setelah berhasil memublikasikan proyek, log di bawah menunjukkan bahwa proyek dibuat di klaster IPFS dan telah mengembalikan `CID` (pengidentifikasi konten).

```
Kode bangunan dan pengepakan... selesai
Mengunggah proyek SupQuery ke IPFS
Proyek SubQuery yang diunggah ke IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd //CID
```

Harap perhatikan `CID` ini. With this `CID`, you can view your published project as what we call it [IPFS Deployment](#ipfs-deployment)

## IPFS Deployment

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralized network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it. `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

You should see the example project deployment as below:

This deployment looks very similar to your manifest file. You can expect those descriptive fields, and the network and dictionary endpoint has been removed as they did not directly affect the outcome of project execution.

Those files been used in your local project has been packed and published to IPFS as well.

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

## Run your SubQuery project on Hosted Service

### Create project with IPFS deployment

You can follow the guide to [Publish your SubQuery project](publish.md) but where you set your deployment source you can select **IPFS**.

Then choose your production slot, copy and paste you IPFS deployment CID (without the leading `ipfs://`).

You should see you IPFS deployment in the preview section. And you can select the network, dictionary endpoints etc.

After successful deploy the IPFS deployment on our hosted service, it should be available to view on the SubQuery Explorer, you can access the query service just like you do locally.
