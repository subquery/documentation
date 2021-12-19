# Туторіали та приклади

Тут ми зазначимо основні команди та покажемо різні приклади, які допоможуть вам розпочати у найбільш легкий та швидкий спосіб.

## SubQuery приклади



## SubQuery приклади проектів

| Приклади                                                                                      | Опис                                                                                                                     | Теми                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Екстринсики індексів, щоб вони могли бути запитані по хешу                                                               | Найпростіший приклад з функцією **block handler**                                                                             |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | Indexes timestamp of each finalized block                                                                                | Ще одна звичайна **call handler** функція                                                                                     |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)              | Indexes the least staking amount required for a validator to be elected.                                                 | More complicated **block handler** function that makes **external calls** to the `@polkadot/api` for additional on-chain data |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                | Indexes staking bond, rewards, and slashes from the events of finalized block                                            | More complicated **event handlers** with a **one-to-many** relationship                                                       |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                     | Indexes balance transfers between accounts, also indexes utility batchAll to find out the content of the extrinsic calls | **One-to-many** and **many-to-many** relationships and complicated **extrinsic handling**                                     |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                    | Indexes birth info of kitties.                                                                                           | Complex **call handlers** and **event handlers**, with data indexed from a **custom chain**                                   |
