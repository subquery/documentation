# Humanode Quick Start 

## Goals

This quick guide aims to adapt the standard starter project and index all transfers, bioauthenitcation events, and online validator nodes from Humanode chain.

::: warning Important
Before we begin, ensure that you have initialized your project using the steps in the [Start Here](../quickstart.md) section.
:::

Now, let's move forward and update these configurations.

While Creating a [New Project](../quickstart.md), you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

## 1. Updating your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

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

::: warning Important
While making any changes to the schema file, make sure to regenerate your types directory
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

Now that you have made essential changes to the GraphQL Schema file let’s move forward to the next file.

## 2. Updating Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Substrate/Polkadot chains, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [EventHandlers](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every extrinsic call that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

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

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Adding a Mapping Function

Mapping functions define how chain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.
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

## 4. Building Your Project

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
Make sure to rebuild your project when you change your mapping functions.
:::

Now, you are all set to run your first SubQuery project. Let’s dig out the process of running the project in detail.

## 5. Running Your Project Locally with Docker

When you create a new SubQuery Project, you must first run it locally on your computer and test it. Using Docker is the easiest and quickest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. You won't need to change anything for a new project which you have just initialized.

However, visit Running [SubQuery Locally](../../run_publish/run.html) to get more information on the file and the settings.

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

::: warning Note
It may take a few minutes to download the required images and start various nodes and Postgres databases.
:::

## 6. Querying Your Project

Next, let's query our project. Follow these simple steps to query your SubQuery project:

Open your browser and head to http://localhost:3000.

You will see a GraphQL playground in the browser and the schemas, which are ready to query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

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

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
