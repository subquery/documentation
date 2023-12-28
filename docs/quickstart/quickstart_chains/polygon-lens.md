# Polygon Quick Start - Lens Protocol

This article's purpose is to provide a clear, step-by-step guide on setting up an indexer for the Lens Protocol on the Polygon blockchain. By the end of this guide, you will understand what Lens Protocol is, why its smart contract data is valuable, and how to set up a SubQuery indexer to track and index events like profile creation, post, and follow.

**Please initialise a Polygon project**

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-lens).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

In this Lens Protocol indexing project, our primary objective is to configure the indexer to specifically gather data from a single smart contract: `0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d`, which you can find on [this page](https://polygonscan.com/address/0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d). You can copy the entire JSON and save as a file `LensHub.abi.json` in the root directory.

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

For a more comprehensive understanding of how the fundamental mechanisms of this protocol work, you can refer to the official [Lens documentation](https://docs.lens.xyz/v2/docs/what-is-lens).

Then, you need to update the `datasources` section as follows:

```ts
{
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
}
```

This setup establishes an manifest file to gather and manage information from a particular smart contract on the Polygon network, specified by its unique address. It has three handlers:

1. `handlePostCreated`: This handler is responsible for processing data associated with the `PostCreated` event, which includes details about newly created posts.

2. `handleProfileCreated`: This handler is dedicated to managing data originating from the `ProfileCreated` event, which pertains to the creation of user profiles.

3. `handleFollowed`: This handler is designed to handle data stemming from the `Followed` event, which tracks user interactions related to following other users.

<!-- @include: ../snippets/polygon-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Account, Post, Profile, Follow } from "../types";
import {
  PostCreatedLog,
  ProfileCreatedLog,
  FollowedLog,
} from "../types/abi-interfaces/LensHubAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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

export async function getOrCreateAccount(
  accountAddress: string
): Promise<Account> {
  let account = await Account.get(accountAddress);
  if (!account) {
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
  if (!follow) {
    follow = Follow.create({ id: accountAddress });
  }
  return follow;
}

export function getNewPublicactionId(profileId: BigInt, pubId: BigInt): string {
  return profileId.toString().concat("-").concat(pubId.toString());
}

export async function getOrCreatePost(pubId: BigInt): Promise<Post> {
  let post = await Post.get(pubId.toString());
  if (!post) {
    post = await Post.create({
      id: pubId.toString(),
    });
  }
  return post;
}

export async function getOrCreateProfile(profileId: string): Promise<Profile> {
  let profile = await Profile.get(profileId);
  if (!profile) {
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
  Promise.all([creator.save(), to.save(), profile.save()]);
}

export async function handlePostCreated(event: PostCreatedLog): Promise<void> {
  logger.warn("Handling PostCreatedLog");
  assert(event.args, "No log args");
  let post = await getOrCreatePost(event.args.pubId.toBigInt());
  let profile = await getOrCreateProfile(event.args.profileId.toString());
  post.profileId = profile.id;
  post.timestamp = event.args.timestamp.toBigInt();
  post.contentURI = event.args.contentURI;
  Promise.all([profile.save(), post.save()]);
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
    Promise.all([profile.save(), follow.save(), follower.save()]);
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

<!-- @include: ../snippets/polygon-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
