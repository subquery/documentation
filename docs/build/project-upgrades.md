# Project Upgrades & Schema Migrations

Project upgrades allow you to safely make changes to your project at a specified block height. This is useful when you want to better manage the changes that happen to your SubQuery project networks in a deterministic way, for example:

- Perform upgrades to your project at a specific height
- Change the GraphQL/database schema
- Support changes or new deployments to smart contracts
- When you find a bug, but want to maintain previous data for backwards compatiability

It's particularly useful when you want to maintain the data of the previous project (e.g. when the previous project takes a long time to index from scratch), and you only want to add a new feature from a specific point in time.

Some other projects call this feature "Project Grafting".

## Requirements

- In order for this feature to work you need to have [automated historical state tracking](../run_publish/historical.md) enabled in case the project needs to rewind to a block where the upgrade happens.
- If you're running the project yourself you need to specify the `--db-schema` flag otherwise they will default to the CID or directory name.

## How it works

When defining a project upgrade, you clone the project manifest (`project.ts`), and then link it to the original using the new `parent` object which refers to the published project CID of the previous version.

```ts
{
  parent: {
    // The block height the parent project will run until before switching to the current project.
    // `block` is also supported but deprectated, it behaves as an alias for `untilBlock`
    untilBlock: 1050,
    // The CID of your existing project that you wish to replace
    reference: "QmXw6FN6eScxvYXYceuCjKMpqmnuCxwY3Cx4HPhDXgUWe5",
  },
}
```

When this new project is started, it will index using the previous project CID until it hits the defined block height, to which it will switch to this new upgraded project.

If the project has already been indexed and the current indexed block height is greater than the defined block height to switch, it will [rewind to the specified block height](../run_publish/historical.md#reindexing-with-historical-data) and start using the new upgraded project. For example, if the data in the current store for the above example is indexed to block `1232`, then it will rewind the store to `1050`, and then continue indexing with this new version.

This can be repeated as many times as you wish, if you need to upgrade multiple times you can chain upgrades together through different project versions.

## Schema Migrations

:::info
This feature is still in beta
:::

Schema migrations allow you to make updates to your GraphQL schema, and the database tables, during the middle of indexing at a specific block height.

When a project upgrade is executed with valid schema migrations, it will compare your current schema with the schema provided in the latest version (the one you are upgrading too), and attempt to make non-destructive changes your database.

::: warning
If you re-run a previous version of you project accidentally, SubQuery will attempt to downgrade changes to your schema.
:::

### Schema Migration Requirements

These are in addition to [Project Upgrade requirements](#requirements):

- To enable this feature, ensure that `--allow-schema-migration` flag is passed when running your project.
- `--unfinalizedBlocks` must be disabled (for beta)

### Supported Migrations

Supported migrations:

- Adding new entities
- Removing entities (this is destructive)
- Adding new fields (however only [nullable fields](./graphql.md#entities) are supported)
- Removing fields (primary key `ID` can't be removed)
- Index creation and removal
- Updating existing fields (this is destructive)
  - You can not update a [non-nullable fields](./graphql.md#entities) field to nullable
  - Please note: When field update is detected, the original field column will be dropped (with all existing data in that field), and a new column will be created with the new field types.

Other notes:

- Only supports PostgreSQL stores
- Does not support adding new [foreign key relations](./graphql.md#entity-relationships)
- Does not support enum creation or removal
- Migrations will not succeed `--unfinalizedBlocks` is enabled
- [GraphQL subscriptions](../run_publish/subscription.md) are not supported
- [Rewind](../run_publish/historical.md) will only be supported if the new schema does not drop any `fields` or `entity`. Note that [automated historical state tracking](../run_publish/historical.md) must be enabled to support rewind.
