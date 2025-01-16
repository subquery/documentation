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

## 3. Embedding Documentation for RAG

To proceed with our example, we need to define and add a RAG dataset. For this guide, we will experiment with the [SubQuery documentation](https://github.com/subquery/documentation), but feel free to use your own markdown-based documentation, provided it can be vectorised.

### Step 1: Clone the Documentation Repository

First, clone the SubQuery documentation repository by running the following command in your terminal:

```bash
git clone https://github.com/subquery/documentation.git
```

### Step 2: Define the RAG Dataset

Once the documentation repository is cloned, you can define it using the SubQuery CLI. The default RAG tool can be utilised by following [this guide](../build/rag.md#defining-rag). Here’s an example command:

```bash
subql-ai embed-mdx -i ./subquery/documentation -o ./db --table subql-docs --model nomic-embed-text
```

Here’s a breakdown of the parameters used in this command:

- **`-i` (input)**: Specifies the path to the documentation repository you cloned, with no additional modifications required.
- **`-o` (output)**: Indicates the path where the generated embeddings will be saved.
- **`--table`**: Defines the table name for storing the embeddings.
- **`--model`**: Specifies the embedding LLM model to use, which should match the model defined in the app's manifest.

:::info Note  
The logic for vectorisation is implemented in the SubQuery framework and can be found on [GitHub](https://github.com/subquery/subql-ai-app-framework/blob/main/src/embeddings/generator/generator.ts).  

The CLI processes markdown files within the specified directory and generates embeddings by performing the following steps:  

1. **Splitting Markdown Files**: Files are divided into sections based on headers.
2. **MDX Element Removal**: Any MDX elements are stripped away.
3. **Plain Text Conversion**: Each section's content is converted to plain text.

If the default vectorisation algorithm doesn’t suit your needs, you can use a custom algorithm tailored to your specific requirements.  
:::

### Step 3: Review Generated Embeddings

After the vectorisation process is complete, a folder will be generated containing the embeddings. It will include subfolders and files similar to the structure shown below:  

![Generated Embeddings](/assets/img/ai/generated-embeddings.png)

Copy the root path of this folder. You will need this path in the next step when configuring the manifest file to ingest and embed your chosen RAG source data.

### 4. Configure the Manifest File  

<!-- @include: ../snippets/configure-manifest-file.md -->

Continue with the next steps to integrate the embeddings into your application. After the modification, the manifest file will resemble the following structure:

```ts
import type { ProjectManifest } from "jsr:@subql/ai-app-framework@^0.0.5";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  vectorStorage: {
    type: "lancedb",
    path: "../path-to-previously-generated-db-folder",
  },
  config: {},
  model: "llama3.1",
  embeddingsModel: "nomic-embed-text",
  entry: "./project.ts",
};

export default project;
```

## 5. Configure App's Logic

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

## 6. Run the AI App with developed tools

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
