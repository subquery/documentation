# Guía de inicio rápido

En esta guía de inicio rápido, vamos a crear un simple proyecto inicial que se puede utilizar como marco para desarrollar su propio Proyecto SubQuery.

Al final de esta guía, tendrá un proyecto de SubQuery funcionando en un nodo de SubQuery con un endpoint GraphQL desde el que puede consultar datos.

Si aún no lo has hecho, te sugerimos familiarizarte con la [terminología](../#terminology) utilizada en SubQuery.

## Preparación

### Entorno de desarrollo local

- [Typescript](https://www.typescriptlang.org/) es necesario para compilar el proyecto y definir tipos.
- Tanto SubQuery CLI como el proyecto generado tienen dependencias y requieren una versión moderna [Node](https://nodejs.org/en/).
- Los nodos SubQuery requieren Docker

### Instalar SubQuery CLI

Instalar SubQuery CLI globalmente en tu terminal usando Yarn o NPM:

```shell
# NPM
npm install -g @subql/cli
```

Tenga en cuenta que **NO** animamos el uso de `yarn global` debido a su mala gestión de dependencias que puede llevar a errores en la línea.

A continuación, puede ejecutar ayuda para ver los comandos disponibles y el uso proporcionado por CLI

```shell
subql help
```

## Inicializar el proyecto de SubQuery de Inicio

Dentro del directorio en el que desea crear un proyecto de SubQuery, simplemente reemplace `PROJECT_NAME` con el propio y ejecute el comando:

```shell
subql init PROJECT_NAME
```

Se le harán ciertas preguntas ya que el proyecto de SubQuery está initalizado:

- Network: A blockchain network that this SubQuery project will be developed to index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

Después de completar el proceso de inicialización, debería ver una carpeta con el nombre de su proyecto que se ha creado dentro del directorio. El contenido de este directorio debe ser idéntico a lo que se muestra en la [estructura de directorio](../create/introduction.md#directory-structure).

Por último, bajo el directorio del proyecto, ejecute el siguiente comando para instalar las dependencias del nuevo proyecto.

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install. Usted trabajará principalmente en los siguientes archivos:

- El manifiesto en `project.yaml`
- El esquema GraphQL en `schema.graphql`
- Las funciones de mapeo en el directorio `src/mappings/`

Para más información sobre cómo escribir su propia SubQuery, consulte nuestra documentación en [Crear un proyecto](../create/introduction.md)

### Generación de Modelo GraphQL

Para [indexar](../run/run.md) tu proyecto de SubQuery, primero debe generar los modelos GraphQL necesarios que ha definido en su archivo de Esquema GraphQL (`schema.graphql`). Ejecuta los siguientes comandos desde el directorio raíz de tu proyecto.

<CodeGroup> # Yarn yarn codegen # Npm npm run-script codegen

## Construye Tu Proyecto

Para ejecutar tu proyecto SubQuery en un nodo SubQuery alojado localmente, primero necesitas compilar tu trabajo.

Ejecuta el comando de compilación desde el directorio raíz del proyecto.

<CodeGroup> Toda la configuración que controla cómo se ejecuta un nodo SubQuery se define en este archivo ` docker-compose.yml `. Para un nuevo proyecto que ha sido inicializado no necesitarás cambiar nada aquí, pero puedes leer más sobre el archivo y la configuración en nuestra sección [Ejecutar un proyecto](../run/run.md)

Bajo el directorio del proyecto ejecute el siguiente comando:

```shell
docker-compose pull && docker-compose up
```

Puede tomar algo de tiempo descargar los paquetes necesarios ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), y Postgres) por primera vez, pero pronto verás un nodo SubQuery en ejecución.

### Consulta tu proyecto

Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

Deberías ver un parque de juegos GraphQL que se muestre en el Explorador y el esquema que está listo para consultar. En la parte superior derecha del patio de juegos, encontrarás un botón _Docs_ que abrirá un cuadro de documentación. Esta documentación se genera automáticamente y le ayuda a encontrar qué entidades y métodos puede consultar.

Para un nuevo proyecto inicial de SubQuery, puedes probar la siguiente consulta para conocer cómo funciona o [aprender más sobre el lenguaje de consulta GraphQL](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Próximos pasos

Enhorabuena, ahora tiene un proyecto SubQuery que acepta peticiones API GraphQL para datos de muestra. En la siguiente guía, te mostraremos cómo publicar tu nuevo proyecto en [SubQuery Proyects](https://project.subquery.network) y consultarlo usando nuestro [Explorer](https://explorer.subquery.network)

[Publica tu nuevo proyecto en SubQuery Projects](../publish/publish.md)
