# การจำกัดความ

- โปรเจค SubQuery (*ที่ที่เวทมนตร์เกิดขึ้น*): คำจำกัดความ ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) ของวิธีที่ SubQuery Node ควรสำรวจและรวมเครือข่ายของโปรเจค และวิธีที่ข้อมูลควรแปลง และเก็บไว้เพื่อเปิดใช้งานการสืบค้น GraphQL ที่เป็นประโยชน์
- SubQuery Node (*ที่ซึ่งงานจะถูกทำให้เสร็จสิ้น*): แพ็คเกจ ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) ที่จะยอมรับคำจำกัดความของโปรเจ็ก SubQuery และรันโหนดที่มีการจัดทำดัชนีของเครือข่ายที่เชื่อมต่อกับฐานข้อมูลอย่างต่อเนื่อง
- SubQuery Query Service (*where we get the data from*): A package ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) that interacts with the GraphQL API of a deployed SubQuery node to query and view the indexed data
- GraphQL (*how we query the data*): A query langage for APIs that is specifically suited for flexible graph based data - see [graphql.org](https://graphql.org/learn/)