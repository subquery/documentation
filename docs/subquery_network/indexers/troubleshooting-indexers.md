# Troubleshooting

## Got permission denied while trying to connect to the Docker daemon socket

```jsx
[ec2-user@ip-172-31-31-78 subquery-indexer]$ docker-compose up
Got permission denied while trying to connect to the Docker daemon socket
at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json?all=1&filters=%7B%22label%22%3A%7B%22com.docker.compose.project%3Dsubquery-indexer%22%3Atrue%7D%7D&limit=0": dial unix /var/run/docker.sock: connect: permission denied
```

You get this error because the user you have logged in through does not have permission to run the docker-compose up command.

**Solution:**
Run the following command, then log out, and log in again.

```jsx
sudo usermod -aG docker ${USER}
```

The alternative solution is to run as sudo user:

```jsx
sudo docker-compose up


```

## Invalid proxy endpoint

You get this error because the endpoint is pinged for validity.

<!--- ![Invalid Endpoint](/assets/img/invalid_endpoint_troubleshooting.png) --->
<img src="/assets/img/invalid_endpoint_troubleshooting.png" alt="Invalid Endpoint"  height="50%" width="50%">

**Solution:**
Use a valid endpoint such as:

<!--- ![Valid Proxy EndPoint](/assets/img/valid_proxy_endpoint_troubleshooting.png) --->

<img src="/assets/img/valid_proxy_endpoint_troubleshooting.png" alt="Valid Proxy EndPoint"  height="50%" width="50%">

## initdb: error: directory "/var/lib/postgresql/data" exists but is not empty

```jsx
coordinator_db       | initdb: error: directory "/var/lib/postgresql/data" exists but is not empty
coordinator_db       | If you want to create a new database system, either remove or empty
coordinator_db       | the directory "/var/lib/postgresql/data" or run initdb
coordinator_db       | with an argument other than "/var/lib/postgresql/data".
```

This error occurs when your indexer has stopped suddenly and the database becomes corrupted. When you try to restart your indexer, this error appears.

**Solution:**
To fix this error, delete the database and start again. The database resides in “/var/tmp/.data/postgres”. Hence, you must delete this folder.

The other solution for this error is to specify another directory by adding a PGDATA key-value pair.

```jsx
services:
  postgres:
    environment:
      PGDATA: /var/lib/postgresql/data/some_name/
```

## fork/exec /usr/local/bin/docker-compose-v1: bad CPU type in executable

```jsx
fork/exec /usr/local/bin/docker-compose-v1: bad CPU type in executable
```

**Solution:**
To work around this issue in Docker, select “Use Docker Compose V2” in preferences.

![Use Docker Compose V2](/assets/img/Use_Docker_Compose_V2.troubleshooting.png)

## You need to enable JavaScript to run this app.

If you have JavaScript disabled, you will see this error message. Turn on or enable JavaScript in your browser settings to continue to use SubQuery.

```jsx
You need to enable JavaScript to run this app.
```

![Enable Javascript](/assets/img/enable_javascript_troubleshooting.png)

## ERROR Network chainId doesn't match expected genesisHash

```jsx
2022-05-16T10:19:11.162Z <api> ERROR Network chainId doesn't match expected
genesisHash. expected="0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654"
499ea3dafe" actual="0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70"
ce90c3 Error: Network chainId doesn't match expected genesisHash.
expected="0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe"
actual="0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
```

This error indicates that you are trying to index one network while using the endpoint of another network. eg:

![Deploy ID Kusama](/assets/img/deployid_kusama_troubleshooting.png)

![Polkadot EndPoint](/assets/img/polkadot_endpoint_troubleshooting.png)

**Solution:**
To fix this, check you are using an endpoint consistent with the network.

For e.g. for a Kusama project, use the Kusama endpoint of: `wss://kusama.api.onfinality.io/public-ws`

## Error: cannot estimate gas; transaction may fail or may require manual gas limit

Indexers may see this error in their logs:

```jsx
<transaction> WARN collect and distribute rewards: FAILED : Error: cannot estimate gas;
transaction may fail or may require manual gas limit
```

This may occur in case your controller account is low on the operational token (MATIC). Check your controller account balance on the Account tab of your indexer.

## depends_on contains an invalid type, it should be an array

If you encounter the `depends_on contains an invalid type, it should be an array` error while running `docker compose`, it may be because you are not on the latest version of Docker Compose.

**Solution:**

Try to uninstall Docker Compose and re-install it from the official guide rather than from apt:

- `sudo apt remove --purge docker-compose`
- `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
- `sudo chmod +x /usr/local/bin/docker-compose`

If all has worked you should get `docker-compose version 1.29.2, build 5becea4c` from `docker-compose --version`, and you can go ahead and pull/up.

The official installation guide can be found [here](https://docs.docker.com/compose/install/#install-compose-on-linux-systems).

## (WIP) coordinator_service contract ERROR failed to get indexing status for project: 0xQmYR8x...

## (WIP) Unexpected EOF on client connection with an open transaction

```jsx
coordinator_db       | 2022-05-07 20:17:57.675 UTC [949] LOG:
unexpected EOF on client connection with an open transaction
```

![EOF Error - Client Connection with Open Transaction](/assets/img/eof_error_client_connection_troubleshooting.png)

## (WIP) FATAL: could not open file global/pg_filenode.map"

```jsx
FATAL: could not open file "global/pg_filenode.map": No such file or directory
```

---

## Credits

Thanks to:

- [counterpointsoftware](https://github.com/counterpointsoftware/subquery-indexer/tree/documentation-gotchas-and-faqs)
