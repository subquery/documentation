# Query and Access Data from SubQuery SDK

The default way that most query SubQuery Indexing SDK projects is by the excellent [GraphQL Query service](./graphql.md).

Native builds of SubQuery running in [Docker](../run.md#using-docker) will automatically include query service (`subql/query`). If you run it locally, you will also [likely run a query service](../run.md#running-the-query-service) instance.

Both the decentralised SubQuery Network and the SubQuery Managed Service only provide access to SubQuery SDK indexing projects via the GraphQL endpoints exposed by the query service.

**Please see the docs for how to query your SubQuery project [here](./graphql.md)**.

## Integrations with other Developer Tools

SubQuery is open-source, and we are busy creating a rich ecosytem of developer tools that it works well with.

We now have guides to expose SubQuery data to the following locations.

- [GraphQL](./graphql.md) - the default query pattern.
- [GraphQL Subscriptions](./subscription.md) - subscribe to updated data as soon as it is indexed.
- [Direct Postgres Access](../run.md#connect-to-database) - you can directly connect to the Postgres data from any other tool or service.
- [Metabase](./other_tools/metabase.md) - an industry leading open-source and free data visualisation and business intelligence tool.
- [CSV Export](../references.md#csv-out-dir) - export indexed datasets to CSV files easily.
- [BigQuery](./other_tools/bigquery.md) - a fully managed, serverless data warehouse provided by Google Cloud, well-suited for analyzing large volumes of data.

![Integration Ecosystem](/assets/img/run_publish/integration_ecosystem.png)
