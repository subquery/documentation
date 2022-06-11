# Avalanche Hızlı Başlangıç

Bu Hızlı başlangıç ​​kılavuzunda, basit bir Avalanche başlangıç ​​projesiyle başlayacağız ve ardından bazı gerçek gerçek verileri indeksleyerek bitireceğiz. Bu, kendi SubQuery Projenizi geliştirirken başlamak için mükemmel bir temeldir.

**Substrate/Polkadot için kılavuz arıyorsanız, [Substrate/Polkadot'a özel hızlı başlangıç ​​kılavuzunu okuyabilirsiniz](./quickstart-polkadot).**

Bu kılavuzun sonunda, verileri sorguyabileceğiniz bir GraphQL uç noktasına sahip bir SubQuery düğümünde çalışan çalışan bir SubQuery projeniz olacaktır.

Henüz yapmadıysanız, SubQuery'de kullanılan [terminology](../#terminology) hakkında bilgi sahibi > öneririz.

**Bu hızlı başlangıç ​​kılavuzunun amacı, tüm Pangolin belirteci _Onayla_ olaylarını dizine eklemektir, yalnızca 10-15 dakika sürmelidir**

## Hazırlık

### Yerel Kalkınma Ortamı

- [Node](https://nodejs.org/en/): Node.js'nin modern (ör. LTS sürümü) kurulumu.
- [Docker](https://docker.com/): Bu eğitimde gerekli Docker kullanılacak

### SubQuery CLI'sını yükleme

NPM kullanarak Terminalinize SubQuery CLI'yi genel olarak yükleyin:

```shell
# NPM
npm install -g @subql/cli
```

Kötü bağımlılık yönetimi nedeniyle, `@subql/cli` kurulumu için `yarn global` kullanımını **DESTEK ETMEDİĞİMİZ** unutmayın. satırdaki hatalar.

Daha sonra CLI tarafından sunulan kullanılabilir komutları ve kullanımı görmek için yardım çalıştırabilirsiniz

```shell
subql help
```

## Başlangıç SubQuery Projesini Başlatma

Bir SubQuery projesi oluşturmak istediğiniz dizinin içinde, başlamak için aşağıdaki komutu çalıştırmanız yeterlidir.

```shell
subql init
```

SubQuery projesi initalised olarak size bazı sorular sorulana olacaktır:

- Project Name: A name for your SubQuery project
- Ağ Ailesi: Bu SubQuery projesinin dizine eklemek için geliştirileceği katman-1 blok zinciri ağ ailesi, seçenekler arasından seçim yapmak için klavyenizdeki ok tuşlarını kullanın, bu kılavuz için _"Avalanche"_ kullanacağız
- Ağ: Bu SubQuery projesinin dizine eklemek için geliştirileceği belirli ağ, seçenekler arasından seçim yapmak için klavyenizdeki ok tuşlarını kullanın, bu kılavuz için _"Avalanche"_ kullanacağız
- Şablon: Geliştirmeye başlamak için bir başlangıç ​​noktası sağlayacak bir SubQuery proje şablonu seçin, _"Başlangıç ​​projesi"_ öğesini seçmenizi öneririz
- Git deposu (İsteğe Bağlı): Bu SubQuery projesinin barındırılacağı bir depoya Git URL'si sağlayın (SubQuery Gezgini'nde barındırıldığında)
- RPC uç noktası (Gerekli): Bu proje için varsayılan olarak kullanılacak çalışan bir RPC uç noktasına wss URL'si sağlayın. Bu RPC düğümü bir arşiv düğümü olmalıdır (tam zincir durumuna sahip). Bu kılavuz için _"avalanche.api.onfinality.io"_ varsayılan değerini kullanacağız
- Yazarlar (Zorunlu): Bu SubQuery projesinin sahibini buraya girin (örn. adınız!)
- Açıklama (İsteğe Bağlı): Projeniz hakkında hangi verileri içerdiğini ve kullanıcıların bu verilerle neler yapabileceğini açıklayan kısa bir paragraf sağlayabilirsiniz
- Sürüm (Gerekli): Özel bir sürüm numarası girin veya varsayılanı kullanın (`1.0.0`)
- Lisans (Gerekli): Bu proje için yazılım lisansını sağlayın veya varsayılanı kabul edin (`Apache-2.0`)

Başlatma işlemi tamamlandıktan sonra, dizin içinde proje adınızın oluşturulduğu bir klasör görmeniz gerekir. Bu directoy'un içeriği [Directory Structure](../create/introduction.md#directory-structure) listelenenlerle aynı olmalıdır.

Son olarak, proje dizini altında, yeni projenin bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. Esas olarak aşağıdaki dosyalar üzerinde çalışacaksınız:

1. The GraphQL Schema in `schema.graphql`
2. `project.yaml` içindeki Proje Manifestosu
3. `src/mappings/` dizinindeki Eşleme işlevleri

Bu hızlı başlangıç ​​kılavuzunun amacı, standart başlangıç ​​projesini tüm Pangolin `Onay` olaylarını dizine alacak şekilde uyarlamaktır.

### GraphQL Şema Dosyanızı Güncelleme

`schema.graphql` dosyası çeşitli GraphQL şemalarını tanımlar. GraphQL sorgu dilinin çalışma biçimi nedeniyle, şema dosyası temel olarak verilerinizin şeklini SubQuery'den belirler. Başlamak için harika bir yer çünkü nihai hedefinizi önceden tanımlamanıza izin veriyor.

Mevcut tüm varlıkları kaldırmak için `schema.graphql` dosyasını güncelleyeceğiz ve aşağıdaki gibi okuyacağız

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNumber: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```

**Önemli: Şema dosyasında herhangi bir değişiklik yaptığınızda, lütfen türler dizininizi yeniden oluşturduğunuzdan emin olun. Bunu şimdi yap.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. `schema.graphql` dosyası hakkında daha fazla bilgi için, [Build/GraphQL Schema](../build/graphql.md) altındaki belgelerimize bakın

### Proje Bildirim Dosyasını Güncelleme

Proje Bildirimi (`project.yaml`) dosyası projenizin bir giriş noktası olarak görülebilir ve SubQuery'nin zincir verilerini nasıl indeksleyip dönüştüreceğiyle ilgili ayrıntıların çoğunu tanımlar.

Bildirim dosyasında zaten doğru bir şekilde kurulduğundan çok fazla değişiklik yapmayacağız, ancak işleyicilerimizi değiştirmemiz gerekiyor. Tüm Pangolin onay olaylarını dizine eklemeyi planladığımızı unutmayın, sonuç olarak aşağıdakileri okumak için `veri kaynakları` bölümünü güncellememiz gerekiyor.

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

Bu, [Pangolin sözleşmesinden](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1) yapılan herhangi bir işlemde her `onay` günlüğü olduğunda bir `handleLog` eşleme işlevi çalıştıracağımız anlamına gelir.

Proje Bildirimi (`project.yaml`) dosyası hakkında daha fazla bilgi için, [Yapı/Manifest Dosyası](../build/manifest.md) altındaki belgelerimize bakın

### Eşleme İşlevi Ekle

Eşleme işlevleri, zincir verilerinin daha önce `schema.graphql` dosyasında tanımladığımız optimize edilmiş GraphQL varlıklarına nasıl dönüştürüleceğini tanımlar.

`src/mappings` dizinindeki varsayılan eşleme işlevine gidin. Dışa aktarılan üç işlev göreceksiniz, `handleBlock`, `handleLog` ve `handleTransaction`. Hem `handleBlock` hem de `handleTransaction` fonksiyonlarını silebilirsiniz, biz sadece `handleLog` fonksiyonu ile ilgileniyoruz.

`handleLog` işlevi, olay daha önce `project.yaml` içinde belirttiğimiz filtrelerle eşleştiğinde olay verilerini alır. Tüm `onay` olaylarını işleyecek ve bunları daha önce oluşturduğumuz GraphQL varlıklarına kaydedecek şekilde güncelleyeceğiz.

`handleLog` işlevini aşağıdaki şekilde güncelleyebilirsiniz (ek içe aktarmalara dikkat edin):

```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```

Bunun yaptığı, yükteki geçiş günlüğü verilerini içeren bir Avalanche Günlüğü almaktır. Bu verileri çıkarırız ve daha sonra `schema.graphql` dosyasında daha önce tanımladığımız yeni bir `PangolinApproval` varlığını başlatırız. Ek bilgiler ekleriz ve ardından yeni varlığı kaydetmek için `.save()` işlevini kullanırız (SubQuery bunu otomatik olarak veritabanına kaydeder).

Eşleme işlevleri hakkında daha fazla bilgi için [Derleme/Eşlemeler](../build/mapping.md) altındaki belgelerimize bakın

### Projeyi Oluşturun

Yeni SubQuery Projenizi çalıştırmak için önce çalışmamızı oluşturmamız gerekiyor. Yapı komutunu projenin kök dizininden çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Bunu yapmanın en kolay yolu Docker kullanmaktır.

Bir SubQuery düğümünün nasıl çalıştırıldığını kontrol eden tüm yapılandırma, bu `docker-compose.yml` dosyasında tanımlanır. Yeni initalised yeni bir proje için burada hiçbir şeyi değiştirmenize gerek kalmayacak, ancak dosya ve ayarlar hakkında daha fazla bilgiyi [Run a Project section](../run_publish/run.md)

Proje dizini altında aşağıdaki komutu çalıştırın:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Burada sabırlı olun.

### Projenizi Sorgulama

Tarayıcınızı açın ve [http://localhost:3000](http://localhost:3000) gidin.

Explorer'da ve sorguya hazır şemalarda bir GraphQL oyun alanının görüntü olduğunu görmeniz gerekir. Oyun alanının sağ üst kısmında, belge çizimini açacak bir _Docs_ düğmesi bulacaksınız. Bu dokümantasyonlar otomatik olarak oluşturulur ve hangi varlıkları ve yöntemleri sorgulayabileceğinizi bulmanıza yardımcı olur.

Yeni bir SubQuery başlangıç projesi için, nasıl çalıştığını öğrenmek için aşağıdaki sorguyu deneyebilir veya [GraphQL Query dili hakkında daha fazla bilgi ](../run_publish/graphql.md).

```graphql
query {
    pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

### SubQuery Projenizi Yayımlama

SubQuery, yeni projenizi dağıtabileceğiniz zaman ücretsiz bir yönetilen hizmet sağlar. [SubQuery Projelerine](https://project.subquery.network) dağıtabilir ve [Gezgin'i](https://explorer.subquery.network) kullanarak sorgulayabilirsiniz.

[Yeni projenizi SubQuery Projelerinde yayınlamak için kılavuzu okuyun,](../run_publish/publish.md) **IPFS aracılığıyla dağıtmanız gerektiğini unutmayın**.

## Sonraki Adımlar

Tebrikler, artık bLuna'dan veri aktarımı için GraphQL API isteklerini kabul eden yerel olarak çalışan bir SubQuery projeniz var.

Artık temel bir SubQuery projesinin nasıl oluşturulacağına dair bir fikir edindiğinize göre, soru buradan nereye? Kendinize güveniyorsanız, üç temel dosya hakkında daha fazla bilgi edinebilirsiniz. Manifest dosyası, GraphQL şeması ve [Bu belgelerin Oluşturma](../build/introduction.md) bölümü altındaki eşlemeler dosyası.

Aksi takdirde, daha ayrıntılı atölye çalışmaları, eğitimler ve örnek projelerin bulunduğu [Akademi bölümümüze](../academy/academy.md) devam edin. Orada daha gelişmiş değişikliklere bakacağız ve hazır ve açık kaynak projeleri çalıştırarak SubQuery projelerini çalıştırma konusunda daha derine ineceğiz.

Son olarak, projenizi yürütmek ve yayınlamak için daha fazla yol arıyorsanız, [Çalıştır ve Yayınla bölümümüz](../run_publish/run.md), SubQuery projenizi çalıştırmanın tüm yolları ve diğer gelişmiş GraphQL toplama ve abonelik özellikleri hakkında ayrıntılı bilgi sağlar.
