# Installazione di SubQuery

Ci sono vari componenti necessari quando si crea un progetto SubQuery. Lo strumento [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) è usato per creare progetti SubQuery. Il componente [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) è necessario per eseguire un indicizzatore. La libreria [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) è necessaria per generare le query.

## Installare @subql/cli

Lo strumento [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) aiuta a creare una struttura di progetto o un'impalcatura, il che significa che non dovete partire da zero.

Installate SubQuery CLI globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```
## Installare @subql/node

Un nodo SubQuery è un'implementazione che estrae i dati della blockchain basati sul substrato secondo il progetto SubQuery e li salva in un database Postgres.

Installate il nodo SubQuery globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> Nota: se state usando Docker o ospitate il vostro progetto in SubQuery Projects, potete saltare questo passo. Questo perché il nodo SubQuery è già fornito nel contenitore Docker e nell'infrastruttura di hosting.

## Installare @subql/query

La libreria di query SubQuery fornisce un servizio che ti permette di interrogare il tuo progetto in un ambiente "parco giochi" tramite il tuo browser.

Installate la query SubQuery globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Nota: se state usando Docker o ospitate il vostro progetto in SubQuery Projects, potete anche saltare questo passo. Questo perché il nodo SubQuery è già fornito nel contenitore Docker e nell'infrastruttura di hosting. 