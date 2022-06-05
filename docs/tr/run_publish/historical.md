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

If you want to disable this feature for any reason, you can set the `--disable-historical=true` parameter on `subql-node`.

On startup, the current status of this feature is printed to the console (`Historical state is enabled`).

## Querying Historical State

There is a special (optional) property on the GraphQL entity filter called `blockHeight`. If you omit this property, SubQuery will query the entity state at the current block height.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical)

To query the owners of RMRK NFTs at block height 5,000,000, add the blockHeight parameter as shown below:

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

To query the owners of those RMRK NFTs collections at the latest block height, omit the blockHeight parameter as shown below.

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