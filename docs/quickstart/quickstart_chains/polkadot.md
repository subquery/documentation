# Polkadot/Substrate Quick Start

The goal of this quick guide is to adapt the standard starter project and start indexing all transfers from Polkadot.

<!-- @include: ../snippets/quickstart-reference.md -->

#### Check out how to get the Polkadot starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/cEHA2E3crZ8" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing all transfers from Polkadot:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

<!-- @include: ../snippets/codegen.md -->

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

<!-- @include: ../snippets/polkadot-manifest-intro.md#level2 -->

**Since we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleEvent",
            filter: {
              module: "balances",
              method: "Transfer",
            },
          },
        ],
      },
    },
  ],
}
```

This indicates that you will be running a `handleEvent` mapping function whenever there is an event emitted from the `balances` module with the `transfer` method.

<!-- @include: ../snippets/polkadot-manifest-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory. You will see three exported functions: `handleBlock`, `handleEvent`, and `handleCall`. Delete both the `handleBlock` and `handleCall` functions as you will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that you specified previously in the `project.ts`. Let’s update it to process all `balances.Transfer` events and save them to the GraphQL entities created earlier.

Update the `handleEvent` function as follows (**note the additional imports**):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.amount = (amount as Balance).toBigInt();
  await transfer.save();
}
```

Let’s understand how the above code works.

The function here receives a `SubstrateEvent` which includes transfer data in the payload. We extract this data and then instantiate a new `Transfer` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (_SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/polkadot-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    transfers(first: 5, orderBy: AMOUNT_DESC) {
      nodes {
        id
        amount
        blockNumber
        from
        to
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
      "transfers": {
        "nodes": [
          {
            "id": "303284-59",
            "amount": "90000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu"
          },
          {
            "id": "303284-65",
            "amount": "85936000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR"
          },
          {
            "id": "303284-71",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX"
          },
          {
            "id": "303284-77",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA"
          },
          {
            "id": "303284-83",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS"
          }
        ]
      }
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
