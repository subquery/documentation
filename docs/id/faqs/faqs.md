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

Ekstrinsik inherent adalah potongan informasi yang tidak ditandatangani dan hanya dimasukkan ke dalam blok oleh pencipta blok.

Ekstrinsik signed transaction adalah transaksi yang berisi tanda tangan dari rekening yang mengeluarkan transaksi. Mereka ada untuk membayar biaya agar transaksi termasuk dalam rantai.

Ekstrinsik unsigned transactions adalah transaksi yang tidak berisi tanda tangan dari rekening yang mengeluarkan transaksi. Ekstrinsik unsigned transactions harus digunakan dengan hati-hati karena tidak ada yang membayar biaya, karena itu ditandatangani. Karena ini, antrian transaksi kekurangan logika ekonomi untuk mencegah spam.

Untuk informasi lebih lanjut, klik [di sini](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Apa endpoint untuk jaringan Kusama?

Network.endpoint untuk jaringan Kusama adalah `wss://kusama.api.onfinality.io/public-ws`.

## Apa endpoint untuk jaringan mainnet Polkadot?

Network.endpoint untuk jaringan Polkadot adalah `wss://polkadot.api.onfinality.io/public-ws`.

## Bagaimana cara saya mengembangkan skema proyek saya secara iteratif?

Masalah umum dengan mengembangkan skema proyek yang berubah adalah ketika meluncurkan node Subquery Anda untuk pengujian, blok yang diindeks sebelumnya tidak akan kompatibel dengan skema baru Anda. Untuk mengembangkan skema secara iteratif, blok terindeks yang disimpan dalam database harus dihapus, ini dapat dicapai dengan meluncurkan node Anda dengan flag `--force-clean`. Sebagai contoh:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Perhatikan bahwa disarankan untuk menggunakan `--force-clean` saat mengubah `startBlock` dalam manifes proyek (`project.yaml`) untuk memulai pengindeksan ulang dari blok yang dikonfigurasi. Jika `startBlock` diubah tanpa `--force-clean` proyek, maka pengindeks akan melanjutkan pengindeksan dengan `startBlock` yang dikonfigurasi sebelumnya.