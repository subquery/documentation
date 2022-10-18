# Otomatik Geçmiş Durum Takibi

## Arka Plan

SubQuery, Substrate, Avalance ve diğer ağlardan istediğiniz verileri dizine eklemenize olanak tanır. Şu anda SubQuery, SubQuery tarafından dizine eklenen veri kümesindeki kayıtlı varlıkları ekleyebileceğiniz, güncelleyebileceğiniz, silebileceğiniz veya başka bir şekilde değiştirebileceğiniz, değiştirilebilir bir veri deposu olarak çalışır. SubQuery her bloğu indekslediğinden, projenizin mantığına göre her varlığın durumu güncellenebilir veya silinebilir.

Hesap bakiyelerini indeksleyen temel bir SubQuery projesi, aşağıdakine benzer bir varlığa sahip olabilir.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Tarihi İndeksleme](/assets/img/historic_indexing.png)

Yukarıdaki örnekte, Alice'in DOT bakiyesi sürekli değişmektedir ve biz verileri indeksledikçe, `Hesap` varlığındaki `bilanço` özelliği değişecektir. Hesap bakiyelerini indeksleyen temel bir SubQuery projesi bu geçmiş verileri kaybeder ve yalnızca mevcut indeksleme blok yüksekliğinin durumunu saklar. Örneğin, şu anda blok 100'e endeksliyorsak, veritabanındaki veriler yalnızca Alice'in blok 100'deki hesabının durumunu temsil edebilir.

O zaman bir sorunla karşı karşıyayız. Blok 200'e indekslerken verilerin değiştiğini varsayarsak, blok 100'deki verilerin durumunu nasıl sorgulayabiliriz?

## Otomatik Geçmiş Durum Takibi

SubQuery artık tüm yeni projeler için varlıkların geçmiş durum takibini otomatik hale getiriyor. SubQuery projenizin durumunu herhangi bir blok yüksekliğinde otomatik olarak sorgulayabilirsiniz. Bu, kullanıcıların zamanda geriye gitmesine veya verilerinizin durumunun zaman içinde nasıl değiştiğini göstermesine olanak tanıyan uygulamalar oluşturabileceğiniz anlamına gelir.

Kısacası, herhangi bir SubQuery varlığı oluşturduğunuzda, güncellediğinizde veya sildiğinizde, önceki durumu geçerli olduğu blok aralığıyla birlikte saklarız. Ardından, aynı GraphQL uç noktalarını ve API'yi kullanarak belirli bir blok yüksekliğinden verileri sorgulayabilirsiniz.

## Bunu Etkinleştirme

Bu özellik, en az `@subql/node@1.1.1 ve <code>@subql/query1.1.0` ile başlayan tüm yeni projeler için varsayılan olarak etkinleştirilmiştir. Mevcut projenize eklemek istiyorsanız, `@subql/node` ve `@subql/query'i` güncelleyin ve ardından projenizi temiz bir veritabanıyla yeniden indeksleyin.

Bu özelliği herhangi bir nedenle devre dışı bırakmak isterseniz, `subql-node'da` `--disable-historical=true` parametresini ayarlayabilirsiniz.

Başlangıçta, bu özelliğin mevcut durumu konsola yazdırılır (`Geçmiş durum etkindir).`.

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Tarihsel Durumu Sorgulama

GraphQL varlık filtresinde `blockHeight` adlı özel (isteğe bağlı) bir özellik vardır. Bu özelliği atlarsanız, SubQuery, mevcut blok yüksekliğinde varlık durumunu sorgulayacaktır.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

5.000.000 blok yüksekliğindeki RMRK NFT'lerin sahiplerini sorgulamak için, aşağıda gösterildiği gibi blockHeight parametresini ekleyin:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      name
      currentOwner
    }
  }
}
```

Bu RMRK NFT koleksiyonlarının sahiplerini en son blok yüksekliğinde sorgulamak için aşağıda gösterildiği gibi blockHeight parametresini atlayın.

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. For example:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.
