# SubGraph Style Query Service

We support a query service that is compatible with the Subgraph query style `GraphQL` queries, which are a bit different from the native SubQuery query service.

Below is an introduction to how to install and use it in your project.

## Running using Docker

The [standard SubQuery hosting approach](../run.md#using-docker) is to use a Docker container, defined by the `docker-compose.yml` file. For a newly initialised project, you need to make the following changes here.

Modify `docker-compose.yml` to update the graphql-engine image to `subquerynetwork/query-subgraph`.

```
  graphql-engine:
    ### Usage subquerynetwork/query-subgraph image
    image: subquerynetwork/query-subgraph:latest
    ports:
      - 3000:3000
    depends_on:
      "postgres":
        condition: service_healthy
      "subquery-node":
        condition: service_healthy
    restart: always
    environment:
      DB_USER: postgres
      DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    command:
      - --name=app
```

Under the project directory run the following command:

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query-subgraph`](https://www.npmjs.com/package/@subql/query-subgraph), and Postgres) for the first time but soon you'll see a running SubQuery node.
:::

## Running Locally

If [running locally using Node](../run.md#running-subquery-locally), replace `@subql/query` with `@subql/query-subgraph`

Once installed, you can check the version by running:

```shell
> subql-query-subgraph --version
0.1.0
```

## Differences with SubQuery Native Query Service

We recommend using the [SubQuery Native query service](./graphql.md) for the best experience.

Find out more about [differences in the GraphQL Query Interface](../../build/graph-migration.md#differences-in-the-graphql-query-interface).

## Unsupported features

- JSON field filtering is not supported.
- Cursor-based queries are not supported.
- Subscriptions are not supported.
