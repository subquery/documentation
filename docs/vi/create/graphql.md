# Lược đồ GraphQL

## Xác định các thực thể

` schema.graphql ` xác định các kiểu lược đồ ( hay còn gọi là schema) GraphQL khác nhau. Do cách thức hoạt động của ngôn ngữ truy vấn GraphQL, về căn bản thì lược đồ (schema) sẽ chỉ ra dạng dữ liệu của bạn từ SubQuery. Để tìm hiểu thêm về cách code bằng ngôn ngữ lược đồ GraphQL, chúng tôi khuyên bạn nên xem [Schemas and Types](https://graphql.org/learn/schema/#type-language).

**Chú ý: Khi thực hiện bất kỳ thay đổi nào đối với tệp schema, bạn phải tạo thư mục types của mình bằng lệnh `yarn codegen`**

### Các thực thể
Mỗi thực thể phải định nghĩa các trường bắt buộc `id` với kiểu `ID!`. Nó được sử dụng làm khóa chính và là độc nhất trong số tất cả các thực thể cùng loại.

Các trường không thể để trống trong thực thể được biểu thị bằng `!`. Xem ví dụ dưới đây để rõ hơn:

```graphql
type Example @entity {
  id: ID! # trường id luôn là bắt buộc và phải trông như thế này 
  name: String! # Đây là một trường bắt buộc
  address: String # Đây là một trường tùy chọn 
}
```

### Các kiểu dữ liệu vô hướng và các kiểu types được SubQuery hỗ trợ:

Hiện tại, SubQuery hỗ trợ các kiểu dữ liệu sau:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Date`
- `Boolean`
- `<EntityName>` đối với các thực thể quan hệ lồng nhau, bạn có thể sử dụng tên của thực thể đã được định nghĩa làm một trong các trường. Vui lòng xem trong [Liên hệ giữa các thực thể](#entity-relationships).
- `JSON` có thể lưu trữ dữ liệu có cấu trúc theo cách khác, vui lòng xem [kiểu dữ liệu JSON](#json-type)
- Các kiểu `<EnumName>` là một kiểu dữ liệu vô hướng được liệt kê đặc biệt, giới hạn trong một tập các giá trị được cho phép. Vui lòng xem [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Lập chỉ mục theo trường không phải khóa chính

Để cải thiện hiệu suất truy vấn, chỉ cần lập chỉ mục trường thực thể bằng cách thêm chú thích `@index` trên trường không phải khóa chính.

Tuy nhiên, chúng tôi không cho phép người dùng thêm chú thích `@index` trên bất kỳ đối tượng [JSON](#json-type) nào. Mặc định: các chỉ mục được tự động thêm vào khóa ngoại (foreign key) và cho các trường JSON trong cơ sở dữ liệu, nhưng chỉ để nâng cao hiệu suất truy vấn.

Đây là một ví dụ.

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # biến độc nhất, có thể được đặt thành true hoặc false 
  title: Title! # Chỉ mục được tự động thêm vào trường khóa ngoại (foreign key)
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
Giả sử chúng tôi biết tên của người dùng này, nhưng chúng tôi không biết giá trị id chính xác, thay vì trích xuất tất cả người dùng và sau đó lọc theo tên, chúng tôi có thể thêm `@index` vào phía sau trường tên. Điều này làm cho việc truy vấn nhanh hơn nhiều và chúng tôi cũng có thể chuyển `unique: true` để đảm bảo tính độc nhất.

**Nếu một trường không phải là duy nhất, kích thước danh sách kết quả tối đa là 100**

Khi quá trình tạo mã được chạy, thao tác này sẽ tự động tạo `getByName` theo cấu trúc của `User` và trường khóa ngoại `title` sẽ tạo phương thức `getByTitleId`, mà cả hai đều có thể được truy cập trực tiếp trong chức năng ánh xạ.

```sql
/* Chuẩn bị bản ghi cho thực thể title */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Xử lý trong hàm ánh xạ
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // Danh sách tất cả các Captain
```

## Các mối quan hệ thực thể

Một thực thể thường có các mối quan hệ lồng nhau với các thực thể khác. Đặt giá trị trường thành một tên thực thể khác sẽ mặc định xác định mối quan hệ một-một giữa hai thực thể này.

Các mối quan hệ thực thể khác nhau (một-một, một-nhiều và nhiều-nhiều) có thể được cấu hình bằng cách sử dụng các ví dụ bên dưới.

### Mối quan hệ một-một

Mối quan hệ một-một là mặc định khi chỉ một thực thể duy nhất được ánh xạ tới một thực thể khác.

Ví dụ: Một hộ chiếu (passport) sẽ chỉ thuộc về một người (person) và một người (person) chỉ có thể có một hộ chiếu (passport) (trong ví dụ dưới đây):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

hoặc

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

type Passport @entity {
  id: ID!
}
```

### Mối quan hệ một-nhiều

Bạn có thể sử dụng dấu ngoặc vuông để xác định một kiểu trường bao gồm nhiều thực thể.

Ví dụ: Một người (Person) có thể có nhiều tài khoản (accounts).

```graphql
type Person @entity {
  id: ID!
  accounts: [Account] @derivedFrom(field: "publicAddress") #This is virtual field 
}

type Account @entity {
  id: ID!
  publicAddress: String! #This will create a field point to the fk `publicAddress_id`
}
```

### Mối quan hệ nhiều-nhiều
Có thể triển khai một mối quan hệ nhiều - nhiều bằng cách triển khai một thực thể ánh xạ để kết nối hai thực thể.

Ví dụ: Mỗi người (person) là một thành viên của nhiều nhóm (PersonGroup) và nhiều nhóm (groups) có nhiều người khác nhau (PersonGroup).

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

Ngoài ra, có thể tạo kết nối của cùng một thực thể trong nhiều trường của thực thể ở giữa.

Ví dụ: một tài khoản có thể có nhiều lần chuyển tiền và mỗi lần chuyển có một tài khoản nguồn và tài khoản đích.

Điều này sẽ thiết lập mối quan hệ hai chiều giữa hai Tài khoản (đi và đến) thông qua bảng Chuyển khoản.

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

### Tra cứu ngược

Để kích hoạt tra cứu ngược đối với một thực thể theo một mối quan hệ, hãy đính kèm `@derivedFrom` vào trường và trỏ đến trường tra cứu ngược của thực thể khác.

Điều này tạo ra một trường ảo (trên thực thể) có thể truy vấn.

Có thể truy cập được Lệnh Chuyển (Transfer) "từ"("from") thực thể Tài khoản bằng cách đặt sentTransfer hoặc receivedTransfer mang giá trị của chúng bắt nguồn từ các trường "từ"("from") hoặc "đến"("to") tương ứng.

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

## Kiểu dữ liệu JSON

Chúng tôi đang hỗ trợ lưu dữ liệu dưới dạng JSON, đây là một cách nhanh chóng để lưu trữ dữ liệu có cấu trúc. Chúng tôi sẽ tự động tạo các giao diện JSON tương ứng để truy vấn dữ liệu này và giúp bạn tiết kiệm thời gian xác định và quản lý các thực thể.

Chúng tôi khuyên người dùng sử dụng kiểu dữ liệu JSON trong các trường hợp sau:
- Khi lưu trữ dữ liệu có cấu trúc trong một trường sẽ dễ quản lý hơn so với việc tạo nhiều thực thể riêng biệt.
- Lưu khóa tùy chọn/giá trị tùy ý của người dùng (trong đó giá trị có thể là boolean, văn bản hoặc số, và bạn không muốn có các cột riêng biệt cho các kiểu dữ liệu khác nhau)
- Lược đồ dễ thay đổi và thay đổi thường xuyên

### Định nghĩa theo JSON
Định nghĩa thuộc tính dưới dạng JSON bằng cách thêm chú thích `jsonField` trong thực thể. Thao tác này sẽ tự động tạo giao diện cho tất cả các đối tượng JSON trong dự án của bạn dưới `type/interface.ts` và bạn có thể truy cập chúng trong hàm ánh xạ của mình.

Không giống như thực thể, đối tượng chỉ thị jsonField không yêu cầu bất kỳ trường `id` nào. Một đối tượng JSON cũng có thể lồng ghép với các đối tượng JSON khác.

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

### Truy vấn các trường JSON

Hạn chế của việc sử dụng các kiểu JSON là ảnh hưởng đến tính hiệu quả của truy vấn khi lọc, vì mỗi lần thực hiện tìm kiếm văn bản, nó sẽ tìm trên toàn bộ thực thể.

Tuy nhiên, sự hạn chế  đó là không đáng kể, và vẫn có thể chấp nhận được trong dịch vụ truy vấn của chúng tôi. Dưới đây là ví dụ về cách sử dụng toán tử `contains` trong truy vấn GraphQL trên trường JSON để tìm 5 người dùng đầu tiên sở hữu số điện thoại có chứa '0064'.

```graphql
# Để tìm 5 số điện thoại của người dùng đầu tiên có chứa '0064'.

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
