## Bypass Blocks

Bypass Blocks allows you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```ts
{
  network: {
    bypassBlocks: [1, 2, 3, "105-200", 290];
  }
}
```
