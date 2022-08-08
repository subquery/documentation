# Algorand Quick Start

## Goals

The goal of this quick guide is to adapt the standard starter project and start indexing [all the PLANET token transfers](https://algoexplorer.io/address/ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754) from Algorand.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section.
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: info Note
The final code of this project can be found [here](https://github.com/jamesbayly/algorand-planet-watch). 
:::
## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are focussing on indexing all transactions ralated to the PLANET asset.

```graphql
type Transaction @entity {
  id: ID! # A unique ID - The transaction ID
  blockHeight: Int!
  sender: String!
  receiver: String
  amount: BigInt
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

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

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Algorand project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

```yaml
dataSources:
  - kind: algorand/Runtime
    startBlock: 8712119 #Block that planet was created on https://algoexplorer.io/tx/G66KX3TLKXUI547DFB4MNVY7SJVADOJKGP4SWMRC632GFHSFX5KQ
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleTransaction
          kind: algorand/TransactionHandler
          filter:
            #Payments from the Planet Watch Address for the PLANET asset
            assetId: 27165954
            sender: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754"
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is an Algorand Transaction that includes the asset ID `27165954` and is sent from the `ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754` (Planet) address.

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

- Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleBlock` and `handleTransaction`. Delete the `handleBlock` function.

- The `handleTransaction` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all PLANET token transactions, and save them to the GraphQL entities created earlier.

Update the `handleTransaction` function as follows (**note the additional imports**):

```ts
import { AlgorandTransaction } from "@subql/types-algorand";
import { Transaction } from "../types";

export async function handleTransaction(
  tx: AlgorandTransaction
): Promise<void> {
  // logger.info(JSON.stringify(tx));
  const transactionEntity: Transaction = Transaction.create({
    id: tx.id,
    blockHeight: tx.confirmedRound,
    sender: tx.sender,
  });
  if (tx.paymentTransaction) {
    (transactionEntity.receiver = tx.paymentTransaction.receiver),  
      (transactionEntity.amount = BigInt(tx.paymentTransaction.amount));
  }
  await transactionEntity.save();
}
```

Let’s understand how the above code works.

Here, the function recieves a `AlgorandTransaction` which includes all transaction data on the payload. We extract this data and then instantiate a new `Transaction` entity (using required properties `id`,`blockHeigh` and `sender`) defined earlier in the `schema.graphql` file. After that, we add additional information about the payment (`receiver` and `amount`properties) and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping.md) documentation to get more information on mapping functions.

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

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

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

::: info Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
::: 

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  transactions(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      blockHeight
      sender
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "transactions": {
      "nodes": [
        {
          "id": "22KTREJE4FXRL26PFS3UACSEEXFMG52RSMLGIT2V5VM65IJ37JFA",
          "blockHeight": 8716270,
          "sender": "SHTUSO6YCTH5NV74MU2HC4VOKFGX3NLOUVD5TCZCXQWDSX6JCE4SMZMOYA",
          "reciever": null,
          "amount": null
        },
        {
          "id": "236KDOYBH5CZDZSDRQ32XK5W25TQFHVTIRKRPFHLIU2PBOCWMSEQ",
          "blockHeight": 8715704,
          "sender": "SHTUSO6YCTH5NV74MU2HC4VOKFGX3NLOUVD5TCZCXQWDSX6JCE4SMZMOYA",
          "reciever": null,
          "amount": null
        },
        {
          "id": "237QLNWAR6IDCJQGSW5AF7H3TO7HM4WYF7B7XTFEFI6WZZA43I7A",
          "blockHeight": 8715145,
          "sender": "SHTUSO6YCTH5NV74MU2HC4VOKFGX3NLOUVD5TCZCXQWDSX6JCE4SMZMOYA",
          "reciever": null,
          "amount": null
        },
        {
          "id": "2466NNRTAREB2JLMDHAHJ24DDSDAYVOGO6H3VH2S45TWKVF7YOKA",
          "blockHeight": 8716418,
          "sender": "SHTUSO6YCTH5NV74MU2HC4VOKFGX3NLOUVD5TCZCXQWDSX6JCE4SMZMOYA",
          "reciever": null,
          "amount": null
        },
        {
          "id": "24JIQD73JR5KMQ5PIM3J5ZVWTF2ZP4L7N3I257JREEEHGHJTGDXA",
          "blockHeight": 8715583,
          "sender": "SHTUSO6YCTH5NV74MU2HC4VOKFGX3NLOUVD5TCZCXQWDSX6JCE4SMZMOYA",
          "reciever": null,
          "amount": null
        }
      ]
    }
  }
}
```

::: info Note
The final code of this project can be found [here](https://github.com/jamesbayly/algorand-planet-watch).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
