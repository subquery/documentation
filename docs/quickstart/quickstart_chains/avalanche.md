# Avalanche Quick Start - Pangolin Rewards

The goal of this quick start guide is to index all token deposits and transfers from the Avalanche's [Pangolin token](https://snowtrace.io/address/0x88afdae1a9f58da3e68584421937e5f564a0135b).

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/i0glKaQOIbM" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/pangolin-rewards-tutorial).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Avalanche. Since Avalanche's C-chain is built on Ethereum's EVM, we can use the core Ethereum framework to index it.
:::

We are indexing actions from the Pangolin Rewards contract, first you will need to import the contract abi defintion from [here](https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b). You can copy the entire JSON and save as a file `./abis/PangolinRewards.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Pangolin Rewards, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // # Block when the first reward is made
      startBlock: 7906490,
      options: {
        // Must be a key of assets
        abi: "erc20",
        // Pangolin reward contract https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b
        address: "0x88afdae1a9f58da3e68584421937e5f564a0135b",
      },
      assets: new Map([["erc20", { file: "./abis/PangolinRewards.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              topics: ["RewardPaid(address user, uint256 reward)"],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `RewardPaid` log on any transaction from the [Pangolin Rewards contract](https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b).

<!-- @include: ../snippets/avalanche-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing two entities, `PangolineRewards` and `Users` where receiver is of type `User` and rewards contains a reverse look up to the receiver field.

```graphql
type PangolinRewards @entity {
  id: ID! # Id is required and made up of block has and log index
  transactionHash: String!
  blockNumber: BigInt!
  blockHash: String!
  receiver: User!
  amount: BigInt!
}

type User @entity {
  id: ID! # Wallet address
  totalRewards: BigInt!
  rewards: [PangolinRewards]! @derivedFrom(field: "receiver") #This is virtual field
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { PangolinRewards, User } from "../types";
import { RewardPaidLog } from "../types/abi-interfaces/PangolinRewards";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

<!-- @include: ../snippets/avalanche-mapping-note.md -->

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import { PangolinRewards, User } from "../types";
import { RewardPaidLog } from "../types/abi-interfaces/PangolinRewards";

async function checkGetUser(id: string): Promise<User> {
  let user = await User.get(id.toLowerCase());
  if (!user) {
    // does not exist, create a new user
    user = User.create({
      id: id.toLowerCase(),
      totalRewards: BigInt(0),
    });
  }
  return user;
}

export async function handleLog(event: RewardPaidLog): Promise<void> {
  logger.info(`New Reward Paid at block ${event.blockNumber}`);
  const { args } = event;
  if (args) {
    const user = await checkGetUser(args.user);

    const pangolinRewardRecord = new PangolinRewards(
      `${event.blockHash}-${event.logIndex}`
    );

    pangolinRewardRecord.transactionHash = event.transactionHash;
    pangolinRewardRecord.blockHash = event.blockHash;
    pangolinRewardRecord.blockNumber = BigInt(event.blockNumber);
    pangolinRewardRecord.receiverId = user.id;
    pangolinRewardRecord.amount = BigInt(args.reward.toString());

    user.totalRewards += pangolinRewardRecord.amount;
    await user.save();
    await pangolinRewardRecord.save();
  }
}
```

Let’s understand how the above code works.

The mapping function here receives an `RewardPaidLog` which includes transaction log data in the payload. We extract this data and first read and confirm that we have a `User` record via `checkGetUser`. We then create a new `PangolinRewards` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  pangolinRewards(first: 5) {
    nodes {
      id
      amount
    }
  }
  users(first: 5, orderBy: TOTAL_REWARDS_DESC) {
    nodes {
      id
      totalRewards
      rewards(first: 5) {
        totalCount
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "pangolinRewards": {
      "nodes": [
        {
          "id": "0xa0759b9929d68bc88ad01832484ecc24fd0abbcaf19a92a69a1a8fc1f2f23a71-20",
          "amount": "750406183852"
        },
        {
          "id": "0xf4b8a0948afc4264b876b4431da01a7a96a11f1ce24d73a2a0a71f9a8228b3c9-121",
          "amount": "31106152923645074116"
        },
        {
          "id": "0x8f348fcc2eb78e91e6d212a045356983f4f46ba1843e5e0f763e1e75a1ae8582-33",
          "amount": "612972344478229813"
        },
        {
          "id": "0xbb588aa14c97bad75d34ccbae332af03eab1390678516df01badf4b4f1886d4e-56",
          "amount": "3588963063129"
        },
        {
          "id": "0x477c12a0a4a5642378e58569743b24af200d36f7952d2e6bc4cfd9fa8e96592f-74",
          "amount": "30987822664812021072"
        }
      ]
    },
    "users": {
      "nodes": [
        {
          "id": "0x5da33bcd38fbc3e9632f9f6a198f4f0ef13746b6",
          "totalRewards": "4883581127128396302822",
          "rewards": {
            "totalCount": 2
          }
        },
        {
          "id": "0x79dcf1ef9786255c0f00f506c785bbd878ec184a",
          "totalRewards": "2282547055289881964699",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0x695b71dbd30a9f30c1958644086900ac9cd33c85",
          "totalRewards": "1620206587081566430579",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0xfd94d62683d8962055b661c4e64e762ed41e5489",
          "totalRewards": "1149590592806652626951",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0xab7901b09b67ee05b016456289cf74d362bd6d8c",
          "totalRewards": "882873704607946614381",
          "rewards": {
            "totalCount": 1
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/pangolin-rewards-tutorial).
:::

<!-- @include: ../snippets/whats-next.md -->
