# Project Upgrades

Project upgrades allow you to safely make changes to your project at a specified block height. This is useful when networks perform upgrades, a project updates their contracts or you find a bug.

It's particularly useful when you want to maintain the data of the previous project (e.g. when the previous project takes a long time to index from scratch), and you only want to add a new feature from a specific point in time.

## How it works

When defining a project upgrade, you clone the project manifest (project.yaml), and then link it to the original using the new `parent` definition which refers to the historical published project CID.

1. A project already indexed with a CID from publishing via the CLI.
2. Changes to your project have been made. You can refer to the currently deployed version by adding a parent to your `project.yaml`:

```yaml
...
parent:
  # The block height when you will switch from the previous reference project CID to the updated version
  block: 1050
  # The CID of your existing project that you wish to replace
  reference: QmXw6FN6eScxvYXYceuCjKMpqmnuCxwY3Cx4HPhDXgUWe5
  ...
```

3. When this new project is started, it will index using the previous project CID until it hits the defined block height, to which it will switch to this new upgraded project.
4. If the project has already been indexed and the current indexed block height is greater than the defined block height to switch, it will rewind to the specified block height and start using the new upgraded project.
5. This can be repeated as many times as you wish, if you need to upgrade multiple times you can chain upgrades together.

## Requirements

- In order for this feature to work you need to have [automated historical state tracking](../run_publish/historical.md) enabled in case the project needs to rewind to a block where the upgrade happens.
- If you're running the project yourself you need to specify the `--db-schema` flag otherwise they will default to the CID or directory name.
