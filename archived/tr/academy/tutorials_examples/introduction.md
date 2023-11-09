# Öğreticiler & Örnekler

Burada öğreticilerimizi listeleyeceğiz ve en kolay ve en hızlı şekilde çalışmaya devam etmenize yardımcı olacak çeşitli örnekleri keşfedeceğiz.

## Öğreticiler

## SubQuery Örnekleri Projeleri

| Örnek                                                                                         | Açıklama                                                                                                                                                    | Konu                                                                                                                           |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Dizinler, karmaları tarafından sorgulanabilmeleri için dış dizinler                                                                                         | **block handler** işleviyle en basit örnek                                                                                     |
| [blok zaman damgası](https://github.com/subquery/tutorials-block-timestamp)                   | Sonlandırılmış her bloğun zaman damgalarını dizine dizine ayırır                                                                                            | Başka bir basit **call handler** işlevi                                                                                        |
| [doğrulayıcı sınıri](https://github.com/subquery/tutorials-validator-threshold)               | Bir doğrulayıcının seçilmesi için gereken en az staking tutarını dizineler.                                                                                 | Ek zincir üstündeki veriler için `@polkadot/api`'ye **external calls** gönderen daha karmaşık bir **block handler** fonksiyonu |
| [toplam ödül](https://github.com/subquery/tutorials-sum-reward)                               | Kesinleşmiş blok olaylarından tahvil, ödül ve eğik çizgiler dizinler                                                                                        | **one-to-many** ilişkisi olan daha karmaşık**event handlers**                                                                  |
| [varlık-ilişkisi](https://github.com/subquery/tutorials-entity-relations)                     | Hesaplar arasındaki bakiye transferlerini dizine dizinler, ayrıca yardımcı program toplu işlemini de dizine dizinelerTüm çağrıların içeriğini öğrenmek için | **One-to-many** ve **many-to-many** ilişkiler ve karmaşık **relationships and complicated**                                    |
| [Kedi](https://github.com/subquery/tutorials-kitty-chain)                                     | Kediciklerin doğum bilgilerini dizine dizinler.                                                                                                             | Karmaşık **call handlers** ve **event handlers**, indekslenmiş verilerle **custom chain**                                      |