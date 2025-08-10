# In-Memory Cache

The in-memory cache is an injected class granting access to a temporary store of data that can be accessed and shared between mapping handlers. This feature is helpful for commonly accessed data in scenarios where data persistence is not necessary, but the data is required to be accessed inside projects across subsequent calls of handlers.

This cache is globally accessible and is introduced alongside `logger` and `store` etc.

The cache provides two primary methods for interacting with the cache: `set()` and `get()`. These methods allow you to store data in the cache and retrieve it, respectively.

::: warning Important
The cache isn't aware of reindexing because of block forks when indexing unfinalized blocks. Make sure the data you store in the cache takes this into consideration.
:::

Following is a summary of the `Store` interface:

```ts
export interface Cache {
  get(key: string): Promise<any | undefined>;

  set(key: string, value: any): Promise<any>;
}
```

## The `set()` Method

The `set(key: string, value: any): Promise<any>` method stores a value in the cache associated with a specified key. This method is asynchronous that resolves once the value is successfully stored in the cache.

```ts
// set(key: string, value: any): Promise<any>
await cache.set('currentDate': '2023-10-23');
```

## The `get()` Method

The `get(key: string): Promise<string | undefined>` method retrieves the value associated with a specified key from the cache. This method is asynchronous and returns a Promise that resolves to the value associated with the key. If the key does not exist in the cache, the Promise resolves to `undefined`.

```ts
// get(key: string): Promise<string | undefined>
const currentDate: any | undefined = await cache.get("currentDate");
```

## Example Usage

Below is an example of how the cache can be used within your mapping functions:

```ts
export async function handleEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.block.block.header.number.toString()}`,
  );

  let dailyCount = (await cache.get("dailyCount")) + 1 ?? 1;
  await cache.set("dailyCount", dailyCount);
}
```

In this example, the count of events in the given day is stored in the cache as `dailyCount`. Each time a new event for the day is found, the number of events is incremented - we cau use this elsewhere, e.g. for daily aggregations in the mapping function.
