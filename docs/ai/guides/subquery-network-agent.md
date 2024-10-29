# SubQuery Network AI Agent

This example AI App is what you can find on SubQuery's documentation and network app. It's a pefect example that shows off the key features of SubQuery's AI App Framework, including both RAG and File search.

You can follow along in the tutorial here.

## Prerequisites

You should have the following installed

- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.
- [Ollama](https://ollama.com/). Alternatively an endpoint to an Ollama instance.
- [Deno](https://docs.deno.com/runtime/getting_started/installation/): A recent version of Deno, the JS engine for the SubQuery AI App Framework.

## 1. Install the framework

Run the following command to install the SubQuery AI framework globally on your system:

```bash
deno install -g -f --allow-env --allow-net --allow-import --allow-read --allow-write --allow-ffi --allow-run --unstable-worker-options -n subql-ai jsr:@subql/ai-app-framework/cli
```

This will install the CLI and Runner. Make sure you follow the suggested instructions to add it to your path.

You can confirm installation by running `subql-ai --help`.

## 2. Create a new App

You can initialise a new app using `subql-ai init`. It will ask you to provide a name and a Ollama model to use.

![Init a new AI App](/assets/img/ai/guide-init.png)

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that there should only be two files, a `project.ts` and a `manifest.ts`.

We can run the project at any time using the following command (where the `-p` is the path to the `project.ts`)

```bash
subql-ai -p ./project.ts
```

You may want to refer to the [command line arguments](../run/cli.md) used in SubQuery AI App Framework. It will help you understand the commands better.

## 3. Update System Prompt

A good first place to start is by updating your system prompts in `project.ts`. System promps are the basic way you customise the behaviour of your AI agent.

![System prompt](/assets/img/ai/guide-system-prompt.png)

You can read more about edits to the `project.ts` [here](../build/app.md).

## 4. Add a RAG File

By integrating [RAG (Retrieval-Augmented Generation) files](./build/rag.md), your AI Apps can leverage domain-specific knowledge efficiently. With initial support for LanceDB and future compatibility with other vector databases, developers can enhance their applications' performance and accuracy.

### 4.1 Prepare the RAG file

We're going to use the entire [SubQuery Documentation](https://github.com/subquery/documentation) repo to train our assistant here. I've downloaded this repo to my local computer. You can read more about [this process here](../build/rag.md).

We do provide an off the shelf way to create a table from markdown files. This will parse and chunk the content appropriately and use the `nomic-embed-text` model to generate vectors.

// TODO how to run lance DB

I'm going to take all the contents of the `../documentation/docs` directory and create a RAG for the `subql-docs` table namespace in the `./db` directory.

```shell
subql-ai embed-mdx -i ../documentation/docs -o ./db -t subql-docs
```

### 4.2 Adding RAG data to your App

Follow the [guide at RAG](../build/rag.md) to add this newly generated RAG dataset to your app.
