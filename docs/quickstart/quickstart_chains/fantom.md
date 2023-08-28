# Fantom Opera Quick Start

## Goals

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped FTM](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83) on [Fantom Opera](https://ftmscan.com/) Network .

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Fantom project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Fantom/fantom-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Fantom Opera. Since Fantom is an EVM-compatible layer-1, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Fantom project. It defines most of the details on how SubQuery will index and transform the chain data. For Fantom, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and approvals from the Wrapped FTM contract on Fantom Opera network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Fantom Opera is EVM-compatible
    startBlock: 67295175 # This is the block that the contract was deployed on https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83
    options:
      # Must be a key of assets
      abi: erc20
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83" # This is the contract address for Wrapped FTM https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83
    assets:
      erc20:
        file: "./abis/erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTransaction
          kind: ethereum/TransactionHandler # We use ethereum handlers since Fantom Opera is EVM-compatible
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            function: approve(address spender, uint256 amount)
        - handler: handleLog
          kind: ethereum/LogHandler # We use ethereum handlers since Fantom Opera is EVM-compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256
                amount)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WFTM contract](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WFTM contract](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, transfer receiver and transfer sender along with an approvals and all of the attributes related to them (such as owner and spender etc.).

```graphql
type Transfer @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  to: String!
  from: String!
  value: BigInt!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  owner: String!
  spender: String!
  value: BigInt!
  contractAddress: String!
}
```

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
import { Approval, Transfer } from "../types";
```

If you're creating a new EVM-based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory using the SubQuery CLI prompt `yarn codegen` or `npm run-script codegen`.
:::

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleLog` and `handleTransaction`:

```ts
export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = Transfer.create({
    id: log.transactionHash,
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

The `handleLog` function receives a `log` parameter of type `TransferLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

The `handleTransaction` function receives a `tx` parameter of type `ApproveTransaction` which includes transaction data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

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
    transfers(first: 5, orderBy: VALUE_DESC) {
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
  approvals(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
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

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 459,
        "nodes": [
          {
            "id": "0x57b54d4bf53caca4c60772761f4949e4dc02d92f62a02b180d5b382d50b7787d",
            "blockHeight": "67295406",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "176970961833699983570796",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x128198372b0080d144f01041bdeb97e39155981010337abc8dc18878727af227",
            "blockHeight": "67295494",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x4EE115137ac73A3e5F99598564905465C101b11F",
            "value": "160977046912584985744989",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0xaca3354ec2d60bc8816590e32c755a87269a07d1eef7c7a49f808d9d6aee9f18",
            "blockHeight": "67296279",
            "from": "0x38C2853E569125Fc9Af310Ab145FCEfB2A07A322",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "10000000000000000000000",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x5f549d1546f590146b87091c9bdfde18ff1f3d33b6ed852fc454af810a4c0e32",
            "blockHeight": "67296232",
            "from": "0x5BAB9d61f84630A76fA9e2f67739f2da694B5402",
            "to": "0x245cD6d33578de9aF75a3C0c636c726b1A8cbdAa",
            "value": "6996500000000000000000",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x6158b4cc15013f08e89c91cef0d1610cd37d7d303126299900689790ecb8124e",
            "blockHeight": "67295446",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "6844335953031983950296",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x7e08e7e27996561ba385b9ffc6a9a02d51ad17a22a9bbb9e79a6ad059f269720",
          "blockHeight": null,
          "owner": "0xDEc89FC2ECfF1F2197204126EaAc55043155153b",
          "spender": "0x1111111254EEB25477B68fb85Ed929f73A960582",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        },
        {
          "id": "0xa00b913d56a1e91a6fdc52e05f56db54e518a1fbbd81e94ccc4b0d3521c72c53",
          "blockHeight": null,
          "owner": "0xDEc89FC2ECfF1F2197204126EaAc55043155153b",
          "spender": "0x1111111254EEB25477B68fb85Ed929f73A960582",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Fantom/fantom-starter).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
