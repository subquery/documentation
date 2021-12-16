# 命令行标志

## subql-node

### --help

这将显示帮助选项。

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
                                                       [boolean] [default: true]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false] will forcefully set log level to debug
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
                                                       [boolean] [default: true]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
```

### --version

显示当前版本

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

使用此标志启动Subquery项目。

```shell
subql-node -f . subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name

如果您新建了一个您项目的一个实例，这个标识符将允许您为这个项目提供一个新名称。 在提供一个新名称后，将创建一个新的数据库模式，并从零开始进行块同步。

```shell
subql-node -f . subql-node -f . --subquery-name=test2
```

### -c, --config

所有这些不同的配置都可以放置到 .yml 或 .json 文件中，然后用配置标识符进行引用。

示例subquery_config.yml文件：

```shell
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

将此文件放置在与工程相同的目录中。 然后在当前项目目录中，运行：

```shell
> subql-node -c ./subquery_config.yml
```

### --local

这个标志主要用于调试，在默认的“postgres”模式中创建默认starter_entity 表。

```shell
subql-node -f . --local
```

请注意，一旦您使用此标志，删除它并不意味着它会指向另一个数据库。 要重新指向另一个数据库，您将需要创建一个新的数据库，并将环境设置更改为这个新数据库。 换言之，“export DB_DATABASE=<new_db_here>"

### --force-clean

这个标志迫使重新生成项目计划和表格， 在反复开发图形图解时帮助使用，新运行的项目总是以干净的状态运行。 请注意，此命令符也会清除所有索引数据。

### --batch-size

此命令符将允许您在命令行中设置批量大小。 如果在配置文件中也设置了批量大小，它将采用先例。

```shell
> subql-node -f . > subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

这将输出调试信息到控制台输出，并强制设置日志级别进行调试.

```shell
> subql-node -f . > subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

这将显示分析器信息。

```shell
subql-node -f . subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

此命令符允许用户从清单文件覆盖网络端点配置。

```shell
subql-node -f . --local subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

请注意，这也必须在清单文件中设置，否则您将会得到：

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

有两种不同的终端输出格式。 JSON或者colored。 Colored是默认的，包含着colored文本。

```shell
> subql-node -f . > subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . > subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

有七个选项可供选择： “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. 下面的示例显示silent。 终端中不会打印任何内容，所以，判断节点工作与否的唯一方法是查询数据库中的行数（从subquery_1.starter_entities选择计数（\*)）或者查询区块的高度。

```shell
> subql-node -f . > subql-node -f . --log-level=silent
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
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

默认情况下是正确的。 当设置成false时：

```shell
> subql-node -f . > subql-node -f . –timestamp-field=false
```

这将删除在starter_entities表中的 created_at和updated_at列

### -d, --network-dictionary

这允许您指定一个字典端点，这是一个免费的服务，其在 [https://explorer.subquery etwork/](https://explorer.subquery.network/) (搜索字典) 上提供和托管。并提供了一个 API 端口： https://api.subquery.network/sq/sq/subquery/dictiony-polkadot

通常，这将在您的清单文件中设置，但在下面显示一个在命令行中使用它作为参数的例子。

```shell
subql-node -f . subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

阅读更多关于 SubQuery 词典的工作原理

## subql-query

### --help

这将显示帮助选项。

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
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer     Url that allow query to access indexer metadata     [string]
```

### --version

显示当前版本

```shell
> subql-query --version
0.7.0
```

### -n, --name

此标识符用于启动查询服务。 如果运行索引器时没有提供 --subquery-name 标志，此处的名称将指默认项目名称。 如果设置了 --subquery-name, 则此处的名称应该与设置相匹配。

```shell
> subql-node -f . > subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . > subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

这个标识符启用了graphql playground，所以在默认情况下，应该始终包含有任何用途。

### --output-fmt

查看 [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

查看 [--loglevel](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
