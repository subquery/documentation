# Using Subgraph-style query

We support using `Subgraph` query style `GraphQL` queries, which are a bit different from `subquery` style. 
Below is an introduction to how to install it and the differences between it and subql-query.

## Install subql/query-subgraph

Then to run a SubQuery node, run the following command:

```shell
npm install -g @subql/query-subgraph
```

The `-g` flag means to install it globally which means on OSX, the location will be `/usr/local/lib/node_modules` .

Once installed, you can check the version by running:

```shell
> subql-query-subgraph --version
0.1.0
```


## Using Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. For a newly initialized project, you need to make the following changes here.

Modify docker-compose.yml to update the graphql-engine image to `subquerynetwork/query-subgraph`.
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


## Comparing the differences with Subquery.
Find out more about [Differences in the GraphQL Query Interface](../build/graph-migration.md#differences-in-the-graphql-query-interface).

## Unsupported features
* JSON field filtering is not supported.
* Cursor-based queries are not supported.
* Subscriptions are not supported.
