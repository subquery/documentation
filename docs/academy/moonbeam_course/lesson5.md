# Lesson 5: Explaining Reliationships in SubQuery

This lesson explores entities relationships in SubQuery.

In this lesson we will create a `many-to-many` relationship and update `Transaction` entity and create `Account` entity. It would require regenerating associated typescript with `yarn codegen` and updating `mappingHandlers.ts` file by changing the `handleFrontierEvmEvent()` function.

Find out more about [data reliationships in SubQuery](../../academy/herocourse/module3.md).

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/i9z1tAlmyP0" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: tip Note
In this lesson we will alter the code for the last time.
:::

## Changing the Project

### Schema GraphQl

To build a `many-to-many` relationship between `Account` and `Transaction` entity we need to update `Transaction` entity by adding properties related with accounts and create a brand new `Account` entity with specific, linking properties.

First, create a basic `Account` entity:

```graphql
type Account @entity {
  id: ID! # Key
```

To establish a `one-to-many` reliationship link `Transcation` with `Account` by using entity's name as a property value of `Transaction` entity:

```graphql
to: Account! # Foreign key field
from: Account! # Foreign key field
```

Then, to build a `many-to-many` reliationship we need to create a link to `Transaction` entity from `Account` entity:

```graphql
sentTransactions: [Transaction] @derivedFrom(field: "from")
receivedTransactions: [Transaction] @derivedFrom(field: "to")
```

::: tip Note
Use `@derivedFrom` to create a queryable virtual field in the database.
Find out more about [Reverse Lookups](../herocourse/module3.html#lesson-3-reverse-lookups) in our documentation.
:::

Your entire file should look like this:

```graphql
type Transaction @entity {
  id: ID! # Transaction hash
  value: BigInt! @index
  to: Account! # Foreign key field
  from: Account! # Foreign key field
  contractAddress: String! @index
}

type Account @entity {
  id: ID! # Key
  sentTransactions: [Transaction] @derivedFrom(field: "from")
  receivedTransactions: [Transaction] @derivedFrom(field: "to")
}

type Approval @entity {
  id: ID! # Transaction hash
  value: BigInt! @index
  owner: String! @index
  spender: String! @index
  contractAddress: String! @index
}

type Collator @entity {
  id: ID! # Collator address
  joinedDate: Date! @index
  leaveDate: Date @index
}
```

### Mapping functions

In this file we need to change the `handleFrontierEvmEvent()` function that handles `Transaction` creation, and receives data from the chain, ensures that `Account` exist, and creates and saves a new `Transation` entity in the database.

Change your `handleFrontierEvmEvent()` function to achieve the following:

```ts
// Create Transaction
export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>,
): Promise<void> {
  // Get data from the event
  const from = event.args.from;
  const to = event.args.to;

  // Ensure account entities exist
  const fromAccount = await Account.get(from);
  if (!fromAccount) {
    await new Account(from).save();
  }

  const toAccount = await Account.get(to);
  if (!toAccount) {
    await new Account(to).save();
  }

  // Create new transaction entity
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.fromId = from;
  transaction.toId = to;
  transaction.contractAddress = event.address;

  await transaction.save();
}
```

Your entire file should look like this:

```ts
import { Account, Approval, Collator, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";
import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

// Create Transaction
export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>,
): Promise<void> {
  // Get data from the event
  const from = event.args.from;
  const to = event.args.to;

  // Ensure account entities exist
  const fromAccount = await Account.get(from);
  if (!fromAccount) {
    await new Account(from).save();
  }

  const toAccount = await Account.get(to);
  if (!toAccount) {
    await new Account(to).save();
  }

  // Create new transaction entity
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.fromId = from;
  transaction.toId = to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

// Create Approval
export async function handleFrontierEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>,
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}

// Create Collator
export async function collatorJoined(event: SubstrateEvent): Promise<void> {
  const address = event.extrinsic.extrinsic.signer.toString();
  const collator = Collator.create({
    id: address,
    joinedDate: event.block.timestamp,
  });

  await collator.save();
}

// Collator Leaves

export async function collatorLeft(call: SubstrateExtrinsic): Promise<void> {
  const address = call.extrinsic.signer.toString();
  const collator = await Collator.get(address);

  if (!collator) {
    // Collator doesn't exist
  } else {
    collator.leaveDate = call.block.timestamp;
  }

  await collator.save();
}
```

::: warning Important
Remove `/.data` folder to reindex your data from beginning and adjust the whole database to the new `Collator` entity's shape. Otherwise, the indexer will start indexing data from the latest block it finished last time and your project will be missing some data of collators indexed before.

Also, remember to regerate associated typescript after any change in the `schema.grapql`.
:::

## Query

Open your browser and head to `http://localhost:3000`. Use GraphQL playground to query your data.
Expand previous query by adding `accounts` on the bottom:

```graphql
query {
  approvals(first: 5) {
    nodes {
      id
      value
      owner
      spender
    }
  }
  transactions(first: 5) {
    nodes {
      id
      value
      to: id
      from: id
    }
  }
  collators(last: 5) {
    nodes {
      id
      joinedDate
      leaveDate
    }
  }
  accounts(first: 5) {
    nodes {
      id
      sentTransactions {
        nodes {
          id
          value
          to: id
          from: id
          contractAddress
        }
      }
    }
  }
}
```

## Useful resources

- [SubQuery Project Explorer](https://explorer.subquery.network/)
- [Website](https://subquery.network/)
- [Discord](https://discord.com/invite/subquery)
- [Quick Start Guide](../../quickstart/quickstart.md)
- [YouTube Channel](https://www.youtube.com/c/SubQueryNetwork)
- [Polkadot Explorer](https://polkadot.js.org/apps/#/explorer)
- [Data Reliationships in SubQuery](../../academy/herocourse/module3.md)
- [Reverse Lookups](../../academy/herocourse/module3.html#lesson-3-reverse-lookups)

::: tip Note
The project's **code state after this lesson** is [here](https://github.com/deverka/moonbeam_subquery_tutorial//tree/lesson-5).
The final code of this project can be found [here](https://github.com/deverka/moonbeam_subquery_tutorial).
:::
