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

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**.
