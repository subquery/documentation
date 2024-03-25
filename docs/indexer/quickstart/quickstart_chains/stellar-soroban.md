# Soroban Smart Contract Quick Start

The aim of this quick start guide is to provide a brief introduction to Soroban through the hello world smart contract SubQuery indexer. The sample smart contract is designed as a simple incrementer, allowing users to input a specific value. It serves as an effective way to quickly understand the workings of Soroban through a hands-on example in the real world.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/stellar-subql-starter/tree/main/Stellar/soroban-greeter-contract).
:::

## Preparations

For this tutorial, we'll utilise a streamlined version of the hello world smart contract available [here](https://github.com/stellar/soroban-dapps-challenge/blob/greeter/contracts/hello-world/src/lib.rs). We'll streamline the code by retaining only the `increment()` function. The resulting smart contract code will be as follows:

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

// const MESSAGE: Symbol = symbol_short!("MESSAGE");
const COUNT: Symbol = symbol_short!("COUNT");
const LAST_INCR: Symbol = symbol_short!("LAST_INCR");

// (attribute macro) Marks a type as being the type that contract functions are attached for.
#[contract]
pub struct HelloContract;

// (attribute macro) Exports the publicly accessible functions to the Soroban environment.
#[contractimpl]
/// Implementation of the HelloContract.
impl HelloContract {

    /// Increments the count by the specified value.
    ///
    /// # Arguments
    ///
    /// * `env` - The environment object.
    /// * `incr` - The value to increment the count by.
    ///
    /// # Returns
    ///
    /// The updated count.
    pub fn increment(env: Env, incr: u32) -> u32 {
        // Get the current count.
        let mut count = env.storage().instance().get(&COUNT).unwrap_or(0);

        // Increment the count.
        count += incr;

        // Save the count.
        env.storage().instance().set(&COUNT, &count);
        env.storage().instance().set(&LAST_INCR, &incr);

        // Emit an event.
        env.events()
            .publish((COUNT, symbol_short!("increment")), count);

        // Return the count to the caller.
        count
    }
}
```

We've deployed and published the smart contract multiple times for better illustration. The transactions involving the increment function calls can be found in the following list. Ensure to explore the details, accessible under the "Events" tab:

- [https://futurenet.stellarchain.io/transactions/8cd93444c3f4f37bc38dc4701c649e45081656965b4a94b73a4de8b3cf04cc8b](https://futurenet.stellarchain.io/transactions/8cd93444c3f4f37bc38dc4701c649e45081656965b4a94b73a4de8b3cf04cc8b)
- [https://futurenet.stellarchain.io/transactions/8cd93444c3f4f37bc38dc4701c649e45081656965b4a94b73a4de8b3cf04cc8b](https://futurenet.stellarchain.io/transactions/8cd93444c3f4f37bc38dc4701c649e45081656965b4a94b73a4de8b3cf04cc8b)
- [https://futurenet.stellarchain.io/transactions/6a7ac207f3909d92d5fee04e6fb7d78640a7a7f65424a9b4d54c13d6ffcc9e58](https://futurenet.stellarchain.io/transactions/6a7ac207f3909d92d5fee04e6fb7d78640a7a7f65424a9b4d54c13d6ffcc9e58)
- [https://futurenet.stellarchain.io/transactions/8e288bcba7ce4e6a8b275acfea40c6787d65db27eb16d8bef559d8be3bbcef65](https://futurenet.stellarchain.io/transactions/8e288bcba7ce4e6a8b275acfea40c6787d65db27eb16d8bef559d8be3bbcef65)
- [https://futurenet.stellarchain.io/transactions/aa26158526795f728ff0744246b080ded772be88f7af817255782993e8809d20](https://futurenet.stellarchain.io/transactions/aa26158526795f728ff0744246b080ded772be88f7af817255782993e8809d20)
- [https://futurenet.stellarchain.io/transactions/205b9778c159387d2b6b70f3c39c3876d79a3496c22eab4a2c9dafac17a0fa56](https://futurenet.stellarchain.io/transactions/205b9778c159387d2b6b70f3c39c3876d79a3496c22eab4a2c9dafac17a0fa56)

Now, let's move on to configuring the indexer.

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing a single datapoint - increment.

```graphql
type Increment @entity {
  id: ID!
  newValue: BigInt!
}
```

<!-- @include: ../snippets/stellar-codegen.md -->

```ts
import { Increment } from "../types";
```

<!-- @include: ../snippets/stellar-manifest-intro.md#level2 -->

**Since you only need to index the events, the only handler type is need is an events handler:**

```ts
dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      startBlock: 831474,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: StellarHandlerKind.Event,
            filter: {
              topics: [
                "COUNT", // Topic signature(s) for the events, there can be up to 4
              ],
              contractId: "CAQFKAS47DF6RBKABRLDZ5O4XJIH2DQ3RMNHFPOSGLFI6KMSSIUIGQJ6"
            }
          },
        ],
      },
    },
  ],
