# Hello World (localhost & Docker)

Bienvenue à ce démarrage rapide de SubQuery Hello World. Ce démarrage rapide a pour but de vous montrer comment faire fonctionner le projet de démarrage par défaut dans Docker en quelques étapes simples.

## Objectifs d'apprentissage

À la fin de ce démarrage rapide, vous devriez :

- comprendre les pré-requis nécessaires
- comprendre les commandes de base communes
- être capable de naviguer vers localhost:3000 et de visualiser le terrain de jeu
- exécuter une requête simple pour obtenir la hauteur de bloc du réseau principal Polkadot.

## Public visé

Ce guide s'adresse aux nouveaux développeurs qui ont une certaine expérience du développement et qui souhaitent en savoir plus sur SubQuery.

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Pré-requis

Vous aurez besoin de

- gestionnaire de paquets yarn ou npm
- CLI SubQuery`(@subql/cli`)
- Docker

Vous pouvez exécuter les commandes suivantes dans un terminal pour voir si vous disposez déjà de l'un de ces prérequis.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

Pour les utilisateurs plus avancés, copiez et collez ce qui suit :

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

Ceci devrait renvoyer : (pour les utilisateurs de npm, remplacez yarn par npm)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

Si vous obtenez le résultat ci-dessus, vous êtes prêt à partir. Sinon, suivez ces liens pour les installer :

- [yarn](https://classic.yarnpkg.com/en/docs/install/) ou [npm](https://www.npmjs.com/get-npm)
- [CLI SubQuery](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Initialiser le projet

La première étape pour démarrer avec SubQuery est d'exécuter la commande `subql init`. Initialisons un projet de départ avec le nom `subqlHelloWorld`. Notez que seul l'auteur est obligatoire. Tout le reste est laissé vide ci-dessous.

```shell
> subql init subqlHelloWorld
? Sélectionnez un réseau Polkadot
? Sélectionnez un modèle de projet subql-starter    Projet de démarrage pour subquery
Clonage du projet... fait
RPC terminaison : [wss://polkadot. pi.onfinality.io/public-ws] :
Référentiel Git [https://github.com/subquery/subql-starter] :
Récupération du hachage genesis du réseau. . fait
Auteur [Ian He & Jay Ji] :
Description [Ce projet peut être utilisé comme un point de départ...]:
Version [0.0.4]:
Licence [MIT]:
Préparation du projet... fait
subqlHelloWorld est prêt

```

N'oubliez pas de vous installer dans ce nouveau répertoire.

```shell
cd subqlHelloWorld
```

## 2. Installer les dépendances

Maintenant, faites un yarn ou un node install pour installer les différentes dépendances.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

Un exemple de `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 31.84s.
```

## 3. Générer du code

Exécutez maintenant `yarn codegen` pour générer du Typescript à partir du schéma GraphQL.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Un exemple de `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Models index generated !
* Types index generated !
✨  Done in 1.02s.
```

**Attention** Lorsque des modifications sont apportées au fichier de schéma, n'oubliez pas de relancer `yarn codegen` pour régénérer votre répertoire de types.

## 4. Construire le code

L'étape suivante consiste à construire le code avec `yarn build`.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

Un exemple de `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Exécuter Docker

L'utilisation de Docker vous permet d'exécuter cet exemple très rapidement car toute l'infrastructure requise peut être fournie dans l'image Docker. Exécutez `docker-compose pull && docker-compose up`.

Cela donnera un coup de fouet à l'ensemble et vous obtiendrez finalement des blocs qui seront récupérés.

```shell
> #SNIPPET
subquery-node_1   | 2021-06-05T22:20:31.450Z <subql-node> INFO node started
subquery-node_1   | 2021-06-05T22:20:35.134Z <fetch> INFO fetch block [1, 100]
subqlhelloworld_graphql-engine_1 exited with code 0
subquery-node_1   | 2021-06-05T22:20:38.412Z <fetch> INFO fetch block [101, 200]
graphql-engine_1  | 2021-06-05T22:20:39.353Z <nestjs> INFO Starting Nest application...
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO AppModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.383Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.809Z <nestjs> INFO Nest application successfully started
subquery-node_1   | 2021-06-05T22:20:41.122Z <fetch> INFO fetch block [201, 300]
graphql-engine_1  | 2021-06-05T22:20:43.244Z <express> INFO request completed

```

## 6. Parcourir le terrain de jeu

Naviguez vers http://localhost:3000/ et collez la requête ci-dessous dans la partie gauche de l'écran, puis appuyez sur le bouton de lecture.

```
{
 query{
   starterEntities(last:10, orderBy:FIELD1_ASC ){
     nodes{
       field1
     }
   }
 }
}

```

Terrain de jeux de SubQuery sur localhost.

![terrain de jeux localhost](/assets/img/subql_playground.png)

Le nombre de blocs dans le terrain de jeu devrait correspondre au nombre de blocs (techniquement la hauteur des blocs) dans le terminal également.

## Résumé

Dans ce démarrage rapide, nous avons montré les étapes de base pour obtenir un projet de démarrage opérationnel dans un environnement Docker, puis nous avons navigué vers localhost:3000 et exécuté une requête pour renvoyer le nombre de blocs du réseau principal Polkadot.
