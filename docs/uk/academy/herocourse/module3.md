# Module 3: Relationships

## Lesson 1: One to many entities

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/7ApycKhiPTw" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

In these exercises, we will take the starter project and focus on understanding a popular one to many entity relationships. We will create a project that allows us to query for accounts and determine how much was transferred to what receiving address. 

### Pre-requisites

Completion of Module 2

### Balances Transfers (1-to-many)

### High level steps

1. Initialise the starter project
2. Update your mappings, manifest file and graphql schema file by removing all the default code except for the handleEvent function.
3. Generate, build and deploy your code
4. Deploy your code in Docker
5. Query for address balances in the playground

### Detailed steps
#### Step 1: Initialize your project

The first step in creating a SubQuery project is to create a project with the following command:


```
~/Code/subQuery$ subql init
Project name [subql-starter]: balances-transfers
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
balances-transfers is ready
```

#### Step 2: Update the graphql schema

Create an entity called “Account”. This account will contain multiple transfers. An account can be thought of as a Polkadot address owned by someone.

Transfers can be thought of  as a transaction with an amount, a sender and a receiver. (Let’s ignore the sender for now). Here, we will obtain the amount transferred, the blockNumber and who it was sent to, which is also known as the receiver. The schema file should look like this:

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

#### Step 3: Update the manifest file (aka project.yaml)

Update the manifest file to only include the handleEvent handler and update the filter method to Transfer. This is because we only want to work with balance transfer events which will contain the data for transactions being transferred from one account to another. 


```
specVersion: 0.2.0
name: balances-transfers
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
  dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot'
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


Also note the inclusion of a dictionary also.


#### Step 4: Update the mappings file

The initialisation command pre-creates a sample mappings file with 3 functions, handleBlock, handleEvent and handleCall. As we are only focusing on handleEvent, delete the remaining functions. 

We also need to make a few other changes. Firstly, we need to understand that the balance.transfer event provides access to an array of data in the following format: [from, to, value]. This means we can access the values as follows:

```
    const fromAddress = event.event.data[0];
    const toAddress = event.event.data[1]; 
    const amount = event.event.data[2];
```

Next, because the Account entity (formally called the StarterEntity), was instantiated in the handleBlock function and we no longer have this, we need to instantiate this within our handleEvent function. However, we need to first test to see if this value is already in our database. This is because an event can contain multiple transfers to the SAME toAddress. 

So we get the toAddress and if it does not exist, we save it to the database.

```
       const toAccount = await Account.get(toAddress.toString());
       if (!toAccount) {
           await new Account(toAddress.toString()).save();
       }
```

For the Transfer entity object, we set the primary key as the blocknumber+event.idx (which guarantees uniqueness) and then set the other fields of the Transfer entity object accordingly.

```
    const transfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`, );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.toId = toAddress.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
```

The mappingHandler.ts file should look like this:

```
import {SubstrateEvent} from "@subql/types";
import {Account, Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
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
```

#### Step 5: Generate the associated typescript

Next, we will generate the associated typescript with the following command:

```
yarn codegen
```

OR

```
npm run-script codegen
```

#### Step 6: Build the project

The next step is to build the project with the following command:

```
yarn build
```

OR

```
npm run-script build
```

This bundles the app into static files for production.

#### Step 7: Start the Docker container

Run the docker command to pull the images and to start the container.

```
docker-compose pull && docker-compose up
```

#### Step 8: Run a query

Once the docker container is up and running, which could take a few minutes, open up your browser and navigate to [www.localhost:3000](www.localhost:3000). 

This will open up a “playground” where you can create your query. Copy the example below. 

```
query{
  accounts(first: 3){  
    nodes{
      id
    }
    }
  }
```

This will query the account entity returning the id. We have defined the id here as the “toAddress”, otherwise known as the receiving address. This will return the following:

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

We can also query for all the transfers:

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

This will return the following:

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

The magic lies in the ability to query the account id from within the transfer query. The example below shows that we are querying for transfers where we have an associated amount and blockNumber, but we can then link this to the receiving or “to” address as follows: 

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

The query above returns the following results:

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

Looking at the database schema also helps us understand what is happening. The accounts table is a standalone table containing just receiving addresses (accounts.id). The transfer table contains “to_id” which is links or points back to accounts. 

