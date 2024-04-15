# 1. Initialise a New Project

The goal of this quick start guide is to provide you with working SubQuery project in your chosen layer-1 network and a basic understanding of how SubQuery works, it should take around 10-15 minutes.

## Prerequisites

Before you begin creating your first blockchain project with SubQuery, make sure you have installed the required supporting software applications. These are:

- [NodeJS](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of NodeJS.
- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.

## 1. Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM. We **do not** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. This may lead to multiple errors.

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

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project.
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Network**: The specific network that this SubQuery project will index. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. For some networks we provide multiple examples.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. You can use public endpoints for different networks, your own private dedicated node, or just use the default endpoint. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node.
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`).
- **License**: Provide the software license for this project or accept the default (`MIT`).

Let’s look at an example:

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

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be near identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

::: code-tabs
@tab:active yarn

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

There are 3 important files that need to be modified. These are:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.ts`.
3. The Mapping functions in `src/mappings/` directory.

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

## ENV Support

SubQuery provides support for environment variables to configure your project dynamically. This enables flexibility in managing different configurations for development, testing, and production environments.

To utilize environment variable support:

The .env files are automatically created when you initialize a project using the CLI. You can modify these files to adjust configurations according to your requirements.

```shell
# Example .env
ENDPOINT=https://polygon-rpc.com
CHAIN_ID=204
```

In your .env files, *CHAIN_ID* and provided *ENDPOINT* of your project are already added you can configure these variables to match your blockchain network settings. Additionally, you can keep sensitive information such as *CONTRACT_ADDRESS* from project.ts in your .env files for added security.

Multiple ENDPOINT can be added in .env file using comma separated.

```shell
ENDPOINT=https://polygon-rpc.com,https://polygon.llamarpc.com
```

The package.json file includes build scripts that allow you to build with either production (`.env`) or development (`.env.develop`).

```json
"scripts": {
    "build": "subql codegen && subql build", // default is production
    "build:develop": "NODE_ENV=develop subql codegen && NODE_ENV=develop subql build"
}
```
Use `build` script to generate artifacts using the default production .env settings.
Use `build:develop` script to generate artifacts using the development .env.develop settings.

Using environment variables and .env files provides a convenient way to manage project configurations and keep sensitive information secure.

Note: Ensure that .env files are included in your project's .gitignore to prevent them from being committed to version control and exposing sensitive information.

This documentation provides comprehensive guidance on utilizing environment variable support in SubQuery projects for better configurability and security.
