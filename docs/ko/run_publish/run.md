# Running SubQuery Locally

This guide works through how to run a local SubQuery node on your infrastructure, which includes both the indexer and query service. Don't want to worry about running your own SubQuery infrastructure? SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## Using Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything here.

Under the project directory run the following command:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## Running an Indexer (subql/node)

Requirements:

- [Postgres](https://www.postgresql.org/) database (version 16 or higher). While the [SubQuery node](run.md#start-a-local-subquery-node) is indexing the blockchain, the extracted data is stored in an external database instance.

A SubQuery node is an implementation that extracts Substrate/Polkadot-based blockchain data per the SubQuery project and saves it into a Postgres database.

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

### Installation

::: code-tabs @tab Substrate/Polkadot

```shell
# NPM
npm install -g @subql/node
```

@tab EVM

```shell
# NPM
npm install -g @subql/node-ethereum
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

@tab Near

```shell
# NPM
npm install -g @subql/node-near
```

@tab stellar

```shell
# NPM
npm install -g @subql/node-stellar
```

@tab Concordium

```shell
# NPM
npm install -g @subql/node-concordium
```

:::

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

Once installed, you can start a node with the following command:

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab EVM

```shell
subql-node-ethereum <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

@tab Near

```shell
subql-node-near <command>
```

@tab Stellar

```shell
subql-node-stellar <command>
```

@tab Concordium

```shell
subql-node-concordium <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. To find out more, you can always run `--help`.

#### Point to local project path

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab EVM

```shell
subql-node-ethereum -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

@tab Near

```shell
subql-node-near -f your-project-path
```

@tab Stellar

```shell
subql-node-stellar -f your-project-path
```

@tab Concordium

```shell
subql-node-concordium -f your-project-path
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

This will point the query node to a manifest file which can be in TS, YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
<BlockDispatcherService> INFO Enqueueing blocks 203...402, total 200 blocks
<BlockDispatcherService> INFO Enqueueing blocks 403...602, total 200 blocks
```

When the indexer first indexes the chain, fetching single blocks will significantly decrease the performance. Increasing the batch size to adjust the number of blocks fetched will decrease the overall processing time. The current default batch size is 100.


::: tip Note SubQuery uses Node.js, by default this will use 4GB of memory. If you are running into memory issues or wish to get the most performance out of indexing you can increase the memory that will be used by setting the following environment variable `export NODE_OPTIONS=--max_old_space_size=<memory-in-MB>`. It's best to make sure this only applies to the node and not the query service. :::

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

예를 들어:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Then open up the Chrome dev tools, go to Source > Filesystem and add your project to the workspace and start debugging. For more information, check out [How to debug a SubQuery project](../academy/tutorials_examples/debug-projects.md).

## Running a Query Service (subql/query)

### Installation

```shell
# NPM
npm install -g @subql/query
```

::: danger Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an error down the line. :::

### Running the Query service

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.
