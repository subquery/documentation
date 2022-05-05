# Manifest File

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples. Below is a standard example of a basic `project.yaml`.

<CodeGroup>

  <CodeGroupItem title="v1.0.0 Polkadot/Substrate" active>

``` yml
specVersion: 1.0.0
name: subquery-starter
version: 0.0.1
runner:
  node:
    name: '@subql/node'
    version: latest
  query:
    name: '@subql/query'
    version: latest
description: 'This project can be use as a starting point for developing your Polkadot based SubQuery project'
repository: https://github.com/subquery/subql-starter
schema:
  file: ./schema.graphql
network:
  chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Deposit
        - handler: handleCall
          kind: substrate/CallHandler
```
  </CodeGroupItem>
    <CodeGroupItem title="v1.0.0 Avalanche">
  
``` yml
specVersion: 1.0.0
name: avalanche-subql-starter
version: 0.0.1
runner:
  node:
    name: '@subql/node-avalanche'
    version: latest
  query:
    name: '@subql/query'
    version: latest
description: 'This project can be use as a starting point for developing your Avalanche based SubQuery project'
repository: https://github.com/subquery/avalanche-subql-starter
schema:
  file: ./schema.graphql
network:
  endpoint: https://avalanche.api.onfinality.io/
  chainId: mainnet
  type: avalanche
  chainName: C
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: https://api.subquery.network/sq/subquery/avalanche-dictionary
dataSources:
  - kind: avalanche/Runtime
    startBlock: 4724001
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "IPangolinERC20.json"
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: avalanche/BlockHandler
        - handler: handleTransaction
          kind: avalanche/TransactionHandler
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            function: approve(address spender, uint256 rawAmount)
            ## from: "0x60781C2586D68229fde47564546784ab3fACA982"
        - handler: handleEvent
          kind: avalanche/EventHandler
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256 amount)
```
  </CodeGroupItem>

  <CodeGroupItem title="v0.2.0">

``` yml
specVersion: "0.2.0"
name: example-project # Provide the project name
version: 1.0.0  # Project version
description: '' # Description of your project
repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project

schema:
  file: ./schema.graphql # The location of your GraphQL schema file

network:
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network
  endpoint: 'wss://polkadot.api.onfinality.io/public-ws'
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot'

dataSources:
  - kind: substrate/Runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - handler: handleEvent
          kind: substrate/EventHandler
          filter: #Filter is optional
            module: balances
            method: Deposit
        - handler: handleCall
          kind: substrate/CallHandler
```

  </CodeGroupItem>
</CodeGroup>

## Migrating to v1.0.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion below v1.0.0 you can use `subql migrate` to quickly upgrade. [See the CLI documentation](#cli-options) for more information**

### Change Log for v1.0.0

**Under `runner`:**

