# Hosting Proyek menggunakan IPFS

Panduan ini berfungsi melalui cara memublikasikan proyek SubQuery lokal ke [IPFS](https://ipfs.io/) dan menerapkannya di infrastruktur hosting kami.

Hosting proyek di IPFS membuatnya tersedia untuk semua dan mengurangi ketergantungan Anda pada layanan terpusat seperti GitHub.

## Persyaratan

- `@subql/cli` version 0.21.0 atau lebih tinggi.
- Manifes `specVersion` 0.2.0 dan yang lebih baru.
- Siapkan [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) Anda.
- Untuk memastikan penerapan Anda berhasil, kami sangat menyarankan agar Anda membangun proyek Anda dengan perintah `subql build`, dan mengujinya secara lokal sebelum memublikasikannya.

## Persiapkan SUBQL_ACCESS_TOKEN

- Langkah 1: Buka [Proyek SubQuery](https://project.subquery.network/) dan masuk.
- Langkah 2: Klik profil Anda di kanan atas menu navigasi, lalu klik **_Refresh Token_**.
- Langkah 3: Salin token yang dihasilkan.
- Langkah 4: Untuk menggunakan token ini:
  - Opsi 1: Tambahkan SUBQL_ACCESS_TOKEN di variabel lingkungan Anda. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Opsi 2: Segera hadir, `subql/cli` akan mendukung penyimpanan SUBQL_ACCESS_TOKEN Anda secara lokal.

## Cara mempublikasikan proyek

Kami menyediakan dua metode untuk mempublikasikan proyek Anda:

### Pilihan 1

Karena Anda telah menginstal `@subql/cli`, Anda dapat menjalankan perintah berikut, yang akan membaca proyek dan informasi yang diperlukan dari manifes default `project.yaml`:

```
// Publikasikan dari direktori root proyek Anda
subql publish

// ATAU arahkan ke root proyek Anda
subql publish -f ~/my-project/
```

### Pilihan 2

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

Harap perhatikan `CID` ini. Dengan `CID` ini, Anda dapat melihat proyek yang dipublikasikan sebagai apa yang kami sebut [Penerapan IPFS](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named  `.project-cid`.

## IPFS Deployment

Penyebaran IPFS mewakili keberadaan proyek SubQuery yang independen dan unik pada jaringan yang terdesentralisasi. Oleh karena itu, setiap perubahan dengan kode dalam proyek akan mempengaruhi keunikannya. Jika Anda perlu menyesuaikan logika bisnis Anda, mis. mengubah fungsi pemetaan, Anda harus memublikasikan ulang proyek, dan `CID` akan berubah.

Untuk saat ini, untuk melihat proyek yang telah Anda publikasikan, gunakan alat `REST` api seperti [Postman](https://web.postman.co/), dan gunakan metode `POST` dengan contoh URL berikut untuk mengambilnya:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

Anda akan melihat contoh penerapan proyek seperti di bawah ini.

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

Anda dapat mengikuti panduan untuk [Publikasikan proyek SubQuery Anda](../run_publish/publish.md) tetapi di mana Anda mengatur sumber penyebaran Anda, Anda dapat memilih **IPFS**.

Kemudian pilih slot produksi Anda, salin dan tempel CID penerapan IPFS Anda (tanpa awalan `ipfs://`).

Anda akan melihat penerapan IPFS di bagian pratinjau. Dan Anda dapat memilih jaringan, titik akhir kamus, dll.

Setelah berhasil menyebarkan penerapan IPFS pada layanan yang dihosting kami, itu harus tersedia untuk dilihat di SubQuery Explorer, Anda dapat mengakses layanan kueri seperti yang Anda lakukan secara lokal.
