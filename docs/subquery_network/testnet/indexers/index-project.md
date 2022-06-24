# Indexing a SubQuery Project

## Introduction

If you are willing to become a SubQuery Indexer, you need to stake a minimum of 1000 SQT. 

**Note**:

- If you do not have any SQT, please visit [How to request for Testnet tokens](../metamask/request-token.md).
- If you still haven’t connected your application to MetaMask, visit [How to Connect to MetaMask](../metamask/connect-metamask.md).


## 1. Initial Set-Up

### 1.1 The Indexer Admin Page

Depending on where the application has been installed, you may find the Indexer admin page at:

- http://localhost:8000/
- http://your-ec2-public-path:8000/ (for example [ec2-14-273-116-26.ap-southeast-2.compute.amazonaws.com:8000](http://ec2-54-253-236-26.ap-southeast-2.compute.amazonaws.com/))
- http://some-public-ip-address:8000   <br />

![Stake-SQT](/assets/img/stakeSQT_index_project.png) 


### 1.2 Request Approval

Click `Get Started` and then select `Approve`. Then MetaMask will pop up, asking you to sign this transaction.

![Request Approval](/assets/img/approval_index_project.png) <br />

![Confirm Appoval](/assets/img/confirm_approval_index_project.png) 


### 1.3 Register Indexer

Fill in the details to register your Indexer and confirm the MetaMask transaction.

**Importnat:**

