::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

This action will generate a new directory (or update the existing one) named `src/types`. Inside this directory, you will find automatically generated entity classes corresponding to each type defined in your `schema.graphql`. These classes facilitate type-safe operations for loading, reading, and writing entity fields. You can learn more about this process in [the GraphQL Schema section](../../build/graphql).
