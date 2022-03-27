# コマンドラインフラグ

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

### build

このコマンドは webpack を使って、SubQuery プロジェクトのバンドルを生成するものです。

| オプション         | 説明                                                            |
| ------------------ | --------------------------------------------------------------- | ----------- | ---- | ------------------------- |
| -l, --location     | SubQuery プロジェクトのローカルフォルダ（フォルダにない場合）。 |
| -o, --output       | ビルドの出力フォルダを指定します。例: build-folder              |
| --mode=(production | prod                                                            | development | dev) | [デフォルト: production ] |

- `subql build` では、エクスポートフィールドに追加のエントリポイントを指定できますが、常に自動的に`index.ts` がビルドされます

- エクスポートフィールドを使用するには、@subql/cli v0.19.0 以上を指定する必要があります。

- `exports` フィールドは、文字列型(例えば `"entry": "./src/file.ts"`)にマップしなければならず、そうでなければビルドからは無視されます。

[その他の例](https://doc.subquery.network/create/introduction/#build)

## subql-node

### --help

ヘルプオプションが表示されます。

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

現在のバージョンが表示されます。

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

このフラグを使用して、SubQuery プロジェクトを開始します。

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (非推奨)

このフラグを使用すると、プロジェクトのインスタンスを作成するかのように動作するプロジェクトの名前を指定できます。 新しい名前を指定すると、新しいデータベーススキーマが作成され、ブロック同期がゼロから開始されます。 `--db-schema` は非推奨です

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

これらの様々な構成はすべて .yml または .json ファイルに配置し、config フラグで参照することができます。

subquery_config.yml ファイルのサンプル:

```shell
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

プロジェクトと同じディレクトリにこのファイルを配置します。 次に現在のプロジェクト ディレクトリで次のコマンドを実行します。

```shell
> subql-node -c ./subquery_config.yml
```

### --local (非推奨)

このフラグは、デフォルトの "postgres" スキーマにデフォルトの starter_entity テーブルを作成する、主にデバッグのために使用されます。

```shell
subql-node -f . --local
```

このフラグを一度使用すると、削除しても他のデータベースを指すようにはならないことに注意してください。 別のデータベースに再指定するには、新しいデータベースを作成し、この新しいデータベースにenvの設定を変更する必要があります。 言い換えれば、"export DB_DATABASE=<new_db_here>"を指定するということです。

### --force-clean

このフラグでは、プロジェクト スキーマとテーブルを強制的に再生成します。 プロジェクトの新しい実行がクリーンな状態で動作するように graphql スキーマを繰り返し開発するときに使用するのに役立ちます。 このフラグはインデックスされたすべてのデータも消去されることに注意してください。

### --db-schema

このフラグを使用すると、プロジェクト データベース スキーマの名前を指定できます。 新しい名前を与えると、構成された名前とブロックのインデックスが開始され、新しいデータベーススキーマが作成されます。

```shell
subql-node -f . --db-schema=test2
```

### --unsafe

SubQuery Projects は通常、プロジェクトのアクセス範囲をシステムに制限するために、javascript サンドボックスで実行されます。 Sandbox は、利用可能な javascript のインポートを以下のモジュールに制限します。

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

これによりセキュリティが強化されますが、SubQuery の利用可能な機能が制限されていることを理解してください。 `--unsafe` コマンドはすべてのデフォルトの javascript モジュールをインポートします。これによりセキュリティのトレードオフが大きくなり、Sandbox 機能が大幅に向上します。

**`--unsafe` コマンドを使用すると、SubQuery Network でプロジェクトを実行できなくなることに注意してください。このコマンドを SubQuery のマネージド サービス ([project.subquery.network](https://project.subquery.network)) でプロジェクトと共に実行したい場合は、サポートに連絡する必要があります。**

### --batch-size

このフラグでは、コマンドラインでバッチサイズを設定できます。 バッチサイズを設定ファイルに設定されている場合、これが優先されます。

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

メモリ使用量でブロックのバッチサイズを調整する

### --timeout

ブロックマッピング関数がタイムアウト例外をスローする前に、javascript Sandbox がブロックを介してマッピング関数を実行するようにカスタムタイムアウトを設定します

### --debug

これにより、デバッグ情報がコンソールに出力され、強制的にログレベルが debug に設定されます。

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

プロファイラ情報を表示します。

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

このフラグにより、ユーザはマニフェストファイルからネットワークエンドポイントの設定を上書きできます。

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

マニフェストファイルにも設定する必要があることに注意してください。それ以外の場合は、以下が表示されます:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

ターミナル出力には 2 つの異なるフォーマットがあります。 JSON またはカラー。 カラーはデフォルトで、色付きテキストが含まれています。

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

7 つのオプションから選べます。 “fatal”、“error”、“warn”、“info”、“debug”、“trace”、“silent”。 以下の例は"silent"です。 ターミナルには何も表示されないので、ノードが動作しているかどうかを確認するには、データベースの行数を問い合わせるか (select count(\*) from subquery_1.starter_entities) 、ブロックの高さを問い合わせるしかありません。

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

デフォルトでは true です。 false に設定されている場合:

```shell
> subql-node -f . –timestamp-field=false
```

これにより、starter_entities テーブルの created_at および updated_at カラムが削除されます。

### -d, --network-dictionary

これは、[https://explorer.subquery.network/](https://explorer.subquery.network/)（ディクショナリを検索）で提供され、ホストされている無料のサービスであるディクショナリのエンドポイントを指定することができ、https://api.subquery.network/sq/subquery/dictionary-polkadot のAPIエンドポイントを提示します。

通常、これはマニフェストファイルに設定されますが、以下はコマンドラインの引数として使用する例です。

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[SubQuery Dictionary の仕組みについて](../academy/tutorials_examples/dictionary.md)

### -p, --port

SubQuery のインデックスサービスがバインドするポート。 デフォルトでは `3000`に設定されています

## subql-query

### --help

ヘルプオプションが表示されます。

```shell
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        Project name                             [string] [required]
      --playground  Enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path    Path to create log file e.g ./src/name.log          [string]
      --log-rotate  Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer     Url that allows query to access indexer metadata    [string]
      --unsafe      Disable limits on query depth and allowable number returned
                    query records                                      [boolean]
  -p, --port        The port the service will bind to                   [number
```

### --version

現在のバージョンが表示されます。

```shell
> subql-query --version
0.7.0
```

### -n, --name

このフラグはクエリサービスを開始するために使用されます。 インデクサーの実行時に --subquery-name フラグが指定されていない場合、ここでの名前はデフォルトのプロジェクト名を参照します。 --subquery-name が設定されている場合、ここに設定されている名前と一致する必要があります。

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

このフラグは graphql のプレイグラウンドを有効にするもので、デフォルトでは常に含まれているべきです。

### --output-fmt

[--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)を参照

### --log-level

[--log-level](https://doc.subquery.network/run_publish/references.html#log-level)を参照

### --log-path

ログのファイルパスを指定することで、ファイルのログを有効にします

### --log-rotate

ログファイルのローテーションを有効にします。ローテーション間隔は1日、最大7ファイル、最大ファイルサイズは1GB。

### --indexer

インデクサーのエンドポイントの場所のためのカスタム URL を設定します。クエリーサービスはインデクサーの健全性、メタデータ、および準備状態のためにこれらのエンドポイントを使用します。

### --unsafe

クエリサービスでは、無制限の graphql クエリに対して 100 個という制限を設けています。 unsafe フラグは、クエリサービスにパフォーマンスの問題を引き起こす可能性のあるこの制限を取り除きます。 代わりに、[paginated](https://graphql.org/learn/pagination/) にすることをお勧めします。

このフラグは、sum、max、avg、 [その他](https://github.com/graphile/pg-aggregates#aggregates) を含む特定の集約関数を有効にするためにも使用できます。

エンティティ制限のため、これらはデフォルトで無効にされています。

**`--unsafe` コマンドを使用すると、SubQuery Network でプロジェクトを実行できなくなることに注意してください。このコマンドを SubQuery の管理サービス [project.subquery.network](https://project.subquery.network) でプロジェクトと共に実行したい場合は、サポートに連絡する必要があります。**

### --port

SubQuery クエリサービスのポートがバインドされます。 デフォルトでは `3000`に設定されています
