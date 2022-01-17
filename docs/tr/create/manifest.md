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

V0.2.0 spec sürümü betadayken, proje başlatma sırasında `subql init --specVersion 0.2.0 PROJECT_NAME` çalıştırarak açıkça tanımlamanız gerekir

`subql migrate` proje bildirimini en son sürüme geçirmek için varolan bir projede çalıştırılabilir.

| Seçenekler     | Tanım                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| -f, --force    |                                                                         |
| -l, --location | migrate'i çalıştırmak için yerel klasör (içermesi gerekir project.yaml) |
| --file=file    | belirtmek için project.yaml geçirmek                                    |

## Genel bakış

### Üst Düzey Spec

| Field            | v0.0.1                              | v0.2.0                           | Tanım                                                |
| ---------------- | ----------------------------------- | -------------------------------- | ---------------------------------------------------- |
| **spekversiyon** | Dizgi                               | Dizgi                            | `0.0.1` or `0.2.0` - bildirim dosyasının özel sürümü |
| **isim**         | 𐄂                                   | Dizgi                            | Projenizin adı                                       |
| **sürüm**        | 𐄂                                   | Dizgi                            | Projenizin sürümü                                    |
| **tanım**        | Dizgi                               | Dizgi                            | Projenizin tanımı                                    |
| **repository**   | Dizgi                               | Dizgi                            | Projenizin Git repository adresi                     |
| **şema**         | Dizgi                               | [Şema Özellikleri](#schema-spec) | GraphQL şema dosyanızın konumu                       |
| **ağ**           | [Ağ Tanımlama](#ağ Tanımlama)       | Ağ Tanımlama                     | Dizine eklenecek ağın ayrıntısı                      |
| **dataSources**  | [DataSource Spec](#datasource Spec) | DataSource Spec                  |                                                      |

### Şema Özellikleri

| Field     | v0.0.1 | v0.2.0 | Tanım                          |
| --------- | ------ | ------ | ------------------------------ |
| **dosya** | 𐄂      | Dizgi  | GraphQL şema dosyanızın konumu |

### Ağ Tanımlama

| Field              | v0.0.1 | v0.2.0        | Tanım                                                                                                                                                                                                                     |
| ------------------ | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**    | 𐄂      | Dizgi         | Ağın oluşum karma işlevi                                                                                                                                                                                                  |
| **uç nokta**       | Dizgi  | Dizgi         | Dizine eklenecek blok zincirinin wss veya ws uç noktasını tanımlar - **Bu tam bir arşiv düğümü olmalıdır**. Tüm parachain'ler için uç noktaları [OnFinality](https://app.onfinality.io)'dan ücretsiz olarak alabilirsiniz |
| **sözlük**         | Dizgi  | Dizgi         | İşlemeyi hızlandırmak için tam zincir sözlüğünün HTTP uç noktasının sağlanması önerilir - [SubQuery sözlüğünün nasıl çalıştığını okuyun](../tutorials_examples/dictionary.md).                                            |
| **zincir tipleri** | 𐄂      | {file:String} | Zincir türleri dosyasının yolu, `.json` veya `.yaml` biçimini kabul edin                                                                                                                                                  |

### Datasource Spec

Veri dönüştürmeyi uygulamak için kullanılacak eşleme işlevi işleyicisinin konumunun yanı sıra filtrelenecek ve ayıklanacak verileri tanımlar.
| Field          | v0.0.1                                                          | v0.2.0                                                                                 | Tanım                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isim**       | Dizgi                                                           | 𐄂                                                                                      | Veri kaynağının adı                                                                                                                                                                                             |
| **tür**        | [substrat/Çalışma Zamanı](./manifest/#data-sources-and-mapping) | substrat/Çalışma Zamanı, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Blok, olay ve harici (çağrı) gibi varsayılan substrat çalışma zamanından veri türünü destekliyoruz. <br /> v0.2.0'dan itibaren akıllı sözleşme gibi özel çalışma zamanından gelen verileri destekliyoruz. |
| **startBlock** | Tam sayı                                                        | Tam sayı                                                                               | Bu, dizin oluşturma başlangıç bloğunuzu değiştirir, daha az veri içeren ilk blokları atlamak için bunu daha yükseğe ayarlayın                                                                                   |
| **eşleme**     | Eşleme Tanımlama                                                | Eşleme Tanımlama                                                                       |                                                                                                                                                                                                                 |
| **filtre**     | [ağ filtreleri](./manifest/#network-filters)                    | 𐄂                                                                                      | Ağ uç noktası tanımlama adına göre yürütülecek veri kaynağına filtrele                                                                                                                                          |

### Eşleme Tanımlama

| Field                       | v0.0.1                                                                          | v0.2.0                                                                                                | Tanım                                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **dosya**                   | Dizgi                                                                           | 𐄂                                                                                                     | Eşleme girdisinin yolu                                                                                                                                                                                                                                                |
| **işleyiciler & filtreler** | [Varsayılan işleyiciler ve filtreler](./manifest/#mapping-handlers-and-filters) | Varsayılan işleyiciler ve filtreler,<br />[Özel işleyiciler ve filtreler](#custom-data-sources) | Ek eşleme filtreleriyle birlikte tüm [mapping işlevlerini](./mapping.md) ve karşılık gelen işleyici türlerini listeleyin. <br /><br /> Özel çalışma zamanları eşleme işleyicileri için lütfen [Özel veri kaynaklarını](#custom-data-sources) görüntüleyin |

## Veri Kaynakları ve Eşleme

Bu bölümde, varsayılan substrat çalışma zamanı ve haritalaması hakkında konuşacağız. İşte bir örnek:

```yaml
dataSources:
  - kind: substrate/Runtime # Bunun varsayılan çalışma zamanı başlangıcı olduğunu
 gösterir
    startBlock: 1 # Bu, dizin oluşturma başlangıç bloğunuzu değiştirir, bunu daha az veri eşlemesi olan ilk blokları atlamak için daha yükseğe ayarlayın: 
      file: dist/index.js # Bu eşleme için giriş yolu
```

### Eşleme işleyicileri ve Filtreler

Aşağıdaki tabloda, farklı işleyiciler tarafından desteklenen filtreler açıklanmaktadır.

**Yalnızca uygun eşleme filtrelerine sahip olay ve çağrı işleyicilerini kullandığınızda SubQuery projeniz çok daha verimli olacaktır**

| Handler                                    | Desteklenen filtre           |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `spekversiyon`               |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Varsayılan çalışma zamanı eşleme filtreleri, hangi bloğun, olayın veya dış öğenin bir eşleme işleyicisini tetikleyeceğine karar vermek için son derece yararlı bir özelliktir.

Yalnızca filtre koşullarını karşılayan gelen veriler eşleme işlevleri tarafından işlenir. Eşleme filtreleri isteğe bağlıdır, ancak SubQuery projeniz tarafından işlenen veri miktarını önemli ölçüde azalttıkları ve dizin oluşturma performansını artıracakları için şiddetle tavsiye edilir.

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

Farklı bir Polkadot parachain veya hatta özel bir substrat zincirine bağlanırken, bu bildirinin [Network Spec](#network-spec) bölümünü düzenlemeniz gerekir.

`genesisHash` her zaman özel ağın ilk bloğunun karma işlevi olmalıdır. [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0)’a giderek ve ** blok 0 **'da karma işlevini arayarak bunu kolayca geri alabilirsiniz (aşağıdaki resme bakın).

![Oluşum Karma İşlevi](/assets/img/genesis-hash.jpg)

Ayrıca, `uç noktası’nı` güncelleştirmeniz gerekecektir. Bu, dizine eklenecek blok zincirinin wss uç noktasını tanımlar - **Bu tam bir arşiv düğümü olmalıdır**. Tüm parachain'ler için uç noktaları [OnFinality](https://app.onfinality.io)'dan ücretsiz olarak alabilirsiniz

### Zincir Türleri

Bildiriye zincir türlerini de dahil ederek özel zincirlerden veri indeksleyebilirsiniz.

Substrat çalışma zamanı modülleri tarafından kullanılan ek türleri destekliyoruz, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` da desteklenmektedir.

Aşağıdaki v0.2.0 örneğinde, `network.chaintypes` tüm özel türleri içeren bir dosyaya işaret ediyor, bu, bu blok zinciri tarafından desteklenen belirli türleri `.json`, `.yaml` veya `.js` şeklinde belirten standart bir chainspec dosyasıdır.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

Zincir türleri dosyanızda typescript kullanmak için `src` klasörüne ekleyin (örn.  `./src/types.ts`), ` yarn build`’i çalıştırın ve `dist` klasöründe bulunan oluşturulmuş js dosyası seçeneğine gelin.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Yarn run yapısından sonra oluşturulacak
...
```

`.ts` veya `.js` uzantılı zincir türleri dosyasını kullanma hakkında dikkat edilmesi gerekenler:

- Bildiri sürümünüz v0.2.0 veya üstü olmalıdır.
- Bloklar getirilirken [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/)’de yalnızca varsayılan dışa aktarma dahil edilecektir.

Aşağıda `.ts` zincir türleri dosyasına bir örnek verilmiştir:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Özel Veri Kaynakları

Özel Veri Kaynakları, verilerle başa çıkmayı kolaylaştıran ağa özgü işlevsellik sağlar. Ekstra filtreleme ve veri dönüşümü sağlayabilen bir ara yazılım görevi görürler.

EVM desteği buna iyi bir örnektir. EVM için özel bir veri kaynağı işlemcisine sahip olmak, EVM düzeyinde filtreleyebileceğiniz anlamına gelir (örneğin, sözleşme yöntemlerini veya günlüklerini filtreleyin) ve veriler, API'lerle parametreleri ayrıştırmanın yanı sıra Ethereum ekosistemine benzer yapılara dönüştürülür.

Özel Veri Kaynakları normal veri kaynaklarıyla kullanılabilir.

Aşağıda desteklenen özel veri kaynaklarının bir listesi bulunmaktadır:

| Kind                                                  | Supported Handlers                                                                                       | Filters                                     | Description                                                                   |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | Her işleyicinin altındaki filtreye göz atın | Moonbeams ağlarındaki EVM işlemleri ve etkinlikleriyle kolay etkileşim sağlar |

## Ağ Filtreleri

**Ağ filtreleri yalnızca bildiri v0.0.1 için geçerlidir**.

Genellikle kullanıcı bir SubQuery oluşturacak ve hem testnet hem de mainnet ortamları (örneğin  Polkadot ve Kusama) için yeniden kullanmayı bekleyecektir. Ağlar arasında, çeşitli seçeneklerin farklı olması muhtemeldir (örneğin, dizin başlangıç bloğu). Bu nedenle, kullanıcıların her veri kaynağı için farklı ayrıntılar tanımlamasına izin veririz, bu da bir SubQuery projesinin birden çok ağda kullanılabileceği anlamına gelir.

Kullanıcılar, her ağda hangi veri kaynağının çalıştırılacağına karar vermek için `dataSources`’a `filtre` ekleyebilir.

Aşağıda, hem Polkadot hem de Kusama ağları için farklı veri kaynaklarını gösteren bir örnek verilmiştir.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Fazlalığı önlemek için bir şablon oluşturun definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Tercihe bağlı specName: polkadot startBlock: 1000 mapping: *mymapping #şablonu burada kullanın - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # tekrar kullanılabilir veya değiştirilebilir ``` </CodeGroupItem>

</CodeGroup>
