# 命令行参数

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

此命令使用 webpack 生成subquery项目的捆绑包。

| 选项                 | 描述                                              |
| ------------------ | ----------------------------------------------- |
| -l, --location     | subquery项目的本地文件夹(如果没有在文件夹中)                     |
| -o, --output       | 指定构建的输出文件夹，例如：build-folder                      |
| --mode=(production | prod | development | dev) | [ 默认 ︰ production ] |

- 用`subql build`命令，您可以在exports字段中指定额外的入口点，尽管它总是会自动构建 < 0 >index.ts < / 0 >

- 您需要有 @subql/cli v0.19.0 或更高版本才能使用exports字段。

- 任何`exports` 字段必须映射到字符串类型(例如， `"entry": "./src/file.ts"`)，否则它将被从构建中忽略。

更多的示例

## subql-node

### --help

输入该命令行将显示帮助选项。

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
                            functions                                   [number] will
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

这将显示当前版本。

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

使用此标志启动SubQuery项目。

```shell
subql-node -f . // 或者
subql-node --subquery .
```

### --subquery-name (已废弃)

如果您新建了一个项目的实例，这个命令行将允许您为这个项目提供一个新名称。 在提供一个新名称后，将创建一个新的数据库模式，并从零区块开始进行区块同步。 已弃用 `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

所有这些不同的配置都可以放置到 .yml 或 .json 文件中，然后用config参数进行引用。

示例subquery_config.yml文件：

```shell
subquery: . // 必填. 这是项目的本地路径。 这段时间指的是当前本地目录。
subqueryName：hello // 可选名称
batchSize：55 // 可选配置
```

将此文件放置在与工程相同的目录中。 然后在当前项目目录中，运行：

```shell
> subql-node -c ./subquery_config.yml
```

### --local (废弃)

这个标志主要用于调试，在默认的“postgres”模式中创建默认starter_entity 表。

```shell
subql-node -f . --local
```

请注意，一旦您使用此命令行，删除它并不意味着它会指向另一个数据库。 要重新指向另一个数据库，您将需要创建一个新的数据库，并将环境设置更改为这个新数据库。 换言之，“export DB_DATABASE=<new_db_here>"

### --force-clean

此标志强制重新生成项目模式和表，在迭代开发graphql模式时很有用，这样项目的新运行总是以干净的状态运行。 请注意，此命令行也会清除所有索引数据。

### --db-schema

此标志允许您为项目数据库方案提供一个名称。 提供新名称后，将创建一个新的数据库架构，配置名称并开始索引区块。

```shell
subql-node -f . --db-schema=test2
```

### --unsafe

SubQuery 项目通常在javascript sandbox中运行，以保证安全，限制项目对您系统的访问范围。 沙盒将可用的 javascript 导入限制为以下模块：

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

虽然这会增强安全性，但我们理解这会限制您的 SubQuery 可用的功能。 `--unsafe` 命令导入所有默认的 javascript 模块，这些模块大大增加了安全性降低后的沙盒功能。

**请注意，`——unsafe`命令将阻止您的项目在SubQuery网络中运行，如果您想要在SubQuery的托管服务[project.SubQuery.Network ](https://project.subquery.network)中运行此命令，您必须联系支持人员。**

### --batch-size

此命令行将允许您在命令行中设置批量大小。 如果在配置文件中也设置了批量大小，采用前一个例子。

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

用内存使用量缩放方块获取批量的大小

### --timeout

为javascript沙箱设置自定义超时，以便在块映射函数抛出超时异常之前在区块上执行映射函数

### --debug

这将输出调试信息到控制台输出，并强制设置日志级别进行调试.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

这将显示分析器信息。

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

此命令行允许用户从清单文件覆盖网络端点配置。

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

请注意，这也必须在清单文件中设置，否则您将会得到错误：

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

有两种不同的终端输出格式。 JSON或者有颜色的。 彩色是默认的，包含着彩色文本。

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

有七个选项可供选择： “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. 下面的示例显示silent。 终端中不会打印任何内容，因此，判断节点是否工作的唯一方法是查询数据库的行数(select count(\*) from subquery_1.starter_entities)或查询块高度。

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

默认情况下是true。 当设置成false时：

```shell
> subql-node -f . –timestamp-field=false
```

这将删除在starter_entities表中的 created_at和updated_at列

### -d, --network-dictionary

这允许您指定一个字典端点，它是一个免费服务，提供并托管在:

https://explorer.subquery.network/(搜索字典)，并提供:https://api.subquery.network/sq/subquery/dictionary-polkadot的API端点</p> 

通常，这将在您的清单文件中设置，但在下面显示一个在命令行中使用它作为参数的例子。



```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```


阅读更多关于 SubQuery 词典的工作原理



### -p, --port

Subquery索引服务绑定到的端口。 默认设置为 `3000`



## subql-query



### --help

显示帮助选项。



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

这将显示当前版本。



```shell
> subql-query --version
0.7.0
```




### -n, --name

这个命令行用于启动查询服务。 如果运行索引器时没有提供 --subquery-name 标志，此处的名称将指默认项目名称。 如果设置了 --subquery-name, 则此处的名称应该与设置相匹配。



```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```




```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```




### --playground

这个命令行启用了graphql playground，所以在默认情况下，应该始终包含有任何用途。



### --output-fmt

查看 [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)



### --log-level

查看 [--loglevel](https://doc.subquery.network/references/references.html#log-level)



### --log-path

通过提供一个文件到日志的路径来启用文件日志



### --log-rotate

启用文件日志旋转，可设置为1天旋转时间间隔，最多7个文件，最大文件大小为1GB



### --indexer

设置索引器终点位置的自定义URL。 查询服务将这些端点用于索引器健康、元数据和准备状态



### --unsafe

查询服务对于无界的graphql查询有100个实体的限制。 不安全的标志取消了这个限制，这可能给查询服务造成性能问题。 相反，建议查询为 [分页](https://graphql.org/learn/pagination/)。

这个标志也可以用于启用某些聚合功能，包括总和、 最大、 avg 和 [其他](https://github.com/graphile/pg-aggregates#aggregates)。

由于实体限制，它们默认被禁用。

**请注意，`——unsafe`命令将阻止您的项目在SubQuery网络中运行，如果您想要在SubQuery的托管服务[project. SubQuery . Network](https://project.subquery.network) 中运行此命令，您必须联系支持人员。**



### --port

Subquery索引服务绑定到的端口。 默认设置为 `3000`
