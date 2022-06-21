# Terapkan Versi Baru Proyek SubQuery Anda

## Panduan

Meskipun Anda memiliki kebebasan untuk selalu meningkatkan dan menerapkan versi baru proyek SubQuery Anda, mohon berhati-hati selama proses ini jika proyek SubQuery Anda bersifat publik untuk dunia. Beberapa hal penting yang perlu diingat:

- Jika peningkatan Anda merupakan perubahan yang melanggar, baik membuat proyek baru (misal. `Proyek SubQuery saya V2`) atau memberi banyak peringatan kepada komunitas Anda tentang perubahan tersebut melalui jalur media sosial.
- Menerapkan versi proyek SubQuery baru menyebabkan beberapa waktu henti karena versi baru mengindeks rangkaian lengkap dari blok asal.

## Terapkan Perubahan

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Validasi akhir perubahan pada Proyek SubQuery Anda di lingkungan yang terpisah. Slot staging memiliki URL berbeda untuk produksi yang dapat Anda gunakan di dApps Anda.
- Pemanasan dan pengindeksan data untuk proyek SubQuery yang diperbarui untuk mengeliminasi downtime di dApp Anda
- Mempersiapkan rilis baru untuk Proyek SubQuery Anda tanpa mengeksposnya secara publik. Slot staging tidak ditampilkan kepada publik di Explorer dan memiliki URL unik yang hanya dapat dilihat oleh Anda.

![Staging slot](/assets/img/staging_slot.png)

Isi Commit Hash dari GitHub (salin commit hash penuh) dari versi basis kode proyek SubQuery yang ingin Anda terapkan. Ini akan menyebabkan waktu henti yang lebih lama tergantung pada waktu yang diperlukan untuk mengindeks rangkaian saat ini. Anda selalu dapat melaporkan kembali ke sini untuk perkembangan.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` versi 1.1.0 atau lebih tinggi.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// Anda dapat langsung mengatur versi Pengindeks dan Kueri Anda
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// ATAU Anda dapat menggunakan antarmuka, itu akan memvalidasi CID IPFS Anda dan membuat daftar versi gambar yang cocok dengan file manifes Anda `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Langkah Selanjutnya - Hubungkan ke Proyek Anda

Setelah penerapan Anda berhasil diselesaikan dan node kami telah mengindeks data Anda dari chain, Anda akan dapat terhubung ke proyek Anda melalui titik akhir Kueri GraphQL yang ditampilkan.

![Proyek sedang diterapkan dan disinkronkan](/assets/img/projects-deploy-sync.png)

Atau, Anda dapat mengklik tiga titik di samping judul proyek Anda, dan melihatnya di SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
