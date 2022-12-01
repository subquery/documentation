# Seguimiento automático del estado histórico

## Background

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Actualmente, SubQuery opera como un almacén de datos mutable, donde puede agregar, actualizar, eliminar, o cambiar de otro modo las entidades guardadas existentes en el conjunto de datos que es indexado por SubQuery. A medida que SubQuery indexa cada bloque, el estado de cada entidad puede ser actualizado o eliminado basándose en la lógica de su proyecto.

Un proyecto básico de SubQuery que indexe los balances de cuentas podría tener una entidad que se vea como la siguiente.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Indexación Histórica](/assets/img/historic_indexing.png
)

En el ejemplo anterior, el balance DOT de Alice cambia constantemente, y a medida que indexamos los datos, la propiedad `balance` en la entidad `Cuenta` cambiará. Un proyecto básico de SubQuery que indexa los balances de cuentas perderá estos datos históricos y sólo almacenará el estado de la altura del bloque de indexación actual. Por ejemplo, si actualmente indicamos para bloquear 100, los datos de la base de datos sólo pueden representar el estado de la cuenta de Alice en el bloque 100.

Entonces nos enfrentamos a un problema. Asumiendo que los datos han cambiado al indexar para bloquear 200, ¿cómo podemos preguntar el estado de los datos en el bloque 100?

## Seguimiento automático del estado histórico

SubQuery ahora automatiza el seguimiento histórico de entidades para todos los nuevos proyectos. Puedes consultar automáticamente el estado de tu proyecto de SubQuery a cualquier altura de bloque. Esto significa que puedes construir aplicaciones que permitan a los usuarios volver atrás en el tiempo o muestra cómo cambia el estado de tus datos con el tiempo.

En resumen, al crear, actualizar o eliminar cualquier entidad SubQuery, almacenamos el estado anterior con el rango de bloques para el que era válido. Luego puede consultar datos desde una altura de bloque específica usando los mismos extremos GraphQL y API.

## Activandolo

Esta característica está habilitada por defecto para todos los nuevos proyectos iniciados con al menos `@subql/node@1.1.1` y `@subql/query1.1.0`. Si quieres añadirlo a tu proyecto existente, actualice `@subql/node` y `@subql/query` y reindexe su proyecto con una base de datos limpia.

Si desea desactivar esta característica por cualquier razón, puede establecer el parámetro `--disable-historical=true` en `subql-node`.

Al iniciar, el estado actual de esta función se imprime en la consola (`estado histórico está habilitado`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Consultar Estado Histórico

Hay una propiedad especial (opcional) en el filtro de entidad GraphQL llamado `blockHeight`. Si omite esta propiedad, SubQuery preguntará el estado de la entidad en la altura del bloque actual.

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

Para consultar a los propietarios de RMRK NFTs a la altura del bloque 5,000,000, añada el parámetro blockHeight como se muestra a continuación:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      id
      name
      currentOwner
    }
  }
}
```

Para consultar a los propietarios de las colecciones RMRK NFTs a la última altura del bloque, omite el parámetro blockHeight como se muestra a continuación.

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      id
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. Например:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.

You can also use the reindex feature in the [SubQuery Managed Service](https://project.subquery.network).

## DB Schema

When the Automated Historical State Tracking is enabled, we make some key underlying changes to the DB tables to manage this for you automatically.

The below example shows the table of the `Account` entity provided before

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

| `id`      | `_id`                                  | `_block_range` | `balance` |
| --------- | -------------------------------------- | -------------- | --------- |
| `alice`   | `0e6a444d-cc33-415b-9bfc-44b5ee64d3f4` | `[0,1000)`     | `5`       |
| `alice`   | `943c3191-ea96-452c-926e-db31ab5b95c7` | `[1000,2000)`  | `15`      |
| `alice`   | `b43ef216-967f-4192-975c-b14a0c5cef4b` | `[2000,)`      | `25`      |
| `bob`     | `4876a354-bd75-4370-9621-24ce1a5b9606` | `[0,)`         | `15`      |
| `charlie` | `6e319240-ef14-4fd9-86e9-c788ff5de152` | `[1000,)`      | `100`     |
| ...       | ...                                    | ...            | ...       |

When the historical feature is enabled, the `id` field is no longer used as primary key for the database table, instead we automatically generate an unique GUID key `_id` for this row within the DB table.

The `_block_range` indicates the start to end block for this record using Postgres' [range type](https://www.postgresql.org/docs/current/rangetypes.html). For example, between block 0 to 999, `alice`'s `balance` is 5. Then from block 1000 to 1999, `alice`'s `balance` is 15.

`_id` and `_block_range` are not visible to end users via the query service (GraphQL API), they are internal datatypes automatically generated and handled by the query service.
