# Konsumen

## Apa itu Konsumen?

Konsumen adalah peserta dalam jaringan SubQuery dan merupakan individu atau organisasi yang membayar untuk data blockchain yang diproses dan diatur dari Jaringan SubQuery. Konsumen secara efektif membuat permintaan ke Jaringan SubQuery untuk data tertentu dan membayar sejumlah SQT yang disepakati sebagai imbalannya.

Konsumen biasanya adalah pengembang dApp (aplikasi terdesentralisasi), perusahaan analitik data, jaringan blockchain, pengembang middleware, atau bahkan perusahaan agregasi web yang memerlukan akses ke data blockchain untuk menyediakan layanan kepada pengguna akhir mereka.

## Persyaratan Konsumen

Tidak ada persyaratan seperti itu untuk menjadi Konsumen SubQuery. Namun, Konsumen perlu memahami cara mendapatkan SQT, cara mengiklankan persyaratan data mereka, dan cara menggunakan data JSON yang dikembalikan.

Konsumen mungkin juga perlu memahami cara membuat proyek SubQuery untuk Diindeks atau mengontrak pekerjaan ini untuk mendapatkan data dalam format yang mereka butuhkan.

## Biaya Layanan

Biaya permintaan data pada blockchain akan didasarkan pada penawaran dan permintaan dan akan sebanding dengan layanan serupa lainnya yang tersedia saat ini. Keuntungan dari jaringan dan ekosistem yang terbuka dan transparan adalah mendorong persaingan untuk memberikan layanan terbaik kepada Konsumen.

## Pilihan pembayaran untuk Konsumen?

Untuk fleksibilitas, Konsumen memiliki 3 opsi pembayaran untuk membayar data blockchain. Mereka:

- Bayar Saat Anda Pergi (PAYG)
- Perjanjian Layanan Tertutup
- Perjanjian Layanan Terbuka

Anda dapat membaca lebih lanjut tentang berbagai metode pembayaran, cara kerjanya, dan keuntungan/kerugiannya di [artikel Metode Pembayaran](./payment-methods.md).

## Pertanyaan Umum

### Sebagai Konsumen, apakah saya memilih 1 Pengindeks atau beberapa Pengindeks?

Kecuali jika Perjanjian Layanan Tertutup digunakan, akan ada satu atau lebih Pengindeks yang mengindeks proyek SubQuery. Konsumen memiliki pilihan saat memutuskan Pengindeks mana yang akan membaca data. Biasanya Konsumen akan memilih Pengindeks latensi paling andal dan terendah. Konsumen juga dapat menggabungkan failover otomatis dan membaca data dari Pengindeks lain jika yang pertama kali habis atau tidak responsif.

### What happens if an Indexer goes offline?

Kecuali jika Perjanjian Layanan Tertutup digunakan, dan jika ada lebih dari satu Pengindeks yang mengindeks proyek SubQuery Anda, itu hanya masalah beralih ke Pengindeks lain. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
