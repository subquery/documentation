# Yeni bir SubQuery Projesini Oluşturma

[quick start](/quickstart/quickstart.md) kılavuzunda, SubQuery'nin ne olduğunu ve nasıl çalıştığını size tattırmak için çok hızlı bir şekilde bir örnek inceledik. Burada projenizi oluştururken iş akışına ve çalışacağınız anahtar dosyalara daha yakından bakacağız.

## Temel İş Akışı

Aşağıdaki örneklerden bazıları, başlangıç paketini [Quick start](../quickstart/quickstart.md) bölümünde başarıyla başlatmış olduğunuzu varsayar. Bu başlangıç paketinden, SubQuery projenizi özelleştirmek ve uygulamak için standart süreçten geçeceğiz.

1. Initialise your project using `subql init PROJECT_NAME`.
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

## Yapmak

SubQuery Project yerel olarak barındırılan bir SubQuery Node çalıştırmak için önce çalışmanızı oluşturmanız gerekir.

Yapı komutunu projenin kök dizininden çalıştırın.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
