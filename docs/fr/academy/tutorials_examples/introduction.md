# Tutoriels & Exemples

Nous allons lister ici nos tutoriels et explorer divers exemples pour vous aider à vous lancer de la manière la plus simple et la plus rapide.

## Tutoriels



## Exemples de projets SubQuery

| Exemple                                                                                       | Description                                                                                                                            | Sujets                                                                                                                                                |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Indexes extrinsèques pour qu'ils puissent être interrogés par leur hash                                                                | L'exemple le plus simple avec une fonction de __gestion de blocs__                                                                                    |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | Indexe l'horodatage de chaque bloc finilisé                                                                                            | Une autre fonction simple __du gestionnaire d'appel__                                                                                                 |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)              | Indexe le montant minimum requis pour qu'un validateur soit élu.                                                                       | Fonction plus compliquée __de gestion de blocs__ qui fait des __appels externes__ vers `@polkadot/api` pour des données supplémentaires sur la chaîne |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                | Indexe le lien de mise en jeu, les récompenses et les slashes des événements du bloc finalisé                                          | Des __gestionnaires d'événements__ plus compliqués avec une relation de __un à plusieurs__                                                            |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                     | Indexe le solde des transferts entre comptes, indexe également l'utilitaire batchAll pour découvrir le contenu des appels extrinsèques | __Un à plusieurs__ et __plusieurs à plusieurs__ relations et __gestion extrinsèque__ compliquée                                                       |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                    | Indexe les informations de naissance des chatons.                                                                                      | Gestionnaires d'appels __complexes__ et __gestionnaires d'événements__, avec des données indexées à partir d'une __chaîne personnalisée__             |
