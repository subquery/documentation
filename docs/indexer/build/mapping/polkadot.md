# Polkadot Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are referenced in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mappings functions for Polkadot/Substrate; [Block handlers](#block-handler), [Event Handlers](#event-handler), and [Call Handlers](#call-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { SubstrateBlock } from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.header.hash.toString());
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
```

A `SubstrateBlock` is an extended interface type of [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), but also includes the `specVersion` and `timestamp`.

## Event Handler

You can use event handlers to capture information when certain events are included on a new block. The events that are part of the default runtime and a block may contain multiple events.

During the processing, the event handler will receive an event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/polkadot.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { SubstrateEvent } from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  const record = new EventEntity(
    event.extrinsic.block.block.header.hash.toString(),
  );
  record.field2 = account.toString();
  record.field3 = (balance as Balance).toBigInt();
  await record.save();
}
```

A `SubstrateEvent` is an extended interface type of the [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Besides the event data, it also includes an `id` (the block to which this event belongs) and the extrinsic inside of this block.

::: tip Note
From `@subql/types` version `X.X.X` onwards `SubstrateEvent` is now generic. This can provide you with higher type safety when developing your project.

```ts
async function handleEvmLog(event: SubstrateEvent<[EvmLog]>): Promise<void> {
  // `eventData` will be of type `EvmLog` before it would have been `Codec`
  const [eventData] = original.event.data;
}
```

:::

## Call Handler

Call handlers are used when you want to capture information on certain substrate extrinsics. You should use [Mapping Filters](../manifest/polkadot.md#mapping-handlers-and-filters) in your manifest to filter calls to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = new CallEntity(extrinsic.block.block.header.hash.toString());
  record.field4 = extrinsic.block.timestamp;
  await record.save();
}
```

The [SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) extends [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). It is assigned an `id` (the block to which this extrinsic belongs) and provides an extrinsic property that extends the events among this block. Additionally, it records the success status of this extrinsic.

::: tip Note
From `@subql/types` version `X.X.X` onwards `SubstrateExtrinsic` is now generic. This can provide you with higher type safety when developing your project.

```ts
async function handleEvmCall(
  call: SubstrateExtrinsic<[TransactionV2 | EthTransaction]>,
): Promise<void> {
  // `tx` will be of type `TransactionV2 | EthTransaction` before it would have been `Codec`
  const [tx] = original.extrinsic.method.args;
}
```

:::


### Query States

Our goal is to cover all data sources for users for mapping handlers (more than just the three interface event types above). Therefore, we have exposed some of the @polkadot/api interfaces to increase capabilities.

These are the interfaces we currently support:

- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) will query the **current** block.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) will make multiple queries of the **same** type at the current block.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) will make multiple queries of **different** types at the current block.

These are the interfaces we do **NOT** support currently:

- ~~api.tx.\*~~
- ~~api.derive.\*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

See an example of using this API in our [validator-threshold](https://github.com/subquery/tutorials-validator-threshold) example use case.

### RPC calls

We also support some API RPC methods that are remote calls that allow the mapping function to interact with the actual node, query, and submission.

Documents in [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) provide some methods that take `BlockHash` as an input parameter (e.g. `at?: BlockHash`), which are now permitted.
We have also modified these methods to take the current indexing block hash by default.

```ts
// Let's say we are currently indexing a block with this hash number
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Original method has an optional input is block hash
const b1 = await api.rpc.chain.getBlock(blockhash);

// It will use the current block has by default like so
const b2 = await api.rpc.chain.getBlock();
```

- For [Custom Substrate Chains](#custom-substrate-chains) RPC calls, see [usage](#usage).

## Custom Substrate Chains

SubQuery can be used on any Substrate-based chain, not just Polkadot or Kusama.

You can use a custom Substrate-based chain and we provide tools to import types, interfaces, and additional methods automatically using [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

In the following sections, we use our [kitty example](https://github.com/subquery/tutorials-kitty-chain) to explain the integration process.

#### Preparation

Create a new directory `api-interfaces` under the project `src` folder to store all required and generated files. We also create an `api-interfaces/kitties` directory as we want to add decoration in the API from the `kitties` module.

**Metadata**

We need metadata to generate the actual API endpoints. In the kitty example, we use an endpoint from a local testnet, and it provides additional types.
Follow the steps in [PolkadotJS metadata setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) to retrieve a node's metadata from its **HTTP** endpoint.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```

or from its **websocket** endpoint with help from [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Next, copy and paste the output to a JSON file. In our [kitty example](https://github.com/subquery/tutorials-kitty-chain), we have created `api-interface/kitty.json`.

**Type definitions**

We assume that the user knows the specific types and RPC support from the chain, and it is defined in the [Manifest](../manifest/polkadot.md#custom-chains).

Following [types setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), we create :

- `src/api-interfaces/definitions.ts` - this exports all the sub-folder definitions

```ts
export { default as kitties } from "./kitties/definitions";
```

- `src/api-interfaces/kitties/definitions.ts` - type definitions for the kitties module

```ts
export default {
  // custom types
  types: {
    Address: "AccountId",
    LookupSource: "AccountId",
    KittyIndex: "u32",
    Kitty: "[u8; 16]",
  },
  // custom rpc : api.rpc.kitties.getKittyPrice
  rpc: {
    getKittyPrice: {
      description: "Get Kitty price",
      params: [
        {
          name: "at",
          type: "BlockHash",
          isHistoric: true,
          isOptional: false,
        },
        {
          name: "kittyIndex",
          type: "KittyIndex",
          isOptional: false,
        },
      ],
      type: "Balance",
    },
  },
};
```

**Packages**

- In the `package.json` file, make sure to add `@polkadot/typegen` as a development dependency and `@polkadot/api` as a regular dependency (ideally the same version). We also need `ts-node` as a development dependency to help us run the scripts.
- We add scripts to run both types; `generate:defs` and metadata `generate:meta` generators (in that order, so metadata can use the types).

Here is a simplified version of `package.json`. Make sure in the **scripts** section the package name is correct and the directories are valid.

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input ./src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint ./src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9.2"
  },
  "devDependencies": {
    "typescript": "^4.1.3",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

#### Type generation

Now that preparation is completed, we are ready to generate types and metadata. Run the commands below:

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

In each modules folder (eg `/kitties`), there should now be a generated `types.ts` that defines all interfaces from this modules' definitions, also a file `index.ts` that exports them all.

```shell
# Generate metadata
yarn generate:meta
```

This command will generate the metadata and a new api-augment for the APIs. As we don't want to use the built-in API, we will need to replace them by adding an explicit override in our `tsconfig.json`.
After the updates, the paths in the config will look like this (without the comments):

```json
{
  "compilerOptions": {
    // this is the package name we use (in the interface imports, --package for generators) */
    "kitty-birthinfo/*": ["src/*"],
    // here we replace the @polkadot/api augmentation with our own, generated from chain
    "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
    // replace the augmented types with our own, as generated from definitions
    "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
  }
}
```

#### Usage

Now in the mapping function, we can show how the metadata and types actually decorate the API. The RPC endpoint will support the modules and methods we declared above.
And to use custom rpc call, please see section [Custom chain rpc calls](#custom-chain-rpc-calls)

```ts
export async function kittyApiHandler(): Promise<void> {
  //return the KittyIndex type
  const nextKittyId = await api.query.kitties.nextKittyId();
  // return the Kitty type, input parameters types are AccountId and KittyIndex
  const allKitties = await api.query.kitties.kitties("xxxxxxxxx", 123);
  logger.info(`Next kitty id ${nextKittyId}`);
  //Custom rpc, set undefined to blockhash
  const kittyPrice = await api.rpc.kitties.getKittyPrice(
    undefined,
    nextKittyId,
  );
}
```

**If you wish to publish this project to our explorer, please include the generated files in `src/api-interfaces`.**

#### Custom Chain RPC calls

To support customised chain RPC calls, we must manually inject RPC definitions for `typesBundle`, allowing per-spec configuration.
You can define the `typesBundle` in the `project.yml`. And please remember only `isHistoric` type of calls are supported.

```ts
...
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]",
  }
  typesBundle: {
    spec: {
      chainname: {
        rpc: {
          kitties: {
            getKittyPrice:{
                description: string,
                params: [
                  {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                  },
                  {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                  }
                ],
                type: "Balance",
            }
          }
        }
      }
    }
  }
```
