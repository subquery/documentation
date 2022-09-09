# Démarrage rapide de Terra

Dans ce guide de démarrage rapide, nous allons commencer par un projet de démarrage simple, puis terminer par l'indexation de données réelles. Il s'agit d'une excellente base de départ pour développer votre propre projet SubQuery.

**Si vous recherchez des guides pour Substrate/Polkadot, vous pouvez lire le [guide de démarrage rapide spécifique Substrate/Polkadot](./quickstart-polkadot).**

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

Veuillez noter que nous **N'** encourager l'utilisation de `yarn global` pour l'installation de `@subql/cli` en raison de sa mauvaise gestion des dépendances qui peut conduire à une erreur en cours de route.

Vous pouvez ensuite exécuter la commande help pour voir les commandes disponibles et l'utilisation fournie par le CLI

```shell
subql help
```

## Initialiser le projet de démarrage SubQuery

Dans le répertoire dans lequel vous voulez créer un projet SubQuery, exécutez simplement la commande suivante pour commencer.

```shell
subql init
```

Certaines questions vous seront posées au fur et à mesure de l'initalisation du projet SubQuery :

- Project Name: A name for your SubQuery project
- Famille de réseau : La famille de réseau blockchain de couche 1 que ce projet SubQuery sera développé pour indexer, utilisez les touches fléchées de votre clavier pour sélectionner parmi les options, pour ce guide nous utiliserons *"Terra"*
- Réseau : Le réseau spécifique que ce projet SubQuery sera développé pour indexer, utilisez les touches fléchées de votre clavier pour sélectionner parmi les options, pour ce guide nous utiliserons *"Terra"*
- Template: Sélectionnez un modèle de projet SubQuery qui fournira un point de départ pour commencer le développement, nous suggérons de sélectionner le *"Projet de démarrage"*
- Git repository (Facultatif): Fournir l'URL Git d'un repo dans lequel le projet SubQuery sera hébergé (lorsqu'il est hébergé dans SubQuery Explorer)
- RPC endpoint (Obligatoire): Fournissez une URL HTTPS vers un point de terminaison RPC en cours d'exécution qui sera utilisé par défaut pour ce projet. Ce nœud RPC doit être un nœud d'archive (avoir l'état complet de la chaîne). Pour ce guide, nous utiliserons la valeur par défaut *"https://polkadot.api.onfinality.io"*
- Authors (Obligatoire): Entrez ici le propriétaire de ce projet de SubQuery (par exemple, votre nom !)
- Description (Facultatif) : Vous pouvez fournir un court paragraphe sur votre projet qui décrit les données qu'il contient et ce que les utilisateurs peuvent faire avec
- Version (Obligatoire) : Saisissez un numéro de version personnalisé ou utilisez la valeur par défaut (`1.0.0`)
- Licence (Obligatoire) : Fournir la licence du logiciel pour ce projet ou accepter la valeur par défaut (`Apache-2.0`)

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

Nous allons mettre à jour le fichier `schema.graphql` comme suit

```graphql
type Transfer @entity {
  id: ID! # Le champ id est toujours obligatoire et doit ressembler à ceci
  txHash: String!
  blockHeight: BigInt # La hauteur de bloc du transfert
  sender: String! # Le compte à partir duquel les transferts sont effectués
  recipient: String! # Le compte sur lequel les transferts sont effectués
  amount: String! Montant à transférer
```

**Important : Lorsque vous apportez des modifications au fichier de schéma, veillez à régénérer votre répertoire de types. Faites-le maintenant.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Vous trouverez les modèles générés dans le répertoire `/src/types/models`. Pour plus d'informations sur le fichier `schema.graphql`, consultez notre documentation sous [Build/GraphQL Schema](../build/graphql.md)

### Mise à jour du fichier de manifeste du projet

Le fichier Projet Manifest (`project.yaml`) peut être vu comme un point d'entrée de votre projet et il définit la plupart des détails sur la façon dont SubQuery va indexer et transformer les données de la chaîne.

Nous n'apporterons pas beaucoup de modifications au fichier manifeste, car il a déjà été configuré correctement, mais nous devons modifier nos gestionnaires. Rappelez-vous que nous prévoyons d'indexer tous les transferts de Polkadot, en conséquence, nous devons mettre à jour la section `datasources` pour lire ce qui suit.

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # cela se déclenchera sur tous les événements qui correspondent à la condition de filtre de contrat intelligent suivante
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # Nous sommes abonnés au contrat intelligent bLuna (c'est-à-dire que nous ne transférons que les événements de ce contrat)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

Cela signifie que nous allons exécuter une fonction de mappage `handleEvent` chaque fois qu'il y a un événement `transfer` provenant du smart contract bLuna.

Pour plus d'informations sur le fichier Project Manifest (`project.yaml`), consultez notre documentation sous [Build/Manifest File](../build/manifest/polkadot.md)

### Ajouter une fonction de mappage

Les fonctions de mappage définissent comment les données de la chaîne sont transformées en entités GraphQL optimisées que nous avons préalablement définies dans le fichier `schema.graphql`.

Naviguez vers la fonction de mappage par défaut dans le répertoire `src/mappings`. Vous verrez trois fonctions exportées, `handleBlock`, `handleEvent`, et `handleCall`. Vous pouvez supprimer les deux fonctions `handleBlock` et `handleCall`, nous ne nous occupons que de la fonction `handleEvent`.

La fonction `handleEvent` a reçu les données de l'événement chaque fois que celui-ci correspond aux filtres que nous avons spécifiés précédemment dans notre `projet.yaml`. Nous allons le mettre à jour pour traiter tous les événements `transfer` et les enregistrer dans les entités GraphQL que nous avons créées précédemment.

Vous pouvez mettre à jour la fonction `handleEvent` comme suit (notez les importations supplémentaires) :

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Imprimer les données de débogage de l'événement
    // logger.info(JSON.stringify(event));

    // Créer la nouvelle entité de transfert avec un ID unique
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

Il s'agit de recevoir un SubstrateEvent qui comprend des données de transfert sur la charge utile. Nous extrayons ces données puis instançons une nouvelle entité `Transfer` que nous avons définie plus tôt dans le fichier `schema.graphql`. Nous ajoutons des informations supplémentaires et utilisons ensuite la fonction `.save()` pour enregistrer la nouvelle entité (SubQuery l'enregistrera automatiquement dans la base de données).

Pour plus d'informations sur les fonctions de mappage, consultez notre documentation sous [Build/Mappings](../build/mapping/polkadot.md)

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
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

### Publiez votre projet SubQuery

SubQuery fournit un service géré gratuit où vous pouvez déployer votre nouveau projet. Vous pouvez le déployer dans [SubQuery Projects](https://project.subquery.network) et l'interroger en utilisant notre [Explorer](https://explorer.subquery.network).

[Lisez le guide pour publier votre nouveau projet dans SubQuery Projects](../run_publish/publish.md)

## Les prochaines étapes

Félicitations, vous avez maintenant un projet SubQuery fonctionnant localement qui accepte les requêtes de l'API GraphQL pour les transferts de données de bLuna.

Maintenant que vous avez eu un aperçu de la façon de construire un projet de base de SubQuery, la question est de savoir où aller à partir de là ? Si vous vous sentez en confiance, vous pouvez commencer à en apprendre davantage sur les trois fichiers clés. Le fichier manifeste, le schéma GraphQL et le fichier des mappings sous la section [Build de ces docs](../build/introduction.md).

Sinon, continuez vers notre section [Académie](../academy/academy.md) où vous trouverez des ateliers, des tutoriels et des exemples de projets plus approfondis. Nous nous pencherons sur des modifications plus avancées et nous approfondirons l'exécution de projets SubQuery en utilisant des projets open source facilement disponibles.

Enfin, si vous cherchez d'autres moyens d'exécuter et de publier votre projet, notre [Section Exécuter & Publier](../run_publish/run.md) fournit des informations détaillées sur toutes les façons d'exécuter votre projet SubQuery et sur d'autres fonctionnalités avancées d'agrégation et d'abonnement GraphQL.
