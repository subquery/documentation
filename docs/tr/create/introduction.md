# Yeni bir SubQuery Projesini Oluşturma

[quick start](/quickstart/quickstart.md) kılavuzunda, SubQuery'nin ne olduğunu ve nasıl çalıştığını size tattırmak için çok hızlı bir şekilde bir örnek inceledik. Burada projenizi oluştururken iş akışına ve çalışacağınız anahtar dosyalara daha yakından bakacağız.

## Temel İş Akışı

Aşağıdaki örneklerden bazıları, başlangıç paketini [Quick start](../quickstart/quickstart.md) bölümünde başarıyla başlatmış olduğunuzu varsayar. Bu başlangıç paketinden, SubQuery projenizi özelleştirmek ve uygulamak için standart süreçten geçeceğiz.

1. Projenizi kullanarak başlatın `subql init PROJECT_NAME`.
2. Manifest dosyasını (`project.yaml`) blok zinciriniz ve eşleyeceğiniz varlıklar hakkında bilgi içerecek şekilde güncelleştirin - bkz [Manifest File](./manifest.md)
3. Şemanızda (`schema.graphql`) ayıklayacağınız ve sorgulamak için sürdüreceğiniz verilerin şeklini tanımlayan GraphQL varlıkları oluşturun - bkz [GraphQL Şeması](./graphql.md)
4. Zincir verilerini tanımladığınız GraphQL varlıklarına dönüştürmek için çağırmak istediğiniz tüm eşleme işlevlerini (örneğin`mappingHandlers.ts`) ekleyin - bkz[Mapping](./mapping.md)
5. Kodunuzu SubQuery Projects oluşturun, oluşturun ve yayımlayın (veya kendi yerel düğümünüzde çalıştırın) - hızlı başlangıç kılavuzumuzda [ Starter Projenizi Çalıştırma ve Sorgulama](./quickstart.md#running-and-querying-your-starter-project) bakın.

## Dizin Yapısı

Aşağıdaki eşleme, `init` komutu çalıştırıldığında, Bir SubQuery projesinin dizin yapısına genel bir bakış sağlar.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Mesela:

![SubQuery dizin yapısı](/assets/img/subQuery_directory_stucture.png)

## Kod Oluşturma

GraphQL varlıklarınızı her değiştirdiğinizde, türler dizininizi aşağıdaki komutla yeniden değiştirmeniz gerekir.

```
yarn codegen
```

Bu, daha önce `schema.graphql` tanımladığınız her tür için oluşturulan varlık sınıflarını içeren yeni bir dizin (veya varolan) `src/types` oluşturur. Bu sınıflar varlık alanlarına tür açısından güvenli varlık yükleme, okuma ve yazma erişimi sağlar - [ GraphQL Şeması](./graphql.md) bu işlem hakkında daha fazla bilgi edinin.

## Oluştur

SubQuery Project yerel olarak barındırılan bir SubQuery Node çalıştırmak için önce çalışmanızı oluşturmanız gerekir.

Yapı komutunu projenin kök dizininden çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

Bununla, dışa aktar alanını kullanarak oluşturulacak ek giriş noktaları tanımlayabilirsiniz package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Sonra koşarak `subql build`aşağıdaki yapıya sahip bir dist klasörü oluşturacaktır:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

İnşa edeceğini unutmayın `index.ts` dışa aktarma alanında belirtilip belirtilmediği.

Bayraklar da dahil olmak üzere bunu kullanma hakkında daha fazla bilgi için bkz. [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

Bu `console.log`yöntem **artık desteklenmiyor**. Yerine, a `logger` türlere modül enjekte edildi, bu da çeşitli günlük seviyelerini kabul edebilen bir kaydediciyi destekleyebileceğimiz anlamına geliyor.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Kullanmak `logger.info` or `logger.warn`,satırı eşleme dosyanıza yerleştirin.

![logging.info](/assets/img/logging_info.png)

Kullanmak `logger.debug`, ek bir bayrak gereklidir. Ekleme `--log-level=debug`komut satırına.

Bir docker kapsayıcısı çalıştırıyorsanız, bu satırı`docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

Şimdi terminal ekranında yeni günlüğü görmelisiniz.

![logging.debug](/assets/img/subquery_logging.png)
