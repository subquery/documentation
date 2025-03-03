# Running High Performance SubQuery Infrastructure

SubQuery is designed to provide reliable and performant indexing to production applications, we use the services that we build to run SubQuery in our own infrastructure which serves millions of requests each day to hundreds of customers. As such, we've added some commands that you will find useful to get the most performance out of your project and mitigate against any DDOS attacks.

## Improve Indexing with Node Workers and Cache Size

Use `node worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. [Read more here](../run_publish/references.html#w-workers).

You should also adjust and play around with the various arguments that control how SubQuery uses a store to improve indexing performance by making expensive database operations in bulk. In particular, you can review `--store-cache-threshold`, `--store-get-cache-size`, `--store-cache-async`, and `--store-flush-interval` - read more about these settings in our [references](./references.md#store-cache-threshold).

## Ensure you are monitoring correctly

We have a [monitoring guide](./monitor) for how to check the progress of indexing. You can also setup health check monitors for the individual [indexer node](./run.md#monitoring-indexer-health) and [query service](./run.md#monitoring-query-service-health)

You should also monitor the system resources available such as CPU, Memory and Disk usage, as well as external RPC endpoints that your project connects to. Don't forget to monitor database capacity to ensure you don't run out of disk space and corrupt your store.

## DDOS Mitigation

SubQuery runs well behind an API gateway or a DDOS mitigation service. For any public project that is run in a production configuration, setting up a gateway, web application firewall, or some other protected endpoint is recommended (see more in [Security](#security)).

Add rate limits or other request restrictions using your API gateway

## Security

Ensure docker API is not accessible if you're using docker. Don't run services with the root user. Our docker images already do this.

Use an API gateway like [nginx](https://nginx.org/en/) or [kong](https://konghq.com/) to provide SSL for your query service and ensure you only expose necessary ports.

Only the query service needs to be public and this should be done through the API Gateway.

## Request Caching

Although @subql/node does not natively provide any default request level caching, one of the easiest ways to increase performance when the number of users hitting your SubQuery project increases is by adding a cache in front of the GraphQL endpoint with a basic TTL of a few seconds (depending on how stale you want to allow your data). Most cloud providers offer simple to setup and manage caching solutions (e.g. Redis) that will work well with the GraphQL api endpoints that we provide. If you're worried about stale data affecting your user's experience, by leveraging [GraphQl subscriptions](./query/subscription.md) you can ensure that the most recent data is never affected by the cache while older, slower data is mostly from the cache. Additionally, consider different TTLs for each different entity.

## Database Configuration

We've been able to run a number of SubQuery projects in the same Postgres database - you do not need to run each project in a different database for sufficient performance. When the I/O on the database becomes a problem, the simplest solution is to first consider if any more [indexes can be added to your project](../build/optimisation.md#indexing-performance-advice).

The next step our team will usually carry out is split the database into a read-write replica architecture. One database instance is the writer (that the @subql/node service connects to), while the other is the reader (that the @subql/query service connects to). We will do this before splitting up projects into different databases as it generally makes a huge improvement to database I/O.

Make sure your backup your database regularly, ideally with scheduled automation.

## Run Multiple Query Services

SubQuery is designed so that you can run multiple query services behind a load balancer for redundancy and performance. Just note that unless you have multiple read replicas of the database, you're performance will quickly become db constrained.

## Restrict Query Complexity

GraphQL is extremely powerful, but one of the downsides is that it allows users to make somewhat unrestricted calls that result in complex SQL that can really affect performance for other users. We provide two controls for this:

- `--query-complexity` is a flag that controls the level of query complexity that this service will accept expressed as a positive integer, [read more here](./references.md#query-complexity).
- `--query-timeout` is a flag that will restrict the time each query will be allowed to run for, [read more here](./references.md#query-timeout).
- `--max-connection` is a flag that will restrict the number of simultaneous DB connections created by the query endpoint, [read more here](./references.md#max-connection).
- `--query-limit` is a flag that allows you to limit the number of results returned by any query and enforce pagination, [read more here](./references.md#query-limit).
- `--unsafe` is a flag that enables some advanced features like [GraphQL aggregations](./query/aggregate.md), these may have performance impacts, [read more here](./references.md#unsafe-query-service)

You should also consider reading this excellent guide from Apollo on how they recommend you secure your [GraphQL API from malicious queries](https://www.apollographql.com/blog/graphql/security/securing-your-graphql-api-from-malicious-queries/).

## Deal with Exceptions and Outages

Ensure services restart automatically either from the service stopping or the system stopping. If you use docker this will be managed for you, if using linux then [systemd](https://systemd.io/) is a good option.
