# Exécution de SubQuery en local

Ce guide explique comment exécuter un nœud SubQuery local sur votre infrastructure, qui comprend à la fois l'indexeur et le service de requête. Vous ne voulez pas vous soucier de faire fonctionner votre propre infrastructure SubQuery ? SubQuery fournit gratuitement à la communauté un [service hébergé géré](https://explorer.subquery.network). [Suivez notre guide de publication](../run_publish/publish.md) pour savoir comment télécharger votre projet sur [SubQuery Projects](https://project.subquery.network).

## Utilisation de Docker

Une solution alternative est d'exécuter un <strong>Docker Container</strong>, défini par le fichier `docker-compose.yml`. Pour un nouveau projet qui vient d'être initialisé, vous n'aurez pas besoin de modifier quoi que ce soit ici.

Dans le répertoire du projet, exécutez la commande suivante :

```shell
docker-compose pull && docker-compose up
```

Cela peut prendre un certain temps pour télécharger les paquets requis ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) pour la première fois mais vous verrez bientôt un nœud SubQuery en fonctionnement.

## Exécution d'un indexeur (subql/node)

Conditions requises :

- [Postgres](https://www.postgresql.org/) database (version 12 ou supérieure). Pendant que le [Noeud SubQuery](#start-a-local-subquery-node) indexe la blockchain, les données extraites sont stockées dans une instance de base de données externe.

Un nœud SubQuery est une implémentation qui extrait les données de la blockchain basée sur le substrat par le projet SubQuery et les enregistre dans une base de données Postgres.

### Installation

```shell
# NPM
npm install -g @subql/node
```

Veuillez noter que nous n'encourageons **PAS** l'utilisation de `yarn global` en raison de sa mauvaise gestion des dépendances qui peut entraîner des erreurs en cours de route.

Une fois installé, vous pouvez démarrer un nœud avec la commande suivante :

```shell
subql-node <command>
```

### Commandes clés

Les commandes suivantes vous aideront à compléter la configuration d'un nœud SubQuery et à commencer l'indexation. Pour en savoir plus, vous pouvez toujours exécuter `--help`.

#### Pointer vers le chemin local du projet

```
subql-node -f your-project-path
```

#### Utilisez un dictionnaire

L'utilisation d'un dictionnaire de chaîne complet peut accélérer considérablement le traitement d'un projet SubQuery pendant les tests ou lors de votre premier index. Dans certains cas, nous avons constaté une augmentation des performances d'indexation allant jusqu'à 10x.

Un dictionnaire de chaîne complète pré-indexe l'emplacement de tous les événements et extrinsèques dans la chaîne spécifique et permet à votre service de nœud de sauter aux emplacements pertinents lors de l'indexation plutôt que d'inspecter chaque bloc.

Vous pouvez ajouter le point de terminaison du dictionnaire dans votre fichier `project.yaml` (voir [Fichier manifeste](../create/manifest.md)), ou le spécifier au moment de l'exécution à l'aide de la commande suivante :

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[En savoir plus sur le fonctionnement d'un dictionnaire de SubQuery](../academy/tutorials_examples/dictionary.md).

#### Connexion à la base de données

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

En fonction de la configuration de votre base de données Postgres (par exemple, un mot de passe différent), assurez-vous également que l'indexeur (`subql/node`) et le service de requête (`subql/query`) peuvent établir une connexion avec celle-ci.

#### Spécifier un fichier de configuration

```
subql-node -c your-project-config.yml
```

Le nœud de requête sera dirigé vers un fichier de configuration qui peut être au format YAML ou JSON. Regardez l'exemple ci-dessous.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Modifier la taille du lot de récupération des blocs

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Lorsque l'indexeur indexe la chaîne pour la première fois, l'extraction de blocs individuels réduit considérablement les performances. L'augmentation de la taille du lot pour ajuster le nombre de blocs récupérés réduira le temps de traitement global. La taille actuelle du lot par défaut est de 100.

#### Exécution en mode local

```
subql-node -f your-project-path --local
```

À des fins de débogage, les utilisateurs peuvent exécuter le nœud en mode local. Passer au modèle local créera des tables Postgres dans le schéma par défaut `public`.

Si le mode local n'est pas utilisé, un nouveau schéma Postgres avec l'initiale `subquery_` et les tables de projet correspondantes seront créés.

#### Vérifiez la santé de votre nœud

Il existe deux points de terminaison que vous pouvez utiliser pour vérifier et surveiller la santé d'un nœud SubQuery en cours d'exécution.

- Point final du bilan de santé qui renvoie une simple réponse 200
- Point de terminaison des métadonnées qui comprend des analyses supplémentaires de votre nœud SubQuery en cours d'exécution

Ajoutez ceci à l'URL de base de votre nœud SubQuery. Ex `http://localhost:3000/meta` retournera:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` retournera HTTP 200 en cas de succès.

Une erreur 500 sera renvoyée si l'indexeur n'est pas sain. Cela peut souvent être vu lorsque le nœud est en train de démarrer.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Si une URL incorrecte est utilisée, une erreur 404 not found sera renvoyée.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Déboguer votre projet

Utilisez [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) pour exécuter la commande suivante.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Par exemple :

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Ensuite, ouvrez les outils de développement de Chrome, allez dans Source > Filesystem et ajoutez votre projet à l'espace de travail et commencez à déboguer. Pour plus d'informations, consultez [Comment déboguer un projet SubQuery](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Exécution d'un service de requêtes (subql/query)

### Installation

```shell
# NPM
npm install -g @subql/query
```

Veuillez noter que nous n'encourageons **PAS** l'utilisation de `yarn global` en raison de sa mauvaise gestion des dépendances qui peut entraîner des erreurs en cours de route.

### Exécution du service de requête

``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Assurez-vous que le nom du projet est le même que celui du projet lorsque vous [initialisez le projet](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Vérifiez également que les variables d'environnement sont correctes.

Après avoir exécuté avec succès le service subql-query, ouvrez votre navigateur et rendez-vous sur `http://localhost:3000`. Vous devriez voir le playground GraphQL s'afficher dans l'explorateur et le schéma qui est prêt à être interrogé.
