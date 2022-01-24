# Manifest File

Manifest `project.yaml` dosyası projenizin giriş noktası olarak görülebilir ve SubQuery'nin zincir verilerini nasıl dizine alacağı ve dönüştüreceğine ilişkin ayrıntıların çoğunu tanımlar.

Bildirim YAML veya JSON biçiminde olabilir. Bu belgede, tüm örneklerde YAML kullanacağız. Aşağıda temel `project.yaml` standart bir örneği verilmiştir.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. Daha fazla bilgi için [buraya bakın](#cli-options) **

`network` altında:

- Kullanılan zinciri tanımlamaya yardımcı olan yeni bir **gerekli** `genesisHash` alanı vardır.
- V0.2.0 ve üstü için, özel bir zincire başvuruyorsanız, harici bir [ zincir türü dosyasına](#custom-chains) başvurabilirsiniz.

Under `dataSources`:

- Doğrudan eşleme işleyicileri için `index.js` giriş noktası bağlantı kurabilirsiniz. Varsayılan olarak, bu `index.js`oluşturma işlemi sırasında `index.ts`'den oluşturulur.
- Veri kaynakları artık normal bir çalışma zamanı veri kaynağı veya [özel veri kaynağı](#custom-data-sources) olabilir.

### CLI Secenekler

By default the CLI will generate SubQuery projects for spec verison v0.2.0. This behaviour can be overridden by running `subql init --specVersion 0.0.1 PROJECT_NAME`, although this is not recommended as the project will not be supported by the SubQuery hosted service in the future

`subql migrate` proje bildirimini en son sürüme geçirmek için varolan bir projede çalıştırılabilir.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME  Give the starter project name

| Seçenekler              | Tanım                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| -f, --force             |                                                                              |
| -l, --location=location | local folder to create the project in                                        |
| --install-dependencies  | Install dependencies as well                                                 |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | The spec version to be used by the project         |

## Genel bakış

### Üst Düzey Spec

| Field            | v0.0.1                              | v0.2.0                           | Tanım                                                |
| ---------------- | ----------------------------------- | -------------------------------- | ---------------------------------------------------- |
| **spekversiyon** | String                              | String                           | `0.0.1` or `0.2.0` - bildirim dosyasının özel sürümü |
| **isim**         | 𐄂                                   | String                           | Projenizin adı                                       |
| **sürüm**        | 𐄂                                   | String                           | Projenizin sürümü                                    |
| **tanım**        | String                              | String                           | Projenizin tanımı                                    |
| **repository**   | String                              | String                           | Projenizin Git repository adresi                     |
| **şema**         | String                              | [Şema Özellikleri](#schema-spec) | GraphQL şema dosyanızın konumu                       |
| **ağ**           | [Ağ Tanımlama](#ağ Tanımlama)       | Ağ Tanımlama                     | Dizine eklenecek ağın ayrıntısı                      |
| **dataSources**  | [DataSource Spec](#datasource Spec) | DataSource Spec                  |                                                      |

### Şema Özellikleri

| Field     | v0.0.1 | v0.2.0 | Tanım                          |
| --------- | ------ | ------ | ------------------------------ |
| **dosya** | 𐄂      | String | GraphQL şema dosyanızın konumu |

### Ağ Tanımlama

| Field              | v0.0.1 | v0.2.0        | Tanım                                                                                                                                                                                                                     |
| ------------------ | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**    | 𐄂      | String        | Ağın oluşum karma işlevi                                                                                                                                                                                                  |
| **uç nokta**       | String | String        | Dizine eklenecek blok zincirinin wss veya ws uç noktasını tanımlar - **Bu tam bir arşiv düğümü olmalıdır**. Tüm parachain'ler için uç noktaları [OnFinality](https://app.onfinality.io)'dan ücretsiz olarak alabilirsiniz |
| **sözlük**         | String | String        | İşlemeyi hızlandırmak için tam zincir sözlüğünün HTTP uç noktasının sağlanması önerilir - [SubQuery sözlüğünün nasıl çalıştığını okuyun](../tutorials_examples/dictionary.md).                                            |
| **zincir tipleri** | 𐄂      | {file:String} | Zincir türleri dosyasının yolu, `.json` veya `.yaml` biçimini kabul edin                                                                                                                                                  |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Field          | v0.0.1                                                    | v0.2.0                                                                           | Tanım                                                                                                                                                                                 |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isim**       | String                                                    | 𐄂                                                                                | Name of the data source                                                                                                                                                               |
| **tür**        | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Eşleme Tanımlama                                          | Eşleme Tanımlama                                                                 |                                                                                                                                                                                       |
| **filtre**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Eşleme Tanımlama

| Field                       | v0.0.1                                                                               | v0.2.0                                                                                                | Tanım                                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **dosya**                   | String                                                                               | 𐄂                                                                                                     | Eşleme girdisinin yolu                                                                                                                                                                                                                                                |
| **işleyiciler & filtreler** | [Varsayılan işleyiciler ve filtreler](./manifest/#eşleme-işleyicileri-ve-filtreleri) | Varsayılan işleyiciler ve filtreler,<br />[Özel işleyiciler ve filtreler](#custom-data-sources) | Ek eşleme filtreleriyle birlikte tüm [mapping işlevlerini](./mapping.md) ve karşılık gelen işleyici türlerini listeleyin. <br /><br /> Özel çalışma zamanları eşleme işleyicileri için lütfen [Özel veri kaynaklarını](#custom-data-sources) görüntüleyin |

## Veri Kaynakları ve Eşleme

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Bunun varsayılan çalışma zamanı başlangıcı olduğunu
 gösterir
    startBlock: 1 # Bu, dizin oluşturma başlangıç bloğunuzu değiştirir, bunu daha az veri eşlemesi olan ilk blokları atlamak için daha yükseğe ayarlayın: 
      file: dist/index.js # Bu eşleme için giriş yolu
```

### Eşleme işleyicileri ve Filtreler

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Handler                                    | Desteklenen filtre           |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `spekversiyon`               |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# callHandler filtresinden örnek
filter:
  module: balances
  method: Deposit
  success: true
```

- Modül ve yöntem filtreleri herhangi bir substrat tabanlı zincirde desteklenir.
- `success` filtresi bir boolean değeri alır ve dış çizgiyi başarı durumuna göre filtrelemek için kullanılabilir.
- `specVersion` filtresi, bir substrat bloğunun tanımlama sürüm aralığını belirtir. Aşağıdaki örneklerde sürüm aralıklarının nasıl ayarlandırılacağı açıklanmaktadır.

```yaml
filter:
  specVersion: [23, 24]   # 23 ile 24 arasında specVersion olan dizin bloğu (24 dahil).
  specVersion: [100]      # specVersion olan dizin bloğu 100'den büyük veya eşit.
  specVersion: [null, 23] # specVersion olan dizin bloğu 23'ten küçük veya eşit.
```

## Özel Zincirler

### Ağ Tanımlama

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Tüm parachain'ler için uç noktaları [OnFinality](https://app.onfinality.io)'dan ücretsiz olarak alabilirsiniz

### Zincir Türleri

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Yarn run yapısından sonra oluşturulacak
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Bildiri sürümünüz v0.2.0 veya üstü olmalıdır.
- Bloklar getirilirken [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/)’de yalnızca varsayılan dışa aktarma dahil edilecektir.

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
