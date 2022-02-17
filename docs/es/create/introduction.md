# Tutoriales y ejemplos

En la guía [de inicio rápido](/quickstart/quickstart.md) encontraremos un ejemplo para darle una muestra de lo que es SubQuery y cómo funciona. Aquí veremos más de cerca el flujo de trabajo al crear tu proyecto y los archivos clave con los que trabajarás.

## SubQuery Ejemplos

Algunos de los siguientes ejemplos asumirán que ha iniciado con éxito el paquete de inicio en la sección [Inicio rápido](../quickstart/quickstart.md). Desde ese paquete de inicio, pasaremos por el proceso estándar para personalizar e implementar su proyecto SubQuery.

1. Inicia tu proyecto usando `subql init PROJECT_NAME`.
2. Actualizar el archivo de manifiesto ( `project.yaml`) para incluir información sobre tu blockchain, y las entidades que vas a mapear - ver [Archivo de manifiesto](./manifest.md)
3. Crear entidades GraphQL en tu esquema (`schema.graphql`) que definen la forma de los datos que extraerás y persistirá para la consulta - vea [Esquema GraphQL](./graphql.md)
4. Agrega todas las funciones de mapeo (por ejemplo, `mappingHandlers.ts`) que desea invocar para transformar los datos de cadena a las entidades GraphQL que ha definido - vea [Mapeo](./mapping.md)
5. Generar, compilar, y publique su código en los Proyectos SubQuery (o ejecute en su propio nodo local) - vea [Ejecutando y consultando su Proyecto de inicio](./quickstart.md#running-and-querying-your-starter-project) en nuestra guía de inicio rápido.

## Estructura del Directorio

El siguiente mapa proporciona una visión general de la estructura de directorio de un proyecto de SubQuery cuando se ejecuta el comando `init`.

```
- nombre-proyecto
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Example

![Estructura de directorios de SubQuery](/assets/img/subQuery_directory_stucture.png)

## Generación de Código

Cada vez que cambie sus entidades en GraphQL, debe regenerar su directorio de tipos con el siguiente comando.

```
yarn codegen
```

Esto creará un nuevo directorio (o actualizará el existente) `src/types` que contienen clases de entidad generadas para cada tipo que haya definido previamente en `schema.graphql`. Estas clases proporcionan la carga de entidad segura de tipos, acceso de lectura y escritura a los campos de la entidad - vea más sobre este proceso en [el esquema GraphQL](./graphql.md).

## Compilar

Para ejecutar tu proyecto SubQuery en un nodo SubQuery alojado localmente, primero necesitas compilar tu trabajo.

Ejecuta el comando de compilación desde el directorio raíz del proyecto.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

Con esto puede definir puntos de entrada adicionales para construir usando el campo exports en package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Entonces ejecutando `subql build` generará una carpeta de dist con la siguiente estructura:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Tenga en cuenta que construirá `index.ts` si se especifica o no en el campo de exportación.

Para obtener más información sobre cómo usar esto incluyendo banderas, consulte [referencia de cli](https://doc.subquery.network/references/references/#build).

## Registros

The `console.log` method is **no longer supported**. En su lugar, se ha inyectado un módulo `logger` en los tipos, lo que significa que podemos soportar un registrador que puede aceptar varios niveles de registro.

```typescript
logger.info('Mensaje de nivel de información');
logger.debug('Mensaje de nivel de depuración');
logger.warn('Mensaje de nivel de advertencia');
```

Para usar `logger.info` o `logger.warn`, simplemente coloque la línea en su archivo de mapeo.

![logging.info](/assets/img/logging_info.png)

Para usar `logger.debug`, se requiere una bandera adicional. Agrega `--log-level=debug` a tu línea de comando.

Si está ejecutando un contenedor docker, agregue esta línea a su archivo `docker-compose.yaml`.

![logging.debug](/assets/img/logging_debug.png)

Ahora debería ver el nuevo registro en la pantalla del terminal.

![logging.debug](/assets/img/subquery_logging.png)
