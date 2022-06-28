# Terminologie

![Terminologie](/assets/img/terminology.png)

## **Reservierung**

Akt eines Indexierers, der SQT einem bestimmten Projekt zuweist.

### **Umverteilung**

Eine kombinierte Operation, bei der gesteckte Token aus einem Projekt entfernt und sofort mit einem anderen Projekt verknüpft werden (tritt am Ende der nächsten Ära in Kraft). Dies wird als Prozentsatz der gebundenen SQT des Indexers dargestellt/ausgedrückt.

## **Bonding**

Akt der Einzahlung von SQT in einen globalen Staking-Vertrag, der entweder von einem Indexer oder einem Delegator durchgeführt wird

### **Unbonding**

Akt eines Indexierers oder Delegators, der SQT aus dem Global Staking-Vertrag zurückzieht.

Dies ist effektiv eine Übertragung von SQT aus dem globalen Staking-Vertrag in die Brieftasche des Indexers oder Delegators. Mit anderen Worten, man kann sich das so vorstellen, als würde der Indexer oder Delegator einen Teil oder seinen gesamten Einsatz zurückziehen. Beachten Sie, dass eine Sperrfrist gilt, wenn Token ungebunden sind.

## **Delegating**

Handlung eines Delegators, der SQT in den globalen Staking-Vertrag einbezieht und dann SQT einem Indexierer zuweist. Beachten Sie, dass das Delegieren und Binden atomare Operationen sind.

### **Undelegating**

Akt des Abhebens von SQT von einem Indexer am Ende einer Ära und anschließendes Abheben dieses SQT aus dem globalen Staking-Vertrag an eine Wallet-Adresse. Dies unterliegt einer Sperrfrist.

### **Redelegating**

Handlung eines Delegators, der SQT von einem Indexer zu einem anderen Indexer neu zuweist. Das erneute Delegieren erfordert nicht, dass Token nicht delegiert werden, und wird in die Warteschlange gestellt, um am Ende der Ära wirksam zu werden.

## **Staking**

Handlung eines Indexers, der Token in einem Global Staking-Vertrag und in den eigenen Vertrag des Indexers zuweist.

### **Unstaking**

Handlung eines Indexierers, der seinen SQT zurückzieht. Dies löst eine 28-tägige „Sperrfrist“ aus. Der Indexer kann erneut spielen, um diesen Vorgang abzubrechen und seine Sperrzeit-Token an den Staking-Vertrag zurückzugeben.

### **Restaking**

Handlung des Indexers, der SQT während des Sperrzeitraums erneut ausführt, um Sperrzeit-Token an den Staking-Vertrag zurückzugeben.

---

## **Vertragsverhältnis**

Die Summe des täglichen Kontraktwerts (definiert als Kontraktwert/Laufzeit) darf ein Verhältnis zu ihrem Gesamteinsatz (Indexer + Delegator) nicht überschreiten.

## **Era**

Ein Zeitraum oder eine Zeitdauer, in der Konfigurationen und Einstellungen konstant bleiben und Berechnungen stattfinden. Zum Beispiel während einer Era:

- Der Indexer-Provisionssatz kann während einer Era nicht geändert werden.

## **Indexer-Delegierungsverhältnis**

Der Betrag, den ein Indexer von Delegatoren „leihen“ oder nutzen kann. Dieses Verhältnis muss noch ermittelt werden.

## **Lock period**

Ein Zeitraum, in dem Token ungebunden sind und auf die Auszahlung warten. Während dieser Zeit verdienen Token keine Belohnungen. Derzeit ist die Sperrfrist auf 28 Tage festgelegt.
