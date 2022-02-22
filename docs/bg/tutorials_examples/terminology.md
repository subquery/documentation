# Терминология

- SubQuery Project (*where the magic happens*): A definition ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli))за това как възелът на SubQuery трябва да пресича и агрегира мрежата от проекти и как данните трябва да бъдат трансформирани и съхранени, за да включват полезни GraphQL заявки
- SubQuery Node (*where the work is done*): A package ([`@subql/node`](https://www.npmjs.com/package/@subql/node))което ще приеме дефиницията на проекта SubQuery и ще стартира възел, който постоянно индексира свързаната мрежа към базата данни
- SubQuery Query Service (*where we get the data from*): A package ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) that interacts with the GraphQL API of a deployed SubQuery node to query and view the indexed data
- GraphQL (*how we query the data*): A query langage for APIs that is specifically suited for flexible graph based data - see [graphql.org](https://graphql.org/learn/)