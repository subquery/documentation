# Indexing a SubQuery Project

## Introduction

To become a SubQuery Indexer, you need to stake a minimum of 200,000 SQT.

## 1. Initial Set-Up

### 1.1 The Indexer Admin Page

Depending on where the application has been installed, you may find the Indexer admin page at:

- http://localhost:8000/
- http://your-ec2-public-path:8000/ (for example `ec2-14-273-116-26.ap-southeast-2.compute.amazonaws.com:8000`)
- http://some-public-ip-address:8000

### 1.2 Request Approval

Click `Get Started` and then select `Approve`. Then MetaMask will pop up, asking you to sign this transaction.

### 1.3 Register Indexer

Fill in the details to register your Indexer and confirm the MetaMask transaction.

![Register MetMask-Confirm Transaction](/assets/img/network/indexer_registration.png)

### 1.4 Synchronise Your Indexer

Next, click on `Sync` to synchronise this account with your coordinator service. This may take a few minutes. If you still don’t get any results after 5 minutes, try refreshing the page.

![Synchronise Indexer with Coordinator](/assets/img/network/indexer_sync_coordinator.png)

### 1.5 Indexer and Controller Accounts

Now, two accounts will appear on the screen. The Indexer Account where you can update the metadata (Indexer name and proxy server endpoint) and the Controller Account.

![Indexer and Controller Accounts](/assets/img/network/indexer_controller_account.png)

### 1.6 Add a Controller Account

The Controller, a distinct and seperate account that must be created, holds a small amount of Base tokens to facilitate Indexer configuration updates and run day to day operations.

Updating a Indexer configuration is a signable event. That means it is an on-chain update that requires transaction fees to be paid (in BASE).

Click `Managed Controllers` and then select `Create an Account`. This adds an account that you will need to fund with some tokens. Then set the account to `Active`.

![Add Controller](/assets/img/network/indexer_controller_add.png)

Activating a controller is an on-chain signable event.

Once the controller account is added, it should appear as follows:

![Activate Controller](/assets/img/network/indexer_controller_account_added.png)

### 1.7 Update Indexer Metadata (Optional)

The Indexer can update metadata which includes:

- Indexer name.
- Proxy server endpoint.

