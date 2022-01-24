# Archivo del manifiesto

El Manifiesto `project.yaml` puede ser visto como un punto de entrada de tu proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos en cadena.

El manifiesto puede estar en formato YAML o JSON. En este documento, utilizaremos YAML en todos los ejemplos. A continuación se muestra un ejemplo estándar de un `project.yaml` básico.

<CodeGroup> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ````. [Vea aquí](#cli-options) para más información</strong>

Bajo `red`:

- Hay un nuevo campo **requerido** `genesisHash` que ayuda a identificar la cadena que se está usando.
- Para v0.2.0 y superiores, puedes hacer referencia a un archivo [chaintype externo](#custom-chains) si estás referenciando una cadena personalizada.

Debajo de `fuentes de datos`:

- Puede enlazar directamente un punto de entrada de `index.js` para manejadores de mapeo. Por defecto, este `index.js` se generará a partir de `index.ts` durante el proceso de compilación.
- Las fuentes de datos ahora pueden ser una fuente de datos de tiempo de ejecución regular o [fuente de datos personalizada](#custom-data-sources).

### Opciones de CLI

By default the CLI will generate SubQuery projects for spec verison v0.2.0. This behaviour can be overridden by running `subql init --specVersion 0.0.1 PROJECT_NAME`, although this is not recommended as the project will not be supported by the SubQuery hosted service in the future

`subql migrate` se puede ejecutar en un proyecto existente para migrar el manifiesto del proyecto a la última versión.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME  Give the starter project name

| Opciones                | Descripción                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| -f, --force             |                                                                              |
| -l, --location=location | local folder to create the project in                                        |
| --install-dependencies  | Install dependencies as well                                                 |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | The spec version to be used by the project         |

## Resumen

### Disco de nivel superior

| Campo                | v0.0.1                                                     | v0.2.0                                 | Descripción                                                    |
| -------------------- | ---------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| **specVersion**      | String                                                     | String                                 | `0.0.1` o `0.2.0` - la versión específica del archivo manifest |
| **nombre**           | 𐄂                                                          | String                                 | Nombre de tu proyecto                                          |
| **versión**          | 𐄂                                                          | String                                 | Versión de tu proyecto                                         |
| **descripción**      | String                                                     | String                                 | Descripción de tu proyecto                                     |
| **repositorio**      | String                                                     | String                                 | Dirección del repositorio Git de su proyecto                   |
| **esquema**          | String                                                     | [Especificación del esquema](#Esquema) | La ubicación del archivo de esquema GraphQL                    |
| **red**              | [Especificaciones de red](#spec de red)                    | Especificaciones de red                | Detalle de la red a ser indexada                               |
| **fuentes de datos** | [Especificaciones de la fuente de datos](#datasource-spec) | Especificaciones de la fuente de datos |                                                                |

### Especificación del esquema

| Campo       | v0.0.1 | v0.2.0 | Descripción                                 |
| ----------- | ------ | ------ | ------------------------------------------- |
| **archivo** | 𐄂      | String | La ubicación del archivo de esquema GraphQL |

### Especificaciones de red

| Campo               | v0.0.1 | v0.2.0        | Descripción                                                                                                                                                                                                 |
| ------------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**     | 𐄂      | String        | El hash de génesis de la red                                                                                                                                                                                |
| **endpoint**        | String | String        | Define el punto final del blockchain para indexarse - **Este debe ser un nodo completo de archivo**. Puedes recuperar endpoints para todas las parachains gratis de [OnFinality](https://app.onfinality.io) |
| **diccionario**     | String | String        | Se sugiere proporcionar el endpoint HTTP de un diccionario de cadena completo para acelerar el procesamiento - lea [cómo funciona un Diccionario de SubQuery](../tutorials_examples/dictionary.md).         |
| **tipos de cadena** | 𐄂      | {file:String} | Ruta al archivo de tipos de cadena, acepte el formato `.json` o `.yaml`                                                                                                                                     |

### Fuente de datos especifica

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Campo          | v0.0.1                                                    | v0.2.0                                                                           | Descripción                                                                                                                                                                           |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nombre**     | String                                                    | 𐄂                                                                                | Name of the data source                                                                                                                                                               |
| **clase**      | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Especificación de mapeo                                   | Especificación de mapeo                                                          |                                                                                                                                                                                       |
| **filtro**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Especificación de mapeo

| Campo                       | v0.0.1                                                                            | v0.2.0                                                                                                          | Descripción                                                                                                                                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **archivo**                 | String                                                                            | 𐄂                                                                                                               | Ruta a la entrada de mapeo                                                                                                                                                                                                                                                                      |
| **manipuladores y filtros** | [Controladores y filtros predeterminados](./manifestar/#mapeo-handlers-y-filtros) | Controladores y filtros por defecto, <br />[Controladores y filtros personalizados](#custom-data-sources) | Lista todas las [funciones de mapeo](./mapping.md) y sus correspondientes tipos de manejador, con filtros de mapeo adicionales. <br /><br /> Para manejadores de mapeo de tiempo de ejecución personalizados, por favor vea [fuentes de datos personalizadas](#custom-data-sources) |

## Fuentes de datos y mapeo

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataources:
  - kind: substrate/Runtime # Indica que este es el tiempo de ejecución predeterminado
    startBlock: 1 # Esto cambia el bloque de inicio de indexación, establecer esto más alto para omitir los bloques iniciales con menos mapeo
    de datos:
      archivo: dist/index. s # ruta de entrada para este mapeo
```

### Manejadores y Filtros de Mapeo

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Manejador                                          | Filtro compatible            |
| -------------------------------------------------- | ---------------------------- |
| [Manejador de bloques](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler)         | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)           | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Filtro de ejemplo de callHandler
filter:
  module: balances
  método: Depositar
  éxito: true
```

- Los filtros de módulos y métodos son compatibles con cualquier cadena basada en substrate.
- El filtro de `success` toma un valor booleano y puede ser utilizado para filtrar el extrínseco por su estado de éxito.
- El filtro `specVersion` especifica el rango de versión especificada para un bloque de substrate. Los siguientes ejemplos describen cómo establecer los rangos de versiones.

```yaml
filtro:
  specVersion: [23, 24] # Bloque de índice con specVersion entre 23 y 24 (incluido).
  specVersion: [100]      # Bloque de índice con specVersion mayor o igual a 100.
  specVersion: [null, 23] # Bloque de índice con specVersion menor o igual a 23.
```

## Cadenas Personalizadas

### Especificaciones de red

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Puedes recuperar endpoints para todas las parachains gratis de [OnFinality](https://app.onfinality.io)

### Tipos de cadena

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Su versión de manifiesto debe ser v0.2.0 o superior.
- Solo la exportación predeterminada se incluirá en la [ polkadot api ](https://polkadot.js.org/docs/api/start/types.extend/) al buscar bloques.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

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

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
