# Marcas de línea de comandos

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     COmpila el codigo del proyecto de SubQuery
  codegen   Genera esquemas del nodo graph
  help      Mostrar ayuda para subql
  init      Inicializar un proyecto de subquery de andamio
  migrate  Migra el manifiesto del proyecto de subquery v0.0.1 a v0.2.0
  publish   Cargue este proyecto SubQuery a IPFS
  validate  Verifique que una carpeta o un repositorio de github sea un proyecto de subconsulta validado
```

### compilar

Este comando utiliza webpack para generar un paquete de un proyecto de subconsulta.

| Opciones           | Descripción                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| -l, --location     | carpeta local del proyecto de subconsultas (si aún no está en la carpeta)     |
| -o, --output       | especificar carpeta de salida de compilación, p. ej., carpeta de construcción |
| --mode=(producción | prod | desarrollo | dev) | [ predeterminado: producción ]                     |

- Con `subql build` puedes especificar puntos de entrada adicionales en el campo de exportación, aunque siempre construirá `index.ts` automáticamente

- Necesitas tener @subql/cli v0.19.0 o superior para usar el campo exportación.

- Cualquier campo `exporta` debe mapear al tipo de cadena (por ejemplo, `"entry": "./src/file.ts"`), de lo contrario será ignorado desde compilación.

[Ejemplo más cercano](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Esto muestra las opciones de ayuda.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project   [deprecated] [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                [deprecated] [boolean]
      --force-clean         Force clean the database, dropping project schemas
                            and tables                                 [boolean]
      --db-schema           Db schema name of the project               [string]
      --unsafe              Allows usage of any built-in module within the
                            sandbox                    [boolean][default: false]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --scale-batch-size    scale batch size based on memory usage
                                                      [boolean] [default: false]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                      [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
```

### --version

Esto muestra la versión actual.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Utiliza este parametro para iniciar el proyecto SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (obsoleto)

Este parámetro te permite proporcionar un nombre para tu proyecto que actúa como si creara una instancia de tu proyecto. Al proporcionar un nuevo nombre, se crea un nuevo esquema de base de datos y bloquea la sincronización a partir de cero. Desaprobado a favor de `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Todas estas configuraciones pueden ser colocadas en un archivo .yml o .json y luego referenciadas con el parámetro de configuración.

Ejemplo del archivo subquery_config.yml:

```shell
subquery: . // Mandatory. Esta es la ruta local del proyecto. El período aquí significa el directorio local actual.
subqueryName: hello // Nombre opcional
batchSize: 55 // Configuración opcional
```

Coloque este archivo en el mismo directorio que el proyecto. Luego en el directorio actual del proyecto, ejecutar:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (obsoleto)

Este parámetro se utiliza principalmente para propósitos de depuración donde crea la tabla starter_entity por defecto en el esquema "postgres".

```shell
subql-node -f . --local
```

Tenga en cuenta que una vez que use este parametro, eliminarla no significará que apunte a otra base de datos. Para redirigir a otra base de datos tendrás que crear una NUEVA base de datos y cambiar la configuración de env a esta nueva base de datos. En otras palabras, "exportar DB_DATABASE=<new_db_here>"

### --force-clean

Esta bandera obliga a regenerar los esquemas y tablas del proyecto, útil para usar en el desarrollo iterativo de esquemas graphql de tal manera que las nuevas ejecuciones del proyecto siempre están trabajando con un estado limpio. Tenga en cuenta que esta bandera también borrará todos los datos índices.

### --db-esquema

Esta bandera le permite proporcionar un nombre para el esquema de base de datos del proyecto. Al proporcionar un nuevo nombre, se crea un nuevo esquema de base de datos con el nombre configurado y el indexado de bloques.

```shell
subql-node -f . --db-schema=test2
```

### --inseguro

Los proyectos de SubQuery se ejecutan normalmente en un entorno de pruebas javascript para la seguridad que limita el alcance del acceso que tiene el proyecto a su sistema. El entorno de pruebas limita las importaciones disponibles de javascript a los siguientes módulos:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Aunque esto mejora la seguridad, entendemos que esto limita la funcionalidad disponible de su SubQuery. El comando `--unsafe` importa todos los módulos javascript por defecto, lo que aumenta enormemente la funcionalidad sandbox con el ajuste de seguridad decreciente.

**Ten en cuenta que el comando `--unsafe` evitará que tu proyecto se ejecute en SubQuery Network, y debe ponerse en contacto con el soporte técnico si desea que este comando se ejecute con su proyecto en el servicio administrado de SubQuery ([proyecto. ubquery.network](https://project.subquery.network))**

### --batch-size

Este parámetro le permite establecer el tamaño del lote en la línea de comandos. Si el tamaño por lotes también es establecido en el archivo de configuración, esto tiene precedentes.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> Bloque INFO [6601,6620], total 20 bloques
2021-08-09T23:24:45. 06Z <fetch> Bloque de INFO [6621,6640], total 20 bloques
2021-08-09T23:24:47. 15Z <fetch> Bloque del INFO [6641,6660], total 20 bloques
2021-08-09T23:24:49.235Z <fetch> Bloque del INFO [6661,6680], total 20 bloques
```

