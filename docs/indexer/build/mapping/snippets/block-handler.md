## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.