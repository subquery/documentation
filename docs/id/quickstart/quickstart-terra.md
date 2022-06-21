# Memulai Cepat Terra

Dalam panduan singkat ini, kita akan memulai dengan proyek awal yang sederhana dan kemudian menyelesaikannya dengan mengindeks beberapa data nyata yang sebenarnya. Ini adalah dasar yang sangat baik untuk memulai ketika mengembangkan Proyek SubQuery Anda sendiri.

**Jika Anda mencari panduan untuk Substrat/Polkadot, Anda dapat membaca [Panduan memulai cepat khusus Substrat/Polkadot](./quickstart-polkadot).**

Di akhir panduan ini, Anda akan memiliki proyek SubQuery yang berjalan pada node SubQuery dengan titik akhir GraphQL tempat dimana Anda dapat membuat kueri data.

Jika Anda belum melakukannya, sebaiknya Anda membiasakan diri dengan [terminologi](../#terminology) yang digunakan di SubQuery.

**Tujuan dari panduan memulai cepat ini adalah untuk mengadaptasi proyek pemula standar untuk mulai mengindeks semua transfer dari Terra, hanya membutuhkan waktu 10-15 menit**

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

Harap dicatat bahwa kami **JANGAN** mendorong penggunaan `yarn global` untuk menginstal `@subql/cli` karena manajemen ketergantungannya yang buruk yang dapat menyebabkan kesalahan di lini depan.

Anda kemudian dapat menjalankan bantuan untuk melihat perintah dan penggunaan yang tersedia yang disediakan oleh CLI

```shell
bantuan subql
```

## Inisialisasi Proyek Pemula SubQuery

Di dalam direktori tempat Anda ingin membuat proyek SubQuery, cukup jalankan perintah berikut untuk memulai.

```shell
subql init
```

Anda akan ditanyai pertanyaan tertentu saat proyek SubQuery diinisialisasi:

- Nama Proyek: Nama untuk proyek SubQuery Anda
- Keluarga Jaringan: Keluarga jaringan blockchain layer-1 yang proyek SubQuery ini akan dikembangkan untuk diindeks, gunakan tombol panah pada keyboard Anda untuk memilih dari opsi, untuk panduan ini kita akan menggunakan *"Terra"*
- Jaringan: Jaringan spesifik yang akan diindeks oleh proyek SubQuery ini, gunakan tombol panah pada keyboard Anda untuk memilih dari opsi, untuk panduan ini kami akan menggunakan *"Terra"*
- Template: Pilih template proyek SubQuery yang akan memberikan titik awal untuk memulai pengembangan, sebaiknya pilih *"Proyek Pemula"*
- Git repository (Opsional): Berikan URL Git ke repo tempat proyek SubQuery ini akan dihosting (saat dihosting di SubQuery Explorer)
- RPC endpoint (Diperlukan): Berikan URL HTTPS ke titik akhir RPC yang sedang berjalan yang akan digunakan secara default untuk proyek ini. Node RPC ini harus berupa node arsip (memiliki status rantai penuh). Untuk panduan ini kita akan menggunakan nilai default *"https://terra-columbus-5.beta.api.onfinality.io"*
- Authors (Diperlukan): Masukkan pemilik proyek SubQuery ini di sini (misal. nama Anda!)
- Description (Opsional): Anda dapat memberikan paragraf singkat tentang proyek Anda yang menjelaskan data apa yang ada di dalamnya dan apa yang dapat dilakukan pengguna dengannya
- Version (Diperlukan): Masukkan nomor versi khusus atau gunakan default (`1.0.0`)
- License (Diperlukan): Berikan lisensi perangkat lunak untuk proyek ini atau terima default (`Apache-2.0`)

Setelah proses inisialisasi selesai, Anda akan melihat folder dengan nama proyek Anda telah dibuat di dalam direktori. Isi direktori ini harus identik dengan apa yang tercantum dalam [Struktur Direktori](../create/introduction.md#directory-structure).

Terakhir, di bawah direktori proyek, jalankan perintah berikut untuk menginstal dependensi proyek baru.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Membuat Perubahan pada Proyek Anda

Dalam package awal yang baru saja Anda inisialisasi, kami telah menyediakan konfigurasi standar untuk proyek baru Anda. Anda terutama akan mengerjakan file-file berikut:

1. Skema GraphQL di `schema.graphql`
2. Manifes Proyek di `project.yaml`
3. Fungsi Pemetaan di direktori `src/mappings/`

Tujuan dari panduan memulai cepat ini adalah untuk mengadaptasi proyek awal standar untuk mulai mengindeks semua transfer dari kontrak pintar bLuna.

### Memperbarui File Skema GraphQL Anda

`schema.graphql` file mendefinisikan berbagai skema GraphQL. Karena cara kerja bahasa kueri GraphQL, file skema pada dasarnya menentukan bentuk data Anda dari SubQuery. Ini adalah tempat yang bagus untuk memulai karena memungkinkan Anda untuk menentukan tujuan akhir Anda di depan.

Kami akan memperbarui file `schema.graphql` agar terbaca sebagai berikut

```graphql
type Transfer @entity {
  id: ID! # bidang id selalu diperlukan dan harus terlihat seperti ini
  txHash: String!
  blockHeight: BigInt # Ketinggian blok transfer
  sender: String! # Dari akun mana transfer dilakukan
  recipient: String! # Rekening yang ditransfer ke
  amount: String! #Jumlah yang ditransfer
}
```

**Penting: Saat Anda membuat perubahan apa pun pada file skema, pastikan Anda membuat ulang direktori tipe Anda. Lakukan ini sekarang.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Anda akan menemukan model yang dihasilkan di direktori `/src/types/models`. Untuk informasi lebih lanjut tentang file `schema.graphql`, lihat dokumentasi kami di bawah [Build/GraphQL Schema](../build/graphql.md)

### Memperbarui File Manifes Proyek

File Projek Manifest (`project.yaml`) dapat dilihat sebagai titik masuk proyek Anda dan ini mendefinisikan sebagian besar detail tentang bagaimana SubQuery akan mengindeks dan mengubah data rantai.

Kami tidak akan melakukan banyak perubahan pada file manifes karena sudah diatur dengan benar, tetapi kami perlu mengubah penangan kami. Ingat kami berencana untuk mengindeks semua peristiwa transfer Terra, sebagai hasilnya, kami perlu memperbarui bagian `sumber data` untuk membaca yang berikut ini.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

Ini berarti kita akan menjalankan fungsi pemetaan `handleEvent` setiap kali ada peristiwa `transfer` dari kontrak pintar bLuna.

Untuk informasi selengkapnya tentang file Project Manifest (`project.yaml`), lihat dokumentasi kami di [Build/Manifest File](../build/manifest.md)

### Tambahkan Fungsi Pemetaan

Fungsi pemetaan menentukan bagaimana data rantai diubah menjadi entitas GraphQL yang dioptimalkan yang sebelumnya telah kita definisikan dalam file `schema.graphql`.

Navigasikan ke fungsi pemetaan default di direktori `src/mappings`. Anda akan melihat tiga fungsi yang diekspor, `handleBlock`, `handleEvent`, dan `handleCall`. Anda dapat menghapus fungsi `handleBlock` dan `handleCall`, kita hanya berurusan dengan fungsi `handleEvent`.

Fungsi `handleEvent` menerima data peristiwa setiap kali peristiwa cocok dengan filter yang kami tentukan sebelumnya di `project.yaml` kami. Kami akan memperbaruinya untuk memproses semua `transfer` peristiwa dan menyimpannya ke entitas GraphQL yang kami buat sebelumnya.

Anda dapat memperbarui fungsi `handleEvent` sebagai berikut (perhatikan impor tambahan):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));

    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

