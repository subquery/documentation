# Despliega una nueva versión de tu proyecto SubQuery

## Indicaciones

Aunque siempre tienes la libertad de actualizar e implementar nuevas versiones de tu proyecto SubQuery, por favor tenga en cuenta durante este proceso si su proyecto SubQuery es público para el mundo. Algunos puntos clave a tener en cuenta:

- Si su actualización es un cambio de ruptura, cree un nuevo proyecto (p. ej. `Mi SubQuery Project V2`) o advierte a tu comunidad de los cambios a través de los canales de las redes sociales.
- El despliegue de una nueva versión del proyecto SubQuery causa algún tiempo de inactividad a medida que la nueva versión indexa la cadena completa del bloque de génesis.

## Desplegar Cambios

Inicie sesión en SubQuery Project y seleccione el proyecto del que desea desplegar una nueva versión. Puede elegir entre desplegar en la zona de producción o de puesta en escena. Estos dos espacios son entornos aislados y cada uno tiene sus propias bases de datos y sincronizan de forma independiente.

Recomendamos desplegar en su puesto de trabajo sólo para las pruebas finales de puesta en escena o cuando necesite resinc los datos de su proyecto. Entonces se puede promover a la producción sin tiempo de inactividad. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

La ranura de montaje es perfecta para:

- Validación final de los cambios en su SubQuery Project en un entorno separado. La ranura de staging (montaje) tiene una URL diferente a la de producción que puedes usar en tus dApps.
- Calentando e indexando datos para un proyecto actualizado de SubQuery para eliminar los tiempos de inactividad en tu dApp
- Preparando una nueva versión para su SubQuery Project sin exponerla públicamente. El espacio para escenarios no se muestra al público en el explorador y tiene una URL única que solo es visible para usted.

![Ranura provisional](/assets/img/staging_slot.png)

#### Actualizar al último Indexador y Servicio de Consultas

Si solo desea actualizar al último indexador ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) o al servicio de consulta ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) para aprovechar nuestras mejoras regulares de rendimiento y estabilidad, sólo tiene que seleccionar una versión más reciente de nuestros paquetes y guardar. Esto solo causará unos minutos de inactividad.

#### When using `@subql/cli`
#### Requirement
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.
```
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```
#### Deploy New Version of your SubQuery Project

Rellena el Hash de Compromiso desde GitHub (copia el hash de commit completo) de la versión de tu proyecto de SubQuery código base que quieras desplegar. Esto causará un tiempo de inactividad más largo dependiendo del tiempo que tarda en indexar la cadena actual. Siempre puede reportar aquí para que avance.

## Siguiente paso - Conecta a tu proyecto

Una vez que el despliegue se ha completado correctamente y nuestros nodos han indexado sus datos de la cadena, podrás conectarte a tu proyecto a través del punto final de la Consulta mostrada en GraphQL.

![Proyecto en despliegue y sincronización](/assets/img/projects-deploy-sync.png)

Alternativamente, puedes hacer clic en los tres puntos al lado del título de tu proyecto, y verlo en SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
