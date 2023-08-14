# Base Goerli Quick Start

## Goals

The goal of this quick start guide is to index the total faucets dripped to users from the [USDC Faucet contract](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d) on [Base Goerli Testnet](https://docs.base.org/using-base/).

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Base project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-base-faucet).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Base. Since Base is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Base project. It defines most of the details on how SubQuery will index and transform the chain data. For Base, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all dripped faucets from the USDC Faucet contract, the first step is to import the contract abi definition which can be obtained from [here](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d). Copy the entire contract ABI and save it as a file called `faucet.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Base is a layer-2 that is compatible
    startBlock: 1512049 # This is the block of the first claim dividend https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d
    options:
      # Must be a key of assets
      abi: faucet_abi
      address: "0x298e0B0a38fF8B99bf1a3b697B0efB2195cfE47D" # this is the contract address for USDC faucet on Base Goerli
 https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d
    assets:
      faucet_abi:
        file: "./abis/faucet.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleDrip
          kind: ethereum/TransactionHandler # We use ethereum handlers since Base Goerli is EVM-Compatible
          filter:
            ## The function can either be the function fragment or signature
            function: "0x6c81bd54"
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: drip(address token, uint256 amount, address receiver)
        # - handler: handleLog
        ## No logs to index in this case, however, it is always possible to uncomment this section and add log handlers
        # kind: ethereum/LogHandler # We use ethereum handlers since Base Goerli is EVM-Compatible
        # filter:
        # topics:
        ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
        # - Transfer(address indexed from, address indexed to, uint256 amount)
        # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleDrip` mapping function whenever there is a `drip` method being called on any transaction from the [USDC Faucet contract](https://goerli.basescan.org/address/0x298e0b0a38ff8b99bf1a3b697b0efb2195cfe47d).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

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

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

This will create a new directory (or update the existing one) `src/types` which contains generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, and read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entities can be imported from the following directory:

```ts
import { Drip, DailyUSDCDrips } from "../types";
```

If you're creating a new EVM-based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import { DripTransaction } from "../types/abi-interfaces/FaucetAbi";
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory using the SubQuery CLI prompt `yarn codegen` or `npm run-script codegen`.
:::

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

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

Check out our [Mappings](../../build/mapping/ethereum.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

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
The final code of this project can be found [here](https://github.com/subquery/subquery-example-base-faucet).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
