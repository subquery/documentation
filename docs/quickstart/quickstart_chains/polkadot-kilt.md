# Kilt Quick Start

## Goals

This quick start guide introduces SubQuery's Substrate WASM support by using an example project in Kilt Spiritnet. The example project indexes all Attestations [created](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationCreated) and [revoked](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationRevoked) on the [Kilt Spiritnet Blockchain](https://www.kilt.io/).
Previously, in the [1. Create a New Project](../quickstart.md) section, [3 key files](../quickstart.md#_3-make-changes-to-your-project) were mentioned. Let's take a closer look at these files.

The project that we are developing throughout this guide can be found [here](https://github.com/subquery/subql-starter/tree/e7152c7391cce015b2df0c293ee6c62215ed0e3b/Kilt/kilt-spiritnet-credentials-example)

## 1. GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

The Kilt-spiritinet-credentials-example project has two entities: Attestation and Aggregation (which has a [foreign key](../../build/graphql.md#one-to-many-relationships) to Dapp). These index basic block data such as the timestamp, height, and hash along with some other attributes related to the event.

```graphql
type Attestation @entity {
  id: ID! #id is ClaimHashOf
  createdDate: Date! #date of creation of the attestation
  createdBlock: BigInt! #block of creation of the attestation
  creator: String! # Account address
  creationClaimHash: String!
  attestationId: String! #Id of the attester
  hash: String! #extrensic hash
  delegationID: String
  revokedDate: Date
  revokedBlock: BigInt
  revokedClaimHash: String
}

type Aggregation @entity {
  # This is an entity allowing us to calculate all the attesations created and revoked in one day
  id: ID ! # AAAA-MM-DD
  attestationsCreated: Int!
  attestationsRevoked: Int!
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

## 2. The Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Substrate/Polkadot chains, there are three types of mapping handlers:

- [BlockHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [EventHandlers](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every extrinsic call that matches optional filter criteria, run a mapping function

For [EVM](../../build/substrate-evm.md) and [WASM](../../build/substrate-wasm.md) data processors on Substrate/Polkadot chains, there are only two types of mapping handlers:

- [EventHandlers](../../build/substrate-wasm.html#event-handlers): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/substrate-wasm.html#call-handlers): On each and every extrinsic call that matches optional filter criteria, run a mapping function

We are indexing all attestations creation and revoking events from the Kilt Spiritnet blockchain. This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

```yaml
specVersion: 1.0.0
name: kilt-spiritnet-starter
version: 0.0.1
runner:
  node:
    name: "@subql/node"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: >-
  This project can be used as a starting point for developing your SubQuery
  project
repository: "https://github.com/subquery/subql-starter"
schema:
  file: ./schema.graphql
network:
  # The genesis hash of the network (hash of block 0)
  chainId: "0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21"
  # This endpoint must be a public non-pruned archive node
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint:
    ["wss://spiritnet.api.onfinality.io/public-ws", "wss://spiritnet.kilt.io"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: "https://api.subquery.network/sq/subquery/kilt-spiritnet-dictionary"
  chaintypes:
    file: ./dist/chaintypes.js
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleAttestationCreated
          kind: substrate/EventHandler
          filter:
            module: attestation
            method: AttestationCreated
        - handler: handleAttestationRevoked
          kind: substrate/EventHandler
          filter:
            module: attestation
            method: AttestationRevoked
        # We could not find any events for this module in the blocks explored
        # - handler: handleAttestationRemoved
        #   kind: substrate/EventHandler
        #   filter:
        #     module: attestation
        #     method: AttestationRemoved
```

The above code indicates that you will be running a `handleAttestationCreated` mapping function whenever there is an `AttestationCreated` event on any transaction from the Kilt Blockchain. Similarly, we will run the `handleAttestationRevoked` mapping function whenever there is a `AttestationRevoked` log on Kilt.

Check out our [Substrate Wasm](../../build/substrate-wasm.md) documentation to get more information about the Project Manifest (`project.yaml`) file for Substrate WASM contracts.

## 3. Mapping Functions

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. There is one more function that was created in the mapping file `handleDailyUpdate`. This function allows us to calculate daily aggregated attestations created and revoked. 

```ts
export async function handleAttestationCreated(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New attestation created at block ${event.block.block.header.number}`
  );
  // A new attestation has been created.\[attester ID, claim hash, CType hash, (optional) delegation ID\]
  const {
    event: {
      data: [attesterID, claimHash, hash, delegationID],
    },
  } = event;

  const attestation = Attestation.create({
    id: claimHash.toString(),
    createdDate: event.block.timestamp,
    createdBlock: event.block.block.header.number.toBigInt(),
    creator: event.extrinsic.extrinsic.signer.toString(),
    creationClaimHash: claimHash.toString(),
    hash: hash.toString(),
    attestationId: attesterID.toString(),
    delegationID: delegationID ? delegationID.toString() : null,
  });

  await attestation.save();

  await handleDailyUpdate(event.block.timestamp, "CREATED");
}

export async function handleAttestationRevoked(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New attestation revoked at block ${event.block.block.header.number}`
  );
  // An attestation has been revoked.\[account id, claim hash\]
  const {
    event: {
      data: [accountID, claimHash],
    },
  } = event;

  const attestation = await Attestation.get(claimHash.toString());

  assert(attestation, "Can't find an attestation");
  attestation.revokedDate = event.block.timestamp;
  attestation.revokedBlock = event.block.block.header.number.toBigInt();
  attestation.revokedClaimHash = claimHash.toString();

  await attestation.save();

  await handleDailyUpdate(event.block.timestamp, "REVOKED");
}

export async function handleDailyUpdate( date: Date, type: "CREATED" | "REVOKED"): Promise<void>{
  const id = date.toISOString().slice(0, 10);
  let aggregation = await Aggregation.get(id);
  if (!aggregation) {
    aggregation = Aggregation.create({
      id,
      attestationsCreated: 0,
      attestationsRevoked: 0,
    });
  }
  if (type === "CREATED") {
    aggregation.attestationsCreated++;
  }

  else if (type === "REVOKED") {
    aggregation.attestationsRevoked++;
  }

  await aggregation.save();
}
```

The `handleAttestationCreated` function receives event data from the Kilt execution environment whenever an call matches the filters that was specified previously in the `project.yaml`. It instantiates a new `Attestation` entity and populates the fields with data from the Substrate Call payload. Then the `.save()` function is used to save the new entity (_SubQuery will automatically save this to the database_). The same can be said for the `handleAttestationRevoked`. The only difference is for the attestations revoked we do not need to instantiate a new `Attestation` entity.

There is one more function that was created in the mapping file `handleDailyUpdate`. This function allows us to calculate daily aggregated attestations created and revoked. 

Check out our mappings documentation for [Substrate](../../build/mapping/polkadot.md) to get detailed information on mapping functions for each type.

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
Whenever you make changes to your mapping functions, make sure to rebuild your project.
:::

## 5. Run Your Project Locally with Docker

SubQuery provides a Docker container to run projects very quickly and easily for development purposes.

The docker-compose.yml file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

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

::: tip
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

Visit [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

## 6. Query Your Project

Once the container is running, navigate to http://localhost:3000 in your browser and run the sample GraphQL command provided in the README file. Below is an example query from the Astar-wasm-starter project.

```graphql
query {
  transactions(first: 3, orderBy: BLOCK_HEIGHT_ASC) {
    totalCount
    nodes {
      id
      timestamp
      blockHeight
      transactionHash
      blockHash
      contractAddress
      from
      value
    }
  }
}
```

::: tip
There is a _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and helps you find what entities and methods you can query. To learn more about the GraphQL Query language [here](../../run_publish/graphql.md).
:::

You should see results similar to below:

```json
{
  "data": {
    "transactions": {
      "totalCount": 17,
      "nodes": [
        {
          "id": "3281781-0",
          "timestamp": "2023-04-04T14:37:54.532",
          "blockHeight": "3281781",
          "transactionHash": "0x4f57e6ab4e8337375871fe4c8f7ae2e71601ea7fbd135b6f8384eb30db31ec44",
          "blockHash": "0x6d65fe39ae469afd74d32e34a61382b1bbda37983dea745ea2afe58e57d4afbc",
          "contractAddress": "bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc",
          "from": "WJWxmJ27TdMZqvzLx18sZpH9s5ir9irFm1LRfbDeByamdHf",
          "value": "25000000000000000000"
        },
        {
          "id": "3281792-0",
          "timestamp": "2023-04-04T14:40:06.386",
          "blockHeight": "3281792",
          "transactionHash": "0xbe8d6f09a96ff44e732315fbeff2862e9bdeb8353612a0bfab10632c410d8135",
          "blockHash": "0xaa09e8060068931a58a162c150ccb73e0b4de528185f1da92b049ab31c299e5a",
          "contractAddress": "bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc",
          "from": "aFNoZEM64m1ifrHAwEPEuhfRM5L7kjnPhmtYjZaQHX2zb6y",
          "value": "32000000000000000000"
        },
        {
          "id": "3281797-1",
          "timestamp": "2023-04-04T14:41:06.786",
          "blockHeight": "3281797",
          "transactionHash": "0xfdb111a314ee4e4460a3f2ab06221d5985c50e8f5cbae5a12f4f73b222d5954c",
          "blockHash": "0xeb4e49463e174fc993417e852f499ddc6e3c4a15f355a576a74772604f2132e5",
          "contractAddress": "bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc",
          "from": "aFNoZEM64m1ifrHAwEPEuhfRM5L7kjnPhmtYjZaQHX2zb6y",
          "value": "57000000000000000000"
        }
      ]
    }
  }
}
```

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for events from the lottery smart contract at [`bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc`](https://astar.subscan.io/account/bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc?tab=wasm_transaction).

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
