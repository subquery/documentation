# Connect your local rpc node

## SubQuery Rpc Projects
SubQuery Network has supported a few of RPC projects that node operators can earn SQT rewards by connect their local node and serve RPC requests.

## Prerequisites
Assume you have already a running ethereum node, geth or erigon it doesn't matter, and it is listening on 192.168.1.100:8545

## Steps
### 1. Add Project
Click `Add Project`, input deployment id of the rpc, which you can find from project page, https://app.subquery.network/explorer/project/0x03
in our case, it is QmNa36oZ4zRS1i2wQhiFznU5DjEuNP3wopV6U3VcUWMUKu
![Add a rpc project](/assets/img/network/rpc_add_project.png)

### 2. Connect your local rpc node
Input the endpoint of your local node, then backend will run some verification on the endpoint to check whether it matches the manifest of the project, e.g chainId, node type, localness.
Be aware that coordinator service runs in docker, so localhost doesn't work like it runs outside of docker.
You should use the internal ip address to connect to the node, or host.docker.internal which points to the host localhost.
![Connect local node](/assets/img/network/rpc_connect_node.png)

### 3. Go Online
Click `Go Online`, which will then trigger your wallet to sign a tx, then your rpc is announced online.

### 4. Allocate SQT
To earn Network Allocation Rewards from rpc project, it is like what requires to do for subquery project, you need to allocate SQT onto the project.

Go to https://dev.thechaindata.com/indexer/my-projects, then `Add Allocation`

## Monitoring
Monitor your eligibility for rewards from the Admin Portal, if your node is out of sync or not reachable, you may not receive rewards.
