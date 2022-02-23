# GraphQL Schema

## Definition von Entitäten

Die Datei `schema.graphql` definiert die verschiedenen GraphQL-Schemas. Aufgrund der Funktionsweise der GraphQL-Abfragesprache bestimmt die Schemadatei im Wesentlichen die Form Ihrer Daten aus SubQuery. Um mehr über das Schreiben in der GraphQL-Schemasprache zu erfahren, empfehlen wir Ihnen, sich [Schemas und Typen](https://graphql.org/learn/schema/#type-language) anzusehen.

**Wichtig: Wenn Sie Änderungen an der Schemadatei vornehmen, stellen Sie bitte sicher, dass Sie Ihr Typenverzeichnis mit dem folgenden Befehl `yarn codegen` . neu generieren**

### Entitäten
Jede Entität muss ihre Pflichtfelder `id` mit dem Typ `ID!` definieren. Er wird als Primärschlüssel verwendet und ist unter allen Entitäten desselben Typs eindeutig.

Nicht-nullfähige Felder in der Entität werden durch `!` gekennzeichnet. Bitte sehen Sie sich das folgende Beispiel an:

```graphql
Beispiel @entity {
  id: ID! # id-Feld ist immer erforderlich und muss so aussehen
  name: String! # Das ist ein Pflichtfeld
  address: String # Das ist ein optionales Feld
}
```

### Unterstützte Skalare und Typen

Wir unterstützen derzeit folgende Skalartypen:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Datum`
- `Boolean`
- `<EntityName>` für verschachtelte Beziehungsentitäten können Sie den Namen der definierten Entität als eines der Felder verwenden. Weitere Info finden Sie unter [Entitätsbeziehungen](#entity-relationships).
- `JSON` kann alternativ strukturierte Daten speichern, siehe [JSON-Typ](#json-type)
- `<EnumName>`-Typen sind eine spezielle Art von Aufzählungsskalaren, die auf einen bestimmten Satz zulässiger Werte beschränkt sind. Siehe [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Indizierung nach Nicht-Primärschlüssel-Feld

Um die Abfrageleistung zu verbessern, indizieren Sie ein Entitätsfeld einfach durch Implementierung der Annotation `@index` in einem Nicht-Primärschlüsselfeld.

Wir gestatten Benutzern jedoch nicht, `@index`-Annotationen zu einem [JSON](#json-type)-Objekt hinzuzufügen. Standardmäßig werden Indizes automatisch zu Fremdschlüsseln und für JSON-Felder in der Datenbank hinzugefügt, jedoch nur, um die Leistung des Abfragedienstes zu verbessern.

Hier ist ein Beispiel.

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique kann auf true oder false gesetzt werden
  title: Title! # Indizes werden automatisch zum Fremdschlüsselfeld hinzugefügt
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
Angenommen kennen wir den Namen dieses Benutzers, kennen aber nicht den genauen ID-Wert, anstatt alle Benutzer zu extrahieren und dann nach Namen zu filtern, können wir `@index` hinter dem Namensfeld hinzufügen. Dies macht die Abfrage viel schneller und wir können zusätzlich das `unique: true` übergeben, um die Eindeutigkeit sicherzustellen.

**Wenn ein Feld nicht eindeutig ist, beträgt die maximale Ergebnissatzgröße 100**

When code generation is run, this will automatically create a `getByName` under the `User` model, and the foreign key field `title` will create a `getByTitleId` method, which both can directly be accessed in the mapping function.

```sql
/* Bereiten Sie einen Datensatz für die Titelentität vor */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Handler in der Mapping-Funktion
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // Liste aller Kapitäne
```

## Entitätsbeziehungen

Eine Entität hat oft verschachtelte Beziehungen mit anderen Entitäten. Das Festlegen des Feldwerts auf einen anderen Entitätsnamen definiert standardmäßig eine Eins-zu-Eins-Beziehung zwischen diesen beiden Entitäten.

Anhand der folgenden Beispiele können verschiedene Entitätsbeziehungen (eins-zu-eins, eins-zu-viele und viele-zu-viele) konfiguriert werden.

### Eins-zu-eins-Beziehungen

Eins-zu-eins-Beziehungen sind die Standardeinstellung, wenn nur eine einzelne Entität einer anderen zugeordnet wird.

Beispiel: Ein Reisepass gehört nur einer Person und eine Person hat nur einen Reisepass (in diesem Beispiel):

```graphql
schreib Person @entity {
  id: ID!
}

schreib Passport @entity {
  id: ID!
  Besitzer: Person!
}
```

oder

```graphql
schreib Person @entity {
  id: ID!
  Reisepass: Passport!
}

schreib Passport @entity {
  id: ID!
}
```

### One-to-Many-Beziehungen

Sie können eckige Klammern verwenden, um anzugeben, dass ein Feldtyp mehrere Entitäten enthält.

Beispiel: Eine Person kann mehrere Konten haben.

```graphql
schreib Person @entity {
  id: ID!
  Kontos: [Account] 
}

schreib Konto @entity {
  id: ID!
  öffentliche Adresse: String!
}
```

### Viele-zu-Viele-Beziehungen
Eine Viele-zu-Viele-Beziehung kann erreicht werden, indem eine Abbildungsentität implementiert wird, um die anderen beiden Entitäten zu verbinden.

Beispiel: Jede Person ist Teil mehrerer Gruppen (PersonGroup) und Gruppen haben mehrere verschiedene Personen (PersonGroup).

```graphql
schreib Person @entity {
  id: ID!
  name: String!
  Gruppen: [PersonGroup]
}

schreib PersonGroup @entity {
  id: ID!
  Person: Person!
  Gruppe: Group!
}

schreib Group @entity {
  id: ID!
  name: String!
  Personen: [PersonGroup]
}
```

Es ist auch möglich, eine Verbindung derselben Entität in mehreren Feldern der mittleren Entität zu erstellen.

Ein Konto kann beispielsweise über mehrere Überweisungen verfügen und jede Überweisung hat ein Quell- und ein Zielkonto.

Dadurch wird eine bidirektionale Beziehung zwischen zwei Konten (von und zu) über die Transfertabelle hergestellt.

```graphql
schreib Account @entity {
  id: ID!
  öffentliche Adresse: String!
}

schreib Transfer @entity {
  id: ID!
  Betrag: BigInt
   vom : Account!
  zu: Account!
}
```

### Reverse-Lookups

Um eine umgekehrte Suche einer Entität zu einer Beziehung zu ermöglichen, hängen Sie `@derivedFrom` an das Feld an und zeigen Sie auf ihr umgekehrtes Nachschlagefeld einer anderen Entität.

Dadurch wird ein virtuelles Feld auf der Entität erstellt, das abgefragt werden kann.

Auf die Überweisung "von" einem Konto kann von der Kontoentität aus zugegriffen werden, indem der Wert von sentTransfer oder ReceivedTransfer so eingestellt wird, dass ihr Wert aus den entsprechenden Feldern abgeleitet wird.

```graphql
schreib Account @entity {
  id: ID!
  öffentliche Adresse: String!
  sentTransfers: [Transfer] @derivedFrom(field: "from")
  receivedTransfers: [Transfer] @derivedFrom(field: "to")
}

schreib Transfer @entity {
  id: ID!
  Betrag: BigInt
   vom : Account!
  zu: Account!
}
```

## JSON-Typ

Wir unterstützen das Speichern von Daten als JSON-Typ, was eine schnelle Möglichkeit zum Speichern strukturierter Daten darstellt. Wir generieren automatisch entsprechende JSON-Schnittstellen zum Abfragen dieser Daten und sparen Ihnen Zeit beim Definieren und Verwalten von Entitäten.

Wir empfehlen Benutzern, den JSON-Typ in den folgenden Szenarien zu verwenden:
- Das Speichern strukturierter Daten in einem einzelnen Feld ist einfacher zu verwalten als das Erstellen mehrerer separater Entitäten.
- Das Speichern von beliebiger Schlüssel/Wert-Benutzereinstellungen (wobei der Wert boolesch, textuell oder numerisch sein kann und Sie keine separaten Spalten für verschiedene Datentypen haben möchten)
- Das Schema ist flüchtig und ändert sich häufig

### JSON-Direktive definieren
Definieren Sie die Eigenschaft als JSON-Typ, indem Sie die Annotation `jsonField` in der Entität hinzufügen. Dadurch werden automatisch Schnittstellen für alle JSON-Objekte in Ihrem Projekt unter `types/interfaces.ts` generiert, auf die Sie in Ihrer Mapping-Funktion zugreifen können.

Im Gegensatz zur Entität erfordert das jsonField-Direktivenobjekt kein `id`-Feld. Ein JSON-Objekt kann auch mit anderen JSON-Objekten verschachtelt werden.

````graphql
schreib Addresse-Details @jsonField {
  street: String!
  Bezirk: String!
}

schreib ContactCard @jsonField {
  Handy: String!
  Addresse: AddresseDetail # Nested JSON
}

schreib User @entity {
  id: ID! 
  contact: [ContactCard] # Speichern Sie eine Liste von JSON-Objekten
}
````

### Abfragen von JSON-Feldern

Der Nachteil der Verwendung von JSON-Typen ist eine geringfügige Auswirkung auf die Abfrageeffizienz beim Filtern, da es sich bei jeder Textsuche um die gesamte Entität handelt.

Die Auswirkungen sind in unserem Abfrageservice jedoch noch akzeptabel. Hier ist ein Beispiel für die Verwendung des Operators `enthält` in der GraphQL-Abfrage für ein JSON-Feld, um die ersten fünf Benutzer zu finden, die eine Telefonnummer besitzen, die „0064“ enthält.

```graphql
#Um die ersten 5 Benutzer zu finden, enthält die eigene Telefonnummer '0064'.

Anfrage{
   Nutzer(
     zuerst: 5,
     filtern: {
       Kontaktkarte: {
         enthält: [{ Telefon: "0064" }]
     }
}){
     Nodes{
       id
       Kontaktkarte
     }
   }
}
```
