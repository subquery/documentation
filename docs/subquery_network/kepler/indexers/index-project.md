# Indexing a SubQuery Project

## Introduction

To become a SubQuery Indexer, you need to stake a minimum of 1000 SQT. If you still haven’t connected your application to MetaMask, visit [How to Connect to MetaMask](../metamask/connect-metamask.md).

:::Note
Only Indexers that have been airdropped kSQT will be able to join Kepler as an indexer. In the future, we may invite more indexers into the network.
:::

## 1. Initial Set-Up

### 1.1 The Indexer Admin Page

Depending on where the application has been installed, you may find the Indexer admin page at:

- http://localhost:8000/
- http://your-ec2-public-path:8000/ (for example `ec2-14-273-116-26.ap-southeast-2.compute.amazonaws.com:8000`)
- http://some-public-ip-address:8000

![Stake-SQT](/assets/img/stakeSQT_index_project.png)

### 1.2 Request Approval

Click `Get Started` and then select `Approve`. Then MetaMask will pop up, asking you to sign this transaction.

![Request Approval](/assets/img/approval_index_project.png)

![Confirm Appoval](/assets/img/confirm_approval_index_project.png)

### 1.3 Register Indexer

Fill in the details to register your Indexer and confirm the MetaMask transaction.

![Register MetMask-Confirm Transaction](/assets/img/registerconfirm_metamask_index_project.png)

### 1.4 Synchronise Your Indexer

Next, click on `Sync` to synchronise this account with your coordinator service. This may take a few minutes. If you still don’t get any results after 5 minutes, try refreshing the page.

![Synchronise Indexer with Coordinator](/assets/img/sync_coordinator_index_project.png)

### 1.5 Indexer and Controller Accounts

Now, two accounts will appear on the screen. The Indexer Account where you can update the metadata (Indexer name and proxy server endpoint) and the Controller Account.

![Indexer and Controller Accounts](/assets/img/indexer_controller_account_index_project.png)

### 1.6 Add a Controller Account

The Controller, a distinct and seperate account that must be created, holds a small amount of MATIC tokens to facilitate Indexer configuration updates and run day to day operations.

Updating a Indexer configuration is a signable event. That means it is an on-chain update that requires transaction fees to be paid (in MATIC).

Click `Managed Controllers` and then select `Create an Account`. This adds an account that you will need to fund with some tokens. Then set the account to `Active`.

![Add Controller](/assets/img/add_controller.png)

Activating a controller is an on-chain signable event.

![Activate Controller](/assets/img/activate_controller.png)

Once the controller account is added, it should appear as follows:

![Activate Controller](/assets/img/controller_account_added.png)

### 1.7 Update Indexer Metadata (Optional)

The Indexer can update metadata which includes:

- Indexer name.
- Proxy server endpoint.

![Update Indexer's Metadata](/assets/img/update_indexer_metadata_index_project.png)

You have now completed the initial set-up. Next, let’s work on adding a project.

## 2. Add a Project

Once the Controller Account has been added, a new Projects tab appears at the top of the page. This enables Indexers to add projects of their choice for indexing.

Before clicking **`Add Project`,** click on the SubQuery Explorer hyperlink. This will take you to a list of SubQuery projects, where you can obtain the project's Deployment ID first.

![Add Project Screen](/assets/img/add_project_index_project.png)

Select a project of your choice to index and copy the deployment ID.

![Select a Project](/assets/img/select_project_index_project.png)

Then return to the project page and add the project.

![Add a New Project Using Deploy ID](/assets/img/addproject_deployid_index_project.png)

After finishing the process of adding your project, move forward with indexing the project.

## 3. Index a Project

Select the project card to open the project details page.

![Project Details Page](/assets/img/projectdetails_index_project.png)

For a brand new project, the indexing status will be `NOT INDEXING`. Select the **`Start Indexing`** button to begin indexing the project.

Enter the Indexing Endpoint for each project and select specific image versions if needed:

The Indexing Endpoint defines the wss endpoint of the blockchain to be indexed - this must be a full archive node.

Public RPC Endpoints may be rate limited which can affect indexing speed, when indexing your project we suggest getting a private API key. You can retrieve endpoints for some networks for free from [OnFinality](https://www.onfinality.io/networks).

Press `Submit` to trigger the request to start the node and query service for this project in the coordinator service.

![Restart Indexing Project Screen](/assets/img/startproject_index_project.png)

Once the services are started, the service information will be displayed.

![Indexing Service Information Screen](/assets/img/servicedetails_index_project.png)

The Indexer can then check the service log to see the indexing details:

![Indexer Service Log](/assets/img/service_log_index_project.png)

You have successfully completed the indexing process. Next comes the Announcements section. Let’s dig in further.

## 4. Announcements

### 4.1 Announcing a Project to the Network

To announce a project to the network, select the `Announce Indexing` button and send a transaction.

![Announce a Project to Network](/assets/img/announce_project_index_project.png)

After the transaction is processed, the project's status will change to `INDEXING`. Now, the Indexer can:

- Publish the project to `READY` on the network via `Announce Ready`.
- `Stop indexing` the project.
- `Restart indexing` the project with a new network endpoint.

![Indexing Status](/assets/img/indexing_status_index_project.png)

### 4.2 Announcing that Indexing Service is Ready to Use

Once the Indexer announces that they have started indexing the project on the network, and when the indexing progress reaches the minimum block height, the indexer can publish the project to the `ready` status. This indicates that other users can now access the indexing service.

![Indexing Service Ready to Use Announcement](/assets/img/readytouse_indexer_project.png)

![Indexer Ready Screen](/assets/img/indexer_ready_index_project.png)

### 4.3 **Stop Indexing the Project**

When you stop indexing the project, the node and query service will be terminated on the coordinator service side. Additionally, the status of the indexing service will need to be changed back to `NOT INDEXING`.

After the status changes to `TERMINATED`, remove the project directly.

![Stop Indexing the Project](/assets/img/stop_index_project.png)

The proxy services status will change to `TERMINATED` after triggering the stop indexing function.

Once the services are terminated, the Indexer also needs to send a transaction to change the status to `NOT INDEXING` on the network.

![Not Indexing the Project Announcement_Transaction](/assets/img/notindexing_announce_index_project.png)

![Project Status_Not Indexing](/assets/img/notindexing_status_index_project.png)

**Note**: You can start re-indexing the project at any time after stopping the project.

### 4.4 Restarting a Project

Restart the project if you want to change the network endpoint, network dictionary, or image versions.

![Restart a Project](/assets/img/restart_index_project.png)

### 4.5 **Removing a Project**

You can remove the project from the service if a project is not required anymore.

![Remove a Project](/assets/img/remove_index_project.png)

## 5. **Indexer Network Information**

On the network page, the Indexer can check the era information and confirm that the reward collection is up-to-date. The service log component provides the logs for the coordinator service.

![Indexer Network Information](/assets/img/indexer_network_info.png)

Congratulations! You have successfully indexed your SubQuery Project.

- If you encounter any trouble while running the indexing service, please visit [Troubleshooting](../indexers/troubleshooting-indexers.md)) and find all your solutions in one place.

- Find the list of [FAQs](../indexers/faqs-indexers.md), and resolve your query.
