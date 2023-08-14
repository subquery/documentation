# Optimism Quick Start

## Goals

The goal of this quick start guide is to index all claim events from the Optimism airdrop contract.

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an Optimism project
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subql-example-optimism-airdrop). We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Optimism. Since Optimism is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Optimism project. It defines most of the details on how SubQuery will index and transform the chain data. For Optimism, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/optimism.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/optimism.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/optimism.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all claim events from the Optimism airdrop contract, the first step is to import the contract abi definition which can be obtained from [here](https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de#code). Copy the entire contract ABI and save it as a file called `airdrop.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Optimism is a layer-2 that is compatible
    startBlock: 9277162 # When the airdrop contract was deployed https://optimistic.etherscan.io/tx/0xdd10f016092f1584912a23e544a29a638610bdd6cb42a3e8b13030fd78334eba
    options:
      # Must be a key of assets
      abi: airdrop
      address: "0xFeDFAF1A10335448b7FA0268F56D2B44DBD357de" # this is the contract address for Optimism Airdrop https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de
    assets:
      airdrop:
        file: "./abis/airdrop.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleClaim
          kind: ethereum/LogHandler # We use ethereum handlers since Optimism is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Claimed(uint256 index, address account, uint256 amount)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleClaim` mapping function whenever there is a `Claimed` log on any transaction from the [Optimism airdrop contract](https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de#code).

Check out our [Manifest File](../../build/manifest/optimism.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight and timestamp along with the value and the total claimed amount.

```graphql
type Claim @entity {
  id: ID! # Index
  transaction_hash: String!
  account: String!
  value: BigInt!
  block_height: BigInt!
  block_timestamp: BigInt!
  daily_claim_summary: DailyClaimSummary!
}

type DailyClaimSummary @entity {
  id: ID! # this is the ISO string of the day e.g. '2023-03-26'
  total_claimed: BigInt!
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
import { Claim, DailyClaimSummary } from "../types";
```

If you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import { ClaimedLog } from "../types/abi-interfaces/AirdropAbi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleLog`, and `handleTransaction`. Replace these functions with the following code:

```ts
async function checkGetDailyClaim(
  timestamp: bigint
): Promise<DailyClaimSummary> {
  // Create the ID from the iso date string (e.g. '2023-03-26')
  // Timestamps are in seconds, need to convert to ms
  const id = new Date(Number(timestamp) * 1000).toISOString().substring(0, 10);
  // Read to see if there is an existing aggregation record
  let dailyClaimSummary = await DailyClaimSummary.get(id);
  if (!dailyClaimSummary) {
    // This is a new day! Create a new aggregation
    dailyClaimSummary = DailyClaimSummary.create({
      id,
      total_claimed: BigInt(0),
    });
  }
  return dailyClaimSummary;
}

export async function handleClaim(log: ClaimedLog): Promise<void> {
  logger.info(`New claimed log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  // We make sure we have a daily claim aggregation to update
  const dailyClaimSummary = await checkGetDailyClaim(log.block.timestamp);

  const newClaim = Claim.create({
    id: log.args.index.toString(),
    account: log.args.account,
    transaction_hash: log.transactionHash,
    block_height: BigInt(log.blockNumber),
    block_timestamp: log.block.timestamp,
    value: log.args.amount.toBigInt(),
    daily_claim_summaryId: dailyClaimSummary.id,
  });

  // We update the daily aggregation
  dailyClaimSummary.total_claimed += newClaim.value;

  // Save data to the store
  await dailyClaimSummary.save();
  await newClaim.save();
}
```

The `handleClaim` function receives a `log` parameter of type `ClaimedLog` which includes transaction log data in the payload. We extract this data, assign it to our newClaim object, and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_). We also call the `checkGetDailyClaim` function to retrieve the existing day aggregation (and create a new one if we need to), and the update the `total_claimed` on it.

Check out our [Mappings](../../build/mapping/optimism.md) documentation to get more information on mapping functions.

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

Whenever you create a new SubQuery Project, it is recommended to run it locally and test it. Using Docker is the easiest and quickest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project which you have just initialised, you won't need to change anything.

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
# Write your query or mutation q{here
query {
  claims(first: 5, orderBy: VALUE_DESC) {
    nodes {
      blockHeight
      value
      blockHeight
      blockTimestamp
      account
    }
  }
  dailyClaimSummaries(first: 5) {
    nodes {
      id
      totalClaimed
      claims(first: 5) {
        totalCount
        nodes {
          id
          account
          value
        }
      }
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
          "blockHeight": "100322581",
          "value": "7477664852469040021504",
          "blockTimestamp": "1684714980",
          "account": "0x85399353400C5B67fD6eE53B1d2cd183bAE7dDdb"
        },
        {
          "blockHeight": "100316590",
          "value": "1746193727981909180416",
          "blockTimestamp": "1684711341",
          "account": "0xfa4d3CD41555d3A0FafD4A97e9ba91882A2f4755"
        }
      ]
    },
    "dailyClaimSummaries": {
      "nodes": [
        {
          "id": "2023-05-21",
          "totalClaimed": "9223858580450949201920",
          "claims": {
            "totalCount": 2,
            "nodes": [
              {
                "id": "247333",
                "account": "0xfa4d3CD41555d3A0FafD4A97e9ba91882A2f4755",
                "value": "1746193727981909180416"
              },
              {
                "id": "129721",
                "account": "0x85399353400C5B67fD6eE53B1d2cd183bAE7dDdb",
                "value": "7477664852469040021504"
              }
            ]
          }
        }
      ]
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
