# Comment fonctionne un dictionnaire SubQuery ?

L'idée générale d'un projet de dictionnaire générique est d'indexer toutes les données d'une blockchain et d'enregistrer les événements, les extrinsèques et leurs types (module et méthode) dans une base de données par ordre de hauteur de bloc. Un autre projet peut alors interroger ce point de terminaison `network.dictionary` au lieu du point de terminaison ` network.endpoint` par défaut défini dans le fichier manifest.

Le point de terminaison `network.dictionary` est un paramètre facultatif qui, s'il est présent, sera automatiquement détecté et utilisé par le SDK. `network.endpoint` est obligatoire et ne sera pas compilé s'il n'est pas présent.

En prenant le projet de [dictionnaire SubQuery](https://github.com/subquery/subql-dictionary) comme exemple, le fichier de [schéma](https://github.com/subquery/subql-dictionary/blob/main/schema.graphql) définit 3 entités : extrinsic, events, specVersion. Ces 3 entités contiennent respectivement 6, 4 et 2 champs. Lorsque ce projet est exécuté, ces champs sont reflétés dans les tables de la base de données.

![extrinsics table](/assets/img/extrinsics_table.png) ![events table](/assets/img/events_table.png) ![specversion table](/assets/img/specversion_table.png)

Les données de la blockchain sont alors stockées dans ces tables et indexées pour plus de performance. Le projet est ensuite hébergé dans SubQuery Projects et le point de terminaison de l'API est disponible pour être ajouté au fichier manifeste.

## Comment incorporer un dictionnaire dans votre projet ?

Ajoutez le `dictionnaire : https://api.subquery.network/sq/subquery/dictionary-polkadot` à la section réseau du manifeste. Par exemple :

```shell
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
```

## Que se passe-t-il lorsqu'un dictionnaire N'EST PAS utilisé ?

Lorsqu'un dictionnaire n'est PAS utilisé, un indexeur récupère chaque bloc de données via l'api polkadot en fonction de l'indicateur `batch-size` qui est de 100 par défaut, et le place dans un tampon pour traitement. Ensuite, l'indexeur prend tous ces blocs dans la mémoire tampon et, en traitant les données du bloc, vérifie si l'événement et l'extrinsèque dans ces blocs correspondent au filtre défini par l'utilisateur.

## Que se passe-t-il lorsqu'un dictionnaire est utilisé ?

Lorsqu'un dictionnaire est utilisé, l'indexeur prend d'abord les filtres d'appel et d'événement comme paramètres et les fusionne dans une requête GraphQL. Il utilise ensuite l'API du dictionnaire pour obtenir une liste des hauteurs de bloc pertinentes contenant uniquement les événements et les extrinsèques spécifiques. Souvent, cette liste est nettement inférieure à 100 si la valeur par défaut est utilisée.

Par exemple, imaginez une situation où vous indexez des événements de transfert. Tous les blocs ne possèdent pas cet événement (dans l'image ci-dessous, il n'y a pas d'événements de transfert dans les blocs 3 et 4).

![dictionary block](/assets/img/dictionary_blocks.png)

Le dictionnaire permet à votre projet de sauter cette étape. Ainsi, au lieu de rechercher un événement de transfert dans chaque bloc, il passe aux blocs 1, 2 et 5. Ceci est dû au fait que le dictionnaire est une référence pré-calculée à tous les appels et événements dans chaque bloc.

Cela signifie que l'utilisation d'un dictionnaire peut réduire la quantité de données que l'indexeur obtient de la chaîne et réduire le nombre de blocs "indésirables" stockés dans le tampon local. Mais par rapport à la méthode traditionnelle, elle ajoute une étape supplémentaire pour obtenir des données à partir de l'API du dictionnaire.

## Quand un dictionnaire n'est-il PAS utile ?

Lorsque des [gestionnaires de blocs](https://doc.subquery.network/create/mapping.html#block-handler) sont utilisés pour récupérer les données d'une chaîne, chaque bloc doit être traité. Par conséquent, l'utilisation d'un dictionnaire dans ce cas n'apporte aucun avantage et l'indexeur passera automatiquement à l'approche par défaut sans dictionnaire.

De même, lorsque vous traitez des événements ou des extrinsèques qui se produisent ou existent dans chaque bloc, comme `timestamp.set`, l'utilisation d'un dictionnaire n'offre aucun avantage supplémentaire.
