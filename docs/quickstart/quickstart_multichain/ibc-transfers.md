# Multichain Quick Start - IBC Transfers

<!-- @include: ../snippets/final-code.md#start -->

[IBC Starter Example](https://github.com/subquery/cosmos-subql-starter/tree/main/Multi-Chain/osmosis-cosmos-bridge)

<!-- @include: ../snippets/final-code.md#end -->

This tutorial provides a comprehensive guide on establishing a multi-chain indexer for indexing Inter-Blockchain Communication (IBC) activities among Cosmos Zones. The tutorial demonstrates the integration of bi-directional transfers between Osmosis and Cosmos Hub, while also highlighting the flexibility to effortlessly include additional chains.

Upon completing this guide, you will gain insights into effectively correlating event data across multiple networks. Furthermore, you'll acquire the knowledge to configure a SubQuery indexer, enabling the monitoring, tracking, and aggregation of events from various Cosmos blockchains within a unified entity.

<!-- @include: ./snippets/multi-chain-cosmos-quickstart-reference.md -->

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

<!-- @include: ./snippets/multi-chain-cosmos-manifest-intro.md -->

Beginning with Osmosis, the manifest file for this will be as follows:

::: code-tabs

@tab `osmosis.yaml`

```yaml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 12427162
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleOsmosisReceiveEvent
          kind: cosmos/EventHandler
          filter:
            type: recv_packet
            messageFilter:
              type: /ibc.core.channel.v1.MsgRecvPacket
        - handler: handleOsmosisSendEvent
          kind: cosmos/EventHandler
          filter:
            type: send_packet
            messageFilter:
              type: /ibc.applications.transfer.v1.MsgTransfer
```

:::

As evident, we are in search of two types of events – namely, `send_packet` and `recv_packet` – representing outgoing and incoming transfers, respectively. The information from these logs will subsequently undergo comparison with the data emitted on the opposite end of the transfer.

<!-- @include: ./snippets/multi-chain-creation.md -->

::: code-tabs

@tab `subquery-multichain.yaml`

```yaml
specVersion: 1.0.0
query:
  name: "@subql/query"
  version: "*"
projects:
  - osmosis.yaml
  - cosmoshub.yaml
```

:::

Now, we have to indicate that we want to handle the same data from Cosmos Hub, which data will be matched with Osmosis's smart contract data. The manifest file for Cosmos Hub will have the following look:

::: code-tabs

@tab `cosmoshub.yaml`

```yaml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 17934016
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleCosmosHubSendEvent
          kind: cosmos/EventHandler
          filter:
            type: send_packet
            messageFilter:
              type: /ibc.applications.transfer.v1.MsgTransfer
        - handler: handleCosmosHubReceiveEvent
          kind: cosmos/EventHandler
          filter:
            type: recv_packet
            messageFilter:
              type: /ibc.core.channel.v1.MsgRecvPacket
```

:::

Here, again we are relying to the data of the same events. Events of both chanins will be processed asynchronously, without a specific order, and will be matched according to their data.

<!-- @include: ../snippets/schema-intro.md -->

```graphql
type BridgeEvent @entity {
  id: ID!
  sender: User!
  receiver: User!
  sourceChain: String
  sourceChainTransaction: String
  destinationChain: String
  destinationChainTransaction: String
  amount: BigInt
}

type User @entity {
  id: ID! # Wallet Address
}
```

The primary event is the `BridgeEvent`, which contains information about the execution of the transfer on both sides. It will be completely populated only upon successful indexing on both ends. Further details about the logic will be discussed later.

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/cosmos-mapping-intro.md -->

::: code-tabs
@tab:active `mappingHandlers.ts`

```ts
import { CosmosEvent } from "@subql/types-cosmos";
import { User, BridgeEvent } from "../types";

interface EssentialValues {
  sender?: string;
  amount?: number;
  receiver?: string;
  sequence?: string;
}

async function checkGetUser(user: string): Promise<User> {
  let userRecord = await User.get(user.toLowerCase());
  if (!userRecord) {
    userRecord = User.create({
      id: user.toLowerCase(),
    });
    await userRecord.save();
  }
  return userRecord;
}

async function getEssensialValues(
  event: CosmosEvent
): Promise<EssentialValues> {
  let sender;
  let amount;
  let receiver;
  let sequence;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "packet_data":
        sender = JSON.parse(attr.value)["sender"];
        receiver = JSON.parse(attr.value)["receiver"];
        amount = JSON.parse(attr.value)["amount"];
        break;
      case "packet_sequence":
        sequence = attr.value;
        break;
      default:
        break;
    }
  }
  return { sender, amount, receiver, sequence };
}

async function populateValuesFromSource(
  sender: string,
  amount: string,
  receiver: string,
  sequence: string,
  event: CosmosEvent
) {
  let bridgeTransactionRecord = await BridgeEvent.get(sequence);
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = BridgeEvent.create({
      id: sequence,
      senderId: (await checkGetUser(sender)).id,
      receiverId: (await checkGetUser(receiver)).id,
      sourceChain: event.block.header.chainId,
      sourceChainTransaction: event.tx.hash.toString(),
      amount: BigInt(amount),
    });
  } else {
    bridgeTransactionRecord.sourceChain = event.block.header.chainId;
    bridgeTransactionRecord.sourceChainTransaction = event.tx.hash.toString();
  }
  await bridgeTransactionRecord.save();
}

async function populateValuesFromDestination(
  sender: string,
  amount: string,
  receiver: string,
  sequence: string,
  event: CosmosEvent
) {
  let bridgeTransactionRecord = await BridgeEvent.get(sequence);
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = BridgeEvent.create({
      id: sequence,
      senderId: (await checkGetUser(sender)).id,
      receiverId: (await checkGetUser(receiver)).id,
      destinationChain: event.block.header.chainId,
      destinationChainTransaction: event.tx.hash.toString(),
      amount: BigInt(amount),
    });
  } else {
    bridgeTransactionRecord.destinationChain = event.block.header.chainId;
    bridgeTransactionRecord.destinationChainTransaction =
      event.tx.hash.toString();
  }
  await bridgeTransactionRecord.save();
}

export async function handleOsmosisReceiveEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an incoming transfer event on Osmosis from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );
  logger.info(sender);
  logger.info(sequence);
  logger.info(receiver);
  logger.info(amount);
  if (sequence && sender && receiver && amount) {
    populateValuesFromDestination(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleCosmosHubReceiveEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an incoming transfer event on Cosmos Hub from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );
  if (sequence && sender && receiver && amount) {
    populateValuesFromDestination(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleCosmosHubSendEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an outgoing transfer event on Cosmos Hub from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );

  if (sequence && sender && receiver && amount) {
    populateValuesFromSource(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleOsmosisSendEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an outgoing transfer event on Osmosis from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );

  if (sequence && sender && receiver && amount) {
    populateValuesFromSource(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}
```

:::

This mapping file is designed to handle events related to IBC transfers. The code imports necessary types and includes custom types, such as `User` and `BridgeEvent`. An `EssentialValues` interface is defined to represent crucial attributes like sender, amount, receiver, and sequence.

The script includes several event-handling functions, namely `handleOsmosisReceiveEvent`, `handleCosmosHubReceiveEvent`, `handleCosmosHubSendEvent`, and `handleOsmosisSendEvent`. These functions log information about incoming or outgoing transfer events and then call the appropriate functions to populate or update values in the `BridgeEvent` entity.

The code has the utility functions like `checkGetUser`, which asynchronously checks if a user exists in the database. If not, it creates a new user record. Following this, the `getEssentialValues` function extracts essential values (sender, amount, receiver, sequence) from a Cosmos event's attributes.

Two functions, namely `populateValuesFromSource` and `populateValuesFromDestination`, asynchronously populate or update values in the `BridgeEvent` entity based on whether it's the source or destination chain. In this example, we utilise the `sequence` value to correlate transfers across diverse networks.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Multi-Chain/osmosis-cosmos-bridge).
:::

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

#### Request

```graphql
query {
  bridgeEvents {
    nodes {
      id
      senderId
      receiverId
      sourceChain
      sourceChainTransaction
      destinationChain
      destinationChainTransaction
      amount
    }
  }
}
```

#### Response

```json
{
  "data": {
    "bridgeEvents": {
      "nodes": [
        {
          "id": "2443408",
          "senderId": "cosmos1nlj3wgunmjehnpue8a98wsflnx26tfhxmhfzhc",
          "receiverId": "osmo1ln7rurzjr4x5403qhpyuma0x53dgkzkk0vewf3xr7rc24s57yzvshuqzdv",
          "sourceChain": "cosmoshub-4",
          "sourceChainTransaction": "3002CF4484AB82F8F995CC54FDD5B359327F89D861A0F9A7EF17475554A4BC8B",
          "destinationChain": "osmosis-1",
          "destinationChainTransaction": "9B98ED344801C4EB22047E455F36435FC008192985151B7DA70EA67246E1AD04",
          "amount": "3000000"
        }
      ]
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
