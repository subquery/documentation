# File Manifest

File Manifest `project.yaml` bisa dilihat sebagai titik masuk proyek Anda dan menentukan sebagian besar detil tentang bagaimana SubQuery akan mengindeks dan mengubah data chain.

Manifest bisa dalam format YAML atau JSON. Dalam dokumen ini, kita akan menggunakan YAML di semua contoh. Di bawah ini merupakan contoh standar `project.yaml` standar.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Berikan nama proyek version: 1.0.0  # Versi proyek description: '' # Deskripsi dari proyek anda repository: 'https://github.com/subquery/subql-starter' # Alamat git repository dari proyek anda schema: file: ./schema.graphql # Lokasi file skema GraphQL Anda network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash dari jaringan endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Secara opsional, berikan titik akhir HTTP dari dictionary chain lengkap untuk mempercepat pemrosesan dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter adalah opsional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Deskripsi dari proyek anda repository: 'https://github.com/subquery/subql-starter' # Alamat git repository dari proyek anda schema: ./schema.graphql # Lokasi file skema GraphQL Anda network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Secara opsional, berikan titik akhir HTTP dari dictionary chain lengkap untuk mempercepat pemrosesan dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter bersifat opsional tetapi disarankan untuk mempercepat pemrosesan acara module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrasi dari v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**Jika Anda memiliki proyek dengan specVersion v0.0.1, Anda dapat menggunakan `subql migrate` untuk melakukan upgrade dengan cepat. [Lihat di sini](#cli-options) untuk informasi lebih lanjut**

Di bawah `network`:

- Ada field **wajib** `genesisHash` baru yang membantu mengidentifikasi rantai yang digunakan.
- Untuk v0.2.0 dan yang lebih baru, Anda dapat mereferensikan [file jenis rantai](#custom-chains) eksternal jika Anda mereferensikan rantai khusus.

Dibawah `dataSources`:

- Dapat langsung menautkan titik masuk `index.js` untuk pengendali pemetaan. Secara default `index.js` ini akan dihasilkan dari `index.ts` selama proses pembuatan.
- Sumber data sekarang dapat berupa sumber data waktu proses reguler atau [sumber data khusus](#custom-data-sources).

### CLI Options

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

| Field           | v0.0.1 | v0.2.0        | Deskripsi                                                                                                                                                                                                                     |
| --------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Hash asal jaringan                                                                                                                                                                                                            |
| **endpoint**    | String | String        | Menentukan endpoint wss atau ws dari blockchain yang akan diindeks - **Ini harus berupa node arsip lengkap**. Anda dapat mengambil endpoint untuk semua parachains secara gratis dari [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | Disarankan untuk menyediakan titik akhir HTTP dari kamus rantai lengkap untuk mempercepat pemrosesan - baca [cara kerja Kamus Subkueri](../tutorials_examples/dictionary.md).                                                 |
| **chaintypes**  | 𐄂      | {file:String} | File jenis jalur ke rantai, terima format `.json` atau `.yaml`                                                                                                                                                                |

### Datasource Spec

Mendefinisikan data yang akan disaring dan diekstraksi dan lokasi pengendali fungsi pemetaan untuk transformasi data yang akan diterapkan.
| Field          | v0.0.1                                                    | v0.2.0                                                                           | Deskripsi                                                                                                                                                                                          |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | Nama sumber data                                                                                                                                                                                   |
| **jenis**      | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Kami mendukung tipe data dari runtime substrate default seperti blok, event, dan extrinsic (panggilan). <br /> Dari v0.2.0, kami mendukung data dari runtime khusus, seperti smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data                                                                                |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                    |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter sumber data untuk dieksekusi dengan nama spesifikasi titik akhir jaringan                                                                                                                   |

### Mapping Spec

| Field                  | v0.0.1                                                                  | v0.2.0                                                                                      | Deskripsi                                                                                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                  | 𐄂                                                                                           | Jalur ke entri pemetaan                                                                                                                                                                                                            |
| **handlers & filters** | [Penangan dan filter default](./manifest/#mapping-handlers-and-filters) | Penangan dan filter default, <br />[Penangan dan filter khusus](#custom-data-sources) | Buat daftar semua [fungsi pemetaan](./mapping.md) dan jenis handler yang sesuai, dengan filter pemetaan tambahan. <br /><br /> Untuk handler pemetaan runtime kustom, lihat [Sumber data kustom](#custom-data-sources) |

## Sumber Data dan Pemetaan

Di bagian ini, kita akan berbicara tentang runtime substrate default dan pemetaannya. Berikut adalah contohnya:

```yaml
dataSources:
  - kind: substrate/Runtime # Menunjukkan bahwa ini adalah runtime default
    startBlock: 1 # Ini mengubah blok awal pengindeksan Anda, setel ini lebih tinggi untuk melewati blok awal dengan lebih sedikit data
    mapping:
      file: dist/index.js # entry path untuk pemetaan ini
```

### Handler pemetaan dan Filter

Tabel berikut menjelaskan filter yang didukung oleh handler yang berbeda.

**Proyek SubQuery Anda akan jauh lebih efisien jika Anda hanya menggunakan event dan call handler dengan filter pemetaan yang sesuai**

| Handler                                    | Filter yang didukung         |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Filter pemetaan runtime default adalah fitur yang sangat berguna untuk memutuskan block, event, atau extrinsic apa yang akan memicu handler pemetaan.

Hanya data masuk yang memenuhi kondisi filter yang akan diproses oleh fungsi pemetaan. Filter pemetaan bersifat opsional tetapi sangat disarankan karena secara signifikan mengurangi jumlah data yang diproses oleh proyek SubQuery Anda dan akan meningkatkan kinerja pengindeksan.

```yaml
# Contoh filter dari callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Filter modul dan method didukung di chain apa pun yang berbasis substrate.
- Filter `success` mengambil nilai boolean dan dapat digunakan untuk memfilter ekstrinsik berdasarkan status keberhasilannya.
- Filter `specVersion` menentukan rentang versi spesifikasi untuk block substrate. Contoh berikut menjelaskan cara mengatur rentang versi.

```yaml
filter:
  specVersion: [23, 24]   # Blok indeks dengan specVersion di antara 23 dan 24 (inklusif).
  specVersion: [100]      # Blok indeks dengan specVersion lebih besar dari atau sama dengan 100.
  specVersion: [null, 23] # Blok indeks dengan specVersion kurang dari atau sama dengan 23.
```

## Chain Kustom

### Network Spec

Saat menghubungkan ke parachain Polkadot yang berbeda atau bahkan rantai substrate khusus, Anda harus mengedit bagian [Network Spec](#network-spec) dari manifes ini.

`genesisHash` harus selalu berupa hash dari blok pertama jaringan kustom. Anda dapat mengambil ini dengan mudah dengan pergi ke [Polkadot Js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) dan mencari hash di **blok 0** (lihat gambar di bawah).

![Kejadian Hash](/assets/img/genesis-hash.jpg)

Selain itu, Anda perlu memperbarui `endpoint`. Ini mendefinisikan endpoint wss dari blockchain yang akan diindeks - **Ini harus berupa node arsip lengkap**. Anda dapat mengambil endpoint untuk semua parachains secara gratis dari [OnFinality](https://app.onfinality.io)

### Tipe Chain

Anda dapat mengindeks data dari rantai kustom dengan juga menyertakan jenis rantai dalam manifes.

Kami mendukung jenis tambahan yang digunakan oleh modul waktu proses media, `typesAlias`, `typesBundle`, `typesChain`, dan `typesSpec` juga didukung

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # Filepath relatif ke tempat tipe kustom disimpan ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

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

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
