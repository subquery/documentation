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
- Rewards from SQT reward pools based on distribution defined by the Cobb-Douglas Production Function.
- Direct SQT query fee rewards from Closed Agreements that an indexer is party to.

Indexer werden mit den Gebühren belohnt, die Verbraucher für die Bereitstellung von Blockchain-Daten zahlen, die der Verbraucher angefordert hat. Ein Indexer erhält alle Gebühren aus einer geschlossenen Vereinbarung. Andernfalls werden die Gebühren basierend auf der Menge der geleisteten Arbeit (zugestellte Anfragen) und der Menge der delegierten SQT aufgeteilt – diese Aufteilung wird durch Anwendung der Cobb-Douglas-Produktionsfunktion bestimmt.

Für einen bestimmten Indexer können mehrere Belohnungspools gleichzeitig aktiv sein. Die Aufgabe des Indexierers besteht darin, seine abgesteckten und delegierten SQT diesen Pools zuzuweisen (als Prozentsatz ihrer gesamten SQT). Es gibt einen Belohnungspool für jedes Projekt, das der Indexer PAYG akzeptiert, und einen Belohnungspool für jede Marktvereinbarung, an der der Indexer beteiligt ist.

## Delegators-Gewinn

Indexers können ihr Verdienstpotenzial erhöhen, indem sie Delegatoren gewinnen. Delegatoren sind SQT-Token-Inhaber, die ihre Token für zusätzliche Belohnungen an Indexer delegieren können. Indexer verwenden diese zusätzlichen Token, um den Betrag zu erhöhen, den sie Projekten ihrer Wahl zuweisen. Dadurch können Indexer ihre Einnahmen steigern.

Indexer legen einen Provisionssatz für Indexer (ICR) fest, der dem Prozentsatz entspricht, den Indexer verdienen. Der Rest wird dann unter dem Indexer und allen Delegatoren proportional nach eingesetztem/delegiertem Betrag aufgeteilt. Daher müssen Indexer entscheiden, welchen Anteil der Gewinne ein Indexer einbehalten möchte, im Vergleich zu dem Betrag, den er mit seinen Delegatoren teilen möchte. Ein niedrigerer ICR wird für Delegators attraktiver sein.

Beispielsweise hat Indexer A einen ICR von 80 % festgelegt und SQT von 8 Delegatoren erhalten. Das bedeutet, dass die 8 Delegatoren plus der Indexer selbst mit einem Anteil der restlichen 20 % dessen, was der Indexer verdient hat, belohnt werden. Der Anteil wird anteilig zwischen ihnen aufgeteilt. Beachten Sie, dass Delegatoren ihre Token für die gesamte Ära delegiert haben müssen, um sich für diese Belohnungen zu qualifizieren. Weitere Informationen zu den Prämien für Delegatoren finden Sie unter [Delegatoren](./delegators.md).

## Indexer werden

Um ein Indexer im SubQuery-Netzwerk zu werden, muss der Indexer über die erforderliche Hardware verfügen, die erforderlichen SubQuery-Dienste ausführen, über ein öffentlich zugängliches Netzwerk über eine statische IP oder einen Domänennamen verfügen und sich als Indexer registrieren.

### Indexer-Fähigkeiten

Im Allgemeinen sollte ein Indexer ein technisch versierter Computerbenutzer sein. Die Einfachheit des SubQuery-Netzwerks und der vorgeschlagenen Frameworks ermöglicht jedoch selbst einem Junior-Entwickler die erfolgreiche Teilnahme.

Ein einfacher Benutzer sollte mit der Bereitstellung und Verwaltung von Servern, der Installation der SubQuery-CLI-Tools, der Datenbankverwaltung und grundlegenden Netzwerkfunktionen vertraut sein. Erfahrenere Benutzer können Nodes in einer geclusterten Umgebung ausführen, Überwachung und Warnungen sowie eine erweiterte Netzwerkverwaltung integrieren.

Schließlich sollten interessierte Parteien bereit sein, Zeit in die Wartung ihrer Indexierungsnodes und -infrastruktur zu investieren.

### Staking-Anforderungen

Von Indexern wird erwartet, dass sie eine Mindestmenge an Token einsetzen und verwalten. Dadurch soll sichergestellt werden, dass Indexer etwas im Spiel haben und sich verpflichtet fühlen, das Netzwerk zu unterstützen. SubQuery muss dies noch bestimmen, aber es ist eine unserer [Designphilosophien](./design-philosophy.md), dass dies so niedrig und zugänglich wie möglich ist.

Sollte ein Indexer ein Slashable Event erleben und sein SQT-Guthaben unter das erforderliche Minimum fallen, muss er sein SQT aufstocken, um weiterhin Belohnungen für seine Arbeit zu verdienen.

### Hardware-Anforderungen

Indexer können entweder in ihre eigene Infrastruktur-Hardware investieren oder Infrastruktur von AWS, Google Cloud, Digital Ocean, Microsoft Azure usw. mieten.

