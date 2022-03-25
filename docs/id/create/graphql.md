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
}
```

### Hubungan Satu ke Banyak

Anda bisa menggunakan tanda kurung siku untuk mengindikasikan bahwa sebuah jenis bidang menyertakan beberapa entitas.

Contoh: Seseorang bisa memiliki beberapa akun.

```graphql
type Person @entity {
  id: ID!
  accounts: [Account]! @derivedFrom(field: "person") #Ini bidang virtual
}

type Account @entity {
  id: ID!
  person: Person!
}
```

### Hubungan Banyak ke Banyak
Hubungan banyak ke banyak bisa diraih dengan mengimplementasikan entitas pemetaan untuk menghubungkan dua entitas lainnya.

Contoh: Setiap orang merupakan bagian dari beberapa kelompok (PersonGroup) dan kelompok memiliki beberapa orang berbeda (PersonGroup).

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

Memungkinkan juga halnya untuk membuat koneksi entitas yang sama di beberapa field entitas tengah.

Contohnya, sebuah akun bisa memiliki beberapa transfer, dan masing-masing transfer memiliki sumber dan akun tujuan.

Ini akan mendasarkan hubungan dua arah antara dua Akun (dari dan ke) melalui tabel Transfer.

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

### Pencarian Terbalik

Untuk mengaktfikan pencarian terbalik di sebuah entitas ke hubungan, lampirkan `@derivedFrom` ke field dan tunjuk ke field pencarian terbaliknya di entitas lain.

Ini menciptakan bidang virtual pada entitas yang bisa dikuerikan.

Transfer "dari" sebuah Akun bisa diakses dari entitas Akun dengan mengatur sentTransfer atau receivedTransfer dari field dari atau ke.

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

## Jenis JSON

Kami mendukung penyimpanan data sebagai jenis JSON, yang merupakan cara cepat untuk menyimpan data terstruktur. Kami akan secara otomatis menghasilkan antarmuka JSON yang berkaitan untuk mengkueri data ini dan menghemat waktu Anda menentukan dan mengatur entitas.

Kami menyarankan pengguna menggunakan jenis JSON di skenario berikut:
- Saat menyimpan data terstruktur di satu field lebih bisa diatur daripada membuat beberapa entitas berbeda.
- Menyimpan kunci yang berubah-ubah/preferensi nilai pengguna (di mana nilai bisa menjadi boolean, tekstual, atau numerik, dan Anda tidak ingin memiliki kolom terpisah untuk jenis data berbeda)
- Skema ini tidak stabil dan sering berubah

### Menentukan direktif JSON
Menentukan properti sebagai jenis JSON dengan menambahkan anotasi `jsonField` di entitas. Ini akan secara otomatis menghasilkan antarmuka untuk semua obyek JSON di proyek Anda di bawah `types/interfaces.ts`, dan Anda bisa mengaksesnya di fungsi pemetaan Anda.

Tidak seperti entitas, obyek direktif jsonField tidak memerlukan bidang `id` apa pun. Obyek JSON juga bisa bersarang dengan obyek JSON lainnya.

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

### Mengkueri field JSON

Kekurangan menggunakan jenis JSON adalah dampak sekilas pada efisiensi kueri saat memfilter, karena setiap kali melakukan pencarian teks, begitu pula di seluruh entitas.

Akan tetapi, dampaknya masih bisa diterima di layanan kueri kami. Berikut sebuah contoh cara menggunakan operator `contains` di kueri GraphQL pada field JSON untuk mencari 5 pengguna pertama yang memiliki nomor telepon yang mengandung '0064'.

```graphql
#Untuk mencari 5 pengguna pertama yang memiliki nomor telepon yang mengandung '0064'.

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
