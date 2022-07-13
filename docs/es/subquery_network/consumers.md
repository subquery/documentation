# Consumidores

## ¿Qué es un consumidor?

Un Consumidor es un participante en la red de SubQuery y es un individuo u organización que paga los datos procesados y organizados de la SubQuery Network. Los consumidores efectivamente hacen solicitudes a la SubQuery Network para datos específicos y pagan una cantidad acordada de SQT a cambio.

Los consumidores son típicamente desarrolladores de dApp (aplicación descentralizada), empresas analíticas de datos, redes blockchain, desarrolladores de middleware, o incluso compañías de agregación web que necesitan acceso a datos de blockchain para proporcionar servicios a sus usuarios finales.

## Requisitos del consumidor

No hay requisitos como tales para convertirse en un Consumidor de Subconsulta. Sin embargo, los consumidores tendrán que entender cómo obtener SQT, cómo anunciar sus necesidades de datos y cómo consumir los datos devueltos JSON.

Los consumidores también pueden tener que entender cómo crear proyectos SubQuery para ser Indexados o contratar este trabajo a fin de obtener los datos en el formato que necesitan.

## Costo de servicio

El costo de consultar datos en el blockchain se basará en la oferta y la demanda y será comparable a otros servicios similares actualmente disponibles. La ventaja de una red y un ecosistema abiertos y transparentes es que se fomenta la competencia para ofrecer el mejor servicio al consumidor.

## ¿Opciones de pago para los consumidores?

Para flexibilidad, los consumidores tienen 3 opciones de pago para pagar los datos de blockchain. Estas son:

- Pagar a medida que vayas (PAYG)
- Acuerdo de Servicio Cerrado
- Acuerdo de Servicio Abierto

Puede leer más sobre los diferentes métodos de pago, cómo funcionan, y las ventajas o desventajas en el artículo [Métodos de pago](./payment-methods.md).

## Preguntas Frecuentes (FAQ)

### Como consumidor, ¿selecciono 1 Indexador o varios Indexadores?

A menos que se utilice un Acuerdo de Servicio Cerrado, habrá uno o más Indexadores que indizarán un proyecto de SubQuery. Los consumidores tienen la opción de elegir a la hora de decidir el Indexador del que leer los datos. Típicamente los consumidores seleccionarían el índice de latencia más confiable y más bajo. Los consumidores también podrían incorporar la tolerancia automática contra fallos y leer datos de otro Indexador si la primera vez sale o no responde.

### ¿Qué pasa si un Indexador sale de línea?

A menos que se utilice un acuerdo de servicio cerrado, y si hay más de un índice de su proyecto SubQuery, sería simplemente una cuestión de cambiar a otro índice. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
