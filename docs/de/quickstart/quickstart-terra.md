# Terra Quick Start

In this Quick start guide, we're going to start with a simple Terra starter project and then finish by indexing some actual real data. Dies ist eine hervorragende Basis, um mit der Entwicklung Ihres eigenen SubQuery-Projekts zu beginnen.

**If your are looking for guides for Substrate/Polkadot, you can read the [Substrate/Polkadot specific quick start guide](./quickstart-polkadot).**

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Terra, it should only take 10-15 minutes**

## Vorbereitung

### Lokale Entwicklungsumgebung

- [Node](https://nodejs.org/en/): Eine moderne (z. B. die LTS-Version) Installation von Node.
- [Docker](https://docker.com/): Für dieses Tutorial wird Docker benötigt

### Installieren Sie die SubQuery-CLI

Install SubQuery CLI globally on your terminal by using NPM:

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to an errors down the line.

You can then run help to see available commands and usage provide by CLI

```shell
subql help
```

## Initialisieren Sie das SubQuery-Starterprojekt

Inside the directory in which you want to create a SubQuery project, simply run the following command to get started.

```shell
subql init
```

You'll be asked certain questions as the SubQuery project is initalised:

- Name: Ein Name für Ihr SubQuery-Projekt
- Network Family: The layer-1 blockchain network family that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Terra"*
- Network: The specific network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Terra"*
- Template: Select a SubQuery project template that will provide a starting point to begin development, we suggest selecting the *"Starter project"*
- Git-Repository (optional): Geben Sie eine Git-URL zu einem Repository an, in dem dieses SubQuery-Projekt gehostet wird (wenn es in SubQuery Explorer gehostet wird).
- RPC-Endpunkt (erforderlich): Geben Sie eine HTTPS-URL zu einem ausgeführten RPC-Endpunkt an, der standardmäßig für dieses Projekt verwendet wird. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). For this guide we will use the default value *"https://terra-columbus-5.beta.api.onfinality.io"*
- Autoren (erforderlich): Geben Sie hier den Eigentümer dieses SubQuery-Projekts ein (z. B. Ihren Namen!)
- Beschreibung (Optional): Sie können einen kurzen Absatz über Ihr Projekt bereitstellen, der beschreibt, welche Daten es enthält und was Benutzer damit tun können
- Version (erforderlich): Geben Sie eine benutzerdefinierte Versionsnummer ein oder verwenden Sie die Standardversion (`1.0.0`).
- Lizenz (erforderlich): Stellen Sie die Softwarelizenz für dieses Projekt bereit oder akzeptieren Sie die Standardeinstellung (`Apache-2.0`).

After the initialisation process is complete, you should see a folder with your project name has been created inside the directory. The contents of this directoy should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. You will mainly be working on the following files:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest in `project.yaml`
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from the bLuna smart contract.

### Updating your GraphQL Schema File

The `schema.graphql` file defines the various GraphQL schemas. Due to the way that the GraphQL query language works, the schema file essentially dictates the shape of your data from SubQuery. Its a great place to start becuase it allows you to define your end goal up front.

We're going to update the `schema.graphql` file to read as follows

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  txHash: String!
  blockHeight: BigInt # The block height of the transfer
  sender: String! # The account that transfers are made from
  recipient: String! # The account that transfers are made to
  amount: String! # Amount that is transferred
}
```

**Important: When you make any changes to the schema file, please ensure that you regenerate your types directory. Do this now.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. For more information about the `schema.graphql` file, check out our documentation under [Build/GraphQL Schema](../build/graphql.md)

### Updating the Project Manifest File

The Projet Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

We won't do many changes to the manifest file as it already has been setup correctly, but we need to change our handlers. Remember we are planning to index all Terra transfer events, as a result, we need to update the `datasources` section to read the following.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

This means we'll run a `handleEvent` mapping function each and every time there is a `transfer` event from the bLuna smart contract.

For more information about the Project Manifest (`project.yaml`) file, check out our documentation under [Build/Manifest File](../build/manifest.md)

### Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You'll see three exported functions, `handleBlock`, `handleEvent`, and `handleCall`. You can delete both the `handleBlock` and `handleCall` functions, we are only dealing with the `handleEvent` function.

The `handleEvent` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `transfer` events and save them to the GraphQL entities that we created earlier.

You can update the `handleEvent` function to the following (note the additional imports):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));

    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data on the payload. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### Build the Project

In order run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker.

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run_publish/run.md)

Under the project directory run following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Be patient here.

### Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground is showing in the explorer and the schemas that are ready to query. Oben rechts auf dem Playground finden Sie eine Schaltfläche _Dokumente_, die eine Dokumentationsverlosung öffnet. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

For a new SubQuery starter project, you can try the following query to get a taste of how it works or [learn more about the GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

### Publish your SubQuery Project

SubQuery provides a free managed service when you can deploy your new project to. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md)

## Next Steps

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data from bLuna.

Now that you've had an insight into how to build a basic SubQuery project, the question is where to from here? If you are feeling confident, you can jump into learning more about the three key files. The manifest file, the GraphQL schema, and the mappings file under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
