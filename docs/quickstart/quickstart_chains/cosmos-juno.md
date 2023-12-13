# Juno Quick Start

The goal of this quick start guide is to adapt the standard starter project in the Juno Network and then begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos.

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/juno-terra-developer-fund-votes).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 9700000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "execute",
              messageFilter: {
                type: "/cosmwasm.wasm.v1.MsgExecuteContract",
              },
            },
          },
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/cosmwasm.wasm.v1.MsgExecuteContract",
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running a `handleTerraDeveloperFund` mapping function whenever there is a message with a `vote` contract call from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Update the `schema.graphql` file as follows. The aim is to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will see four exported functions: `handleBlock`, `handleEvent`, `handleMessage`, `handleTransaction`. Delete `handleBlock`, `handleEvent`, and `handleTransaction` functions as you will only deal with the `handleMessage` function.

The `handleMessage` function receives event data whenever an event matches the filters that you specified previously in the `project.ts`. Let’s update it to process all `vote` messages and save them to the GraphQL entity created earlier.

Update the `handleMessage` function as follows (**note the additional imports**):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

Let’s understand how the above code works.

Here, the function receives a `CosmosMessage` which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  votes(first: 3, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "votes": {
      "nodes": [
        {
          "id": "14B3EE22278C494DFE90EA440A4F049F2D39A31634F0062B0FF362DB2872A979-0",
          "blockHeight": "3246683",
          "voter": "juno1njyvry0t3j5dy4rr6ar5zfglg3cy2e8u745hl7",
          "vote": true
        },
        {
          "id": "23329451CAFF77D5A0416013045530011F4FAFEA94FEEF43784CDF0947B6CA90-0",
          "blockHeight": "3246670",
          "voter": "juno1ewq9l5ae69csh57j8sgjh8z37ypm3lt0jzamwy",
          "vote": true
        },
        {
          "id": "BEAB15E994A4E99BD0631DACF4716C5627E5D0C14E0848BF07A45609CEFB2F0D-0",
          "blockHeight": "3246665",
          "voter": "juno1az0ehz2e5emudyh8hx2qwtfely0lstzj08gg9j",
          "vote": true
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/juno-terra-developer-fund-votes).
:::

<!-- @include: ../snippets/whats-next.md -->
