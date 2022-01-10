# Hello World (menghosting SubQuery)

Tujuan dari quick start ini adalah untuk menunjukkan bagaimana Anda dapat menjalankan proyek starter default pada SubQuery Projects (layanan terkelola kami) dengan beberapa langkah mudah.

Kami akan mengambil proyek awal yang sederhana (dan semua yang telah kami pelajari sejauh ini) tetapi alih-alih menjalankannya secara lokal di dalam Docker, kami akan memanfaatkan infrastruktur hosting terkelola SubQuery. Dengan kata lain, kami membiarkan SubQuery melakukan semua pekerjaan berat, menjalankan, dan mengelola infrastruktur produksi.

## Tujuan Pembelajaran

Pada akhir quick start ini, Anda harus:

- memahami prasyarat yang diperlukan
- bisa menghosting proyek pada [SubQuery Projects](https://project.subquery.network/)
- menjalankan kueri sederhana untuk mendapatkan tinggi blok mainnet Polkadot menggunakan playground
- menjalankan kueri GET sederhana untuk mendapatkan tinggi blok mainnet Polkadot menggunakan cURL

## Audiens yang dituju

Panduan ini ditujukan bagi para pengembang (developer) baru yang memiliki pengalaman pengembangan dan tertarik untuk mempelajari lebih lanjut tentang SubQuery.

## Panduan video

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Prasyarat

Anda akan memerlukan:

- akun GitHub

## 1. Buat proyek Anda

Mari buat proyek bernama subql_hallowworld dan jalankan instalasi wajib, codegen, dan build dengan manajer paket favorit Anda.

```shell
> subql init --starter subqlHelloWorld
yarn install
yarn codegen
yarn build
```

JANGAN jalankan perintah docker.

## 2. Buat repo GitHub

Di GitHub, buat repositori publik baru. Berikan nama dan atur visibilitas Anda ke publik. Di sini, semuanya disimpan sebagai default untuk saat ini.

![buat repo github](/assets/img/github_create_new_repo.png)

Catat URL GitHub Anda, ini harus bersifat publik agar SubQuery dapat mengaksesnya.

![buat repo github](/assets/img/github_repo_url.png)

## 3. Dorong ke GitHub

Kembali ke direktori proyek Anda, inisialisasi sebagai direktori git. Jika tidak, Anda mungkin mendapatkan kesalahan "fatal: not a git repository (atau direktori induk mana pun): .git"

```shell
git init
```

Kemudian tambahkan repositori jarak jauh dengan perintah:

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

Ini pada dasarnya akan menetapkan repositori jarak jauh Anda ke "https://github.com/seandotau/subqlHelloWorld.git" dan memberinya nama "origin" yang merupakan nomenklatur standar untuk repositori jarak jauh pada GitHub.

Selanjutnya kita tambahkan kode ke repo kita dengan perintah berikut:

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Menghitung benda: 100% (14/14), selesai.
Kompresi delta menggunakan hingga 12 utas
Mengompresi objek: 100% (13/13), selesai.
Objek tulisan: 100% (14/14), 59,35 KiB | 8,48 MiB/s, selesai.
Total 14 (delta 0), digunakan kembali 0 (delta 0)
Ke https://github.com/seandotau/subqlHelloWorld.git
  * [cabang baru] master -> menguasai

```

Perintah push berarti "tolong dorong kode saya KE repo asal DARI repo lokal master saya". Menyegarkan GitHub akan menampilkan semua kode di GitHub.

![Commit pertama](/assets/img/first_commit.png)

Sekarang setelah Anda memasukkan kode ke GitHub, mari kita lihat bagaimana kita dapat meng-host-nya pada SubQuery Projects.

## 4. Buat proyek Anda

Navigasikan ke [https://project.subquery.network](https://project.subquery.network) dan masuk dengan akun GitHub Anda.

![Selamat datang di SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

Kemudian buatlah proyek baru,

![Selamat datang di SubQuery Projects](/assets/img/subquery_create_project.png)

Dan isi berbagai bidang dengan detail yang sesuai.

- **Akun GitHub:** Jika Anda memiliki lebih dari satu akun GitHub, pilih akun mana yang akan dibuat proyek ini. Proyek yang dibuat di akun organisasi GitHub dibagikan di antara anggota di organisasi itu.
- **Nama Proyek:** Berikan nama proyek Anda di sini.
- **Subtitle:** Berikan subtitle untuk proyek Anda.
- **Deskripsi:** Jelaskan apa yang dilakukan proyek SubQuery Anda.
- **URL Repositori GitHub:** Ini harus berupa URL GitHub yang valid untuk repositori publik yang berisi proyek SubQuery Anda. The schema.graphql file must be in the root of your directory.
- **Sembunyikan proyek:** Jika dipilih, ini akan menyembunyikan proyek dari penjelajah SubQuery publik. Biarkan ini tidak dipilih jika Anda ingin membagikan SubQuery Anda dengan komunitas!

![Buat parameter SubQuery](/assets/img/create_subquery_project_parameters.png)

Saat Anda mengklik buat atau create, Anda akan dibawa ke dasbor Anda.

![Dasbor SubQuery Projects](/assets/img/subquery_project_dashboard.png)

Dasbor ini berisikan banyak informasi berguna seperti jaringan yang digunakan, URL repositori GitHub dari source code yang dijalankan, kapan dibuat dan terakhir diperbarui, dan khususnya detail penerapan.

## 5. Terapkan proyek Anda

Sekarang setelah Anda membuat proyek Anda dalam Proyek SubQuery, menyiapkan perilaku tampilan, langkah selanjutnya adalah menerapkan proyek Anda sehingga operasional. Menerapkan versi memicu operasi pengindeksan SubQuery baru untuk memulai, dan menyiapkan layanan kueri yang diperlukan untuk mulai menerima permintaan GraphQL. Anda juga dapat menerapkan versi baru ke proyek yang ada di sini.

Anda dapat memilih untuk menerapkan ke berbagai lingkungan seperti slot produksi atau slot pementasan. Di sini kita akan menyebarkan ke slot produksi. Mengklik tombol "Menyebarkan" akan menampilkan layar dengan bidang-bidang berikut:

![Terapkan ke slot produksi](/assets/img/deploy_production_slot.png)

- **Commit Hash Versi baru:** Dari GitHub pilih commit yang benar dari codebase proyek SubQuery yang ingin Anda terapkan
- **Versi Pengindeks:** Ini adalah versi layanan simpul SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Versi Kueri:** Ini adalah versi layanan kueri SubQuery yang Anda inginkan untuk menjalankan SubQuery ini. Lihat [@subql/query](https://www.npmjs.com/package/@subql/query)

Karena kami hanya memiliki satu komit, hanya ada satu opsi di drop down. Kami juga akan bekerja dengan versi terbaru dari pengindeks dan versi kueri sehingga kami akan menerima default dan kemudian klik "Terapkan Pembaruan".

Anda kemudian akan melihat penerapan Anda dalam status "Memproses". Di sini, kode Anda diterapkan ke infrastruktur terkelola SubQuery. Pada dasarnya server diputar sesuai permintaan dan disediakan untuk Anda. Ini akan memakan waktu beberapa menit jadi waktu untuk mengambil kopi!

![Pemrosesan penerapan](/assets/img/deployment_processing.png)

Penyebaran sekarang sedang berjalan.

![Penerapan berjalan](/assets/img/deployment_running.png)

## 6. Menguji proyek Anda

Untuk menguji proyek Anda, klik pada 3 elipsis dan pilihlah "lihat pada SubQuery Explorer".

![Lihat proyek Subquery](/assets/img/view_on_subquery.png)

Ini akan membawa Anda ke "Playground" yang sudah tidak asing lagi di mana Anda dapat mengeklik tombol putar dan melihat hasil kueri.

![Playground Subquery](/assets/img/subquery_playground.png)

## 7. Step Bonus

Untuk yang cerdik di antara kita, Anda akan ingat bahwa dalam tujuan pembelajaran, poin terakhir adalah menjalankan kueri GET sederhana. Untuk melakukan ini, kita perlu mengambil "Titik Akhir Kueri" yang ditampilkan di detail penerapan.

![Endpoint query](/assets/img/query_endpoint.png)

Anda kemudian dapat mengirim permintaan GET ke titik akhir ini baik menggunakan klien favorit Anda seperti [Postman](https://www.postman.com/) atau [Mockoon](https://mockoon.com/) atau melalui cURL di terminal Anda. Untuk kesederhanaan, cURL akan ditampilkan di bawah ini.

Perintah curl yang untuk dijalankan adalah:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (pertama: 5, orderBy: CREATED_AT_DESC) { totalCount node { id field1 field2 field3 } } }"
```

memberikan hasil dari:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

Keterbacaan tidak menjadi perhatian di sini karena Anda mungkin akan memiliki beberapa kode front-end untuk dipakai dan menguraikan respons JSON ini.

## Ringkasan

Dalam memulai cepat yang dihosting SubQuery ini, kami menunjukkan betapa cepat dan mudahnya mengambil proyek Subql dan menyebarkannya ke [Proyek SubQuery](https://project.subquery.network) di mana semua infrastruktur disediakan untuk kenyamanan Anda. Ada taman bermain bawaan untuk menjalankan berbagai kueri serta titik akhir API untuk integrasi kode Anda.
