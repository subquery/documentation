# ZkSync (Era) Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped ETH](https://explorer.zksync.io/address/0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4) on [ZkSync Era](explorer.zksync.io) Network.

Please initialise an a ZkSync Era project.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Zksync/zksync-starter/).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for ZkSync Era. Since ZkSync Era is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped ETH contract on ZkSync network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 10456259, // This is the block that the contract was deployed on
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for wrapped ether https://explorer.zksync.io/address/0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4
        address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WETH contract](https://explorer.zksync.io/address/0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WETH contract](https://explorer.zksync.io/address/0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4).

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, transfer receiver and transfer sender along with an approvals and all of the attributes related to them (such as owner and spender etc.).

```graphql
type Transfer @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  to: String!
  from: String!
  value: BigInt!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  owner: String!
  spender: String!
  value: BigInt!
  contractAddress: String!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Approval, Transfer } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleLog` and `handleTransaction`:

```ts
export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = Transfer.create({
    id: log.transactionHash,
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

The `handleLog` function receives a `log` parameter of type `TransferLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

The `handleTransaction` function receives a `tx` parameter of type `ApproveTransaction` which includes transaction data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation here
{
  query {
    transfers(first: 5, orderBy: VALUE_DESC) {
      totalCount
      nodes {
        id
        blockHeight
        from
        to
        value
        contractAddress
      }
    }
  }
  approvals(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      blockHeight
      owner
      spender
      value
      contractAddress
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 312,
        "nodes": [
          {
            "id": "0xadcf58769ca162e0488d6edeb87f662b98fb2dfe63c2f90a79ae8f3f46566352",
            "blockHeight": "10456276",
            "from": "0x04e9Db37d8EA0760072e1aCE3F2A219988Fdac29",
            "to": "0x92097b24B1F52390Bd49355B4708a99dA3BCb8Ed",
            "value": "54507000000",
            "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
          },
          {
            "id": "0x0bdef9732cc76f3f85a3b6f5f2fd54bb7088407499a6d2eedba814c4e0834859",
            "blockHeight": "10456293",
            "from": "0xc02502CFe2Ef70581De8B90c5De9Db5c38709D6c",
            "to": "0x41C8cf74c27554A8972d3bf3D2BD4a14D8B604AB",
            "value": "5125616093",
            "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
          },
          {
            "id": "0xde9960a4831ef95f9c361f43c0fcc2588ec2bfda51d3a7dc1eb4388b83e91e29",
            "blockHeight": "10456287",
            "from": "0x621425a1Ef6abE91058E9712575dcc4258F8d091",
            "to": "0x87bbA1Ab615D33A5ECf83901BbFd1F7622562f40",
            "value": "5081848131",
            "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
          },
          {
            "id": "0x7887f90a43c9ecad5afe38dffad726b5967b7f42f4e0231b72d2ccdcfa8951ea",
            "blockHeight": "10456319",
            "from": "0x87bbA1Ab615D33A5ECf83901BbFd1F7622562f40",
            "to": "0x621425a1Ef6abE91058E9712575dcc4258F8d091",
            "value": "5081848131",
            "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
          },
          {
            "id": "0x35d1fafa6c594db1853d2182e5158ac1530d9274784760bacf43611b5db63663",
            "blockHeight": "10456299",
            "from": "0x621425a1Ef6abE91058E9712575dcc4258F8d091",
            "to": "0x8afE9F6648E2458A75A51AC868D1f203f2B8C77a",
            "value": "2681633716",
            "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x9ad838401aa20b6264ae55389ed6075168112a3318d69d81eab6b030c510ead3",
          "blockHeight": "10456406",
          "owner": "0xBe234C78b61E37097A1D37Bfbe7C0434CfDCaa9d",
          "spender": "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
        },
        {
          "id": "0xd656dc17d14cf795060e6dc6886553ab110d010d4cc7447ec68a131fb5b9967f",
          "blockHeight": "10456406",
          "owner": "0xE44D4a0872a050621592418bAa728337F558120F",
          "spender": "0xA269031037B4D5fa3F771c401D19E57def6Cb491",
          "value": "19054027",
          "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
        },
        {
          "id": "0xec318b68b34252636210315f448c0ca8dc35b9ed72c7ddef9415c6792c04cac6",
          "blockHeight": "10456406",
          "owner": "0xFBE0c5f3aF4aD305e051e478E0608D739408439D",
          "spender": "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
          "value": "18219100",
          "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
        },
        {
          "id": "0x7836d437bbb3b83ec13e98f26ac805c904422bde36af50b852417d62095afea4",
          "blockHeight": "10456406",
          "owner": "0xEc93D5e0B9F2B5145De52De82527aeD8A1058570",
          "spender": "0x8B791913eB07C32779a16750e3868aA8495F5964",
          "value": "17652824",
          "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
        },
        {
          "id": "0xf0f816641e87f1ffa6808294250b083091d606a856e30c8344e52b9f21331533",
          "blockHeight": "10456405",
          "owner": "0xBCD1ec967FeBbF82D32BA86b63b4dd063371760C",
          "spender": "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Zksync/zksync-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
