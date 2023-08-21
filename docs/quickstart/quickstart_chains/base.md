# Base Quick Start

## Goals

The goal of this quick start guide is to index the all the claims from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491) on [Base Mainnet](https://docs.base.org/using-base/).

Here is a description from Base team about this NFT collection: _"This NFT commemorates you being early — you’re one of the first to teleport into the next generation of the internet as we work to bring billions of people onchain."_

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Base project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Code
The final code of this project can be found [here](https://github.com/subquery/subquery-example-base-nft).
:::

## 1. Your Project Manifest File

::: tip Etheruem
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Base. Since Base is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.yaml`) file works as an entry point to your Base project. It defines most of the details on how SubQuery will index and transform the chain data. For Base, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all user claims from the Bridge to Base NFT contract, the first step is to import the contract abi definition which can be obtained from [here](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491#code). Copy the entire contract ABI and save it as a file called `erc721base.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Base is EVM-compatible
    startBlock: 2155076 # Preferably use the block at which the contract was deployed
    options:
      # Must be a key of assets
      abi: erc721base
      address: "0xea2a41c02fa86a4901826615f9796e603c6a4491" # This is the contract address for Bridge To Base NFT Collection 0xea2a41c02fa86a4901826615f9796e603c6a4491
    assets:
      erc721base:
        file: "./abis/erc721base.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleNftClaim
          kind: ethereum/LogHandler # We use ethereum handlers since Base is EVM-compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - TokensClaimed (uint256 claimConditionIndex, address claimer, address receiver, uint256 startTokenId, uint256 quantityClaimed)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleNftClaim` mapping function whenever there is a `TokensClaimed` event being logged on any transaction from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, claimer and claim receiver along with an aggregation of the total quantity of NFTs claimed per day.

```graphql
type Claim @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt!
  timestamp: Date!
  claimer: String!
  receiver: String!
  tokenId: BigInt!
  quantity: BigInt!
}

# The following entity allows us to aggregate daily claims from the Bridge to Base NFT contract.
type DailyAggregation @entity {
  id: ID! # YYYY-MM-DD
  totalQuantity: BigInt!
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
import { Claim, DailyAggregation } from "../types";
```

If you're creating a new EVM-based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import { TokensClaimedLog } from "../types/abi-interfaces/Erc721baseAbi";
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory using the SubQuery CLI prompt `yarn codegen` or `npm run-script codegen`.
:::

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleNftClaim` and `handleDailyAggregation`:

```ts
export async function handleNftClaim(log: TokensClaimedLog): Promise<void> {
  logger.info(`New claim log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  let date = new Date(Number(log.block.timestamp) * 1000);

  const claim = Claim.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    timestamp: date,
    claimer: log.args.claimer,
    receiver: log.args.receiver,
    tokenId: log.args.startTokenId.toBigInt(),
    quantity: log.args.quantityClaimed.toBigInt(),
  });

  await handleDailyAggregation(date, claim.quantity);

  await claim.save();
}

export async function handleDailyAggregation(
  date: Date,
  quantity: bigint
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  logger.info(`New daily aggregation at ${id}`);

  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      totalQuantity: BigInt(0),
    });
  }

  aggregation.totalQuantity = aggregation.totalQuantity + quantity;

  await aggregation.save();
}
```

The `handleNftClaim` function receives a `log` parameter of type `TokensClaimedLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

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
query {
  claims(first: 5) {
    nodes {
      id
      blockHeight
      timestamp
      claimer
      receiver
      tokenId
      quantity
    }
  }

  dailyAggregations(orderBy: TOTAL_QUANTITY_ASC) {
    nodes {
      id
      totalQuantity
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "claims": {
      "nodes": [
        {
          "id": "0xd91db90047591afbe6ef1c85d2ad0505ee46be161a82fdb79f569194383ed51e",
          "blockHeight": "2155198",
          "timestamp": "2023-08-03T21:55:43",
          "claimer": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "receiver": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "tokenId": "2313836",
          "quantity": "1000"
        },
        {
          "id": "0x0114a68ebb4ee609409931a4c62abd2256a66f0fb91388ca00003765186c0e60",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "receiver": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "tokenId": "2312064",
          "quantity": "1"
        },
        {
          "id": "0x3ccdc484d705776eba946e67e3577c0a629cc82027da6e866717412a158de9e9",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "receiver": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "tokenId": "2312054",
          "quantity": "10"
        },
        {
          "id": "0x1ab0a99382c2ccbed4b64cf1407be214e5d23deff5028a1e4c751d65a1864c04",
          "blockHeight": "2155087",
          "timestamp": "2023-08-03T21:52:01",
          "claimer": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "receiver": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "tokenId": "2311934",
          "quantity": "100"
        },
        {
          "id": "0x7cb2474628b4ca6598c008b47dd3956632813b38c6ade08f64dbf59c7d5ad658",
          "blockHeight": "2155092",
          "timestamp": "2023-08-03T21:52:11",
          "claimer": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "receiver": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "tokenId": "2312138",
          "quantity": "1"
        }
      ]
    },
    "dailyAggregations": {
      "nodes": [
        {
          "id": "2023-08-03",
          "totalQuantity": "3184"
        }
      ]
    }
  }
}
```

::: tip Code
The final code of this project can be found [here](https://github.com/subquery/subquery-example-base-nft).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
