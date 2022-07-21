# Module 3: Relationships

This module explains the different types of entity relations **(one-to-one, one-to-many, and many-to-many)** with guided examples. The module is divided into 3 video lessons for in-depth explanations. 

:::info Note
For a basic uderstanding of the terminologies related to entity relations, visit [GraphQL Schema Documentation.](../../build/graphql.md) 
:::

Let's have a look at each relationship one-by-one. 


## Lesson 1: One to Many Entities

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/7ApycKhiPTw" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise -  Balances Transfers (One-to-Many)

In these exercises, we will take the starter project and focus on understanding **one to many entity relationships**. We will create a project that allows us to query for accounts and determine how much was transferred to what receiving address. 

### Pre-Requisites

Completion of [Module 2](../herocourse/module2.md).


### Overview of Steps Involved 

1. Initialise the starter project.
2. Update your mappings, manifest file, and graphql schema file by removing all the default code except for the `handleEvent` function.
3. Generate, build, and deploy your code.
4. Deploy your code in Docker.
5. Query for address transfers in the playground.

### Detailed Steps


#### Step 1: Initialize Your Project

The first step to create a SubQuery project using the following command:


```
$ subql init
Project name [subql-starter]: account-transfers
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
account-transfers is ready
```



#### Step 2: Update the Graphql Schema

Create an entity called `Account`. This account will contain multiple transfers. Here, an account can be considered as a **Polkadot address** owned by someone.

Transfers can be considered as a transaction with an amount, a sender, and a receiver(let’s ignore the sender for now). Here, you will obtain the amount transferred, the blockNumber, and to whom it was sent(also known as the receiver). 

The schema file should look like this:


```
type Account @entity {
  id: ID! #this primary key is set as the toAddress
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  blockNumber: BigInt
  to: Account! # receiving address
}
```



#### Step 3: Update the Manifest File (aka project.yaml)

Update the manifest file to only include the `handleEvent` handler and update the filter method to `Transfer`. The reason is that we only want to work with the "balance transfer events" in this example. These events will contain the data of those transactions, which are being transferred from one account to another. 

The `project.yaml` file should look similar to as below:

```
specVersion: 1.0.0
name: account-transfers
version: 1.0.0
runner:
  node:
    name: '@subql/node'
    version: '>=1.0.0'
  query:
    name: '@subql/query'
    version: '*'
description: >-
  This project can be use as a starting point for developing your SubQuery
  project
repository: 'https://github.com/subquery/subql-starter'
schema:
  file: ./schema.graphql
network:
  chainId: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  endpoint: 'wss://polkadot.api.onfinality.io/public-ws'
  dictionary: 'https://api.subquery.network/sq/subquery/polkadot-dictionary'
  #genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

::: info Note
Note the inclusion of a `dictionary` and the exclusion of the `genesisHash`.
:::


#### Step 4: Update the Mappings File

The initialisation command pre-creates a sample mappings file with 3 functions: `handleBlock`, `handleEvent`, and `handleCall`. As we are only focusing on `handleEvent`, delete the remaining functions. 

Note that you also need to make a few other changes. First, understand that the `balance.transfer` event gives access to an array of data in the following format: [from, to, value]. 

This indicates that you can access the values as follows:


```
    const fromAddress = event.event.data[0];
    const toAddress = event.event.data[1]; 
    const amount = event.event.data[2];
```


Furthermore, as the `Account` entity (formally called the StarterEntity) was instantiated in the `handleBlock` function and you no longer have this, you need to instantiate it within the `handleEvent` function. 

However, you must first test and see if this value is already in your database. The reason is that an event can contain multiple transfers to the SAME `toAddress`. As a result, you get the `toAddress` if the value is present in the database. And if it does not exist, save it to the database.


```
       const toAccount = await Account.get(toAddress.toString());
       if (!toAccount) {
           await new Account(toAddress.toString()).save();
       }
```

For the `Transfer` entity object, set the primary key as the `blocknumber+event.idx` (which guarantees uniqueness) and then set the other fields of the `Transfer` entity object accordingly.


```
    const transfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`, );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.toId = toAddress.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
```

The `mappingHandler.ts` file should look like this:


