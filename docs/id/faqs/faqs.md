# Pertanyaan yang sering diajukan

## Apa itu SubQuery?

SubQuery adalah sebuah proyek sumber terbuka yang memungkinkan pengembang untuk menyusun, mengubah, dan membuat kueri data rantai Substrat untuk menggerakkan aplikasi mereka.

SubQuery juga menyediakan penyelenggaraan proyek kelas produksi gratis untuk pengembang yang menghilangkan tanggung jawab mengelola infrastruktur, dan membiarkan pengembang melakukan yang terbaik - membangun.

## Apa cara terbaik untuk memulai SubQuery?

Cara terbaik untuk memulai SubQuery adalah dengan mencoba [tutorial Hello World](../quickstart/helloworld-localhost.md) kami. Ini adalah 5 menit sederhana untuk mengunduh template pemula, membangun proyek, dan kemudian menggunakan Docker untuk menjalankan node di localhost Anda dan menjalankan kueri sederhana.

## Bagaimana saya bisa berkontribusi atau memberi umpan balik ke SubQuery?

Kami sangat menghargai kontribusi dan masukan dari komunitas. Untuk mengkontribusi kode, fork repositori yang menarik dan buat perubahan yang anda inginkan. Lalu kirimkan PR atau Pull Request. Oh, jangan lupa untuk mengetesnya dulu! Periksa juga panduan kontribusi kami (segera hadir).

Untuk memberi umpan balik, hubungi kami di hello@subquery.network atau buka [discord channel](https://discord.com/invite/78zg8aBSMG) kami

## Berapa biaya untuk hosting proyek saya di SubQuery Projects?

Hosting proyek anda di SubQuery Projects sepenuhnya gratis - ini adalah cara kami untuk memberi kembali kepada komunitas kami. Untuk mempelajari cara meng-host proyek Anda bersama kami, silakan lihat tutorial [Hello World (SubQuery Hosted)](../quickstart/helloworld-hosted.md).

## Apa itu slot deployment?

Slot deployment adalah fitur di [Proyek SubQuery](https://project.subquery.network) yang setara dengan lingkungan pengembangan. Contohnya, dalam organisasi perangkat lunak apa pun biasanya ada lingkungan pengembangan dan lingkungan produksi minimal (mengabaikan localhost). Biasanya lingkungan tambahan seperti tahapan dan pra-produksi atau bahkan QA sudah termasuk tergantung pada kebutuhan organisasi dan pengaturan pengembangannya.

SubQuery saat ini memiliki dua slot yang tersedia. Sebuah slot staging dan slot produksi. Ini memungkinkan pengembang untuk mendeploy SubQuery mereka ke staging environment dan semuanya berjalan dengan baik, "maju ke produksi" dengan mengklik tombol.

## Apa keuntungan dari slot staging?

Keuntungan utama menggunakan slot staging adalah memungkinkan Anda menyiapkan rilis proyek SubQuery baru Anda tanpa memaparkannya secara publik. Anda dapat menunggu slot staging untuk menyusun ulang semua data tanpa mempengaruhi aplikasi produksi Anda.

Slot staging tidak ditampilkan kepada publik di [Explorer](https://explorer.subquery.network/) dan memiliki URL unik yang hanya dapat dilihat oleh Anda. Dan tentu saja, lingkungan terpisah memungkinkan Anda menguji kode baru tanpa mempengaruhi produksi.

## Apa itu ekstrinsik?

Jika Anda sudah akrab dengan konsep blockchain, Anda dapat menganggap ekstrinsik sebanding dengan transaksi. Lebih formal, ekstrinsik adalah sepotong informasi yang berasal dari luar rantai dan termasuk dalam blok. Ada tiga kategori ekstrinsik. Yaitu inherents, signed transactions, dan unsigned transactions.

Ekstrinsik inheren adalah potongan informasi yang tidak ditandatangani dan hanya dimasukkan ke dalam blok oleh pencipta blok.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused it is signed. Because of this, the transaction queue lacks economic logic to prevent spam.

Untuk informasi lebih lanjut, klik [di sini](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. Sebagai contoh:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.