# Indexer Security Guide

## Background
Indexers are node runners, fundamental participants in Subquery Network. Indexers run heavy indexing jobs and provide query services to public.   
Security is one of the most critical pillar for indexers to archieve, in both worlds indexers are across, in traditional infrastructure world and in crypto world.  

## The worst that could happen
### Crypto Side
* Funds in the controller wallet
* Perform misbehaviors via controller wallet
* Phishing scan planted to indexer admin console and endanger the main indexer wallet

### Traditional Side
* Machine be compromised, become a zombie pc controlled by hacker
* Private Network infiltrated
* Data damage and hardware damage
* Data Ransom

## Architecture and Potential attack surface
![topology](../kepler/assets/img/sq-indexer-stack-topology.png)

### 443 / 80
If nginx is used, check the [official docs](https://docs.nginx.com/nginx/admin-guide/security-controls/)

### 8000
This is for admin only, MUST NOT EXPOSE TO PUBLIC

Set up Firewall rules to protect the port. 
* If you run on public clouds, check the security group settings from their docs.
* Run on bare metal and expose to internet directly, try ufw/ufw-docker.

### 7370
Safe.

### Docker
Coordinator has direct access to your host docker, which can be dangerous if not well protected.
If the machine is only used for running subquery services, indexers should consider apply specific security rules on docker.
Check docs about SeLinux or AppArmor

## Other Best Practices
* Regularly patch the host OS
* Upgrade softwares to latest version

## Community Solutions
> Use on own risk
### Indexer Toolkit
https://github.com/web3cdnservices/subquery-indexer-toolkit
