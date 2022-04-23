# Komut Satırı Bayrakları

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     Build this SubQuery project code
  codegen   Generate schemas for graph node
  help      display help for subql
  init      Initialize a scaffold subquery project
  migrate   Migrate Subquery project manifest v0.0.1 to v0.2.0
  publish   Upload this SubQuery project to IPFS
  validate  Check a folder or github repo is a validate subquery project
```

### oluştur

Bu komut, bir subquery projesi paketi oluşturmak için web paketini kullanır.

| Seçenekler         | Açıklama                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | subquery projesinin yerel klasörü (zaten klasörde değilse)                                                 |
| -o, --output       | derlemenin çıktı klasörünü belirtin, ör. yapı klasörü                                                      |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- `subql build` ile, her zaman oluşturacak olmasına rağmen, dışa aktarma alanında ek giriş noktaları belirtebilirsiniz. `index.ts ` otomatik olarak

- Dışa aktarma alanını kullanmak için @subql/cli v0.19.0 veya üzeri bir sürüme sahip olmanız gerekir.

- Herhangi bir `dışa aktarma` alanı, dize türüyle eşleşmelidir (ör. `"giriş": "./src/file.ts"`), aksi takdirde derleme sırasında yoksayılır.

[Daha fazla örnek](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Bu yardım seçeneklerini gösterir.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project   [deprecated] [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                [deprecated] [boolean]
      --force-clean         Force clean the database, dropping project schemas
                            and tables                                 [boolean]
      --db-schema           Db schema name of the project               [string]
      --unsafe              Allows usage of any built-in module within the
                            sandbox                    [boolean][default: false]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --scale-batch-size    scale batch size based on memory usage
                                                      [boolean] [default: false]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --subscription        Enable subscription       [boolean] [default: false]                                                     
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                      [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
```

### --version

Bu, geçerli sürümü gösterir.

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

### --subquery-name (deprecated)

Bu bayrak, projeniz için, projenizin bir örneğini oluşturuyormuş gibi davranan bir ad sağlamanıza olanak verir. Yeni bir ad sağladıktan sonra, yeni bir veritabanı şeması oluşturulur ve blok eşitleme sıfırdan başlar. `--db-schema` lehine kullanımdan kaldırıldı

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

### Duvarcılık (kullanımdan kaldırıldı)

Bu bayrak, öncelikle hata ayıklama amacıyla kullanılan varsayılan "postgres" şemasında varsayılan starter_entity tablosunu oluşturur.

```shell
subql-node -f . --local
```

Bu bayrağı kullandıktan sonra kaldırmak, başka bir veritabanına işaret edeceği anlamına gelmez. Başka bir veritabanına yeniden atamak için YENİ bir veritabanı oluşturmanız ve env ayarlarını bu yeni veritabanıyla değiştirmeniz gerekir. Diğer bir deyişle, "export DB_DATABASE=<new_db_here>"

### --force-clean

Bu bayrak, proje şemalarını ve tablolarını yeniden oluşturmaya zorlar. Öyle ki, projenin yeni çalıştırmalarının her zaman temiz bir durumla çalışması gibi, graphql şemalarını yinelemeli olarak geliştirirken yararlıdır. Bu bayrağın aynı zamanda dizine eklenmiş tüm verileri de sileceğini unutmayın.

### --db-schema

Bu bayrak, proje veritabanı şeması için bir ad vermenizi sağlar. Yeni bir isim sağlandığında, konfigüre edilen isim ile yeni bir veritabanı şeması oluşturulur ve blok indeksleme başlar.

```shell
subql-node -f . --db-schema=test2
```

### --abonelik
Bu, varlık üzerinde bir bildirim tetikleyicisi oluşturacaktır, bu aynı zamanda sorgu hizmetinde abonelik özelliğini etkinleştirmek için ön koşuldur.

### güvensiz

SubQuery Projeleri, projenin sisteminize erişiminin kapsamını sınırlamak için güvenlik için genellikle bir javascript sanal alanında çalıştırılır. Korumalı alan, mevcut javascript içe aktarmalarını aşağıdaki modüllerle sınırlar:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Bu güvenliği artırsa da, bunun SubQuerynuzun kullanılabilir işlevselliğini sınırladığını anlıyoruz. `--unsafe` komutu, azaltılmış güvenlik dengesiyle korumalı alan işlevselliğini büyük ölçüde artıran tüm varsayılan javascript modüllerini içe aktarır.