### Wartungs-/Betriebsanforderungen

Hier sind einige der Wartungs- und/oder Betriebsanforderungen, mit denen Indexer rechnen sollten:

- Always upgrade to the latest Subquery software version.
- Identify and take advantage of new indexing opportunities.
- Update project version to latest and reindex where necessary.
- Infrastructure maintenance:
  - Constantly monitoring and upsizing disk.
  - Right size query and indexing compute based on traffic.
  - Increase query services for increasing ingress traffic.

### Infrastruktur

Die Mindestanforderungen an die Infrastruktur umfassen:

- Mindestens ein Rechennode zum Ausführen der folgenden Dienste:
  - [Nodedienst (Indizierung).](https://www.npmjs.com/package/@subql/node)
  - [Abfragedienst](https://www.npmjs.com/package/@subql/query)
  - [Indexer-Koordinator-Dienst](https://www.npmjs.com/package/@subql/indexer-coordinator)
- Ein Datenbanknode zum Ausführen von Postgresql db (v12 und höher).

Genauere Informationen folgen in Kürze.

## Sicherheit & Leistungsüberlegungen

Sicherheits- und Leistungsüberlegungen sind wie folgt.

### Operator-Wallets

Die sichere Speicherung der Wallet-Recovery-Seed-Phrase eines Indexers wird dringend empfohlen.

### Firewalls

Indexer müssen die Sicherheit im Auge behalten. Infrastruktursicherheit, insbesondere Firewalls, sollten implementiert werden, um zu verhindern, dass die Öffentlichkeit persönlichen Ports ausgesetzt wird.

Sichere Passwörter sollten standardmäßig verwendet werden, und Richtlinien zur Passwortrotation sollten berücksichtigt werden.

### Leistung des Indexers

Um wünschenswerte Leistungen zu erzielen, müssen Indexer verschiedene Faktoren berücksichtigen, wie z.B:

- das Gleichgewicht zwischen ihrem eigenen Anteil und dem der Delegierenden.
- die Art des zuzustellenden Vertrages. Der Indexer erhält alle Abfragegebühren, wenn es sich um einen geschlossenen Vertrag handelt. Wenn es offen ist, hängt die Belohnung eines Indexers davon ab, wie viele andere Indexer es gibt.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties).
- the accuracy of the data being served to avoid slashing penalties.

## Auswählen von SubQuery-Projekten zum Indexieren

Es gibt mehrere Indikatoren, die ein Indexer berücksichtigen muss, wenn er ein zu indexierendes SubQuery-Projekt auswählt.

### Möglichkeiten zur Abfrage von Gebühren

Einige Projekte haben offene oder geschlossene Pläne, die von Verbrauchern beworben werden.

Wenn ein Verbraucher einen offenen oder geschlossenen Plan für ein Projekt bewirbt, gibt er letztendlich an, wie viel er bereit ist, für eine bestimmte Anzahl von Anfragen zu zahlen. Je mehr ein Verbraucher zu zahlen bereit ist, desto attraktiver wird das Projekt für einen Indexer. Es gibt auch Vertrauen, dass es wahrscheinlich wiederkehrende Einnahmen aus diesem SubQuery-Projekt geben wird.

### Komplexität des Projekts

Die Berechnungsanforderungen der Projekte variieren. Einfache Projekte indizieren nur wenige Parameter, während kompliziertere Projekte mehr Rechenressourcen und mehr Bandbreite erfordern. Indexer müssen die Komplexität des Projekts und seine Hardwarefähigkeiten verstehen.

### Indexer-Wettbewerb

Beliebte Projekte mit einem hohen Abfragevolumen, die eine große Anzahl von Indexern anziehen. Dies impliziert auch, dass die Belohnungen unter mehr Menschen geteilt werden. Der Anteil eines einzelnen Indexers kann geringer sein als ein weniger beliebtes Projekt mit einer etwas niedrigeren Abfragegebühr, aber mit weit weniger Indexern.

### Preisstrategie

Indexierer müssen sich ihrer Betriebskosten und erwarteten Einnahmen bewusst sein, um ihre Gewinnschwelle zu verstehen. Einige Überlegungen sind:

- Wie sollten Indexer ihre Planpreise festlegen?
- Zu welchem Preis können Indexer einen Servicevertrag annehmen oder nicht?

### Anzeige

Indexierer müssen sich sowohl bei Delegierenden als auch bei Verbrauchern bewerben. Indexierer können dies auf ihrer eigenen Website, in den Subquery-Foren oder an anderen Stellen tun, die sie für erforderlich halten. Einige Beispiele für die bereitzustellenden Informationen sind:

- The background and experience of the Indexer or Indexer’s team.
- The hardware approach and why it provides superior performance.
- The customer support policy or SLA.
- Evidence of historical performances.

### Kundendienst

Indexer werden dringend ermutigt, ihren Kunden eine Kommunikationsmethode zur Verfügung zu stellen, um die Nichtverfügbarkeit zu melden und auch Feedback zu geben.
