# Publiez votre projet SubQuery

## Avantages de l'hébergement de votre projet avec SubQuery

- Nous exécutons vos projets SubQuery dans un service public performant, évolutif et géré
- Ce service est fourni gratuitement à la communauté !
- Vous pouvez rendre vos projets publics afin qu'ils soient répertoriés dans le [SubQuery Explorer](https://explorer.subquery.network) et que n'importe qui dans le monde puisse les voir
- Nous sommes intégrés à GitHub, de sorte que toute personne faisant partie de vos organisations GitHub pourra consulter les projets partagés de l'organisation

## Créez votre premier projet

### Hébergement de code du projet

Il y a deux façons d'héberger la base de code de votre projet SubQuery avant de publier.

**GitHub**: La base de code de votre projet doit être dans un dépôt GitHub public

**IPFS**: la base de code de votre projet peut être stockée dans IPFS, vous pouvez suivre notre guide d'hébergement IPFS pour voir comment [publier pour la première fois sur IPFS](ipfs.md)

### Connectez-vous à SubQuery Projects

Avant de commencer, veuillez vous assurer que votre projet SubQuery est en ligne dans un dépôt GitHub public. Le fichier `schema.graphql` doit se trouver à la racine de votre répertoire.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Vous devrez vous authentifier avec votre compte GitHub pour vous connecter.

Lors de la première connexion, il vous sera demandé d'autoriser SubQuery. Nous n'avons besoin de votre adresse électronique que pour identifier votre compte, et nous n'utilisons aucune autre donnée de votre compte GitHub pour d'autres raisons. À cette étape, vous pouvez également demander ou accorder l'accès à votre compte d'organisation GitHub afin de pouvoir publier des projets SubQuery sous votre organisation GitHub plutôt que sous votre compte personnel.

![Révoquer l'approbation d'un compte GitHub](/assets/img/project_auth_request.png)

SubQuery Projects est l'endroit où vous gérez tous vos projets hébergés téléchargés sur la plateforme SubQuery. Vous pouvez créer, supprimer et même mettre à niveau des projets à partir de cette application.

![Connexion aux projets](/assets/img/projects-dashboard.png)

Si vous avez un compte d'organisation GitHub connecté, vous pouvez utiliser le commutateur situé dans l'en-tête pour passer de votre compte personnel à votre compte d'organisation GitHub. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation GitHub. Pour connecter votre compte d'organisation GitHub, vous pouvez suivre [les étapes suivantes](#add-github-organization-account-to-subquery-projects).

![Passer d'un compte GitHub à un autre](/assets/img/projects-account-switcher.png)

### Créez votre premier projet

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **Compte GitHub:** Si vous avez plus d'un compte GitHub, sélectionnez sous quel compte ce projet sera créé. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation.
- **Nom du projet**
- **Sous-titre**
- **Description**
- **L'URL du dépôt GitHub:** Il doit s'agir d'une URL GitHub valide vers un dépôt public qui contient votre projet SubQuery. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Base de données :** Les clients Premium peuvent accéder à des bases de données dédiées pour héberger des projets de SubQuery de production. Si cela vous intéresse, vous pouvez contacter [sales@subquery.network](mailto:sales@subquery.network) pour activer ce paramètre.
- **Source de déploiement :** Vous pouvez choisir de faire déployer le projet depuis le dépôt GitHub ou de le déployer alternativement depuis un CID IPFS, voir notre guide sur [l'hébergement avec IPFS.](ipfs.md)
- **Masquer le projet :** Si cette option est sélectionnée, le projet sera masqué dans l'explorateur public SubQuery. Ne sélectionnez pas cette option si vous souhaitez partager votre SubQuery avec la communauté ! ![Créez votre premier projet](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN]() ready.

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

### Deploy your First Version

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

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

## Étapes suivantes - Connexion à votre projet

Une fois que votre déploiement a été effectué avec succès et que nos nœuds ont indexé vos données depuis chaîne, vous pourrez vous connecter à votre projet via le point de terminaison GraphQL Query affiché.

![Projet en cours de déploiement et de synchronisation](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points situés à côté du titre de votre projet, et le visualiser dans l'explorateur de SubQuery. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Ajout d'un compte d'organisation GitHub aux projets de SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Passer d'un compte GitHub à un autre](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Révoquer l'approbation d'un compte GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
