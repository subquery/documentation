# Install Node Operator Service Locally

## Introduction

If you are a beginner, installing the Node Operator service locally via Docker is preferred.

Docker is used to make the installation process as simple as possible as it maintains consistency and integrity.

The process includes obtaining the `docker-compose.yml` file and then starting the container. This can be done in 2 ways:

1. On your own computer or `localhost`
2. On a cloud provider such as AWS

Now, let's explore how to run the Node Operator Service Locally step-by-step.

## Initial Preparation

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application.

## Step 1 - Download the Indexer Service file

- Download node operator services `docker-compose.yml` file to you machine, which consists of all the images to build and start the various applications.

```bash
mkdir subquery-indexer && cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/docker-compose.yml -o docker-compose.yml

# extra steps to use local ipfs node
mkdir ipfs
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/ipfs/ipfs.sh -o ipfs/ipfs.sh
chmod +x ipfs/ipfs.sh
```

::: warning Important

Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field in the docker-compose.yml file.

If you are running in Kubernetes (k8s), make sure to set the `host-env` parameter to `k8s` in the `docker-compose.yml` file, as specified in the file.

:::

### Step 2 - Start the Node Operator Services

Run the following command to start the Node Operator service:

```bash
docker compose up -d
```

Please check that the Docker is already running. The images will be pulled from Docker and then it will start the following services:

- `indexer_db`
- `indexer_coordinator`
- `indexer_proxy`
- `indexer_cache`
- (Optional) `indexer_ipfs`

![docker compose-up command line](/assets/img/network/indexer_docker_services.png)

### Step 3 - Check Local IPFS

If you have decided to use local IPFS

```
# check peers, it should not be empty and contains at least one of the following peer
docker exec indexer_ipfs ipfs swarm peers
docker exec indexer_ipfs ipfs swarm peers | grep -E "(12D3KooWHEEjciF2JmDukCkWW93tQ7eJYs16PWqEo81GrXz82DUL|12D3KooWForH2nsSRN5cynPhoona6re1nw2EcimQJxHnicd1yqUV|12D3KooWPhsrviSKFTKawpW3bRAdLZ89jhXdYuszAys4YwL3RMn3|12D3KooWCFokEyt9gtuQHTwVAzwBsdjsBqfSxq1D3X1FsAbTwaSN)"
```

### Step 4 - Open the Node Operator Admin Page

Open `http://localhost:8000/` in your browser to view the Node Operator App.

## Next Steps

**You have successfully installed and started the Node Operator Service locally, please return to the [previous page](./becoming-a-node-operator.md#1-deploy-an-environment)**

:::tip Tip
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](./troubleshooting.md).

If you want to use a separated database for the Node Operator service, you can follow [this guide](./separated-db.md) to set up the database and install the Node Operator service.
:::
