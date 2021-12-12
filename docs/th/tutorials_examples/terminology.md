# คำศัพท์

- โปรเจค SubQuery (*ที่ที่เวทมนตร์เกิดขึ้น*): คำจำกัดความ ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) ของวิธีที่ SubQuery Node ควรสำรวจและรวมเครือข่ายโครงการและวิธีที่ข้อมูลควรแปลง และเก็บไว้เพื่อเปิดใช้งานการสืบค้น GraphQL ที่เป็นประโยชน์
- SubQuery Node (*where the work is done*): A package ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) that will accept a SubQuery project definiton, and run a node that constantly indexes a connected network to a database
- SubQuery Query Service (*where we get the data from*): A package ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) that interacts with the GraphQL API of a deployed SubQuery node to query and view the indexed data
- GraphQL (*how we query the data*): A query langage for APIs that is specifically suited for flexible graph based data - see [graphql.org](https://graphql.org/learn/)