# AI Apps

The SubQuery AI App framework is designed with user-friendliness in mind, providing intuitive wrappers around core features. This lowers the barrier to entry for developers of all skill levels, making it easier to create, run, and deploy AI Apps.

Building an AI application is a straightforward process that takes minutes. The SubQuery AI App framework simplifies most of this development, while allowing you to build complex applications that are ready to run on a decentralised network.

There are a few components to an application, to get started, create a project manifest and entrypoint.

## Project Manifest

The project manifest is the start point for your project. It defines a set of options and references your [tools](./tools) and [rag data](./rag). The format of this file can either be in JSON or TypeScript format. It is recommended to use TypeScript as it can easily provide extra build time functionality and type safety.

::: info Note
When you publish your app, the Typescript manifest will be converted to JSON.
:::

::: code-tabs

@tab:active typescript

```typescript
import type { ProjectManifest } from "jsr:@subql/ai-app-framework";

const project: ProjectManifest = {
  // The version of the manifest spec, this is alaway 0.0.1.
  specVersion: "0.0.1",
  // For security reasons you must provide a list of allowed domains that your project will use
  endpoints: ["gateway.subquery.network"],
  // (Optional) Vector db storage for RAG data, currently only lance DB is supported
  vectorStorage: {
    type: "lancedb",
    path: "./.db",
  },
  // (Optional) Runtime configuration options, this will get passed into your project entrypoint.
  // It needs to be in the JSON Schema format. We recommend using @sinclair/typebox to make this easy and provide runtime type checking.
  config: {
    type: "object",
    properties: {
      GRAPHQL_ENDPOINT: {
        default:
          "https://gateway.subquery.network/query/QmcoJLxSeBnGwtmtNmWFCRusXVTGjYWCK1LoujthZ2NyGP",
        type: "string",
      },
      BASE_RPC: {
        default: "https://gateway.subquery.network/rpc/base-full",
        type: "string",
      },
      BASE_SQT_ADDR: {
        default: "0x858c50C3AF1913b0E849aFDB74617388a1a5340d",
        type: "string",
      },
    },
    required: ["GRAPHQL_ENDPOINT", "BASE_RPC", "BASE_SQT_ADDR"],
  },
  // The LLM model you wish to use. Currently any Ollama model is supported
  model: "llama3.1",
  // (Optional) The LLM model for generating vectors from text.
  embeddingsModel: "nomic-embed-text",
  // The path to your project entrypoint
  entry: "./index.ts",
};

// The manifest must be the default export
export default project;
```

@tab json

```json
{
  "specVersion": "0.0.1",
  "endpoints": ["gateway.subquery.network"],
  "vectorStorage": {
    "type": "lancedb",
    "path": "./.db"
  },
  "config": {
    "type": "object",
    "properties": {
      "GRAPHQL_ENDPOINT": {
        "default": "https://gateway.subquery.network/query/QmcoJLxSeBnGwtmtNmWFCRusXVTGjYWCK1LoujthZ2NyGP",
        "type": "string"
      },
      "BASE_RPC": {
        "default": "https://gateway.subquery.network/rpc/base-full",
        "type": "string"
      },
      "BASE_SQT_ADDR": {
        "default": "0x858c50C3AF1913b0E849aFDB74617388a1a5340d",
        "type": "string"
      }
    },
    "required": ["GRAPHQL_ENDPOINT", "BASE_RPC", "BASE_SQT_ADDR"]
  },
  "model": "llama3.1",
  "entry": "./index.ts"
}
```

:::

### Config

To specify or override default config values when running, you can provide them with environment variables.

Example:

```shell
GRAPHQL_ENDPOINT=https://some.other.endpoint subql-ai -p ./path/to/project.ts
```

## Project Entrypoint

The project entrypoint is how your tools and system prompt are initialized, unlike the project manifest this is not static so you can change the behaviour based on your config spec.

Example entrypoint:

```typescript
import type { ProjectEntry, Project } from "jsr:@subql/ai-app-framework";

// This is your system prompt. It gives broad information to the LLM about what your application should to and how it should respond.
const SYSTEM_PROMPT = `
You are an agent designed to help a user with their token delegation on the SubQuery Network.
Given an input question, use the available tools to answer the users question quickly and concisely.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
All token amounts are in SQT.

If the question seems to be unrelated to the API, just return "I don't know" as the answer.
`;

const entrypoint: ProjectEntry = async (config: Config): Promise<Project> => {
  return {
    // Initialize any tools you wish to provided with your app
    tools: [
      new TotalDelegation(config.GRAPHQL_ENDPOINT),
      new DelegatedIndexers(config.GRAPHQL_ENDPOINT),
      new UnclaimedDelegatorRewards(config.GRAPHQL_ENDPOINT),
      new CurrentDelegatorApy(config.GRAPHQL_ENDPOINT),
      new BetterIndexerApy(config.GRAPHQL_ENDPOINT),
      new TokenBalance(
        new JsonRpcProvider(config.BASE_RPC),
        config.BASE_SQT_ADDR
      ),
      new SubqueryDocs(),
    ],
    systemPrompt: SYSTEM_PROMPT,
  };
};

// The project entry must be a default export
export default entrypoint;
```

## Next Steps

- [Define any additional function tools](./function_tools)
- [Add RAG data](./rag)
- Optimise your System Prompt and Tool descriptions.
