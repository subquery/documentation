# Terminología

- SubQuery Project (_donde sucede la magia_): Una definición ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) de cómo un SubQuery Node debe recorrer y agregar una red de proyectos y cómo los datos deben transformarse y almacenarse para permitir consultas útiles en GraphQL
- SubQuery Node (_donde se realiza el trabajo_): Un paquete ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) que aceptará la definicion del proyecto SubQuery, y ejecutar un nodo que indexa constantemente una red conectada a una base de datos
- Servicio de consulta SubQuery (_donde obtenemos los datos de_): Un paquete ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) que interactúa con la API GraphQL de un nodo de subconsulta desplegado para consultar y ver los datos indexados
- GraphQL (_cómo consultamos los datos_): Un ángulo de consulta para API que es especialmente adecuado para datos flexibles basados en gráficos - ver [graphql.org](https://graphql.org/learn/)
