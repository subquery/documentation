# Introduction

SubQuery is deterministic by design, that means that each SubQuery project is guaranteed to index the same data set. This is a critical factor that is makes it possible to verify data in the decentralised SubQuery Network. This limitation means that in default configuration, the indexer is by default run in a strict virtual machine.

By default (when in safe mode), the [VM2](https://www.npmjs.com/package/vm2) sandbox only allows the following:

- only some certain nodejs built-in modules, e.g. `assert`, `buffer`, `crypto`, `util`, `path`, `url` and `stream`
- third-party libraries written by _CommonJS_.
- external `HTTP` and `WebSocket` connections are forbidden

## Global Variables

In order to make indexing easier SubQuery provides some global variables for convenience. With typescript your editor should be aware of these variables and building should result in errors if the types are incorrect.

### `chainId`

If your project is deployed on multiple networks and you have a need for chain specific code or behaviour then you can access this to get the chainId that the handler is running for/

```ts
logger.info(`The chain id is ${chainId}`);
````

### `api`

This is an instance of the networks API that is connected to the provided network endpoints.
This is only available if the network supports an API that is scoped to the current indexed block height. i.e querying state will return the state at the current block height.


### `unsafeApi`

This is the same as the `api` described above but not scoped to the current block being processed. This is available with all chains.

### `store`

The data store, for more details please read the [store](./store.md) documentation. For most use cases this will not be needed and you should use the generated entities instead.

### `cache`

If you wish to store in memory variables outside of your handler the cache should be used instead. This is to ensure that data is shared between instances of the sandbox when workers are used. For more details read the [In-Memory Cache](./cache.md) documentation.

### `logger`

From within the sandbox `console` doesn't work and you will not see any output from this. Instead we inject a logger as an alternative. This logger is based on Pino and each of the logger methods take a single argument.

```ts
logger.info('Hello world');
```

### `registry` (Cosmos only)

This is an instance of `@cosmjs/proto-signing`'s `Registry` class, which allows you to encode and decode protobuf messages. This is only available for Cosmos projects.

### `decoder` (Solana only)

This is object provides utilities for decoding data for instructions and logs using the provided IDLs for the project.

## Third Party Libraries

SubQuery allows importing third party libraries but there are some caveats and things to be aware of.

* Only _CommonJS_ is supported, not _ESM_ modules. For some libraries this might mean using older versions of the package.
  - For example, `node-fetch` is only available as a CommonJS module up to version 2.6.7.

* Rather than importing the whole module, we recommend only importing the required method(s) that you need and narrowing your imports as much as possible. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; // Good way
import { utils } from "ethers"; // Bad way
```

## Unsafe

**You can easily bypass this limitation however, allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects.** In order to do to, you must run your project in `unsafe` mode, you can read more about this in the [references](../../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-ethereum:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

When run in `unsafe` mode, you can import any custom libraries into your project and make external API calls using tools like node-fetch. A simple example is given below:

```ts
import { EthereumTransaction } from "@subql/types-ethereum";
import fetch from "node-fetch";

export async function handleTransaction(
  tx: EthereumTransaction,
): Promise<void> {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
  // Do something with this data
}
```


## Other differences and incompatibilities

* `TextEncoder` and `TextDecoder` are not available by default. If your handlers or a dependency need these they can be polyfilled like so:
```ts
// Add `text-encoding` as a dependency and include this code in index.ts before any other imports
import { TextDecoder, TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```
