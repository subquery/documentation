# How to Become a Node Operator

## Introduction

Welcome to this guide on how to become a Node Operator.

Node Operators can run either data indexing projects or RPC endpoints for the network (or both). At a high level, a Node Operator will run Node Operator Service, and then the various services for the projects they index or endpoints they serve.

Let's take an overview of the basic steps involved in the process:

| Steps                                                                | Process Flow                                                                     |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Step 1](#1-deploy-node-operator-services)                           | Setup & Start your Node Operator services locally in Docker or on an external VM |
| [Step 2](#2-setup-ssl-on-your-new-server-and-consult-security-guide) | Setup SSL on your new server and consult security guide                          |
| [Step 3](#3-connect-to-metamask)                                     | Register yourself as a Node Operator to the Network                              |
| [Step 4](#4-how-to-index-a-project)                                  | Index a project or sync an RPC endpoint                                          |
| [Step 5](#5-create-a-plan-from-a-plan-template)                      | Create a Plan from a Plan Template                                               |
| [Step 6](#6-configure-an-node-operator-commission-rate-icr)          | Set a Node Operator Commission Rate                                              |
| [Step 7](#7-troubleshooting-and-faqs`)                               | Troubleshooting and FAQs                                                         |
| [Step 8](#8-setting-up-a-grafana-dashboard-optional)                 | Optional: Setting up a Grafana Dashboard                                         |
| [Step 9](#9-upgrade-node-operator-services-ongoing)                  | Ongoing: Update Node Operator Services                                           |

## 1. Deploy Node Operator Services

For those who are new to SubQuery, it is recommended to try running the Node Operator Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your Node Operator service. It does not need to be on the same VM as your data indexer or RPC endpoint (in fact we suggest that you run it seperately).

### Recommend resources for the machine

| Category                 | vCPU | RAM | Storage |
| :----------------------- | :--- | :-- | :------ |
| indexer_db               | 2    | 2G  | --      |
| subql_node (per project) | 2    | 2G  | 400G    |
| indexer_proxy            | 2    | 1G  | --      |

**Select the appropriate link to follow the guide to setup a Node Operator:**

- [Locally via Docker (easy)](./install-local-docker.md)
- [Linux](./install-linux.md)

Please return here after following these guides.

### Port configurations

Here are the recommended port configurations for running a Node Operator service:

- Port `8000 / TCP`: This port should be configured to only allow access from your own IP address, used by `indexer_coordinator`.
- Port `7370 / UDP`: This port can be opened to the public and used for broadcasting data to multiple clients or nodes in a peer-to-peer network, used by `indexer_proxy`.
- Port `80 / HTTP`: This port can be opened to the public and used by `indexer_proxy`.

It's important to ensure that these ports are properly configured and secured to prevent any unauthorised access or security breaches.

### Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

### Running Node Operator Services

`Important:`
Login to your VM and create a folder, such as `subquery-indexer`

1. Run `cd subquery-indexer`
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/docker-compose.yml -o docker-compose.yml
```

This will overwrite the existing docker-compose.yml file. Always use the latest versions (use pre-release versions at your own risk).

| Service                                                                                             | Version Tag |
| :-------------------------------------------------------------------------------------------------- | :---------- |
| [subquerynetwork/indexer-coordinator](https://hub.docker.com/r/subquerynetwork/indexer-coordinator) | `v2.0.0`    |
| [subquerynetwork/indexer-proxy](https://hub.docker.com/r/subquerynetwork/indexer-proxy)             | `v2.0.0`    |

::: warning Important

Please go through the docker-compose file carefully, and change the following parameters to your own values:

- Your `POSTGRES_PASSWORD` under your postgres container, as well as `--postgres-password` under coordinator container.
- Your `--secret-key` under both coordinator and proxy containers.
- Your `--jwt-secret` and `--metrics-token` under proxy container.

:::

## 2. Setup SSL on your New Server and Consult Security Guide

We highly recommend setting up SSL on your new server and [consulting our security guide carefully](./security-guide.md). You will be penalised for not setting up SSL, firewalls, or following our security guidelines.

## 3. Register in the Node Operator Admin App

Once your Indexing Service is all set and running successfully, you should open the Node Operator Admin App and follow the steps to register yourself (usually this is `http://localhost:8000/` depending on your installation). This includes:

- Connect your wallet
- Register and stake your minimum required stake ([see the current value](../../parameters.md))
- Add metadata information for your Node Operator account

## 4. Index or Sync a Project

Node Operators can run either data indexing projects or RPC endpoints for the network (or both).

- To index a data indexing project, please follow the instructions [here](../indexers/index-project.md).
- To connect an RPC endpoint, please follow the instructions [here](../rpc_providers/introduction.md).

## 5. Create a Plan from a Plan Template

For the initial stages of Mainnet, the SubQuery Council will set some default plan templates to make plan management and creation easier. As a result, plan creation is very easy and just requires to you enter a price. [See the guide here](../plans.md#creating-a-plan).

## 6. Configure a Node Operator Commission Rate (NOCR)

Please update your Node Operator Commission Rate (NOCR) in order to attract more Delegators. You can [read more about this here](../rewards.md#how-to-attract-delegators). You can do this by viewing your Node Operator Delegators page, and you can change it by clicking `Change commission rate`

![Viewing your NOCR](/assets/img/network/indexer_icr.png)

Enter a new value (in a percent) and submit via your wallet.

![Changing your NOCR](/assets/img/network/indexer_icr_change.png)

Changes will come into effect at the start of the next [Era](../../introduction/era.md).

## 7. Troubleshooting and FAQs

Visit [Troubleshooting](./troubleshooting.md) or [FAQs](./faq.md) if you run into technical issues.

## 8. Setting up a Grafana Dashboard (Optional)

This guide will walk you through setting up a preconfigured Grafana Dashboard to view metrics from the `indexer-coordinator` and `indexer-proxy`.

:::warning Backup your Docker Compose

Make a backup of your existing `docker-compose.yaml` file (in the Node Operator services folder) before proceeding with Grafana setup.

We will automatically pull and overwrite your version with the latest

:::

Navigate to the directory where your `docker-compose.yml` file is located (this will be referred to as `indexer-services-folder`) and run the command

```bash
cd indexer-services-folder
# Note the next step will overwrite your existing docker-compose.yml, make sure you have a backup
mkdir network-indexer-services-temp && curl -L https://api.github.com/repos/subquery/network-indexer-services/tarball/main | tar -xzf - --strip-components=1 -C ./network-indexer-services-temp && rm -rf ./ipfs ./metrics && mv ./network-indexer-services-temp/deploy/* . && rm -rf ./network-indexer-services-temp
```

This will generate a folder named `metrics` containing all the necessary setup files for your Dashboard.

Before using the docker-compose file in the `metrics` directory, you should port over your previous changes from your backup that you created earlier, and make several additional modifications:

1. Open the `docker-compose-metrics.yml` file and update the `GF_SECURITY_ADMIN_PASSWORD` variable. This is the password you'll use to log in to the Grafana dashboard.
2. Navigate to `metrics/datasources/datasource.yml` and update the Authorization token. It should match the `--metrics-token` specified in the proxy container section of your `docker-compose.yml` file.
3. In the `metrics/prometheus.yml` file, update the `bearer_token`. It should also match the `--metrics-token` value, but in the format of `Bearer <metrics-token-here>`.
4. If your `indexer-proxy` runs on a non-default port, update the target under `query_count -> static_configs -> targets` in the `metrics/prometheus.yml` file.

::: warning For Linux Users

If you are running your Node Operator services on linux you need specify the exact ip instead of `host.docker.internal` inside `metrics/prometheus.yml` file.

You can get this for `indexer-proxy` and `indexer-coordinator` by running:

`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>`
:::

After doing this configuration you can start up the compose file:

```bash
docker-compose -f ./metrics/docker-compose-metrics.yml up -d
```

Head to `http://<indexer-endpoint>:3000`, your username will be `admin` and password will be whatever you set for `GF_SECURITY_ADMIN_PASSWORD`

Once you have successfully logged in, look for 'dashboards' on the left-hand side of the screen. Under the 'general' section, you will find a dashboard that looks like this:

![grafana_query_count](/assets/img/network/grafana_query_count.png)
![grafana_query_stats](/assets/img/network/grafana_query_stats.png)

## 9. Upgrade Node Operator services (Ongoing)

To upgrade a Node Operator service, you will need to update the version of the image used in the docker-compose file. This can be done by updating the image field in the service definition to the new version you want to use.

Once the image version has been updated in the docker-compose file, you can restart the specific container that needs to be upgraded. This can be done by running the following command in the terminal:

```bash
docker-compose up -d --no-deps container-service-name
```

The `up` command starts the container in the background, while the `--no-deps` flag prevents Docker Compose from starting any linked services. Finally, the `container-service-name` argument specifies the name of the container that needs to be restarted.

By following these simple steps, you can upgrade your Node Operator services in Docker Compose and ensure that they are running the latest version of the image.
