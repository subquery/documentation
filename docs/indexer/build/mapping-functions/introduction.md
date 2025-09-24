# Introduction

Handler functions define how chain data is transformed into the optimized GraphQL entities that we have previously defined in the `schema.graphql` file. These functions are the core of your SubQuery project's data processing logic.

## Overview
- Mapping functions are defined in the `src/mappings` directory of a SubQuery project.
- Each mapping function is associated with a specific event, call, or block type defined in the [Project Manifest](../project-manifest.md).
- Mapping functions are called whenever the associated event, call, or block is encountered during indexing.
- Mapping functions run in a [Sandboxed Environment](./sandbox/sandbox.md)

## Function Strucutre

### Inputs

All functions take a single argument which is the data structure for the type of handler. For example an `Event` handler will take an `Eventobject as its argument.

Depending on the network being indexed there are different types of data structures available. For example, in a Substrate based chain there are `Event`, `Call`, and `Block` types. In an Ethereum based chain there are `Log`, `Transaction`, and `Block` types. The exact types available depend on the network being indexed.

### Async

All handler functions are async and return a `Promise<void>`. This is to allow for any asynchronous operations that may be needed, such as fetching additional data from the chain or an external API as well as the store operations.

### Loading and Storing Data

Within the handler functions you will typically load and store data using the generated entity classes. These classes are generated based on the `schema.graphql` file and provide a type-safe way to interact with the data store. You can find all the details about the store in the [Store documentation](./sandbox/store.md).


### Example

```ts
/**
 * The handler function for an event.
 * The function name "handleEvent" will be referenced in the project manifest file.
 * The function takes a single argument of type Event.
 * The type of this will depend on the handler type and the network being indexed.
*/
async function handleEvent(event: Event): Promise<void> {

  // Create a new Transfer entity. The Transfer class is generated based on the schema.graphql file
  const transfer = Transfer.create({
    id: `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });

  // Persist the entity to the store
  await transfer.save();

  // We can also load existing entities from the store, update them, and savs.
  let account = Account.get(event.params.from);
  if (!account) {
    account = Account.create({
      id: event.params.from,
      balance: BigInt(0),
    });
  }
  account.balance -= event.params.value;
  await account.save();
}

````

## Specifics

To understand the specifics of the inputs of each of the SubQuery supported networks please refer to the relevant documentation:
- [Ethereum](./mapping/ethereum.md)
- [Substrate](./mapping/polkadot.md)
- [Cosmos](./mapping/cosmos.md)
- [Stellar & Soroban](./mapping/stellar.md)
- [Solana](./mapping/solana.md)
- [Starknet](./mapping/starknet.md)
- [Near](./mapping/near.md)
- [Algorand](./mapping/algorand.md)
- [Concordium](./mapping/concordium.md)

## Sandbox

The handler functions run in a sandboxed environment which provides a number of useful features and limitations. For more information please refer to the [Sandbox documentation](./sandbox/sandbox.md).
