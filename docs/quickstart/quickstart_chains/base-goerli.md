# Base Goerli Quick Start

The goal of this quick start guide is to index the total faucets dripped to users from the [USDC Faucet contract](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d) on [Base Goerli Testnet](https://docs.base.org/using-base/).

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-goerli-faucet).

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Base. Since Base is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

As we are indexing all dripped faucets from the USDC Faucet contract, the first step is to import the contract abi definition which can be obtained from [here](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d). Copy the entire contract ABI and save it as a file called `faucet.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1512049,

      options: {
        // Must be a key of assets
        abi: "faucet_abi",
        // # this is the contract address for wrapped ether https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
        address: "0x298e0B0a38fF8B99bf1a3b697B0efB2195cfE47D",
      },
      assets: new Map([["faucet_abi", { file: "./abis/faucet.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleDrip",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               * function: drip(address token, uint256 amount, address receiver)
               */
              function: "0x6c81bd54",
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

The above code indicates that you will be running a `handleDrip` mapping function whenever there is a `drip` method being called on any transaction from the [USDC Faucet contract](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight and drip receiver along with an aggregation of the total value of the drip per day.

```graphql
type Drip @entity {
  id: ID! # Transaction hash
  blockHeight: String
  to: String!
  value: BigInt!
  tokenAddress: String!
  date: Date!
}

#The following entity allows us to aggregate daily Drips for USDC faucet only. As of JulY 4th, this contract only drips USDC faucet anyway.
type DailyUSDCDrips @entity {
  id: ID! # this is the format YYYY-MM-DD T HH:MM:SS
  totalValue: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Drip, DailyUSDCDrips } from "../types";
import { DripTransaction } from "../types/abi-interfaces/FaucetAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleDrip` and `handleDailyDrips`:

```ts
export async function handleDrip(tx: DripTransaction): Promise<void> {
  //We add a logger to see the output of the script in the console.
  logger.info(`New Drip transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");
  const drip = Drip.create({
    id: tx.hash,
    blockHeight: tx.blockNumber.toString(),
    to: await tx.args[2], //Third argument of the method call. Index starts at 0.
    value: BigNumber.from(await tx.args[1]).toBigInt(), //Second argument of the method call. Index starts at 0.
    tokenAddress: await tx.args[0], //First argument of the method call. Index starts at 0.
    date: new Date(Number(tx.blockTimestamp) * 1000),
  });

  await drip.save();

  //We only want to aggregate the USDC drips
  if (drip.tokenAddress == "0x7b4Adf64B0d60fF97D672E473420203D52562A84") {
    await handleDailyDrips(drip.date, drip.value);
  }
}

export async function handleDailyDrips(
  date: Date,
  dripValue: bigint
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregateDrips = await DailyUSDCDrips.get(id);

  if (!aggregateDrips) {
    aggregateDrips = DailyUSDCDrips.create({
      id,
      totalValue: dripValue,
    });
  } else {
    aggregateDrips.totalValue += dripValue;
  }

  await aggregateDrips.save();
}
```

The `handleDrip` function receives a `tx` parameter of type `DripTransaction` which includes transaction data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation here
query {
  drips(first: 10, orderBy: DATE_DESC) {
    nodes {
      id
      value
      date
    }
  }
  dailyUSDCDrips(orderBy: ID_DESC) {
    nodes {
      id
      totalValue
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "drips": {
      "nodes": [
        {
          "id": "0xeb49292b455670f08f971d9c5cf48b10ecaa7053ea0cc330bd3be58f18586524",
          "value": "1000000000",
          "date": "2023-07-04T22:58:20"
        },
        {
          "id": "0xa2757f9f16cc15b123cd78efd3eca977e8b33022a19d6c572cf09d6ef75b481e",
          "value": "1000000000",
          "date": "2023-07-04T22:57:58"
        },
        {
          "id": "0xf40aebe48a1bf7722ba3882c3161144f477cce7920cf717297d4e3ccbb811fa7",
          "value": "1000000000",
          "date": "2023-07-04T22:57:34"
        },
        {
          "id": "0x6286bb9fdafc68f1497bd32923e796aa310d08b65fd02af3ff4a5b8a20fb4062",
          "value": "1000000000",
          "date": "2023-07-04T22:57:10"
        },
        {
          "id": "0x166e458cd5147ecc5a35577e3408969f489a82aee1da0f95485d1f9377927dcc",
          "value": "1000000000",
          "date": "2023-07-04T22:54:54"
        },
        {
          "id": "0x69c42fddda0b8dc13bd1ddf361f1bd32c19518446b971d10d10d3aa7c725b603",
          "value": "1000000000",
          "date": "2023-07-04T22:54:18"
        },
        {
          "id": "0xc34551128b82b21beb47858ea7bff87abd58eba8e863ea0fb2a1e8220977b8c6",
          "value": "1000000000",
          "date": "2023-07-04T22:53:56"
        },
        {
          "id": "0x58e6e49cf624e809a51f732d95028ad1e4301f00356a47c4999e1df1226ebb48",
          "value": "1000000000",
          "date": "2023-07-04T22:53:22"
        },
        {
          "id": "0x7092884802e5600a844306cb95303a3ee062d4334a01f6c651d29e692cb636d7",
          "value": "1000000000",
          "date": "2023-07-04T22:52:24"
        },
        {
          "id": "0xe72aa8862d92c081275668113696903aafef80e0d40fe918bf0d289c603d906b",
          "value": "1000000000",
          "date": "2023-07-04T22:52:24"
        }
      ]
    },
    "dailyUSDCDrips": {
      "nodes": [
        {
          "id": "2023-07-04",
          "totalValue": "806000000000"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-goerli-faucet).
:::

<!-- @include: ../snippets/whats-next.md -->
