# Avalanche

## Develop Your First SubQuery Avalanche Project 

The goal of this quick start guide is to index all Pangolin token _Approve_ logs. 

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md). 

Let's now update these configurations one by one. 

## 1. Make Changes to Your Project

Previously, in the [SubQuery CLI](../quickstart.md) section, 3 key files were noted. Let's begin updating them one by one. 

### 1.1 Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal beforehand.

Remove all existing entities and update the `schema.graphql` file as follows:

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNumber: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```
**Important: When you make any changes to the schema file, please ensure that you regenerate your types directory.**

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

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file

### 1.2 Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Avalanche project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers. 

**Since you are going to index all Pangolin approval logs, you need to update the `datasources` section as follows:**


```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `approve` log on any transaction from the [Pangolin contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file. 

Next, let’s proceed ahead with the Mapping Function’s configuration. 

### 1.3 Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function: 

- Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions:  *`handleBlock`*, *`handleLog`*, and *`handleTransaction`*. Delete both the `handleBlock` and `handleTransactionl` functions as you will only deal with the `handleLog` function.

- The `handleLog` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all `approval` transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as given below(**note the additional imports**):


```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```
Let’s understand how the above code works. 

The function here receives an Avalanche Log which includes transaction log data in the payload. We extract this data and then instantiate a new `PangolinApproval` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (*Note that SubQuery will automatically save this to the database*).

Check out our [Mappings](../../build/mapping.md) documentation to get more information on mapping functions.

### 1.4 Build Your Project

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

## 2. Run and Query Your Project

### 2.1 Run Your Project with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this. 

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

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

### 2.2 Query your Project

Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You will see a GraphQL playground in the browser and the schemas which are ready to query. 

3. Find the *Docs* tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md). 


```graphql
query {
  pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

You should see results similar to below:

```
{
  "data": {
    "pangolinApprovals": {
      "nodes": [
        {
          "id": "0xd3778a1e35d13b02e6bec3df2e3ec3855168b86e9fcb796b512bbd2b44223d1e-0",
          "blockNumber": "57360",
          "blockHash": "0xd3778a1e35d13b02e6bec3df2e3ec3855168b86e9fcb796b512bbd2b44223d1e",
          "transactionHash": "0xfab84552e997848a43f05e440998617d641788d355e3195b6882e9006996d8f9",
          "addressFrom": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "addressTo": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "amount": "0x000000000000000000000000808ce8dec9e10bed8d0892aceef9f1b8ec2f52bd"
        }
      ]
    }
  }
}
```

## What's next? 

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

Click [here](../../quickstart/whats-next.md) to learn where to next on your SubQuery journey.