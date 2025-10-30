# Introduction

Many blockchains have different VMs or runtimes that allow execution of smart contracts. Some of these are wide spread such as EVM, while others are more niche such as WASM. To make it easier to index these runtimes we have created a number of datasource processors that can be used in your SubQuery project.
These processors make it easier to filter and extract the data from these runtimes.

We have a number of processors available in the [datasource-processors repository](https://github.com/subquery/datasource-processors). There is specific documentation for the following processors:
* [Substrate EVM](./substrate-evm.md) - Also known as Frontier EVM
* [Substrate Wasm](./substrate-wasm.md)
* [Cosmos EVM](./cosmos-evm.md)

::: note
These processors are good when you need data from within the runtime as well as data from the base chain. If you just need EVM data you can use the Ethereum SDK for more features, better performance and easier development.
:::
