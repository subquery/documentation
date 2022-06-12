# Terra Hızlı Başlangıç

Bu Hızlı başlangıç ​​kılavuzunda, basit bir Terra başlangıç ​​projesiyle başlayacağız ve ardından bazı gerçek gerçek verileri indeksleyerek bitireceğiz. Bu, kendi SubQuery Projenizi geliştirirken başlamak için mükemmel bir temeldir.

**Substrate/Polkadot için kılavuz arıyorsanız, [Substrate/Polkadot'a özel hızlı başlangıç ​​kılavuzunu okuyabilirsiniz](./quickstart-polkadot).**

Bu kılavuzun sonunda, verileri sorguyabileceğiniz bir GraphQL uç noktasına sahip bir SubQuery düğümünde çalışan çalışan bir SubQuery projeniz olacaktır.

Henüz yapmadıysanız, SubQuery'de kullanılan [terminology](../#terminology) hakkında bilgi sahibi > öneririz.

**Bu hızlı başlangıç ​​kılavuzunun amacı, standart başlangıç ​​projesini Terratan tüm transferleri indekslemeye başlayacak şekilde uyarlamaktır, sadece 10-15 dakika sürmelidir**

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
- Ağ Ailesi: Bu SubQuery projesinin dizine eklemek için geliştirileceği katman-1 blok zinciri ağ ailesi, seçenekler arasından seçim yapmak için klavyenizdeki ok tuşlarını kullanın, bu kılavuz için *"Terra"* kullanacağız
- Ağ: Bu SubQuery projesinin dizine eklemek için geliştirileceği belirli ağ, seçenekler arasından seçim yapmak için klavyenizdeki ok tuşlarını kullanın, bu kılavuz için *"Terra"* kullanacağız
- Şablon: Geliştirmeye başlamak için bir başlangıç ​​noktası sağlayacak bir SubQuery proje şablonu seçin, *"Başlangıç ​​projesi"* öğesini seçmenizi öneririz
- Git deposu (İsteğe Bağlı): Bu SubQuery projesinin barındırılacağı bir depoya Git URL'si sağlayın (SubQuery Gezgini'nde barındırıldığında)
- RPC uç noktası (Gerekli): Bu proje için varsayılan olarak kullanılacak çalışan bir RPC uç noktasına wss URL'si sağlayın. Bu RPC düğümü bir arşiv düğümü olmalıdır (tam zincir durumuna sahip). Bu kılavuz için *"https://terra-columbus-5.beta.api.onfinality.io"* varsayılan değerini kullanacağız
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

Bu hızlı başlangıç ​​kılavuzunun amacı, standart başlangıç ​​projesini tüm transferleri indekslemeye başlayacak şekilde uyarlamaktır, sadece - dakika sürmelidir.

### GraphQL Şema Dosyanızı Güncelleme

`schema.graphql` dosyası çeşitli GraphQL şemalarını tanımlar. GraphQL sorgu dilinin çalışma biçimi nedeniyle, şema dosyası temel olarak verilerinizin şeklini SubQuery'den belirler. Başlamak için harika bir yer çünkü nihai hedefinizi önceden tanımlamanıza izin veriyor.

`schema.graphql` dosyasını aşağıdaki gibi okunacak şekilde güncelleyeceğiz

```graphql
type Transfer @entity {
  id: ID! # kimlik alanı her zaman gereklidir ve böyle görünmelidir
  name: String!
  blockHeight: BigInt # Transferin blok yüksekliği
  gönderen: dize! # Transferin yapıldığı hesap
  alıcı: Dize! # Transferin yapıldığı hesap
  miktar: Dize! # Aktarılan tutar
}
```

**Önemli: Şema dosyasında herhangi bir değişiklik yaptığınızda, lütfen türler dizininizi yeniden oluşturduğunuzdan emin olun. Bunu şimdi yap.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. `schema.graphql` dosyası hakkında daha fazla bilgi için, [Build/GraphQL Schema](../build/graphql.md) altındaki belgelerimize bakın

### Proje Bildirim Dosyasını Güncelleme

Proje Bildirimi (`project.yaml`) dosyası projenizin bir giriş noktası olarak görülebilir ve SubQuery'nin zincir verilerini nasıl indeksleyip dönüştüreceğiyle ilgili ayrıntıların çoğunu tanımlar.

