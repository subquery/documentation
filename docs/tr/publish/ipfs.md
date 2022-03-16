# IPFS kullanarak Proje Barındırma

Bu kılavuz, yerel bir Subquery projesinin [IPFS](https://ipfs.io/)'de nasıl yayınlanacağını ve barındırma altyapımıza nasıl dağıtılacağını açıklamaktadır.

IPFS'de bir projeye ev sahipliği yapmak, onu herkes için kullanılabilir hale getirir ve GitHub gibi merkezi hizmetlere olan bağımlılığınızı azaltır.

## Gereksinimler

- `@subql/cli` sürüm 0.21.0 veya üzeri.
- Manifest `specVersion 0.2.0` ve üstü.
- [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token)'ınızı hazırlayın.
- Dağıtımınızın başarılı olduğundan emin olmak için projenizi `subql build` komutuyla oluşturmanızı ve yayınlamadan önce yerel olarak test etmenizi şiddetle öneririz.

## SUBQL_ACCESS_TOKEN'inizi hazırlayın

- Adım 1: [SubQuery Projeleri'ne](https://project.subquery.network/) gidin ve oturum açın.
- 2. Adım: Gezinme menüsünün sağ üst köşesindeki profilinize tıklayın, ardından **_Tokenu Yenile_** seçeneğine tıklayın
- Adım 3: Oluşturulan tokenu kopyalayın.
- Adım 4: Bu tokenu kullanmak için:
  - Seçenek 1: Ortam değişkenlerinize SUBQL_ACCESS_TOKEN ekleyin. `SUBQL_ACCESS_TOKEN İHRAC ET=<token>`
  - 2. Seçenek: Yakında, `subql/cli`, SUBQL_ACCESS_TOKEN'inizin yerel olarak depolanmasını destekleyecektir.

## Bir proje nasıl yayınlanır

Projenizi yayınlamak için iki yöntem sunuyoruz,

### Seçenek 1:

`@subql/cli` zaten kurulu olduğundan, projeyi ve gerekli bilgileri varsayılan bildiriminden `project.yaml` okuyacak olan aşağıdaki komutu çalıştırabilirsiniz

```
// Projenizin kök dizininden yayınlayın
subql yayınla

// VEYA proje kökünüzü işaret edin
subql yayınla -f ~/projem/
```

### Seçenek 2:

Alternatif olarak, projenizin birden çok Manifest dosyası olduğunu, örneğin birden çok ağı desteklediğinizi ancak aynı eşlemeyi ve iş mantığını paylaştığınızı ve aşağıdaki gibi bir proje yapısına sahip olduğunuzu varsayalım:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Projeyi her zaman seçtiğiniz manifest dosyasıyla yayınlayabilirsiniz.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## Yayınladıktan sonra

Projeyi başarıyla yayınladıktan sonra, aşağıdaki günlükler projenin IPFS kümesinde oluşturulduğunu ve `CID`'ini (içerik tanımlayıcısını) döndürdüğünü gösterir.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Lütfen bu `CID` not edin. Bu `CID` ile, yayınlanan projenizi [IPFS Dağıtımı olarak adlandırdığımız şekilde görüntüleyebilirsiniz](#ipfs-deployment)

## IPFS Dağıtımı

IPFS dağıtımı, merkezi olmayan bir ağ üzerinde bir SubQuery projesinin bağımsız ve benzersiz bir varlığını temsil eder. Bu nedenle, projedeki kodda yapılacak herhangi bir değişiklik, projenin benzersizliğini etkileyecektir. İş mantığınızı ayarlamanız gerekirse, ör. eşleme işlevini değiştirin, projeyi yeniden yayınlamalısınız ve `CID` değişecektir.

Şimdilik yayınladığınız projeyi görüntülemek için [Postacı](https://web.postman.co/) gibi bir `REST` api aracı kullanın ve aşağıdaki örnek URL ile geri almak için `POST` yöntemini kullanın. `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

Örnek proje dağıtımını aşağıdaki gibi görmelisiniz:

Bu dağıtım, bildirim dosyanıza çok benziyor. Bu açıklayıcı alanları bekleyebilirsiniz ve ağ ve sözlük uç noktası, proje yürütmenin sonucunu doğrudan etkilemediği için kaldırılmıştır.

Yerel projenizde kullanılan bu dosyalar paketlendi ve IPFS'de de yayınlandı.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## SubQuery projenizi Barındırılan Hizmette çalıştırın

### Dağıtım olmadan Oluşturulan Proje

[SubQuery projenizi yayınlama](publish.md) kılavuzunu takip edebilirsiniz, ancak dağıtım kaynağınızı belirlediğiniz yerde **IPFS**'i seçebilirsiniz.

Ardından üretim yuvanızı seçin, IPFS dağıtım CID'nizi kopyalayıp yapıştırın (baştaki `ipfs:// ` olmadan).

Önizleme bölümünde IPFS dağıtımını görmelisiniz. Ve ağı, sözlük uç noktalarını vb. seçebilirsiniz.

Barındırılan hizmetimizde IPFS dağıtımını başarıyla dağıttıktan sonra, SubQuery Gezgini'nde görüntülenebilir olmalıdır, sorgu hizmetine tıpkı yerel olarak yaptığınız gibi erişebilirsiniz.
