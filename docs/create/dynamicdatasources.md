# Dynamic Data Sources

There are cases where you don't know all the parameters for a data source when a project is started. An example of this is a contract factory that will create new contract instances at a later date. It's impossible to know what the contract addresses will be for this ahead of time. This is where being able to create new data sources dynamically comes in.

## The `templates` field

In order to use dynamic data sources you need to have spec version of at least `0.2.1`. If you are on `0.2.0` all you need to do is change the specVersion. If you are on a lower version then you should update to `0.2.0` first with `subql migrate`.

Spec version `0.2.1` introduces a new `templates` field. Templates are the same as data sources with a couple of differences.

* They need a `name` in order to identify the template
* `startBlock` is no longer necessary. This will be set to the block the data source is created
* In the case of a custom data source the `processor.options` field can also be partially filled out, the rest of the options will be provided when the data source is instanced.

## Example Project

The best way to show how to use dynamic data source is with an example.

The below example is for a decentralised exchange that has a factory contract which deploys a new contract when a trading pair is added. When the project is run it's not possible to know the addresses of all trading pair contract that have been created or will be created. Data sources can be dynamically created by a mapping handler from a template in order to index the newly created trading pair contracts.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// This function is defined using `subql codegen` cli command
import { createTradingPairDatasource } from '../types';

function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Seeing a projects Dynamic Data Sources

Dynamic data sources are stored in the projects metadata. If you need to see what details you can query them like below:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Result
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

