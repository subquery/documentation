# NEAR

## Action Handler

You can use action handlers to capture information from each action in a transaction. To achieve this, a defined ActionHandler will be called once for every action. You should use [Mapping Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter actions to reduce the time it takes to index data and improve mapping performance.

```ts
import { NearAction, Transfer } from "@subql/types-near";

export async function handleAction(
  action: NearAction<Transfer>,
): Promise<void> {
  // An Action can belong to either a transaction or a receipt
  // To check which one, we can check if action.transaction is null
  // If it is null, then it belongs to a receipt
  logger.info(
    `Handling action at ${
      action.transaction
        ? action.transaction.block_height
        : action.receipt.block_height
    }`,
  );

  const id = action.transaction
    ? `${action.transaction.block_height}-${action.transaction.result.id}-${action.id}`
    : `${action.receipt.block_height}-${action.receipt.id}-${action.id}`;
  const sender = action.transaction
    ? action.transaction.signer_id
    : action.receipt.predecessor_id;
  const receiver = action.transaction
    ? action.transaction.receiver_id
    : action.receipt.receiver_id;

  const actionRecord = NearActionEntity.create({
    id: id,
    sender: sender,
    receiver: receiver,
    amount: BigInt((action.action as Transfer).deposit.toString()),
    payloadString: JSON.stringify(action.action.args.toJson()),
  });

  await actionRecord.save();
}
```

`NearAction` encapsulates the `action` object containing the action data and the `NearTransaction` or `NearReceipt` in which the action occured in. The payload of the action is stored on the `args`. In many cases, `args` are base64 encoded and JSON formatted, in this case you can use `action.action.args.toJson();` to decode the arguments.

## RPC Calls

We also support some [API RPC methods here](https://github.com/subquery/subql-near/blob/main/packages/types/src/global.ts) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [NEAR `JsonRpcProvider`](https://docs.near.org/tools/near-api-js/reference/classes/providers_json_rpc_provider.JsonRpcProvider.html) provide some methods to interact with the NEAR RPC API.
