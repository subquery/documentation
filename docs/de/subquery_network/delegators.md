# Delegators

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

*Provisionssatz des Indexers*: Dies ist ein prozentualer Anteil der Gebühren, die durch die Bearbeitung von Anfragen an Verbraucher verdient werden. Indexer können diesen Kurs frei auf jeden gewünschten Wert festlegen. Ein höherer Prozentsatz zeigt an, dass Indexer mehr von den Gewinnen behalten. Ein niedrigerer Prozentsatz zeigt an, dass die Indexer mehr von ihren Gewinnen mit ihren Delegatoren teilen.

Delegators erhalten nur Einnahmen für das Staken von Epochen, an denen sie während des gesamten Zeitraums teilgenommen haben. Wenn sie beispielsweise in der Mitte des relevanten Zeitraums einer Staking-Ära beitreten, verdienen sie für diese bestimmte Ära keine Einnahmen aus Abfragegebühren.

Wenn ein Indexer den Indexer-Provisionssatz erhöhen möchte, den er seinen Delegatoren anbietet, muss er dies für eine ganze Staking-Ära bewerben. Der Indexer kann seine Indexer-Provisionsrate jederzeit senken, um kurzfristig mehr delegierte SQT für das Staking aufzubringen. Delegators können ihren eingesetzten Betrag jederzeit zurückziehen oder delegieren, aber sie verlieren alle Belohnungen, die sie während der Staking-Ära verdient haben (da sie nicht während der gesamten Dauer der Staking-Ära Teil des Delegationspools waren).

## Risks of being a Delegator

Even though it is not considered a risky role, being a Delegator includes a few risks to be aware of.

1. Market volatility risk: The constant fluctuations in the market is a risk that affects not just SQT, but all tokens in the general cryptocurrency marketplace. Taking a long term approach can reduce this type of risk.
2. Constant adjustments of staking parameters by Indexers and delegation fees can increase the risk to a Delegator. For example, a Delegator might miss a change in staking parameters resulting in a less than expected return. To reduce this risk, when Indexers decrease their stake parameters, it will only take effect after the next full Era has been completed, giving time for delegators to assess and make any changes.
3. Indexer poor performance: It is possible that Delegators can select Indexers that perform poorly and therefore provide a substandard return on investment to Delegators. Delegators are therefore encouraged to do Indexer due diligence on potential Indexers. A Reputation Index is also available to help Delegators compare Indexers to each other.

## How to select Indexers?

Delegators can select potential Indexers based on a *Reputation Index* or RI. This RI takes into account an Indexer’s uptime, indexer commission rate, slashing events, and Indexer parameter change frequency.

SubQuery will launch the official RI soon, but we expect other delegation applications to calculate and release their own.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Indexer due diligence for Delegators

Once a preferred Indexer(s) is found, due diligence should be performed to check an Indexer’s reputation and reliability. Assessments could be performed to evaluate if the Indexer is active in the community, if the Indexer helps other members, if it is possible to get in touch with the Indexer, and if the Indexer is up-to-date with protocol and project updates.

## Delegation Lifecycle

Delegators delegate (deposit) SQT into an Indexer’s contract.

Delegators can then decide how much to redelegate to each Indexer of their choice.

Delegator can undelegate (withdraw) tokens back to their wallet. This will trigger a lock period of 28 days.

After the unlocking period has been completed, tokens become available for withdrawal/claim.
