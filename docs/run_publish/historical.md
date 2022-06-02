# Index and Query historical data

## Background


We know that the Subquery index always targets the latest finalized block on the network,  and a new block is continuously generated. Therefore, the data in the items in the subquery also repeatedly changes.

We can consider each block represents a state of time. The data will base on the user schema structure and can only explain the results at the current indexing block height. For example, we are currently indexing to block 100. Therefore, the data in the database can only represent the results at the timestamp of block 100.

Then we are faced with a problem. Assuming the data has changed when indexing to block 200, how can we query the data when the block is 100. It is barely impossible and will create a lot of redundant data. 

## The solution

Now SubQuery provide a solution to enable user record and query historical data with block height.

How we did it? When store operation（insert，update, delete) happened, instead of change original record, we append an additional record with specific `_block_range`.

This will allow user to query data will specify block height find it corresponding record in the table.

***Example schema***:

<img src="/assets/img/historical_data.png" alt="drawing" width="600"/>

## How to use it

It only requires enable this feature at beginning of indexing project, you ***DO NOT*** need any modification to your current project.

### Support Version

| Field            | version | 
|------------------|---------|
| **@subql/node**  | v1.1.1  | 
| **@subql/query** | v1.1.0  | 


### Local testing environment

You can set this flag to `false`:

```
subql-node -f <project-path> --disable-historical=false
```

When indexing successful started, you should see a message ***"Historical state is enabled"***


### Query historical data

Please see one of our example: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical)

To query the first 5 NFT collections at block height 5000000

```graphql

query {
    collectionEntities (first: 5, blockHeight: "5000000") {
        nodes {
            version
            name
            currentOwner
        }
    }
}

```

Then query the first 5 NFT collections at block height 5238224


```graphql

query {
    collectionEntities (first: 5, blockHeight: "5238224") {
        nodes {
            version
            name
            currentOwner
        }
    }
}

```

You can see the different between these two query results. 
