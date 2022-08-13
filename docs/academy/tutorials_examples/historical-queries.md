# How to Query Historical State Automatically

## Historical Query Feature

SubQuery released the **historical query feature** at the end of May, in version [1.1.0](https://github.com/subquery/subql/releases/tag/query%2F1.1.0). Since then, we have constantly worked on improving this feature.

[You can read more about this feature on the offical docs](../../run_publish/historical.md), but this tutorial will walk you through a few examples.

Unlike querying and retrieving the current state, this feature allows you to **query for historical data at a specific block height**. Hence, you can see how your project’s state has changed over time.

Let’s get an in-depth look at the historical query feature with a real-world example.

## Historical Query Tutorial

In this tutorial, we will refer to the aggregation project that was introduced in [Module 4 - Exercise 2](../herocourse/module4.md#exercise-2-aggregate-staking-rewards) of the Hero’s course.

::: info Note
Complete the above-mentioned exercise before moving forward.
:::

This project allows users to query the total staking rewards for a particular account.

Try and run this sample query in the `localhost:3000` and check out the results as follows:

<CodeGroup>
  <CodeGroupItem title="Query" active>

```graphql
query {
  sumRewards(
    first: 3
    orderBy: BLOCKHEIGHT_DESC
    filter: {
      id: { equalTo: "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv" }
    }
  ) {
    nodes {
      blockheight
      id
      totalReward
    }
  }
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Result">
	
  ```json
  // wait until the Indexer indexes up to the block height 7013941

{
  "data": {
    "sumRewards": {
      "nodes": [
        {
          "blockheight": 7013941,
          "id": "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv",
          "totalReward": "20170219857"
        }
      ]
    }
  }
}

```

</CodeGroupItem>
</CodeGroup>

The above query returns the total reward of the user `121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv` at the **latest block height**.

But what if you want to see the total earnings of the same user at a previous block? That's where you must use SubQuery's historical state feature.

In order to make this feautre working, create a new folder, called `docker` in your project directory. Then proceed ahead to 3 additional files in this `docker` folder:

1. docker-compose.yml
2. load-extensions.sh
3. pg-Dockerfile


::: info Note

Visit the [`docker` repository](https://github.com/subquery/subql-starter/tree/historical/docker) to download or copy these files into your own docker folder.

:::

Note that unlike the usual procedure, here, you need to run the docker commands in your newly created `docker` folder.

Follow these two commands after building your project:

```bash
cd docker
docker-compose pull & docker-compose up
```

Now, run the following query to get the desired results of historical data:

<CodeGroup>
  <CodeGroupItem title="Query" active>

```graphql
query {
  sumRewards(
    blockHeight: "7000064"
    first: 3
    orderBy: BLOCKHEIGHT_DESC
    filter: {
      id: { equalTo: "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv" }
    }
    ) {
      nodes {
      blockheight
      id
      totalReward
    }
  }
}
```

</CodeGroupItem>
<CodeGroupItem title="Result">

```json

{
  "data": {
    "sumRewards": {
      "nodes": [
        {
          "blockheight": 7000064,
          "id": "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv",
          "totalReward": "10901386603"
        }
      ]
    }
  }
}
```

</CodeGroupItem>
</CodeGroup>

The above query retrieves the **total reward** for the `121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv` at the previous block `7000064`.

To see clearer picture, notice the difference between the balance between the present and previous block height:

| Block Height | Balance                         |
|--------------|---------------------------------|
| 7000064      | 10901386603 or 1.09013866 DOT   |
| 7013941      | 20170219857 or 2.0170219857 DOT |

::: tip Tip

Visit [Polkadot Subscan](https://polkadot.subscan.io/) to view this user's comeplete history of the total rewards. You may then experiment with the above query, using other block heights as well. Also notice the slash and rewards at each block.

:::

## Bonus Exercise

Run `git clone -b historical https://github.com/subquery/subql-starter.git` and copy the [`docker` folder] to your project directory(as shown in the previous steps).

Now run the following query in the `localhost:3000`:

<CodeGroup>
<CodeGroupItem title="Query 1" active>

```graphql
query {
  sumRewards(
  blockHeight: "7000064"
  orderBy: BLOCKHEIGHT_DESC
  filter: {
    id: { equalTo: "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv" }
  }
  ) {
  nodes {
    blockheight
    id
    totalReward
    }
  }
}
```

</CodeGroupItem>
<CodeGroupItem title="Result 1">

```json
{
  "data": {
    "sumRewards": {
      "nodes": [
        {
          "blockheight": 7000064,
          "id": "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv",
          "totalReward": "10901386603"
        }
      ]
    }
  }
}
```

</CodeGroupItem>
</CodeGroup>

<CodeGroup>
<CodeGroupItem title="Query 2" active>

```graphql
query {
  sumRewards(
  blockHeight: "7013941"
  orderBy: BLOCKHEIGHT_DESC
  filter: {
    id: { equalTo: "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv" }
  }
  ) {
    nodes {
      blockheight
      id
      totalReward
    }
  }
}
```

</CodeGroupItem>
<CodeGroupItem title="Result 2">

```json

{
  "data": {
    "sumRewards": {
      "nodes": [
        {
          "blockheight": 7013941,
          "id": "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv",
          "totalReward": "20170219857"
        }
      ]
    }
  }
}

```

</CodeGroupItem>
</CodeGroup>
