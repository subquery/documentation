# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. Il s'agit d'une excellente base de départ pour développer votre propre projet SubQuery.

**Si vous recherchez des guides pour Substrate/Polkadot, vous pouvez lire le [guide de démarrage rapide spécifique Substrate/Polkadot](./quickstart-polkadot).**

À la fin de ce guide, vous aurez un projet SubQuery fonctionnel fonctionnant sur un nœud SubQuery avec un point de terminaison GraphQL à partir duquel vous pourrez interroger des données.

Si vous ne l'avez pas encore fait, nous vous suggérons de vous familiariser avec la [terminologie](../#terminology) utilisée dans SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

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

Veuillez noter que nous **N'** encourager l'utilisation de `yarn global` pour l'installation de `@subql/cli` en raison de sa mauvaise gestion des dépendances qui peut conduire à une erreur en cours de route.

Vous pouvez ensuite exécuter la commande help pour voir les commandes disponibles et l'utilisation fournie par le CLI

```shell
subql help
```

## Initialiser le projet de démarrage SubQuery

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

Une fois le processus d'initialisation terminé, vous devriez voir qu'un dossier portant le nom de votre projet a été créé dans le répertoire. Le contenu de ce directoy doit être identique à ce qui est listé dans la [Structure des répertoires](../create/introduction.md#directory-structure).

Enfin, dans le répertoire du projet, exécutez la commande suivante pour installer les dépendances du nouveau projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Apporter des modifications à votre projet

Dans le paquet de démarrage que vous venez d'initialiser, nous avons fourni une configuration standard pour votre nouveau projet. Vous travaillerez principalement sur les fichiers suivants :

1. Le schéma GraphQL dans `schema.graphql`
2. Le manifeste du projet dans `projet.yaml`
3. Les fonctions de mappage dans le répertoire `src/mappings/`

Le but de ce guide de démarrage rapide est d'adapter le projet de démarrage standard pour commencer à indexer tous les transferts de Polkadot.

### Mise à jour de votre fichier de schéma GraphQL

Le fichier `schema.graphql` définit les différents schémas GraphQL. En raison de la façon dont le langage d'interrogation GraphQL fonctionne, le fichier de schéma dicte essentiellement la forme de vos données à partir de SubQuery. C'est un excellent point de départ, car il vous permet de définir votre objectif final dès le départ.

We're going to update the `schema.graphql` file to read as follows so we can index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**Important : Lorsque vous apportez des modifications au fichier de schéma, veillez à régénérer votre répertoire de types. Faites-le maintenant.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Vous trouverez les modèles générés dans le répertoire `/src/types/models`. Pour plus d'informations sur le fichier `schema.graphql`, consultez notre documentation sous [Build/GraphQL Schema](../build/graphql.md)

### Mise à jour du fichier de manifeste du projet

Le fichier Projet Manifest (`project.yaml`) peut être vu comme un point d'entrée de votre projet et il définit la plupart des détails sur la façon dont SubQuery va indexer et transformer les données de la chaîne.

Nous n'apporterons pas beaucoup de modifications au fichier manifeste, car il a déjà été configuré correctement, mais nous devons modifier nos gestionnaires. Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3082705 # The block when this contract was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Pour plus d'informations sur le fichier Project Manifest (`project.yaml`), consultez notre documentation sous [Build/Manifest File](../build/manifest.md)

### Ajouter une fonction de mappage

Les fonctions de mappage définissent comment les données de la chaîne sont transformées en entités GraphQL optimisées que nous avons préalablement définies dans le fichier `schema.graphql`.

Naviguez vers la fonction de mappage par défaut dans le répertoire `src/mappings`. You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. Nous ajoutons des informations supplémentaires et utilisons ensuite la fonction `.save()` pour enregistrer la nouvelle entité (SubQuery l'enregistrera automatiquement dans la base de données).

Pour plus d'informations sur les fonctions de mappage, consultez notre documentation sous [Build/Mappings](../build/mapping.md)

### Construire le projet

Afin d'exécuter votre nouveau projet SubQuery, nous devons d'abord construire notre travail. Exécutez la commande de construction à partir du répertoire racine du projet.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important : chaque fois que vous apportez des modifications à vos fonctions de cartographie, vous devez reconstruire votre projet**

## Exécution et interrogation de votre projet

### Exécuter votre projet avec Docker

Chaque fois que vous créez un nouveau projet de sous-quête, vous devez toujours l'exécuter localement sur votre ordinateur pour le tester. Le moyen le plus simple d'y parvenir est d'utiliser Docker.

Toute la configuration qui contrôle la façon dont un nœud SubQuery est exécuté est définie dans ce fichier `docker-compose.yml`. Pour un nouveau projet qui vient d'être initalisé, vous n'aurez pas besoin de modifier quoi que ce soit ici, mais vous pouvez en savoir plus sur le fichier et les paramètres dans notre section [Exécuter un projet](../run_publish/run.md)

Dans le répertoire du projet, exécutez la commande suivante :

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Le téléchargement des paquets nécessaires peut prendre un certain temps. ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), et Postgres) pour la première fois, mais bientôt vous verrez un nœud SubQuery en cours d'exécution. Soyez patient ici.

### Recherchez votre projet

Ouvrez votre navigateur et allez sur [http://localhost:3000](http://localhost:3000).

Vous devriez voir un terrain de jeu GraphQL s'afficher dans l'explorateur et les schémas qui sont prêts à être interrogés. En haut à droite du terrain de jeu, vous trouverez un bouton _Docs_ qui ouvrira un tiroir de documentation. Cette documentation est générée automatiquement et vous aide à trouver les entités et les méthodes que vous pouvez interroger.

Pour un nouveau projet de démarrage SubQuery, vous pouvez essayer la requête suivante pour avoir un aperçu de son fonctionnement ou [en apprendre davantage sur le langage de requête GraphQL](../run_publish/graphql.md).

```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

### Publiez votre projet SubQuery

SubQuery fournit un service géré gratuit où vous pouvez déployer votre nouveau projet. Vous pouvez le déployer dans [SubQuery Projects](https://project.subquery.network) et l'interroger en utilisant notre [Explorer](https://explorer.subquery.network).

[Lisez le guide pour publier votre nouveau projet dans SubQuery Projects](../run_publish/publish.md)

## Les prochaines étapes

Félicitations, vous avez maintenant un projet SubQuery fonctionnant localement qui accepte les requêtes de l'API GraphQL pour les transferts de données de bLuna.

Maintenant que vous avez eu un aperçu de la façon de construire un projet de base de SubQuery, la question est de savoir où aller à partir de là ? Si vous vous sentez en confiance, vous pouvez commencer à en apprendre davantage sur les trois fichiers clés. Le fichier manifeste, le schéma GraphQL et le fichier des mappings sous la section [Build de ces docs](../build/introduction.md).

Sinon, continuez vers notre section [Académie](../academy/academy.md) où vous trouverez des ateliers, des tutoriels et des exemples de projets plus approfondis. Nous nous pencherons sur des modifications plus avancées et nous approfondirons l'exécution de projets SubQuery en utilisant des projets open source facilement disponibles.

Enfin, si vous cherchez d'autres moyens d'exécuter et de publier votre projet, notre [Section Exécuter & Publier](../run_publish/run.md) fournit des informations détaillées sur toutes les façons d'exécuter votre projet SubQuery et sur d'autres fonctionnalités avancées d'agrégation et d'abonnement GraphQL.