**Bu not `--unsafe` komut, projenizin alt Sorgu Ağında çalıştırılmasını engeller ve bu komutun projenizle alt sorgunun yönetilen hizmetinde çalıştırılmasını istiyorsanız desteğe başvurmanız gerekir ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Bu bayrak, komut satırında toplu iş boyutunu ayarlamanıza olanak verir. Toplu iş boyutu, yapılandırma dosyasında da ayarlanmışsa, bu emsal teşkil eder.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Blok getirme toplu boyutunu bellek kullanımıyla ölçeklendirin

### --timeout

Blok eşleme işlevi bir zaman aşımı istisnası atmadan önce bir blok üzerinde eşleme işlevlerini yürütmek için javascript sanal alanı için özel zaman aşımı ayarlayın

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

[SubQuery Sözlüğünün nasıl çalıştığı hakkında daha fazla bilgi edinin](../academy/tutorials_examples/dictionary.md).

### -p, --port

Alt sorgu dizin oluşturma hizmetinin bağlandığı bağlantı noktası. Varsayılan olarak bu, `3000` olarak ayarlanmıştır

## subql-query

### --help

Bu yardım seçeneklerini gösterir.

```shell
Options:
      --help          Show help                                          [boolean]
      --version       Show version number                                [boolean]
  -n, --name          Project name                             [string] [required]
      --playground    Enable graphql playground                          [boolean]
      --subscription  Enable subscription               [boolean] [default: false]   
      --output-fmt    Print log as json or plain text
                        [string] [choices: "json", "colored"] [default: "colored"]
      --log-level     Specify log level to print.
            [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [default: "info"]
      --log-path      Path to create log file e.g ./src/name.log          [string]
      --log-rotate    Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer       Url that allows query to access indexer metadata    [string]
      --unsafe        Disable limits on query depth and allowable number returned
                      query records                                      [boolean]
  -p, --port          The port the service will bind to                   [number]
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

Şuraya göz atın: [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

Şuraya göz atın: [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Oturum açmak için bir dosyanın yolunu sağlayarak dosya günlüğünü etkinleştirin

### --log-rotate

1d dönüş aralığı, maksimum 7 dosya ve maksimum 1 Gb dosya boyutu seçenekleriyle dosya günlüğü döndürmelerini etkinleştirin

### --indexer

Dizin oluşturucunun uç noktalarının konumu için özel bir url ayarlayın, sorgu hizmeti bu uç noktaları dizin oluşturucu sağlığı, meta veriler ve hazır olma durumu için kullanır

### --abonelik

Bu işaret, [GraphQL Aboneliklerini](./subscription.md) etkinleştirir, bu özelliği etkinleştirmek için `subql-node` gerektirir ayrıca `--aboneliği etkinleştirir`

### güvensiz

Sorgu hizmetinin, sınırsız graphql sorguları için 100 varlık sınırı vardır. Güvenli olmayan bayrak, sorgu hizmetinde performans sorunlarına neden olabilecek bu sınırı kaldırır. Bunun yerine sorguların [sayfalandırılması](https://graphql.org/learn/pagination/) önerilir.

Bu bayrak, toplam, maksimum, ortalama ve diğerleri dahil olmak üzere belirli toplama işlevlerini etkinleştirir. Bu özellikle ilgili daha fazla bilgiyi [buradan okuyun](./aggregate.md)

Bunlar, varlık sınırı nedeniyle varsayılan olarak devre dışıdır.

**Bu not `--unsafe` komut, projenizin alt Sorgu Ağında çalıştırılmasını engeller ve bu komutun projenizle alt sorgunun yönetilen hizmetinde çalıştırılmasını istiyorsanız desteğe başvurmanız gerekir ([project.subquery.network](https://project.subquery.network).**

### --port

Alt sorgu dizin oluşturma hizmetinin bağlandığı bağlantı noktası. Varsayılan olarak bu, `3000` olarak ayarlanmıştır
