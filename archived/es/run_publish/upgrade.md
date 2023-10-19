# Despliega una nueva versión de tu proyecto SubQuery

## Indicaciones

Aunque siempre tienes la libertad de actualizar e implementar nuevas versiones de tu proyecto SubQuery, por favor tenga en cuenta durante este proceso si su proyecto SubQuery es público para el mundo. Algunos puntos clave a tener en cuenta:

- Si su actualización es un cambio de ruptura, cree un nuevo proyecto (p. ej. `Mi SubQuery Project V2`) o advierte a tu comunidad de los cambios a través de los canales de las redes sociales.
- El despliegue de una nueva versión del proyecto SubQuery causa algún tiempo de inactividad a medida que la nueva versión indexa la cadena completa del bloque de génesis.

## Desplegar Cambios

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Usando la interfaz de usuario

Inicie sesión en SubQuery Project y seleccione el proyecto del que desea desplegar una nueva versión. Puede elegir entre desplegar en la zona de producción o de puesta en escena. Estos dos espacios son entornos aislados y cada uno tiene sus propias bases de datos y sincronizan de forma independiente.

Recomendamos desplegar en su puesto de trabajo sólo para las pruebas finales de puesta en escena o cuando necesite resinc los datos de su proyecto. Entonces se puede promover a la producción sin tiempo de inactividad. Encontrarás que probar es más rápido cuando [ejecute un proyecto localmente](../run_publish/run.md) ya que puedes más [depurar fácilmente problemas](../academy/tutorials_examples/debug-projects.md).

La ranura de montaje es perfecta para:

- Validación final de los cambios en su SubQuery Project en un entorno separado. La ranura de staging (montaje) tiene una URL diferente a la de producción que puedes usar en tus dApps.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Preparando una nueva versión para su SubQuery Project sin exponerla públicamente. El espacio para escenarios no se muestra al público en el explorador y tiene una URL única que solo es visible para usted.

![Ranura provisional](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). Esto causará un tiempo de inactividad más largo dependiendo del tiempo que tarda en indexar la cadena actual. Siempre puede reportar aquí para que avance.

### Usando la interfaz de usuario

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Esto requiere:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Puede establecer directamente las versiones de su Indexador y Consulta
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.

// O puedes usar la interfaz, validará su IPFS CID y renderizará una lista de versiones de imágenes que coincidan con su archivo manifest `project. aml`

$ despliegue de subql:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: If you haven't already, create a project on [SubQuery Managed Service](https://managedservice.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery's Managed Service [SubQuery Managed Service](https://managedservice.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Actualizar al último Indexador y Servicio de Consultas

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Siguiente paso - Conecta a tu proyecto

Una vez que el despliegue se ha completado correctamente y nuestros nodos han indexado sus datos de la cadena, podrás conectarte a tu proyecto a través del punto final de la Consulta mostrada en GraphQL.

![Proyecto en despliegue y sincronización](/assets/img/projects_deploy_sync.png)

Alternativamente, puedes hacer clic en los tres puntos al lado del título de tu proyecto, y verlo en SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects_explorer.png)

::: tip Note Learn more about the [GraphQL Query language.](./graphql.md) :::
