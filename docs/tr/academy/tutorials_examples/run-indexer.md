# İndeksleyici düğümü nasıl çalıştırılır?

## Video rehberi

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Giriş

İndeksleyici düğümü çalıştırmak, Docker kullanmanın veya [SubQuery Managed Service](https://managedservice.subquery.network/)'de sizin için barındırılan bir projenin yanı sıra diğer bir alternatif seçenektir. Daha fazla zaman ve çaba gerektirir, ancak SubQuery'nin perde arkasında nasıl çalıştığını daha iyi anlamanıza yardımcı olacaktır.

## veritabanı

Altyapınızda bir indeksleyici düğümü çalıştırmak için bir Postgres veritabanı gerekecektir. [here](https://www.postgresql.org/download/) tıklayarak Postgres'i yükleyebilir ve sürümün 12 veya üzeri olduğundan emin olun.

## subql/node indirin

Ardından, bir SubQuery düğümü çalıştırmak için aşağıdaki komutu çalıştırın:

```shell
npm kurulumu -g @subql/düğüm
```

-g bayrağı, onu global olarak kurmak anlamına gelir; bu, OSX'te, konumun /usr/local/lib/node_modules olacağı anlamına gelir.

Yüklendikten sonra, aşağıdakileri çalıştırarak sürümü kontrol edebilirsiniz:

```shell
> subql-node --version
0.19.1
```

## DB yapılandırmalarını ayarlama

Daha sonra, aşağıdaki çevresel değişkenleri ayarlamanız gerekir:

```shell
DB_USER=postgres'i dışa aktar
DB_PASS=postgres'i dışa aktar
dışa aktar DB_DATABASE=postgres
dışa aktar DB_HOST=localhost
DB_PORT'u dışa aktar=5432
```

Tabi yukarıdaki anahtarlar için farklı değerleriniz varsa, lütfen ona göre ayarlayın. `env` komutunun geçerli ortam değişkenlerini görüntüleyeceğini ve bu işlemin bu değerleri yalnızca geçici olarak ayarladığını unutmayın. Yani, bunlar yalnızca uçbirim oturumu süresince geçerlidir. Bunları kalıcı olarak ayarlamak için, bunun yerine ~/bash_profile depolayın.

## Projeyi indeksleme

Bir projeyi indekslemeye başlamak için proje klasörünüze gidin ve aşağıdaki komutu çalıştırın:

```shell
subql-node -f .
```

Hazır bir projeniz yoksa, `git clone https://github.com/subquery/subql-helloworld`. İndeksleyici düğümünün çalıştığını ve blokları indekslemeye başladığını görmelisiniz.

## Postgres'i İnceleme

Postgres'e giderseniz, iki adet tablonun oluşturulduğunu görüyor olmalısınız. `public.subqueries` and `subquery_1.starter_entities`.

`public.subqueries` indeksleyici, "mevcut durumu anlamak" için başladığında yalnızca bir satırı kontrol eder, böylece bir sonrakinde nereye gideceğini bilir. `starter_entities` tablosu indeksleri içerir. Verileri görüntülemek için `select (*) from subquery_1.starter_entities` çalıştırın.
