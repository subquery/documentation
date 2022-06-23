# Cosmos Quick Start

## Goals

The goal of this quick start guide is to adapt the standard starter project in the Juno Network and then begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos.

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/DeveloperInProgress/juno-subql-starter#readme) for Cosmos users.

You can see the final code of this project on [visiting this link.](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

Now, let's move ahead in the process and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.html#_3-make-changes-to-your-project). Let's begin updating them one by one.

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect start. It allows you to define your end goal beforehand.

Update the `schema.graphql` file as follows. The aim is to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**Important: When you make any changes to the schema file, do not forget to regenerate your types directory.**

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn codegen
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```shell
npm run-script codegen
```

  </CodeGroupItem>
</CodeGroup>

You will find the generated models in the `/src/types/models` directory.

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 2. Update Your Manifest File

The Project Manifest (`project.yaml`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers.

\*Since we are going to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2), we will look at messages that use the `vote` contract call. And following to that, we need to update the `datasources` section as follows:

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

The above code defines that you will be running a `handleTerraDeveloperFund` mapping function whenever there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s dig further into Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

- Navigate to the default mapping function in the `src/mappings` directory. You will see four exported functions: `handleBlock`, `handleEvent`, `handleMessage`, `handleTransaction`. Delete `handleBlock`, `handleEvent`, and `handleTransaction` functions as you will only deal with the `handleMessage` function.

- The `handleMessage` function receives event data whenever an event matches the filters that you specified previously in the `project.yaml`. Let’s update it to process all `vote` messages and save them to the GraphQL entity created earlier.

Update the `handleMessage` function as follows(**note the additional imports**):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

Let’s understand how the above code works.

Here, the function receives a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping.md) documentation and get information on the mapping functions in detail.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn build
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script build
```

  </CodeGroupItem>
</CodeGroup>

**Important: Whenever you make changes to your mapping functions, you must rebuild your project.**

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, never forget to run it locally on your computer and test it. And using Docker is the most hassle-free way to do this.

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, no major changes are needed.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn start:docker
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script start:docker
```

  </CodeGroupItem>
</CodeGroup>

**Note:** It may take a few minutes to download the required images and start the various nodes and Postgres databases.

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  votes(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You will see the result similar to below:

```
{
  "data": {
    "votes": {
      "nodes": [
        {
          "id": "14B3EE22278C494DFE90EA440A4F049F2D39A31634F0062B0FF362DB2872A979-0",
          "blockHeight": "3246683",
          "voter": "juno1njyvry0t3j5dy4rr6ar5zfglg3cy2e8u745hl7",
          "vote": true
        },
        {
          "id": "23329451CAFF77D5A0416013045530011F4FAFEA94FEEF43784CDF0947B6CA90-0",
          "blockHeight": "3246670",
          "voter": "juno1ewq9l5ae69csh57j8sgjh8z37ypm3lt0jzamwy",
          "vote": true
        },
        {
          "id": "BEAB15E994A4E99BD0631DACF4716C5627E5D0C14E0848BF07A45609CEFB2F0D-0",
          "blockHeight": "3246665",
          "voter": "juno1az0ehz2e5emudyh8hx2qwtfely0lstzj08gg9j",
          "vote": true
        }
      ]
    }
  }
}
```

**Note: The final code of this project can be found [here](https://github.com/jamesbayly/juno-terra-developer-fund-votes).**

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
