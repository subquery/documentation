# Multi-Chain Support

- We support indexing multiple networks into to the same database schema. 

- This is useful if you want to gather data from multiple network together in one place. For example capturing transaction data from seperate network (like kusama and polkadot) or capturing xcm data.

## Notes about this feature:
- It will create multiple metadata tables which you can query using the chainId of the particular subquery project [see below](/build/multi-chain.html#querying)
- You need to run multiple subql/node instances for each project you are indexing
- The flag --multi-chain must be enabled from the start of indexing and for all projects. 
- All multi-chain projects must point to the same schema using `--db-schema=SCHEMA_NAME`

::: info Note
This feature is not compatible with Historical State and it will be disabled if --multi-chain is used. 
:::

## Example Project

The repo for the example can be found [here](https://github.com/subquery/multi-networks-transfers)

- This repository contains multiple manifest files which must be indexed with a seperate nodes for now.
- A modified docker-compose.yaml file has been included two subql/node images, one for each network being indexed.
- You will notice that that each image maps to a seperate project.yaml file.

This multi-chain project can be started regularly by following the [readme](https://github.com/subquery/multi-networks-transfers/blob/main/README.md#configure-your-project)

Alternatively you can start the node via your terminal [reference](/run_publish/references.html#multi-chain)

### Querying 

To query metadata when multi-chain indexing you must pass the chainId (included in project.yaml) as shown below:

``` gql
  query {
    _metadata(chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'){
      lastProcessedHeight
      targetHeight
    }
  }
```


