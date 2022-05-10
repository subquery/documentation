# SubQuery Yerel Olarak Çalıştırma

Bu kılavuz, hem dizinleyiciyi hem de sorgu hizmetini içeren altyapınızda yerel bir SubQuery düğümünün nasıl çalıştırılacağı üzerinde çalışır. Kendi SubQuery altyapınızı çalıştırma konusunda endişelenmek istemiyor musunuz? SubQuery, topluluğa ücretsiz olarak [yönetilen barındırılan bir hizmet](https://explorer.subquery.network) sunar. Projenizi [SubQuery Projects](https://project.subquery.network)'a nasıl yükleyebileceğinizi görmek için [yayın kılavuzumuzu izleyin](../run_publish/publish.md).

## Docker'ı kullanma

Alternatif bir çözüm, `>docker-compose.yml` dosyası tarafından tanımlanan <strong>Docker Container</strong> çalıştırmaktır. Yeni başlanmış yeni bir proje için burada hiçbir şeyi değiştirmenize gerek kalmayacak.

Proje dizininin altında aşağıdaki komutu çalıştırın:

```shell
docker-compose pull && docker-compose up
```

Gerekli paketleri ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) ve Postgres) ilk kez indirmek biraz zaman alabilir, ancak yakında çalışan bir SubQuery düğümü görürsünüz.

## Dizinleyici çalıştırma (subql/node)

Gereksinim -leri:

- [Postgres](https://www.postgresql.org/) database (sürüm 12 veya üstü). [SubQuery node](#start-a-local-subquery-node) blok zincirini dizine alırken, çıkarılan veriler harici bir veritabanı örneğinde depolanır.

Bir SubQuery düğümü, SubQuery projesi başına Substrate/Polkadot tabanlı blok zinciri verilerini çıkaran ve bir Postgres veritabanına kaydeden bir uygulamadır.

### Kurma

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

Yüklendikten sonra, aşağıdaki komutla bir düğüm başlatabilirsiniz:


<CodeGroup> </CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Daha fazla şey öğrenmek için her zaman `--help` çalıştırabilirsiniz.

#### Yerel proje yolunun göster

<CodeGroup> </CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. Bazı durumlarda, dizine ekleme performansında 10 kata kadar artışlar gördük.

Tam zincir sözlüğü, belirli zincir içindeki tüm olayların ve dışsal öğelerin konumunu önceden endeksler ve düğüm hizmetinizin, dizin oluştururken her bloğu incelemek yerine ilgili konumlara atlamasına olanak tanır.

Sözlük bitiş noktasını `project.yaml` dosyanıza ekleyebilir (bkz. [Manifest File](../create/manifest.md)) veya aşağıdaki komutu kullanarak çalışma zamanında belirtebilirsiniz:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Postgres veritabanınızın yapılandırmasına bağlı olarak (ör. farklı bir veritabanı parolası), lütfen hem dizinleyicinin (`subql/node`) hem de sorgu hizmetinin (`subql/query`) ile bağlantı kurabilir.

#### Yapılandırma dosyası belirtme

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Aşağıdaki örneğe göz atın.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
partiBoyutu:100
localMode:doğru
```

#### Blok getirme toplu iş boyutunu değiştirme

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Dizinleyici zinciri ilk dizine aldığında, tek blokları getirmek performansı önemli ölçüde düşürecektir. Getirilen blok sayısını ayarlamak için toplu iş boyutunu artırmak genel işlem süresini azaltır. Geçerli varsayılan toplu iş boyutu 100'dür.

#### Yerel mod

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. Yerel modele geçiş, varsayılan şemada postgres tabloları `public` oluşturur.

Yerel mod kullanılmazsa, ilk `subquery_` ve karşılık gelen proje tablolarına sahip yeni bir Postgres şeması oluşturulur.

#### Node sağlığı kontrol ediliyor

Çalışan bir SubQuery node düğümünün durumunu denetlemek ve izlemek için kullanabileceğiniz 2 uç nokta vardır.

- Basit bir 200 yanıtı döndürür sistem durumu denetimi uç noktası
- Çalışan SubQuery düğümünüzün ek analizlerini içeren meta veri uç noktası

Bunu SubQuery düğümünüzün temel URL'sine ekleyin. Örneğin `http://localhost:3000/meta` geri dönecektir:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` başarılı olursa HTTP 200 döndürür.

Dizin oluşturucu çalışmıyorsa 500 hatası döndürülür. Bu, genellikle node ilk açılırken görülebilen bir hata mesajıdır.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Eğer yanlış bir URL kullanılırsa, geriye bir 404 bulunamadı hatası döndürülür.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Projenizdeki hataları ayıklayın

Aşağıdaki komutu çalıştırmak için [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) kullanın.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Mesela:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Ardından Chrome geliştirme araçlarını açın, Kaynak > Dosya sistemi menüsüne gidin, projenizi çalışma alanına ekleyin ve hataları ayıklamaya başlayın. Daha fazla bilgi için, kontrol edin [Bir SubQuery projesinde nasıl hata ayıklanır](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Sorgu Hizmeti Çalıştırma (altql/query)

### Kurma

```shell
# NPM
npm install -g @subql/query
```

Lütfen **YAPAMAZ**, zayıf bağımlılık yönetimi nedeniyle `yarn global` kullanımını teşvik ettiğimizi ve bunun da bir hataya yol açabileceğini unutmayın.

### Sorgu Hizmeti Çalıştırma

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Projeyi [initialize the project](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project) proje adıyla aynı olduğundan emin olun. Ayrıca, ortam değişkenlerinin doğru olup olmadığını denetleyin.

SubQuery hizmetini başarıyla çalıştırdikten sonra tarayıcınızı açın ve `http://localhost:3000` gidin. Explorer'da ve sorguya hazır şemada gösterilen bir GraphQL oyun alanı görmeniz gerekir.
