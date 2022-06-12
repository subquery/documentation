# The Basic Workflow

In the [quick start](/quickstart/quickstart-polkadot.md) guide, we very quickly ran through an example to give you a taste of what SubQuery is and how it works. Here we'll take a closer look at the workflow when creating your project and the key files you'll be working with.

Some of the following examples will assume you have successfully initialized the starter package in the [Quick start](../quickstart/quickstart-polkadot.md) section. From that starter package, we'll walk through the standard process to customise and implement your SubQuery project.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Update the Manifest file (`project.yaml`) to include information about your blockchain, and the entities that you will map - see [Manifest File](./manifest.md)
3. Create GraphQL entities in your schema (`schema.graphql`) that define the shape of the data that you will extract and persist for querying - see [GraphQL Schema](./graphql.md)
4. Add all the mapping functions (eg `mappingHandlers.ts`) you wish to invoke to transform chain data to the GraphQL entities that you have defined - see [Mapping](./mapping.md)
5. Generate, build, and publish your code to SubQuery Projects (or run in your own local node) - see [Running and Querying your Starter Project](./quickstart-polkadot.md#running-and-querying-your-starter-project) in our quick start guide.

## Directory Structure

The following map provides an overview of the directory structure of a SubQuery project when the `init` command is run.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

For example:

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## Code Generation

Whenever you change your GraphQL entities, you must regenerate your types directory with the following command.

```
yarn codegen
```

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](./graphql.md).

## Build

In order to run your SubQuery Project on a locally hosted SubQuery Node, you need to first build your work.

Run the build command from the project's root directory.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn build
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm run-script build
  ```

  </CodeGroupItem>
</CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/run_publish/references/#build).

## Logging

The `console.log` method is **not supported**. Instead, a `logger` module has been injected in the types, which means we support a logger that can accept various logging levels.

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
