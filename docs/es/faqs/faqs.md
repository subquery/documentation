# Preguntas Frecuentes

## ¿Qué es SubQuery?

SubQuery es un proyecto de código abierto que permite a los desarrolladores indexar, transformar y consultar datos en cadena de Substrate para potenciar sus aplicaciones.

SubQuery también proporciona alojamiento gratuito con grado de producción de proyectos para desarrolladores, eliminando la responsabilidad de la infraestructura de gestión y dejar que los desarrolladores hagan lo que hacen mejor - construir.

## ¿Cuál es la mejor manera de comenzar con SubQuery?

La mejor manera de empezar con SubQuery es probar nuestro [tutorial de Hola Mundo](/assets/pdf/Hello_World_Lab.pdf). Este es un simple paseo de 5 minutos para descargar la plantilla de inicio, construir el proyecto, y luego usar Docker para ejecutar un nodo en su localhost y ejecutar una simple consulta.

## ¿Cómo puedo contribuir o dar comentarios a SubQuery?

Nos encantan las contribuciones y comentarios de la comunidad. Para contribuir con el código, bifurca el repositorio de interés y realice sus cambios. Luego envíe un PR o Pull Request. ¡Oh, no te olvides del test probar también! Consulte también nuestras líneas de guía de contribuciones (TBA).

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## ¿Cuánto cuesta alojar mi proyecto en SubQuery Projects?

Hospedar tu proyecto en SubQuery Projects es absolutamente gratuito - es nuestra manera de devolver a la comunidad. Para aprender cómo alojar tu proyecto con nosotros, por favor revisa el tutorial [Hola Mundo (hospedado en SubQuery)](../run_publish/publish.md).

## ¿Qué son las ranuras de despliegue?

Las ranuras de despliegue son una característica en [SubQuery Proyects](https://project.subquery.network) que es el equivalente a un entorno de desarrollo. For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. This allows developers to deploy their SubQuery to the staging environment and all going well, "promote to production" at the click of a button.

## What is the advantage of a staging slot?

The main benefit of using a staging slot is that it allows you to prepare a new release of your SubQuery project without exposing it publicly. You can wait for the staging slot to reindex all data without affecting your production applications.

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## What are Polkadot's Extrinsics?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.
