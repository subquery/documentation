# Kilt Quick Start

This quick start guide introduces SubQuery's Substrate Kilt Spiritnet support by using an example project in Kilt Spiritnet. The example project indexes all Attestations [created](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationCreated) and [revoked](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationRevoked) on the [Kilt Spiritnet Blockchain](https://www.kilt.io/).

<!-- @include: ../snippets/quickstart-reference.md -->

The project that we are developing throughout this guide can be found [here](https://github.com/subquery/subql-starter/tree/main/Kilt/kilt-spiritnet-credentials-example)

<!-- @include: ../snippets/schema-intro-level2.md -->

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

<!-- @include: ../snippets/codegen.md -->

<!-- @include: ../snippets/polkadot-manifest-intro.md#level2 -->

We are indexing all attestations creation and revoking events from the Kilt Spiritnet blockchain. This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

```ts
{
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleAttestationCreated",
            filter: {
              module: "attestation",
              method: "AttestationCreated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleAttestationRevoked",
            filter: {
              module: "attestation",
              method: "AttestationRevoked",
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleAttestationCreated` mapping function whenever there is an `AttestationCreated` event on any transaction from the Kilt Blockchain. Similarly, we will run the `handleAttestationRevoked` mapping function whenever there is a `AttestationRevoked` log on Kilt.

Check out our [Substrate](../../build/manifest/polkadot.md) documentation to get more information about the Project Manifest (`project.ts`) file for Polkadot chains.

<!-- @include: ../snippets/polkadot-manifest-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

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

The `handleAttestationCreated` function receives event data from the Kilt execution environment whenever an call matches the filters that was specified previously in the `project.ts`. It instantiates a new `Attestation` entity and populates the fields with data from the Substrate Call payload. Then the `.save()` function is used to save the new entity (_SubQuery will automatically save this to the database_). The same can be said for the `handleAttestationRevoked`. The only difference is for the attestations revoked we do not need to instantiate a new `Attestation` entity.

There is one more function that was created in the mapping file `handleDailyUpdate`. This function allows us to calculate daily aggregated attestations created and revoked.

<!-- @include: ../snippets/polkadot-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for events related to attestations [created](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationCreated) and [revoked](https://spiritnet.subscan.io/event?module=Attestation&event=AttestationRevoked) on the [Kilt Spiritnet Blockchain](https://www.kilt.io/).

<!-- @include: ../snippets/whats-next.md -->
