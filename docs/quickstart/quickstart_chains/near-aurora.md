# Aurora Quick Start (EVM)

[Aurora](https://aurora.dev) is a next-generation Ethereum compatible blockchain and ecosystem that runs on the NEAR Protocol, and powers the innovations behind Aurora Cloud—the fastest path for Web2 businesses to capture the value of Web3.

Since SubQuery fully supports NEAR and Aurora, you can index data from both execution environments in the same SubQuery project and into the same dataset.

The goal of this quick start guide is to index transfers and approvals for the [Wrapped NEAR smart contract](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d) on NEAR Aurora.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/cjziTXhGBGw" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/quickstart-reference.md -->

<!-- @include: ../snippets/near-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-aurora-starter).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for NEAR Aurora. Since Aurora is a EVM implementation on NEAR, we can use the core Ethereum framework to index it.
:::

As we are indexing all transfers and approvals for the Wrapped NEAR smart contract, the first step is to import the contract abi definition which can be obtained from [here](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d/contracts#address-tabs). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since we are indexing all transfers and approvals for the Wrapped NEAR smart contract, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime, // We use ethereum runtime since NEAR Aurora is a layer-2 that is compatible
      startBlock: 42731897, // Block with the first interaction with NEAR https://explorer.aurora.dev/tx/0xc14305c06ef0a271817bb04b02e02d99b3f5f7b584b5ace0dab142777b0782b1
      options: {
        // Must be a key of assets
        abi: "erc20",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d", // this is the contract address for wrapped NEAR https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleTransaction",
            kind: EthereumHandlerKind.Call, // We use ethereum runtime since NEAR Aurora is a layer-2 that is compatible
            filter: {
              // The function can either be the function fragment or signature
              // function: '0x095ea7b3'
              // function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
          {
            handler: "handleLog",
            kind: EthereumHandlerKind.Event,
            filter: {
              // address: "0x60781C2586D68229fde47564546784ab3fACA982"
              topics: [
                //Follows standard log filters https://docs.ethers.io/v5/concepts/events/
                "Transfer(address indexed from, address indexed to, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleTransaction` and `handlelog` mapping function whenever there is an `approve` or `Transfer` log on any transaction from the [Wrapped NEAR contract](https://explorer.aurora.dev/address/0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d/contracts#address-tabs).

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id and the blockHeight along with addresses such as to, from, owner and spender, along with the contract address and value as well.

```graphql
type Transaction @entity {
  id: ID! # Transaction hash
  txHash: String
  blockHeight: BigInt
  to: String!
  from: String!
  value: BigInt!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  value: BigInt!
  owner: String!
  spender: String!
  contractAddress: String!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code:

```ts
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
import assert from "assert";

export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");
  const transaction = Transaction.create({
    id: log.transactionHash,
    txHash: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    to: log.args.to,
    from: log.args.from,
    value: log.args.value.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}

export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}
```

The `handleTransaction` function receives a `tx` parameter of type `ApproveTransaction` which includes transaction log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/ethereum.md) documentation to get more information on mapping functions.

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation here
{
  query {
    transactions(first: 2, orderBy: BLOCK_HEIGHT_ASC) {
      totalCount
      nodes {
        id
        txHash
        blockHeight
        to
        from
        value
        contractAddress
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
      "transactions": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6-5",
            "txHash": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "value": "12373884174795780000"
          },
          {
            "id": "0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6-5",
            "txHash": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "value": "12373884174795780000"
          }
        ]
      }
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
