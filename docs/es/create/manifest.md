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

| Campo               | v0.0.1 | v0.2.0        | Descripción                                                                                                                                                                                                 |
| ------------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**     | 𐄂      | String        | El hash de génesis de la red                                                                                                                                                                                |
| **endpoint**        | String | String        | Define el punto final del blockchain para indexarse - **Este debe ser un nodo completo de archivo**. Puedes recuperar endpoints para todas las parachains gratis de [OnFinality](https://app.onfinality.io) |
| **diccionario**     | String | String        | Se sugiere proporcionar el endpoint HTTP de un diccionario de cadena completo para acelerar el procesamiento - lea [cómo funciona un Diccionario de SubQuery](../tutorials_examples/dictionary.md).         |
| **tipos de cadena** | 𐄂      | {file:String} | Ruta al archivo de tipos de cadena, acepte el formato `.json` o `.yaml`                                                                                                                                     |

### Fuente de datos especifica

Define los datos que serán filtrados y extraídos y la ubicación del manejador de funciones de mapeo para que la transformación de datos sea aplicada.
| Campo          | v0.0.1                                                                | v0.2.0                                                                           | Descripción                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nombre**     | String                                                                | 𐄂                                                                                | Nombre de la fuente de datos                                                                                                                                                                                                          |
| **clase**      | [substrate/tiempo de ejecución](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Soportamos el tipo de datos desde el tiempo de ejecución por defecto de substrate como bloque, evento y extrinsic(call). <br /> Desde v0.2.0, soportamos datos de tiempo de ejecución personalizado, como contrato inteligente. |
| **startBlock** | Número Entero                                                         | Número Entero                                                                    | Esto cambia el bloque de inicio de indexación, establezca esto más alto para omitir bloques iniciales con menos datos                                                                                                                 |
| **mapeo**      | Especificación de mapeo                                               | Especificación de mapeo                                                          |                                                                                                                                                                                                                                       |
| **filtro**     | [filtros de red](./manifest/#network-filters)                         | 𐄂                                                                                | Filtrar la fuente de datos a ejecutar por el nombre de la especificación del extremo de red                                                                                                                                           |

### Especificación de mapeo

| Campo                       | v0.0.1                                                                              | v0.2.0                                                                                                          | Descripción                                                                                                                                                                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **archivo**                 | String                                                                              | 𐄂                                                                                                               | Ruta a la entrada de mapeo                                                                                                                                                                                                                                                                      |
| **manipuladores y filtros** | [Controladores y filtros predeterminados](./manifest/#mapping-handlers-and-filters) | Controladores y filtros por defecto, <br />[Controladores y filtros personalizados](#custom-data-sources) | Lista todas las [funciones de mapeo](./mapping.md) y sus correspondientes tipos de manejador, con filtros de mapeo adicionales. <br /><br /> Para manejadores de mapeo de tiempo de ejecución personalizados, por favor vea [fuentes de datos personalizadas](#custom-data-sources) |

## Fuentes de datos y mapeo

En esta sección, hablaremos del tiempo de ejecución por defecto de substrate y su mapeo. Aquí tenemos un ejemplo:

```yaml
dataources:
  - kind: substrate/Runtime # Indica que este es el tiempo de ejecución predeterminado
    startBlock: 1 # Esto cambia el bloque de inicio de indexación, establecer esto más alto para omitir los bloques iniciales con menos mapeo
    de datos:
      archivo: dist/index. s # ruta de entrada para este mapeo
```

### Manejadores y Filtros de Mapeo

La siguiente tabla explica los filtros soportados por diferentes manejadores.

**Tu proyecto de SubQuery será mucho más eficiente cuando sólo utilices controladores de eventos y llamadas con filtros de mapeo apropiados**

| Manejador                                          | Filtro compatible            |
| -------------------------------------------------- | ---------------------------- |
| [Manejador de bloques](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler)         | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)           | `module`,`method` ,`success` |

Los filtros de mapeo de tiempo de ejecución por defecto son una característica extremadamente útil para decidir qué bloque, evento, o extrínseco activará un manejador de mapeo.

Sólo los datos entrantes que satisfagan las condiciones del filtro serán procesados por las funciones de mapeo. Los filtros de mapeo son opcionales pero son altamente recomendables, ya que reducen significativamente la cantidad de datos procesados por su proyecto SubQuery y mejorarán el rendimiento de indexación.

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

Cuando se conecta a una parachain Polkadot diferente o incluso a una cadena de sustratos personalizada, necesitarás editar la sección [Especificación de red](#network-spec) de este manifiesto.

El `genesisHash` debe ser siempre el hash del primer bloque de la red personalizada. Puedes retirarlo fácilmente yendo a [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) y buscando el hash en **bloque 0** (ver la imagen de abajo).

![Hash de Génesis](/assets/img/genesis-hash.jpg)

Además, necesitarás actualizar el `endpoint`. Esto define el punto final del blockchain a indexar - **Este debe ser un nodo completo de archivo**. Puedes recuperar endpoints para todas las parachains gratis de [OnFinality](https://app.onfinality.io)

### Tipos de cadena

Puede indexar datos de cadenas personalizadas incluyendo también tipos de cadena en el manifiesto.

Soportamos los tipos adicionales usados por módulos de tiempo de ejecución substrate, `typesAlias`, `typesBundle`, `typesChain`, y `typesSpec` también son compatibles.

En el ejemplo v0.2.0 de abajo, la red `. haintypes` están apuntando a un archivo que tiene todos los tipos personalizados incluidos, Este es un archivo estándar de chainspec que declara los tipos específicos soportados por este blockchain en cualquiera de los dos `. son` o formato `.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # la ruta relativa al lugar donde se almacenan los tipos personalizados ... ``` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. Actúan como un software intermedio que puede proporcionar un filtrado adicional y una transformación de datos. Entre redes, es probable que varias opciones sean diferentes (por ejemplo, el bloque de inicio del índice). Por lo tanto, permitimos a los usuarios definir diferentes detalles para cada fuente de datos, lo que significa que un proyecto de SubQuery puede ser utilizado en múltiples redes.

Los usuarios pueden añadir un `filtro` en `fuentes de datos` para decidir qué fuente de datos ejecutar en cada red.

A continuación se muestra un ejemplo que muestra diferentes fuentes de datos tanto para las redes Polkadot como Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Crea una plantilla para evitar redundancia definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use la plantilla aqui - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # puede reutilizar o cambiar ``` </CodeGroupItem>

</CodeGroup>
