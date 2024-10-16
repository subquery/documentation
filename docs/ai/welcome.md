# Build with SubQuery's AI App Framework

The SubQuery App Framework allows you to build and run LLM Apps on the SubQuery Network in a trusted environment.


## Getting Started

### Setup your environment

To use the framework there are a couple of dependencies:

* [Deno](https://deno.land/). The SubQuery AI framework is built on Deno and is needed to build your app.
* [Ollama](https://ollama.com/). Alternatively an endpoint to an Ollama instance.

### Install the framework

Run the following command to install the SubQuery AI framework globally on your system:

```bash
deno install -g -f --allow-env --allow-net --allow-read --allow-write --allow-ffi --allow-run --unstable-worker-options -n subql-ai @subql/ai-app-framework`
```

This will install the CLI and Runner

## Create a new App

TODO an init command needs to be implemented.

You can read the instructions on how to create an app yourself [here](./build/app.md)
