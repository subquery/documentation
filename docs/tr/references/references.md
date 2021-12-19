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
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
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

There are 7 options to choose from. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. The example below shows silent. Nothing will be printed in the terminal so the only way to tell if the node is working or not is to query the database for row count (select count(\*) from subquery_1.starter_entities) or query the block height.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

By default this is true. when set to false with:

```shell
> subql-node -f . –timestamp-field=false
```

This removes the created_at and updated_at columns in the starter_entities table.

### -d, --network-dictionary

This allows you to specify a dictionary endpoint which is a free service that is provided and hosted at: [https://explorer.subquery.network/](https://explorer.subquery.network/) (search for dictionary) and presents an API endpoint of: https://api.subquery.network/sq/subquery/dictionary-polkadot

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Read more about how a SubQuery Dictionary works](../tutorials_examples/dictionary.md).

## subql-query

### --help

Bu yardım seçeneklerini gösterir.

```shell
ns:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        project name                             [string] [required]
      --playground  enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer     Url that allow query to access indexer metadata     [string]
```

### --version

Bu geçerli sürümü görüntüler.

```shell
> subql-query --version
0.7.0
```

### -n, --name

This flag is used to start the query service. If the --subquery-name flag is not provided when running an indexer, the name here will refer to the default project name. If --subquery-name is set, then the name here should match what was set.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

This flag enables the graphql playground so should always be included by default to be of any use.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

See [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
