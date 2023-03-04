# Algorand

## Goals

The goal of this quick guide is to adapt the standard starter project and start indexing [all the PLANET token transfers](https://algoexplorer.io/address/ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754) from Algorand.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section.
:::

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/algorand-planet-watch).
:::

## 1. Update Your GraphQL Schema File

::: warning Important
Please refer to [this](home.md#_1-update-the-schemagraphql-file) before proceeding
:::

Remove all existing entities and update the `schema.graphql` file as shown below. Here, we are focussing on indexing all transactions related to the PLANET asset.

```graphql
type Transaction @entity {
  id: ID! # A unique ID - The transaction ID
  blockHeight: Int!
  sender: String!
  receiver: String
  amount: BigInt
}
```

## 2. Update Your Project Manifest File

::: warning Important
Please read [this](home.md#_2-update-the-project-manifest-file) first before proceeding.
:::

For Algorand, there are two types of mapping handlers.

- [BlockHanders](../../build/manifest/algorand.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/algorand.md#mapping-handlers-and-filters): On each and every transaction that matches an optional filter, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but the datasource handlers needs to be updated. Update the `datasources` section as follows:

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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is an Algorand Transaction that includes the asset ID `27165954` and is sent from the `ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754` (Planet) address.

Check out our [Manifest File](../../build/manifest/algorand.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

::: warning Important
Please read [this](home.md#_3-update-the-mapping-functions) first before proceeding.
:::

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleBlock` and `handleTransaction`. Delete the `handleBlock` function.

The `handleTransaction` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all PLANET token transactions, and save them to the GraphQL entities created earlier.

Update the `handleTransaction` function as follows (**note the additional imports**):

```ts
import { AlgorandTransaction } from "@subql/types-algorand";
import { Transaction } from "../types";

export async function handleTransaction(
  tx: AlgorandTransaction
): Promise<void> {
  // logger.info(JSON.stringify(tx));
  if (tx.assetTransferTransaction) {
    // Create the new transfer entity
    const transactionEntity: Transaction = Transaction.create({
      id: tx.id,
      blockHeight: tx.confirmedRound,
      sender: tx.sender.toLowerCase(),
      receiver: tx.assetTransferTransaction.receiver.toLowerCase(),
      amount: BigInt(tx.assetTransferTransaction.amount),
    });
    await transactionEntity.save();
  }
}
```

Here, the function receives a `AlgorandTransaction` which includes all transaction data on the payload. We extract this data and then instantiate a new `Transaction` entity (using required properties `id`,`blockHeigh` and `sender`) defined earlier in the `schema.graphql` file. After that, we add additional information about the payment (`receiver` and `amount`properties) and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping/algorand.md) documentation to get more information on mapping functions.

## 4. Build Your Project

::: warning Important
Please refer to [this](home.md#_4-build-your-project).
:::

## 5. Run Your Project Locally with Docker

::: warning Important
Please refer to [this](home.md#_5-run-your-project-locally-with-docker).
:::

## 6. Query your Project

::: warning Important
Please refer to [this](home.md#_6-query-your-project) before proceeding
:::

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

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
  addresses(first: 5, orderBy: RECIEVED_TRANSACTIONS_COUNT_DESC) {
    nodes {
      id
      recievedTransactions(first: 5) {
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
          "recievedTransactions": {
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
          "recievedTransactions": {
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
          "recievedTransactions": {
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
          "recievedTransactions": {
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
          "recievedTransactions": {
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
