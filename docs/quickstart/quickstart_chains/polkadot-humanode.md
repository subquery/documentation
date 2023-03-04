# Humanode

## Goals

This quick guide aims to adapt the standard starter project and index all transfers, bioauthenitcation events, and online validator nodes from Humanode chain. Humanode is a standalone Substrate chain, but the same process applies to is as a normal Polkadot parachain or relaychain.

::: warning Important
Before we begin, ensure that you have initialized your project using the steps in the [Start Here](../quickstart.md) section.
:::

While Creating a [New Project](../quickstart.md), you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

## 1. Updating your GraphQL Schema File

::: warning Important
Please refer to [this](home.md#_1-update-the-schemagraphql-file) before proceeding
:::

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

## 2. Updating Your Project Manifest File

::: warning Important
Please read [this](home.md#_2-update-the-project-manifest-file) first before proceeding.
:::

For Substrate/Polkadot chains, there are three types of mapping handlers:

- [BlockHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [EventHandlers](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every extrinsic call that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but the datasource handlers needs to be updated. Update the `datasources` section as follows:

**Since we are planning to index all transfers, bioauthentication events, and online nodes, we need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBioauthNewAuthenticationEvent
          kind: substrate/EventHandler
          filter:
            module: bioauth
            method: NewAuthentication
        - handler: handleImonlineSomeOfflineEvent
          kind: substrate/EventHandler
          filter:
            module: imOnline
            method: SomeOffline
```

This indicates that you will be running a `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent` mapping functions whenever there are events emitted from the `bioauth` and `imOnline modules` with the `NewAuthentication` and `SomeOffline` methods, respectively.

Check out our [documentation](../../build/manifest/polkadot.md) to get more information about the Project Manifest (`project.yaml`) file.

## 3. Adding a Mapping Function

::: warning Important
Please read [this](home.md#_3-update-the-mapping-functions) first before proceeding.
:::

Navigate to the default mapping function in the `src/mappings` directory. You will see two exported functions: `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent`.

The `handleBioauthNewAuthenticationEvent` and `handleImonlineSomeOfflineEvent` functions receive event data whenever an event matches the filters that you specified previously in the `project.yaml`.

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

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