Bildirim dosyasında zaten doğru bir şekilde kurulduğundan çok fazla değişiklik yapmayacağız, ancak işleyicilerimizi değiştirmemiz gerekiyor. Tüm Terra transfer olaylarını dizine eklemeyi planladığımızı unutmayın, sonuç olarak aşağıdakileri okumak için `veri kaynakları` bölümünü güncellememiz gerekiyor.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

Bu, bLuna akıllı sözleşmesinden her `transfer` olayı olduğunda bir `handleEvent` eşleme işlevi çalıştıracağımız anlamına gelir.

Proje Bildirimi (`project.yaml`) dosyası hakkında daha fazla bilgi için, [Yapı/Manifest Dosyası](../build/manifest.md) altındaki belgelerimize bakın

### Eşleme İşlevi Ekle

Eşleme işlevleri, zincir verilerinin daha önce `schema.graphql` dosyasında tanımladığımız optimize edilmiş GraphQL varlıklarına nasıl dönüştürüleceğini tanımlar.

`src/mappings` dizinindeki varsayılan eşleme işlevine gidin. Dışa aktarılan üç işlev göreceksiniz, `handleBlock`, `handleEvent` ve `handleCall`. Hem `handleBlock` hem de `handleCall` işlevlerini silebilirsiniz, biz sadece `handleEvent` işleviyle ilgileniyoruz.

`handleEvent` işlevi, olay daha önce `project.yaml` içinde belirttiğimiz filtrelerle eşleştiğinde olay verilerini alır. Tüm `transfer` olaylarını işleyecek ve bunları daha önce oluşturduğumuz GraphQL varlıklarına kaydedecek şekilde güncelleyeceğiz.

`handleEvent` işlevini aşağıdaki şekilde güncelleyebilirsiniz (ek içe aktarmalara dikkat edin):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));

    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

Bunun yaptığı, yükteki aktarım verilerini içeren bir SubstrateEvent almaktır. Bu verileri çıkarırız ve daha sonra `schema.graphql` dosyasında daha önce tanımladığımız yeni bir `Transfer` varlığını başlatırız. Ek bilgiler ekleriz ve ardından yeni varlığı kaydetmek için `.save()` işlevini kullanırız (SubQuery bunu otomatik olarak veritabanına kaydeder).

Eşleme işlevleri hakkında daha fazla bilgi için [Derleme/Eşlemeler](../build/mapping.md) altındaki belgelerimize bakın

### Projeyi Oluşturun

Yeni SubQuery Projenizi çalıştırmak için önce çalışmamızı oluşturmamız gerekiyor. Yapı komutunu projenin kök dizininden çalıştırın.

<CodeGroup> </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

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
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

### SubQuery Projenizi Yayımlama

SubQuery, yeni projenizi dağıtabileceğiniz zaman ücretsiz bir yönetilen hizmet sağlar. [SubQuery Projelerine](https://project.subquery.network) dağıtabilir ve [Gezgin'i](https://explorer.subquery.network) kullanarak sorgulayabilirsiniz.

[Yeni projenizi SubQuery Projects'te yayınlamak için kılavuzu okuyun](../run_publish/publish.md)

## Sonraki Adımlar

Tebrikler, artık bLuna'dan veri aktarımı için GraphQL API isteklerini kabul eden yerel olarak çalışan bir SubQuery projeniz var.

Artık temel bir SubQuery projesinin nasıl oluşturulacağına dair bir fikir edindiğinize göre, soru buradan nereye? Kendinize güveniyorsanız, üç temel dosya hakkında daha fazla bilgi edinebilirsiniz. Manifest dosyası, GraphQL şeması ve [Bu belgelerin Oluşturma](../build/introduction.md) bölümü altındaki eşlemeler dosyası.

Aksi takdirde, daha ayrıntılı atölye çalışmaları, eğitimler ve örnek projelerin bulunduğu [Akademi bölümümüze](../academy/academy.md) devam edin. Orada daha gelişmiş değişikliklere bakacağız ve hazır ve açık kaynak projeleri çalıştırarak SubQuery projelerini çalıştırma konusunda daha derine ineceğiz.

Son olarak, projenizi yürütmek ve yayınlamak için daha fazla yol arıyorsanız, [Çalıştır ve Yayınla bölümümüz](../run_publish/run.md), SubQuery projenizi çalıştırmanın tüm yolları ve diğer gelişmiş GraphQL toplama ve abonelik özellikleri hakkında ayrıntılı bilgi sağlar.
