# IPFS kullanarak Proje Barındırma

Bu kılavuz, yerel bir Subquery projesinin [IPFS](https://ipfs.io/)'de nasıl yayınlanacağını ve barındırma altyapımıza nasıl dağıtılacağını açıklamaktadır.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Gereksinimler

- `@subql/cli` sürüm 0.21.0 veya üzeri.
- Manifest `specVersion 0.2.0` ve üstü.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Dağıtımınızın başarılı olduğundan emin olmak için projenizi `subql build` komutuyla oluşturmanızı ve yayınlamadan önce yerel olarak test etmenizi şiddetle öneririz.

## SUBQL_ACCESS_TOKEN'inizi hazırlayın

- Adım 1: [SubQuery Projeleri'ne](https://project.subquery.network/) gidin ve oturum açın.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Adım 3: Oluşturulan tokenu kopyalayın.
- Adım 4: Bu tokenu kullanmak için:
  - Seçenek 1: Ortam değişkenlerinize SUBQL_ACCESS_TOKEN ekleyin. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - 2. Seçenek: Yakında, `subql/cli`, SUBQL_ACCESS_TOKEN'inizin yerel olarak depolanmasını destekleyecektir.

## Bir proje nasıl yayınlanır

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Projenizin kök dizininden yayınlayın
subql yayınla

// VEYA proje kökünüzü işaret edin
subql yayınla -f ~/projem/
```

### Option 2

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

Lütfen bu `CID` not edin. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named  `.project-cid`.

## IPFS Dağıtımı

IPFS dağıtımı, merkezi olmayan bir ağ üzerinde bir SubQuery projesinin bağımsız ve benzersiz bir varlığını temsil eder. Bu nedenle, projedeki kodda yapılacak herhangi bir değişiklik, projenin benzersizliğini etkileyecektir. İş mantığınızı ayarlamanız gerekirse, ör. eşleme işlevini değiştirin, projeyi yeniden yayınlamalısınız ve `CID` değişecektir.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

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

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Ardından üretim yuvanızı seçin, IPFS dağıtım CID'nizi kopyalayıp yapıştırın (baştaki `ipfs:// ` olmadan).

Önizleme bölümünde IPFS dağıtımını görmelisiniz. Ve ağı, sözlük uç noktalarını vb. seçebilirsiniz.

Barındırılan hizmetimizde IPFS dağıtımını başarıyla dağıttıktan sonra, SubQuery Gezgini'nde görüntülenebilir olmalıdır, sorgu hizmetine tıpkı yerel olarak yaptığınız gibi erişebilirsiniz.
