# GraphQL Schema

## Defining Entities

Il file `schema.graphql` definisce i vari GraphQL schemas. A causa del modo in cui funziona il linguaggio di query GraphQL, il file schema determina essenzialmente la forma dei dati dalla Subquery. Per ulteriori informazioni su come scrivere in GraphQL schema language, si consiglia di controllare [Schemas and Types](https://graphql.org/learn/schema/#type-language).

**Importante: quando si apportano modifiche al file dello schema, assicurarsi di rigenerare la directory dei tipi con il seguente comando `yarn codegen`**

### Entities
Ogni entità deve definire i propri campi obbligatori `id` con il tipo di `ID!`. Viene utilizzata come chiave primaria e unica tra tutte le entità dello stesso tipo.

I campi non annullabili nell'entità sono indicati da `!`. Si prega di vedere l'esempio qui sotto:

```graphql
type Example @entity {
  id: ID! Il campo # id è sempre obbligatorio e deve assomigliare a questo
  nome: Stringa! # This is a required field
  address: String # This is an optional field
}
```

### Scalari e tipi supportati

Attualmente supportiamo tipi di scalari fluidi:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Date`
- `Boolean`
- `<EntityName>` per le entità di relazione nidificate, è possibile utilizzare il nome dell'entità definita come uno dei campi. Vedi in [Entity Relationships](#entity-relationships).
- `JSON` può in alternativa memorizzare dati strutturati, vedi [ JSON type](#json-type)
- I tipi `<EnumName>` sono un tipo speciale di scalare enumerato limitato a un particolare insieme di valori consentiti. Please see [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Indexing by non-primary-key field

Per migliorare le prestazioni della query, indicizza un campo entità semplicemente implementando l'annotazione `@index` su un campo non chiave primaria.

Tuttavia, non consentiamo agli utenti di aggiungere annotazioni `@index` su alcun oggetto [JSON](#json-type). Per impostazione predefinita, gli indici vengono aggiunti automaticamente alle chiavi esterne e ai campi JSON nel database, ma solo per migliorare le prestazioni del servizio di query.

Ecco un esempio.

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique can be set to true or false
  title: Title! # Indexes are automatically added to foreign key field 
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
Supponendo di conoscere il nome di questo utente, ma non conosciamo il valore id esatto, invece di estrarre tutti gli utenti e quindi filtrare per nome possiamo aggiungere `@index` dietro il campo del nome. Ciò rende le query molto più veloci e possiamo inoltre passare il `unique: true` per garantire l'unicità.

**Se un campo non è univoco, la dimensione massima del set di risultati è 100**

When code generation is run, this will automatically create a `getByName` under the `User` model, and the foreign key field `title` will create a `getByTitleId` method, which both can directly be accessed in the mapping function.

```sql
/* Prepare a record for title entity */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Handler in mapping function
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // List of all Captains
```

## Entity Relationships

Un'entità ha spesso relazioni nidificate con altre entità. L'impostazione del valore del campo su un altro nome di entità definirà una relazione uno-a-uno tra queste due entità per impostazione predefinita.

Diverse relazioni di entità (uno-a-uno, uno-a-molti e molti-a-molti) possono essere configurate utilizzando gli esempi seguenti.

### One-to-One Relationships

One-to-one le relazioni sono l'impostazione predefinita quando solo una singola entità è mappata a un'altra.

Esempio: un passaporto apparterrà a una sola persona e una persona ha un solo passaporto (in questo esempio):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

or

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

tipo Passport @ entity {
 id: ID!
}
```

### One-to-Many rapporto

È possibile utilizzare parentesi quadre per indicare che un tipo di campo include più entità.

Esempio: una persona può avere più account.

```graphql
type Person @entity {
  id: ID!
  accounts: [Account]! @derivedFrom(field: "person") #This is virtual field 
}

type Account @entity {
  id: ID!
  person: Person!
}
```

### Many-to-Many relationships
È possibile ottenere una relazione molti-a-molti implementando un'entità di mappatura per collegare le altre due entità.

Esempio: ogni persona fa parte di più gruppi (PersonGroup) e i gruppi hanno più persone diverse (PersonGroup).

```graphql
type Person @entity {
  id: ID!
  name: String!
}

type PersonGroup @entity {
  id: ID!
  person: Person!
  Group: Group!
}

type Group @entity {
  id: ID!
  name: String!
}
```

Inoltre, è possibile creare una connessione della stessa entità in più campi dell'entità centrale.

Ad esempio, un account può avere più trasferimenti e ogni trasferimento ha un account di origine e di destinazione.

Ciò stabilirà una relazione bidirezionale tra due Conti (da e verso) tramite la tabella di trasferimento.

```graphql
type Account @entity {
  id: ID!
  publicAddress: String!
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  from: Account!
  to: Account!
}
```

### Reverse Lookups

Per abilitare una ricerca inversa su un'entità a una relazione, allega `@derivedFrom` al campo e punta al suo campo di ricerca inversa di un'altra entità.

Questo crea un campo virtuale sull'entità che può essere interrogato.

Il Trasferimento "da" un Conto è accessibile dall'entità Conto impostando il trasferimento inviato o il trasferimento ricevuto in modo che il loro valore derivi dai rispettivi campi da o verso.

```graphql
type Account @entity {
  id: ID!
  publicAddress: String!
  sentTransfers: [Transfer] @derivedFrom(field: "from")
  receivedTransfers: [Transfer] @derivedFrom(field: "to")
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  from: Account!
  to: Account!
}
```

## JSON type

We are supporting saving data as a JSON type, which is a fast way to store structured data. We'll automatically generate corresponding JSON interfaces for querying this data and save you time defining and managing entities.

Consigliamo agli utenti di utilizzare il tipo JSON nei seguenti scenari:
- Quando l'archiviazione di dati strutturati in un unico campo è più gestibile rispetto alla creazione di più entità separate.
- Salvataggio delle preferenze utente chiave/valore arbitrarie (dove il valore può essere booleano, testuale o numerico e non si desidera avere colonne separate per tipi di dati diversi)
- Lo schema è volatile e cambia frequentemente

### Define JSON directive
Definisci la proprietà come tipo JSON aggiungendo l'annotazione `jsonField` nell'entità. Questo genererà automaticamente interfacce per tutti gli oggetti JSON nel tuo progetto in `types/interfaces.ts` e potrai accedervi nella tua funzione di mappatura.

A differenza dell'entità, l'oggetto direttiva jsonField non richiede alcun campo `id`. Un oggetto JSON è anche in grado di nidificare con altri oggetti JSON.

````graphql
type AddressDetail @jsonField {
  street: String!
  district: String!
}

type ContactCard @jsonField {
  phone: String!
  address: AddressDetail # Nested JSON
}

type User @entity {
  id: ID! 
  contact: [ContactCard] # Store a list of JSON objects
}
````

### Querying JSON fields

Lo svantaggio dell'utilizzo dei tipi JSON è un leggero impatto sull'efficienza della query durante il filtraggio, poiché ogni volta che esegue una ricerca di testo, è sull'intera entità.

Tuttavia, l'impatto è ancora accettabile nel nostro servizio di query. Ecco un esempio di come utilizzare l'operatore `contains` nella query GraphQL su un campo JSON per trovare i primi 5 utenti che possiedono un numero di telefono che contiene '0064'.

```graphql
#Per trovare i primi 5 numeri di telefono degli utenti contiene '0064'.

query{
  user(
    first: 5,
    filter: {
      contactCard: {
        contains: [{ phone: "0064" }]
    }
}){
    nodes{
      id
      contactCard
    }
  }
}
```
