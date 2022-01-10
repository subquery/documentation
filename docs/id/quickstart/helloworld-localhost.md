# Hello World (localhost + Docker)

Selamat datang di permulaan cepat SubQuery Hello World ini. Mulai cepat bertujuan untuk menunjukkan kepada Anda bagaimana Anda menjalankan proyek starter default di Docker dalam beberapa langkah sederhana.

## Tujuan Pembelajaran

Di akhir quick start ini, Anda harus:

- memahami prasyarat yang diperlukan
- memahami perintah umum dasar
- dapat menavigasi ke localhost:3000 dan melihat playground
- menjalankan kueri sederhana untuk mendapatkan tinggi blok dari mainnet Polkadot

## Audiens yang dituju

Panduan ini ditujukan bagi para pengembang baru yang memiliki pengalaman pengembangan dan tertarik untuk mempelajari lebih lanjut tentang SubQuery.

## Panduan video

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Prasyarat

Anda akan memerlukan:

- package manager yarn atau npm
- SubQuery CLI (`@subql/cli`)
- Docker

Anda dapat menjalankan perintah berikut di terminal untuk melihat apakah Anda sudah memiliki salah satu prasyarat ini.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

Untuk pengguna yang lebih mahir, copy dan paste berikut ini:

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

Ini harus kembali: (untuk pengguna npm, ganti yarn dengan npm)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

Jika Anda mendapatkan hal di atas, maka Anda siap untuk pergi. Jika tidak, ikuti tautan ini untuk menginstalnya:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) atau [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Inisialisasi proyek

Langkah pertama saat memulai dengan SubQuery adalah menjalankan perintah `subql init`. Mari kita inisialisasi proyek awal dengan nama `subqlHelloWorld`. Perhatikan bahwa hanya penulis yang wajib. Segala sesuatu yang lain dibiarkan kosong di bawah.

```shell
> subql init --starter subqlHelloWorld
Git repository:
RPC endpoint [wss://polkadot.api.onfinality.io/public-ws]:
Authors: sa
Description:
Version: [1.0.0]:
License: [Apache-2.0]:
Init the starter package... subqlHelloWorld is ready

```

Jangan lupa untuk pindah ke direktori baru ini.

```shell
cd subqlHelloWorld
```

## 2. Instal dependensi

Sekarang lakukan instal yarn atau node untuk menginstal berbagai dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

Sebagai Contoh `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍 Menyelesaikan paket...
[2/4] 🚚 Mengambil paket...
[3/4] 🔗  Menautkan dependensi...
[4/4] 🔨  Membangun paket baru...
berhasil Menyimpan file kunci.
✨  Selesai dalam 31.84s.
```

## 3. Buat kode

Sekarang jalankan `yarn codegen` untuk menghasilkan TypeScript dari skema GraphQL.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

An example of `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Indeks model yang dihasilkan!
* Jenis indeks yang dihasilkan!
✨  Selesai dalam 1.02s.
```

**Peringatan** Ketika perubahan dibuat pada file skema, harap ingat untuk menjalankan kembali `yarn codegen` untuk membuat ulang direktori jenis Anda.

## 4. Membangun Code

Langkah selanjutnya adalah membuat kode dengan `yarn build`.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

An example of `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Selesai dalam 5.68s.
```

## 5. Jalankan Docker

Menggunakan Docker memungkinkan Anda menjalankan contoh ini dengan sangat cepat karena semua infrastruktur yang diperlukan dapat disediakan di dalam image Docker. Jalankan `docker-compose pull && docker-compose up`.

Ini akan menendang segalanya menjadi hidup di mana pada akhirnya Anda akan mendapatkan blok terambil.

```shell
> #SNIPPET
subquery-node_1   | 2021-06-05T22:20:31.450Z <subql-node> INFO node started
subquery-node_1   | 2021-06-05T22:20:35.134Z <fetch> INFO fetch block [1, 100]
subqlhelloworld_graphql-engine_1 exited with code 0
subquery-node_1   | 2021-06-05T22:20:38.412Z <fetch> INFO fetch block [101, 200]
graphql-engine_1  | 2021-06-05T22:20:39.353Z <nestjs> INFO Starting Nest application...
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO AppModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.383Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.809Z <nestjs> INFO Nest application successfully started
subquery-node_1   | 2021-06-05T22:20:41.122Z <fetch> INFO fetch block [201, 300]
graphql-engine_1  | 2021-06-05T22:20:43.244Z <express> INFO request completed

```

## 6. Jelajahi taman bermain

Arahkan ke http://localhost:3000/ dan paste kueri di bawah ini ke sisi kiri layar lalu tekan tombol putar atau play.

```
{
 query{
   starterEntities(last:10, orderBy:FIELD1_ASC ){
     nodes{
       field1
     }
   }
 }
}

```

Playground SubQuery pada localhost.

![localhost playground](/assets/img/subql_playground.png)

Jumlah blok pada playground harus sesuai dengan jumlah blok (secara teknis tinggi blok) di terminal juga.

## Ringkasan

Dalam quick start ini, kami mendemonstrasikan langkah-langkah dasar untuk mengaktifkan dan menjalankan proyek pemula di dalam lingkungan Docker dan kemudian menavigasi ke localhost:3000 dan menjalankan kueri untuk mengembalikan nomor blok jaringan Polkadot mainnet.
