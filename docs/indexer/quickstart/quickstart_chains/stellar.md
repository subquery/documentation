# Stellar & Soroban (Combined) Quick Start

The goal of this quick start guide is to give a quick intro to all features of our Stellar and Soroban indexer. The example project indexes all soroban transfer events on Stellar's Mainnet. It also indexes all account payments including credits and debits - it's a great way to quickly learn how SubQuery works on a real world hands-on example.

<!-- @include: ../snippets/quickstart-reference.md -->

Now, let's move forward and update these configurations.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/stellar-subql-starter/tree/main/Stellar/soroban-starter).
:::

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing a variety of datapoints, including accounts, transfers, credit, debits, and payments.

```graphql
type Account @entity {
  id: ID!
  firstSeenLedger: Int
  lastSeenLedger: Int
  sentTransfers: [Transfer] @derivedFrom(field: "from") # These are virtual properties to help us navigate to the correct foreign key of Transfer
  recievedTransfers: [Transfer] @derivedFrom(field: "to") # These are virtual properties to help us navigate to the correct foreign key of Transfer
  sentPayments: [Payment] @derivedFrom(field: "from") # These are virtual properties to help us navigate to the correct foreign key of Payment
  receivedPayments: [Payment] @derivedFrom(field: "to") # These are virtual properties to help us navigate to the correct foreign key of Payment
}

type Transfer @entity {
  id: ID!
  ledger: Int!
  date: Date!
  contract: String!
  from: Account!
  to: Account!
  value: BigInt!
}

type Payment @entity {
  id: ID!
  txHash: String!
  from: Account!
  to: Account!
  amount: String!
}

type Credit @entity {
  id: ID!
  account: Account!
  amount: String!
}

type Debit @entity {
  id: ID!
  account: Account!
  amount: String!
}
```

<!-- @include: ../snippets/stellar-codegen.md -->

```ts
import { Account, Credit, Debit, Payment, Transfer } from "../types";
```

<!-- @include: ../snippets/schema-note.md -->

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

<!-- @include: ../snippets/stellar-manifest-intro.md#level2 -->

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to update the datasource handlers.

**Since you are going to index all Payments (including credits and debits), as well as transfer events on Soroban, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      /* Set this as a logical start block, it might be block 1 (genesis) or when your contract was deployed */
      startBlock: 1700000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleOperation",
            kind: StellarHandlerKind.Operation,
            filter: {
              type: Horizon.OperationResponseType.payment,
            },
          },
          {
            handler: "handleCredit",
            kind: StellarHandlerKind.Effects,
            filter: {
              type: "account_credited",
            },
          },
          {
            handler: "handleDebit",
            kind: StellarHandlerKind.Effects,
            filter: {
              type: "account_debited",
            },
          },
          {
            handler: "handleEvent",
            kind: StellarHandlerKind.Event,
            filter: {
              /* You can optionally specify a smart contract address here
                contractId: "" */
              topics: [
                "transfer", // Topic signature(s) for the events, there can be up to 4
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleOperation` mapping function whenever there is `payment` Stellar operation made. Additionally we run the `handleCredit`/`handleDebit` mapping functions whenever there are Stellar effects made of the respective types. Finally, we have a Soroban event handler, which looks for any smart contract events that match the provided topic filters, in this case it runs `handleEvent` whenever a event wth the `transfer` topic is detected.

<!-- @include: ../snippets/stellar-manifest-note.md -->

Next, let’s proceed ahead with the Mapping Function’s configuration.

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory.

There are different classes of mapping functions for Stellar; [Block handlers](#block-handler), [Operation Handlers](#operation-handler), and [Effect Handlers](#effect-handler).

Soroban has two classes of mapping functions; [Transaction Handlers](#transaction-handler), and [Event Handlers](#event-handler).

Update the `mappingHandler.ts` file as follows (**note the additional imports**):

```ts
import { Account, Credit, Debit, Payment, Transfer } from "../types";
import {
  StellarOperation,
  StellarEffect,
  SorobanEvent,
} from "@subql/types-stellar";
import { AccountCredited, AccountDebited } from "stellar-sdk/lib/types/effects";
import { Horizon } from "stellar-sdk";

export async function handleOperation(
  op: StellarOperation<Horizon.PaymentOperationResponse>,
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}`);

  const fromAccount = await checkAndGetAccount(op.from, op.ledger.sequence);
  const toAccount = await checkAndGetAccount(op.to, op.ledger.sequence);

  const payment = Payment.create({
    id: op.id,
    fromId: fromAccount.id,
    toId: toAccount.id,
    txHash: op.transaction_hash,
    amount: op.amount,
  });

  fromAccount.lastSeenLedger = op.ledger.sequence;
  toAccount.lastSeenLedger = op.ledger.sequence;
  await Promise.all([fromAccount.save(), toAccount.save(), payment.save()]);
}

export async function handleCredit(
  effect: StellarEffect<AccountCredited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger.sequence,
  );

  const credit = Credit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger.sequence;
  await Promise.all([account.save(), credit.save()]);
}

export async function handleDebit(
  effect: StellarEffect<AccountDebited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger.sequence,
  );

  const debit = Debit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger.sequence;
  await Promise.all([account.save(), debit.save()]);
}

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(`New transfer event found at block ${event.ledger}`);

  // Get data from the event
  // The transfer event has the following payload \[env, from, to\]
  // logger.info(JSON.stringify(event));
  const {
    topic: [env, from, to],
  } = event;

  const fromAccount = await checkAndGetAccount(from, event.ledger.sequence);
  const toAccount = await checkAndGetAccount(to, event.ledger.sequence);

  // Create the new transfer entity
  const transfer = Transfer.create({
    id: event.id,
    ledger: event.ledger.sequence,
    date: new Date(event.ledgerClosedAt),
    contract: event.contractId,
    fromId: fromAccount.id,
    toId: toAccount.id,
    value: BigInt(event.value.decoded!),
  });

  fromAccount.lastSeenLedger = event.ledger.sequence;
  toAccount.lastSeenLedger = event.ledger.sequence;
  await Promise.all([fromAccount.save(), toAccount.save(), transfer.save()]);
}

async function checkAndGetAccount(
  id: string,
  ledgerSequence: number,
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    // We couldn't find the account
    account = Account.create({
      id: id.toLowerCase(),
      firstSeenLedger: ledgerSequence,
    });
  }
  return account;
}
```

Let’s understand how the above code works.

For the `handleOperation` mapping function, the function receives a new `StellarOperation` payload to which we add additional type safety from `Horizon.PaymentOperationResponse`. We then run the `checkAndGetAccount` to ensure that we create Account records for sending/receiving accounts if we don't already have them (it checks if it already exists before creating a new `Account` entity).

For the `handleCredit` and `handleDebit` mapping functions, the functions receives a new `StellarEffect` payload to which we add additional type safety from `AccountCredited` and `AccountDebited` types.

The `handleEvent` mapping function is for Soroban smart contracts, and the payload of data is stored as an array of properties.

<!-- @include: ../snippets/stellar-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  credits {
    totalCount
    nodes {
      id
      amount
      accountId
    }
  }
  debits {
    totalCount
    nodes {
      id
      amount
      accountId
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "debits": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0002576954607800321-0000000002",
            "amount": "10000.0000000",
            "accountId": "GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR"
          }
        ]
      },
      "credits": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0002576924543029249-0000000002",
            "amount": "9999.9999900",
            "accountId": "GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/stellar-subql-starter/tree/main/Stellar/soroban-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
