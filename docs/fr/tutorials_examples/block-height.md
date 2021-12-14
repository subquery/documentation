# Comment démarrer à une hauteur de bloc différente ?

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Introduction

Par défaut, tous les projets de démarrage commencent à synchroniser la blockchain à partir du bloc de genèse. En d'autres termes, à partir du bloc 1. Pour les grandes blockchains, cela peut prendre des jours, voire des semaines, pour une synchronisation complète.

Pour lancer la synchronisation d'un nœud SubQuery à partir d'une hauteur non nulle, il suffit de modifier votre fichier project.yaml et de changer la clé startBlock.

Vous trouverez ci-dessous un fichier project.yaml dans lequel le bloc de départ a été fixé à 1 000 000.

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```

## Pourquoi ne pas commencer à zéro ?

La principale raison est que cela peut réduire le temps de synchronisation de la blockchain. Cela signifie que si vous n'êtes intéressé que par les transactions des 3 derniers mois, vous ne pouvez synchroniser que la valeur des 3 derniers mois, ce qui signifie moins de temps d'attente et vous pouvez commencer votre développement plus rapidement.

## Quels sont les inconvénients de ne pas partir de zéro ?

L'inconvénient le plus évident est que vous ne serez pas en mesure de rechercher des données sur la blockchain pour les blocs que vous ne possédez pas.

## Comment déterminer la hauteur actuelle de la blockchain ?

Si vous utilisez le réseau Polkadot, vous pouvez vous rendre sur le site [https://polkascan.io/](https://polkascan.io/),sélectionner le réseau, puis afficher le chiffre "bloc finalisé".

## Dois-je faire une reconstruction ou un codegen ?

Non. Comme vous modifiez le fichier project.yaml, qui est essentiellement un fichier de configuration, vous n'aurez pas à reconstruire ou à régénérer le code typecript.
