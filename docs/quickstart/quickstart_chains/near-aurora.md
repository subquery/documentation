# Aurora Quick Start (EVM)

[Aurora](https://aurora.dev) is a next-generation Ethereum compatible blockchain and ecosystem that runs on the NEAR Protocol, and powers the innovations behind Aurora Cloud—the fastest path for Web2 businesses to capture the value of Web3.

Since SubQuery fully supports NEAR and Aurora, you can index data from both execution environments in the same SubQuery project and into the same dataset.

The goal of this quick start guide is to index transfers and approvals for the [Wrapped NEAR smart contract](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d) on NEAR Aurora.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/cjziTXhGBGw" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an NEAR Aurora project
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-aurora-starter).
:::

## 1. Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for NEAR Aurora. Since Aurora is a EVM implementation on NEAR, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.ts`) file works as an entry point to your Aurora project. It defines most of the details on how SubQuery will index and transform the chain data. For Aurora, there are three types of mapping handlers (and you can have more than one in each project). Note that these are different mapping handlers to that of [traditional NEAR projects](./near.md#2-update-your-project-manifest-file):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and approvals for the Wrapped NEAR smart contract, the first step is to import the contract abi definition which can be obtained from [here](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d/contracts#address-tabs). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since we are indexing all transfers and approvals for the Wrapped NEAR smart contract, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime, // We use ethereum runtime since NEAR Aurora is a layer-2 that is compatible
      startBlock: 42731897, // Block with the first interaction with NEAR https://explorer.aurora.dev/tx/0xc14305c06ef0a271817bb04b02e02d99b3f5f7b584b5ace0dab142777b0782b1
      options: {
        // Must be a key of assets
        abi: "erc20",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d", // this is the contract address for wrapped NEAR https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleTransaction",
            kind: EthereumHandlerKind.Call, // We use ethereum runtime since NEAR Aurora is a layer-2 that is compatible
            filter: {
              // The function can either be the function fragment or signature
              // function: '0x095ea7b3'
              // function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
          {
            handler: "handleLog",
            kind: EthereumHandlerKind.Event,
            filter: {
              // address: "0x60781C2586D68229fde47564546784ab3fACA982"
              topics: [
                //Follows standard log filters https://docs.ethers.io/v5/concepts/events/
                "Transfer(address indexed from, address indexed to, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleTransaction` and `handlelog` mapping function whenever there is an `approve` or `Transfer` log on any transaction from the [Wrapped NEAR contract](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d/contracts#address-tabs).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id and the blockHeight along with addresses such as to, from, owner and spender, along with the contract address and value as well.

```graphql
type Transaction @entity {
  id: ID! # Transaction hash
  txHash: String
  blockHeight: BigInt
  to: String!
  from: String!
  value: BigInt!
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

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

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

This will create a new directory (or update the existing one) `src/types` which contains generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, and read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entities can be imported from the following directory:

```ts
import { Approval, Transaction } from "../types";
```

As you're creating a new EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

In this example SubQuery project, you would import these types like so.

```ts
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code:

```ts
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
import assert from "assert";

export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");
  const transaction = Transaction.create({
    id: log.transactionHash,
    txHash: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    to: log.args.to,
    from: log.args.from,
    value: log.args.value.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}

export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}
```

The `handleTransaction` function receives a `tx` parameter of type `ApproveTransaction` which includes transaction log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/ethereum.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

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

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

```graphql
# Write your query or mutation here
{
  query {
    transactions(first: 2, orderBy: BLOCK_HEIGHT_ASC) {
      totalCount
      nodes {
        id
        txHash
        blockHeight
        to
        from
        value
        contractAddress
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transactions": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6-5",
            "txHash": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "value": "12373884174795780000"
          },
          {
            "id": "0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6-5",
            "txHash": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "value": "12373884174795780000"
          }
        ]
      }
    }
  }
}
```

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
