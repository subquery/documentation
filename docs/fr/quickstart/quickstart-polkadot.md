# Démarrage rapide Polkadot

Dans ce guide de démarrage rapide, nous allons commencer par un simple projet de démarrage Substrate/Polkadot, puis terminer par l'indexation de données réelles. Il s'agit d'une excellente base de départ pour développer votre propre projet Substrate/Polkadot SubQuery.

À la fin de ce guide, vous aurez un projet SubQuery fonctionnel fonctionnant sur un nœud SubQuery avec un point de terminaison GraphQL à partir duquel vous pourrez interroger des données.

Si vous ne l'avez pas encore fait, nous vous suggérons de vous familiariser avec la [terminologie](../#terminology) utilisée dans SubQuery.

**Le but de ce guide de démarrage rapide est d'adapter le projet de démarrage standard pour commencer à indexer tous les transferts de Polkadot, cela ne devrait prendre que 10-15 minutes**

## Préparation

### Environnement de développement local

- [Node](https://nodejs.org/en/) : Une installation moderne (par exemple, la version LTS) de Node.
- [Docker](https://docker.com/) : Ce tutoriel utilisera le système Docker

### Installer SubQuery CLI

Installez SubQuery CLI globalement sur votre terminal en utilisant NPM :

```shell
# NPM
npm install -g @subql/cli
```

Veuillez noter que nous **N’encourageons PAS** l'utilisation de `yarn global` pour l'installation de `@subql/cli` en raison de sa mauvaise gestion des dépendances qui peut conduire à des erreurs en cours de route.

Vous pouvez ensuite exécuter la commande help pour voir les commandes disponibles et l'utilisation fournie par le CLI :

```shell
subql help
```

## Initialiser le projet de démarrage SubQuery

Dans le répertoire dans lequel vous voulez créer un projet SubQuery, exécutez simplement la commande suivante pour commencer.

```shell
subql init
```

Certaines questions vous seront posées au fur et à mesure de l'initalisation du projet SubQuery :

- Project name: un nom de projet pour votre projet SubQuery
- Network family: La famille de réseaux blockchain de niveau 1 que ce projet SubQuery sera développé pour indexer. Utilisez les touches fléchées pour choisir parmi les options disponibles. Pour ce guide, nous utiliserons *"Substrat"*
- Network: Le réseau spécifique que ce projet SubQuery sera développé pour indexer. Utilisez les touches fléchées pour choisir parmi les options disponibles. Pour ce guide, nous utiliserons *"Polkadot"*
- Template project: Sélectionnez un projet de modèle de SubQuery qui fournira un point de départ pour commencer le développement. Nous vous suggérons de sélectionner le projet *"subql-starter"*.
- RPC endpoint: Fournissez une URL HTTPS vers un point de terminaison RPC en cours d'exécution qui sera utilisé par défaut pour ce projet. Vous pouvez accéder rapidement aux points d'extrémité publics de différents réseaux Polkadot, créer votre propre nœud privé dédié en utilisant [OnFinality](https://app.onfinality.io) ou simplement utiliser le point d'extrémité Polkadot par défaut. Ce nœud RPC doit être un nœud d'archive (avoir l'état complet de la chaîne). Pour ce guide, nous utiliserons la valeur par défaut *"https://polkadot.api.onfinality.io"*
- Git repository: Fournissez une URL Git d'un repo dans lequel ce projet SubQuery sera hébergé (lorsqu'il est hébergé dans SubQuery Explorer) ou acceptez la valeur par défaut fournie.
- Authors: Auteurs : Saisissez ici le propriétaire de ce projet SubQuery (par exemple, votre nom !) ou acceptez la valeur par défaut fournie.
- Description: Fournissez un court paragraphe sur votre projet décrivant les données qu'il contient et ce que les utilisateurs peuvent en faire ou acceptez la proposition par défaut.
- Version: Saisissez un numéro de version personnalisé ou utilisez la valeur par défaut (`1.0.0`)
- License: Fournir la licence du logiciel pour ce projet ou accepter la valeur par défaut (`MIT`)

Une fois le processus d'initialisation terminé, vous devriez voir qu'un dossier portant le nom de votre projet a été créé dans le répertoire. Le contenu de ce répertoire doit être identique à ce qui est listé dans la [Structure des répertoires](../create/introduction.md#directory-structure).

Enfin, dans le répertoire du projet, exécutez la commande suivante pour installer les dépendances du nouveau projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. Le manifeste du projet dans `projet.yaml`
3. Les fonctions de mappage dans le répertoire `src/mappings/`

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Mise à jour de votre fichier de schéma GraphQL

Le fichier `schema.graphql` définit les différents schémas GraphQL. En raison de la façon dont le langage d'interrogation GraphQL fonctionne, le fichier de schéma dicte essentiellement la forme de vos données à partir de SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Important : Lorsque vous apportez des modifications au fichier de schéma, veillez à régénérer votre répertoire de types.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Pour plus d'informations sur le fichier `schema.graphql`, consultez notre documentation sous [Build/GraphQL Schema](../build/graphql.md)

### Mise à jour du fichier de manifeste du projet

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

Pour plus d'informations sur le fichier Project Manifest (`project.yaml`), consultez notre documentation sous [Build/Manifest File](../build/manifest.md)

### Ajouter une fonction de mappage

Les fonctions de mappage définissent comment les données de la chaîne sont transformées en entités GraphQL optimisées que nous avons préalablement définies dans le fichier `schema.graphql`.

Naviguez vers la fonction de mappage par défaut dans le répertoire `src/mappings`. Vous verrez trois fonctions exportées, `handleBlock`, `handleEvent`, et `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

Vous pouvez mettre à jour la fonction `handleEvent` comme suit (notez les importations supplémentaires) :

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. Nous extrayons ces données puis instançons une nouvelle entité `Transfer` que nous avons définie plus tôt dans le fichier `schema.graphql`. Nous ajoutons des informations supplémentaires et utilisons ensuite la fonction `.save()` pour enregistrer la nouvelle entité (SubQuery l'enregistrera automatiquement dans la base de données).

Pour plus d'informations sur les fonctions de mappage, consultez notre documentation sous [Build/Mappings](../build/mapping.md)

### Construire le projet

In order to run your new SubQuery Project we first need to build our work. Exécutez la commande de construction à partir du répertoire racine du projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Le moyen le plus simple d'y parvenir est d'utiliser Docker.

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Recherchez votre projet

Ouvrez votre navigateur et allez sur [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. En haut à droite du terrain de jeu, vous trouverez un bouton _Docs_ qui ouvrira un tiroir de documentation. Cette documentation est générée automatiquement et vous aide à trouver les entités et les méthodes que vous pouvez interroger.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### Publiez votre projet SubQuery

SubQuery provides a free managed service where you can deploy your new project to. Vous pouvez le déployer dans [SubQuery Projects](https://project.subquery.network) et l'interroger en utilisant notre [Explorer](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Les prochaines étapes

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Maintenant que vous avez eu un aperçu de la façon de construire un projet de base de SubQuery, la question est de savoir où aller à partir de là ? Si vous vous sentez en confiance, vous pouvez commencer à en apprendre davantage sur les trois fichiers clés. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. Nous nous pencherons sur des modifications plus avancées et nous approfondirons l'exécution de projets SubQuery en utilisant des projets open source facilement disponibles.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
