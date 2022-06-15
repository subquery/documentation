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
- Hadiah dari kumpulan hadiah SQT berdasarkan distribusi yang ditentukan oleh Fungsi Produksi Cobb-Douglas
- Imbalan biaya kueri SQT langsung dari Perjanjian Tertutup yang merupakan pihak pengindeks

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

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](./design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version
- Identify and take advantage of new indexing opportunities
- Update project version to latest and reindex where necessary
- Infrastructure maintenance
  - Constantly monitoring and upsizing disk
  - Right size query and indexing compute based on traffic
  - Increase query services for increasing ingress traffic

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node)
  - [Query Service](https://www.npmjs.com/package/@subql/query)
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator)
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties)
- the accuracy of the data being served to avoid slashing penalties

## Selecting SubQuery Projects to Index

There are several indicators that an Indexer needs to consider when selecting a SubQuery project to index.

### Query Fee Opportunities

Some projects will have open or closed plans advertised by consumers.

When a Consumer advertises an open or closed plan for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities.

### Indexer Competition

Popular projects offering a high query volume that attract a large number of Indexers. This also implies that the rewards will be shared amongst more people. A single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers.

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Indexers set their plan prices?
- At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Indexer or Indexer’s team
- The hardware approach and why it provides superior performance
- The customer support policy or SLA
- Evidence of historical performances

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.
