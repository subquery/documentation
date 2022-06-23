# How to Become an Indexer

## Running an Indexer Service Guide

## Introduction 

Welcome to the **Service Guide of Running an Indexer**. This guide includes all the necessary steps to set up an Indexer and start indexing a project.

Let's start by taking an overview of the basic steps involved in the process:

1. Create a VM (Virtual Machine) on AWS (recommended) or a cloud hosting provider of your choice.
2. Install Docker and download the docker-compose.yml file. Docker will then download all the other necessary files and images.
3. Start the Indexing Service.
4. Open the application in your browser and connect MetaMask.
5. Select a project and start indexing.

Let's dig out each step further:

### 1. Create a VM on AWS

For those who are **new to SubQuery**, it is recommended to try running the Indexing Service on your local machine first. It will take just 5 minutes and help you familiarise yourself with the process. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your Indexing Service.

Refer to these detailed guides for:

- Running the Indexing Service locally or on Linux - visit [How to Install the Indexing Service (TestNet)](../indexers/install-indexer.md)
- Setting up a VM on AWS - visit [How to Set Up an Indexer](../indexers/set-up-indexer.md)

### 2. Install Docker

Note that you may or may not need to install Docker. 

If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file. 

For a detailed guide on installing Docker, visit [**Step 2 - Install Docker and Docker-Compose**](../indexers/install-indexer.md) 

### 3. Start the Indexing Service

After you are done with the installation stage, start the Indexing Service with just s a **one-line**
 Docker command.

```jsx
docker-compose up
```

For in-depth information, visit [How to Install the Indexing Service (TestNet)](../indexers/install-indexer.md). 

Now, move ahead in the process and connect to MetaMask.

### 4. Connect to MetaMask

Once your Indexing Service is all set and running successfully, take a sneak peek into how to connect to MetaMask:

Visit [How to connect to a MetaMask](../metamask/metamask.md)

### 5. Index Your Project 

After connecting your Indexing Service with MetaMask, you can finally start indexing a SubQuery project. 

Visit [Index your SubQuery project guide](../indexers/index-project.md) for more details. <br />

<hr />


```
Important: However, there are 3 distinct ways to run an indexer service. 
Choose a way that you find the best suited for you and follow the guided steps.
```

*You can run the Indexing Service:*
1. Locally 
2. On AWS or other cloud Services
3. On Linux 

**Note:**  If you are just a beginner, we advise you to run the indexing service locally. 

Depending on the method you choose, you will encounter some difference in the process of setting up the indexer. Hence, we have covered distinct guides for every hosing environment/method. ***Have a look:***

## 1. For Running the Indexing Service Locally

Begin with setting up the service by visiting **[this guide](../indexers/install-indexer.md)**

## 2. For Running the Indexing Service on Linux

Begin with setting up the service by visiting **[this guide](../indexers/install-indexer.md)**

## 3. For Running the Indexing Service on AWS

Begin with setting up the service by visiting **[this guide](../indexers/set-up-indexer.md)**

<br />

```Additional Notes:```

- Got stuck during the indexing process? Or having trouble running the indexing service? Visit [Troubleshooting](../indexers/) and get all your solutions at one place. 

- Find the list of [FAQs](https://www.notion.so/FAQs-e8b4ad36872e4161a191556ea8a32811), and resolve your query. 