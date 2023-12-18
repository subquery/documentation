# Ethereum Quick Start - ENS (Complex)

This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all ENS Records in the ENS registry.

<!-- @include: ../snippets/gravatar-note.md -->

<!-- @include: ../snippets/evm-quickstart-reference.md -->

Now, let's move forward and fork the example code for this project from [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-ens)

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

The main concepts in this ENS project is that it only indexes logs from ENS' various smart contracts, LogHandlers are the most common type of handlers for Ethereum, and it shows here in this example project. There are a total of 31 different log handlers in this project.

Secondly, note that there are 7 different ABIs imported into this project. We give each different ABI it's own section under datasources since they all have their own unique smart contract address.

```ts
{
  dataSources: [
    // ENSRegistry
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 9380380,

      options: {
        // Must be a key of assets
        abi: "EnsRegistry",
        address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      },
      assets: new Map([["EnsRegistry", { file: "./abis/Registry.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // ENSRegistryOld
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3327417,

      options: {
        // Must be a key of assets
        abi: "EnsRegistry",
        address: "0x314159265dd8dbb310642f98f50c066173c1259b",
      },
      assets: new Map([["EnsRegistry", { file: "./abis/Registry.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // Resolver
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3327417,

      options: {
        // Must be a key of assets
        abi: "Resolver",
      },
      assets: new Map([["Resolver", { file: "./abis/PublicResolver.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // BaseRegistrar
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 9380410,

      options: {
        // Must be a key of assets
        abi: "BaseRegistrar",
        address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
      },
      assets: new Map([
        ["BaseRegistrar", { file: "./abis/BaseRegistrar.json" }],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // EthRegistrarControllerOld
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 9380471,
      options: {
        // Must be a key of assets
        abi: "EthRegistrarControllerOld",
        address: "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",
      },
      assets: new Map([
        [
          "EthRegistrarControllerOld",
          { file: "./abis/EthRegistrarControllerOld.json" },
        ],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // EthRegistrarController
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3327417,
      options: {
        // Must be a key of assets
        abi: "EthRegistrarController",
      },
      assets: new Map([
        [
          "EthRegistrarController",
          { file: "./abis/EthRegistrarController.json" },
        ],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
    // NameWrapper
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3327417,
      options: {
        // Must be a key of assets
        abi: "NameWrapper",
      },
      assets: new Map([["NameWrapper", { file: "./abis/NameWrapper.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [...],
      },
    },
  ],
}
```

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

You'll see that there are 33 GraphQL entities in the ENS project with many foreign key relationships between them. Take for example the `Domain` and `DomainEvent` entities. There is a one to many relationship between `Domain` and `DomainEvent`, and there is also a one to many relationship that `Domain` has with itself (via the `parent` property), we've event created a virtual `subdomains` field that can be used to navigate via the GraphQL entities.

```graphql
type Domain @entity {
  id: ID! # The namehash of the name
  name: String # The human readable name, if known. Unknown portions replaced with hash in square brackets (eg, foo.[1234].eth)
  parent: Domain # The namehash (id) of the parent name
  subdomains: [Domain] @derivedFrom(field: "parent") # Can count domains from length of array
  events: [DomainEvent] @derivedFrom(field: "domain")
  ...
}

type DomainEvent @entity {
  id: ID!
  domain: Domain!
  ...
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

All entites can be imported from the following directory:

```ts
// Import entity types generated from the GraphQL schema
import {
  Account,
  Domain,
  Resolver,
  NewOwner,
  Transfer,
  NewResolver,
  NewTTL,
} from "../types";
import {
  NewOwnerEvent,
  TransferEvent,
  NewResolverEvent,
  NewTTLEvent,
} from "../types/contracts/Registry";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

They operate in a similar way to SubGraphs, and you can see wiht ENS that they are contained in 4 different files with the addition of a helper `utils.ts`.

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  domains(first: 5, orderBy: SUBDOMAIN_COUNT_DESC) {
    nodes {
      id
      name
      labelName
      subdomains(first: 5) {
        totalCount
        nodes {
          id
          name
          labelName
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "domains": {
      "nodes": [
        {
          "id": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "name": null,
          "labelName": null,
          "subdomains": {
            "totalCount": 2,
            "nodes": [
              {
                "id": "0x825726c8cd4176035fe52b95bc1aef3c27e841545bd3a431079f38641c7ba88c",
                "name": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
                "labelName": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c"
              },
              {
                "id": "0xd1b0e2eec983ad6a7fb21f6fc706af8717b12b8814d2596016750ea73e00b57f",
                "name": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
                "labelName": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
              }
            ]
          }
        },
        {
          "id": "0x352b3a53b6861a6c39477ba530d607cc922b3469121b1b1cb533c2b66805007c",
          "name": null,
          "labelName": "0xe5e14487b78f85faa6e1808e89246cf57dd34831548ff2e6097380d98db2504a",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0x79700a4bad07bddf30b55c0c41297f727c853ae7ac64667e009df49a9ab68dfd",
          "name": null,
          "labelName": "0xc384f2a2b2ac833e2abf795bf38a38f0865833233b8f67cecd7598bd108a2859",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0x825726c8cd4176035fe52b95bc1aef3c27e841545bd3a431079f38641c7ba88c",
          "name": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
          "labelName": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0xd1b0e2eec983ad6a7fb21f6fc706af8717b12b8814d2596016750ea73e00b57f",
          "name": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
          "labelName": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-ens).
:::

<!-- @include: ../snippets/whats-next.md -->
