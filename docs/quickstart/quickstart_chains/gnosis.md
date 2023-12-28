# Gnosis Quick Start

[Gnosis Chain](https://www.gnosis.io/) is an EVM compatible, community owned network that prioritizes credible neutrality and resiliency, open to everyone without privilege or prejudice. It aims to provide infrastructure and tools for creating, trading, and governing decentralized finance (DeFi) applications. There are several components that make up Gnosis such as the CoW Protocol, Safe, Gnosis Beacon Chain and GnosisDAO.

The goal of this quick start guide is to index all [POAP](https://poap.xyz/) mints and transactions on the Gnosis mainnet.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Gnosis/gnosis-poap).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Gnosis. Since Gnosis is a EVM implementation, we can use the core Ethereum framework to index it.
:::

As we are indexing all transfers and mints for the POAP ERC721 contract, the first step is to import the contract abi definition which can be obtained from [here](https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415#code). Copy the entire contract ABI and save it as a file called `poap.abi.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since we are indexing all mints and transfers for the POAP ERC721 contract, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // When the POAP contract was deployed https://gnosisscan.io/tx/0x2e4873cb1390f5328d389276624d1ffa833e3934657d5a791ee145defff663a2
      startBlock: 12188423,
      options: {
        // Must be a key of assets
        abi: "poap",
        // this is the contract address for POAPs on Gnosis https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415
        address: "0x22c1f6050e56d2876009903609a2cc3fef83b415",
      },
      assets: new Map([["poap", { file: "./abis/poap.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTokenMint",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0xaf68b302'
               */
              function: "mintToken(uint256 eventId, address to)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
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

The above code indicates that you will be running `handleTokenMint` and `handleTokenTransfer` mapping functions whenever there is a transaction with the function `mintToken` or a log with the signature `Transfer` on any transaction from the [POAP smart contract](https://gnosisscan.io/token/0x22c1f6050e56d2876009903609a2cc3fef83b415).

<!-- @include: ../snippets/gnosis-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing token information such as the `id` and the `mintBlockHeight` along with all transfers of that token. There are [foreign keys](../../build/graphql.md#entity-relationships) between all entities.

```graphql
type Event @entity {
  id: ID!
}

type Token @entity {
  id: ID!
  mintBlockHeight: BigInt!
  mintTx: String
  mintDate: Date!
  mintReceiver: Address!
  currentHolder: Address!
  event: Event
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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Token, Event, Address, TokenTransfer } from "../types";
import {
  EventTokenLog,
  MintTokenTransaction,
  TransferLog,
} from "../types/abi-interfaces/PoapAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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

<!-- @include: ../snippets/gnosis-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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
    "tokens": {
      "nodes": [
        {
          "id": "16947",
          "mintBlockHeight": "12293177",
          "mintReceiverId": "0xbcb0d39073ad99aa68fb6d7b2c2a433892af6fb3",
          "mintDate": "2020-10-01T17:04:40",
          "eventId": "361"
        },
        {
          "id": "16946",
          "mintBlockHeight": "12292651",
          "mintReceiverId": "0x05b512f909daae5575afb47b3eeb0b0afeb14c00",
          "mintDate": "2020-10-01T16:20:30",
          "eventId": "69"
        },
        {
          "id": "16945",
          "mintBlockHeight": "12291133",
          "mintReceiverId": "0x0542e8f95f765b81cd6a08db37d914f664db5d3e",
          "mintDate": "2020-10-01T14:13:20",
          "eventId": "405"
        },
        {
          "id": "16944",
          "mintBlockHeight": "12290462",
          "mintReceiverId": "0xa615f34b170329507b37c142f8f812b8e1393beb",
          "mintDate": "2020-10-01T13:16:35",
          "eventId": "405"
        },
        {
          "id": "16943",
          "mintBlockHeight": "12290460",
          "mintReceiverId": "0xe07e487d5a5e1098bbb4d259dac5ef83ae273f4e",
          "mintDate": "2020-10-01T13:16:25",
          "eventId": "405"
        }
      ]
    },
    "addresses": {
      "nodes": [
        {
          "id": "0xb8d7b045d299c9c356bc5ee4fe2dddc8a31280a5",
          "tokensByCurrentHolderId": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "16924"
              }
            ]
          }
        },
        {
          "id": "0xba993c1fee51a4a937bb6a8b7b74cd8dffdca1a4",
          "tokensByCurrentHolderId": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "16912"
              }
            ]
          }
        },
        {
          "id": "0x2b098ce1d5a4f9c2729268a4a3f04b387d4cc7ec",
          "tokensByCurrentHolderId": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "16921"
              }
            ]
          }
        },
        {
          "id": "0x60df279f7cc51d2f0ff903f68c3a8dfcf65419f7",
          "tokensByCurrentHolderId": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "16916"
              }
            ]
          }
        },
        {
          "id": "0x626ea6d1e5ea3fbaba22f5d4005d98e7039d0c99",
          "tokensByCurrentHolderId": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "16919"
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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Gnosis/gnosis-poap).
:::

<!-- @include: ../snippets/whats-next.md -->
