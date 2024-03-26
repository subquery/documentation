# RPC Methods

These RPC methods are an extension to the existing [Ethereum JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc). They can be enabled in SubQuery Data Nodes by following [these instructions.](./run.md).

They have been designed in a way that they could be implemented into other blockchains that are not EVM related.

## Get Filter Blocks Capability

`subql_filterBlocksCapabilities` - Returns information about the capabilities of filtering blocks

### Parameters

- None

### Returns

- The `supportedResponses` determines the behaviour of field selectors.
- If `complete` is supported then it is possible to get all fields on transactions and logs.
- If `basic` is the only option then only header information is selectable.

::: details Response format

```ts
type Capability = {
  availableBlocks: [startHeight: number, endHeight: number];
  // Describes what is available to be filtered
  filters: Record<
    string, // Entity name
    string[]
  >;
  // Describes the possible response data fields that can be returned. These are defined by us. e.g 'basic', 'complete', 'trace'
  supportedResponses: ('basic', 'complete')[];
  genesisHash: string; // The chains first block hash, used to identify the network
  chainId: string; // The identifier of the network, with ethereum this is a decimal string
}
```

:::

### Example

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"subql_filterBlocksCapabilities","params":[],"id":1}'
```

::: details Example response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "availableBlocks": [1000000, 54321000],
    "filters": {
      "transactions": ["to", "from", "data"],
      "logs": ["address", "topics0", "topics1", "topics2", "topics3"]
    },
    "supportedResponses": ["basic", "complete"],
    "genesisHash": "0x05a56E2D52c817161883f50c441c3228CFe54d9f"
  }
}
```

:::

## Get Blocks for Filter Criteria

`subql_filterBlocks` - Return blocks that match the filter

### Parameters

- `blockFilter` - This determines the blocks returned as well as the content within the blocks. TODO define filter matching behaviour including null, \*, case sensitivity etc
- `fieldselector` is optional - Specifies the fields returned in the block response. If this is undefined then just the header will be returned.
  - `true` or `{}` will return minimal fields for an object. e.g `logs: true` would return `logIndex`, `transactionIndex` only so that it could be associated to the relevant transaction
  - There are never nested types. e.g there are no children transactions on logs. This is to remove duplicate data
  - To select the related types, e.g get transactions for matching logs, you can add the relevant type with a true value, e.g. `logs: { transactions: true }`. This will return the minimal transactions unless a transactions field selector is specified

```ts
type Filter = {
  fromBlock: string; // Hex encoded block number
  toBlock: string; // Hex encoded block number
  limit: string; // Hex encoded number

  blockFilter?: Record<
    string, // Entity name. E.g. EvmEvent, Call
    Record<
      string, // Entity field. E.g. address, module, topics0
      any[]
    >[] // AND filtering on logs within the entity filter, meaning that all fields much have a matching condition
  >; // OR filtering on any block amongst all entity filters{

  fieldSelector?: Record<
    string, // The entity name, e.g. 'blockHeader' | 'logs' | 'transactions'
    boolean | FieldSelector // Recursive for nested fields
  >;
};
```

:::

::: warning Important

SubQuery Data Nodes currently only support the following field selectors. The transactions and logs that are returned contain all the fields.

```ts
type FieldSelector = {
  logs: {
    transaction: boolean;
  };
  transactions: {
    log: boolean;
  };
};
```

:::

### Returns

- BLOCK_RESULT - Contains information about the blocks that match the filter as well as the block range searched.
- If a FIELD_SELECTOR is provided then all entities matching the filter will be returned, this includes related entities. e.g If there is a log filter and the selector includes transactions then the transactions for the matching logs will be included.

::: details Response format

```ts
// Use a named tuple here to reduce size of data
type Block = Header & any; The block header and any other fields defined by the FIELD_SELECTOR

type BlockResult = {
  blocks: Block[]; // An array of Blocks, this could be empty
  blockRange: [
    start: number; // The block height the query started at, inclusive
    end: number; // The latest block height possible to query
  ];
  genesisHash: string; // The chains first block hash, used to validate the correct chain
};
```

:::

### Example

Request:

::: details Example request

```bash
curl -X POST --data '{
  "jsonrpc": "2.0",
  "method": "subql_filterBlocks",
  "id": 1,
  "params": [
    {
      "fromBlock": "0x3e579e",
      "toBlock": "0x3e6b26",
      "limit": "0x32",
      "blockFilter": {
        "logs": [
          {
            "address": [
              "0x7b79995e5f793a07bc00c21412e50ecae098e7f9"
            ],
            "topics0": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            ]
          }
        ]
      },
      "fieldSelector": {
        "blockHeader": true,
        "logs": {
          "transaction": true
        },
        "transactions": {
          "log": true
        }
      }
    }
  ]
}'
```

