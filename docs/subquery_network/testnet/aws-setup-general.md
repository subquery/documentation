# Launch AWS EC2 Instance

## Preparations
### Create AWS account
Create at https://aws.amazon.com/ if you don't have aws account.

### Use AWS FreeTier
https://aws.amazon.com/free/


## Launch Instance

### Summary

|           |                                                                               |     |     |     |
|-----------|-------------------------------------------------------------------------------|-----|-----|-----|
| Node Type | t2.medium                                                                     |     |     |     |
| AMI       | Amazon ECS-Optimized Amazon Linux 2 AMI                                       |     |     |     |
| Security Group | port: 8000 & 22 accessible from local ip only<br/> port 80&443 open to public |     |     |     |
| Disk      | 50 GB type: gp3                                                               |     |     |     |



Recommend t2.medium that should support two subquery projects running.

Go to the AWS EC2 console, click the Launch Instances button on the right top of the page

### Setup
#### git

#### docker

#### docker-compose

	ami-0ba91a7aa45470a3e
