# How to Become an Indexer

## Introduction

Welcome to the **Service Guide of Running an Indexer**. This guide includes all the necessary steps to set up an Indexer and start indexing a project.

Let's take an overview of the basic steps involved in the process:

## Table of Content and Process Flow

| Steps | Process Flow                                                                                                                                                                                                               | Additional References                          |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1     | Set Up & Start Indexing (3 Methods)<ul><li>[Locally](../indexers/install-indexer-locally.md)</li><li>Or [On Linux](../indexers/install-indexer-linux.md)</li><li>Or [On AWS](../indexers/install-indexer-aws.md)</li></ul> | [How to SSH on AWS](../indexers/ssh-in-aws.md) |
| 2     | [Connect to MetaMask](../metamask/connect-metamask.md)                                                                                                                                                                     | -                                              |
| 3     | [Obtain Kepler Tokens](#3-obtain-ksqt-tokens)                                                                                                                                                                     | -                                              |
| 4     | [How to index a project](#4-how-to-index-a-project)                                                                                                                                                                   | -                                              |
| 5     | [Troubleshooting](../indexers/troubleshooting-indexers.md)                                                                                                                                                                 | -                                              |
| 6     | [FAQs](../indexers/faqs-indexers.md)                                                                                                                                                                                       | -                                              |

### 1. Select an environment 

For those who are **new to SubQuery**, it is recommended to try running the Indexing Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your indexing service.

### - Install Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

`Important:`
After installing your Indexer, you must SSH to your EC2 instance to check your indexer version. (Visit [How to SSH into your AWS instance](../indexers/ssh-in-aws.md)).


1. Run cd subquery-indexer
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

Make sure the indexer service versions are correct:

| onfinality/subql-coordinator   | v0.3.11 |
| :----------------------------- | :----- |
| onfinality/subql-indexer-proxy | v0.2.0 |

::: warning Important
Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field. Replace it with your own one. 
:::


### 2. Connect to MetaMask

Once your Indexing Service is all set and running successfully, [connect to your MetaMask wallet](../metamask/connect-metamask.md) 

### 3. Obtain kSQT tokens 

TBA

### 4. How to index a project

To index a project, please follow the instructions **[here](../indexers/index-project.md).**


## Additional Notes

- Visit [Troubleshooting](../indexers/troubleshooting-indexers.md) or [FAQs](../indexers/faqs-indexers.md) if you run into technical issues.