# SubQuery Fancy Greeter - Basic Example

This basic example AI App is a good starting point to learn about prompt engineering and function tooling. It's a pefect example that shows off the key features of SubQuery's AI App Framework.

You can follow along in the tutorial with the [example code here](https://github.com/subquery/subql-ai-app-example/tree/main/fancy-greeter).

## Prerequisites

You should have the following installed

- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.
- [Ollama](https://ollama.com/). An endpoint to an Ollama instance, this could be running on your local computer or a commerical endpoint online.
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

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that there should be three files, a `project.ts`, a `manifest.ts`, a `docker-compose.yml`, and a `README.md`.

## 3. Run the AI App

We can run the project at any time using the following command, where the `-p` is the path to the `project.ts`, and `-h` is the URL of the Ollama endpoint.

```bash
subql-ai -p ./project.ts -h http://host.docker.internal:11434
```

Once the project is running you should see the following: `Listening on http://0.0.0.0:7827/`

You can now interact with your application. The easiest way to do that is to run the repl in another terminal.

```shell
subql-ai repl
```

This will start a CLI chat. You can type `/bye` to exit.

You should review the instructions on [running locally](../run/local.md) or via [Docker](../run/docker.md).

## 4. Update System Prompt

A good first place to start is by updating your system prompts in `project.ts`. System promps are the basic way you customise the behaviour of your AI agent.

We do this by editing the project entrypoint in the `project.ts` file, the [project entrypoint](../build/app.md#project-entrypoint) is how your tools and system prompt are initialized.

```ts
const entrypoint: ProjectEntry = async (config: Config): Promise<Project> => {
  return {
    tools: [],
    systemPrompt: `You are an agent designed to greet a user in the strangest way possible.
    Always ask for the users name first before you greet them, once you have this information, you can greet them in a unique way.
    Your greeting should be weird, perhaps a pun or dad joke with their name. Please be funny, interesting, weird, and/or unique.
    If you need more information to answer to greet the user, ask the user for more details.`,
  };
};

export default entrypoint;
```

You can read more about edits to the `project.ts` [here](../build/app.md).

## 5. Add a function tool

Function tools are functions that extend the functionality of the LLM. They can be used to do many things like request data from external APIs and services, perform computations or analyse structured data outputs from the AI. You can [read more about function tooling here](../build/function_tools.md).

We're going to add a simple function tool that does nothing more than take an input name, and reverse the name. For example, `alice` would become `ecila` and `bob` would remain `bob`.

Function tools consist of 4 parts:

- `name`: The name of the tool, this is used to identify the tool and must be unique amongst the provided tools.
- `description`: This is like a system prompt for the LLM to understand what the tool does and when it should be used, it should be as descriptive as possible as it allows the AI to determine when to use the tool and what it should be used for.
- `parameters`: This defines what parameters the LLM needs to gather in order to run the tool.
- `call`: This is the function implementation that takes an input that should match the defined parameters and return a string with the result.

Note in the example below we have:

- defined the function tool (`class ReverseNameTool extends FunctionTool { ... }`)
- Added the new function tool to the list of tools (`tools: [new ReverseNameTool()],`)
- Updated the system prompt to tell the AI to always reverse the name using the Reverse Name function (`ALWAYS REVERSE THEIR NAME USING THE REVERSE_NAME_TOOL BEFORE GREETING THEM!`).

```ts
class ReverseNameTool extends FunctionTool {
  description = `This tool reverses the users name.`;
  parameters = {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "The name of the user",
      },
    },
  };

  async call({ name }: { name: string }): Promise<string | null> {
    // Reverse the order of the input name
    return await name.split("").reverse().join("");
  }
}

// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (config: Config): Promise<Project> => {
  return {
    tools: [new ReverseNameTool()],
    systemPrompt: `You are an agent designed to greet a user in the strangest way possible.
    Always ask for the users name first before you greet them, once you have this information, you can greet them in a unique way.
    Your greeting should be weird, perhaps a pun or dad joke with their name. Please be funny, interesting, weird, and/or unique.
    ALWAYS REVERSE THEIR NAME USING THE REVERSENAMETOOL BEFORE GREETING THEM!
    Do not mention that you used a tool or the name of a tool.
    If you need more information to answer to greet the user, ask the user for more details.`,
  };
};

export default entrypoint;
```

Note that this is a very silly example of a function tool, but you can really do anything with function tools. For example:

- Make an API request to retrieve or update data
- Get the balance of a user's wallet
- Log results of certain conversations to an external service
- Potentially even create a transaction on chain

## Summary

You now have a running SubQuery AI App that uses the latest LLMs and also incorportes a function tool. This may be a simple and rather basic example, but it's a great starting point to building complex AI Apps and agents custom built for your application.

[**A full version of the code for this guide can be found here**](https://github.com/subquery/subql-ai-app-example/tree/main/fancy-greeter).

From here you may want to look at the following guides:

- Detailed documentation on the [AI App Manifest](../build/app.md).
- Enhance your AI App with [function tooling](../build/function_tools.md).
- Give your AI App more knowledge with [RAG support](../build/rag.md).
- [Publish your AI App](../publish/publish.md) so it can run on the [SubQuery Decentralised Network](https://app.subquery.network).
