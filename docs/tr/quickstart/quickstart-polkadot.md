# Polkadot Hızlı Başlangıç

Bu Hızlı başlangıç ​​kılavuzunda, basit bir Substrate/Polkadot başlangıç ​​projesiyle başlayacağız ve ardından bazı gerçek gerçek verileri indeksleyerek bitireceğiz. Bu, kendi Substrate/Polkadot SubQuery Projenizi geliştirirken başlamak için mükemmel bir temeldir.

Bu kılavuzun sonunda, verileri sorguyabileceğiniz bir GraphQL uç noktasına sahip bir SubQuery düğümünde çalışan çalışan bir SubQuery projeniz olacaktır.

Henüz yapmadıysanız, SubQuery'de kullanılan [terminology](../#terminology) hakkında bilgi sahibi > öneririz.

**Bu hızlı başlangıç ​​kılavuzunun amacı, standart başlangıç ​​projesini Polkadot'tan tüm transferleri indekslemeye başlayacak şekilde uyarlamaktır, sadece 10-15 dakika sürmelidir**

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

Daha sonra CLI tarafından sunulan kullanılabilir komutları ve kullanımı görmek için yardım çalıştırabilirsiniz:

```shell
subql help
```

## Başlangıç SubQuery Projesini Başlatma

Bir SubQuery projesi oluşturmak istediğiniz dizinin içinde, başlamak için aşağıdaki komutu çalıştırmanız yeterlidir.

```shell
subql init
```

SubQuery projesi initalised olarak size bazı sorular sorulana olacaktır:

- Proje adı: SubQuery projeniz için bir proje adı
- Ağ ailesi: Bu SubQuery projesinin dizine eklemek için geliştirileceği katman-1 blok zinciri ağ ailesi. Mevcut seçenekler arasından seçim yapmak için ok tuşlarını kullanın. Bu kılavuz için *"Substrate"* kullanacağız
- Ağ: Bu SubQuery projesinin dizine eklemek için geliştirileceği belirli ağ. Mevcut seçenekler arasından seçim yapmak için ok tuşlarını kullanın. Bu kılavuz için *"Polkadot"* kullanacağız
- Şablon: Geliştirmeye başlamak için bir başlangıç ​​noktası sağlayacak bir SubQuery proje şablonu seçin. *"subql-starter"* projesini seçmenizi öneririz.
- RPC uç noktası: Bu proje için varsayılan olarak kullanılacak çalışan bir RPC uç noktasına wss URL'si sağlayın. Farklı Polkadot ağları için genel uç noktalara hızlı bir şekilde erişebilir veya hatta [OnFinality](https://app.onfinality.io) kullanarak kendi özel özel düğümünüzü oluşturabilir veya yalnızca varsayılan Polkadot uç noktasını kullanabilirsiniz. Bu RPC düğümü bir arşiv düğümü olmalıdır (tam zincir durumuna sahip). Bu kılavuz için *"https://polkadot.api.onfinality.io"* varsayılan değerini kullanacağız
- Git deposu: Bu SubQuery projesinin barındırılacağı bir depoya Git URL'si sağlayın (SubQuery Gezgini'nde barındırıldığında).
- Yazarlar: Bu SubQuery projesinin sahibini buraya girin (örneğin adınız!) veya sağlanan varsayılanı kabul edin.
- Açıklama: Projeniz hakkında hangi verileri içerdiğini ve kullanıcıların bunlarla neler yapabileceğini açıklayan kısa bir paragraf sağlayın veya sağlanan varsayılanı kabul edin.
- Sürüm: Özel bir sürüm numarası girin veya varsayılanı kullanın (`1.0.0`)
- Lisans: Bu proje için yazılım lisansını sağlayın veya varsayılanı kabul edin (`MIT-`)

Başlatma işlemi tamamlandıktan sonra, dizin içinde proje adınızın oluşturulduğu bir klasör görmeniz gerekir. Bu directoy'un içeriği [Directory Structure](../create/introduction.md#directory-structure) listelenenlerle aynı olmalıdır.

Son olarak, proje dizini altında, yeni projenin bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. Bunlar:

`schema.graphql içindeki <li>GraphQL Şeması`</li>
2. `project.yaml` içindeki Proje Manifestosu
3. `src/mappings/` dizinindeki Eşleme işlevleri

Bu hızlı başlangıç ​​kılavuzunun amacı, standart başlangıç ​​projesini Polkadot'tan tüm transferleri indekslemeye başlayacak şekilde uyarlamaktır, sadece - dakika sürmelidir.

### GraphQL Şema Dosyanızı Güncelleme

`schema.graphql` dosyası çeşitli GraphQL şemalarını tanımlar. GraphQL sorgu dilinin çalışma biçimi nedeniyle, şema dosyası temel olarak verilerinizin şeklini SubQuery'den belirler. Başlamak için harika bir yer çünkü nihai hedefinizi önceden tanımlamanıza izin veriyor.

