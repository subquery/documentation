# Publiez votre projet SubQuery

## Avantages de l'hébergement de votre projet avec SubQuery
- Nous exécutons vos projets SubQuery dans un service public performant, évolutif et géré
- Ce service est fourni gratuitement à la communauté !
- Vous pouvez rendre vos projets publics afin qu'ils soient répertoriés dans le [SubQuery Explorer](https://explorer.subquery.network) et que n'importe qui dans le monde puisse les voir
- Nous sommes intégrés à GitHub, de sorte que toute personne faisant partie de vos organisations GitHub pourra consulter les projets partagés de l'organisation

## Créez votre premier projet

#### Connexion à SubQuery Projects

Avant de commencer, veuillez vous assurer que votre projet SubQuery est en ligne dans un dépôt GitHub public. Le fichier `schema.graphql` doit se trouver à la racine de votre répertoire.

Pour créer votre premier projet, rendez-vous sur [projet.subquery.network](https://project.subquery.network). Vous devrez vous authentifier avec votre compte GitHub pour vous connecter.

Lors de la première connexion, il vous sera demandé d'autoriser SubQuery. Nous n'avons besoin de votre adresse électronique que pour identifier votre compte, et nous n'utilisons aucune autre donnée de votre compte GitHub pour d'autres raisons. Dans cette étape, vous pouvez également demander ou accorder l'accès à votre compte d'organisation GitHub afin de pouvoir publier des projets SubQuery sous votre organisation GitHub plutôt que sous votre compte personnel.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects est l'endroit où vous gérez tous vos projets hébergés téléchargés sur la plateforme SubQuery. Vous pouvez créer, supprimer et même mettre à niveau des projets à partir de cette application.

![Projects Login](/assets/img/projects-dashboard.png)

Si vous avez un compte d'organisation GitHub connecté, vous pouvez utiliser le commutateur dans l'en-tête pour passer de votre compte personnel à votre compte d'organisation GitHub. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation GitHub. Pour connecter votre compte d'organisation GitHub, vous pouvez [suivre les étapes ici](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

#### Créez votre premier projet

Commençons par cliquer sur "Créer un projet". Vous serez dirigé vers le formulaire Nouveau projet. Veuillez saisir les informations suivantes (vous pourrez les modifier ultérieurement) :
- **Compte GitHub:** Si vous avez plus d'un compte GitHub, sélectionnez sous quel compte ce projet sera créé. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation.
- **Nom**
- **Sous-titre**
- **Description**
- **L'URL du dépôt GitHub:** Il doit s'agir d'une URL GitHub valide vers un dépôt public qui contient votre projet SubQuery. Le fichier `schema.graphql` doit se trouver à la racine de votre répertoire ([en savoir plus sur la structure des répertoires](../create/introduction.md#directory-structure)).
- **Masquer le projet:** Si cette option est sélectionnée, cela masquera le projet de l'explorateur public de SubQuery. Laissez cette option non sélectionnée si vous souhaitez partager avec la communauté SubQuery ! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. *We're almost there! We just need to deploy a new version of it.*

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:
- **Commit Hash of new Version:** From GitHub, copy the full commit hash of the version of your SubQuery project codebase that you want deployed
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Next Steps - Connect to your Project
Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![Projet en cours de déploiement et de synchronisation](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points situés à côté du titre de votre projet, et le visualiser dans l'explorateur de SubQuery. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![Projets dans l'explorateur de SubQuery](/assets/img/projects-explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled *Authorize SubQuery* where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