```

Here is a straightforward event handler. We establish additional filters, specifically for the topic name and contract ID, to ensure that we handle only events with a specific topic from a particular smart contract.

<!-- @include: ../snippets/stellar-manifest-note.md -->

Next, let’s proceed ahead with the Mapping Function’s configuration.

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory. Update the `mappingHandler.ts` file as follows (**note the additional imports**):

```ts
import { Increment } from "../types";
import { SorobanEvent } from "@subql/types-stellar";

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.warn(event.transaction.hash.toString());
  if (event.type.toString() == "contract") {
    logger.warn(JSON.stringify(event.value));
    const increment = Increment.create({
      id: event.transaction.hash,
      newValue: BigInt(
        JSON.parse(JSON.stringify(event.value))["_value"].toString()
      ),
    });
    await increment.save();
  }
}
```

Here's a brief explanation. First, the necessary types are imported. Then, a handler `handleEvent` that takes a `SorobanEvent` as a parameter is defined. Once the handler is triggered, it uses the logger to warn about the hash of the associated transaction. As a next step it checks if the event type is `contract`: if it is a contract event, log the event's value, extract the relevant information from the event value (`increment` value), and create an object of entity `Increment` with the extracted information. Finally, it saves the `Increment` object to the data store.

<!-- @include: ../snippets/stellar-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

In the following query, we will retrieve all stored objects and promptly conduct their aggregation. Specifically, we will compute the frequency of function calls grouped by a parameter in each call.

```graphql
query {
  increments {
    nodes {
      id
      newValue
    }
    groupedAggregates(groupBy: [NEW_VALUE]) {
      distinctCount {
        id
      }
      keys
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "increments": {
      "nodes": [
        {
          "id": "8cd93444c3f4f37bc38dc4701c649e45081656965b4a94b73a4de8b3cf04cc8b",
          "newValue": "7"
        },
        {
          "id": "205b9778c159387d2b6b70f3c39c3876d79a3496c22eab4a2c9dafac17a0fa56",
          "newValue": "1975"
        },
        {
          "id": "3cf049dfaa35bfabe7574b192b691e95f462418952bf5d7028f5ffc06852eef6",
          "newValue": "32"
        },
        {
          "id": "aa26158526795f728ff0744246b080ded772be88f7af817255782993e8809d20",
          "newValue": "975"
        },
        {
          "id": "6a7ac207f3909d92d5fee04e6fb7d78640a7a7f65424a9b4d54c13d6ffcc9e58",
          "newValue": "125"
        },
        {
          "id": "8e288bcba7ce4e6a8b275acfea40c6787d65db27eb16d8bef559d8be3bbcef65",
          "newValue": "275"
        }
      ],
      "groupedAggregates": [
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["7"]
        },
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["32"]
        },
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["125"]
        },
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["275"]
        },
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["975"]
        },
        {
          "distinctCount": {
            "id": "1"
          },
          "keys": ["1975"]
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/stellar-subql-starter/tree/main/Stellar/soroban-greeter-contract).
:::

<!-- @include: ../snippets/whats-next.md -->