`schema.graphql` dosyasını aşağıdaki gibi okunacak şekilde güncelleyeceğiz:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # Transferin yapıldığı hesap
  için: Dize! # The account that transfers are made to
}
```

**Önemli: Şema dosyasında herhangi bir değişiklik yaptığınızda, lütfen türler dizininizi yeniden oluşturduğunuzdan emin olun.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. `schema.graphql` dosyası hakkında daha fazla bilgi için, [Build/GraphQL Schema](../build/graphql.md) altındaki belgelerimize bakın

### Proje Bildirim Dosyasını Güncelleme

Proje Bildirimi (`project.yaml`) dosyası projenizin bir giriş noktası olarak görülebilir ve SubQuery'nin zincir verilerini nasıl indeksleyip dönüştüreceğiyle ilgili ayrıntıların çoğunu tanımlar.

Bildirim dosyası zaten doğru bir şekilde kuruldu, ancak işleyicilerimizi değiştirmemiz gerekiyor. Tüm Polkadot transferlerini indekslemeyi planladığımızı unutmayın, sonuç olarak aşağıdakileri okumak için `veri kaynakları` bölümünü güncellememiz gerekiyor:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

Bu, her `balances.Transfer` olayı olduğunda bir `handleEvent` eşleme işlevi çalıştıracağımız anlamına gelir.

Proje Bildirimi (`project.yaml`) dosyası hakkında daha fazla bilgi için, [Yapı/Manifest Dosyası](../build/manifest.md) altındaki belgelerimize bakın

### Eşleme İşlevi Ekle

Eşleme işlevleri, zincir verilerinin daha önce `schema.graphql` dosyasında tanımladığımız optimize edilmiş GraphQL varlıklarına nasıl dönüştürüleceğini tanımlar.

`src/mappings` dizinindeki varsayılan eşleme işlevine gidin. Dışa aktarılan üç işlev göreceksiniz, `handleBlock`, `handleEvent` ve `handleCall`. Hem `handleBlock` hem de `handleCall` işlevlerini silebilirsiniz, biz sadece `handleEvent` işleviyle ilgileniyoruz.

`handleEvent` işlevi, olay daha önce `project.yaml` içinde belirttiğimiz filtrelerle eşleştiğinde olay verilerini alır. Tüm `balances.Transfer` olaylarını işleyecek ve daha önce oluşturduğumuz GraphQL varlıklarına kaydedecek şekilde güncelleyeceğiz.

`handleEvent` işlevini aşağıdaki şekilde güncelleyebilirsiniz (ek içe aktarmalara dikkat edin):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

Bunun yaptığı, yükteki aktarım verilerini içeren bir SubstrateEvent almaktır. Bu verileri çıkarırız ve daha sonra `schema.graphql` dosyasında daha önce tanımladığımız yeni bir `Transfer` varlığını başlatırız. Ek bilgiler ekleriz ve ardından yeni varlığı kaydetmek için `.save()` işlevini kullanırız (SubQuery bunu otomatik olarak veritabanına kaydeder).

Eşleme işlevleri hakkında daha fazla bilgi için [Derleme/Eşlemeler](../build/mapping.md) altındaki belgelerimize bakın

### Projeyi Oluşturun

Yeni SubQuery Projenizi çalıştırmak için önce çalışmamızı oluşturmamız gerekiyor. Yapı komutunu projenin kök dizininden çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Bunu yapmanın en kolay yolu Docker kullanmaktır.

Bir SubQuery düğümünün nasıl çalıştırıldığını kontrol eden tüm yapılandırma, bu `docker-compose.yml` dosyasında tanımlanır. Yeni initalised yeni bir proje için burada hiçbir şeyi değiştirmenize gerek kalmayacak, ancak dosya ve ayarlar hakkında daha fazla bilgiyi [Run a Project section](../run_publish/run.md).

Proje dizininin altında aşağıdaki komutu çalıştırın:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Projenizi Sorgulama

Tarayıcınızı açın ve [http://localhost:3000](http://localhost:3000) gidin.

Explorer'da ve sorguya hazır şemalarda bir GraphQL oyun alanının görüntü olduğunu görmeniz gerekir. Oyun alanının sağ üst kısmında, belge çizimini açacak bir _Docs_ düğmesi bulacaksınız. Bu dokümantasyonlar otomatik olarak oluşturulur ve hangi varlıkları ve yöntemleri sorgulayabileceğinizi bulmanıza yardımcı olur.

Yeni bir SubQuery başlangıç ​​projesi için, nasıl çalıştığını anlamak veya [GraphQL Sorgu dili](../run_publish/graphql.md) hakkında daha fazla bilgi edinmek için aşağıdaki sorguyu deneyin.

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### SubQuery Projenizi Yayımlama

SubQuery, yeni projenizi dağıtabileceğiniz zaman ücretsiz bir yönetilen hizmet sağlar. [SubQuery Projelerine](https://project.subquery.network) dağıtabilir ve [Gezgin'i](https://explorer.subquery.network) kullanarak sorgulayabilirsiniz.

[Yeni projenizi SubQuery Projelerinde yayınlama kılavuzunu okuyun](../run_publish/publish.md)

## Sonraki Adımlar

Tebrikler, artık örnek veriler için GraphQL API isteklerini kabul eden yerel olarak çalışan bir SubQuery projeniz var.

Artık temel bir SubQuery projesinin nasıl oluşturulacağına dair bir fikir edindiğinize göre, soru buradan nereye? Kendinize güveniyorsanız, üç temel dosya hakkında daha fazla bilgi edinebilirsiniz. Manifest dosyası, GraphQL şeması ve [Bu belgelerin Oluşturma](../build/introduction.md) bölümü altındaki eşlemeler dosyası.

Aksi takdirde, daha ayrıntılı atölye çalışmaları, eğitimler ve örnek projelerin bulunduğu [Akademi bölümümüze](../academy/academy.md) devam edin. Orada daha gelişmiş değişikliklere bakacağız ve hazır ve açık kaynak projeleri çalıştırarak SubQuery projelerini çalıştırma konusunda daha derine ineceğiz.

Son olarak, projenizi yürütmek ve yayınlamak için daha fazla yol arıyorsanız, [Çalıştır ve Yayınla bölümümüz](../run_publish/run.md), SubQuery projenizi çalıştırmanın tüm yolları ve diğer gelişmiş GraphQL toplama ve abonelik özellikleri hakkında ayrıntılı bilgi sağlar.
