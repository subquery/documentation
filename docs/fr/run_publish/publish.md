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

Pour créer votre premier projet, rendez-vous sur [project.subquery.network](https://project.subquery.network). Vous devrez vous authentifier avec votre compte GitHub pour vous connecter.

Lors de la première connexion, il vous sera demandé d'autoriser SubQuery. Nous n'avons besoin de votre adresse électronique que pour identifier votre compte, et nous n'utilisons aucune autre donnée de votre compte GitHub pour d'autres raisons. À cette étape, vous pouvez également demander ou accorder l'accès à votre compte d'organisation GitHub afin de pouvoir publier des projets SubQuery sous votre organisation GitHub plutôt que sous votre compte personnel.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects est l'endroit où vous gérez tous vos projets hébergés téléchargés sur la plateforme SubQuery. Vous pouvez créer, supprimer et même mettre à niveau des projets à partir de cette application.

![Projects Login](/assets/img/projects-dashboard.png)

Si vous avez un compte d'organisation GitHub connecté, vous pouvez utiliser le commutateur situé dans l'en-tête pour passer de votre compte personnel à votre compte d'organisation GitHub. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation GitHub. Pour connecter votre compte d'organisation GitHub, vous pouvez suivre [les étapes suivantes](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Créez votre premier projet

Commençons par cliquer sur "Créer un projet". Le formulaire Nouveau projet s'affiche. Veuillez saisir les informations suivantes (vous pourrez les modifier ultérieurement) :

- **Compte GitHub:** Si vous avez plus d'un compte GitHub, sélectionnez sous quel compte ce projet sera créé. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation.
- **Nom**
- **Sous-titre**
- **Description**
- **L'URL du dépôt GitHub:** Il doit s'agir d'une URL GitHub valide vers un dépôt public qui contient votre projet SubQuery. Le fichier `schema.graphql` doit se trouver à la racine de votre répertoire ([en savoir plus sur la structure des répertoires](../create/introduction.md#directory-structure)).
- **Base de données :** Les clients Premium peuvent accéder à des bases de données dédiées pour héberger des projets de SubQuery de production. Si cela vous intéresse, vous pouvez contacter [sales@subquery.network](mailto:sales@subquery.network) pour activer ce paramètre.
- **Source de déploiement :** Vous pouvez choisir de faire déployer le projet depuis le dépôt GitHub ou de le déployer alternativement depuis un CID IPFS, voir notre guide sur [l'hébergement avec IPFS.](ipfs.md)
- **Masquer le projet :** Si cette option est sélectionnée, le projet sera masqué dans l'explorateur public SubQuery. Ne sélectionnez pas cette option si vous souhaitez partager votre SubQuery avec la communauté ! ![Create your first Project](/assets/img/projects-create.png)

Créez votre projet et vous le verrez dans la liste de vos projets SubQuery. *Nous y sommes presque ! Il ne nous reste plus qu'à en déployer une nouvelle version.*

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Déployez votre première version

Bien que la création d'un projet configure le comportement d'affichage du projet, vous devez déployer une version de celui-ci avant qu'il ne devienne opérationnel. Le déploiement d'une version déclenche le démarrage d'une nouvelle opération d'indexation SubQuery et configure le service de requête requis pour commencer à accepter les requêtes GraphQL. Vous pouvez également déployer de nouvelles versions de projets existants ici.

Dans votre nouveau projet, vous verrez un bouton Déployer une nouvelle version. Cliquez dessus, et remplissez les informations requises pour le déploiement :

- **Commit Hash de la nouvelle version :** Depuis GitHub, copiez le hash complet de la version de la base de code de votre projet SubQuery que vous souhaitez déployer.
- **Commit Hash :** Depuis GitHub, copiez le commit hash complet de la version de la base de code de votre projet SubQuery que vous souhaitez déployer
- **IPFS :** Si vous déployez depuis IPFS, collez votre CID de déploiement IPFS (sans le `ipfs://`)
- **Remplacer les terminaux du réseau et du dictionnaire :** Vous pouvez remplacer les terminaux du manifeste de votre projet ici
- **Version de l'indexeur :** Il s'agit de la version du service de nœud de SubQuery sur lequel vous souhaitez exécuter cette SubQuery. Voir [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Version de la requête :** Il s'agit de la version du service de requête de SubQuery sur laquelle vous souhaitez exécuter cette requête secondaire. Voir [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

Si le déploiement est réussi, vous verrez l'indexeur commencer à travailler et rapporter la progression de l'indexation de la chaîne actuelle. Ce processus peut prendre du temps jusqu'à ce qu'il atteigne 100%.

## Étapes suivantes - Connexion à votre projet

Une fois que votre déploiement a été effectué avec succès et que nos nœuds ont indexé vos données de la chaîne, vous pourrez vous connecter à votre projet via le point de terminaison GraphQL Query affiché.

![Project being deployed and synced](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points à côté du titre de votre projet, et le visualiser sur SubQuery Explorer. Là, vous pouvez utiliser le terrain de jeu du navigateur pour commencer. Pour en [savoir plus sur la façon d'utiliser notre explorateur, cliquez ici](../query/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Ajout d'un compte d'organisation GitHub aux projets de SubQuery

Il est courant de publier votre projet SubQuery sous le nom de votre compte d'organisation GitHub plutôt que sous votre compte GitHub personnel. À tout moment, vous pouvez changer le compte actuellement sélectionné sur [SubQuery Projects](https://project.subquery.network) en utilisant le commutateur de compte.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

Si le compte de votre organisation GitHub n'apparaît pas dans le sélecteur, il se peut que vous deviez accorder l'accès à SubQuery à votre organisation GitHub (ou le demander à un administrateur). Pour ce faire, vous devez d'abord révoquer les autorisations de votre compte GitHub à l'application SubQuery. Pour ce faire, connectez-vous aux paramètres de votre compte dans GitHub, allez dans Applications, et sous l'onglet Apps OAuth autorisées, révoquez SubQuery - [vous pouvez suivre les étapes exactes ici](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Ne vous inquiétez pas, cela ne supprimera pas votre projet SubQuery et vous ne perdrez aucune donnée.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Une fois que vous avez révoqué l'accès, déconnectez-vous de [SubQuery Projects](https://project.subquery.network) et reconnectez-vous. Vous devriez être redirigé vers une page intitulée *Authorize SubQuery* où vous pouvez demander ou accorder à SubQuery l'accès à votre compte d'organisation GitHub. Si vous n'avez pas de droits d'administrateur, vous devez demander à un administrateur de vous accorder cet accès.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Une fois que cette demande a été approuvée par votre administrateur (ou si vous êtes en mesure de l'accorder vous-même), vous verrez le compte d'organisation GitHub correct dans le sélecteur de compte.
