# Pertanyaan yang sering diajukan

## Apa itu SubQuery?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

Our goal is to save developers' time and money by eliminating the need of building their own indexing solution. Now, they can fully focus on developing their applications. SubQuery helps developers create the decentralised products of the future.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. Jaringan SubQuery mengindeks dan melayani data ke komunitas global dengan cara yang berinsentif dan dapat diverifikasi.  Setelah memublikasikan proyek Anda ke Jaringan SubQuery, siapa pun dapat mengindeks dan menghostingnya - menyediakan data kepada pengguna di seluruh dunia dengan lebih cepat dan andal.

More information [here](/subquery_network/introduction.md).

## Apa cara terbaik untuk memulai SubQuery?

Cara terbaik untuk memulai SubQuery adalah mencoba [Hello World Tutorial](/assets/pdf/Hello_World_Lab.pdf) kami. This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?

Kami menyukai kontribusi dan umpan balik dari komunitas. To contribute the code, fork the repository of your interest and make your changes. Kemudian kirimkan PR atau Pull Request. Don't forget to test as well. Periksa juga panduan kontribusi kami (segera hadir).

Untuk memberi umpan balik, hubungi kami di hello@subquery.network atau buka [discord channel](https://discord.com/invite/78zg8aBSMG) kami.

## Berapa biaya untuk hosting proyek saya di SubQuery Projects?

Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. Please check out the [Hello World (SubQuery hosted)](../run_publish/publish.md) tutorial and learn how to host your project with us.

## Apa itu slot deployment?

Slot deployment adalah fitur di [Proyek SubQuery](https://project.subquery.network) yang setara dengan lingkungan pengembangan. Contohnya, dalam organisasi perangkat lunak apa pun biasanya ada lingkungan pengembangan dan lingkungan produksi minimal (mengabaikan localhost). Biasanya lingkungan tambahan seperti tahapan dan pra-produksi atau bahkan QA sudah termasuk tergantung pada kebutuhan organisasi dan pengaturan pengembangannya.

SubQuery saat ini memiliki dua slot yang tersedia. Sebuah slot staging dan slot produksi. Ini memungkinkan pengembang untuk mendeploy SubQuery mereka ke staging environment dan semuanya berjalan dengan baik, "maju ke produksi" dengan mengklik tombol.

## Apa keuntungan dari slot staging?

Keuntungan utama menggunakan slot staging adalah memungkinkan Anda menyiapkan rilis proyek SubQuery baru Anda tanpa memaparkannya secara publik. Anda dapat menunggu slot staging untuk menyusun ulang semua data tanpa mempengaruhi aplikasi produksi Anda.

Slot staging tidak ditampilkan kepada publik di [Explorer](https://explorer.subquery.network/) dan memiliki URL unik yang hanya dapat dilihat oleh Anda. Dan tentu saja, environment terpisah memungkinkan Anda menguji kode baru tanpa mempengaruhi produksi.

## Apa itu Ekstrinsik Polkadot?

Jika Anda sudah akrab dengan konsep blockchain, Anda dapat menganggap ekstrinsik sebanding dengan transaksi. Lebih formal, ekstrinsik adalah sepotong informasi yang berasal dari luar rantai dan termasuk dalam blok. Ada tiga kategori ekstrinsik. Yaitu inherents, signed transactions, dan unsigned transactions.

Ekstrinsik inherent adalah potongan informasi yang tidak ditandatangani dan hanya dimasukkan ke dalam blok oleh pencipta blok.

Ekstrinsik signed transaction adalah transaksi yang berisi tanda tangan dari rekening yang mengeluarkan transaksi. Mereka ada untuk membayar biaya agar transaksi termasuk dalam rantai.

Ekstrinsik unsigned transactions adalah transaksi yang tidak berisi tanda tangan dari akun yang mengeluarkan transaksi. Ekstrinsik transaksi yang tidak ditandatangani harus digunakan dengan hati-hati karena tidak ada yang membayar biaya, karena tidak ditandatangani. Karena ini, antrian transaksi kekurangan logika ekonomi untuk mencegah spam.

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

Perhatikan bahwa disarankan untuk menggunakan `--force-clean` saat mengubah `startBlock` dalam manifes proyek (`project.yaml`) untuk memulai pengindeksan ulang dari blok yang dikonfigurasi. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.
