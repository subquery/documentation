# 1. Erstellen Sie ein neues Projekt

Das Ziel dieser Schnellstartanleitung ist es, Ihnen ein vollständiges Entwicklungssetup und geführte Schritte zum Erstellen Ihres ersten SubQuery-Blockchain-Projekts bereitzustellen. Es richtet sich an erfahrene Entwickler bis hin zu denen, die gerade erst ihre Blockchain-Reise beginnen.

Diese Kurzanleitung sollte etwa 10-15 Minuten dauern.

Nach Abschluss dieser Kurzanleitung verfügen Sie über ein funktionierendes SubQuery-Projekt, das auf einem SubQuery-Knoten ausgeführt wird. Sie können das Standard-Starterprojekt anpassen und Übertragungen von Ihrem bevorzugten Blockchain-Netzwerk wie Polkadot, Avalanche, Cosmos usw. indizieren.

Beginnen wir mit der Erstellung Ihres ersten SubQuery-Blockchain-Projekts.

## Voraussetzungen

Bevor Sie mit der Erstellung Ihres Blockchain-Projekts mit SubQuery beginnen, vergewissern Sie sich, dass Sie die ersten unterstützenden Softwareanwendungen installiert haben. Diese sind:

- [Node](https://nodejs.org/en/): Eine moderne (z. B. die LTS-Version) Installation von Node.
- [Docker](https://docker.com/): Dieses Tutorial verwendet das erforderliche Docker.

Jetzt können Sie mit dem ersten Schritt beginnen, nämlich der Installation der SubQuery-CLI.

## 1. Installieren Sie die SubQuery-CLI

Installieren Sie die SubQuery-CLI mithilfe von NPM global auf Ihrem Terminal:

```shell
# NPM
npm install -g @subql/cli
```

::: Achtung Wir empfehlen **NICHT** die Verwendung von `yarn global` für die Installation von `@subql/cli` aufgrund seines schlechten Abhängigkeitsmanagements. Dies kann zu mehreren Fehlern führen. :::

Sehen Sie sich alle verfügbaren Befehle und ihre Verwendung an. Führen Sie den folgenden Befehl in der CLI aus:

```shell
subql help
```

## 2. Initialisieren Sie das SubQuery-Starterprojekt

Führen Sie den folgenden Befehl in dem Verzeichnis aus, in dem Sie ein SubQuery-Projekt erstellen möchten:

```shell
subql init
```

::: warning Important

**For Cosmos Users**

Cosmos is not yet supported in SubQuery's CLI (`subql`). Hence, if you are using Cosmos, you must start with a Juno clone or fork this [starter project](https://github.com/subquery/cosmos-subql-starter).

To initialise your project with Cosmos, refer to these 4 steps shown in this [link](https://github.com/subquery/juno-subql-starter#readme). Once you complete these 4 steps, **jump** to the [Make Changes to Your Project](../quickstart/quickstart.md#_3-make-changes-to-your-project) section. :::

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project.
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. For example, Polkadot, Avalanche, Cosmos, or any other supported network.
- **Network**: The specific network that this SubQuery project will index. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. For example, Polkadot, Avalanche, or any other supported network.
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. We suggest selecting the _"subql-starter"_ project.
- **RPC endpoint**: Provide an HTTPS URL to a running RPC endpoint, which will be used by default for this project. You can quickly access public endpoints for different networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io), or just use the default endpoint. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). We will use the default value for this guide. Based on the network you have chosen, the default value may be:
  - For Polkadot - _"https://polkadot.api.onfinality.io"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io"_,
  - For Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ and likewise for other networks. <br/>
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`).
- **License**: Provide the software license for this project or accept the default (`MIT`).

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
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. These are:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.yaml`.
3. The Mapping functions in `src/mappings/` directory.

SubQuery supports various blockchain networks and provides you with a dedicated guide for each of them.

Pick up your preferred network and proceed ahead to make the modifications required, and move an inch closer to finishing your first ever project:

- **[Polkadot/Substrate](../quickstart/quickstart_chains/polkadot.md)**

- **[Avalanche](../quickstart/quickstart_chains/avalanche.md)**

- **[Cosmos](../quickstart/quickstart_chains/cosmos.md)**

- **[Terra](../quickstart/quickstart_chains/terra.md)**
