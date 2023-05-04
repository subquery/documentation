# How to Become an Indexer

## Introduction

Welcome to this guide of how to become an indexer. Let's take an overview of the basic steps involved in the process:

## Summary of Steps

| Steps | Process Flow                                                                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1     | Set Up & Start Indexing [Locally](../indexers/install-indexer-locally.md) or [On Linux](../indexers/install-indexer-linux.md) |
| 2     | [Connect to MetaMask](../metamask/connect-metamask.md)                                                                        |
| 3     | [Obtain Kepler Tokens](#3-obtain-ksqt-tokens)                                                                                 |
| 4     | [How to index a project](#4-how-to-index-a-project) or [restore dictionary databases](#4-how-to-index-a-project)              |
| 5     | [Troubleshooting](../indexers/troubleshooting-indexers.md)                                                                    |
| 6     | [FAQs](../indexers/faqs-indexers.md)                                                                                          |

## 1. Select an environment

For those who are new to SubQuery, it is recommended to try running the Indexing Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your indexing service.

**Select the appropriate link to follow the guide to setup an indexer [Locally](./install-indexer-locally.md), or on [Linux](./install-indexer-linux.md) and then return here.**

### Recommend resources for the machine

| Category                 | vCPU | RAM | Storage |
| :----------------------- | :--- | :-- | :------ |
| indexer_db               | 2    | 2G  | --      |
| subql_node (per project) | 2    | 2G  | 400G    |
| indexer_proxy            | 2    | 1G  | --      |

### Port configurations

Here are the recommended port configurations for running an indexer service:

- Port `8000 / TCP`: This port should be configured to only allow access from your own IP address, used by `indexer_coordinator`.
- Port `7370 / UDP`: This port can be opened to the public and used for broadcasting data to multiple clients or nodes in a peer-to-peer network, used by `indexer_proxy`.
- Port `80 / HTTP`: This port can be opened to the public and used by `indexer_proxy`.

It's important to ensure that these ports are properly configured and secured to prevent any unauthorized access or security breaches.

### Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

### Running indexer services

`Important:`
Login to your VM and create a folder, such as `kepler-indexer`

1. Run cd kepler-indexer
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/kepler/docker-compose.yml -o docker-compose.yml
```

This will overwrite the existing docker-compose.yml file. Make sure the indexer service versions are correct:

| Service                        | Version |
| :----------------------------- | :------ |
| onfinality/subql-coordinator   | v1.0.3  |
| onfinality/subql-indexer-proxy | v1.0.0  |

::: warning Important
Please go through the docker-compose file carefully, and change the following parameters to your own values:

- POSTGRES_PASSWORD
- postgres-password
- secret-key
- jwt-secret
:::

### Upgrade indexer services

To upgrade a specific container in a Docker Compose file without having to restart other containers. You can run the following command:

```
docker-compose up -d --no-deps container_service_name
```

By running this command, only the targeted container will be updated, while the other containers will remain unchanged


## 2. Connect to MetaMask

Once your Indexing Service is all set and running successfully, [connect to your MetaMask wallet](../metamask/connect-metamask.md)

## 3. Obtain kSQT tokens

At this stage, only Indexers that received kSQT tokens via the airdrop can obtain and participate as Indexers in Kepler. This may change soon as we test and verify that aspects of the Kepler network are running smoothly.

For Kepler, you can obtain kSQT tokens from the [Kepler Airdrop App](https://airdrop.subquery.foundation). Learn more about kSQT and how to add it to your wallet in [kSQT](../ksqt.md).

## 4. How to index a project

To index a project, please follow the instructions [here](../indexers/index-project.md).

::: info Note
If you are wanting to index a Dictionary, then you may be able to restore your project from our dictionary snapshots to save a lot of time. Instructions are [here](../indexers/dictionary-restore.md)
:::

## Additional Notes

Visit [Troubleshooting](../indexers/troubleshooting-indexers.md) or [FAQs](../indexers/faqs-indexers.md) if you run into technical issues.
