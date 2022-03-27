# Héberger un projet en utilisant IPFS

Ce guide explique comment publier un projet local SubQuery sur [IPFS](https://ipfs.io/) et le déployer sur notre infrastructure d'hébergement.

Héberger un projet dans IPFS le rend disponible pour tous et réduit votre dépendance à des services centralisés comme GitHub.

## Exigences

- `@subql/cli` version 0.21.0 ou supérieure.
- Manifest `specVersion` 0.2.0 ou supérieure.
- Préparez votre [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token).
- Pour assurer le succès de votre déploiement, nous vous recommandons fortement de construire votre projet avec la commande `subql build`, et de le tester localement avant de le publier.

## Préparez votre SUBQL_ACCESS_TOKEN

- Étape 1 : Allez sur [SubQuery Projects](https://project.subquery.network/) et connectez-vous.
- Étape 2 : Cliquez sur votre profil en haut à droite du menu de navigation, puis cliquez sur **_Refresh Token_**
- Étape 3 : Copiez le jeton généré.
- Étape 4 : Pour utiliser ce jeton :
  - Option 1 : Ajoutez SUBQL_ACCESS_TOKEN dans vos variables d'environnement. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Option 2 : Bientôt, `subql/cli` supportera le stockage local de votre SUBQL_ACCESS_TOKEN.

## Comment publier un projet

Nous proposons deux méthodes pour publier votre projet,

### Option 1 :

Comme vous avez déjà installé `@subql/cli`, vous pouvez exécuter la commande suivante, qui lira le projet et les informations requises à partir de son manifeste par défaut `project.yaml`.

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2 :

Alternativement, supposons que votre projet a plusieurs fichiers Manifest, par exemple vous supportez plusieurs réseaux mais partagez le même mapping et la même logique métier, et avez une structure de projet comme suit :

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Vous pouvez toujours publier le projet avec le fichier manifeste que vous avez sélectionné.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## Après la publication

Après avoir publié le projet avec succès, les journaux ci-dessous indiquent que le projet a été créé sur le cluster IPFS et ont renvoyé son `CID` (identifiant de contenu).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Veuillez noter ce `CID`. Avec ce `CID`, vous pouvez voir votre projet publié comme ce que nous appelons un [déploiement IPFS](#ipfs-deployment).

## Déploiement IPFS

Le déploiement IPFS représente une existence indépendante et unique d'un projet SubQuery sur un réseau décentralisé. Par conséquent, toute modification du code du projet affectera son caractère unique. Si vous devez ajuster votre logique commerciale, par exemple modifier la fonction de mappage, vous devez republier le projet, et le `CID` changera.

Pour l'instant, pour visualiser le projet que vous avez publié, utilisez un outil d'api `REST` tel que [Postman](https://web.postman.co/), et utilisez la méthode `POST` avec l'exemple d'URL suivant pour le récupérer. `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

Vous devriez voir l'exemple de déploiement de projet ci-dessous :

Ce déploiement ressemble beaucoup à votre fichier manifeste. Vous pouvez vous attendre à ces champs descriptifs, et le réseau et le point de terminaison du dictionnaire ont été supprimés car ils n'ont pas directement affecté le résultat de l'exécution du projet.

Les fichiers utilisés dans votre projet local ont été emballés et publiés sur IPFS également.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Exécuter votre projet SubQuery sur un service hébergé

### Créer un projet avec déploiement IPFS

Vous pouvez suivre le guide pour [publier votre projet SubQuery](publish.md), mais lorsque vous définissez votre source de déploiement, vous pouvez sélectionner **IPFS**.

Choisissez ensuite votre emplacement de production, copiez et collez le CID de votre déploiement IPFS (sans le préfixe `ipfs://`).

Vous devriez voir votre déploiement IPFS dans la section d'aperçu. Et vous pouvez sélectionner le réseau, les endpoints du dictionnaire, etc.

Après avoir réussi à déployer le déploiement IPFS sur notre service hébergé, il devrait être disponible à la vue sur l'explorateur de SubQuery, vous pouvez accéder au service de requête comme vous le faites localement.
