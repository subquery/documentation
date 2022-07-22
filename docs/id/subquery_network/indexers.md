# Pengindeks

## Apa itu Pengindeks?

Pengindeks adalah peserta jaringan SubQuery yang bertanggung jawab untuk mengindeks data blockchain dan memberikan data ini kepada pelanggan mereka.

Pengindeks memainkan peran yang sangat penting dalam jaringan SubQuery. Sebagai bagian dari bisnis data sebagai layanan, Pengindeks mengubah kekuatan komputasi dan jaringan menjadi keuntungan.

## Staking Pengindeks

Untuk mendapatkan imbalan dari pendapatan kueri sebagai Pengindeks, diusulkan agar Pengindeks harus mempertaruhkan SQT terhadap Proyek SubQuery tertentu yang mereka sediakan layanannya. Fungsi produksi Cobb-Douglas akan digunakan untuk menentukan hadiah yang didistribusikan ke setiap Pengindeks.

SubQuery berencana untuk menambahkan batasan ke jaringan di mana pengindeks harus mempertaruhkan jumlah minimum SQT pada kumpulan hadiah yang relevan untuk dapat berpartisipasi dalam Perjanjian Terbuka yang cocok. Mereka juga harus mempertaruhkan jumlah minimum pada kontrak taruhan yang setara untuk setiap Perjanjian Tertutup dengan cara yang sama. Nilai minimum yang dipertaruhkan pengindeks ini harus berupa persentase tertentu dari nilai hadiah Perjanjian per Era, yang berarti untuk memperbarui Perjanjian ke volume yang lebih tinggi, pengindeks juga harus meningkatkan taruhannya. Ketika saham pengindeks berkurang di bawah jumlah minimum ini, mereka tidak akan dapat memperbarui Perjanjian dengan harga yang ada.

Jika Pengindeks ketahuan melakukan kesalahan (seperti dengan memberikan data yang tidak valid, tidak lengkap, atau salah), mereka bertanggung jawab untuk memiliki sebagian dari SQT mereka yang dipertaruhkan (pada ip kumpulan hadiah tertentu) yang dialokasikan kembali ke SubQuery Foundation Treasury, mengurangi kepemilikan mereka atas mempertaruhkan SQT dalam jaringan dan oleh karena itu potensi imbalan mereka. Karena saham yang dialokasikan pengindeks ditentukan oleh persentase dari total SQT mereka, ini akan memiliki aliran yang berpengaruh ke semua kumpulan hadiah lain yang menjadi pihak pengindeks.

## Bagaimana Pengindeks dihargai?

Pengindeks dihargai di SQT dalam dua cara:
- Imbalan dari kumpulan imbalan SQT berdasarkan distribusi yang ditentukan oleh Fungsi Produksi Cobb-Douglas.
- Imbalan biaya kueri SQT langsung dari Perjanjian Tertutup yang menjadi pihak pengindeks.

Pengindeks diberi imbalan atas biaya yang dibayar Konsumen untuk menyediakan data blockchain yang diminta Konsumen. Pengindeks akan menerima semua biaya dari Perjanjian Tertutup. Jika tidak, biaya dibagi berdasarkan jumlah pekerjaan yang dilakukan (permintaan dilayani) dan jumlah SQT yang didelegasikan - pembagian ini ditentukan dengan menerapkan Fungsi Produksi Cobb-Douglas.

Mungkin ada beberapa kumpulan hadiah yang aktif secara bersamaan untuk Pengindeks tertentu. Tugas pengindeks adalah mengalokasikan SQT yang dipertaruhkan dan didelegasikan di antara kumpulan ini (dalam hal persentase dari total SQT mereka). Akan ada kumpulan hadiah untuk setiap proyek yang Pengindeks menerima PAYG, dan kumpulan hadiah untuk setiap Perjanjian Pasar yang Pengindeks adalah salah satu pihak.

## Menarik Delegator

Pengindeks dapat meningkatkan potensi penghasilan mereka dengan menarik Delegator. Delegator adalah pemegang token SQT yang dapat mendelegasikan token mereka ke Pengindeks untuk hadiah tambahan. Pengindeks menggunakan token tambahan ini untuk meningkatkan jumlah yang mereka alokasikan ke proyek pilihan mereka. Hal ini memungkinkan Pengindeks untuk meningkatkan penghasilan mereka.

