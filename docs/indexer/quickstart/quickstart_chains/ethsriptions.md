# Ethereum Quick Start - Ethscriptions

This guide serves as a starting point for the Ethscriptions SubQuery indexer. Ethscriptions, serving as an alternative to smart contracts, operates as a protocol on Ethereum L1, enabling users to share data and execute computations at significantly reduced expenses.

<!-- @include: ../snippets/gravatar-note.md -->

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethscriptions).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

Ethscriptions approach involves circumventing smart contract storage and execution processes, relying on deterministic protocol rules applied to basic Ethereum calldata to derive the state. The primary aim of Ethscriptions is to empower everyday users with the capability to conduct decentralized computations affordably. Update `dataSources` object in your manifest file to look like this:

```ts
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 18130011,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              function: "0x64617461",
            },
          },
        ],
      },
    },
  ],


```

As observed, our sole handler at this point is the transaction handler. Given that all inscriptions essentially comprise Base 64-encoded data URIs, the initial sub-string is consistently `data:`, equivalent to `0x64617461` in hex format.

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

In our case, the GraphQL schema is quite straightforward, comprising only one entity called `Inscriptions`, structured as follows:

```graphql
type Inscription @entity {
  id: ID!
  block: Int!
  creator: String!
  data: String!
  created: Date!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Inscription } from "../types";
import { EthereumTransaction } from "@subql/types-ethereum";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

In this scenario, there's a mapping file containing a pre-established handler. Additionally, there's a `utils.ts` file housing the helper functions responsible for Ethereum hex data processing during execution.

::: code-tabs

@tab `mappingHandlings.ts`

```ts
export async function handleTransaction(
  tx: EthereumTransaction,
): Promise<void> {
  if (tx.to && tx.input) {
    let inscription: Inscription;
    const decodedData = hexToUTF8(tx.input);
    if (isValidDataUri(decodedData)) {
      inscription = Inscription.create({
        id: tx.hash,
        data: decodedData,
        block: tx.blockNumber,
        creator: tx.from,
        created: new Date(Number(tx.blockTimestamp) * 1000),
      });
      await inscription.save();
    }
  }
}
```

@tab `utils.ts`

```ts
export function hexToUTF8(hexString: string): string {
  if (hexString.indexOf("0x") === 0) {
    hexString = hexString.slice(2);
  }

  const bytes = new Uint8Array(hexString.length / 2);

  for (let index = 0; index < bytes.length; index++) {
    const start = index * 2;
    const hexByte = hexString.slice(start, start + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error(
        `Invalid byte sequence ("${hexByte}" in "${hexString}").`,
      );
    bytes[index] = byte;
  }
  let result = String.fromCharCode.apply(null, Array.from(bytes));
  return result.replace(/\0/g, "");
}

export function isValidDataUri(uri: string): boolean {
  const regexp =
    /data:(?<mediatype>(?<mimetype>.+?\/.+?)?(?<parameters>(?:;.+?=.*?)*))?(?<extension>;base64)?,(?<data>.*)/;
  const match = regexp.exec(uri);

  if (!match || !match.groups) {
    return false;
  }

  const { data, extension } = match.groups;
  return validBase64Content(data, extension);
}

export function validBase64Content(data: string, extension?: string): boolean {
  if (extension) {
    try {
      atob(data);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return true;
  }
}
```

:::

The `handleTransaction` function in `mappingHandlings.ts` processes Ethereum transactions. It decodes the input data of a transaction from hexadecimal format to UTF-8, checks if the decoded data is a valid data URI, and if so, creates an `Inscription` entity with specific attributes derived from the transaction information (like hash, data, block number, creator, and creation date). Finally, it saves this `Inscription` entity. During the processing, it utilises functions sourced from `utils.ts`.

The `hexToUTF8` function in `utils.ts` converts a given hexadecimal string to its corresponding UTF-8 string representation. The `isValidDataUri` function checks if a given string is a valid data URI by parsing and matching its components according to a specific regular expression pattern. It verifies if the provided data is valid base64 content, considering if it is in base64 format when the URI has the 'base64' extension. The `validBase64Content` function determines if a given string is valid base64 content, particularly focusing on checking this when the content is expected to be in base64 format.

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  inscriptions(first: 2) {
    nodes {
      id
      data
      creator
      block
      created
    }
  }
}
```

```json
{
  "data": {
    "inscriptions": {
      "nodes": [
        {
          "id": "0x464612703fbc884e68a8b53cff271d7dca9af868c4e7638f5052abc764e05251",
          "data": "data:,{\"p\":\"erc-cash\",\"op\":\"mint\",\"tick\":\"ESH\",\"id\":\"10348\",\"amt\":\"1000\"}",
          "creator": "0x0d283dF942DA60E67AA41b3393d0420EBf65c8d1",
          "block": 18130571,
          "created": "2023-09-13T23:11:59"
        },
        {
          "id": "0xe1a62ebfa91493d6b2d3651e72a27b2ccb227b38c5cd68c697832987b659d501",
          "data": "data:,{\"p\":\"erc-20\",\"op\":\"mint\",\"tick\":\"defi\",\"id\":\"3938\",\"amt\":\"1000\"}",
          "creator": "0xBe3C8c48845c42484d896EF0A5a7fDa3A3ceCE7F",
          "block": 18130661,
          "created": "2023-09-13T23:30:23"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethscriptions).
:::

<!-- @include: ../snippets/whats-next.md -->
