# Lesson 5: Explaining Reliationships in SubQuery

This lesson explores entities relationships in SubQuery. 

In this lesson we will create `many-to-many` relationships and update `Transaction` entity and create `Account` entity. It would require regenerating associated typescript with `yarn codegen` and updating `mappingHandlers.ts` file by changing the `handleFrontierEvmEvent()` function.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/i9z1tAlmyP0" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: tip Note
In this lesson we will alter the code for the last time. 
:::

Find out more about [data reliationships in SubQuery](../../academy/herocourse/module3.md). 

## Changing the Project

::: tip Note
In this lesson we will continue changing the code. 
::: 

### Schema GraphQl

```graphql

```

### Manifest

Your entire Manifest file should look like this: 

```yaml

```

### Mapping functions

```ts
```

## Query

```graphql
query {
    approvals (first: 5) {
        nodes {
            id
            value
            owner
            spender
        }
    }
    transactions (first: 5) {
        nodes {
            id
            value
            to: id
            from: id
        }
    }
    collators (last: 5) {
        nodes {
            id
            joinedDate
            leaveDate
        }
    }
    accounts(first: 5) {
        nodes {
            id
            sentTransactions {
                nodes {
                    id
                    value
                    to: id
                    from: id
                    contractAddress       
                }
            }
        }
    }
}
```
 
## Useful resources

- [SubQuery Project Explorer](https://explorer.subquery.network/)
- [Website](https://subquery.network/)
- [Discord](https://discord.com/invite/subquery)
- [Quick Start Guide](../../quickstart/quickstart.md)
- [YouTube Channel](https://www.youtube.com/c/SubQueryNetwork)
- [Polkadot Explorer](https://polkadot.js.org/apps/#/explorer)
- [Data Reliationships in SubQuery](../../academy/herocourse/module3.md)

::: tip Note
The project's **code state after this lesson** is [here](https://github.com/deverka/moonbeam_subquery_tutorial//tree/lesson-5).
The final code of this project can be found [here](https://github.com/deverka/moonbeam_subquery_tutorial).
:::