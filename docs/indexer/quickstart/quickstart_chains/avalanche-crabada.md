# Avalanche Quick Start - Crabada NFTs

The goal of this quick start guide is to index all Crabada NFTs on Avalanche's C-chain.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/crabada-nft).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Avalanche. Since Avalanche's C-chain is built on Ethereum's EVM, we can use the core Ethereum framework to index it.
:::
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

<!-- @include: ../snippets/avalanche-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Crab, Transfer, Address } from "../types";
import { NewCrabLog, TransferLog } from "../types/abi-interfaces/Crabada";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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
    "encountered New Crab Log on block " + newCrabLog.blockNumber.toString(),
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
      transferLog.blockNumber.toString(),
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
      transferLog.transaction.from,
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

For the `handleNewCrab` mapping function, it receives a `NewCrabLog` which includes the transaction log data in the payload (it's autogenerated from the ABI definitions). We extract this data the instantiate a new `erc721Instance` [ethers API](../../build/mapping/ethereum.md#querying-contracts) to allow us to make contract calls for metadata URIs. Then we retrieve the `account`, `daddy`, `mommy`, and `minterAddress` from the crabs provided. We then attempt to get the existing grab, and update it with the new data relating to it before saving this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

In `handleERC721`, we recieve a `TransferLog` from the token transfer, and then retrieve the `nftId`, `fromAddress`, and `toAddress` from it. After checking that we have a Crab entity (and creating one if not), we then create a new `Transfer` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/avalanche-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
