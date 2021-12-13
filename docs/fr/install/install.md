# Installation de SubQuery

Plusieurs composants sont nécessaires à la création d'un projet SubQuery. L'outil [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) est utilisé pour créer des projets SubQuery. Le composant [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) est nécessaire pour exécuter un indexeur. La bibliothèque [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) est nécessaire pour générer des requêtes.

## Installation de @subql/cli

L'outil [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) permet de créer un cadre ou un échafaudage de projet, ce qui vous évite de partir de zéro.

Installez SubQuery CLI globalement sur votre terminal en utilisant Yarn ou NPM :

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem> </CodeGroup>

Vous pouvez ensuite lancer l'aide pour voir les commandes disponibles et l'utilisation fournie par CLI :

```shell
subql help
```
## Installer @subql/node

Un nœud SubQuery est une implémentation qui extrait les données de la blockchain basée sur le substrat par le projet SubQuery et les enregistre dans une base de données Postgres.

Installez le nœud SubQuery globalement sur votre terminal en utilisant Yarn ou NPM :

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem> </CodeGroup>

Une fois installé, vous pouvez démarrer un nœud avec :

```shell
subql-node <command>
```
> Note : Si vous utilisez Docker ou si vous hébergez votre projet dans SubQuery Projects, vous pouvez sauter cette étape. En effet, le nœud SubQuery est déjà fourni dans le conteneur Docker et l'infrastructure d'hébergement.

## Installer @subql/query

La bibliothèque de requêtes SubQuery fournit un service qui vous permet d'interroger votre projet dans un environnement "terrain de jeu" via votre navigateur.

Installez SubQuery query globalement sur votre terminal en utilisant Yarn ou NPM :

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem> </CodeGroup>

> Note : Si vous utilisez Docker ou si vous hébergez votre projet dans SubQuery Projects, vous pouvez également sauter cette étape. En effet, le nœud SubQuery est déjà fourni dans le conteneur Docker et l'infrastructure d'hébergement. 