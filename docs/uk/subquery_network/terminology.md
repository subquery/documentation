# Термінологія

![terminology](/assets/img/terminology.png)

## **Розподіл**

Процес призначення SQT для проекту індексатором.

### **Перерозподілення**

Одночасний процес з вилучення застейканих токенів з одного проекту і негайне їх стейкінг в іншому проекті(набирає чинність в кінці наступної Ери). Це представлено / виражено як відсоток від усіх залучених SQT токенів індексатора.

## **Залучення**

Процес внесення SQT в глобальний контракт стейкінгу, виконаний Індексатором або Делегатором.

### **Відлучення**

Процес при яскому Індексатор або Делегатор вилучає частину своїх SQT з глобального контракту.

Наспраді це просто переміщення SQT з глобального контракту до гаманців Індексатора або Делегатора. Іншими словами, це можна вважати частковим або повним виводом Індексатором або Делегатором своїх застейканих токенів. Зверніть увагу, що діє термін блокування після відлучення токенів.

## **Делегування**

Процес призначення SQT у глобальний контракт стейкінгу Делегатором, з подальшим призначенням SQT для одного з індексаторів. Зверніть увагу, що делегування і залучення є атомарними операціями.

### **Припинення делегування**

Процес виводу SQT з Індексатора в кінці Ери з подальшим виводом цих токенів з глобального контракту стейкінгу на адресу гаманця. Цей процес підпадає від дію періоду блокування.

### **Redelegating**

Act of a Delegator reassigning SQT from one Indexer to another Indexer. Redelegating does not require tokens to be undelegated and is queued to take effect at the end of the Era.

## **Staking**

Act of an Indexer assigning tokens in a global staking contract and into the Indexer’s own contract.

### **Unstaking**

Act of an Indexer withdrawing their SQT. This triggers a 28 day “lock period”. Indexer can restake to cancel this process and return their lock period tokens to the staking contract.

### **Restaking**

Act of Indexer restaking SQT during the lock period to return locked period tokens to the staking contract.

---

## **Contract Ratio**

The sum of daily contracts value (defined as contract value/period) can not exceed a ratio with their total stake (indexer + delegator).

## **Era**

A period or duration of time where configurations and settings remain constant and calculations take place. For example, during an Era:

- the Indexer Commission Rate cannot be changed during an Era.

## **Indexer Delegation Ratio**

The amount an Indexer can “borrow” or leverage from Delegators. This ratio is yet to be determined.

## **Lock period**

A period where tokens are unbonded awaiting withdrawal. During this period, tokens do not earn any rewards. Currently, the lock period is defined as 28 days.
