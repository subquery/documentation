# Quick Start Guide

## Develop Your First Blockchain Project

### The goal

The goal of this quick start guide is to provide you with a complete development setup and guided steps to create your first SubQuery blockchain project. It is targeted towards experienced developers right through to those just beginning their blockchain journey. 

### Duration

This quick start guide should only take around 10-15 minutes.

### What will you learn?

After completing this quick start guide, you will be able to adapt the standard starter project and index transfers from your favourite blockchain network such as Polkadot, Avalanch, Cosmos, etc. 

### The end results 

Upon completing this quick start guide, you will have a working SubQuery project that will run on a SubQuery node. You will then be able to query the data from a GraphQL endpoint. 

Before you go through this guide, we suggest you to refer to the [terminology](../subquery_network/terminology.md) used in SubQuery. It will help you understand the commands better. 

Let's start the process of creating your first SubQuery blockchain project. 

### Before You Begin 

Before you begin creating your first blockchain project with SubQuery, make sure you have installed the required supporting software applications. These are:

- [Node](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of Node.
- [Docker](https://docker.com/): This tutorial will use the required Docker

Now, you are all set to start with the first step, which is the installation of the SubQuery CLI. 

### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```shell
# NPM
npm install -g @subql/cli
```

**Note**: We **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. This may lead to multiple errors.

Take a look at all available commands and their use. Run the given below command in the CLI:

```shell
subql help
```
Now that you have explored important commands, let’s begin setting up your first project.

### Initialise the SubQuery Starter Project

Run the following command inside the directory you want to create a SubQuery project:

```shell
subql init
```
<hr />

#### - *Important: For Cosmos Users:*
Cosmos is not yet supported in SubQuery's CLI (`subql`). Hence, if you are using Cosmos, you must start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter). 

**To initialise your project with Cosmos, refer to these [4 steps shown in this link.](https://github.com/subquery/juno-subql-starter#readme.md)**

 <hr />

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Use the arrow keys to select from the available options. Use the respective name of the network you have chosen, for eg. Polkadot, Avalanche, or any other supported network. 
- **Network**: The specific network that this SubQuery project will index. Use the arrow keys to select from the available options. Use the respective name of the network you have chosen, for eg. Polkadot, Avalanche, or any other supported network. 
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. We suggest selecting the *"subql-starter"* project.
- **RPC endpoint**: Provide an HTTPS URL to a running RPC endpoint, which will be used by default for this project. You can quickly access public endpoints for different networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io), or just use the default endpoint. This RPC node must be an archive node (have the full chain state). <br />

 We will use the default value for this guide. Based on the network you have chosen, the default value may be: <br />
 For Polkadot - *"https://polkadot.api.onfinality.io"* <br />
 For Avalanche - *"https://avalanche.api.onfinality.io"* <br />
 For Terra - *“https://terra-columbus-5.beta.api.onfinality.io”* and likewise for other networks. <br/>

- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`)
- **License**: Provide the software license for this project or accept the default (`MIT`)

Let’s look at an example: 

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]: 
Git repository [https://github.com/subquery/subql-starter]: 
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be use as a starting po...]: 
Version [1.0.0]: 
License [MIT]: 
Preparing project... done
HelloWorld is ready
```


After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally run the following command to install the new project’s dependencies, under the project directory.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  cd PROJECT_NAME
  yarn install
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```shell
  cd PROJECT_NAME
  npm install
  ```

  </CodeGroupItem>
</CodeGroup>

You have now initialised your first SubQuery blockchain project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

# 3. Make Changes to Your Project

A standard configuration has been provided in the starter package that you just initialised.  These are:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest in `project.yaml`
3. The Mapping functions in `src/mappings/` directory

SubQuery supports various blockchain networks and provides you with a dedicated guide for each of them. 

Pick up your preferred network and proceed ahead to update the configurations, and move an inch closer to finishing your first ever project:

### **[Polkadot Quick Start](../quickstart/quickstart_blockchains/quickstart-polkadot.md)**
### **[Avalanche Quick Start](../quickstart/quickstart_blockchains/quickstart-avalanche.md)**
### **[Cosmos Quick Start](../quickstart/quickstart_blockchains/quickstart-cosmos.md)**
### **[Terra Quick Start](../quickstart/quickstart_blockchains/quickstart-terra.md)**