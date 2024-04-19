# Query your Project using GraphQL

::: info Coming from the Graph?

You may want to take a look at the information we have [on the differences](../../build/graph-migration.md#graphql-query-differences) between SubQuery's GraphQL library, and The Graph.

:::

You can follow the [official GraphQL guide here](https://graphql.org/learn/) to learn more about GraphQL, how it works, and how to use it:

- There are libraries to help you implement GraphQL in [many different languages](https://graphql.org/code/) - we recommend [Apollo Client](https://www.apollographql.com/docs/react/) as it will allow a [seamless migration to our decentralised network](../../../subquery_network/architects/publish.md#changes-to-your-dapp) when you publish your project in the future.
- You will want to review advice on how to [structure your GraphQL queries to maximise performance](../../build/optimisation.md#query-performance-advice).
- For an in-depth learning experience with practical tutorials, see [How to GraphQL](https://www.howtographql.com/).
- Check out the free online course, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis).

![SubQuery Project](/assets/img/run_publish/query.png)

On the top right of the playground, you'll find a _Docs_ button that will open a documentation draw. This documentation is automatically generated and helps you find what entities and methods you can query. On our [Managed Service Explorer](https://explorer.subquery.network/), you will also find a query constructor.

### Full Text Search

The result of the directive will provide new connections to the GraphQL schema allowing you to search. They follow the pattern `search<EntityName>` and take a `search` parameter.

The search parameter allows for more than just searching for strings, you can do AND (`&`), OR (`|`) , NOT (`!`, `-`), begins with (`<Text>:*`, `<Text>*`>) and follows (`>`, `<->`).

For more details on these operations please see [pg-tsquery](https://github.com/caub/pg-tsquery) for sanitised operations and [Postgres tsquery](https://www.postgresql.org/docs/current/textsearch-controls.html) for the underlying DB implementation.

```graphql

# Search for all NFTs with either "blue" or "red" in the name or description
{
  searchNFTs(search: "blue|red") {
    nodes: {
      id
      name
      description
    }
  }
}

```
