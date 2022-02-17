# Fungsi Agregat

## Grup Berdasarkan

SubQuery mendukung fungsi agregat lanjutan untuk memungkinkan Anda melakukan penghitungan pada sekumpulan nilai selama kueri Anda.

Fungsi agregat biasanya digunakan dengan fungsi GroupBy dalam kueri Anda.

GroupBy memungkinkan Anda dengan cepat mendapatkan nilai yang berbeda dalam satu set dari SubQuery dalam satu kueri.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Fungsi Agregat Tingkat Lanjut

SubQuery menyediakan fungsi agregat berikut saat dalam mode tidak aman:

- `sum` (berlaku untuk bidang seperti angka) - hasil penjumlahan semua nilai bersama-sama
- `distinctCount` (berlaku untuk semua bidang) - hitungan jumlah nilai yang berbeda
- `min` (berlaku untuk bidang seperti angka) - nilai terkecil
- `max`(berlaku untuk bidang seperti angka) - nilai terbesar
- `average` (berlaku untuk bidang seperti angka) - nilai rata-rata (rata-rata aritmatika)
- `stddevSample` (berlaku untuk bidang seperti angka) - standar deviasi sampel dari nilai
- `stddevPopulation` (berlaku untuk bidang seperti angka) - deviasi standar populasi dari nilai
- `varianceSample` (berlaku untuk bidang seperti angka) - varians sampel dari nilai
- `variancePopulation` (berlaku untuk bidang seperti angka) - varians populasi dari nilai

Implementasi fungsi agregat SubQuery didasarkan pada [pg-agregates](https://github.com/graphile/pg-aggregates), Anda dapat menemukan informasi lebih lanjut di sana

**Harap perhatikan bahwa Anda harus mengaktifkan tanda `--unsafe` pada layanan kueri untuk menggunakan fungsi ini. [Baca selengkapnya](../references/references.md#unsafe-2). Perhatikan bahwa perintah `--unsafe` akan mencegah proyek Anda dijalankan di Jaringan SubQuery, dan Anda harus menghubungi dukungan jika Anda ingin perintah ini dijalankan dengan proyek Anda di layanan terkelola SubQuery ([ project.subquery.network](https://project.subquery.network))**