```
import {SubstrateEvent} from "@subql/types";
import {Account, Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    {
        // The balances.transfer event has the following payload \[from, to, value\] that we can access
        
        // const fromAddress = event.event.data[0];
        const toAddress = event.event.data[1]; 
        const amount = event.event.data[2];
    
           // query for toAddress from DB
           const toAccount = await Account.get(toAddress.toString());
           // if not in DB, instantiate a new Account object using the toAddress as a unique ID
           if (!toAccount) {
               await new Account(toAddress.toString()).save();
           }
        
        // instantiate a new Transfer object using the block number and event.idx as a unique ID
        const transfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`, );
        transfer.blockNumber = event.block.block.header.number.toBigInt();
        transfer.toId = toAddress.toString();
        transfer.amount = (amount as Balance).toBigInt();
        await transfer.save();
    
    }
}
```


#### Step 5: Install the Dependencies

Install the node dependencies by running the following commands:

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

#### Step 6: Generate the Associated Typescript

Next, we will generate the associated typescript with the following command:

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


#### Step 7: Build the Project

The next step is to build the project with the following command:

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



This code bundles the app into static files for production.


#### Step 8: Start the Docker Container

Run the docker command to pull the images and start the container.


```
docker-compose pull & docker-compose up

```



#### Step 9: Run a Query

Once the docker container is all set and running, which may take a few minutes, open up your browser and navigate to `www.localhost:3000`.

This will open up a “playground” where you can create your query. Copy the example below:


```
query{
  accounts(first: 3){  
    nodes{
      id
    }
    }
  }
```


The above code will query the `account` entity returning the id. We have defined the id here as the `toAddress`(also known as the receiving address). 

This will return a result similar to the following:


```
{
  "data": {
    "accounts": {
      "nodes": [
        {
          "id": "11k5GkWb9npuqWRq5Pyk51RSnRyskPrPtsyoCApteEUjNou"
        },
        {
          "id": "121dZJsfG7uNvszPSpYvBzwnrcF1P4ejjrE1G6FSWHqht5tC"
        },
        {
          "id": "121rwkQAH3yCD1EcaRgc3nELSoZn29RoTtCN55mcN7RkBA66"
        }
      ]
    }
  }
}
```


You can also query for all the transfers:


```
query{
  transfers(first: 3){
    nodes{
      id
      amount
      blockNumber
      }
    }
  }
```


This will give you a result similar to the following:


```
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "7280565-2",
          "amount": "400009691000",
          "blockNumber": "7280565"
        },
        {
          "id": "7280566-2",
          "amount": "23174700000000",
          "blockNumber": "7280566"
        },
        {
          "id": "7280570-5",
          "amount": "400000000000",
          "blockNumber": "7280570"
        }
      ]
    }
  }
}
```




This magic happens since we query the account id from within the transfer query. The example below shows that we are querying for transfers where we have an associated amount and blockNumber. After that we can link this to the receiving or `to` address as follows: 


```
query{
  transfers(first: 3){
    nodes{
      id
      amount
      blockNumber
      to{
        id
      }
      }
    }
  }
