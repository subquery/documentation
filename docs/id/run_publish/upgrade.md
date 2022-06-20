# Terapkan Versi Baru Proyek SubQuery Anda

## Panduan

Meskipun Anda memiliki kebebasan untuk selalu meningkatkan dan menerapkan versi baru proyek SubQuery Anda, mohon berhati-hati selama proses ini jika proyek SubQuery Anda bersifat publik untuk dunia. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

## Terapkan Perubahan

Masuk ke Proyek SubQuery dan pilih proyek yang ingin Anda terapkan versi barunya. Anda dapat memilih untuk menyebarkan ke slot produksi atau pementasan. Kedua slot ini adalah lingkungan yang terisolasi dan masing-masing memiliki database sendiri dan disinkronkan secara independen.

Kami merekomendasikan penerapan ke slot staging Anda hanya untuk pengujian staging akhir atau saat Anda perlu menyinkronkan ulang data proyek Anda. Anda kemudian dapat mempromosikannya ke produksi tanpa downtime. Anda akan menemukan pengujian lebih cepat ketika [menjalankan proyek secara lokal](../run_publish/run.md) karena Anda dapat [men-debug masalah dengan lebih mudah](../academy/tutorials_examples/debug-projects.md).

Slot staging sangat cocok untuk:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Pemanasan dan pengindeksan data untuk proyek SubQuery yang diperbarui untuk mengeliminasi downtime di dApp Anda
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Slot staging](/assets/img/staging_slot.png)

#### Tingkatkan ke Latest Indexer and Query Service

Jika Anda hanya ingin meningkatkan ke pengindeks terbaru ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) atau layanan kueri ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) untuk mendapat keuntungan dari peningkatan stabilitas dan performa reguler kami, cukup pilih versi terbaru dari paket kami dan simpan. Ini hanya akan menyebabkan waktu henti beberapa menit.

#### When using `@subql/cli`
#### Requirement
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.
```
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```
#### Deploy New Version of your SubQuery Project

Isi Commit Hash dari GitHub (salin commit hash penuh) dari versi basis kode proyek SubQuery yang ingin Anda terapkan. Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. Di sana Anda dapat menggunakan taman bermain dalam browser untuk memulai - [baca selengkapnya tentang cara menggunakan Explorer kami di sini](../run_publish/query.md).
