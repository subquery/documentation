# Run a SubQuery Data Node

Running SubQuery data nodes is the same as running the unforked nodes, but there is an additional option for exposing the new RPCs. You can find the documentation for [Geth](https://geth.ethereum.org/docs/getting-started) and [OP-Geth](https://docs.optimism.io/builders/node-operators/overview)

## Enabling Enhanced RPC Endpoints

To enable the new RPCs, add the "subql" namespace to `--http.api` and `--ws.api` flags or in your toml config to enable these RPCs. E.g `--http.api="eth,net,web3,subql" --ws.api="eth,net,web3,subql"`
