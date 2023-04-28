# Install Indexing Service on Linux

Let's see how to run the Indexer Service on a cloud provider.

## Run Indexer Services on Cloud Linux Instance

We will use a Linux EC2 instance from AWS in the following examples.

```
Note: You can use any other cloud provider, but we will be able to provide only limited support and troubleshooting help.
```

### Step 1 - Launch a Virtual Machine

Follow these instructions to launch an EC2 instance:

[How to Set Up an Indexer with AWS](../indexers/install-indexer-aws.md)

- We recommend a t3.medium linux EC2

### Step 2 - Install Docker and Docker-Compose

- SSH access to the EC2 instance:

```bash
 ssh -i key_file.pem ec2-user@ec2-34-204-200-76.compute-1.amazonaws.com
```

::: warning Important
DO NOT skip checking the Indexer Version after you finish the SSH process.
:::

- Visit [this section](../indexers/become-an-indexer.md#_2-1-check-indexer-version) and complete the process.

::: warning Important
Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field. Replace it with your own one.
:::

- Then, install Docker and set auto start:

```bash
sudo yum install docker
sudo systemctl enable docker
sudo systemctl start docker
```

- Note that you need to install the docker-compose command tool in EC2, in order to use the docker-compose features:

```bash
# get the latest version for docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose

# fix permissions after download:
sudo chmod +x /usr/bin/docker-compose

# verify the installation
sudo docker-compose version
```

### Step 3 - Download the Docker Compose File for Indexer Services

Run the following command:

```bash
mkdir subquery-indexer && cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/indexer-services/kepler/docker-compose.yml -o docker-compose.yml
```

::: warning Important
Please change the `POSTGRES_PASSWORD` in postgres and `postgres-password` in coordinator-service to your own one
:::

### Step 4 - Start Indexer Services

Run the service using the following command:

```bash
sudo docker-compose up -d
```

It will start the following services:

- `coordinator_db`
- `coordinator_service`
- `coordinator_proxy`
- `proxy-redis`

::: tip Note
Each project you start indexing will create 2 extra containers `node_qm----------` and `query_qm----------` that has the 13 first characters of the project's Qm-hash.
:::

Now, check the service status:

![CLI- Check Service Status](/assets/img/cli_servicestatuss_install_on_linux.png)

### Step 5 - Set Up Auto Start

Create `/etc/systemd/system/subquery.service`.

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

---

## Next Steps

**You have successfully installed and started the Indexer Service on Linux. Now, move forward to [connect with MetaMask](../metamask/connect-metamask.md).**

::: tip Tip
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).
:::
