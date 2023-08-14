# The Basic Workflow

In the [quick start](../quickstart/quickstart.md) guide, we very quickly ran through an example to give you a taste of what SubQuery is and how it works. Here we'll take a closer look at the workflow when creating your project and the key files you'll be working with.

Some of the following examples will assume you have successfully initialized the starter package in the [Quick start](../quickstart/quickstart.md) section. From that starter package, we'll walk through the standard process to customise and implement your SubQuery project.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Update the Manifest file (`project.yaml`) to include information about your blockchain, and the entities that you will map - see [Manifest File](./manifest/polkadot.md).
3. Create GraphQL entities in your schema (`schema.graphql`) that defines the shape of the data that you will extract and persist for querying - see [GraphQL Schema](./graphql.md).
4. Add all the mapping functions (eg `mappingHandlers.ts`) you wish to invoke to transform chain data to the GraphQL entities that you have defined - see [Mapping](./mapping/polkadot.md).
5. Generate, build, and publish your code to SubQuery Projects (or run in your own local node) - see how to [Run](../run_publish/run.md) and [Publish](../run_publish/publish.md) your Starter Project in our quick start guide.

## Directory Structure

The following map provides an overview of the directory structure of a SubQuery project when the `init` command is run.

```
- project-name
  L .github
  L abis
  L docker
  L src
    L mappings
      L mappingHandlers.ts
    L test
    L index.ts
  L .gitignore
  L LICENSE
  L README.md
  L docker-compose.yml
  L package.json
  L project.yaml
  L schema.graphql
  L tsconfig.json
```

For example:

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## EVM Project Scaffolding

Scaffolding saves time during SubQuery project creation by automatically generating typescript facades for EVM transactions, logs, and types.

### When Initialising New SubQuery Projects

When you are initalising a new project using the `subql init` command, SubQuery will give you the option to set up a scaffolded SubQuery project based on your JSON ABI.

If you have select an compatiable network type (EVM), it will prompt

```shell
? Do you want to generate scaffolding with an existing abi contract?
```

Followed by prompt on the path to your ABI file (absolute or relative to your current working directory). This must be in a JSON format.

```shell
? Path to ABI ../../../hello/world/abis/erc721.abi.json
```

So for example, If I wanted to create the [Ethereum Gravatar indexer](./quickstart_chains/ethereum-gravatar.md), I would download the Gravity ABI contract JSON from [Etherscan](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code), save it as `Gravity.json`, and then run the following.

You will then be prompted `events` and `functions` available from the provided ABI.

### For Existing SubQuery

You can also generate additional scaffolded code new new contracts and append this code to your existing `project.yaml`. This is done using the `subql codegen:generate` command.

```shell
subql codegen:generate \
-f <root path of your project> \ # Assumes current location if not provided
--abiPath <path of your abi file> \ # path is from project root - this is required
-- startBlock <start block> # Required
--address <address> \ # Contract address
--events '*' \  # accepted formats: 'transfers, approval'
--functions '*' # accepted formats: 'transferFrom, approve'
```

This will attempt to read the provided ABI file, and generate a list of events & functions in accordance.

If `--events` or `--functions` are not provided, all available events\functions will be prompted, if `'*'` is provided, all events/functions will be selected.

For example

```shell
subql codegen:generate \
-f './example-project' \
--abiPath './abis/erc721.json' \ (required)
-- startBlock 1 \ (required)
--address '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' \
--events '*' \
--functions '*'
```

### What is Scaffolded?

Once completed, you will have a scaffold project structure from your chosen ABI `functions`/`events`.

This should generate a typescript file `<abiName>Handler.ts` containing functions with the appropriate typing.

```typescript
export async function handleApproveErc721AbiTx(
  tx: ApproveTransaction
): Promise<void> {
  // Place your code logic here
}
```

This will also add a new datasource in the `project.yaml` including the selected ABI events/functions

```yaml
- kind: ethereum/Runtime
  startBlock: 1
  options:
    abi: Erc721Abi
  assets:
    Erc721Abi:
      file: ./abis/erc721.abi.json
  mapping:
    file: ./dist/index.js
    handlers:
      - handler: handleApproveErc721AbiTx
        kind: ethereum/TransactionHandler
        filter:
          function: approve(address,uint256)
```

## Code Generation

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

**Whenever you change your GraphQL entities, you must regenerate your types directory with the following command:**

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```bash
npm run-script codegen
```

:::

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../build/graphql.md). All entites can be imported from the following directory:

```ts
import { GraphQLEntity1, GraphQLEntity2 } from "../types";
```

If you're creating a new Ethereum based project (including Ethereum, Avalanche, and Substrate's Frontier EVM & Acala EVM+), this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example [Gravatar SubQuery project](../quickstart/quickstart_chains/ethereum-gravatar.md), you would import these types like so.

```ts
import { GraphQLEntity1, GraphQLEntity2 } from "../types";
```

**ABI Codegen is not yet supported for Cosmos Ethermint EVM ([track progress here](https://github.com/subquery/subql-cosmos/issues/102)) or Substrate WASM**

## Build

In order to run your SubQuery Project on a locally hosted SubQuery Node, you need to first build your work.

Run the build command from the project's root directory.

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```bash
npm run-script build
```

:::

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in `package.json`.

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

For more information on using this including flags, see [cli reference](../run_publish/references.md).

## Logging

The `console.log` method is **not supported**. Instead, a `logger` module has been injected in the types, which means we support a logger that can accept various logging levels.

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

To use `logger.info` or `logger.warn`, just place the line into any mapping file. When developing a SubQuery project, it's common to log a message with the block height at the start of each mapping function so you can easily identify that the mapping function has been triggered and is executing. In addition, you can inspect the payload of data passed through to the mapping function easily by stringifying the payload. Note that `JSON.stringify` doesn’t support native `BigInts`.

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  logger.info('New log found at ' + log.blockNumber.toString());
  logger.info('New log payload ' + JSON.stringify(log.data));
  ... // do something
}
```

The default log level is `info` and above. To use `logger.debug`,you must add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
