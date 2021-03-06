# Обучаващи инструкции & примери

Тук ще разгледаме нашите обучаващи инструкции и различни примери, които ще ви помогнат да започнете работа по най-лесния и бърз начин.

## Инструкции



## Примерни проекти в SubQuery

| Пример                                                                                      | Описание                                                                                                                                        | Теми                                                                                                                              |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [външен-финализиран-блок](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Индексира външните елементи, за да могат да бъдат заявени с използване на техния хеш                                                            | Най-простият пример с функция__обработка на блокове__                                                                             |
| [указание на времето на блока](https://github.com/subquery/tutorials-block-timestamp)       | Индексира времевите етикети на всеки завършен блок                                                                                              | Друга лесна функция __обработка на повикванията__                                                                                 |
| [праг на валидаторите](https://github.com/subquery/tutorials-validator-threshold)           | Индексира най-ниската сума на залога, необходима за избор на валидатор.                                                                         | По-сложната функция__обработка на блокове__ която изпълнява __външни повиквания__ към `@polkadot/api` за повече данни по веригата |
| [сума за възнаграждение](https://github.com/subquery/tutorials-sum-reward)                  | Индекси, определящи стейкинг бонда, наградите от завършените събития в блока                                                                    | По-сложната функция __обработка на събития__ със__съотношение__един-към-много                                                     |
| [обект-отношение](https://github.com/subquery/tutorials-entity-relations)                   | Индексира трансферите по бланси между акаунти, също индексира пакета служебни програми batchAll, за да знае съдържанието на външните повиквания | Отношения__един към много__ и __много към много__ и сложна __външна обработка__                                                   |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                  | Индексира информацията за създаване на kitties.                                                                                                 | Сложната __обработка на повикванията__или__обработка на събитията__, с данни, индексирани от __персонализираната верига__         |
