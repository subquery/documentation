# Algorand Quick Start

## Goals

The goal of this quick guide is to adapt the standard starter project and start indexing [all the PLANET token transfers](https://algoexplorer.io/address/ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754) from Algorand. Check out the video or follow the step by step instructions below.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/zWzKGT30zbE" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section.
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/algorand-planet-watch).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Update the `schema.graphql` file as follows. In this project, you can see we are indexing all transactions related to the PLANET asset. Each entity has a number of properties, including id, blockheight, sender, receiver, and amount.

```graphql
type Transaction @entity {
  id: ID! # A unique ID - The transaction ID
  blockHeight: Int!
  sender: Address!
  receiver: Address
  amount: BigInt
}

type Address @entity {
  id: ID! # in this case the wallet address
  sentTransactions: [Transaction] @derivedFrom(field: "sender")
  receivedTransactions: [Transaction] @derivedFrom(field: "receiver")
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

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

You will find the generated models in the `/src/types/models` directory.

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Algorand project. It defines most of the details on how SubQuery will index and transform the chain data. For Algorand, there are two types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/algorand.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/algorand.md#mapping-handlers-and-filters): On each and every transaction that matches an optional filter, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

```yaml
dataSources:
  - kind: algorand/Runtime
    startBlock: 8712119 # Block that planet was created on https://algoexplorer.io/tx/G66KX3TLKXUI547DFB4MNVY7SJVADOJKGP4SWMRC632GFHSFX5KQ
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleTransaction
          kind: algorand/TransactionHandler
          filter:
            # payments from the Planet Watch Address for the PLANET asset
            txType: axfer
            assetId: 27165954
            sender: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754"
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is an Algorand Transaction that includes the asset ID `27165954` and is sent from the `ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754` (Planet) address. The `txType: axfer ` distinguishes the type of the transaction as an [asset transfer transaction](https://developer.algorand.org/docs/get-details/transactions/transactions/).

Check out our [Manifest File](../../build/manifest/algorand.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleBlock` and `handleTransaction`. Delete the `handleBlock` function.

The `handleTransaction` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all PLANET token transactions, and save them to the GraphQL entities created earlier.

Update the `handleTransaction` function as follows (**note the additional imports**):

```ts
import { AlgorandTransaction } from "@subql/types-algorand";
import { Transaction, Address } from "../types";

export async function handleTransaction(
  tx: AlgorandTransaction
): Promise<void> {
  // logger.info(JSON.stringify(tx));
  if (tx.assetTransferTransaction && tx.id && tx.confirmedRound) {
    // ensure that our address entities exist
    const senderAddress = await Address.get(tx.sender.toLowerCase());
    if (!senderAddress) {
      await new Address(tx.sender.toLowerCase()).save();
    }

    const receiverAddress = await Address.get(
      tx.assetTransferTransaction.receiver.toLowerCase()
    );
    if (!receiverAddress) {
      await new Address(
        tx.assetTransferTransaction.receiver.toLowerCase()
      ).save();
    }

    // Create the new transfer entity
    const transactionEntity: Transaction = Transaction.create({
      id: tx.id,
      blockHeight: tx.confirmedRound,
      senderId: tx.sender.toLowerCase(),
      receiverId: tx.assetTransferTransaction.receiver.toLowerCase(),
      amount: BigInt(tx.assetTransferTransaction.amount),
    });
    await transactionEntity.save();
  }
}
```

Let’s understand how the above code works.

Here, the function receives a `AlgorandTransaction` which includes all transaction data on the payload. We extract this data and then instantiate a new `Transaction` entity (using required properties `id`,`blockHeight` and `sender`) defined earlier in the `schema.graphql` file. After that, we add additional information about the payment (`receiver` and `amount`properties) and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping/algorand.md) documentation to get more information on mapping functions.

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
  transactions(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      blockHeight
      senderId
      receiverId
      amount
    }
  }
  addresses(first: 5, orderBy: RECEIVED_TRANSACTIONS_COUNT_DESC) {
    nodes {
      id
      receivedTransactions(first: 5) {
        totalCount
        nodes {
          id
        }
      }
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
          "id": "WOCAA5H7BBEBGRBBIKW6HMFRHVXNLZEBCCZK7K3PRFT2VJI3PHBQ",
          "blockHeight": 24479670,
          "senderId": "zw3isehzuhpo7ozgmklkiimkvicoudrceri454i3db2bh52hglso67w754",
          "receiverId": "6brbuwoyu4aiebt3ptx7qmxcftzbsecuit3bwc3jsvgxwyzwjfv345t2oa",
          "amount": "0"
        },
        {
          "id": "4XQO6VO6HATIFGWGJ6DW5ZFJ5EIXNMECZHCOJV325K43TIZ4WOHQ",
          "blockHeight": 24479796,
          "senderId": "zw3isehzuhpo7ozgmklkiimkvicoudrceri454i3db2bh52hglso67w754",
          "receiverId": "vvoud34opqsb2oxczrvww6wlwpwhhz6kken6y7ivaiqrjvsmvgndybrlk4",
          "amount": "0"
        },
        {
          "id": "3MVJEX7K5NYY76GRO6IWKAXVFAA5TRLYCM7IQNI37BIPKQBUNHMQ",
          "blockHeight": 24479778,
          "senderId": "zw3isehzuhpo7ozgmklkiimkvicoudrceri454i3db2bh52hglso67w754",
          "receiverId": "5rrdqmlc44m57vpzlcawv2y7nymbrz4pvvvbxtvwkm4bb3ddfby46b7gce",
          "amount": "0"
        },
        {
          "id": "ZVQ2DAA6EYNDTT2K22GTVYUNCKJS43PR52M7UG5TR7KZ33NKWAZQ",
          "blockHeight": 24479846,
          "senderId": "zw3isehzuhpo7ozgmklkiimkvicoudrceri454i3db2bh52hglso67w754",
          "receiverId": "tef2tph54kv5k56xaajbxaurht2enyv7cul45kdgmbcazy2x2goarf4kai",
          "amount": "0"
        },
        {
          "id": "BFGTT3YZMTBJLOBZJBZ3NPKD4O72MRNLJ2DJWFAFGNO7FQ2YDW5A",
          "blockHeight": 24479802,
          "senderId": "zw3isehzuhpo7ozgmklkiimkvicoudrceri454i3db2bh52hglso67w754",
          "receiverId": "yb4bjl23u6fawyvp6zdyq4necjctkhn4mxcktbukpwrfoftqpdekdtww2e",
          "amount": "0"
        }
      ]
    },
    "addresses": {
      "nodes": [
        {
          "id": "fndsfhwxdue7nqavnpadw7gtqqinitzu3kw32sliq47iynymbwn2zm3iza",
          "receivedTransactions": {
            "totalCount": 91,
            "nodes": [
              {
                "id": "VRT6DW7V6AYXMQEAYM5QQTR3M4MIA6N6LGLYOZHIY3M2FGQ5DS5Q"
              },
              {
                "id": "4ZLLRGKYQM2LGUJXI3BCS7M2O3VLATWJZVGNNERYH4ADCVYATW2Q"
              },
              {
                "id": "I7M5N2BDYGLOJCQI7OB7KBYHZ2UKHNL5SAABELIIEHUANQ3WR43Q"
              },
              {
                "id": "RIDSPD6WAG7PWMLBOIFFPYKRDCW5ILH7BUTO7SFYYMGJAC365UVA"
              },
              {
                "id": "P7OVWVWF4NKQM7T47W45SUTZ6DULXKGQE2WDGLMEPC5AOVZUR34Q"
              }
            ]
          }
        },
        {
          "id": "gmgpw6xynm7fmnzx2l5zf7rekfh7r7z2qalg2cbyxtpbxbri6byrjtnn7y",
          "receivedTransactions": {
            "totalCount": 64,
            "nodes": [
              {
                "id": "GX6F5LY543W3FGARDMZ7D5WINAQH3CGN737XNRFA5OBUBRXTCM6A"
              },
              {
                "id": "BC62CCWFF4D62U4U3ZPZ5XXIDQ75BBV3MB6ILFCDSKXA6CN2E4QA"
              },
              {
                "id": "NX5WKZ7V7FASHCBCKWQNO3MWZOM5VVTOATM6WI7WZ3CRUENTKYPQ"
              },
              {
                "id": "6SQNJBAMOPPNIIHOW5S25A7GUZXNVDATWQMCZS63MCJCU3YTKN6Q"
              },
              {
                "id": "NGFDFMIGAXRPNK7KNIRQY3YPLG5QI24KLMO4LZPQZQ7MLO2VNQVA"
              }
            ]
          }
        },
        {
          "id": "7dvgazex6zzn33auj3wsnf6xcxk35gpj7gryb7hv4bm3l7ygpauhi6e7ia",
          "receivedTransactions": {
            "totalCount": 47,
            "nodes": [
              {
                "id": "MF6GMWWR5ZJPDHC27W5YOHRYVS6743ZP2ITXK2BYNPAACBTDFYCA"
              },
              {
                "id": "WNJPNYZE5VFVAUWIW54KMFTLJHPZLAAEYZQOLEPMDPA44EZXNMYA"
              },
              {
                "id": "E3ZW2ZBIEYKA5YQG2LJ3XDJ2QZBVFKIYYOTYN2TASA3WAHCQVLDA"
              },
              {
                "id": "OSE6CUEC7WS7XUNGZDB4OW5DXCDGAWVPN2XFWU4GY34TYBSJS26Q"
              },
              {
                "id": "VAHKAZIIC4OVEXNGKB62GITSFM2AXUNRSXADMOQHOUVFGZJMJUEA"
              }
            ]
          }
        },
        {
          "id": "l3aryt26d6v4asp4vqpe4lb6jwnmx2onolompvrrqjq7i4akzk46nkjixm",
          "receivedTransactions": {
            "totalCount": 34,
            "nodes": [
              {
                "id": "IO3757FYUMRHSULVI4M32UKLMR7UUEU3RG73XUGPCE4YHRCO4CXA"
              },
              {
                "id": "WXLANXMVWEFYDKKKKT75LKZKK2QRADFQK5QM4ZQBT43KF4S2IHSA"
              },
              {
                "id": "KO3QNDACY6S4WLUCF6XJT2E5VDYEPB5C4D6NS6H7M2RDZOPADKOA"
              },
              {
                "id": "E43VGQYFKZNJLCK63C7OT6SDWEUATSTIMDIP6Z72F4G74UBOMZHA"
              },
              {
                "id": "UVFOBUNEN37OADQT2WG6N5I664GM22UMC6PYVFTFR4GLONBPNPWQ"
              }
            ]
          }
        },
        {
          "id": "akqtyjstxod7norenujjujiaxmd2a6fi4ixvq2banpc4e6n5nqxcvgoecq",
          "receivedTransactions": {
            "totalCount": 31,
            "nodes": [
              {
                "id": "GADJ5X5DEM3NQZXMXBYTUBNIPKYWW677MGOMH65UVT4REJT5VSMA"
              },
              {
                "id": "W42ONSONMCYYRKP6SDQODTVTKTAT3Z5NSW7Y74JLHZ6AVPAAENYA"
              },
              {
                "id": "HVCR3VQYJD3S6PLJZEYVZTOQPQ5TPUYTJTQVGXY4Z63LU3GFXNAA"
              },
              {
                "id": "EJY5B7CUF2PECOOEZJRMW3KH6LTCWC7Q5WWWWBBVBVTVCK6KB3ZQ"
              },
              {
                "id": "JOR5N3NNCN75BCP5GBGKYZT5MPYNHJ5I5ZUWF232Q3XZGWUWVIMQ"
              }
            ]
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/algorand-planet-watch).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
