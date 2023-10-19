# Terminoloji

- SubQuery Project (_ where the magic happens_): Bir SubQuery Düğümünün bir proje ağından nasıl geçmesi ve toplaması gerektiği ve verilerin yararlı GraphQL sorgularını etkinleştirmek için nasıl dönüştürülmesi ve depolandığı hakkında bir tanım ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli))
- SubQuery Node (_ where the work is doner_): Bir SubQuery projesi definiton'ını kabul edecek ve bağlı bir ağı veritabanına sürekli olarak dizine alan bir düğümü çalıştıracak bir paket ([`@subql/node`](https://www.npmjs.com/package/@subql/node))
- SubQuery Query Service (_where we get the data from_): Dizine alınan verileri sorgulamak ve görüntülemek için dağıtılan bir SubQuery node GraphQL API'si ile etkileşime giren bir paket ([`@subql/query`](https://www.npmjs.com/package/@subql/query))
- GraphQL (_how we query the data_): Esnek grafik tabanlı veriler için özel olarak uygun API'ler için bir query langage - bkz[graphql.org](https://graphql.org/learn/)
