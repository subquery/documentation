# Hosting Proyek menggunakan IPFS

Panduan ini berfungsi melalui cara memublikasikan proyek SubQuery lokal ke [IPFS](https://ipfs.io/) dan menerapkannya di infrastruktur hosting kami.

Hosting proyek di IPFS membuatnya tersedia untuk semua dan mengurangi ketergantungan Anda pada layanan terpusat seperti GitHub.

## Persyaratan

- `@subql/cli` version 0.21.0 atau lebih tinggi.
- Manifes `specVersion` 0.2.0 dan yang lebih baru.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Untuk memastikan penerapan Anda berhasil, kami sangat menyarankan agar Anda membangun proyek Anda dengan perintah `subql build`, dan mengujinya secara lokal sebelum memublikasikannya.

## Persiapkan SUBQL_ACCESS_TOKEN

- Langkah 1: Buka [Proyek SubQuery](https://project.subquery.network/) dan masuk.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Langkah 3: Salin token yang dihasilkan.
- Langkah 4: Untuk menggunakan token ini:
  - Opsi 1: Tambahkan SUBQL_ACCESS_TOKEN di variabel lingkungan Anda. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Opsi 2: Segera hadir, `subql/cli` akan mendukung penyimpanan SUBQL_ACCESS_TOKEN Anda secara lokal.

## Cara mempublikasikan proyek

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Publikasikan dari direktori root proyek Anda
subql publish

// ATAU arahkan ke root proyek Anda
subql publish -f ~/my-project/
```

### Option 2

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

Harap perhatikan `CID` ini. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## IPFS Deployment

Penyebaran IPFS mewakili keberadaan proyek SubQuery yang independen dan unik pada jaringan yang terdesentralisasi. Oleh karena itu, setiap perubahan dengan kode dalam proyek akan mempengaruhi keunikannya. Jika Anda perlu menyesuaikan logika bisnis Anda, mis. mengubah fungsi pemetaan, Anda harus memublikasikan ulang proyek, dan `CID` akan berubah.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

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

## Jalankan proyek SubQuery Anda di Layanan yang Dihosting

### Buat proyek dengan penerapan IPFS

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Kemudian pilih slot produksi Anda, salin dan tempel CID penerapan IPFS Anda (tanpa awalan `ipfs://`).

Anda akan melihat penerapan IPFS di bagian pratinjau. Dan Anda dapat memilih jaringan, titik akhir kamus, dll.

Setelah berhasil menyebarkan penerapan IPFS pada layanan yang dihosting kami, itu harus tersedia untuk dilihat di SubQuery Explorer, Anda dapat mengakses layanan kueri seperti yang Anda lakukan secara lokal.
