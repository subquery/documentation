# Module 5: Projects & Explorer

This module takes you on a tour of the SubQuery Projects & Explorer. It shows you what you can do with the SubQuery Project, other than deploying your own project. 

The module is divided into two video lessons and one guided exercise(with documentation references). Let's have a look. 


## Lesson 1 - Deploying a project

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/8QcFvd-_3YQ" frameborder="0" allowfullscreen="true"></iframe>
</figure>

---

## Lesson 2 - What are SubQuery Slots and How to Use Them?

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/JeYa3JlxR1g" frameborder="0" allowfullscreen="true"></iframe>
</figure>

- **Documentation Reference:**

[What are deployment slots?](/faqs/faqs.md#how-much-does-it-cost-to-host-my-project-in-subquery-projects)

---

## Lesson 3 - Exploring Projects

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/TMT00Ggs7tc" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

In this exercise, we will learn what [SubQuery Project](https://project.subquery.network/) is, how to deploy a project to SubQuery Project, and learn about SubQuery Explorer.

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

The detailed steps to deploy a project to [SubQuery Projects](https://project.subquery.network/) are outlined within our documentation website. **Please visit [this section](../../run_publish/publish.md).**

The process begins with a starter project, then uploads it to GitHub, connects GitHub to SubQuery Projects, and then deploys it.

You can deploy any project of your choice to SubQuery Projects. But the most appropriate would be a project from the previous module.

#### Step 2: Switch GitHub Accounts

It is a common practice to publish your SubQuery project under the name of your **GitHub Organization account**, rather than your personal GitHub account. Please refer to:

- [Add GitHub Organization Account to SubQuery Projects](/run_publish/publish.md#add-github-organization-account-to-subquery-projects)

#### Step 3: Override Endpoints

When deploying your project, it is possible to override your default network or dictionary endpoints with another network. For more information please see:

- [Deploy your project](/run_publish/publish.md#deploy-your-first-version)


To understand more about how dictionaries work, refer to:

- [How does a SubQuery dictionary work?](/academy/tutorials_examples/dictionary.md)


#### Step 4: Understand the Slots

Slots are a feature in SubQuery Projects that are the equivalent of a development environment. To learn more, visit:

- [What are deployment slots?](../../faqs/faqs.md#what-are-deployment-slots) 
- [What is the advantage of a staging slot?](../../faqs/faqs.md#what-is-the-advantage-of-a-staging-slot)

#### Step 5: Access Playground

Once your project is deployed, access your project and run your desired query in the playground. For more information, visit:


- [Query your Project in SubQuery Explorer](/run_publish/query.md)


GraphQL is the language used to query for data. To learn more about GraphQL visit:

- [Learn more about GraphQL](/run_publish/graphql.md)


#### Step 6: Query via the API

Developers will typically query the SubQuery project via API. See an example of how this is done at:

- [Querying via the API](../../quickstart/quickstart_chains/polkadot.md#_6-query-your-project)


#### Step 7: Delete SubQuery Projects

It is important to keep your SubQuery projects tidy and ensure that test projects are not running unnecessarily. This consumes extra resources on the network and creates extra cost as well. 

To delete a project see the guide below:

- [Deleting SubQuery projects](/academy/tutorials_examples/delete-projects.md)


### References

- [What are deployment slots?](../../faqs/faqs.md#what-are-deployment-slots)
