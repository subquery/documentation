# Connect your Subgraph deployment

Node Operators can run SubQuery SDK Data Indexing projects, RPC projects, and Subgraphs. If you instead want to sync a SubQuery SDK Data Indexing project, please follow the instructions [here](./index-project.md).

:::info Connect any Subgraph
The SubQuery Network does not control how you run the underlying Graph node, only that you connect a Subgraph endpoint that is able to reliably consume queries.

This means you can connect existing Subgraph deployments used for other purposes (including other decentralised networks) to the SubQuery Network.
:::

## Prerequisites

This guide assumes you are already running a Graph node that is internally available to the indexer proxy service, and which has the chosen deployment running. You can read more about how to operate a Graph node following the [official documentation](https://thegraph.com/docs/en/operating-graph-node/) by The Graph.

## 1. Add Project

Inside your Node Operator Admin App (usually this is `http://localhost:8000/` depending on your installation), the Projects tab appears at the top of the page. This enables Node Operators to add projects of their choice to their Node Operator profile.

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and synced by other Node Operators, you will be able to obtain the project’s Deployment ID from the [SubQuery Explorer](https://app.subquery.network/explorer/home).

Enter the project deployment ID when adding the new project, in our case, it is `QmbaLc7fEfLGUioKWehRhq838rRzeR8cBoapNJWNSAZE8u`.

![Add a Subgraph project](/assets/img/network/subgraph_project_add.png)

## 2. Connect your Graph node

Input the endpoint of your Graph node, along with its indexing status API port (usually `8030`), and HTTP (usually `8000`) and websocket (`8001`) query ports.

Be aware that the SubQuery network coordinator service runs in Docker, so `localhost` does not work the same as if it was run outside of Docker. You should use the internal IP address to connect to the node, or `host.docker.internal` which points to the host `localhost`.

![Connect graph node](/assets/img/network/subgraph_connect_node.png)

Once connected, you will be able to see your Graph Node's sync status in the Node Operator Admin App under Projects

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

Congratulations! You have successfully connected your Graph Node and deployed your Subgraph to the SubQuery Network!

- If you encounter any trouble while running the Node Operator service, please visit [Troubleshooting](../setup/troubleshooting.md)) and find all your solutions in one place.
- Find the list of [FAQs](../setup/faq.md), and resolve your query.
