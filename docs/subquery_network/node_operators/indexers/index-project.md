# Indexing a SubQuery Project

Node Operators can run either data indexing projects or RPC endpoints for the network (or both). If you instead want to connect an RPC endpoint, please follow the instructions [here](../rpc_providers/connect-node.md).

## 1. Select and Add a Project

Inside your Node Operator Admin App (usually this is `http://localhost:8000/` depending on your installation), the Projects tab appears at the top of the page. This enables Node Operators to add projects of their choice to their Node Operator profile.

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and indexed by other Node Operators, you will be able to obtain the project’s Deployment ID from the [SubQuery Explorer](https://app.subquery.network/explorer/home).

Enter the project deployment ID when adding the new project.

![Add a New Project Using Deploy ID](/assets/img/network/indexer_project_add.png)

After finishing the process of adding your project, move forward with indexing the project.

## 2. Index a Project

Select the project card to open the project details page.

For a brand new project, the indexing status will be `NOT INDEXING`. Select the **`Start Indexing`** button to begin indexing the project.

You will need to provide an indexing endpoint, this endpoint must be a non-pruned archive node. Public nodes may be rate limited, which can affect indexing speed. **When indexing your project we suggest getting a private API key to avoid being rate limited.**

Public RPC Endpoints may be rate limited which can affect indexing speed, when indexing your project we suggest getting a private API key. You can retrieve endpoints for some networks for free from SubQuery Network itself.

Please make sure that you set “Enable POI” to `true`. Then press `Submit` to trigger the request to start the node and query service for this project in the coordinator service.

Once the services are started, the service information will be displayed. The Node Operator can then check the service log to see the indexing details:

![Node Operator Service Log](/assets/img/network/indexer_service_logs.png)

You have successfully started Indexing. Next comes the Announcements section. Let’s dig in further.

## 3. Announcements

### 3.1 Announcing a Project to the Network

Once the project has started indexing, you can announce your project deployment to the network so the network knows that you are in the proccess of indexing the project.

Select the `Announce Indexing` button and send a transaction.

![Announce a Project to Network](/assets/img/network/indexer_project_announce.png)

After the transaction is processed, the project's status will change to `INDEXING`. Now, you can:

- Publish the project to `READY` on the network via `Announce Ready`.
- `Stop indexing` the project.
- `Restart indexing` the project with a new network endpoint.

![Indexing Status](/assets/img/network/indexer_project_indexing.png)

### 3.2 Announcing that Indexing Service is Ready to Use

Once a Node Operator announces that they have started indexing the project on the network, and when the indexing progress reaches the minimum required block height (or catches up with the latest height), the Node Operator can publish the project to the `ready` status. This indicates that the network can now start to distribute requests to the Node Operator's project deployment.

![Indexing Service Ready to Use Announcement](/assets/img/network/indexer_project_ready.png)

## 4 Allocate SQT to the Project and Monitor

To earn Network Allocation Rewards for your project, you should immediately allocate SQT to your new project. [Please follow the guide here](../stake.md#allocating-stake).

On the Network app, the Node Operator can check the era information and confirm that the reward collection is up-to-date. The service log component provides the logs for the coordinator service.

Monitor your eligibility for rewards from the Admin Portal, if your node is out of sync or not reachable, you may not receive rewards.

Congratulations! You have successfully indexed your SubQuery Project.

- If you encounter any trouble while running the Node Operator service, please visit [Troubleshooting](../setup/troubleshooting.md)) and find all your solutions in one place.
- Find the list of [FAQs](../setup/faq.md), and resolve your query.

## 5. Other Actions

### 5.1 Stop Indexing the Project

When you stop indexing the project, the node and query service will be terminated on the coordinator service side. Additionally, the status of the indexing service will need to be changed back to `NOT INDEXING`.

After the status changes to `TERMINATED`, remove the project directly.

![Stop Indexing the Project](/assets/img/network/indexer_project_stop.png)

The proxy services status will change to `TERMINATED` after triggering the stop indexing function.

Once the services are terminated, the Node Operator also needs to send a transaction to change the status to `NOT INDEXING` on the network.

![Not Indexing the Project Announcement_Transaction](/assets/img/network/indexer_project_stop_indexing.png)

**Note**: You can start re-indexing the project at any time after stopping the project.

### 5.2 Restarting a Project

Restart the project if you want to change the network endpoint, network dictionary, or image versions.

![Restart a Project](/assets/img/network/indexer_project_restart.png)

### 5.3 Removing a Project

You can remove the project from the service if a project is not required anymore.

![Remove a Project](/assets/img/network/indexer_project_remove.png)
