# Kilt Quick Start

## Goals

This quick start guide introduces SubQuery's Substrate Kilt Spiritnet support by using an example project in Kilt Spiritnet. The example project indexes all Attestations [created](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationCreated) and [revoked](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationRevoked) on the [Kilt Spiritnet Blockchain](https://www.kilt.io/).

Previously, in the [1. Create a New Project](../quickstart.md) section, [3 key files](../quickstart.md#_3-make-changes-to-your-project) were mentioned. Let's take a closer look at these files.

The project that we are developing throughout this guide can be found [here](https://github.com/subquery/subql-starter/tree/main/Kilt/kilt-spiritnet-credentials-example)

## 1. GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

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
  id: ID! # AAAA-MM-DD
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

Check out our [Substrate](../../build/manifest/polkadot.md) documentation to get more information about the Project Manifest (`project.yaml`) file for Polkadot chains.

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

export async function handleDailyUpdate(
  date: Date,
  type: "CREATED" | "REVOKED"
): Promise<void> {
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
  } else if (type === "REVOKED") {
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

Once the container is running, navigate to http://localhost:3000 in your browser and run the sample GraphQL command provided in the README file. Below is an example query from the kilt-example project.

```graphql
query {
  attestations(first: 2, orderBy: CREATED_DATE_DESC) {
    nodes {
      id
      createdDate
      attestationId
      hash
      delegationID
      revokedDate
    }
  }
  aggregations(first: 2, orderBy: ID_DESC) {
    nodes {
      id
      attestationsCreated
      attestationsRevoked
    }
  }
}
```

::: tip
There is a _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and helps you find what entities and methods you can query. To learn more about the GraphQL Query language [here](../../run_publish/query.md).
:::

You should see results similar to below:

```json
{
  "data": {
    "attestations": {
      "nodes": [
        {
          "id": "0xacdd8c76cb2cffde5e1924d8b879655e75dae2617ead6ec0a87328cbe4ef5ca8",
          "createdDate": "2022-09-29T10:38:54.542",
          "attestationId": "4pnfkRn5UurBJTW92d9TaVLR2CqJdY4z5HPjrEbpGyBykare",
          "hash": "0xd8c61a235204cb9e3c6acb1898d78880488846a7247d325b833243b46d923abe",
          "delegationID": "",
          "revokedDate": null
        },
        {
          "id": "0xa9bb0bc92ad7eb79fbde4983de508794fa2b8e9f9f88236be24c2ac517f29750",
          "createdDate": "2022-09-29T10:36:48.306",
          "attestationId": "4pnfkRn5UurBJTW92d9TaVLR2CqJdY4z5HPjrEbpGyBykare",
          "hash": "0xcef8f3fe5aa7379faea95327942fd77287e1c144e3f53243e55705f11e890a4c",
          "delegationID": "",
          "revokedDate": null
        }
      ]
    },
    "aggregations": {
      "nodes": [
        {
          "id": "2022-09-29",
          "attestationsCreated": 5,
          "attestationsRevoked": 0
        },
        {
          "id": "2022-09-28",
          "attestationsCreated": 23,
          "attestationsRevoked": 0
        }
      ]
    }
  }
}
```

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for events related to attestations [created](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationCreated) and [revoked](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationRevoked) on the [Kilt Spiritnet Blockchain](https://www.kilt.io/).

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
