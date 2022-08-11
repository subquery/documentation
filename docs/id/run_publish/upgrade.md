# Terapkan Versi Baru Proyek SubQuery Anda

## Panduan

Meskipun Anda memiliki kebebasan untuk selalu meningkatkan dan menerapkan versi baru proyek SubQuery Anda, mohon berhati-hati selama proses ini jika proyek SubQuery Anda bersifat publik untuk dunia. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

## Terapkan Perubahan

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Menggunakan UI

Masuk ke SubQuery Project dan pilih proyek yang ingin Anda gunakan versi barunya. Anda bisa memilih untuk men-deploy ke slot produksi atau staging. Kedua slot ini adalah lingkungan yang terisolasi dan masing-masing memiliki database sendiri dan melakukan sinkronisasi secara independen.

Kami merekomendasikan untuk menyebarkan ke slot staging Anda hanya untuk pengujian staging akhir atau ketika Anda perlu menyinkronkan ulang data proyek Anda. Anda kemudian dapat mempromosikannya ke produksi tanpa downtime. Anda akan menemukan pengujian lebih cepat ketika [menjalankan proyek secara lokal](../run_publish/run.md) karena Anda dapat lebih [mempermudah masalah debug](../academy/tutorials_examples/debug-projects.md).

Slot pementasan sangat cocok untuk:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Pemanasan dan pengindeksan data untuk proyek SubQuery yang diperbarui untuk menghilangkan waktu henti di dApp Anda.
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Slot staging](/assets/img/staging_slot.png)

Isi Commit Hash dari GitHub (salin commit hash penuh) dari versi basis kode proyek SubQuery yang ingin Anda terapkan. Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

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

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Langkah 1: Setelah mendorong proyek Anda ke GitHub, buat lingkungan `DEPLOYMENT` di GitHub, dan tambahkan rahasia [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ke dalamnya.
- Step 2: If you haven't already, create a project on [SubQuery Projects](https://project.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). Kode ini didasarkan pada nama proyek Anda, di mana spasi diganti dengan tanda hubung `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. Perubahan berikut pada alur kerja GitHub Action melakukan hal ini:

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

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
