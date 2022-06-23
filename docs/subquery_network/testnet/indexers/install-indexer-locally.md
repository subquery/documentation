# How to Install the Indexing Service Locally or on Linux(TestNet)?

## Introduction


If you are a beginner, installing the Indexing service locally via Docker is preferred. Docker is used to make the installation process as simple as possible as it maintains consistency and integrity. 

The process includes obtaining the docker-compose.yml file and then starting the container. This can be done in 2 ways:

1. On your own computer or “localhost”
2. On a hosted service such as AWS

First, let's explore the process of running the Indexing Service Locally. 

<hr />

## 1. **Run the Indexing Service Locally**

### **Initial Preparation**

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application

### **Step 1 - Clone the Indexing Service Repo**

Clone the Indexing services repository to your local machine. This repository contains a docker-compose.yml file, which consists of all the images to build and start the various applications.

```bash
mkdir testnet
cd testnet
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

### **Step 2 - Start the Indexing Service**

Run the following command to start the Indexing service:

```bash
docker-compose up
```

Please check that the Docker is already running. The images will be pulled from Docker and then it will start the following services:

- coordinator_db
- coordinator_service
- coordinator_proxy

<br />

![docker compose-up command line](/assets/img/docker_compose_up_commandline_installlocally.png) <br />

![docker compose-up cli result](/assets/img/commandline_result_installlocally.png)

### **Step 3 - Open the Indexer Admin Page**

Open [http://localhost:8000/](http://localhost:8000/) in your browser and you will get to see:

<br />

![Indexer Admin Page - Asking to Connect with Metatask](/assets/img/admin_page_installlocally.png)


### **Next Steps**

You have successfully installed the Indexing service locally. The next step is to connect your applicaion with MetaMask. 

**Head to [How to Connect to MetaMask](../metamask/connect-metamask.md) guide and continue with the further process.** <br />

<hr />

Now, we will see how to run the Indexer Service on a cloud provider. 

## 2. **Run Indexer Services on Cloud Linux Instance**

We will use a Linux EC2 instance from AWS in the following examples. 

```
**Note**: You can use any other cloud provider, but we will be able to provide only limited support and troubleshooting help.
```


### **Step 1 - Launch a Virtual Machine**

Follow these instructions to launch an EC2 instance:

[How to Set Up an Indexer with AWS](../indexers/set-up-indexer-aws.md) 

We recommend a t3.medium linux EC2

### **Step 2 - Install Docker and Docker-Compose**

SSH access to the EC2 instance:

```bash
 ssh -i key_file.pem ec2-user@ec2-34-204-200-76.compute-1.amazonaws.com
```

Then, install Docker and set auto start:

```bash
sudo yum install docker
sudo systemctl enable docker
sudo systemctl start docker
```

Note that you need to install the docker-compose command tool in EC2, in order to use the docker-compose features:

```bash
# get the latest version for docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose

# fix permissions after download:
sudo chmod +x /usr/bin/docker-compose

# verify the installation
sudo docker-compose version
```

### **Step 3 - Download the Docker Compose File for Indexer Services**

Run the following command:

```bash
mkdir subquery-indexer & cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

### **Step 4 - Start Indexer Services**

Run the service using the following command:

```bash
sudo docker-compose up -d
```

It will start the following services:

- coordinator_db
- coordinator_service
- coordinator_proxy

Now, check the service status: <br />

![CLI- Check Service Status](/assets/img/cli_servicestatuss_install_on_linux.png)

### Step 5 - Set Up Auto Start

```
@ Sean -- Didn't get the following line
```

Create/etc/systemd/system/subquery.service

```
[Unit]
Description="Subquery systemd service"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=root
SyslogIdentifier=subquery
SyslogFacility=local7
KillSignal=SIGHUP
WorkingDirectory=/home/ec2-user/subquery-indexer
ExecStart=/usr/bin/docker-compose up -d

[Install]
WantedBy=multi-user.target
```

Register and start the service by running:

```bash
systemctl enable subquery.service
systemctl start subquery.service
```

After that, verify that the service is running:

```bash
systemctl status subquery.service
```

### *Next Steps:**
**You have successfully installed and started the Indexer Service. Now, move forward to [connect with MetaMask](../metamask/connect-metamask.md) before Indexing a SubQuery Project.** 


**Additional Note:**
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).



#### Suggestion Needed: Should we have different pages for Locally and on Linux? Or this combined page is fine? 