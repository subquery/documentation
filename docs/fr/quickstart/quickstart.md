# Guide de démarrage rapide

Dans ce guide de démarrage rapide, nous allons créer un projet de démarrage simple que vous pouvez utiliser comme cadre pour développer votre propre projet SubQuery.

À la fin de ce guide, vous aurez un projet SubQuery fonctionnel fonctionnant sur un nœud SubQuery avec un point de terminaison GraphQL à partir duquel vous pourrez interroger des données.

Si vous ne l'avez pas encore fait, nous vous suggérons de vous familiariser avec la [terminologie](../#terminology) utilisée dans SubQuery.

## Préparation

### Environnement de développement local

- [Typescript](https://www.typescriptlang.org/) est nécessaire pour compiler le projet et définir les types.
- La CLI de SubQuery et le projet généré ont tous deux des dépendances et nécessitent une version moderne de [Node](https://nodejs.org/en/).
- Les nœuds SubQuery nécessitent Docker.

### Installer SubQuery CLI

Installez SubQuery CLI globalement sur votre terminal en utilisant NPM :

```shell
# NPM
npm install -g @subql/cli
```

Veuillez noter que nous **n'** encourageons **PAS** l'utilisation de `yarn global` en raison de sa mauvaise gestion des dépendances qui peut entraîner des erreurs en cours de route.

Vous pouvez ensuite lancer l'aide pour voir les commandes disponibles et l'utilisation fournie par la CLI.

```shell
subql help
```

## Initialiser le projet Starter SubQuery

Dans le répertoire dans lequel vous voulez créer un projet SubQuery, remplacez simplement `PROJECT_NAME` par votre propre nom et exécutez la commande :

```shell
subql init PROJECT_NAME
```

Certaines questions vous seront posées au fur et à mesure de l'initalisation du projet SubQuery :

- Réseau: Un réseau blockchain que ce projet de SubQuery sera développé pour indexer
- Modèle : Sélectionnez un modèle de projet de SubQuery qui fournira un point de départ pour commencer le développement
- Dépôt Git (facultatif) : Fournir une URL Git vers un dépôt dans lequel ce projet SubQuery sera hébergé (lorsqu'il est hébergé dans SubQuery Explorer)
- Point de terminaison RPC (obligatoire) : Fournissez une URL (wss) vers un point de terminaison RPC en cours d'exécution qui sera utilisé par défaut pour ce projet. Vous pouvez accéder rapidement aux points de terminaison publics pour différents réseaux Polkadot ou même créer votre propre nœud privé dédié en utilisant [OnFinality](https://app.onfinality.io) ou simplement utiliser le point de terminaison Polkadot par défaut. Ce noeud RPC doit être un noeud d'archive (avoir l'état de chaîne complète).
- Auteurs (obligatoire) : Entrez le propriétaire de ce projet SubQuery ici
- Description (facultatif) : Vous pouvez fournir un court paragraphe sur votre projet qui décrit les données qu'il contient et ce que les utilisateurs peuvent faire avec
- Version (obligatoire) : Entrez un numéro de version personnalisé ou utilisez la version par défaut (`1.0.0`)
- Licence (obligatoire) : Indiquez la licence du logiciel pour ce projet ou acceptez la valeur par défaut (`Apache-2.0`)

Une fois le processus d'initialisation terminé, vous devriez voir qu'un dossier portant le nom de votre projet a été créé dans le répertoire. Le contenu de ce dossier doit être identique à celui indiqué dans la [structure du répertoire](../create/introduction.md#directory-structure).

Enfin, sous le répertoire du projet, exécutez la commande suivante pour installer les dépendances du nouveau projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Configurer et construire le projet de démarrage

Dans le paquet de démarrage que vous venez d'initialiser, nous avons fourni une configuration standard pour votre nouveau projet. Vous allez principalement travailler sur les fichiers suivants :

- Le manifeste dans `project.yaml`
- Le schéma GraphQL dans `schema.graphql`
- Les fonctions de mappage dans le répertoire `src/mappings/`.

Pour plus d'informations sur la façon d'écrire votre propre SubQuery, consultez notre documentation sous [Créer un projet](../create/introduction.md).

### Génération de modèles GraphQL

Afin d'[indexer](../run/run.md) votre projet SubQuery, vous devez d'abord générer les modèles GraphQL requis que vous avez définis dans votre fichier GraphQL Schema (`schema.graphql`). Exécutez cette commande à la racine du répertoire du projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Vous trouverez les modèles générés dans le répertoire `/src/types/models`

## Construire le projet

Afin d'exécuter votre projet SubQuery sur un nœud SubQuery hébergé localement, vous devez construire votre travail.

Exécutez la commande build depuis le répertoire racine du projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Exécution et interrogation de votre projet de démarrage

Bien que vous puissiez rapidement publier votre nouveau projet sur [SubQuery Projects](https://project.subquery.network) et l'interroger à l'aide de notre [explorateur](https://explorer.subquery.network), la façon la plus simple d'exécuter les nœuds SubQuery localement est dans un conteneur Docker. Si vous n'avez pas encore Docker, vous pouvez l'installer depuis [docker.com](https://docs.docker.com/get-docker/).

[_Sautez cette étape et publiez votre nouveau projet dans SubQuery Projects._](../publish/publish.md)

### Exécutez votre projet SubQuery

Toute la configuration qui contrôle la façon dont un nœud SubQuery est exécuté est définie dans le fichier `docker-compose.yml`. Pour un nouveau projet qui vient d'être initialisé, vous n'aurez pas besoin de modifier quoi que ce soit ici, mais vous pouvez en savoir plus sur le fichier et les paramètres dans notre [section Exécuter un projet](../run/run.md).

Dans le répertoire du projet, exécutez la commande suivante :

```shell
docker-compose pull && docker-compose up
```

Cela peut prendre un certain temps pour télécharger les paquets requis ([`(@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), et Postgres) pour la première fois mais vous verrez bientôt un nœud SubQuery en fonctionnement.

### Interrogez votre projet

Ouvrez votre navigateur et rendez-vous sur [http://localhost:3000](http://localhost:3000).

Vous devriez voir un terrain de jeu GraphQL s'afficher dans l'explorateur et les schémas qui sont prêts à être interrogés. En haut à droite du terrain de jeu, vous trouverez un bouton _Docs_ qui ouvrira un tiroir de documentation. Cette documentation est générée automatiquement et vous aide à trouver les entités et les méthodes que vous pouvez interroger.

Pour un nouveau projet de démarrage SubQuery, vous pouvez essayer la requête suivante pour avoir un aperçu de son fonctionnement ou en [apprendre davantage sur le langage GraphQL Query](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Étapes suivantes

Félicitations, vous disposez maintenant d'un projet SubQuery fonctionnant localement et acceptant les requêtes de l'API GraphQL pour des échantillons de données. Dans le prochain guide, nous vous montrerons comment publier votre nouveau projet dans [SubQuery Projects](https://project.subquery.network) et l'interroger à l'aide de notre [explorateur](https://explorer.subquery.network).

[Publier votre nouveau projet dans SubQuery Projects](../publish/publish.md)
