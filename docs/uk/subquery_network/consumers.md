# Споживачі

## Хто такий споживач?

Споживач - це учасник мережі SubQuery і є особою або організацією, що платить за оброблені та зібрані дані блокчейну з мережі SubQuery. Споживачі надсилають запити до мережі SubQuery на конкретні дані та сплачуватимуть за це оголошену суму в токенах SQT.

Споживачі - це зазвичай розробники dApp (децентралізовані додатки), компанії по аналізу даних, мережі блокчейну, проміжні розробники або навіть компанії веб-агрегатори, яким потрібен доступ до даних блокчейну, щоб надавати послуги своїм кінцевим користувачам.

## Вимоги до споживача

Немає вимог, щоб стати споживачем SubQuery. Однак споживачам потрібно буде зрозуміти, як отримати токени SQT, як повідомляти свої вимоги до даних та як використовувати отримані дані у форматі JSON.

Споживачі, напевно, також повинні розуміти, як створити проєкт у мережі SubQuery, щоб вони були індексованими або стиснути (перекодувати дані з метою зменшення їх обсягу) цю роботу для того, щоб отримати дані в потрібному форматі.

## Вартість сервісу

Вартість отримання даних з блокчейну буде залежати від попиту та пропозиції та порівняння з іншими подібними послугами, які зараз є доступними. Перевага відкритої та прозорої мережі та екосистеми - це заохочення конкуренції, щоб надавати найкращий сервіс споживачеві.

## Варіанти оплати для споживачів?

Задля гнучкості споживачі мають 3 варіанти для оплати даних блокчейну. Вони є такими:

- Pay-As-You-Go (PAYG) - оплата по об'єму використання
- Closed Service Agreement
- Open Service Agreement

You can read more about the different payment methods, how they work, and the advantages/disadvantages on the [Payment Methods article](./payment-methods.md).

## FAQ

### As a Consumer, do I select 1 Indexer or multiple Indexers?

Unless a Closed Service Agreement is being used, there will be one or more Indexers indexing a SubQuery project. Consumers have the choice when deciding which Indexer to read data from. Typically Consumers would select the most reliable and lowest latency Indexer. Consumers could also incorporate automatic failover and read data from another Indexer if the first one times out or is not responsive.

### What happens if an Indexer goes off line?

Unless a Closed Service Agreement is being used, and if there is more than one Indexer indexing your SubQuery project, it would simply be a matter of switching to another Indexer. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
