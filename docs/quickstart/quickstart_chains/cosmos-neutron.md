# Neutron Quick Start

The goal of this quick start guide is to index all [airdrop claims](https://www.mintscan.io/neutron/wasm/contract/neutron198sxsrjvt2v2lln2ajn82ks76k97mj72mtgl7309jehd0vy8rezs7e6c56) on [Neutron Network](https://www.mintscan.io/neutron/).

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Neutron/neutron-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleAirdropClaim",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/cosmwasm.wasm.v1.MsgExecuteContract",
              contractCall: "claim",
              values: {
                contract:
                  "neutron198sxsrjvt2v2lln2ajn82ks76k97mj72mtgl7309jehd0vy8rezs7e6c56",
              },
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running one handler: A `handleAirdropClaim` message handler which will be triggered when a `claim` message is encountered on a `MsgExecuteContract` type. The `contract` value is the address of the neutron airdrop contract.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Update the `schema.graphql` file as follows. In this project, since we are indexing all [airdrop claims](https://www.mintscan.io/neutron/wasm/contract/neutron198sxsrjvt2v2lln2ajn82ks76k97mj72mtgl7309jehd0vy8rezs7e6c56) on Neutron, we have a `Claim` entity that includes a number of properties, including transaction hash and block data as well as date, amount and receiver data.

Daily aggregated claims are also captured in a seperate `DailyClaimSummary` entity.

```graphql
type Claim @entity {
  id: ID! # Index
  transactionHash: String!
  blockHeight: BigInt!
  date: Date!
  receiver: String!
  amount: BigInt!
}

type DailyClaimSummary @entity {
  id: ID! # this is the ISO string of the day e.g. '2023-03-26'
  total_claimed: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { CosmosMessage } from "@subql/types-cosmos";
import { Claim, DailyClaimSummary } from "../types";

type AirdropClaimMessageType = {
  type: string;
  sender: string;
  contract: string;
  msg: {
    claim: {
      amount: string;
      proof: string[];
    };
  };
};

async function checkGetDailyClaim(date: Date): Promise<DailyClaimSummary> {
  // Create the ID from the iso date string (e.g. '2023-03-26')
  // Timestamps are in seconds, need to convert to ms
  const id = date.toISOString().substring(0, 10);
  // Read to see if there is an existing aggregation record
  let dailyClaimSummary = await DailyClaimSummary.get(id);
  if (!dailyClaimSummary) {
    // This is a new day! Create a new aggregation
    dailyClaimSummary = DailyClaimSummary.create({
      id,
      total_claimed: BigInt(0),
    });
  }
  return dailyClaimSummary;
}

export async function handleAirdropClaim(
  msg: CosmosMessage<AirdropClaimMessageType>
): Promise<void> {
  // Example https://www.mintscan.io/neutron/txs/156FE31585BD75E06EE337CEA908C37EA0434CC49943B4860E7AABE2475B6B01?height=1437614
  logger.info(
    `New Airdrop Claim at block ${msg.block.header.height.toString()}`
  );

  // Claim records are created from on chain data
  const airdropClaimRecord = Claim.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    date: new Date(msg.block.header.time.toISOString()),
    transactionHash: msg.tx.hash,
    receiver: msg.msg.decodedMsg.sender,
    amount: BigInt(msg.msg.decodedMsg.msg.claim.amount),
  });

  // We update the daily aggregation
  const dailyClaimSummary = await checkGetDailyClaim(airdropClaimRecord.date);
  dailyClaimSummary.total_claimed += airdropClaimRecord.amount;

  // Save data to the store
  await dailyClaimSummary.save();
  await airdropClaimRecord.save();
}
```

Here we have two functions. Our `handleAirdropClaim` handler function which was defined in the manifest file along with an extra function called `checkGetDailyClaim`.

`handleAirdropClaim` receives a message of type CosmosMessage, logs a message to the console for debugging purposes and then attempts to obtain the records from the `msg` attributes. The transaction hash along with the message id is used as a unique id.

An airdrop claim object is then created, provided that it hasn't been created already, and then we index certain message attributes depending on the data we need.

The `checkGetDailyClaim` function is called by the previous function to determine the total quantity of claims made during the day. It is called when each new claim object is created or updated.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    claims(first: 5, orderBy: AMOUNT_DESC) {
      totalCount
      nodes {
        id
        transactionHash
        blockHeight
        date
        receiver
        amount
      }
    }
    dailyClaimSummaries(first: 5, orderBy: ID_DESC) {
      nodes {
        id
        totalClaimed
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
      "claims": {
        "totalCount": 29,
        "nodes": [
          {
            "id": "0BE48D29E571443DCBB69D166242EC0D82500CA574BD18B5EC4A2FC9B4F4DA52-0",
            "transactionHash": "0BE48D29E571443DCBB69D166242EC0D82500CA574BD18B5EC4A2FC9B4F4DA52",
            "blockHeight": "1437800",
            "date": "2023-07-13T14:56:15.706",
            "receiver": "neutron13yl8ksc640t4zj9ur2q0e9hcxuphxkfm9v7an9",
            "amount": "1126628770"
          },
          {
            "id": "E11FEDF7A703F8A01DB5B9251D22797AAC292F1FDC5B96EA8C378E9249B9B0FB-0",
            "transactionHash": "E11FEDF7A703F8A01DB5B9251D22797AAC292F1FDC5B96EA8C378E9249B9B0FB",
            "blockHeight": "1438551",
            "date": "2023-07-13T15:39:28.097",
            "receiver": "neutron1rmemz0vyxjzqgy4hljymvzq3e3uf46303wl7lv",
            "amount": "806706762"
          },
          {
            "id": "B75398DD51A3CB655908BFB9352A3F1BDE0910D095B8EB1D35E3817A3BE7D896-0",
            "transactionHash": "B75398DD51A3CB655908BFB9352A3F1BDE0910D095B8EB1D35E3817A3BE7D896",
            "blockHeight": "1438402",
            "date": "2023-07-13T15:30:36.123",
            "receiver": "neutron1h4j8r3wzf5lkkvvdnu9fulh7qpqpwu6ufeh56w",
            "amount": "733135188"
          },
          {
            "id": "7A926359E74A04FE929488C10A298F325CCF6A3BEC4D6867CF375F972D1C085E-0",
            "transactionHash": "7A926359E74A04FE929488C10A298F325CCF6A3BEC4D6867CF375F972D1C085E",
            "blockHeight": "1438955",
            "date": "2023-07-13T16:02:38.373",
            "receiver": "neutron10quf7r9jejsv5ahshc0z0rlfmxccy7kxaxxwy0",
            "amount": "113793918"
          },
          {
            "id": "2D857594AF05D3F6508BB7854B3253B5F4F9C0E27ECE888E8FDEF5DB59746F06-0",
            "transactionHash": "2D857594AF05D3F6508BB7854B3253B5F4F9C0E27ECE888E8FDEF5DB59746F06",
            "blockHeight": "1439106",
            "date": "2023-07-13T16:11:02.756",
            "receiver": "neutron1wj3y6eqjd5c8jcfd25w38jkjd66455faj92f4l",
            "amount": "113334003"
          }
        ]
      },
      "dailyClaimSummaries": {
        "nodes": [
          {
            "id": "2023-07-13",
            "totalClaimed": "3899514263"
          }
        ]
      }
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
