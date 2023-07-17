# Terapkan Versi Baru Proyek SubQuery Anda

## Panduan

Meskipun Anda memiliki kebebasan untuk selalu meningkatkan dan menerapkan versi baru proyek SubQuery Anda, mohon berhati-hati selama proses ini jika proyek SubQuery Anda bersifat publik untuk dunia. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

## Terapkan Perubahan

Ada tiga metode untuk menyebarkan versi baru proyek Anda ke Layanan Terkelola SubQuery: Anda dapat menggunakan UI, membuatnya langsung melalui alat `subql` cli, atau menggunakan tindakan GitHub otomatis.

### Menggunakan UI

Masuk ke SubQuery Project dan pilih proyek yang ingin Anda gunakan versi barunya. Anda bisa memilih untuk men-deploy ke slot produksi atau staging. Kedua slot ini adalah lingkungan yang terisolasi dan masing-masing memiliki database sendiri dan melakukan sinkronisasi secara independen.

Kami merekomendasikan untuk menyebarkan ke slot staging Anda hanya untuk pengujian staging akhir atau ketika Anda perlu menyinkronkan ulang data proyek Anda. Anda kemudian dapat mempromosikannya ke produksi tanpa downtime. Anda akan menemukan pengujian lebih cepat ketika [menjalankan proyek secara lokal](../run_publish/run.md) karena Anda dapat lebih [mempermudah masalah debug](../academy/tutorials_examples/debug-projects.md).

Slot pementasan sangat cocok untuk:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Pemanasan dan pengindeksan data untuk proyek SubQuery yang diperbarui untuk menghilangkan waktu henti di dApp Anda.
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Slot staging](/assets/img/staging_slot.png)

Isi IPFS CID versi baru dari basis kode proyek SubQuery Anda yang ingin Anda sebarkan (lihat dokumentasi untuk mempublikasikan ke IPFS [di sini](./publish.md). Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) yang valid sudah siap.

```shell
// Anda dapat langsung mengatur versi Pengindeks dan Kueri Anda
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// ATAU Anda dapat menggunakan antarmuka, itu akan memvalidasi CID IPFS Anda dan membuat daftar versi gambar yang cocok dengan file manifes Anda `project.yaml`

$ subql deployment:deploy
```

### Menggunakan tindakan GitHub

Dengan diperkenalkannya fitur penyebaran untuk CLI, kami telah menambahkan **Default Action Workflow** ke [proyek starter di GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) yang akan memungkinkan Anda untuk menerbitkan dan menyebarkan perubahan Anda secara otomatis:

- Langkah 1: Setelah mendorong proyek Anda ke GitHub, buat lingkungan `DEPLOYMENT` di GitHub, dan tambahkan rahasia [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ke dalamnya.
- Langkah 2: Jika Anda belum melakukannya, buat proyek pada [Proyek SubQuery](https://managedservice.subquery.network). Hal ini bisa dilakukan dengan menggunakan [UI](#using-the-ui) atau [CLI](#using-the-cli).
- Langkah 3: Setelah proyek Anda dibuat, navigasikan ke halaman Tindakan GitHub dari proyek Anda, dan pilih alur kerja `CLI deploy`.
- Langkah 4: Anda akan melihat bidang input di mana Anda dapat memasukkan kode unik proyek Anda yang dibuat di SubQuery Projects. Anda bisa mendapatkan kode dari URL di Proyek SubQuery [Proyek SubQuery](https://managedservice.subquery.network). Kode ini didasarkan pada nama proyek Anda, di mana spasi diganti dengan tanda hubung `-`. misalnya `nama proyek saya` menjadi `nama proyek saya`.

::: tips Tip
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

## Tingkatkan ke Pengindeks dan Layanan Kueri Terbaru

Jika Anda hanya ingin meng-upgrade ke indexer terbaru ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) atau layanan kueri ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) untuk memanfaatkan peningkatan kinerja dan stabilitas reguler kami, cukup pilih versi terbaru dari paket kami dan simpan. Ini hanya akan menyebabkan downtime beberapa menit karena layanan yang menjalankan proyek Anda dimulai ulang.

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects_deploy_sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. Di sana Anda dapat menggunakan taman bermain di browser untuk memulai - [baca lebih lanjut tentang cara menggunakan Explorer kami di sini](../run_publish/query.md).

![Proyek di SubQuery Explorer](/assets/img/projects_explorer.png)

:::: tip Catatan Pelajari lebih lanjut tentang [GraphQL Query language.](./graphql.md) :::
