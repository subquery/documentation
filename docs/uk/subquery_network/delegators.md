# Делегат

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## Що таке Делегат?

Делегат, це нетехнічна Мережева роль в мережі SubQuery, і це відмінний спосіб почати брати участь в мережі SubQuery. Ця роль дозволяє делегатам "делегувати" свій SQT одному або декільком індексаторам і отримувати винагороду (аналогічно розміщенню ставок).

Без делегатів Індексатори, швидше за все, отримають менше винагород, оскільки вони матимуть менше SQT для розподілу. Тому Індексатори конкурують за залучення делегатів, пропонуючи конкурентоспроможну частку винагороди індексатора.

## Вимоги, що пред'являються до делегата

Одна з найкращих особливостей роботи делегатом полягає в тому, що вам не потрібно ніякого досвіду розробки, програмування або технічного досвіду. Базове розуміння мережі SubQuery це все, що потрібно для того, щоб стати делегатом.

## Переваги делегування повноважень

Є кілька переваг того, щоб стати делегатом:

- **Легко почати**: Делегатам, не вимагає особливих технічних знань, потрібно всього лише придбати токени SQT, а потім вивчити процес делегування токенів їх кращого Індексатору (індексаторів).
- **Внести свій внесок у Мережу**: делегування повноважень індексаторам - це спосіб підтримки запитів індексатора на робочі послуги для споживачів. Натомість делегати отримують винагороду в розмірі SQT.
- **заробляйте нагороди**: Делегати можуть використовувати свій SQT для роботи, делегуючи свій SQT індексаторам і отримуючи частку в Пулі винагород.
- **немає мінімального обсягу делегування**: немає мінімального необхідного делегування для того, щоб бути Делегатом. Це означає, що приєднатися може будь-хто, незалежно від того, скільки у нього SQT.

## Як винагороджуються делегати?

Щоб залучити делегатів до підтримки їхньої роботи, Індексатори пропонують делегатам частку винагороди, яку вони заробляють. Індексатор оголосить ставку комісії індексатора, при якій залишився дохід буде розподілений між загальним пулом делегування / розміщення ставок пропорційно індивідуальній вартості делегування /розміщення ставок в Пулі.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Індекси можуть вільно встановлювати цей показник на будь-яке бажане значення. Найвищий відсоток вказує на те, що індексатори утримують більшу частину прибутку. Нижчий відсоток вказує на те, що Індексатори діляться більшою частиною свого прибутку зі своїми делегатами.

Делегати отримуватимуть дохід лише за періоди розміщення ставок, в яких вони брали участь протягом усього періоду. Наприклад, якщо вони приєднуються до ери розміщення ставок в середині відповідного періоду, то вони не будуть отримувати ніякого доходу від плати за запит для цієї конкретної ери.

Якщо індексатор бажає збільшити ставку комісії індексатора, яку він пропонує своїм Делегатам, він повинен рекламувати це протягом всієї епохи розміщення ставок. Індексатор зможе в будь-який момент знизити ставку комісії за індексацію, щоб залучити більше делегованих SQT для розміщення ставок в короткостроковій перспективі. Делегати можуть відкликати або скасувати свою ставку в будь-який час, але вони позбудуться будь-яких винагород, зароблених протягом періоду розміщення ставок (оскільки вони не були частиною пулу делегування протягом усього періоду розміщення ставок).

## Як вибрати індекси?

You need to assess a few things when deciding on what Indexer to choose.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Життєвий цикл делегування

Делегати делегують (депонують) SQT в контракт індексатора.

Потім делегати можуть вирішити, яку суму повторно делегувати кожному індексатору за своїм вибором.

Делегат може скасувати (вивести) токени назад на свій гаманець. Це призведе до періоду блокування у 28 днів.

Після завершення періоду розблокування токени стають доступними для виведення/отримання.

## Ризики, пов'язані з тим, щоб бути делегатом

Попри те, що це не вважається ризикованою роллю, делегування містити кілька ризиків, про які слід знати.

1. Ризик волатильності ринку: постійні коливання на ринку це ризик, який зачіпає не тільки SQT, але і всі токени на загальному ринку криптовалюта. Застосування довгострокового підходу може знизити цей тип ризику.
2. Постійне коригування параметрів розміщення ставок Індексаторами й плата за делегування можуть збільшити ризик для Делегата. Наприклад, Делегат може пропустити зміну параметрів розміщення ставок, що призведе до меншого, ніж очікувалося, доходу. Щоб знизити цей ризик, коли Індексатори зменшують параметри своєї частки, це набрати чинності тільки після завершення наступної повної ери, що дає делегатам час для оцінки й внесення будь-яких змін.
3. Низька продуктивність індексатора: можливо, делегати можуть вибирати індекси, які працюють погано і, отже, забезпечують Делегатам неякісну віддачу від інвестицій. Тому делегатам рекомендується проявляти належну обачність щодо потенційних Індексаторів. Також доступний Індекс репутації, який допомагає делегатам порівнювати індекси один з одним.

Як тільки буде знайдений кращі індексатори, слід провести належну перевірку репутації й надійності індексатора. Оцінки можуть бути виконані для оцінки того, чи активний індексатор в товаристві, чи допомагає індексатор іншим учасникам, чи можливо зв'язатися з Індексатором і чи оновлює індексатор оновлення протоколу і проєкту. The aforementioned Reputation Index can also serve as a primary selection indicator.
