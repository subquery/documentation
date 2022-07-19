# Распределение. Действие индексатора, назначающего Sqt данному проекту. Перераспределение. Комбинированная операция по удалению поставленных токенов из одного проекта и немедленному связыванию их с другим проектом (вступает в силу в конце следующей Эры). Это представлено/выражено в процентах от связанного Sqt индексатора

![terminology](/assets/img/terminology.png)

## **Склеивание. Действие по внесению Sqt в контракт глобального стейкинга, выполняемое индексатором или делегатом. Разъединение. Действие индексатора или делегатора, выводящего Sqt из контракта глобального стейкинга. По сути, это перевод Sqt из контракта глобального стейкинга на кошелек Индексатора или Делегатора. Другими словами, это можно рассматривать как снятие индексатором или делегатом части или всей своей доли. Обратите внимание, что период блокировки применяется, когда токены не привязаны**

Действие индексатора, назначающего SQT на данный проект.

### **Перераспределение**

Комбинированная операция по удалению поставленных жетонов из одного проекта и немедленное связывание их с другим проектом (вступает в силу в конце следующей Era). Это представлено/выражено в процентах от связанного SQT индексатора.

## **Связка**

Акт депонирования SQT в глобальный контракт на ставку, осуществляемый либо Индексатором, либо Делегатором.

### **Отмена связывания**

Акт индексатора или делегатора о выходе SQT из глобального контракта на ставку.

This is effectively a transfer of SQT from the global staking contract to the Indexer’s or Delegator’s wallet. In other words, this can be thought of as the Indexer or Delegator withdrawing part or all of their stake. Note that a lock period applies when tokens are unbonded.

## **Delegating**

Act of a Delegator assigning SQT into the global staking contract and then assigning SQT to an Indexer. Note that delegating and bonding are atomic operations.

### **Undelegating**

Act of withdrawing SQT from an Indexer at the end of an Era and then withdrawing that SQT from the global staking contract to a wallet address. This is subject to a lock period.

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
