# Project Documentation AI Assistent - Intermediate Example with RAG Support

This is an example of an AI app utilising RAG (Retrieval-Augmented Generation). [RAG tools](../build/rag.md) are a specialised type of [function tools](../build/function_tools.md) that enhance your LLM by integrating a vector database created from anything you choose to vectorise. In most cases this will be additional data from a knowledgebase or a database, in this case we're incorportating the SubQuery documentation website as our RAG data (where you're reading this right now).

:::info note
This tool is already in use in production for SubQuery documentation. Be sure to explore it now by clicking the corresponding button in the lower-right corner.
:::

You can follow along in the tutorial with the [example code here](https://github.com/subquery/subql-ai-app-example/tree/main/docs).

<!-- @include: ../snippets/prerequisites.md -->

## 1. Install the framework

<!-- @include: ../snippets/install-the-framework.md -->

## 2. Create a New App

<!-- @include: ../snippets/create-a-new-app.md -->

## 3. Configure Manifest File

<!-- @include: ../snippets/configure-manifest-file.md -->

To proceed with this case, we need to define and add a RAG dataset. You can experiment using the [SubQuery documentation](https://github.com/subquery/documentation) or your own documentation, provided it can be vectorized (it's easiest if it's in Markdown format).

After downloading the documentation project to your local computer, you can define it using the SubQuery CLI and the default tool by following [this guide](../build/rag.md#defining-rag). The logic for vectorization can be found on [GitHub](https://github.com/subquery/subql-ai-app-framework/blob/main/src/embeddings/generator/generator.ts). Alternatively, you can use a custom vectorization algorithm better suited to your specific needs.

Once the vectorisation process is complete, it will generate a folder. Copy the path to the root of this generated folder and include it in the manifest file to ingest and embed your chosen RAG source data.

After the modification, the manifest file will resemble the following structure:

```ts
import type { ProjectManifest } from "jsr:@subql/ai-app-framework@^0.0.5";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  vectorStorage: {
    type: "lancedb",
    path: "../path-to-the-folder",
  },
  config: {},
  model: "llama3.1",
  embeddingsModel: "nomic-embed-text",
  entry: "./project.ts",
};

export default project;
```

## 4. Configure App's Logic

<!-- @include: ../snippets/configure-app-logic.md -->

<!-- @include: ../snippets/update-system-prompt.md -->

```ts
const PROMPT = `
You are designed to assist with answering questions about SubQuery, using its documentation as a reference.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
`;
```

<!-- @include: ../snippets/add-a-function-tool.md -->

You can now add the tool to the array.

```ts
// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (): Promise<Project> => {
  return {
    tools: [new SubqueryDocs()],
    systemPrompt: PROMPT,
  };
};

export default entrypoint;
```

After adding the tools to the array, you can begin implementing it. No explicit configuration is needed, as this is handled automatically by the SubQuery AI Framework SDK in the background.

```ts
export class SubqueryDocs extends RagTool {
  constructor() {
    super("subql-docs", "content");
  }
}
```

## 5. Run the AI App with developed tools

<!-- @include: ../snippets/run-the-ai-app.md -->

Let's attempt to ask the tool specific questions:

```
How can I define a one-to-many relationship in a subquery project GraphQL schema?
```

This should return a response that looks like the following:

::: details Full Response

```
It seems like the SubQuery Docs API is still under development and doesn't support defining one-to-many relationships in GraphQL queries.

To answer your question, a one-to-many relationship can be achieved by using subqueries. Here's an example of how you could define a one-to-many relationship between two tables using a subquery:

type OneToOneExample {
  id: ID!
  anotherId: ID!
}

type Query {
  oneToMany: [OneToOneExample!] @client
}

In this query, we have a `OneToOneExample` type that has two fields: `id` and `anotherId`. The `@client` keyword is used to indicate that the field is not a built-in GraphQL field.

The subquery is defined like so:

query MyQuery {
  oneToMany: [one TO MANY ON ONE(id: $id, anotherId: $anotherId) FROM OneToOneExample!] WHERE $id IS NOT NULL AND $anotherId IS NOT NULL
}

In this query, we define a subquery that selects from the `OneToOneExample` type. The subquery is executed for each pair of distinct values in the `id` and `anotherId` fields. This will give us a list of records where one-to-many relationship between the two tables.

Please note that not all GraphQL databases support this syntax, so you may need to adjust it to fit your specific database schema.
```

:::

Another prompt:

```
Does subquery support the solana blockchain?
```

::: details Full Response

```
Subquery currently does not support Solana blockchain.
```

:::

## Summary

You now have a fully functional SubQuery AI App that leverages unstructured markdown data to deliver clearer and more concise responses about SubQuery.

<!-- @include: ../snippets/summary.md -->
