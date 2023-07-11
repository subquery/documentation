# Gnosis Quick Start (EVM)

[Gnosis Chain](https://www.gnosis.io/) is an EVM compatible, community owned network that prioritizes credible neutrality and resiliency, open to everyone without privilege or prejudice. It aims to provide infrastructure and tools for creating, trading, and governing decentralized finance (DeFi) applications. There are several components that make up Gnosis such as the CoW Protocol, Safe, Gnosis Beacon Chain and GnosisDAO.

## Goals

The goal of this quick start guide is to index all [POAP](https://poap.xyz/) mints and transactions on the Gnosis mainnet.

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise a Gnosis project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-gnosis-poap).
:::

## 1. Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Gnosis. Since Gnosis is a EVM implementation, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.yaml`) file works as an entry point to your Gnosis project. It defines most of the details on how SubQuery will index and transform the chain data. For Gnosis, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/gnosis.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/gnosis.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/gnosis.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and mints for the POAP ERC721 contract, the first step is to import the contract abi definition which can be obtained from [here](https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415#code). Copy the entire contract ABI and save it as a file called `poap.abi.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since we are indexing all mints and transfers for the POAP ERC721 contract, you need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Gnosis is a layer-2 that is compatible
    startBlock: 12188423 # When the POAP contract was deployed https://gnosisscan.io/tx/0x2e4873cb1390f5328d389276624d1ffa833e3934657d5a791ee145defff663a2
    options:
      # Must be a key of assets
      abi: poap
      address: "0x22c1f6050e56d2876009903609a2cc3fef83b415" # this is the contract address for POAPs on Gnosis https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415
    assets:
      poap:
        file: "./abis/poap.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTokenMint
          kind: ethereum/TransactionHandler # We use ethereum handlers since Gnosis is a layer-2 that is compatible
          filter:
            ## The function can either be the function fragment or signature
            # function: '0xaf68b302'
            function: mintToken(uint256 eventId, address to)
        - handler: handleTokenTransfer
          kind: ethereum/LogHandler
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
```

The above code indicates that you will be running `handleTokenMint` and `handleTokenTransfer` mapping functions whenever there is a transaction with the function `mintToken` or a log with the signature `Transfer` on any transaction from the [POAP smart contract](https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415).

Check out our [Manifest File](../../build/manifest/gnosis.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing token information such as the `id` and the `mintBlockHeight` along with all transfers of that token. There are [foreign keys](../../build/graphql.md#entity-relationships) between all entities.

```graphql
type Event @entity {
  id: ID!
}

type Token @entity {
  id: ID!
  mintBlockHeight: BigInt!
  mintTx: String!
  mintDate: Date!
  mintReceiver: Address!
  currentHolder: Address!
  event: Event!
}

type Address @entity {
  id: ID!
}

type TokenTransfer @entity {
  id: ID! # transactionHash
  txHash: String!
  date: Date!
  blockHeight: BigInt!
  from: Address!
  to: Address!
  token: Token!
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
import { Token, Event, Address, TokenTransfer } from "../types";
```

If you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import {
  EventTokenLog,
  MintTokenTransaction,
  TransferLog,
} from "../types/abi-interfaces/PoapAbi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleLog`, and `handleTransaction`.

```ts
import { Token, Event, Address, TokenTransfer } from "../types";
import assert from "assert";
import {
  EventTokenLog,
  MintTokenTransaction,
  TransferLog,
} from "../types/abi-interfaces/PoapAbi";
import { BigNumberish } from "ethers";

async function checkGetEvent(id: BigNumberish): Promise<Event> {
  let event = await Event.get(id.toString().toLowerCase());
  if (!event) {
    event = Event.create({
      id: id.toString().toLowerCase(),
    });

    await event.save();
  }
  return event;
}

async function checkGetAddress(id: string): Promise<Event> {
  let address = await Address.get(id.toLowerCase());
  if (!address) {
    address = Address.create({
      id: id.toLowerCase(),
    });

    await address.save();
  }
  return address;
}

export async function handleTokenMint(tx: MintTokenTransaction): Promise<void> {
  logger.info(`New Token Mint transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  // logger.info(JSON.stringify(tx.args));
  const [eventId, receiverId] = tx.args;
  const event = await checkGetEvent(await eventId);
  const receiver = await checkGetAddress(await receiverId);

  // The tokenID is from the logs from this transaction
  // This searches by the function fragment signature to get the right log
  const log = tx.logs?.find((log) =>
    log.topics.includes(
      "0x4b3711cd7ece062b0828c1b6e08d814a72d4c003383a016c833cbb1b45956e34"
    )
  ) as EventTokenLog;

  if (log) {
    const tokenId = log.args?.tokenId;
    assert(tokenId, "No tokenID");

    const newToken = Token.create({
      id: tokenId.toString(),
      mintTx: tx.hash,
      mintBlockHeight: BigInt(tx.blockNumber),
      mintDate: new Date(Number(tx.blockTimestamp) * 1000), // Saved as a seconds epoch
      mintReceiverId: receiver.id,
      currentHolderId: receiver.id,
      eventId: event.id,
    });

    await newToken.save();
  }
}

export async function handleTokenTransfer(log: TransferLog) {
  logger.info(`New Token Transfer log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  // We ignore all transfers from 0x0000000000000000000000000000000000000000 since they are from the original mint
  if (log.args.from != "0x0000000000000000000000000000000000000000") {
    const from = await checkGetAddress(await log.args.from);
    const to = await checkGetAddress(await log.args.to);
    let token = await Token.get(await log.args.tokenId.toString());

    if (!token) {
      token = Token.create({
        id: log.args.tokenId.toString(),
        mintBlockHeight: BigInt(log.blockNumber),
        mintDate: new Date(Number(log.block.timestamp) * 1000), // Saved as a seconds epoch
        mintReceiverId: to.id,
        currentHolderId: to.id,
      });
    }

    const newTokenTransfer = TokenTransfer.create({
      id: log.transactionHash,
      txHash: log.transactionHash,
      date: new Date(Number(log.block.timestamp) * 1000), // Saved as a seconds epoch
      blockHeight: BigInt(log.blockNumber),
      fromId: from.id,
      toId: to.id,
      tokenId: token.id,
    });

    await newTokenTransfer.save();

    token.currentHolderId = to.id;
    await token.save();
  }
}
```

The `handleTokenMint` function receives a `tx` parameter of type `MintTokenTransaction` which is typed from the POAP ABI. This includes transaction function payload data. We first check that we already have an entity for the `Event` and `receiver` address. We then also search through the attached transaction logs for the specific log that includes the resulting `tokenId` that was minted. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

The `handleTokenTransfer` receives a typed `TransferLog` that contains information about a transfer event of a specific POAP token. It extracts this, ignores if the transfer is from the root account (`0x0000000000000000000000000000000000000000`), and then saves this transfer data. It also retrieves and updates the `currentHolderId` of the token itself.

Check out our [Mappings](../../build/mapping/gnosis.md) documentation to get more information on mapping functions.

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

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
# Write your query or mutation here
query {
  tokens(first: 5, orderBy: MINT_BLOCK_HEIGHT_DESC) {
    nodes {
      id
      mintBlockHeight
      mintReceiverId
      mintDate
      eventId
    }
  }
  addresses(first: 5, orderBy: TOKENS_BY_CURRENT_HOLDER_ID_COUNT_DESC) {
    nodes {
      id
      tokensByCurrentHolderId(first: 5) {
        totalCount
        nodes {
          id
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
    "transfers": {
      "totalCount": 1,
      "nodes": [
        {
          "id": "0xb7b6c9cc58ded302e5c0a7d5343af35ea260c315fbe03ca7305f02cd8ea342f0",
          "blockHeight": "11566752",
          "from": "0x0000000000000000000000000000000000000000",
          "to": "0xBF3d6f830CE263CAE987193982192Cd990442B53",
          "value": "1000000000000000000",
          "contractAddress": "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-gnosis-poap).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
