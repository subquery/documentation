# Install Indexing Service Locally

## Introduction

If you are a beginner, installing the Indexing service locally via Docker is preferred.

Docker is used to make the installation process as simple as possible as it maintains consistency and integrity.

The process includes obtaining the docker-compose.yml file and then starting the container. This can be done in 2 ways:

1. On your own computer or “localhost”
2. On a hosted service such as AWS

Now, let's explore how to run the Indexing Service Locally step-by-step.

---

### Initial Preparation

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application

### Step 1 - Clone the Indexing Service Repo

- Clone the indexing services repository to your local machine. This repository contains a docker-compose.yml file, which consists of all the images to build and start the various applications.

```bash
mkdir testnet
cd testnet
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

> **IMPORTANT**
> DO NOT skip checking the Indexer Version after you finish the installation process.

- Visit [this section](../indexers/become-an-indexer.html#_2-1-check-indexer-version) and complete the process.

> **IMPORTANT**
> Please change the `POSTGRES_PASSWORD` in postgres and `postgres-password` in coordinator-service to your own one

> **IMPORTANT**
> DO NOT skip checking the Indexer Version after you finish the installation process.

- Visit [this section](../indexers/become-an-indexer.html#check-indexer-version) and complete the process.

### Step 2 - Start the Indexing Service

Run the following command to start the Indexing service:

```bash
docker-compose up -d
```

Please check that the Docker is already running. The images will be pulled from Docker and then it will start the following services:

- coordinator_db
- coordinator_service
- coordinator_proxy

![docker compose-up command line](/assets/img/docker_compose_up_commandline_installlocally.png)

![docker compose-up cli result](/assets/img/commandline_result_installlocally.png)

### Step 3 - Open the Indexer Admin Page

Open [http://localhost:8000/](http://localhost:8000/) in your browser and you will get to see:

![Indexer Admin Page - Asking to Connect with Metatask](/assets/img/admin_page_installlocally.png)

---

## Next Steps

You have successfully installed the Indexing service locally. The next step is to connect your application with MetaMask.

**Head to [How to Connect to MetaMask](../metamask/connect-metamask.md) guide.**

**Additional Note:**
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).
