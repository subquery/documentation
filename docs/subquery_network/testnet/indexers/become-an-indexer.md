# How to Become an Indexer

## Table of Content and Process Flow

| Steps | Process Flow                                                                                                                                                                                                               | Additional References                          |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1     | Set Up & Start Indexing (3 Methods)<ul><li>[Locally](../indexers/install-indexer-locally.md)</li><li>Or [On Linux](../indexers/install-indexer-linux.md)</li><li>Or [On AWS](../indexers/install-indexer-aws.md)</li></ul> | [How to SSH on AWS](../indexers/ssh-in-aws.md) |
| 2     | [Connect to MetaMask](../metamask/connect-metamask.md)                                                                                                                                                                     | -                                              |
| 3     | [Request TestNet Tokens](../metamask/request-token.md)                                                                                                                                                                     | -                                              |
| 4     | [Index a SubQuery Project](../indexers/index-project.md)                                                                                                                                                                   | -                                              |
| 5     | [Troubleshooting](../indexers/troubleshooting-indexers.md)                                                                                                                                                                 | -                                              |
| 6     | [FAQs](../indexers/faqs-indexers.md)                                                                                                                                                                                       | -                                              |

## Introduction

Welcome to the **Service Guide of Running an Indexer**. This guide includes all the necessary steps to set up an Indexer and start indexing a project.

Let's take an overview of the basic steps involved in the process:

### 1. Create a VM on AWS

For those who are **new to SubQuery**, it is recommended to try running the Indexing Service on your local machine first. It will take just 5 minutes and help you familiarise yourself with the process. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your Indexing Service.

### 2. Install Docker

Note that you may or may not need to install Docker.

If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

- After installing your Indexer, you must SSH to your EC2 instance. (Visit [How to SSH into your AWS instance](../indexers/ssh-in-aws.md)).

`Important:`

#### 2.1 Check Indexer Version

1. Run cd subquery-indexer
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

Make sure the indexer service versions are correct:

| onfinality/subql-coordinator   | v0.3.6 |
| :----------------------------- | :----- |
| onfinality/subql-indexer-proxy | v0.2.0 |

::: warning Important
Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field. Replace it with your own one. 
:::

Note:

- If you are continuing the installation Locally: Visit [here](../indexers/install-indexer-locally.md#step-2-start-the-indexing-service).
- If you are continuing the installation with Linux: Visit [here](../indexers/install-indexer-linux.md#step-2-install-docker-and-docker-compose).
- If you are continuing the installation with AWS: Visit [here](../indexers/install-indexer-aws.md#_1-11-update-user-group-optional).

Next step is to start the indexer.

### 3. Start the Indexing Service

After you are done with the installation stage, start the Indexing Service with just **one-line** Docker command.

```jsx
docker-compose up -d
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

_You can run the Indexing Service:_

1. Locally
2. On AWS or other cloud Services
3. On Linux

::: note
If you are just a beginner, we advise you to run the indexing service locally.
:::

Depending on the method you choose, you will encounter some differences in the process of setting up the indexer. Hence, we have covered distinct guides for every hosting environment/method. **_Have a look:_**

### 1. For Running the Indexing Service Locally

Visit **[this guide](../indexers/install-indexer-locally.md)** and begin with installing the service.

### 2. For Running the Indexing Service on Linux

Visit **[this guide](../indexers/install-indexer-linux.md)** and begin with installing the service.

### 3. For Running the Indexing Service on AWS

Visit **[this guide](../indexers/install-indexer-aws.md)** and begin with setting up the service.

## Additional Notes

- Got stuck during the indexing process? Or having trouble running the indexing service? Visit [Troubleshooting](../indexers/troubleshooting-indexers.md)) and get all your solutions at one place.

- Find the list of [FAQs](../indexers/faqs-indexers.md), and resolve your query.
