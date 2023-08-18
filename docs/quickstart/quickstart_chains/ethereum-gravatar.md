# Ethereum Quick Start - Gravatar (Simple)

## Goals

The goal of this quick start guide is to index all Ethereum Gravatars created or updated on the Ethereum mainnet.

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Ethereum project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-gravatar).
:::

## 1. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Ethereum project. It defines most of the details on how SubQuery will index and transform the chain data. For Ethereum, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

We are indexing all Gravatars from the Gravatar contract, first you will need to import the contract abi defintion. You can copy the entire JSON and save as a file `./Gravity.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Gravatars, you need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 6175243 # This is when the Gravatar contract was deployed
    options:
      # Must be a key of assets
      abi: gravity
      address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC" # The contract address of the Gravatar on Ethereum
    assets:
      gravity:
        file: "./abis/Gravity.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleNewGravatar
          kind: ethereum/LogHandler
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - NewGravatar(uint256,address,string,string)
        - handler: handleUpdatedGravatar
          kind: ethereum/LogHandler
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - UpdatedGravatar(uint256,address,string,string)
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `NewGravatar` or `UpdatedGravatar` log on any transaction from the [Gravatar contract](https://etherscan.io/address/0x2E645469f354BB4F5c8a05B3b30A929361cf77eC).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing the id, owner, display name, image URL and the block the gravatar was created in.

```graphql
type Gravatar @entity {
  id: ID!
  owner: Bytes!
  displayName: String!
  imageUrl: String!
  createdBlock: BigInt!
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

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

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entites can be imported from the following directory:

```ts
import { Gravatar } from "../types";
```

If you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example Gravatar SubQuery project, you would import these types like so.

```ts
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";
import { Gravatar } from "../types";
import assert from "assert";

export async function handleNewGravatar(log: NewGravatarLog): Promise<void> {
  logger.info("New Gravar at block " + log.blockNumber.toString());

  assert(log.args, "Require args on the logs");

  const gravatar = Gravatar.create({
    id: log.args.id.toHexString()!,
    owner: log.args.owner,
    displayName: log.args.displayName,
    imageUrl: log.args.imageUrl,
    createdBlock: BigInt(log.blockNumber),
  });

  await gravatar.save();
}

export async function handleUpdatedGravatar(
  log: UpdatedGravatarLog
): Promise<void> {
  logger.info("Updated Gravar at block " + log.blockNumber.toString());

  assert(log.args, "Require args on the logs");

  const id: string = log.args.id.toHexString()!;

  // We first check if the Gravatar already exists, if not we create it
  let gravatar = await Gravatar.get(id);
  if (gravatar == null || gravatar == undefined) {
    gravatar = Gravatar.create({
      id,
      createdBlock: BigInt(log.blockNumber),
      owner: "",
      displayName: "",
      imageUrl: "",
    });
  }
  // Update with new data
  gravatar.owner = log.args.owner;
  gravatar.displayName = log.args.displayName;
  gravatar.imageUrl = log.args.imageUrl;
  await gravatar.save();
}

```

Let’s understand how the above code works.

For `handleNewGravatar`, the function here receives an `NewGravatarEvent` which includes transaction log data in the payload. We extract this data and then create a new Gravatar entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

For `handleUpdatedGravatar`, the function here receives an `UpdatedGravatarEvent` which includes transaction log data in the payload. We extract this data and then first check that the Gravatar already exists, if not we instantiate a new one and then update that Gravatar with the correct updated details. This is then saved to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

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

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

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
query {
  gravatars(first: 2, orderBy: CREATED_BLOCK_DESC) {
    nodes {
      id
      owner
      displayName
      imageUrl
      createdBlock
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "gravatars": {
      "nodes": [
        {
          "id": "0x47",
          "owner": "\\xbc8dafeaca658ae0857c80d8aa6de4d487577c63",
          "displayName": "Victor",
          "imageUrl": "https://ucarecdn.com/295e4ba5-ad1c-48bf-9957-093424709881/-/crop/152x152/1,0/-/preview/",
          "createdBlock": "6469958"
        },
        {
          "id": "0x46",
          "owner": "\\x0773cbc2c55cd6354a61b7bcbca52d9dccd56534",
          "displayName": "dgogel",
          "imageUrl": "https://ucarecdn.com/c44402a0-30f8-4c0c-bf1f-b13918903211/-/crop/512x512/0,0/-/preview/",
          "createdBlock": "6460716"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-gravatar).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
