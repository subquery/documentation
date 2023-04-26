# How to Become an Indexer

## Introduction

Welcome to this guide of how to become an indexer. Let's take an overview of the basic steps involved in the process:

## Summary of Steps

| Steps | Process Flow                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Set Up & Start Indexing [Locally](../indexers/install-indexer-locally.md), or [On Linux](../indexers/install-indexer-linux.md), or [On AWS](../indexers/install-indexer-aws.md) |
| 2     | [Connect to MetaMask](../metamask/connect-metamask.md)                                                                                                                          |
| 3     | [Obtain Kepler Tokens](#3-obtain-ksqt-tokens)                                                                                                                                   |
| 4     | [How to index a project](#4-how-to-index-a-project) or [restore dictionary databases](#4-how-to-index-a-project)                                                                |
| 5     | [Troubleshooting](../indexers/troubleshooting-indexers.md)                                                                                                                      |
| 6     | [FAQs](../indexers/faqs-indexers.md)                                                                                                                                            |

## 1. Select an environment

For those who are new to SubQuery, it is recommended to try running the Indexing Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your indexing service.

Select the appropriate link in step 1 above.

### Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

### Indexer version

`Important:`
After installing your Indexer, you must [SSH to your EC2 instance](./install-indexer-aws.md#110-ssh-to-your-ec2-instance) and download the lastest docker-compose.yml file.

1. Run cd subquery-indexer
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/develop/docker-compose.yml -o docker-compose.yml
```

This will overwrite the existing docker-compose.yml file.

Make sure the indexer service versions are correct:

| Service                        | Version   |
| :----------------------------- | :-------- |
| onfinality/subql-coordinator   | v0.4.1-11 |
| onfinality/subql-indexer-proxy | latest    |

::: warning Important
Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field. Replace it with your own one.
:::

## 2. Connect to MetaMask

Once your Indexing Service is all set and running successfully, [connect to your MetaMask wallet](../metamask/connect-metamask.md)

## 3. Obtain kSQT tokens

At this stage, only Indexers that received kSQT tokens via the airdrop can obtain and participate as Indexers in Kepler. This may change soon as we test and verify that aspects of the Kepler network are running smoothly.

## 4. How to index a project

To index a project, please follow the instructions [here](../indexers/index-project.md).

If you are wanting to index a Dictionary, then you may be able to restore your project from our dictionary snapshots to save a lot of time. Instructions are [here](../indexers/dictionary-restore.md)

## Additional Notes

Visit [Troubleshooting](../indexers/troubleshooting-indexers.md) or [FAQs](../indexers/faqs-indexers.md) if you run into technical issues.
