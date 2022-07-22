# Seguimiento automático del estado histórico

## Background

SubQuery le permite indexar cualquier dato que desee de Substrate, Avalance y otras redes. Actualmente, SubQuery opera como un almacén de datos mutable, donde puede agregar, actualizar, eliminar, o cambiar de otro modo las entidades guardadas existentes en el conjunto de datos que es indexado por SubQuery. A medida que SubQuery indexa cada bloque, el estado de cada entidad puede ser actualizado o eliminado basándose en la lógica de su proyecto.

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

## Consultar Estado Histórico

Hay una propiedad especial (opcional) en el filtro de entidad GraphQL llamado `blockHeight`. Si omite esta propiedad, SubQuery preguntará el estado de la entidad en la altura del bloque actual.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

Para consultar a los propietarios de RMRK NFTs a la altura del bloque 5,000,000, añada el parámetro blockHeight como se muestra a continuación:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
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
      name
      currentOwner
    }
  }
}
```