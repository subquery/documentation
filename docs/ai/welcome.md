# Build with SubQuery's AI App Framework

The AI App Framework allows you to build, deploy, and run production AI apps on the SubQuery Network in a trusted and decentralised environment.

AI apps are self contained and easily scalable AI agents that you can use to power your intelligent applications. They are sandboxed to a trusted runner and can be easily distributed and scaled horizontally across the SubQuery Network.

![AI Apps Header Image](/assets/img/ai/header.png)

## Features

- **Effortless decentralised distribution:** The SubQuery AI App Framework uses a sandboxed environment for secure and efficient operations. Each AI App is encapsulated with its own manifest, enabling seamless distribution across the SubQuery Network. This ensures that horizontal scaling is not only easy but also secure, allowing developers to focus on innovation rather than infrastructure.
- **Empower your AI with RAGs:** By integrating [RAG (Retrieval-Augmented Generation) files](./build/rag.md), your AI Apps can leverage domain-specific knowledge efficiently. With initial support for LanceDB and future compatibility with other vector databases, developers can enhance their applications' performance and accuracy. Additionally, publishing to IPFS ensures data integrity and accessibility.
- **Your AI journey starts here:** The SubQuery AI App framework is designed with user-friendliness in mind, providing intuitive wrappers around core features. This lowers the barrier to entry for developers of all skill levels, making it easier to create, run, and deploy AI Apps.
- **Connect, create, and integrate with function tooling:** You can extend your AI Apps with additional [function tooling](./build/function_tools.md), facilitating connections to external systems and tools. This capability enables rich integrations, allowing users to create versatile applications that can interact seamlessly with blockchains and other ecosystems.
- **Choose your model:** By supporting a range of open-source Ollama LLM models as well as, OpenAI, the SubQuery AI App Framework ensures that users can choose the best model for their applications without being locked into a specific model ecosystem. This flexibility fosters open-source innovation.
- **Proven standards for seamless integration:** SubQuery AI Apps expose the industry-standard [OpenAI API](./query/query.md), ensuring compatibility with a wide range of applications and tools. This makes it easier for developers to integrate AI capabilities into their projects while adhering to established standards.

![AI App Framework Features](/assets/img/ai/features.jpg)

## What can you build with SubQuery’s AI App Framework?

SubQuery’s AI App Framework is a powerful but intuitive SDK to help you build advanced AI applications in minutes. It’s built on typescript and is extremely easy to use, essentially simplifying most of the backend tasks required to customise and integrate LLM models into production usecases.

For example, you could use it to build:

- **A customer support bot**, trained on the documentation for your project and able to guide customers through their problems. It could also be trained to submit clean and detailed customer support tickets when escalation is required.
- **Wallet assistants** that help users understand the tokens they have and guide them through the process of managing, bridging, or swapping them. For example, a user could ask “how do I convert ETH to SQT?” and the AI would guide them through the options.
- **Content moderation for decentralised social networks**, AI Apps could be trained to moderate content by identifying spam or harmful content and using function tools to disable or hide them.
- **AI agents to improve participation in governance**, by analysing and summarising proposals in DAOs and assisting users in making informed voting decisions based on data-driven insights.
- **Dynamic pricing models**, by analysing demand and supply in real-time, adjusting prices for tokens or NFTs dynamically based on user behaviour and market trends.

## Getting Started

### Setup your environment

To use the framework there are a couple of dependencies:

- [Deno](https://deno.land/). The SubQuery AI framework is built on Deno and is needed to build your app.
- An LLM
  - [Ollama](https://ollama.com/). Alternatively an endpoint to an Ollama instance.
  - [OpenAI](https://platform.openai.com). You will need a paid API Key.

### Install the framework

Run the following command to install the SubQuery AI framework globally on your system:

```bash
deno install -g -f --allow-env --allow-net --allow-import --allow-read --allow-write --allow-ffi --allow-run --unstable-worker-options -n subql-ai jsr:@subql/ai-app-framework/cli
```

This will install the CLI and Runner. Make sure you follow the suggested instructions to add it to your path.

You can confirm installation by running `subql-ai --help`.

## Create a new App

You can initialise a new app using `subql-ai init`. It will ask you to provide a name and a LLM model to use.

![Init a new AI App](/assets/img/ai/guide-init.png)

You can follow along on a [guide to create a basic SubQuery AI App with the SubQuery App framework here](./guides/fancy-greeter.md), or read the instructions on how to create an app yourself [here](./build/app.md)
