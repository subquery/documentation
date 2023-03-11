# 命令行标志

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

### 构建...

此命令使用 webpack 生成subquery项目的捆绑包。

| 选项             | 描述                                              |
| -------------- | ----------------------------------------------- |
| -l, --location | subquery项目的本地文件夹(如果没有在文件夹中)                     |
| -o, --output   | 指定构建的输出文件夹，例如：build-folder                      |
| --mode         | production or development (default: production) |

- 用`subql build`命令，您可以在exports字段中指定额外的入口点，尽管它总是会自动构建 < 0 >index.ts < / 0 >

- 您需要有 @subql/cli v0.19.0 或更高版本才能使用exports字段。

- 任何`exports` 字段必须映射到字符串类型(例如， `"entry": "./src/file.ts"`)，否则它将被从构建中忽略。

For more info, visit [basic workflows](../build/introduction.md#build).

## subql-node

### --help

这显示了帮助选项。

```shell
> subql-node --help
Commands:
  run force-clean  Clean the database dropping project schemas and tables. Once
                   the command is executed, the application would exit upon
                   completion.
  run reindex      Reindex to specified block height. Historical must be enabled
                   for the targeted project (--disable-historical=false). Once
                   the command is executed, the application would exit upon
                   completion.
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project   [deprecated] [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                [deprecated] [boolean]
      --db-schema           Db schema name of the project               [string]
      --unsafe              Allows usage of various other features that compromise a projects determinism                    [boolean][default: false]
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
      --unfinalized-blocks  Enable/disable unfinalized blocks indexing
                                                       [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
      --disable-historical  Disable storing historical state entities
                                                       [boolean] [default: true]
  -w, --workers             Number of worker threads to use for fetching and
                            processing blocks. Disabled by default.     [number]
```

### --batch-size

此标志将允许您在命令行中设置批量大小。 如果在配置文件中也设置了批量大小，则优先。

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### -c, --config

所有这些不同的配置都可以放置到 .yml 或 .json 文件中，然后用config参数进行引用。

示例subquery_config.yml文件：

```shell
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

将此文件放在与项目相同的目录中。 然后在当前项目目录中，运行：

```shell
> subql-node -c ./subquery_config.yml
```

### -d, --network-dictionary

这允许您指定一个字典端点，这是一个免费的服务，其在 [https://explorer.subquery etwork/](https://explorer.subquery.network/) (搜索字典) 上提供和托管。并提供了一个 API 端口： https://api.subquery.network/sq/sq/subquery/dictiony-polkadot.

通常，这将在您的清单文件中设置，但在下面显示一个在命令行中使用它作为参数的例子。

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

For more info, visit [How does a SubQuery Dictionary works?](../academy/tutorials_examples/dictionary.md)

### --dictionary-timeout

Changes the timeout for dictionary queries, this number is expressed in seconds. By default we use 30 seconds.

### --db-schema

此标志允许您为项目数据库方案提供一个名称。 提供新名称后，将使用配置的名称创建新的数据库模式，并开始块索引。

```shell
subql-node -f . --db-schema=test2
```

### --debug

这会将调试信息输出到控制台输出并强制将日志级别设置为调试。

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --disable-history

禁用自动状态跟踪， [查看历史状态跟踪](./historical.md)。 默认情况下为 `false`。

### -f, --subquery

使用此标志启动SubQuery项目。

```shell
subql-node -f . // 或者
subql-node --subquery .
```

### force-clean

- In order to use this command you need to have `@subql/node` v1.10.0 or above.

This command forces the project schemas and tables to be regenerated. It is helpful to use when iteratively developing graphql schemas in order to ensure a clean state when starting a project. 请注意，此命令行也会清除所有索引数据。 This will also drop all related schema and tables of the project.

`-f`, `--subquery` flag must be passed in, to set path of the targeted project.

::: tip Note Similar to `reindex` command, the application would exit upon completion. :::

```shell
subql-node -f /example/subql-project force-clean
```

### --local (已废弃)

这个标志主要用于调试，在默认的“postgres”模式中创建默认starter_entity 表。

```shell
subql-node -f . --local
```

请注意，一旦您使用此命令行，删除它并不意味着它会指向另一个数据库。 要重新指向另一个数据库，您将需要创建一个新的数据库，并将环境设置更改为这个新数据库。 换言之，“export DB_DATABASE=<new_db_here>".

### --log-level

有七个选项可供选择： “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. 下面的示例显示silent。 终端中不会打印任何内容，所以，判断节点工作与否的唯一方法是查询数据库中的行数（从subquery_1.starter_entities选择计数（\*)）或者查询区块的高度。

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

### --multi-chain

Enables indexing multiple subquery projects into the same database schema.

```shell
> subql-node -f . --multi-chain --db-schema=SCHEMA_NAME
```

For more info, visit [Multi-Chain Support](../build/multi-chain.md).

### --network-endpoint

此命令行允许用户从清单文件覆盖网络端点配置。

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

请注意，这也必须在清单文件中设置，否则您将会得到：

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

有两种不同的终端输出格式。 JSON或者colored。 colored是默认的，包含着colored文本。

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

### -p, --port

Subquery索引服务绑定到的端口。 默认设置为 `3000`.

### --pg-ca

When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --profiler

这将显示分析器信息。

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### reindex

:::warning In order to use this command, you require `@subql/node:v1.10.0`/`@subql/node-YOURNETWORK:v1.10.0` or above. :::

When using reindex command, historical must be enabled for the targeted project (`--disable-historical=false`). After starting the project, it would print out a log stating if historical is enabled or not.

For more info, visit [Automated Historical State Tracking](./historical.md)

Use `--targetHeight=<blockNumber>` with `reindex` to remove indexed data and reindex from specified block height.

`-f` or `--subquery` flag must be passed in, to set path of the targeted project.

If the `targetHeight` is less than the declared starting height, it will execute the `--force-clean` command.

```shell
subql-node -f /example/subql-project reindex --targetHeight=30
```

::: tip Note
Once the command is executed and the state has been rolled back the the specified height, the application will exit. You can then start up the indexer to proceed again from this height.
:::

### --scale-batch-size

使用内存使用来缩放区块获取批量大小。

### --subscription

这将在实体上创建一个通知触发器，这也是在查询服务中启用订阅功能的先决条件。

### --subquery-name (已废弃)

如果您新建了一个项目的实例，这个命令行将允许您为这个项目提供一个新名称。 在提供一个新名称后，将创建一个新的数据库模式，并从零区块开始进行区块同步。 已弃用，取而代之的是 `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### --timeout

为 javascript 沙箱设置自定义超时以在块映射函数引发超时异常之前在块上执行映射函数。

### --timestamp-field

默认情况下是正确的。 When set to false, it removes the created_at and updated_at columns in the starter_entities table.

```shell
> subql-node -f . –timestamp-field=false
```

### --unfinalized-blocks

This allows you to index blocks before they become finalized. It can be very useful if you want the most up-to-date data possible. It will detect any forks and remove any blocks that don't become finalized. By default it is set to `false`. To change it to `true` run following command:

```shell
> subql-node -f . --unfinalized-blocks
```

::: tip Tip Note that this feature **requires historical indexing** to be enabled. Learn more [here](./historical.md). :::

::: tip Note
This feature is only available for Substrate-based blockchains; more networks will be supported in the future.
:::

### --unsafe (Node Service)

Unsafe mode controls various features that compromise the determinism of a SubQuery project. It makes it impossible to guarantee that the data within two identical projects running independently, will be 100% consistent.

One way we control this is by running all projects in a JS sandbox for security to limit the scope of access the project has to your system. 沙盒将可用的 javascript 导入限制为以下模块：

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security, we understand that this limits the available functionality of your SubQuery project. The `--unsafe` command allows any import which greatly increases functionality with the tradeoff of decreased security.

By extension, the `--unsafe` command on the SubQuery Node also allows:

- making external requests (e.g. via Fetch to an external HTTP address or fs)
- querying block data at any height via the unsafeApi

**Note that users must be on a paid plan to run projects with the `--unsafe` command (on the node service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

Also review the [--unsafe command on the query service](#unsafe-query-service).

### --version

这将显示当前版本。

```shell
> subql-node --version
0.19.1
```

### -w, --workers

这将把块提取和处理移动到一个工作者。 默认情况下，此功能是 **已禁用**。 您可以使用 `--workers=<number>` 标志启用它。

请注意，可用的 CPU 核心数严格限制了工人线程的使用。 因此，当使用 `--workers=<number>` 标志时，总是指定工人的数量。 如果没有提供标记，所有东西都将在同一线程中运行。

:::tip 提示 它可以提高性能最多4次。 试试一下，让我们知道你的反馈！

目前它处于早期试验阶段，但我们计划默认启用它。 :::

On initialisation, once the main thread is established, then the fetching and processing workload is distributed across all worker threads. Each worker has their own buffer (a set of blocks that they are responsible to fetch/process). For example:

- Worker A: Will execute the `fetch` and `indexing` of blocks `[n,..n+10]`
- Worker B: Will execute the `fetch` and `indexing` of blocks `[n+11,..n+20]`
- Worker C: Will execute the `fetch` and `indexing` of blocks `[n+21,..n+30]`
- Then repeat with `n = n + 30`

In the case where Worker C completes its fetch prior to Worker A and B, it will remain in an idle state until A and B have completed, as the processing phase executes sequentially.

## subql-query

### --help

这显示了帮助选项。

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
                      query records and enables aggregation functions                                          [boolean]
  -p, --port          The port the service will bind to                   [number]
```

### --aggregate

Enables or disables the GraphQL aggregation feature, [read more about this here](../run_publish/aggregate.md). By default this is set to true.

### disable-hot-schema

Disables the hot reload schema on project schema changes, by default this is set to false.

### --indexer

为索引器端点的位置设置自定义 url，查询服务将这些端点用于索引器运行状况、元数据和就绪状态。

### --log-level

查看 [--loglevel](../run_publish/references.md#log-level).

### --log-path

通过提供要记录到的文件的路径来启用文件记录。

### --log-rotate

使用 1d 轮换间隔选项启用文件日志轮换，最多 7 个文件，最大文件大小为 1GB。

### --max-connection

The maximum simultaneous connections allowed to this GraphQL query service expressed as a positive integer. The default value is 10.

### -n, --name

该标志用于启动查询服务。 如果在运行索引器时未提供 --subquery-name 标志，则此处的名称将引用默认项目名称。 如果设置了 --subquery-name，那么这里的名称应该与设置的匹配。

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --output-fmt

查看 [--output-fmt](../run_publish/references.md#output-fmt).

### --playground

这个标识符启用了graphql playground，所以在默认情况下，应该始终包含有任何用途。

### --playground-settings

You can use this flag to pass additional settings to the GraphQL playground (in JSON format). Additional settings can be found here https://github.com/graphql/graphql-playground#settings

### --port

The port the subquery query service binds to. By default this is set to `3000`

### --query-complexity

The level of query complexity that this service will accept expressed as a positive integer. By default this is set to 10. If a client makes a query with a query complexity higher than this level, the GraphQL query service will reject the request.

We use the [graphqql-query-complexity](https://www.npmjs.com/package/graphql-query-complexity) plugin to calculate this value.

### --query-limit

The query service by default has a limit of 100 entities for to prevent unbounded GraphQL queries and encourage the use of pagination. This flag accepts a positive integer value that will change this limit (by default this is set to 100). Setting a high value may cause performance issues on the query service, it is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

### --query-timeout

The timeout for long running graphql queries expressed in milliseconds, by default this value is 10000 milliseconds

### --subscription

此标志启用 [GraphQL 订阅](./subscription.md), 以启用此功能需要 `subql-node` 也启用 `--subscription`.

### --unsafe (Query Service)

此标志启用某些聚合函数，包括 sum、max、avg 等。 在[此处](../run_publish/aggregate.md)了解有关此功能的更多信息。

These are disabled by default for database performance reasons.

**Note that must be on a Partner plan if you would like to run projects with the `--unsafe` command (on the query service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

### --version

这将显示当前版本。

```shell
> subql-query --version
0.7.0
```
