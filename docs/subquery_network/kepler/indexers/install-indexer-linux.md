# Install Indexing Service on Linux

Let's see how to run the Indexer Service on a cloud provider.

## Run Indexer Services on Cloud Linux Instance

We will use a Linux EC2 instance from AWS in the following examples.

::: info Note
Note: You can use any other cloud providers, we will try our best to provide support and troubleshooting help.
:::

### Step 1 - Launch a Virtual Machine

There are plenty of online guies on how to launch a compute engine on various cloud providers, including AWS, GCP, Azure, Digital Ocean etc. You can follow [this tutorial to launch a new EC2 on AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) (we recommend a compute engine equivalent to a [t3.medium](https://aws.amazon.com/ec2/instance-types/) linux EC2)

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

- `indexer_db`
- `indexer_coordinator`
- `indexer_proxy`
- `indexer_cache`

::: tip Note
Each project you start indexing will create 2 extra containers `node_qm----------` and `query_qm----------` that has the 15 first characters of the project's Qm-hash.
:::

Now, check the service status:

![docker compose-up command line](/assets/img/docker_compose_up_commandline_installlocally.png)

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

**You have successfully installed and started the Indexer Service on Linux.**

We highly recommend setting up SSL on your new server. [Follow the guide here](./ssl-configuration.md).

::: tip Tip
Having trouble running a command or setting up the service? Got stuck in the process? Find your solutions [here](../indexers/troubleshooting-indexers.md).
:::
