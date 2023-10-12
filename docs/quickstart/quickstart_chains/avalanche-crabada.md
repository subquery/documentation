# Avalanche Quick Start - Crabada NFTs

## Goals

The goal of this quick start guide is to index all Crabada NFTs on Avalanche's C-chain.

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Avalanche project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/crabada-nft).
:::

## 1. Update Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Avalanche. Since Avalanche's C-chain is built on Ethereum's EVM, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.ts`) file works as an entry point to your Avalanche project. It defines most of the details on how SubQuery will index and transform the chain data. For Avalanche, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

We are indexing actions from the Crabada NFT contract, first you will need to import the contract abi defintion from https://snowtrace.io/address/0xe48b3a0dc82be39bba7b895c9ff1d788a54edc47#code. You can copy the entire JSON and save as a file `./abis/crabada.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Crabada NFTs, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // First mint https://snowtrace.io/tx/0x17336f3699f922c245663a50fba2d857c368f6c8137024b980cc2e7042e4df87
      startBlock: 30128346,
      options: {
        // Must be a key of assets
        abi: "crabada",
        // Crabada Legacy Contract https://snowtrace.io/address/0xCB7569a6Fe3843c32512d4F3AB35eAE65bd1D50c
        address: "0xCB7569a6Fe3843c32512d4F3AB35eAE65bd1D50c",
      },
      assets: new Map([["erc20", { file: "./abis/crabada.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleERC721",
            filter: {
              topics: ["Transfer(address from, address to, uint256 tokenId)"],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleNewCrab",
            filter: {
              topics: [
                "NewCrab(address account, uint256 id, uint256 daddyId, uint256 mommyId, uint256 dna, uint64 birthday, uint8 breedingCount)\n",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleNewCrab` mapping function whenever there is an `NewCrab` log on any transaction from the [Crabada Legacy Contract](https://snowtrace.io/address/0xCB7569a6Fe3843c32512d4F3AB35eAE65bd1D50c).

Additionally, whenever there is a `Transfer` log that relates to any token from the [Crabada Legacy Contract](https://snowtrace.io/address/0xCB7569a6Fe3843c32512d4F3AB35eAE65bd1D50c), we run a `handleERC721` mapping function.

Check out our [Manifest File](../../build/manifest/avalanche.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing three entities, a `Deposit` and a `Withdrawl` each with a [foreign key relationship](../../build/graphql.md#entity-relationships) to the `User`.

```graphql
type Crab @entity {
  id: ID!
  address: Address!
  daddy: Crab
  mommy: Crab
  dna: BigInt
  birthday: BigInt
  breeding_count: Int
  minted_block: BigInt! # Should be bigInt
  minted_timestamp: BigInt! # unix epoch timestamp
  minter_address: Address! # event transaction from
  current_owner: Address! # event args to
  metadata_url: String
}

type Transfer @entity {
  id: ID!
  tokenId: String!
  block: BigInt
  timestamp: BigInt
  transaction_hash: String # event transaction hash
  crab: Crab
  from: Address!
  to: Address!
}

type Address @entity {
  id: ID! # Address?
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

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entites can be imported from the following directory:

```ts
import { Crab, Transfer, Address } from "../types";
```

As you're creating a new EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

In the example Crabada SubQuery project, you would import these types like so.

```ts
import { NewCrabLog, TransferLog } from "../types/abi-interfaces/Crabada";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import assert from "assert";
import { Crab, Transfer, Address } from "../types";
import { NewCrabLog, TransferLog } from "../types/abi-interfaces/Crabada";
import { Crabada__factory } from "../types/contracts/factories/Crabada__factory";

async function checkCreateAddress(id: string): Promise<Address> {
  let address = await Address.get(id.toLowerCase());
  if (!address) {
    address = Address.create({
      id: id.toLowerCase(),
    });
    await address.save();
  }
  return address;
}

export async function handleNewCrab(newCrabLog: NewCrabLog): Promise<void> {
  logger.info(
    "encountered New Crab Log on block " + newCrabLog.blockNumber.toString()
  );
  // Process remainder
  assert(newCrabLog.args, "Requires args");
  const erc721Instance = Crabada__factory.connect(newCrabLog.address, api);
  const account = await checkCreateAddress(newCrabLog.args.account);
  const daddy = await Crab.get(newCrabLog.args.daddyId.toString());
  const mommy = await Crab.get(newCrabLog.args.mommyId.toString());
  const minterAddress = await checkCreateAddress(newCrabLog.transaction.from);

  let metadataUri;
  try {
    // metadata possibly undefined
    // nft can share same metadata
    // if collection.name and symbol exist, meaning there is metadata on this contract
    metadataUri = await erc721Instance.tokenURI(newCrabLog.args.id);
  } catch (e) {}

  let crab = await Crab.get(newCrabLog.args.id.toString());
  // Reset crab with new data
  crab = Crab.create({
    id: newCrabLog.args.id.toString(),
    addressId: account.id,
    daddyId: daddy?.id,
    mommyId: mommy?.id,
    dna: newCrabLog.args.dna.toBigInt(),
    birthday: newCrabLog.args.birthday.toBigInt(),
    breeding_count: newCrabLog.args.breedingCount,
    minted_block: BigInt(newCrabLog.blockNumber),
    minted_timestamp: newCrabLog.block.timestamp,
    minter_addressId: minterAddress.id,
    current_ownerId: account.id,
    metadata_url: metadataUri,
  });

  await crab.save();
}

export async function handleERC721(transferLog: TransferLog): Promise<void> {
  logger.info(
    "encountered crabada transfer on block " +
      transferLog.blockNumber.toString()
  );

  assert(transferLog.args, "No event args on erc721");

  const nftId = transferLog.args.tokenId.toString();
  const fromAddress = await checkCreateAddress(transferLog.args.from);
  const toAddress = await checkCreateAddress(transferLog.args.to);

  let crab = await Crab.get(nftId);
  if (crab) {
    logger.info(`We have seen crab ${nftId} before`);
  } else {
    logger.info(`We have not seen crab ${nftId} before`);
    const account = await checkCreateAddress(transferLog.address.toLowerCase());
    const minterAddress = await checkCreateAddress(
      transferLog.transaction.from
    );
    // We create a minimal version so we can proceed
    crab = Crab.create({
      id: nftId,
      addressId: account.id,
      minted_block: BigInt(transferLog.blockNumber),
      minted_timestamp: transferLog.block.timestamp,
      minter_addressId: minterAddress.id,
      current_ownerId: toAddress.id,
    });
    await crab.save();
  }

  // Create the transfer record
  const transfer = Transfer.create({
    id: `${transferLog.transactionHash}-${transferLog.logIndex.toString()}`,
    tokenId: transferLog.args.tokenId.toString(),
    block: BigInt(transferLog.blockNumber),
    timestamp: transferLog.block.timestamp,
    transaction_hash: transferLog.transactionHash,
    crabId: crab.id,
    fromId: fromAddress.id,
    toId: toAddress.id,
  });

  await transfer.save();
}
```

Let’s understand how the above code works.

For the `handleNewCrab` mapping function, it receives a `NewCrabLog` which includes the transaction log data in the payload (it's autogenerated from the ABI definitions). We extract this data the instantiate a new `erc721Instance` [ethers API](../../build/mapping/avalanche.md#querying-contracts) to allow us to make contract calls for metadata URIs. Then we retrieve the `account`, `daddy`, `mommy`, and `minterAddress` from the crabs provided. We then attempt to get the existing grab, and update it with the new data relating to it before saving this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

In `handleERC721`, we recieve a `TransferLog` from the token transfer, and then retrieve the `nftId`, `fromAddress`, and `toAddress` from it. After checking that we have a Crab entity (and creating one if not), we then create a new `Transfer` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/avalanche.md) documentation to get more information on mapping functions.

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

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

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
query {
  crabs(first: 5, orderBy: MINTED_BLOCK_DESC) {
    totalCount
    nodes {
      id
      addressId
      daddyId
      mommyId
      dna
      birthday
      breedingCount
      mintedBlock
      mintedTimestamp
      currentOwnerId
      minterAddressId
      metadataUrl
      transfers(first: 5, orderBy: BLOCK_DESC) {
        totalCount
        nodes {
          transactionHash
          block
          crabId
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
    "crabs": {
      "totalCount": 28320,
      "nodes": [
        {
          "id": "468847",
          "addressId": "0x57a3f535a6edce9fba36af2294462e004fb05050",
          "daddyId": "459898",
          "mommyId": "459907",
          "dna": "618396472672434515354154125260029701206476861469507044587729342789599518302",
          "birthday": "1664233214",
          "breedingCount": 3,
          "mintedBlock": "30160740",
          "mintedTimestamp": "1684378541",
          "currentOwnerId": "0x57a3f535a6edce9fba36af2294462e004fb05050",
          "minterAddressId": "0x45f54251dc012524791d14e5089dc67c5199004d",
          "metadataUrl": null,
          "transfers": {
            "totalCount": 1,
            "nodes": [
              {
                "transactionHash": "0x0698664b653fa518f8fedb5f620ecd76410ada525197419d65450d7110a31d6e",
                "block": "30160740",
                "crabId": "468847"
              }
            ]
          }
        },
        {
          "id": "468812",
          "addressId": "0xfcc9e06736a4700842de9b74a350b6dc8eb3fb9e",
          "daddyId": null,
          "mommyId": null,
          "dna": "455846542712823157032490755191673239445204276297111363276289902986384010862",
          "birthday": "1664232661",
          "breedingCount": 0,
          "mintedBlock": "30160740",
          "mintedTimestamp": "1684378541",
          "currentOwnerId": "0xfcc9e06736a4700842de9b74a350b6dc8eb3fb9e",
          "minterAddressId": "0x45f54251dc012524791d14e5089dc67c5199004d",
          "metadataUrl": null,
          "transfers": {
            "totalCount": 1,
            "nodes": [
              {
                "transactionHash": "0x0698664b653fa518f8fedb5f620ecd76410ada525197419d65450d7110a31d6e",
                "block": "30160740",
                "crabId": "468812"
              }
            ]
          }
        },
        {
          "id": "468820",
          "addressId": "0xe7ee8b644d8938a8a7be599f99c21f618cba3e8f",
          "daddyId": "459689",
          "mommyId": "459687",
          "dna": "491183484008390843624156705206532834116397578442780201281914094049666930198",
          "birthday": "1664232789",
          "breedingCount": 2,
          "mintedBlock": "30160740",
          "mintedTimestamp": "1684378541",
          "currentOwnerId": "0xe7ee8b644d8938a8a7be599f99c21f618cba3e8f",
          "minterAddressId": "0x45f54251dc012524791d14e5089dc67c5199004d",
          "metadataUrl": null,
          "transfers": {
            "totalCount": 1,
            "nodes": [
              {
                "transactionHash": "0x0698664b653fa518f8fedb5f620ecd76410ada525197419d65450d7110a31d6e",
                "block": "30160740",
                "crabId": "468820"
              }
            ]
          }
        },
        {
          "id": "468816",
          "addressId": "0x9a08fa6d83812318caa29772cdffd55a48343c39",
          "daddyId": "459941",
          "mommyId": "451583",
          "dna": "514152495850509839908739572716192611354096695614913321283260330842175907109",
          "birthday": "1664232725",
          "breedingCount": 2,
          "mintedBlock": "30160740",
          "mintedTimestamp": "1684378541",
          "currentOwnerId": "0x9a08fa6d83812318caa29772cdffd55a48343c39",
          "minterAddressId": "0x45f54251dc012524791d14e5089dc67c5199004d",
          "metadataUrl": null,
          "transfers": {
            "totalCount": 1,
            "nodes": [
              {
                "transactionHash": "0x0698664b653fa518f8fedb5f620ecd76410ada525197419d65450d7110a31d6e",
                "block": "30160740",
                "crabId": "468816"
              }
            ]
          }
        },
        {
          "id": "468825",
          "addressId": "0xfcc9e06736a4700842de9b74a350b6dc8eb3fb9e",
          "daddyId": null,
          "mommyId": "456995",
          "dna": "535354660627850451863739142725108770444746476243334240700692594647251497779",
          "birthday": "1664232942",
          "breedingCount": 0,
          "mintedBlock": "30160740",
          "mintedTimestamp": "1684378541",
          "currentOwnerId": "0xfcc9e06736a4700842de9b74a350b6dc8eb3fb9e",
          "minterAddressId": "0x45f54251dc012524791d14e5089dc67c5199004d",
          "metadataUrl": null,
          "transfers": {
            "totalCount": 1,
            "nodes": [
              {
                "transactionHash": "0x0698664b653fa518f8fedb5f620ecd76410ada525197419d65450d7110a31d6e",
                "block": "30160740",
                "crabId": "468825"
              }
            ]
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/crabada-nft).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
