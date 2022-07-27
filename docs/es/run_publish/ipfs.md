# Alojando un proyecto usando IPFS

Esta guía trabaja a través de cómo publicar un proyecto local de SubQuery en [IPFS](https://ipfs.io/) e implementarlo en nuestra infraestructura de alojamiento.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Requisitos

- `@subql/cli` versión 0.21.0 o superior.
- Manifiesto `specVersion` 0.2.0 o superior.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Para asegurarse de que su despliegue sea exitoso, le recomendamos que construya su proyecto con el comando `subql build`, y pruébalo localmente antes de publicar.

## Prepara tu SUBQL_ACCESS_TOKEN

- Paso 1: Vaya a [Proyectos de Subconsulta](https://project.subquery.network/) e inicie sesión.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Paso 3: Copie el token generado.
- Paso 4: Para usar este token:
  - Opción 1: Añada SUBQL_ACCESS_TOKEN en sus variables de entorno. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Opción 2: Muy pronto, `subql/cli` soportará almacenar su SUBQL_ACCESS_TOKEN localmente.

## Cómo publicar un proyecto

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2

Alternativamente, supongamos que tu proyecto tiene múltiples archivos de manifiesto, por ejemplo soporta múltiples redes pero comparte el mismo mapeo y lógica de negocio, y tiene una estructura de proyecto como sigue:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Siempre puede publicar el proyecto con el archivo manifest seleccionado.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## Después de publicar

Después de publicar correctamente el proyecto, los siguientes registros indican que el proyecto fue creado en el clúster IPFS y han devuelto su `CID` (identificador de contenido).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Tenga en cuenta este `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named  `.project-cid`.

## Despliegue IPFS

El despliegue IPFS representa una existencia independiente y única de un proyecto SubQuery en una red descentralizada. Por lo tanto, cualquier cambio con el código del proyecto afectará a su singularidad. Si necesitas ajustar la lógica de tu negocio, por ejemplo, cambiar la función de mapeo, debes volver a publicar el proyecto y el `CID` cambiará.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

Este despliegue se parece mucho a su archivo manifiesto. Puedes esperar esos campos descriptivos, y se ha eliminado el punto final de red y diccionario, ya que no afectaron directamente al resultado de la ejecución del proyecto.

Esos archivos han sido utilizados en su proyecto local y han sido empaquetados y publicados también en IPFS.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
```

## Ejecutar su proyecto de SubQuery en Servicio Hosted

### Crear proyecto con implementación IPFS

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

A continuación, elija su ranura de producción, copie y pegue el CID de despliegue de IPFS (sin el principal `ipfs://`).

Debería ver el despliegue IPFS en la sección de vista previa. Y puede seleccionar la red, los puntos finales del diccionario, etc.

Después de implementar con éxito el despliegue IPFS en nuestro servicio alojado, debería estar disponible para ver en SubQuery Explorer, puede acceder al servicio de consultas como lo hace localmente.
