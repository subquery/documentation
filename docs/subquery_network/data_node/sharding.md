# Sharding

Sharding allows you to take a subset of the chain, this reduces storage requirements to run a node an serve data on the SubQuery network.

::: info

It is recommended to confirgure the shard range using CLI flags or Config as adjusting the range can take some time to remove data and the RPC methods can time out.

:::

## Set Head

### Behaviour
The head of the shard can be set to any height that is greater than the tail height.

If it is set to a height before the current chain height, the node will sync up to that height.
If the head is set to a hight to number greater than the latest height it will sync until the chain reaches that height.
The height can be unset with null or 0, this will start syncing to the latest height.

### Config

On startup you can set the config via `-shardend=<block-number>`

Or via the admin RPC:
```json
{
    "jsonrpc": "2.0",
    "method": "admin_setShardEndHeight",
    "params": [<block-number>],
    "id": 0
},
```

This will return `true` if successful otherwise an error.

### Example

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_setShardEndHeight","params":[20000],"id":1}'
```

::: details Example response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```
:::

## Set Tail

### Behaviour

The tail of the shard can be set to any height that is greater than the current tail and less than the head.
It cannot be set to a future block and must first be synced.

### Config

On startup you can set the config via `-shardstart=<block-number>`.

Or via the admin RPC:
```json
{
    "jsonrpc": "2.0",
    "method": "admin_setShardStartHeight",
    "params": [<block-number>],
    "id": 0
},
```

This will return `true` if successful otherwise an error.

### Example

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_setShardStartHeight","params":[20000],"id":1}'
```

::: details Example response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```
:::

## Config

To get the curent shard config you can use the following admin RPC:
```json
{
    "jsonrpc": "2.0",
    "method": "admin_getDesiredShardConfig",
    "params": [],
    "id": 0
},
```

This will return a json object with the current config
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "desiredChainDataStart": 20,
        "desiredChainDataEnd": 90
    }
}
```

## State

Setting the tail doesn't modify the chain state, this needs to be done manually. To do this please follow the [go ethereum docs](https://geth.ethereum.org/docs/fundamentals/pruning) on sharding.

::: warning

Pruning the state requires access to the state root for a block, if the block has been removed from the chain then the state root will need to be sourced from elsewhere
:::


## Other information

* The genesis block is never removed, it is needed to ensure the node runs
* Subquery data node methods will be limited to the range of the tail and head
