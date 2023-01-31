# Lesson 2: Getting started with SubQuery

It’s the high time we start coding. Let’s build our first SubQuery project with the help of SubQuery CLI! 

In this lesson, we will: 

1. Initialise the project through SubQuery CLI
2. Get familiar with the project structure 
3. Index EVM events
4. Deploy the project locally with docker

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/8ZRZeDFD0D4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 1. Preparation

### Environment and dependencies

- [Typescript](https://www.typescriptlang.org/) is required to compile project and define types.
- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).
- You will also need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Docker](https://www.docker.com/).


### Installation of the SubQuery CLI

Install SubQuery CLI globally on your terminal with NPM:

```
npm install -g @subql/cli
```

::: warning Important
Note that we don't encourage the use of yarn global for installing @subql/cli due to its poor dependency management. This may lead to multiple errors.
:::


Then check the `subql cli` version by running the given below command:

```
subql -v
```

Run help to see available commands provided by SubQuery CLI:

```
subql help
```

## 2. Initialise the SubQuery Starter Project

Inside the directory in which you want to create the SubQuery project run the following command and follow all the steps chosing project name, GitHub repo addres, network family, rpc endpoint and more. Follow steps from the video. 

Find out more about initialisation of SubQuery projects in our [Quick Start Guide](../../quickstart/quickstart.md#2-initialise-the-subquery-starter-project).

```
subql init project-name
```
::: tip Note
Remember that, everything in the project configuration can by changed afterwards as well.
:::

Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as in the [Directory Structure](../../build/introduction.md#directory-structure).

## 3. SubQuery Project Structure

If you want to change your project and go beyond the default content of any starter project built with SubQuery CLI, you will need to work on the following files:

- The Manifest in `project.yaml` to configure your project. 
- The GraphQL Schema in `schema.graphql` to define shape of the data.
- The Mapping functions in `src/mappings/ directory` to transform data coming from blockchain.

Find out more about [Manifest](../../build/manifest/polkadot.md) and [GraphQl Schema](../../build/graphql.md) and [Mapping functions](../../build/mapping/polkadot.md). 

::: tip Note
In this first lesson there is no code alternation. 
::: 

Your files should look like this:

### Manifest

```yaml
specVersion: 1.0.0
name: moonbeam-evm-starter
version: 0.0.1
runner:
  node:
    name: '@subql/node'
    version: '>=0.35.0'
  query:
    name: '@subql/query'
    version: '>=0.16.0'
description: Moonbeam / SubQuery Course — Building dApps with the help of SubQuery
repository: 'https://github.com/subquery/tutorials-frontier-evm-starter'
schema:
  file: ./schema.graphql
network:
  chainId: '0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b'
  endpoint: 'wss://moonriver.api.onfinality.io/public-ws'
  dictionary: 'https://api.subquery.network/sq/subquery/moonriver-dictionary'
  chaintypes:
    file: ./dist/chaintypes.js
dataSources:
  - kind: substrate/FrontierEvm
    startBlock: 752073
    processor:
      file: ./node_modules/@subql/frontier-evm-processor/dist/bundle.js
      options:
        abi: erc20
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: ./erc20.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleFrontierEvmEvent
          kind: substrate/FrontierEvmEvent
          filter:
            topics:
              - 'Transfer(address indexed from,address indexed to,uint256 value)'
              - null
              - null
              - null
        - handler: handleFrontierEvmCall
          kind: substrate/FrontierEvmCall
          filter:
            function: 'approve(address to,uint256 value)'
```

### Schema GraphQl

```graphql
type Transaction @entity {
  id: ID! # Transaction hash
  value: BigInt!
  to: String!
  from: String!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  value: BigInt!
  owner: String!
  spender: String!
  contractAddress: String!
}
```

### Mappings functions

``` ts
import { Approval, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.from = event.args.from;
  transaction.to = event.args.to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleFrontierEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}
```


## 4. Building the Project

### Install dependencies

Under the project directory, install the node dependencies by running the following command:

::: code-tabs
@tab:active yarn

```shell
yarn install
```

@tab npm

```shell
npm install
```

:::

### Generate Associated Typescript

Next, generate the associated typescript with the following command:

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

### Build the Project

Next, use following command to bundle the app into static files for production:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

## 5. Indexing and Query

### Run Docker

Under the project directory run following command:

```
yarn start:docker
```

This will download packages from Docker, create a new Postgres database, and start an indexing an query service. 

::: tip Note
When you are doing it for the first time, it may take some time to start. 
:::

### Query this Project

Open your browser and head to `http://localhost:3000.` You should see a GraphQL playground is showing in the explorer and the schemas that ready to query.
With this project can try to query with the following code to get a taste of how it works.

``` graphql
query {
    approvals (first: 5) {
        nodes {
            id
            value
            owner
            spender
        }
    }
    transactions (first: 5) {
        nodes {
            id
            value
            to: id
            from: id
        }
    }
}
```
 
## Useful resources

- [SubQuery Project Explorer](https://explorer.subquery.network/)
- [Website](https://subquery.network/)
- [Discord](https://discord.com/invite/subquery)
- [Quick Start Guide](../../quickstart/quickstart.md)
- [YouTube Channel](https://www.youtube.com/c/SubQueryNetwork)

::: tip Note
The project's **code state after this lesson** is [here](https://github.com/deverka/moonbeam_subquery_tutorial//tree/lesson-2).
The final code of this project can be found [here](https://github.com/deverka/moonbeam_subquery_tutorial).
:::