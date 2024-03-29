# SubQuery'i Kurma

Bir SubQuery projesi oluştururken gerekli olan bazı bileşenler var. SubQuery projeleri oluşturmak için [@subql/clı](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) aracı kullanılır. Bir dizin oluşturucuyu çalıştırmak için [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) bileşeni gereklidir. Sorguları oluşturmak için [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) kütüphanesi gereklidir.

## @subql/cli'yi kurun

[@subql /clı ](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) aracı, sıfırdan başlamak zorunda olmadığınız anlamına gelen bir proje çerçevesi veya iskele oluşturmanıza yardımcı olur.

Yarn veya NPM kullanarak SubQuery CLI'yi global biçimde terminalinize kurun:

::: code-tabs @tab npm `bash npm install -g @subql/cli `
@tab:active yarn `shell yarn global add @subql/cli ` :::

Ardından, CLI tarafından sağlanan kullanılabilir komutları ve kullanımı görmek için yardımı çalıştırabilirsiniz:

```shell
subql help
```

## @subql/node'u kurun

Bir SubQuery node'u, SubQuery projesindeki alt-tabanlı blok zinciri verilerini çıkaran ve bir Postgres veritabanına kaydeden bir uygulamadır.

Yarn veya NPM kullanarak SubQuery node'unu global biçimde terminalinize kurun:

::: code-tabs @tab npm `bash npm install -g @subql/node `
@tab:active yarn `shell yarn global add @subql/node ` :::

Kurulduktan sonra, ile bir düğüm başlatabilirsiniz:

```shell
subql-node <command>
```

> Not: Docker kullanıyorsanız veya projenizi SubQuery Projelerinde barındırıyorsanız, bu adımı atlayabilirsiniz. Bunun nedeni, SubQuery node'unun Docker konteynerında ve barındırma altyapısında zaten sağlanmış olmasıdır.

## @subql/query'yi kurun

SubQuery sorgu kütüphanesi, projenizi tarayıcınız aracılığıyla bir "çalışma alanı" ortamında sorgulamanıza olanak tanıyan bir hizmet sunar.

Yarn veya NPM kullanarak SubQuery sorgusunu global biçimde terminalinize kurun:

::: code-tabs @tab npm `bash npm install -g @subql/query `
@tab:active yarn `shell yarn global add @subql/query ` :::

> Not: Docker kullanıyorsanız veya projenizi SubQuery Projelerinde barındırıyorsanız, bu adımı atlayabilirsiniz. Bunun nedeni, SubQuery node'unun Docker konteynerında ve barındırma altyapısında zaten sağlanmış olmasıdır.
