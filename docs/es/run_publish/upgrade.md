# Despliega una nueva versión de tu proyecto SubQuery

## Indicaciones

Aunque siempre tienes la libertad de actualizar e implementar nuevas versiones de tu proyecto SubQuery, por favor tenga en cuenta durante este proceso si su proyecto SubQuery es público para el mundo. Algunos puntos clave a tener en cuenta:

- Si su actualización es un cambio de ruptura, cree un nuevo proyecto (p. ej. `Mi SubQuery Project V2`) o advierte a tu comunidad de los cambios a través de los canales de las redes sociales.
- El despliegue de una nueva versión del proyecto SubQuery causa algún tiempo de inactividad a medida que la nueva versión indexa la cadena completa del bloque de génesis.

## Desplegar Cambios

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Validación final de los cambios en su SubQuery Project en un entorno separado. La ranura de staging (montaje) tiene una URL diferente a la de producción que puedes usar en tus dApps.
- Calentando e indexando datos para un proyecto actualizado de SubQuery para eliminar los tiempos de inactividad en tu dApp
- Preparando una nueva versión para su SubQuery Project sin exponerla públicamente. El espacio para escenarios no se muestra al público en el explorador y tiene una URL única que solo es visible para usted.

![Staging slot](/assets/img/staging_slot.png)

Rellena el Hash de Compromiso desde GitHub (copia el hash de commit completo) de la versión de tu proyecto de SubQuery código base que quieras desplegar. Esto causará un tiempo de inactividad más largo dependiendo del tiempo que tarda en indexar la cadena actual. Siempre puede reportar aquí para que avance.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Siguiente paso - Conecta a tu proyecto

Una vez que el despliegue se ha completado correctamente y nuestros nodos han indexado sus datos de la cadena, podrás conectarte a tu proyecto a través del punto final de la Consulta mostrada en GraphQL.

![Proyecto en despliegue y sincronización](/assets/img/projects-deploy-sync.png)

Alternativamente, puedes hacer clic en los tres puntos al lado del título de tu proyecto, y verlo en SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
