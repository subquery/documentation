# Підписки

## Що таке Підписка GraphQL

SubQuery теперь также поддерживает подписки Graphql. Як і запити, підписки дозволяють отримувати дані. На відміну від запитів, підписки є довготривалими операціями, які можуть змінювати свій результат з часом.

Підписки дуже корисні, коли ви хочете, щоб ваша клієнтська програма змінювала дані або показувала нові дані, як тільки ця зміна станеться або нові дані стануть доступними. Підписки дозволяють вам *підписатися* на ваш проект SubQuery для отримання змін.

::: info Note Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). :::

## Як підписатися на істоту

Основним прикладом підписки на GraphQL є повідомлення про створення нових об’єктів. У наведеному нижче прикладі ми підписуємось на об’єкт `Transfer` і отримуємо оновлення, коли в цій таблиці вносяться зміни.

Вы можете создать подписку, запросив конечную точку GraphQL следующим образом. Тоді ваше з’єднання підпишеться на будь-які зміни, внесені до таблиці об’єктів ` Transfer `.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Тіло об’єкта у вашому запиті вказує, які дані ви хочете отримувати через свою підписку, коли оновлюється таблиця ` Transfer `:
- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: дія, зроблена з цією сутністю. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: значення самої сутності у форматі JSON.

## Фільтрація

Ми також підтримуємо фільтр для підписок, що означає, що клієнт повинен отримувати оновлені дані підписки, лише якщо ці дані або мутація відповідають певним критеріям.

Ми підтримуємо два типи фільтрів:

- `id` : фільтр, щоб повертати лише зміни, які впливають на певну сутність (позначену ідентифікатором).
- `mutation_type`: лише той самий тип мутації повертає оновлення.

Припустимо, що у нас є об’єкт ` Balances `, і він записує баланс кожного рахунку.

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

Якщо ми хочемо підписатися на будь-які оновлення балансу, які впливають на певний обліковий запис, ми можемо вказати фільтр підписки таким чином:

```graphql
subscription {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

::: warning Important Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions. :::

::: warning Important
The subcription feature works on SubQuery's managed service when you directly call the listed GraphQL endpoint. Він не працюватиме на ігровому майданчику GraphQL у браузері.
:::