The proxy endpoint is the default public DNS for your EC2 instance. 
For example: [http://ec2-2-22-83-280.ap-southeast-2.compute.amazonaws.com](http://ec2-3-25-83-26.ap-southeast-2.compute.amazonaws.com/)

<br />

![Register MetMask-Confirm Transaction](/assets/img/registerconfirm_metamask_index_project.png)


### 1.4 Synchronise Your Indexer

Next, click on `Sync` to synchronise this account with your coordinator service. This may take a few minutes. If you still don’t get any results after 5 minutes, try refreshing the page. <br />

![Synchronise Indexer with Coordinator](/assets/img/sync_coordinator_index_project.png)


### 1.5 Indexer and Controller Accounts

Now, two accounts will appear on the screen. The Indexer Account where you can update the metadata (Indexer name and proxy server endpoint) and the Controller Account. <br />

![Indexer and Controller Accounts](/assets/img/indexer_controller_account_index_project.png)


### 1.6 Add a Controller Account

The Controller is a separate account that needs to be created and it holds a small amount of DEV tokens to update configurations. 

Updating a configuration is a signable event. That means, it is an on-chain update that requires transaction fees to be paid (in DEV).

To add a controller account, the Indexer will need the private key of the controller account from MetaMask. Here are the steps you should follow:

- Select an account NOT to be used as a controller account for other Indexers and select the `ellipsis` (3 dots) button. (See [How to connect to MetaMask](../metamask/connect-metamask.md) for connecting to a new MetaMask account).
- Select `Account details` then `Export Private Key`.
- Then input your password for MetaMask and get the private key. 

<br />

![Add Controller](/assets/img/add_controller_index_project.png) <br />


![Export Private Key](/assets/img/export_privatekey_index_project.png) <br />


![Show Private Key](/assets/img/show_privatekey_index_project.png) <br />


```
The private key of the controller account will be encrypted and saved in the indexer coordinator service. 
The indexer can update the controller account at any time.

```

The first step after getting the private key is to synchronise the private key with the coordinator service. The reason is that the controller account cannot be the Indexer itself or used by other Indexers. Select `**Add Controller**`. 

<br />

![Configure and Add Controller Account](/assets/img/config_controller_account.png)


After synchronising the controller key, the second step is sending a transaction to confirm the controller account. Select **`Send Transaction`**. <br />

![Send Transaction from Controller Account](/assets/img/controller_transaction_index_projcet.png)


Once the transaction has been processed, you will see the Controller Account under your account page. This may take a few minutes. If nothing shows up, refresh the page. <br />

![2 Accounts Screen_Indexer and Controller](/assets/img/2accounts_screen_index_project.png)


### 1.7 **Update Indexer Metadata (Optional)**

The Indexer can update metadata which includes:

- Indexer name
- Proxy server endpoint

<br />

![Update Indexer's Metadata](/assets/img/update_indexer_metadata_index_project.png)


You have completed the initial set-up. Next, let’s work on adding a project. 


## 2. **Add a Project**

Once the Controller Account has been added, a new Projects tab appears at the top of the page. This will allow Indexers to add projects of their choice to index. 

Before clicking **`Add Project`,** click on the SubQuery Explorer hyperlink. This will take to you a list of SubQuery projects where you will obtain the project’s Deployment ID first. 

<br />

![Add Project Screen](/assets/img/add_project_index_project.png)


Now, select a project of your choice and copy the deployment ID. <br />

![Select a Project](/assets/img/select_project_index_project.png)


**Note:** The two projects in this Testnet are as follows:

- Staking Threshold - Polkadot `QmYR8xQgAXuCXMPGPVxxR91L4VtKZsozCM7Qsa5oAbyaQ3`
- Staking Threshold - Kusama `QmSzPQ9f4U1GERvN1AxJ28xq9B5s4M72CPvotmmv1N2bN7`

<br />

![Deployment ID of the Project](/assests/img/deployID_Polkadot_index_project.png)


Then return to the project page and add the project. <br />

![Add a New Project Using Deploy ID](/assets/img/addproject_deployid_index_project.png)


After finishing the process of adding your project, move forward with indexing the project. 


## 3. **Index a Project**

- Select the project card to open the project details page. <br />

![Project Details Page](/assets/img/projectdetails_index_project.png)


For a brand new project, the status will be `NOT INDEXING`. Select the **`Start Indexing`** button to begin indexing the project.



Press the `Confirm` button to trigger the request to start the node and query service for this project in the coordinator service.

- Enter the following values for each project and select specific image versions if needed:
    
    **Staking Threshold - Polkadot**
    
    - Indexing Network Endpoint: `wss://polkadot.api.onfinality.io/public-ws`
    - Network Dictionary Endpoint: `https://api.subquery.network/sq/subquery/dictionary-polkadot`
    
    **Staking Threshold - Kusama**

    
    - Indexing Network Endpoint: `wss://kusama.api.onfinality.io/public-ws`
    - Network Dictionary Endpoint: `https://api.subquery.network/sq/subquery/kusama-dictionary`
    
    ```
    Please make sure that you set “Enable POI” to true
    ````
<br />

![Restart Indexing Project Screen](/assets/img/restartproject_index_project.png)

- Once the services are started, the service information will be displayed.

![Indexing Service Information Screen](/assets/img/servicedetails_index_project.png)

- The Indexer can then check the service log to see the indexing details:

![Indexer Service Log](/assets/img/service_log_index_project.png)

You have successfully completed the indexing process. Next comes the Announcements section. Let’s dig out further. 


## 4. Announcements

### 4.1 Announcing a Project to the Network

To announce a project to the network, select the `Announce Indexing` button and send a transaction. <br />

![Announce a Project to Network](/assets/img/announce_project_index_project.png)


After the transaction is processed, the status of the project will change to `INDEXING`. Now, the Indexer can:

- Publish the project to `READY` on the network via `Announce Ready`
- `Stop indexing` the project
- `Restart indexing` the project with a new network endpoint

<br />

![Indexing Status](/assets/img/indexing_status_index_project.png)


### 4.2 Announcing that Indexing Service is Ready to Use

Once the Indexer announces that they have started indexing the project on the network, and when the indexing progress reaches the minimum block height, the indexer can publish the project to the `ready` status. It indicates that other users can now access the indexing service. 

![Indexing Service Ready to Use Announcement](/assets/img/readytouse_indexer_project.png) <br />


![Indexer Ready Screen](/assets/img/indexer_ready_index_project.png)


### 4.3 **Stopping Indexing the Project**

When you stop indexing the project, the node and query service will be terminated on the coordinator service side. In addition, the status of the indexing service will need to be changed back to `NOT INDEXING`.

```
For existing Indexers, upgrade to `@onfinality/subql-coordinator v0.1.8` can only finish the first step to 
terminate the containers for the running project and don’t have to send the transaction for announcing `NOT INDEXING` . 

After the status changes to `TERMINATED`, remove the project directly.

```
<br />

![Stop Indexing the Project](/assets/img/stop_index_project.png)


The proxy services status will change to `TERMINATED` after triggering the stop indexing function.

Once the services are terminated, the Indexer also needs to send a transaction to change the status to `NOT INDEXING` on the network.
<br />

![Not Indexing the Project Announcement_Transaction](/assets/img/notindexing_announce_index_project.png) <br />


![Project Status_Not Indexing](/assets/img/notindexing_status_index_project.png)


```
**Note**: You can start re-indexing the project at any time after stopping the project.
```

### 4.4 Restarting a Project

Restart the project if you want to change the network endpoint, network dictionary or image versions. <br />

![Restart a Project](/assets/img/restart_index_project.png)


### 4.5 **Removing a Project**

You can remove the project from the service if a project is not required anymore. <br />

![Remove a Project](/assets/img/remove_index_project.png)


## 5. **Indexer Network Information**

In the network page, the Indexer can check the era information and confirm that the reward collection is up to date. The service log component provides the logs for the coordinator service. <br />

![Indexer Network Information](/assets/img/indexer_network_info.png) <br />


Congartulations! You have successfully indexed your SubQuery Project. 

- If you encounter any trouble while running the indexing service, please visit [Troubleshooting](../indexers/) and get all your solutions at one place. 

- Find the list of [FAQs](../indexers/faqs-indexers.md), and resolve your query. 