# How to Become an Indexer

## Introduction

Welcome to this guide on how to become an Indexer. Let's take an overview of the basic steps involved in the process:

## Summary of Steps

| Steps | Process Flow                                                                                                     |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| 1     | Set Up & Start Indexing [Locally](./install-indexer-locally.md) or [On Linux](./install-indexer-linux.md)        |
| 2     | [Connect to MetaMask](#2-connect-to-metamask)                                                                    |
| 3     | [Obtain Kepler Tokens](#3-obtain-ksqt-tokens)                                                                    |
| 4     | [How to index a project](#4-how-to-index-a-project) or [restore dictionary databases](#4-how-to-index-a-project) |
| 5     | [Create a Plan from a Plan Template](#5-create-a-plan-from-a-plan-template)                                      |
| 6     | [Setting an Indexer Commission Rate](#6-configure-an-indexer-commission-rate-icr)                                |
|       | [Troubleshooting](./troubleshooting-indexers.md)                                                                 |
|       | [FAQs](./faqs-indexers.md)                                                                                       |

## Understanding how Kepler will Operate for Indexers

In the first phase of Kepler, Indexers will be Sponsored by the SubQuery Council to run common good sponsored projects. These will be run using standardised plans so that the SubQuery Council can easily create agreements with each Indexer and sponsor them in bulk.

- All plans will be orientated around the length of an Era, which is currently one week but may be increased to a fortnight (two weeks).
- Indexers should only index from a list of standardised projects that will be listed [here](./index-project.md#2-add-a-project). You won't be rewarded for indexing any projects that are not on this list.
- Towards the end of each era, we will release the suggested plan templates, recommended pricing, and other instructions for the start of the next period. You can create plans under [step 5](#5-create-a-plan-from-a-plan-template). These will be shared on [Discord](https://discord.com/invite/subquery) in `kepler-indexer-chat`
- We use the [Indexer Excellency programme](https://kepler.subquery.network/delegator/indexers/top) to rank Indexers and plans will be allocated to Indexers with a higher score. In order to maximise your rewards, we suggest trying to maximise your score in this programme (you can hover over the column header to see how each score is calculated).
- We also constantly assess uptime from our Indexers, so if you have [announced that your indexing service is ready to use](./index-project.md#42-announcing-that-indexing-service-is-ready-to-use), then you will be penalised for any downtime.
- Finally, we also assess pricing when creating agreements with Indexers, so Indexers with lower plan prices can expect a higher chance of being selected.

![Indexer Excellency](/assets/img/indexer-excellency.png)

## 1. Select an environment

For those who are new to SubQuery, it is recommended to try running the Indexing Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your indexing service.

**Select the appropriate link to follow the guide to setup an Indexer [Locally](./install-indexer-locally.md), or on [Linux](./install-indexer-linux.md) and then return here.**

### Recommend resources for the machine

| Category                 | vCPU | RAM | Storage |
| :----------------------- | :--- | :-- | :------ |
| indexer_db               | 2    | 2G  | --      |
| subql_node (per project) | 2    | 2G  | 400G    |
| indexer_proxy            | 2    | 1G  | --      |

### Port configurations

Here are the recommended port configurations for running an Indexer service:

- Port `8000 / TCP`: This port should be configured to only allow access from your own IP address, used by `indexer_coordinator`.
- Port `7370 / UDP`: This port can be opened to the public and used for broadcasting data to multiple clients or nodes in a peer-to-peer network, used by `indexer_proxy`.
- Port `80 / HTTP`: This port can be opened to the public and used by `indexer_proxy`.

It's important to ensure that these ports are properly configured and secured to prevent any unauthorized access or security breaches.

### Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

### Running indexer services

`Important:`
Login to your VM and create a folder, such as `kepler-indexer`

1. Run `cd kepler-indexer`
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/kepler/docker-compose.yml -o docker-compose.yml
```

This will overwrite the existing docker-compose.yml file. Always use the latest versions (use pre-release versions at your own risk).

| Service                                                                                             | Version Tag |
| :-------------------------------------------------------------------------------------------------- | :---------- |
| [subquerynetwork/indexer-coordinator](https://hub.docker.com/r/subquerynetwork/indexer-coordinator) | `v1.2.0`    |
| [subquerynetwork/indexer-proxy](https://hub.docker.com/r/subquerynetwork/indexer-proxy)             | `v1.2.0`    |

::: warning Important

Please go through the docker-compose file carefully, and change the following parameters to your own values:

- Your `POSTGRES_PASSWORD` under your postgres container, as well as `--postgres-password` under coordinator container.
- Your `--secret-key` under both coordinator and proxy containers.
- Your `--jwt-secret` and `--metrics-token` under proxy container.

:::

### Setting up a Grafana Dashboard

This guide will walk you through setting up a preconfigured Grafana Dashboard to view metrics from the indexer-coordinator and indexer-proxy.

:::warning Backup your Docker Compose

Make a backup of your existing `docker-compose.yaml` file (in the indexer services folder) before proceeding with Grafana setup.

We will automatically pull and overwrite your version with the latest

:::

Navigate to the directory where your `docker-compose.yml` file is located (this will be referred to as `indexer-services-folder`) and run the command

```bash
cd indexer-services-folder
# Note the next step will overwrite your existing docker-compose.yml, make sure you have a backup
curl -L https://api.github.com/repos/subquery/indexer-services/tarball/kepler | tar -xzf - --strip-components=1 -C .
```

This will generate a folder named `metrics` containing all the necessary setup files for your Dashboard.

Before using the docker-compose file in the `metrics` directory, you should port over your previous changes from your backup that you created earlier, and make several additional modifications:

1. Open the `docker-compose-metrics.yml` file and update the `GF_SECURITY_ADMIN_PASSWORD` variable. This is the password you'll use to log in to the Grafana dashboard.
2. Navigate to `metrics/datasources/datasource.yml` and update the Authorization token. It should match the `--metrics-token` specified in the proxy container section of your `docker-compose.yml` file.
3. In the `metrics/prometheus.yml` file, update the `bearer_token`. It should also match the `--metrics-token` value, but in the format of `Bearer <metrics-token-here>`.
4. If your indexer proxy runs on a non-default port, update the target under `query_count -> static_configs -> targets` in the `metrics/prometheus.yml` file.

::: warning For Linux Users

If you are running your indexer on linux you need specify the exact ip instead of `host.docker.internal` inside `metrics/prometheus.yml` file.

You can get this for indexer proxy and coordinator by running:

`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>`
:::

After doing this configuration you can start up the compose file:

```bash
docker-compose -f ./metrics/docker-compose-metrics.yml up -d
```

Head to `http://<indexer-endpoint>:3000`, your username will be `admin` and password will be whatever you set for `GF_SECURITY_ADMIN_PASSWORD`

Once you have successfully logged in, look for 'dashboards' on the left-hand side of the screen. Under the 'general' section, you will find a dashboard that looks like this:

![grafana_query_count](/assets/img/grafana_query_count.png)
![grafana_query_stats](/assets/img/grafana_query_stats.png)

### Upgrade indexer services

To upgrade an indexer service, you will need to update the version of the image used in the docker-compose file. This can be done by updating the image field in the service definition to the new version you want to use.

Once the image version has been updated in the docker-compose file, you can restart the specific container that needs to be upgraded. This can be done by running the following command in the terminal:

```bash
docker-compose up -d --no-deps container-service-name
```

The `up` command starts the container in the background, while the `--no-deps` flag prevents Docker Compose from starting any linked services. Finally, the `container-service-name` argument specifies the name of the container that needs to be restarted.

By following these simple steps, you can upgrade your indexer services in Docker Compose and ensure that they are running the latest version of the image.

## 2. Connect to MetaMask

Once your Indexing Service is all set and running successfully, connect to your MetaMask wallet.

## 3. Obtain kSQT tokens

At this stage, only Indexers that received kSQT tokens via the airdrop can obtain and participate as Indexers in Kepler. This may change soon as we test and verify that aspects of the Kepler network are running smoothly.

For Kepler, you can obtain kSQT tokens from the [Kepler Airdrop App](https://airdrop.subquery.foundation). Learn more about kSQT and how to add it to your wallet in [kSQT](../token/token.md#ksqt).

## 4. How to index a project

To index a project, please follow the instructions [here](./index-project.md#).

::: info Note
If you are wanting to index a Dictionary, then you may be able to restore your project from our dictionary snapshots to save a lot of time. Instructions are [here](./dictionary-restore.md)
:::

## 5. Create a Plan from a Plan Template

For the initial stages of Kepler, the SubQuery Council will set some default plan templates to make plan management and creation easier, and speed up the test and analysis of various parameters of the network. As a result, plan creation is very easy and just requires to you enter a price. [See the guide here](./plans.md#creating-a-plan).

## 6. Configure an Indexer Commission Rate (ICR)

Please update your Indexer Commission Rate (ICR) in order to attract more Delegators. You can [read more about this here](./rewards.md#how-to-attract-delegators). You can do this by viewing your Indexer Staking page, and you can change it by clicking `Change commission rate`

![Viewing your ICR](/assets/img/icr1.png)

Enter a new value (in a percent) and submit via Metamask.

![Changing your ICR](/assets/img/icr2.png)

Changes will come into effect at the start of the next Era.

## Additional Notes

Visit [Troubleshooting](./troubleshooting-indexers.md) or [FAQs](./faqs-indexers.md) if you run into technical issues.
