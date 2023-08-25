# Project Upgrades

Project upgrades allow you to safely make changes to your project at a specified height. This is useful when networks perform upgrades, a project updates their contracts or you find a bug.

## How it works

1. A project already indexed with a CID from publishing via the CLI.
2. Changes to your project have been made. You can refer to the currently deployed version by adding a parent to your `project.yaml`:
```yaml

parent:
  # The block that will switch from the reference project to the updated version
  block: 1050
  # The CID of your existing project that you wish
  reference: QmXw6FN6eScxvYXYceuCjKMpqmnuCxwY3Cx4HPhDXgUWe5
```
3. When this new project it will either rewind to the specified block height and start using the new project or it will keep indexing with the parent project until it reaches the specified block then it will swithc to the new project.
4. This can be repeated, if you need to upgrade multiple times you can chain upgrades together.


## Requirements

* In order for this feature to work you need to have historical indexing enabled in case the project needs to rewind to a block where the upgrade happens.
* If you're running the project yourself you need to specify the `--db-schema` flag otherwise they will default to the CID or directory name.


