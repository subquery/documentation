# In-Memory Cache Feature
## Overview
The in-memory cache feature provides a memory location for temporary storage of data, which can be accessed and manipulated inside Subquery projects. This feature is helpful in scenarios where data persistence is not necessary, and data is required to be accessed inside projects across subquent calls of handlers.

This cache is globally accessible and is introduced alongside logger, store, safe API etc.

## In-Memory Cache Set and Get Methods
The cache provides two primary methods for interacting with the cache: set and get. These methods allow you to store data in the cache and retrieve it, respectively.

Here's a more detailed look at each method:
### The `get` Method

The get method retrieves the value associated with a specified key from the cache. This method is asynchronous and returns a Promise that resolves to the value associated with the key. If the key does not exist in the cache, the Promise resolves to undefined.

The get method takes one parameter:
- `key`: The key associated with the value you want to retrieve. The key must be a string.

### The `set` Method
The set method stores a value in the cache associated with a specified key. This method is asynchronous that resolves once the value is stored to the cache.

The set method takes two parameters:

- `key`: The key with which the value will be associated. The key must be a string.
- `value`: The value to be stored in the cache.

## Example Usage
Below mentioned is an example of how the cache can be used:

```ts
export async function handleEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.block.block.header.number.toString()}`
  );

  let numEvents =( await cache.get(event.block.block.header.number.toString()))  ?? 0;
  await cache.set(event.block.block.header.number.toString(), ++numEvents);

  logger.info(`${event.block.block.header.number.toString()}: ${await cache.get(event.block.block.header.number.toString())}`)
}
```

In this example, the number of events for a specific block is stored in the cache. Each time a new event for the block is found, the number of events is incremented. The final number of events for the block is then logged.
