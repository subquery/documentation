# Module 4: Aggregation

This module explains how you can aggregate data with a video lesson. The module is further divided into 4 guided exercises. 

## Lesson 1: Aggregation Basics

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/3s5ePkDERGQ" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Exercises

In these exercises, we will take the starter project and see how we can aggregate data. We will focus on indexing the staking rewards and then aggregating them over a particular account. 

To summarise, we will determine how much reward an account has accumulated over time. 

## Pre-Requisites

Completion of [Module 3](../herocourse/module3.md).


## Exercise 1: Index Staking Rewards

Before you aggregate all the staked rewards earned by a user, or to be precise a **DOT account owner**, you need to index those staking rewards. 


### Overview of Steps Involved

1. Initialise the starter project.
2. Update your mappings file, manifest file, and graphql schema file.
3. Generate, build, and deploy your code.
4. Deploy your code in Docker.
5. Query for address balances in the playground.

### Detailed Steps

#### Step 1: Initialise Your Project

The first step to create a SubQuery project with the following command:


```
$ subql init
Project name [subql-starter]: staking-rewards
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]: 
Git repository [https://github.com/subquery/subql-starter]: 
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: 
Description [This project can be use as a starting po...]: 
Version [1.0.0]: 
License [MIT]: 
Preparing project... done
staking-rewards is ready
```



#### Step 2: Update the Graphql Schema

Add an entity called `StakingReward`. This entity will allow you to record the account-reward along with the balance. Moreover, the block height will help you perform a cross check.

- The schema file should look similar to as below:

```
type StakingReward @entity{
  id: ID! #blockHeight-eventIdx
  account: String!
  balance: BigInt!
  date: Date!
  blockHeight: Int!
}
```



#### Step 3: Update the Manifest File (aka project.yaml)

Update the manifest file by including a `handleStakingRewarded` handler and updating the filter method to `staking/Rewarded`. This is the only event you require to capture for now. Hence, remove the `blockHandler` and `callHandler`. 


```
- handler: handleStakingRewarded
  kind: substrate/EventHandler
  filter:
    module: staking
    method: Rewarded
```

