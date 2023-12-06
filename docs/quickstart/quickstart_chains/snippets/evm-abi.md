As you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../../build/introduction.md#evm-codegen-from-abis).

All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In this example project, you would import these types like so.
