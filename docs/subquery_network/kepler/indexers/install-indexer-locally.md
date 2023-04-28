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

### Step 1 - Clone the Indexing Service Repo

- Clone the indexing services repository to your local machine. This repository contains a `docker-compose.yml` file, which consists of all the images to build and start the various applications.

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

- `coordinator_db`
- `coordinator_service`
- `coordinator_proxy`
- `proxy-redis`

![docker compose-up command line](/assets/img/docker_compose_up_commandline_installlocally.png)

![docker compose-up cli result](/assets/img/commandline_result_installlocally.png)

### Step 3 - Open the Indexer Admin Page

Open `http://localhost:8000/` in your browser and you will get to see:

![Indexer Admin Page - Asking to Connect with Metatask](/assets/img/admin_page_installlocally.png)

---

## Next Steps

You have successfully installed the Indexing service locally. The next step is to connect your application with MetaMask.

**Head to [How to Connect to MetaMask](../metamask/connect-metamask.md) guide.**

:::tip Tip
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).
:::
