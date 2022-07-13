# Publica tu proyecto de SubQuery

## Beneficios de alojar tu proyecto con SubQuery

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- ¡Este servicio está siendo proporcionado a la comunidad gratis!
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## Crea tu primer proyecto en SubQuery Projects

### Alojamiento del código de proyecto

Hay dos maneras de alojar el código base de su proyecto SubQuery antes de publicarlo.

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](../run_publish/ipfs.md).

### Iniciar sesión en los proyectos de SubQuery

Antes de comenzar, asegúrese de que su proyecto SubQuery está en línea en un repositorio público de GitHub. El archivo `schema.graphql` debe estar en la raíz de su directorio.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Necesitarás autenticarte con tu cuenta de GitHub para iniciar sesión.

En el primer inicio de sesión, se le pedirá que autorice SubQuery. Sólo necesitamos tu dirección de correo electrónico para identificar tu cuenta, y no utilizamos ningún otro dato de tu cuenta de GitHub por otras razones. En este paso, también puedes solicitar o conceder acceso a tu cuenta de la Organización de GitHub para que puedas publicar proyectos de SubQuery bajo tu Organización de GitHub en lugar de tu cuenta personal.

![Revocar la aprobación de una cuenta de GitHub](/assets/img/project_auth_request.png)

SubQuery Projects es donde administras todos los proyectos alojados subidos a la plataforma SubQuery. Puede crear, eliminar e incluso actualizar proyectos desde esta aplicación.

![Inicio de sesión de proyectos](/assets/img/projects-dashboard.png)

Si tiene una cuenta de la organización de GitHub conectada, puedes usar el interruptor de la cabecera para cambiar entre tu cuenta personal y tu cuenta de la organización de GitHub. Los proyectos creados en una cuenta de la organización de GitHub son compartidos entre los miembros de esa organización de GitHub. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Cambiar entre cuentas de GitHub](/assets/img/projects-account-switcher.png)

### Create Your First Project

Hay dos métodos para crear un proyecto en SubQuery Managed Service, puedes usar la interfaz de usuario o directamente a través de la herramienta de cli `subql`.

#### Usando la interfaz de usuario

Empecemos haciendo clic en "Crear proyecto". Serás llevado al formulario de Proyecto Nuevo. Por favor, introduzca lo siguiente (puede cambiar esto en el futuro):

- **Cuenta de GitHub:** Si tienes más de una cuenta de GitHub, selecciona la cuenta bajo la que se creará este proyecto. Los proyectos creados en una cuenta de la organización de GitHub son compartidos entre los miembros de esa organización de GitHub.
- **Nombre del proyecto**
- **Subtítulo**
- **Descripción**
- **URL del repositorio de GitHub:** Esta debe ser una URL válida de GitHub para un repositorio público que contiene su proyecto de SubQuery. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Base de datos:** Los clientes Premium pueden acceder a bases de datos dedicadas para albergar proyectos de subquery de producción. Si esto le interesa, puede ponerse en contacto con [sales@subquery.network](mailto:sales@subquery.network) para activar esta configuración.
- **Fuente de despliegue** Puede elegir tener el proyecto desplegado desde el repositorio de GitHub o desplegado alternativamente desde un CID IPFS, vea nuestra guía sobre [alojamiento con IPFS.](ipfs.md)
- **Ocultar proyecto:** Si se selecciona, esto ocultará el proyecto del explorador público de SubQuery. ¡Mantén esta opción sin seleccionar si quieres compartir tu SubQuery con la comunidad!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Usando la interfaz de usuario

You can also use `@subql/cli` to publish your project to our managed service. Esto requiere:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Desplegar tu primera versión

Hay dos métodos para desplegar una nueva versión de su proyecto en el Servicio Administrado de SubQuery, puedes usar la interfaz de usuario o directamente a través de la herramienta de cli `subql`.

#### Usando la interfaz de usuario

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Versión del indexador:** Esta es la versión del servicio de nodos de SubQuery en la que desea ejecutar esta SubQuery. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Versión de consulta:** Esta es la versión del servicio de consulta de SubQuery en la que desea ejecutar esta SubQuery. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Usando la interfaz de usuario

También puede utilizar `@subql/cli` para crear un nuevo despliegue de su proyecto en nuestro servicio administrado. Esto requiere:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## Siguiente paso - Conecta a tu proyecto

Una vez que el despliegue se ha completado correctamente y nuestros nodos han indexado sus datos de la cadena, podrás conectarte a tu proyecto a través del punto final de la Consulta mostrada en GraphQL.

![Proyecto en despliegue y sincronización](/assets/img/projects-deploy-sync.png)

Alternativamente, puedes hacer clic en los tres puntos al lado del título de tu proyecto, y verlo en SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Añadir cuenta de la organización de GitHub a SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Cambiar entre cuentas de GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revocar la aprobación de una cuenta de GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
