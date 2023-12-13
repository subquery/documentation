# Humanode Quick Start

This quick guide aims to adapt the standard starter project and index all transfers, bioauthenitcation events, and online validator nodes from Humanode chain. Humanode is a standalone Substrate chain, but the same process applies to it as a normal Polkadot parachain or relaychain.

<!-- @include: ../snippets/quickstart-reference.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing all transfers, bioauthentication events, and online validator nodes from Humanode:

```graphql
type BioauthNewAuthentication @entity {
  id: ID!
  blockNumber: Int!
  validatorPublicKey: String!
  timestamp: Date!
}

type ImOnlineSomeOffline @entity {
  id: ID!
  blockNumber: Int!
  accountsIds: [String]!
  timestamp: Date!
}
```

<!-- @include: ../snippets/codegen.md -->

<!-- @include: ../snippets/polkadot-manifest-intro.md#level2 -->

**Since we are planning to index all transfers, bioauthentication events, and online nodes, we need to update the `datasources` section as follows:**

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
            handler: "handleBioauthNewAuthenticationEvent",
            filter: {
              module: "bioauth",
              method: "NewAuthentication",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleImonlineSomeOfflineEvent",
            filter: {
              module: "imOnline",
              method: "SomeOffline",
            },
          },
        ],
      },
    },
  ],
}
```

This indicates that you will be running a `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent` mapping functions whenever there are events emitted from the `bioauth` and `imOnline modules` with the `NewAuthentication` and `SomeOffline` methods, respectively.

<!-- @include: ../snippets/polkadot-manifest-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Mapping functions define how chain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.
Navigate to the default mapping function in the `src/mappings` directory. You will see two exported functions: `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent`.

The `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent` functions receive event data whenever an event matches the filters that you specified previously in the `project.ts`.

Update the `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent` functions as follows (note the additional imports):

```graphql
export async function handleBioauthNewAuthenticationEvent(
  substrateEvent: SubstrateEvent
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [validatorPublicKey],
  } = event;

  const record = new BioauthNewAuthentication(
    `${block.block.header.number}-${idx}`
  );
  record.blockNumber = block.block.header.number.toNumber();
  record.timestamp = block.timestamp;
  record.validatorPublicKey = validatorPublicKey.toString();
  await record.save();
}

export async function handleImonlineSomeOfflineEvent(
  substrateEvent: SubstrateEvent<[]>
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [offline],
  } = event;

  const record = new ImOnlineSomeOffline(`${block.block.header.number}-${idx}`);
  record.blockNumber = block.block.header.number.toNumber();
  record.timestamp = block.timestamp;
  record.accountIds = [];
  for (const identification of offline as Vec<Codec>) {
    const [accountId, _fullIdentification] = identification as any as [
      Codec,
      Codec
    ];
    record.accountIds.push(accountId.toString());
  }
  await record.save();
}
```

<!-- @include: ../snippets/polkadot-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```grpahql
query {
  bioauthNewAuthentications(first: 5) {
   nodes{
      id
    }
  }
  imOnlineSomeOfflineByNodeId (nodeId : 5) {
    id
  }
  _metadata {
    lastProcessedHeight
    lastProcessedTimestamp
    targetHeight
  }
}
```

You will see the results similar to below:

```json
{
  "data": {
    "bioauthNewAuthentications": {
      "nodes": [
        {
          "id": "940-2"
        },
        {
          "id": "1785-7"
        },
        {
          "id": "456-2"
        },
        {
          "id": "1118-2"
        },
        {
          "id": "3851-2"
        }
      ]
    },
    "imOnlineSomeOfflineByNodeId": null,
    "_metadata": {
      "lastProcessedHeight": 4435,
      "lastProcessedTimestamp": "1670316277673",
      "targetHeight": 289567
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