- Now that SubQuery supports multiple layer 1 networks, you must provide runner information for various services.
- `runner.node` specify the node image that is used to run the current project [`@subql/node` or `@subql/node-avalanche`].
- `runner.query` specify the query service image associate with the project database - use `@subql/query`.
- `version` specifies the version of these service, they should follow the [SEMVER](https://semver.org/) rules or `'latest'` and match a published version on our [package repository](https://www.npmjs.com/package/@subql/node).

**Under `templates`:**

Template are introduced from manifest v0.2.1, it allows creating datasources dynamically from these templates.
This is useful when you don't know certain specific details when creating your project.
A good example of this is when you know a contract will be deployed at a later stage but you don't know what the address will be.

For a more detailed explanation head [here](./dynamicdatasources).

### Change log for v0.2.0

**Under `network`:**

- There is a new **required** `genesisHash` field which helps to identify the chain being used.
- For v0.2.0 and above, you are able to reference an external [chaintype file](#custom-chains) if you are referencing a custom chain.

**Under `dataSources`:**

- Can directly link an `index.js` entry point for mapping handlers. By default this `index.js` will be generated from `index.ts` during the build process.
- Data sources can now be either a regular runtime data source or [custom data source](#custom-data-sources).

### Migrating from v0.2.0 to v0.3.0 <Badge text="upgrade" type="warning"/>

If you have a project with specVersion v0.2.0, The only change is a new **required** `chainId` field which helps to identify the chain being used

### CLI Options

`subql migrate` can be run in an existing project to migrate the project manifest to the latest version.

## Overview

### Top Level Spec

| Field           | v1.0.0                              | v0.2.0                      | Description                                         |
|-----------------|-------------------------------------|-----------------------------|-----------------------------------------------------|
| **specVersion** | String                              | String                      | The spec version of the manifest file               |
| **name**        | String                              | String                      | Name of your project                                |
| **version**     | String                              | String                      | Version of your project                             |
| **description** | String                              | String                      | Discription of your project                         |
| **repository**  | String                              | String                      | Git repository address of your project              |
| **schema**      | [Schema Spec](#schema-spec)         | [Schema Spec](#schema-spec) | The location of your GraphQL schema file            |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Detail of the network to be indexed                 |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             | The datasource to your project                      |
| **templates**   | [Templates Spec](#templates-spec)   | x                           | Allows creating new datasources from this templates |
| **runner**      | [Runner Spec](#runner-spec)         | x                           | Runner specs info                                   |


### Schema Spec

| Field    |  All manifest versions  | Description                              |
| -------- | ------ | ---------------------------------------- |
| **file** | String | The location of your GraphQL schema file |

### Network Spec

| Field           | v1.0.0   | v0.2.0 | Description                     |
|-----------------|----------|--------|---------------------------------|
| **chainId**     | String   | x      | A network identifier for the blockchain (genesisHash in Substrate) |
| **genesisHash** | Optional | String | The genesis hash of the network (from v1.0.0 this is an alias for chainId and not necessary) |
| **endpoint**    | String   | String        | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String   | String        | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).                      |
| **chaintypes**  | x        | {file:String} | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                 |

### Runner Spec

| Field     | v1.0.0                                  | Description                                |
|-----------|-----------------------------------------|--------------------------------------------|
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | v1.0.0 | Description                                                                                                                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **name**    | String | We currently support `@subql/node` and soon `@subql/node-avalanche` |
| **version** | String | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules  or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |


### Runner Query Spec

| Field | All manifest versions | Description |
|-------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **name**    | String | We currently support `@subql/query` |
| **version** | String | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules  or `latest`. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Field | All manifest versions | Description
| --------------- |-------------|-------------|
| **kind** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | [substrate/Runtime](./manifest/#data-sources-and-mapping), [substrate/CustomDataSource](./manifest/#custom-data-sources), [avalanche/Runtime](./manifest/#data-sources-and-mapping) | We supports data type from default Substrate and Avalanche runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract.|
| **startBlock** | Integer | This changes your indexing start block, set this higher to skip initial blocks with less data|  
| **mapping** |  Mapping Spec | |

### Mapping Spec

| Field                  | All manifest versions | Description |
| ---------------------- |------------------------------------------------------------------------------------------| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources)  | List all the [mapping functions](./mapping.md) and their corresponding handler types, with additional mapping filters. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

In this section, we will talk about the default Substrate runtime and its mapping. Here is an example:

<CodeGroup>
<CodeGroupItem title="Substrate/Polkadot" active>
  
```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

</CodeGroupItem>
<CodeGroupItem title="Avalanche" active>
  
```yaml
dataSources:
  - kind: avalanche/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

</CodeGroupItem>
</CodeGroup>

### Mapping handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Network | Handler | Supported filter |
| ------------------ | ---------------------------------------------------- | ---------------------------- |
| Substrate/Polkadot | [substrate/BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| Substrate/Polkadot | [substrate/EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| Substrate/Polkadot | [substrate/CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |
| Avalanche          | [avalanche/BlockHandler](./mapping.md#block-handler)     | No filters                   |
| Avalanche          | [avalanche/TransactionHandler](./mapping.md#transaction-handler)     | `function` filters (either be the function fragment or signature)   |
| Avalanche          | [avalanche/EventHandler](./mapping.md#event-handler)     | `topics` filters |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Example filter from Substrate callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

The `specVersion` filter specifies the spec version range for a Substrate block. The following examples describe how to set version ranges.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Custom Substrate Chains

### Substrate Network Spec

When connecting to a different Polkadot parachain or even a custom Substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retrieve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io)

### Substrate Chain Types

You can index data from custom Substrate chains by also including chain types in the manifest. We support the additional types used by Substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup>
  <CodeGroupItem title="v0.2.0" active>

``` yml
network:
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  endpoint: 'ws://host.kittychain.io/public-ws'
  chaintypes:
    file: ./types.json # The relative filepath to where custom types are stored
...
```
  </CodeGroupItem>

  <CodeGroupItem title="v0.0.1">
  
``` yml
...
network:
  endpoint: "ws://host.kittychain.io/public-ws"
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]"
  }
# typesChain: { chain: { Type5: 'example' } }
# typesSpec: { spec: { Type6: 'example' } }
dataSources:
  - name: runtime
    kind: substrate/Runtime
    startBlock: 1
    filter:  #Optional
      specName: kitty-chain 
    mapping:
      handlers:
        - handler: handleKittyBred
          kind: substrate/CallHandler
          filter:
            module: kitties
            method: breed
            success: true
```
  </CodeGroupItem>
</CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

Here is an example of a `.ts` chain types file:

<CodeGroup>
  <CodeGroupItem title="types.ts">

```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle";
export default { typesBundle: typesBundleDeprecated };
```

 </CodeGroupItem>
</CodeGroup>

### Working Example

You can see the suggested method for connecting and retrieving custom chain types in [SubQuery's Official Dictionary repository](https://github.com/subquery/subql-dictionary). Here you will find a dictionary project for each network with all the chain types correct inserted.

For example, Acala publish an [offical chain type definition to NPM](https://www.npmjs.com/package/@acala-network/type-definitions). This is imported in your project's `package.json` like so:

``` json
{
  ...
  "devDependencies": {
    ...
    "@acala-network/type-definitions": "latest"
  },
  ...
}
```

The under `/src/chaintypes.ts` we define a custom export for Acala's types bundle from this package.

``` ts
import { typesBundleForPolkadot } from "@acala-network/type-definitions";

export default { typesBundle: typesBundleForPolkadot };
```

This is then exported in the `package.json` like so:

``` json
{
  ...
  "devDependencies": {
    ...
    "@acala-network/type-definitions": "latest"
  },
  "exports": {
    "chaintypes": "src/chaintypes.ts"
  }
  ...
}
```

Finally, in the `project.yaml` manifest, we can import this official types bundle as per standard:

``` yaml
network:
  genesisHash: "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c"
  endpoint: wss://acala-polkadot.api.onfinality.io/public-ws
  chaintypes:
    file: ./dist/chaintypes.js
```

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/FrontierEvm](./substrate-evm/#data-source-example) | [substrate/FrontierEvmEvent](./substrate-evm/#FrontierEvmEvent), [substrate/FrontierEvmCall](./substrate-evm/#frontierevmcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on the Frontier EVM (widely used across Polkadot including in Moonbeam and Astar networks) |

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
