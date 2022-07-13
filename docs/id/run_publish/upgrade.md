# Terapkan Versi Baru Proyek SubQuery Anda

## Panduan

Meskipun Anda memiliki kebebasan untuk selalu meningkatkan dan menerapkan versi baru proyek SubQuery Anda, mohon berhati-hati selama proses ini jika proyek SubQuery Anda bersifat publik untuk dunia. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

## Terapkan Perubahan

Ada dua metode untuk menyebarkan versi baru proyek Anda ke SubQuery Managed Service, Anda dapat menggunakan UI atau secara langsung melalui alat `subql` cli.

### Menggunakan UI

Masuk ke SubQuery Project dan pilih proyek yang ingin Anda gunakan versi barunya. Anda bisa memilih untuk men-deploy ke slot produksi atau staging. Kedua slot ini adalah lingkungan yang terisolasi dan masing-masing memiliki database sendiri dan melakukan sinkronisasi secara independen.

Kami merekomendasikan untuk menyebarkan ke slot staging Anda hanya untuk pengujian staging akhir atau ketika Anda perlu menyinkronkan ulang data proyek Anda. Anda kemudian dapat mempromosikannya ke produksi tanpa downtime. Anda akan menemukan pengujian lebih cepat ketika [menjalankan proyek secara lokal](../run_publish/run.md) karena Anda dapat lebih [mempermudah masalah debug](../academy/tutorials_examples/debug-projects.md).

Slot pementasan sangat cocok untuk:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Slot staging](/assets/img/staging_slot.png)

Isi Commit Hash dari GitHub (salin commit hash penuh) dari versi basis kode proyek SubQuery yang ingin Anda terapkan. Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

### Menggunakan CLI

Anda juga dapat menggunakan `@subql/cli` untuk membuat deployment baru dari proyek Anda ke layanan terkelola kami. Hal ini membutuhkan:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- Sebuah [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) yang valid sudah siap.

```shell
// Anda dapat langsung mengatur versi Pengindeks dan Kueri Anda
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// ATAU Anda dapat menggunakan antarmuka, itu akan memvalidasi CID IPFS Anda dan membuat daftar versi gambar yang cocok dengan file manifes Anda `project.yaml`

$ subql deployment:deploy
```

## Tingkatkan ke Pengindeks dan Layanan Kueri Terbaru

Jika Anda hanya ingin meng-upgrade ke indexer terbaru ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) atau layanan kueri ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) untuk memanfaatkan peningkatan kinerja dan stabilitas reguler kami, cukup pilih versi terbaru dari paket kami dan simpan. Ini hanya akan menyebabkan downtime beberapa menit karena layanan yang menjalankan proyek Anda dimulai ulang.

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
