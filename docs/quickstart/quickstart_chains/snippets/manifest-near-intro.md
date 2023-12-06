The Project Manifest (`project.ts`) file works as an entry point to your NEAR project. It defines most of the details on how SubQuery will index and transform the chain data. For NEAR, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHandler](../../../build/manifest/near.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../../build/manifest/near.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [ActionHandlers](../../../build/manifest/near.md#mapping-handlers-and-filters): On each and every transaction action that matches optional filter criteria, run a mapping function
