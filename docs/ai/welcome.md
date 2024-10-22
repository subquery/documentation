# Build with SubQuery's AI App Framework

The SubQuery App Framework allows you to build and run production LLM Apps on the SubQuery Network in a trusted and decentralised environment.

Primarily AI apps are self contained and easily scalable AI agents that you can use to power your intelligent applications. They are sandboxed to a trusted runner and since are described by a manifest, they can easily be distributed and scaled on the SubQuery Network.

## Features

- **Effortless decentralised distribution:** The SubQuery AI App Framework uses a sandboxed environment for secure and efficient operations. Each AI App is encapsulated with its own manifest, enabling seamless distribution across the SubQuery Network. This ensures that scaling is not only easy but also secure, allowing developers to focus on innovation rather than infrastructure.
- **Empower your AI with RAGs:** By integrating [RAG (Retrieval-Augmented Generation) files](./build/rag.md), your AI Apps can leverage domain-specific knowledge efficiently. With initial support for LanceDB and future compatibility with other vector databases, developers can enhance their applications' performance and accuracy. Additionally, publishing to IPFS ensures data integrity and accessibility.
- **Your AI journey starts here:** The SubQuerty AI App framework is designed with user-friendliness in mind, providing intuitive wrappers around core features. This lowers the barrier to entry for developers of all skill levels, making it easier to create, run, and deploy AI Apps.
- **Connect, Create, and Integrate with function tooling:** You can extend your AI Apps with additional [function tooling](./build/function_tools.md), facilitating connections to external systems and tools. This capability enables rich integrations, allowing users to create versatile applications that can interact seamlessly with blockchains and other ecosystems.
- **Chose your model:** By supporting a range of open-source LLM models, starting with Ollama-compatible ones, the SubQuery AI App Framework ensures that users can choose the best model for their applications without being locked into a specific model ecosystem. This flexibility fosters open-source innovation.
- **Proven standards for seamless integration:** SubQuery AI Apps expose the industry-standard [OpenAI API](./query/query.md), ensuring compatibility with a wide range of applications and tools. This makes it easier for developers to integrate AI capabilities into their projects while adhering to established standards.

## Getting Started

### Setup your environment

To use the framework there are a couple of dependencies:

- [Deno](https://deno.land/). The SubQuery AI framework is built on Deno and is needed to build your app.
- [Ollama](https://ollama.com/). Alternatively an endpoint to an Ollama instance.

### Install the framework

Run the following command to install the SubQuery AI framework globally on your system:

```bash
deno install -g -f --allow-env --allow-net --allow-read --allow-write --allow-ffi --allow-run --unstable-worker-options -n subql-ai @subql/ai-app-framework`
```

This will install the CLI and Runner

## Create a new App

TODO an init command needs to be implemented.

You can read the instructions on how to create an app yourself [here](./build/app.md)
