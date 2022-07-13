# Abonelikler

## GraphQL Aboneliği Nedir

SubQuery artık Graphql Aboneliklerini de destekliyor. Sorgular gibi, abonelikler de veri almanızı sağlar. Sorguların aksine abonelikler, zamanla sonuçlarını değiştirebilen uzun süreli işlemlerdir.

Abonelikler, istemci uygulamanızın verileri değiştirmesini veya bu değişiklik meydana gelir gelmez veya yeni veriler kullanılabilir olduğunda bazı yeni verileri göstermesini istediğinizde çok kullanışlıdır. Abonelikler, değişiklikler için Alt Sorgu projenize *abone olmanıza* olanak tanır.

[Read more about subscriptions here](https://www.apollographql.com/docs/react/data/subscriptions/).

## Bir Varlığa Nasıl Abone Olunur

GraphQL aboneliğinin temel örneği, herhangi bir yeni varlık oluşturulduğunda bildirilmesidir. Aşağıdaki örnekte, `Transfer` varlığına abone oluyoruz ve bu tabloda herhangi bir değişiklik olduğunda bir güncelleme alıyoruz.

GraphQL uç noktasını aşağıdaki gibi sorgulayarak aboneliği oluşturabilirsiniz. Ardından bağlantınız, `Transfer` varlık tablosunda yapılan tüm değişikliklere abone olacaktır.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Sorgunuzdaki varlığın gövdesi, `Transfer` tablosu güncellendiğinde aboneliğiniz aracılığıyla hangi verileri almak istediğinizi belirtir:
- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: Bu varlığa yapılan eylem. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: varlığın kendisinin JSON biçimindeki değeri.

## Filtreleme

Aboneliklere ilişkin filtrelemeyi de destekliyoruz; bu, bir müşterinin yalnızca bu veriler veya mutasyon belirli kriterleri karşılaması durumunda güncellenmiş abonelik verilerini alması gerektiği anlamına gelir.

Desteklediğimiz iki tür filtre vardır:

- `id` : Yalnızca belirli bir varlığı (kimlik tarafından belirtilen) etkileyen değişiklikleri döndürmek için filtreleyin.
- `mutation_type`: Yalnızca yapılan aynı mutasyon türü bir güncelleme döndürür.

Bir `Bakiyeler` varlığımız olduğunu ve her hesabın bakiyesini kaydettiğini varsayalım.

```graphql
tür Bakiyeler {
  id: ID! # sbirinin hesabı, ör. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # bu hesabın bakiyesi
}
```

Belirli bir hesabı etkileyen herhangi bir bakiye güncellemesine abone olmak istiyorsak, abonelik filtresini aşağıdaki gibi belirtebiliriz:

```graphql
abonelik {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

**Bu işlevleri kullanmak için hem düğüm hem de sorgu hizmetinde `--subscription` işaretini etkinleştirmeniz gerektiğini lütfen unutmayın.**

Abonelik özelliği, doğrudan listelenen GraphQL uç noktasını aradığınızda SubQuery'nin yönetilen hizmetinde çalışır. Tarayıcı içi GraphQL oyun alanında çalışmayacaktır.
