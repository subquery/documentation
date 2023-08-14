# Running SubQuery Locally

This guide works through how to run a local SubQuery node on your infrastructure, which includes both the indexer and query service.
Don't want to worry about running your own SubQuery infrastructure? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## Using Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything here.

Under the project directory run the following command:

```shell
docker-compose pull && docker-compose up
```

::: tip Note
It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node.
:::

## Running an Indexer (subql/node)

Requirements:

- [Postgres](https://www.postgresql.org/) database (version 12 or higher). While the [SubQuery node](run.md#start-a-local-subquery-node) is indexing the blockchain, the extracted data is stored in an external database instance.

A SubQuery node is an implementation that extracts Substrate/Polkadot-based blockchain data per the SubQuery project and saves it into a Postgres database.

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

### Installation

::: code-tabs
@tab Substrate/Polkadot

```shell
# NPM
npm install -g @subql/node
```

@tab Terra

```shell
# NPM
npm install -g @subql/node-terra
```

@tab Avalanche

```shell
# NPM
npm install -g @subql/node-avalanche
```

@tab Cosmos

```shell
# NPM
npm install -g @subql/node-cosmos
```

@tab Algorand

```shell
# NPM
npm install -g @subql/node-algorand
```

:::

::: danger
Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line.
:::

Once installed, you can start a node with the following command:

::: code-tabs
@tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab Terra

```shell
subql-node-terra <command>
```

@tab Avalanche

```shell
subql-node-avalanche <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing.
To find out more, you can always run `--help`.

#### Point to local project path

::: code-tabs
@tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab Terra

```shell
subql-node-terra -f your-project-path
```

@tab Avalanche

```shell
subql-node-avalanche -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

:::

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

If your database is using SSL, you can use the following command to add the server certificate to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.key
```

#### Specify a configuration file

::: code-tabs

@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
```

@tab EVM (Ethereum, Polygon, BNB Smart Chain, Avalanche, Flare)

```shell
subql-node-ethereum -c your-project-config.yml
```

@tab Cosmos

```shell
subql-node-cosmos -c your-project-config.yml
```

@tab Algorand

```shell
subql-node-algorand -c your-project-config.yml
```

@tab Near

```shell
subql-node-near -c your-project-config.yml
```

:::

This will point the query node to a manifest file which can be in YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

When the indexer first indexes the chain, fetching single blocks will significantly decrease the performance. Increasing the batch size to adjust the number of blocks fetched will decrease the overall processing time. The current default batch size is 100.

#### Check your node health

There are 2 endpoints that you can use to check and monitor the health of a running SubQuery node.

- Health check endpoint that returns a simple 200 response.
- Metadata endpoint that includes additional analytics of your running SubQuery node.

Append this to the base URL of your SubQuery node. Eg `http://localhost:3000/meta` will return:

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

`http://localhost:3000/health` will return HTTP 200 if successful.

A 500 error will be returned if the indexer is not healthy. This can often be seen when the node is booting up.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

If an incorrect URL is used, a 404 not found error will be returned.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debug your project

Use the [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) to run the following command.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

For example:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Then open up the Chrome dev tools, go to Source > Filesystem and add your project to the workspace and start debugging. For more information, check out
[How to debug a SubQuery project](../academy/tutorials_examples/debug-projects.md).

## Running a Query Service (subql/query)

### Installation

```shell
# NPM
npm install -g @subql/query
```

::: danger
Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line.
:::

### Running the Query service

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.

## Running High Performance SubQuery Infrastructure

SubQuery is designed to provide reliable and performant indexing to production applications, we use the services that we build to run SubQuery in our own managed service which serves millions of requests each day to hundreds of customers. As such, we've added some commands that you will find useful to get the most performance out of your project and mitigate against any DDOS attacks.

### Improve Indexing with Node Workers and Cache Size

Use `node worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. [Read more here](../run_publish/references.html#w-workers).

You should also adjust and play around with the various arguments that control how SubQuery uses a store to improve indexing performance by making expensive database operations in bulk. In particular, you can review `--store-cache-threshold`, `--store-get-cache-size`, `--store-cache-async`, and `--store-flush-interval` - read more about these settings in our [references](./references.md#store-cache-threshold).

### DDOS Mitigation

SubQuery runs well behind an API gateway or a DDOS mitigation service. For any public project that is run in a production configuration, setting up a gateway, web application firewall, or some other protected endpoint is recommended.

### Request Caching

Although @subql/node does not natively provide any default request level caching, one of the easiest ways to increase performance when the number of users hitting your SubQuery project increases is by adding a cache in front of the GraphQL endpoint with a basic TTL of a few seconds (depending on how stale you want to allow your data). Most cloud providers offer simple to setup and manage caching solutions (e.g. Redis) that will work well with the GraphQL api endpoints that we provide. If you're worried about stale data affecting your user's experience, by leveraging [GraphQl subscriptions](./subscription.md) you can ensure that the most recent data is never affected by the cache while older, slower data is mostly from the cache. Additionally, consider different TTLs for each different entity.

### Database Configuration

In our own managed service, we've been able to run a number of SubQuery projects in the same Postgres database - you do not need to run each project in a different database for sufficient performance. When the I/O on the database becomes a problem, the simplest solution is to first consider if any more [indexes can be added to your project](../build/optimisation.md#indexing-performance-advice).

The next step our team will usually carry out is split the database into a read-write replica architecture. One database instance is the writer (that the @subql/node service connects to), while the other is the reader (that the @subql/query service connects to). We will do this before splitting up projects into different databases as it generally makes a huge improvement to database I/O.

### Run Multiple Query Services

SubQuery is designed so that you can run multiple query services behind a load balancer for redundancy and performance. Just note that unless you have multiple read replicas of the database, you're performance will quickly become db constrained.

### Restrict Query Complexity

GraphQL is extremely powerful, but one of the downsides is that it allows users to make somewhat unrestricted calls that result in complex SQL that can really affect performance for other users. We provide two controls for this:

- `--query-complexity` is a flag that controls the level of query complexity that this service will accept expressed as a positive integer, [read more here](./references.md#query-complexity).
- `--query-timeout` is a flag that will restrict the time each query will be allowed to run for, [read more here](./references.md#query-timeout).
- `--max-connection` is a flag that will restrict the number of simultaneous connections to the query endpoint, [read more here](./references.md#max-connection).
- `--query-limit` is a flag that allows you to limit the number of results returned by any query and enforce pagination, [read more here](./references.md#query-limit).
- `--unsafe` is a flag that enables some advanced features like [GraphQL aggregations](./aggregate.md), these may have performance impacts, [read more here](./references.md#unsafe-query-service)
