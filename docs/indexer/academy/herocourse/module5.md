# Module 5: Projects & Explorer

SubQuery Managed Service is our managed service solution and SubQuery Explorer is a dashboard where you can find projects and consume project data using GraphQL. This module takes a deeper dive into both these products.

## Lesson 1 - Deploying a project

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/8QcFvd-_3YQ" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### References

- [SubQuery Managed Service](https://managedservice.subquery.network/)

## Lesson 2 - What are SubQuery Slots and How to Use Them?

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/JeYa3JlxR1g" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Lesson 3 - Exploring Projects

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/TMT00Ggs7tc" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

In this exercise, we will learn what [SubQuery Project](https://managedservice.subquery.network/) is, how to deploy a project to SubQuery Project, and learn about SubQuery Explorer.

:::info Note

“SubQuery Project” (uppercase P) is SubQuery’s hosted solution. SubQuery project (lowercase p) refers to a general SubQuery project such as the **“account transfer SubQuery project”**.

:::

### Pre-Requisites

None.

### Deploying your Project

### Overview of Steps

1. Upload your project to GitHub.
2. Connect SubQuery Project to GitHub.
3. Create a project.
4. Deploy your project.
5. Testing your project in playground.

### Detailed Steps

#### Step 1: Hello World (SubQuery Hosted)

The detailed steps to deploy a project to [OnFinality Indexer Service](https://indexing.onfinality.io/) are outlined within their documentation website. **Please visit [this section](https://documentation.onfinality.io/support/data-indexing-service).**

The process begins with a starter project, then uploads it to GitHub, connects GitHub to SubQuery Managed Service, and then deploys it.

You can deploy any project of your choice to SubQuery Managed Service. But the most appropriate would be a project from the previous module.

#### Step 2: Switch GitHub Accounts

It is a common practice to publish your SubQuery project under the name of your **GitHub Organization account**, rather than your personal GitHub account. Please refer to:

- [Add GitHub Organization Account to SubQuery Managed Service](https://documentation.onfinality.io/support/add-github-organization-account-to-subquery-projec)

#### Step 3: Override Endpoints

When deploying your project, it is possible to override your default network or dictionary endpoints with another network. For more information please see:

- [Deploy your project](https://documentation.onfinality.io/support/publishing-your-subquery-project)

To understand more about how dictionaries work, refer to:

- [How does a SubQuery dictionary work?](../tutorials_examples/dictionary.md)

#### Step 4: Understand the Slots

Slots are a feature in OnFinality's Indexing Service that are the equivalent of a development environment. To learn more, visit https://indexing.onfinality.io/

#### Step 5: Access Playground

Once your project is deployed, access your project and run your desired query in the playground. For more information, visit:

- [Query your Project using GraphQL in SubQuery Explorer](../../run_publish/query/graphql.md)

#### Step 6: Query via the API

Developers will typically query the SubQuery project via API. See an example of how this is done at:

- [Querying via the API](../../quickstart/quickstart_chains/polkadot.md#_6-query-your-project)
