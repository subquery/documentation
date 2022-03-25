# Sumber Data Dinamis

Ada kasus di mana Anda tidak mengetahui semua parameter untuk sumber data saat proyek dimulai. Contohnya adalah factory kontrak yang akan membuat instance kontrak baru di kemudian hari. Tidak mungkin untuk mengetahui apa alamat kontrak untuk ini sebelumnya. Di sinilah kemampuan untuk membuat sumber data baru secara dinamis masuk.

## `Templates` dasar

Untuk menggunakan sumber data dinamis, Anda harus memiliki versi spesifikasi setidaknya `0.2.1`. Jika Anda menggunakan `0.2.0` yang perlu Anda lakukan hanyalah mengubah specVersion. Jika Anda menggunakan versi yang lebih rendah maka Anda harus memperbarui ke `0.2.0` terlebih dahulu dengan `subql migration`.

Versi spesifikasi `0.2.1` memperkenalkan bidang `templat` baru. Template sama dengan sumber data dengan beberapa perbedaan.

* Mereka membutuhkan `name` untuk mengidentifikasi template
* `startBlock` tidak lagi diperlukan. Ini akan disetel ke blok sumber data dibuat
* Dalam hal sumber data khusus, bidang `processor.options` juga dapat diisi sebagian, opsi lainnya akan diberikan saat sumber data dibuat.

## Contoh Projek

Cara terbaik untuk menunjukkan cara menggunakan sumber data dinamis adalah dengan sebuah contoh.

Contoh di bawah ini adalah untuk pertukaran terdesentralisasi yang memiliki kontrak pabrik yang menerapkan kontrak baru ketika pasangan perdagangan ditambahkan. Ketika proyek dijalankan, tidak mungkin untuk mengetahui alamat semua kontrak pasangan perdagangan yang telah atau akan dibuat. Sumber data dapat dibuat secara dinamis oleh pengendali pemetaan dari template untuk mengindeks kontrak pasangan perdagangan yang baru dibuat.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # kami tidak tahu alamatnya saat ini, itu akan diberikan saat dipakai
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// Fungsi ini didefinisikan menggunakan perintah `subql codegen` cli
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Buat sumber data baru yang menyediakan alamat kontrak pertukaran pasangan perdagangan
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Melihat Projek Sumber Data Dinamis

Sumber data dinamis disimpan dalam metadata proyek. Jika Anda perlu melihat detail apa yang dapat Anda tanyakan seperti di bawah ini:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Hasil
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

