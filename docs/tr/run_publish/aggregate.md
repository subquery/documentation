# Toplama İşlevleri

## Gruplandır

Alt sorgu, sorgunuz sırasında bir değerler kümesi üzerinde hesaplama yapmanıza olanak sağlamak için gelişmiş toplama işlevlerini destekler.

Toplama işlevleri genellikle sorgunuzdaki GroupBy işleviyle birlikte kullanılır.

Group By, tek bir sorguda alt sorgudan bir kümedeki farklı değerleri hızlı bir şekilde almanızı sağlar.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Gelişmiş Toplama İşlevleri

Alt sorgu, güvenli olmayan moddayken aşağıdaki toplama işlevlerini sağlar:

- `sum` (sayı benzeri alanlar için geçerlidir) - tüm değerleri bir araya getirmenin sonucu
- `distinctCount` (tüm alanlar için geçerlidir) - farklı değerlerin sayısının sayımı
- `min` (sayı benzeri alanlar için geçerlidir) - en küçük değer
- `max` (applies to number-like fields)- en büyük değer
- `average` (sayı benzeri alanlar için geçerlidir) - ortalama (aritmetik ortalama) değer
- `stddevSample` (sayı benzeri alanlar için geçerlidir) - değerlerin örnek standart sapması
- `stddevPopulation` (sayı benzeri alanlar için geçerlidir) - değerlerin popülasyon standart sapması
- `varianceSample` (sayı benzeri alanlar için geçerlidir) - değerlerin örnek varyansı
- `variancePopulation` (sayı benzeri alanlar için geçerlidir) - değerlerin popülasyon varyansı

Alt sorgular toplama işlevlerinin uygulanması aşağıdakilere dayanır [pg-aggregates](https://github.com/graphile/pg-aggregates), daha fazla bilgiyi burada bulabilirsiniz

**Lütfen aşağıdakileri etkinleştirmeniz gerektiğini unutmayın:`--unsafe`bu işlevleri kullanmak için sorgu hizmetini işaretleyin. [Daha fazlasını okuyun](./references.md#unsafe-2). Bu not `--unsafe` komut, projenizin alt Sorgu Ağında çalıştırılmasını engeller ve bu komutun projenizle alt sorgunun yönetilen hizmetinde çalıştırılmasını istiyorsanız desteğe başvurmanız gerekir ([project.subquery.network](https://project.subquery.network))**
