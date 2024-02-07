# 1. Initialise a New Project

The goal of this quick start guide is to provide you with working SubQuery project in your chosen layer-1 network and a basic understanding of how SubQuery works, it should take around 10-15 minutes.

## Передумова

Перш ніж ви почнете створювати свій перший блокчейн проєкт за допомогою SubQuery, переконайтеся, що у вас встановлені необхідні допоміжні програмні додатки. Це:

- [NodeJS](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of NodeJS.
- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.

## 1. Встановити SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM. We **do not** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. Це може призвести до численних помилок.

```shell
# NPM
npm install -g @subql/cli

# Test that it was installed correctly
subql --help
```

## 2. Initialise a new SubQuery Project

Run the following command inside the directory that you want to create a SubQuery project in:

```shell
subql init
```

У міру просування вперед вам будуть ставити собі певні питання:

- ** Project name **: ім'я проєкт для вашого проєкту SubQuery.
- ** Network family **: сімейство мереж блокчейн рівня 1, яке буде індексуватися цим проєкт SubQuery. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Network**: конкретна мережа, яку буде індексувати цей проєкт SubQuery. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- ** Template project **: Виберіть проєкт шаблону вкладеного запиту, який стане відправною точкою в розробці. For some networks we provide multiple examples.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. You can use public endpoints for different networks, your own private dedicated node, or just use the default endpoint. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node.
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in.
- ** Authors **: введіть тут власника цього проєкту SubQuery (наприклад, ваше ім'я!) або прийміть вказане значення за замовчуванням.
- ** Description **: вкажіть короткий абзац про Ваш проєкт, в якому описується, які дані він містить і що користувачі можуть з ним робити, або прийміть надане значення за замовчуванням.
- ** Version **: введіть номер користувача версії або використовуйте значення за замовчуванням (`1.0.0`).
- ** License **: надайте ліцензію на програмне забезпечення для цього проєкту або прийміть стандартну (`MIT`).

Розгляньмо приклад:

```shell
$ subql init
Project name [subql-starter]: test-subquery-project
? Select a network family Ethereum
? Select a network Ethereum
? Select a template project ethereum-starter     Starter project for Ethereum networks
RPC endpoint: [https://eth.api.onfinality.io/public]:
Git repository [https://github.com/subquery/ethereum-subql-starter]: https://github.com/jamesbayly/test-subquery-project  ^ Author [SubQuery Team]: James Bayly
Description [This project can be use as a starting po...]: A new example ethereum SubQuery project
Version [0.0.1]:
License [MIT]:
Preparing project... done
test-subquery-project is ready
```

:::info Ethereum Project Scaffolding

You can generate a project from a JSON ABIs to save you time when creating your project in EVM chains. Please see [EVM Project Scaffolding](#evm-project-scaffolding)

:::

Після завершення процесу ініціалізації ви побачите тека з ім'ям вашого проєкту, створену всередині каталогу. Please note that the contents of this directory should be near identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Нарешті, виконайте таку команду, щоб встановити залежності нового проєкту з каталогу нового проєкту.

::: code-tabs @tab:active yarn

```shell
cd PROJECT_NAME
yarn install
```

@tab npm

```shell
cd PROJECT_NAME
npm install
```

:::

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. Це:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.ts`.
3. Функції відбивання в `src/mappings/` каталогу.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under **2. Specific Chains** and continue the quick start guide.

## EVM Project Scaffolding

Scaffolding saves time during SubQuery project creation by automatically generating typescript facades for EVM transactions, logs, and types.

When you are initalising a new project using the `subql init` command, SubQuery will give you the option to set up a scaffolded SubQuery project based on your JSON ABI. If you select a compatible network type (EVM), it will prompt:

```shell
? Do you want to generate scaffolding with an existing abi contract?
```

For example, to create the [Ethereum Gravatar indexer](./quickstart_chains/ethereum-gravatar.md), download the Gravity ABI contract JSON from [Etherscan](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code), save it as `Gravity.json`, and then run the following:

![Project Scaffolding EVM](/assets/img/build/project-scaffold-evm.png)

Once completed, you will have a scaffold project structure from your chosen ABI `functions`/`events`.

You can read more about this feature in [Project Scaffolding](../build/introduction.md#evm-project-scaffolding)
