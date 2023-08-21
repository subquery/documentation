# Command Line Flags

All booleans are by default `false` unless explicitly mentioned.

## subql (cli)

### --help

This shows all the current command options for your current version of `subql-cli`.

### build

This command uses webpack to generate a bundle of a subquery project.

| Options        | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| -l, --location | local folder of subquery project (if not in folder already) |
| -o, --output   | specify output folder of build e.g. build-folder            |
| --mode         | `production` or `development` (default: `production`)       |

- With `subql build` you can specify additional entry points in exports field although it will always build
  `index.ts` automatically.

- You need to have @subql/cli v0.19.0 or above to use exports field.

- Any `exports` field must map to string type (e.g. `"entry": "./src/file.ts"`), else it will be ignored from build.

For more info, visit [basic workflows](../build/introduction.md#build).

## subql-node

### --help

**Boolean** - This shows all the current command options for your current version of `subql-node`.

### --batch-size

**Positive Integer (default: `100`)** - This flag allows you to set the batch size in the command line. If batch size is also set in the config file, this takes precedent. This setting is overridden on the Managed service to `30`.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --block-confirmations

**Positive Integer (default: `20`)** - (Only for `subql-node-ethereum`) The number of blocks behind the head to be considered finalized, this has no effect with non-EVM networks.

### -c, --config

**String** - All these various configurations can be placed into a .yml or .json file and then referenced with the config flag.

Sample subquery_config.yml file:

```shell
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

Place this file in the same directory as the project. Then in the current project directory, run:

```shell
> subql-node -c ./subquery_config.yml
```

### --db-schema

**String** - This flag allows you to provide a name for the project database schema. Upon providing a new name, a new database schema is created with the configured name and block indexing starts.

```shell
subql-node -f . --db-schema=test2
```

### --debug

**Boolean** - This outputs debug information to the console output and forcefully sets the log level to debug.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --disable-historical

**Boolean** - Disables automated historical state tracking, [see Historic State Tracking](./historical.md).

### --dictionary-resolver

**String** - Uses the provided SubQuery Network dictionary resolver URL to find a dictionary, this will overwrite dictionaries specified by `--network-dictionary`

### --dictionary-timeout

**Positive Integer (default: `30`)** - Changes the timeout for dictionary queries, this number is expressed in seconds.

### -f, --subquery

**Boolean** - Use this flag to start the SubQuery project.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### force-clean

This subcommand forces the project schemas and tables to be regenerated. It is helpful to use when iteratively developing graphql schemas in order to ensure a clean state when starting a project. Note that this flag will also wipe all indexed data.
This will also drop all related schema and tables of the project.

`-f`, `--subquery` flag must be passed in, to set path of the targeted project.

::: tip Note
Similar to `reindex` command, the application would exit upon completion.
:::

```shell
subql-node force-clean -f /example/subql-project
```

### --log-level

**String (default: `info`)** - There are 7 options to choose from. `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`. The example below shows silent. Nothing will be printed in the terminal so the only way to tell if the node is working or not is to query the database for row count (select count(\*) from subquery_1.starter_entities) or query the block height.

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

**Boolean** - Enables indexing multiple subquery projects into the same database schema.

```shell
> subql-node -f . --multi-chain --db-schema=SCHEMA_NAME
```

For more info, visit [Multi-Chain Support](../build/multi-chain.md).

### -d, --network-dictionary

**String (default: Network dictionary from your manifest)** - This allows you to specify a dictionary GraphQL endpoint which is a free service that is provided and hosted at SubQuery's [Project Explorer](https://explorer.subquery.network/). You can search for dictionary and enter the GraphQL API endpoint (e.g. https://api.subquery.network/sq/subquery/dictionary-polkadot).

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

For more info, visit [How does a SubQuery Dictionary works?](../academy/tutorials_examples/dictionary.md)

### --network-endpoint

**String (default: Network endpoint from your manifest)** - This flag allows users to override the network RPC API endpoint configuration from the manifest file.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

To provide multiple network endpoints (recommended for reliability and performance), you can repeat this command:

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws" --network-endpoint="wss://rpc.polkadot.io"
```

Note that this must also be set in the manifest file, otherwise you'll get:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

**String (default: `colored`)** - There are two different terminal output formats. `JSON` or `colored`. Colored is the default and contains colored text.

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

**Positive Integer (default: `3000`)** - The port the subquery indexing service binds to. This will find the next available port if `3000` is already in use.

### --pg-ca

**String** - When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

**String** - When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

**String** - When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --profiler

**Boolean** - This shows profiler information.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --proof-of-index

**Boolean** - Enable or disable Proof of Indexing, this will be required for the decentralised network.

### --query-limit

**Positive Integer (default: `100`)** - The limit of items that can be retrieved by [store operations](../build/mapping/store.md) from within your mapping functions in each query.

### reindex

When using reindex subcommand, historical must be enabled for the targeted project (`--disable-historical=false`). After starting the project, it would print out a log stating if historical is enabled or not.

For more info, visit [Automated Historical State Tracking](./historical.md)

Use `--targetHeight=<blockNumber>` with `reindex` to remove indexed data and reindex from specified block height.

`-f` or `--subquery` flag must be passed in, to set path of the targeted project.

If the `targetHeight` is less than the declared starting height, it will execute the `--force-clean` command.

```shell
subql-node reindex -f /example/subql-project --targetHeight=30
```

::: tip Note
Once the command is executed and the state has been rolled back to the specified height, the application will exit. You can then start up the indexer to proceed again from this height.
:::

### --scale-batch-size

**Boolean** - Scale the block fetch batch size with memory usage.

### --store-cache-threshold

**Positive Integer (default: `1000`)** - This can be specified when `--store-cache-async=false`. Store cache will flush data to the database when number of records exceeds this threshold, a higher number reduces number of transactions to database in order to save time but requires more memory.

### --store-get-cache-size

**Positive Integer: (default: `500`)** - This can be specified when `--store-cache-async=false`. The number of items from the store retained in a memory cache for faster retrieval of recent data within handlers. A higher number may increase indexing speed, but will require more memory.

### --store-cache-async

**Boolean (default: `true`)** - If enabled the store cache will flush data asynchronously relative to indexing data

### --store-flush-interval

**Positive Integer (default: `5`)** - The interval, in seconds, at which data is flushed from the cache. This ensures that data is persisted regularly when there is either not much data or the project is up to date.

### --subscription

**Boolean** - This will create a notification trigger on entity, this also is the prerequisite to enable subscription feature in query service. You should also enable [--subscription for the query service](#subscription-1).

### --timeout

**Positive Integer (default: `10000`)** - Set custom timeout (in milliseconds) for the Javascript sandbox to execute mapping functions over a block before the block mapping function throws a timeout exception.

### --timestamp-field

**Boolean (default: `true`)** - When set to false, it removes the created_at and updated_at columns in the starter_entities table.

```shell
> subql-node -f . –timestamp-field=false
```

### --unfinalized-blocks

**Boolean** - This allows you to index blocks before they become finalized. It can be very useful if you want the most up-to-date data possible. It will detect any forks and remove any blocks that don't become finalized. To change it to `true` run following command:

```shell
> subql-node -f . --unfinalized-blocks
```

::: tip Tip
Note that this feature **requires historical indexing** to be enabled.
Learn more [here](./historical.md).
:::

::: tip Note
This feature is only available for Substrate-based and Ethereum blockchains; more networks will be supported in the future.
:::

### --unsafe (Node Service)

**Boolean** - Unsafe mode controls various features that compromise the determinism of a SubQuery project. It makes it impossible to guarantee that the data within two identical projects running independently, will be 100% consistent.

One way we control this is by running all projects in a JS sandbox for security to limit the scope of access the project has to your system. The sandbox limits the available javascript imports to the following modules:

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

**Boolean** - This displays the current version.

```shell
> subql-node --version
0.19.1
```

### -w, --workers

**Positive Integer (default: `0`)** - This creates additional node workers that take over block fetching and block processing. You can increase it with the `--workers=<number>` flag. A value of 0 means all processing (block fetching and block processing) is carried out in the main thread, a value of more than 0 means that number of additional node workers that will work with the main thread.

Note that the number of available CPU cores strictly limits the usage of worker threads. So, when using the `--workers=<number>` flag, always specify the number of workers. With no flag provided, everything will run in the same thread (a single worker).

:::tip Tip
It can increase performance by up to 4 times. Give it a try and let us know your feedback!
:::

On initialisation, once the main thread is established, then the fetching and processing workload is distributed across all worker threads. Each worker has their own buffer (a set of blocks that they are responsible to fetch/process). For example:

- Worker A: Will execute the `fetch` and `indexing` of blocks `[n,..n+10]`
- Worker B: Will execute the `fetch` and `indexing` of blocks `[n+11,..n+20]`
- Worker C: Will execute the `fetch` and `indexing` of blocks `[n+21,..n+30]`
- Then repeat with `n = n + 30`

In the case where Worker C completes its fetch prior to Worker A and B, it will remain in an idle state until A and B have completed, as the processing phase executes sequentially.

## subql-query

### --help

**Boolean** - This shows all the current command options for your current version of `subql-query`.

### --aggregate

**Boolean (default: `true`)** - Enables or disables the GraphQL aggregation feature, [read more about this here](../run_publish/aggregate.md).

### --disable-hot-schema

**Boolean** - Disables the hot reload schema on project schema changes.

### --indexer

**String** - Set a custom url for the location of the endpoints of the indexer, the query service uses these endpoints for indexer health, metadata and readiness status.

### --log-level

**String** - See [--log-level](../run_publish/references.md#log-level).

### --log-path

**String** - Enable file logging by providing a path to a file to log to.

### --log-rotate

**Boolean** - Enable file log rotations with the options of a 1d rotation interval, a maximum of 7 files and with a max file size of 1GB.

### --max-connection

**Positive Integer (default: `10`)** - The maximum simultaneous connections allowed to this GraphQL query service expressed as a positive integer.

### -n, --name

**String** - This flag is used to start the query service. If the --subquery-name flag is not provided when running an indexer, the name here will refer to the default project name. If --subquery-name is set, then the name here should match what was set.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --output-fmt

**String (default: `colored`)** - See [--output-fmt](../run_publish/references.md#output-fmt).

### --playground

**Boolean** - This flag enables the graphql playground so should always be included by default to be of any use.

### --playground-settings

**String** - You can use this flag to pass additional settings to the GraphQL playground (in JSON format). Additional settings can be found here https://github.com/graphql/graphql-playground#settings

### --port

**Positive Integer (default: `3000`)** - The port the subquery query service binds to. This will find the next available port if `3000` is already in use.

### --pg-ca

**String** - When connecting to a postgres database via SSL, the path to the server certificate (in `.pem` format)

### --pg-cert

**String** - When connecting to a postgres database via SSL, the path to the client certificate (in `.pem` format)

### --pg-key

**String** - When connecting to a postgres database via SSL, the path to the client key file (in `.key` format)

### --query-complexity

**Positive Integer (default: `10`)** - The level of query complexity that this service will accept expressed as a positive integer. If a client makes a query with a query complexity higher than this level, the GraphQL query service will reject the request.

We use the [graphql-query-complexity](https://www.npmjs.com/package/graphql-query-complexity) plugin to calculate this value.

### --query-limit

**Positive Integer (default: `100`)** - The query service pagination size limit to prevent unbounded GraphQL queries and encourage the use of pagination. This flag accepts a positive integer value that will change this limit. Setting a high value may cause performance issues on the query service, it is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

### --query-timeout

**Positive Integer (default: `10000`)** - The timeout for long running graphql queries expressed in milliseconds.

### --subscription

**Boolean** - This flag enables [GraphQL Subscriptions](./subscription.md), to enable this feature requires `subql-node` also enable `--subscription`.

### --unsafe (Query Service)

**Boolean** - This flag enables certain aggregation functions including sum, max, avg and others. Read more about this feature [here](../run_publish/aggregate.md). These are disabled by default for database performance reasons.

**Note that you must be on a paid plan if you would like to run projects with the `--unsafe` command (on the query service) within [SubQuery's Managed Service](https://managedservice.subquery.network). Additionally, it will prevent your project from being run in the SubQuery Network in the future.**

### --version

**Boolean** - This displays the current version.

```shell
> subql-query --version
0.7.0
```
