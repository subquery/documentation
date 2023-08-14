# Frequently Asked Questions

## What does the Indexer Service comprise of?

The Indexer Service is comprised of:

- Co-ordinator service
- Proxy service

## What should I do if the indexing node is unhealthy?

If the indexing node is unhealthy, first visit the service log to determine if any errors are present.

![Service Logs](/assets/img/service_logs_indexerfaqs.png)

The other option is to restart the service and/or servers involved.

## Can the same Indexer run 2 services on different platforms?

The same Indexer can index 2 **different** projects on 2 **different** hosting providers.

![Same Indexer - 2 Projects - 2 Different Services - Without DB ](/assets/img/same_indexers_twoservices_without_db_indexerfaqs.png)

If the same Indexer wants to index the same project across 2 different hosting providers then the database needs to be shared.

**However, this is currently not supported, and it’s on our roadmap.**

![Same Indexer - Same Project - 2 Different Hosting Providers](/assets/img/two_indexers_with_db_indexerfaqs.png)

# Database

## How to change the default password of the PostgreSQL DB?

To change the password for coordinator-service: v0.18.0, ensure the password config for the DB is the same as the one for the coordinator service `.yml` file.

```
// For postgres db
POSTGRES_PASSWORD: your_password
// For coordinator
command:
  - --postgres-password: your_password
```

However, we don't support applying the changed password to the existing data at the moment. Hence, there are several steps to apply the changes manually:

```jsx
// 1. change existing db password manually
docker exec -i db_container_id psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'your_password'"

// 2. restart docker compose
docker-compose up -d

// 3. For the running projects, there is a tricky way to force the “restart the
// project” with a new DB password. (force restart to be supported as an option flag in the future).
// Force remove the running query containers, then press `restart project`
// with the previous form values in the admin app.
docker stop query_qmyr8xqgaxucxmp query_qmszpq9f4u1gerv
docker rm query_qmyr8xqgaxucxmp query_qmszpq9f4u1gerv
```

## Can I connect my Docker node to an externally hosted database

Not currently, but this is on our roadmap and we will try to incorporate it soon.

![Connect Docker Node to Externally Hosted Database](/assets/img/connect_node_externalDB_indexerfaqs.png)

# Upgrading

## Do I need to constantly update to the newest version of the software?

Our developers are constantly improving the application and you can find the latest version of the subql-coordinator and subql-indexer-proxy on DockerHub. Always use the latest versions (use pre-release versions at your own risk).

| Service                                                                                   | Version Tag |
| :---------------------------------------------------------------------------------------- | :---------- |
| [onfinality/subql-coordinator](https://hub.docker.com/r/onfinality/subql-coordinator)     | `latest`    |
| [onfinality/subql-indexer-proxy](https://hub.docker.com/r/onfinality/subql-indexer-proxy) | `latest`    |

We do recommend that you upgrade to the latest version to take advantage of the new features. However, we do recommend that you follow best practices. For example:

1. Duplicate your PROD environment.
2. Upgrade using this new environment.
3. Test this new environment to ensure there are no issues.
4. Switch over to this new environment.
5. Decommission the old PROD environment.

## When I upgrade my version, do I need to reindex my project?

There is no need to reindex your project when you upgrade your Indexer Service version.

# Firewalls/Security

## Firewall rules bypassed by Docker

Firewall rules are bypassed by docker containers by default so add these commands and disable, set: one can set:

```jsx
{
     "iptables": false
}
```

in /etc/docker/daemon.json`echo "DOCKER_OPTS=\"--iptables=false\"" >> /etc/default/docker` and then restart the Docker service:

`service docker restart`

::: tip Note
Note that turning off IP tables in Docker may cause your deployment containers to lose connectivity. If so, try this solution: [To Fix The Docker and UFW Security Flaw Without Disabling Iptables](https://hub.docker.com/r/chaifeng/ufw-docker-agent/).
:::

For more information, visit [this link](https://github.com/subquery/subql/issues/947)

## **UFW setup guide**

Everyone's setup is different and what works for one person may not work for another. Consider all options before deciding on which route to take.

Uncomplicated Firewall (UFW) is a popular Linux firewall that ships with Ubuntu.

Docker modifies your server's IP tables directly to set up the networks you configure and ports you expose in a `docker-compose.yml`:

```jsx
ports:
      - 80:80
```

This indicates that it is able to bypass any UFW configuration you may have set up. The end result is that you may have set a UFW rule to block incoming connections on certain ports but this configuration is then rendered ineffective as the ports remain open to the Internet.

There are a number of options to solve this:

1. Disable the IP tables option in Docker.
   - Pros:
     - Immediately stops Docker overriding the UFW configuration.
   - Cons:
     - Requires additional configuration to fix up the way Docker creates networks which allow the containers to talk to each other.
2. Use `expose` instead of `ports` in the `docker-compose.yml`.
   - Pros:
     - Nice and neat as the change is only in the docker-compose file which is where we are defining the rest of the behaviour in our stack.
   - Cons:
     - The `query_` containers that are created to index a project need to talk to other containers in the stack. They do this by running on a specific port. And it gets allocated when they are created starting at 3000 and are incremented with each project indexed.
     - That makes `expose` a little inconvenient/complex- either suffer the disruption of adding/removing the internal port as projects are added/removed, or just expose a bunch (3000 - 3100 for example) up front and hope you don't forget when your 101st project won't index.
     - This means that if you pull the latest from the official repository you may overwrite the change in `docker-compose.yml`.
3. Configure UFW with a bunch of additional rules that drop messages to the Docker container ports unless you explicitly allow them.
   - Pros:
     - Allows Docker to maintain its IP table use - the default behaviour.
     - Allows UFW to function as it was always intended to.
   - Cons:
     - Difficult to do.
4. Use your VPS/VDS provider's firewall.
   - Pros:
     - Probably the easiest solution of all of them.
   - Cons:
     - Potentially unavailable to you.

Credit for the suggestion of trying option 1 first goes to crypto_new on Discord. Credit for suggesting options 2, 3 and 4 first goes to kw1k on Discord (thanks!). Credit for this section goes to **counterpointsoftware**.

For more details on option 3, visit counterpointsoftware’s guide [here](https://github.com/counterpointsoftware/subquery-indexer/tree/documentation-gotchas-and-faqs).

# Credit

- [counterpointsoftware](https://github.com/counterpointsoftware/subquery-indexer/tree/documentation-gotchas-and-faqs)
- [Staking7pc](https://github.com/Staking7pc)