Apa yang dilakukan adalah menerima SubstrateEvent yang mencakup transfer data pada payload. Kami mengekstrak data ini dan kemudian membuat instance entitas `Transfer` baru yang kami definisikan sebelumnya di file `schema.graphql`. Kami menambahkan informasi tambahan dan kemudian menggunakan fungsi `.save()` untuk menyimpan entitas baru (SubQuery akan secara otomatis menyimpan ini ke database).

Untuk informasi lebih lanjut tentang fungsi pemetaan, lihat dokumentasi kami di bawah [Build/Mappings](../build/mapping.md)

### Bangun Proyek

Untuk menjalankan Proyek SubQuery baru Anda, pertama-tama kita perlu membangun pekerjaan kita. Jalankan perintah build dari direktori root proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Penting: Setiap kali Anda membuat perubahan pada fungsi pemetaan, Anda harus membangun kembali proyek Anda**

## Menjalankan dan Membuat Kueri Proyek Anda

### Jalankan Proyek Anda dengan Docker

Setiap kali Anda membuat Proyek SubQuery baru, Anda harus selalu menjalankannya secara lokal di komputer Anda untuk mengujinya terlebih dahulu. Cara termudah untuk melakukannya adalah dengan menggunakan Docker.

Semua konfigurasi yang mengontrol bagaimana node SubQuery dijalankan didefinisikan dalam file `docker-compose.yml` ini. Untuk proyek baru yang baru saja diinisialisasi, Anda tidak perlu mengubah apa pun di sini, tetapi Anda dapat membaca lebih lanjut tentang file dan pengaturannya di [Jalankan bagian Proyek](../run_publish/run.md)