![Update Indexer's Metadata](/assets/img/network/indexer_metadata_update.png)

You have now completed the initial set-up. Next, let’s work on adding a project.

## 2. Add a Project

Once the Controller Account has been added, a new Projects tab appears at the top of the page. This enables Indexers to add projects of their choice for indexing.

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and indexed by other indexers, you may be able to find it listed in the SubQuery Explorer as the obtain the project’s Deployment ID.

The following projects are available for indexing on the Mainnet network. Some projects have a backup restore provided.

| Network   | Project Name            | Deployment ID                                    | Database Size | Dictionary Endpoint                                                            | Has Restore File               |
| --------- | ----------------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| Polkadot  | Polkadot Dictionary     | `QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm` | ~220GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Kusama    | Kusama Dictionary       | `QmXwfCF8858YY924VHgNLsxRQfBLosVbB31mygRLhgJbWn` | ~260GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Moonbeam  | Moonbeam Dictionary     | `QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t` | ~123GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Moonriver | Moonriver Dictionary    | `QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR` | ~130GB        | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Moonbase  | Moonbase Alpha Dictionary | `QmUgn2eP1nvAECSe9HE9zTHTHwkQMDwSN7rpB1aXcsthfe` | N/A         | N/A                                                                             | N/A |
| Acala     | Acala Dictionary        | `Qmarrhgrpqw5VK71rMtb4GARpPvq8ajMjAqnjnWZFLV61N` | ~10G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Karura    | Karura Dictionary       | `QmWumrabg4k6t4EUMhQg19xWwcxGq1hWbcmfmRYiy2Bod5` | ~10G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Astar     | Astar Dictionary        | `QmUmnKPhcE6JwGMYvY3Yitb5j8qxbQBMxgpkHpVQuXqxDH` | ~65G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Shiden    | Shiden Dictionary       | `QmV25WVPgdmAgRCqkbGUU49xdeg9td3CK5LbtBjeQEMxTW` | N/A           | N/A                                                                            | N/A |
| Khala     | Khala Dictionary        | `QmYCAns2cunZKJFU85KNK8CvL2ATAmCFVZRdBf963GqWYs` | ~78G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Nodle     | Nodle Parachain Dictionary | `QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y` | ~15G       | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Westend   | Westend Dictionary      | `Qma6BeSQGHrhP5aydmkQcJCR25TEwuNMogS5boovBBwoeW` | ~35G          | N/A                                                                            | [Yes](./dictionary-restore.md) |
| Algorand  | Algorand Dictionary     | `QmYNRtrcD2QKftkff2UpjV3fr3ubPZuYahTNDAct4Ad2NW` | N/A           | N/A                                                                            | N/A |
| Asset Hub | Asset Hub Dictionary    | `QmckGGY1AhrB75MwPPzR9orgWjwDVF4kXfwkZehZSZxmdE` | N/A           | N/A                                                                            | N/A |
| Aleph Zero | Aleph Zero Dictionary  | `QmXp3MdCjZyUsmXhFXJTisxQiP1P96sm81WGmu2ew7v8WN` | N/A           | N/A                                                                            | N/A |
| Kilt Spiritnet | Kilt Spiritnet Dictionary | `Qmc9svij5SxCEGApMZzV9MwWgy8TuMTtGgsrWxR1yaUqZ9` | N/A    | N/A                                                                            | N/A |
| Fetch AI | Fetch AI Dictionary      | `QmbtSt8USCUTBWeAqevN1AwmUhKzqmtvhSdFYHYA1BviC8` | N/A           | N/A                                                                            | N/A |
| Bifrost  | Bifrost (Kusama) Dictionary | `QmUWd1o3BJb5qSR1ZaAhSw1duVgQ5bsczdfRNakNUL5cJy` | N/A        | N/A                                                                            | N/A |
| Calamari | Calamari Dictionary      | `QmUpvkmvTRkMDCGDXnAVjCBZLzZEv9UCVKHH2s3gj3hYQK` | N/A           | N/A                                                                            | N/A |
| Near     | Near Dictionary          | `QmSKrk3BpzjWzKfS8sZRS5vyjmtXvkJnK8nHUVBhiCmz41` | N/A           | N/A                                                                            | N/A |
| Juno     | Juno Dictionary          | `QmPjq55mgUt9S8S491Q3wEbb87fXyEkdxymT6Gwe2xe1Z1` | N/A           | N/A                                                                            | N/A |
| SQ       | SQ Mainnet Project       | `QmTMphPvRg143xWWKsdgZZgNc1HgDxH9fK9ZYpzLiQPet1` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova wallet - Polkadot   | `QmaTy1aG5uZfeyUXRu8bDci1P6AzbTYBEzM57yEYk3MPEt` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Kusama     | `QmWS4bvLU9Y1YBkrcDBq3Z7enZf8LykeyjSvgVKjB7FSVz` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Moonriver  | `QmPzEH1Juo7RQB2X37DvYATQdCQ7oBV8V1yX92DHD71ma5` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Moonbeam   | `QmegTE8BimTw5iTpBqtJSMC2jWApU4g2q5ojGZAL3iU1fr` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Astar      | `QmRonzFGNrsmpG2NrVhcVC6rCtCBqYFupX6MEECReWXWZT` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Aleph Zero | `QmZNNYQqBs3c9f3t7UUybt1Unr49F5gTEdvU3Byv6DntKo` | N/A           | N/A                                                                            | N/A |
| Nova     | Nova Wallet - Polkadex   | `QmdzL852vGNgmdmk4UdvpPWeVsTtYJiMsjJd6ZxnSbQsfP` | N/A           | N/A                                                                            | N/A |
| Nodle    | NodleWallet-Eden         | `QmQ77QHgkKa81cVXbiChfLCcivucQpVmbim8GnnXxzd2Lu` | N/A           | N/A                                                                            | N/A |
| RPC      | Eth Mainnet Rpc - Archive Node | `Qmf6uZkxuNzpcNvnhReXrz1BTzMWgmtkdFQrSNByPytkuk` | N/A     | N/A                                                                            | N/A |
| RPC      | Eth Mainnet Rpc - Full Node | `QmNa36oZ4zRS1i2wQhiFznU5DjEuNP3wopV6U3VcUWMUKu` | N/A        | N/A                                                                            | N/A |
| RPC      | Base Rpc - Archive Node  | `QmTfhYrb3wusYS715KvHfaL56R8M1SrM8vwhuLyYVehfKB` | N/A           | N/A                                                                            | N/A |
| RPC      | Base Rpc - Full Node     | `QmbReTnhCweQHmbXxgffkDqkkedo7ojjsUWTKopP1auuTp` | N/A           | N/A                                                                            | N/A |

::: info Note
If you are wanting to index a Dictionary, then you may be able to restore your project from our dictionary snapshots to save a lot of time. Instructions are [here](./dictionary-restore.md)
:::

Enter the project deployment ID when addding the new project.

![Add a New Project Using Deploy ID](/assets/img/network/indexer_project_add.png)

After finishing the process of adding your project, move forward with indexing the project.

## 3. Index a Project

Select the project card to open the project details page.

For a brand new project, the indexing status will be `NOT INDEXING`. Select the **`Start Indexing`** button to begin indexing the project.

You will need to provide an indexing endpoint, this endpoint must be a non-pruned archive node. Public nodes may be rate limited, which can affect indexing speed. **When indexing your project we suggest getting a private API key to avoid being rate limited.**

Public RPC Endpoints may be rate limited which can affect indexing speed, when indexing your project we suggest getting a private API key. You can retrieve endpoints for some networks for free from [OnFinality](https://www.onfinality.io/networks).

Please make sure that you set “Enable POI” to `true`. Then press `Submit` to trigger the request to start the node and query service for this project in the coordinator service.

Once the services are started, the service information will be displayed. The Indexer can then check the service log to see the indexing details:

![Indexer Service Log](/assets/img/network/indexer_service_logs.png)

You have successfully completed the indexing process. Next comes the Announcements section. Let’s dig in further.

## 4. Announcements

### 4.1 Announcing a Project to the Network

To announce a project to the network, select the `Announce Indexing` button and send a transaction.

![Announce a Project to Network](/assets/img/network/indexer_project_announce.png)

After the transaction is processed, the project's status will change to `INDEXING`. Now, the Indexer can:

- Publish the project to `READY` on the network via `Announce Ready`.
- `Stop indexing` the project.
- `Restart indexing` the project with a new network endpoint.

![Indexing Status](/assets/img/network/indexer_project_indexing.png)

### 4.2 Announcing that Indexing Service is Ready to Use

Once the Indexer announces that they have started indexing the project on the network, and when the indexing progress reaches the minimum block height, the indexer can publish the project to the `ready` status. This indicates that other users can now access the indexing service.

![Indexing Service Ready to Use Announcement](/assets/img/network/indexer_project_ready.png)

### 4.3 **Stop Indexing the Project**

When you stop indexing the project, the node and query service will be terminated on the coordinator service side. Additionally, the status of the indexing service will need to be changed back to `NOT INDEXING`.

After the status changes to `TERMINATED`, remove the project directly.

![Stop Indexing the Project](/assets/img/network/indexer_project_stop.png)

The proxy services status will change to `TERMINATED` after triggering the stop indexing function.

Once the services are terminated, the Indexer also needs to send a transaction to change the status to `NOT INDEXING` on the network.

![Not Indexing the Project Announcement_Transaction](/assets/img/network/indexer_project_stop_indexing.png)

**Note**: You can start re-indexing the project at any time after stopping the project.

### 4.4 Restarting a Project

Restart the project if you want to change the network endpoint, network dictionary, or image versions.

![Restart a Project](/assets/img/network/indexer_project_restart.png)

### 4.5 **Removing a Project**

You can remove the project from the service if a project is not required anymore.

![Remove a Project](/assets/img/network/indexer_project_remove.png)

## 5. **Indexer Network Information**

On the network page, the Indexer can check the era information and confirm that the reward collection is up-to-date. The service log component provides the logs for the coordinator service.

Congratulations! You have successfully indexed your SubQuery Project.

- If you encounter any trouble while running the indexing service, please visit [Troubleshooting](../setup/troubleshooting.md)) and find all your solutions in one place.

- Find the list of [FAQs](../setup/faq.md), and resolve your query.
