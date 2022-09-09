# Pertanyaan yang sering diajukan

## Apa itu SubQuery?

SubQuery adalah pengindeks data blockchain open source untuk pengembang yang menyediakan API yang cepat, fleksibel, andal, dan terdesentralisasi untuk mendukung aplikasi multi-rantai terkemuka.

Tujuan kami adalah menghemat waktu dan uang para pengembang dengan meniadakan kebutuhan untuk membangun solusi pengindeksan mereka sendiri. Sekarang, mereka bisa sepenuhnya fokus pada pengembangan aplikasi mereka. SubQuery membantu pengembang menciptakan produk masa depan yang terdesentralisasi.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Memperkenalkan SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**Layanan Terkelola SubQuery**

SubQuery juga menyediakan hosting proyek kelas produksi gratis untuk para pengembang. Managed Service kami menghilangkan tanggung jawab mengelola infrastruktur, sehingga pengembang melakukan yang terbaik - membangun. Cari tahu lebih lanjut [di sini](/run_publish/publish.md).

**SubQuery Network**

Jaringan SubQuery memungkinkan pengembang untuk sepenuhnya mendesentralisasi tumpukan infrastruktur mereka. Ini adalah layanan data yang paling terbuka, berkinerja, andal, dan dapat diskalakan untuk dApps. Jaringan SubQuery mengindeks dan melayani data ke komunitas global dengan cara yang berinsentif dan dapat diverifikasi.  Setelah memublikasikan proyek Anda ke Jaringan SubQuery, siapa pun dapat mengindeks dan menghostingnya - menyediakan data kepada pengguna di seluruh dunia dengan lebih cepat dan andal.

Informasi lebih lanjut [di sini](/subquery_network/introduction.md).

## Apa cara terbaik untuk memulai SubQuery?

Cara terbaik untuk memulai SubQuery adalah mencoba [Hello World Tutorial](/assets/pdf/Hello_World_Lab.pdf) kami. Ini adalah latihan berjalan kaki selama 5 menit yang sederhana. Unduh templat pemula, bangun proyek, gunakan Docker untuk menjalankan node di localhost Anda, dan jalankan kueri sederhana.

## Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?

Kami menyukai kontribusi dan umpan balik dari komunitas. Untuk menyumbangkan kode, fork repositori yang Anda minati dan buat perubahan Anda. Kemudian kirimkan PR atau Pull Request. Jangan lupa untuk mengujinya juga. Lihat juga pedoman <a href="http://localhost:8080/miscellaneous/contributing.html">kontribusi kami.</a>

Untuk memberi umpan balik, hubungi kami di hello@subquery.network atau buka [discord channel](https://discord.com/invite/78zg8aBSMG) kami.

## Berapa biaya untuk hosting proyek saya di SubQuery Projects?

Layanan ini disediakan bagi komunitas dengan tingkat gratis yang murah hati! Anda dapat meng-host dua proyek SubQuery pertama Anda secara gratis!

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

Perhatikan bahwa disarankan untuk menggunakan `--force-clean` saat mengubah `startBlock` dalam manifes proyek (`project.yaml`) untuk memulai pengindeksan ulang dari blok yang dikonfigurasi. Jika `startBlock` diubah tanpa `--force-clean` proyek, maka pengindeks akan melanjutkan pengindeksan dengan `startBlock` yang dikonfigurasi sebelumnya.


## Bagaimana saya bisa mengoptimalkan proyek saya untuk mempercepatnya?

Performa merupakan faktor krusial dalam setiap proyek. Untungnya, ada beberapa hal yang bisa Anda lakukan untuk memperbaikinya. Berikut ini daftar beberapa saran:

- Hindari menggunakan block handler jika memungkinkan.
- Kueri hanya bidang yang diperlukan.
- Coba gunakan kondisi filter untuk mengurangi ukuran respons. Buat filter sespesifik mungkin untuk menghindari kueri data yang tidak perlu.
- Untuk tabel data yang besar, hindari query `totalCount` tanpa menambahkan kondisi.
- Tambahkan indeks ke bidang entitas untuk kinerja kueri, ini sangat penting untuk proyek historis.
- Atur blok awal ke saat kontrak diinisialisasi.
- Selalu gunakan [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (kami dapat membantu membuatnya untuk jaringan baru Anda).
- Optimalkan desain skema Anda, buatlah sesederhana mungkin.
    - Cobalah untuk mengurangi bidang dan kolom yang tidak perlu.
    - Buat indeks sesuai kebutuhan.
- Gunakan pemrosesan paralel/batch sesering mungkin.
    - Gunakan `api.queryMulti()` untuk mengoptimalkan panggilan API Polkadot di dalam fungsi pemetaan dan menanyakannya secara paralel. Ini adalah cara yang lebih cepat daripada loop.
    - Gunakan `Promise.all()`. Dalam kasus beberapa fungsi async, lebih baik mengeksekusinya dan menyelesaikannya secara paralel.
    - Jika Anda ingin membuat banyak entitas dalam satu handler, Anda dapat menggunakan `store.bulkCreate(entityName: string, entities: Entity[])`. Anda bisa membuatnya secara paralel, tidak perlu melakukannya satu per satu.
- Membuat panggilan API untuk menanyakan state bisa lambat. Anda bisa mencoba untuk meminimalkan pemanggilan jika memungkinkan dan menggunakan data `ekstrinsik/transaksi/event`.
- Gunakan `worker threads` untuk memindahkan pengambilan blok dan pemrosesan blok ke dalam thread pekerja sendiri. Ini bisa mempercepat pengindeksan hingga 4 kali lipat (tergantung pada proyek tertentu). Anda bisa dengan mudah mengaktifkannya dengan menggunakan flag `-workers=<number>`. Perhatikan bahwa jumlah core CPU yang tersedia sangat membatasi penggunaan thread pekerja. Untuk saat ini, ini hanya tersedia untuk Substrate dan Cosmos dan akan segera diintegrasikan untuk Avalanche.
- Perhatikan bahwa `JSON.stringify` tidak mendukung native `BigInts`. Pustaka logging kami akan melakukan hal ini secara internal jika Anda mencoba untuk mencatat sebuah objek. Kami sedang mencari solusi untuk ini.
- Gunakan filter `modulo` yang mudah digunakan untuk menjalankan handler hanya sekali ke blok tertentu. Filter ini memungkinkan penanganan sejumlah blok tertentu, yang sangat berguna untuk mengelompokkan dan menghitung data pada interval yang ditetapkan. Sebagai contoh, jika modulo diatur ke 50, block handler akan berjalan pada setiap 50 blok. Ini memberikan lebih banyak kontrol atas data pengindeksan kepada pengembang dan dapat diimplementasikan seperti di bawah ini dalam manifes proyek Anda.