### --escala-tamaño-lote-

Escala el tamaño del lote de la búsqueda de bloques con el uso de memoria

### --timeout

Establecer tiempo de espera personalizado para el sandbox javascript para ejecutar funciones de mapeo sobre un bloque antes de que la función de mapeo de bloques arroje una excepción de tiempo de espera

### --debug

Esto genera información de depuración a la salida de la consola y establece forzosamente el nivel de registro para depurar.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Esto muestra información del perfil.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10. 61Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> bloque de recogida INFO [3801,3900], total 100 bloques
```

### --network-endpoint

Este parámetro permite a los usuarios sobreescribir la configuración del extremo de red desde el archivo de manifiesto.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Tenga en cuenta que esto también debe establecerse en el archivo manifiesto, de lo contrario obtendrás:

```shell
ERROR ¡Error al crear proyecto de subquery de una ruta dada! Error: falló al analizar project.yaml.
Una instancia de ProjectManifestImpl ha fallado la validación:
 - la red de propiedades ha fallado las siguientes restricciones: isObject
 - red de propiedades. etwork ha fallado las siguientes restricciones: validación anidada
```

### --output-fmt

Hay dos formatos de salida de terminales diferentes. JSON o colorido. El color es el predeterminado y contiene texto colorido.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colorored
2021-08-10T11:57:41.480Z <subql-node> El nodo INFO comenzó
(node:24707) [PINODEP007] Advertencia: bindings.level está desaprobado, usa opciones. evel option en su lugar
2021-08-10T11:57:48.981Z <fetch> INFO bloque de obtención [10201,10300], total 100 bloques
2021-08-10T11:57:51. 62Z <fetch> Bloque de recogida INFO [10301,10400], total 100 bloques
```

### --log-level

