# Bagaimana cara mulai di tinggi block berbeda?

## Panduan video

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Pengenalan

By default, all starter projects start synchronising the blockchain from the genesis block. In otherwords, from block 1. For large blockchains, this can typically take days or even weeks to fully synchronise.

Untuk mulai sinkronisasi node SubQuery dari tinggi bukan-nol, yang perlu dilakukan hanyalah memodifikasi file project.yaml dan mengubah kunci startBlock.

Berikut adalah file project.yaml di mana block mulainya sudah diatur ke 1.000.000

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```

## Kenapa tidak mulai dari nol?

The main reason is that it can reduce the time to synchronise the blockchain. This means that if you are only interested in transactions in the last 3 months, you can only synchronise the last 3 months worth meaning less waiting time and you can start your development faster.

## Apa kekurangan tidak memulai dari nol?

Kekurangan paling jelas adalah anda tidak akan bisa melakukan query data di blockchain untuk block yang tidak anda miliki.

## Bagaimana cara mengetahui tinggi blockchain saat ini?

Jika menggunakan jaringan Polkadot, anda bisa mengunjungi [https://polkascan.io/](https://polkascan.io/), pilih jaringannya, dan lihat "Finalised Block".

## Apa saya harus membangun ulang atau codegen?

No. Because you are modifying the project.yaml file, which is essentially a configuration file, you will not have to rebuild or regenerate the typescript code.
