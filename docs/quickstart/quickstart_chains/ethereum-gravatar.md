# Ethereum Quick Start - Gravatar (Simple)

The goal of this quick start guide is to index all Ethereum Gravatars created or updated on the Ethereum mainnet.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-gravatar).
:::

#### Check out how to get the Ethereum starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/pAYjuGGf8kQ" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

We are indexing all Gravatars from the Gravatar contract, first you will need to import the contract abi defintion. You can copy the entire JSON and save as a file `./Gravity.json` in the `/abis` directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Gravatars, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 6175243,

      options: {
        // Must be a key of assets
        abi: "gravity",
        address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC",
      },
      assets: new Map([["gravity", { file: "./abis/Gravity.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleNewGravatar",
            filter: {
              topics: ["NewGravatar(uint256,address,string,string)"],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleUpdatedGravatar",
            filter: {
              topics: ["UpdatedGravatar(uint256,address,string,string)"],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `NewGravatar` or `UpdatedGravatar` log on any transaction from the [Gravatar contract](https://etherscan.io/address/0x2E645469f354BB4F5c8a05B3b30A929361cf77eC).

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Gravatar } from "../types";
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

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

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-gravatar).
:::

<!-- @include: ../snippets/whats-next.md -->
