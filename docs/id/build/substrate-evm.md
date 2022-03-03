# Dukungan Substrate EVM

Kami menyediakan prosesor sumber data khusus untuk EVM Moonbeam dan Moonriver. Ini menawarkan cara sederhana untuk memfilter dan mengindeks aktivitas EVM dan Substrate di jaringan Moonbeam dalam satu proyek SubQuery.

Jaringan yang didukung:

| Nama Jaringan  | Websocket Endpoint                                 | Dictionary Endpoint                                                  |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | `wss://moonbeam.api.onfinality.io/public-ws`       | `https://api.subquery.network/sq/subquery/moonbeam-dictionary`       |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**Anda juga dapat merujuk ke [contoh proyek dasar Moonriver EVM](https://github.com/subquery/tutorials-moonriver-evm-starter) dengan event dan call handler.** Proyek ini juga dihosting secara langsung di SubQuery Explorer [di sini](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## Memulai

1. Tambahkan sumber data khusus sebagai dependensi `yarn add @subql/contract-processors`
2. Tambahkan sumber data khusus seperti yang dijelaskan di bawah
3. Tambahkan handler untuk sumber data khusus ke kode Anda

## Spesifikasi Sumber Data

| Field             | Tipe                                                           | Dibutuhkan | Deskripsi                            |
| ----------------- | -------------------------------------------------------------- | ---------- | ------------------------------------ |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Ya         | Referensi file ke kode pemroses data |
| processor.options | [ProcessorOptions](#processor-options)                         | Tidak      | Opsi khusus untuk Prosesor Moonbeam  |
| assets            | `{ [key: String]: { file: String }}`                           | Tidak      | Objek file aset eksternal            |

### Opsi Prosesor

| Field   | Tipe               | Dibutuhkan | Deskripsi                                                                                             |
| ------- | ------------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| abi     | String             | Tidak      | ABI yang digunakan oleh prosesor untuk mengurai argumen. HARUS berupa kunci `aset`                    |
| address | String atau `null` | Tidak      | Alamat kontrak tempat event atau panggilan dilakukan. `null` akan merekam panggilan pembuatan kontrak |

## MoonbeamCall

Bekerja dengan cara yang sama seperti [substrate/CallHandler](../create/mapping/#call-handler) kecuali dengan argument handler yang berbeda dan perubahan pemfilteran kecil.

| Field  | Tipe                         | Dibutuhkan | Deskripsi                                           |
| ------ | ---------------------------- | ---------- | --------------------------------------------------- |
| jenis  | 'substrate/MoonbeamCall'     | Ya         | Menentukan bahwa ini adalah handler jenis Panggilan |
| filter | [Call Filter](#call-filters) | Tidak      | Filter sumber data untuk dieksekusi                 |

### Call Filters

| Field    | Tipe   | Contoh                                        | Deskripsi                                                                                                                                                                 |
| -------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | String [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) atau fungsi `sighash` untuk memfilter fungsi yang dipanggil pada kontrak |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | Alamat Ethereum yang mengirim transaksi                                                                                                                                   |

### Handlers

Tidak seperti handler biasa, Anda tidak akan mendapatkan `SubstrateExtrinsic` sebagai parameter, melainkan Anda akan mendapatkan `MoonbeamCall` yang didasarkan pada jenis [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) Ether.

Perubahan dari jenis `TransactionResponse`:

- Tidak memiliki properti `wait` dan `confirmations`
- Properti `success` ditambahkan untuk mengetahui apakah transaksi berhasil
- `args` ditambahkan jika field `abi` disediakan dan argumen dapat berhasil diuraikan

## MoonbeamEvent

Bekerja dengan cara yang sama seperti [substrate/EventHandler](../create/mapping/#event-handler) kecuali dengan argumen handler yang berbeda dan perubahan pemfilteran kecil.

| Field  | Tipe                           | Dibutuhkan | Deskripsi                                      |
| ------ | ------------------------------ | ---------- | ---------------------------------------------- |
| jenis  | 'substrate/MoonbeamEvent'      | Ya         | Menentukan bahwa ini adalah handler tipe Event |
| filter | [Event Filter](#event-filters) | Tidak      | Filter sumber data untuk dieksekusi            |

### Event Filters

| Field  | Tipe         | Contoh                                                          | Deskripsi                                                                                                                                            |
| ------ | ------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | Filter topik mengikuti filter log Ethereum JSON-PRC, dokumentasi selengkapnya dapat ditemukan [di sini](https://docs.ethers.io/v5/concepts/events/). |

<b>Catatan tentang topik:</b>
Ada beberapa peningkatan dari filter log dasar:

- Topik tidak perlu diisi 0
- String [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) dapat diberikan dan secara otomatis dikonversi ke id-nya

### Handlers

Tidak seperti handler biasa, Anda tidak akan mendapatkan `SubstrateEvent` sebagai parameter, tetapi Anda akan mendapatkan `MoonbeamEvent` yang didasarkan pada jenis [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) Ether.

Perubahan dari jenis `Log`:

- `args` ditambahkan jika field `abi` disediakan dan argumen dapat berhasil diuraikan

## Contoh Sumber Data

Ini adalah ekstrak dari file manifes `project.yaml`.

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Must be a key of assets
        abi: erc20
        # Alamat kontrak (atau penerima jika transfer) untuk difilter, jika `null` seharusnya untuk pembuatan kontrak
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## Fungsi tersebut dapat berupa fragment fungsi atau signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
```

## Batasan yang Diketahui

- Saat ini tidak ada cara untuk mengkueri status EVM dalam handler
- Tidak ada cara untuk mendapatkan tanda terima transaksi dengan handler panggilan
- Properti `blockHash` saat ini tidak ditentukan, properti `blockNumber` dapat digunakan sebagai gantinya
