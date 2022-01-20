# Installazione di SubQuery

Ci sono vari componenti necessari quando si crea un progetto SubQuery. Lo strumento [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) è usato per creare progetti SubQuery. Il componente [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) è necessario per eseguire un indicizzatore. La libreria [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) è necessaria per generare le query.

## Installare @subql/cli

Lo strumento [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) aiuta a creare una struttura di progetto o un'impalcatura, il che significa che non dovete partire da zero.

Installate SubQuery CLI globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> # Yarn yarn global add @subql/cli # NPM npm install -g @subql/cli
## Installare @subql/node

Un nodo SubQuery è un'implementazione che estrae i dati della blockchain basati sul substrato secondo il progetto SubQuery e li salva in un database Postgres.

Installate il nodo SubQuery globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> # Yarn yarn global add @subql/node # NPM npm install -g @subql/node
> Nota: se state usando Docker o ospitate il vostro progetto in SubQuery Projects, potete saltare questo passo. Questo perché il nodo SubQuery è già fornito nel contenitore Docker e nell'infrastruttura di hosting.

## Installare @subql/query

La libreria di query SubQuery fornisce un servizio che ti permette di interrogare il tuo progetto in un ambiente "parco giochi" tramite il tuo browser.

Installate la query SubQuery globalmente sul vostro terminale usando Yarn o NPM:

<CodeGroup> <CodeGroupItem title="YARN" active> # Yarn yarn global add @subql/query # NPM npm install -g @subql/query </CodeGroupItem>
<CodeGroupItem title="NPM"> subql-node &lt;command&gt; </CodeGroupItem> </CodeGroup>

> Nota: se state usando Docker o ospitate il vostro progetto in SubQuery Projects, potete anche saltare questo passo. Questo perché il nodo SubQuery è già fornito nel contenitore Docker e nell'infrastruttura di hosting. 