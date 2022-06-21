# Inicio rápido de Cosmos

En esta guía de inicio rápido, vamos a empezar con un simple proyecto de iniciación de Cosmos en la Red Juno y luego terminar indexando algunos datos reales reales. Esta es una base excelente para comenzar a desarrollar su propio Proyecto SubQuery.

**Si está buscando guías para Substrate/Polkadot, puede leer la guía de inicio rápido específica de [Substrate/Polkadot](./quickstart-polkadot).**

Al final de esta guía, tendrá un proyecto de SubQuery funcionando en un nodo de SubQuery con un endpoint GraphQL desde el que puede consultar datos.

Si aún no lo has hecho, te sugerimos familiarizarte con la [terminología](../#terminology) utilizada en SubQuery.

**El objetivo de esta guía de inicio rápido es adaptar el proyecto inicial estándar para comenzar a indexar todos los votos en el [Fondo de Desarrolladores ](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (que también contribuyó a SubQuery) de Cosmos, solo debería tomar 10-15 minutos**

Puedes ver el código final de este proyecto aquí en [https://github.com/jamesbayly/juno-terra-develop-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

## Preparación

### Entorno de desarrollo local

- [Node](https://nodejs.org/en/): Una instalación moderna (por ejemplo, la versión LTS) de Node.
- [Docker](https://docker.com/): Este tutorial usará Docker

### Instalar SubQuery CLI

Instalar SubQuery CLI globalmente en tu terminal usando Yarn o NPM:

```shell
# NPM
npm install -g @subql/cli
```

Tenga en cuenta que **NO** animamos el uso de `yarn global` para instalar `@subql/cli` debido a su mala gestión de dependencias que puede llevar a errores en la línea.

A continuación, puede ejecutar ayuda para ver los comandos disponibles y el uso proporcionado por CLI

```shell
subql help
```

## Inicializar el proyecto starter de SubQuery

Cosmos aún no está soportado en la CLI de SubQuery (`subql`), para empezar con Juno clon o bifurcar el proyecto [inicial](https://github.com/subquery/juno-subql-starter).

Después de completar el proceso de inicialización, debería ver una carpeta con el nombre de su proyecto que se ha creado dentro del directorio. El contenido de este directorio debe ser idéntico a lo que se muestra en la [estructura de directorio](../create/introduction.md#directory-structure).

Por último, bajo el directorio del proyecto, ejecute el siguiente comando para instalar las dependencias del nuevo proyecto.

<CodeGroup> shell cd PROJECT_NAME npm install ``` Hacer cambios en su proyecto En el paquete de inicio que acaba de inicializar, proporcionamos una configuración estándar para su nuevo proyecto. Usted trabajará principalmente en los siguientes archivos:

1. El esquema GraphQL en `schema.graphql`
2. El manifiesto del proyecto en `project.yaml`
3. Las funciones de mapeo en el directorio `src/mappings/`

El objetivo de esta guía de inicio rápido es adaptar el proyecto de inicio estándar para comenzar a indexar todas las transferencias del contrato inteligente de bLuna.

### Actualizando tu archivo de esquema GraphQL

El archivo `schema.graphql` define los diversos esquemas GraphQL. Debido a la forma en que funciona el lenguaje de consulta de GraphQL, el archivo de esquema esencialmente dicta la forma de sus datos de SubQuery. Es un buen lugar para comenzar porque te permite definir tu objetivo final por adelantado.

Vamos a actualizar el esquema `. raphql` archivo para leer de la siguiente manera para que podamos indexar todos los votos en el [Fondo de Desarrollo Terra](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # El campo id siempre es obligatorio y debe verse como este bloque de altura
  : ¡BigInt!
  voter: String!
 # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal

```

**Importante: Cuando realice cambios en el archivo de esquema, asegúrese de que regenera el directorio de sus tipos. Hágalo ahora.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models`  Para más información sobre el archivo `schema.graphql` , revisa nuestra documentación en [Esquema de Build/GraphQL](../build/graphql.md)

### Actualizando el archivo de manifiesto del proyecto

El Manifiesto del Proyecto (`proyecto. el archivo aml`) puede ser visto como un punto de entrada de tu proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos en cadena.

No haremos muchos cambios en el archivo manifest ya que ya ha sido configurado correctamente, pero necesitamos cambiar nuestros manejadores. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Para más información sobre el manifiesto del proyecto (`project.yaml`), revisa nuestra documentación en [Archivo de construcción/Manifiesto](../build/manifest.md)

### Añadir una función de mapeo

Las funciones de mapeo definen cómo se transforman los datos de la cadena en las entidades optimizadas GraphQL que hemos definido previamente en el archivo `schema.graphql`.

Vaya a la función de mapeo predeterminada en el directorio `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Añadimos información adicional y luego usamos la función `.save()` para guardar la nueva entidad (SubQuery automáticamente guardará esto en la base de datos).

Para más información sobre las funciones de mapeo, revisa nuestra documentación en [Construcción/Mapeo](../build/mapping.md)

### Construye Tu Proyecto

Para ejecutar tu nuevo SubQuery Project primero necesitamos construir nuestro trabajo. Ejecuta el comando de compilación desde el directorio raíz del proyecto.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project** La forma más fácil de hacer esto es usando Docker. </p>

Toda la configuración que controla cómo se ejecuta un nodo de SubQuery está definida en este archivo `docker-compose.yml`. Para un nuevo proyecto que ha sido inicializado no necesitarás cambiar nada aquí, pero puedes leer más sobre el archivo y la configuración en nuestra sección [Ejecutar un proyecto](../run_publish/run.md)

Bajo el directorio del proyecto ejecute el siguiente comando:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Sea paciente aquí.

### Consulta tu proyecto

Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

Deberías ver un parque de juegos GraphQL que se muestre en el Explorador y el esquema que está listo para consultar. En la parte superior derecha del patio de juegos, encontrarás un botón _Docs_ que abrirá un cuadro de documentación. Esta documentación se genera automáticamente y le ayuda a encontrar qué entidades y métodos puede consultar.

Para un nuevo proyecto inicial de SubQuery, puedes probar la siguiente consulta para conocer cómo funciona o [aprender más sobre el lenguaje de consulta GraphQL](../run_publish/graphql.md).

```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

Puedes ver el código final de este proyecto aquí en [https://github.com/jamesbayly/juno-terra-develop-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

### Publica tu SubQuery Project

SubQuery proporciona un servicio administrado gratuito cuando puedes desplegar tu nuevo proyecto. Puedes implementarlo en [SubQuery Proyects](https://project.subquery.network) y consultarlo usando nuestro [Explorador](https://explorer.subquery.network).

[Lee la guía para publicar tu nuevo proyecto a SubQuery Proyects](../run_publish/publish.md)

## Próximos pasos

Enhorabuena, ahora tiene un proyecto SubQuery en ejecución local que acepta peticiones API GraphQL para transferencias de datos desde bLuna.

Ahora que has tenido una visión de cómo construir un proyecto básico de SubQuery, la pregunta es ¿a dónde llegar? Si te sientes seguro, puedes ir a aprender más sobre los tres archivos clave. El archivo manifiesto, el esquema GraphQL y el archivo de mapeos bajo la sección [Build de estos documentos](../build/introduction.md).

De lo contrario, continúe a nuestra sección [de la Academia](../academy/academy.md) donde tienen más en profundidad, tutoriales y proyectos de ejemplo. Allí veremos modificaciones más avanzadas, y vamos a profundizar en la ejecución de proyectos de SubQuery ejecutando proyectos fácilmente disponibles y de código abierto.

Por último, si estás buscando más formas de ejecutar y publicar tu proyecto, nuestra sección [Ejecutar & Publicar](../run_publish/run.md) proporciona un formato detallado sobre todas las formas de ejecutar su proyecto SubQuery y otras funciones avanzadas de agregación GraphQL y suscripción.
