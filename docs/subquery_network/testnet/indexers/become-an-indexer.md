# How to Become an Indexer

## Table of Content and Process Flow

| Steps | Process Flow | Additional References
--- | --- | ---
1 | Set Up & Start Indexing (3 Methods)<ul><li>[Locally](../indexers/install-indexer-locally.md)</li><li>Or [On Linux](../indexers/install-indexer-linux.md)</li><li>Or [On AWS](../indexers/install-indexer-aws.md)</li></ul> | [How to SSH on AWS](../indexers/ssh-in-aws.md)
2 | [Connect to MetaMask](../metamask/connect-metamask.md) | - 
3 | [Request TestNet Tokens](../metamask/request-token.md) | - 
4 | [Index a SubQuery Project](../indexers/index-project.md) | -
5 | [Troubleshooting](../indexers/troubleshooting-indexers.md) | -
6 | [FAQs](../indexers/faqs-indexers.md) | - 


## Introduction 

Welcome to the **Service Guide of Running an Indexer**. This guide includes all the necessary steps to set up an Indexer and start indexing a project.

Let's take an overview of the basic steps involved in the process:


### 1. Create a VM on AWS

For those who are **new to SubQuery**, it is recommended to try running the Indexing Service on your local machine first. It will take just 5 minutes and help you familiarise yourself with the process. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your Indexing Service.

### 2. Install Docker

Note that you may or may not need to install Docker. 

If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file. 

### 3. Start the Indexing Service

After you are done with the installation stage, start the Indexing Service with just s a **one-line**
 Docker command.

```jsx
docker-compose up
```

Now, move ahead in the process and connect to MetaMask.

### 4. Connect to MetaMask

Once your Indexing Service is all set and running successfully, take a sneak peek into how to connect to MetaMask:

### 5. Index Your Project 

After connecting your Indexing Service with MetaMask, you can finally start indexing a SubQuery project. 

---

## How to Start the Process?

```
Important: There are 3 distinct ways to run an indexer service. 
Choose a way that you find the best suited for you and follow the guided steps.
```

*You can run the Indexing Service:*
1. Locally 
2. On AWS or other cloud Services
3. On Linux 

**Note:**  If you are just a beginner, we advise you to run the indexing service locally. 

Depending on the method you choose, you will encounter some differences in the process of setting up the indexer. Hence, we have covered distinct guides for every hosting environment/method. ***Have a look:***

## 1. For Running the Indexing Service Locally

Visit **[this guide](../indexers/install-indexer-locally.md)** and begin with installing the service

## 2. For Running the Indexing Service on Linux

Visit **[this guide](../indexers/install-indexer-linux.md)** and begin with installing the service 

## 3. For Running the Indexing Service on AWS

Visit **[this guide](../indexers/install-indexer-aws.md)** and begin with setting up the service 

<br />

```Additional Notes:```

- Got stuck during the indexing process? Or having trouble running the indexing service? Visit [Troubleshooting](../indexers/) and get all your solutions at one place. 

- Find the list of [FAQs](../indexers/faqs-indexers.md), and resolve your query. 