In other words, one account links to many transfers or more verbosely stated, each unique Polkadot address that is stored in accounts.id links to one or more than one Polkadot address that has an associated amount and block number. 


### References

* [Account Transfers PDF workbook](/assets/pdf/Account_Transfers.pdf)
* [Account Transfers Github](https://github.com/subquery/tutorials-account-transfers)
* [One-to-many relationships](/build/graphql/#one-to-one-relationships)

## Lesson 2: Many to many entities

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/TKsJ6FQGrEs" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

Here we will take the starter project and focus on understanding how many-to-many relationships work. We will create a project that allows us to query for the number of votes that councillors have made and how many votes a given proposal has received. 

To learn more about the Polkadot governance structure, please refer to: [https://polkadot.network/blog/a-walkthrough-of-polkadots-governance/](https://polkadot.network/blog/a-walkthrough-of-polkadots-governance/)

### Pre-requisites

Completion of Module 2

### Council Proposals (many-to-many)

### High-level steps

1. Initialise the starter project
2. Update your mappings, manifest file and graphql schema file by removing all the default code except for the handleEvent function.
3. Generate, build and deploy your code
4. Deploy your code in Docker
5. Query for address balances in the playground


### Detailed steps

#### Step 1: Initialize your project

The first step in creating a SubQuery project is to create a project with the following command:

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

#### Step 2: Update the graphql schema

Let’s first create an entity called “Proposals”. This proposal is an event of type council. In other words, we are interested in extracting data from the council event. Visit [https://polkadot.js.org/docs/substrate/events#council](https://polkadot.js.org/docs/substrate/events#council) for more information. 

Within the council event, we are going to focus on the “proposed” method. The proposed method is defined as:

_“ A motion (given hash) has been proposed (by given account) with a threshold (given MemberCount). [account, proposal_index, proposal_hash, threshold]” - [source](https://polkadot.js.org/docs/substrate/events#proposedaccountid32-u32-h256-u32)_

We can therefore add the following fields: id, index, hash, voteThreshold and block to our entity. 
            id => _account_
            index => _proposal_index_
            hash => _proposal_hash_
            voteThreshold => _threshold_
            block => _Not part of proposed method but useful to extract_

Next, let’s create an entity object called Councillor. This object will simply hold the number of votes each councillor has made. 

Finally, let’s create a VoteHistory entity. This will be another [council event](https://polkadot.js.org/docs/substrate/events#council) using the [voted](https://polkadot.js.org/docs/substrate/events#votedaccountid32-h256-bool-u32-u32) method defined as:

_“A motion (given hash) has been voted on by a given account, leaving a tally (yes votes and no votes given respectively as MemberCount). [account, proposal_hash, voted, yes, no]”_

We can therefore add the following fields: id, proposalHash, approvedVote, councillor, votedYes, votedNo, and block to our entity. 


            id => _account_
            **proposalHash => Proposal**
            approvedVote => _voted_
            **Councillor => Councillor**
            votedYes => _yes_
            votedNo => _no_
            block => _Not part of proposed method but useful to extract_

Note that for proposalHash, we are specifying the type as the proposal entity. We also introduced a new field called Councillor and gave that a type of Councillor. What this has effectively done is created a table where these two columns are references to their respective tables. 

This means that the VoteHistory entity or VoteHistory database table can link the Councillor entity to the Proposal entity thereby creating what can be considered as a many to many relationship. 

A councillor can vote for many proposals and a proposal will have many votes is effectively what this all means. 

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

#### Step 3: Update the manifest file (aka project.yaml)

Update the manifest file to only include two Event handlers and update the filter method to council/Proposed and council/Voted. 


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

#### Step 4: Update the mappings file

##### handleCouncilProposedEvent

This mappings file will contain three functions. Let’s call the first function “handleCouncilProposedEvent”.

We can access the values of the event with the following code: 

```
  const {
    event: {
      data: [accountId, proposal_index, proposal_hash, threshold],
    },
  } = event;
```

Then we instantiate a new Proposal object,


```
  const proposal = new Proposal(proposal_hash.toString());
```

and then assign each of the events to a variable in the Proposal object and save it. 


```
  proposal.index = proposal_index.toString();
  proposal.account = accountId.toString();
  proposal.hash = proposal_hash.toString();
  proposal.voteThreshold = threshold.toString();
  proposal.block = event.block.block.header.number.toBigInt();
  await proposal.save();
```

##### handleCouncilVotedEvent

This function follows a similar format of handleCouncilProposedEvent from above. The event parameters are first obtained,

```
const {
    event: {
      data: [councilorId, proposal_hash, approved_vote, numberYes, numberNo],
    },
  } = event;
```

but before storing the values into the voteHistory object, a helper function is used to check if the councillorId already exists. 

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
The complete mapping files look like the following:

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

#### Step 5: Install the dependencies

Install the node dependencies by running the following commands:

```
yarn install
```

OR

```
npm install
```

#### Step 6: Generate the associated typescript

Next, we will generate the associated typescript with the following command:


```
yarn codegen
```

OR

```
npm run-script codegen
```

#### Step 7: Build the project

The next step is to build the project with the following command:

```
yarn build
```

OR

```
npm run-script build
```

This bundles the app into static files for production.

#### Step 8: Start the Docker container

Run the docker command to pull the images and to start the container.

```
docker-compose pull && docker-compose up
```

#### Step 9: Run a query

Once the docker container is up and running, which could take a few minutes, open up your browser and navigate to [localhost:3000](http://localhost:3000). 

This will open up a “playground” where you can create your query. Copy the example below. 

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

This will query the councillors, and for each councillor return the number of votes and for each councillor also return the totalCount and the number of approved votes as can be seen below.

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

Including a reverse lookup on the schema file will allow us to customise the fields that we can query on. 

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

By adding voteHistory_p and voteHistory_b, voteHistories becomes voteHistory_c

### References

* [Council Proposal PDF workbook](/assets/pdf/Council_Proposal.pdf)
* [Council Proposal Github](https://github.com/subquery/tutorials-council-proposals)
* [Many-to-many relationships](/build/graphql/#many-to-many-relationships)

## Lesson 3: Reverse lookups

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/4BllEtKEf9s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

In this lab, we will take the starter project and focus on understanding what reverse lookups are. 

### Pre-requisites

Completion of Module 3: Lesson 2 - One to many entities.

### Account Transfer (with reverse lookup)

### High level steps

1. Git clone the tutorials-account-transfers project
2. Run it to ensure it is working 
3. Add a new field in the schema and make it a reverse lookup
4. Requery the project with this new “virtual” field as a reverse look up

### Detailed steps

#### Step 1: Clone Account Transfer project


```
git clone https://github.com/subquery/tutorials-account-transfers
```

Start by cloning the “tutorials-account-transfers” Github repository. This was the exercise for Module 3 - Lesson 2.

#### Step 2: Confirm the project works. 

Run the basic commands to get the project up and running.


```
yarn install
yarn codegen
yarn build
docker-compose pull && docker-compose up
```

Once the docker container is up and running, which could take a few minutes, open up your browser and navigate to [www.localhost:3000](www.localhost:3000). 

This will open up a “playground” where you can create your query. Copy the example below. 

```
query{
  accounts(first: 3){  
    nodes{
      id
    }
    }
  }
```

This will query the account entity returning the id. We have defined the id here as the “toAddress”, otherwise known as the receiving address. This will return the following:

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

As noted in a previous exercise, the magic lies in the ability to query the account id from within the transfer entity. The example below shows that we are querying for transfers where we have an associated amount and blockNumber, but we can then link this to the receiving or “to” address as follows: 

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

The query above returns the following results:

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

#### Step 3: Add a reverse lookup

Add an extra field to the Account entity called myToAddress. Make this of type Transfer and add the @derived annotation. This is making a “virtual field” called myToAddress that can be accessed from the Account entity. It is virtual because the database table structure does not actually change. 

* Allows you to do a reverse lookup in Graphql
* Adds a GetElementByID() on the child entities

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

#### Step 4: Recompile and test

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

You should get something similar to the following:

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

[Reverse lookups](/create/graphql.md)
Adding the @derivedFrom keyword to the myToAddress field allows a “virtual” field to appear in the Account object. This can be seen in the documentation tab. This allows a “reverse lookup” where the Transfer.to field can be accessed from Account.myToAddress. 

### References

* [Account Transfer with Reverse Lookups PDF Workbook](/assets/pdf/Account_Transfer_with_Reverse_Lookups)
* [Account Transfer with Reverse Lookups Github](https://github.com/subquery/tutorials-account-transfer-reverse-lookups)
* [Reverse lookups](/create/graphql.md)
