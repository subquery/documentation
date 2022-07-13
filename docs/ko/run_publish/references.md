# Command Line Flags

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

This command is uses webpack to generate a bundle of a subquery project.

| Options            | 설명                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | local folder of subquery project (if not in folder already)                                                |
| -o, --output       | specify output folder of build e.g. build-folder                                                           |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- With `subql build` you can specify additional entry points in exports field although it will always build `index.ts` automatically.

- You need to have @subql/cli v0.19.0 or above to use exports field.

- Any `exports` field must map to string type (e.g. `"entry": "./src/file.ts"`), else it will be ignored from build.

[Futher example](../build/introduction.md#build).

## subql-node

### --help

This shows the help options.

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

This displays the current version.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Use this flag to start the SubQuery project.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (deprecated)

This flag allows you to provide a name for your project which acts as if it creates an instance of your project. Upon providing a new name, a new database schema is created and block synchronisation starts from zero. Deprecated in favour of `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

All these various configurations can be placed into a .yml or .json file and then referenced with the config flag.

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

### --local (deprecated)

This flag is primarily used for debugging purposes where it creates the default starter_entity table in the default "postgres" schema.

```shell
subql-node -f . --local
```

Note that once you use this flag, removing it won't mean that it will point to another database. To repoint to another database you will have to create a NEW database and change the env settings to this new database. In other words, "export DB_DATABASE=<new_db_here>".

### --force-clean

This flag forces the project schemas and tables to be regenerated, helpful to use when iteratively developing graphql schemas such that new runs of the project are always working with a clean state. Note that this flag will also wipe all indexed data.

### --db-schema

This flag allows you to provide a name for the project database schema. Upon providing a new name, a new database schema is created with the configured name and block indexing starts.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
This will create a notification trigger on entity, this also is the prerequisite to enable subscription feature in query service.

### --unsafe

SubQuery Projects are usually run in a javascript sandbox for security to limit the scope of access the project has to your system. The sandbox limits the available javascript imports to the following modules:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Although this enhances security we understand that this limits the available functionality of your SubQuery. The `--unsafe` command imports all default javascript modules which greatly increases sandbox functionality with the tradeoff of decreased security.

**Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network).**

### --batch-size

This flag allows you to set the batch size in the command line. If batch size is also set in the config file, this takes precedent.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Scale the block fetch batch size with memory usage.

### --timeout

Set custom timeout for the javascript sandbox to execute mapping functions over a block before the block mapping function throws a timeout exception.

### --debug

This outputs debug information to the console output and forcefully sets the log level to debug.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

This shows profiler information.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

This flag allows users to override the network endpoint configuration from the manifest file.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Note that this must also be set in the manifest file, otherwise you'll get:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

There are two different terminal output formats. JSON or colored. Colored is the default and contains colored text.

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

This allows you to specify a dictionary endpoint which is a free service that is provided and hosted at SubQuery's [Project Explorer](https://explorer.subquery.network/) (search for dictionary) and presents an API endpoint of: https://api.subquery.network/sq/subquery/dictionary-polkadot.

Typically this would be set in your manifest file but below shows an example of using it as an argument in the command line.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

### -p, --port

The port the subquery indexing service binds to. By default this is set to `3000`.

### --disable-historical

Disables automated historical state tracking, [see Historic State Tracking](./historical.md). By default this is set to `false`.

## subql-query

### --help

This shows the help options.

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

This displays the current version.

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

See [--output-fmt](https://doc.subquery.network/run_publish/references.md#output-fmt).

### --log-level

See [--log-level](https://doc.subquery.network/run_publish/references.md#log-level).

### --log-path

Enable file logging by providing a path to a file to log to.

### --log-rotate

Enable file log rotations with the options of a 1d rotation interval, a maximum of 7 files and with a max file size of 1GB.

### --indexer

Set a custom url for the location of the endpoints of the indexer, the query service uses these endpoints for indexer health, metadata and readiness status.

### --subscription

This flag enables [GraphQL Subscriptions](./subscription.md), to enable this feature requires `subql-node` also enable `--subscription`.

### --unsafe

The query service has a limit of 100 entities for unbounded graphql queries. The unsafe flag removes this limit which may cause performance issues on the query service. It is recommended instead that queries are [paginated](https://graphql.org/learn/pagination/).

This flag enables certain aggregation functions including sum, max, avg and others. Read more about this feature [here](./aggregate.md).

These are disabled by default due to the entity limit.

**Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's Managed Services](https://project.subquery.network).**

### --port

The port the subquery query service binds to. By default this is set to `3000`
