# Project Upgrades

Project upgrades allow you to safely make changes to your project at a specified block height. This is useful when networks perform upgrades, a project updates their contracts or you find a bug.

It's particularly useful when you want to maintain the data of the previous project (e.g. when the previous project takes a long time to index from scratch), and you only want to add a new feature from a specific point in time.

## How it works

When defining a project upgrade, you clone the project manifest (project.ts), and then link it to the original using the new `parent` definition which refers to the historical published project CID.

1. A project already indexed with a CID from publishing via the CLI.
2. Changes to your project have been made. You can refer to the currently deployed version by adding a parent to your `project.ts`:

```ts
{
  parent: {
    // The block height when you will switch from the previous reference project CID to the updated version
    block: 1050,
    // The CID of your existing project that you wish to replace
    reference: "QmXw6FN6eScxvYXYceuCjKMpqmnuCxwY3Cx4HPhDXgUWe5",
  },
}
```

3. When this new project is started, it will index using the previous project CID until it hits the defined block height, to which it will switch to this new upgraded project.
4. If the project has already been indexed and the current indexed block height is greater than the defined block height to switch, it will rewind to the specified block height and start using the new upgraded project.
5. This can be repeated as many times as you wish, if you need to upgrade multiple times you can chain upgrades together.

## Requirements

- In order for this feature to work you need to have [automated historical state tracking](../run_publish/historical.md) enabled in case the project needs to rewind to a block where the upgrade happens.
- If you're running the project yourself you need to specify the `--db-schema` flag otherwise they will default to the CID or directory name.

## Schema Migrations (beta)

`schema-migration` allows you to make updates to your schema, it will work with the project upgrade feature.
When project upgrade is executed, it will compare your current schema with the following schema(the one you are upgrading too), and these changes will be reflected in your database.
If you decide to run from a previous project, it will rewind your schema.

#### Requirements (extending ProjectUpgrades)
- To enable this feature, ensure `--allow-schema-migration` flag is passed when running your project.
- `--unfinalizedBlocks` must be disabled

### Limitations
#### Supported features
- Adding new `entities`
- Removing `entities`
- Adding new `fields` (Only `nullable` fields are supported)
- Removing `fields` (Primary keys `ID` is not supported)
- Index creation and removal
- Updating existing `fields`
  - You will not be able to update non-nullable `field` to nullable
  - How it works:
    - When `field` update is detected, original `field` column will be dropped (along side all data on that column), and a new column will be created with the new `field` types.

#### UnSupported features
- Only supports `postgreSQL`
- New relations
- Enum creation and removal
- Migration is not support if `unfinalizedBlocks` is enabled
- Subscription is currently not supported

This is still currently a beta feature.