Hay 7 opciones para elegir. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. El siguiente ejemplo muestra "silent". No se imprimirá nada en el terminal, así que la única manera de saber si el nodo está funcionando o no, es consultar la base de datos para el conteo de filas (select count(\*) from subquery_1. tarter_entities) o consulta la altura de bloque.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use la opción options.level en su lugar
(Use `node --trace-warnings . .` para mostrar donde se creó la advertencia)
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use opciones. evel option en su lugar
(node:24686) [PINODEP007] Warning: bindings.level is depreced, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings. evel está obsoleto, use la opción options.level en su lugar
(node:24686) [PINODEP007] Advertencia: bindings. evel está desaprobado, use la opción options.level en su lugar
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use opciones. evel option en su lugar
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use options.level option en su lugar
(node:24686) [PINODEP007] Advertencia. evel está desaprobado, use la opción options.level en su lugar
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use opciones. evel option en su lugar
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are obpreced. Por favor, utilice la propiedad detallada.
(node:24686) [PINODEP007] Advertencia: bindings.level está desaprobado, use la opción options.level en su lugar
```

<!-- ### --migrate TBA -->

### --timestamp-field

Por defecto esto es verdad. cuando se establece a falso con:

```shell
> subql-node -f . –timestamp-field=false
```

Esto elimina las columnas created_at y updated_at en la tabla starter_entities.

### -d, --network-dictionary

Esto te permite especificar un endpoint del diccionario que es un servicio gratuito que se proporciona y aloja en: [https://explorer.subquery. etwork/](https://explorer.subquery.network/) (buscar diccionario) y presenta un endpoint API de: https://api.subquery.network/sq/subquery/dictionary-polkadot

Normalmente esto se establecería en el archivo manifest pero a continuación muestra un ejemplo de usarlo como un argumento en la línea de comandos.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

Dependiendo de la configuración de su base de datos de Postgres (por ejemplo, una contraseña de base de datos diferente), asegúrese también de que tanto el indexador (` subql / node `) como el servicio de consulta (` subql / query `) puede establecer una conexión con él.

### -p, --puerto

El puerto al que se une el servicio de indexación de subconsultas. Por defecto se establece en `3000`

## subql-query

### --help

Esto muestra las opciones de ayuda.

```shell
Ns:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        project name                             [string] [required]
      --playground  enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [opciones: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [por defecto: "info"]
      --log-path Path para crear archivo de registro e. ./src/name. og          [string]
      --log-rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer Url that allows query to access indexer metadata    [string]
      --unsafe disable limits on query depth and allowable number returned
                    query records                                      [boolean]
  -p, --port El puerto al que el servicio se enlazará [número
```

### --version

Esto muestra la versión actual.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Este parámetro se utiliza para iniciar el servicio de consultas. Si el parámetro --subquery-name no se proporciona cuando se ejecuta un índice, el nombre aquí se referirá al nombre del proyecto por defecto. Si --subquery-name está establecido, entonces el nombre debería coincidir con lo que se estableció.

```shell
> subql-node -f . // --subquery-name no establecer

> subql-query -n subql-helloworld --playground // el nombre predeterminado del directorio del proyecto
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground // el nombre apunta al proyecto subql-helloworld pero con el nombre de hiworld
```

### --playground

Esta opción permite que el campo de juego graphql siempre debe ser incluido por defecto para ser de cualquier uso.

### --output-fmt

Ver [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

Ver [--log-level](https://doc.subquery.network/references/references.html#log-level)

### --log-path

Habilitar registro de archivos proporcionando una ruta a un archivo en el que registrar

### --log-rotar

Habilita las rotaciones del registro de archivos con las opciones de un intervalo de rotación 1d, un máximo de 7 archivos y con un tamaño máximo de archivo de 1GB

### --indexador

Establecer una url personalizada para la ubicación de los extremos del índice, el servicio de consulta utiliza estos extremos para la salud del indexador, metadatos y estado de preparación

### --inseguro

El servicio de consultas tiene un límite de 100 entidades para consultas gráficql sin límites. La bandera insegura elimina este límite que puede causar problemas de rendimiento en el servicio de consultas. En su lugar, se recomienda que las consultas sean [paginadas](https://graphql.org/learn/pagination/).

Esta bandera también se puede utilizar para habilitar ciertas funciones de agregación incluyendo suma, max, prog y [otros](https://github.com/graphile/pg-aggregates#aggregates).

Estas están desactivadas por defecto debido al límite de entidad.

**Ten en cuenta que el comando `--unsafe` evitará que tu proyecto se ejecute en SubQuery Network, y debes contactar con soporte si quieres que este comando se ejecute con tu proyecto en el proyecto de servicio administrado [de SubQuery. ubquery.network](https://project.subquery.network).**

### --puerto

El puerto al que se une el servicio de consulta de subconsultas. Por defecto se establece en `3000`