Pengindeks menetapkan Tingkat Komisi Pengindeks (ICR) yang merupakan persentase yang diperoleh Pengindeks. Sisanya kemudian dibagikan di antara Pengindeks dan semua Delegator secara proporsional berdasarkan jumlah yang dipertaruhkan/didelegasikan. Oleh karena itu, Pengindeks perlu memutuskan proporsi keuntungan yang ingin dipertahankan Pengindeks versus jumlah yang akan dibagikan dengan Delegator mereka. ICR yang lebih rendah akan lebih menarik bagi Delegator.

Misalnya, Pengindeks A telah menetapkan ICR sebesar 80% dan telah menerima SQT dari 8 Delegator. Ini berarti bahwa 8 Delegator ditambah Pengindeks itu sendiri, akan diberikan bagian dari 20% sisa dari apa yang telah diperoleh Pengindeks. Bagian itu akan dibagi secara proporsional di antara mereka. Perhatikan bahwa Delegator harus mendelegasikan token mereka untuk seluruh Era agar memenuhi syarat untuk hadiah ini. Untuk informasi selengkapnya tentang hadiah Delegator, lihat [Delegator](./delegators.md).

## Menjadi Pengindeks

Untuk menjadi Pengindeks di Jaringan SubQuery, Pengindeks harus memiliki perangkat keras yang diperlukan, menjalankan layanan SubQuery yang diperlukan, memiliki jaringan yang dapat diakses publik melalui IP statis atau nama domain, dan mendaftar sebagai Pengindeks.

### Keahlian pengindeks

Secara umum, Pengindeks harus menjadi pengguna komputer yang mahir secara teknis. Namun, kesederhanaan jaringan SubQuery dan kerangka kerja yang diusulkan memungkinkan pengembang junior untuk berpartisipasi dengan sukses.

Pengguna dasar harus terbiasa dengan penyediaan dan pengelolaan server, menginstal alat SubQuery CLI, manajemen database, dan jaringan dasar. Pengguna yang lebih berpengalaman dapat menjalankan node dalam lingkungan berkerumun, menggabungkan pemantauan dan peringatan dan juga manajemen jaringan yang lebih maju.

Terakhir, pihak yang berkepentingan harus siap untuk menginvestasikan waktu dalam memelihara node dan infrastruktur pengindeksan mereka.

### Persyaratan taruhan

Pengindeks diharapkan untuk mempertaruhkan dan mempertahankan jumlah token minimum. Ini untuk memastikan bahwa Pengindeks memiliki beberapa kulit dalam permainan dan berkomitmen untuk mendukung jaringan. SubQuery belum menentukan hal ini tetapi ini adalah salah satu [filosofi desain](./design-philosophy.md) kami bahwa ini serendah dan semudah mungkin.

Jika Pengindeks mengalami peristiwa slashable dan saldo SQT yang dipertaruhkan turun di bawah minimum yang dipersyaratkan, mereka harus menambah SQT yang dipertaruhkan untuk terus mendapatkan imbalan dari pekerjaan mereka.

### Persyaratan perangkat keras

Pengindeks dapat berinvestasi dalam perangkat keras infrastruktur mereka sendiri atau menyewa infrastruktur dari AWS, Google Cloud, Digital Ocean, Microsoft Azure, dll.

### Persyaratan pemeliharaan/operasional

Berikut adalah beberapa pemeliharaan dan/atau persyaratan operasional yang diharapkan Pengindeks:

- Selalu tingkatkan ke versi perangkat lunak Subquery terbaru.
- Identifikasi dan manfaatkan peluang pengindeksan baru.
- Perbarui versi proyek ke yang terbaru dan indeks ulang jika perlu.
- Pemeliharaan infrastruktur:
  - Memantau dan meningkatkan ukuran disk secara konstan.
  - Kueri ukuran yang tepat dan penghitungan pengindeksan berdasarkan lalu lintas.
  - Tingkatkan layanan kueri untuk meningkatkan lalu lintas masuk.

### Infrastruktur

Persyaratan infrastruktur minimal meliputi:

