# 1. SubQuery Hello World

This quick start demonstrates how to get the Ethereum starter project, which indexes all transfers and approval events for the [wrapped Ether token](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) on Ethereum Mainnet up and running. This should take about 5 minutes. 

## Prerequisites

Before you begin creating your first blockchain project with SubQuery, make sure you have installed the required supporting software applications. These are:

- [NodeJS](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of NodeJS.
- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.
- [SubQuery CLI](https://www.npmjs.com/package/@subql/cli): The SubQuery Command Line Interface used to create a project scaffold as a starting point for your project.

To check if you have Node or Docker already, run: 
```shell
node -v
v22.15.0

docker -v
Docker version 27.4.0, build bde2b89
```

Install the SubQuery CLI using NPM.

```shell
# NPM
npm install -g @subql/cli

# Test that it was installed correctly
subql --help
```

NB: We **do not** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. 

## 1. Initialise a new SubQuery Project

Run the following command inside the directory that you want to create a SubQuery project in:

```shell
subql init
```

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project.
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Network**: The specific network that this SubQuery project will index. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Template project**: Select a SubQuery template project that will serve as a starting point for your project. For some networks, multiple examples are provided.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint which will be used by this project. You can use public endpoints for different networks, your own private dedicated node, or just use the default endpoint. This RPC node must have the entire state of the data that you wish to index, so an archive node is recommended.
- **Authors**: Enter the owner of this SubQuery project here. eg. your name or organisation.
- **Description**: Provide a short paragraph about your project that describes what the project does.
- **Generate scaffolding from an existing contract ABI?**: Enter a local path to an ABI.json file afterwhich the project will automatically create the events and methods. Learn more [here](../build/introduction.md#directory-structure).

Let’s look at an example:

```shell
$ subql init
Project name [subql-starter]: evm-hello-world
? Select a network family EVM
? Select a network Ethereum
? Select a template project ethereum-starter     This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Mainnet
? RPC endpoint: https://ethereum.rpc.subquery.network/public
? Author SubQuery Team
? Description This project can be use as a starting po...
evm-hello-world is ready
? Do you want to generate scaffolding from an existing contract abi? no

```

:::info EVM Based Projects

SubQuery projects can be generated from ABIs to save time when creating EVM based projects. Please see [EVM Project Scaffolding](#evm-project-scaffolding)

:::

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be near identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

## 2. Install dependencies

Run the following command to install the new project’s dependencies from within the new project's directory.

::: code-tabs
@tab:active npm

```shell
cd PROJECT_NAME
npm install
```

@tab yarn

```shell
cd PROJECT_NAME
yarn install
```

:::

## 3. Run your project

::: code-tabs
@tab:active npm

```shell
npm run-script dev
```

@tab yarn

```shell
yarn dev
```

:::

This command actually runs 3 subcommands under the hood for convenience. 

* npm run codegen - This generates types from the GraphQL schema definition and contract ABIs and saves them in the /src/types directory. This must be done after each change to the schema.graphql file or the contract ABIs.
* npm run build - This builds and packages the SubQuery project into the /dist directory.
* docker-compose pull && docker-compose up - This runs a Docker container with an indexer, PostgeSQL DB, and a query service. This requires Docker to be installed and running locally. The configuration for this container is set in your docker-compose.yml

It may take a few minutes to download all the docker images (depending on your Internet speed) and for the nodes to start indexing.

:::details Node log output

```
subquery-node-1   | 2025-05-21T09:10:00.896Z <WorkerBlockDispatcherService> INFO
subquery-node-1   | Host Status:
subquery-node-1   |   Total Fetching: 0
subquery-node-1   |   Awaiting process: 0
subquery-node-1   | Worker Status:
subquery-node-1   |   Worker 1 - To Fetch: 0 blocks, Ready to process: 0 blocks
subquery-node-1   |   Worker 2 - To Fetch: 0 blocks, Ready to process: 0 blocks
subquery-node-1   |   Worker 3 - To Fetch: 0 blocks, Ready to process: 0 blocks
subquery-node-1   |   Worker 4 - To Fetch: 0 blocks, Ready to process: 0 blocks
subquery-node-1   |
subquery-node-1   | 2025-05-21T09:10:01.489Z <WorkerBlockDispatcherService> INFO Enqueuing blocks 4753408...4754452, total 35 blocks
graphql-engine-1  | 2025-05-21T09:10:01.931Z <subql-query> INFO Current @subql/query version is 2.22.1
graphql-engine-1  | 2025-05-21T09:10:01.941Z <nestjs> INFO Starting Nest application...
graphql-engine-1  | 2025-05-21T09:10:01.963Z <nestjs> INFO AppModule dependencies initialized
graphql-engine-1  | 2025-05-21T09:10:01.963Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine-1  | 2025-05-21T09:10:01.963Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine-1  | 2025-05-21T09:10:01.965Z <subql-query> INFO Started playground at http://localhost:3000
graphql-engine-1  | 2025-05-21T09:10:01.972Z <graphql-module> INFO Setup PG Pool keep alive. interval 180000 ms
subquery-node-1   | 2025-05-21T09:10:02.059Z <sandbox-#2> INFO New Approval transaction at block 4753408
graphql-engine-1  | 2025-05-21T09:10:02.187Z <nestjs> INFO Nest application successfully started
subquery-node-1   | 2025-05-21T09:10:02.426Z <sandbox-#2> INFO New Approval transaction at block 4753432
subquery-node-1   | 2025-05-21T09:10:02.812Z <sandbox-#2> INFO New Approval transaction at block 4753441

```
:::

Because a free public RPC endpoint is used in the default configuration, sometimes the request limit is reached so this error may appear:

```
 Error: All endpoints failed to initialize. Please add healthier endpoints
 ```
 
 To resolve this, sign up for a free account at [OnFinality](https://onfinality.io/) or any other RPC provider and to obtain a more stable RPC endpoint.


## 3. Query your project

Once your project is running, open http://localhost:3000 on your browser and you should see a GraphQL playground. Run the following query:

:::details query

```
{
  query {
    transfers(first: 2, orderBy: VALUE_DESC) {
      totalCount
      nodes {
        id
        blockHeight
        from
        to
        value
        contractAddress
      }
    }
  }
  approvals(first: 2, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      blockHeight
      owner
      spender
      value
      contractAddress
    }
  }
}
```
:::

Expected results:

:::details json results

```
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 95,
        "nodes": [
          {
            "id": "0x5fe866f8a3ff90c6bd8948f21326aac1873c34e48553fc9c0b58bd7a88aea250",
            "blockHeight": "4755720",
            "from": "0x7C5F6fFaD368dBf1a83E6D66b5aCE792fac2E7C0",
            "to": "0x448a5065aeBB8E423F0896E6c5D525C040f59af3",
            "value": "300000000000000000000",
            "contractAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
          },
          {
            "id": "0x8b7d07040e66569608d49745d3e255a1401cc9f34bd47e2fd812c48a8e9f9344",
            "blockHeight": "4755986",
            "from": "0xc031D5e3822bE0335027ecf88aFdfd3433A97fe1",
            "to": "0x448a5065aeBB8E423F0896E6c5D525C040f59af3",
            "value": "219000000000000000000",
            "contractAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x5c4db66455acdf8798a771bfa55c46a851b29b7176256ccf24f414190ceae35e",
          "blockHeight": null,
          "owner": "0x004075e4D4b1ce6c48c81CC940e2bad24B489e64",
          "spender": "0x14FBCA95be7e99C15Cc2996c6C9d841e54B79425",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        },
        {
          "id": "0x9e3c3bffae16d4ce2019d6bf488449cc4dbb0322955fb02ee265e722fafe58fd",
          "blockHeight": null,
          "owner": "0x0E4555922c52FFDdcfb006D3dBc94B21541F0F15",
          "spender": "0x14FBCA95be7e99C15Cc2996c6C9d841e54B79425",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        }
      ]
    }
  }
}
```
:::

Congratulations! You have successfully created your first SubQuery project indexing transfers and approvals for the wrapped ether token on Ethereum mainnet!