::: info Note
The `Rewarded` method was recently introduced from the block [6,713,249](https://github.com/polkadot-js/api/blob/master/packages/types-known/src/upgrades/polkadot.ts) onwards. It was previously called `Reward`. For this exercise, we will use this the new format and use a startBlock of 7,000,000. 
:::


::: warning Important
Avoid messing with the auto-generated version names(as shown in the initial section of the manifest file).
:::


- The updated part of the manifest file will look like as follows:

```
network:
  chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  endpoint: 'wss://polkadot.api.onfinality.io/public-ws'
  dictionary: 'https://api.subquery.network/sq/subquery/polkadot-dictionary'
  #genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
dataSources:
  - kind: substrate/Runtime
    startBlock: 7000000
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleStakingRewarded
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Rewarded
```

Notice that `genesisHash` has been excluded. 

:::info note
In this example, we are starting at the block height 7 million, and **strictly note that indenting matters here**. Otherwise you will get the following error:
:::

```
 ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
bad indentation of a sequence entry (17:5)

 14 |     mapping:
 15 |       file: ./dist/index.js
 16 |       handlers:
 17 |     - handler: handleRewarded
----------^
 18 |           kind: substrate/EventHandler
 19 |           filter:
error Command failed with exit code 1.
```



#### Step 4: Create `handleStakingRewarded` and Update Mapping File

The initialisation of the project also pre-creates a sample mappings file with 3 functions: `handleBlock`, `handleEvent` and `handleCall`. Delete all of these functions as you need to create your own. 


```
export async function handleStakingRewarded(event: SubstrateEvent): Promise<void> {

}
```


Next, declare an event object as follows:


```
 const {event: {data: [account, newReward]}} = event;
```


After that declare a new instance of the `StakeReward` object. Pass it through the **blockheight + hyphen + eventid** to create a unique identifier. 


```
const entity = new StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
```


Next, obtain the `account`, `newReward` and the block **timestamp**, and store it within the relevant fields of our entity object. Then, save the entity. 


```
entity.account = account.toString();
entity.balance = (newReward as Balance).toBigInt();
entity.date = event.block.timestamp;
entity.blockHeight = event.block.block.header.number.toNumber();
await entity.save();
```


- The complete mapping file should look like this:


```
import {SubstrateEvent} from "@subql/types";
import {StakingReward} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleStakingRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    const entity = new StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.account = account.toString();
    entity.balance = (newReward as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    await entity.save();
}
```



#### Step 5: Install Dependencies and Build the Project

The next step is building the project. 

For that, first run the standard `yarn install`and then `yarn codegen`. After that run the `docker-compose pull & docker-compose up` command.  

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn install
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm install
  ```

  </CodeGroupItem>
</CodeGroup>

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn codegen
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm run-script codegen
  ```

  </CodeGroupItem>
</CodeGroup>

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn build
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm run-script build
  ```

  </CodeGroupItem>
</CodeGroup>


```
yarn start:docker
```



#### Step 6: Query the Project

Once the docker container is up and running successfully, which may take a few minutes, open up your browser and navigate to `www.localhost:3000`. 

This will open up a “playground” where you can create your query. Copy the example below and see the results:

<CodeGroup>
  <CodeGroupItem title="Query" active>

  ```
  query{
    stakingRewards(first: 3 orderBy:BLOCK_HEIGHT_ASC){
      nodes{
        blockHeight
        account
        date
        balance
      }
    }
  }
  ```
  </CodeGroupItem>

  <CodeGroupItem title="Result">

  ```
  {
    "data": {
      "stakingRewards": {
        "nodes": [
          {
            "blockHeight": 7000064,
            "account": "16jWQMBXZNxfgXJmVL61gMX4uqtc9WTXV3c8DGx6DUKejm7",
            "date": "2021-09-26T16:50:18.001",
            "balance": "2189068638"
          },
          {
            "blockHeight": 7000064,
            "account": "13MnytvGDqJLGZbizqd8CDKJUPa9UJyzXcdxRiJEv5g2hq47",
            "date": "2021-09-26T16:50:18.001",
            "balance": "2050030971"
          },
          {
            "blockHeight": 7000064,
            "account": "12L117g377z195J3WaPshEaFC8vsNMyiMi8CTWfWVJdmBAJ4",
            "date": "2021-09-26T16:50:18.001",
            "balance": "2007885451"
          },
          {
            "blockHeight": 7000064,
            "account": "13owVsvG3GtmDYfcnDNCVm54z6X6VgYf37QRMFywrVPpkJvv",
            "date": "2021-09-26T16:50:18.001",
            "balance": "1987101808"
          },
      }
    }
  ```
  </CodeGroupItem>
</CodeGroup>



Congratulations! You have now indexed all staking rewards for all accounts from the block 7 Million onwards. 

In the next exercise, let’s aggregate or sum up these rewards for each account.

---

## Exercise 2: Aggregate Staking Rewards

First of all, you need to create another entity to aggregate the staking rewards.

### Pre-Requisites

Compeletion of [Module 4 - Exercise](module4.md#exercise-1-index-staking-rewards).

### Detailed Steps


#### Step 1: Add an Entity Called Sum Reward

Add a new entity called `SumReward` with extra fields as shown below:


```
type SumReward @entity{
  id: ID! # AccountId
  totalReward: BigInt!
  blockheight: Int!
}
```


- **The new schema file should now look like this:**


```
type StakingReward @entity{
  id: ID! #blockHeight-eventIdx
  account: String!
  balance: BigInt!
  date: Date!
}

type SumReward @entity{
  id: ID! # AccountId
  totalReward: BigInt!
  blockheight: Int!
}
```



#### Step 2: Update the Manifest File(aka project.yaml)

Add an extra handler called `handleSumRewarded` and filter it by `staking/Rewarded`.


```
      - handler: handleSumRewarded
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Rewarded
```


The ***latest and updated part*** of the manifest file should look like as below: 


```
dataSources:
  - kind: substrate/Runtime
    startBlock: 7000000
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleSumRewarded
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Rewarded
        - handler: handleStakingRewarded
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Rewarded
```


    
::: info Note
This is how more than one mapping handler can be added to a project. Also note that the order is very crucial. 
Otherwise you may encounter an error such as:

```
ERROR failed to index block at height 7000064 handleStakingRewarded() SequelizeForeignKeyConstraintError: insert or update on table "staking_rewards" violates foreign key constraint "staking_rewards_account_id_fkey"
```
:::


#### Step 3: Create `handleSumRewarded` Function and Update Mapping File  

Next, create a function called `handleSumRewarded` along with a helper function called `createSumReward`.


```
function createSumReward(accountId: string): SumReward {
    const entity = new SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}

export async function handleSumRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    let entity = await SumReward.get(account.toString());
    if (entity === undefined){
        entity = createSumReward(account.toString());
    }
    entity.totalReward = entity.totalReward + (newReward as Balance).toBigInt();
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
```

::: info Note 
Run `yarn codegen` and import the new entity to remove the errors.
:::

The complete and updated mapping file should now look like:


```
import {SubstrateEvent} from "@subql/types";
import {StakingReward, SumReward} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleStakingRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    const entity = new StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.account = account.toString();
    entity.balance = (newReward as Balance).toBigInt();
    entity.date = event.block.timestamp;
    await entity.save();
}

function createSumReward(accountId: string): SumReward {
    const entity = new SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}

export async function handleSumRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    let entity = await SumReward.get(account.toString());
    if (entity === undefined){
        entity = createSumReward(account.toString());
    }
    entity.totalReward = entity.totalReward + (newReward as Balance).toBigInt();
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
```



#### Step 4: Rebuild the Project

See building a project in the [previous exercise](module4.md#step-5-install-dependencies-and-build-the-project).

::: info Note
Delete your database instance in the `.data folder`, as you have modified the schema file. 
:::


#### Step 5: Query the Project

Run the following query to list out the total rewards for each account.

<CodeGroup>
  <CodeGroupItem title="Query" active>

  ```
  query{
    sumRewards(first:3 orderBy:BLOCKHEIGHT_ASC){
      nodes{
        blockheight
        id
        totalReward
      }
    }
  }
  ```
  </CodeGroupItem>

  <CodeGroupItem title="Result">

  ```
  {
    "data": {
      "sumRewards": {
        "nodes": [
          {
            "blockheight": 7000064,
            "id": "121FXj85TuKfrQM1Pdcjj4ibbJNnfsqCtMsJ24rSvGEdWDdv",
            "totalReward": "10901386603"
          },
          {
            "blockheight": 7000064,
            "id": "123MFw5gAkCjcqEhapJ5zon4Ppyp59Rq2kyNQqEHbfwvM4Ni",
            "totalReward": "1023809925"
          },
          {
            "blockheight": 7000064,
            "id": "129N6sYY5r9LnfaMY2AG9px9yYyUhN6FERPXKLfirwBrjkJv",
            "totalReward": "980420660"
          }
        ]
      }
    }
  }

  ```


  </CodeGroupItem>
</CodeGroup>


What if not only could you display the `totalReward`, but also the show the individual rewards that made up this `totalReward`? 
That's what we will explore in our next exercise. 

---


## Exercise 3: Viewing Both Aggregated and Individual Staking Rewards

So far in this module, we have managed to query for all the staking rewards and aggregate them for each account. Now we will make an improvement, and view the aggregate amount as well as the individual amounts as a child set. 

### Pre-Requisites

Completion of **[Module 4 - Exercise 1](module4.md#exercise-1-index-staking-rewards).**

### Detailed Steps


#### Step 1: Modify the Schema File

Update the graphql schema field called account to be type SumReward. We are creating a one-many entity relationship where one `sumReward` will comprise of many individual staking rewards. 


```
type StakingReward @entity{
  id: ID! #blockHeight-eventIdx
  account: SumReward!
  balance: BigInt!
  date: Date!
}
```



#### Step 2: Check the Manifest File 

The manifest file does not need to be modified.


#### Step 3: Update `handleStakingRewarded` in the Mapping File(aka project.yaml)

In `handleStakingRewarded`, modify:


```
entity.account = account.toString();
```


to:


```
entity.accountId = account.toString();
```


Note that you are creating here a relationship between two entities or tables. Hence, he `StakingReward` entity needs to have a column that contains the same value as the primary key column in the `SumReward` entity. 

Because the `SumReward` entity has been assigned the **account value (account.toString())**, you must do the same here. 

- **Now, the whole updated mappings file should look like this:**


```
import {SubstrateEvent} from "@subql/types";
import {StakingReward, SumReward} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleStakingRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    const entity = new StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = (newReward as Balance).toBigInt();
    entity.date = event.block.timestamp;
    await entity.save();
}

function createSumReward(accountId: string): SumReward {
    const entity = new SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}

export async function handleSumRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [accountId, newReward]}} = event;
    let entity = await SumReward.get(accountId.toString());
    if (entity === undefined){
        entity = createSumReward(accountId.toString());
    }
    entity.totalReward = entity.totalReward + (newReward as Balance).toBigInt();
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
```



#### Step 4: Rebuild the Project

Refer the steps given in the previous exercise to [build the project](module4.md#step-5-install-dependencies-and-build-the-project). 

:::info Note
You may need to delete your database folder because a new field will be created and included in your database schema.
:::


#### Step 5: Query the Project

Now, run a query and utilise a `stakingRewardsByAccountId` field. This field is automatically created to find the individual staking rewards. 

Below is an example query of one specific account: 

<CodeGroup>
  <CodeGroupItem title="Query" active>

  ```
  query{
    sumRewards(filter: {id:{equalTo:"16jWQMBXZNxfgXJmVL61gMX4uqtc9WTXV3c8DGx6DUKejm7"}}){
      nodes{
    blockheight
        id
        totalReward
          stakingRewardsByAccountId{
            nodes{
              balance
            }
          }
      }
    }
  }
  ```
  </CodeGroupItem>

  <CodeGroupItem title="Result">

  ```
  {
    "data": {
      "sumRewards": {
        "nodes": [
          {
            "blockheight": 7013941,
            "id": "16jWQMBXZNxfgXJmVL61gMX4uqtc9WTXV3c8DGx6DUKejm7",
            "totalReward": "4049635655",
            "stakingRewardsByAccountId": {
              "nodes": [
                {
                  "balance": "2189068638"
                },
                {
                  "balance": "1860567017"
                }
              ]
            }
          }
        ]
      }
    }
  }

  ```
  </CodeGroupItem>
</CodeGroup>


- Note that the result shows that a total reward of `4049635655` is made up of two balances. 


---

## Exercise 4: Reward vs Rewarded

So far, we have used the `Rewarded` method in the manifest file.

As mentioned in the previous exercise, `Rewarded` was only recently introduced from block [6713249](https://github.com/polkadot-js/api/blob/master/packages/types-known/src/upgrades/polkadot.ts) onwards. It was previously called `Reward`. 

Hence, you need to update your code to capture all the staking rewards prior to this change. 

### Pre-Requisites

Completion of **[Module 4 - Exercise 2](module4.md#exercise-2-aggregate-staking-rewards).**

### Detailed Steps

#### Step 1: Update the Manifest File(aka project.yaml)

Add the following mapping filters to the manifest file. Note that we have removed the **“ed”** from the handler name and the method. 

   

```
        - handler: handleSumReward
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Reward
        - handler: handleStakingReward
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Reward
```

- The ***updated part** of the manifest file should like this:


```
dataSources:
  - kind: substrate/Runtime
    startBlock: 6000000
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleSumReward
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Reward
        - handler: handleStakingReward
          kind: substrate/EventHandler
          filter:
            module: staking
            method: Reward
