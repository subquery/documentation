# Suscripciones

## Qué es una suscripción GraphQL

SubQuery ahora también soporta Suscripciones Graphql. Al igual que las consultas, las suscripciones le permiten obtener datos. A diferencia de las consultas, las suscripciones son operaciones de larga duración que pueden cambiar sus resultados con el tiempo.

Las suscripciones son muy útiles cuando desea que su aplicación cliente cambie datos o muestre algunos nuevos datos tan pronto como se produzca ese cambio o los nuevos datos estén disponibles. Subscriptions allow you to _subscribe_ to your SubQuery project for changes.

::: tip Note Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). :::

## Cómo suscribirse a una entidad

El ejemplo básico de una suscripción GraphQL es ser notificado cuando se crean nuevas entidades. En el siguiente ejemplo, nos suscribimos a la entidad `Transferir` y recibimos una actualización cuando hay algún cambio en esta tabla.

Puede crear la suscripción consultando el endpoint GraphQL de la siguiente manera. Su conexión se suscribirá a cualquier cambio realizado en la tabla de entidades `Transferencia`.

```graphql
subscripción {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

El cuerpo de la entidad en tu consulta indica qué datos quieres recibir a través de tu suscripción cuando se actualiza la tabla `Transferir`:

- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: La acción que se ha hecho a esta entidad. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: el valor de la entidad misma en formato JSON.

## Filtrado

También apoyamos el filtro en las suscripciones, lo que significa que un cliente sólo debe recibir datos actualizados de suscripción si esos datos o mutación cumplen ciertos criterios.

Hay dos tipos de filtros que apoyamos:

- `id` : Filtrar para devolver sólo los cambios que afectan a una entidad específica (designada por el ID).
- `mutation_type`: Sólo el mismo tipo de mutación será retornado una actualización.

Supongamos que tenemos una entidad `Saldos`y registra el saldo de cada cuenta.

```graphql
type Balances {
  id: ID! # cuenta de alguien, por ejemplo, 15rb4HVycC1KLHsd:/dV1x2TJAm.UD7PhubmhL3PnGv7RiGY
  monto: Int! # el saldo de esta cuenta
}
```

Si queremos suscribirnos a cualquier actualización de balance que afecte a una cuenta específica, podemos especificar el filtro de suscripción de la siguiente manera:

```graphql
suscripción {
  balances(
    id: "15rb4HVycC1KLHsdsrdV1x2TJAm)[video] D7PhubmhL3PnGv7RiGY"
    mutación: UPDATE
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
The subcription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. No funcionará dentro del campo de juego GraphQL del navegador.
:::
