# Quick Start Guide for Beginners 

## Develop Your First Blockchain Project

### The goal

The goal of this quick start guide is to provide you with a complete development environment and guided steps to create your first SubQuery Blockchain project. 

### Duration

This guide should only take around 10-15 minutes.

Note: This step-by-step guide is designed keeping in mind every developer who is just beginning their Blockchain journey. 

### What will you learn?

After completing this quick guide, you will be able to adapt the standard starter project. You will learn to index transfers from your favourite Blockchain network, for e.g. Polkadot, Avalanch, Cosmos, etc. 

### How will this guide help you in the process?

This guide will help you at every stage of the project; from installing the required development tools to initialising and modifying the files as required. Moreover, you can follow the directions provided in the guide for building, running, and querying the project. 

As you begin with a simple Blockchain project, you will be able to index actual data when you finish the project.

### The end results 

At the end of this guide, you will have a working SubQuery project that will run on a SubQuery node. You will be able to query the data from a GraphQL endpoint. 


Before you go through this guide, we suggest you to refer to the [terminology](../subquery_network/terminology.md) used in SubQuery. It will help you understand the commands better. 

So, let's start the process of creating your first ever SubQuery Blockchain project. 


### Before You Begin 

Before you begin creating your first Blockchain project with SubQuery, make sure you have installed the required supporting software applications. These are:

- [Node](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of Node.
- [Docker](https://docker.com/): This tutorial will use the required Docker

Now, you are all set to start with the first step, which is the installation of the SubQuery CLI. 

## 1. Install the SubQuery CLI

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

## 2. Initialise the SubQuery Starter Project

Run the following command inside the directory you want to create a SubQuery project:

```shell
subql init
```
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


After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

At last, run the following command to install the new project’s dependencies, under the project directory.

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

You have initialised your first SubQuery Blockchain project with just a few simple steps. Ready to explore more about your first project? First, let’s make the required changes.

# 3. Make Changes to Your Project

A standard configuration has been provided in the starter package that you just initialised.  These are:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest in `project.yaml`
3. The Mapping functions in `src/mappings/` directory


Although the initialising process doesn’t depend on which Blockchain network you have chosen, making changes to these configuration files does. 

SubQuery supports various Blockchain networks and provides you with a dedicated guide for each of them. 

Pick up your preferred network and proceed ahead to update the configurations, and move an inch closer to finishing your first ever project:

### **[Polkadot Quick Start](../quickstart/quickstart-polkadot.html)**
### **[Avalanche Quick Start](../quickstart/quickstart-avalanche.html)**
### **[Cosmos Quick Start](../quickstart/quickstart-cosmos.html)**
### **[Terra Quick Start](../quickstart/quickstart-terra.html)**