```


The above query returns the following results:


```
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "7280565-2",
          "amount": "400009691000",
          "blockNumber": "7280565",
          "to": {
            "id": "15kUt2i86LHRWCkE3D9Bg1HZAoc2smhn1fwPzDERTb1BXAkX"
          }
        },
        {
          "id": "7280566-2",
          "amount": "23174700000000",
          "blockNumber": "7280566",
          "to": {
            "id": "14uh77yjhC3TLAE6KaCLvkjN7yFeUkejm7o7fdaSsggwD1ua"
          }
        },
        {
          "id": "7280567-2",
          "amount": "3419269000000",
          "blockNumber": "7280567",
          "to": {
            "id": "12sj9HTNQ7aiQoRg5wLyuemgvmFcrWeUJRi3aEUnJLmAE56Y"
          }
        }
      ]
    }
  }
}
```


Let's have a look at the database schema and understand the working. 

The **accounts table** is a standalone table which contains only receiving addresses(`accounts.id`). The **transfer table** contains `to_id` which are links or points back to the accounts. 

Simply put, one account links to many transfers. In other words, each unique Polkadot address, stored in `accounts.id`, links to one or more than one Polkadot address, which has an associated amount and block number. 



### References

* [Account Transfers PDF workbook](/assets/pdf/Account_Transfers.pdf)
* [Account Transfers Github](https://github.com/subquery/tutorials-account-transfers)
* [One-to-many relationships](../../build/graphql.md#one-to-many-relationships)

---

## Lesson 2: Many to Many Entities

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/TKsJ6FQGrEs" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise - Council Proposals (Many-to-Many)

Here, we will take the starter project and focus on learning how many-to-many entity relationships work. We will create a project which allows us to query for the number of votes that councillors have made and how many votes a given proposal has received. 


[Refer to this page](https://polkadot.network/blog/a-walkthrough-of-polkadots-governance/) to learn more about the Polkadot governance structure. 

### Pre-Requisites

Completion of [Module 2](../herocourse/module2.md).


### Overview of Steps Involved

1. Initialise the starter project.
2. Update your mappings, manifest file, and graphql schema file by removing all the default code except for the `handleEvent` function.
3. Generate, build, and deploy your code.
4. Deploy your code in Docker.
5. Query for address balances in the playground.


### Detailed Steps

#### Step 1: Initialise Your Project

First of all, create a SubQuery project with the following command:

```
~/Code/subQuery$ subql init
Project name [subql-starter]: council-proposal
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
Cloning project... done
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]: 
Git repository [https://github.com/subquery/subql-starter]: 
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: 
Description [This project can be use as a starting po...]: 
Version [0.0.4]: 
License [MIT]: 
Preparing project... done
council-proposal is ready
```

#### Step 2: Update the Graphql Schema

Let’s first create an entity called `Proposals`. This proposal is an event of type council. To simply put, you will extract data from the **council event**. Visit [this page](https://polkadot.js.org/docs/substrate/events#council) for more information. 

Focus on the `proposed` method within the council event. The `proposed` method is defined as:

>“*A motion (given hash) has been proposed (by given account) with a threshold (given MemberCount). [account, proposal_index, proposal_hash, threshold]” - [source](https://polkadot.js.org/docs/substrate/events/#proposedaccountid32-u32-h256-u32-1)*

Hence, you need to add the following fields: `id`, `index`, `hash`, `voteThreshold` and `block` to your entity. 

```
            id => account
            index => proposal_index
            hash => proposal_hash
            voteThreshold => threshold
            block => Not a part of proposed method but useful to extract
```

Next, let’s create an entity object called `Councillor`. This object will hold the number of votes each **councillor** has made. 

Finally, let’s create a **VoteHistory** entity. This will be another [council event](https://polkadot.js.org/docs/substrate/events#council) using the [voted](https://polkadot.js.org/docs/substrate/events#votedaccountid32-h256-bool-u32-u32) method defined as:

>“*A motion (given hash) has been voted on by a given account, leaving a tally ("yes votes" and "no votes" respectively given as MemberCount). [account, proposal_hash, voted, yes, no]”- [source](https://polkadot.js.org/docs/substrate/events/#votedaccountid32-h256-bool-u32-u32-1)*

You need to add the following fields: `id`, `proposalHash`, `approvedVote`, `councillor`, `votedYes`, `votedNo`, and `block` to your entity. 

```
            id => account
            proposalHash => Proposal
            approvedVote => voted
            Councillor => Councillor
            votedYes => yes
            votedNo => no
            block => Not a part of proposed method but useful to extract
```

Here, we have specified the type as the proposal entityNote for `proposalHash`. We have also introduced a new field called `Councillor` and allocated it the `Councillor` type. This has created a table where these two columns work as references to their respective tables. 

This indicates that the **VoteHistory entity** or **VoteHistory database table** can link the `Councillor` entity to the `Proposal` entity. And that creates a **many to many** relationship. In simple terms, councillor can vote for many proposals and a proposal will have many votes. 

The schema file should look like this:


```
type Proposal @entity {
  id: ID!
  index: String!
  account: String
  hash: String
  voteThreshold: String
  block: BigInt
}

type VoteHistory @entity {
  id: ID!
  proposalHash: Proposal
  approvedVote: Boolean!
  councillor: Councillor
  votedYes: Int
  votedNo: Int
  block: Int
}

type Councillor @entity {
  id: ID!
  numberOfVotes: Int
}
```

#### Step 3: Update the Manifest File (aka project.yaml)

Update the manifest file to include two **Event handlers**. Also update the **filter** method to `council/Proposed` and `council/Voted`. 


```
specVersion: 0.2.0
name: council-proposal
version: 0.0.4
description: >-
  This project can be use as a starting point for developing your SubQuery
  project
repository: 'https://github.com/subquery/subql-starter'
schema:
  file: ./schema.graphql
network:
  endpoint: 'wss://polkadot.api.onfinality.io/public-ws'
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleCouncilProposedEvent
          kind: substrate/EventHandler
          filter:
            module: council
            method: Proposed
        - handler: handleCouncilVotedEvent
          kind: substrate/EventHandler
          filter:
            module: council
            method: Voted
```

#### Step 4: Update the Mappings File

This mapping file will contain three functions: `handleCouncilProposedEvent`, `handleCouncilVotedEvent`, and `ensureCouncillor`.


Let’s have a look at the first function `handleCouncilProposedEvent`.

##### handleCouncilProposedEvent

You can access the values of the event with the following code: 

```
  const {
    event: {
      data: [accountId, proposal_index, proposal_hash, threshold],
    },
  } = event;
```

- Then instantiate a new `Proposal` object:


```
  const proposal = new Proposal(proposal_hash.toString());
```

- After that assign each of the events to a variable in the Proposal object and save it. 


```
  proposal.index = proposal_index.toString();
  proposal.account = accountId.toString();
  proposal.hash = proposal_hash.toString();
  proposal.voteThreshold = threshold.toString();
  proposal.block = event.block.block.header.number.toBigInt();
  await proposal.save();
```


##### handleCouncilVotedEvent

This function follows a similar format to `handleCouncilProposedEvent`. The event parameters are first obtained as below:

```
const {
    event: {
      data: [councilorId, proposal_hash, approved_vote, numberYes, numberNo],
    },
  } = event;
```

However, before storing the values into the `voteHistory` object, a helper function is used to check if the `councillorId` already exists. 

```
  await ensureCouncillor(councilorId.toString());
  // Retrieve the record by the accountID
  const voteHistory = new VoteHistory(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
```

##### ensureCouncillor (helper function)

This helper function checks if the councillor entity exists. If it does NOT exist, a new one is created and the number of votes is set to zero. Otherwise, the number of votes is incremented by one.


```
async function ensureCouncillor(accountId: string): Promise<void> {
  // ensure that our account entities exist
  let councillor = await Councillor.get(accountId);
  if (!councillor) {
    councillor = new Councillor(accountId);
    councillor.numberOfVotes = 0;
  }
  councillor.numberOfVotes += 1;
  await councillor.save();
```


The complete mapping file looks similar to as follows:


```
import { SubstrateEvent } from "@subql/types";
import { bool, Int } from "@polkadot/types";
import { Proposal, VoteHistory, Councillor } from "../types/models";

export async function handleCouncilProposedEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [accountId, proposal_index, proposal_hash, threshold],
    },
  } = event;
  const proposal = new Proposal(proposal_hash.toString());
  proposal.index = proposal_index.toString();
  proposal.account = accountId.toString();
  proposal.hash = proposal_hash.toString();
  proposal.voteThreshold = threshold.toString();
  proposal.block = event.block.block.header.number.toBigInt();
  await proposal.save();
}

