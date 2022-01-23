# GraphQL Schema

## Defining Entities

The `schema.graphql` file defines the various GraphQL schemas. A causa del modo in cui funziona il linguaggio di query GraphQL, il file schema determina essenzialmente la forma dei dati dalla Subquery. Per ulteriori informazioni su come scrivere in GraphQL schema language, si consiglia di controllare [Schemas and Types](https://graphql.org/learn/schema/#type-language).

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

Different entity relationships (one-to-one, one-to-many, and many-to-many) can be configured using the examples below.

### One-to-One Relationships

One-to-one le relazioni sono l'impostazione predefinita quando solo una singola entità è mappata a un'altra.

Example: A passport will only belong to one person and a person only has one passport (in this example):

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

You can use square brackets to indicate that a field type includes multiple entities.

Example: A person can have multiple accounts.

```graphql
type Person @entity {
  id: ID!
  accounts: [Account] 
}

type Account @entity {
  id: ID!
  publicAddress: String!
}
```

### Many-to-Many relationships
È possibile ottenere una relazione molti-a-molti implementando un'entità di mappatura per collegare le altre due entità.

Esempio: ogni persona fa parte di più gruppi (PersonGroup) e i gruppi hanno più persone diverse (PersonGroup).

```graphql
type Person @entity {
  id: ID!
  name: String!
  groups: [PersonGroup]
}

type PersonGroup @entity {
  id: ID!
  person: Person!
  Group: Group!
}

type Group @entity {
  id: ID!
  name: String!
  persons: [PersonGroup]
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

To enable a reverse lookup on an entity to a relation, attach `@derivedFrom` to the field and point to its reverse lookup field of another entity.

This creates a virtual field on the entity that can be queried.

The Transfer "from" an Account is accessible from the Account entity by setting the sentTransfer or receivedTransfer as having their value derived from the respective from or to fields.

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

We recommend users use the JSON type in the following scenarios:
- When storing structured data in a single field is more manageable than creating multiple separate entities.
- Saving arbitrary key/value user preferences (where the value can be boolean, textual, or numeric, and you don't want to have separate columns for different data types)
- The schema is volatile and changes frequently

### Define JSON directive
Define the property as a JSON type by adding the `jsonField` annotation in the entity. This will automatically generate interfaces for all JSON objects in your project under `types/interfaces.ts`, and you can access them in your mapping function.

Unlike the entity, the jsonField directive object does not require any `id` field. A JSON object is also able to nest with other JSON objects.

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

The drawback of using JSON types is a slight impact on query efficiency when filtering, as each time it performs a text search, it is on the entire entity.

However, the impact is still acceptable in our query service. Here is an example of how to use the `contains` operator in the GraphQL query on a JSON field to find the first 5 users who own a phone number that contains '0064'.

```graphql
#To find the the first 5 users own phone numbers contains '0064'.

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
