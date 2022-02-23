# Hello World expliqué

Dans le [guide de démarrage rapide de Hello World](helloworld-localhost.md), nous avons parcouru quelques commandes simples et obtenu très rapidement un exemple opérationnel. Cela vous a permis de vous assurer que vous aviez tous les prérequis en place et que vous pouviez utiliser un terrain de jeu local pour faire une requête simple afin d'obtenir vos premières données de SubQuery. Ici, nous examinons de plus près la signification de toutes ces commandes.

## subql init

The first command we ran was `subql init subqlHelloWorld`.

Elle fait le gros du travail et crée tout un tas de fichiers pour vous. Comme indiqué dans la [documentation officielle](quickstart.md#configure-and-build-the-starter-project), vous allez principalement travailler sur les fichiers suivants :

- Le manifeste dans `project.yaml`
- Le schéma GraphQL dans `schema.graphql`
- Les fonctions de mappage dans le répertoire `src/mappings/`

![key subql files](/assets/img/main_subql_files.png)

Ces fichiers sont le cœur de tout ce que nous faisons. En tant que tel, nous consacrerons plus de temps à ces fichiers dans un autre article. Pour l'instant, sachez simplement que le schéma contient une description des données que les utilisateurs peuvent demander à l'API SubQuery, le fichier yaml du projet qui contient les paramètres de type "configuration" et bien sûr le fichier mappingHandlers contenant le typescript qui contient les fonctions qui transforment les données.

## yarn install

La prochaine chose que nous avons faite est `yarn install`. `npm install` peut également être utilisé.

> Une petite leçon d'histoire. Node Package Manager ou npm a été initialement publié en 2010 et est un gestionnaire de paquets extrêmement populaire parmi les développeurs JavaScript. C'est le paquet par défaut qui est automatiquement installé lorsque vous installez Node.js sur votre système. Yarn a été initialement publié par Facebook en 2016 avec l'intention de remédier à certains des défauts de performance et de sécurité du travail avec npm (à l'époque).

Le rôle de Yarn consiste à examiner le fichier `package.json` et à télécharger diverses autres dépendances. En regardant le fichier `package.json`, il ne semble pas y avoir beaucoup de dépendances, mais lorsque vous exécutez la commande, vous remarquerez que 18 983 fichiers sont ajoutés. Cela est dû au fait que chaque dépendance aura également ses propres dépendances.

![key subql files](/assets/img/dependencies.png)

## yarn codegen

Nous avons ensuite lancé `yarn codegen` ou `npm run-script codegen`. Cette opération permet de récupérer le schéma GraphQL (dans le fichier `schema.graphql`) et de générer les fichiers modèles typescript associés (les fichiers de sortie auront donc une extension .ts). Vous ne devez jamais modifier aucun de ces fichiers générés, mais seulement le fichier source `schema.graphql`.

![key subql files](/assets/img/typescript.png)

## yarn build

`yarn build` ou `npm run-script build` est ensuite exécuté. Cela devrait être familier pour les programmeurs expérimentés. Elle crée un dossier de distribution en effectuant des opérations telles que l'optimisation du code en vue d'un déploiement.

![key subql files](/assets/img/distribution_folder.png)

## docker-compose

L'étape finale est la commande docker combinée `docker-compose pull && docker-compose up` (qui peut également être exécutée séparément). La commande `pull` récupère toutes les images requises depuis Docker Hub et la commande `up` démarre le conteneur.

```shell
> docker-compose pull
Pulling postgres        ... done
Pulling subquery-node   ... done
Pulling graphql-engine  ... done
```

Lorsque le conteneur est démarré, vous verrez le terminal cracher beaucoup de texte montrant l'état du nœud et du moteur GraphQL. C'est lorsque vous voyez :

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

que vous savez que le nœud SubQuery a commencé à se synchroniser.

## Résumé

Maintenant que vous avez eu un aperçu de ce qui se passe sous la couverture, la question est de savoir où aller à partir de maintenant ? Si vous vous sentez en confiance, vous pouvez passer à l'apprentissage de la [création d'un projet](../create/introduction.md) et en apprendre davantage sur les trois fichiers clés. Le fichier manifeste, le schéma GraphQL et le fichier de mapping.

Sinon, continuez à consulter notre section de didacticiels où nous verrons comment exécuter l'exemple Hello World sur l'infrastructure hébergée de SubQuery, nous verrons comment modifier le bloc de démarrage et nous approfondirons l'exécution des projets SubQuery en exécutant des projets facilement disponibles et open source.
