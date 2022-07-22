# Module 5: Projects & Explorer

## Lesson 1 - Deploying a project

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/8QcFvd-_3YQ" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Lesson 2 - What are SubQuery slots and how to use them?

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/JeYa3JlxR1g" frameborder="0" allowfullscreen="true"></iframe>
</figure>

**Documentation reference**

[What are deployment slots?](/faqs/faqs.md#how-much-does-it-cost-to-host-my-project-in-subquery-projects)

## Lesson 3 - Exploring projects

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/TMT00Ggs7tc" frameborder="0" allowfullscreen="true"></iframe>
</figure>

### Exercise

Here we will learn what SubQuery Project is, how to deploy a project to SubQuery Project, and learn about SubQuery Explorer.

NB: “SubQuery Project” (uppercase P) is SubQuery’s hosted solution. SubQuery project (lowercase p) refers to a general SubQuery project such as the “account transfer SubQuery project”.

### Pre-requisites

None.

### Deploying your project

### High level steps

1. Upload your project to GitHub.
2. Connect SubQuery Project to GitHub.
3. Create a project.
4. Deploy your project.
5. Testing your project in playground.

### Detailed steps

#### Step 1: Hello World (SubQuery hosted)

The detailed steps to deploy a project to SubQuery Projects are outlined on our documentation website. Please visit [this section](../../run_publish/publish.md). It takes a starter project, uploads it to GitHub, connects GitHub to SubQuery Projects and then deploys it.

Any project of your choice can be deployed to SubQuery Projects, but the most appropriate would be a project from the previous module.

#### Step 2: Switching GitHub accounts

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. Please refer to:

- [Add GitHub Organization Account to SubQuery Projects](/run_publish/publish.md#add-github-organization-account-to-subquery-projects)

#### Step 3: Overriding endpoints

When deploying your project, it is possible to override your default network or dictionary endpoints with another network. For more information please see:

- [Deploy your project](/run_publish/publish.md#deploy-your-first-version)

To understand more about how dictionaries work, refer to:

- [How does a SubQuery dictionary work?](/academy/tutorials_examples/dictionary.md)

#### Step 4: Understanding slots

Slots are a feature in SubQuery Projects that are the equivalent of a development environments. To learn more, visit:

- [What are deployment slots?](../../faqs/faqs.md#what-are-deployment-slots) 
- [What is the advantage of a staging slot?](../../faqs/faqs.md#what-is-the-advantage-of-a-staging-slot)

#### Step 5: Accessing Playground

Once your project is deployed, access your project and run your desired query in playground. For more information, visit:

- [Query your Project in SubQuery Explorer](/run_publish/query.md)

GraphQL is the language used to query for data. To learn more about GraphQL visit:

- [Learn more about GraphQL](/run_publish/graphql.md)

#### Step 6: Querying via the API

Developers will typically query the SubQuery project via API. See an example of how this is done at:

- [Querying via the API](../../quickstart/quickstart_chains/polkadot.md#_6-query-your-project)

#### Step 7: Deleting SubQuery projects

It is important to keep your SubQuery projects tidy and ensure that test projects are not running unnecessarily. This consumes extra resources on the network and creates extra cost as well. To delete a project see the guide below:

- [Deleting SubQuery projects](/academy/tutorials_examples/delete-projects.md)

### References

- [What are deployment slots?](../../faqs/faqs.md#what-are-deployment-slots)
