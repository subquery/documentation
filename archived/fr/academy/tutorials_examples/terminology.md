# Terminologie

- SubQuery Project (_où la magie se produit_) : Une définition ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) de la façon dont un noeud de sous-requête doit traverser et agréger un réseau de projets et comment les données devraient être transformées et stockées pour permettre des requêtes GraphQL utiles
- SubQuery Node (_où le travail est fait_) : Un paquet ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) qui acceptera un projet definiton de SubQuery, et exécuter un nœud qui indexe constamment un réseau connecté à une base de données
- SubQuery Query Service (_où nous obtenons les données de_) : Un paquet ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) qui interagit avec l'API GraphQL d'un noeud de SubQuery déployé pour interroger et voir les données indexées
- GraphQL (_comment nous interrogeons les données_) : Un langage de requête pour les APIs qui est spécifiquement adapté pour des données flexibles basées sur des graphiques - voir [graphql.org](https://graphql.org/learn/)
