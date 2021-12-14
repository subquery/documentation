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

![Révoquer l'approbation d'un compte GitHub](/assets/img/project_auth_request.png)

SubQuery Projects est l'endroit où vous gérez tous vos projets hébergés téléchargés sur la plateforme SubQuery. Vous pouvez créer, supprimer et même mettre à niveau des projets à partir de cette application.

![Connexion aux projets](/assets/img/projects-dashboard.png)

Si vous avez un compte d'organisation GitHub connecté, vous pouvez utiliser le commutateur dans l'en-tête pour passer de votre compte personnel à votre compte d'organisation GitHub. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation GitHub. Pour connecter votre compte d'organisation GitHub, vous pouvez [suivre les étapes ici](#add-github-organization-account-to-subquery-projects).

![Changer de compte GitHub](/assets/img/projects-account-switcher.png)

#### Créez votre premier projet

Commençons par cliquer sur "Créer un projet". Vous serez dirigé vers le formulaire Nouveau projet. Veuillez saisir les informations suivantes (vous pourrez les modifier ultérieurement) :
- **Compte GitHub:** Si vous avez plus d'un compte GitHub, sélectionnez sous quel compte ce projet sera créé. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation.
- **Nom**
- **Sous-titre**
- **Description**
- **L'URL du dépôt GitHub:** Il doit s'agir d'une URL GitHub valide vers un dépôt public qui contient votre projet SubQuery. Le fichier `schema.graphql` doit se trouver à la racine de votre répertoire ([en savoir plus sur la structure des répertoires](../create/introduction.md#directory-structure)).
- **Masquer le projet:** Si cette option est sélectionnée, cela masquera le projet de l'explorateur public de SubQuery. Laissez cette option non sélectionnée si vous souhaitez partager avec la communauté SubQuery ! ![Créez votre premier projet](/assets/img/projects-create.png)

Créez votre projet et vous le verrez dans la liste de vos projets de SubQuery. *Nous y sommes presque ! Nous avons juste besoin de déployer une nouvelle version de celui-ci. *

![Projet créé sans déploiement](/assets/img/projects-no-deployment.png)

#### Déployer votre première version

Bien que la création d'un projet configure le comportement d'affichage du projet, vous devez déployer une version de celui-ci avant qu'il ne devienne opérationnel. Le déploiement d'une version déclenche le démarrage d'une nouvelle opération d'indexation SubQuery et configure le service de requête requis pour commencer à accepter les requêtes GraphQL. Vous pouvez également déployer de nouvelles versions dans des projets existants ici.

Avec votre nouveau projet, vous verrez un bouton Déployer une nouvelle version. Cliquez sur ce bouton, et remplissez les informations requises sur le déploiement :
- **Commit Hash de la nouvelle version:** Depuis GitHub, copiez le commit hash complet de la version de la base de code de votre projet SubQuery que vous souhaitez déployer
- **Version de l'indexeur:** Il s'agit de la version du service de nœud de SubQuery sur laquelle vous souhaitez exécuter cette SubQuery. Voir [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Version de la requête:** Il s'agit de la version du service de requête de SubQuery sur laquelle vous souhaitez exécuter cette SubQuery. Voir [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Déployer votre premier projet](https://static.subquery.network/media/projects/projects-first-deployment.png)

Si le déploiement est réussi, vous verrez l'indexeur commencer à travailler et rapporter la progression de l'indexation de la chaîne actuelle. Ce processus peut prendre du temps jusqu'à ce qu'il atteigne 100%.

## Étapes suivantes - Connexion à votre projet
Une fois que votre déploiement a été effectué avec succès et que nos nœuds ont indexé vos données de la chaîne, vous pourrez vous connecter à votre projet via le point de terminaison GraphQL Query affiché.

![Projet en cours de déploiement et de synchronisation](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points situés à côté du titre de votre projet, et le visualiser dans l'explorateur de SubQuery. Là, vous pouvez utiliser le playground dans le navigateur pour commencer - [lire plus sur la façon d'utiliser notre Explorer ici](../query/query.md).

![Projets dans l'explorateur de SubQuery](/assets/img/projects-explorer.png)

## Ajout d'un compte d'organisation GitHub aux projets de SubQuery

Il est courant de publier votre projet SubQuery sous le nom de votre compte d'organisation GitHub plutôt que sous votre compte GitHub personnel. À tout moment, vous pouvez changer le compte actuellement sélectionné sur [ SubQuery Projects](https://project.subquery.network) en utilisant le switch de compte.

![Changer de compte GitHub](/assets/img/projects-account-switcher.png)

Si votre compte d'organisation GitHub n'apparaît pas dans le sélecteur, il se peut que vous deviez accorder l'accès à SubQuery à votre organisation GitHub (ou le demander à un administrateur). Pour ce faire, vous devez d'abord révoquer les autorisations de votre compte GitHub pour l'application SubQuery. Pour ce faire, connectez-vous aux paramètres de votre compte dans GitHub, allez dans Applications, et sous l'onglet Apps OAuth autorisées, révoquez SubQuery - [vous pouvez suivre les étapes exactes ici](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Ne vous inquiétez pas, cela ne supprimera pas votre projet SubQuery et vous ne perdrez aucune donnée.**

![Révoquer l'accès au compte GitHub](/assets/img/project_auth_revoke.png)

Une fois que vous avez révoqué l'accès, déconnectez-vous de [SubQuery Projects](https://project.subquery.network) et reconnectez-vous. Vous devriez être redirigé vers une page intitulée *Autoriser SubQuery* où vous pouvez demander ou accorder l'accès à SubQuery à votre compte d'organisation GitHub. Si vous n'avez pas les droits d'administrateur, vous devez demander à un administrateur de l'activer pour vous.

![Révoquer l'approbation d'un compte GitHub](/assets/img/project_auth_request.png)

Une fois que cette demande a été approuvée par votre administrateur (ou si vous êtes en mesure de l'accorder vous-même), vous verrez le compte d'organisation GitHub correct dans le switch de compte.
