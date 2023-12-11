# NEAR Ref Finance. Quickstart Guide

## Goals

The objective of this project is to catalog the `swap` actions performed by the `v2.ref-finance.near` contract on the NEAR mainnet. It serves as an excellent opportunity to gain practical experience in understanding Graph's functionality through a real-world example.

<!-- @include: ../snippets/quickstart-reference.md -->

<!-- @include: ../snippets/near-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-ref-finance).
:::

<!-- @include: ../snippets/schema-intro.md -->

::: code-tabs
@tab:active `schema.graphql`

```graphql
type Swap @entity {
  id: ID!
  pool: Pool!
  firstToken: Token!
  secondToken: Token!
}

type Token @entity {
  id: ID!
}

type Pool @entity {
  id: ID!
}
```

:::

The schema include `Swap` entity with a unique identifier, associated with a specific `Pool` and involve two tokens (`firstToken` and `secondToken`). The `Token` type represents a generic token with a unique identifier, and the `Pool` type represents a pool with a unique identifier.

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/near-codegen.md -->

## 2. Update Your Project Manifest File

<!-- @include: ../snippets/near-manifest-intro.md -->

We are indexing all actions with a method name equal to `swap` and the `v2.ref-finance.near` contract as the recipient.

::: code-tabs
@tab:active `project.ts`

```ts
{
  dataSources: [
    {
      kind: NearDatasourceKind.Runtime, // We use ethereum runtime since NEAR Aurora is a layer-2 that is compatible
      startBlock: 105757726, // You can set any start block you want here. This block was when the sweat_welcome.near address was created
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleAction",
            kind: NearHandlerKind.Action,
            filter: {
              type: "FunctionCall",
              methodName: "swap",
              receiver: "v2.ref-finance.near",
            },
          },
        ],
      },
    },
  ];
}
```

:::

In the provided configuration, when the specified action is indexed, it will be forwarded to a handler known as `handleAction`.

Check out our [Manifest File](../../build/manifest/near.md) documentation to get more information about the Project Manifest (`project.ts`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

<!-- @include: ../snippets/near-mapping-intro.md -->

The `handleAction` function receives event data whenever an event matches the filters, which you specified previously in the `project.ts`. Let’s make changes to it, process the relevant transaction action, and save them to the GraphQL entities created earlier.

Update the `handleAction` function as follows:

::: code-tabs
@tab:active `src/mappingHandlers.ts`

```ts
import { Swap, Token, Pool } from "../types";
import { NearAction } from "@subql/types-near";

export async function handleAction(action: NearAction): Promise<void> {
  logger.info(`Swap found at block ${action.transaction.block_height}`);
  // An Action can belong to either a transaction or a receipt
  // To check which one, we can check if action.transaction is null
  // If it is null, then it belongs to a receipt
  if (!action.transaction) {
    return;
  }
  let actions = action.action.args.toJson()["actions"];

  for (let i = 0; i < actions.length; i++) {
    Swap.create({
      id: `${action.transaction.block_height}-${action.transaction.result.id}-${action.id}-${i}`,
      poolId: (await getOrCreatePool(JSON.stringify(actions[i]["pool_id"]))).id,
      firstTokenId: (
        await getOrCreateToken(JSON.stringify(actions[i]["token_in"]))
      ).id,
      secondTokenId: (
        await getOrCreateToken(JSON.stringify(actions[i]["token_out"]))
      ).id,
    }).save();
    logger.info("Swap is saved");
  }
}

async function getOrCreateToken(tokenid: string): Promise<Token> {
  let token = await Token.get(tokenid);
  if (token === undefined) {
    token = Token.create({ id: tokenid });
    await token.save();
  }
  return token;
}

async function getOrCreatePool(poolid: string): Promise<Pool> {
  let pool = await Token.get(poolid);
  if (pool === undefined) {
    pool = Token.create({ id: poolid });
    await pool.save();
  }
  return pool;
}
```

:::

This code snippet demonstrates how swap within Ref Finance are processed and indexed. First, the code imports specific types.

The `handleAction` function processes a Near Protocol action, specifically related to a swap. It, first, checks whether the action belongs to a transaction or a receipt. If it's part of a transaction, it extracts a list of actions and iterates through them. For each action, it creates a `Swap` entity and saves it to the database.

The `getOrCreateToken` and `getOrCreatePool` functions are used to retrieve existing tokens/pools or create new ones if they don't exist. These functions are utility functions used by `handleAction`.

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    swaps {
      nodes {
        id
        firstToken {
          id
        }
        secondToken {
          id
        }
        pool {
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
    "query": {
      "swaps": {
        "nodes": [
          {
            "id": "107215746-6n73gva1H7X2ctEQiQ2kdnVCkvfJpDN9M3zAUzDQmugL-0-2",
            "firstToken": {
              "id": "\"f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near\""
            },
            "secondToken": {
              "id": "\"wrap.near\""
            },
            "pool": null
          },
          {
            "id": "107215746-6n73gva1H7X2ctEQiQ2kdnVCkvfJpDN9M3zAUzDQmugL-0-1",
            "firstToken": {
              "id": "\"meta-pool.near\""
            },
            "secondToken": {
              "id": "\"f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near\""
            },
            "pool": null
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-ref-finance).
:::

<!-- @include: ../snippets/whats-next.md -->
