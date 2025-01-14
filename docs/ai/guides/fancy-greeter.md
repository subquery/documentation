# SubQuery Fancy Greeter - Basic Example

This basic example AI App is a good starting point to learn about prompt engineering and function tooling. It's a perfect example that shows off the key features of SubQuery's AI App Framework.

:::info note
You can follow along in the tutorial with the [example code here](https://github.com/subquery/subql-ai-app-example/tree/main/fancy-greeter).
:::

<!-- @include: ./snippets/prerequisites.md -->

## 1. Install the framework

<!-- @include: ./snippets/install-the-framework.md -->

## 2. Create a New App

<!-- @include: ./snippets/create-a-new-app.md -->

## 3. Configure Manifest File

<!-- @include: ./snippets/configure-manifest-file.md -->

The manifest file is having the following look:

```ts
import type { ProjectManifest } from "jsr:@subql/ai-app-framework";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  // Specify any hostnames your tools will make network requests too
  endpoints: [],
  // Your projects runtime configuration options
  config: {}, 
  model: "llama3.2:1b",
  entry: "./project.ts",
};

export default project;
```

As you can see, there are very few details to configure in our example. The two most important settings are the `model` (a selection of models can be found [here](https://ollama.com/library)) and the `entry`, where you'll specify the path to your project's entry point.

## 4. Configure App's Logic

<!-- @include: ./snippets/configure-app-logic.md -->

<!-- @include: ./snippets/update-system-prompt.md -->

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

<!-- @include: ./snippets/add-a-function-tool.md -->

We're going to add a simple function tool that does nothing more than take an input name, and reverse the name. For example, `alice` would become `ecila` and `bob` would remain `bob`. To accomplish this, we need to modify the code as follows:

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

First, define the function tool by creating a class (`class ReverseNameTool extends FunctionTool { ... }`). Next, add this new function tool to the list of tools (`tools: [new ReverseNameTool()],`). Lastly, update the system prompt to instruct the AI to always reverse the name before greeting, using the Reverse Name tool (`ALWAYS USE THE REVERSE_NAME_TOOL TO REVERSE THEIR NAME BEFORE GREETING THEM!`).

## 5. Run the App

<!-- @include: ./snippets/run-the-ai-app.md -->

## Summary

You now have a running SubQuery AI App that uses the latest LLMs and also incorporates a function tool. This may be a simple and rather basic example, but it's a great starting point to building complex AI Apps and agents custom built for your application.

<!-- @include: ./snippets/summary.md -->
