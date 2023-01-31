# Lesson 3: How to Index a Substrate Event

This lesson explains how to index Substrate native events alongside Moonbeam data. 
We will alter the code by adding a `collatorJoined event` and updating `schema.graphql`,
`project.yaml` and `mappingHandlers.ts` accordingly.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/s-1_fOxYTy0" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Changing the Project

::: tip Note
In this lesson we will alter the code. 
::: 

### Manifest

//TODO

Add new data source on the bottom of `project.yaml` file:

```yaml
  - kind: substrate/Runtime
    startBlock: 69218
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: collatorJoined
          kind: substrate/EventHandler
          filter:
            module: parachainStaking
            method: JoinedCollatorCandidates
```

Your Manifest file should look like this: 

```yaml
specVersion: 1.0.0
name: moonbeam-evm-starter
version: 0.0.1
runner:
  node:
    name: '@subql/node'
    version: '>=0.35.0'
  query:
    name: '@subql/query'
    version: '>=0.16.0'
description: Moonbeam / SubQuery Course — Building dApps with the help of SubQuery
repository: 'https://github.com/subquery/tutorials-frontier-evm-starter'
schema:
  file: ./schema.graphql
network:
  chainId: '0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b'
  endpoint: 'wss://moonriver.api.onfinality.io/public-ws'
  dictionary: 'https://api.subquery.network/sq/subquery/moonriver-dictionary'
  chaintypes:
    file: ./dist/chaintypes.js
dataSources:
  - kind: substrate/FrontierEvm
    startBlock: 424026
    processor:
      file: ./node_modules/@subql/frontier-evm-processor/dist/bundle.js
      options:
        abi: erc20
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: ./erc20.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleFrontierEvmEvent
          kind: substrate/FrontierEvmEvent
          filter:
            topics:
              - 'Transfer(address indexed from,address indexed to,uint256 value)'
              - null
              - null
              - null
        - handler: handleFrontierEvmCall
          kind: substrate/FrontierEvmCall
          filter:
            function: 'approve(address to,uint256 value)'
  - kind: substrate/Runtime
    startBlock: 69218
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: collatorJoined
          kind: substrate/EventHandler
          filter:
            module: parachainStaking
            method: JoinedCollatorCandidates
```

### Schema GraphQl

//TODO

Add new entity to your `schema.graphql`:

```graphql
type Collator @entity {
  id: ID! # Collator address
  joinedDate: Date!
}
```

Your file should look like this: 

```graphql
type Transaction @entity {
  id: ID! # Transaction hash
  value: BigInt!
  to: String!
  from: String!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  value: BigInt!
  owner: String!
  spender: String!
  contractAddress: String!
}

type Collator @entity {
  id: ID! # Collator address
  joinedDate: Date!
}
```

### Mappings functions

//TODO
Add `collatorJoined()` function to `mappingsHanderls.ts` file: 

```ts
// Create Collator
export async function collatorJoined(
  event: SubstrateEvent): Promise<void> {

  const address = event.extrinsic.extrinsic.signer.toString();
  const collator = Collator.create({
      id: address,
      joinedDate: event.block.timestamp
  });

  await collator.save();
}
```

Your file should look like this: 

```ts
import { Approval, Collator, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";
import {SubstrateEvent} from "@subql/types";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

// Create Transaction 
export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.from = event.args.from;
  transaction.to = event.args.to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

// Create Approval
export async function handleFrontierEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}

// Create Collator
export async function collatorJoined(
  event: SubstrateEvent): Promise<void> {

  const address = event.extrinsic.extrinsic.signer.toString();
  const collator = Collator.create({
      id: address,
      joinedDate: event.block.timestamp
  });

  await collator.save();
}
```

## Query

Open your browser and head to `http://localhost:3000`. Use GraphQL playground to query your data.
Expand previous query by adding `collators` on the bottom: 

```graphql
query {
    approvals (first: 5) {
        nodes {
            id
            value
            owner
            spender
        }
    }
    transactions (first: 5) {
        nodes {
            id
            value
            to: id
            from: id
        }
    }
    collators (last: 5) {
        nodes {
            id
            joinedDate
            leaveDate
        }
    }

}
```
 
## Useful resources

- [SubQuery Project Explorer](https://explorer.subquery.network/)
- [Website](https://subquery.network/)
- [Discord](https://discord.com/invite/subquery)
- [Quick Start Guide](../../quickstart/quickstart.md)
- [YouTube Channel](https://www.youtube.com/c/SubQueryNetwork)
- [Polkadot Explorer](https://polkadot.js.org/apps/#/explorer)

::: tip Note
The project's **code state after this lesson** is [here](https://github.com/deverka/moonbeam_subquery_tutorial//tree/lesson-3).
The final code of this project can be found [here](https://github.com/deverka/moonbeam_subquery_tutorial).
:::