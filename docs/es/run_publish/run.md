# Ejecutar SubQuery Localmente

Esta guía trabaja sobre cómo ejecutar un nodo local de SubQuery en su infraestructura, que incluye tanto el indexador como el servicio de consultas. ¿No quieres preocuparte por ejecutar tu propia infraestructura de SubQuery? SubQuery proporciona un [servicio administrado](https://explorer.subquery.network) a la comunidad de forma gratuita. [Sigue nuestra guía de publicación](../run_publish/publish.md) para ver cómo puedes subir tu proyecto a [SubQuery Projects](https://project.subquery.network).

## Usando Docker

Una solución alternativa es ejecutar un <strong>Contenedor Docker</strong>, definido por el archivo `docker-compose.yml`. Para un nuevo proyecto que ha sido inicializado no necesitarás cambiar nada aquí.

Bajo el directorio del proyecto ejecute el siguiente comando:

```shell
docker-compose pull && docker-compose up
```

Puede tomar algo de tiempo descargar los paquetes necesarios ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), y Postgres) por primera vez, pero pronto verás un nodo SubQuery en ejecución.

## Ejecutando un Indexador (subql/node)

Requisitos:

- [Postgres](https://www.postgresql.org/) base de datos (versión 12 o superior). Mientras que el nodo de [SubQuery](#start-a-local-subquery-node) indexa la blockchain, los datos extraídos se almacenan en una instancia de base de datos externa.

Un nodo de SubQuery es una implementación que extrae datos de blockchain basados en Substrate/Polkadot por el proyecto SubQuery y lo guarda en una base de datos de Postgres.

### Instalación

<CodeGroup> ``` shell # NPM npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title='Terra'> ``` shell # NPM npm install -g @subql/node-terra

Una vez instalado, puede iniciar un nodo con el siguiente comando:


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Para saber más, siempre puede ejecutar `--help`.

#### Apuntar a la ruta de proyecto local

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. En algunos casos, hemos visto incrementos de rendimiento de hasta 10x.

Un diccionario de cadena completa pre-indexa la ubicación de todos los eventos y extrinsics dentro de la cadena específica y permite que el servicio de nodo salte a lugares relevantes al indexar en lugar de inspeccionar cada bloque.

Puede añadir el punto final del diccionario en su proyecto `. archivo aml` (ver [Archivo de manifiesto](../create/manifest.md)), o especificarlo en tiempo de ejecución usando el siguiente comando:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'> ```shell subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary

Dependiendo de la configuración de la base de datos de Postgres (p.ej. una contraseña de base de datos), por favor asegúrate de que tanto el indexador (`subql/node`) como el servicio de consulta (`subql/query`) puedan establecer una conexión con él.

#### Especifique un archivo de configuración

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config. ml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config. ml
```

</CodeGroupItem>
</CodeGroup>

Esto apunta el nodo de consulta a un archivo de configuración que puede estar en formato YAML o JSON. Mira el ejemplo a continuación.

```yaml
subconsulta: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Cambiar el tamaño del lote de la búsqueda de bloques

```shell
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

Cuando el indexador primero indexa la cadena, la obtención de bloques individuales reducirá significativamente el rendimiento. Aumentar el tamaño del lote para ajustar el número de bloques obtenidos reducirá el tiempo total de procesamiento. El tamaño del lote por defecto actual es 100.

#### Ejecutar en modo local

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. Cambiar al modelo local creará tablas Postgres en el esquema predeterminado `public`.

Si no se utiliza el modo local, se creará un nuevo esquema de Postgres con la `subconsulta_ inicial` y las tablas de proyecto correspondientes.

#### Compruebe la salud de su nodo

Hay dos extremos que puede utilizar para comprobar y supervisar el estado de salud de un nodo SubQuery en ejecución.

- Resultado del chequeo de salud que devuelve una respuesta simple de 200
- Extremo de metadatos que incluye análisis adicionales de su nodo SubQuery en ejecución

Agregue esto a la URL base de su nodo SubQuery. Por ejemplo, `http://localhost:3000/meta` devolverá:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` devolverá HTTP 200 si tiene éxito.

Se devolverá un error de 500 si el indexador no está sano. Esto se puede ver a menudo cuando el nodo se está iniciando.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Si se utiliza una URL incorrecta, se devolverá un error 404 no encontrado.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Depurar tu proyecto

Utilice el [inspector de node](https://nodejs.org/en/docs/guides/debugging-getting-started/) para ejecutar el siguiente comando.

```shell
export Db_USER=postgres
export Db_PASS=postgres
export Db_DATABASE=postgres
export Db_HOST=localhost
export Db_PORT=5432
subql-node -f your-project-path
```

Ejemplo

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Luego abre las herramientas de desarrollo de Chrome, ve a Source > Filesystem y añade tu proyecto al área de trabajo y comienza a depurar. Para obtener más información, consulte [Cómo depurar un proyecto de SubQuery](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Ejecutar un Servicio de Consulta (subql/query)

### Instalación

```shell
# NPM
npm install -g @subql/cli
```

Tenga en cuenta que **NO** animamos el uso de `yarn global` debido a su mala gestión de dependencias que puede llevar a errores en la línea.

### Ejecutar el servicio de consulta

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Asegúrese de que el nombre del proyecto es el mismo que el nombre del proyecto cuando [inicialice el proyecto](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project). Además, compruebe que las variables de entorno son correctas.

Después de ejecutar el servicio subql-query con éxito, abre tu navegador y ve a `http://localhost:3000`. Deberías ver un parque de juegos GraphQL que se muestre en el Explorador y el esquema que está listo para consultar.
