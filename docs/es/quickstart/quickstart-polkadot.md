# Inicio rápido de Polkadot

En esta guía de inicio rápido, vamos a empezar con un simple proyecto inicial de Substrate/Polkadot y luego terminaremos indexando algunos datos reales. Esta es una base excelente para comenzar a desarrollar su propio proyecto Substrate/Polkadot SubQuery.

Al final de esta guía, tendrá un proyecto de SubQuery funcionando en un nodo de SubQuery con un endpoint GraphQL desde el que puede consultar datos.

Si aún no lo has hecho, te sugerimos familiarizarte con la [terminología](../#terminology) utilizada en SubQuery.

**El objetivo de esta guía de inicio rápido es adaptar el proyecto de inicio estándar para empezar a indexar todas las transferencias desde Polkadot, sólo debería llevar 10-15 minutos**

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

Por favor, tenga en cuenta que ** DO NOT** fomentamos el uso de `yarn global` para la instalación de `@subql/cli` debido a su pobre gestión de dependencias que puede conducir a errores en la línea.

A continuación, puede ejecutar la ayuda para ver los comandos disponibles y el uso proporcionado por la CLI:

```shell
subql help
```

## Inicializar el proyecto starter de SubQuery

Dentro del directorio en el que desea crear un proyecto SubQuery, simplemente ejecute el siguiente comando para empezar.

```shell
subql init
```

Se le harán ciertas preguntas ya que el proyecto de SubQuery está initalizado:

- Nombre del proyecto: Un nombre de proyecto para su proyecto de SubQuery
- Familia de redes: La familia de redes de blockchain de capa 1 para la que se desarrollará este proyecto de SubQuery. Utilice las teclas de flecha para seleccionar las opciones disponibles. Para esta guía, utilizaremos *"Substrate"*
- Red: La red específica para la que se desarrollará este proyecto de SubQuery. Utilice las teclas de flecha para seleccionar las opciones disponibles. Para esta guía, utilizaremos *"Polkadot"*
- Proyecto de plantilla: Seleccione un proyecto de plantilla de SubQuery que le proporcionará un punto de partida para comenzar el desarrollo. Sugerimos seleccionar el proyecto *"subql-starter"*.
- Punto final RPC: Proporcione una URL HTTPS a un punto final RPC en ejecución que se utilizará por defecto para este proyecto. Puede acceder rápidamente a los puntos finales públicos para diferentes redes de Polkadot, crear tu propio nodo privado dedicado utilizando [OnFinality](https://app.onfinality.io) o simplemente utilizar el punto final predeterminado de Polkadot. Este nodo RPC debe ser un nodo de archivo (tienen el estado completo de cadena). Para esta guía, utilizaremos el valor por defecto *"https://polkadot.api.onfinality.io"*
- Git repository: Proporcione una URL Git a un repositorio en el que se alojará este proyecto SubQuery (cuando se aloje en el Explorador de SubQuery) o acepte el predeterminado proporcionado.
- Autores: Introduzca aquí el propietario de este proyecto de SubQuery (por ejemplo, su nombre) o acepte el valor predeterminado proporcionado.
- Descripción: Proporcione un breve párrafo sobre su proyecto que describa los datos que contiene y lo que los usuarios pueden hacer con ellos o acepte el valor predeterminado proporcionado.
- Versión: Introduzca un número de versión personalizado o utilice el predeterminado (`1.0.0`)
- Licencia: Proporcione la licencia de software para este proyecto o acepte la predeterminada (`MIT`)

Una vez completado el proceso de inicialización, deberías ver que se ha creado una carpeta con el nombre de tu proyecto dentro del directorio. El contenido de este directorio debe ser idéntico al que aparece en la [Estructura de directorios](../create/introduction.md#directory-structure).

Por último, en el directorio del proyecto, ejecute el siguiente comando para instalar las dependencias del nuevo proyecto.

<CodeGroup> shell cd PROJECT_NAME npm install ``` Hacer cambios en su proyecto En el paquete de inicio que acaba de inicializar, proporcionamos una configuración estándar para su nuevo proyecto. Estos son:

1. El esquema GraphQL en `schema.graphql`
2. El manifiesto del proyecto en `project.yaml`
3. Las funciones de mapeo en el directorio `src/mappings/`

El objetivo de esta guía de inicio rápido es adaptar el proyecto estándar de inicio para comenzar a indexar todas las transferencias de Polkadot.

### Actualizando tu archivo de esquema GraphQL

El archivo `schema.graphql` define los diversos esquemas GraphQL. Debido a la forma en que funciona el lenguaje de consulta de GraphQL, el archivo de esquema esencialmente dicta la forma de sus datos de SubQuery. Es un buen punto de partida porque le permite definir su objetivo final por adelantado.

Actualice el archivo `schema.graphql` para que diga lo siguiente:

```graphql
type Transfer @entity {
  id: ID! # El campo Id es siempre obligatorio y debe tener el siguiente aspecto
  importe: BigInt # Cantidad que se transfiere
  blockNumber: BigInt # La altura del bloque de la transferencia
  from: String # La altura del bloque de la transferencia! # La cuenta desde la que se realizan las transferencias
  a: ¡Cadena! # La cuenta que las transferencias se hacen a
}
```

**Importante: Cuando realice cambios en el archivo de esquema, asegúrese de que regenera el directorio de sus tipos.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Para más información sobre el archivo `schema.graphql` , revisa nuestra documentación en [Esquema de Build/GraphQL](../build/graphql.md)

### Actualizando el archivo de manifiesto del proyecto

El archivo Project Manifest (`project.yaml`) puede ser visto como un punto de entrada de su proyecto y define la mayoría de los detalles sobre cómo SubQuery indexará y transformará los datos de la cadena.

El archivo de manifiesto ya se ha configurado correctamente, pero tenemos que cambiar nuestros manejadores. Como estamos planeando indexar todas las transferencias de Polkadot, necesitamos actualizar la sección `fuentes de datos` de la siguiente manera:

```yaml
dataources:
  - kind: substrate/Runtime
    startBlock: 1
    mapeo:
      file: . dist/índice. s
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

Esto significa que ejecutaremos una función de mapeo de `handleEvent` cada vez que haya un evento `balances.Transfer`.

Para más información sobre el manifiesto del proyecto (`project.yaml`), revisa nuestra documentación en [Archivo de construcción/Manifiesto](../build/manifest.md)

### Añadir una función de mapeo

Las funciones de mapeo definen cómo se transforman los datos de la cadena en las entidades optimizadas GraphQL que hemos definido previamente en el archivo `schema.graphql`.

Vaya a la función de mapeo predeterminada en el directorio `src/mappings`. Verás tres funciones exportadas, `handleBlock`, `handleEvent`y `handleCall`. Elimina las funciones `handleBlock` y `handleCall` ya que sólo nos ocuparemos de la función `handleEvent`.

La función `handleEvent` recibe datos de eventos siempre que un evento coincida con los filtros que especificamos previamente en nuestro `project.yaml`. Lo actualizaremos para que procese todos los eventos `balances.Transfer` y los guarde en las entidades GraphQL que creamos anteriormente.

Puede actualizar la función `handleEvent` a lo siguiente (tenga en cuenta las importaciones adicionales):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    )
```

Lo que hace es recibir un SubstrateEvent que incluye datos de transferencia en la carga útil. Extraemos estos datos y luego instanciamos una nueva entidad de `transferencia` que definimos anteriormente en el archivo `schema.graphql`. Añadimos información adicional y luego usamos la función `.save()` para guardar la nueva entidad (SubQuery automáticamente guardará esto en la base de datos).

Para más información sobre las funciones de mapeo, revisa nuestra documentación en [Construcción/Mapeo](../build/mapping.md)

### Construye Tu Proyecto

Para ejecutar su nuevo Proyecto SubQuery, primero tenemos que construir nuestro trabajo. Ejecuta el comando de compilación desde el directorio raíz del proyecto.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**. La forma más fácil de hacer esto es usando Docker. </p>

Toda la configuración que controla cómo se ejecuta un nodo SubQuery se define en el archivo `docker-compose.yml`. Para un nuevo proyecto que acaba de ser inicializado no necesitará cambiar nada, pero puede leer más sobre el archivo y los ajustes en nuestra sección [Ejecutar un proyecto](../run_publish/run.md).

En el directorio del proyecto, ejecute el siguiente comando:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node.

### Consulta tu proyecto

Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

Deberías ver un campo de juego GraphQL en el navegador y los esquemas que están listos para la consulta. En la parte superior derecha del patio de juegos, encontrarás un botón _Docs_ que abrirá un cuadro de documentación. Esta documentación se genera automáticamente y le ayuda a encontrar qué entidades y métodos puede consultar.

Para un nuevo proyecto de inicio de SubQuery, pruebe la siguiente consulta para entender cómo funciona o para aprender más sobre el lenguaje [GraphQL Query](../run_publish/graphql.md).

```graphql
{
  consulta {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodos {
        id
        cantidad
        blockNumber
        de
        a
      }
    }
  }
}
```

### Publica tu SubQuery Project

SubQuery ofrece un servicio gestionado gratuito en el que puedes desplegar tu nuevo proyecto. Puedes implementarlo en [SubQuery Proyects](https://project.subquery.network) y consultarlo usando nuestro [Explorador](https://explorer.subquery.network).

Lee la guía para [publicar tu nuevo proyecto en SubQuery Projects](../run_publish/publish.md)

## Próximos pasos

Felicidades, ahora tiene un proyecto SubQuery que se ejecuta localmente y que acepta solicitudes de la API GraphQL para transferir datos.

Ahora que has tenido una visión de cómo construir un proyecto básico de SubQuery, la pregunta es ¿a dónde llegar? Si te sientes seguro, puedes ir a aprender más sobre los tres archivos clave. El archivo de manifiesto, el esquema GraphQL y el archivo de mapeo se encuentran en la sección [Construcción de estos documentos](../build/introduction.md).

De lo contrario, continúe a nuestra sección [de la Academia](../academy/academy.md) donde tienen más en profundidad, tutoriales y proyectos de ejemplo. Allí veremos modificaciones más avanzadas, y vamos a profundizar en la ejecución de proyectos de SubQuery ejecutando proyectos fácilmente disponibles y de código abierto.

Por último, si buscas más formas de ejecutar y publicar tu proyecto, nuestra sección [Run & Publish](../run_publish/run.md) ofrece información detallada sobre todas las formas de ejecutar tu proyecto SubQuery y otras funciones avanzadas de agregación y suscripción de GraphQL.