- Setidaknya satu node komputasi untuk menjalankan layanan berikut:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node).
  - [Query Service](https://www.npmjs.com/package/@subql/query).
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator).
- Satu node database untuk menjalankan Postgresql db (v12 ke atas).

Informasi lebih detail akan segera hadir.

## Keamanan & Pertimbangan kinerja

Pertimbangan keamanan dan kinerja adalah sebagai berikut.

### Dompet Operator

Penyimpanan yang aman dari frase benih pemulihan dompet Pengindeks sangat disarankan.

### Firewall

Pengindeks perlu menjaga keamanan di depan pikiran. Keamanan infrastruktur, khususnya firewall, harus diterapkan untuk mencegah paparan publik terhadap port pribadi.

Kata sandi yang aman harus digunakan secara default dan kebijakan rotasi kata sandi harus dipertimbangkan.

### Kinerja Pengindeks

Untuk menghasilkan kinerja yang diinginkan, Pengindeks perlu mempertimbangkan berbagai faktor seperti:

- keseimbangan antara taruhan mereka sendiri dan Delegator.
- jenis kontrak yang dilayani. Pengindeks akan menerima semua biaya kueri jika itu adalah kontrak tertutup. Jika terbuka, maka hadiah Pengindeks akan tergantung pada berapa banyak Pengindeks lain yang ada.
- memenuhi spesifikasi Service Level Agreement (SLA) (untuk menghindari hukuman pemotongan).
- keakuratan data yang disajikan untuk menghindari hukuman pemotongan.

## Memilih Proyek SubQuery untuk Diindeks

Ada beberapa indikator yang perlu dipertimbangkan oleh Pengindeks saat memilih proyek SubQuery untuk diindeks.

### Peluang Biaya Kueri

Beberapa proyek akan memiliki rencana terbuka atau tertutup yang diiklankan oleh konsumen.

Ketika Konsumen mengiklankan rencana terbuka atau tertutup untuk sebuah proyek, mereka akhirnya menentukan berapa banyak mereka bersedia membayar untuk sejumlah permintaan. Semakin banyak Konsumen yang bersedia membayar, semakin menarik proyek tersebut bagi Pengindeks. Ini juga memberikan keyakinan bahwa kemungkinan akan ada pendapatan berulang dari proyek SubQuery ini.

### Kompleksitas proyek

Proyek akan bervariasi dalam persyaratan komputasi. Proyek sederhana hanya akan mengindeks beberapa parameter sedangkan proyek yang lebih rumit akan membutuhkan lebih banyak sumber daya komputasi dan lebih banyak bandwidth. Pengindeks perlu memahami kompleksitas proyek dan kemampuan perangkat kerasnya.

### Kompetisi Pengindeks

Kompetisi Pengindeks. Ini juga menyiratkan bahwa hadiah akan dibagikan di antara lebih banyak orang. Bagian Pengindeks tunggal mungkin kurang dari proyek yang kurang populer dengan biaya kueri yang sedikit lebih rendah tetapi dengan Pengindeks yang jauh lebih sedikit.

### Strategi Harga

Pengindeks perlu menyadari biaya operasi mereka dan pendapatan yang diharapkan untuk memahami titik impas mereka. Beberapa pertimbangan adalah:

- Bagaimana seharusnya Pengindeks menetapkan harga paket mereka?
- Pada harga berapa Pengindeks dapat menerima perjanjian layanan atau tidak?

### Iklan

Pengindeks perlu mengiklankan diri mereka sendiri kepada Delegator dan juga Konsumen. Pengindeks dapat melakukan ini dari situs web mereka sendiri, di forum Subquery atau tempat lain yang dianggap perlu. Beberapa contoh informasi yang harus diberikan adalah:

- Latar belakang dan pengalaman tim Pengindeks atau Pengindeks.
- Pendekatan perangkat keras dan mengapa itu memberikan kinerja yang unggul.
- Kebijakan dukungan pelanggan atau SLA.
- Bukti pertunjukan sejarah.

### Dukungan pelanggan

Pengindeks sangat dianjurkan untuk menyediakan metode komunikasi bagi pelanggannya untuk melaporkan ketidaktersediaan dan juga untuk memberikan umpan balik.