:::

Response:

::: details Example response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blocks": [
      {
        "header": {
          "parentHash": "0x11c2817171c876d28868de8f8538055693122e6cbf0eb1378ff13ccaafd3c356",
          "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "miner": "0xc6e2459991bfe27cca6d86722f35da23a1e4cb97",
          "stateRoot": "0xd49a018501b675262761ecd0a32b803de776ac258285b1e1c25c95b98c297975",
          "transactionsRoot": "0xe27e2e03f45fc28df6c716ec8daf9b3a937aa13e88d60b2d4bb143351556160b",
          "receiptsRoot": "0xec76a35c4622ee6fd7e5346eeeff3dfce9087e3069cc8c8941a53f71782e0fe7",
          "logsBloom": "0x654000202a300480140c0230640291c0900c58100074416400044027490408008082806100d001202010012500c811400002210081420509a604090b01248a20500108114888420120c0101a04688040090a4181100c1c0004412214218024014f200004223a12001a24000400042828462020988220100000221a9051210014e8084800003440082d011040001400203000002408b80300000d4080244000030a0810143000aa42108103002800a00a095080640000142800b010082050501610740076014000412011044910e06294008051033002880d0084c4c0064861000a9814924000011180811128a000800008400010b8942082403086400040200e",
          "difficulty": "0x0",
          "number": "0x3e579e",
          "gasLimit": "0x1c9c380",
          "gasUsed": "0x197ef53",
          "timestamp": "0x64d9bcb0",
          "extraData": "0xd883010b05846765746888676f312e32302e32856c696e7578",
          "mixHash": "0x5cfdab2ced77761b09af9f1d781b3ac9dddb9a3c64c377aa94bfb345188e646a",
          "nonce": "0x0000000000000000",
          "baseFeePerGas": "0xba0b443",
          "withdrawalsRoot": "0x82e90b3f86908b721a8ca13f22444a7c2ff4f6fb44d06935191baa96a4ec60f2",
          "blobGasUsed": null,
          "excessBlobGas": null,
          "parentBeaconBlockRoot": null,
          "hash": "0xdb162a04c4908d3047cc094acbd3d7bc84b8459da75701d7c007d7f99fe284ac"
        },
        "transactions": [
          {
            "blockHash": "0xdb162a04c4908d3047cc094acbd3d7bc84b8459da75701d7c007d7f99fe284ac",
            "blockNumber": "0x3e579e",
            "from": "0xe52e23326668117034a0ec6a288e5bb117b7f2c6",
            "gas": "0x419ce0",
            "gasPrice": "0xbf2229a",
            "hash": "0xc6ec0db9969abd242733e1c08bd3f613e2017c86846d4c47ccec7cc29ec108eb",
            "input": "0x23b872dd000000000000000000000000e52e23326668117034a0ec6a288e5bb117b7f2c60000000000000000000000009791b7a69e5fa8f9fe7f07b4817b815a89abef5c000000000000000000000000000000000000000000000000000775f05a074000",
            "nonce": "0xa9",
            "to": "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
            "transactionIndex": "0x3e579e",
            "value": "0x0",
            "type": "0x0",
            "v": "0x1b",
            "r": "0x8c94f505ec4526e02ff334e30bdbff0d2b0aac3c6faaa3b8f4911c377c54c6f3",
            "s": "0x6a724995f69309acd29b6a0e961567e0615e033bad76c42a57eab4bc60c02046"
          }
          // More transactions that match results
        ],
        "logs": [
          {
            "address": "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x000000000000000000000000e52e23326668117034a0ec6a288e5bb117b7f2c6",
              "0x0000000000000000000000009791b7a69e5fa8f9fe7f07b4817b815a89abef5c"
            ],
            "data": "0x000000000000000000000000000000000000000000000000000775f05a074000",
            "blockNumber": "0x3e579e",
            "transactionHash": "0xc6ec0db9969abd242733e1c08bd3f613e2017c86846d4c47ccec7cc29ec108eb",
            "transactionIndex": "0x51",
            "blockHash": "0xdb162a04c4908d3047cc094acbd3d7bc84b8459da75701d7c007d7f99fe284ac",
            "logIndex": "0x4c",
            "removed": false
          }
          // More logs that match results
        ]
      },
      {
        "header": {
          "parentHash": "0x5cc655b550146a8cef8eb9596e6680adcdb9c4e30590f6a92a9c349a6a58bff9",
          "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "miner": "0xd9a5179f091d85051d3c982785efd1455cec8699",
          "stateRoot": "0xe4c6a31409e9511e35d970437ee6c9a5d92412d37e325b290ad9d137fac6f5df",
          "transactionsRoot": "0x97873682c3863d1eaeb980b419963458f9eab6d515a935a4dfa033bc3c050011",
          "receiptsRoot": "0x0d671c4869f0bfccb9f2f08ab7a4eb80dfc9cfdb0043a7f1617cb3c8f3ea52e1",
          "logsBloom": "0x8118a1011c14004a0304160018028000914a1c50002001b00201108442d6000020305400838148e004028100000a213004040000c66408a080643b08892910452800000048020000281002198269032208020500c00059001000004061a82c00cf0000b222a021085aa400250126081026201a080025018210460231604b801460cc20400034860929100101000004203000000800103222400c00242c561747620db41400a00102008448409041086b00048010800004b01181100104d0084000f2063f0a8c0820400c0070818c240400802800d1000a10008cc4000040218e10112811800100550042240922800a081864040000061006206000404cc030c2",
          "difficulty": "0x0",
          "number": "0x3e57a1",
          "gasLimit": "0x1c9c380",
          "gasUsed": "0x1bba8a4",
          "timestamp": "0x64d9bcd4",
          "extraData": "0xd883010b06846765746888676f312e32302e33856c696e7578",
          "mixHash": "0xb802425181b29d19e616f9e7adf7db7195fb6e82839612defda92f3afa58c9b1",
          "nonce": "0x0000000000000000",
          "baseFeePerGas": "0xb0ff06d",
          "withdrawalsRoot": "0xb7df74ffd00ea205b17b4e96d4b4ed69ff1b9a34a17c23346ff9d926949a2677",
          "blobGasUsed": null,
          "excessBlobGas": null,
          "parentBeaconBlockRoot": null,
          "hash": "0x7ef0308b3dc695e98dbad894d17906306f7ffafb1ddb60c6134c595cf1f037c8"
        },
        "transactions": [
          {
            "blockHash": "0x7ef0308b3dc695e98dbad894d17906306f7ffafb1ddb60c6134c595cf1f037c8",
            "blockNumber": "0x3e57a1",
            "from": "0xe52e23326668117034a0ec6a288e5bb117b7f2c6",
            "gas": "0x419ce0",
            "gasPrice": "0xba0dc0d",
            "hash": "0x1221437d2109bec957622845f4bb953bac4ca20b11c52e9ab8a3280871c5b6f9",
            "input": "0x23b872dd000000000000000000000000e52e23326668117034a0ec6a288e5bb117b7f2c60000000000000000000000009791b7a69e5fa8f9fe7f07b4817b815a89abef5c0000000000000000000000000000000000000000000000000003baf82d03a000",
            "nonce": "0xab",
            "to": "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
            "transactionIndex": "0x3e57a1",
            "value": "0x0",
            "type": "0x0",
            "v": "0x1b",
            "r": "0x2bb1a5cbd04fbc7562e21aa134e415e6f9641fc27fc8973dd8255ff217860451",
            "s": "0x4557fccefcc391812b5a52e9005079d683f1c94829e0a0a2b3c54548e33a4d3b"
          }
        ],
        "logs": [
          {
            "address": "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
            "topics": [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x000000000000000000000000e52e23326668117034a0ec6a288e5bb117b7f2c6",
              "0x0000000000000000000000009791b7a69e5fa8f9fe7f07b4817b815a89abef5c"
            ],
            "data": "0x0000000000000000000000000000000000000000000000000003baf82d03a000",
            "blockNumber": "0x3e57a1",
            "transactionHash": "0x1221437d2109bec957622845f4bb953bac4ca20b11c52e9ab8a3280871c5b6f9",
            "transactionIndex": "0xa8",
            "blockHash": "0x7ef0308b3dc695e98dbad894d17906306f7ffafb1ddb60c6134c595cf1f037c8",
            "logIndex": "0xd7",
            "removed": false
          }
        ]
      }
      // More results
    ],
    "blockRange": ["0x3e579e", "0x4ae000"],
    "genesisHash": "0x25a5cc106eea7138acab33231d7160d69cb777ee0c2c553fcddf5138993e6dd9"
  }
}
```

:::
