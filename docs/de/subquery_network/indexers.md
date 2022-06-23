# Indexers

## Wer ist ein Indexer?

Ein Indexer ist ein SubQuery-Netzwerkteilnehmer, der für die Indizierung von Blockchain-Daten und die Bereitstellung dieser Daten für seine Kunden verantwortlich ist.

Indexer spielen innerhalb des SubQuery-Netzwerks eine sehr wichtige Rolle. Als Teil eines Data-as-a-Service-Geschäfts verwandelt ein Indexer Rechen- und Netzwerkleistung in Gewinne.

## Indexer Staking

Um Belohnungen aus Abfrageeinnahmen als Indexer zu verdienen, wird vorgeschlagen, dass Indexer SQT gegen ein bestimmtes SubQuery-Projekt einsetzen müssen, für das sie den Service bereitstellen. Die Cobb-Douglas-Produktionsfunktion wird verwendet, um die Belohnungen zu bestimmen, die an jeden Indexer verteilt werden.

SubQuery plant, dem Netzwerk eine Einschränkung hinzuzufügen, bei der ein Indexierer einen Mindestbetrag an SQT auf den entsprechenden Belohnungspool setzen muss, um an seiner übereinstimmenden offenen Vereinbarung teilnehmen zu können. Sie müssen auch einen Mindestbetrag für einen gleichwertigen Einsatzvertrag für alle geschlossenen Vereinbarungen auf die gleiche Weise einsetzen. Dieser Indexer-Staked-Mindestwert muss ein bestimmter Prozentsatz des Belohnungswerts der Vereinbarung pro Ära sein, was bedeutet, dass der Indexer auch seinen Einsatz erhöhen muss, um die Vereinbarung auf höhere Volumina zu erneuern. Wenn der Einsatz eines Indexierers unter diesen Mindestbetrag fällt, kann er die Vereinbarung nicht zum bestehenden Preis verlängern.

Wenn ein Indexer bei Fehlverhalten erwischt wird (z. B. durch die Angabe ungültiger, unvollständiger oder falscher Daten), ist er dafür verantwortlich, dass ein Teil seiner eingesetzten SQT (auf der bestimmten Belohnungspool-IP) der SubQuery Foundation Treasury neu zugewiesen wird, wodurch seine Bestände von verringert werden gestakete SQT im Netzwerk und damit ihre potenzielle Belohnung. Da der dem Indexer zugeteilte Anteil durch einen Prozentsatz seiner gesamten SQT bestimmt wird, wirkt sich dies auf alle anderen Belohnungspools aus, an denen der Indexer beteiligt ist.

## Wie werden Indexer belohnt?

Indexer werden in SQT auf zwei Arten belohnt:
- Belohnungen aus SQT-Belohnungspools basierend auf der von der Cobb-Douglas-Produktionsfunktion definierten Verteilung
- Belohnungen für direkte SQT-Abfragegebühren aus geschlossenen Vereinbarungen, an denen ein Indexer beteiligt ist

Indexer werden mit den Gebühren belohnt, die Verbraucher für die Bereitstellung von Blockchain-Daten zahlen, die der Verbraucher angefordert hat. Ein Indexer erhält alle Gebühren aus einer geschlossenen Vereinbarung. Andernfalls werden die Gebühren basierend auf der Menge der geleisteten Arbeit (zugestellte Anfragen) und der Menge der delegierten SQT aufgeteilt – diese Aufteilung wird durch Anwendung der Cobb-Douglas-Produktionsfunktion bestimmt.

Für einen bestimmten Indexer können mehrere Belohnungspools gleichzeitig aktiv sein. Die Aufgabe des Indexierers besteht darin, seine abgesteckten und delegierten SQT diesen Pools zuzuweisen (als Prozentsatz ihrer gesamten SQT). Es gibt einen Belohnungspool für jedes Projekt, das der Indexer PAYG akzeptiert, und einen Belohnungspool für jede Marktvereinbarung, an der der Indexer beteiligt ist.

## Delegators-Gewinn

Indexers können ihr Verdienstpotenzial erhöhen, indem sie Delegatoren gewinnen. Delegatoren sind SQT-Token-Inhaber, die ihre Token für zusätzliche Belohnungen an Indexer delegieren können. Indexer verwenden diese zusätzlichen Token, um den Betrag zu erhöhen, den sie Projekten ihrer Wahl zuweisen. Dadurch können Indexer ihre Einnahmen steigern.

Indexer legen einen Provisionssatz für Indexer (ICR) fest, der dem Prozentsatz entspricht, den Indexer verdienen. Der Rest wird dann unter dem Indexer und allen Delegatoren proportional nach eingesetztem/delegiertem Betrag aufgeteilt. Daher müssen Indexer entscheiden, welchen Anteil der Gewinne ein Indexer einbehalten möchte, im Vergleich zu dem Betrag, den er mit seinen Delegatoren teilen möchte. Ein niedrigerer ICR wird für Delegators attraktiver sein.

Beispielsweise hat Indexer A einen ICR von 80 % festgelegt und SQT von 8 Delegatoren erhalten. Das bedeutet, dass die 8 Delegatoren plus der Indexer selbst mit einem Anteil der restlichen 20 % dessen, was der Indexer verdient hat, belohnt werden. Der Anteil wird anteilig zwischen ihnen aufgeteilt. Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards. For more information on Delegators rewards, see [Delegators](./delegators.md).

## Becoming an Indexer

To become an Indexer on the SubQuery Network, the Indexer must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an Indexer.

### Indexer skillset

In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](./design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version
- Identify and take advantage of new indexing opportunities
- Update project version to latest and reindex where necessary
- Infrastructure maintenance
  - Constantly monitoring and upsizing disk
  - Right size query and indexing compute based on traffic
  - Increase query services for increasing ingress traffic

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node)
  - [Query Service](https://www.npmjs.com/package/@subql/query)
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator)
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties)
- the accuracy of the data being served to avoid slashing penalties

## Selecting SubQuery Projects to Index

There are several indicators that an Indexer needs to consider when selecting a SubQuery project to index.

### Query Fee Opportunities

Some projects will have open or closed plans advertised by consumers.

When a Consumer advertises an open or closed plan for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities.

### Indexer Competition

Popular projects offering a high query volume that attract a large number of Indexers. This also implies that the rewards will be shared amongst more people. A single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers.

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Indexers set their plan prices?
- At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Indexer or Indexer’s team
- The hardware approach and why it provides superior performance
- The customer support policy or SLA
- Evidence of historical performances

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.
