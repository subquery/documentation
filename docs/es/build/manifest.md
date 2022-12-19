# Archivo del manifiesto

El Manifiesto `project.yaml` puede ser visto como un punto de entrada de tu proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos en cadena.

El manifiesto puede estar en formato YAML o JSON. En este documento, utilizaremos YAML en todos los ejemplos. A continuación se muestra un ejemplo estándar de un `project.yaml` básico.

``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ````. [Vea aquí](#cli-options) para más información

Bajo `red`:

- Hay un nuevo campo **requerido** `genesisHash` que ayuda a identificar la cadena que se está usando.
- Para v0.2.0 y superiores, puedes hacer referencia a un archivo [chaintype externo](#custom-chains) si estás referenciando una cadena personalizada.

Debajo de `fuentes de datos`:

- Puede enlazar directamente un punto de entrada de `index.js` para manejadores de mapeo. Por defecto, este `index.js` se generará a partir de `index.ts` durante el proceso de compilación.
- Las fuentes de datos ahora pueden ser una fuente de datos de tiempo de ejecución regular o [fuente de datos personalizada](#custom-data-sources).

### Opciones de CLI

Por defecto, el CLI generará proyectos SubQuery para la versión especifica 0.2.0. Este comportamiento puede ser anulado ejecutando `subql init --specVersion 0.0. PROJECT_NAME`, aunque esto no es recomendable ya que el proyecto no será soportado por el servicio alojado en SubQuery en el futuro

`subql migrate` se puede ejecutar en un proyecto existente para migrar el manifiesto del proyecto a la última versión.

USAR $ subql init [PROJECTNAME]

ARGUENTOS PROJECTNAME Dar el nombre del proyecto inicial

| Opciones                 | Descripción                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| -f, --force              |                                                                                            |
| -l, --location=ubicación | carpeta local para crear el proyecto en                                                    |
| --install-dependencias   | Instalar también dependencias                                                              |
| --npm                    | Forzar el uso de NPM en lugar de yarn, solo funciona con la bandera `install-dependencies` |
| --specVersion=0.0.1      | 0.2.0 [por defecto: 0.2.0]                                                                 | La versión especificada para ser utilizada por el proyecto |

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
| **red**              | [Especificaciones de red](#especificación-de-red)          | Especificaciones de red                | Detalle de la red a ser indexada                               |
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
| **diccionario**     | String | String        | Se sugiere proporcionar el endpoint HTTP de un diccionario de cadena completo para acelerar el procesamiento - lea [cómo funciona un Diccionario de SubQuery](../academy/tutorials_examples/dictionary.md). |
| **tipos de cadena** | 𐄂      | {file:String} | Ruta al archivo de tipos de cadena, acepte el formato `.json` o `.yaml`                                                                                                                                     |

### Fuente de datos especifica

Define los datos que serán filtrados y extraídos y la ubicación del manejador de funciones de mapeo para que la transformación de datos sea aplicada.
| Campo | v0.0.1 | v0.2.0 | Descripción |
| -------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nombre** | String | 𐄂 | Nombre del origen de los datos |
| **clase** | [substrate/tiempo de ejecución](./manifestar/#fuentes de datos y mapeo) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Soportamos el tipo de datos desde el tiempo de ejecución por defecto de substrate como bloque, evento y extrinsic(call). <br /> Desde v0.2.0, soportamos datos de tiempo de ejecución personalizado, como contrato inteligente. |
| **startBlock** | Integer | Integer | Esto cambia el bloque de inicio de indexación, establezca esto más alto para omitir bloques iniciales con menos datos |
| **mapeo** | Especificación de mapeo | Especificación de mapeo | |
| **filtro** | [filtros de red](./manifestar/#filtros de red) | 𐄂 | Filtrar la fuente de datos a ejecutar por el nombre de la especificación del extremo de red |

### Especificación de mapeo

| Campo                       | v0.0.1                                                                            | v0.2.0                                                                                                    | Descripción                                                                                                                                                                                                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **archivo**                 | String                                                                            | 𐄂                                                                                                         | Ruta a la entrada de mapeo                                                                                                                                                                                                                                                                   |
| **manipuladores y filtros** | [Controladores y filtros predeterminados](./manifestar/#mapeo-handlers-y-filtros) | Controladores y filtros por defecto, <br />[Controladores y filtros personalizados](#custom-data-sources) | Lista todas las [funciones de mapeo](./mapping/polkadot.md) y sus correspondientes tipos de manejador, con filtros de mapeo adicionales. <br /><br /> Para manejadores de mapeo de tiempo de ejecución personalizados, por favor vea [fuentes de datos personalizadas](#custom-data-sources) |

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

| Manejador                                                   | Filtro compatible            |
| ----------------------------------------------------------- | ---------------------------- |
| [Manejador de bloques](./mapping/polkadot.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping/polkadot.md#event-handler)         | `module`,`method`            |
| [CallHandler](./mapping/polkadot.md#call-handler)           | `module`,`method` ,`success` |

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

En el ejemplo v0.2.0 de abajo, la red `. haintypes` están apuntando a un archivo que tiene todos los tipos personalizados incluidos, Este es un archivo estándar de chainspec que declara los tipos específicos soportados por este blockchain en cualquiera de los dos `. son`, `.yaml` o `.js formato`.

::: code-tabs @tab v0.2.0 `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # la ruta relativa al lugar donde se almacenan los tipos personalizados ...`
@tab v0.0.1 `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` :::

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
red:
  chaintypes:
    file: ./dist/types.js # se generará después de ejecutar yarn build
```

Cosas a tener en cuenta sobre el uso del archivo de tipos de cadena con extensión `.ts` o `.js`:

- Su versión de manifiesto debe ser v0.2.0 o superior.
- Solo la exportación predeterminada se incluirá en la [ polkadot api ](https://polkadot.js.org/docs/api/start/types.extend/) al buscar bloques.

A continuación se muestra un ejemplo de un archivo de tipos de cadena `.ts `:

::: code-tabs @tab types.ts ts importar {typesBundleDeprecated} desde "moonbeam-types-bundle" exportar predeterminado {typesBundle: typesBundleDeprecated}; '' :::

## Fuentes de datos personalizadas

Las fuentes de datos personalizadas brindan una funcionalidad específica de la red que facilita el manejo de los datos. Actúan como un middleware que puede proporcionar filtrado adicional y transformación de datos.

Un buen ejemplo de esto es el soporte de EVM, tener un procesador de fuente de datos personalizado para EVM significa que puede filtrar a nivel de EVM (por ejemplo, filtrar métodos de contrato o registros) y los datos se transforman en estructuras similares al ecosistema de Ethereum también como parámetros de análisis con ABI.

Las fuentes de datos personalizadas se pueden utilizar con fuentes de datos normales.

Aquí hay una lista de fuentes de datos personalizadas compatibles:

Controladores admitidos
Entre redes, es probable que varias opciones sean diferentes (por ejemplo, el bloque de inicio del índice). Por lo tanto, permitimos a los usuarios definir diferentes detalles para cada fuente de datos, lo que significa que un proyecto de SubQuery puede ser utilizado en múltiples redes.

Los usuarios pueden añadir un `filtro` en `fuentes de datos` para decidir qué fuente de datos ejecutar en cada red.

A continuación hay un ejemplo que muestra diferentes fuentes de datos para las redes Polkadot y Kusama.

::: code-tabs @tab v0.0.1 `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` :::
