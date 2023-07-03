# Делегатори

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## Какво е Делегатор?

Делегаторът е нетехническа мрежова роля в SubQuery Network и е чудесен начин да започнете да участвате в SubQuery Network. Тази роля позволява на Делегаторите да „делегират“ своя SQT на един или повече Индексатори и да печелят награди (подобно на залагане).

Без делегати, индексаторите вероятно ще спечелят по-малко награди, защото ще имат по-малко SQT за разпределяне. Следователно Индексаторите се състезават да привлекат Делегатори, като предлагат конкурентен дял от наградите на Индексаторите.

## Изисквания да бъдете Делегатор

Едно от най-хубавите неща в това да си Делегатор е, че нямаш нужда от devops, кодиране или технически опит. Основно разбиране на SubQuery Network е всичко, което се изисква, за да станете Делегатор.

## Предимства да бъдете Делегатор

Има няколко предимства да станете Делегатор:

- **Лесно за започване**: Изискващи малко технически познания, делегаторите трябва само да придобият SQT токени и след това да научат процеса на делегиране на токените към предпочитания от тях индексатор(и).
- **Принос към мрежата**: Делегирането на Indexers е начин да се поддържат заявките за работни услуги на Indexer към потребителите. В замяна делегаторите се възнаграждават със SQT.
- **Печелете награди**: Делегиращите могат да пуснат своя SQT в действие, като делегират своя SQT на индексатори и спечелят дял от фонда за награди.
- **Няма минимална сума за делегиране**: Няма минимално необходимо делегиране, за да бъдете Делегатор. Това означава, че всеки може да се присъедини, независимо колко SQT има.

## Как се възнаграждават делегиращите?

За да привлекат Делегатори да подкрепят работата им, Индексаторите предлагат на Делегаторите дял от наградите, които печелят. Индексаторът ще рекламира комисионна на Индексатора, при което оставащите приходи ще бъдат споделени в общия пул за делегиране/залагане пропорционално на индивидуалната делегирана/заложена стойност в пула.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Индексаторите са свободни да задават този процент на всяка желана стойност. По-високият процент показва, че индексаторите запазват по-голяма част от печалбите. По-нисък процент показва, че Индексаторите споделят повече от печалбите си със своите Делегатори.

Делегаторите ще получават приходи само за залагане на епохи, в които са участвали за целия период. Например, ако се присъединят към ера на залагане в средата на съответния период, тогава те няма да спечелят никакви приходи от такси за заявка за тази конкретна ера.

Ако индексатор желае да увеличи комисионната на индексатора, която предлага на своите делегати, той трябва да рекламира това за цяла ера на залагане. Индексаторът ще може да намали своята комисионна на индексатора по всяко време, за да събере повече делегирани SQT за залагане в краткосрочен план. Делегаторите могат да изтеглят или отменят делегирането на своята заложена сума по всяко време, но ще загубят всички награди, спечелени в рамките на ерата на залагане (тъй като не са били част от пула за делегиране през цялата продължителност на ерата на залагане).

## Как да изберем индексатори?

You need to assess a few things when deciding on what Indexer to choose.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Жизнен цикъл на делегиране

Делегаторите делегират (депозират) SQT в договора на индексатора.

След това делегаторите могат да решат колко да делегират отново на всеки индексатор по техен избор.

Делегиращият може да отмени делегирането (изтегли) токени обратно в своя портфейл. Това ще задейства период на заключване от 28 дни.

After the unlocking period has been completed, tokens become available for withdrawal/claim.

## Рисковете да бъдете Делегатор

Въпреки че не се счита за рискована роля, да бъдеш Делегатор включва няколко риска, които трябва да знаете.

1. Риск от нестабилност на пазара: Постоянните колебания на пазара са риск, който засяга не само SQT, но и всички токени на общия пазар на криптовалута. Възприемането на дългосрочен подход може да намали този вид риск.
2. Постоянните корекции на параметрите на залагане от Индексаторите и таксите за делегиране могат да увеличат риска за Делегатора. Например Делегатор може да пропусне промяна в параметрите на залагане, което да доведе до по-малка от очакваната възвръщаемост. За да се намали този риск, когато индексаторите намалят своите параметри на залога, това ще влезе в сила едва след завършване на следващата пълна ера, давайки време на делегатите да преценят и направят промени.
3. Лоша производителност на индексатора: Възможно е Делегаторите да изберат Индексатори, които се представят лошо и следователно да осигурят нестандартна възвръщаемост на инвестицията на Делегаторите. Следователно делегаторите се насърчават да извършват надлежна проверка на потенциалните индексатори. Индексът на репутацията също е наличен, за да помогне на Делегаторите да сравняват Индексаторите един с друг.

След като бъде намерен(и) предпочитан индексатор(и), трябва да се извърши надлежна проверка, за да се провери репутацията и надеждността на индексатора. Могат да се извършват оценки, за да се прецени дали Индексаторът е активен в общността, дали Индексаторът помага на други членове, дали е възможно да се свържете с Индексатора и дали Индексаторът е актуален с актуализации на протоколи и проекти. The aforementioned Reputation Index can also serve as a primary selection indicator.
