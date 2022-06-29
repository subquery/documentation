# Install Indexing Service on AWS


## Introduction

This guide describes how to create an EC2 instance for installing the Indexing services. 

You can use our pre-built image or build your own. Let's start with SubQuery's pre-built image. 
<br />

## Method 1. Use SubQuery’s Pre-Built Image in AWS

**Please note that this is only available in the Asia Pacific (Sydney) region only.** 

| Region | ap-southeast-2 (Sydney) |
| --- | --- |
| Node Type | >= t3.medium |
| AMI | Community AMIs: ami-0ba91a7aa45470a3e |

### 1.1 Switch Regions

- Log into AWS and switch the region to Asia Pacific (Sydney)

### 1.2 Launch Instance

- Navigate to the EC2 Dashboard and select Launch Instance

![Launch Instance](/assets/img/ec2_launch_instant_screen_aws.png)

### 1.3 Name Your Instance

- Provide a name for your instance.

![Name Your Instance](/assets/img/name_instant_aws.png)

### 1.4 Select SubQuery’s AMI

- Under Application and OS Images, search for SubQuery’s own Community AMI, with an ID of “ami-0ba91a7aa45470a3e“, and select it.

![Application and OS Image](/assets/img/app_and_os_image_aws.png)

![Select SubQuery AMI](/assets/img/select_subquery_ami_aws.png)

### 1.5 Select the Instance Size

- Under “Instance type”, select t3.medium or larger.

![Select Instance Type](/assets/img/select_instance_size_aws.png)

### 1.6 Create a Key Pair

- Either select one or create your own new key pair <br />
    
![Create Key Pair](/assets/img/create_keypair_aws.png) <br />
    

### 1.7 Set Network Settings

- Provide a name for the security setting
- Edit the Network settings to configure the ports. Add the following ports:
    - port: 8000 & 22 accessible from local IP only (NB: this allows you to open the Indexer Admin page in your browser)
    - port: 80 & 443 open to any IP

**For example:**

![Security Group Screen_Select Network Settings](/assets/img/select_security_settings_securitygroups_aws.png)

![Configure Security Group](/assets/img/configure_security_group_aws.png)

### 1.8 Configure Storage

- The default Configure storage size should be sufficient but feel free to increase it if required.

![Configure Storage](/assets/img/configure_storage_aws.png)

### 1.9 Launch instance

- Next, click on Launch Instance.

### 1.10 Check Indexer Version

Finally, ensure that your Indexer is up to date by following these 3 steps:

1. SSH to your EC2 instance. (Visit [How to SSH into your AWS instance](../indexers/ssh-in-aws.md))
2. Run cd subquery-indexer
3. Run the follow cmd to download the latest `dcoker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

Make sure the indexer service versions are correct:

| onfinality/subql-coordinator | v0.3.3
--- | --- 
**onfinality/subql-indexer-proxy** | **v0.2.0**



### 1.11 Update User Group (Optional)

Run:

```jsx
sudo usermod -aG docker ${USER}
```

This command adds the current user to the docker group. Now, log out and log back in. This step is optional because you can start the Indexer with **sudo**.

### 1.12 Start the Indexer

Run the following command:

```jsx
sudo docker-compose up -d 
```

### 1.13 Open Indexer admin

Navigate to your Indexer administration page. 

The URL will be [http://you-ec2-public-path:8000/](http://localhost:8000/) 

For example: [ec2-14-273-116-26.ap-southeast-2.compute.amazonaws.com:8000](http://ec2-54-253-236-26.ap-southeast-2.compute.amazonaws.com/)

---

### 1.14 Next steps

You have successfully set up and started the Indexer service into AWS. 

**Now, connect your application to MetaMask via: [How to Connect to MetaMask](../metamask/connect-metamask.md)** 

---

Now, let’s see how to create your own Indexer using EC2.

## Method 2. Create an Indexer Using Any Standard EC2

- Select `AWS Marketplace` on the left menu and enter `ECS` in the search field to get the specific AMI. Then choose the first one, `Amazon ECS-Optimized Amazon Linux 2 AMI`, and click on the select button.

```
You’ll need 30GB of storage for this season

```

![Create Amazon Marketplace](/assets/img/amazon_marketplace_aws_ec2.png)

- Now you can choose the instance type. We recommend you to select ≥ `t3.medium` type to start your journey (or t2 where t3 is not available).

![Instance Type Amazon Marketplace](/assets/img/instanttype_amazonmarketplace_aws_ec2.png)

- Select the tab: `Configure Security Group` on the top of the page. Add the following rules: <br />

```Security  Group Setting Table here``` 

<br />

![Configure Security Group](/assets/img/securtitygroup_amazonmarketplace_awsec2.png) <br />

- Review all the configs

![Review All Configures](/assets/img/review_instancelaunch_amazonmarketplace_ec2.png) <br />

- Click the launch button once everything is ready. The last step is to config your key pair, which allows you to access the EC2 instance through SSH. <br />

![Select Key Pair](/assets/img/keypair_amazonmarketplace_awsec2.png) <br />

- Click the `Launch Instances` button then the instance will display in the EC2 console later.

Now, you have successfully set up an Indexer VM on AWS. 

---

## **Next Step:**

After setting up the Indexer, you must proceed ahead to connect your application with MetaMask. Visit our guide on [How to connect with a MetaMask](../metamask/connect-metamask.md)


`Additional Note:` In order to SSH into your AWS instance, refer to this guide:
<br />

[How to SSH into your AWS instance](../indexers/ssh-in-aws.md)