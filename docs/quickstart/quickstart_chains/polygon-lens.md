# Polygon Quick Start - Lens Protocol

## Goals

This article's purpose is to provide a clear, step-by-step guide on setting up an indexer for the Lens Protocol on the Polygon blockchain. By the end of this guide, you will understand what Lens Protocol is, why its smart contract data is valuable, and how to set up a SubQuery indexer to track and index events like profile creation, post, and follow.

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Polygon project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-lens).
:::

## 1. Update Your Project Manifest File

In this Lens Protocol indexing project, our primary objective is to configure the indexer to specifically gather data from a single smart contract: `0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d`, which you can find on [this page](https://polygonscan.com/address/0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d). You can copy the entire JSON and save as a file `LensHub.abi.json` in the root directory.

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

For a more comprehensive understanding of how the fundamental mechanisms of this protocol work, you can refer to the official [Lens documentation](https://docs.lens.xyz/v2/docs/what-is-lens).

The Project Manifest (`project.ts`) file works as an entry point to your Polygon project. It defines most of the details on how SubQuery will index and transform the chain data. For Polygon, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Then, you need to update the `datasources` section as follows:

```ts
dataSources: [
  {
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 28384641, // This is the block that the contract was deployed on
    options: {
      // Must be a key of assets
      abi: "LensHub",
      address: "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
    },
    assets: new Map([["LensHub", { file: "./abis/LensHub.abi.json" }]]),
    mapping: {
      file: "./dist/index.js",
      handlers: [
        {
          kind: EthereumHandlerKind.Event,
          handler: "handlePostCreated",
          filter: {
            topics: [
              "PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)",
            ],
          },
        },
        {
          kind: EthereumHandlerKind.Event,
          handler: "handleProfileCreated",
          filter: {
            topics: [
              "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)",
            ],
          },
        },
        {
          kind: EthereumHandlerKind.Event,
          handler: "handleFollowed",
          filter: {
            topics: ["Followed(address,uint256[],bytes[],uint256)"],
          },
        },
      ],
    },
  },
];
```

This setup establishes an manifest file to gather and manage information from a particular smart contract on the Polygon network, specified by its unique address. It has three handlers:

1. `handlePostCreated`: This handler is responsible for processing data associated with the `PostCreated` event, which includes details about newly created posts.

2. `handleProfileCreated`: This handler is dedicated to managing data originating from the `ProfileCreated` event, which pertains to the creation of user profiles.

3. `handleFollowed`: This handler is designed to handle data stemming from the `Followed` event, which tracks user interactions related to following other users.

::: tip Note
Check out our [Manifest File](../../build/manifest/polygon.md) documentation to get more information about the Project Manifest (`project.ts`) file.
:::

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows:

```graphql
type Profile @entity {
  id: ID!
  handle: String
  imageURI: String
  creator: Account
  owner: Account
  followNFT: String
  followNFTURI: String
  posts: [Post!] @derivedFrom(field: "profile")
  createdAt: BigInt
  follows: [Follow]! @derivedFrom(field: "toProfile")
}

type Post @entity {
  id: ID!
  contentURI: String
  profile: Profile
  collectModule: String
  collectModuleReturnData: String
  timestamp: BigInt
}

type Account @entity {
  id: ID!
  profiles: [Profile!] @derivedFrom(field: "owner")
}

type Follow @entity {
  id: ID!
  fromAccount: Account
  toProfile: Profile
  timestamp: BigInt
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

From three logs we're working with, there's a wealth of data to extract. Notably, the following entities can be derived:

- `Profile` that represents a user profile on the Lens Protocol. Attributes include an ID, user handle, profile image URI, creator account, owner account, follow NFT information, follow NFT URI, creation timestamp, and an array of posts associated with this profile. The `follows` attribute establishes a one-to-many relationship with the `Follow` entity, linking profiles to the users they are followed by.

- `Post` which represents a post. Attributes include an ID, content URI, the profile that created the post, the collect module used, collect module return data, and a timestamp for when the post was created.

- `Account` which represents an individual Polygon account. It is linked to one or more profiles (one-to-many relationship), indicating that an account can own multiple user profiles.

- `Follow` that represents a follow action. Attributes include an ID, the account that initiated the follow action, the profile that was followed, and a timestamp for when the follow action occurred.

::: tip Note
Importantly, these relationships not only establish one-to-many connections but also extend to include many-to-many associations. To delve deeper into entity relationships, you can refer to [this section](../../build/graphql.md#entity-relationships). If you prefer a more example-based approach, our dedicated [Hero Course Module](../../academy/herocourse/module3.md) can provide further insights.
:::

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

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

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entites can be imported from the following directory:

```ts
import { Account, Post, Profile, Follow } from "../types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
// Import a smart contract event class generated from provided ABIs
import {
  PostCreatedLog,
  ProfileCreatedLog,
  FollowedLog,
} from "../types/abi-interfaces/LensHubAbi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import {
  PostCreatedLog,
  ProfileCreatedLog,
  FollowedLog,
} from "../types/abi-interfaces/LensHubAbi";
import { Account, Post, Profile, Follow } from "../types";
import assert from "assert";
import { BigNumber } from "ethers";

export async function getOrCreateAccount(
  accountAddress: string
): Promise<Account> {
  let account = await Account.get(accountAddress);
  if (account == null) {
    account = Account.create({
      id: accountAddress,
    });
  }
  return account;
}

export async function getOrCreateFollow(
  accountAddress: string
): Promise<Follow> {
  let follow = await Follow.get(accountAddress);
  if (follow == null) {
    follow = Follow.create({ id: accountAddress });
  }
  return follow;
}

export function getNewPublicactionId(profileId: BigInt, pubId: BigInt): string {
  return profileId.toString().concat("-").concat(pubId.toString());
}

export async function getOrCreatePost(pubId: BigInt): Promise<Post> {
  let post = await Post.get(pubId.toString());
  if (post === undefined) {
    post = await Post.create({
      id: pubId.toString(),
    });
  }
  return post;
}

export async function getOrCreateProfile(profileId: string): Promise<Profile> {
  let profile = await Profile.get(profileId);
  if (profile === undefined) {
    profile = Profile.create({
      id: profileId,
    });
  }
  return profile;
}

export async function handleProfileCreated(
  event: ProfileCreatedLog
): Promise<void> {
  logger.warn("Handling ProfileCreatedLog");
  assert(event.args, "No log args");
  logger.warn(event.args.profileId.toString());

  let profile = await getOrCreateProfile(event.args.profileId.toString());
  let creator = await getOrCreateAccount(event.args.creator);
  let to = await getOrCreateAccount(event.args.to);
  profile.creatorId = creator.id;
  profile.ownerId = (await getOrCreateAccount(event.args.to)).id;
  profile.followNFTURI = event.args.followNFTURI;
  profile.handle = event.args.handle;
  profile.imageURI = event.args.imageURI;
  creator.save();
  to.save();
  profile.save();
}

export async function handlePostCreated(event: PostCreatedLog): Promise<void> {
  logger.warn("Handling PostCreatedLog");
  assert(event.args, "No log args");
  let post = await getOrCreatePost(event.args.pubId.toBigInt());
  let profile = await getOrCreateProfile(event.args.profileId.toString());
  post.profileId = profile.id;
  post.timestamp = event.args.timestamp.toBigInt();
  post.contentURI = event.args.contentURI;
  profile.save();
  post.save();
}

export async function handleFollowed(event: FollowedLog): Promise<void> {
  logger.warn("Handling FollowedLog");
  assert(event.args, "No log args");
  for (let index in event.args.profileIds) {
    let profileId = event.args.profileIds[index];
    logger.warn(profileId.toString());
    let profile = await getOrCreateProfile(profileId.toString());
    let follow = await getOrCreateFollow(
      event.args.follower
        .concat("-")
        .concat(event.transaction.hash)
        .concat("-")
        .concat(profileId.toString())
    );
    let follower = await getOrCreateAccount(event.args.follower);
    follow.fromAccountId = follower.id;
    follow.toProfileId = profile.id;
    follow.timestamp = event.args.timestamp.toBigInt();
    profile.save();
    follow.save();
    follower.save();
  }
}
```

Let's dive into an explanation of the code above. The code includes three distinct handlers, each of which leverages some helper functions for interacting with different entities:

1. `handleProfileCreated` which either creates a new profile entity or updates an existing one. It assigns key attributes such as the creator's ID, owner's ID, follow NFT URI, user handle, and profile image URI.

2. `handlePostCreated` which performs a similar task as the first handler, creating or updating a post entity. This includes specifying the profile ID, timestamp, content URI, and other pertinent attributes.

3. `handleFollowed`. For each profile that's being followed, it either creates a new profile entity or updates an existing one, and a follow entity is established. It associates the follower, the profile being followed, and the timestamp with the follow event.

🎉 At this point, we've effectively integrated all the desired entities that can be retrieved from Lens smart contract. For each of these entities, there is a corresponding mapping handler to structure and store the data in a format that can be easily queried and utilised.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-lens) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

::: details Posts and Profiles

**Request**

```graphql
{
  posts(first: 1) {
    nodes {
      id
      contentURI
      collectModule
      profile {
        id
        owner {
          id
        }
        followNFTURI
        creator {
          id
        }
      }
    }
  }
}
```

**Reponse**

```json
{
  "data": {
    "posts": {
      "nodes": [
        {
          "id": "354",
          "contentURI": "ar://ujK-ZBiv9QfVDW4a-VVj3USz5LFGjMwTpvN1A09kbq0",
          "collectModule": null,
          "profile": {
            "id": "98203",
            "owner": null,
            "followNFTURI": null,
            "creator": null
          }
        }
      ]
    }
  }
}
```

:::

::: details Follows

**Request**

```graphql
{
  follows(first: 1) {
    nodes {
      id
      timestamp
      fromAccount {
        id
      }
      toProfile {
        id
        owner {
          id
        }
        followNFTURI
        creator {
          id
        }
      }
    }
  }
}
```

**Reponse**

```json
{
  "data": {
    "follows": {
      "nodes": [
        {
          "id": "0x57B7bf6f792a6181Ec5aFB88cE7bcE330a9d1b67-0x7ea8308689589c49a2ba71593a697841466dc2a2609f4cad03caa956c911fa65-119173",
          "timestamp": "1696602888",
          "fromAccount": {
            "id": "0x57B7bf6f792a6181Ec5aFB88cE7bcE330a9d1b67"
          },
          "toProfile": {
            "id": "119173",
            "owner": null,
            "followNFTURI": null,
            "creator": null
          }
        }
      ]
    }
  }
}
```

:::

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-lens).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for Lens Protocol data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
