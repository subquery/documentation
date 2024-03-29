# Instalar SubQuery

Hay varios componentes requeridos al crear un proyecto SubQuery. La herramienta [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) se utiliza para crear proyectos de SubQuery. El componente [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) es requerido para ejecutar un indexador. La librería [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) es necesaria para generar consultas.

## Install @subql/cli

La herramienta [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ayuda a crear un framework de proyecto o un scaffold que significa que no tiene que empezar desde cero.

Instalar SubQuery CLI globalmente en tu terminal usando Yarn o NPM:

::: code-tabs @tab npm `bash npm install -g @subql/cli `
@tab:active yarn `shell yarn global add @subql/cli ` :::

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```

## Install @subql/node

Un nodo de SubQuery es una implementación que extrae datos de blockchain basados en substrate por el proyecto SubQuery y lo guarda en una base de datos de Postgres.

Instala la consulta de SubQuery globalmente en tu terminal usando Yarn o NPM:

::: code-tabs @tab npm `bash npm install -g @subql/node `
@tab:active yarn `shell yarn global add @subql/node ` :::

Once installed, you can can start a node with:

```shell
subql-node <command>
```

> Nota: Si estás usando Docker o alojando tu proyecto en Proyectos de SubQuery, puedes saltarte este paso. Esto se debe a que el nodo SubQuery ya se proporciona en el contenedor Docker y en la infraestructura de alojamiento.

## Install @subql/query

La biblioteca de consultas de SubQuery proporciona un servicio que le permite consultar su proyecto en un entorno de "playground" a través de su navegador.

Instala el nodo SubQuery globalmente en tu terminal usando Yarn o NPM:

::: code-tabs @tab npm `bash npm install -g @subql/query `
@tab:active yarn `shell yarn global add @subql/query ` :::

> Nota: Si estás usando Docker o alojando tu proyecto en Proyectos de SubQuery, puedes saltarte este paso también. Esto se debe a que el nodo SubQuery ya se proporciona en el contenedor Docker y en la infraestructura de alojamiento.
