# Alojando un proyecto usando IPFS

Esta guía trabaja a través de cómo publicar un proyecto local de SubQuery en [IPFS](https://ipfs.io/) e implementarlo en nuestra infraestructura de alojamiento.

Hospedar un proyecto en IPFS lo pone a disposición de todos y reduce su confianza en servicios centralizados como GitHub.

## Requisitos

- `@subql/cli` versión 0.21.0 o superior.
- Manifiesto `specVersion` 0.2.0 o superior.
- Prepara tu [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token).
- Para asegurarse de que su despliegue sea exitoso, le recomendamos que construya su proyecto con el comando `subql build`, y pruébalo localmente antes de publicar.

## Prepara tu SUBQL_ACCESS_TOKEN

- Paso 1: Vaya a [Proyectos de SubQuery](https://project.subquery.network/) e inicie sesión.
- Paso 2: Haga clic en su perfil en la parte superior derecha del menú de navegación, luego haga clic en **_Actualizar token_**
- Paso 3: Copie el token generado.
- Paso 4: Para usar este token:
  - Opción 1: Añada SUBQL_ACCESS_TOKEN en sus variables de entorno. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Opción 2: Muy pronto, `subql/cli` soportará almacenar su SUBQL_ACCESS_TOKEN localmente.

## Cómo publicar un proyecto

Proporcionamos dos métodos para publicar su proyecto,

### Opción 1:

Como ya tienes `@subql/cli` instalado, puedes ejecutar el siguiente comando, que leerá el proyecto e información requerida del manifesto de su proyecto predeterminado `project.yaml `

```
// Publicarlo desde el directorio raíz de tu proyecto
subql publish

// O apuntar a la raíz de tu proyecto
subql publish -f ~/my-project/
```

### Opción 2:

Alternativamente, supongamos que tu proyecto tiene múltiples archivos de manifiesto, por ejemplo soporta múltiples redes pero comparte el mismo mapeo y lógica de negocio, y tiene una estructura de proyecto como sigue:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml (Manifest for Kusama network)
...
```

Siempre puede publicar el proyecto con el archivo manifest seleccionado.

```
 # Esto publicará el soporte del proyecto indexando la red Polkadot
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## Después de publicar

Después de publicar correctamente el proyecto, los siguientes registros indican que el proyecto fue creado en el clúster IPFS y han devuelto su `CID` (identificador de contenido).

```
Creando y empaquetando código... hecho
Subiendo proyecto SupQuery a IPFS
SubQuery Project subido a IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkZ8kNd //CID
```

Tenga en cuenta este `CID`. Con este `CID`, puedes ver tu proyecto publicado como lo que llamamos [despliegue IPFS](#ipfs-deployment)

## Despliegue IPFS

El despliegue IPFS representa una existencia independiente y única de un proyecto SubQuery en una red descentralizada. Por lo tanto, cualquier cambio con el código del proyecto afectará a su singularidad. Si necesitas ajustar la lógica de tu negocio, por ejemplo, cambiar la función de mapeo, debes volver a publicar el proyecto y el `CID` cambiará.

Por ahora, para ver el proyecto que has publicado, usa una herramienta api `REST` como [Postman](https://web.postman.co/), y utilice el método `POST` con la siguiente URL de ejemplo para recuperarla. `https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

Deberías ver el ejemplo de despliegue del proyecto como a continuación:

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

Puedes seguir la guía para [Publicar tu proyecto de SubQuery](publish.md) pero donde configuraste tu fuente de despliegue puedes seleccionar **IPFS**.

A continuación, elija su ranura de producción, copie y pegue el CID de despliegue de IPFS (sin el principal `ipfs://`).

Debería ver el despliegue IPFS en la sección de vista previa. Y puede seleccionar la red, los puntos finales del diccionario, etc.

Después de implementar con éxito el despliegue IPFS en nuestro servicio alojado, debería estar disponible para ver en SubQuery Explorer, puede acceder al servicio de consultas como lo hace localmente.
