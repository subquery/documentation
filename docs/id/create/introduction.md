# Membuat Proyek SubQuery

Dalam panduan [mulai cepat](/quickstart/quickstart.md), kami dengan cepat menjalankan contoh untuk memberi Anda gambaran tentang apa itu SubQuery dan cara kerjanya. Di sini kita akan melihat lebih dekat alur kerja saat membuat proyek Anda dan file kunci yang akan Anda ikut sertakan.

## Alur Kerja Dasar

Beberapa contoh berikut akan menganggap Anda telah berhasil menginisialisasi paket starter di bagian [Mulai cepat](../quickstart/quickstart.md). Dari paket awal itu, kita akan menjalani proses standar untuk menyesuaikan dan mengimplementasikan proyek SubQuery Anda.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Perbarui file Manifest (`project.yaml`) untuk menyertakan informasi tentang blockchain Anda, dan entitas yang akan Anda petakan - lihat [File Manifest](./manifest.md)
3. Buat entitas GraphQL di skema Anda (`schema.graphql`) yang menentuakn bentuk data yang akan Anda ekstrak dan coba untuk kueri - lihat [Skema GraphQL](./graphql.md)
4. Tambahkan semua fungsi pemetaan (mis `mappingHandlers.ts` yang ingin Anda minta untuk ubah data chainnya ke entitas GraphQL yang sudah Anda tentukan - lihat [Pemetaan](./mapping.md)
5. Hasilkan, bentuk, dan terbitkan kode Anda ke Proyek SubQuery (atau jalankan di node lokal Anda) - lihat [Menjalankan dan Mengkueri Proyek Pemula Anda](./quickstart.md#running-and-querying-your-starter-project) di panduan mulai cepat kami.

## Struktur Direktori

Peta berikut ini memberikan gambaran struktur direktori proyek SubQuery saat perintah `init` berjalan.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Sebagai contoh:

![Struktur direktori SubQuery](/assets/img/subQuery_directory_stucture.png)

## Pembuatan Kode

Kapan pun Anda mengubah entitas GraphQL Anda, Anda harus menghasilkan ulang direktori jenis Anda dengan perintah berikut.

```
yarn codegen
```

Ini akan membuat direktori baru (atau memperbarui yang sudah ada) `src/types` yang berisi kelas entitas yang dihasilkan untuk setiap jenis yang telah Anda tetapkan sebelumnya di `schema.graphql`. Kelas-kelas ini menyediakan akses entitas yang aman untuk memuat, membaca dan menulis ke bidang entitas - lihat selengkapnya tentang proses ini di [Skema GraphQL](./graphql.md).

## Bentuk

Untuk menjalankan Proyek SubQuery Anda di host Node SubQuery secara lokal, pertama-tama Anda perlu membentuk pekerjaan Anda.

Jalankan perintah bentuk dari direktori proyek.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
