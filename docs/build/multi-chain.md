# Multi-Chain Support

- We support indexing multiple networks into to the same database schema. 

- This is useful if you want to gather data from multiple network together in one place. For example capturing transaction data from multple networks (like kusama and polkadot) or capturing xcm data.

## Notes about this feature:
- It will create multiple metadata tables which you can query using the chainId of the particular subquery project [see below](/build/multi-chain.html#querying-metadata)
- You need to run multiple subql/node instances for each project you are indexing
- The flag --multi-chain must be enabled from the start of indexing and for all projects. If you forget to do this you will need to clear the DB schema, the  [--force-clean](/run_publish/references.html#force-clean) sub command can help with this.
- All multi-chain projects must point to the same schema using `--db-schema=SCHEMA_NAME`

::: info Note
This feature is not compatible with Historical State and will be disabled if --multi-chain is used. 
:::

## Example Project

The repository for this example can be found [here](https://github.com/subquery/multi-networks-transfers)

- This repository contains multiple manifest files which must be indexed with a seperate nodes for now.
- A modified docker-compose.yaml file has been included, with two subql/node images, one for each network being indexed.
- You will notice that that each image maps to a seperate project.yaml file.

This multi-chain project can be started as regular by following the [readme](https://github.com/subquery/multi-networks-transfers/blob/main/README.md#configure-your-project)

Alternatively you can start the node via the [cli](/run_publish/references.html#multi-chain) but a database must be running.

## Tips

- When writing your mapping handlers you need to account for possible colliding id's. If you think there could be an issue you can prefix your id with the network name.

**For example:**

``` ts
const transfer = new Transfer(`${NETWORK}-${event.block.block.header.number.toNumber()}-${event.idx}`);
...
await transfer.save();
```

- It is also helpful to include a column of the network so you can filter like below:

``` graphql
query {
  transfers(filter: {network: { equalTo: "polkadot"}}) {
    nodes {
      id
      blockNumber
      network
      amount
    }
  } 
}
```

#### Querying Metadata

When querying metadata using this feature you need to pass the chainId (included in project.yaml) as shown below:

``` graphql
  query {
    _metadata(chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'){
      lastProcessedHeight
      targetHeight
    }
  }
```