Di bawah direktori proyek jalankan perintah berikut:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Mungkin perlu beberapa saat untuk mengunduh paket yang diperlukan ([`@subql/node`](https://www.npmjs.com/package/@subql/node),

`@subql/query`</7 >, dan Postgres) untuk pertama kalinya tetapi segera Anda akan melihat node SubQuery yang sedang berjalan. Sabar pada proses di sini.</p> 



### Kueri Proyek Anda

Buka browser Anda dan buka [http://localhost:3000](http://localhost:3000).

Anda akan melihat taman bermain GraphQL ditampilkan di explorer dan skema yang siap untuk kueri. Di kanan atas taman bermain, Anda akan menemukan tombol _Dokumen_ yang akan membuka undian dokumentasi. Dokumentasi ini dibuat secara otomatis dan membantu Anda menemukan entitas dan metode apa yang dapat Anda kueri.

Untuk proyek pemula SubQuery baru, Anda dapat mencoba kueri berikut untuk mengetahui cara kerjanya atau [pelajari lebih lanjut tentang bahasa Kueri GraphQL](../run_publish/graphql.md).



```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```




### Publikasikan Proyek SubQuery Anda

SubQuery menyediakan layanan terkelola gratis saat Anda dapat menerapkan proyek baru Anda. Anda dapat menerapkannya ke [Proyek SubQuery](https://project.subquery.network) dan menanyakannya menggunakan [Explorer](https://explorer.subquery.network) kami.

[Baca panduan untuk memublikasikan proyek baru Anda ke Proyek SubQuery](../run_publish/publish.md)



## Langkah selanjutnya

Selamat, Anda sekarang memiliki proyek SubQuery yang berjalan secara lokal yang menerima permintaan GraphQL API untuk mentransfer data dari bLuna.

Sekarang setelah Anda memiliki wawasan tentang cara membangun proyek SubQuery dasar, pertanyaannya adalah dari mana dari sini? Jika Anda merasa percaya diri, Anda dapat mempelajari lebih lanjut tentang tiga file utama. File manifes, skema GraphQL, dan file pemetaan di bawah [bagian Build dari dokumen ini](../build/introduction.md).

Jika tidak, lanjutkan ke [bagian Akademi](../academy/academy.md) kami di mana terdapat lokakarya, tutorial, dan contoh proyek yang lebih mendalam. Di sana kita akan melihat modifikasi yang lebih canggih, dan kita akan menyelami lebih dalam dalam menjalankan proyek SubQuery dengan menjalankan proyek yang tersedia dan open source.

Terakhir, jika Anda mencari lebih banyak cara untuk menjalankan dan memublikasikan proyek Anda, [Jalankan & Bagian Publikasikan](../run_publish/run.md) memberikan informasi mendetail tentang semua cara untuk menjalankan proyek SubQuery Anda dan fitur agregasi dan langganan GraphQL lanjutan lainnya.
