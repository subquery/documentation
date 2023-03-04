# Juno

## Goals

The goal of this quick start guide is to adapt the standard starter project in the Juno Network and then begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

Note that we are using Juno as the example here, but SubQuery supports all the following Cosmos networks and you can quickly initialise a new project in any of them using the `subql init` command:

- [Juno](https://github.com/subquery/cosmos-subql-starter/tree/main/Juno/juno-starter)
- [CosmosHub](https://github.com/subquery/cosmos-subql-starter/tree/main/CosmosHub/cosmoshub-starter)
- [Fetch.ai](https://github.com/subquery/cosmos-subql-starter/tree/main/Fetch.ai/fetchhub-starter)
- [Stargaze](https://github.com/subquery/cosmos-subql-starter/tree/main/Stargaze/stargaze-starter)
- [Osmosis](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-starter)
- [Cronos](https://github.com/subquery/cosmos-subql-starter/tree/main/Cronos)
- [OKC Chain (by OKX)](https://github.com/subquery/cosmos-subql-starter/tree/main/OKX/okx-starter)
- [Thorchain](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter)
- and more, view the full list in [the cosmos-subql-starter repository](https://github.com/subquery/cosmos-subql-starter).

::: tip Note
SubQuery can support more Cosmos zones than listed above.
It requires importing `protobufs definitions` for specific chain types.
See [Custom Cosmos Chains](../../build/manifest/cosmos.md#custom-chains) for more information.
:::

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/juno-terra-developer-fund-votes).
:::

## 1. Update Your GraphQL Schema File

::: warning Important
Please refer to [this](home.md#_1-update-the-schemagraphql-file) before proceeding
:::

Remove all existing entities and update the `schema.graphql` file as shown below. The aim is to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

## 2. Update Your Manifest File

::: warning Important
Please read [this](home.md#_2-update-the-project-manifest-file) first before proceeding.
:::

For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function


Note that the manifest file has already been set up correctly and doesn’t require significant changes, but the datasource handlers needs to be updated. Update the `datasources` section as follows:

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

The above code defines that you will be running a `handleTerraDeveloperFund` mapping function whenever there is a message with a `vote` contract call from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

::: warning Important
Please read [this](home.md#_3-update-the-mapping-functions) first before proceeding.
:::

Navigate to the default mapping function in the `src/mappings` directory. You will see four exported functions: `handleBlock`, `handleEvent`, `handleMessage`, `handleTransaction`. Delete `handleBlock`, `handleEvent`, and `handleTransaction` functions as you will only deal with the `handleMessage` function.

The `handleMessage` function receives event data whenever an event matches the filters that you specified previously in the `project.yaml`. Let’s update it to process all `vote` messages and save them to the GraphQL entity created earlier.

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

Here, the function receives a `CosmosMessage` which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping/cosmos.md) documentation and get information on the mapping functions in detail.

## 4. Build Your Project

::: warning Important
Please refer to [this](home.md#_4-build-your-project).
:::

## 5. Run Your Project Locally with Docker

::: warning Important
Please refer to [this](home.md#_5-run-your-project-locally-with-docker).
:::

## 6. Query your Project

::: warning Important
Please refer to [this](home.md#_6-query-your-project) before proceeding
:::

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

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

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
