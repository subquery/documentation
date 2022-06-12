# Inicio rápido de Avalanche

En esta guía de inicio rápido, vamos a empezar con un simple proyecto inicial Avalanche y luego terminar indexando algunos datos reales reales. Esta es una base excelente para comenzar a desarrollar su propio Proyecto SubQuery.

**Si está buscando guías para Substrate/Polkadot, puede leer la guía de inicio rápido específica de [Substrate/Polkadot](./quickstart-polkadot).**

Al final de esta guía, tendrá un proyecto de SubQuery funcionando en un nodo de SubQuery con un endpoint GraphQL desde el que puede consultar datos.

Si aún no lo has hecho, te sugerimos familiarizarte con la [terminología](../#terminology) utilizada en SubQuery.

**El objetivo de esta guía de inicio rápido es indexar todos los registros del token Pangolin _Aprobar_, sólo debería llevar 10-15 minutos**

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

Dentro del directorio en el que desea crear un proyecto SubQuery, simplemente ejecute el siguiente comando para empezar.

```shell
subql init
```

Se le harán ciertas preguntas ya que el proyecto de SubQuery está initalizado:

- Project Name: A name for your SubQuery project
- Familia de redes: La familia de redes de blockchain de capa 1 para la que se desarrollará este proyecto de SubQuery, utiliza las flechas de tu teclado para seleccionar entre las opciones, para esta guía utilizaremos _"Avalanche"_
- Red: La red específica para la que se desarrollará este proyecto de SubQuery, utilice las flechas de su teclado para seleccionar entre las opciones, para esta guía utilizaremos _"Avalanche"_
- Plantilla: Seleccione una plantilla de proyecto SubQuery que le proporcione un punto de partida para comenzar el desarrollo, le sugerimos que seleccione el _"Proyecto de inicio"_
- Repositorio Git (opcional): Proporcione una URL Git a un repositorio en el que este proyecto de SubQuery será alojado (cuando esté alojado en SubQuery Explorer)
- endpoint RPC (requerido): Proporcione una URL HTTPS a un endpoint RPC en ejecución que se utilizará por defecto para este proyecto. Este nodo RPC debe ser un nodo de archivo (tienen el estado completo de cadena). Para esta guía utilizaremos el valor por defecto _"avalanche.api.onfinality.io"_
- Autores (Requeridos): Introduzca el propietario de este proyecto de Subconsulta aquí (por ejemplo, su nombre)
- Descripción (Opcional): Puede proporcionar un párrafo corto sobre su proyecto que describa qué datos contiene y qué pueden hacer los usuarios con él
- Versión (Requerida): Introduzca un número de versión personalizado o utilice el predeterminado (`1.0.0`)
- Licencia (Requerida): Proporcione la licencia de software para este proyecto o acepte el predeterminado (`Apache-2.0`)

Después de completar el proceso de inicialización, debería ver una carpeta con el nombre de su proyecto que se ha creado dentro del directorio. El contenido de este directorio debe ser idéntico a lo que se muestra en la [estructura de directorio](../create/introduction.md#directory-structure).

Por último, bajo el directorio del proyecto, ejecute el siguiente comando para instalar las dependencias del nuevo proyecto.

<CodeGroup> shell cd PROJECT_NAME npm install ``` Hacer cambios en su proyecto En el paquete de inicio que acaba de inicializar, proporcionamos una configuración estándar para su nuevo proyecto. Usted trabajará principalmente en los siguientes archivos:

1. El esquema GraphQL en `schema.graphql`
2. El manifiesto del proyecto en `project.yaml`
3. Las funciones de mapeo en el directorio `src/mappings/`

El objetivo de esta guía de inicio rápido es adaptar el proyecto de inicio estándar para indexar todos los registros de transacciones de Pangolin `Aprobar`.

### Actualizando tu archivo de esquema GraphQL

El archivo `schema.graphql` define los diversos esquemas GraphQL. Debido a la forma en que funciona el lenguaje de consulta de GraphQL, el archivo de esquema esencialmente dicta la forma de sus datos de SubQuery. Es un buen lugar para comenzar porque te permite definir tu objetivo final por adelantado.

Vamos a actualizar el archivo `schema.graphql` para eliminar todas las entidades existentes y leer como sigue

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: Cadena!
  blockNumber: Cadena!
  blockHash: Cadena!
  addressFrom: String
  addressTo: String
  amount: String
}
```

**Importante: Cuando realice cambios en el archivo de esquema, asegúrese de que regenera el directorio de sus tipos. Hágalo ahora.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models`. Para más información sobre el archivo `schema.graphql` , revisa nuestra documentación en [Esquema de Build/GraphQL](../build/graphql.md)

### Actualizando el archivo de manifiesto del proyecto

El Manifiesto del Proyecto (`proyecto. el archivo aml`) puede ser visto como un punto de entrada de tu proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos en cadena.

No haremos muchos cambios en el archivo manifest ya que ya ha sido configurado correctamente, pero necesitamos cambiar nuestros manejadores. Recuerda que estamos planeando indexar todos los registros de aprobación de Pangolin, como resultado, necesitamos actualizar la sección `fuentes de datos` para leer lo siguiente.

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleEvent
          kind: avalanche/EventHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

Esto significa que ejecutaremos una función de mapeo `handleLog` cada vez que haya un registro `aprobado` en cualquier transacción del contrato [Pangolin](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

Para más información sobre el manifiesto del proyecto (`project.yaml`), revisa nuestra documentación en [Archivo de construcción/Manifiesto](../build/manifest.md)

### Añadir una función de mapeo

Las funciones de mapeo definen cómo se transforman los datos de la cadena en las entidades optimizadas GraphQL que hemos definido previamente en el archivo `schema.graphql`.

Vaya a la función de mapeo predeterminada en el directorio `src/mappings`. Verás tres funciones exportadas, `handleBlock`, `handleLog`, y `handleTransaction`. Se pueden eliminar tanto las funciones `handleBlock` como `handleTransaction`, nosotros sólo estamos tratando la función `handleLog`.

La función `handleLog` recibe los datos del evento siempre que éste coincida con los filtros que especificamos previamente en nuestro `project.yaml`. Vamos a actualizarlo para que procese todos los registros de transacciones de `aprobación` y los guarde en las entidades GraphQL que creamos anteriormente.

Puedes actualizar la función `handleLog` a lo siguiente (observa las importaciones adicionales):

```ts
importar { PangolinApproval } desde ".. types";
import { AvalancheEvent } from "@subql/types-avalanche";

export async function handleEvent(event: AvalancheEvent): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord. ransactionHash = event.transactionHash;
  pangolinApprovalRecord. lockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event. opics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord. mount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```

Lo que hace es recibir un registro de avalancha que incluye los datos del registro de transación de la carga útil. Extraemos estos datos y luego instanciamos una nueva entidad `PangolinApproval` que definimos anteriormente en el archivo `schema.graphql`. Añadimos información adicional y luego usamos la función `.save()` para guardar la nueva entidad (SubQuery automáticamente guardará esto en la base de datos).

Para más información sobre las funciones de mapeo, revisa nuestra documentación en [Construcción/Mapeo](../build/mapping.md)

### Construye Tu Proyecto

Para ejecutar tu nuevo SubQuery Project primero necesitamos construir nuestro trabajo. Ejecuta el comando de compilación desde el directorio raíz del proyecto.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**. La forma más sencilla de hacerlo es utilizando Docker.</p>

Toda la configuración que controla cómo se ejecuta un nodo SubQuery se define en este archivo `docker-compose.yml`. Para un nuevo proyecto que ha sido inicializado no necesitarás cambiar nada aquí, pero puedes leer más sobre el archivo y la configuración en nuestra sección [Ejecutar un proyecto](../run_publish/run.md)

Bajo el directorio del proyecto ejecute el siguiente comando:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Sea paciente aquí.

### Consulta tu proyecto

Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

Deberías ver un parque de juegos GraphQL que se muestre en el Explorador y el esquema que está listo para consultar. En la parte superior derecha del patio de juegos, encontrarás un botón _Docs_ que abrirá un cuadro de documentación. Esta documentación se genera automáticamente y le ayuda a encontrar qué entidades y métodos puede consultar.

Para un nuevo proyecto inicial de SubQuery, puedes probar la siguiente consulta para conocer cómo funciona o [aprender más sobre el lenguaje de consulta GraphQL](../run_publish/graphql.md).

```graphql
query {
    pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

### Publica tu SubQuery Project

SubQuery proporciona un servicio administrado gratuito cuando puedes desplegar tu nuevo proyecto. Puedes implementarlo en [SubQuery Proyects](https://project.subquery.network) y consultarlo usando nuestro [Explorador](https://explorer.subquery.network).

[Lea la guía para publicar su nuevo proyecto en SubQuery Proyects](../run_publish/publish.md), **Tenga en cuenta que debe implementar IPFS**.

## Próximos pasos

Enhorabuena, ahora tiene un proyecto SubQuery en ejecución local que acepta peticiones API GraphQL para transferencias de datos desde bLuna.

Ahora que has tenido una visión de cómo construir un proyecto básico de SubQuery, la pregunta es ¿a dónde llegar? Si te sientes seguro, puedes ir a aprender más sobre los tres archivos clave. El archivo manifiesto, el esquema GraphQL y el archivo de mapeos bajo la sección [Build de estos documentos](../build/introduction.md).

De lo contrario, continúe a nuestra sección [de la Academia](../academy/academy.md) donde tienen más en profundidad, tutoriales y proyectos de ejemplo. Allí veremos modificaciones más avanzadas, y vamos a profundizar en la ejecución de proyectos de SubQuery ejecutando proyectos fácilmente disponibles y de código abierto.

Por último, si estás buscando más formas de ejecutar y publicar tu proyecto, nuestra sección [Ejecutar & Publicar](../run_publish/run.md) proporciona un formato detallado sobre todas las formas de ejecutar su proyecto SubQuery y otras funciones avanzadas de agregación GraphQL y suscripción.
