# Migrasi dari GitHub ke Penerapan IPFS

Untuk mempermudah penyebaran proyek pada Layanan Terkelola, kami tidak lagi menggunakan penyebaran GitHub untuk mendukung IPFS.

Menggunakan IPFS memberikan pengalaman yang lebih baik bagi para pengembang dalam beberapa cara:

- Tidak seperti dengan penyebaran GitHub, proyek dibangun secara lokal di mesin Anda. Ini berarti, Anda bisa memiliki kendali penuh atas lingkungan. Menyelesaikan masalah apa pun dengan kompatibilitas versi seperti versi node.js atau dependensi lainnya jauh lebih cepat dan mudah.
- Anda dapat berbagi CID proyek Anda dan memastikan bahwa setiap orang akan dapat menjalankan proyek yang sama dengan hasil yang sama.
- Ini terdesentralisasi, sehingga Anda tidak harus bergantung pada pihak terpusat seperti GitHub untuk menyimpan kode Anda.
- Dan di atas semua ini, Anda bisa menyebarkan proyek yang sama ke SubQuery Network!

## How to migrate your project to IPFS

1. Perbarui dependensi proyek Anda.
   1. Perbarui `@subql/cli` ke versi terbaru: Anda dapat melakukannya dengan menjalankan `yarn add -D @subql/cli@latest` atau `npm i -dev @subql/cli@latest`
   2. Kami juga merekomendasikan untuk memperbarui dependensi lain pada saat ini
   3. Perhatikan masalah ini: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Perbarui perintah build menjadi `subql build`. Ini akan terlihat seperti [ini](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7).
3. `src/index.ts`: Jika memperbarui dari `@polkadot/api` v6 (atau yang lebih lama), harap perbarui `src/index.ts` Anda untuk menyertakan [baris ini](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.yaml`:

   1. Pastikan proyek Anda menggunakan manifest versi 1.0.0. Anda dapat memeriksanya dengan melihat kolom `specVersion` di `project.yaml`. Jika di bawah 1.0.0, maka jalankan `subql migrate` dan ikuti [langkah-langkah migrasi untuk meng-upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   2. Periksa bahwa `datasources: mapping: file:` mereferensikan titik masuk kode Anda dengan benar, biasanya ini adalah `./dist/index.js`

   3. Jika Anda menggunakan prosesor sumber data (setiap `prosesor:` di `project.yaml`) kita perlu memastikan bahwa prosesor tersebut akan dibundel selama build dan publish. Untuk melakukannya, silakan perbarui ke versi terbaru dari paket yang sekarang menyertakan versi bundel. Anda dapat melakukan ini dengan menambahkan ekspor ke `package.json` Anda.

   ```json
   ...
   "exports": {
     "processorName": "./node_modules/path/to/processor.js"
     // "frontierEvm": "./node_modules/@subql/frontier-evm-processor/dist/index.js"
     // "acalaEvm": "./node_modules/@subql/acala-evm-processor/dist/index.js",
     // "ethermintEVM": "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
     // "chaintypes": "./src/chaintypes.ts" // jenis rantai jika diperlukan
   }
   ```

   Kita perlu memperbarui referensi ke bundel di `project.yaml` Anda. Untuk melakukan ini, Anda dapat memperbarui jalur file prosesor apa pun ke `file: ./node_modules/@subql/@subql/<processor-name>/dist/bundle.js` dan ganti `<processor-name>` dengan prosesor yang Anda gunakan. Jika Anda menggunakan `@subql/datasource-processors` paket ini sekarang sudah tidak digunakan lagi, Anda dapat menemukan penggantinya yang relevan dari repositori [datasource-processors](https://github.com/subquery/datasource-processors/tree/main/packages) yang baru.

   4. Jika proyek Anda menggunakan [Substrate Chain Types](../build/manifest/polkadot.md#custom-chains) berbasis js/ts, Anda perlu mengulangi langkah-langkah di atas, tetapi dengan referensi ke chain types Anda.

5. `docker-compose.yaml`: Perbarui ke versi [docker compose terbaru](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) dan tambahkan [direktori ini](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) ke repo Anda. Untuk mengujinya, kami sarankan untuk menjalankan proyek Anda secara lokal.

:::peringatan Sekarang bangun ulang dan jalankan proyek Anda secara lokal untuk menguji perubahan ini sebelum melanjutkan menggunakan `yarn`, `yarn codegen`, `yarn build`, dan kemudian `yarn start:docker`. :::

## Uji coba menyebarkan proyek Anda ke IPFS

Proyek Anda sekarang harus siap untuk disebarkan melalui IPFS ke SubQuery Managed Service atau jaringan SubQuery. Anda dapat mengikuti panduan [di sini](./publish.md#publish-your-subquery-project-to-ipfs) untuk menyebarkan ke IPFS dan kemudian mempublikasikan ke Managed Service.
