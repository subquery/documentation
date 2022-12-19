# Preguntas Frecuentes

## ¿Qué es SubQuery?

SubQuery es un indexador de datos de blockchain de código abierto para desarrolladores que brinda APIs rápidas, flexibles, confiables y descentralizadas para potenciar aplicaciones multi-cadena.

Nuestro objetivo es ahorrar tiempo y dinero a los desarrolladores eliminando la necesidad de construir su propia solución de indexación. Ahora, pueden centrarse plenamente en desarrollar sus aplicaciones. Subquery ayuda a los desarrolladores a crear los productos descentralizados del futuro.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Presentando la Red SubQuery" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Servicio Administrado**

Subquery también provee alojamiento gratuito, de grado de producción de proyectos para desarrolladores. Nuestro Servicio Administrado elimina la responsabilidad de administrar la infraestructura, para que los desarrolladores hagan lo que mejor hacen: construir. Descubre más [aquí](/run_publish/publish.md).

**La red de SubQuery**

La red SubQuery permite a los desarrolladores descentralizar completamente su pila de infraestructura. Es el servicio de datos más abierto, eficiente, fiable y escalable para dApps. SubQuery Network indexa y da servicio a la comunidad global de una manera incentivada y verificable. Después de publicar tu proyecto en SubQuery Network, cualquiera puede indexarlo y alojarlo - proporcionando datos a los usuarios de todo el mundo de manera más rápida y fiable.

Más información [aquí](/subquery_network/introduction.md).

## ¿Cuál es la mejor manera de comenzar con SubQuery?

La mejor manera de empezar con SubQuery es probar nuestro [tutorial de Hola Mundo](/assets/pdf/Hello_World_Lab.pdf). Esta es una simple caminata de 5 minutos a pie. Descargue la plantilla de inicio, construya el proyecto, use Docker para ejecutar un nodo en su host local y ejecute una consulta simple.

## ¿Cómo puedo contribuir o dar comentarios a SubQuery?

Nos encantan las contribuciones y comentarios de la comunidad. Para contribuir con el código, bifurca el repositorio de su interés y realice sus cambios. Luego envíe un PR o Pull Request. No te olvides de probar también. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

Para dar comentarios, contáctanos a hello@subquery.network o salta a nuestro [canal de discord](https://discord.com/invite/78zg8aBSMG).

## ¿Cuánto cuesta alojar mi proyecto en SubQuery Projects?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## ¿Qué son las ranuras de despliegue?

Las ranuras de despliegue son una característica en [SubQuery Proyects](https://project.subquery.network) que es el equivalente a un entorno de desarrollo. Por ejemplo, en cualquier organización de software normalmente hay un entorno de desarrollo y un entorno de producción como mínimo (ignorando que localhost lo está). Normalmente se incluyen entornos adicionales como la puesta en escena y pre-prod o incluso el QA dependiendo de las necesidades de la organización y de su configuración de desarrollo.

SubQuery tiene actualmente dos espacios disponibles. Una ranura de montaje y una ranura de producción. Esto permite a los desarrolladores desplegar su SubQuery en el entorno de instalación y si todo va bien, "promover a la producción" con el clic de un botón.

## ¿Cuál es la ventaja de una ranura de montaje?

El principal beneficio de usar una ranura de montaje es que te permite preparar una nueva versión de tu proyecto SubQuery sin exponerlo públicamente. Puede esperar a que la ranura de puesta en escena vuelva a indexar todos los datos sin afectar a sus aplicaciones de producción.

La ranura para montaje no se muestra al público en el [explorador](https://explorer.subquery.network/) y tiene una URL única que solo es visible para usted. Y, por supuesto, el entorno separado le permite probar su nuevo código sin afectar a la producción.

## ¿Qué son los extrínsecos de Polkadot?

Si ya estás familiarizado con los conceptos de blockchain, puedes pensar en los extrinsecos como comparables a las transacciones. Sin embargo, más formalmente un extrínseco es una pieza de información que viene de fuera de la cadena y está incluida en un bloque. Hay tres categorías de extrínsecos. Son inherentes, transacciones firmadas y transacciones no firmadas.

Los extrínsecos inherentes son piezas de información que no están firmadas y sólo insertadas en un bloque por el autor del bloque.

Los extrínsecos de transacción firmada son transacciones que contienen una firma de la cuenta que emitió la transacción. Pagarán una comisión para que la transacción esté incluida en la cadena.

Las transacciones extrínsecas no firmadas son transacciones que no contienen una firma de la cuenta que emitió la transacción. Las transacciones extrínsecas no firmadas deben ser utilizadas con cuidado porque no hay nadie que pague una cuota, porque no están firmadas. Debido a esto, la cola de transacciones carece de lógica económica para prevenir el spam.

Para más información, haz clic [aquí](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## ¿Cuál es el punto final para la red Kusama?

El network.endpoint para la red de Kusama es `wss://kusama.api.onfinality.io/public-ws`.

## ¿Cuál es el punto final para la red principal Polkadot?

El network.endpoint para la red Polkadot es `wss://polkadot.api.onfinality.io/public-ws`.

## ¿Cómo desarrollo iterativamente el esquema de mi proyecto?

Un problema conocido con el desarrollo de un esquema de proyecto cambiante es que al lanzar su nodo de SubQuery para pruebas, los bloques previamente indexados serán incompatibles con su nuevo esquema. Para desarrollar esquemas de forma iterativa, los bloques indexados almacenados en la base de datos deben ser borrados, esto puede lograrse lanzando su nodo con la bandera `--force-clean`. Por ejemplo:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Tenga en cuenta que se recomienda usar `--force-clean` al cambiar el `startBlock` dentro del manifiesto del proyecto (`proyecto. aml`) para comenzar a reindexar desde el bloque configurado. Si `startBlock` se cambia sin un `--force-clean` del proyecto entonces el indexador continuará indexando con el `startBlock` previamente configurado.

## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. Here is the list of some suggestions:

- Avoid using block handlers where possible.
- Query only necessary fields.
- Try to use filter conditions to reduce the response size. Create filters as specific as possible to avoid querying unnecessary data.
- For large data tables, avoid querying `totalCount` without adding conditions.
- Add indexes to entity fields for query performance, this is especially important for historical projects.
- Set the start block to when the contract was initialised.
- Always use a [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (we can help create one for your new network).
- Optimise your schema design, keep it as simple as possible.
  - Try to reduce unnecessary fields and columns.
  - Create indexes as needed.
- Use parallel/batch processing as often as possible.
  - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.
  - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
  - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one.
- Making API calls to query state can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data.
- Use `worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. For now, it is only available for Substrate and Cosmos and will soon be integrated for Avalanche.
- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.
- Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers and can be implemented like so below in your project manifest.
