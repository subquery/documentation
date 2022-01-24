# Memasang SubQuery

Ada berbagai komponen yang diperlukan saat membuat proyek SubQuery. Alat [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) digunakan untuk membuat proyek SubQuery. Komponen [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) diperlukan untuk menjalankan pengindeks. Library [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) diperlukan untuk menghasilkan kueri.

## Menginstal @subql/cli

Library [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) membantu membuat kerangka kerja proyek atau perancah yang berarti Anda tidak harus memulai dari awal.

Menginstal SubQuery CLI secara global di terminal Anda dengan menggunakan Yarn atau NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```
## Menginstal @subql/node

Node SubQuery adalah implementasi yang mengekstrak data blockchain berbasis substrate per proyek SubQuery dan menyimpannya ke dalam database Postgres.

Menginstal node SubQuery secara global di terminal Anda dengan menggunakan Yarn atau NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> Catatan: Jika Anda menggunakan Docker atau menghosting proyek Anda di Proyek SubQuery, Anda dapat melewati langkah ini. Ini karena node SubQuery sudah disediakan di Docker container dan hosting infrastruktur.

## Menginstal @subql/query

Library SubQuery query menyediakan layanan yang memungkinkan Anda membuat kueri proyek Anda di lingkungan "playground" melalui browser Anda.

Pasang Subquery query secara global di terminal Anda dengan menggunakan Yarn atau NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Catatan: Jika Anda menggunakan Docker atau menghosting proyek Anda di Proyek SubQuery, Anda juga dapat melewati langkah ini. Ini karena node SubQuery sudah disediakan di Docker container dan hosting infrastruktur. 