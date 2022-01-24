# Hello World (hébergé par SubQuery)

Le but de ce démarrage rapide est de montrer comment vous pouvez faire fonctionner un projet par défaut dans SubQuery Projects (notre service géré) en quelques étapes faciles.

Nous allons prendre le projet de démarrage simple (et tout ce que nous avons appris jusqu'à présent) mais au lieu de l'exécuter localement dans Docker, nous allons profiter de l'infrastructure d'hébergement géré de SubQuery. En d'autres termes, nous laissons SubQuery faire le gros du travail, en exécutant et en gérant l'infrastructure de production.

## Objectifs d'apprentissage

À la fin de ce démarrage rapide, vous devriez :

- comprendre les pré-requis nécessaires
- pouvoir héberger un projet dans [SubQuery Projects](https://project.subquery.network/)
- exécuter une requête simple pour obtenir la hauteur de bloc du réseau principal Polkadot en utilisant playground
- exécuter une simple requête GET pour obtenir la hauteur de bloc du réseau principal Polkadot en utilisant cURL

## Public visé

Ce guide s'adresse aux nouveaux développeurs qui ont une certaine expérience du développement et qui souhaitent en savoir plus sur SubQuery.

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Pré-requis

Vous aurez besoin :

- un compte GitHub

## 1. Créez votre projet

Let's create a project called subqlHelloWorld by running `subql init` and selecting to build the project with the `Polkadot` network and initialize the project with the `subql-starter` template. We must run the obligatory install, codegen and build with your favourite package manager.

```shell
> subql init subqlHelloWorld
yarn install
yarn codegen
yarn build
```

N'exécutez PAS les commandes docker.

## 2. Créer un repo GitHub

Dans GitHub, créez un nouveau dépôt public. Donnez un nom et définissez votre visibilité comme publique. Ici, tout est gardé par défaut pour le moment.

![créer un repo github](/assets/img/github_create_new_repo.png)

Prenez note de votre URL GitHub, elle doit être publique pour que SubQuery puisse y accéder.

![créer un repo github](/assets/img/github_repo_url.png)

## 3. Push vers GitHub

De retour dans votre répertoire de projet, initialisez-le comme un répertoire git. Sinon, vous risquez d'obtenir l'erreur "fatal : not a git repository (or any of the parent directories) : .git"

```shell
git init
```

Ensuite, ajoutez un dépôt distant avec la commande :

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

Cette opération consiste à définir votre dépôt distant sur "https://github.com/seandotau/subqlHelloWorld.git" et à lui donner le nom "origin", qui est la nomenclature standard pour un dépôt distant dans GitHub.

Ensuite nous ajoutons le code à notre repo avec les commandes suivantes :

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 12 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (14/14), 59.35 KiB | 8.48 MiB/s, done.
Total 14 (delta 0), reused 0 (delta 0)
To https://github.com/seandotau/subqlHelloWorld.git
 * [new branch]      master -> master

```

La commande push signifie "veuillez pousser mon code vers le repo d'origine A PARTIR de mon repo local maître". Rafraîchir GitHub devrait montrer tout le code dans GitHub.

![Premier commit](/assets/img/first_commit.png)

Maintenant que vous avez placé votre code sur GitHub, voyons comment l'héberger dans SubQuery Projects.

## 4. Créez votre projet

Naviguez vers [https://project.subquery.network](https://project.subquery.network) et connectez-vous avec votre compte GitHub.

![Bienvenue à SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

Créez ensuite un nouveau projet,

![Bienvenue à SubQuery Projects](/assets/img/subquery_create_project.png)

Et remplissez les différents champs avec les détails appropriés.

- **Compte GitHub:** Si vous avez plus d'un compte GitHub, sélectionnez sous quel compte ce projet sera créé. Les projets créés dans un compte d'organisation GitHub sont partagés entre les membres de cette organisation.
- **Nom du projet:** Donnez un nom à votre projet ici.
- **Sous-titre:** Fournissez un sous-titre pour votre projet.
- **Description:** Expliquez ce que fait votre projet SubQuery.
- **L'URL du dépôt GitHub:** Il doit s'agir d'une URL GitHub valide vers un dépôt public qui contient votre projet SubQuery. Le fichier schema.graphql doit se trouver à la racine de votre répertoire.
- **Masquer le projet:** Si cette option est sélectionnée, cela masquera le projet de l'explorateur public de SubQuery. Laissez cette option non sélectionnée si vous souhaitez partager avec la communauté SubQuery !

![Créer des paramètres SubQuery](/assets/img/create_subquery_project_parameters.png)

Lorsque vous cliquez sur créer, vous accédez à votre tableau de bord.

![Tableau de bord du projet SubQuery](/assets/img/subquery_project_dashboard.png)

Le tableau de bord contient de nombreuses informations utiles telles que le réseau qu'il utilise, l'URL du dépôt GitHub du code source qu'il exécute, la date de sa création et de sa dernière mise à jour, et en particulier les détails du déploiement.

## 5. Déployer votre projet

Maintenant que vous avez créé votre projet dans SubQuery Projects, en définissant le comportement d'affichage, l'étape suivante consiste à déployer votre projet pour le rendre opérationnel. Le déploiement d'une version déclenche le démarrage d'une nouvelle opération d'indexation SubQuery et configure le service de requête requis pour commencer à accepter les requêtes GraphQL. Vous pouvez également déployer de nouvelles versions dans des projets existants ici.

Vous pouvez choisir de déployer vers différents environnements tels qu'un emplacement de production ou un emplacement d'étape. Ici, nous allons déployer sur un emplacement de production. En cliquant sur le bouton "Déployer", un écran apparaît avec les champs suivants :

![Déployer vers le slot de production](/assets/img/deploy_production_slot.png)

- **Commit Hash de la nouvelle version:** Depuis GitHub, sélectionnez le commit correct de la base de code du projet SubQuery que vous souhaitez déployer
- **Version de l'indexeur:** Il s'agit de la version du service de nœud de SubQuery sur laquelle vous souhaitez exécuter cette SubQuery. Voir [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Version de la requête:** Il s'agit de la version du service de requête de SubQuery sur laquelle vous souhaitez exécuter cette SubQuery. Voir [@subql/query](https://www.npmjs.com/package/@subql/query)

Comme nous n'avons qu'un seul engagement, il n'y a qu'une seule option dans la liste déroulante. Nous allons également travailler avec la dernière version de l'indexeur et de la version de la requête, nous allons donc accepter les valeurs par défaut et cliquer sur "Deploy Update".

Vous verrez alors votre déploiement en statut "Processing". Ici, votre code est déployé sur l'infrastructure gérée de SubQuery. En fait, un serveur est créé à la demande et est provisionné pour vous. Cela va prendre quelques minutes, alors il est temps de prendre un café !

![Traitement des déploiements](/assets/img/deployment_processing.png)

Le déploiement est maintenant en cours.

![Déploiement en cours](/assets/img/deployment_running.png)

## 6. Tester votre projet

Pour tester votre projet, cliquez sur les 3 ellipses et sélectionnez "View on SubQuery Explorer".

![Visualiser le projet Subquery](/assets/img/view_on_subquery.png)

Vous accédez alors à l'éternel "Playground" où vous pouvez cliquer sur le bouton "play" et voir les résultats de la requête.

![Subquery playground](/assets/img/subquery_playground.png)

## 7. Étape bonus

Pour les plus astucieux d'entre nous, vous vous souviendrez que dans les objectifs d'apprentissage, le dernier point consistait à exécuter une simple requête GET. Pour ce faire, nous devons saisir le "Query Endpoint" affiché dans les détails du déploiement.

![Fin de la requête](/assets/img/query_endpoint.png)

Vous pouvez ensuite envoyer une requête GET à ce point de terminaison soit en utilisant votre client préféré tel que [Postman](https://www.postman.com/) ou [Mockoon](https://mockoon.com/) ou via cURL dans votre terminal. Pour simplifier, cURL sera présenté ci-dessous.

La commande curl à exécuter est :

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

en donnant les résultats de :

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

La lisibilité n'est pas un problème ici, car vous aurez probablement un code frontal pour consommer et analyser cette réponse JSON.

## Résumé

Dans ce démarrage rapide de SubQuery hosted, nous avons montré comment il était rapide et facile de prendre un projet Subql et de le déployer sur [SubQuery Projects](https://project.subquery.network) où toute l'infrastructure est fournie pour votre confort. Il existe playground intégré permettant d'exécuter diverses requêtes, ainsi qu'un point de terminaison API auquel votre code peut s'intégrer.
