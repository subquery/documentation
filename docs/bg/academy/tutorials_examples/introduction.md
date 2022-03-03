# Уроци & примери

Тук ще изброим нашите уроци и ще разгледаме различни примери, които ще ви помогнат да започнете по най-лесния и бърз начин.

## Гид



## Примерни проекти за SubQuery

| Пример                                                                                        | Описание                                                                                                                         | Конец                                                                                                             |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Индексите са външни, така че могат да бъдат заявени от техния хеш                                                                | Най-простият пример с __block handler__функция                                                                    |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | Индексира клеймото за време на всеки завършен блок                                                                               | Друг прост __call handler__функция                                                                                |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)              | Индексира най-ниската сума на залога, необходима за избор на валидатор.                                                          | Сложен__block handler__ function that makes __external calls__ to the `@polkadot/api` за повече данни по веригата |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                | Индекси, определящи облигации, награди и наклонени черти от завършени блокови събития                                            | More complicated __event handlers__ with a __one-to-many__ relationship                                           |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                     | Индексира балансовите преводи между акаунти, също индексира пакета all utilities, за да знае съдържанието на външните повиквания | __Един към много__ and __много към много__ взаимоотношения и сложни __външна обработка__                          |
| [коте](https://github.com/subquery/tutorials-kitty-chain)                                     | Индексира информацията за раждането на котенца.                                                                                  | Сложен __call handlers__или__event handlers__, с данни, индексирани от __custom chain__                           |
