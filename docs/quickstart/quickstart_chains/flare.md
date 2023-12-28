# Flare Quick Start

The goal of this quick start guide is to index all rewards from the Flare FTSO Reward Manager from Flare's Songbird network.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

**Please initialise a Flare Songbird Network, not Flare Network**
:::

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/subql-flare-ftso-rewards).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

We are indexing all RewardClaimed logs from the FTSORewardManager contract, first you will need to import the contract abi defintion from [here](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/contracts#address-tabs). You can copy the entire JSON and save as a file `ftsoRewardManager.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all RewardClaimed logs, you need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: flare/Runtime
    startBlock: 36036 # Block that this contract was deployed
    options:
      # Must be a key of assets
      abi: ftsoRewardManager
      address: "0xc5738334b972745067ffa666040fdeadc66cb925" # https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925
    assets:
      ftsoRewardManager:
        file: "ftsoRewardManager.abi.json" # Import the correct contract file
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: flare/LogHandler
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - RewardClaimed(address indexed dataProvider, address indexed whoClaimed, address indexed sentTo, uint256 rewardEpoch, uint256 amount)
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `RewardClaimed` log on any transaction from the [FTSO Reward Manager contract](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925).

<!-- @include: ../snippets/flare-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing all rewards and also addresses that those rewards go to/are claimed from:

```graphql
type Reward @entity {
  id: ID! # Transaction has
  recipient: Address!
  dataProvider: String! @index
  whoClaimed: Address!
  rewardEpoch: BigInt! @index
  amount: BigInt!
}

type Address @entity {
  id: ID! # accountIDs
  receivedRewards: [Reward] @derivedFrom(field: "recipient")
  claimedRewards: [Reward] @derivedFrom(field: "whoClaimed")
}
```

Since we have a [many-to-many relationship](../../build/graphql.md#many-to-many-relationships), we add the `@derivedFrom` annotation to ensure that we are mapping to the right foreign key.

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Delete both the `handleBlock` and `handleTransaction` functions as you will only deal with the `handleLog` function.

The `handleLog` function receives event data whenever an event matches the filters, which you specified previously in the `project.ts`. Let’s make changes to it, process all `RewardClaimed` transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as follows (**note the additional imports**):

```ts
import { FlareLog } from "@subql/types-flare";
import { BigNumber } from "@ethersproject/bignumber";
import { Address, Reward } from "../types";

type RewardClaimedLogArgs = [string, string, string, BigNumber, BigNumber] & {
  dataProvider: string;
  whoClaimed: string;
  sentTo: string;
  rewardEpoch: BigNumber;
  amount: BigNumber;
};

export async function handleLog(
  event: FlareLog<RewardClaimedLogArgs>
): Promise<void> {
  // See example log in this transaction https://songbird-explorer.flare.network/tx/0xd832d0283f56acbda902066dd47147f510a68fd923296a2162cffcf10c15d8f8/logs
  // logger.info("flare Event");

  // Ensure that our account entities exist
  const whoClaimed = await Address.get(event.args.whoClaimed.toLowerCase());
  if (!whoClaimed) {
    // Does not exist, create new
    await Address.create({
      id: event.args.whoClaimed.toLowerCase(),
    }).save();
  }

  const whoRecieved = await Address.get(event.args.sentTo.toLowerCase());
  if (!whoRecieved) {
    // Does not exist, create new
    await Address.create({
      id: event.args.sentTo.toLowerCase(),
    }).save();
  }

  // Create the new Reward entity
  const reward = Reward.create({
    id: event.transactionHash,
    recipientId: event.args.sentTo.toLowerCase(),
    dataProvider: event.args.dataProvider,
    whoClaimedId: event.args.whoClaimed.toLowerCase(),
    rewardEpoch: event.args.rewardEpoch.toBigInt(),
    amount: event.args.amount.toBigInt(),
  });

  await reward.save();
}
```

Let’s understand how the above code works.

The function here receives an `FlareLog` which includes transaction log data in the payload. We extract this data and then first ensure that our account entities (foreign keys) exist. We then instantiate a new `Reward` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/flare-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  rewards(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      amount
      recipientId
      dataProvider
      whoClaimedId
      amount
    }
  }
  addresses(first: 5, orderBy: RECEIVED_REWARDS_SUM_AMOUNT_DESC) {
    nodes {
      id
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "rewards": {
      "nodes": [
        {
          "id": "0xd832d0283f56acbda902066dd47147f510a68fd923296a2162cffcf10c15d8f8",
          "amount": "62306014311508310008",
          "recipientId": "0xc2e6628b5b0277e97c68a47328f8effde9629184",
          "dataProvider": "0x69141E890F3a79cd2CFf552c0B71508bE23712dC",
          "whoClaimedId": "0xc2e6628b5b0277e97c68a47328f8effde9629184"
        },
        {
          "id": "0xd6e84fc6b13f5832e04c8a851a2d3e634e82b029f253000d980ec68dc59e697f",
          "amount": "248122819100600283",
          "recipientId": "0x665574495eb0a4a03291f2fb3f150914dc4009f3",
          "dataProvider": "0x939789ed3D07A80da886A3E3017d665cBb5591dC",
          "whoClaimedId": "0x665574495eb0a4a03291f2fb3f150914dc4009f3"
        }
      ]
    },
    "addresses": {
      "nodes": [
        {
          "id": "0xc2e6628b5b0277e97c68a47328f8effde9629184"
        },
        {
          "id": "0x665574495eb0a4a03291f2fb3f150914dc4009f3"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/subql-flare-ftso-rewards).
:::

<!-- @include: ../snippets/whats-next.md -->
