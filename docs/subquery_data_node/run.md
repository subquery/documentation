# Run a SubQuery Data Node

Running SubQuery data nodes is the same as running the unforked nodes but there is an additional option for exposing the new RPCS. You can find the documentation for [Geth](https://geth.ethereum.org/docs/getting-started) and [OP-Geth](https://docs.optimism.io/builders/node-operators/overview)

These nodes need to be run as [archive nodes](https://geth.ethereum.org/docs/fundamentals/sync-modes#archive-nodes) to ensure the appropriate data is available. This means `--syncmode full --gcmode archive` flags need to be set. <!-- The node will throw an error if these are not set, and you should use the unforked versions of these nodes if you don't wish to have these settings. (TODO this error isn't currently thrown) -->

## Enabling Enhanced RPC Endpoints

To enable the new RPCs, add the "subql" namespace to `--http.api` and `--ws.api` flags or in your toml config to enable these RPCs. E.g `--http.api="eth,net,web3,subql" --ws.api="eth,net,web3,subql"`
