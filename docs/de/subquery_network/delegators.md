# Delegators

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## Wer ist ein Delegator?

Ein Delegator ist eine nicht-technische Netzwerkrolle im SubQuery-Netzwerk und eine großartige Möglichkeit, mit der Teilnahme am SubQuery-Netzwerk zu beginnen. Diese Rolle ermöglicht es Delegatoren, ihre SQT an einen oder mehrere Indexer zu „delegieren“ und Belohnungen zu verdienen (ähnlich wie beim Staking).

Ohne Delegatoren werden Indexer wahrscheinlich weniger Belohnungen verdienen, weil sie weniger SQT zuzuweisen haben. Daher konkurrieren Indexer darum, Delegatoren anzuziehen, indem sie einen wettbewerbsfähigen Anteil an den Belohnungen eines Indexers anbieten.

## Voraussetzungen, um ein Delegator zu sein

Eines der besten Dinge daran, ein Delegator zu sein, ist, dass Sie keine Entwickler, Codierung oder technische Erfahrung benötigen. Um ein Delegator zu werden, ist lediglich ein grundlegendes Verständnis des SubQuery-Netzwerks erforderlich.

## Vorteile als Delegator

Es gibt mehrere Vorteile, ein Delegator zu werden:

- **Einfacher Einstieg**: Delegatoren erfordern nur geringe technische Kenntnisse und müssen nur SQT-Token erwerben und dann den Prozess der Delegierung der Token an ihre(n) bevorzugte(n) Indexer erlernen.
- **Zum Netzwerk beitragen**: Das Delegieren an Indexer ist eine Möglichkeit, die Arbeitsdienstanfragen eines Indexers an Verbraucher zu unterstützen. Im Gegenzug werden die Delegators mit SQT belohnt.
- **Die Prämien verdienen **: Delegators können ihre SQT einsetzen, indem sie ihre SQT an Indexer delegieren und einen Anteil am Prämienpool verdienen.
- **Kein Mindestdelegierungsbetrag**: Es gibt keine erforderliche Mindestdelegation, um Delegator zu sein. Das bedeutet, dass jeder mitmachen kann, egal wie viel SQT man hat.

## Wie werden Delegators belohnt?

Um Delegators für die Unterstützung ihrer Arbeit zu gewinnen, bieten Indexer den Delegators einen Anteil an den Belohnungen, die sie verdienen. Der Indexer bewirbt einen Indexer-Provisionssatz, bei dem die verbleibenden Einnahmen dann innerhalb des gesamten Delegations-/Staking-Pools proportional zum einzelnen delegierten/staked-Wert im Pool geteilt werden.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Indexer können diesen Kurs frei auf jeden gewünschten Wert festlegen. Ein höherer Prozentsatz zeigt an, dass Indexer mehr von den Gewinnen behalten. Ein niedrigerer Prozentsatz zeigt an, dass die Indexer mehr von ihren Gewinnen mit ihren Delegatoren teilen.

Delegators erhalten nur Einnahmen für das Staken von Epochen, an denen sie während des gesamten Zeitraums teilgenommen haben. Wenn sie beispielsweise in der Mitte des relevanten Zeitraums einer Staking-Ära beitreten, verdienen sie für diese bestimmte Ära keine Einnahmen aus Abfragegebühren.

Wenn ein Indexer den Indexer-Provisionssatz erhöhen möchte, den er seinen Delegatoren anbietet, muss er dies für eine ganze Staking-Ära bewerben. Der Indexer kann seine Indexer-Provisionsrate jederzeit senken, um kurzfristig mehr delegierte SQT für das Staking aufzubringen. Delegators können ihren eingesetzten Betrag jederzeit zurückziehen oder delegieren, aber sie verlieren alle Belohnungen, die sie während der Staking-Ära verdient haben (da sie nicht während der gesamten Dauer der Staking-Ära Teil des Delegationspools waren).

## Wie wähle ich Indexer aus?

You need to assess a few things when deciding on what Indexer to choose.

Indexer legen einen Provisionssatz für Indexer (ICR) fest, der dem Prozentsatz entspricht, den Indexer verdienen. Der Rest wird dann unter dem Indexer und allen Delegatoren proportional nach eingesetztem/delegiertem Betrag aufgeteilt. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

Beispielsweise hat Indexer A einen ICR von 80 % festgelegt und SQT von 8 Delegatoren erhalten. Das bedeutet, dass die 8 Delegatoren plus der Indexer selbst mit einem Anteil der restlichen 20 % dessen, was der Indexer verdient hat, belohnt werden. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Delegationslebenszyklus

Delegatoren delegieren (hinterlegen) SQT in den Vertrag eines Indexers.

Delegators können dann entscheiden, wie viel sie an jeden Indexer ihrer Wahl weiterdelegieren.

Der Delegator kann Token zurück in sein Wallet delegieren (entfernen). Dadurch wird eine Sperrfrist von 28 Tagen ausgelöst.

Nach Ablauf des Freischaltzeitraums stehen Token zur Auszahlung/Beanspruchung zur Verfügung.

## Risiken als Delegator

Auch wenn es nicht als riskante Rolle angesehen wird, birgt die Tätigkeit als Delegator einige Risiken, die es zu beachten gilt.

1. Marktvolatilitätsrisiko: Die ständigen Schwankungen des Marktes sind ein Risiko, das nicht nur SQT, sondern alle Token auf dem allgemeinen Kryptowährungsmarkt betrifft. Ein langfristiger Ansatz kann diese Art von Risiko verringern.
2. Ständige Anpassungen der Einsatzparameter durch Indexer und Delegationsgebühren können das Risiko für einen Delegator erhöhen. Beispielsweise könnte ein Delegator eine Änderung der Staking-Parameter verpassen, was zu einer geringeren Rendite als erwartet führt. Um dieses Risiko zu verringern, wird eine Verringerung der Einsatzparameter durch Indexer erst nach Abschluss der nächsten vollständigen Ära wirksam, sodass die Delegierenden Zeit haben, Änderungen vorzunehmen und zu bewerten.
3. Schlechte Leistung des Indexers: Es ist möglich, dass Beauftragende Indexer auswählen, die eine schlechte Leistung erbringen und daher den Beauftragten eine unterdurchschnittliche Kapitalrendite bieten. Die Delegators werden daher ermutigt, bei potenziellen Indexern eine Due-Diligence-Prüfung durchzuführen. Ein Reputationsindex ist ebenfalls verfügbar, um Delegierenden dabei zu helfen, Indexer miteinander zu vergleichen.

Sobald ein oder mehrere bevorzugte Indexer gefunden wurden, sollte eine Due Diligence durchgeführt werden, um den Ruf und die Zuverlässigkeit eines Indexers zu überprüfen. Es könnten Bewertungen durchgeführt werden, um zu bewerten, ob der Indexer in der Community aktiv ist, ob der Indexer anderen Mitgliedern hilft, ob es möglich ist, mit dem Indexer in Kontakt zu treten, und ob der Indexer mit Protokoll- und Projektaktualisierungen auf dem neuesten Stand ist. The aforementioned Reputation Index can also serve as a primary selection indicator.
