# Способы оплаты

Для обеспечения гибкости существует 3 варианта оплаты данных блокчейна. Это:

- Оплата по мере использования (PAYG).
- Закрытое Соглашение на оказание услуг.
- Открытое Соглашение на оказание услуг.

## Pay-As-You-Go (PAYG)

Это базовый способ оплаты и запасной вариант для других способов. Каждый индексатор будет объявлять свои цены PAYG при регистрации своей способности обрабатывать запросы для определенных проектов SubQuery.

Потребители, создающие запросы, должны будут заблокировать токены, необходимые для исполнения этого запроса в канале состояния, и в конце Эры эти токены будут распределены среди индексаторов основываясь на производственной функции Кобба-Дугласа.

## Закрытые Планы и Соглашения

Закрытые соглашения - это соглашение только между одним Индексатором и одним Потребителем. Это прямые взаимоотношения, когда все платежи происходят между двумя сторонами за выполненную работу.

Закрытые соглашения предназначены для того, чтобы дать индексаторам уверенность в том, что существует рынок и окупаемость инвестиций для данных определенного проекта SubQuery, и, в cущности, сигнализировать им, какие проекты следует индексировать.

Закрытые планы также могут быть применимы к существующим проектам SubQuery, чтобы привлечь дополнительных индексаторов к данному проекту SubQuery. Это может быть полезно в ситуациях, когда существующий монополист индексатор может взимать необоснованную оплату за данные или отсутствует конкуренция, для того чтобы привести цены к разумному равновесию.

## Открытое соглашение об оказании услуг

Open Market Service Agreements are similar to Closed Market Service Agreements, but allow multiple Indexers to join and compete to provide data to the Consumer. An Open Market Service Agreement may start as a contract between 1 Consumer and 1 Indexer, but more parties may join the contract resulting in *n* consumer and *n* indexers.

Each Open Market Service Agreement results in a new reward pool being created for that contract, and SQT is distributed amongst participating indexers by the Cobb-Douglas production function.

Open Agreements provide favourable terms for both Indexers and Consumers, but enable better performance and reliability for Consumers by attracting more Indexers to compete and serve the same data. If Consumers are running large scale applications with users around the world, then Open Agreements are ideal.

## SubQuery’s Innovation in Payment Methods

Today, we generally pay with subscription-based payments for the music we listen to, the TV shows we watch, and the applications that we use. In pioneering web3 service applications, we’ve instead adopted a pay-as-you-go model, where each atomic transaction has an exact cost in the network.

We think subscription based or recurring payment methods are here to stay. Service providers like them because they represent predictable revenue, similarly on the other side consumers like them because they are a known and easily quantified cost. There’s also a psychological factor where once you subscribe, most consumers will feel obligated to consume as much if not all of it, increasing the demand for the service and allowing economies of scale to kick in.

The combination of the above three payment options for indexers provide several advanced subscription based options for Consumers and Indexers. Некоторые стороны могут извлечь выгоду из определенности вознаграждений, обеспечиваемых Закрытыми соглашениями, и предсказуемости повторяющихся затрат. Equally, others may instead prefer to hunt out the most affordable data by going for high volume recurring agreements or low spot prices on the Pay-As-You-Go market.
