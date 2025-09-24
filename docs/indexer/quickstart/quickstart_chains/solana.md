# Solana Quick Start

The goal of this quick start guide is to index checked token transfers from the RNDR token.

<!-- @include: ../snippets/quickstart-reference.md -->

As a prerequisite, you will need to generate types from the IDL files of each program.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/solana-subql-starter/tree/main/Solana/solana-token-program-starter).
:::

<!-- @include: ../snippets/manifest-intro.md#level2 -->

For Solana, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHandlers](../../build/manifest/chain-specific/solana.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/chain-specific/solana.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [InstructionHandlers](../../build/manifest/chain-specific/solana.md#mapping-handlers-and-filters): On each and every instruction that matches optional filter criteria, run a mapping function
- [LogHandlers](../../build/manifest/chain-specific/solana.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function


We are indexing actions from the RNDR token, first you will need to import the Token Program IDL definition from [here](https://raw.githubusercontent.com/subquery/solana-subql-starter/refs/heads/main/Solana/solana-token-program-starter/idls/tokenprogram.idl.json). You can copy the entire JSON and save as a file `tokenprogram.idl.json` in the `/idls` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index checked token transfers, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: SolanaDatasourceKind.Runtime,
      startBlock: 336382792,

      assets: new Map([["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", { file: "./idls/tokenprogram.idl.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SolanaHandlerKind.Instruction,
            handler: "handleCheckedTransfer",
            filter: {
              programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              discriminator: "transferChecked",
              accounts: [
                null,
                ['rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'],
              ]
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleCheckedTransfer` mapping function whenever there is a `transferChecked` instruction on any transaction from the [RNDR token](https://solscan.io/token/rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof).

Check out our [Manifest File](../../build/manifest/chain-specific/solana.md) documentation to get more information about the Project Manifest (`project.ts`) file.

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing one entity, a `Transfer`.

```graphql
type Transfer @entity {
  id: ID!
  from: String!
  to: String!
  amount: BigInt!
  blockNumber: BigInt!
  transactionHash: String!
  date: Date!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->


```ts
import { Transfer } from "../types";
import { TransferCheckedInstruction } from '../types/handler-inputs/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import assert from 'node:assert';
import { TransferCheckedInstruction } from '../types/handler-inputs/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
import { SolanaInstruction } from '@subql/types-solana';
import { TransactionForFullJson } from '@solana/kit';
import { Transfer } from '../types/models';

function allAccounts(
  transaction: TransactionForFullJson<0>,
) {
  return [
    ...transaction.transaction.message.accountKeys,
    ...(transaction.meta?.loadedAddresses.writable ?? []),
    ...(transaction.meta?.loadedAddresses.readonly ?? []),
  ];
}

const TOKEN_ADDR = 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof';

export function getAccountByIndex(
  instruction: SolanaInstruction,
  index: number,
): string {
  return allAccounts(instruction.transaction)[index];
}

export async function handleCheckedTransfer(instruction: TransferCheckedInstruction) {
  const source = getAccountByIndex(instruction, instruction.accounts[0]);
  const mint = getAccountByIndex(instruction, instruction.accounts[1]);
  const dest = getAccountByIndex(instruction, instruction.accounts[2]);

  if (mint !== TOKEN_ADDR) {
    return;
  }

  const decoded = await instruction.decodedData;
  assert(decoded, "Expected decoded value");

  const transfer = Transfer.create({
    id: `${instruction.transaction.transaction.signatures[0]}-${instruction.index.join('.')}`,
    amount: BigInt(decoded.data.amount),
    from: source,
    to: dest,
    blockNumber: instruction.block.blockHeight,
    transactionHash: instruction.transaction.transaction.signatures[0],
    date: new Date(Number(instruction.block.blockTime) * 1000),
  });

  await transfer.save();
}

```

Let’s understand how the above code works.

For `handleCheckedTransfer`, the function here receives an `TransferCheckedInstruction` which includes instruction data in the payload. We extract the relevant accounts and confirm the mint is for the RNDR token. We then create a new `Transfer` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping-functions/mapping/solana.md) documentation.
:::


<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  transfers(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      from
      to
      amount
      blockNumber
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "5kA8Hsch2tsCEBduKdi9LmLF1Jpdx93eaXzXcxkdexGMUdjSzRz994oNQQAb9vX4ZRQEmFdgupVPs9RiTsi5SWtP-3.1",
          "from": "AyzyikXL9kKs2cwyHsWLEe22aRYAvhbWwFn9TKrgmMx",
          "to": "7nAXsw5ZSGBmC3xECDL26FeVfaWKccQHCDfqoCNAnR9B",
          "amount": "200000000000000",
          "blockNumber": "314765468"
        },
        {
          "id": "BiiEoNiHmPgWZGZHAq8Qs6zRfnv7AjCd75e66RrVNpxzFz7XdydyrJXfcNoxHzqUUCLu6njGso4HUdjydGEBzZ4-2",
          "from": "GvpfztSKEi1xa5b48W7xvnZCNTZDSP4A4rS1HfiBs7RB",
          "to": "7JJ17zbcUfgrCyZK77aax2YYx9CyqdBW2kou1euNyhec",
          "amount": "178136424747427",
          "blockNumber": "315018963"
        },
        {
          "id": "5m8dqwmBGgWGUa57k99FtHo3qJu9GYCFFtDBE82zdgSx4Yhd6vdgZFuBcPcuD9ZkZjyrNMkwSrq3pVinUHdCd2aU-4",
          "from": "Azq8XAqwJj2nedMMtiH4fgmtoPpy3XR7HZRB32MnpE1E",
          "to": "BCLkJ8As4jb6iRzhTdxLaVRj8cjUxrDPfPXzZXZ5TjU5",
          "amount": "70859502000000",
          "blockNumber": "314982009"
        },
        {
          "id": "4Tc7FmDP3qyw9KnxebQVT8kTf6z8mxQRKGTA7gUXvcz3oCVUCCsQCFAyCa3eqK582qnqEiGV9ynMBCswTxNDM2vW-2",
          "from": "DHK6wAbfKTmnQ878GDmPnfjLfQLFPXVURKfDgUAsKZbz",
          "to": "GkrdqdHMNvb9mpL51UmGKX3bUAtcbjtoTAvwFGHiCyb6",
          "amount": "49997500000004",
          "blockNumber": "316298108"
        },
        {
          "id": "4SugdVF6j4WVsCjxLxAnZRNdPtU3sttx1oHy19KjuWhtf5LarWPEBoZsUHteUJad5sijY8r5LdxTzxhJayXuZLXG-2",
          "from": "ECKa34RVAo5Fvwkp1uEedh6jkM5o4CThvJeShysqJgQs",
          "to": "4PcC3r3yfAJHJJ4WFjhuBcZDX38RNTvDCFLTJZF2cWxY",
          "amount": "48944100000000",
          "blockNumber": "314859767"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/solana-subql-starter/tree/main/Solana/solana-token-program-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
