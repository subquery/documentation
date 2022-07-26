# Module 6: Tips & Tricks

## Introduction

In these exercises, we will learn what SubQuery Project is, how to deploy a project to [SubQuery Project](https://project.subquery.network/), and find out about [SubQuery Explorer](https://explorer.subquery.network/).

## Pre-Requisites

None.

## Block v Events v Calls

To process a SubQuery project and index data as fast and as efficient as possible, it is necessary to understand how things work under the covers. 

SubQuery has three handlers to process blockchain data: [block handlers](../../build/mapping.md#block-handler), [event handlers](../../build/mapping.md#event-handler), and [call handlers](../../build/mapping.md#call-handler).

**Block handlers** are very inefficient. They inspect every single block to grab data to index. In a case with over seven million blocks, if each block could be indexed in 10ms, this would take over eight (8) days to fully index the blockchain. Therefore, it is
advisable to avoid using block handlers if possible.

**Event and call handlers** are the recommended handlers to use, in conjunction with mapping filters of course, as their performance is much better. The mapping filter allows the project to index only the blocks that satisfy the filter criteria. 

For example, given below is a filter indexing the **staking** module and the **Rewarded** method.

```shell
- handler: myCustomHandle
    kind: substrate/EventHandler
    filter:
       module: staking
       method: Rewarded
```

::: info Note
For even more performance gains, using a dictionary is also highly recommended.
:::


## Using a Dictionary

The concept of **dictionary** was introduced in previous modules (For e.g. [Module 5 - Overriding Endpoints](../herocourse/module5.md#step-3-override-endpoints)). 

Due to its importance, we will have an in-depth understanding again. See [Understanding how a dictionary works](../tutorials_examples/dictionary.md)

## Event & Extrinsic Names

A popular question while creating SubQuery projects is - how do you know what data you can extract from the Polkadot blockchain? 

There are several resource options:

1. [Polkadot documentation](module6.md#polkadot-documentation).
2. [Polkadot blockchain explorer](module6.md#polkadot-explorer).
3. [Interacting with the Polkadot API directly](module6.md#the-polkadot-cli-api).

Note: These options may also apply to other blockchains.

### Polkadot Documentation

The Polkadot documentation can be found at: [https://polkadot.js.org/docs/](https://polkadot.js.org/docs/).

- Events: [https://polkadot.js.org/docs/substrate/events/](https://polkadot.js.org/docs/substrate/events/)
- Extrinsics: [https://polkadot.js.org/docs/substrate/extrinsics/](https://polkadot.js.org/docs/substrate/extrinsics/)

### Polkadot Explorer

The Polkadot blockchain explorer is also a great place to become familiar with what information is available to be extracted. There are several options to choose from:

- [https://polkadot.js.org/apps/#/explorer](https://polkadot.js.org/apps/#/explorer)
- [https://polkadot.subscan.io/](https://polkadot.subscan.io/)
- [https://polkascan.io/polkadot](https://polkascan.io/polkadot)
- [https://dotscanner.com/polkadot/search](https://dotscanner.com/polkadot/search)
- [https://polkastats.io/](https://polkastats.io/)

Note that not all explorers are equal. Some may be easier to use and some may represent the data you need in a clearer manner. You’ll end up with a few favourites over time.

### The Polkadot CLI API

The previous two methods of knowing what blockchain data is available, along with the **type** (which is just as important), are great. However, learning to connect directly to the **Polkadot API via command line** provides several advantages.

To begin with, it provides access to the most up to date API specifications because the [documentation](https://polkadot.js.org/docs/substrate/events/) could be slightly outdated. 

Furthermore, it allows developers to understand the exact arguments and their types. This is essential when there are issues and debugging is required. And finally, it is very useful when integrating with custom chains where sometimes documentation is not available.

#### Connecting to the API

To connect to the API, run the following command:

```shell
npm install --save @polkadot/api
```

```shell
node --experimental-repl-await
const { ApiPromise, WsProvider } = require(`@polkadot/api`)
const provider = new
WsProvider(`wss://polkadot.api.onfinality.io/public-ws`);
```

If custom `chainTypes` are required:

```shell
const types={}
```

If types are needed:

```shell
api = await ApiPromise.create({ provider, types});
```

Without types:

```shell
api = await ApiPromise.create({ provider });
```

#### Fetching a Block

To get block hash at the height `h`, run: 

**const blockHash = await api.rpc.chain.getBlockHash(h)**

```shell
const blockHash = await api.rpc.chain.getBlockHash(1234567)
```

- Then:

```shell
const block = await api.rpc.chain.getBlock(blockHash)
```

#### Getting Extrinsics Within a Block

To get all extrinsics:

```shell
const extrinsics = block.block.extrinsics;
```

For a particular extrinsic: (Change the 1 to a desired extrinsic number)

```shell
const myExtrinsic = extrinsic[1];
```

To check the args (input for transaction) types, enter:

```shell
myExtrinsic.meta.args
```

You should see a Vec/array. The size of the array means how many arg this extrinsics takes, and each arg metadata info should include 'name', 'type', 'typeName'. 

We are looking for the `type`. For eg: 'MultiAddress' is the type interface from **Polkadot/api**.

#### Getting Events at a Certain Block Height

Events cannot be extracted from a block, but they can be queried. Since we already have the `blockHash `(from above), we can **‘lock’** the current API to this particular block height. 

- Start with:

```shell
const apiAt = await api.at(blockHash)
```

Then:

```shell
const events = await apiAt.query.system.events();
```

- Next, specify the specific event of interest. Eg for event number 4:

```shell
const myEvent = events[4];
```

Finally, enter:

```shell
myEvent.event.meta.toJSON()
```

- And you should see something like this:

```shell
> myEvent.event.meta.toJSON()
{
    name: 'Withdraw',
    fields: [
            { name: null, type: 0 , typeName: 'T::AccountId', docs: [] },
            { name: null, type: 6 , typeName: 'T::Balance', docs: [] }
        ],
    index: 8 ,
    docs: [
        'Some amount was withdrawn from the account (e.g. for transaction fees). \\[who, value\\]'
        ],
    args: [
        'AccountId32', 'u128'
        ]
}
```

## Type Safe Properties

"Type safe" usually refers to languages which ensure that an operation is working on the right kind of data, at some point, before the operation is actually performed. This may be at compile time or at run time.

In Polkadot, [everything has a type](https://polkadot.js.org/docs/api/start/types.basics/#everything-is-a-type). It means that any variable created needs to have a type cast. For example:

```shell
record.blockNumber = event.block.block.header.number.toBigInt();
record.amount = (numberYes as Int).toNumber();
record.bigAmount = (data as Balance).toBigInt();
record.bool = (data as bool).valueOf();
```

## Logging

To log data to the CLI from within the mappings functions, when a subql node is running, the `logger.info` command can be used:

```shell
logger.info("Blockheight: " + event.block.block.header.number.toNumber());
```

When running a subql node locally via a command line, a log level can also be added to help troubleshoot. See [Subql CLI logging reference](../../run_publish/references.md#log-level).

## Debugging

In order to debug SubQuery projects such as stepping through code, setting breakpoints, and inspecting variables, you will have to use a Node.js inspector in conjunction with Chrome developer tools. See [How to debug a SubQuery project?](../tutorials_examples/debug-projects.md)

To debug a local subql node, the --debug flag can also be used from the command line.

```shell
> subql-node -f . --debug
```

See [Subql CLI debug reference](/run_publish/references.md#debug).

## Changing the Batch Block Size

Using a smaller batch size can reduce memory usage and not leave users hanging for large queries. In other words, your application can be more responsive. See [How to change the batch block size](../tutorials_examples/batch-size.md).

## Changing the Starting Block

Note that some events only start to occur at higher block height. Hence, one way to test a mapping function faster is to adjust the starting block height. See [How to start at a different block height?](../tutorials_examples/block-height.md).


## Bonus Tutorial
* [201 Lab List All Transaction Workbook](/assets/pdf/SubQuery_201_Lab_List_All_Transaction.pdf)