```


::: info Note
Also change the start block to 6,000,000, which should return the staking reward data.

When you change the starting block, don’t forget to delete the database and reindex.
:::

#### Step 2: Update the Mapping File(aka project.yaml)

Create a redirect function from the old method to utilise the same code. The reason is that we have already captured the event.


```
export async function handleSumReward(event: SubstrateEvent): Promise<void> {
    await handleSumRewarded(event)
}

export async function handleStakingReward(event: SubstrateEvent): Promise<void> {
    await handleStakingRewarded(event)
}
```



#### Step 3: Rebuild the Project

To build the project, refer the steps provided in the [previous exercise](module4.md#step-5-install-dependencies-and-build-the-project). 


#### Step 4: Query the Project

Re-run the previous queries. The data should appear for the blocks starting from 6 Million. 

:::info Note
You have to wait for a while until the relevant blocks get indexed. 
:::

<CodeGroup>
  <CodeGroupItem title="Query" active>

  ```
  query{
    sumRewards(first:3 orderBy:BLOCKHEIGHT_ASC){
      nodes{
        blockheight
        id
        totalReward
      }
    }
  }
  ```
  </CodeGroupItem>

  <CodeGroupItem title="Result">

  ```
  {
    "data": {
      "sumRewards": {
        "nodes": [
          {
            "blockheight": 6001338,
            "id": "11283CvjWWXesEPQxryZYxjBwTqFV7NMRw8reNGJfzQF4GvS",
            "totalReward": "5068047768"
          },
          {
            "blockheight": 6001338,
            "id": "112EHZp2Dn8jqW9iqpAUFW3ChmiiT6cMnN1arsqJtatnthfz",
            "totalReward": "503936239"
          },
          {
            "blockheight": 6001338,
            "id": "11agCcnJ8cYvKby6p27CiLxBaS1G1hnbRmwtUBAQ3beygUA",
            "totalReward": "1874696285"
          }
        ]
      }
    }
  }
  ```
  </CodeGroupItem>
</CodeGroup>


### References

- [Sum Rewards PDF workbook](/assets/pdf/Sum_Rewards.pdf)
- [Sum Rewards GitHub](https://github.com/subquery/tutorials-simple-aggregation)
