# Install Indexing Service Locally

## Introduction

If you are a beginner, installing the Indexing service locally via Docker is preferred.

Docker is used to make the installation process as simple as possible as it maintains consistency and integrity.

The process includes obtaining the docker-compose.yml file and then starting the container. This can be done in 2 ways:

1. On your own computer or “localhost”
2. On a cloud provider such as AWS

Now, let's explore how to run the Indexing Service Locally step-by-step.

---

### Initial Preparation

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application.

### Step 1 - Download the Indexer Service file

- Donwloand indexing services `docker-compose.yml` file to you machine, which consists of all the images to build and start the various applications.

```bash
mkdir subquery-indexer && cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/indexer-services/kepler/docker-compose.yml -o docker-compose.yml
```

::: warning Important
DO NOT skip checking the indexer version after you finish the installation process. Visit [this section](../indexers/become-an-indexer.md#_2-1-check-indexer-version) to check the latest indexer version is used and to to complete the set up process.

Also, please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field in the docker-compose.yml file.
:::

### Step 2 - Start the Indexing Service

Run the following command to start the Indexing service:

```bash
docker-compose up -d
```

Please check that the Docker is already running. The images will be pulled from Docker and then it will start the following services:

- `indexer_db`
- `indexer_coordinator`
- `indexer_proxy`
- `indexer_cache`
- `indexer_ipfs`

![docker compose-up command line](/assets/img/docker_compose_up_commandline_installlocally.png)

### Step 3 - Open the Indexer Admin Page

Open `http://localhost:8000/` in your browser and you will get to see:

![Indexer Admin Page - Asking to Connect with Metatask](/assets/img/admin_page_installlocally.png)

---

## Next Steps

**You have successfully installed and started the Indexer Service locally.**

We highly recommend setting up SSL on your new server. [Follow the guide here](./ssl-configuration.md).

:::tip Tip
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).
:::
