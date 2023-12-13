# Akash Quick Start

The goal of this quick start guide is to index all [reward transactions](https://www.mintscan.io/akash/txs/808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217?height=11797219) for delegators in the [Akash network](https://akash.network/).

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Akash/akash-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 11364001,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleReward",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "withdraw_rewards",
              messageFilter: {
                type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
              },
              /*
                contractCall field can be specified here too
                values: # A set of key/value pairs that are present in the message data
                contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
              */
            },
          },
        ],
      },
    },
  ],
}
```

In the code above, we have defined a single handler, `handleReward`, that will be executed whenever a `withdraw_rewards` type is detected within a `MsgWithdrawDelegatorReward` type message. This handler is used to track the rewards transactions of delegators in the Akash network.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

For this project, you'll need to modify your schema.graphql file as follows. Since we're indexing all [reward transactions](https://www.mintscan.io/akash/txs/808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217?height=11797219) for delegators in the Akash network, we have a DelegatorReward entity that comprises a number of properties, including reward amount, delegator information, validator's address, and so forth.
We also have a Delegator entity, which keeps track of the total rewards of each delegator.

```graphql
type DelegatorReward @entity {
  id: ID!
  blockHeight: BigInt
  txHash: String
  feeDenomination: String
  feeAmount: BigInt
  rewardAmount: BigInt!
  delegator: Delegator!
  validatorAddress: String
}

type Delegator @entity {
  id: ID!
  totalRewards: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import assert from "assert";
import { DelegatorReward, Delegator } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleReward(event: CosmosEvent): Promise<void> {
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`
  );

  const recordAmountString = event.event.attributes.find(
    (a) => a.key === "amount"
  )?.value;
  const validatorAddress = event.event.attributes.find(
    (a) => a.key === "validator"
  )?.value;
  const delegatorAddress = event.tx.tx.events
    .find((e) => e.type === "coins_received")
    ?.attributes.find((a) => a.key === "receiver")?.value;

  var rewardBigInt = BigInt(0);
  if (recordAmountString && Array.from(recordAmountString)[0] != "0") {
    rewardBigInt = BigInt(recordAmountString.split("u")[0]);
  }

  // Confirm we have all required values
  assert(
    rewardBigInt && validatorAddress && delegatorAddress,
    "No reward or no msg found"
  );

  const rewardRecord = DelegatorReward.create({
    id: event.tx.hash,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    feeDenomination: event.tx.decodedTx.authInfo.fee?.amount[0].denom,
    feeAmount: event.tx.decodedTx.authInfo.fee?.amount[0].amount
      ? BigInt(event.tx.decodedTx.authInfo.fee?.amount[0].amount)
      : undefined,
    rewardAmount: rewardBigInt,
    delegatorId: delegatorAddress,
    validatorAddress: validatorAddress,
  });

  await handleDelegator(rewardRecord.rewardAmount, rewardRecord.delegatorId);
  await rewardRecord.save();
}

async function handleDelegator(reward: bigint, delegatorAddress: string) {
  let delegatorRecord = await Delegator.get(delegatorAddress);

  if (!delegatorRecord) {
    // Create new Delegator record
    delegatorRecord = Delegator.create({
      id: delegatorAddress,
      totalRewards: reward,
    });
    logger.info(
      "New delegator" + delegatorAddress + "with reward" + reward.toString()
    );
  } else {
    // Update delegators total
    delegatorRecord.totalRewards = delegatorRecord.totalRewards + reward;
  }
  await delegatorRecord.save();
}
```

In the Akash SubQuery project, we have two main functions, namely `handleReward` and `handleDelegator`, that were defined in the `src/mappings/mappingHandlers.ts` file.

The `handleReward` function is triggered when a `withdraw_rewards` type event is detected. It receives an event of type `CosmosEvent`, logs a message to the console for debugging purposes, and then tries to extract key data points such as the reward amount, validator address, and delegator address from the `event.event.attributes` (Cosmos events code attributes as an array of key-value pairs).

It then uses these attributes to create a `DelegatorReward` object, recording the reward amount and validator address associated with each reward withdrawal event. This object is subsequently saved in the GraphQL entities that we previously defined in the `schema.graphql` file.

The `handleDelegator` function is invoked within the `handleReward` function. This function is responsible for managing the `Delegator` entity. If a delegator does not already exist in the GraphQL entities, a new one is created with the reward from the current transaction. If the delegator already exists, the total rewards for the delegator are updated by adding the current reward.

This way, we're able to track all delegator rewards on the Akash network, along with the validator from whom the reward came. It's crucial to note that the `handleDelegator` function handles the Delegator entity creation and updates, whilst the `handleReward` function creates the DelegatorReward entity.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    delegatorReward(first: 1) {
      nodes {
        id
        delegatorAddress
        validatorAddress
        rewardAmount
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
      "delegatorRewards": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217",
            "delegatorAddress": "akash1ckc4z334rfpdcqdz5a85mdtaktt2dtkm58783c5",
            "validatorAddress": "akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073",
            "rewardAmount": "1440293uakt"
          }
        ]
      }
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
