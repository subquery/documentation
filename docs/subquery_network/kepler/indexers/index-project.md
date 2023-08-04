# Indexing a SubQuery Project

## Introduction

To become a SubQuery Indexer, you need to stake a minimum of 1000 SQT.

::: info Note
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

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and indexed by other indexers, you may be able to find it listed in the SubQuery Explorer as the obtain the project’s Deployment ID.

The following projects are available for indexing on the Kepler network. Some projects have a backup restore provided.

| Network   | Project Name            | Deployment ID                                    | Database Size | Dictionary Endpoint                                                            | Has Restore File               |
| --------- | ----------------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| Polygon   | Kepler Network Project  | `QmUVXKjcsYkS6WfJQfeD7juDbnMWCuo5qKgRRo893LajE2` | -             | [Subquery URL](https://gx.api.subquery.network/sq/subquery/polygon-dictionary) | No                             |
| Polygon   | Kepler Airdrop Project  | `QmUwTD5dqQRRFcMCihJ4HHnMPfEvRpKpcFvGcTJjBpGg9T` | -             | [Subquery URL](https://gx.api.subquery.network/sq/subquery/polygon-dictionary) | No                             |
| Polygon   | Kepler Exchange Project | `QmV6sbiPyTDUjcQNJs2eGcAQp2SMXL2BU6qdv5aKrRr7Hg` | -             | [Subquery URL](https://gx.api.subquery.network/sq/subquery/polygon-dictionary) | No                             |
| Polkadot  | Polkadot Dictionary     | `QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm` | ~220GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Kusama    | Kusama Dictionary       | `QmXwfCF8858YY924VHgNLsxRQfBLosVbB31mygRLhgJbWn` | ~260GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Moonbeam  | Moonbeam Dictionary     | `QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t` | ~123GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Moonriver | Moonriver Dictionary    | `QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR` | ~130GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Nodle     | Nodle Dictionary        | `QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y` | ~15G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Acala     | Acala Dictionary        | `Qmarrhgrpqw5VK71rMtb4GARpPvq8ajMjAqnjnWZFLV61N` | ~10G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Karura    | Karura Dictionary       | `QmWumrabg4k6t4EUMhQg19xWwcxGq1hWbcmfmRYiy2Bod5` | ~10G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Arbitrum  | Arbitrum Dictionary     | `QmPKMkqTe7UMRPZWxuD8dFgufjKzWQEeW84Qo1x1X8VVLR` | ~240G         | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Optimism  | Optimism Dictionary     | `QmPuHdLxTQHEAitgLe9Sg1Jnr1WwJASDRSL5RUzBe3NywV` | ~250G         | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Khala     | Khala Dictionary        | `QmYCAns2cunZKJFU85KNK8CvL2ATAmCFVZRdBf963GqWYs` | ~78G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Westend   | Westend Dictionary      | `Qma6BeSQGHrhP5aydmkQcJCR25TEwuNMogS5boovBBwoeW` | ~35G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Astar     | Astar Dictionary        | `QmUmnKPhcE6JwGMYvY3Yitb5j8qxbQBMxgpkHpVQuXqxDH` | ~65G          | N/A                                                                            | [Yes](./dictionary-restore.md) |

::: info Note
If you are wanting to index a Dictionary, then you may be able to restore your project from our dictionary snapshots to save a lot of time. Instructions are [here](../indexers/dictionary-restore.md)
:::

![Add Project Screen](/assets/img/add_project_index_project.png)

![Select a Project](/assets/img/select_project_index_project.png)

Enter the project deployment ID when addding the new project.

![Add a New Project Using Deploy ID](/assets/img/addproject_deployid_index_project.png)

After finishing the process of adding your project, move forward with indexing the project.

## 3. Index a Project

Select the project card to open the project details page.

![Project Details Page](/assets/img/projectdetails_index_project.png)

For a brand new project, the indexing status will be `NOT INDEXING`. Select the **`Start Indexing`** button to begin indexing the project.

You will need to provide an indexing endpoint, this endpoint must be a non-pruned archive node. Public nodes may be rate limited, which can affect indexing speed. **When indexing your project we suggest getting a private API key to avoid being rate limited.**

Public RPC Endpoints may be rate limited which can affect indexing speed, when indexing your project we suggest getting a private API key. You can retrieve endpoints for some networks for free from [OnFinality](https://www.onfinality.io/networks).

Please make sure that you set “Enable POI” to `true`. Then press `Submit` to trigger the request to start the node and query service for this project in the coordinator service.

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
