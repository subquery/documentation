# Installation

When working with SubQuery, we recommend doing everything in a dedicated directory for your project and using Docker to run projects. Please follow the [quickstart](../quickstart/quickstart.md) for more details on how to create a SubQuery project.

But if you wish to install the SubQuery components manually, you can follow the instructions below.
## Install @subql/cli

The [@subql/cli](https://github.com/subquery/subql/tree/main/packages/cli) tool helps to create and manage a project, meaning you don't have to start from scratch.

Install SubQuery CLI globally on your terminal by using Yarn or NPM:

::: code-tabs#shell
@tab npm

```bash
npm install -g @subql/cli
```

@tab:active yarn (not recommended)

```shell
yarn global add @subql/cli
```
:::

You can then run help to see available commands and usage provided by CLI:

```shell
subql --help
```

::: tip Note
SubQuery projects will have this as a dependency in their `package.json` file, so you can also run the CLI commands using `npx` without installing it globally. For example, you can run `npx subql publish` to publish the project to IPFS.
:::

## Install @subql/node-*

A SubQuery node is an implementation that runs a project to extract data from a blockchain and stores it in a database. We have multiple implementations of the SubQuery node, such as `@subql/node` (for Substrate/Polkadot), `@subql/node-evm`, and `@subql/node-cosmos`. You can choose the one that matches your project.

Install SubQuery node globally on your terminal by using Yarn or NPM:

::: code-tabs#shell
@tab npm

```bash
npm install -g @subql/node-ethereum
```

@tab:active yarn (not recommended)

```shell
yarn global add @subql/node-ethereum
```

:::

Once installed, you can start a node with:

```shell
subql-node-ethereum <command>
```

::: tip Note
If you are using Docker you can skip this step. This is because the SubQuery node is already provided in the Docker container and the hosting infrastructure.
:::

## Install @subql/query

The SubQuery query library provides a service that allows you to query your project in a "playground" environment via your browser.

Install SubQuery query globally on your terminal by using Yarn or NPM:

::: code-tabs#shell
@tab npm

```bash
npm install -g @subql/query
```

@tab:active yarn (not recommended)

```shell
yarn global add @subql/query
```

:::

::: tip Note
If you are using Docker you can skip this step also. This is because the SubQuery node is already provided in the Docker container and the hosting infrastructure.
:::
