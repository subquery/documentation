# Algorand Quick Start

## Goals

The goal of this quick guide is to adapt the standard starter project and start indexing all **TBC** from Algorand.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section.
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

**TBC**
::: info Note
The final code of this project can be found [here](). 
:::
## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal beforehand.

Remove all existing entities and update the `schema.graphql` file as follows:
**TBC**

```graphql

```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn codegen
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```shell
npm run-script codegen
```

  </CodeGroupItem>
</CodeGroup>

You will find the generated models in the `/src/types/models` directory.

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Algorand project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers.

**TBC**
**Since you are going to index ..... you need to update the `datasources` section as follows:**
**TBC**
```yaml
dataSources:
  
```


*TBC**
The above code indicates that you will be running a **TBC** mapping function whenever there is an **TBC**` log on any transaction from the **TBC**

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:
*TBC**

```ts
}
```

Let’s understand how the above code works.
*TBC**


Check out our [Mappings](../../build/mapping.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn build
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script build
```

  </CodeGroupItem>
</CodeGroup>

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn start:docker
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script start:docker
```

  </CodeGroupItem>
</CodeGroup>

::: info Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
::: 

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql

```

You will see the result similar to below:

```json

```

::: info Note
The final code of this project can be found [here]().
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
