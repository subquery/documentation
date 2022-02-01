# SubQuery Explorer でプロジェクトにクエリを実行する

[SubQuery Explorer](https://explorer.subquery.network) は、コミュニティの貢献者によって作成され、SubQueryチームによって管理されている、公開済みのSubQueryプロジェクトへのアクセスを提供するオンラインホスティングサービス（

explorer.subquery.network<0>）です。 [SubQuery Projectの公開](../publish/publish.md)ガイドに従って、SubQuery Projectをエクスプローラに公開することができます。</p> 

![SubQuery Explorer](https://static.subquery.network/media/explorer/explorer-header.png)

SubQueryエクスプローラは簡単に開始できます。 私たちはこれらのSubQueryノードをオンラインでホスティングしており、誰もが無料でそれぞれクエリを実行することができます。 これらのマネージドノードは、SubQueryチームによってパフォーマンスレベルで監視および実行され、これにより本番アプリケーションの使用と依存が可能になります。

![SubQuery Project](https://static.subquery.network/media/explorer/explorer-project.png)

You’ll also note that the SubQuery Explorer provides a playground for discovering available data with example queries - you can test queries directly in your browser without implementing code. Additionally, we’ve made some small improvements to our documentation to better support developers on their journey to better query and analyse the world’s Polkadot data.

On the top right of the playground, you'll find a _Docs_ button that will open a documentation draw. This documentation is automatically generated and helps you find what entities and methods you can query. In the example below we're using the [Sum Rewards SubQuery](https://explorer.subquery.network/subquery/OnFinality-io/sum-reward) to get the top 5 most rewarded accounts (in terms of staking revenue) on Polkadot that have never been slashed.

![SubQuery Documentation](https://static.subquery.network/media/explorer/explorer-documentation.png)

[Learn more about the GraphQL Query language.](./graphql.md)
