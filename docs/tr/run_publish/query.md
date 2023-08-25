# Query your Project using GraphQL

::: info Coming from the Graph?

You may want to take a look at the information we have [on the differences](../build/graph-migration.md#graphql-query-differences) between SubQuery's GraphQL library, and The Graph.

:::

GraphQL, nasıl çalıştığı ve nasıl kullanılacağı hakkında daha fazla bilgi edinmek için [resmi GraphQL rehberini buradan](https://graphql.org/learn/) takip edebilirsiniz:

- There are libraries to help you implement GraphQL in [many different languages](https://graphql.org/code/) - we recommend [Apollo Client](https://www.apollographql.com/docs/react/) as it will allow a [seamless migration to our decentralised network](../subquery_network/publish.md#changes-to-your-dapp) when you publish your project in the future.
- You will want to review advice on how to [structure your GraphQL queries to maximise performance](../build/optimisation.md#query-performance-advice).
- Pratik öğreticilerle derinlemesine bir öğrenme deneyimi için [GraphQL Nasıl Kullanılır](https://www.howtographql.com/) bölümüne göz atın.
- [GraphQL'yi Keşfetmek: API'ler için Bir Sorgu Dili](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis) isimli ücretsiz çevrimiçi kursa göz atın.

![SubQuery Project](/assets/img/query.png)

On the top right of the playground, you'll find a _Docs_ button that will open a documentation draw. Bu dokümantasyonlar otomatik olarak oluşturulur ve hangi varlıkları ve yöntemleri sorgulayabileceğinizi bulmanıza yardımcı olur. On our [Managed Service Explorer](https://explorer.subquery.network/), you will also find a query constructor.
