# Archivo del manifiesto

El Manifiesto `project.yaml` puede ser visto como un punto de entrada de tu proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos en cadena.

El manifiesto puede estar en formato YAML o JSON. En este documento, utilizaremos YAML en todos los ejemplos. A continuación se muestra un ejemplo estándar de un `project.yaml` básico.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [Vea aquí](#cli-options) para más información**

Bajo `red`:

- Hay un nuevo campo **requerido** `genesisHash` que ayuda a identificar la cadena que se está usando.
- Para v0.2.0 y superiores, puedes hacer referencia a un archivo [chaintype externo](#custom-chains) si estás referenciando una cadena personalizada.

Debajo de `fuentes de datos`:

- Puede enlazar directamente un punto de entrada de `index.js` para manejadores de mapeo. Por defecto, este `index.js` se generará a partir de `index.ts` durante el proceso de compilación.
- Las fuentes de datos ahora pueden ser una fuente de datos de tiempo de ejecución regular o [fuente de datos personalizada](#custom-data-sources).

### Opciones de CLI

Mientras que la v0.2. la versión de especificación está en beta, necesitará definirla explícitamente durante la inicialización del proyecto ejecutando `subql init --specVersion 0.. 0 NOMBRE_PROJECT_NOMBRE`

`subql migrate` se puede ejecutar en un proyecto existente para migrar el manifiesto del proyecto a la última versión.

| Opciones       | Descripción                                                           |
| -------------- | --------------------------------------------------------------------- |
| -f, --force    |                                                                       |
| -l, --location | carpeta local en la que ejecutar migrate (debe contener project.yaml) |
| --file=archivo | para especificar el project.yaml a migrar                             |

## Resumen

### Disco de nivel superior

| Campo                | v0.0.1                                                     | v0.2.0                                     | Descripción                                                    |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| **specVersion**      | String                                                     | String                                     | `0.0.1` o `0.2.0` - la versión específica del archivo manifest |
| **nombre**           | 𐄂                                                          | String                                     | Nombre de tu proyecto                                          |
| **versión**          | 𐄂                                                          | String                                     | Versión de tu proyecto                                         |
| **descripción**      | String                                                     | String                                     | Descripción de tu proyecto                                     |
| **repositorio**      | String                                                     | String                                     | Dirección del repositorio Git de su proyecto                   |
| **esquema**          | String                                                     | [Especificación del esquema](#schema-spec) | La ubicación del archivo de esquema GraphQL                    |
| **red**              | [Especificaciones de red](#network-spec)                   | Especificaciones de red                    | Detalle de la red a ser indexada                               |
| **fuentes de datos** | [Especificaciones de la fuente de datos](#datasource-spec) | Especificaciones de la fuente de datos     |                                                                |

### Especificación del esquema

| Campo       | v0.0.1 | v0.2.0 | Descripción                                 |
| ----------- | ------ | ------ | ------------------------------------------- |
| **archivo** | 𐄂      | String | La ubicación del archivo de esquema GraphQL |

### Especificaciones de red

| Campo           | v0.0.1 | v0.2.0        | Descripción                                                                                                                                                                                                |
| --------------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | El hash de génesis de la red                                                                                                                                                                               |
| **endpoint**    | String | String        | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../tutorials_examples/dictionary.md).                              |
| **chaintypes**  | 𐄂      | {file:String} | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                 |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Campo          | v0.0.1                                                    | v0.2.0                                                                           | Descripción                                                                                                                                                                           |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nombre**     | String                                                    | 𐄂                                                                                | Name of the data source                                                                                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                       |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Mapping Spec

| Campo                  | v0.0.1                                                                   | v0.2.0                                                                                        | Descripción                                                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **archivo**            | String                                                                   | 𐄂                                                                                             | Path to the mapping entry                                                                                                                                                                                                                    |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | List all the [mapping functions](./mapping.md) and their corresponding handler types, with additional mapping filters. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Handler                                    | Supported filter             |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Module and method filters are supported on any substrate-based chain.
- The `success` filter takes a boolean value and can be used to filter the extrinsic by its success status.
- The `specVersion` filter specifies the spec version range for a substrate block. The following examples describe how to set version ranges.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Cadenas Personalizadas

### Especificaciones de red

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io)

### Chain Types

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json` or `.yaml` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # la ruta relativa al lugar donde se almacenan los tipos personalizados ... ``` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

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

A continuación se muestra un ejemplo que muestra diferentes fuentes de datos tanto para las redes Polkadot como Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Crea una plantilla para evitar redundancia definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use la plantilla aqui - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # puede reutilizar o cambiar ``` </CodeGroupItem>

</CodeGroup>