export async function handleCouncilVotedEvent(event: SubstrateEvent): Promise<void> {
  // logger.info(JSON.stringify(event.event.data));
  const {
    event: {
      data: [councilorId, proposal_hash, approved_vote, numberYes, numberNo],
    },
  } = event;

  await ensureCouncillor(councilorId.toString());
  // Retrieve the record by the accountID
  const voteHistory = new VoteHistory(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  voteHistory.proposalHashId = proposal_hash.toString();
  voteHistory.approvedVote = (approved_vote as bool).valueOf();
  voteHistory.councillorId = councilorId.toString();
  voteHistory.votedYes = (numberYes as Int).toNumber();
  voteHistory.votedNo = (numberNo as Int).toNumber();
  voteHistory.block = event.block.block.header.number.toNumber();
  // logger.info(JSON.stringify(voteHistory));
  await voteHistory.save();
}

async function ensureCouncillor(accountId: string): Promise<void> {
  // ensure that our account entities exist
  let councillor = await Councillor.get(accountId);
  if (!councillor) {
    councillor = new Councillor(accountId);
    councillor.numberOfVotes = 0;
  }
  councillor.numberOfVotes += 1;
  await councillor.save();
}
```

#### Step 5: Install the Dependencies

Install the node dependencies by running the following command:

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
```

#### Step 6: Generate the Associated Typescript

Next, generate the associated typescript using the following command:


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


#### Step 7: Build the Project

Now, let's build the project with the following command:

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

This code bundles the app into static files for production.


#### Step 8: Start the Docker Container

Run the docker command to pull the images and start the container.

```
docker-compose pull && docker-compose up
```

#### Step 9: Run a Query

Once the docker container is up to date and running successfully, which may take a few minutes, open up your browser and navigate to `localhost:3000`.

This will open up a **playground** where you can create your query. Copy the example below:

```
query {
    councillors (first: 3 orderBy: NUMBER_OF_VOTES_DESC) {
        nodes {
            id
            numberOfVotes
            voteHistories (first: 5) {
              totalCount 
              nodes {
                approvedVote
              }
          }
        }
    }
}
```

The above code will query the councillors. It will return the **number of votes**, the **totalCount**, and the **number of approved votes** for each councillor. 

The result should look similar to as follwos:


```
{
  "data": {
    "councillors": {
      "nodes": [
        {
          "id": "12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud",
          "numberOfVotes": 61,
          "voteHistories": {
            "totalCount": 61,
            "nodes": [
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              }
            ]
          }
        },
        {
          "id": "1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv",
          "numberOfVotes": 60,
          "voteHistory": {
            "totalCount": 60,
            "nodes": [
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              }
            ]
          }
        },
        {
          "id": "12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6",
          "numberOfVotes": 56,
          "voteHistory": {
            "totalCount": 56,
            "nodes": [
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              },
              {
                "approvedVote": true
              }
            ]
          }
        }
      ]
    }
  }
}
```


### Bonus

Including a **reverse lookup** on the schema file will allow you to customise the fields on which you can query. 


```
type Proposal @entity {
  id: ID!
  index: String!
  account: String
  hash: String
  voteThreshold: String
  block: BigInt
  voteHistory_p: [VoteHistory] @derivedFrom(field: "proposalHash")
}

type VoteHistory @entity {
  id: ID!
  proposalHash: Proposal
  approvedVote: Boolean!
  councillor: Councillor
  votedYes: Int
  votedNo: Int
  block: Int
}

type Councillor @entity {
  id: ID!
  numberOfVotes: Int
  voteHistory_c: [VoteHistory] @derivedFrom(field: "councillor")
}
```

Here, by adding `voteHistory_p` and `voteHistory_b`, `voteHistories` becomes `voteHistory_c`.


### References

* [Council Proposal PDF workbook](/assets/pdf/Council_Proposal.pdf)
* [Council Proposal Github](https://github.com/subquery/tutorials-council-proposals)
* [Many-to-Many relationships](../../build/graphql.md#many-to-many-relationships)

---

## Lesson 3: Reverse Lookups

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/4BllEtKEf9s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise - Account Transfer (With Reverse Lookup)

In this exercise, we will take the starter project and learn about the reverse lookups. 

### Pre-Requisites

Completion of [Module 3: Lesson 2 - One to many entities.](module3.md#lesson-2-many-to-many-entities)


### Overview of Steps Involved

1. Git clone the [tutorials-account-transfers](https://github.com/subquery/tutorials-account-transfers) project.
2. Run it to ensure it's working fine.
3. Add a new field in the schema and make it a reverse lookup.
4. Requery the project with the new “virtual” field as a reverse lookup.

### Detailed Steps

#### Step 1: Clone Account Transfer Project

Start by cloning the `tutorials-account-transfers` Github repository. 

::: info Note
This is similar to the exercise for Module 3 - Lesson 2.
:::

Run the following command:


```
git clone https://github.com/subquery/tutorials-account-transfers
```


#### Step 2: Confirm that Project Works 

Run the basic commands to run the project and check if it's all set.


```
yarn install
yarn codegen
yarn build
docker-compose pull && docker-compose up
```

Once the docker container is running, which may take a few minutes, open up your browser and navigate to `www.localhost:3000`. 

This will open up a **playground** where you can create your query. Copy the example below:

```
query{
  accounts(first: 3){  
    nodes{
      id
    }
    }
  }
```

The above code will query the account entity returning the id. Here. we have defined the id as the `toAddress`(also known as the **receiving address**). The code will return the following results:

```
{
  "data": {
    "accounts": {
      "nodes": [
        {
          "id": "11k5GkWb9npuqWRq5Pyk51RSnRyskPrPtsyoCApteEUjNou"
        },
        {
          "id": "121dZJsfG7uNvszPSpYvBzwnrcF1P4ejjrE1G6FSWHqht5tC"
        },
        {
          "id": "121rwkQAH3yCD1EcaRgc3nELSoZn29RoTtCN55mcN7RkBA66"
        }
      ]
    }
  }
}
```


As noted in a previous exercise(Lesson 1), we query the account id from within the **transfer entity**. 

The example given below shows that we are querying for transfers where we have an associated amount and blockNumber. After that, we can link this to the receiving or `to` address as follows: 



```
query{
  transfers(first: 3){
    nodes{
      id
      amount
      blockNumber
      to{
        id
      }
      }
    }
  }
```

The above query returns the following results:

```
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "7280565-2",
          "amount": "400009691000",
          "blockNumber": "7280565",
          "to": {
            "id": "15kUt2i86LHRWCkE3D9Bg1HZAoc2smhn1fwPzDERTb1BXAkX"
          }
        },
        {
          "id": "7280566-2",
          "amount": "23174700000000",
          "blockNumber": "7280566",
          "to": {
            "id": "14uh77yjhC3TLAE6KaCLvkjN7yFeUkejm7o7fdaSsggwD1ua"
          }
        },
        {
          "id": "7280567-2",
          "amount": "3419269000000",
          "blockNumber": "7280567",
          "to": {
            "id": "12sj9HTNQ7aiQoRg5wLyuemgvmFcrWeUJRi3aEUnJLmAE56Y"
          }
        }
      ]
    }
  }
}
```

#### Step 3: Add a Reverse Lookup

Add an extra field to the **Account** entity called `myToAddress`. Assign it the type `Transfer`, and add the `@derived` annotation. This will create a **virtual field** called `myToAddress`, which can be accessed from the Account entity. Note that it is virtual because the database table structure does not change. 

- Allows you to do a reverse lookup in Graphql.
- Adds a `GetElementByID()` on the child entities.

```
type Account @entity {
  id: ID! #this primary key is set as the toAddress
  myToAddress: [Transfer] @derivedFrom(field:"to")
}

type Transfer @entity {
  id: ID! #this primary key is the block number + the event id
  amount: BigInt
  blockNumber: BigInt
  to: Account! #receiving address
}
```

#### Step 4: Recompile and Test

```
query{
  accounts(first:5){
    nodes{
      id
      myToAddress{
        nodes{
          id
          amount
        }
      }
    }
  }
}
```

You will get a result similar to as follows:

```
{
  "data": {
    "accounts": {
      "nodes": [
        {
          "id": "1112NRMkvMb5x3EwGsLSzXyw7kSLxug4uFH1ec3CnDe7ZoG",
          "myToAddress": {
            "nodes": [
              {
                "id": "1206531-14",
                "amount": "123000000000"
              },
              {
                "id": "1206533-9",
                "amount": "30000000000"
              },
              {
                "id": "1249840-2",
                "amount": "100000000000"
              }
            ]
          }
        },
        {
          "id": "1117zZ65F4sz3EH9hZdAivERch99XMXADHicJn7ZmKUrrxT",
          "myToAddress": {
            "nodes": [
              {
                "id": "1256968-5",
                "amount": "86880000000"
              },
              {
                "id": "1256984-5",
                "amount": "12299500000000"
              }
            ]
          }
        },
        {
          "id": "11212d8rV4pj73RLoXqiEJweNs2qU1SsfwbzzRWVzn2o5ZCt",
          "myToAddress": {
            "nodes": [
              {
                "id": "1212424-9",
                "amount": "50000000000"
              },
              {
                "id": "1212680-3",
                "amount": "150000000000"
              },
              {
                "id": "1212719-3",
                "amount": "22622363200000"
              },
              {
                "id": "1240252-2",
                "amount": "41055764800000"
              },
              {
                "id": "1258672-6",
                "amount": "49000000000"
              }
            ]
          }
        }
      ]
    }
  }
}
```


Adding the `@derivedFrom` keyword to the `myToAddress` field allows a **virtual field** to appear in the `Account` object. You can see this in the documentation tab. This allows a **reverse lookup** where the `Transfer.to` field can be accessed from `Account.myToAddress`. 

### References

* [Account Transfer with Reverse Lookups PDF Workbook](/assets/pdf/Account_Transfer_with_Reverse_Lookups)
* [Account Transfer with Reverse Lookups Github](https://github.com/subquery/tutorials-account-transfer-reverse-lookups)
* [Reverse lookups](../../build/graphql.md#reverse-lookups)
