# Manifest File

Il file Manifest `project.yaml` può essere visto come un punto di ingresso del tuo progetto e definisce la maggior parte dei dettagli su come SubQuery indicizzerà e trasformerà i dati della catena.

Il manifesto può essere in formato YAML o JSON. In questo documento useremo YAML in tutti gli esempi. Di seguito è riportato un esempio standard di un `project.yaml` di base.

::: code-tabs @tab v0.2.0 ` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ````  @tab v0.0.1 ` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` :::

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [See here](#cli-options) for more information**

Under `network`:

- There is a new **required** `genesisHash` field which helps to identify the chain being used.
- Per v0.2.0 e versioni successive, puoi fare riferimento a un [chaintype file ](#custom-chains) esterno se stai facendo riferimento a una catena personalizzata.

Under `dataSources`:

- Può collegare direttamente un punto di ingresso `index.js` per i gestori di mappatura. Per impostazione predefinita, questo `index.js` verrà generato da `index.ts` durante il processo di compilazione.
- Le origini dati ora possono essere una normale origine dati di runtime o [custom data sourc](#custom-data-sources).

### CLI Options

By default the CLI will generate SubQuery projects for spec verison v0.2.0. This behaviour can be overridden by running `subql init --specVersion 0.0.1 PROJECT_NAME`, although this is not recommended as the project will not be supported by the SubQuery hosted service in the future

`subql migrate` can be run in an existing project to migrate the project manifest to the latest version.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME Give the starter project name

| Options                 | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| -f, --force             |                                                                              |
| -l, --location=location | local folder to create the project in                                        |
| --install-dependencies  | Install dependencies as well                                                 |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0 [default: 0.2.0]                                                       | The spec version to be used by the project |

## Overview

### Top Level Spec

| Field           | v0.0.1                              | v0.2.0                      | Description                                                |
| --------------- | ----------------------------------- | --------------------------- | ---------------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` or `0.2.0` - the spec version of the manifest file |
| **name**        | 𐄂                                   | String                      | Name of your project                                       |
| **version**     | 𐄂                                   | String                      | Version of your project                                    |
| **description** | String                              | String                      | Discription of your project                                |
| **repository**  | String                              | String                      | Git repository address of your project                     |
| **schema**      | String                              | [Schema Spec](#schema-spec) | The location of your GraphQL schema file                   |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Detail of the network to be indexed                        |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                            |

### Schema Spec

| Field    | v0.0.1 | v0.2.0 | Description                              |
| -------- | ------ | ------ | ---------------------------------------- |
| **file** | 𐄂      | String | The location of your GraphQL schema file |

### Network Spec

| Field           | v0.0.1 | v0.2.0        | Description                                                                                                                                                                                                 |
| --------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | The genesis hash of the network                                                                                                                                                                             |
| **endpoint**    | String | String        | Cartella locale in cui eseguire la migrazione (deve project. yaml). Puoi recuperare gli endpoint per tutte le paracatene gratuitamente da [OnFinality](https://app.onfinality.io)                           |
| **dictionary**  | String | String        | Si suggerisce di fornire l'endpoint HTTP di un dizionario a catena completa per velocizzare l'elaborazione: leggi [come funziona un dizionario di sottoquery](../academy/tutorials_examples/dictionary.md). |
| **chaintypes**  | 𐄂      | {file:String} | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                  |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Field | v0.0.1 | v0.2.0 | Description |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name** | String | 𐄂 | Name of the data source |
| **kind** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer | Integer | This changes your indexing start block, set this higher to skip initial blocks with less data |
| **mapping** | Mapping Spec | Mapping Spec | |
| **filter** | [network-filters](./manifest/#network-filters) | 𐄂 | Filter the data source to execute by the network endpoint spec name |

### Mapping Spec

| Field                  | v0.0.1                                                                   | v0.2.0                                                                                  | Description                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                       | Path to the mapping entry                                                                                                                                                                                                              |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | Elenca tutte le [mapping functions](./mapping/polkadot.md) e i relativi tipi di gestori, con filtri di mappatura aggiuntivi. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Handler                                             | Supported filter             |
| --------------------------------------------------- | ---------------------------- |
| [BlockHandler](./mapping/polkadot.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping/polkadot.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping/polkadot.md#call-handler)   | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- I filtri di modulo e metodo sono supportati su qualsiasi catena basata su substrato.
- Il filtro `success` assume un valore booleano e può essere utilizzato per filtrare l'estrinseco in base al suo stato di successo.
- The `specVersion` filter specifies the spec version range for a substrate block. Gli esempi seguenti descrivono come impostare gli intervalli di versioni.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Custom Chains

### Network Spec

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **This must be a full archive node**. Puoi recuperare gli endpoint per tutte le paracatene gratuitamente da [OnFinality](https://app.onfinality.io)

### Chain Types

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

::: code-tabs @tab v0.2.0 `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...`
@tab v0.0.1 `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` :::

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- La tua versione manifest deve essere v0.2.0 o successiva.
- Solo l'esportazione predefinita verrà inclusa nell'[polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) durante il recupero dei blocchi.

Here is an example of a `.ts` chain types file:

::: code-tabs @tab types.ts `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` :::

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

::: code-tabs @tab v0.0.1 `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change `

:::
