# SubQuery Docs Assistent - RAG Example

This is an example of an AI app utilizing RAG (Retrieval-Augmented Generation). [RAG tools](../build/rag.md) are a specialized type of [function tools](../build/function_tools.md) that enhance your LLM by integrating a vector database created from anything you choose to vectorize.

In this case, we are building a vector database based on the markdown files in the documentation repository. Once deployed, this enables an intelligent documentation search feature.

:::info note
This tool is already in use in production within this documentation. Be sure to explore it now by clicking the corresponding button in the lower-right corner.
:::

You can follow along in the tutorial with the [example code here](https://github.com/subquery/subql-ai-app-example/tree/main/docs).

<!-- @include: ./snippets/prerequisites.md -->

<!-- @include: ./snippets/install-the-framework.md -->

<!-- @include: ./snippets/create-a-new-app.md -->

## 3. Run the AI App

<!-- @include: ./snippets/run-the-ai-app.md -->

<!-- @include: ./snippets/update-system-prompt.md -->

In this example we will be having several tools connected. 

```ts
const PROMPT = `
You are designed to assist with answering questions about SubQuery, using its documentation as a reference.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
`;
```

<!-- @include: ./snippets/add-a-function-tool.md -->

You can now add the tool to the array.

```ts
// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (): Promise<Project> => {
  return {
    tools: [
      new SubqueryDocs(),
    ],
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

After that, you can simply run it.

## 6. Run the AI App with developed tools

<!-- @include: ./snippets/run-the-ai-app.md -->

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

You now have a fully functional SubQuery AI App that utilizes the latest LLMs and integrates several function tools that interact with blockchain data. You can use this example as a foundation to create your own tools, leveraging on-chain data queried in a flexible way, enabling real-time data analysis through simple, natural language prompts.

[**A full version of the code for this guide can be found here**](https://github.com/subquery/subql-ai-app-example/tree/main/fancy-greeter).

<!-- @include: ./snippets/summary.md -->
