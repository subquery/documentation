# Komut Satırı Bayrakları

## subql-node

### --help

Bu yardım seçeneklerini gösterir.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project                [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                             [boolean]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. will
                            log seviyesini debug için zorla ayarla
                                                      [boolean] [default: false]
      --profiler            Profil oluşturucu bilgilerini konsol çıktısına göster
                                                      [boolean] [default: false]
      --network-endpoint    Bağlanacak blok zinciri ağ uç noktası      [string]
      --output-fmt          Log’u json veya düz metin olarak yazdır
                                           [string] [choices: "json", "colored"]
      --log-level           Yazdıracak log seviyesini belirt. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                       [boolean] [default: true]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
```

### --version

Bu geçerli sürümü görüntüler.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

SubQuery projesini başlatmak için bu bayrağı kullanın.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name

Bu bayrak, projeniz için, projenizin bir örneğini oluşturuyormuş gibi davranan bir ad sağlamanıza olanak verir. Yeni bir ad sağladıktan sonra, yeni bir veritabanı şeması oluşturulur ve blok eşitleme sıfırdan başlar.

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Bu farklı yapılandırmaların tümü bir.yml veya.json dosyasına yerleştirilebilir ve daha sonra yapılandırma bayrağı kullanılarak başvurulabilir.

Örnek subquery_config.yml dosyası:

```shell
subquery: . // Mandatory. Bu projenin yerel yoludur. Buradaki nokta, geçerli yerel dizin anlamına gelir.
subqueryName: hello // İsteğe bağlı ad
batchSize: 55 // İsteğe bağlı yapılandırma
```

Bu dosyayı projeyle aynı dizine yerleştirin. Ardından geçerli proje dizininde çalıştırın:

```shell
> subql-node -c ./subquery_config.yml
```

### --local

Bu bayrak, öncelikle hata ayıklama amacıyla kullanılan varsayılan "postgres" şemasında varsayılan starter_entity tablosunu oluşturur.

```shell
subql-node -f . --local
```

Bu bayrağı kullandıktan sonra kaldırmak, başka bir veritabanına işaret edeceği anlamına gelmez. Başka bir veritabanına yeniden atamak için YENİ bir veritabanı oluşturmanız ve env ayarlarını bu yeni veritabanıyla değiştirmeniz gerekir. Diğer bir deyişle, "export DB_DATABASE=<new_db_here>"

### --force-clean

Bu bayrak, proje şemalarını ve tablolarını yeniden oluşturmaya zorlar. Öyle ki, projenin yeni çalıştırmalarının her zaman temiz bir durumla çalışması gibi, graphql şemalarını yinelemeli olarak geliştirirken yararlıdır. Bu bayrağın aynı zamanda dizine eklenmiş tüm verileri de sileceğini unutmayın.

### --batch-size

Bu bayrak, komut satırında toplu iş boyutunu ayarlamanıza olanak verir. Toplu iş boyutu, yapılandırma dosyasında da ayarlanmışsa, bu emsal teşkil eder.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

Bu, hata ayıklama bilgilerini konsol çıktısına gönderir ve log seviyesini debug işlemi için zorla ayarlar.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Bu profil oluşturucu bilgilerini gösterir.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Bu bayrak, kullanıcıların, manifest dosyasından ağ uç noktası yapılandırmasını geçersiz kılmalarını sağlar.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Bunun manifest dosyasında da ayarlanması gerektiğini unutmayın, aksi takdirde şunlarla karşılaşırsınız:

```shell
Verilen yoldan Subquery projesi oluşturma hatası başarısız oldu! Hata: proje.yaml ayrıştırılamadı.
ProjectManifestImpl örneği doğrulamada başarısız oldu:
  - özellik ağı aşağıdaki kısıtlamalarda başarısız oldu: isObject
  - özellik network.network aşağıdaki kısıtlamalarda başarısız oldu: iç içe Doğrulama
```

### --output-fmt

İki farklı terminal çıkış biçimi bulunmaktadır. JSON veya renkli. Varsayılan renklidir ve renkli metinler içerir.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Aralarından seçim yapabileceğiniz 7 seçenek vardır. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Aşağıdaki örnek silent'i göstermektedir. Terminalde hiçbir şey yazdırılmaz, bu nedenle düğümün çalışıp çalışmadığını öğrenmenin tek yolu veritabanını satır sayısı için sorgulamak (select count(\*) from subquery_1.starter_entities) veya blok yüksekliğini sorgulamaktır.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Lütfen ayrıntı özelliğini kullanın.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

Varsayılan olarak bu true'dur. false olarak ayarlandığında:

```shell
> subql-node -f . –timestamp-field=false
```

Bu, starter_entities tablosundaki created_at ve updated_at sütunları kaldırır.

### -d, --network-dictionary

Bu, belirtilen adreste sağlanan ve barındırılan ücretsiz bir hizmet olan bir sözlük uç noktası belirtmenize olanak tanır: [https://explorer.subquery.network/](https://explorer.subquery.network/) (sözlük için arama) ve şurada belirtilen bir API uç noktası sunar: https://api.subquery.network/sq/subquery/dictionary-polkadot

Genellikle bu manifest dosyanızda ayarlanır, ancak aşağıda komut satırında bağımsız değişken olarak kullanmayla ilgili bir örnek bulunmaktadır.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[SubQuery Sözlüğü'nün nasıl çalıştığı hakkında daha fazla şey öğrenin](../tutorials_examples/dictionary.md).

## subql-query

### --help

Bu yardım seçeneklerini gösterir.

```shell
Seçenekler:
      --help        Yardım'ı göster                                         [boolean]
      --version     Versiyon numarasını göster                                [boolean]
  -n, --name       Proje ismi                             [string] [required]
      --playground   graphql playground etkinleştir                          [boolean]
      --output-fmt  Log'u json veya düz metin olarak yazdır
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Yazdıracak log seviyesini belirt.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer     Sorgunun dizin oluşturucusu meta verilerine erişmesine izin veren Url     [string]
```

### --version

Bu, geçerli sürümü gösterir.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Bu bayrak sorgu hizmetini başlatmak için kullanılır. Dizin oluşturucusunu çalıştırırken --subquery-name bayrağı sağlanmazsa, buradaki ad varsayılan proje adına başvurur. --subquery-name ayarlanırsa, buradaki ad ayarlananmış olanla eşleşmelidir.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // Ad varsayılan olarak proje dizini adı olur
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // adı subql-helloworld projesine hiworld adıyla işaret eder
```

### --playground

Bu bayrak graphql playground’u etkinleştirir, bu nedenle her zaman herhangi bir kullanıma varsayılan olarak dahil edilmelidir.

### --output-fmt

Şuraya göz atın: [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

Şuraya göz atın: [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
