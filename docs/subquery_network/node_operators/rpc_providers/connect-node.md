# Connect your RPC Endpoint

Node Operators can run either data indexing projects or RPC endpoints for the network (or both). If you instead want to sync a data indexing project, please follow the instructions [here](../indexers/index-project.md).

:::info Connect any RPC
The SubQuery Network does not control how you run the underlying RPC endpoint to the Network, only that you connect and announce a standard EVM endpoint that is able to consume public queries.

This means you can run existing RPC endpoint used for other purposes (including other decentralised RPC networks) to the SubQuery Network.
:::

## Prerequisites

This guide assumes you are already running an RPC node that is internally available to the indexer proxy service.

For example with Etheruem, it can be any client (geth or erigon etc), and it is listening on a known address and port (in the examples below our node is listening on `192.168.1.100:8545`).

Please consult the relevant guides for how to run an RPC node on each network, for example this is the guide for [Geth on Ethereum](https://geth.ethereum.org/docs/getting-started), and [Base](https://docs.base.org/tutorials/run-a-base-node/).

It is recommended to enable the metrics port for the RPC node. For example, when starting an EVM node, add the parameters `--metrics --metrics.addr 0.0.0.0`. For more details, please refer to [Ethereum metrics](https://geth.ethereum.org/docs/monitoring/metrics). Polkadot nodes typically have the metrics port enabled by default. If not, please refer to this [link](https://wiki.polkadot.network/docs/maintain-sync#using-docker) and add the `--prometheus-external` parameter at startup.

## 1. Add Project

Inside your Node Operator Admin App (usually this is `http://localhost:8000/` depending on your installation), the Projects tab appears at the top of the page. This enables Node Operators to add projects of their choice to their Node Operator profile.

Before clicking **`Add Project`,** you will need to obtain the project's deployment ID. If the project has already been deployed and synced by other Node Operators, you will be able to obtain the project’s Deployment ID from the [SubQuery Explorer](https://app.subquery.network/explorer/home).

Enter the project deployment ID when adding the new project, in our case, it is `QmNa36oZ4zRS1i2wQhiFznU5DjEuNP3wopV6U3VcUWMUKu`.

![Add a rpc project](/assets/img/network/rpc_project_add.png)

## 2. Connect your local RPC node

Input the public endpoint of your local node, then the backend will run some verification on the endpoint to check whether it matches the manifest of the project, e.g chainId, node type, localness.

Be aware that the coordinator service runs in docker, so localhost doesn't work like it runs outside of docker. You should use the internal ip address to connect to the node, or `host.docker.internal` which points to the host localhost.

![Connect local node](/assets/img/network/rpc_connect_node.png)

## 3. Go Online

Click `Go Online`, which will then trigger your wallet to sign a transaction. Then your RPC is announced online and is available to query.

## 4. Allocate SQT to the Project and Monitor

To earn Network Allocation Rewards for your project, you should immediately allocate SQT to your new project. [Please follow the guide here](../stake.md#allocating-stake).

On the Network app, the Node Operator can check the era information and confirm that the reward collection is up-to-date. The service log component provides the logs for the coordinator service.

Monitor your eligibility for rewards from the Admin Portal, if your node is out of sync or not reachable, you may not receive rewards.

Congratulations! You have successfully synced your SubQuery RPC Endpoint.

- If you encounter any trouble while running the Node Operator service, please visit [Troubleshooting](../setup/troubleshooting.md)) and find all your solutions in one place.
- Find the list of [FAQs](../setup/faq.md), and resolve your query.
