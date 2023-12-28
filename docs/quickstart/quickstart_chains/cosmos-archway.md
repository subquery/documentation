# Archway Quick Start

The goal of this quick start guide is to index all [Archway contract metadata](https://docs.archway.io/developers/rewards/managing-rewards#contract-metadata) as well as all rewards paid out to contract developers.

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Archway/archway-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 1338,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleRewardsWithdrawEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "archway.rewards.v1.RewardsWithdrawEvent",
              messageFilter: {
                type: "/archway.rewards.v1.MsgWithdrawRewards",
              },
              /*
                contractCall field can be specified here too
                values: # A set of key/value pairs that are present in the message data
                contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
              */
            },
          },
          {
            handler: "handleSetContractMetadata",
            kind: CosmosHandlerKind.Message,
            filter: {
              /*
                Filter to only messages with the MsgSetContractMetadata function call
                e.g. https://archway.explorers.guru/transaction/EBEE24728FCDA79EF167625D66F438236ED17579CAA7229A562C5AB84608B5A4
              */
              type: "/archway.rewards.v1.MsgSetContractMetadata",
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running two handlers. A `handleRewardsWithdrawEvent` handler which will be triggered when a `RewardsWithdrawEvent` type is encountered on a `MsgWithdrawRewards` messageFilter type and a `handleSetContractMetadata` handler which will be triggered when a `MsgSetContractMetadata` type is encountered.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Update the `schema.graphql` file as follows. In this project, since we are indexing all [Archway's contract metadata](https://docs.archway.io/developers/rewards/managing-rewards#contract-metadata) as well as all rewards paid to contract developers, we define one entity for each to record each instance of this. Each entity has a number of properties, including id, blockheight, transaction hash and the timestamp, we are also indexing contract, owner and reward addresses.

```graphql
type ContractMetadata @entity {
  id: ID! # contractAddress
  createdBlockHeight: BigInt!
  createdDate: Date!
  createdTxHash: String!
  contractAddress: String!
  ownerAddress: String!
  rewardsAddress: String!
}

type RewardWithdrawl @entity {
  id: ID!
  blockHeight: BigInt!
  date: Date!
  txHash: String!
  rewardAddress: String!
  denom: String!
  amount: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { CosmosEvent, CosmosMessage } from "@subql/types-cosmos";
import { ContractMetadata, RewardWithdrawl } from "../types";
import { MsgSetContractMetadata } from "../types/proto-interfaces/archway/rewards/v1/tx";

export async function handleSetContractMetadata(
  msg: CosmosMessage<MsgSetContractMetadata>
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/485EC908712CCDC0D65918F0E8E90E291D32720F2D0C691CCC055544B98C14A1
  logger.info(
    `New Set contract metadata at block ${msg.block.header.height.toString()}`
  );

  // contract metadata can be set and updated on the same contract call
  let contractMetadataRecord = await ContractMetadata.get(
    msg.msg.decodedMsg.metadata.contractAddress
  );
  if (!contractMetadataRecord) {
    // we are creating a new one
    contractMetadataRecord = ContractMetadata.create({
      id: msg.msg.decodedMsg.metadata.contractAddress,
      createdBlockHeight: BigInt(msg.block.block.header.height),
      createdDate: new Date(msg.block.header.time.toISOString()),
      createdTxHash: msg.tx.hash,
      contractAddress: msg.msg.decodedMsg.metadata.contractAddress,
      ownerAddress:
        msg.msg.decodedMsg.metadata.ownerAddress ||
        msg.msg.decodedMsg.senderAddress,
      rewardsAddress: msg.msg.decodedMsg.metadata.rewardsAddress,
    });
  } else {
    // we are updating
    contractMetadataRecord.contractAddress =
      msg.msg.decodedMsg.metadata.contractAddress;
    contractMetadataRecord.ownerAddress =
      msg.msg.decodedMsg.metadata.ownerAddress;
    contractMetadataRecord.rewardsAddress =
      msg.msg.decodedMsg.metadata.rewardsAddress;
  }
  // Save the data
  await contractMetadataRecord.save();
}

export async function handleRewardsWithdrawEvent(
  event: CosmosEvent
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/CB3AF6F8F38A6628A22E45CAD178D435D42D5A1CAAC431D16CBE64557F2CBEC3
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`
  );

  // Attributes are stored as key value pairs
  const rewardAddress = event.event.attributes.find(
    (a) => a.key === "reward_address"
  )?.value;
  const rewardsString = event.event.attributes.find(
    (a) => a.key === "rewards"
  )?.value;

  if (rewardAddress && rewardsString) {
    const rewards: { denom: string; amount: string }[] =
      JSON.parse(rewardsString);

    rewards.forEach(async (reward, index) => {
      const rewardWithdrawlEvent = RewardWithdrawl.create({
        id: `${event.tx.hash}-${event.msg.idx}-${event.idx}-${index}`,
        blockHeight: BigInt(event.block.block.header.height),
        date: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        rewardAddress,
        denom: reward.denom,
        amount: BigInt(reward.amount),
      });

      await rewardWithdrawlEvent.save();
    });
  }
}
```

Here we have two functions, `handleSetContractMetadata` and `handleRewardsWithdrawEvent` handler functions which were defined in the manifest file.

`handleSetContractMetadata` receives a message of type `CosmosMessage<MsgSetContractMetadataMessage>`
, logs the blockheight of the message to the console for debugging purposes and then attempts to obtain the various metadata such as the contractAddress, ownerAddress and rewardsAddress from the `msg` parameter that was passed into the function. Note that the contract address is used as a unique id.

The `handleRewardsWithdrawEvent` function works in a similar way where the event of type `CosmosEvent` is passed into this function and then we look for certain event attributes to index by searching through the attribute keys. Finally, the fields of the `RewardWithdrawl` entity are populated appropriately.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  contractMetadata(first: 5) {
    nodes {
      id
      ownerAddress
      rewardsAddress
      contractAddress
    }
  }
  rewardWithdrawls(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      date
      amount
      denom
      rewardAddress
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "contractMetadata": {
      "totalCount": 2,
      "nodes": [
        {
          "id": "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0",
          "ownerAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "rewardsAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "contractAddress": "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0"
        },
        {
          "id": "archway1cf5rq0amcl5m2flqrtl4gw2mdl3zdec9vlp5hfa9hgxlwnmrlazsdycu4l",
          "ownerAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "rewardsAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "contractAddress": "archway1cf5rq0amcl5m2flqrtl4gw2mdl3zdec9vlp5hfa9hgxlwnmrlazsdycu4l"
        }
      ]
    },
    "rewardWithdrawls": {
      "nodes": []
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
