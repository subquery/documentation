# File Manifest

File Manifest `project.yaml` bisa dilihat sebagai titik masuk proyek Anda dan menentukan sebagian besar detil tentang bagaimana SubQuery akan mengindeks dan mengubah data chain.

Manifest bisa dalam format YAML atau JSON. Dalam dokumen ini, kita akan menggunakan YAML di semua contoh. Di bawah ini merupakan contoh standar `project.yaml` standar.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [See here](#cli-options) for more information**

Di bawah `jaringan`:

- Ada bidang **wajib** `genesisHash` baru yang membantu mengidentifikasi rantai yang digunakan.
- Untuk v0.2.0 dan yang lebih baru, Anda dapat mereferensikan [file jenis rantai](#custom-chains) eksternal jika Anda mereferensikan rantai khusus.

Dibawah `dataSources`:

- Can directly link an `index.js` entry point for mapping handlers. By default this `index.js` will be generated from `index.ts` during the build process.
- Sumber data sekarang dapat berupa sumber data waktu proses reguler atau [sumber data khusus](#custom-data-sources).

### CLI Pilihan

Meskipun versi spesifikasi v0.2.0 masih dalam versi beta, Anda perlu mendefinisikannya secara eksplisit selama inisialisasi proyek dengan menjalankan `subql init --specVersion 0.2.0 PROJECT_NAME`

`migrasi subql` dapat dijalankan di proyek yang ada untuk memigrasikan manifes proyek ke versi terbaru.

| Pilihan        | Deskripsi                                                          |
| -------------- | ------------------------------------------------------------------ |
| -f, --force    |                                                                    |
| -l, --location | folder lokal untuk menjalankan migrasi (harus berisi project.yaml) |
| --file=file    | untuk menentukan project.yaml yang akan dimigrasi                  |

## Gambaran

### Spesifikasi Tingkat Atas

| Field           | v0.0.1                              | v0.2.0                      | Deskripsi                                           |
| --------------- | ----------------------------------- | --------------------------- | --------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` or `0.2.0` - versi spesifikasi file manifes |
| **name**        | 𐄂                                   | String                      | Nama proyek Anda                                    |
| **version**     | 𐄂                                   | String                      | Versi Proyek anda                                   |
| **description** | String                              | String                      | Deskripsi Proyek anda                               |
| **repository**  | String                              | String                      | Git alamat repositori proyek Anda                   |
| **schema**      | String                              | [Schema Spec](#schema-spec) | Lokasi file skema GraphQL Anda                      |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Detail jaringan yang akan diindeks                  |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                     |

### Schema Spec

| Field    | v0.0.1 | v0.2.0 | Deskripsi                      |
| -------- | ------ | ------ | ------------------------------ |
| **file** | 𐄂      | String | Lokasi file skema GraphQL Anda |

### Network Spec

| Field           | v0.0.1 | v0.2.0        | Deskripsi                                                                                                                                                                                                  |
| --------------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Hash asal jaringan                                                                                                                                                                                         |
| **endpoint**    | String | String        | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | Disarankan untuk menyediakan titik akhir HTTP dari kamus rantai lengkap untuk mempercepat pemrosesan - baca [cara kerja Kamus Subkueri](../tutorials_examples/dictionary.md).                              |
| **chaintypes**  | 𐄂      | {file:String} | File jenis jalur ke rantai, terima format `.json` atau `.yaml`                                                                                                                                             |

### Datasource Spec

Mendefinisikan data yang akan disaring dan diekstraksi dan lokasi pengendali fungsi pemetaan untuk transformasi data yang akan diterapkan.
| Field          | v0.0.1                                                    | v0.2.0                                                                           | Deskripsi                                                                                                                                                                             |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | Nama sumber data                                                                                                                                                                      |
| **jenis**      | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data                                                                   |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                       |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter sumber data untuk dieksekusi dengan nama spesifikasi titik akhir jaringan                                                                                                      |

### Mapping Spec

| Field                  | v0.0.1                                                                  | v0.2.0                                                                                      | Deskripsi                                                                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                  | 𐄂                                                                                           | Jalur ke entri pemetaan                                                                                                                                                                                                                      |
| **handlers & filters** | [Penangan dan filter default](./manifest/#mapping-handlers-and-filters) | Penangan dan filter default, <br />[Penangan dan filter khusus](#custom-data-sources) | List all the [mapping functions](./mapping.md) and their corresponding handler types, with additional mapping filters. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Sumber Data dan Pemetaan

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
sumber data:
   - jenis: substrat/Waktu Proses # Menunjukkan bahwa ini adalah waktu proses default
     startBlock: 1 # Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data
     pemetaan:
       file: dist/index.js # Jalur masuk untuk pemetaan ini
```

### Penangan pemetaan dan Filter

Tabel berikut menjelaskan filter yang didukung oleh penangan yang berbeda.

**Proyek SubQuery Anda akan jauh lebih efisien jika Anda hanya menggunakan event dan call handler dengan filter pemetaan yang sesuai**

| Handler                                    | Filter yang didukung         |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Filter pemetaan runtime default adalah fitur yang sangat berguna untuk memutuskan blok, peristiwa, atau ekstrinsik apa yang akan memicu pengendali pemetaan.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Contoh filter dari callHandler
Saring:
   modul: saldo
   metode: Setoran
   sukses: benar
```

- Filter modul dan metode didukung pada rantai berbasis media apa pun.
- Filter `sukses` mengambil nilai boolean dan dapat digunakan untuk memfilter ekstrinsik berdasarkan status keberhasilannya.
- The `specVersion` filter specifies the spec version range for a substrate block. The following examples describe how to set version ranges.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Chain Kustom

### Network Spec

Saat menghubungkan ke parachain Polkadot yang berbeda atau bahkan rantai substrat khusus, Anda harus mengedit bagian [Spesifikasi Jaringan](#network-spec) dari manifes ini.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Kejadian Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io)

### Tipe Chain

Anda dapat mengindeks data dari rantai kustom dengan juga menyertakan jenis rantai dalam manifes.

Kami mendukung jenis tambahan yang digunakan oleh modul waktu proses media, `typesAlias`, `typesBundle`, `typesChain`, dan `typesSpec` juga didukung

Dalam contoh v0.2.0 di bawah ini, `network.chaintypes` menunjuk ke file yang memiliki semua tipe kustom yang disertakan, Ini adalah file chainspec standar yang menyatakan tipe spesifik yang didukung oleh blockchain ini di < 0>.json</code> atau `.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Di bawah ini adalah contoh yang menunjukkan sumber data yang berbeda untuk jaringan Polkadot dan Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- jaringan: titik akhir: 'wss://polkadot.api.onfinality.io/public-ws' #Buat template untuk menghindari redundansi definisi: pemetaan: &pemetaan saya penangan: - handler: handleBlock jenis: substrat/BlockHandler sumber data: - nama: polkadotRuntime jenis: substrat/Waktu Proses filter: #Opsional specName: polkadot mulaiBlok: 1000 pemetaan: *mymapping #gunakan template di sini - nama: kusamaRuntime jenis: substrat/Waktu Proses Saring: specName: kusama mulaiBlok: 12000 pemetaan: *mymapping # dapat digunakan kembali atau diubah ``` </CodeGroupItem>

</CodeGroup>
