SubQuery simplifies and ensures type-safety when working with GraphQL entities, actions, and transactions.

<!-- @include: codegen.md -->

If you've expressed a preference to employ the Cosmos message based on the provided proto files, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. For example, you can find Osmosis' protobuf definitions in the [official documentation](https://docs.osmosis.zone/apis/grpc#grpcurl). Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs) and [Cosmos Manifest File Configuration](../../build/manifest/chain-specific/cosmos.md#chain-types).

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.
