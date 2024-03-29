# Терминология

- SubQuery Project (_където се случват магиите_): Определение ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) за това как SubQuery Node трябва да преминава и агрегира мрежата от проекти и как данните трябва да бъдат трансформирани и съхранени, за да бъдат включени полезни GraphQL заявки
- SubQuery Node (_където се изпълнява работата_): Пакет ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) което ще приеме дефиницията на проекта SubQuery и ще стартира нода, която от своя страна постоянно индексира свързаната мрежа към базата данни
- Услуга за запитвания SubQuery (_откъдето получаваме данните_): Пакет ([`@subql/query`](https://www.npmjs.com/package/@subql/query)), взаимодействащ с GraphQL API на активната вече нода SubQuery за запитване и преглед на индексираните данни
- GraphQL (_как правим запитвания за данните_): Език за запитвания за APIs който е специално подходящ за гъвкави данни, базирани върху графици - виж[graphql.org](https://graphql.org/learn/)
