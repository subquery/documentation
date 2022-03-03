# Термінологія

- SubQuery Project (*де відбувається магія*): визначення ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) про те, як SubQuery Node повинен трасувати і об'єднувати проекти і як дані повинні бути перетворені і збережені, щоб увімкнути корисні графічні запити GraphQL
- SubQuery Node (_де виконується робота_): Пакет ([`@subql/node`](https://www.npmjs.com/package/@subql/node)), який прийматиме визначення проекту SubQuery та запускатиме вузол, який постійно індексує підключену мережу до бази даних
- SubQuery Query Service (*Звідки ми отримуємо дані*): пакет ([`@subql/query`](https://www.npmjs.com/package/@subql/query)), який взаємодіє з API GraphQL розгорнутого вузла SubQuery для запиту та перегляду індексованих даних
- GraphQL (_як ми запитуємо дані_): мова запитів для API, яка спеціально підходить для гнучких даних на основі графіків - набір [graphql.org](https://graphql.org/learn/)