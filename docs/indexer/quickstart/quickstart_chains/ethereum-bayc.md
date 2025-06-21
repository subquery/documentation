# Ethereum Quick Start - BAYC (Simple)

The goal of this article is to provide a comprehensive guide to setting up an indexer for the Bored Ape Yacht Club (BAYC) smart contract. By the end of this guide, readers will have a clear understanding of the following what BAYC is and why its smart contract data is valuable for indexing. This guide also shows how to set up an indexer, step by step, to track and index data from the BAYC smart contract on the Ethereum blockchain.

**This guide is designed to seamlessly lead you through the steps of configuring your personal BAYC SubQuery indexer.**

## Setting Up the Indexer

In this BAYC indexing project, our main goal is to set up the indexer to only collect information from one smart contract: `0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D`, the [BAYC contract](https://etherscan.io/address/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D).

The BAYC contract builds on [OpenZeppelin's ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) with special BAYC features. You can find the contract's source code on [Etherscan](https://etherscan.io/address/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D#code) or [Github](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) for easier reading.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
You can find the full and detailed code [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-bayc) to see all the intricate details.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

You only need to set up one handler to index a specific type of log from this contract, which is the `OrderFulfilled` log. Update your manifest file to look like this:

```ts
import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "ethereum-subql-starter",
  description:
    "This project can be use as a starting point for developing your new Ethereum SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    chainId: "1",
    endpoint: ["https://eth.api.onfinality.io/public"],
    dictionary: "https://gx.api.subquery.network/sq/subquery/eth-dictionary",
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 12287507,

      options: {
        abi: "bayc",
        address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      },
      assets: new Map([["bayc", { file: "./abis/bayc.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleMint",
            filter: {
              function: "mintApe(uint256)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleTransfer",
            filter: {
              topics: [
                "Transfer(address indexed from, address indexed to, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

export default project;
```

As evident in the manifest file, this project includes two handlers: firstly, a transaction handler responsible for capturing the `mintApe` function, and secondly, a log handler tasked with indexing the `Transfer` log.

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Now, let's think about what information we can get from this smart contract for later searching.

```graphql
type Transfer @entity {
  id: ID!
  from: String!
  to: String!
  tokenId: BigInt!
  blockNumber: BigInt!
  transactionHash: String!
  timestamp: BigInt!
  date: Date!
  boredApe: BoredApe!
}

type Mint @entity {
  id: ID!
  minter: String!
  boredApe: BoredApe!
  timestamp: BigInt!
  date: Date!
}

type BoredApe @entity {
  id: ID!
  creator: String!
  currentOwner: String!
  blockNumber: BigInt!
  prorepties: Properties!
}

type Properties @jsonField {
  image: String
  background: String
  clothes: String
  earring: String
  eyes: String
  fur: String
  hat: String
  mouth: String
}
```

Three entities are derived from the handlers mentioned earlier: `BoredApes`, `Mint` (used to store data associated with BoredApe transaction creation), and `Transfers` of BoredApes. The Bored Ape entity features a `currentOwner`, which changes with each transfer, and it includes properties like metadata stored on IPFS. Clearly, these apes were initially created using a specific function and may have been transferred, and this project monitors both types of transaction entities. Both the `Transfer` and `Mint` entities are associated with a `BoredApe`, enabling retrieval of all transfers and the `Mint` entity within the Bored Ape entity.

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Transfer, BoredApe, Properties, Mint } from "../types";
import { TransferLog } from "../types/abi-interfaces/BaycAbi";
import { MintApeTransaction } from "../types/abi-interfaces/BaycAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/evm-mappings.md) documentation.
:::

Writing mappings for this smart contract is a straightforward process. To provide better context, we've included this handler in a separate file `mappingHandlers.ts` within the `src/mappings` directory. Let's start by importing the necessary modules.

```ts
import { TransferLog } from "../types/abi-interfaces/BaycAbi";
import { Transfer, BoredApe, Properties, Mint } from "../types";
import { MintApeTransaction } from "../types/abi-interfaces/BaycAbi";
import fetch from "node-fetch";
import assert from "assert";
```

`Transfer`, `BoredApe`, `Mint`, `Properties` and other models were created in a [previous step](#2-updating-graphql-schema-file). On the other hand, `OrderFulfilledLog` is a TypeScript model automatically generated by the SubQuery SDK to make it easier to work with events.

You may have noticed that we import the `fetch` function from the "node-fetch" library. This import is necessary for querying an HTTP gateway that retrieves data from IPFS. Since we're fetching data from external API endpoints, it's essential to launch the node with the `--unsafe` flag. For further details, please refer to the [documentation](https://academy.subquery.network/build/mapping/ethereum.html#third-party-library-support-the-sandbox).

As a recap of the setup procedure detailed in the [Manifest File](#1configuring-manifest-file), it's important to note that this project includes two handlers: `handleMint` and `handleTransfer`. In the provided example, we've established a connection between these handlers. Now, let's examine the end code:

```ts
async function getOrCreateApe(event: TransferLog): Promise<BoredApe> {
  assert(event.args);
  let boredApe = await BoredApe.get(event.args.tokenId.toString());

  if (boredApe == undefined) {
    const ipfshash = "QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq";
    let tokenURI = "/" + event.args.tokenId.toString();
    let fullURI = ipfshash + tokenURI;

    let content = await (await fetch("https://ipfs.io/ipfs/" + fullURI)).json();

    const properties: Properties = {};

    if (content) {
      properties.image = content.image;
      let attributes = content.attributes;
      if (attributes) {
        for (const attribute of attributes) {
          let trait_type = attribute.trait_type;
          let value_type = attribute.value;

          let trait: string;
          let value: string;

          if (trait_type && value_type) {
            trait = trait_type.toString();
            value = value_type.toString();

            if (trait && value) {
              if (trait == "Background") {
                properties.background = value;
              }

              if (trait == "Clothes") {
                properties.clothes = value;
              }

              if (trait == "Earring") {
                properties.earring = value;
              }

              if (trait == "Eyes") {
                properties.eyes = value;
              }

              if (trait == "Fur") {
                properties.fur = value;
              }

              if (trait == "Hat") {
                properties.hat = value;
              }

              if (trait == "Mouth") {
                properties.mouth = value;
              }
            }
          }
        }
      }
    }

    boredApe = BoredApe.create({
      id: event.args.tokenId.toString(),
      creator: event.args.to,
      currentOwner: event.args.to,
      blockNumber: BigInt(event.blockNumber),
      prorepties: properties,
    });
  }

  boredApe.save();
  return boredApe;
}

export async function handleMint(
  transaction: MintApeTransaction,
): Promise<void> {
  assert(transaction.logs);
  let transferLog: TransferLog = transaction.logs.find(
    (e) =>
      e.topics[0] ===
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  ) as TransferLog;
  let boredApe = await getOrCreateApe(transferLog);
  let mint = Mint.create({
    id: transaction.hash.toString(),
    minter: transaction.from.toString(),
    boredApeId: boredApe.id,
    timestamp: transaction.blockTimestamp,
    date: new Date(Number(transaction.blockTimestamp)),
  });
  mint.save();
}

export async function handleTransfer(event: TransferLog): Promise<void> {
  assert(event.args);
  let boredApe = await getOrCreateApe(event);

  let transfer = Transfer.create({
    id: event.transactionHash + event.logIndex,
    from: event.args.from,
    to: event.args.to,
    tokenId: event.args.tokenId.toBigInt(),
    blockNumber: BigInt(event.blockNumber),
    transactionHash: event.transactionHash,
    timestamp: event.transaction.blockTimestamp,
    date: new Date(Number(event.transaction.blockTimestamp)),
    boredApeId: boredApe.id,
  });
  transfer.save();

  boredApe.currentOwner = event.args.to;
  boredApe.blockNumber = BigInt(event.blockNumber);
  boredApe.save();
}
```

This code snippet demonstrates `handleMint` that is handling the minting of new Bored Apes. Firstly, it asserts that `transaction.logs` exists, then it finds a specific type of log within the transaction logs (based on a topic hash) that represents a token transfer. Later it calls `getOrCreateApe` to create or retrieve the associated `BoredApe`. Finally, creates a `Mint` object with information about the minting transaction and saves it.

The second handler is `handleTransfer`, which processes transfers of Bored Apes between users. It takes a `TransferLog` object as an argument, asserts that `event.args` exists; calls `getOrCreateApe` to create or retrieve the associated `BoredApe`; creates a `Transfer` object with information about the transfer event and saves it. Lastly, it updates the `currentOwner` and `blockNumber` properties of the `BoredApe` object and saves it.

Both handlers use `getOrCreateApe` function. It attempts to retrieve a `BoredApe` object from some data source using the token ID obtained from `event.args`. If the `BoredApe` does not exist, it proceeds to create it. Apart from the data obtained from the logs it fetches additional information from an IPFS, such as image and attributes, and populates a `properties` object. Finally, it saves the `BoredApe` object and returns it.

🎉 At this stage, we have successfully incorporated all the desired entities that can be retrieved from BAYC smart contracts. For each of these entities, we've a single mapping handler to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-bayc) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  boredApes{
    nodes {
      id
      from
      to
      tokenId
      blockNumber
      transactionHash
      timestamp
      mints {
        nodes {
          id
          minter
          timestamp
          date
        }
      }
      transfers {
        nodes {
          id
          timestamp
          date
          from
          to
          transactionHash
        }
      }
    }
}
```

<!-- @include: ../snippets/whats-next.md -->
