# Terra

## Develop Your First SubQuery Terra Project 

The goal of this quick guide is to adapt the standard starter project and start indexing all transfers from Terra.

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. 

Now, let's move ahead in the process and update these configurations. 

## 1. Make Changes to Your Project

Previously, in the [SubQuery CLI](../quickstart.md) section, you must have noted [3 key files](../quickstart.html#_3-make-changes-to-your-project). Let's begin updating them one by one. 

### 1.1 Update Your GraphQL Schema File

The `schema.graphql` file defines the shape of your data from SubQuery due to the GraphQL query language’s mechanism. Hence, updating the GraphQL Schema file is the perfect start. It allows you to decide your end goal beforehand.

Update the `schema.graphql` file as follows and remove all existing entities:


```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  txHash: String!
  blockHeight: BigInt # The block height of the transfer
  sender: String! # The account that transfers are made from
  recipient: String! # The account that transfers are made to
  amount: String! # Amount that is transferred
}
```

**Important: When you make any changes to the schema file, do make sure to regenerate your types directory.**

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

Check out [GraphQL Schema](../../build/graphql.md) documentation to get detailed information on `schema.graphql` file.

Now, you have made important changes to the GraphQL Schema file. Let’s move on with the next configuration. 

### 1.2 Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Terra project. It defines most of the details on how SubQuery will index and transform the chain data.

Please note that the manifest file has already been set up correctly and doesn’t require many changes, but you need to change the handlers. **Since you are going to index all Terra transfer events, you need to update the `datasources` section as follows:**


```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

The above code shows that you will be running a `handleEvent` mapping function whenever there is a `transfer` event from the bLuna smart contract.

Check out the [Manifest File](../../build/manifest.md) documentation to learn more about the Project Manifest (`project.yaml`) file. 

Next, let’s proceed ahead with the Mapping Function’s configuration. 


### 1.3 Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function: 


- Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: **`handleBlock`**, **`handleEvent`**, and **`handleCall`**. Delete both the `handleBlock` and `handleCall` functions as you will only deal with the `handleEvent` function.

- The `handleEvent` function receives event data whenever an event matches filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all `transfer` events , and save them to the GraphQL entities created earlier.

Update the `handleEvent` function as follows (note the additional imports):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));
    
    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```
Let’s understand how the above code works. 

The function here receives a SubstrateEvent which includes the transfer data on the payload. We extract this data and then instantiate a new `Transfer`entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (*Note that SubQuery will automatically save this to the database*).

Check out our [Mappings](../../build/mapping.md) documentation to get detailed information on mapping functions.

You are about to finish and create your first project. But, there is still an additional step required to run your SubQuery Project. Let’s take a look. 


### 1.4 Build Your Project

First, you need to build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:


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

Whenever you create a new SubQuery Project, you must not forget to run it locally on your computer and test it. Using Docker is the easiest way to do this. 

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, you must visit the [Runnning SubQuery Locally](../../run_publish/run.md) section and get a detailed explanation of the file and the settings. 

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

**Note:** You have to keep patience here. It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time, but soon you will see a running SubQuery node. 


Let’s move forward to the next step of querying your project. 


### 2.2 Query Your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You must see a GraphQL playground in the browser and the schemas which are ready to query. 

3.  Find the *Docs* tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to figure out how it works for your new SubQuery starter project. Don’t forget to check out the [GraphQL Query language](../../run_publish/graphql.md) and dig out more important information. 


```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

You will see the result similar to below:


## What's next? 

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.