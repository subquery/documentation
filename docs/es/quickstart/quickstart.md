# 1. Crear un nuevo proyecto

El objetivo de esta guía de inicio rápido es proporcionarte una configuración de desarrollo completa y pasos guiados para crear tu primer proyecto de cadena de bloques de SubQuery. Está dirigido a desarrolladores experimentados hasta aquellos que acaban de comenzar su viaje en blockchain.

Esta guía de inicio rápido debería tardar unos 10-15 minutos.

Después de completar esta guía de inicio rápido, tendrá un proyecto de SubQuery que funcionará en un nodo de SubQuery. You will be able to adapt the standard starter project and index transfers from your favourite blockchain network such as Polkadot, Avalanche, Cosmos, etc.

Vamos a comenzar el proceso de creación de tu primer proyecto de cadena de bloques de SubQuery.

## Prerrequisitos

Antes de comenzar a crear su primer proyecto de blockchain con SubQuery, asegúrese de haber instalado las aplicaciones de software de soporte requeridas. Estos son:

- [Node](https://nodejs.org/en/): Una instalación moderna (por ejemplo, la versión LTS) de Node.
- [Docker](https://docker.com/): This tutorial will use the required Docker.

Ahora, todos están listos para comenzar con el primer paso, que es la instalación de SubQuery CLI.

## 1. Instalar SubQuery CLI

Instalar SubQuery CLI globalmente en tu terminal usando Yarn o NPM:

```shell
# NPM
npm install -g @subql/cli
```

::: danger We **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. Esto puede llevar a múltiples errores. :::

Eche un vistazo a todos los comandos disponibles y su uso. Ejecuta el comando indicado a continuación en el CLI:

```shell
subql help
```

## 2. Inicializar el proyecto starter de SubQuery

Ejecute el siguiente comando dentro del directorio que desea crear un proyecto SubQuery:

```shell
subql init
```

::: warning Important

**For Cosmos Users**

Cosmos aún no está soportado en la CLI de SubQuery (`subql`). Hence, if you are using Cosmos, you must start with a Juno clone or fork this [starter project](https://github.com/subquery/cosmos-subql-starter).

To initialise your project with Cosmos, refer to these 4 steps shown in this [link](https://github.com/subquery/juno-subql-starter#readme). Once you complete these 4 steps, **jump** to the [Make Changes to Your Project](../quickstart/quickstart.md#_3-make-changes-to-your-project) section. :::

Se le harán ciertas preguntas mientras avance:

- **Project name**: A project name for your SubQuery project.
- **Familia de redes**: La familia de redes de blockchain de capa 1 que indexará este proyecto de SubQuery. Utilice las teclas de flecha para seleccionar las opciones disponibles. Por ejemplo, Polkadot, Avalanche, Cosmos o cualquier otra red soportada.
- **Red**: La red específica que indexará este proyecto de Subconsulta. Utilice las teclas de flecha para seleccionar las opciones disponibles. Por ejemplo, Polkadot, Avalanche o cualquier otra red soportada.
- **Proyecto de plantilla**: Seleccione un proyecto de plantilla de subconsulta que proporcionará un punto de partida en el desarrollo. Sugerimos seleccionar el proyecto _"subql-starter"_.
- **endpoint RPC**: Proporcione una URL HTTPS a un endpoint RPC en ejecución, que se utilizará por defecto para este proyecto. Puede acceder rápidamente a los extremos públicos de diferentes redes, crea tu propio nodo privado dedicado usando [OnFinality](https://app.onfinality.io)o simplemente usa el punto final por defecto. Este nodo RPC debe ser un nodo de archivo (tienen el estado completo de cadena). Utilizaremos el valor por defecto para esta guía. Basado en la red que ha elegido, el valor por defecto puede ser:
  - For Polkadot - _"https://polkadot.api.onfinality.io"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io"_,
  - Para Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ y también para otras redes. <br/>
- **Repositorio Git**: Proporcione una URL Git a un repositorio en el que este proyecto de SubQuery será alojado (cuando esté alojado en SubQuery Explorer) o acepte el valor predeterminado proporcionado.
- **Autores**: Introduzca el propietario de este proyecto de SubQuery aquí (por ejemplo, su nombre!) o acepte el valor predeterminado proporcionado.
- **Descripción**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, o aceptar el predeterminado proporcionado.
- **Version**: Enter a custom version number or use the default (`1.0.0`).
- **License**: Provide the software license for this project or accept the default (`MIT`).

Veamos un ejemplo:

```shell
$ subql init
Nombre del proyecto [subql-starter]: HelloWorld
? ¿Seleccionar una familia de red de Substrate
? ¿Seleccionar una red Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

Después de completar el proceso de inicialización, verá una carpeta con el nombre de su proyecto creado dentro del directorio. Tenga en cuenta que el contenido de este directorio debe ser idéntico a lo que se muestra en la [estructura de directorio](../build/introduction.md#directory-structure).

Finalmente, ejecute el siguiente comando para instalar las dependencias del nuevo proyecto desde el directorio del nuevo proyecto.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Personalicemos ahora el proyecto de plantilla estándar para un blockchain específico de interés.

Puede que desee referirse a los [argumentos de línea de comandos](../run_publish/references.md) utilizados en SubQuery. Te ayudará a entender mejor los comandos.

## 3. Haz cambios a tu proyecto

Hay 3 archivos importantes que necesitan ser modificados. These are:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.yaml`.
3. The Mapping functions in `src/mappings/` directory.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under 2. Specific Chains and continue the quick start guide.