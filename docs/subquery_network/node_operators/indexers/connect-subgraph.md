# Connect your Subgraph deployment

Node Operators can run either SubQuery Data Indexing projects or Subgraphs (or both). If you instead want to sync a SubQuery Data Indexing project, please follow the instructions [here](../index-project.md).

:::info Connect any Subgraph
The SubQuery Network does not control how you run the underlying Graph node, only that you connect a Subgraph endpoint that is able to reliably consume queries.

This means you can connect existing Subgraph deployments used for other purposes (including other decentralised networks) to the SubQuery Network.
:::

## Prerequisites

This guide assumes you are already running a Subgraph node that is internally available to the indexer proxy service, and which has the chosen deployment running.

## 1. Add Project

Inside your Node Operator Admin App (usually this is `http://localhost:8000/` depending on your installation), the Projects tab appears at the top of the page. This enables Node Operators to add projects of their choice to their Node Operator profile.

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and synced by other Node Operators, you will be able to obtain the project’s Deployment ID from the [SubQuery Explorer](https://app.subquery.network/explorer/home).

Enter the project deployment ID when adding the new project, in our case, it is `QmbaLc7fEfLGUioKWehRhq838rRzeR8cBoapNJWNSAZE8u`.

![Add a Subgraph project](/assets/img/network/subgraph_project_add.png)

## 2. Connect your Graph node

Input the endpoint of your Graph node, along with its Index Node status port, and HTTPs and Web Sockest query ports.

Be aware that the coordinator service runs in docker, so localhost doesn't work like it runs outside of docker. You should use the internal ip address to connect to the node, or `host.docker.internal` which points to the host localhost.

![Connect graph node](/assets/img/network/subgraph_connect_node.png)

Once connected, you will be able to see your node's sync status in the Node Operator Admin App under Projects

![subgraph sync status](/assets/img/network/subgraph_sync_status.png)

## 3. Go Online

Click `Go Online`, which will then trigger your wallet to sign a transaction. 

![Go Online](/assets/img/network/subgraph_go_online.png)

Then your Subgraph is announced online and will be available for query when it is fully synced

![Subgraph Online](/assets/img/network/subgraph_online.png)

## 4. Allocate SQT to the Project and Monitor

To earn Network Allocation Rewards for your project, you should immediately allocate SQT to your new project. [Please follow the guide here](../stake.md#allocating-stake).

On the Network app, the Node Operator can check the era information and confirm that the reward collection is up-to-date. The service log component provides the logs for the coordinator service.

Monitor your eligibility for rewards from the Admin Portal, if your node is out of sync or not reachable, you may not receive rewards.

Congratulations! You have successfully deployed your Subgraph to the SubQuery Network!

- If you encounter any trouble while running the Node Operator service, please visit [Troubleshooting](../setup/troubleshooting.md)) and find all your solutions in one place.
- Find the list of [FAQs](../setup/faq.md), and resolve your query.
