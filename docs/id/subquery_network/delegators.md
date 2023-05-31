# Delegator

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## Apa itu Delegator?

Delegator adalah peran jaringan non-teknis di Jaringan SubQuery dan merupakan cara yang bagus untuk mulai berpartisipasi dalam Jaringan SubQuery. Peran ini memungkinkan Delegator untuk “mendelegasikan” SQT mereka ke satu atau lebih Pengindeks dan mendapatkan hadiah (mirip dengan staking).

Tanpa Delegator, Pengindeks kemungkinan akan mendapatkan lebih sedikit imbalan karena mereka akan memiliki lebih sedikit SQT untuk dialokasikan. Oleh karena itu, Pengindeks bersaing untuk menarik Delegator dengan menawarkan bagian yang kompetitif dari penghargaan Pengindeks.

## Persyaratan menjadi Delegator

Salah satu hal terbaik tentang menjadi Delegator adalah Anda tidak memerlukan devops, coding, atau pengalaman teknis. Pemahaman dasar tentang Jaringan SubQuery adalah semua yang diperlukan untuk menjadi Delegator.

## Manfaat menjadi Delegator

Ada beberapa keuntungan menjadi Delegator:

- **Mudah untuk memulai**: Memerlukan sedikit pengetahuan teknis, Delegator hanya perlu memperoleh token SQT dan kemudian mempelajari proses pendelegasian token ke Pengindeks pilihan mereka.
- **Berkontribusi ke jaringan**: Mendelegasikan ke Pengindeks adalah cara untuk mendukung permintaan layanan kerja Pengindeks kepada konsumen. Sebagai imbalannya, Delegator dihargai dengan SQT.
- **Dapatkan hadiah**: Delegator dapat menerapkan SQT mereka dengan mendelegasikan SQT mereka ke Pengindeks dan mendapatkan bagian dari kumpulan hadiah.
- **Tidak ada jumlah delegasi minimum**: Tidak ada delegasi minimum yang diperlukan untuk menjadi Delegator. Ini berarti bahwa siapa pun dapat bergabung tidak peduli berapa banyak SQT yang dimilikinya.

## Bagaimana Delegator dihargai?

Untuk menarik Delegator untuk mendukung pekerjaan mereka, Pengindeks menawarkan Delegator bagian dari hadiah yang mereka peroleh. Pengindeks akan mengiklankan Tarif Komisi Pengindeks, di mana pendapatan yang tersisa kemudian akan dibagi dalam total delegasi/stake pool secara proporsional dengan nilai individu yang didelegasikan/dipertaruhkan di pool.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Pengindeks bebas mengatur tarif ini ke nilai apa pun yang mereka inginkan. Persentase yang lebih tinggi menunjukkan bahwa Pengindeks menyimpan lebih banyak keuntungan. Persentase yang lebih rendah menunjukkan bahwa Pengindeks berbagi lebih banyak keuntungan mereka dengan Delegator mereka.

Delegator hanya akan menerima pendapatan untuk mempertaruhkan Era yang mereka ikuti selama seluruh periode. Misalnya, jika mereka bergabung dengan Era yang dipertaruhkan di tengah periode yang relevan, maka mereka tidak akan memperoleh pendapatan Biaya Kueri untuk Era tersebut.

Jika Pengindeks ingin meningkatkan Tarif Komisi Pengindeks yang mereka tawarkan kepada Delegator mereka, mereka harus mengiklankan ini untuk seluruh Era staking . Pengindeks akan dapat menurunkan Tingkat Komisi Pengindeks mereka kapan saja untuk meningkatkan SQT yang lebih didelegasikan untuk dipertaruhkan dalam jangka pendek. Delegator dapat menarik atau membatalkan pendelegasian jumlah taruhan mereka kapan saja, tetapi mereka akan kehilangan hadiah apa pun yang diperoleh dalam Era taruhan (karena mereka bukan bagian dari kumpulan delegasi selama seluruh durasi Era taruhan).

## Bagaimana cara memilih Pengindeks?

You need to assess a few things when deciding on what Indexer to choose.

Pengindeks menetapkan Tingkat Komisi Pengindeks (ICR) yang merupakan persentase yang diperoleh Pengindeks. Sisanya kemudian dibagikan di antara Pengindeks dan semua Delegator secara proporsional berdasarkan jumlah yang dipertaruhkan/didelegasikan. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

Misalnya, Pengindeks A telah menetapkan ICR sebesar 80% dan telah menerima SQT dari 8 Delegator. Ini berarti bahwa 8 Delegator ditambah Pengindeks itu sendiri, akan diberikan bagian dari 20% sisa dari apa yang telah diperoleh Pengindeks. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Siklus Hidup Delegasi

Delegator mendelegasikan (menyetorkan) SQT ke dalam kontrak Pengindeks.

Delegator kemudian dapat memutuskan berapa banyak yang akan didelegasikan ulang ke setiap Pengindeks pilihan mereka.

Delegator dapat membatalkan delegasi (menarik) token kembali ke dompet mereka. Ini akan memicu periode penguncian selama 28 hari.

Setelah periode pembukaan kunci selesai, token tersedia untuk penarikan/klaim.

## Risiko menjadi Delegator

Meskipun tidak dianggap sebagai peran yang berisiko, menjadi Delegator mencakup beberapa risiko yang harus diperhatikan.

1. Risiko volatilitas pasar: Fluktuasi konstan di pasar adalah risiko yang memengaruhi tidak hanya SQT, tetapi semua token di pasar cryptocurrency umum. Mengambil pendekatan jangka panjang dapat mengurangi jenis risiko ini.
2. Penyesuaian konstan parameter staking oleh Pengindeks dan biaya delegasi dapat meningkatkan risiko bagi Delegator. Misalnya, Delegator mungkin melewatkan perubahan parameter staking yang mengakibatkan pengembalian yang kurang dari yang diharapkan. Untuk mengurangi risiko ini, ketika Pengindeks menurunkan parameter taruhannya, itu hanya akan berlaku setelah Era penuh berikutnya selesai, memberikan waktu bagi para delegator untuk menilai dan membuat perubahan apa pun.
3. Pengindeks kinerja buruk: Ada kemungkinan Delegator dapat memilih Pengindeks yang berkinerja buruk dan karena itu memberikan pengembalian investasi di bawah standar kepada Delegator. Oleh karena itu, para Delegator didorong untuk melakukan uji tuntas Pengindeks terhadap Pengindeks potensial. Indeks Reputasi juga tersedia untuk membantu Delegator membandingkan Pengindeks satu sama lain.

Setelah Pengindeks pilihan ditemukan, uji tuntas harus dilakukan untuk memeriksa reputasi dan keandalan Pengindeks. Penilaian dapat dilakukan untuk mengevaluasi apakah Pengindeks aktif di komunitas, apakah Pengindeks membantu anggota lain, apakah mungkin untuk berhubungan dengan Pengindeks, dan apakah Pengindeks up-to-date dengan protokol dan pembaruan proyek.
