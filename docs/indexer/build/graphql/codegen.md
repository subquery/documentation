# Code Generation

SubQuery automatically generates TypeScript types and interfaces from your GraphQL schema to provide type safety and better development experience in your mapping functions.

## Running Code Generation

When you make any changes to the schema file, you need to regenerate your types directory to ensure your mapping functions have access to the latest entity definitions.

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

@tab pnpm

```shell
pnpm codegen
```

:::

::: warning Important
When you make any changes to the schema file, don't forget to regenerate your types directory. This is essential for maintaining type safety in your mappings.
:::

## Generated Files Structure

After running codegen, the following files and directories are created:

```
src/types/
├── index.ts              # Main export file
├── models/               # Entity models
│   ├── index.ts
│   ├── User.ts
│   ├── Post.ts
│   └── ...
└── interfaces.ts         # JSON field interfaces (if using @jsonField)
```

## Generated Entity Models

Each entity defined in your `schema.graphql` is converted into a TypeScript class with methods for database operations.

### Basic Entity Example

Given this GraphQL schema:

```graphql
type User @entity {
  id: ID!
  name: String!
  email: String @index(unique: true)
  isActive: Boolean
  createdDate: Date
}
```

The generated `User.ts` will include:

```ts
export class User extends Entity {
  constructor(id: string) {
    super()
    this.id = id
  }

  public id!: string
  public name!: string
  public email?: string
  public isActive?: boolean
  public createdDate?: Date

  // Generated getter methods for indexed fields
  static async getByEmail(email: string): Promise<User | undefined> {
    // Implementation
  }

  // Standard CRUD methods
  async save(): Promise<void> {
    // Implementation
  }

  static async get(id: string): Promise<User | undefined> {
    // Implementation
  }

  static async remove(id: string): Promise<void> {
    // Implementation
  }
}
```

## Using Generated Types

Import and use the generated types in your mapping functions:

```ts
import { User, Post } from "../types"

export async function handleSomeEvent(event: SomeEventType): Promise<void> {
  // Create a new entity
  const user = User.create({
    id: event.args.userId.toString(),
    name: event.args.name,
    email: event.args.email,
    isActive: true,
    createdDate: new Date()
  })

  // Save to store
  await user.save()

  // Query existing entity
  const existingUser = await User.get(userId)
  if (existingUser) {
    existingUser.isActive = false
    await existingUser.save()
  }
}
```

## Generated Query Methods

Based on your schema indexes, SubQuery generates convenient query methods:

### Standard Index Queries

For fields with `@index`:

```graphql
type User @entity {
  id: ID!
  email: String! @index(unique: true)
  status: String! @index
}
```

Generated methods:

```ts
// For unique indexes
const user = await User.getByEmail("user@example.com")

// For non-unique indexes (returns array)
const activeUsers = await User.getByStatus("active") // Returns User[]
```

### Foreign Key Queries

For relationship fields:

```graphql
type Post @entity {
  id: ID!
  author: User! # Foreign key
  title: String!
}
```

Generated method:

```ts
// Query posts by author ID
const userPosts = await Post.getByAuthorId(userId) // Returns Post[]
```

### Composite Index Queries

For composite indexes:

```graphql
type Transfer @entity @compositeIndexes(fields: [["blockNumber", "from"]]) {
  id: ID!
  blockNumber: BigInt
  from: Account!
  to: Account!
}
```

Generated method:

```ts
// Query by composite index
const transfers = await Transfer.getByBlockNumberAndFromId(blockNumber, fromId)
```

## JSON Field Interfaces

When using `@jsonField` directive, SubQuery generates TypeScript interfaces:

```graphql
type ContactInfo @jsonField {
  phone: String!
  email: String
  address: Address
}

type Address @jsonField {
  street: String!
  city: String!
  country: String!
}

type User @entity {
  id: ID!
  contact: ContactInfo
}
```

Generated interfaces in `types/interfaces.ts`:

```ts
export interface ContactInfo {
  phone: string
  email?: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  country: string
}
```

Usage in mappings:

```ts
import { User } from "../types"
import { ContactInfo } from "../types/interfaces"

const contactInfo: ContactInfo = {
  phone: "+1234567890",
  email: "user@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA"
  }
}

const user = User.create({
  id: "user1",
  contact: contactInfo
})
```

## Type Safety Features

The generated types provide several type safety features:

### Required vs Optional Fields

Fields marked with `!` in GraphQL become required in TypeScript:

```graphql
type User @entity {
  id: ID!           # Required: string
  name: String!     # Required: string  
  email: String     # Optional: string | undefined
}
```

### BigInt Handling

GraphQL `BigInt` fields are properly typed:

```ts
// In entity
public balance!: bigint

// Usage
user.balance = BigInt("1000000000000000000") // 1 ETH in wei
```

### Date Handling

GraphQL `Date` fields are converted to JavaScript `Date` objects:

```ts
// In entity  
public createdAt?: Date

// Usage
user.createdAt = new Date()
```

### Enum Support

GraphQL enums are converted to TypeScript enums:

```graphql
enum Status {
  ACTIVE
  INACTIVE
  PENDING
}

type User @entity {
  id: ID!
  status: Status!
}
```

Generated enum:

```ts
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE", 
  PENDING = "PENDING"
}
```

## Best Practices

### 1. Run Codegen After Schema Changes
Always run codegen after modifying your schema to keep types in sync.

### 2. Use Generated Types
Always import and use generated types instead of creating your own interfaces.

### 3. Leverage Type Safety
Use TypeScript's type checking to catch errors at compile time:

```ts
// Good - uses generated types
const user = User.create({
  id: "1",
  name: "John",
  email: "john@example.com"
})

// Bad - bypasses type safety
const user = new User("1")
user["unknownField"] = "value" // TypeScript error
```

### 4. Handle Optional Fields
Always check for undefined values on optional fields:

```ts
const user = await User.get(id)
if (user && user.email) {
  // Safe to use user.email
  logger.info(`User email: ${user.email}`)
}
```

## Troubleshooting

### Common Issues

1. **Types not found after codegen**
   - Ensure you're importing from the correct path: `../types`
   - Check that codegen completed without errors

2. **Property doesn't exist on type**
   - Run codegen again after schema changes
   - Check field names match exactly between schema and usage

3. **Cannot find module '../types'**
   - Run codegen to generate the types directory
   - Ensure your build process includes the generated files

### Debugging Codegen Issues

Enable verbose logging:

```bash
npx subql codegen --debug
```

Check generated files:

```bash
ls -la src/types/
cat src/types/models/YourEntity.ts
```