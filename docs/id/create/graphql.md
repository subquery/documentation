# Skema GraphQL

## Mendefinisikan Entitas

File `schema.graphql` mendefinisikan berbagai skema GraphQL. Karena cara kerja bahasa kueri GraphQL, file skema pada dasarnya menentukan bentuk data Anda dari SubQuery. Untuk mempelajari lebih lanjut tentang cara menulis dalam bahasa skema GraphQL, sebaiknya periksa [Skema dan Type](https://graphql.org/learn/schema/#type-language).

**Penting: Saat Anda membuat perubahan apa pun pada file skema, harap pastikan bahwa Anda membuat ulang direktori jenis Anda dengan perintah berikut `yarn codegen`**

### Entitas
Setiap entitas harus menentukan bidang wajib `id` dengan jenis `ID!`. Ini digunakan sebagai kunci utama dan unik di antara semua entitas dengan tipe yang sama.

Bidang yang non-nullable dalam entitas ditunjukkan dengan `!`. Silakan lihat contoh di bawah ini:

```graphql
type Example @entity {
  id: ID! # id field selalu diperlukan dan harus terlihat seperti ini
  name: String! # Ini adalah field yang harus diisi
  address: String # Ini adalah field opsional
}
```

### Skalar dan jenis yang didukung

Saat ini kami mendukung jenis skalar mengalir:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Date`
- `Boolean`
- `<EntityName>` untuk entitas nested relationship, Anda dapat menggunakan nama entitas yang ditentukan sebagai salah satu field. Mohon lihat di [Hubungan Entitas](#entity-relationships).
- `JSON` secara alternatif bisa menyimpan data yang terstruktur, mohon lihat [jenis JSON](#json-type)
- Jenis `<EnumName>` adalah jenis skalar enumerasi khusus yang dibatasi pada kumpulan nilai tertentu yang diizinkan. Silakan lihat [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Mengindeks berdasarkan field non-primary-key

Untuk meningkatkan performa kueri, indeks bidang entitas dengan mengimplementasikan anotasi `@index` di field non-primary-key.

Namun, kami tidak mengizinkan pengguna untuk menambahkan anotasi `@index` pada objek [JSON](#json-type) apa pun. Secara default, indeks secara otomatis ditambahkan ke foreign keys dan untuk bidang JSON dalam database, tetapi hanya untuk meningkatkan kinerja layanan kueri.

Berikut ini contohnya.

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique bisa diatur menjadi true atau false
  title: Title! # Indeks secara otomatis ditambahkan ke field foreign key
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
Berasumsi kita mengetahui nama pengguna ini, tetapi kita tidak mengetahui nilai id persisnya, daripada mengekstrak semua pengguna dan kemudian memfilter berdasarkan nama kita bisa menambahkan `@index`di belakang bidang nama. Ini menjadikan kueri jauh lebih cepat dan kita bisa dengan tambahan melewati `unique: true`untuk memastikan keunikan.

**Jika sebuah field tidak unik, ukuran hasil maksimalnya adalah 100**

Ketika pembuatan kode dijalankan, ini akan secara otomatis membuat `getByName` di bawah model `User`, dan field foreign key `title` akan membuat method ` getByTitleId`, yang keduanya dapat langsung diakses dalam fungsi pemetaan.

```sql
/* Persiapkan catatan untuk entitas judul */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Handler dalam fungsi mapping
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // List of all Captains
```

## Hubungan Entitas

Entitas sering kali memiliki nested relationship dengan entitas lain. Mengatur nilai field ke nama entitas lain akan menentukan hubungan satu per satu di antara dua entitas ini secara default.

Hubungan entitas berbeda (satu per satu, satu ke banyak, dan banyak ke banyak) bisa dikonfigurasikan menggunakan contoh di bawah ini.

### Hubungan Satu ke Satu

Hubungan satu ke satu adalah hubungan default saat hanya satu entitas yang dipetakan.

Contoh: Sebuah paspor hanya milik satu orang saja dan satu orang hanya memiliki satu paspor (dalam contoh ini):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

atau

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

### Hubungan Satu ke Banyak

Anda bisa menggunakan tanda kurung siku untuk mengindikasikan bahwa sebuah jenis bidang menyertakan beberapa entitas.

Contoh: Seseorang bisa memiliki beberapa akun.

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

### Hubungan Banyak ke Banyak
Hubungan banyak ke banyak bisa diraih dengan mengimplementasikan entitas pemetaan untuk menghubungkan dua entitas lainnya.

Contoh: Setiap orang merupakan bagian dari beberapa kelompok (PersonGroup) dan kelompok memiliki beberapa orang berbeda (PersonGroup).

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

Also, it is possible to create a connection of the same entity in multiple fields of the middle entity.

For example, an account can have multiple transfers, and each transfer has a source and destination account.

This will establish a bi-directional relationship between two Accounts (from and to) through Transfer table.

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
