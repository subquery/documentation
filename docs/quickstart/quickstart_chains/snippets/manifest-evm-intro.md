The Project Manifest (`project.ts`) file works as an entry point to your Ethereum project. It defines most of the details on how SubQuery will index and transform the chain data. For Ethereum, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function
